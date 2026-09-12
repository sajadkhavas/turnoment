import {
  parsePublicPlayerUsername,
  publicPlayerProfileSchema,
  type PublicPlayerProfileData,
  type PublicPlayerProfileLoadResult,
  type PublicPlayerProfileRepository,
} from "./public-player-profile-contract";

const eaFc26 = { gameId: "game-ea-fc-26", slug: "ea-fc-26", name: "EA FC 26" } as const;
const tekken8 = { gameId: "game-tekken-8", slug: "tekken-8", name: "Tekken 8" } as const;
const currentSeason = { seasonId: "season-current", slug: "current", label: "فصل جاری" } as const;

const profiles: PublicPlayerProfileData[] = [
  publicPlayerProfileSchema.parse({
    schemaVersion: 1,
    publicationState: "published",
    searchVisibility: "indexable",
    playerId: "player-sajjadx",
    username: "sajjadx",
    gamerTag: "SajjadX",
    avatarUrl: null,
    city: { cityId: "karaj", slug: "karaj", name: "کرج" },
    publicBio: "بازیکن رقابتی EA FC در Turnoment و شرکت‌کننده مسابقات حضوری.",
    competitiveSnapshots: [
      {
        snapshotId: "snapshot-sajjadx-eafc-tournament-current",
        game: eaFc26,
        season: currentSeason,
        ratingType: "tournament",
        rating: 1940,
        rank: 1,
        played: 34,
        wins: 27,
        losses: 5,
        draws: 2,
        movement: { direction: "up", positions: 2 },
      },
      {
        snapshotId: "snapshot-sajjadx-eafc-challenge-current",
        game: eaFc26,
        season: currentSeason,
        ratingType: "challenge",
        rating: 1810,
        rank: 3,
        played: 22,
        wins: 17,
        losses: 5,
        draws: 0,
        movement: { direction: "flat", positions: 0 },
      },
    ],
    recentResults: [
      {
        resultId: "result-sajjadx-003",
        tournament: { tournamentId: "tournament-autumn-cup", name: "جام پاییز EA FC" },
        game: eaFc26,
        outcome: "win",
        opponentGamerTag: "ArminFC",
        completedAt: "2026-09-08T18:30:00+03:30",
      },
      {
        resultId: "result-sajjadx-002",
        tournament: { tournamentId: "tournament-karaj-night", name: "شب رقابتی کرج" },
        game: eaFc26,
        outcome: "win",
        opponentGamerTag: "MiladPro",
        completedAt: "2026-09-02T20:00:00+03:30",
      },
      {
        resultId: "result-sajjadx-001",
        tournament: { tournamentId: "tournament-summer-final", name: "فینال تابستان Turnoment" },
        game: eaFc26,
        outcome: "loss",
        opponentGamerTag: "RezaGG",
        completedAt: "2026-08-27T21:15:00+03:30",
      },
    ],
  }),
  publicPlayerProfileSchema.parse({
    schemaVersion: 1,
    publicationState: "published",
    searchVisibility: "noindex",
    playerId: "player-arminfc",
    username: "arminfc",
    gamerTag: "ArminFC",
    avatarUrl: null,
    city: { cityId: "tehran", slug: "tehran", name: "تهران" },
    publicBio: null,
    competitiveSnapshots: [
      {
        snapshotId: "snapshot-arminfc-eafc-tournament-current",
        game: eaFc26,
        season: currentSeason,
        ratingType: "tournament",
        rating: 1909,
        rank: 2,
        played: 33,
        wins: 25,
        losses: 6,
        draws: 2,
        movement: { direction: "flat", positions: 0 },
      },
      {
        snapshotId: "snapshot-arminfc-tekken-tournament-current",
        game: tekken8,
        season: currentSeason,
        ratingType: "tournament",
        rating: 1670,
        rank: 8,
        played: 14,
        wins: 9,
        losses: 5,
        draws: 0,
        movement: { direction: "down", positions: 1 },
      },
    ],
    recentResults: [],
  }),
];

export function getPublicPlayerProfileFixture(username: string): PublicPlayerProfileLoadResult {
  const parsedUsername = parsePublicPlayerUsername(username);
  if (!parsedUsername) return { state: "not_found" };

  const profile = profiles.find((candidate) => candidate.username === parsedUsername);
  return profile
    ? { state: "published", profile: structuredClone(profile) }
    : { state: "not_found" };
}

export class MockPublicPlayerProfileRepository implements PublicPlayerProfileRepository {
  async getByUsername(username: string): Promise<PublicPlayerProfileLoadResult> {
    return getPublicPlayerProfileFixture(username);
  }
}
