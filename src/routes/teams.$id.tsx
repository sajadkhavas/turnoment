import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import { TeamImage } from "@/components/tournament/public-team-card";
import { getPublicTeam, publicTeamPage, teamIdSchema } from "@/lib/public-teams";

export const Route = createFileRoute("/teams/$id")({
  ssr: true,
  validateSearch: (input: Record<string, unknown>) => ({ page: publicTeamPage(input.page) }),
  loaderDeps: ({ search }) => search,
  loader: async ({ params, deps, abortController }) => {
    if (!teamIdSchema.safeParse(params.id).success) throw notFound();
    const team = await getPublicTeam(params.id, deps.page, abortController.signal);
    if (!team) throw notFound();
    return team;
  },
  head: ({ loaderData, match }) => loaderData ? ({
    meta: [{ title: `${loaderData.name} | تیم ${loaderData.center.name} | تورنومچ` },
      { name: "robots", content: match.search.page > 1 ? "noindex,follow" : "index,follow" }],
    links: [{ rel: "canonical", href: "/teams/" + loaderData.id }],
  }) : ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: TeamDetail,
  notFoundComponent: () => <TournamentLayout><p className="p-8">تیم پیدا نشد.</p></TournamentLayout>,
});

function TeamDetail() {
  const team = Route.useLoaderData();
  return (
    <TournamentLayout pageOwnsMain>
      <main dir="rtl" className="container mx-auto space-y-5 px-4 py-10">
        <Link to="/teams" search={{ q: "", page: 1 }}>همهٔ تیم‌ها</Link>
        <section className="flex gap-4 rounded-2xl border border-border bg-card p-5">
          <TeamImage team={team} />
          <div className="min-w-0">
            <h1 className="break-words text-2xl font-black">{team.name}</h1>
            <Link className="text-primary" to="/centers/$id" params={{ id: team.center.id }}>{team.center.name}</Link>
            <p className="mt-2">سطح {team.level.toLocaleString("fa")} · {team.wins.toLocaleString("fa")} برد · {team.memberCount.toLocaleString("fa")} عضو</p>
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="font-black">اعضای تیم</h2>
          <p className="text-sm text-muted-foreground">فقط بازیکنانی که پروفایل عمومی دارند در فهرست دیده می‌شوند.</p>
          {!!team.members.length && <ul className="grid gap-2 sm:grid-cols-2">
            {team.members.map((member) => <li key={member.username} className="rounded-xl border border-border p-3">
              <Link to="/players/$username" params={{ username: member.username }} dir="auto">{member.gamerTag}</Link>
            </li>)}
          </ul>}
          {team.pages > 1 && <nav aria-label="صفحه‌بندی اعضا" className="flex gap-4">
            {team.page > 1 && <Link to="/teams/$id" params={{ id: team.id }} search={{ page: team.page - 1 }}>قبلی</Link>}
            {team.page < team.pages && <Link to="/teams/$id" params={{ id: team.id }} search={{ page: team.page + 1 }}>بعدی</Link>}
          </nav>}
        </section>
      </main>
    </TournamentLayout>
  );
}
