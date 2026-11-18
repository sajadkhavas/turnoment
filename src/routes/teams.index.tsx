import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import { PublicTeamCard } from "@/components/tournament/public-team-card";
import { listPublicTeams, publicTeamPage } from "@/lib/public-teams";

export const Route = createFileRoute("/teams/")({
  ssr: true,
  validateSearch: (input: Record<string, unknown>) => ({
    q: typeof input.q === "string" ? input.q.trim().slice(0, 120) : "",
    page: publicTeamPage(input.page),
  }),
  loaderDeps: ({ search }) => search,
  loader: ({ deps, abortController }) =>
    listPublicTeams({ q: deps.q, page: String(deps.page) }, abortController.signal),
  head: ({ match }) => ({
    meta: [{ title: "تیم‌های گیم‌نت‌ها | تورنومچ" },
      { name: "description", content: "تیم‌های گیم‌نت‌ها را بر اساس برد و سطح مقایسه کن و اعضای عمومی هر تیم را ببین." },
      { name: "robots", content: match.search.q || match.search.page > 1 ? "noindex,follow" : "index,follow" }],
    links: [{ rel: "canonical", href: "/teams" }],
  }),
  component: TeamsDirectory,
  errorComponent: ({ reset }) => <TournamentLayout><p className="p-8" role="alert">فهرست تیم‌ها بارگیری نشد. <button onClick={reset}>تلاش دوباره</button></p></TournamentLayout>,
});

function TeamsDirectory() {
  const { items, page, pages } = Route.useLoaderData();
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  return (
    <TournamentLayout pageOwnsMain>
      <main dir="rtl" className="container mx-auto space-y-5 px-4 py-10">
        <h1 className="text-3xl font-black">تیم‌های گیم‌نت‌ها</h1>
        <p className="text-sm text-muted-foreground">تیم‌ها به ترتیب تعداد برد نمایش داده می‌شوند.</p>
        <form key={q} role="search" className="flex flex-wrap gap-2" onSubmit={(event) => {
          event.preventDefault();
          const query = String(new FormData(event.currentTarget).get("q") ?? "").trim();
          void navigate({ search: { q: query, page: 1 } });
        }}>
          <input name="q" aria-label="نام تیم" defaultValue={q} maxLength={120} placeholder="نام تیم"
            className="rounded-xl border border-border bg-card px-3 py-2" />
          <button className="rounded-xl bg-primary px-4 py-2 font-bold text-primary-foreground">جست‌وجو</button>
        </form>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {items.map((team) => <PublicTeamCard key={team.id} team={team} />)}
        </div>
        {!items.length && <p>{q ? "تیمی با این نام پیدا نشد." : "هنوز تیمی منتشر نشده است."}</p>}
        {pages > 1 && <nav aria-label="صفحه‌بندی تیم‌ها" className="flex gap-4">
          {page > 1 && <Link to="/teams" search={{ q, page: page - 1 }}>قبلی</Link>}
          <span>{page.toLocaleString("fa")} از {pages.toLocaleString("fa")}</span>
          {page < pages && <Link to="/teams" search={{ q, page: page + 1 }}>بعدی</Link>}
        </nav>}
      </main>
    </TournamentLayout>
  );
}
