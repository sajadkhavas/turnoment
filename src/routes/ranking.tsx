import { createFileRoute } from "@tanstack/react-router";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import { PlayerRanking } from "@/components/home/player-ranking";

const TITLE = "رتبه‌بندی بازیکنان | ایران مهر افزار";
const DESCRIPTION = "جدول رتبه‌بندی بازیکنان مسابقات حضوری بر اساس بازی؛ امتیاز، تعداد بازی و بردها.";

export const Route = createFileRoute("/ranking")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/ranking" }],
  }),
  component: RankingPage,
});

function RankingPage() {
  return (
    <TournamentLayout>
      <section className="border-b border-border bg-gradient-to-l from-warning/15 to-transparent">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-black md:text-4xl">رتبه‌بندی بازیکنان</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{DESCRIPTION}</p>
        </div>
      </section>
      <PlayerRanking />
    </TournamentLayout>
  );
}
