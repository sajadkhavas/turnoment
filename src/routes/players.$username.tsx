import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import {
  PublicPlayerProfileErrorState,
  PublicPlayerProfilePage,
  PublicPlayerProfileSkeleton,
} from "@/components/players/public-player-profile-page";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import { parsePublicPlayerUsername } from "@/lib/public-player-profile-contract";
import { publicPlayerProfileRepository } from "@/lib/public-player-profile-repository";

function playerTitle(gamerTag: string) {
  return `${gamerTag} | پروفایل بازیکن Turnoment`;
}

function playerDescription(gamerTag: string) {
  return `پروفایل ${gamerTag} در Turnoment؛ رتبه، امتیاز و نتایج رقابتی منتشرشده این بازیکن را ببین.`;
}

const unavailableTitle = "پروفایل بازیکن در دسترس نیست | Turnoment";
const unavailableDescription = "این پروفایل عمومی در Turnoment در دسترس نیست. رتبه‌بندی بازیکنان را برای دیدن پروفایل‌های منتشرشده بررسی کن.";

export const Route = createFileRoute("/players/$username")({
  ssr: true,
  loader: async ({ params }) => {
    const username = parsePublicPlayerUsername(params.username);
    if (!username) throw notFound();

    const result = await publicPlayerProfileRepository.getByUsername(username);
    if (result.state === "not_found") throw notFound();
    return { profile: result.profile };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: unavailableTitle },
          { name: "description", content: unavailableDescription },
          { name: "robots", content: "noindex,nofollow" },
          { property: "og:title", content: unavailableTitle },
          { property: "og:description", content: unavailableDescription },
          { property: "og:type", content: "website" },
          { property: "og:site_name", content: "Turnoment" },
          { name: "twitter:card", content: "summary" },
        ],
      };
    }

    const { profile } = loaderData;
    const title = playerTitle(profile.gamerTag);
    const description = playerDescription(profile.gamerTag);
    const canonical = `/players/${profile.username}`;
    const robots = profile.searchVisibility === "indexable" ? "index,follow" : "noindex,follow";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: robots },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Turnoment" },
        { property: "og:url", content: canonical },
        ...(profile.avatarUrl ? [{ property: "og:image", content: profile.avatarUrl }] : []),
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  pendingComponent: PublicPlayerProfileSkeleton,
  errorComponent: PublicPlayerProfileRouteError,
  notFoundComponent: PublicPlayerProfileNotFound,
  component: PublicPlayerProfileRoute,
});

function PublicPlayerProfileRoute() {
  const { profile } = Route.useLoaderData();
  return <PublicPlayerProfilePage profile={profile} />;
}

function PublicPlayerProfileRouteError() {
  const router = useRouter();
  return <PublicPlayerProfileErrorState onRetry={() => void router.invalidate()} />;
}

function PublicPlayerProfileNotFound() {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-24 text-center">
        <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-7 sm:p-9">
          <h1 className="text-2xl font-black">این پروفایل در دسترس نیست</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            ممکن است آدرس درست نباشد یا این بازیکن پروفایل عمومی منتشرشده‌ای نداشته باشد.
          </p>
          <Link
            to="/ranking"
            className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            مشاهده رتبه‌بندی بازیکنان
          </Link>
        </div>
      </main>
    </TournamentLayout>
  );
}
