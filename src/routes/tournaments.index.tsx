import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import { TournamentCard } from "@/components/home/tournament-card";
import { allTournaments, cities, popularGames } from "@/lib/tournament-data";
import { formatNumber } from "@/lib/format";

const TITLE = "همه مسابقات حضوری | ایران مهر افزار";
const DESCRIPTION = "لیست کامل مسابقات حضوری گیمینگ در گیم‌نت‌های تأییدشده؛ فیلتر بر اساس بازی، شهر و وضعیت ثبت‌نام.";

export const Route = createFileRoute("/tournaments/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/tournaments" }],
  }),
  component: TournamentsPage,
});

const statuses = [
  { id: "all", label: "همه" },
  { id: "open", label: "ثبت‌نام باز" },
  { id: "filling", label: "در حال تکمیل" },
  { id: "closed", label: "ظرفیت تکمیل" },
];

function TournamentsPage() {
  const [game, setGame] = useState("all");
  const [city, setCity] = useState("all");
  const [status, setStatus] = useState("all");

  const list = useMemo(
    () =>
      allTournaments.filter(
        (t) =>
          (game === "all" || t.game === game) &&
          (city === "all" || t.city === city) &&
          (status === "all" || t.status === status),
      ),
    [game, city, status],
  );

  return (
    <TournamentLayout>
      <section className="border-b border-border bg-gradient-to-l from-primary/15 to-transparent">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-black md:text-4xl">همه مسابقات</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{DESCRIPTION}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="min-w-0">
            <span className="mb-1.5 block text-xs text-muted-foreground">بازی</span>
            <select value={game} onChange={(e) => setGame(e.target.value)} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm">
              <option value="all">همه بازی‌ها</option>
              {popularGames.map((g) => (
                <option key={g.id} value={g.name}>{g.name}</option>
              ))}
            </select>
          </label>
          <label className="min-w-0">
            <span className="mb-1.5 block text-xs text-muted-foreground">شهر</span>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm">
              <option value="all">همه شهرها</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <div className="min-w-0">
            <span className="mb-1.5 block text-xs text-muted-foreground">وضعیت</span>
            <div className="flex flex-wrap gap-2">
              {statuses.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStatus(s.id)}
                  className={`h-11 rounded-xl border px-3 text-xs font-bold transition-colors ${
                    status === s.id ? "border-primary bg-primary/15 text-primary" : "border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 font-mono-num text-sm text-muted-foreground">{formatNumber(list.length)} مسابقه یافت شد</p>

        <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <TournamentCard key={t.id} t={t} />
          ))}
        </div>

        {list.length === 0 && (
          <div className="mt-10 rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
            مسابقه‌ای با این فیلترها پیدا نشد. فیلترها را تغییر بده.
          </div>
        )}
      </div>
    </TournamentLayout>
  );
}
