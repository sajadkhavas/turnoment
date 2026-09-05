import { createFileRoute } from "@tanstack/react-router";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import { HomeHero } from "@/components/home/home-hero";
import { PlatformBenefits } from "@/components/home/platform-benefits";
import { PopularGames } from "@/components/home/popular-games";
import { FeaturedTournaments } from "@/components/home/featured-tournaments";
import { FeaturedShowdown } from "@/components/home/featured-showdown";
import { FeaturedGamingCenters } from "@/components/home/featured-gaming-centers";
import { PlayerRanking } from "@/components/home/player-ranking";
import { HowItWorks } from "@/components/home/how-it-works";
import { FinalCta } from "@/components/home/final-cta";

const TITLE = "مسابقات گیمینگ حضوری | ایران مهر افزار";
const DESCRIPTION =
  "مسابقات حضوری بازی‌های محبوب را در گیم‌نت‌های معتبر پیدا کنید، آنلاین ثبت‌نام کنید، نتایج و رتبه‌بندی خود را دنبال کنید.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <TournamentLayout>
      <HomeHero />
      <PlatformBenefits />
      <PopularGames />
      <FeaturedTournaments />
      <FeaturedShowdown />
      <FeaturedGamingCenters />
      <PlayerRanking />
      <HowItWorks />
      <FinalCta />
    </TournamentLayout>
  );
}
