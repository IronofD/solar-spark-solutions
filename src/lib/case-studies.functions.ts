import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireClerkAdmin } from "./clerk.server";
import { CASE_STUDY_SELECT, caseStudyFromRow, type TursoCaseStudyRow } from "./turso.server";
import type { CaseStudy } from "./case-studies";
import { getTursoDb } from "./turso.server";

const writeSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1).max(120),
  location: z.string().trim().max(120),
  customer_type: z.enum(["home", "business"]),
  system_size: z.string().trim().max(40),
  savings: z.string().trim().max(40),
  bill_before: z.string().trim().max(40),
  bill_after: z.string().trim().max(40),
  description: z.string().trim().max(1200),
  highlights: z.array(z.string().trim().max(200)).max(8),
  before_image_url: z.string().max(1000),
  after_image_url: z.string().max(1000),
  sort_order: z.number().int().min(0).max(100000),
  published: z.boolean(),
});

export const listPublishedCaseStudies = createServerFn({ method: "GET" }).handler(
  async (): Promise<CaseStudy[]> => {
    const rows = (await getTursoDb().all(
      `SELECT ${CASE_STUDY_SELECT} FROM case_studies WHERE published = 1 ORDER BY sort_order ASC, created_at ASC`,
    )) as unknown as TursoCaseStudyRow[];
    return rows.map(caseStudyFromRow);
  },
);

export const listAdminCaseStudies = createServerFn({ method: "GET" }).handler(async () => {
  const { db } = await requireClerkAdmin();
  const rows = (await db.all(
    `SELECT ${CASE_STUDY_SELECT} FROM case_studies ORDER BY sort_order ASC, created_at ASC`,
  )) as unknown as TursoCaseStudyRow[];
  return rows.map(caseStudyFromRow);
});

export const saveCaseStudy = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => writeSchema.parse(input))
  .handler(async ({ data }) => {
    const { db } = await requireClerkAdmin();
    const id = data.id ?? crypto.randomUUID();
    await db.run(
      `INSERT INTO case_studies (
        id, title, location, customer_type, system_size, savings, bill_before, bill_after,
        description, highlights, before_image_url, after_image_url, sort_order, published, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        title = excluded.title,
        location = excluded.location,
        customer_type = excluded.customer_type,
        system_size = excluded.system_size,
        savings = excluded.savings,
        bill_before = excluded.bill_before,
        bill_after = excluded.bill_after,
        description = excluded.description,
        highlights = excluded.highlights,
        before_image_url = excluded.before_image_url,
        after_image_url = excluded.after_image_url,
        sort_order = excluded.sort_order,
        published = excluded.published,
        updated_at = CURRENT_TIMESTAMP`,
      id,
      data.title,
      data.location,
      data.customer_type,
      data.system_size,
      data.savings,
      data.bill_before,
      data.bill_after,
      data.description,
      JSON.stringify(data.highlights),
      data.before_image_url,
      data.after_image_url,
      data.sort_order,
      data.published ? 1 : 0,
    );
    const row = (await db.get(
      `SELECT ${CASE_STUDY_SELECT} FROM case_studies WHERE id = ?`,
      id,
    )) as unknown as TursoCaseStudyRow | undefined;
    if (!row) throw new Error("Case study could not be saved.");
    return caseStudyFromRow(row);
  });

export const deleteCaseStudy = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ id: z.string().min(1).max(100) }).parse(input))
  .handler(async ({ data }) => {
    const { db } = await requireClerkAdmin();
    await db.run("DELETE FROM case_studies WHERE id = ?", data.id);
    return { ok: true };
  });