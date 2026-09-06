/**
 * Typed mock ranking data.
 * NOTE: all values here are placeholders. The real ranking (tournament rating,
 * challenge rating, eligibility) is calculated backend-side and will replace
 * this module with API data. No calculation logic belongs in the frontend.
 */

export type RankingType = "tournament" | "challenge";

export type RankingTrend = "up" | "down" | "flat";

export interface RankingGame {
  slug: string;
  name: string;
}

export interface RankingSeason {
  id: string;
  label: string;
}

export interface RankingRegion {
  id: string;
  label: string;
}

export interface RankingEntry {
  playerId: string;
  username: string;
  gamerTag: string;
  city: string;
  game: string;
  rank: number;
  tournamentRating: number;
  challengeRating: number;
  played: number;
  wins: number;
  losses: number;
  finalizedMatches: number;
  challengeEligible: boolean;
  challengeMatches: number;
  trend: RankingTrend;
  streak: number;
  recentForm: ("W" | "L")[];
}

export const rankingGames: RankingGame[] = [
  { slug: "ea-fc-26", name: "EA FC 26" },
  { slug: "efootball", name: "eFootball" },
  { slug: "tekken-8", name: "Tekken 8" },
  { slug: "mortal-kombat", name: "Mortal Kombat" },
  { slug: "cs2", name: "Counter-Strike 2" },
  { slug: "warcraft", name: "Warcraft" },
];

export const rankingSeasons: RankingSeason[] = [
  { id: "current", label: "فصل جاری" },
  { id: "s1", label: "فصل ۱" },
  { id: "all", label: "تمام دوران" },
];

export const rankingRegions: RankingRegion[] = [
  { id: "all", label: "کل کشور" },
  { id: "karaj", label: "کرج" },
  { id: "tehran", label: "تهران" },
  { id: "other", label: "سایر شهرها" },
];

export const rankingTypes: { id: RankingType; label: string }[] = [
  { id: "tournament", label: "رتبه مسابقات" },
  { id: "challenge", label: "رتبه چالش" },
];

/** Minimum finalized matches required by the platform to unlock the Challenge system. */
export const CHALLENGE_UNLOCK_MATCHES = 30;

interface Seed {
  tag: string;
  user: string;
  city: string;
}

const seeds: Seed[] = [
  { tag: "SajjadX", user: "sajjadx", city: "کرج" },
  { tag: "ArminFC", user: "arminfc", city: "تهران" },
  { tag: "MiladPro", user: "miladpro", city: "تهران" },
  { tag: "RezaGG", user: "rezagg", city: "اصفهان" },
  { tag: "AliZ", user: "aliz", city: "کرج" },
  { tag: "KazuyaIR", user: "kazuyair", city: "تهران" },
  { tag: "NimaKing", user: "nimaking", city: "مشهد" },
  { tag: "H0ssein", user: "h0ssein", city: "کرج" },
  { tag: "DevilJ", user: "devilj", city: "شیراز" },
  { tag: "PouryaT", user: "pouryat", city: "تهران" },
  { tag: "ScorpionFA", user: "scorpionfa", city: "تهران" },
  { tag: "SubZeroIR", user: "subzeroir", city: "تبریز" },
  { tag: "MortalAli", user: "mortalali", city: "کرج" },
  { tag: "RaidenX", user: "raidenx", city: "اصفهان" },
  { tag: "KitanaM", user: "kitanam", city: "تهران" },
  { tag: "AmirHD", user: "amirhd", city: "کرج" },
  { tag: "SepehrOne", user: "sepehrone", city: "تهران" },
  { tag: "YounesTK", user: "younestk", city: "قم" },
  { tag: "BehradFC", user: "behradfc", city: "کرج" },
  { tag: "ErfanAce", user: "erfanace", city: "رشت" },
];

function form(i: number, wins: number): ("W" | "L")[] {
  return Array.from({ length: 5 }, (_, k) => ((i + k * 3 + wins) % 4 === 0 ? "L" : "W"));
}

function buildGame(game: string, offset: number): RankingEntry[] {
  return seeds.map((s, i) => {
    const rank = i + 1;
    const tournamentRating = 1860 - i * 34 - offset * 7;
    const played = 34 - i + ((offset + i) % 4);
    const wins = Math.max(3, Math.round(played * (0.78 - i * 0.02)));
    const losses = played - wins;
    const finalizedMatches = played + 8 - (i % 5);
    return {
      playerId: `p-${s.user}-${offset}`,
      username: s.user,
      gamerTag: s.tag,
      city: s.city,
      game,
      rank,
      tournamentRating,
      challengeRating: tournamentRating - 90 - ((i * 13) % 60),
      played,
      wins,
      losses,
      finalizedMatches,
      challengeEligible: finalizedMatches >= CHALLENGE_UNLOCK_MATCHES,
      challengeMatches: Math.max(0, 22 - i),
      trend: (i % 3 === 0 ? "up" : i % 3 === 1 ? "flat" : "down") as RankingTrend,
      streak: Math.max(0, 6 - (i % 7)),
      recentForm: form(i, wins),
    };
  });
}

export const rankingByGame: Record<string, RankingEntry[]> = Object.fromEntries(
  rankingGames.map((g, idx) => [g.name, buildGame(g.name, idx)]),
);

export function getRanking(gameName: string): RankingEntry[] {
  return rankingByGame[gameName] ?? [];
}

export function topPlayersOfGame(gameName: string, count = 5): RankingEntry[] {
  return getRanking(gameName).slice(0, count);
}

export function winRate(e: RankingEntry): number {
  return e.played === 0 ? 0 : Math.round((e.wins / e.played) * 100);
}
