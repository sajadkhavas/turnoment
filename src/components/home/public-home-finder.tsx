import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CalendarDays, Gamepad2, MapPin, Search } from "lucide-react";

import {
  compactHomeFinderSearch,
  type PublicHomePageData,
} from "@/lib/public-home-contract";

const fieldClass =
  "min-h-12 w-full appearance-none rounded-xl border border-white/10 bg-background/70 px-3.5 text-sm text-foreground outline-none transition-all duration-200 hover:border-white/20 focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/20";

export function PublicHomeFinder({
  finder,
}: {
  finder: PublicHomePageData["finder"];
}) {
  const navigate = useNavigate();

  const [game, setGame] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    void navigate({
      to: "/tournaments",
      search: compactHomeFinderSearch({
        game,
        city,
        date,
      }),
    });
  };

  return (
    <form
      onSubmit={submit}
      aria-label="جست‌وجوی مسابقه"
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-background/75 p-3 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:rounded-3xl sm:p-4 lg:p-5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mb-4 flex items-center gap-3 px-1">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
          <Search className="h-4 w-4" aria-hidden="true" />
        </span>

        <div className="min-w-0">
          <p className="text-sm font-black text-foreground">
            مسابقه مناسب خودت را پیدا کن
          </p>

          <p className="mt-0.5 text-[11px] leading-5 text-muted-foreground sm:text-xs">
            بازی، شهر و زمان را مشخص کن.
          </p>
        </div>
      </div>

      <div className="relative grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
        <div className="min-w-0">
          <label
            htmlFor="home-finder-game"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-muted-foreground"
          >
            <Gamepad2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            بازی
          </label>

          <select
            id="home-finder-game"
            value={game}
            onChange={(event) => setGame(event.target.value)}
            className={fieldClass}
          >
            <option value="">همه بازی‌ها</option>

            {finder.games.map((item) => (
              <option key={item.gameId} value={item.gameId}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0">
          <label
            htmlFor="home-finder-city"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-muted-foreground"
          >
            <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            شهر
          </label>

          <select
            id="home-finder-city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className={fieldClass}
          >
            <option value="">همه شهرها</option>

            {finder.cities.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0">
          <label
            htmlFor="home-finder-date"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-muted-foreground"
          >
            <CalendarDays
              className="h-3.5 w-3.5 text-primary"
              aria-hidden="true"
            />
            زمان
          </label>

          <select
            id="home-finder-date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className={fieldClass}
          >
            <option value="">هر زمان</option>

            {finder.dateBuckets.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex min-w-0 items-end md:col-span-2 xl:col-span-1">
          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-primary to-secondary px-5 text-sm font-black text-white shadow-[0_12px_35px_rgba(124,58,237,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(124,58,237,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary xl:w-auto xl:min-w-36"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            پیدا کردن
          </button>
        </div>
      </div>
    </form>
  );
}