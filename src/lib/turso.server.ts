import { connect } from "@tursodatabase/serverless";

export function getTursoDb() {
  const url = process.env["TURSO_DATABASE_URL"];
  const authToken = process.env["TURSO_AUTH_TOKEN"];
  if (!url || !authToken) {
    throw new Error("Turso database connection is not configured.");
  }
  return connect({ url, authToken });
}

export const CASE_STUDY_SELECT =
  "id, title, location, customer_type, system_size, savings, bill_before, bill_after, description, highlights, before_image_url, after_image_url, sort_order, published";

export type TursoCaseStudyRow = {
  id: string;
  title: string;
  location: string;
  customer_type: "home" | "business";
  system_size: string;
  savings: string;
  bill_before: string;
  bill_after: string;
  description: string;
  highlights: string;
  before_image_url: string;
  after_image_url: string;
  sort_order: number;
  published: number;
};

export function caseStudyFromRow(row: TursoCaseStudyRow) {
  return {
    ...row,
    highlights: parseHighlights(row.highlights),
    published: row.published === 1,
  };
}

export function parseHighlights(value: string): string[] {
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) && parsed.every((item) => typeof item === "string")
      ? parsed
      : [];
  } catch {
    return [];
  }
}