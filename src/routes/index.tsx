import { createFileRoute } from "@tanstack/react-router";
import { PublicHomeErrorState, PublicHomePage, PublicHomeSkeleton } from "@/components/home/public-home-page";
import { publicHomeRepository } from "@/lib/public-home-repository";

const TITLE = "مسابقات گیمینگ حضوری و تورنمنت‌های گیم‌نت | Turnoment";
const DESCRIPTION = "مسابقات گیمینگ حضوری را بر اساس بازی، شهر و زمان پیدا کن؛ جزئیات رقابت و مرکز میزبان را ببین و از همان صفحه مسیر ثبت‌نام را ادامه بده.";

export const Route = createFileRoute("/")({
  ssr: true,
  loader: () => publicHomeRepository.getHome(),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  pendingComponent: PublicHomeSkeleton,
  errorComponent: ({ reset }) => <PublicHomeErrorState onRetry={reset} />,
  component: HomeRoute,
});

function HomeRoute() {
  const data = Route.useLoaderData();
  return <PublicHomePage data={data} />;
}
