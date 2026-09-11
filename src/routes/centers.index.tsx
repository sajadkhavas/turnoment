import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  GamingCenterDiscoveryErrorState,
  GamingCenterDiscoveryPage,
  GamingCenterDiscoverySkeleton,
} from "@/components/centers/gaming-center-discovery-page";
import {
  buildGamingCenterDiscoveryQuery,
  compactGamingCenterDiscoverySearch,
  hasGamingCenterDiscoveryFacets,
  normalizeGamingCenterDiscoverySearch,
  type GamingCenterDiscoverySearch,
} from "@/lib/gaming-center-discovery-contract";
import { gamingCenterDiscoveryRepository } from "@/lib/gaming-center-discovery-repository";

const TITLE = "گیم‌نت‌ها و مراکز گیمینگ میزبان مسابقات | Turnoment";
const DESCRIPTION = "گیم‌نت‌ها و مراکز گیمینگ میزبان مسابقات را بر اساس شهر پیدا کن، امکانات و وضعیت تأیید هر مرکز را ببین و مسیر مسابقات حضوری را دنبال کن.";

export const Route = createFileRoute("/centers/")({
  ssr: true,
  validateSearch: normalizeGamingCenterDiscoverySearch,
  loaderDeps: ({ search }) => buildGamingCenterDiscoveryQuery(search),
  loader: ({ deps }) => gamingCenterDiscoveryRepository.getDiscovery(deps),
  head: ({ match }) => {
    const faceted = hasGamingCenterDiscoveryFacets(match.search as GamingCenterDiscoverySearch);
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
      links: [{ rel: "canonical", href: "/centers" }],
    };
  },
  pendingComponent: GamingCenterDiscoverySkeleton,
  errorComponent: ({ reset }) => <GamingCenterDiscoveryErrorState onRetry={reset} />,
  component: CentersRoute,
});

function CentersRoute() {
  const data = Route.useLoaderData();
  const navigate = useNavigate({ from: Route.fullPath });

  const changeCity = (city?: string) => {
    void navigate({
      search: compactGamingCenterDiscoverySearch({ city, page: 1 }),
      replace: true,
    });
  };

  const changePage = (page: number) => {
    void navigate({
      search: compactGamingCenterDiscoverySearch({
        city: data.activeQuery.city,
        page: Math.max(1, page),
      }),
      replace: true,
    });
  };

  const resetSearch = () => {
    void navigate({ search: {}, replace: true });
  };

  return (
    <GamingCenterDiscoveryPage
      data={data}
      query={data.activeQuery}
      onCityChange={changeCity}
      onPageChange={changePage}
      onReset={resetSearch}
    />
  );
}
