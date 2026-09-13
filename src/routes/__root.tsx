import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { TournamentLayout } from "../components/tournament/tournament-layout";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { useLenis } from "../lib/use-lenis";

function NotFoundComponent() {
  return (
    <TournamentLayout>
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="font-mono-num text-7xl font-black text-gradient">۴۰۴</div>
        <h1 className="mt-4 text-xl font-bold">صفحه‌ای پیدا نشد</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          این آدرس در Turnoment وجود ندارد یا دیگر بخشی از پلتفرم مسابقات نیست.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:glow-violet-strong"
        >
          بازگشت به خانه
        </Link>
      </div>
    </TournamentLayout>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-bold tracking-tight text-foreground">صفحه بارگذاری نشد</h1>
        <p className="mt-2 text-sm text-muted-foreground">مشکلی پیش آمده. لطفاً دوباره تلاش کنید.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            تلاش دوباره
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-bold text-foreground transition-colors hover:bg-accent"
          >
            بازگشت به خانه
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0A0A0F" },
      { title: "Turnoment — مسابقات حضوری گیمینگ" },
      {
        name: "description",
        content: "Turnoment برای پیدا کردن مسابقات حضوری گیمینگ، بررسی مراکز میزبان و دنبال کردن رقابت و رتبه‌بندی بازیکنان است.",
      },
      { property: "og:title", content: "Turnoment" },
      {
        property: "og:description",
        content: "مسابقات حضوری گیمینگ، مراکز میزبان و مسیر رقابت بازیکنان.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Turnoment" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useLenis();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
