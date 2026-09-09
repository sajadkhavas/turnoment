import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import {
  MyTournamentsErrorState,
  MyTournamentsPage,
  MyTournamentsSkeleton,
} from "@/components/dashboard/my-tournaments-page";
import {
  myTournamentStateFilters,
  type MyTournamentStateFilter,
  type MyTournamentsQuery,
} from "@/lib/my-tournaments-data";
import { MyTournamentsHttpError } from "@/lib/my-tournaments-http-repository";
import { myTournamentsRepository } from "@/lib/my-tournaments-repository";

interface MyTournamentsSearch {
  state?: Exclude<MyTournamentStateFilter, "all">;
  game?: string;
  page?: number;
}

const stateSet = new Set<string>(myTournamentStateFilters.filter((state) => state !== "all"));
const gameIdPattern = /^[A-Za-z0-9_-]{1,64}$/;

function positivePage(value: unknown): number | undefined {
  const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;
  return Number.isInteger(parsed) && parsed > 1 ? parsed : undefined;
}

function validGameId(value: unknown): string | undefined {
  return typeof value === "string" && gameIdPattern.test(value) ? value : undefined;
}

function toQuery(search: MyTournamentsSearch): MyTournamentsQuery {
  return {
    state: search.state ?? "all",
    gameId: search.game,
    page: search.page ?? 1,
  };
}

function compactSearch(state: MyTournamentStateFilter, gameId?: string, page = 1): MyTournamentsSearch {
  return {
    state: state === "all" ? undefined : state,
    game: gameId,
    page: page > 1 ? page : undefined,
  };
}

export const Route = createFileRoute("/dashboard/tournaments")({
  validateSearch: (search: Record<string, unknown>): MyTournamentsSearch => ({
    state:
      typeof search.state === "string" && stateSet.has(search.state)
        ? (search.state as Exclude<MyTournamentStateFilter, "all">)
        : undefined,
    game: validGameId(search.game),
    page: positivePage(search.page),
  }),
  loaderDeps: ({ search }) => toQuery(search),
  loader: async ({ deps }) => {
    try {
      return await myTournamentsRepository.getMyTournaments(deps);
    } catch (error) {
      if (error instanceof MyTournamentsHttpError && error.status === 401) {
        throw redirect({ to: "/login" });
      }
      throw error;
    }
  },
  head: () => ({
    meta: [
      { title: "مسابقات من — داشبورد بازیکن" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  pendingComponent: MyTournamentsSkeleton,
  errorComponent: MyTournamentsErrorState,
  component: MyTournamentsRoute,
});

function MyTournamentsRoute() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const state = search.state ?? "all";

  const navigateTo = (nextState: MyTournamentStateFilter, gameId?: string, page = 1) => {
    void navigate({
      search: compactSearch(nextState, gameId, page),
      replace: true,
    });
  };

  return (
    <MyTournamentsPage
      data={data}
      state={state}
      gameId={search.game}
      onStateChange={(nextState) => navigateTo(nextState, search.game)}
      onGameChange={(gameId) => navigateTo(state, gameId)}
      onPageChange={(page) => navigateTo(state, search.game, page)}
      onResetFilters={() => navigateTo("all")}
    />
  );
}
