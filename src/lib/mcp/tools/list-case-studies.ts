import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { CASE_STUDY_COLUMNS } from "@/lib/case-studies";

export default defineTool({
  name: "list_case_studies",
  title: "List case studies",
  description:
    "List solar project case studies (before/after photos, system size, savings) for Java Solar Solutions.",
  inputSchema: {
    published_only: z
      .boolean()
      .optional()
      .describe("When true, only return published case studies."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ published_only }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase.from("case_studies").select(CASE_STUDY_COLUMNS).order("sort_order");
    if (published_only) query = query.eq("published", true);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { case_studies: data ?? [] },
    };
  },
});
