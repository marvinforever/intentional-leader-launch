import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { sendInternalTransactionalEmail } from "@/lib/email/send-internal";

/**
 * Receives an invoice request from the Intentional Leader landing page.
 * 1. Persists the submission to public.invoice_requests (admin client, RLS bypassed).
 * 2. Optionally forwards to QUICKBOOKS_INVOICE_WEBHOOK_URL (Zapier/Make) for QBO.
 * 3. Optionally fires a notification webhook (MARK_NOTIFICATION_WEBHOOK_URL) so
 *    Mark gets an email immediately. Both webhooks are no-ops if their secrets
 *    aren't configured — the DB row is the source of truth.
 */

const InvoiceSchema = z.object({
  company_name: z.string().min(1).max(255),
  contact_name: z.string().min(1).max(255),
  billing_email: z.string().email().max(320),
  billing_address: z.string().min(1).max(1000),
  phone: z.string().min(7).max(30),
  license_type: z.enum(["individual", "company"]),
  seat_count: z.string().max(10).optional(),
  notes: z.string().max(2000).optional(),
  ap_contact_name: z.string().max(255).optional().or(z.literal("")),
  ap_email: z
    .string()
    .email()
    .max(320)
    .optional()
    .or(z.literal("")),
});

export type InvoiceInput = z.infer<typeof InvoiceSchema>;

const NOTIFY_EMAIL = "mark@themomentumcompany.com";

export const submitInvoiceRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InvoiceSchema.parse(input))
  .handler(async ({ data }) => {
    const amount = data.license_type === "company" ? 10000 : 1000;
    const seatCount =
      data.license_type === "individual"
        ? Math.max(1, parseInt(data.seat_count || "1", 10) || 1)
        : 1;
    const totalAmount = amount * seatCount;

    // 1. Persist to database (source of truth).
    const { data: inserted, error: insertError } = await supabaseAdmin
      .from("invoice_requests")
      .insert({
        license_type: data.license_type,
        company_name: data.company_name,
        contact_name: data.contact_name,
        billing_email: data.billing_email,
        phone: data.phone,
        billing_address: data.billing_address,
        seat_count: seatCount,
        notes: data.notes ?? null,
        amount_usd: totalAmount,
        ap_contact_name: data.ap_contact_name?.trim() || null,
        ap_email: data.ap_email?.trim() || null,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Failed to save invoice request:", insertError);
      throw new Error("Failed to save your request. Please try again or email mark@themomentumcompany.com directly.");
    }

    const enriched = {
      source: "intentional-leader-landing",
      received_at: new Date().toISOString(),
      program: "The Intentional Agribusiness Leader",
      record_id: inserted.id,
      notify_email: NOTIFY_EMAIL,
      amount_usd: totalAmount,
      seat_count: seatCount,
      ...data,
    };

    console.log("Invoice request received:", JSON.stringify(enriched));

    // Send notification email to Mark via Lovable Emails (queued).
    try {
      await sendInternalTransactionalEmail({
        templateName: "invoice-request-notification",
        idempotencyKey: `invoice-${inserted.id}`,
        templateData: {
          company_name: data.company_name,
          contact_name: data.contact_name,
          billing_email: data.billing_email,
          phone: data.phone,
          billing_address: data.billing_address,
          license_type: data.license_type,
          seat_count: seatCount,
          amount_usd: totalAmount,
          notes: data.notes ?? null,
          record_id: inserted.id,
          received_at: enriched.received_at,
          ap_contact_name: data.ap_contact_name?.trim() || null,
          ap_email: data.ap_email?.trim() || null,
        },
      });
    } catch (err) {
      console.error("Failed to enqueue invoice notification email:", err);
    }

    // 2. Notification webhook (e.g. Zapier "Email me") — fire and forget.
    const notifyUrl = process.env.MARK_NOTIFICATION_WEBHOOK_URL;
    if (notifyUrl) {
      try {
        await fetch(notifyUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: NOTIFY_EMAIL,
            subject: `New Invoice Request — ${data.company_name} ($${totalAmount.toLocaleString()})`,
            ...enriched,
          }),
        });
      } catch (err) {
        console.error("Notification webhook failed:", err);
      }
    }

    // 3. QuickBooks/billing webhook (set up later).
    const webhookUrl = process.env.QUICKBOOKS_INVOICE_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const r = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(enriched),
        });
        if (!r.ok) {
          const text = await r.text();
          console.error(`Webhook responded with ${r.status}: ${text}`);
        }
      } catch (err) {
        console.error("Webhook forward failed:", err);
      }
    }

    return { ok: true };
  });