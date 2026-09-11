import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Monitor,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import type {
  GamingCenterDiscoveryItem,
  GamingCenterDiscoveryPageData,
  GamingCenterDiscoveryQuery,
} from "@/lib/gaming-center-discovery-contract";
import { formatNumber } from "@/lib/format";

function upcomingCopy(center: GamingCenterDiscoveryItem) {
  if (center.upcomingTournamentCount === null) return "مسابقات این مرکز را بررسی کن";
  if (center.upcomingTournamentCount === 0) return "فعلاً مسابقه‌ای در فهرست نیست";
  return `${formatNumber(center.upcomingTournamentCount)} مسابقه پیش‌رو`;
}

function GamingCenterDiscoveryCard({ center }: { center: GamingCenterDiscoveryItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/60">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {center.coverImage ? (
          <img
            src={center.coverImage}
            alt={`نمای ${center.name}`}
            loading="lazy"
            width={768}
            height={480}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full place-items-center text-muted-foreground" aria-hidden="true">
            <Building2 className="h-10 w-10" />
          </div>
        )}
        {center.verified && (
          <span className="absolute start-3 top-3 inline-flex items-center gap-1 rounded-full border border-secondary/40 bg-background/90 px-3 py-1.5 text-xs font-bold text-secondary backdrop-blur-sm">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            مرکز تأییدشده
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-xl font-black tracking-tight">{center.name}</h2>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span>{center.city.name}، {center.district}</span>
        </p>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{center.summary}</p>

        {center.equipmentLabels.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={`امکانات ${center.name}`}>
            {center.equipmentLabels.map((equipment) => (
              <li key={equipment} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-bold text-muted-foreground">
                <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
                {equipment}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-5 text-xs font-bold text-secondary">{upcomingCopy(center)}</p>

        <div className="mt-auto flex flex-wrap gap-3 pt-5">
          <Link
            to="/centers/$id"
            params={{ id: center.publicId }}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-black text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            مشاهده مرکز
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/tournaments"
            search={{ city: center.city.slug }}
            className="inline-flex min-h-11 items-center rounded-xl border border-border bg-background px-4 text-sm font-bold transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            مسابقات این شهر
          </Link>
        </div>
      </div>
    </article>
  );
}

interface GamingCenterDiscoveryPageProps {
  data: GamingCenterDiscoveryPageData;
  query: GamingCenterDiscoveryQuery;
  onCityChange: (city?: string) => void;
  onPageChange: (page: number) => void;
  onReset: () => void;
}

export function GamingCenterDiscoveryPage({
  data,
  query,
  onCityChange,
  onPageChange,
  onReset,
}: GamingCenterDiscoveryPageProps) {
  return (
    <TournamentLayout pageOwnsMain>
      <main>
        <section className="border-b border-border bg-gradient-to-l from-primary/15 via-transparent to-secondary/5" aria-labelledby="centers-title">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <p className="text-sm font-bold text-primary">پیدا کردن مرکز میزبان</p>
            <div className="mt-2 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <h1 id="centers-title" className="max-w-3xl text-3xl font-black tracking-tight md:text-4xl">
                  گیم‌نت‌ها و مراکز گیمینگ میزبان مسابقات
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                  مرکزهای گیمینگ را بر اساس شهر پیدا کن، امکانات و وضعیت تأیید هر مرکز را ببین و از همان‌جا به مسیر مسابقات حضوری برو.
                </p>
              </div>
              <Link
                to="/host"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-card px-5 text-sm font-black transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                ثبت مرکز برای میزبانی
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 md:py-10" aria-labelledby="center-directory-title">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-2xl">
              <h2 id="center-directory-title" className="text-2xl font-black">مرکزهای گیمینگ را بر اساس شهر پیدا کن</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                موقعیت و امکانات هر مرکز را مقایسه کن و برای جزئیات بیشتر وارد صفحه همان مرکز شو.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card px-4 py-3 text-sm">
              <span className="font-mono-num text-lg font-black">{formatNumber(data.pagination.totalItems)}</span>
              <span className="mr-2 text-muted-foreground">مرکز در این فهرست</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" aria-label="فیلتر شهر">
            <button
              type="button"
              onClick={() => onCityChange(undefined)}
              aria-pressed={!query.city}
              className="min-h-11 rounded-xl border border-border bg-card px-4 text-sm font-bold transition-colors aria-pressed:border-primary aria-pressed:bg-primary/10 aria-pressed:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              همه شهرها
            </button>
            {data.filters.cities.map((city) => (
              <button
                key={city.cityId}
                type="button"
                onClick={() => onCityChange(city.slug)}
                aria-pressed={query.city === city.slug}
                className="min-h-11 rounded-xl border border-border bg-card px-4 text-sm font-bold transition-colors aria-pressed:border-primary aria-pressed:bg-primary/10 aria-pressed:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {city.name} <span className="font-mono-num text-xs text-muted-foreground">({formatNumber(city.count)})</span>
              </button>
            ))}
          </div>

          {data.items.length > 0 ? (
            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {data.items.map((center) => <GamingCenterDiscoveryCard key={center.centerId} center={center} />)}
            </div>
          ) : (
            <section className="mt-8 rounded-3xl border border-dashed border-border bg-card p-10 text-center md:p-14" aria-labelledby="empty-centers-title">
              <MapPin className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
              <h2 id="empty-centers-title" className="mt-4 text-xl font-black">مرکزی با این انتخاب پیدا نشد</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">
                فیلتر شهر را پاک کن تا همه مرکزهای موجود در فهرست را دوباره ببینی.
              </p>
              <button
                type="button"
                onClick={onReset}
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-black text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                نمایش همه مرکزها
              </button>
            </section>
          )}

          {data.pagination.totalPages > 1 && (
            <nav className="mt-8 flex items-center justify-center gap-3" aria-label="صفحه‌بندی مرکزهای گیمینگ">
              <button
                type="button"
                onClick={() => onPageChange(data.pagination.currentPage - 1)}
                disabled={data.pagination.currentPage <= 1}
                className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-border bg-card px-4 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
                قبلی
              </button>
              <span className="text-sm text-muted-foreground">
                صفحه <strong className="font-mono-num text-foreground">{formatNumber(data.pagination.currentPage)}</strong> از <strong className="font-mono-num text-foreground">{formatNumber(data.pagination.totalPages)}</strong>
              </span>
              <button
                type="button"
                onClick={() => onPageChange(data.pagination.currentPage + 1)}
                disabled={data.pagination.currentPage >= data.pagination.totalPages}
                className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-border bg-card px-4 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                بعدی
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
            </nav>
          )}
        </section>

        <section className="border-t border-border bg-surface/30" aria-labelledby="centers-next-title">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl">
              <h2 id="centers-next-title" className="text-2xl font-black">مسیر رقابت را از مرکز میزبان ادامه بده</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                برای پیدا کردن رقابت مناسب یا شناخت بازی‌های پشتیبانی‌شده، از فهرست تخصصی همان بخش استفاده کن.
              </p>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <Link to="/tournaments" className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Trophy className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-sm font-black">تورنمنت‌ها و مسابقات</h3>
                <p className="mt-1 text-xs leading-6 text-muted-foreground">مسابقات حضوری را بر اساس بازی، شهر، زمان و وضعیت ثبت‌نام پیدا کن.</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">مشاهده مسابقات <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" /></span>
              </Link>
              <Link to="/games" className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Monitor className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-sm font-black">بازی‌های رقابتی</h3>
                <p className="mt-1 text-xs leading-6 text-muted-foreground">بازی‌های موجود در Turnoment را ببین و وارد مسیر رقابتی هر عنوان شو.</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">مشاهده بازی‌ها <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" /></span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </TournamentLayout>
  );
}

export function GamingCenterDiscoverySkeleton() {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-12" aria-busy="true" aria-label="در حال بارگذاری مرکزهای گیمینگ">
        <div className="h-5 w-40 animate-pulse rounded-full bg-muted" />
        <div className="mt-5 h-12 max-w-2xl animate-pulse rounded-2xl bg-muted" />
        <div className="mt-4 h-16 max-w-2xl animate-pulse rounded-2xl bg-muted" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="overflow-hidden rounded-3xl border border-border bg-card">
              <div className="aspect-[16/10] animate-pulse bg-muted" />
              <div className="space-y-3 p-5">
                <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
                <div className="h-16 animate-pulse rounded bg-muted" />
                <div className="h-10 w-2/3 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </TournamentLayout>
  );
}

export function GamingCenterDiscoveryErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-20 text-center" role="alert">
        <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 md:p-10">
          <MapPin className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-black">فهرست مرکزهای گیمینگ فعلاً بارگذاری نشد</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">برای دریافت دوباره فهرست مرکزها، یک بار دیگر تلاش کن.</p>
          <button type="button" onClick={onRetry} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-black text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            تلاش دوباره
          </button>
        </div>
      </main>
    </TournamentLayout>
  );
}
