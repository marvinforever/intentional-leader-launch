import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sendInternalTransactionalEmail } from "@/lib/email/send-internal";

const ClaimSchema = z.object({
  company_name: z.string().trim().min(1).max(255),
  contact_name: z.string().trim().min(1).max(255),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(7).max(30),
  position: z.string().min(1).max(120),
  claim_type: z.enum(["claim", "pledge"]),
  amount_usd: z.number().int().min(0).max(10_000_000),
  leaders_count: z.number().int().min(0).max(10_000),
  note: z.string().max(2000).optional().or(z.literal("")),
});

export type FoundingClassClaimInput = z.infer<typeof ClaimSchema>;

export const submitFoundingClassClaim = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ClaimSchema.parse(input))
  .handler(async ({ data }) => {
    const recordId = crypto.randomUUID();
    const receivedAt = new Date().toISOString();
    const claimTypeLabel = data.claim_type === "claim" ? "Claim outright" : "Pledge / name my number";

    console.log("Founding Class claim received:", JSON.stringify({ ...data, recordId, receivedAt }));

    try {
      await sendInternalTransactionalEmail({
        templateName: "founding-class-claim-notification",
        idempotencyKey: `founding-class-${recordId}`,
        templateData: {
          company_name: data.company_name,
          contact_name: data.contact_name,
          email: data.email,
          phone: data.phone,
          position: data.position,
          claim_type: claimTypeLabel,
          amount_usd: data.amount_usd,
          leaders_count: data.leaders_count,
          note: data.note?.trim() || null,
          record_id: recordId,
          received_at: receivedAt,
        },
      });
    } catch (err) {
      console.error("Failed to enqueue Founding Class email:", err);
      throw new Error("Could not send your submission. Please email mark@themomentumcompany.com directly.");
    }

    return { ok: true };
  });