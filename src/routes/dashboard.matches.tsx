import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { MyMatchesErrorState, MyMatchesPage, MyMatchesSkeleton } from "@/components/dashboard/my-matches-page";
import {
  myMatchKindFilters,
  myMatchStateFilters,
  type MyMatchKindFilter,
  type MyMatchesQuery,
  type MyMatchStateFilter,
} from "@/lib/my-matches-data";
import { MyMatchesHttpError } from "@/lib/my-matches-http-repository";
import { myMatchesRepository } from "@/lib/my-matches-repository";

interface MyMatchesSearch {
  state?: Exclude<MyMatchStateFilter, "all">;
  kind?: Exclude<MyMatchKindFilter, "all">;
  game?: string;
  page?: number;
}

const stateSet = new Set<string>(myMatchStateFilters.filter((state) => state !== "all"));
const kindSet = new Set<string>(myMatchKindFilters.filter((kind) => kind !== "all"));
const gameIdPattern = /^[A-Za-z0-9_-]{1,64}$/;

function positivePage(value: unknown): number | undefined {
  const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;
  return Number.isInteger(parsed) && parsed > 1 ? parsed : undefined;
}

function validGameId(value: unknown): string | undefined {
  return typeof value === "string" && gameIdPattern.test(value) ? value : undefined;
}

function toQuery(search: MyMatchesSearch): MyMatchesQuery {
  return {
    state: search.state ?? "all",
    kind: search.kind ?? "all",
    gameId: search.game,
    page: search.page ?? 1,
  };
}

function compactSearch(
  state: MyMatchStateFilter,
  kind: MyMatchKindFilter,
  gameId?: string,
  page = 1,
): MyMatchesSearch {
  return {
    state: state === "all" ? undefined : state,
    kind: kind === "all" ? undefined : kind,
    game: gameId,
    page: page > 1 ? page : undefined,
  };
}

export const Route = createFileRoute("/dashboard/matches")({
  validateSearch: (search: Record<string, unknown>): MyMatchesSearch => ({
    state:
      typeof search.state === "string" && stateSet.has(search.state)
        ? (search.state as Exclude<MyMatchStateFilter, "all">)
        : undefined,
    kind:
      typeof search.kind === "string" && kindSet.has(search.kind)
        ? (search.kind as Exclude<MyMatchKindFilter, "all">)
        : undefined,
    game: validGameId(search.game),
    page: positivePage(search.page),
  }),
  loaderDeps: ({ search }) => toQuery(search),
  loader: async ({ deps }) => {
    try {
      return await myMatchesRepository.getMyMatches(deps);
    } catch (error) {
      if (error instanceof MyMatchesHttpError && error.status === 401) {
        throw redirect({ to: "/login" });
      }
      throw error;
    }
  },
  head: () => ({
    meta: [
      { title: "Matchهای من — داشبورد بازیکن" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  pendingComponent: MyMatchesSkeleton,
  errorComponent: MyMatchesErrorState,
  component: MyMatchesRoute,
});

function MyMatchesRoute() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const state = search.state ?? "all";
  const kind = search.kind ?? "all";
  const resultActions = data.items.filter((item) => item.attention === "submit-result");

  const navigateTo = (
    nextState: MyMatchStateFilter,
    nextKind: MyMatchKindFilter,
    gameId?: string,
    page = 1,
  ) => {
    void navigate({ search: compactSearch(nextState, nextKind, gameId, page) });
  };

  return (
    <>
      {resultActions.length ? (
        <section aria-labelledby="result-actions-title" className="mb-5 rounded-2xl border border-warning/35 bg-warning/8 p-4 sm:p-5">
          <h2 id="result-actions-title" className="text-sm font-black text-warning">Matchهای نیازمند ثبت نتیجه</h2>
          <p className="mt-1 text-xs leading-6 text-muted-foreground">
            فقط Matchهایی که وضعیت رسمی آن‌ها نیازمند ثبت نتیجه است در این بخش نمایش داده می‌شوند.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {resultActions.map((item) => (
              <Link
                key={item.matchId}
                to="/matches/$id/result"
                params={{ id: item.matchId }}
                className="inline-flex min-h-10 items-center rounded-lg bg-primary px-4 text-xs font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                ثبت نتیجه مقابل {item.opponent.displayTag}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <MyMatchesPage
        data={data}
        state={state}
        kind={kind}
        gameId={search.game}
        onStateChange={(nextState) => navigateTo(nextState, kind, search.game)}
        onKindChange={(nextKind) => navigateTo(state, nextKind, search.game)}
        onGameChange={(gameId) => navigateTo(state, kind, gameId)}
        onPageChange={(page) => navigateTo(state, kind, search.game, page)}
        onResetFilters={() => navigateTo("all", "all")}
      />
    </>
  );
}
