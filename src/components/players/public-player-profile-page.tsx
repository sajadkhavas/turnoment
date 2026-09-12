import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  Gamepad2,
  MapPin,
  Minus,
  RefreshCw,
  Swords,
  Trophy,
  TrendingDown,
  TrendingUp,
  UserRound,
} from "lucide-react";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import { formatNumber } from "@/lib/format";
import type {
  PublicPlayerCompetitiveSnapshot,
  PublicPlayerProfileData,
  PublicPlayerRecentResult,
} from "@/lib/public-player-profile-contract";

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "Asia/Tehran",
});

function ratingLabel(snapshot: PublicPlayerCompetitiveSnapshot) {
  return snapshot.ratingType === "tournament" ? "امتیاز مسابقات" : "امتیاز چالش";
}

function movementText(snapshot: PublicPlayerCompetitiveSnapshot) {
  if (!snapshot.movement) return "روند منتشر نشده";
  if (snapshot.movement.direction === "flat") return "بدون تغییر";
  const prefix = snapshot.movement.direction === "up" ? "صعود" : "نزول";
  return `${prefix} ${formatNumber(snapshot.movement.positions)} رتبه`;
}

function outcomeLabel(result: PublicPlayerRecentResult) {
  if (result.outcome === "win") return "برد";
  if (result.outcome === "loss") return "باخت";
  return "مساوی";
}

function outcomeClasses(result: PublicPlayerRecentResult) {
  if (result.outcome === "win") return "border-success/35 bg-success/10 text-success";
  if (result.outcome === "loss") return "border-destructive/35 bg-destructive/10 text-destructive";
  return "border-border bg-surface text-muted-foreground";
}

export function PublicPlayerProfilePage({ profile }: { profile: PublicPlayerProfileData }) {
  const initials = profile.gamerTag.slice(0, 2).toUpperCase();

  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-8 sm:py-10 lg:py-12">
        <section
          aria-labelledby="player-profile-title"
          className="overflow-hidden rounded-3xl border border-border bg-card"
        >
          <div className="relative border-b border-border bg-gradient-to-l from-primary/10 via-card to-secondary/10 px-5 py-7 sm:px-7 sm:py-9 lg:px-9">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-3xl border border-border bg-background/80 shadow-sm sm:h-28 sm:w-28">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={`تصویر پروفایل ${profile.gamerTag}`}
                    className="h-full w-full object-cover"
                    width={112}
                    height={112}
                  />
                ) : (
                  <span className="font-mono-num text-2xl font-black text-primary" aria-hidden="true">
                    {initials}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-primary">بازیکن Turnoment</p>
                <h1 id="player-profile-title" className="mt-2 break-words text-3xl font-black tracking-tight sm:text-4xl">
                  پروفایل {profile.gamerTag}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <span dir="ltr" className="font-mono-num">@{profile.username}</span>
                  {profile.city ? (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {profile.city.name}
                    </span>
                  ) : null}
                </div>
                {profile.publicBio ? (
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    {profile.publicBio}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-7 lg:px-9">
            <Link
              to="/ranking"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-bold transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Trophy className="h-4 w-4" aria-hidden="true" />
              مشاهده رتبه‌بندی بازیکنان
            </Link>
            <Link
              to="/games"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-bold transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Gamepad2 className="h-4 w-4" aria-hidden="true" />
              مشاهده بازی‌ها
            </Link>
            <Link
              to="/tournaments"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-bold transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Swords className="h-4 w-4" aria-hidden="true" />
              مشاهده مسابقات
            </Link>
          </div>
        </section>

        <section className="mt-8" aria-labelledby="competitive-status-title">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-primary">وضعیت رقابتی منتشرشده</p>
              <h2 id="competitive-status-title" className="mt-1 text-xl font-black sm:text-2xl">
                رتبه و امتیازهای رقابتی
              </h2>
            </div>
            <p className="max-w-xl text-xs leading-6 text-muted-foreground sm:text-sm">
              هر کارت، وضعیت منتشرشده همان بازی، فصل و نوع امتیاز را نشان می‌دهد.
            </p>
          </div>

          {profile.competitiveSnapshots.length ? (
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {profile.competitiveSnapshots.map((snapshot) => (
                <CompetitiveSnapshotCard key={snapshot.snapshotId} snapshot={snapshot} />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-border bg-card p-6 text-sm leading-7 text-muted-foreground">
              هنوز آمار رقابتی عمومی برای این بازیکن منتشر نشده است.
            </div>
          )}
        </section>

        <section className="mt-10" aria-labelledby="recent-results-title">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-primary">فعالیت رقابتی</p>
              <h2 id="recent-results-title" className="mt-1 text-xl font-black sm:text-2xl">
                نتایج اخیر
              </h2>
            </div>
            <Link
              to="/tournaments"
              className="inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-bold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              همه مسابقات Turnoment
            </Link>
          </div>

          {profile.recentResults.length ? (
            <div className="mt-5 space-y-3">
              {profile.recentResults.map((result) => (
                <RecentResultRow key={result.resultId} result={result} />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-border bg-card p-6 text-sm leading-7 text-muted-foreground">
              هنوز نتیجه عمومی تازه‌ای برای این بازیکن ثبت نشده است.
            </div>
          )}
        </section>
      </main>
    </TournamentLayout>
  );
}

function CompetitiveSnapshotCard({ snapshot }: { snapshot: PublicPlayerCompetitiveSnapshot }) {
  const MovementIcon = snapshot.movement?.direction === "up"
    ? TrendingUp
    : snapshot.movement?.direction === "down"
      ? TrendingDown
      : Minus;

  return (
    <article className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            to="/games/$slug"
            params={{ slug: snapshot.game.slug }}
            className="break-words text-lg font-black hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {snapshot.game.name}
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">{snapshot.season.label} · {ratingLabel(snapshot)}</p>
        </div>
        <span className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 text-xs font-bold text-muted-foreground">
          <MovementIcon className="h-4 w-4" aria-hidden="true" />
          {movementText(snapshot)}
        </span>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="امتیاز" value={formatNumber(snapshot.rating)} />
        <Stat label="رتبه" value={snapshot.rank ? formatNumber(snapshot.rank) : "بدون رتبه"} />
        <Stat label="بازی" value={formatNumber(snapshot.played)} />
        <Stat
          label="کارنامه"
          value={`${formatNumber(snapshot.wins)} برد · ${formatNumber(snapshot.losses)} باخت${snapshot.draws ? ` · ${formatNumber(snapshot.draws)} مساوی` : ""}`}
        />
      </dl>
    </article>
  );
}

function RecentResultRow({ result }: { result: PublicPlayerRecentResult }) {
  return (
    <article className="grid gap-4 rounded-2xl border border-border bg-card p-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:p-5">
      <span className={`inline-flex min-h-10 w-fit items-center rounded-xl border px-3 text-xs font-black ${outcomeClasses(result)}`}>
        {outcomeLabel(result)}
      </span>
      <div className="min-w-0">
        <h3 className="break-words text-sm font-black sm:text-base">{result.tournament.name}</h3>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span>{result.game.name}</span>
          {result.opponentGamerTag ? <span>مقابل {result.opponentGamerTag}</span> : null}
        </div>
      </div>
      <time
        dateTime={result.completedAt}
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground sm:justify-self-end"
      >
        <CalendarDays className="h-4 w-4" aria-hidden="true" />
        {dateFormatter.format(new Date(result.completedAt))}
      </time>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-background/60 p-3">
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words font-mono-num text-sm font-black">{value}</dd>
    </div>
  );
}

export function PublicPlayerProfileSkeleton() {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-8 sm:py-10" aria-busy="true" aria-label="در حال بارگذاری پروفایل بازیکن">
        <div className="animate-pulse rounded-3xl border border-border bg-card p-6 sm:p-8">
          <div className="h-24 w-24 rounded-3xl bg-muted" />
          <div className="mt-6 h-8 w-56 max-w-full rounded bg-muted" />
          <div className="mt-3 h-4 w-36 max-w-full rounded bg-muted" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="h-44 rounded-2xl bg-muted" />
            <div className="h-44 rounded-2xl bg-muted" />
          </div>
        </div>
      </main>
    </TournamentLayout>
  );
}

export function PublicPlayerProfileErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-24 text-center">
        <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-7 sm:p-9" role="alert">
          <UserRound className="mx-auto h-10 w-10 text-muted-foreground" aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-black">نمایش پروفایل با مشکل روبه‌رو شد</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            دریافت اطلاعات عمومی این بازیکن انجام نشد. دوباره تلاش کن.
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            تلاش دوباره
          </button>
        </div>
      </main>
    </TournamentLayout>
  );
}
