import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Clock,
  MapPin,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import type { TournamentSummary, TournamentStatus } from "@/lib/tournament-data";
import { formatNumber, formatPrice } from "@/lib/format";

const statusMap: Record<TournamentStatus, { label: string; cls: string }> = {
  open: { label: "ثبت‌نام باز", cls: "border-success/40 bg-success/10 text-success" },
  filling: { label: "ظرفیت محدود", cls: "border-warning/40 bg-warning/10 text-warning" },
  closed: { label: "ثبت‌نام بسته", cls: "border-border bg-muted text-muted-foreground" },
  upcoming: { label: "به‌زودی", cls: "border-secondary/40 bg-secondary/10 text-secondary" },
};

function capacityInfo(t: TournamentSummary) {
  const remaining = Math.max(0, t.capacity - t.registered);
  const pct = Math.min(100, Math.round((t.registered / t.capacity) * 100));
  return { remaining, pct };
}

export function TournamentDiscoveryCard({ t }: { t: TournamentSummary }) {
  const status = statusMap[t.status];
  const { remaining, pct } = capacityInfo(t);

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/55 hover:shadow-[0_18px_55px_-30px_hsl(var(--primary)/0.55)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold text-secondary">{t.game}</p>
          <h2 className="mt-1 line-clamp-2 text-lg font-black leading-7">{t.title}</h2>
        </div>
        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold ${status.cls}`}>{status.label}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
        <span className="rounded-lg border border-border bg-background/60 px-2.5 py-1.5">{t.format}</span>
        <span className="rounded-lg border border-border bg-background/60 px-2.5 py-1.5">{t.bracket}</span>
      </div>

      <div className="mt-4 space-y-2.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-primary" />
          <span className="min-w-0 truncate">
            {t.venue}
            {t.venueVerified && <BadgeCheck className="mx-1 inline h-3.5 w-3.5 text-secondary" aria-label="گیم‌نت تأییدشده" />}
            — {t.city}، {t.district}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-primary" />{t.date}</span>
          <span className="flex items-center gap-1.5 font-mono-num"><Clock className="h-4 w-4 text-primary" />{t.time}</span>
          <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" />{formatNumber(t.registered)} / {formatNumber(t.capacity)}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>ظرفیت</span>
          {remaining > 0 && remaining <= 8 && t.status !== "upcoming" ? (
            <span className="font-bold text-warning">{formatNumber(remaining)} جای خالی</span>
          ) : (
            <span className="font-mono-num">{formatNumber(t.registered)} / {formatNumber(t.capacity)}</span>
          )}
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-gradient-to-l from-primary to-secondary transition-[width]" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-border bg-background/60 p-3">
        <div className="min-w-0">
          <div className="text-[11px] text-muted-foreground">هزینه ثبت‌نام</div>
          <div className="mt-1 truncate font-mono-num text-sm font-black">{t.entryFee === 0 ? "رایگان" : formatPrice(t.entryFee)}</div>
        </div>
        <div className="min-w-0 border-r border-border pr-3">
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground"><Trophy className="h-3.5 w-3.5 text-warning" />جایزه ثابت</div>
          <div className="mt-1 truncate font-mono-num text-sm font-black text-warning">{formatPrice(t.fixedPrize)}</div>
        </div>
      </div>

      <Link
        to="/tournaments/$id"
        params={{ id: t.slug }}
        className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong"
      >
        مشاهده مسابقه
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      </Link>
    </article>
  );
}

export function FeaturedTournamentCard({ t }: { t: TournamentSummary }) {
  const status = statusMap[t.status];
  const { remaining, pct } = capacityInfo(t);

  return (
    <article className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-bl from-primary/18 via-card to-secondary/10 p-6 md:p-7">
      <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
      <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <Sparkles className="h-3.5 w-3.5" />مسابقه پیشنهادی
            </span>
            <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${status.cls}`}>{status.label}</span>
          </div>
          <p className="mt-5 text-sm font-bold text-secondary">{t.game}</p>
          <h2 className="mt-2 text-2xl font-black md:text-3xl">{t.title}</h2>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" />{t.venue}{t.venueVerified && <BadgeCheck className="h-4 w-4 text-secondary" />} — {t.city}، {t.district}</span>
            <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-primary" />{t.date}</span>
            <span className="flex items-center gap-1.5 font-mono-num"><Clock className="h-4 w-4 text-primary" />{t.time}</span>
          </div>
          <div className="mt-5 max-w-xl">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>ظرفیت {formatNumber(t.registered)} / {formatNumber(t.capacity)}</span>
              {remaining > 0 && <span className="font-bold text-warning">{formatNumber(remaining)} جای خالی</span>}
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-background/70">
              <div className="h-full rounded-full bg-gradient-to-l from-primary to-secondary" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/80 bg-background/70 p-4 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[11px] text-muted-foreground">هزینه ثبت‌نام</div>
              <div className="mt-1 font-mono-num text-sm font-black">{t.entryFee === 0 ? "رایگان" : formatPrice(t.entryFee)}</div>
            </div>
            <div className="border-r border-border pr-3">
              <div className="text-[11px] text-muted-foreground">جایزه ثابت</div>
              <div className="mt-1 font-mono-num text-sm font-black text-warning">{formatPrice(t.fixedPrize)}</div>
            </div>
          </div>
          <Link to="/tournaments/$id" params={{ id: t.slug }} className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground">
            مشاهده مسابقه
            <ArrowLeft className="h-4 w-4" />
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
      <div className="mt-5 h-2 rounded bg-muted" />
      <div className="mt-5 h-16 rounded-xl bg-muted" />
      <div className="mt-5 h-11 rounded-xl bg-muted" />
    </div>
  );
}
