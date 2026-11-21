import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getClerkAdminStatus } from "@/lib/clerk.functions";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const state = await getClerkAdminStatus();
    if (!state.isAuthenticated || !state.isAdmin) throw redirect({ to: "/admin" });
    return state;
  },
  component: () => <Outlet />,
});
