import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  PlayerRankingErrorState,
  PlayerRankingPage,
  PlayerRankingSkeleton,
} from "@/components/ranking/player-ranking-page";
import {
  buildPlayerRankingQuery,
  compactPlayerRankingSearch,
  hasPlayerRankingFacets,
  normalizePlayerRankingSearch,
  type PlayerRankingQuery,
  type PlayerRankingSearch,
  type PlayerRankingType,
} from "@/lib/player-ranking-contract";
import { playerRankingRepository } from "@/lib/player-ranking-repository";

const TITLE = "رتبه‌بندی بازیکنان مسابقات | Turnoment";
const DESCRIPTION = "جدول رتبه‌بندی بازیکنان Turnoment را بر اساس بازی، نوع امتیاز، فصل و محدوده ببین و جایگاه، امتیاز و روند رقابتی هر بازیکن را مقایسه کن.";

export const Route = createFileRoute("/ranking")({
  ssr: true,
  validateSearch: normalizePlayerRankingSearch,
  loaderDeps: ({ search }) => buildPlayerRankingQuery(search),
  loader: ({ deps }) => playerRankingRepository.getRanking(deps),
  head: ({ match }) => {
    const faceted = hasPlayerRankingFacets(match.search as PlayerRankingSearch);
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { name: "robots", content: faceted ? "noindex,follow" : "index,follow" },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/ranking" }],
    };
  },
  pendingComponent: PlayerRankingSkeleton,
  errorComponent: ({ reset }) => <PlayerRankingErrorState onRetry={reset} />,
  component: RankingRoute,
});

function RankingRoute() {
  const data = Route.useLoaderData();
  const navigate = useNavigate({ from: Route.fullPath });

  const changeFilters = (patch: Partial<Pick<PlayerRankingQuery, "game" | "season" | "region" | "type">>) => {
    void navigate({
      search: compactPlayerRankingSearch({
        ...data.activeQuery,
        ...patch,
        page: 1,
      }),
      replace: true,
    });
  };

  const changePage = (page: number) => {
    void navigate({
      search: compactPlayerRankingSearch({
        ...data.activeQuery,
        page: Math.max(1, page),
      }),
      replace: true,
    });
  };

  return (
    <PlayerRankingPage
      data={data}
      onGameChange={(game) => changeFilters({ game })}
      onSeasonChange={(season) => changeFilters({ season })}
      onRegionChange={(region) => changeFilters({ region })}
      onTypeChange={(type: PlayerRankingType) => changeFilters({ type })}
      onPageChange={changePage}
      onReset={() => void navigate({ search: {}, replace: true })}
    />
  );
}
