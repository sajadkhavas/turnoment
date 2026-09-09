import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Gamepad2,
  MapPin,
  RotateCcw,
  ShieldAlert,
  Swords,
  Trophy,
  Users,
} from "lucide-react";
import type {
  MatchAttentionKind,
  MatchLifecycleState,
  MatchOutcome,
  MyMatchItem,
  MyMatchKindFilter,
  MyMatchesPageData,
  MyMatchStateFilter,
} from "@/lib/my-matches-data";
import { toPersianDigits } from "@/lib/format";

const stateFilters: Array<{ value: MyMatchStateFilter; label: string }> = [
  { value: "all", label: "همه" },
  { value: "upcoming", label: "پیش رو" },
  { value: "action-required", label: "نیازمند اقدام" },
  { value: "completed", label: "پایان‌یافته" },
  { value: "disputed", label: "اختلاف" },
];

const kindFilters: Array<{ value: MyMatchKindFilter; label: string }> = [
  { value: "all", label: "همه نوع‌ها" },
  { value: "tournament", label: "تورنومنت" },
  { value: "challenge", label: "چالش" },
];

const lifecyclePresentation: Record<MatchLifecycleState, { label: string; className: string }> = {
  scheduled: { label: "برنامه‌ریزی شده", className: "bg-primary/15 text-primary" },
  ready: { label: "آماده شروع", className: "bg-secondary/15 text-secondary" },
  live: { label: "در حال برگزاری", className: "bg-destructive/15 text-destructive" },
  "awaiting-result": { label: "در انتظار ثبت نتیجه", className: "bg-warning/15 text-warning" },
  "awaiting-confirmation": { label: "در انتظار تأیید نتیجه", className: "bg-warning/15 text-warning" },
  disputed: { label: "در حال بررسی اختلاف", className: "bg-destructive/15 text-destructive" },
  completed: { label: "پایان‌یافته", className: "bg-success/15 text-success" },
  cancelled: { label: "لغوشده", className: "bg-elevated text-muted-foreground" },
};

const attentionPresentation: Record<Exclude<MatchAttentionKind, "none">, { label: string; description: string }> = {
  "check-in": {
    label: "Check-in باز است",
    description: "برای این Match یک اقدام زمانی فعال شده است. وضعیت دقیق را از صفحه تورنومنت دنبال کن.",
  },
  "submit-result": {
    label: "نتیجه باید ثبت شود",
    description: "این Match از سمت سامانه به‌عنوان نیازمند ثبت نتیجه علامت‌گذاری شده است.",
  },
  "confirm-result": {
    label: "نتیجه نیاز به تأیید تو دارد",
    description: "یک نتیجه برای این Match ثبت شده و وضعیت فعلی نیازمند بررسی توست.",
  },
  dispute: {
    label: "اختلاف در حال بررسی است",
    description: "برای این Match پرونده اختلاف فعال است و نتیجه تا پایان بررسی نهایی نشده است.",
  },
};

const outcomePresentation: Record<MatchOutcome, { label: string; className: string }> = {
  win: { label: "برد", className: "text-success" },
  loss: { label: "باخت", className: "text-destructive" },
  draw: { label: "مساوی", className: "text-muted-foreground" },
  void: { label: "بدون نتیجه", className: "text-muted-foreground" },
};

function formatDateTime(value: string, timezone: string): string {
  try {
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: timezone,
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function SummaryCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold text-muted-foreground">{label}</span>
        <span className="text-primary" aria-hidden="true">{icon}</span>
      </div>
      <div className="mt-3 font-mono-num text-2xl font-black" dir="ltr">{toPersianDigits(value)}</div>
    </div>
  );
}

function MatchCard({ item, gamerTag }: { item: MyMatchItem; gamerTag: string }) {
  const lifecycle = lifecyclePresentation[item.lifecycleState];
  const attention = item.attention === "none" ? null : attentionPresentation[item.attention];
  const result = item.result ? outcomePresentation[item.result.outcome] : null;

  return (
    <li className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-muted-foreground">
            <span>{item.competition.kind === "tournament" ? "تورنومنت" : "چالش"}</span>
            <span aria-hidden="true">•</span>
            <span>{item.game.name}</span>
            {item.competition.roundLabel && (
              <>
                <span aria-hidden="true">•</span>
                <span>{item.competition.roundLabel}</span>
              </>
            )}
          </div>
          {item.competition.kind === "tournament" ? (
            <Link
              to="/tournaments/$id"
              params={{ id: item.competition.tournamentSlug }}
              className="mt-1.5 inline-block max-w-full truncate text-sm font-black hover:text-primary hover:underline"
            >
              {item.competition.title}
            </Link>
          ) : (
            <h2 className="mt-1.5 text-sm font-black">{item.competition.title}</h2>
          )}
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black ${lifecycle.className}`}>
          {lifecycle.label}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 rounded-xl border border-border bg-elevated p-4 text-center">
        <span className="truncate text-sm font-black text-primary" dir="ltr">{gamerTag}</span>
        <span className="font-mono-num text-xs font-black text-muted-foreground">VS</span>
        <span className="truncate text-sm font-black text-secondary" dir="ltr">{item.opponent.displayTag}</span>
      </div>

      {item.result && result ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-elevated/60 p-3.5">
          <div className="flex items-center gap-3">
            <Trophy className={`h-4 w-4 ${result.className}`} aria-hidden="true" />
            <div>
              <p className={`text-xs font-black ${result.className}`}>{result.label}</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">نتیجه نهایی ثبت‌شده</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono-num text-lg font-black" dir="ltr">
              {toPersianDigits(item.result.playerScore)} — {toPersianDigits(item.result.opponentScore)}
            </span>
            {item.result.ratingDelta !== null && (
              <span
                className={`font-mono-num text-xs font-black ${
                  item.result.ratingDelta > 0
                    ? "text-success"
                    : item.result.ratingDelta < 0
                      ? "text-destructive"
                      : "text-muted-foreground"
                }`}
                dir="ltr"
              >
                {item.result.ratingDelta > 0 ? "+" : ""}{toPersianDigits(item.result.ratingDelta)}
              </span>
            )}
          </div>
        </div>
      ) : null}

      <dl className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
        <div className="flex items-start gap-2">
          <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <div><dt className="text-muted-foreground">زمان</dt><dd className="mt-1 font-bold">{formatDateTime(item.startsAt, item.timezone)}</dd></div>
        </div>
        <div className="flex items-start gap-2">
          <Gamepad2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <div><dt className="text-muted-foreground">فرمت</dt><dd className="mt-1 font-bold" dir="ltr">{item.formatLabel}</dd></div>
        </div>
        <div className="flex items-start gap-2 sm:col-span-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <div>
            <dt className="text-muted-foreground">محل برگزاری</dt>
            <dd className="mt-1 font-bold">{item.venue ? `${item.venue.name}، ${item.venue.city}` : "محل برگزاری در اطلاعات Match مشخص نشده است"}</dd>
          </div>
        </div>
      </dl>

      {attention ? (
        <div className="mt-4 rounded-xl border border-warning/35 bg-warning/8 p-3.5" role="status">
          <div className="flex items-start gap-2.5">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
            <div>
              <p className="text-xs font-black text-warning">{attention.label}</p>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{attention.description}</p>
            </div>
          </div>
          {item.attention === "check-in" && item.competition.kind === "tournament" ? (
            <Link
              to="/tournaments/$id"
              params={{ id: item.competition.tournamentSlug }}
              className="mt-3 inline-flex min-h-10 items-center rounded-lg bg-primary px-4 text-xs font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              ورود به صفحه تورنومنت
            </Link>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}

export function MyMatchesPage({
  data,
  state,
  kind,
  gameId,
  onStateChange,
  onKindChange,
  onGameChange,
  onPageChange,
  onResetFilters,
}: {
  data: MyMatchesPageData;
  state: MyMatchStateFilter;
  kind: MyMatchKindFilter;
  gameId?: string;
  onStateChange: (state: MyMatchStateFilter) => void;
  onKindChange: (kind: MyMatchKindFilter) => void;
  onGameChange: (gameId?: string) => void;
  onPageChange: (page: number) => void;
  onResetFilters: () => void;
}) {
  const hasFilters = state !== "all" || kind !== "all" || Boolean(gameId);

  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs font-bold text-primary">داشبورد بازیکن</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Matchهای من</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
          برنامه بازی‌ها، رقیب، وضعیت Match و نتیجه‌های نهایی ثبت‌شده را یک‌جا دنبال کن.
        </p>
      </header>

      <section aria-label="خلاصه Matchها" className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <SummaryCard label="همه" value={data.summary.total} icon={<Swords className="h-4 w-4" />} />
        <SummaryCard label="پیش رو" value={data.summary.upcoming} icon={<Clock3 className="h-4 w-4" />} />
        <SummaryCard label="نیازمند اقدام" value={data.summary.actionRequired} icon={<CircleAlert className="h-4 w-4" />} />
        <SummaryCard label="پایان‌یافته" value={data.summary.completed} icon={<CheckCircle2 className="h-4 w-4" />} />
        <SummaryCard label="اختلاف فعال" value={data.summary.disputed} icon={<ShieldAlert className="h-4 w-4" />} />
      </section>

      <section className="rounded-2xl border border-border bg-card p-4" aria-labelledby="my-matches-filters">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="my-matches-filters" className="text-sm font-black">فیلتر Matchها</h2>
          {hasFilters ? (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-bold hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> پاک کردن فیلترها
            </button>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2" aria-label="فیلتر وضعیت">
          {stateFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              aria-pressed={state === filter.value}
              onClick={() => onStateChange(filter.value)}
              className={`min-h-10 rounded-full border px-3.5 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                state === filter.value
                  ? "border-primary/50 bg-primary/15 text-primary"
                  : "border-border bg-elevated text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-bold">
            <span className="mb-1.5 block text-muted-foreground">نوع Match</span>
            <select
              value={kind}
              onChange={(event) => onKindChange(event.target.value as MyMatchKindFilter)}
              className="h-11 w-full rounded-lg border border-border bg-elevated px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {kindFilters.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}
            </select>
          </label>
          <label className="text-xs font-bold">
            <span className="mb-1.5 block text-muted-foreground">بازی</span>
            <select
              value={gameId ?? ""}
              onChange={(event) => onGameChange(event.target.value || undefined)}
              className="h-11 w-full rounded-lg border border-border bg-elevated px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">همه بازی‌ها</option>
              {data.games.map((game) => <option key={game.gameId} value={game.gameId}>{game.name}</option>)}
            </select>
          </label>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-black">فهرست Matchها</p>
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {toPersianDigits(data.pagination.totalItems)} مورد در این فیلتر
        </p>
      </div>

      {data.items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
          <Swords className="mx-auto h-7 w-7 text-muted-foreground" aria-hidden="true" />
          <h2 className="mt-3 text-sm font-black">Matchی با این فیلتر پیدا نشد</h2>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            {hasFilters ? "فیلترها را تغییر بده یا همه Matchها را ببین." : "بعد از قرار گرفتن در یک Match رسمی، برنامه و نتیجه آن اینجا نمایش داده می‌شود."}
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-4 inline-flex min-h-10 items-center rounded-lg bg-primary px-4 text-xs font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              نمایش همه Matchها
            </button>
          ) : (
            <Link to="/tournaments" className="mt-4 inline-flex min-h-10 items-center rounded-lg bg-primary px-4 text-xs font-bold text-primary-foreground">
              پیدا کردن تورنومنت
            </Link>
          )}
        </div>
      ) : (
        <ul className="grid gap-4 xl:grid-cols-2">
          {data.items.map((item) => <MatchCard key={item.matchId} item={item} gamerTag={data.player.gamerTag} />)}
        </ul>
      )}

      {data.pagination.totalPages > 1 ? (
        <nav className="flex items-center justify-center gap-2" aria-label="صفحه‌بندی Matchها">
          <button
            type="button"
            disabled={data.pagination.currentPage <= 1}
            onClick={() => onPageChange(data.pagination.currentPage - 1)}
            className="min-h-10 rounded-lg border border-border px-4 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-40"
          >
            قبلی
          </button>
          <span className="px-2 text-xs text-muted-foreground">
            صفحه {toPersianDigits(data.pagination.currentPage)} از {toPersianDigits(data.pagination.totalPages)}
          </span>
          <button
            type="button"
            disabled={data.pagination.currentPage >= data.pagination.totalPages}
            onClick={() => onPageChange(data.pagination.currentPage + 1)}
            className="min-h-10 rounded-lg border border-border px-4 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-40"
          >
            بعدی
          </button>
        </nav>
      ) : null}
    </div>
  );
}

function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-elevated ${className}`} />;
}

export function MyMatchesSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true" aria-live="polite">
      <SkeletonBar className="h-24 w-full" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => <SkeletonBar key={index} className="h-24" />)}
      </div>
      <SkeletonBar className="h-40 w-full" />
      <div className="grid gap-4 xl:grid-cols-2">
        <SkeletonBar className="h-80" />
        <SkeletonBar className="h-80" />
      </div>
    </div>
  );
}

export function MyMatchesErrorState() {
  return (
    <div className="grid place-items-center rounded-2xl border border-border bg-card p-10 text-center">
      <AlertTriangle className="h-8 w-8 text-warning" aria-hidden="true" />
      <h2 className="mt-4 text-base font-black">اطلاعات Matchها بارگذاری نشد</h2>
      <p className="mt-2 max-w-sm text-sm leading-7 text-muted-foreground">
        اطلاعات فعلی در دسترس نیست. دوباره تلاش کن.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        تلاش دوباره
      </button>
    </div>
  );
}
