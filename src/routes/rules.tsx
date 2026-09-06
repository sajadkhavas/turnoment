import { createFileRoute } from "@tanstack/react-router";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import { tournamentRules } from "@/lib/tournament-data";
import { formatNumber } from "@/lib/format";

const TITLE = "قوانین مسابقات | ایران مهر افزار";
const DESCRIPTION = "قوانین شرکت در مسابقات حضوری گیمینگ: حضور، احراز هویت، تجهیزات، رفتار ورزشی و شرایط بازگشت هزینه ثبت‌نام.";

export const Route = createFileRoute("/rules")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/rules" }],
  }),
  component: RulesPage,
});

function RulesPage() {
  return (
    <TournamentLayout>
      <section className="border-b border-border bg-gradient-to-l from-primary/15 to-transparent">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-black md:text-4xl">قوانین مسابقات</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{DESCRIPTION}</p>
        </div>
      </section>

      <div className="container mx-auto max-w-3xl px-4 py-10">
        <ol className="space-y-4">
          {tournamentRules.map((r, i) => (
            <li key={r.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-2xl border border-border bg-card p-5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15 font-mono-num text-sm font-bold text-primary">{formatNumber(i + 1)}</span>
              <div className="min-w-0">
                <h2 className="text-sm font-bold">{r.title}</h2>
                <p className="mt-1.5 text-xs leading-7 text-muted-foreground">{r.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </TournamentLayout>
  );
}
