import { createFileRoute, Link } from "@tanstack/react-router";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import { GamingCenterCard } from "@/components/home/gaming-center-card";
import { gamingCenters } from "@/lib/tournament-data";

const TITLE = "گیم‌نت‌های تأییدشده | ایران مهر افزار";
const DESCRIPTION = "فهرست گیم‌نت‌های تأییدشده میزبان مسابقات حضوری با امکانات، امتیاز کاربران و تعداد مسابقات پیش‌رو.";

export const Route = createFileRoute("/centers/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/centers" }],
  }),
  component: CentersPage,
});

function CentersPage() {
  return (
    <TournamentLayout>
      <section className="border-b border-border bg-gradient-to-l from-secondary/15 to-transparent">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-black md:text-4xl">گیم‌نت‌های تأییدشده</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{DESCRIPTION}</p>
          <Link to="/host" className="mt-6 inline-flex h-11 items-center rounded-xl border border-border bg-surface px-5 text-sm font-bold hover:border-primary hover:text-primary">
            ثبت گیم‌نت
          </Link>
        </div>
      </section>

      <div className="container mx-auto grid gap-5 px-4 py-10 md:grid-cols-2 lg:grid-cols-3">
        {gamingCenters.map((c) => (
          <GamingCenterCard key={c.id} c={c} />
        ))}
      </div>
    </TournamentLayout>
  );
}
