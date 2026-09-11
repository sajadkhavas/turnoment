import { Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, CalendarDays, Clock, MapPin, Sparkles, Trophy, Users } from "lucide-react";
import type {
  TournamentDiscoveryItem,
  TournamentDiscoveryMoney,
  TournamentDiscoveryRegistrationState,
} from "@/lib/tournament-discovery-contract";
import { formatNumber } from "@/lib/format";

const statusMap: Record<TournamentDiscoveryRegistrationState, { label: string; className: string }> = {
  open: { label: "ثبت‌نام باز", className: "border-success/40 bg-success/10 text-success" },
  filling: { label: "ظرفیت رو به تکمیل", className: "border-warning/40 bg-warning/10 text-warning" },
  closed: { label: "ثبت‌نام بسته", className: "border-border bg-muted text-muted-foreground" },
  upcoming: { label: "ثبت‌نام به‌زودی", className: "border-secondary/40 bg-secondary/10 text-secondary" },
  unavailable: { label: "فعلاً در دسترس نیست", className: "border-border bg-muted text-muted-foreground" },
};

function formatMoney(money: TournamentDiscoveryMoney) {
  if (money.amount === 0) return "رایگان";
  if (money.currency === "IRR" && money.amount % 10 === 0) return `${formatNumber(money.amount / 10)} تومان`;
  return `${formatNumber(money.amount)} ریال`;
}

function VenueLine({ tournament }: { tournament: TournamentDiscoveryItem }) {
  return (
    <span className="min-w-0">
      {tournament.venue.name}
      {tournament.venue.verified && <BadgeCheck className="mx-1 inline h-3.5 w-3.5 text-secondary" aria-label="مرکز تأییدشده" />}
      <span className="text-muted-foreground"> — {tournament.venue.city}، {tournament.venue.district}</span>
    </span>
  );
}

function CapacitySummary({ tournament }: { tournament: TournamentDiscoveryItem }) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="flex items-center gap-1.5 text-muted-foreground"><Users className="h-4 w-4 text-primary" aria-hidden="true" />ظرفیت ثبت‌نام</span>
        <span className="font-mono-num font-bold">{formatNumber(tournament.capacity.registered)} / {formatNumber(tournament.capacity.limit)}</span>
      </div>
      <p className="mt-1.5 text-[11px] text-muted-foreground">
        {tournament.capacity.remaining > 0 ? `${formatNumber(tournament.capacity.remaining)} جای خالی` : "ظرفیت خالی ثبت نشده"}
      </p>
    </div>
  );
}

export function TournamentDiscoveryCard({ tournament }: { tournament: TournamentDiscoveryItem }) {
  const status = statusMap[tournament.registrationState];
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/55 hover:shadow-[0_18px_55px_-30px_hsl(var(--primary)/0.55)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold text-secondary">{tournament.game.name}</p>
          <h2 className="mt-1 line-clamp-2 text-lg font-black leading-7">{tournament.title}</h2>
        </div>
        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold ${status.className}`}>{status.label}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
        <span className="rounded-lg border border-border bg-background/60 px-2.5 py-1.5">{tournament.formatLabel}</span>
        <span className="rounded-lg border border-border bg-background/60 px-2.5 py-1.5">{tournament.bracketFormatLabel}</span>
      </div>

      <div className="mt-4 space-y-2.5 text-xs leading-6 text-muted-foreground">
        <p className="flex items-start gap-2"><MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" /><VenueLine tournament={tournament} /></p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />{tournament.displayDate}</span>
          <span className="flex items-center gap-1.5 font-mono-num"><Clock className="h-4 w-4 text-primary" aria-hidden="true" />{tournament.displayTime}</span>
        </div>
      </div>

      <div className="mt-4"><CapacitySummary tournament={tournament} /></div>

      <dl className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-border bg-background/60 p-3">
        <div className="min-w-0">
          <dt className="text-[11px] text-muted-foreground">هزینه ثبت‌نام</dt>
          <dd className="mt-1 truncate font-mono-num text-sm font-black">{formatMoney(tournament.entryFee)}</dd>
        </div>
        <div className="min-w-0 border-r border-border pr-3">
          <dt className="flex items-center gap-1 text-[11px] text-muted-foreground"><Trophy className="h-3.5 w-3.5 text-warning" aria-hidden="true" />جایزه ثابت</dt>
          <dd className="mt-1 truncate font-mono-num text-sm font-black text-warning">{formatMoney(tournament.fixedPrize)}</dd>
        </div>
      </dl>

      <Link
        to="/tournaments/$id"
        params={{ id: tournament.tournamentSlug }}
        className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        جزئیات مسابقه
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
      </Link>
    </article>
  );
}

export function FeaturedTournamentCard({ tournament }: { tournament: TournamentDiscoveryItem }) {
  const status = statusMap[tournament.registrationState];
  return (
    <article className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-bl from-primary/18 via-card to-secondary/10 p-6 md:p-7">
      <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />
      <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-bold text-primary"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" />مسابقه منتخب</span>
            <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${status.className}`}>{status.label}</span>
          </div>
          <p className="mt-5 text-sm font-bold text-secondary">{tournament.game.name}</p>
          <h2 className="mt-2 text-2xl font-black md:text-3xl">{tournament.title}</h2>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-start gap-1.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" /><VenueLine tournament={tournament} /></span>
            <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />{tournament.displayDate}</span>
            <span className="flex items-center gap-1.5 font-mono-num"><Clock className="h-4 w-4 text-primary" aria-hidden="true" />{tournament.displayTime}</span>
          </div>
          <div className="mt-5 max-w-xl"><CapacitySummary tournament={tournament} /></div>
        </div>

        <div className="rounded-2xl border border-border/80 bg-background/70 p-4 backdrop-blur-sm">
          <dl className="grid grid-cols-2 gap-3">
            <div>
              <dt className="text-[11px] text-muted-foreground">هزینه ثبت‌نام</dt>
              <dd className="mt-1 font-mono-num text-sm font-black">{formatMoney(tournament.entryFee)}</dd>
            </div>
            <div className="border-r border-border pr-3">
              <dt className="text-[11px] text-muted-foreground">جایزه ثابت</dt>
              <dd className="mt-1 font-mono-num text-sm font-black text-warning">{formatMoney(tournament.fixedPrize)}</dd>
            </div>
          </dl>
          <Link to="/tournaments/$id" params={{ id: tournament.tournamentSlug }} className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            جزئیات مسابقه
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function TournamentCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-border bg-card p-5" aria-hidden="true">
      <div className="h-4 w-24 rounded bg-muted" />
      <div className="mt-3 h-6 w-2/3 rounded bg-muted" />
      <div className="mt-5 h-4 w-full rounded bg-muted" />
      <div className="mt-3 h-4 w-3/4 rounded bg-muted" />
      <div className="mt-5 h-16 rounded-xl bg-muted" />
      <div className="mt-5 h-16 rounded-xl bg-muted" />
      <div className="mt-5 h-11 rounded-xl bg-muted" />
    </div>
  );
}
