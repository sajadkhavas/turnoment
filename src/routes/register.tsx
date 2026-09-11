import { createFileRoute } from "@tanstack/react-router";
import { OtpRegisterPage } from "@/components/auth/otp-register-page";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import { sanitizeRegisterRedirect } from "@/lib/register-auth-contract";

type RegisterSearch = { redirect?: string };

export const Route = createFileRoute("/register")({
  ssr: true,
  validateSearch: (search: Record<string, unknown>): RegisterSearch => {
    if (typeof search.redirect !== "string") return {};
    return { redirect: search.redirect };
  },
  loaderDeps: ({ search }) => ({ redirectTo: sanitizeRegisterRedirect(search.redirect) }),
  loader: ({ deps }) => ({ redirectTo: deps.redirectTo }),
  head: () => ({
    meta: [
      { title: "ساخت حساب بازیکن — ایران مهر افزار" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: RegisterRoute,
});

function RegisterRoute() {
  const { redirectTo } = Route.useLoaderData();
  return (
    <TournamentLayout pageOwnsMain>
      <OtpRegisterPage redirectTo={redirectTo} />
    </TournamentLayout>
  );
}
