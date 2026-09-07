import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import {
  AdvancedTournamentFilters,
  ResultsToolbar,
  TournamentFinder,
  type DiscoverySearch,
} from "@/components/tournaments/tournament-discovery-controls";
import {
  FeaturedTournamentCard,
  TournamentCardSkeleton,
  TournamentDiscoveryCard,
} from "@/components/tournaments/tournament-discovery-card";
import { formatNumber } from "@/lib/format";
import { tournamentRepository } from "@/lib/repositories/tournaments";
import {
  compactTournamentSearch,
  parseTournamentSearch,
  toTournamentQuery,
} from "@/lib/routing/tournament-search";
import { publicSeoHead } from "@/lib/seo";

const TITLE = "مسابقات گیمینگ حضوری | ایران مهر افزار";
const DESCRIPTION = "مسابقات حضوری EA FC، Tekken، eFootball، CS2 و دیگر بازی‌ها را بر اساس شهر، تاریخ و گیم‌نت پیدا کنید.";

export const Route = createFileRoute("/tournaments/")({
  validateSearch: parseTournamentSearch,
  loaderDeps: ({ search }) => toTournamentQuery(search),
  loader: ({ deps }) => tournamentRepository.list(deps),
  head: () => publicSeoHead({
    title: TITLE,
    description: DESCRIPTION,
    canonical: "/tournaments",
  }),
  pendingComponent: TournamentDiscoveryPending,
  component: TournamentsPage,
});

function TournamentsPage() {
  const search = Route.useSearch();
  const { items: results, stats, facets } = Route.useLoaderData();
  const navigate = useNavigate({ from: Route.fullPath });
  const query = toTournamentQuery(search);
  const featured = results.find((t) => t.status === "filling") ?? results.find((t) => t.status === "open") ?? results[0];
  const gridResults = featured ? results.filter((t) => t.id !== featured.id) : results;

  const updateSearch = (patch: Partial<DiscoverySearch>) => {
    const next = compactTournamentSearch({ ...search, ...patch });
    void navigate({ search: next, replace: true });
  };

  const resetSearch = () => {
    void navigate({ search: {}, replace: true });
  };

  return (
    <TournamentLayout>
      <section className="border-b border-border bg-gradient-to-l from-primary/15 via-transparent to-secondary/5">
        <div className="container mx-auto px-4 py-10 md:py-12">
          <p className="text-sm font-bold text-primary">رقابت بعدیت رو پیدا کن</p>
          <div className="mt-2 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <h1 className="text-3xl font-black md:text-4xl">مسابقات گیمینگ</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                مسابقات حضوری بازی‌های محبوب را در گیم‌نت‌های معتبر پیدا کن و وارد رقابت شو.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <Stat value={stats.tournaments} label="مسابقه" />
              <Stat value={stats.centers} label="گیم‌نت فعال" />
              <Stat value={stats.cities} label="شهر" />
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-7 md:py-9">
        <TournamentFinder query={query} facets={facets} onUpdate={updateSearch} />
        <AdvancedTournamentFilters query={query} facets={facets} onUpdate={updateSearch} onReset={resetSearch} />
        <ResultsToolbar query={query} facets={facets} count={results.length} onUpdate={updateSearch} onReset={resetSearch} />

        {featured && (
          <div className="mt-6">
            <FeaturedTournamentCard t={featured} />
          </div>
        )}

        {gridResults.length > 0 && (
          <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="لیست مسابقات">
            {gridResults.map((t) => <TournamentDiscoveryCard key={t.id} t={t} />)}
          </section>
        )}

        {results.length === 0 && (
          <section className="mt-8 rounded-3xl border border-dashed border-border bg-card p-10 text-center md:p-14">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-2xl">🎮</div>
            <h2 className="mt-4 text-xl font-black">مسابقه‌ای پیدا نشد</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">فیلترها را تغییر بده یا بازی و شهر دیگری را امتحان کن.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <button type="button" onClick={resetSearch} className="h-11 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground">پاک کردن فیلترها</button>
              <button type="button" onClick={resetSearch} className="h-11 rounded-xl border border-border bg-background px-5 text-sm font-bold">مشاهده همه مسابقات</button>
            </div>
          </section>
        )}
      </main>
    </TournamentLayout>
  );
}

function TournamentDiscoveryPending() {
  return (
    <TournamentLayout>
      <main className="container mx-auto px-4 py-10" aria-busy="true" aria-label="در حال بارگذاری مسابقات">
        <div className="h-8 w-52 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-4 w-full max-w-xl animate-pulse rounded bg-muted" />
        <div className="mt-8 h-28 animate-pulse rounded-2xl border border-border bg-card" />
        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => <TournamentCardSkeleton key={index} />)}
        </div>
      </main>
    </TournamentLayout>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/80 px-3 py-2 backdrop-blur-sm">
      <span className="font-mono-num font-black text-foreground">{formatNumber(value)}</span>
      <span className="mr-1.5 text-muted-foreground">{label}</span>
    </div>
  );
}
