import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Minus,
  RotateCcw,
  Trophy,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import type {
  PlayerRankingItem,
  PlayerRankingPageData,
  PlayerRankingType,
} from "@/lib/player-ranking-contract";
import { formatNumber } from "@/lib/format";

function ratingLabel(type: PlayerRankingType) {
  return type === "challenge" ? "امتیاز چالش" : "امتیاز مسابقات";
}

function movementLabel(player: PlayerRankingItem) {
  if (player.movement.direction === "flat") return "بدون تغییر";
  const direction = player.movement.direction === "up" ? "صعود" : "نزول";
  return `${direction} ${formatNumber(player.movement.positions)} رتبه`;
}

function Movement({ player }: { player: PlayerRankingItem }) {
  const label = movementLabel(player);
  if (player.movement.direction === "up") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-success" aria-label={label}>
        <TrendingUp className="h-4 w-4" aria-hidden="true" />
        {label}
      </span>
    );
  }
  if (player.movement.direction === "down") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-destructive" aria-label={label}>
        <TrendingDown className="h-4 w-4" aria-hidden="true" />
        {label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground" aria-label={label}>
      <Minus className="h-4 w-4" aria-hidden="true" />
      {label}
    </span>
  );
}

function MatchRecord({ player }: { player: PlayerRankingItem }) {
  return (
    <span className="font-mono-num text-xs text-muted-foreground">
      {formatNumber(player.wins)} برد · {formatNumber(player.losses)} باخت
      {player.draws > 0 ? ` · ${formatNumber(player.draws)} مساوی` : ""}
    </span>
  );
}

interface PlayerRankingPageProps {
  data: PlayerRankingPageData;
  onGameChange: (game: string) => void;
  onSeasonChange: (season: string) => void;
  onRegionChange: (region?: string) => void;
  onTypeChange: (type: PlayerRankingType) => void;
  onPageChange: (page: number) => void;
  onReset: () => void;
}

export function PlayerRankingPage({
  data,
  onGameChange,
  onSeasonChange,
  onRegionChange,
  onTypeChange,
  onPageChange,
  onReset,
}: PlayerRankingPageProps) {
  const activeGame = data.filters.games.find((game) => game.slug === data.activeQuery.game);
  const activeSeason = data.filters.seasons.find((season) => season.slug === data.activeQuery.season);
  const activeRegion = data.activeQuery.region
    ? data.filters.regions.find((region) => region.slug === data.activeQuery.region)
    : undefined;
  const currentRatingLabel = ratingLabel(data.activeQuery.type);

  return (
    <TournamentLayout pageOwnsMain>
      <main>
        <section className="border-b border-border bg-gradient-to-l from-warning/15 via-transparent to-primary/5" aria-labelledby="ranking-title">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <p className="text-sm font-bold text-warning">جدول رقابت بازیکنان</p>
            <h1 id="ranking-title" className="mt-2 max-w-3xl text-3xl font-black tracking-tight md:text-4xl">
              رتبه‌بندی بازیکنان مسابقات Turnoment
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              بازیکنان را بر اساس بازی، نوع امتیاز و فصل مقایسه کن و از جدول رتبه‌بندی به پروفایل هر بازیکن برو.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 md:py-10" aria-labelledby="ranking-table-title">
          <div className="rounded-3xl border border-border bg-card p-4 md:p-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="فیلترهای رتبه‌بندی">
              <label className="grid gap-2 text-xs font-bold text-muted-foreground">
                بازی
                <select
                  value={data.activeQuery.game}
                  onChange={(event) => onGameChange(event.target.value)}
                  className="min-h-11 rounded-xl border border-border bg-background px-3 text-sm font-bold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {data.filters.games.map((game) => (
                    <option key={game.gameId} value={game.slug}>{game.name}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-xs font-bold text-muted-foreground">
                نوع امتیاز
                <select
                  value={data.activeQuery.type}
                  onChange={(event) => onTypeChange(event.target.value as PlayerRankingType)}
                  className="min-h-11 rounded-xl border border-border bg-background px-3 text-sm font-bold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {data.filters.types.map((type) => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-xs font-bold text-muted-foreground">
                فصل
                <select
                  value={data.activeQuery.season}
                  onChange={(event) => onSeasonChange(event.target.value)}
                  className="min-h-11 rounded-xl border border-border bg-background px-3 text-sm font-bold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {data.filters.seasons.map((season) => (
                    <option key={season.id} value={season.slug}>{season.label}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-xs font-bold text-muted-foreground">
                محدوده
                <select
                  value={data.activeQuery.region ?? ""}
                  onChange={(event) => onRegionChange(event.target.value || undefined)}
                  className="min-h-11 rounded-xl border border-border bg-background px-3 text-sm font-bold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">همه شهرها</option>
                  {data.filters.regions.map((region) => (
                    <option key={region.id} value={region.slug}>{region.label}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <h2 id="ranking-table-title" className="text-2xl font-black">
                جدول {currentRatingLabel} {activeGame?.name ?? "بازیکنان"}
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {activeSeason?.label ?? "فصل انتخاب‌شده"}
                {activeRegion ? ` · ${activeRegion.label}` : " · همه شهرها"}
                {` · ${formatNumber(data.pagination.totalItems)} بازیکن در این رتبه‌بندی`}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card px-4 py-3 text-sm">
              <span className="text-muted-foreground">صفحه </span>
              <strong className="font-mono-num text-foreground">{formatNumber(data.pagination.currentPage)}</strong>
              <span className="text-muted-foreground"> از </span>
              <strong className="font-mono-num text-foreground">{formatNumber(data.pagination.totalPages)}</strong>
            </div>
          </div>

          {data.items.length > 0 ? (
            <>
              <div className="mt-6 hidden overflow-hidden rounded-2xl border border-border bg-card md:block">
                <table className="w-full text-sm">
                  <caption className="sr-only">جدول رتبه‌بندی بازیکنان بر اساس انتخاب‌های فعلی</caption>
                  <thead className="bg-background/70 text-xs text-muted-foreground">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-start">رتبه</th>
                      <th scope="col" className="px-4 py-3 text-start">بازیکن</th>
                      <th scope="col" className="px-4 py-3 text-start">شهر</th>
                      <th scope="col" className="px-4 py-3 text-start">{currentRatingLabel}</th>
                      <th scope="col" className="px-4 py-3 text-start">کارنامه</th>
                      <th scope="col" className="px-4 py-3 text-start">تغییر جایگاه</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((player) => (
                      <tr key={player.playerId} className="border-t border-border/60">
                        <td className="px-4 py-4 font-mono-num text-base font-black text-primary">{formatNumber(player.rank)}</td>
                        <td className="px-4 py-4">
                          <Link
                            to="/players/$username"
                            params={{ username: player.username }}
                            className="font-black transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {player.gamerTag}
                          </Link>
                          <div className="mt-1 text-xs text-muted-foreground">@{player.username}</div>
                        </td>
                        <td className="px-4 py-4 text-muted-foreground">{player.city.name}</td>
                        <td className="px-4 py-4 font-mono-num text-base font-black text-secondary">{formatNumber(player.rating)}</td>
                        <td className="px-4 py-4"><MatchRecord player={player} /></td>
                        <td className="px-4 py-4"><Movement player={player} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className="mt-6 grid gap-3 md:hidden" aria-label="رتبه‌بندی بازیکنان">
                {data.items.map((player) => (
                  <li key={player.playerId} className="rounded-2xl border border-border bg-card p-4">
                    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 font-mono-num text-sm font-black text-primary">
                        {formatNumber(player.rank)}
                      </span>
                      <div className="min-w-0">
                        <Link
                          to="/players/$username"
                          params={{ username: player.username }}
                          className="block truncate text-sm font-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {player.gamerTag}
                        </Link>
                        <p className="mt-1 truncate text-xs text-muted-foreground">@{player.username} · {player.city.name}</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-background/70 p-3">
                        <div className="text-[11px] text-muted-foreground">{currentRatingLabel}</div>
                        <div className="mt-1 font-mono-num text-base font-black text-secondary">{formatNumber(player.rating)}</div>
                      </div>
                      <div className="rounded-xl bg-background/70 p-3">
                        <div className="text-[11px] text-muted-foreground">مسابقات ثبت‌شده</div>
                        <div className="mt-1 font-mono-num text-base font-black">{formatNumber(player.played)}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-3">
                      <MatchRecord player={player} />
                      <Movement player={player} />
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <section className="mt-8 rounded-3xl border border-dashed border-border bg-card p-10 text-center md:p-14" aria-labelledby="empty-ranking-title">
              <Users className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
              <h2 id="empty-ranking-title" className="mt-4 text-xl font-black">بازیکنی با این انتخاب‌ها در جدول نیست</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">
                فیلترها را پاک کن تا رتبه‌بندی پیش‌فرض را دوباره ببینی.
              </p>
              <button
                type="button"
                onClick={onReset}
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-black text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                پاک کردن فیلترها
              </button>
            </section>
          )}

          {data.pagination.totalPages > 1 && (
            <nav className="mt-8 flex items-center justify-center gap-3" aria-label="صفحه‌بندی رتبه‌بندی بازیکنان">
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

        <section className="border-t border-border bg-surface/30" aria-labelledby="ranking-guide-title">
          <div className="container mx-auto px-4 py-12">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div>
                <h2 id="ranking-guide-title" className="text-2xl font-black">دو مسیر امتیاز، دو جدول جدا</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  امتیاز مسابقات و امتیاز چالش دو رتبه‌بندی جدا هستند. از فیلتر نوع امتیاز استفاده کن تا جایگاه بازیکنان را در مسیر رقابتی موردنظرت مقایسه کنی.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link to="/tournaments" className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Trophy className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-3 text-sm font-black">مسابقات حضوری</h3>
                  <p className="mt-1 text-xs leading-6 text-muted-foreground">مسابقه بعدی را بر اساس بازی، شهر و زمان پیدا کن.</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">مشاهده مسابقات <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" /></span>
                </Link>
                <Link to="/games" className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Users className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-3 text-sm font-black">بازی‌های رقابتی</h3>
                  <p className="mt-1 text-xs leading-6 text-muted-foreground">فهرست بازی‌ها را ببین و مسیر رقابتی هر عنوان را دنبال کن.</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">مشاهده بازی‌ها <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" /></span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </TournamentLayout>
  );
}

export function PlayerRankingSkeleton() {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-12" aria-busy="true" aria-label="در حال بارگذاری رتبه‌بندی بازیکنان">
        <div className="h-5 w-40 animate-pulse rounded-full bg-muted" />
        <div className="mt-5 h-12 max-w-2xl animate-pulse rounded-2xl bg-muted" />
        <div className="mt-4 h-16 max-w-2xl animate-pulse rounded-2xl bg-muted" />
        <div className="mt-10 h-36 animate-pulse rounded-3xl bg-muted" />
        <div className="mt-6 grid gap-3">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="h-20 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      </main>
    </TournamentLayout>
  );
}

export function PlayerRankingErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-20 text-center">
        <Trophy className="mx-auto h-9 w-9 text-primary" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-black">رتبه‌بندی در دسترس نیست</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
          دریافت جدول این بار کامل نشد. دوباره تلاش کن یا کمی بعد به رتبه‌بندی برگرد.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-black text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          تلاش دوباره
        </button>
      </main>
    </TournamentLayout>
  );
}
