import { createFileRoute } from "@tanstack/react-router";
import { OtpLoginPage } from "@/components/auth/otp-login-page";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import { sanitizeLoginRedirect } from "@/lib/login-auth-contract";

export const Route = createFileRoute("/login")({
  ssr: true,
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: sanitizeLoginRedirect(search.redirect),
  }),
  loaderDeps: ({ search }) => ({ redirectTo: search.redirect }),
  loader: ({ deps }) => ({ redirectTo: deps.redirectTo }),
  head: () => ({
    meta: [
      { title: "ورود بازیکن — ایران مهر افزار" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: LoginRoute,
});

function LoginRoute() {
  const { redirectTo } = Route.useLoaderData();
  return (
    <TournamentLayout pageOwnsMain>
      <OtpLoginPage redirectTo={redirectTo} />
    </TournamentLayout>
  );
}
