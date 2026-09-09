import { createFileRoute, Link, notFound, redirect, useRouter } from "@tanstack/react-router";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import {
  TournamentDetailError,
  TournamentDetailPage,
  TournamentDetailSkeleton,
} from "@/components/tournaments/tournament-detail-page";
import { tournamentDetailRepository } from "@/lib/tournament-detail-data";

export const Route = createFileRoute("/tournaments/$id")({
  ssr: true,
  loader: async ({ params }) => {
    const tournament = await tournamentDetailRepository.getByIdentifier(params.id);
    if (!tournament) throw notFound();
    if (params.id !== tournament.slug) {
      throw redirect({
        to: "/tournaments/$id",
        params: { id: tournament.slug },
        replace: true,
      });
    }
    return { tournament };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "مسابقه پیدا نشد | ایران مهر افزار" },
          { name: "robots", content: "noindex,nofollow" },
        ],
      };
    }

    const { tournament } = loaderData;
    const title = `${tournament.title} | مسابقات ایران مهر افزار`;
    const description = `${tournament.description} ${tournament.schedule.displayDate} ساعت ${tournament.schedule.displayTime}.`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/tournaments/${tournament.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/tournaments/${tournament.slug}` }],
    };
  },
  pendingComponent: TournamentDetailPending,
  errorComponent: TournamentDetailRouteError,
  notFoundComponent: TournamentNotFound,
  component: TournamentDetailRoute,
});

function TournamentDetailRoute() {
  const { tournament } = Route.useLoaderData();
  return (
    <TournamentLayout pageOwnsMain>
      <TournamentDetailPage tournament={tournament} />
    </TournamentLayout>
  );
}

function TournamentDetailPending() {
  return (
    <TournamentLayout pageOwnsMain>
      <TournamentDetailSkeleton />
    </TournamentLayout>
  );
}

function TournamentDetailRouteError() {
  const router = useRouter();
  return (
    <TournamentLayout pageOwnsMain>
      <TournamentDetailError retry={() => void router.invalidate()} />
    </TournamentLayout>
  );
}

function TournamentNotFound() {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black">این مسابقه پیدا نشد</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
          ممکن است آدرس تغییر کرده باشد یا این مسابقه دیگر در فهرست عمومی نباشد.
        </p>
        <Link
          to="/tournaments"
          className="mt-6 inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground"
        >
          مشاهده مسابقات
        </Link>
      </main>
    </TournamentLayout>
  );
}
