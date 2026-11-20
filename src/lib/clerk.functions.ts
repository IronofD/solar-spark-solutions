import { createServerFn } from "@tanstack/react-start";

export const getClerkPublishableKey = createServerFn({ method: "GET" }).handler(() => {
  const key = process.env["CLERK_PUBLISHABLE_KEY"];
  if (!key) throw new Error("Clerk sign-in is not configured yet.");
  return key;
});