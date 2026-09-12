import { createFileRoute } from "@tanstack/react-router";
import { RulesPage } from "@/components/rules/rules-page";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import { rulesPageRepository } from "@/lib/rules-page-repository";

const FALLBACK_TITLE = "قوانین و شرایط شرکت در تورنمنت‌ها | Turnoment";

export const Route = createFileRoute("/rules")({
  ssr: true,
  loader: () => rulesPageRepository.getPublishedRules(),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: FALLBACK_TITLE },
          { name: "robots", content: "noindex,nofollow" },
        ],
      };
    }

    return {
      meta: [
        { title: loaderData.seo.title },
        { name: "description", content: loaderData.seo.description },
        { name: "robots", content: loaderData.seo.robots },
        { property: "og:title", content: loaderData.seo.openGraph.title },
        { property: "og:description", content: loaderData.seo.openGraph.description },
        { property: "og:type", content: loaderData.seo.openGraph.type },
        { property: "og:site_name", content: "Turnoment" },
        { property: "og:url", content: loaderData.seo.openGraph.url },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: loaderData.seo.canonical }],
    };
  },
  component: RulesRoute,
});

function RulesRoute() {
  const document = Route.useLoaderData();
  return (
    <TournamentLayout pageOwnsMain>
      <RulesPage document={document} />
    </TournamentLayout>
  );
}
