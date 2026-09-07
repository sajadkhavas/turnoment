import gameFc from "@/assets/tournament/game-fc.jpg";
import gameEfootball from "@/assets/tournament/game-efootball.jpg";
import gameTekken from "@/assets/tournament/game-tekken.jpg";
import gameMk from "@/assets/tournament/game-mk.jpg";
import gameCs2 from "@/assets/tournament/game-cs2.jpg";
import gameWarcraft from "@/assets/tournament/game-warcraft.jpg";
import venueArena from "@/assets/tournament/venue-arena.jpg";
import venueNova from "@/assets/tournament/venue-nova.jpg";
import venuePixel from "@/assets/tournament/venue-pixel.jpg";

export interface GameSummary {
  id: string;
  name: string;
  platform: string;
  image: string;
  tournamentCount: number;
}

export type TournamentStatus = "open" | "filling" | "closed" | "upcoming";

export type TournamentFormat = "1v1" | "team" | "single-elim" | "double-elim" | "round-robin";

export type TournamentDateBucket = "today" | "tomorrow" | "weekend" | "week" | "later";

export interface TournamentSummary {
  id: string;
  slug: string;
  title: string;
  game: string;
  gameId: string;
  gamingCenterId: string;
  formatKind: TournamentFormat;
  bracket: string;
  dateBucket: TournamentDateBucket;
  venue: string;
  venueVerified: boolean;
  city: string;
  district: string;
  date: string;
  time: string;
  format: string;
  capacity: number;
  registered: number;
  entryFee: number;
  fixedPrize: number;
  status: TournamentStatus;
}

export interface GamingCenterSummary {
  id: string;
  name: string;
  verified: boolean;
  rating: number;
  reviews: number;
  city: string;
  district: string;
  image: string;
  equipment: string[];
  upcomingTournaments: number;
}

export interface PlayerRankingEntry {
  rank: number;
  player: string;
  city: string;
  points: number;
  played: number;
  wins: number;
  trend: "up" | "down" | "flat";
}

export interface HomeStats {
  centers: number;
  tournaments: number;
  players: number;
}

export const homeStats: HomeStats = { centers: 12, tournaments: 34, players: 1840 };

export const cities = ["تهران", "کرج", "اصفهان", "مشهد", "شیراز", "تبریز"];

export const dateOptions = ["امروز", "فردا", "آخر هفته", "انتخاب تاریخ"];

export const popularGames: GameSummary[] = [
  { id: "eafc26", name: "EA FC 26", platform: "PS5 / PC", image: gameFc, tournamentCount: 11 },
  { id: "efootball", name: "eFootball", platform: "PS5 / موبایل", image: gameEfootball, tournamentCount: 7 },
  { id: "tekken8", name: "Tekken 8", platform: "PS5", image: gameTekken, tournamentCount: 6 },
  { id: "mk", name: "Mortal Kombat", platform: "PS5 / Xbox", image: gameMk, tournamentCount: 5 },
  { id: "cs2", name: "Counter-Strike 2", platform: "PC", image: gameCs2, tournamentCount: 3 },
  { id: "warcraft", name: "Warcraft", platform: "PC", image: gameWarcraft, tournamentCount: 2 },
];

export const featuredTournaments: TournamentSummary[] = [
  {
    id: "t1",
    slug: "fc26-karaj-champions-cup",
    title: "جام قهرمانان کرج",
    game: "EA FC 26",
    gameId: "eafc26",
    gamingCenterId: "c1",
    formatKind: "single-elim",
    bracket: "حذفی تک‌حذفی",
    dateBucket: "weekend",
    venue: "Arena Gaming Center",
    venueVerified: true,
    city: "کرج",
    district: "عظیمیه",
    date: "جمعه ۱۴ دی",
    time: "۲۰:۳۰",
    format: "حذفی تک‌حذفی",
    capacity: 32,
    registered: 26,
    entryFee: 150000,
    fixedPrize: 5000000,
    status: "filling",
  },
  {
    id: "t2",
    slug: "tekken-night-04",
    title: "Tekken Night #04",
    game: "Tekken 8",
    gameId: "tekken8",
    gamingCenterId: "c2",
    formatKind: "double-elim",
    bracket: "دوحذفی",
    dateBucket: "week",
    venue: "Nova Gaming",
    venueVerified: true,
    city: "تهران",
    district: "سعادت‌آباد",
    date: "پنج‌شنبه ۱۳ دی",
    time: "۱۸:۰۰",
    format: "دوحذفی",
    capacity: 16,
    registered: 9,
    entryFee: 100000,
    fixedPrize: 2500000,
    status: "open",
  },
  {
    id: "t3",
    slug: "mortal-kombat-clash",
    title: "Mortal Kombat Clash",
    game: "Mortal Kombat",
    gameId: "mk",
    gamingCenterId: "c3",
    formatKind: "single-elim",
    bracket: "گروهی + حذفی",
    dateBucket: "week",
    venue: "Pixel House",
    venueVerified: true,
    city: "تهران",
    district: "نارمک",
    date: "شنبه ۱۵ دی",
    time: "۱۹:۰۰",
    format: "گروهی + حذفی",
    capacity: 24,
    registered: 24,
    entryFee: 120000,
    fixedPrize: 3000000,
    status: "closed",
  },
];

export const gamingCenters: GamingCenterSummary[] = [
  {
    id: "c1",
    name: "Arena Gaming Center",
    verified: true,
    rating: 4.8,
    reviews: 126,
    city: "کرج",
    district: "عظیمیه",
    image: venueArena,
    equipment: ["PS5", "مانیتور ۱۴۴ هرتز", "دسته حرفه‌ای"],
    upcomingTournaments: 5,
  },
  {
    id: "c2",
    name: "Nova Gaming",
    verified: true,
    rating: 4.6,
    reviews: 94,
    city: "تهران",
    district: "سعادت‌آباد",
    image: venueNova,
    equipment: ["PS5", "تلویزیون ۴K", "صندلی گیمینگ"],
    upcomingTournaments: 4,
  },
  {
    id: "c3",
    name: "Pixel House",
    verified: true,
    rating: 4.5,
    reviews: 71,
    city: "تهران",
    district: "نارمک",
    image: venuePixel,
    equipment: ["PC گیمینگ", "استیج مسابقه", "پخش زنده"],
    upcomingTournaments: 3,
  },
];

export const rankingGames = ["EA FC 26", "Tekken 8", "Mortal Kombat"] as const;

export const playerRankings: Record<string, PlayerRankingEntry[]> = {
  "EA FC 26": [
    { rank: 1, player: "SajjadX", city: "کرج", points: 1842, played: 24, wins: 19, trend: "up" },
    { rank: 2, player: "ArminFC", city: "تهران", points: 1796, played: 22, wins: 17, trend: "flat" },
    { rank: 3, player: "MiladPro", city: "تهران", points: 1740, played: 20, wins: 15, trend: "up" },
    { rank: 4, player: "RezaGG", city: "اصفهان", points: 1688, played: 19, wins: 13, trend: "down" },
    { rank: 5, player: "AliZ", city: "کرج", points: 1655, played: 18, wins: 12, trend: "up" },
  ],
  "Tekken 8": [
    { rank: 1, player: "KazuyaIR", city: "تهران", points: 1810, played: 21, wins: 18, trend: "up" },
    { rank: 2, player: "NimaKing", city: "مشهد", points: 1755, played: 20, wins: 15, trend: "up" },
    { rank: 3, player: "H0ssein", city: "کرج", points: 1702, played: 18, wins: 13, trend: "flat" },
    { rank: 4, player: "DevilJ", city: "شیراز", points: 1664, played: 17, wins: 11, trend: "down" },
    { rank: 5, player: "PouryaT", city: "تهران", points: 1621, played: 16, wins: 10, trend: "up" },
  ],
  "Mortal Kombat": [
    { rank: 1, player: "ScorpionFA", city: "تهران", points: 1788, played: 19, wins: 16, trend: "up" },
    { rank: 2, player: "SubZeroIR", city: "تبریز", points: 1731, played: 18, wins: 14, trend: "flat" },
    { rank: 3, player: "MortalAli", city: "کرج", points: 1690, played: 17, wins: 12, trend: "up" },
    { rank: 4, player: "RaidenX", city: "اصفهان", points: 1642, played: 16, wins: 11, trend: "down" },
    { rank: 5, player: "KitanaM", city: "تهران", points: 1598, played: 15, wins: 9, trend: "flat" },
  ],
};

export const showdown = {
  eyebrow: "مسابقه ویژه هفته",
  title: "نبرد قهرمانان کرج",
  subtitle: "فینال EA FC 26",
  date: "جمعه ۲۰:۳۰",
  venue: "Arena Gaming Center",
  playerA: { name: "SajjadX", rating: 1842, record: "۱۹ برد / ۵ باخت", city: "کرج" },
  playerB: { name: "ArminFC", rating: 1796, record: "۱۷ برد / ۵ باخت", city: "تهران" },
};

export const benefits = [
  { id: "b1", title: "گیم‌نت‌های تأییدشده", desc: "هر مرکز میزبان پیش از انتشار مسابقه بررسی و تأیید می‌شود." },
  { id: "b2", title: "ثبت‌نام آنلاین", desc: "ظرفیت مسابقه را همین‌جا رزرو کن، بدون تماس و صف." },
  { id: "b3", title: "رتبه‌بندی بازیکنان", desc: "نتایج هر مسابقه در امتیاز و جایگاه تو ثبت می‌شود." },
  { id: "b4", title: "براکت زنده", desc: "جدول و نتایج مرحله‌به‌مرحله به‌صورت زنده به‌روز می‌شود." },
];

export const howItWorks = [
  { id: "s1", step: 1, title: "مسابقه‌ات را پیدا کن", desc: "بر اساس بازی، شهر و تاریخ، مسابقه مناسب خودت را انتخاب کن." },
  { id: "s2", step: 2, title: "ثبت‌نام کن", desc: "ظرفیت را آنلاین رزرو کن و جزئیات حضور را دریافت کن." },
  { id: "s3", step: 3, title: "برو برای برد", desc: "در گیم‌نت حاضر شو، رقابت کن و امتیازت را بالا ببر." },
];
