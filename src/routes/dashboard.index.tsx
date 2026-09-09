import { createFileRoute } from "@tanstack/react-router";
import { playerDashboardRepository } from "@/lib/dashboard-data";
import {
  ChallengeProgressCard,
  CompetitiveSnapshotCards,
  NextActionCard,
  PlayerDashboardHeader,
  RatingTrend,
} from "@/components/dashboard/dashboard-overview";
import {
  AchievementsPreview,
  ChallengesPreview,
  MyTournamentsPreview,
  NextTournamentCard,
  NotificationsPreview,
  QuickActions,
  RecentMatches,
  RivalryPreviewCard,
  TeamPreview,
  UpcomingMatchCard,
} from "@/components/dashboard/dashboard-activity";
import { DashboardErrorState, DashboardSkeleton } from "@/components/dashboard/dashboard-states";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "نمای کلی داشبورد بازیکن — ایران مهر افزار" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  loader: () => playerDashboardRepository.getDashboard(),
  pendingComponent: DashboardSkeleton,
  errorComponent: () => <DashboardErrorState />,
  component: DashboardOverview,
});

function DashboardOverview() {
  const data = Route.useLoaderData();

  return (
    <div className="space-y-6">
      <PlayerDashboardHeader identity={data.identity} />

      <NextActionCard action={data.nextAction} />

      <CompetitiveSnapshotCards snapshot={data.snapshot} />

      <div className="grid gap-4 lg:grid-cols-2">
        <ChallengeProgressCard progress={data.challengeProgress} />
        <RatingTrend history={data.snapshot.ratingHistory} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <NextTournamentCard tournament={data.nextTournament} />
        <UpcomingMatchCard match={data.upcomingMatch} gamerTag={data.identity.gamerTag} />
      </div>

      <RecentMatches matches={data.recentMatches} />

      <MyTournamentsPreview tournaments={data.tournaments} />

      <div className="grid gap-4 lg:grid-cols-2">
        <ChallengesPreview
          challenges={data.challenges}
          unlocked={data.challengeProgress.unlocked}
          finalizedMatches={data.challengeProgress.finalizedMatches}
          requiredMatches={data.challengeProgress.requiredMatches}
        />
        <RivalryPreviewCard rivalry={data.rivalry} gamerTag={data.identity.gamerTag} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <TeamPreview team={data.team} />
        <AchievementsPreview achievements={data.achievements} />
      </div>

      <NotificationsPreview notifications={data.notifications} />

      <QuickActions />
    </div>
  );
}
