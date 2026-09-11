import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import {
  GamingCenterDetailErrorState,
  GamingCenterDetailPage,
  GamingCenterDetailSkeleton,
} from "@/components/centers/gaming-center-detail-page";
import {
  buildGamingCenterLocalBusinessJsonLd,
  parseGamingCenterPublicId,
} from "@/lib/gaming-center-detail-contract";
import { gamingCenterDetailRepository } from "@/lib/gaming-center-detail-repository";
import { TournamentLayout } from "@/components/tournament/tournament-layout";

function centerTitle(name: string, city: string) {
  return `${name} | گیم‌نت و مرکز گیمینگ در ${city} | Turnoment`;
}

function centerDescription(name: string, city: string, district: string) {
  return `${name} در ${city}، ${district}؛ امکانات مرکز، وضعیت تأیید و مسابقات حضوری پیش‌رو را در Turnoment ببین.`;
}

export const Route = createFileRoute("/centers/$id")({
  ssr: true,
  loader: async ({ params }) => {
    const publicId = parseGamingCenterPublicId(params.id);
    if (!publicId) throw notFound();

    const center = await gamingCenterDetailRepository.getByPublicId(publicId);
    if (!center) throw notFound();
    return { center };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "مرکز گیمینگ پیدا نشد | Turnoment" },
          { name: "robots", content: "noindex,nofollow" },
        ],
      };
    }

    const { center } = loaderData;
    const title = centerTitle(center.name, center.city.name);
    const description = centerDescription(center.name, center.city.name, center.district);
    const canonical = `/centers/${center.publicId}`;
    const localBusiness = buildGamingCenterLocalBusinessJsonLd(center);

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
        ...(center.coverImage ? [{ property: "og:image", content: center.coverImage }] : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: localBusiness
        ? [{ type: "application/ld+json", children: JSON.stringify(localBusiness) }]
        : [],
    };
  },
  pendingComponent: GamingCenterDetailSkeleton,
  errorComponent: GamingCenterDetailRouteError,
  notFoundComponent: GamingCenterNotFound,
  component: GamingCenterDetailRoute,
});

function GamingCenterDetailRoute() {
  const { center } = Route.useLoaderData();
  return <GamingCenterDetailPage center={center} />;
}

function GamingCenterDetailRouteError() {
  const router = useRouter();
  return <GamingCenterDetailErrorState onRetry={() => void router.invalidate()} />;
}

function GamingCenterNotFound() {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black">این مرکز گیمینگ پیدا نشد</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
          ممکن است آدرس این صفحه تغییر کرده باشد یا این مرکز دیگر در فهرست عمومی نباشد.
        </p>
        <Link
          to="/centers"
          className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          مشاهده مرکزهای گیمینگ
        </Link>
      </main>
    </TournamentLayout>
  );
}
