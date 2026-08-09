import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { CASE_STUDY_COLUMNS } from "@/lib/case-studies";

export default defineTool({
  name: "update_case_study",
  title: "Update case study",
  description: "Update fields on an existing solar project case study, including publish status.",
  inputSchema: {
    id: z.string().describe("Case study id."),
    title: z.string().trim().optional(),
    location: z.string().trim().optional(),
    customer_type: z.enum(["home", "business"]).optional(),
    system_size: z.string().trim().optional(),
    savings: z.string().trim().optional(),
    bill_before: z.string().trim().optional(),
    bill_after: z.string().trim().optional(),
    description: z.string().trim().optional(),
    highlights: z.array(z.string()).optional(),
    before_image_url: z.string().optional(),
    after_image_url: z.string().optional(),
    sort_order: z.number().optional(),
    published: z.boolean().optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ id, ...patch }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const updates = Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== undefined));
    if (Object.keys(updates).length === 0) {
      return { content: [{ type: "text", text: "No fields to update" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("case_studies")
      .update(updates)
      .eq("id", id)
      .select(CASE_STUDY_COLUMNS);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data?.length) {
      return { content: [{ type: "text", text: `No case study found with id ${id}` }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data[0]) }],
      structuredContent: { case_study: data[0] },
    };
  },
});
