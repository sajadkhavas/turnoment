import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import {
  PlayerProfileErrorState,
  PlayerProfilePage,
  PlayerProfileSkeleton,
} from "@/components/dashboard/player-profile-page";
import { PlayerProfileSummary } from "@/components/dashboard/player-profile-summary";
import { playerProfileRepository } from "@/lib/player-profile-repository";

export const Route = createFileRoute("/dashboard/profile")({
  validateSearch: (search: Record<string, unknown>): { edit?: true } => ({
    edit: search.edit === true ? true as const : undefined,
  }),
  loaderDeps: ({ search }) => ({ edit: search.edit }),
  loader: async () => {
    const result = await playerProfileRepository.getProfile();
    if (result.state !== "authenticated") {
      throw redirect({
        to: "/login",
        search: { redirect: "/dashboard/profile" },
      });
    }
    return result.player;
  },
  head: () => ({
    meta: [
      { title: "پروفایل بازیکن — تورنومچ" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  pendingComponent: PlayerProfileSkeleton,
  errorComponent: PlayerProfileErrorState,
  component: PlayerProfileRoute,
});

function PlayerProfileRoute() {
  const player = Route.useLoaderData();
  const navigate = useNavigate({ from: Route.fullPath });

  const { edit } = Route.useSearch();
  if (!edit) return <PlayerProfileSummary player={player} />;

  return (
    <>
    <Link to="/dashboard/profile" search={{}} className="mb-4 inline-flex min-h-11 items-center text-sm text-primary">بازگشت به خلاصهٔ پروفایل</Link>
    <PlayerProfilePage
      initialPlayer={player}
      repository={playerProfileRepository}
      onSessionExpired={() => {
        void navigate({
          to: "/login",
          search: { redirect: "/dashboard/profile" },
          replace: true,
        });
      }}
    />
    </>
  );
}
