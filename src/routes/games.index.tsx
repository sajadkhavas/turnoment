import { createFileRoute, Link } from "@tanstack/react-router";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import { popularGames, allTournaments } from "@/lib/tournament-data";
import { formatNumber } from "@/lib/format";

const TITLE = "بازی‌های مسابقات | ایران مهر افزار";
const DESCRIPTION = "بازی‌هایی که مسابقات حضوری آن‌ها در گیم‌نت‌های تأییدشده برگزار می‌شود؛ از EA FC 26 و Tekken 8 تا Counter-Strike 2.";

export const Route = createFileRoute("/games/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/games" }],
  }),
  component: GamesPage,
});

function GamesPage() {
  return (
    <TournamentLayout>
      <section className="border-b border-border bg-gradient-to-l from-primary/15 to-transparent">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-black md:text-4xl">بازی‌های مسابقات</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{DESCRIPTION}</p>
        </div>
      </section>

      <div className="container mx-auto grid gap-5 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {popularGames.map((g) => {
          const count = allTournaments.filter((t) => t.game === g.name).length;
          return (
            <article key={g.id} className="overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/60">
              <img src={g.image} alt={g.name} loading="lazy" width={768} height={432} className="h-40 w-full object-cover" />
              <div className="p-5">
                <h2 className="truncate text-base font-bold">{g.name}</h2>
                <p className="mt-1 text-xs text-muted-foreground">{g.platform}</p>
                <p className="mt-3 font-mono-num text-xs text-secondary">{formatNumber(count)} مسابقه فعال</p>
                <Link
                  to="/tournaments"
                  className="mt-4 inline-flex h-10 items-center rounded-lg bg-primary px-4 text-xs font-bold text-primary-foreground transition-all hover:glow-violet-strong"
                >
                  مشاهده مسابقات
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </TournamentLayout>
  );
}
