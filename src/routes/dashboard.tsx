import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardErrorState } from "@/components/dashboard/dashboard-states";
import { getDataAdapterMode } from "@/lib/data-adapter";
import { playerSessionRepository } from "@/lib/player-session";

/**
 * Authenticated player area.
 *
 * The route guard is a UX boundary only. Django must still authorize every
 * private API response independently. Mock preview retains server rendering
 * for existing route/screenshot acceptance. In real API mode the session
 * cookie is browser-scoped; run the UX guard in the browser until an
 * explicitly authenticated SSR proxy is implemented and accepted.
 */
export const Route = createFileRoute("/dashboard")({
  // Avoid a server-side unauthenticated redirect in API mode. Preserve the
  // frozen mock SSR contract used by the frontend quality gate.
  ssr: getDataAdapterMode() !== "api",
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
