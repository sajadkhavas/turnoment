import {
  AlertTriangle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Flame,
  Gamepad2,
  History,
  RotateCcw,
  Scale,
  Swords,
  TrendingUp,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import type {
  PlayerRivalriesPageData,
  PlayerRivalryItem,
  RivalryOpponentKindFilter,
  RivalrySortMode,
} from "@/lib/player-rivalries-contract";

const kindLabels: Record<RivalryOpponentKindFilter, string> = {
  all: "همه رقیب‌ها",
  player: "بازیکن‌ها",
  team: "تیم‌ها",
};

const sortLabels: Record<RivalrySortMode, string> = {
  recent: "آخرین برخورد",
  "most-played": "بیشترین برخورد",
};

const edgeLabels: Record<PlayerRivalryItem["headToHead"]["edge"], { text: string; className: string }> = {
  "player-leading": {
    text: "برتری با تو",
    className: "border-success/30 bg-success/10 text-success",
  },
  tied: {
    text: "رقابت برابر",
    className: "border-warning/30 bg-warning/10 text-warning",
  },
  "opponent-leading": {
    text: "برتری با رقیب",
    className: "border-destructive/30 bg-destructive/10 text-destructive",
  },
};

const outcomeLabels: Record<PlayerRivalryItem["lastEncounter"]["outcome"], string> = {
  win: "برد تو",
  loss: "برد رقیب",
  draw: "مساوی",
};

function formatEncounterDate(value: string, timezone: string) {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timezone,
    }).format(new Date(value));
  } catch {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  }
}

function SummaryCard({ icon: Icon, label, value, hint }: { icon: LucideIcon; label: string; value: number; hint: string }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-black tabular-nums sm:text-3xl">{value.toLocaleString("fa-IR")}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary" aria-hidden="true">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-xs leading-6 text-muted-foreground">{hint}</p>
    </article>
  );
}

function RivalryCard({ item }: { item: PlayerRivalryItem }) {
  const OpponentIcon = item.opponent.kind === "team" ? Users : UserRound;
  const edge = edgeLabels[item.headToHead.edge];
  const encounter = item.lastEncounter;

  return (
    <article className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary" aria-hidden="true">
            <OpponentIcon className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="break-words text-lg font-black sm:text-xl">{item.opponent.displayTag}</h2>
              <span className="rounded-full border border-border bg-elevated px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
                {item.opponent.kind === "team" ? "تیم" : "بازیکن"}
              </span>
              <span className={`rounded-full border px-2.5 py-1 text-[11px] font-black ${edge.className}`}>{edge.text}</span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Gamepad2 className="h-4 w-4" aria-hidden="true" />
                {item.game.name}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <History className="h-4 w-4" aria-hidden="true" />
                {item.headToHead.totalFinalized.toLocaleString("fa-IR")} برخورد نهایی‌شده
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 lg:min-w-[360px]" aria-label={`آمار رودررو با ${item.opponent.displayTag}`}>
          <div className="rounded-xl border border-border bg-elevated p-3 text-center">
            <p className="text-[10px] font-bold text-muted-foreground sm:text-xs">برد تو</p>
            <p className="mt-1 text-lg font-black tabular-nums text-success">{item.headToHead.playerWins.toLocaleString("fa-IR")}</p>
          </div>
          <div className="rounded-xl border border-border bg-elevated p-3 text-center">
            <p className="text-[10px] font-bold text-muted-foreground sm:text-xs">مساوی</p>
            <p className="mt-1 text-lg font-black tabular-nums text-warning">{item.headToHead.draws.toLocaleString("fa-IR")}</p>
          </div>
          <div className="rounded-xl border border-border bg-elevated p-3 text-center">
            <p className="text-[10px] font-bold text-muted-foreground sm:text-xs">برد رقیب</p>
            <p className="mt-1 text-lg font-black tabular-nums text-destructive">{item.headToHead.opponentWins.toLocaleString("fa-IR")}</p>
          </div>
          <div className="rounded-xl border border-border bg-elevated p-3 text-center">
            <p className="text-[10px] font-bold text-muted-foreground sm:text-xs">کل</p>
            <p className="mt-1 text-lg font-black tabular-nums">{item.headToHead.totalFinalized.toLocaleString("fa-IR")}</p>
          </div>
        </div>
      </div>

      <section className="mt-5 rounded-xl border border-border/80 bg-elevated/60 p-4" aria-label="آخرین برخورد نهایی‌شده">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black">آخرین برخورد نهایی‌شده</p>
            <p className="mt-1 break-words text-sm font-bold">{encounter.competition.title}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                {formatEncounterDate(encounter.finalizedAt, encounter.timezone)}
              </span>
              <span>{encounter.competition.kind === "tournament" ? "تورنومنت" : "چالش"}</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3 sm:justify-start">
            <div>
              <p className="text-[11px] font-bold text-muted-foreground">نتیجه</p>
              <p className="mt-1 text-sm font-black">{outcomeLabels[encounter.outcome]}</p>
            </div>
            <div className="text-2xl font-black tabular-nums" dir="ltr" aria-label={`نتیجه ${encounter.playerScore} به ${encounter.opponentScore}`}>
              {encounter.playerScore} - {encounter.opponentScore}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

export function PlayerRivalriesPage({
  data,
  kind,
  gameId,
  sort,
  onKindChange,
  onGameChange,
  onSortChange,
  onPageChange,
  onResetFilters,
}: {
  data: PlayerRivalriesPageData;
  kind: RivalryOpponentKindFilter;
  gameId?: string;
  sort: RivalrySortMode;
  onKindChange: (kind: RivalryOpponentKindFilter) => void;
  onGameChange: (gameId?: string) => void;
  onSortChange: (sort: RivalrySortMode) => void;
  onPageChange: (page: number) => void;
  onResetFilters: () => void;
}) {
  const hasFilters = kind !== "all" || Boolean(gameId);
  const isAllEmpty = data.summary.totalRivalries === 0;
  const isFilteredEmpty = !isAllEmpty && data.items.length === 0;

  return (
    <div className="space-y-5 sm:space-y-6">
      <header className="overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold text-primary">داشبورد بازیکن</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">رقابت‌های من</h1>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
              سابقه رودررو با رقیب‌هایی را ببین که حداقل یک برخورد معتبر و نهایی‌شده با آن‌ها داشته‌ای؛ آمار هر رقابت بر اساس نتیجه‌های ثبت‌شده نمایش داده می‌شود.
            </p>
          </div>
          <div className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-primary/20 bg-primary/8 px-3 py-2 text-xs font-bold text-primary">
            <Flame className="h-4 w-4" aria-hidden="true" />
            Rivalries Hub
          </div>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="خلاصه رقابت‌ها">
        <SummaryCard icon={Flame} label="رقیب‌های ثبت‌شده" value={data.summary.totalRivalries} hint="رابطه‌های رقابتی معتبر برای حساب تو" />
        <SummaryCard icon={Swords} label="برخورد نهایی‌شده" value={data.summary.totalFinalizedMatches} hint="فقط Matchهای معتبر و نهایی‌شده" />
        <SummaryCard icon={TrendingUp} label="برتری با تو" value={data.summary.playerLeading} hint="رقابت‌هایی که در بردها جلو هستی" />
        <SummaryCard icon={Scale} label="رقابت برابر" value={data.summary.tied} hint="بردهای تو و رقیب برابر است" />
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-5" aria-labelledby="rivalry-filters-title">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0 flex-1">
            <h2 id="rivalry-filters-title" className="text-sm font-black">فیلتر و مرتب‌سازی</h2>
            <p className="mt-1 text-xs leading-6 text-muted-foreground">نمایش را بر اساس نوع رقیب، بازی و ترتیب برخوردها محدود کن.</p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="نوع رقیب">
              {Object.entries(kindLabels).map(([value, label]) => {
                const typedValue = value as RivalryOpponentKindFilter;
                const active = kind === typedValue;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onKindChange(typedValue)}
                    className={`min-h-10 rounded-xl border px-3 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-elevated text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[480px]">
            <label className="text-xs font-bold text-muted-foreground">
              بازی
              <select
                value={gameId ?? ""}
                onChange={(event) => onGameChange(event.target.value || undefined)}
                className="mt-1.5 min-h-11 w-full rounded-xl border border-border bg-elevated px-3 text-sm font-bold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">همه بازی‌ها</option>
                {data.games.map((game) => (
                  <option key={game.gameId} value={game.gameId}>{game.name}</option>
                ))}
              </select>
            </label>
            <label className="text-xs font-bold text-muted-foreground">
              ترتیب
              <select
                value={sort}
                onChange={(event) => onSortChange(event.target.value as RivalrySortMode)}
                className="mt-1.5 min-h-11 w-full rounded-xl border border-border bg-elevated px-3 text-sm font-bold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {Object.entries(sortLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between gap-3" aria-live="polite">
        <p className="text-xs font-bold text-muted-foreground">
          {data.pagination.totalItems.toLocaleString("fa-IR")} رقابت مطابق این نمایش
        </p>
        {hasFilters ? (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-bold text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            پاک‌کردن فیلترها
          </button>
        ) : null}
      </div>

      {isAllEmpty ? (
        <section className="rounded-2xl border border-dashed border-border bg-card p-8 text-center sm:p-12">
          <Flame className="mx-auto h-9 w-9 text-muted-foreground" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-black">هنوز رقابتی ثبت نشده</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
            وقتی حداقل یک برخورد معتبر و نهایی‌شده با یک رقیب داشته باشی، سابقه رودررو در این صفحه نمایش داده می‌شود.
          </p>
        </section>
      ) : isFilteredEmpty ? (
        <section className="rounded-2xl border border-dashed border-border bg-card p-8 text-center sm:p-12">
          <Gamepad2 className="mx-auto h-9 w-9 text-muted-foreground" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-black">رقابتی با این فیلترها پیدا نشد</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-muted-foreground">فیلترها را تغییر بده یا همه رقابت‌ها را دوباره نمایش بده.</p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            نمایش همه رقابت‌ها
          </button>
        </section>
      ) : (
        <section className="space-y-4" aria-label="فهرست رقابت‌های بازیکن">
          {data.items.map((item) => <RivalryCard key={item.rivalryId} item={item} />)}
        </section>
      )}

      {data.pagination.totalPages > 1 ? (
        <nav className="flex items-center justify-between rounded-2xl border border-border bg-card p-3 sm:p-4" aria-label="صفحه‌بندی رقابت‌ها">
          <button
            type="button"
            disabled={data.pagination.currentPage <= 1}
            onClick={() => onPageChange(data.pagination.currentPage - 1)}
            className="inline-flex min-h-10 items-center gap-1 rounded-xl border border-border bg-elevated px-3 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            قبلی
          </button>
          <p className="text-xs font-bold text-muted-foreground">
            صفحه {data.pagination.currentPage.toLocaleString("fa-IR")} از {data.pagination.totalPages.toLocaleString("fa-IR")}
          </p>
          <button
            type="button"
            disabled={data.pagination.currentPage >= data.pagination.totalPages}
            onClick={() => onPageChange(data.pagination.currentPage + 1)}
            className="inline-flex min-h-10 items-center gap-1 rounded-xl border border-border bg-elevated px-3 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            بعدی
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
        </nav>
      ) : null}
    </div>
  );
}

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-elevated ${className}`} />;
}

export function PlayerRivalriesSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true" aria-live="polite" aria-label="در حال بارگذاری رقابت‌ها">
      <SkeletonBlock className="h-36" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <SkeletonBlock className="h-32" />
        <SkeletonBlock className="h-32" />
        <SkeletonBlock className="h-32" />
        <SkeletonBlock className="h-32" />
      </div>
      <SkeletonBlock className="h-40" />
      <SkeletonBlock className="h-72" />
      <SkeletonBlock className="h-72" />
    </div>
  );
}

export function PlayerRivalriesErrorState() {
  return (
    <div className="grid place-items-center rounded-2xl border border-border bg-card p-8 text-center sm:p-10" role="alert">
      <AlertTriangle className="h-8 w-8 text-warning" aria-hidden="true" />
      <h1 className="mt-4 text-base font-black">رقابت‌ها بارگذاری نشد</h1>
      <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">دریافت آخرین سابقه رودررو انجام نشد. دوباره تلاش کن.</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        تلاش دوباره
      </button>
    </div>
  );
}
