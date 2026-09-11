import { createFileRoute, Link, notFound, redirect, useRouter } from "@tanstack/react-router";
import { MatchDisputePage } from "@/components/matches/match-dispute-page";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import { MatchDisputeHttpError } from "@/lib/match-dispute-http-repository";
import { matchDisputeRepository } from "@/lib/match-dispute-repository";
import { playerSessionRepository } from "@/lib/player-session";

const MATCH_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/;

export const Route = createFileRoute("/matches/$id/dispute")({
  ssr: true,
  beforeLoad: async ({ params }) => {
    if (!MATCH_ID_PATTERN.test(params.id)) throw notFound();
    const session = await playerSessionRepository.getSession();
    if (session.state !== "authenticated") throw redirect({ to: "/login" });
    return { session };
  },
  loader: async ({ params }) => {
    try {
      const context = await matchDisputeRepository.getDispute(params.id);
      if (!context) throw notFound();
      if (context.matchId !== params.id) throw new Error("Match Dispute identity mismatch.");
      return { context };
    } catch (error) {
      if (error instanceof MatchDisputeHttpError && error.status === 401) throw redirect({ to: "/login" });
      if (error instanceof MatchDisputeHttpError && error.status === 403) throw notFound();
      throw error;
    }
  },
  head: () => ({
    meta: [
      { title: "اعتراض به Match — ایران مهر افزار" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  pendingComponent: DisputePending,
  errorComponent: DisputeError,
  notFoundComponent: DisputeNotFound,
  component: DisputeRoute,
});

function DisputeRoute() {
  const { context } = Route.useLoaderData();
  return (
    <TournamentLayout pageOwnsMain>
      <MatchDisputePage context={context} />
    </TournamentLayout>
  );
}

function DisputePending() {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-5xl animate-pulse space-y-5">
          <div className="h-4 w-36 rounded bg-muted" />
          <div className="h-9 w-64 rounded bg-muted" />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="h-[460px] rounded-2xl border border-border bg-card" />
            <div className="h-80 rounded-2xl border border-border bg-card" />
          </div>
        </div>
      </main>
    </TournamentLayout>
  );
}

function DisputeError() {
  const router = useRouter();
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black">وضعیت اعتراض بارگذاری نشد</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">برای دریافت دوباره وضعیت این Match تلاش کن.</p>
        <button type="button" onClick={() => void router.invalidate()} className="mt-6 h-11 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground">
          تلاش دوباره
        </button>
      </main>
    </TournamentLayout>
  );
}

function DisputeNotFound() {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black">پرونده این Match در دسترس نیست</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">ممکن است این Match در حساب تو نباشد یا دسترسی به این مسیر برای آن وجود نداشته باشد.</p>
        <Link to="/dashboard/matches" className="mt-6 inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground">
          بازگشت به Matchهای من
        </Link>
      </main>
    </TournamentLayout>
  );
}
