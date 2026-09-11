import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import {
  PlayerAchievementsErrorState,
  PlayerAchievementsPage,
  PlayerAchievementsSkeleton,
} from "@/components/dashboard/player-achievements-page";
import {
  achievementSortModes,
  achievementStatusFilters,
  type AchievementSortMode,
  type AchievementStatusFilter,
  type PlayerAchievementsQuery,
} from "@/lib/player-achievements-contract";
import { playerAchievementsRepository } from "@/lib/player-achievements-repository";

interface AchievementsSearch {
  status?: Exclude<AchievementStatusFilter, "all">;
  category?: string;
  sort?: Exclude<AchievementSortMode, "default">;
  page?: number;
}

const statusSet = new Set<string>(achievementStatusFilters.filter((status) => status !== "all"));
const sortSet = new Set<string>(achievementSortModes.filter((sort) => sort !== "default"));
const stableIdPattern = /^[A-Za-z0-9_-]{1,128}$/;

function positivePage(value: unknown): number | undefined {
  const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;
  return Number.isInteger(parsed) && parsed > 1 ? parsed : undefined;
}

function validStableId(value: unknown): string | undefined {
  return typeof value === "string" && stableIdPattern.test(value) ? value : undefined;
}

function toQuery(search: AchievementsSearch): PlayerAchievementsQuery {
  return {
    status: search.status ?? "all",
    categoryId: search.category,
    sort: search.sort ?? "default",
    page: search.page ?? 1,
  };
}

function compactSearch(
  status: AchievementStatusFilter,
  categoryId: string | undefined,
  sort: AchievementSortMode,
  page = 1,
): AchievementsSearch {
  return {
    status: status === "all" ? undefined : status,
    category: categoryId,
    sort: sort === "default" ? undefined : sort,
    page: page > 1 ? page : undefined,
  };
}

export const Route = createFileRoute("/dashboard/achievements")({
  validateSearch: (search: Record<string, unknown>): AchievementsSearch => ({
    status:
      typeof search.status === "string" && statusSet.has(search.status)
        ? (search.status as Exclude<AchievementStatusFilter, "all">)
        : undefined,
    category: validStableId(search.category),
    sort:
      typeof search.sort === "string" && sortSet.has(search.sort)
        ? (search.sort as Exclude<AchievementSortMode, "default">)
        : undefined,
    page: positivePage(search.page),
  }),
  loaderDeps: ({ search }) => toQuery(search),
  loader: async ({ deps }) => {
    const result = await playerAchievementsRepository.getAchievements(deps);
    if (result.state !== "authenticated") {
      throw redirect({
        to: "/login",
        search: { redirect: "/dashboard/achievements" },
      });
    }
    return result.data;
  },
  head: () => ({
    meta: [
      { title: "دستاوردهای من — داشبورد بازیکن" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  pendingComponent: PlayerAchievementsSkeleton,
  errorComponent: PlayerAchievementsErrorState,
  component: PlayerAchievementsRoute,
});

function PlayerAchievementsRoute() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const status = search.status ?? "all";
  const sort = search.sort ?? "default";

  const navigateTo = (
    nextStatus: AchievementStatusFilter,
    categoryId: string | undefined,
    nextSort: AchievementSortMode,
    page = 1,
  ) => {
    void navigate({ search: compactSearch(nextStatus, categoryId, nextSort, page) });
  };

  return (
    <PlayerAchievementsPage
      data={data}
      status={status}
      categoryId={search.category}
      sort={sort}
      onStatusChange={(nextStatus) => navigateTo(nextStatus, search.category, sort)}
      onCategoryChange={(categoryId) => navigateTo(status, categoryId, sort)}
      onSortChange={(nextSort) => navigateTo(status, search.category, nextSort)}
      onPageChange={(page) => navigateTo(status, search.category, sort, page)}
      onResetFilters={() => navigateTo("all", undefined, sort)}
    />
  );
}
