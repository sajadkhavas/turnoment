import { createFileRoute } from "@tanstack/react-router";
import {
  GameCatalogErrorState,
  GameCatalogPage,
  GameCatalogSkeleton,
} from "@/components/games/game-catalog-page";
import { gameCatalogRepository } from "@/lib/game-catalog-repository";

const TITLE = "بازی‌های مسابقات گیمینگ حضوری | Turnoment";
const DESCRIPTION = "فهرست بازی‌های رقابتی Turnoment را ببین و برای هر بازی، مسابقات حضوری، فرمت‌های رقابت و مسیرهای مرتبط را بررسی کن.";

export const Route = createFileRoute("/games/")({
  ssr: true,
  loader: () => gameCatalogRepository.getCatalog(),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/games" }],
  }),
  pendingComponent: GameCatalogSkeleton,
  errorComponent: ({ reset }) => <GameCatalogErrorState onRetry={reset} />,
  component: GamesRoute,
});

function GamesRoute() {
  const data = Route.useLoaderData();
  return <GameCatalogPage data={data} />;
}
