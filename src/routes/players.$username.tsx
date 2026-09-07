import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Crown, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import { rankingByGame, winRate, type RankingEntry } from "@/lib/ranking-data";
import { formatNumber } from "@/lib/format";

function findPlayer(username: string): RankingEntry | undefined {
  for (const list of Object.values(rankingByGame)) {
    const hit = list.find((e) => e.username === username);
    if (hit) return hit;
  }
  return undefined;
}

export const Route = createFileRoute("/players/$username")({
  loader: ({ params }) => {
    const p = findPlayer(params.username);
    if (!p) throw notFound();
    return { p };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "بازیکن یافت نشد | ایران مهر افزار" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.p.gamerTag} | پروفایل بازیکن`;
    const description = `آمار رقابتی ${loaderData.p.gamerTag} در ${loaderData.p.game} — امتیاز، برد و باخت و روند فرم.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  notFoundComponent: PlayerNotFound,
  component: PlayerProfile,
});

function PlayerNotFound() {
  return (
    <TournamentLayout>
      <main className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black">این بازیکن پیدا نشد</h1>
        <Link to="/ranking" className="mt-6 inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground">
          بازگشت به رتبه‌بندی
        </Link>
      </main>
    </TournamentLayout>
  );
}

function PlayerProfile() {
  const { p } = Route.useLoaderData();
  const TrendIcon = p.trend === "up" ? TrendingUp : p.trend === "down" ? TrendingDown : Minus;

  return (
    <TournamentLayout>
      <main className="container mx-auto px-4 py-10">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary font-mono-num text-lg font-black text-primary-foreground">
              {formatNumber(p.rank)}
            </span>
            <div className="min-w-0">
              <h1 className="flex items-center gap-2 text-2xl font-black">
                {p.rank === 1 && <Crown className="h-5 w-5 text-warning" aria-hidden />}
                {p.gamerTag}
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">@{p.username} — {p.city} — {p.game}</p>
            </div>
            <span className="ms-auto flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs">
              <TrendIcon className="h-4 w-4 text-secondary" aria-hidden />
              روند فرم
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="امتیاز مسابقات" value={formatNumber(p.tournamentRating)} />
            <Stat label="امتیاز چالش" value={formatNumber(p.challengeRating)} />
            <Stat label="بازی‌ها" value={`${formatNumber(p.wins)} برد / ${formatNumber(p.losses)} باخت`} />
            <Stat label="درصد برد" value={`${formatNumber(winRate(p))}٪`} />
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-bold">پنج نتیجه اخیر</h2>
            <div className="mt-3 flex gap-2">
              {p.recentForm.map((r, i) => (
                <span
                  key={i}
                  className={`grid h-9 w-9 place-items-center rounded-lg border text-xs font-black ${
                    r === "W" ? "border-success/40 bg-success/10 text-success" : "border-destructive/40 bg-destructive/10 text-destructive"
                  }`}
                >
                  {r === "W" ? "برد" : "باخت"}
                </span>
              ))}
            </div>
          </div>

          <Link to="/ranking" className="mt-8 inline-flex h-11 items-center rounded-xl border border-border bg-surface px-5 text-sm font-bold hover:border-primary hover:text-primary">
            بازگشت به رتبه‌بندی
          </Link>
        </div>
      </main>
    </TournamentLayout>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-background/60 p-4">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="mt-1 truncate font-mono-num text-sm font-black">{value}</div>
    </div>
  );
}
