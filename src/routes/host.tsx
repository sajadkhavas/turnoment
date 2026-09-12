import { createFileRoute } from "@tanstack/react-router";
import { HostLandingPage } from "@/components/host/host-acquisition-page";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import { hostApplicationRepository } from "@/lib/host-application-repository";

const TITLE = "میزبانی مسابقات گیمینگ برای گیم‌نت | Turnoment";
const DESCRIPTION = "برای میزبانی مسابقات حضوری گیمینگ در گیم‌نت خود در Turnoment درخواست بدهید؛ شرایط میزبانی، روند بررسی و مسیر ثبت‌نام بازیکنان را ببینید.";

export const Route = createFileRoute("/host")({
  ssr: true,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Turnoment" },
      { property: "og:url", content: "/host" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/host" }],
  }),
  component: HostRoute,
});

function HostRoute() {
  return <TournamentLayout pageOwnsMain><HostLandingPage onSubmit={(input) => hostApplicationRepository.submit(input)} /></TournamentLayout>;
}
