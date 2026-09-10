import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import {
  PlayerRivalriesErrorState,
  PlayerRivalriesPage,
  PlayerRivalriesSkeleton,
} from "@/components/dashboard/player-rivalries-page";
import {
  rivalryOpponentKindFilters,
  rivalrySortModes,
  type PlayerRivalriesQuery,
  type RivalryOpponentKindFilter,
  type RivalrySortMode,
} from "@/lib/player-rivalries-contract";
import { playerRivalriesRepository } from "@/lib/player-rivalries-repository";

interface RivalriesSearch {
  kind?: Exclude<RivalryOpponentKindFilter, "all">;
  game?: string;
  sort?: Exclude<RivalrySortMode, "recent">;
  page?: number;
}

const kindSet = new Set<string>(rivalryOpponentKindFilters.filter((kind) => kind !== "all"));
const sortSet = new Set<string>(rivalrySortModes.filter((sort) => sort !== "recent"));
const gameIdPattern = /^[A-Za-z0-9_-]{1,128}$/;

function positivePage(value: unknown): number | undefined {
  const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;
  return Number.isInteger(parsed) && parsed > 1 ? parsed : undefined;
}

function validGameId(value: unknown): string | undefined {
  return typeof value === "string" && gameIdPattern.test(value) ? value : undefined;
}

function toQuery(search: RivalriesSearch): PlayerRivalriesQuery {
  return {
    kind: search.kind ?? "all",
    gameId: search.game,
    sort: search.sort ?? "recent",
    page: search.page ?? 1,
  };
}

function compactSearch(
  kind: RivalryOpponentKindFilter,
  gameId: string | undefined,
  sort: RivalrySortMode,
  page = 1,
): RivalriesSearch {
  return {
    kind: kind === "all" ? undefined : kind,
    game: gameId,
    sort: sort === "recent" ? undefined : sort,
    page: page > 1 ? page : undefined,
  };
}

export const Route = createFileRoute("/dashboard/rivalries")({
  validateSearch: (search: Record<string, unknown>): RivalriesSearch => ({
    kind:
      typeof search.kind === "string" && kindSet.has(search.kind)
        ? (search.kind as Exclude<RivalryOpponentKindFilter, "all">)
        : undefined,
    game: validGameId(search.game),
    sort:
      typeof search.sort === "string" && sortSet.has(search.sort)
        ? (search.sort as Exclude<RivalrySortMode, "recent">)
        : undefined,
    page: positivePage(search.page),
  }),
  loaderDeps: ({ search }) => toQuery(search),
  loader: async ({ deps }) => {
    const result = await playerRivalriesRepository.getRivalries(deps);
    if (result.state !== "authenticated") {
      throw redirect({
        to: "/login",
        search: { redirect: "/dashboard/rivalries" },
      });
    }
    return result.data;
  },
  head: () => ({
    meta: [
      { title: "رقابت‌های من — داشبورد بازیکن" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  pendingComponent: PlayerRivalriesSkeleton,
  errorComponent: PlayerRivalriesErrorState,
  component: PlayerRivalriesRoute,
});

function PlayerRivalriesRoute() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const kind = search.kind ?? "all";
  const sort = search.sort ?? "recent";

  const navigateTo = (
    nextKind: RivalryOpponentKindFilter,
    gameId: string | undefined,
    nextSort: RivalrySortMode,
    page = 1,
  ) => {
    void navigate({ search: compactSearch(nextKind, gameId, nextSort, page) });
  };

  return (
    <PlayerRivalriesPage
      data={data}
      kind={kind}
      gameId={search.game}
      sort={sort}
      onKindChange={(nextKind) => navigateTo(nextKind, search.game, sort)}
      onGameChange={(gameId) => navigateTo(kind, gameId, sort)}
      onSortChange={(nextSort) => navigateTo(kind, search.game, nextSort)}
      onPageChange={(page) => navigateTo(kind, search.game, sort, page)}
      onResetFilters={() => navigateTo("all", undefined, sort)}
    />
  );
}
