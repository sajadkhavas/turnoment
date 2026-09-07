import { Link } from "@tanstack/react-router";
import { BadgeCheck, CalendarDays, Clock, MapPin, Trophy, Users } from "lucide-react";
import type { TournamentStatus, TournamentSummary } from "@/lib/tournament-home-data";
import { formatNumber, formatPrice } from "@/lib/format";

const statusMap: Record<TournamentStatus, { label: string; cls: string }> = {
  open: { label: "ثبت‌نام باز", cls: "border-success/40 bg-success/10 text-success" },
  filling: { label: "در حال تکمیل", cls: "border-warning/40 bg-warning/10 text-warning" },
  closed: { label: "ظرفیت تکمیل", cls: "border-border bg-muted text-muted-foreground" },
  upcoming: { label: "به‌زودی", cls: "border-secondary/40 bg-secondary/10 text-secondary" },
};

export function TournamentCard({ t }: { t: TournamentSummary }) {
  const status = statusMap[t.status];
  const pct = Math.min(100, Math.round((t.registered / t.capacity) * 100));

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/60">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold">{t.title}</h3>
          <p className="mt-1 truncate text-xs text-secondary">{t.game}</p>
        </div>
        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold ${status.cls}`}>{status.label}</span>
      </div>

      <div className="mt-4 space-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-primary" />
          <span className="min-w-0 truncate">
            {t.venue}
            {t.venueVerified && <BadgeCheck className="mx-1 inline h-3.5 w-3.5 text-secondary" aria-label="تأییدشده" />}
            — {t.city}، {t.district}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 shrink-0 text-primary" />{t.date}</span>
          <span className="flex items-center gap-1.5 font-mono-num"><Clock className="h-4 w-4 shrink-0 text-primary" />{t.time}</span>
          <span className="flex items-center gap-1.5"><Users className="h-4 w-4 shrink-0 text-primary" />{t.format}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>ظرفیت</span>
          <span className="font-mono-num">{formatNumber(t.registered)} / {formatNumber(t.capacity)}</span>
        </div>
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-gradient-to-l from-primary to-secondary" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-border bg-background/60 p-3">
        <div className="min-w-0">
          <div className="text-[11px] text-muted-foreground">هزینه ثبت‌نام</div>
          <div className="mt-0.5 truncate font-mono-num text-sm font-bold">{t.entryFee === 0 ? "رایگان" : formatPrice(t.entryFee)}</div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground"><Trophy className="h-3.5 w-3.5 text-warning" />جایزه ثابت</div>
          <div className="mt-0.5 truncate font-mono-num text-sm font-bold text-warning">{formatPrice(t.fixedPrize)}</div>
        </div>
      </div>

      <Link
        to="/tournaments/$id"
        params={{ id: t.slug }}
        className={`mt-5 inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-bold transition-all ${
          t.status === "closed" || t.status === "upcoming"
            ? "border border-border bg-surface text-muted-foreground hover:text-foreground"
            : "bg-primary text-primary-foreground hover:glow-violet-strong"
        }`}
      >
        {t.status === "closed" ? "مشاهده جزئیات" : t.status === "upcoming" ? "مشاهده مسابقه" : "ثبت‌نام در مسابقه"}
      </Link>
    </article>
  );
}
