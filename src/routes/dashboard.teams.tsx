import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import {
  PlayerTeamsErrorState,
  PlayerTeamsPage,
  PlayerTeamsSkeleton,
} from "@/components/dashboard/player-teams-page";
import type { PlayerTeamsQuery } from "@/lib/player-teams-contract";
import { playerTeamsRepository } from "@/lib/player-teams-repository";

interface TeamsSearch {
  team?: string;
  page?: number;
}

const stableIdPattern = /^[A-Za-z0-9_-]{1,128}$/;

function positivePage(value: unknown): number | undefined {
  const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;
  return Number.isInteger(parsed) && parsed > 1 ? parsed : undefined;
}

function validStableId(value: unknown): string | undefined {
  return typeof value === "string" && stableIdPattern.test(value) ? value : undefined;
}

function toQuery(search: TeamsSearch): PlayerTeamsQuery {
  return {
    teamId: search.team,
    page: search.page ?? 1,
  };
}

function compactSearch(teamId?: string, page = 1): TeamsSearch {
  return {
    team: teamId,
    page: page > 1 ? page : undefined,
  };
}

export const Route = createFileRoute("/dashboard/teams")({
  validateSearch: (search: Record<string, unknown>): TeamsSearch => ({
    team: validStableId(search.team),
    page: positivePage(search.page),
  }),
  loaderDeps: ({ search }) => toQuery(search),
  loader: async ({ deps }) => {
    const result = await playerTeamsRepository.getTeams(deps);
    if (result.state !== "authenticated") {
      throw redirect({
        to: "/login",
        search: { redirect: "/dashboard/teams" },
      });
    }
    return result.data;
  },
  head: () => ({
    meta: [
      { title: "تیم‌های من — داشبورد بازیکن" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  pendingComponent: PlayerTeamsSkeleton,
  errorComponent: PlayerTeamsErrorState,
  component: PlayerTeamsRoute,
});

function PlayerTeamsRoute() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const navigateTo = (teamId?: string, page = 1) => {
    void navigate({ search: compactSearch(teamId, page) });
  };

  return (
    <PlayerTeamsPage
      data={data}
      teamId={search.team}
      onTeamChange={(teamId) => navigateTo(teamId)}
      onPageChange={(page) => navigateTo(data.selectedTeam?.teamId ?? search.team, page)}
      onResetSelection={() => navigateTo(undefined)}
    />
  );
}
