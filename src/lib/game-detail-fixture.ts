import {
  allTournaments,
  gamingCenters,
  playerRankings,
  popularGames,
  type GamingCenterSummary,
  type PlayerRankingEntry,
  type TournamentSummary,
} from "./tournament-data";
import {
  gameDetailSchema,
  type GameCenterSummary,
  type GameCompetitiveFormat,
  type GameDetail,
} from "./game-detail-contract";
import type { GameDetailRepository } from "./game-detail-repository";
import { publicGameSlug } from "./game-slugs";

interface GameCatalogFixture {
  id: string;
  shortName: string;
  description: string;
  platforms: string[];
  formats: GameCompetitiveFormat[];
}

const GAME_CATALOG: GameCatalogFixture[] = [
  {
    id: "eafc26",
    shortName: "EA FC 26",
    description:
      "مسابقات حضوری EA SPORTS FC 26 را در گیم‌نت‌های میزبان پیدا کن، وضعیت ثبت‌نام و فرمت برگزاری را ببین و رتبه‌بندی بازیکنان این بازی را دنبال کن.",
    platforms: ["PS5", "PC"],
    formats: [
      { id: "1v1-single", label: "۱ در برابر ۱ — تک‌حذفی", description: "براکت تک‌حذفی برای رقابت مستقیم بازیکنان تا تعیین نفر برتر.", teamSize: 1 },
      { id: "1v1-double", label: "۱ در برابر ۱ — دوحذفی", description: "براکت دوحذفی با مسیر برنده‌ها و بازنده‌ها و فرصت بازگشت پس از نخستین شکست.", teamSize: 1 },
      { id: "1v1-league", label: "۱ در برابر ۱ — لیگ گروهی", description: "مرحله گروهی با چند مسابقه برای هر بازیکن و جدول صعود همان تورنمنت.", teamSize: 1 },
    ],
  },
  {
    id: "efootball",
    shortName: "eFootball",
    description:
      "مسابقات eFootball را در گیم‌نت‌های میزبان پیدا کن؛ زمان برگزاری، وضعیت ثبت‌نام، فرمت رقابت و رتبه‌بندی بازیکنان را از همین صفحه دنبال کن.",
    platforms: ["PS5", "موبایل"],
    formats: [
      { id: "1v1-double", label: "۱ در برابر ۱ — دوحذفی", description: "براکت دوحذفی برای رقابت‌های ۱ در برابر ۱ با فرصت بازگشت پس از نخستین شکست.", teamSize: 1 },
      { id: "1v1-league", label: "۱ در برابر ۱ — لیگ گروهی", description: "چند مسابقه در مرحله گروهی با جدول صعود مشخص برای همان تورنمنت.", teamSize: 1 },
    ],
  },
  {
    id: "tekken8",
    shortName: "Tekken 8",
    description:
      "مسابقات و تورنمنت‌های حضوری Tekken 8 را پیدا کن، گیم‌نت میزبان و براکت یا فرمت برگزاری را ببین و رتبه‌بندی بازیکنان این بازی را دنبال کن.",
    platforms: ["PS5"],
    formats: [
      { id: "1v1-single", label: "۱ در برابر ۱ — تک‌حذفی", description: "براکت مستقیم ۱ در برابر ۱ برای تورنمنت‌های کوتاه و فشرده.", teamSize: 1 },
      { id: "1v1-double", label: "۱ در برابر ۱ — دوحذفی", description: "براکت دوحذفی با مسیر برنده‌ها و بازنده‌ها برای رقابت‌های چندمرحله‌ای.", teamSize: 1 },
    ],
  },
  {
    id: "mk",
    shortName: "Mortal Kombat",
    description:
      "مسابقات حضوری Mortal Kombat را پیدا کن، زمان و محل برگزاری، وضعیت ثبت‌نام و فرمت رقابت را ببین و رتبه‌بندی بازیکنان را دنبال کن.",
    platforms: ["PS5", "Xbox"],
    formats: [
      { id: "1v1-single", label: "۱ در برابر ۱ — تک‌حذفی", description: "براکت تک‌حذفی برای رقابت مستقیم بازیکنان تا مشخص شدن قهرمان.", teamSize: 1 },
      { id: "1v1-groups", label: "گروهی + حذفی", description: "مرحله گروهی برای تعیین صعودکنندگان و سپس براکت حذفی نهایی.", teamSize: 1 },
    ],
  },
  {
    id: "cs2",
    shortName: "CS2",
    description:
      "مسابقات حضوری Counter-Strike 2 (CS2) را پیدا کن، وضعیت ثبت‌نام تیم‌ها، گیم‌نت میزبان و فرمت رقابت را ببین و رتبه‌بندی بازیکنان این بازی را دنبال کن.",
    platforms: ["PC"],
    formats: [
      { id: "5v5-single", label: "۵ در برابر ۵ — تک‌حذفی", description: "براکت تیمی تک‌حذفی برای رقابت مستقیم تیم‌های پنج‌نفره.", teamSize: 5 },
      { id: "5v5-league", label: "۵ در برابر ۵ — لیگ گروهی", description: "مرحله گروهی چندمسابقه‌ای برای تیم‌های پنج‌نفره با جدول صعود همان تورنمنت.", teamSize: 5 },
    ],
  },
  {
    id: "warcraft",
    shortName: "Warcraft",
    description:
      "مسابقات حضوری Warcraft را پیدا کن، زمان و محل برگزاری، وضعیت ثبت‌نام و فرمت رقابت را ببین و مسیر رقابتی بازیکنان این بازی را دنبال کن.",
    platforms: ["PC"],
    formats: [
      { id: "1v1-single", label: "۱ در برابر ۱ — تک‌حذفی", description: "براکت تک‌حذفی برای رقابت مستقیم بازیکنان در رویدادهای حضوری.", teamSize: 1 },
      { id: "1v1-double", label: "۱ در برابر ۱ — دوحذفی", description: "براکت دوحذفی با فرصت بازگشت پس از نخستین شکست.", teamSize: 1 },
    ],
  },
];

function gameCatalog(identifier: string) {
  return GAME_CATALOG.find(
    (game) => game.id === identifier || publicGameSlug(game.id) === identifier,
  ) ?? null;
}

function currentGameSummary(id: string) {
  return popularGames.find((game) => game.id === id) ?? null;
}

function tournamentsForGame(id: string) {
  const order: Record<TournamentSummary["status"], number> = {
    filling: 0,
    open: 1,
    upcoming: 2,
    closed: 3,
  };
  return allTournaments
    .filter((tournament) => tournament.gameId === id)
    .sort((a, b) => order[a.status] - order[b.status]);
}

function rankingForGame(name: string) {
  const source = playerRankings[name] ?? [];
  return source.map((entry: PlayerRankingEntry) => ({
    rank: entry.rank,
    gamerTag: entry.player,
    city: entry.city,
    rating: entry.points,
    played: entry.played,
    wins: entry.wins,
    trend: entry.trend,
  }));
}

function fallbackCenter(tournament: TournamentSummary): GameCenterSummary {
  return {
    id: tournament.gamingCenterId,
    name: tournament.venue,
    verified: tournament.venueVerified,
    city: tournament.city,
    district: tournament.district,
    rating: null,
    reviews: null,
    image: null,
    equipment: [],
  };
}

function centerProjection(center: GamingCenterSummary): GameCenterSummary {
  return {
    id: center.id,
    name: center.name,
    verified: center.verified,
    city: center.city,
    district: center.district,
    rating: center.rating,
    reviews: center.reviews,
    image: center.image,
    equipment: center.equipment,
  };
}

function centersForGame(tournaments: TournamentSummary[]) {
  const byId = new Map<string, GameCenterSummary>();
  for (const tournament of tournaments) {
    const known = gamingCenters.find((center) => center.id === tournament.gamingCenterId);
    byId.set(
      tournament.gamingCenterId,
      known ? centerProjection(known) : fallbackCenter(tournament),
    );
  }
  return [...byId.values()];
}

function toGameDetail(catalog: GameCatalogFixture): GameDetail | null {
  const summary = currentGameSummary(catalog.id);
  if (!summary) return null;

  const tournaments = tournamentsForGame(catalog.id);
  const rankingEntries = rankingForGame(summary.name);
  const centers = centersForGame(tournaments);
  const openTournamentCount = tournaments.filter(
    (tournament) => tournament.status === "open" || tournament.status === "filling",
  ).length;
  const upcomingTournamentCount = tournaments.filter(
    (tournament) => tournament.status === "upcoming",
  ).length;

  const rankingState = rankingEntries.length > 0 ? "active" : "inactive";
  const rankingCopy = rankingEntries.length > 0
    ? " و رتبه‌بندی بازیکنان"
    : "";
  const seoDescription = `مسابقات حضوری ${summary.name} در ایران؛ وضعیت ثبت‌نام، تورنمنت‌ها، گیم‌نت‌های میزبان، فرمت رقابت${rankingCopy} را دنبال کن.`;

  return gameDetailSchema.parse({
    id: catalog.id,
    slug: publicGameSlug(catalog.id),
    detailVersion: `${catalog.id}:2026-09-09:2`,
    publicationState: "published",
    name: summary.name,
    shortName: catalog.shortName,
    description: catalog.description,
    heroImage: summary.image,
    platforms: catalog.platforms,
    competitiveFormats: catalog.formats,
    stats: {
      openTournamentCount,
      upcomingTournamentCount,
      supportingCenterCount: centers.length,
      rankedPlayerCount: rankingEntries.length,
    },
    tournaments,
    ranking: {
      state: rankingState,
      entries: rankingEntries,
    },
    centers,
    seo: {
      title: `مسابقات ${summary.name} در ایران | تورنمنت حضوری | ایران مهر افزار`,
      description: seoDescription,
    },
  });
}

export class FixtureGameDetailRepository implements GameDetailRepository {
  async getByIdentifier(identifier: string): Promise<GameDetail | null> {
    const catalog = gameCatalog(identifier);
    return catalog ? toGameDetail(catalog) : null;
  }
}

export function canonicalGameSlug(identifier: string) {
  const catalog = gameCatalog(identifier);
  return catalog ? publicGameSlug(catalog.id) : null;
}
