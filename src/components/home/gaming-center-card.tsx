import { Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin, Star } from "lucide-react";
import type { GamingCenterSummary } from "@/lib/tournament-home-data";
import { formatNumber, toPersianDigits } from "@/lib/format";

export function GamingCenterCard({ c }: { c: GamingCenterSummary }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/60">
      <div className="relative aspect-[16/10] overflow-hidden bg-elevated">
        <img
          src={c.image}
          alt={c.name}
          loading="lazy"
          width={768}
          height={576}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {c.verified && (
          <span className="absolute start-3 top-3 inline-flex items-center gap-1 rounded-full border border-secondary/40 bg-background/85 px-2.5 py-1 text-[11px] font-bold text-secondary backdrop-blur">
            <BadgeCheck className="h-3.5 w-3.5" /> تأییدشده
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <h3 className="truncate text-base font-bold">{c.name}</h3>
          <span className="flex shrink-0 items-center gap-1 font-mono-num text-xs font-bold text-warning">
            <Star className="h-3.5 w-3.5 fill-current" />
            {toPersianDigits(c.rating.toFixed(1))}
            <span className="text-muted-foreground">({formatNumber(c.reviews)})</span>
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate">{c.city}، {c.district}</span>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {c.equipment.map((e) => (
            <li key={e} className="rounded-lg border border-border bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground">{e}</li>
          ))}
        </ul>

        <div className="mt-auto grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 pt-5">
          <span className="min-w-0 truncate font-mono-num text-xs text-secondary">
            {formatNumber(c.upcomingTournaments)} مسابقه پیش‌رو
          </span>
          <Link
            to="/products"
            className="inline-flex h-10 shrink-0 items-center rounded-lg border border-border bg-surface px-4 text-xs font-bold transition-colors hover:border-primary hover:text-primary"
          >
            مشاهده مرکز
          </Link>
        </div>
      </div>
    </article>
  );
}
