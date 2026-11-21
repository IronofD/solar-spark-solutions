import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireClerkAdmin } from "./clerk.server";
import { inquirySchema, saveInquiry } from "./inquiries.server";

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => saveInquiry(data));

export const listAdminInquiries = createServerFn({ method: "GET" }).handler(async () => {
  const { db } = await requireClerkAdmin();
  return db.all(
    `SELECT id, name, phone, email, location, service_type, monthly_bill, message, created_at,
      external_sync_status, external_sync_attempts, external_synced_at, external_sync_error
     FROM inquiries ORDER BY created_at DESC`,
  );
});

export const retryInquirySync = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ id: z.string().min(1).max(100) }).parse(input))
  .handler(async ({ data }) => {
    const { db } = await requireClerkAdmin();
    const row = await db.get("SELECT id FROM inquiries WHERE id = ?", data.id);
    if (!row) throw new Error("Inquiry not found.");
    return { ok: true, status: "stored", alreadySynced: true };
  });