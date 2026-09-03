import { useState } from "react";
import { Search } from "lucide-react";
import { cities, dateOptions, popularGames } from "@/lib/tournament-home-data";

const fieldClass =
  "h-11 w-full rounded-lg border border-border bg-background/80 px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring";

export function TournamentFinder() {
  const [game, setGame] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="rounded-2xl border border-border bg-surface/80 p-4 backdrop-blur-xl md:p-5"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_auto]">
        <div className="min-w-0">
          <label htmlFor="finder-game" className="mb-1.5 block text-xs font-bold text-muted-foreground">بازی</label>
          <select id="finder-game" value={game} onChange={(e) => setGame(e.target.value)} className={fieldClass}>
            <option value="">انتخاب بازی</option>
            {popularGames.map((g) => (
              <option key={g.id} value={g.name}>{g.name}</option>
            ))}
          </select>
        </div>
        <div className="min-w-0">
          <label htmlFor="finder-city" className="mb-1.5 block text-xs font-bold text-muted-foreground">شهر</label>
          <select id="finder-city" value={city} onChange={(e) => setCity(e.target.value)} className={fieldClass}>
            <option value="">انتخاب شهر</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="min-w-0">
          <label htmlFor="finder-date" className="mb-1.5 block text-xs font-bold text-muted-foreground">تاریخ</label>
          <select id="finder-date" value={date} onChange={(e) => setDate(e.target.value)} className={fieldClass}>
            <option value="">انتخاب تاریخ</option>
            {dateOptions.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end sm:col-span-2 lg:col-span-1">
          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong lg:w-auto"
          >
            <Search className="h-4 w-4" />
            پیدا کردن مسابقه
          </button>
        </div>
      </div>
    </form>
  );
}
