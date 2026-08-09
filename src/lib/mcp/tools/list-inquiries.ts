import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_inquiries",
  title: "List customer inquiries",
  description:
    "List contact-form inquiries submitted on the Java Solar Solutions website. Admin access only.",
  inputSchema: {
    limit: z.number().optional().describe("Maximum number of inquiries to return (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const max = Math.min(Math.max(limit ?? 20, 1), 100);
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("inquiries")
      .select("id,name,phone,email,message,created_at")
      .order("created_at", { ascending: false })
      .limit(max);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { inquiries: data ?? [] },
    };
  },
});
