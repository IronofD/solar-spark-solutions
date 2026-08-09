import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listCaseStudies from "./tools/list-case-studies";
import createCaseStudy from "./tools/create-case-study";
import updateCaseStudy from "./tools/update-case-study";
import listInquiries from "./tools/list-inquiries";

const projectRef = import.meta.env['VITE_SUPABASE_PROJECT_ID'] ?? "project-ref-unset";

export default defineMcp({
  name: "java-solar-solutions",
  title: "Java Solar Solutions",
  version: "0.1.0",
  instructions:
    "Tools for the Java Solar Solutions website. Read and manage solar project case studies (before/after photos, system size, savings) and read customer inquiries submitted through the contact form. All tools act as the signed-in user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listCaseStudies, createCaseStudy, updateCaseStudy, listInquiries],
});
