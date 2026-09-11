import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { ChallengeHubErrorState, ChallengeHubPage, ChallengeHubSkeleton } from "@/components/dashboard/challenge-hub-page";
import { challengeHubFilters, type ChallengeHubFilter, type ChallengeHubQuery } from "@/lib/challenge-hub-data";
import { ChallengeHubHttpError } from "@/lib/challenge-hub-http-repository";
import { challengeHubRepository } from "@/lib/challenge-hub-repository";

interface ChallengeHubSearch {
  status?: Exclude<ChallengeHubFilter, "all">;
  page?: number;
}

const statusSet = new Set<string>(challengeHubFilters.filter((status) => status !== "all"));

function positivePage(value: unknown): number | undefined {
  const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;
  return Number.isInteger(parsed) && parsed > 1 ? parsed : undefined;
}

function toQuery(search: ChallengeHubSearch): ChallengeHubQuery {
  return { status: search.status ?? "all", page: search.page ?? 1 };
}

function compactSearch(status: ChallengeHubFilter, page = 1): ChallengeHubSearch {
  return { status: status === "all" ? undefined : status, page: page > 1 ? page : undefined };
}

export const Route = createFileRoute("/dashboard/challenges")({
  validateSearch: (search: Record<string, unknown>): ChallengeHubSearch => ({
    status: typeof search.status === "string" && statusSet.has(search.status) ? search.status as Exclude<ChallengeHubFilter, "all"> : undefined,
    page: positivePage(search.page),
  }),
  loaderDeps: ({ search }) => toQuery(search),
  loader: async ({ deps }) => {
    try {
      return await challengeHubRepository.getChallengeHub(deps);
    } catch (error) {
      if (error instanceof ChallengeHubHttpError && error.status === 401) throw redirect({ to: "/login" });
      throw error;
    }
  },
  head: () => ({ meta: [{ title: "چالش‌های من — داشبورد بازیکن" }, { name: "description", content: "مدیریت دعوت‌ها، رقابت‌های فعال و سابقه چالش‌های بازیکن." }, { property: "og:title", content: "چالش‌های من — داشبورد بازیکن" }, { property: "og:description", content: "مدیریت دعوت‌ها، رقابت‌های فعال و سابقه چالش‌های بازیکن." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex,nofollow" }] }),
  pendingComponent: ChallengeHubSkeleton,
  errorComponent: ChallengeHubErrorState,
  component: ChallengeHubRoute,
});

function ChallengeHubRoute() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const filter = search.status ?? "all";

  const navigateTo = (status: ChallengeHubFilter, page = 1) => {
    void navigate({ search: compactSearch(status, page) });
  };

  return <ChallengeHubPage data={data} filter={filter} onFilterChange={(status) => navigateTo(status)} onPageChange={(page) => navigateTo(filter, page)} />;
}
