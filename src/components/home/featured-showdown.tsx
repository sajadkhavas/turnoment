import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import { showdown } from "@/lib/tournament-home-data";
import { formatNumber } from "@/lib/format";

function PlayerSide({ p, align }: { p: typeof showdown.playerA; align: "start" | "end" }) {
  return (
    <div className={`min-w-0 text-${align === "start" ? "start" : "end"}`}>
      <div className="truncate text-lg font-black md:text-xl">{p.name}</div>
      <div className="mt-1 truncate text-xs text-muted-foreground">{p.city}</div>
      <div className="mt-3 font-mono-num text-2xl font-black text-secondary">{formatNumber(p.rating)}</div>
      <div className="mt-1 truncate text-[11px] text-muted-foreground">{p.record}</div>
    </div>
  );
}

export function FeaturedShowdown() {
  return (
    <section className="container mx-auto px-4 py-14">
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-6 md:p-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rgb-strip" />
        <div className="pointer-events-none absolute -top-24 start-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative text-center">
          <span className="inline-flex rounded-full border border-warning/40 bg-warning/10 px-3 py-1 text-[11px] font-bold text-warning">
            {showdown.eyebrow}
          </span>
          <h2 className="mt-4 text-2xl font-black md:text-3xl">{showdown.title}</h2>
          <p className="mt-1.5 text-sm text-secondary">{showdown.subtitle}</p>
        </div>

        <div className="relative mt-8 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 md:gap-8">
          <PlayerSide p={showdown.playerA} align="start" />
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-primary/40 bg-primary/10 font-mono-num text-sm font-black text-primary md:h-16 md:w-16 md:text-base">
            VS
          </div>
          <PlayerSide p={showdown.playerB} align="end" />
        </div>

        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 text-xs text-muted-foreground sm:flex-row sm:gap-6">
          <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-primary" />{showdown.date}</span>
          <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" />{showdown.venue}</span>
        </div>

        <div className="relative mt-7 text-center">
          <Link
            to="/products"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong"
          >
            جزئیات مسابقه
          </Link>
        </div>
      </div>
    </section>
  );
}
