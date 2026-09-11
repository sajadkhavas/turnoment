import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { compactHomeFinderSearch, type PublicHomePageData } from "@/lib/public-home-contract";

const fieldClass =
  "min-h-11 w-full rounded-xl border border-border bg-background/85 px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring";

export function PublicHomeFinder({ finder }: { finder: PublicHomePageData["finder"] }) {
  const navigate = useNavigate();
  const [game, setGame] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void navigate({
      to: "/tournaments",
      search: compactHomeFinderSearch({ game, city, date }),
    });
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-surface/85 p-4 shadow-xl backdrop-blur-xl md:p-5" aria-label="جست‌وجوی مسابقه">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_auto]">
        <div className="min-w-0">
          <label htmlFor="home-finder-game" className="mb-1.5 block text-xs font-bold text-muted-foreground">بازی</label>
          <select id="home-finder-game" value={game} onChange={(event) => setGame(event.target.value)} className={fieldClass}>
            <option value="">همه بازی‌ها</option>
            {finder.games.map((item) => <option key={item.gameId} value={item.gameId}>{item.name}</option>)}
          </select>
        </div>
        <div className="min-w-0">
          <label htmlFor="home-finder-city" className="mb-1.5 block text-xs font-bold text-muted-foreground">شهر</label>
          <select id="home-finder-city" value={city} onChange={(event) => setCity(event.target.value)} className={fieldClass}>
            <option value="">همه شهرها</option>
            {finder.cities.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </div>
        <div className="min-w-0">
          <label htmlFor="home-finder-date" className="mb-1.5 block text-xs font-bold text-muted-foreground">زمان</label>
          <select id="home-finder-date" value={date} onChange={(event) => setDate(event.target.value)} className={fieldClass}>
            <option value="">هر زمان</option>
            {finder.dateBuckets.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </div>
        <div className="flex items-end sm:col-span-2 lg:col-span-1">
          <button type="submit" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-black text-primary-foreground transition-all hover:glow-violet-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:w-auto">
            <Search className="h-4 w-4" aria-hidden="true" />
            پیدا کردن مسابقه
          </button>
        </div>
      </div>
    </form>
  );
}
