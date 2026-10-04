import { createFileRoute } from "@tanstack/react-router";
import { inquirySchema, saveInquiry } from "@/lib/inquiries.server";

export const Route = createFileRoute("/api/public/inquiries")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const formData = await request.formData();
        const parsed = inquirySchema.safeParse(Object.fromEntries(formData.entries()));
        const destination = new URL("/contact", request.url);

        if (!parsed.success) {
          destination.searchParams.set("submitted", "error");
          return Response.redirect(destination, 303);
        }

        const result = await saveInquiry(parsed.data);
        destination.searchParams.set(
          "submitted",
          result.externalStored ? "saved" : result.internalStored ? "partial" : "error",
        );
        return Response.redirect(destination, 303);
      },
    },
  },
});