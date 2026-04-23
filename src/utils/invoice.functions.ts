import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Port of supabase/functions/invoice-request from momentum-thrive-os.
 * Receives an invoice request from the Intentional Leader landing page and
 * forwards it to QUICKBOOKS_INVOICE_WEBHOOK_URL (e.g. Zapier/Make) which
 * creates the QuickBooks Online invoice. Falls back to logging if the
 * webhook secret isn't configured yet, so the page works immediately.
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
});

export type InvoiceInput = z.infer<typeof InvoiceSchema>;

export const submitInvoiceRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InvoiceSchema.parse(input))
  .handler(async ({ data }) => {
    const amount = data.license_type === "company" ? 10000 : 1000;
    const seatCount =
      data.license_type === "individual"
        ? Math.max(1, parseInt(data.seat_count || "1", 10) || 1)
        : 1;

    const enriched = {
      source: "intentional-leader-landing",
      received_at: new Date().toISOString(),
      program: "The Intentional Agribusiness Leader",
      amount_usd: amount * seatCount,
      seat_count: seatCount,
      ...data,
    };

    console.log("Invoice request received:", JSON.stringify(enriched));

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
          // Still return success to user — we have the data logged.
        }
      } catch (err) {
        console.error("Webhook forward failed:", err);
      }
    } else {
      console.warn(
        "QUICKBOOKS_INVOICE_WEBHOOK_URL not configured — request logged only.",
      );
    }

    return { ok: true };
  });