import { createServerFn } from "@tanstack/react-start";
import { inquirySchema, saveInquiry } from "./inquiries.server";

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => saveInquiry(data));
