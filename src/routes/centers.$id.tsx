import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, MapPin, Star } from "lucide-react";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import { TournamentCard } from "@/components/home/tournament-card";
import { getCenter, tournamentsOfCenter } from "@/lib/tournament-data";
import { formatNumber } from "@/lib/format";

export const Route = createFileRoute("/centers/$id")({
  loader: ({ params }) => {
    const c = getCenter(params.id);
    if (!c) throw notFound();
    return { c, tournaments: tournamentsOfCenter(c.name) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "گیم‌نت یافت نشد | ایران مهر افزار" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.c.name} | گیم‌نت تأییدشده`;
    const description = `${loaderData.c.name} در ${loaderData.c.city}، ${loaderData.c.district} — امکانات، امتیاز کاربران و مسابقات حضوری پیش‌رو.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: CenterNotFound,
  component: CenterDetail,
});

function CenterNotFound() {
  return (
    <TournamentLayout>
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black">این گیم‌نت پیدا نشد</h1>
        <Link to="/centers" className="mt-6 inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground">
          بازگشت به گیم‌نت‌ها
        </Link>
      </div>
    </TournamentLayout>
  );
}

function CenterDetail() {
  const { c, tournaments } = Route.useLoaderData();

  return (
    <TournamentLayout>
      <div className="relative h-56 w-full overflow-hidden md:h-72">
        <img src={c.image} alt={c.name} width={1280} height={720} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      <div className="container mx-auto -mt-16 px-4">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-black md:text-3xl">{c.name}</h1>
            {c.verified && (
              <span className="inline-flex items-center gap-1 rounded-full border border-secondary/40 bg-secondary/10 px-2.5 py-1 text-[11px] font-bold text-secondary">
                <BadgeCheck className="h-3.5 w-3.5" /> تأییدشده
              </span>
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" />{c.city}، {c.district}</span>
            <span className="flex items-center gap-1.5 font-mono-num"><Star className="h-4 w-4 text-warning" />{formatNumber(c.rating)} ({formatNumber(c.reviews)} نظر)</span>
            <span className="font-mono-num text-secondary">{formatNumber(c.upcomingTournaments)} مسابقه پیش‌رو</span>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {c.equipment.map((e) => (
              <li key={e} className="rounded-lg border border-border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground">{e}</li>
            ))}
          </ul>
        </div>
      </div>

      <section className="container mx-auto px-4 py-10">
        <h2 className="mb-6 text-2xl font-black">مسابقات این گیم‌نت</h2>
        {tournaments.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tournaments.map((t) => (
              <TournamentCard key={t.id} t={t} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            فعلاً مسابقه‌ای برای این گیم‌نت ثبت نشده است.
          </p>
        )}
      </section>
    </TournamentLayout>
  );
}
