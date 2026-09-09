import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardErrorState } from "@/components/dashboard/dashboard-states";
import { playerSessionRepository } from "@/lib/player-session";

/**
 * Authenticated player area.
 *
 * The route guard is a UX boundary only. Django must still authorize every
 * private API response independently. During parallel development the mock
 * session adapter keeps the design preview accessible; switching
 * VITE_DATA_ADAPTER=django activates the real P01 session lookup.
 */
export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const session = await playerSessionRepository.getSession();
    if (session.state !== "authenticated") {
      throw redirect({ to: "/login" });
    }
    return { session };
  },
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