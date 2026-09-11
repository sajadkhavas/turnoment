import gameFc from "@/assets/tournament/game-fc.jpg";
import gameEfootball from "@/assets/tournament/game-efootball.jpg";
import gameTekken from "@/assets/tournament/game-tekken.jpg";
import gameMk from "@/assets/tournament/game-mk.jpg";
import gameCs2 from "@/assets/tournament/game-cs2.jpg";
import gameWarcraft from "@/assets/tournament/game-warcraft.jpg";
import venueArena from "@/assets/tournament/venue-arena.jpg";
import venueNova from "@/assets/tournament/venue-nova.jpg";
import venuePixel from "@/assets/tournament/venue-pixel.jpg";
import { publicHomePageSchema, type PublicHomePageData, type PublicHomeRepository } from "./public-home-contract";

const fixture: PublicHomePageData = publicHomePageSchema.parse({
  schemaVersion: 1,
  stats: {
    activeGamingCenters: 12,
    openOrUpcomingTournaments: 34,
    registeredPlayers: 1840,
  },
  finder: {
    games: [
      { gameId: "eafc26", slug: "ea-fc-26", name: "EA FC 26" },
      { gameId: "efootball", slug: "efootball", name: "eFootball" },
      { gameId: "tekken8", slug: "tekken-8", name: "Tekken 8" },
      { gameId: "mk", slug: "mortal-kombat", name: "Mortal Kombat" },
      { gameId: "cs2", slug: "counter-strike-2", name: "Counter-Strike 2" },
      { gameId: "warcraft", slug: "warcraft", name: "Warcraft" },
    ],
    cities: [
      { value: "karaj", label: "کرج" },
      { value: "tehran", label: "تهران" },
    ],
    dateBuckets: [
      { value: "today", label: "امروز" },
      { value: "tomorrow", label: "فردا" },
      { value: "weekend", label: "آخر هفته" },
      { value: "week", label: "این هفته" },
    ],
  },
  popularGames: [
    { gameId: "eafc26", slug: "ea-fc-26", name: "EA FC 26", platformLabel: "PS5 / PC", imageUrl: gameFc, activeTournamentCount: 11 },
    { gameId: "efootball", slug: "efootball", name: "eFootball", platformLabel: "PS5 / موبایل", imageUrl: gameEfootball, activeTournamentCount: 7 },
    { gameId: "tekken8", slug: "tekken-8", name: "Tekken 8", platformLabel: "PS5", imageUrl: gameTekken, activeTournamentCount: 6 },
    { gameId: "mk", slug: "mortal-kombat", name: "Mortal Kombat", platformLabel: "PS5 / Xbox", imageUrl: gameMk, activeTournamentCount: 5 },
    { gameId: "cs2", slug: "counter-strike-2", name: "Counter-Strike 2", platformLabel: "PC", imageUrl: gameCs2, activeTournamentCount: 3 },
    { gameId: "warcraft", slug: "warcraft", name: "Warcraft", platformLabel: "PC", imageUrl: gameWarcraft, activeTournamentCount: 2 },
  ],
  featuredTournaments: [
    {
      tournamentId: "t1",
      tournamentSlug: "fc26-karaj-champions-cup",
      title: "جام قهرمانان کرج",
      game: { gameId: "eafc26", slug: "ea-fc-26", name: "EA FC 26" },
      venue: { gamingCenterId: "c1", name: "Arena Gaming Center", verified: true, city: "کرج", district: "عظیمیه" },
      startsAt: "2026-09-18T20:30:00+03:30",
      timezone: "Asia/Tehran",
      formatLabel: "حذفی تک‌حذفی",
      capacity: 32,
      registeredCount: 26,
      entryFee: 150000,
      fixedPrize: 5000000,
      registrationState: "filling",
      lifecycleState: "upcoming",
    },
    {
      tournamentId: "t2",
      tournamentSlug: "tekken-night-04",
      title: "Tekken Night #04",
      game: { gameId: "tekken8", slug: "tekken-8", name: "Tekken 8" },
      venue: { gamingCenterId: "c2", name: "Nova Gaming", verified: true, city: "تهران", district: "سعادت‌آباد" },
      startsAt: "2026-09-17T18:00:00+03:30",
      timezone: "Asia/Tehran",
      formatLabel: "دوحذفی",
      capacity: 16,
      registeredCount: 9,
      entryFee: 100000,
      fixedPrize: 2500000,
      registrationState: "open",
      lifecycleState: "upcoming",
    },
    {
      tournamentId: "t3",
      tournamentSlug: "mortal-kombat-clash",
      title: "Mortal Kombat Clash",
      game: { gameId: "mk", slug: "mortal-kombat", name: "Mortal Kombat" },
      venue: { gamingCenterId: "c3", name: "Pixel House", verified: true, city: "تهران", district: "نارمک" },
      startsAt: "2026-09-19T19:00:00+03:30",
      timezone: "Asia/Tehran",
      formatLabel: "گروهی + حذفی",
      capacity: 24,
      registeredCount: 24,
      entryFee: 120000,
      fixedPrize: 3000000,
      registrationState: "closed",
      lifecycleState: "upcoming",
    },
  ],
  featuredGamingCenters: [
    { gamingCenterId: "c1", name: "Arena Gaming Center", verified: true, rating: 4.8, reviewCount: 126, city: "کرج", district: "عظیمیه", imageUrl: venueArena, equipmentLabels: ["PS5", "مانیتور ۱۴۴ هرتز", "دسته حرفه‌ای"], upcomingTournamentCount: 5 },
    { gamingCenterId: "c2", name: "Nova Gaming", verified: true, rating: 4.6, reviewCount: 94, city: "تهران", district: "سعادت‌آباد", imageUrl: venueNova, equipmentLabels: ["PS5", "تلویزیون ۴K", "صندلی گیمینگ"], upcomingTournamentCount: 4 },
    { gamingCenterId: "c3", name: "Pixel House", verified: true, rating: 4.5, reviewCount: 71, city: "تهران", district: "نارمک", imageUrl: venuePixel, equipmentLabels: ["PC گیمینگ", "استیج مسابقه", "پخش زنده"], upcomingTournamentCount: 3 },
  ],
  rankingPreview: {
    game: { gameId: "eafc26", slug: "ea-fc-26", name: "EA FC 26" },
    entries: [
      { rank: 1, player: { playerId: "p1", username: "sajad-x", gamerTag: "SajjadX" }, city: "کرج", rating: 1842, finalizedMatches: 24, wins: 19, trend: "up" },
      { rank: 2, player: { playerId: "p2", username: "armin-fc", gamerTag: "ArminFC" }, city: "تهران", rating: 1796, finalizedMatches: 22, wins: 17, trend: "flat" },
      { rank: 3, player: { playerId: "p3", username: "milad-pro", gamerTag: "MiladPro" }, city: "تهران", rating: 1740, finalizedMatches: 20, wins: 15, trend: "up" },
      { rank: 4, player: { playerId: "p4", username: "reza-gg", gamerTag: "RezaGG" }, city: "اصفهان", rating: 1688, finalizedMatches: 19, wins: 13, trend: "down" },
      { rank: 5, player: { playerId: "p5", username: "ali-z", gamerTag: "AliZ" }, city: "کرج", rating: 1655, finalizedMatches: 18, wins: 12, trend: "up" },
    ],
  },
  featuredShowdown: {
    tournamentId: "t1",
    tournamentSlug: "fc26-karaj-champions-cup",
    matchId: null,
    eyebrow: "رقابت منتخب",
    title: "نبرد قهرمانان کرج",
    subtitle: "EA FC 26",
    startsAt: "2026-09-18T20:30:00+03:30",
    timezone: "Asia/Tehran",
    venueName: "Arena Gaming Center",
    playerA: { playerId: "p1", username: "sajad-x", gamerTag: "SajjadX", city: "کرج", rating: 1842, recordLabel: "۱۹ برد از ۲۴ Match نهایی" },
    playerB: { playerId: "p2", username: "armin-fc", gamerTag: "ArminFC", city: "تهران", rating: 1796, recordLabel: "۱۷ برد از ۲۲ Match نهایی" },
  },
});

export class MockPublicHomeRepository implements PublicHomeRepository {
  async getHome(): Promise<PublicHomePageData> {
    return structuredClone(fixture);
  }
}

export function getPublicHomeFixture(): PublicHomePageData {
  return structuredClone(fixture);
}
