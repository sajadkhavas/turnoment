import { z } from "zod";
import type { PlayerDashboard, PlayerDashboardRepository } from "./dashboard-data";

const identitySchema = z.object({
  playerId: z.string(),
  username: z.string(),
  gamerTag: z.string(),
  displayName: z.string(),
  city: z.string(),
  primaryGameId: z.string(),
  primaryGame: z.string(),
  statusLabel: z.string(),
  avatarInitials: z.string(),
});

const snapshotSchema = z.object({
  tournamentRating: z.number(),
  tournamentRank: z.number().int().positive(),
  challengeRating: z.number(),
  finalizedMatches: z.number().int().nonnegative(),
  tournamentWins: z.number().int().nonnegative(),
  ratingHistory: z.array(z.number()),
});

const challengeProgressSchema = z.object({
  finalizedMatches: z.number().int().nonnegative(),
  requiredMatches: z.number().int().positive(),
  unlocked: z.boolean(),
});

const nextActionSchema = z.object({
  kind: z.enum(["tournament-approaching", "check-in", "match-ready", "result-confirmation", "none"]),
  title: z.string(),
  description: z.string(),
  ctaLabel: z.string(),
  ctaHref: z.string(),
  meta: z.array(z.string()),
  tone: z.enum(["primary", "warning", "live", "muted"]),
});

const tournamentSchema = z.object({
  tournamentId: z.string(),
  tournamentSlug: z.string(),
  title: z.string(),
  gameId: z.string(),
  game: z.string(),
  gamingCenterId: z.string(),
  venue: z.string(),
  date: z.string(),
  time: z.string(),
  format: z.string(),
  registrationState: z.string(),
  tournamentState: z.enum(["upcoming", "live", "completed"]),
  nextActionLabel: z.string(),
});

const matchSchema = z.object({
  matchId: z.string(),
  opponentUsername: z.string(),
  opponentTag: z.string(),
  gameId: z.string(),
  game: z.string(),
  competition: z.string(),
  kind: z.enum(["tournament", "challenge"]),
  score: z.string(),
  result: z.enum(["win", "loss", "draw"]),
  date: z.string(),
  ratingDelta: z.number().nullable(),
});

const upcomingMatchSchema = z.object({
  matchId: z.string(),
  tournamentId: z.string(),
  tournamentSlug: z.string(),
  competition: z.string(),
  round: z.string(),
  gameId: z.string(),
  game: z.string(),
  opponentUsername: z.string(),
  opponentTag: z.string(),
  time: z.string(),
  venue: z.string(),
  statusLabel: z.string(),
});

const challengeSchema = z.object({
  challengeId: z.string(),
  opponentUsername: z.string(),
  opponentTag: z.string(),
  gameId: z.string(),
  game: z.string(),
  direction: z.enum(["incoming", "outgoing"]),
  statusLabel: z.string(),
  isNew: z.boolean(),
});

const rivalrySchema = z.object({
  rivalryId: z.string(),
  opponentUsername: z.string(),
  opponentTag: z.string(),
  playerScore: z.number().int().nonnegative(),
  opponentScore: z.number().int().nonnegative(),
  meetings: z.number().int().nonnegative(),
  lastMeeting: z.string(),
});

const teamSchema = z.object({
  teamId: z.string(),
  name: z.string(),
  members: z.number().int().nonnegative(),
  gameId: z.string(),
  game: z.string(),
  upcomingEvents: z.number().int().nonnegative(),
});

const achievementSchema = z.object({
  achievementId: z.string(),
  title: z.string(),
  description: z.string(),
  unlocked: z.boolean(),
});

const notificationSchema = z.object({
  notificationId: z.string(),
  kind: z.enum(["schedule", "result", "challenge", "registration"]),
  title: z.string(),
  timeAgo: z.string(),
  unread: z.boolean(),
  href: z.string(),
});

export const playerDashboardSchema = z.object({
  identity: identitySchema,
  snapshot: snapshotSchema,
  challengeProgress: challengeProgressSchema,
  nextAction: nextActionSchema,
  nextTournament: tournamentSchema.nullable(),
  upcomingMatch: upcomingMatchSchema.nullable(),
  recentMatches: z.array(matchSchema),
  tournaments: z.array(tournamentSchema),
  challenges: z.array(challengeSchema),
  rivalry: rivalrySchema.nullable(),
  team: teamSchema.nullable(),
  achievements: z.array(achievementSchema),
  notifications: z.array(notificationSchema),
});

export class DjangoPlayerDashboardRepository implements PlayerDashboardRepository {
  async getDashboard(): Promise<PlayerDashboard> {
    const configured = import.meta.env.VITE_API_BASE_URL?.trim();
    if (!configured) {
      throw new Error("VITE_API_BASE_URL is required when the Django dashboard adapter is enabled.");
    }

    const baseUrl = configured.endsWith("/") ? configured : `${configured}/`;
    const response = await fetch(new URL("api/v1/me/dashboard/", baseUrl), {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Dashboard request failed with HTTP ${response.status}.`);
    }

    return playerDashboardSchema.parse(await response.json()) as PlayerDashboard;
  }
}
