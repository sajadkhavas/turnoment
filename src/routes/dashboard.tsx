import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardErrorState } from "@/components/dashboard/dashboard-states";

/**
 * Authenticated player area.
 * Auth is currently a mock session shell. When the Django OTP/session adapter
 * lands, resolve the session in `beforeLoad` here and redirect
 * unauthenticated / session-expired users to the OTP login flow.
 */
export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "داشبورد بازیکن — ایران مهر افزار" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  errorComponent: () => (
    <DashboardShell>
      <DashboardErrorState />
    </DashboardShell>
  ),
  component: () => (
    <DashboardShell>
      <Outlet />
    </DashboardShell>
  ),
});
