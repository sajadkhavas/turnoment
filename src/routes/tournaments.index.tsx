import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  TournamentDiscoveryErrorState,
  TournamentDiscoveryPage,
  TournamentDiscoverySkeleton,
} from "@/components/tournaments/tournament-discovery-page";
import type { TournamentDiscoveryPatch } from "@/components/tournaments/tournament-discovery-controls";
import {
  buildTournamentDiscoveryQuery,
  compactTournamentDiscoverySearch,
  hasTournamentDiscoveryFacets,
  normalizeTournamentDiscoverySearch,
  type TournamentDiscoveryQuery,
  type TournamentDiscoverySearch,
} from "@/lib/tournament-discovery-contract";
import { tournamentDiscoveryRepository } from "@/lib/tournament-discovery-repository";

const TITLE = "تورنمنت‌ها و مسابقات گیمینگ حضوری | Turnoment";
const DESCRIPTION = "تورنمنت‌ها و مسابقات گیمینگ حضوری را بر اساس بازی، شهر، زمان، وضعیت ثبت‌نام و هزینه پیدا کن و برای جزئیات کامل وارد صفحه هر مسابقه شو.";

export const Route = createFileRoute("/tournaments/")({
  ssr: true,
  validateSearch: normalizeTournamentDiscoverySearch,
  loaderDeps: ({ search }) => buildTournamentDiscoveryQuery(search),
  loader: ({ deps }) => tournamentDiscoveryRepository.getDiscovery(deps),
  head: ({ match }) => {
    const faceted = hasTournamentDiscoveryFacets(match.search as TournamentDiscoverySearch);
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
      links: [{ rel: "canonical", href: "/tournaments" }],
    };
  },
  pendingComponent: TournamentDiscoverySkeleton,
  errorComponent: ({ reset }) => <TournamentDiscoveryErrorState onRetry={reset} />,
  component: TournamentsRoute,
});

function TournamentsRoute() {
  const data = Route.useLoaderData();
  const navigate = useNavigate({ from: Route.fullPath });

  const updateSearch = (patch: TournamentDiscoveryPatch) => {
    const changesInventory = Object.keys(patch).some((key) => key !== "page");
    const next: TournamentDiscoveryQuery = {
      ...data.activeQuery,
      ...patch,
      page: changesInventory ? 1 : (patch.page ?? data.activeQuery.page),
    };
    void navigate({ search: compactTournamentDiscoverySearch(next), replace: true });
  };

  const resetSearch = () => {
    void navigate({ search: {}, replace: true });
  };

  return (
    <TournamentDiscoveryPage
      data={data}
      query={data.activeQuery}
      onUpdate={updateSearch}
      onReset={resetSearch}
      onPageChange={(page) => updateSearch({ page })}
    />
  );
}
