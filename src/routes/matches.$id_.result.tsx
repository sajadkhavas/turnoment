import { createFileRoute, Link, notFound, redirect, useRouter } from "@tanstack/react-router";
import { ResultSubmissionPage } from "@/components/matches/result-submission-page";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import { playerSessionRepository } from "@/lib/player-session";
import { ResultSubmissionHttpError } from "@/lib/result-submission-http-repository";
import { resultSubmissionRepository } from "@/lib/result-submission-repository";

const MATCH_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/;

export const Route = createFileRoute("/matches/$id_/result")({
  ssr: true,
  beforeLoad: async ({ params }) => {
    if (!MATCH_ID_PATTERN.test(params.id)) throw notFound();
    const session = await playerSessionRepository.getSession();
    if (session.state !== "authenticated") throw redirect({ to: "/login" });
    return { session };
  },
  loader: async ({ params }) => {
    try {
      const context = await resultSubmissionRepository.getResultSubmission(params.id);
      if (!context) throw notFound();
      if (context.matchId !== params.id) throw new Error("Result Submission identity mismatch.");
      return { context };
    } catch (error) {
      if (error instanceof ResultSubmissionHttpError && error.status === 401) {
        throw redirect({ to: "/login" });
      }
      if (error instanceof ResultSubmissionHttpError && error.status === 403) {
        throw notFound();
      }
      throw error;
    }
  },
  head: () => ({
    meta: [
      { title: "ثبت نتیجه Match — ایران مهر افزار" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  pendingComponent: ResultSubmissionPending,
  errorComponent: ResultSubmissionError,
  notFoundComponent: ResultSubmissionNotFound,
  component: ResultSubmissionRoute,
});

function ResultSubmissionRoute() {
  const { context } = Route.useLoaderData();
  return (
    <TournamentLayout pageOwnsMain>
      <ResultSubmissionPage context={context} />
    </TournamentLayout>
  );
}

function ResultSubmissionPending() {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-5xl animate-pulse space-y-5">
          <div className="h-4 w-32 rounded bg-muted" />
          <div className="h-9 w-64 rounded bg-muted" />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="h-96 rounded-2xl border border-border bg-card" />
            <div className="h-72 rounded-2xl border border-border bg-card" />
          </div>
        </div>
      </main>
    </TournamentLayout>
  );
}

function ResultSubmissionError() {
  const router = useRouter();
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black">وضعیت ثبت نتیجه بارگذاری نشد</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
          برای دریافت دوباره وضعیت Match تلاش کن.
        </p>
        <button
          type="button"
          onClick={() => void router.invalidate()}
          className="mt-6 h-11 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground"
        >
          تلاش دوباره
        </button>
      </main>
    </TournamentLayout>
  );
}

function ResultSubmissionNotFound() {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black">Match برای ثبت نتیجه پیدا نشد</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
          ممکن است این Match در حساب تو نباشد یا دیگر برای این مسیر در دسترس نباشد.
        </p>
        <Link
          to="/dashboard/matches"
          className="mt-6 inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground"
        >
          بازگشت به Matchهای من
        </Link>
      </main>
    </TournamentLayout>
  );
}
