import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, Gamepad2, MapPin, RotateCcw, Scale, Trophy } from "lucide-react";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import {
  AdvancedTournamentFilters,
  ResultsToolbar,
  TournamentFinder,
  type TournamentDiscoveryPatch,
} from "./tournament-discovery-controls";
import {
  FeaturedTournamentCard as FeaturedTournamentInventoryCard,
  TournamentCardSkeleton,
  TournamentDiscoveryCard as TournamentInventoryCard,
} from "./tournament-inventory-card";
import type { TournamentDiscoveryPageData, TournamentDiscoveryQuery } from "@/lib/tournament-discovery-contract";
import { formatNumber } from "@/lib/format";

type Props = {
  data: TournamentDiscoveryPageData;
  query: TournamentDiscoveryQuery;
  onUpdate: (patch: TournamentDiscoveryPatch) => void;
  onReset: () => void;
  onPageChange: (page: number) => void;
};

export function TournamentDiscoveryPage({ data, query, onUpdate, onReset, onPageChange }: Props) {
  const featured = data.featuredTournamentId
    ? data.items.find((item) => item.tournamentId === data.featuredTournamentId)
    : undefined;
  const gridItems = featured ? data.items.filter((item) => item.tournamentId !== featured.tournamentId) : data.items;

  return (
    <TournamentLayout pageOwnsMain>
      <main>
        <section className="border-b border-border bg-gradient-to-l from-primary/15 via-transparent to-secondary/5" aria-labelledby="tournaments-title">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <p className="text-sm font-bold text-primary">فهرست مسابقات حضوری</p>
            <div className="mt-2 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <h1 id="tournaments-title" className="text-3xl font-black tracking-tight md:text-4xl">تورنمنت‌ها و مسابقات گیمینگ حضوری</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                  مسابقه‌ها را بر اساس بازی، شهر، زمان، وضعیت ثبت‌نام و هزینه مقایسه کن؛ سپس برای قوانین و جزئیات کامل وارد صفحه همان مسابقه شو.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card/80 px-4 py-3 text-sm backdrop-blur-sm">
                <span className="font-mono-num text-lg font-black text-foreground">{formatNumber(data.pagination.totalItems)}</span>
                <span className="mr-2 text-muted-foreground">مسابقه مطابق جست‌وجوی فعلی</span>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-7 md:py-9" aria-label="جست‌وجو و فهرست مسابقات">
          <TournamentFinder query={query} filters={data.filters} onUpdate={onUpdate} />
          <AdvancedTournamentFilters query={query} filters={data.filters} onUpdate={onUpdate} onReset={onReset} />
          <ResultsToolbar query={query} filters={data.filters} count={data.pagination.totalItems} onUpdate={onUpdate} onReset={onReset} />

          {featured && (
            <section className="mt-6" aria-labelledby="featured-tournament-title">
              <h2 id="featured-tournament-title" className="sr-only">مسابقه منتخب این فهرست</h2>
              <FeaturedTournamentInventoryCard tournament={featured} />
            </section>
          )}

          {gridItems.length > 0 && (
            <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="نتایج مسابقات">
              {gridItems.map((tournament) => <TournamentInventoryCard key={tournament.tournamentId} tournament={tournament} />)}
            </section>
          )}

          {data.items.length === 0 && (
            <section className="mt-8 rounded-3xl border border-dashed border-border bg-card p-10 text-center md:p-14" aria-labelledby="empty-tournaments-title">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary"><Gamepad2 className="h-6 w-6" aria-hidden="true" /></div>
              <h2 id="empty-tournaments-title" className="mt-4 text-xl font-black">مسابقه‌ای با این فیلترها پیدا نشد</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">یکی از فیلترها را تغییر بده یا همه فیلترها را پاک کن تا فهرست کامل دوباره نمایش داده شود.</p>
              <button type="button" onClick={onReset} className="mt-5 min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                مشاهده همه مسابقات
              </button>
            </section>
          )}

          {data.pagination.totalPages > 1 && (
            <nav className="mt-8 flex flex-wrap items-center justify-center gap-3" aria-label="صفحه‌بندی مسابقات">
              <button
                type="button"
                disabled={data.pagination.currentPage <= 1}
                onClick={() => onPageChange(data.pagination.currentPage - 1)}
                className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-border bg-card px-4 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
                صفحه قبل
              </button>
              <span className="rounded-xl bg-muted px-4 py-2 text-sm text-muted-foreground" aria-live="polite">
                صفحه <strong className="font-mono-num text-foreground">{formatNumber(data.pagination.currentPage)}</strong> از <strong className="font-mono-num text-foreground">{formatNumber(data.pagination.totalPages)}</strong>
              </span>
              <button
                type="button"
                disabled={data.pagination.currentPage >= data.pagination.totalPages}
                onClick={() => onPageChange(data.pagination.currentPage + 1)}
                className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-border bg-card px-4 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                صفحه بعد
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
            </nav>
          )}
        </section>

        <section className="border-t border-border bg-surface/30" aria-labelledby="discovery-next-title">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl">
              <h2 id="discovery-next-title" className="text-2xl font-black">برای انتخاب دقیق‌تر، مسیر مرتبط را هم ببین</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">فهرست مسابقات برای مقایسه رقابت‌هاست؛ اطلاعات بازی، مرکز میزبان و قوانین هر کدام در صفحه تخصصی خودش کامل‌تر می‌شود.</p>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <Link to="/games" className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Gamepad2 className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-sm font-black">بازی‌های مسابقه‌ای</h3>
                <p className="mt-1 text-xs leading-6 text-muted-foreground">فهرست بازی‌ها و مسیر مسابقات هر بازی را ببین.</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">مشاهده بازی‌ها <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" /></span>
              </Link>
              <Link to="/centers" className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-sm font-black">گیم‌نت‌ها و مرکزهای میزبان</h3>
                <p className="mt-1 text-xs leading-6 text-muted-foreground">مرکزها را جداگانه بررسی کن و موقعیت میزبان را بهتر بشناس.</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">مشاهده مرکزها <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" /></span>
              </Link>
              <Link to="/rules" className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Scale className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-sm font-black">قوانین رقابت</h3>
                <p className="mt-1 text-xs leading-6 text-muted-foreground">پیش از شرکت، چارچوب عمومی رقابت را بخوان و قوانین اختصاصی هر مسابقه را در صفحه خودش بررسی کن.</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">مشاهده قوانین <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" /></span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </TournamentLayout>
  );
}

export function TournamentDiscoverySkeleton() {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-12" aria-busy="true" aria-label="در حال بارگذاری فهرست مسابقات">
        <div className="h-5 w-40 animate-pulse rounded-full bg-muted" />
        <div className="mt-5 h-12 max-w-2xl animate-pulse rounded-2xl bg-muted" />
        <div className="mt-4 h-16 max-w-xl animate-pulse rounded-2xl bg-muted" />
        <div className="mt-8 h-40 animate-pulse rounded-2xl bg-muted" />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{[0, 1, 2, 3, 4, 5].map((item) => <TournamentCardSkeleton key={item} />)}</div>
      </main>
    </TournamentLayout>
  );
}

export function TournamentDiscoveryErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-20 text-center" role="alert">
        <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 md:p-10">
          <Trophy className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-black">فهرست مسابقات فعلاً بارگذاری نشد</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">برای دریافت دوباره مسابقات و وضعیت فعلی ثبت‌نام، یک بار دیگر تلاش کن.</p>
          <button type="button" onClick={onRetry} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-black text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            تلاش دوباره
          </button>
        </div>
      </main>
    </TournamentLayout>
  );
}
