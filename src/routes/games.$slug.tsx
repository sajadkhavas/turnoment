import { createFileRoute, Link, notFound, redirect, useRouter } from "@tanstack/react-router";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import {
  GameDetailError,
  GameDetailPage,
  GameDetailSkeleton,
} from "@/components/games/game-detail-page";
import { gameDetailRepository } from "@/lib/game-detail-data";

export const Route = createFileRoute("/games/$slug")({
  ssr: true,
  loader: async ({ params }) => {
    const game = await gameDetailRepository.getByIdentifier(params.slug);
    if (!game) throw notFound();
    if (params.slug !== game.slug) {
      throw redirect({
        to: "/games/$slug",
        params: { slug: game.slug },
        replace: true,
      });
    }
    return { game };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "بازی پیدا نشد | ایران مهر افزار" },
          { name: "robots", content: "noindex,nofollow" },
        ],
      };
    }

    const { game } = loaderData;
    const robots = game.publicationState === "published" ? "index,follow" : "noindex,follow";

    return {
      meta: [
        { title: game.seo.title },
        { name: "description", content: game.seo.description },
        { name: "robots", content: robots },
        { property: "og:title", content: game.seo.title },
        { property: "og:description", content: game.seo.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/games/${game.slug}` },
        ...(game.heroImage ? [{ property: "og:image", content: game.heroImage }] : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/games/${game.slug}` }],
    };
  },
  pendingComponent: GameDetailPending,
  errorComponent: GameDetailRouteError,
  notFoundComponent: GameNotFound,
  component: GameDetailRoute,
});

function GameDetailRoute() {
  const { game } = Route.useLoaderData();
  return (
    <TournamentLayout pageOwnsMain>
      <GameDetailPage game={game} />
    </TournamentLayout>
  );
}

function GameDetailPending() {
  return (
    <TournamentLayout pageOwnsMain>
      <GameDetailSkeleton />
    </TournamentLayout>
  );
}

function GameDetailRouteError() {
  const router = useRouter();
  return (
    <TournamentLayout pageOwnsMain>
      <GameDetailError retry={() => void router.invalidate()} />
    </TournamentLayout>
  );
}

function GameNotFound() {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black">این بازی پیدا نشد</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
          ممکن است آدرس تغییر کرده باشد یا این بازی در فهرست عمومی ترنومنت نباشد.
        </p>
        <Link
          to="/games"
          className="mt-6 inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          مشاهده بازی‌ها
        </Link>
      </main>
    </TournamentLayout>
  );
}
