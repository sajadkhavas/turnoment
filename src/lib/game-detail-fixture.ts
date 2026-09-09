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
  type GameCompetitiveFormat,
  type GameDetail,
} from "./game-detail-contract";
import type { GameDetailRepository } from "./game-detail-repository";

interface GameCatalogFixture {
  id: string;
  slug: string;
  shortName: string;
  description: string;
  platforms: string[];
  formats: GameCompetitiveFormat[];
}

const GAME_CATALOG: GameCatalogFixture[] = [
  {
    id: "eafc26",
    slug: "ea-fc-26",
    shortName: "EA FC 26",
    description:
      "EA FC 26 یکی از محورهای رقابت حضوری فوتبال در ترنومنت است؛ مسابقات تک‌نفره با فرمت‌های حذفی و لیگ گروهی در مراکز میزبان برگزار می‌شوند و نتایج رسمی در سابقه رقابتی بازیکن ثبت می‌شود.",
    platforms: ["PS5", "PC"],
    formats: [
      { id: "1v1-single", label: "۱ در برابر ۱ — تک‌حذفی", description: "براکت مستقیم برای رقابت‌های سریع حضوری.", teamSize: 1 },
      { id: "1v1-double", label: "۱ در برابر ۱ — دوحذفی", description: "فرمت دو شانس با مسیر برندگان و بازنده‌ها.", teamSize: 1 },
      { id: "1v1-league", label: "۱ در برابر ۱ — لیگ گروهی", description: "چند بازی مرحله گروهی پیش از تعیین جایگاه نهایی.", teamSize: 1 },
    ],
  },
  {
    id: "efootball",
    slug: "efootball",
    shortName: "eFootball",
    description:
      "eFootball در ترنومنت برای رقابت‌های حضوری سریع و لیگ‌های دوره‌ای استفاده می‌شود. صفحه هر مسابقه فرمت، قوانین، زمان حضور و وضعیت ثبت‌نام همان رویداد را به‌صورت مستقل مشخص می‌کند.",
    platforms: ["PS5", "موبایل"],
    formats: [
      { id: "1v1-double", label: "۱ در برابر ۱ — دوحذفی", description: "رقابت دوحذفی برای حفظ شانس بازگشت بازیکن.", teamSize: 1 },
      { id: "1v1-league", label: "۱ در برابر ۱ — لیگ گروهی", description: "مناسب لیگ‌های هفتگی و جدول امتیازی.", teamSize: 1 },
    ],
  },
  {
    id: "tekken8",
    slug: "tekken-8",
    shortName: "Tekken 8",
    description:
      "Tekken 8 در ترنومنت یک بازی رقابتی مبارزه‌ای برای رویدادهای حضوری ۱ در برابر ۱ است. مسابقات می‌توانند با براکت تک‌حذفی یا دوحذفی برگزار شوند و وضعیت هر رقابت از قرارداد همان تورنمنت می‌آید.",
    platforms: ["PS5"],
    formats: [
      { id: "1v1-single", label: "۱ در برابر ۱ — تک‌حذفی", description: "براکت مستقیم برای مسابقات کوتاه و فشرده.", teamSize: 1 },
      { id: "1v1-double", label: "۱ در برابر ۱ — دوحذفی", description: "براکت دوحذفی برای رقابت‌های عمیق‌تر.", teamSize: 1 },
    ],
  },
  {
    id: "mk",
    slug: "mortal-kombat",
    shortName: "Mortal Kombat",
    description:
      "Mortal Kombat در ترنومنت برای رقابت‌های حضوری مبارزه‌ای ۱ در برابر ۱ استفاده می‌شود. فرمت هر رویداد، ظرفیت، Ruleset و نتیجه نهایی فقط از همان مسابقه معتبر است.",
    platforms: ["PS5", "Xbox"],
    formats: [
      { id: "1v1-single", label: "۱ در برابر ۱ — تک‌حذفی", description: "رقابت مستقیم در براکت تک‌حذفی.", teamSize: 1 },
      { id: "1v1-groups", label: "گروهی + حذفی", description: "مرحله گروهی و سپس براکت حذفی برای تعیین قهرمان.", teamSize: 1 },
    ],
  },
  {
    id: "cs2",
    slug: "counter-strike-2",
    shortName: "CS2",
    description:
      "Counter-Strike 2 در ترنومنت محور رقابت‌های تیمی حضوری است. رویدادهای ۵ در برابر ۵، لیگ و براکت حذفی با مرکز میزبان، ظرفیت تیم‌ها و Ruleset مستقل هر مسابقه مدیریت می‌شوند.",
    platforms: ["PC"],
    formats: [
      { id: "5v5-single", label: "۵ در برابر ۵ — تک‌حذفی", description: "براکت تیمی مستقیم برای رویدادهای حضوری.", teamSize: 5 },
      { id: "5v5-league", label: "۵ در برابر ۵ — لیگ گروهی", description: "رقابت تیمی چندمرحله‌ای با جدول گروهی.", teamSize: 5 },
    ],
  },
  {
    id: "warcraft",
    slug: "warcraft",
    shortName: "Warcraft",
    description:
      "Warcraft در ترنومنت برای رقابت‌های استراتژی حضوری تک‌نفره استفاده می‌شود. هر مسابقه Ruleset و ساختار رقابتی خود را دارد و صفحه بازی فقط مسیر کشف رقابت‌ها و وضعیت عمومی این رشته را نمایش می‌دهد.",
    platforms: ["PC"],
    formats: [
      { id: "1v1-single", label: "۱ در برابر ۱ — تک‌حذفی", description: "براکت مستقیم برای رقابت‌های حضوری تک‌نفره.", teamSize: 1 },
      { id: "1v1-double", label: "۱ در برابر ۱ — دوحذفی", description: "فرمت دوحذفی برای رویدادهای رقابتی طولانی‌تر.", teamSize: 1 },
    ],
  },
];

function gameCatalog(identifier: string) {
  return GAME_CATALOG.find((game) => game.id === identifier || game.slug === identifier) ?? null;
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

function fallbackCenter(tournament: TournamentSummary) {
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

function centerProjection(center: GamingCenterSummary) {
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
  const byId = new Map<string, ReturnType<typeof fallbackCenter>>();
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
  const seoDescription = `${summary.name} در ترنومنت: مسابقات حضوری، گیم‌نت‌های میزبان، فرمت‌های رقابتی و رتبه‌بندی بازیکنان را در یک صفحه ببینید.`;

  return gameDetailSchema.parse({
    id: catalog.id,
    slug: catalog.slug,
    detailVersion: `${catalog.id}:2026-09-09:1`,
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
      title: `${summary.name} | مسابقات و رتبه‌بندی ایران مهر افزار`,
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
  return gameCatalog(identifier)?.slug ?? null;
}
