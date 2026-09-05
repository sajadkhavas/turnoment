import { useState } from "react";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { playerRankings, rankingGames } from "@/lib/tournament-home-data";
import { formatNumber } from "@/lib/format";

function Trend({ trend }: { trend: "up" | "down" | "flat" }) {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-success" aria-label="صعودی" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" aria-label="نزولی" />;
  return <Minus className="h-4 w-4 text-muted-foreground" aria-label="بدون تغییر" />;
}

export function PlayerRanking() {
  const [active, setActive] = useState<string>(rankingGames[0]);
  const rows = playerRankings[active] ?? [];

  return (
    <section className="border-y border-border bg-surface/30">
      <div className="container mx-auto px-4 py-14">
        <SectionHeading title="رتبه‌بندی بازیکنان" subtitle="بر اساس نتایج مسابقات حضوری ثبت‌شده" />

        <div role="tablist" aria-label="انتخاب بازی" className="mb-6 flex flex-wrap gap-2">
          {rankingGames.map((g) => (
            <button
              key={g}
              role="tab"
              aria-selected={active === g}
              onClick={() => setActive(g)}
              className={`h-10 rounded-lg border px-4 text-xs font-bold transition-colors ${
                active === g
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-2xl border border-border bg-card md:block">
          <table className="w-full text-sm">
            <thead className="bg-background/60 text-xs text-muted-foreground">
              <tr>
                <th scope="col" className="px-4 py-3 text-start">رتبه</th>
                <th scope="col" className="px-4 py-3 text-start">بازیکن</th>
                <th scope="col" className="px-4 py-3 text-start">شهر</th>
                <th scope="col" className="px-4 py-3 text-start">امتیاز</th>
                <th scope="col" className="px-4 py-3 text-start">مسابقات</th>
                <th scope="col" className="px-4 py-3 text-start">برد</th>
                <th scope="col" className="px-4 py-3 text-start">روند</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.player} className="border-t border-border/60">
                  <td className="px-4 py-3 font-mono-num font-bold text-primary">{formatNumber(r.rank)}</td>
                  <td className="px-4 py-3 font-bold">{r.player}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.city}</td>
                  <td className="px-4 py-3 font-mono-num font-bold text-secondary">{formatNumber(r.points)}</td>
                  <td className="px-4 py-3 font-mono-num text-muted-foreground">{formatNumber(r.played)}</td>
                  <td className="px-4 py-3 font-mono-num text-muted-foreground">{formatNumber(r.wins)}</td>
                  <td className="px-4 py-3"><Trend trend={r.trend} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <ul className="grid gap-3 md:hidden">
          {rows.map((r) => (
            <li key={r.player} className="rounded-2xl border border-border bg-card p-4">
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 font-mono-num text-sm font-black text-primary">
                  {formatNumber(r.rank)}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold">{r.player}</div>
                  <div className="truncate text-xs text-muted-foreground">{r.city}</div>
                </div>
                <Trend trend={r.trend} />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-background/60 py-2">
                  <div className="font-mono-num text-sm font-bold text-secondary">{formatNumber(r.points)}</div>
                  <div className="text-[11px] text-muted-foreground">امتیاز</div>
                </div>
                <div className="rounded-lg bg-background/60 py-2">
                  <div className="font-mono-num text-sm font-bold">{formatNumber(r.played)}</div>
                  <div className="text-[11px] text-muted-foreground">مسابقات</div>
                </div>
                <div className="rounded-lg bg-background/60 py-2">
                  <div className="font-mono-num text-sm font-bold">{formatNumber(r.wins)}</div>
                  <div className="text-[11px] text-muted-foreground">برد</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
