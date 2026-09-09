import { createFileRoute, Link, notFound, redirect, useRouter } from "@tanstack/react-router";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import {
  TournamentRegistrationPage,
  TournamentRegistrationSkeleton,
} from "@/components/tournaments/tournament-registration-page";
import { playerSessionRepository } from "@/lib/player-session";
import { tournamentDetailRepository } from "@/lib/tournament-detail-data";

export const Route = createFileRoute("/tournaments/$id/register")({
  ssr: true,
  beforeLoad: async () => {
    const session = await playerSessionRepository.getSession();
    if (session.state !== "authenticated") {
      throw redirect({ to: "/login" });
    }
    return { session };
  },
  loader: async ({ params, context }) => {
    const detail = await tournamentDetailRepository.getByIdentifier(params.id);
    if (!detail) throw notFound();
    if (params.id !== detail.slug) {
      throw redirect({
        to: "/tournaments/$id/register",
        params: { id: detail.slug },
        replace: true,
      });
    }

    const registration = await tournamentDetailRepository.getRegistrationContext(
      detail.slug,
      context.session,
    );
    if (!registration) throw redirect({ to: "/login" });
    return { registration };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `ثبت‌نام ${loaderData.registration.tournament.title} | ایران مهر افزار`
          : "ثبت‌نام مسابقه | ایران مهر افزار",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  pendingComponent: RegistrationPending,
  errorComponent: RegistrationError,
  notFoundComponent: RegistrationNotFound,
  component: RegistrationRoute,
});

function RegistrationRoute() {
  const { registration } = Route.useLoaderData();
  return (
    <TournamentLayout>
      <TournamentRegistrationPage
        context={registration}
        identifier={registration.tournament.slug}
      />
    </TournamentLayout>
  );
}

function RegistrationPending() {
  return (
    <TournamentLayout>
      <TournamentRegistrationSkeleton />
    </TournamentLayout>
  );
}

function RegistrationError() {
  const router = useRouter();
  return (
    <TournamentLayout>
      <main className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black">اطلاعات ثبت‌نام بارگذاری نشد</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
          برای بررسی دوباره شرایط و ظرفیت مسابقه تلاش کن.
        </p>
        <button
          type="button"
          onClick={() => void router.invalidate()}
          className="mt-6 h-11 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground"
        >
          تلاش دوباره
        </button>
      </main>
    </TournamentLayout>
  );
}

function RegistrationNotFound() {
  return (
    <TournamentLayout>
      <main className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black">مسابقه برای ثبت‌نام پیدا نشد</h1>
        <Link to="/tournaments" className="mt-6 inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground">
          مشاهده مسابقات
        </Link>
      </main>
    </TournamentLayout>
  );
}
