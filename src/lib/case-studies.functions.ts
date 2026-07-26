import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { CASE_STUDY_COLUMNS, type CaseStudy } from "@/lib/case-studies";

export const listPublishedCaseStudies = createServerFn({ method: "GET" }).handler(
  async (): Promise<CaseStudy[]> => {
    const url = process.env.SUPABASE_URL!;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY!;

    const supabasePublic = createClient<Database>(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { data, error } = await supabasePublic
      .from("case_studies")
      .select(CASE_STUDY_COLUMNS)
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("[case-studies] public list failed", error.message);
      return [];
    }
    return (data ?? []) as unknown as CaseStudy[];
  },
);
