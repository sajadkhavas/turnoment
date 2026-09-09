import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  MapPin,
  Swords,
  Trophy,
  Users,
} from "lucide-react";
import type {
  MyTournamentItem,
  MyTournamentStateFilter,
  MyTournamentsPageData,
  TournamentCheckInState,
  TournamentLifecycleState,
  TournamentNextActionKind,
  TournamentRegistrationState,
} from "@/lib/my-tournaments-data";
import { formatNumber } from "@/lib/format";

const stateFilters: { value: MyTournamentStateFilter; label: string }[] = [
  { value: "all", label: "همه" },
  { value: "upcoming", label: "پیش رو" },
  { value: "live", label: "در حال برگزاری" },
  { value: "completed", label: "پایان‌یافته" },
];

const lifecycleLabels: Record<TournamentLifecycleState, string> = {
  upcoming: "پیش رو",
  live: "در حال برگزاری",
  completed: "پایان‌یافته",
  cancelled: "لغوشده",
};

const lifecycleClasses: Record<TournamentLifecycleState, string> = {
  upcoming: "border-primary/30 bg-primary/10 text-primary",
  live: "border-success/35 bg-success/10 text-success",
  completed: "border-border bg-elevated text-muted-foreground",
  cancelled: "border-destructive/30 bg-destructive/10 text-destructive",
};

const registrationLabels: Record<TournamentRegistrationState, string> = {
  pending: "در انتظار تأیید ثبت‌نام",
  confirmed: "ثبت‌نام تأیید شده",
  waitlisted: "فهرست انتظار",
  rejected: "ثبت‌نام رد شده",
  cancelled: "ثبت‌نام لغو شده",
};

const checkInLabels: Record<TournamentCheckInState, string> = {
  "not-required": "نیازی به Check-in نیست",
  "not-open": "Check-in هنوز باز نشده",
  open: "Check-in باز است",
  completed: "Check-in انجام شده",
  missed: "مهلت Check-in گذشته",
};

const actionLabels: Record<TournamentNextActionKind, string> = {
  view: "مشاهده مسابقه",
  "check-in": "انجام Check-in",
  "view-bracket": "مشاهده براکت",
  "view-results": "مشاهده نتایج",
};

function formatStart(item: MyTournamentItem): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  try {
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      ...options,
      timeZone: item.timezone,
    }).format(new Date(item.startsAt));
  } catch {
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", options).format(new Date(item.startsAt));
  }
}

function SummaryCard({ label, value, icon: Icon }: { label: string; value: number; icon: typeof Trophy }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold text-muted-foreground">{label}</span>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary" aria-hidden="true">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 font-mono-num text-2xl font-black" dir="ltr">
        {formatNumber(value)}
      </p>
    </div>
  );
}

function ParticipationLabel({ item }: { item: MyTournamentItem }) {
  if (item.participation.kind === "individual") {
    return <span>شرکت انفرادی</span>;
  }

  return (
    <span>
      تیم <b dir="ltr">{item.participation.teamName}</b> · {item.participation.role === "captain" ? "کاپیتان" : "عضو تیم"}
    </span>
  );
}

function TournamentCard({ item }: { item: MyTournamentItem }) {
  const checkInIsCritical = item.checkInState === "open" || item.checkInState === "missed";

  return (
    <li className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-2.5 py-1 text-[11px] font-black ${lifecycleClasses[item.lifecycleState]}`}>
              {lifecycleLabels[item.lifecycleState]}
            </span>
            <span className="rounded-full border border-border bg-elevated px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
              {registrationLabels[item.registrationState]}
            </span>
          </div>
          <h2 className="mt-3 break-words text-lg font-black leading-8">{item.title}</h2>
          <p className="mt-1 text-sm font-bold text-secondary" dir="auto">
            {item.game.name}
          </p>
        </div>

        <Link
          to="/tournaments/$id"
          params={{ id: item.tournamentSlug }}
          className={`inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl px-4 text-sm font-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
            item.nextAction === "check-in"
              ? "bg-warning text-background hover:bg-warning/90"
              : item.nextAction === "view-bracket"
                ? "bg-success text-background hover:bg-success/90"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {actionLabels[item.nextAction]}
        </Link>
      </div>

      <dl className="mt-5 grid gap-3 text-xs sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-border bg-elevated/55 p-3">
          <dt className="flex items-center gap-1.5 text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> زمان شروع
          </dt>
          <dd className="mt-1.5 font-bold leading-6">{formatStart(item)}</dd>
        </div>
        <div className="rounded-xl border border-border bg-elevated/55 p-3">
          <dt className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> محل برگزاری
          </dt>
          <dd className="mt-1.5 break-words font-bold leading-6">{item.venue.name} · {item.venue.city}</dd>
        </div>
        <div className="rounded-xl border border-border bg-elevated/55 p-3">
          <dt className="flex items-center gap-1.5 text-muted-foreground">
            <Swords className="h-3.5 w-3.5" aria-hidden="true" /> فرمت
          </dt>
          <dd className="mt-1.5 font-bold leading-6" dir="ltr">{item.formatLabel}</dd>
        </div>
        <div className="rounded-xl border border-border bg-elevated/55 p-3">
          <dt className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="h-3.5 w-3.5" aria-hidden="true" /> نحوه حضور
          </dt>
          <dd className="mt-1.5 break-words font-bold leading-6"><ParticipationLabel item={item} /></dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        {item.checkInState !== "not-required" && (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-bold ${
              checkInIsCritical
                ? item.checkInState === "open"
                  ? "border-warning/40 bg-warning/10 text-warning"
                  : "border-destructive/40 bg-destructive/10 text-destructive"
                : "border-border bg-elevated text-muted-foreground"
            }`}
          >
            {item.checkInState === "completed" ? (
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            ) : checkInIsCritical ? (
              <CircleAlert className="h-3.5 w-3.5" aria-hidden="true" />
            ) : null}
            {checkInLabels[item.checkInState]}
          </span>
        )}

        {item.result && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-elevated px-3 py-1.5 font-bold text-muted-foreground">
            <Trophy className="h-3.5 w-3.5 text-warning" aria-hidden="true" />
            {item.result.placement !== null ? `رتبه ${formatNumber(item.result.placement)} · ` : ""}
            {formatNumber(item.result.wins)} برد از {formatNumber(item.result.matchesPlayed)} بازی
          </span>
        )}
      </div>
    </li>
  );
}

export function MyTournamentsSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite" aria-label="در حال بارگذاری مسابقات من">
      <div className="h-28 animate-pulse rounded-2xl bg-elevated" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-28 animate-pulse rounded-2xl bg-elevated" />
        ))}
      </div>
      <div className="h-20 animate-pulse rounded-2xl bg-elevated" />
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="h-64 animate-pulse rounded-2xl bg-elevated" />
      ))}
    </div>
  );
}

export function MyTournamentsErrorState() {
  return (
    <section className="grid place-items-center rounded-2xl border border-border bg-card p-8 text-center sm:p-10" role="alert">
      <CircleAlert className="h-9 w-9 text-warning" aria-hidden="true" />
      <h1 className="mt-4 text-xl font-black">مسابقاتت نمایش داده نشد</h1>
      <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">
        بارگذاری اطلاعات این صفحه کامل نشد. دوباره تلاش کن؛ ثبت‌نام‌ها و نتایجت تغییری نمی‌کنند.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-primary px-5 text-sm font-black text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        تلاش دوباره
      </button>
    </section>
  );
}

export function MyTournamentsPage({
  data,
  state,
  gameId,
  onStateChange,
  onGameChange,
  onPageChange,
  onResetFilters,
}: {
  data: MyTournamentsPageData;
  state: MyTournamentStateFilter;
  gameId?: string;
  onStateChange: (state: MyTournamentStateFilter) => void;
  onGameChange: (gameId?: string) => void;
  onPageChange: (page: number) => void;
  onResetFilters: () => void;
}) {
  const filtered = state !== "all" || Boolean(gameId);
  const hasAnyTournament = data.summary.total > 0;

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-border bg-gradient-to-l from-primary/12 via-card to-card p-5 sm:p-6">
        <p className="text-xs font-black text-primary">مرکز حضور در رقابت‌ها</p>
        <h1 className="mt-2 text-2xl font-black sm:text-3xl">مسابقات من</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
          مسابقاتی که در آن‌ها ثبت‌نام کرده‌ای، وضعیت حضور، Check-in و مسیر بعدی هر رقابت را از اینجا دنبال کن.
        </p>
      </header>

      <section aria-labelledby="my-tournaments-summary-heading">
        <h2 id="my-tournaments-summary-heading" className="sr-only">خلاصه مسابقات من</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="همه مسابقات" value={data.summary.total} icon={Trophy} />
          <SummaryCard label="پیش رو" value={data.summary.upcoming} icon={CalendarDays} />
          <SummaryCard label="در حال برگزاری" value={data.summary.live} icon={Swords} />
          <SummaryCard label="پایان‌یافته" value={data.summary.completed} icon={CheckCircle2} />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-5" aria-labelledby="my-tournaments-filters-heading">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h2 id="my-tournaments-filters-heading" className="text-sm font-black">فیلتر مسابقات</h2>
            <div className="mt-3 flex flex-wrap gap-2" aria-label="فیلتر بر اساس وضعیت">
              {stateFilters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={state === filter.value}
                  onClick={() => onStateChange(filter.value)}
                  className={`min-h-10 rounded-full border px-4 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    state === filter.value
                      ? "border-primary/50 bg-primary/15 text-primary"
                      : "border-border bg-elevated text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <label className="block min-w-0 xl:w-64">
            <span className="mb-2 block text-xs font-bold text-muted-foreground">بازی</span>
            <select
              value={gameId ?? ""}
              onChange={(event) => onGameChange(event.target.value || undefined)}
              className="min-h-11 w-full rounded-xl border border-border bg-elevated px-3 text-sm font-bold outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              <option value="">همه بازی‌ها</option>
              {data.games.map((game) => (
                <option key={game.gameId} value={game.gameId}>{game.name}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
          {formatNumber(data.pagination.totalItems)} مسابقه در این فیلتر
        </p>
        {filtered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="min-h-10 rounded-lg border border-border bg-card px-3 text-xs font-bold hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            پاک کردن فیلترها
          </button>
        )}
      </div>

      {data.items.length > 0 ? (
        <ul className="space-y-4" aria-label="فهرست مسابقات من">
          {data.items.map((item) => <TournamentCard key={item.tournamentId} item={item} />)}
        </ul>
      ) : (
        <section className="rounded-2xl border border-dashed border-border bg-card p-8 text-center sm:p-10">
          <Trophy className="mx-auto h-9 w-9 text-primary" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-black">
            {hasAnyTournament ? "با این فیلتر مسابقه‌ای نداری" : "هنوز در مسابقه‌ای ثبت‌نام نکرده‌ای"}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">
            {hasAnyTournament
              ? "فیلترها را تغییر بده تا بقیه مسابقاتت را ببینی."
              : "مسابقه مناسب را پیدا کن و بعد از ثبت‌نام، وضعیت حضورت از همین صفحه قابل پیگیری است."}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {hasAnyTournament && (
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex min-h-11 items-center rounded-xl border border-border bg-elevated px-4 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                نمایش همه مسابقات من
              </button>
            )}
            <Link
              to="/tournaments"
              className="inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-black text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              پیدا کردن مسابقه
            </Link>
          </div>
        </section>
      )}

      {data.pagination.totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2" aria-label="صفحه‌بندی مسابقات من">
          <button
            type="button"
            disabled={data.pagination.currentPage <= 1}
            onClick={() => onPageChange(data.pagination.currentPage - 1)}
            className="min-h-11 rounded-xl border border-border bg-card px-4 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            صفحه قبل
          </button>
          <span className="px-2 text-xs text-muted-foreground">
            صفحه {formatNumber(data.pagination.currentPage)} از {formatNumber(data.pagination.totalPages)}
          </span>
          <button
            type="button"
            disabled={data.pagination.currentPage >= data.pagination.totalPages}
            onClick={() => onPageChange(data.pagination.currentPage + 1)}
            className="min-h-11 rounded-xl border border-border bg-card px-4 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            صفحه بعد
          </button>
        </nav>
      )}
    </div>
  );
}
