import gameFc from "@/assets/tournament/game-fc.jpg";
import gameEfootball from "@/assets/tournament/game-efootball.jpg";
import gameTekken from "@/assets/tournament/game-tekken.jpg";
import gameMk from "@/assets/tournament/game-mk.jpg";
import gameCs2 from "@/assets/tournament/game-cs2.jpg";
import gameWarcraft from "@/assets/tournament/game-warcraft.jpg";
import {
  gameCatalogPageSchema,
  type GameCatalogPageData,
  type GameCatalogRepository,
} from "./game-catalog-contract";

const items = [
  {
    gameId: "eafc26",
    slug: "ea-fc-26",
    publicationState: "published" as const,
    name: "EA FC 26",
    shortName: "EA FC 26",
    description: "مسیر رقابتی EA FC 26 را ببین و از صفحه اختصاصی بازی به مسابقات حضوری، فرمت‌های رقابت و مرکزهای مرتبط برس.",
    platforms: ["PS5", "PC"],
    coverImage: gameFc,
    tournamentCount: 2,
  },
  {
    gameId: "efootball",
    slug: "efootball",
    publicationState: "published" as const,
    name: "eFootball",
    shortName: "eFootball",
    description: "صفحه رقابتی eFootball مسیر مسابقات حضوری، فرمت‌های برگزاری و مرکزهای مرتبط با این بازی را یک‌جا در دسترس قرار می‌دهد.",
    platforms: ["PS5", "موبایل"],
    coverImage: gameEfootball,
    tournamentCount: 2,
  },
  {
    gameId: "tekken8",
    slug: "tekken-8",
    publicationState: "published" as const,
    name: "Tekken 8",
    shortName: "Tekken 8",
    description: "برای Tekken 8 وارد صفحه بازی شو و مسابقات حضوری، فرمت‌های رقابتی و مسیرهای مرتبط با این بازی مبارزه‌ای را بررسی کن.",
    platforms: ["PS5"],
    coverImage: gameTekken,
    tournamentCount: 2,
  },
  {
    gameId: "mk",
    slug: "mortal-kombat",
    publicationState: "published" as const,
    name: "Mortal Kombat",
    shortName: "Mortal Kombat",
    description: "مسیر رقابتی Mortal Kombat را از صفحه اختصاصی بازی دنبال کن و به مسابقات حضوری و اطلاعات مرتبط با رقابت برس.",
    platforms: ["PS5", "Xbox"],
    coverImage: gameMk,
    tournamentCount: 1,
  },
  {
    gameId: "cs2",
    slug: "counter-strike-2",
    publicationState: "published" as const,
    name: "Counter-Strike 2",
    shortName: "CS2",
    description: "صفحه Counter-Strike 2 مسیر ورود به مسابقات حضوری و اطلاعات رقابتی این بازی تیمی را با هویت ثابت بازی در اختیار تو می‌گذارد.",
    platforms: ["PC"],
    coverImage: gameCs2,
    tournamentCount: 1,
  },
  {
    gameId: "warcraft",
    slug: "warcraft",
    publicationState: "published" as const,
    name: "Warcraft",
    shortName: "Warcraft",
    description: "Warcraft را در فهرست بازی‌های رقابتی انتخاب کن و از صفحه بازی به مسابقات حضوری و مسیرهای مرتبط با رقابت دسترسی داشته باش.",
    platforms: ["PC"],
    coverImage: gameWarcraft,
    tournamentCount: 1,
  },
];

export function getGameCatalogFixture(): GameCatalogPageData {
  return gameCatalogPageSchema.parse({
    schemaVersion: 1,
    totalItems: items.length,
    items,
  });
}

export class MockGameCatalogRepository implements GameCatalogRepository {
  async getCatalog(): Promise<GameCatalogPageData> {
    return getGameCatalogFixture();
  }
}
