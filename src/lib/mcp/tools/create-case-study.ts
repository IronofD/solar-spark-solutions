import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { CASE_STUDY_COLUMNS } from "@/lib/case-studies";

export default defineTool({
  name: "create_case_study",
  title: "Create case study",
  description:
    "Create a new solar project case study. Image URLs are optional and can be added later in the admin dashboard.",
  inputSchema: {
    title: z.string().trim().describe("Project title, e.g. 'Thodupuzha Family Home'."),
    location: z.string().trim().describe("Project location."),
    customer_type: z.enum(["home", "business"]).describe("Customer segment."),
    system_size: z.string().trim().describe("System size, e.g. '5 kW'."),
    savings: z.string().trim().describe("Savings summary, e.g. '92% bill reduction'."),
    bill_before: z.string().trim().describe("Monthly bill before solar."),
    bill_after: z.string().trim().describe("Monthly bill after solar."),
    description: z.string().trim().describe("Short case-study write-up."),
    highlights: z.array(z.string()).optional().describe("Bullet highlights."),
    before_image_url: z.string().optional().describe("Before photo URL."),
    after_image_url: z.string().optional().describe("After photo URL."),
    published: z.boolean().optional().describe("Publish immediately (default true)."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("case_studies")
      .insert({
        ...input,
        highlights: input.highlights ?? [],
        before_image_url: input.before_image_url ?? "",
        after_image_url: input.after_image_url ?? "",
        published: input.published ?? true,
      })
      .select(CASE_STUDY_COLUMNS);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data?.[0] ?? null) }],
      structuredContent: { case_study: data?.[0] ?? null },
    };
  },
});
