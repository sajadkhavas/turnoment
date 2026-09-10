import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import {
  PlayerProfileErrorState,
  PlayerProfilePage,
  PlayerProfileSkeleton,
} from "@/components/dashboard/player-profile-page";
import { playerProfileRepository } from "@/lib/player-profile-repository";

export const Route = createFileRoute("/dashboard/profile")({
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
      { title: "پروفایل بازیکن — تورنومنت" },
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

  return (
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
  );
}
