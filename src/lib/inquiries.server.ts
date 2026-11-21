import { z } from "zod";
import { getTursoDb } from "./turso.server";

export const inquirySchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().max(30).optional().default(""),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  location: z.string().trim().max(150).optional().default(""),
  service_type: z.string().trim().max(50).optional().default(""),
  monthly_bill: z.string().trim().max(50).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
});

type Inquiry = z.infer<typeof inquirySchema>;

export async function saveInquiry(data: Inquiry) {
  const db = getTursoDb();
  const id = crypto.randomUUID();
  await db.run(
    `INSERT INTO inquiries (id, name, phone, email, location, service_type, monthly_bill, message, external_sync_status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'synced')`,
    id,
    data.name,
    data.phone || null,
    data.email || null,
    data.location || null,
    data.service_type || null,
    data.monthly_bill || null,
    data.message || null,
  );
  return { ok: true, internalStored: true, externalStored: false, id };
}