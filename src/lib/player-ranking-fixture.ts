import {
  playerRankingPageSchema,
  type PlayerRankingPageData,
  type PlayerRankingQuery,
  type PlayerRankingRepository,
  type PlayerRankingType,
} from "./player-ranking-contract";

const games = [
  { gameId: "game-ea-fc-26", slug: "ea-fc-26", name: "EA FC 26" },
  { gameId: "game-efootball", slug: "efootball", name: "eFootball" },
  { gameId: "game-tekken-8", slug: "tekken-8", name: "Tekken 8" },
  { gameId: "game-mortal-kombat", slug: "mortal-kombat", name: "Mortal Kombat" },
  { gameId: "game-cs2", slug: "cs2", name: "Counter-Strike 2" },
];

const seasons = [
  { id: "season-current", slug: "current", label: "فصل جاری" },
  { id: "season-all-time", slug: "all-time", label: "تمام دوران" },
];

const regions = [
  { id: "region-karaj", slug: "karaj", label: "کرج" },
  { id: "region-tehran", slug: "tehran", label: "تهران" },
  { id: "region-isfahan", slug: "isfahan", label: "اصفهان" },
  { id: "region-mashhad", slug: "mashhad", label: "مشهد" },
  { id: "region-shiraz", slug: "shiraz", label: "شیراز" },
  { id: "region-tabriz", slug: "tabriz", label: "تبریز" },
];

const types = [
  { id: "tournament" as const, label: "امتیاز مسابقات" },
  { id: "challenge" as const, label: "امتیاز چالش" },
];

const players = [
  { playerId: "player-sajjadx", username: "sajjadx", gamerTag: "SajjadX", city: { cityId: "karaj", slug: "karaj", name: "کرج" } },
  { playerId: "player-arminfc", username: "arminfc", gamerTag: "ArminFC", city: { cityId: "tehran", slug: "tehran", name: "تهران" } },
  { playerId: "player-miladpro", username: "miladpro", gamerTag: "MiladPro", city: { cityId: "tehran", slug: "tehran", name: "تهران" } },
  { playerId: "player-rezagg", username: "rezagg", gamerTag: "RezaGG", city: { cityId: "isfahan", slug: "isfahan", name: "اصفهان" } },
  { playerId: "player-aliz", username: "aliz", gamerTag: "AliZ", city: { cityId: "karaj", slug: "karaj", name: "کرج" } },
  { playerId: "player-kazuyair", username: "kazuyair", gamerTag: "KazuyaIR", city: { cityId: "tehran", slug: "tehran", name: "تهران" } },
  { playerId: "player-nimaking", username: "nimaking", gamerTag: "NimaKing", city: { cityId: "mashhad", slug: "mashhad", name: "مشهد" } },
  { playerId: "player-h0ssein", username: "h0ssein", gamerTag: "H0ssein", city: { cityId: "karaj", slug: "karaj", name: "کرج" } },
  { playerId: "player-devilj", username: "devilj", gamerTag: "DevilJ", city: { cityId: "shiraz", slug: "shiraz", name: "شیراز" } },
  { playerId: "player-pouryat", username: "pouryat", gamerTag: "PouryaT", city: { cityId: "tehran", slug: "tehran", name: "تهران" } },
  { playerId: "player-scorpionfa", username: "scorpionfa", gamerTag: "ScorpionFA", city: { cityId: "tehran", slug: "tehran", name: "تهران" } },
  { playerId: "player-subzeroir", username: "subzeroir", gamerTag: "SubZeroIR", city: { cityId: "tabriz", slug: "tabriz", name: "تبریز" } },
  { playerId: "player-mortalali", username: "mortalali", gamerTag: "MortalAli", city: { cityId: "karaj", slug: "karaj", name: "کرج" } },
  { playerId: "player-raidenx", username: "raidenx", gamerTag: "RaidenX", city: { cityId: "isfahan", slug: "isfahan", name: "اصفهان" } },
  { playerId: "player-kitanam", username: "kitanam", gamerTag: "KitanaM", city: { cityId: "tehran", slug: "tehran", name: "تهران" } },
  { playerId: "player-amirhd", username: "amirhd", gamerTag: "AmirHD", city: { cityId: "karaj", slug: "karaj", name: "کرج" } },
  { playerId: "player-sepehrone", username: "sepehrone", gamerTag: "SepehrOne", city: { cityId: "tehran", slug: "tehran", name: "تهران" } },
  { playerId: "player-erfanace", username: "erfanace", gamerTag: "ErfanAce", city: { cityId: "tehran", slug: "tehran", name: "تهران" } },
];

const PAGE_SIZE = 6;
const DEFAULT_GAME = "ea-fc-26";
const DEFAULT_SEASON = "current";

function requireFacet<T extends { slug: string }>(items: T[], slug: string | undefined, fallback: string, kind: string): T {
  const resolved = items.find((item) => item.slug === (slug ?? fallback));
  if (!resolved) throw new Error(`Unknown ${kind} ranking facet.`);
  return resolved;
}

function scoreBase(type: PlayerRankingType, gameIndex: number, seasonSlug: string) {
  const typeBase = type === "tournament" ? 1940 : 1810;
  const seasonAdjustment = seasonSlug === "all-time" ? 85 : 0;
  return typeBase + seasonAdjustment - gameIndex * 17;
}

function buildRows(game: (typeof games)[number], type: PlayerRankingType, seasonSlug: string) {
  const gameIndex = games.findIndex((candidate) => candidate.slug === game.slug);
  const base = scoreBase(type, gameIndex, seasonSlug);

  return players.map((player, index) => {
    const played = 34 - (index % 9) + gameIndex;
    const draws = game.slug === "ea-fc-26" || game.slug === "efootball" ? index % 3 : 0;
    const losses = 5 + (index % 5);
    const wins = Math.max(0, played - losses - draws);
    const movementIndex = (index + gameIndex) % 3;
    const movement = movementIndex === 0
      ? { direction: "up" as const, positions: 1 + (index % 3) }
      : movementIndex === 1
        ? { direction: "flat" as const, positions: 0 }
        : { direction: "down" as const, positions: 1 + (index % 2) };

    return {
      ...player,
      game,
      rank: index + 1,
      rating: Math.max(100, base - index * 31),
      ratingType: type,
      played,
      wins,
      losses,
      draws,
      movement,
    };
  });
}

export function getPlayerRankingFixture(query: PlayerRankingQuery): PlayerRankingPageData {
  const game = requireFacet(games, query.game, DEFAULT_GAME, "game");
  const season = requireFacet(seasons, query.season, DEFAULT_SEASON, "season");
  if (query.region && !regions.some((region) => region.slug === query.region)) {
    throw new Error("Unknown region ranking facet.");
  }

  const rows = buildRows(game, query.type, season.slug)
    .filter((row) => !query.region || row.city.slug === query.region)
    .map((row, index) => ({ ...row, rank: index + 1 }));

  const totalItems = rows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const currentPage = Math.min(query.page, totalPages);
  const offset = (currentPage - 1) * PAGE_SIZE;

  return playerRankingPageSchema.parse({
    schemaVersion: 1,
    filters: { games, seasons, regions, types },
    activeQuery: {
      game: game.slug,
      season: season.slug,
      region: query.region,
      type: query.type,
      page: currentPage,
    },
    items: rows.slice(offset, offset + PAGE_SIZE),
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      pageSize: PAGE_SIZE,
    },
  });
}

export class MockPlayerRankingRepository implements PlayerRankingRepository {
  async getRanking(query: PlayerRankingQuery): Promise<PlayerRankingPageData> {
    return getPlayerRankingFixture(query);
  }
}
