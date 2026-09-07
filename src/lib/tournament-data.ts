import {
  featuredTournaments,
  gamingCenters,
  popularGames,
  playerRankings,
  type TournamentSummary,
  type TournamentFormat,
  type GamingCenterSummary,
} from "./tournament-home-data";

export * from "./tournament-home-data";

export const allTournaments: TournamentSummary[] = [
  ...featuredTournaments,
  {
    id: "t4",
    slug: "efootball-weekly-league",
    title: "لیگ هفتگی eFootball",
    game: "eFootball",
    gameId: "efootball",
    gamingCenterId: "c2",
    formatKind: "round-robin",
    bracket: "لیگ گروهی",
    dateBucket: "week",
    venue: "Nova Gaming",
    venueVerified: true,
    city: "تهران",
    district: "سعادت‌آباد",
    date: "یکشنبه ۱۶ دی",
    time: "۱۷:۳۰",
    format: "۱ نفره",
    capacity: 20,
    registered: 11,
    entryFee: 80000,
    fixedPrize: 1500000,
    status: "open",
  },
  {
    id: "t5",
    slug: "cs2-open-cup",
    title: "CS2 Open Cup",
    game: "Counter-Strike 2",
    gameId: "cs2",
    gamingCenterId: "c3",
    formatKind: "team",
    bracket: "حذفی تک‌حذفی",
    dateBucket: "weekend",
    venue: "Pixel House",
    venueVerified: true,
    city: "تهران",
    district: "نارمک",
    date: "جمعه ۲۱ دی",
    time: "۱۵:۰۰",
    format: "تیمی ۵ نفره",
    capacity: 16,
    registered: 6,
    entryFee: 200000,
    fixedPrize: 6000000,
    status: "open",
  },
  {
    id: "t6",
    slug: "eafc26-winter-cup-karaj",
    title: "جام زمستانی EA FC 26",
    game: "EA FC 26",
    gameId: "eafc26",
    gamingCenterId: "c1",
    formatKind: "double-elim",
    bracket: "دوحذفی",
    dateBucket: "later",
    venue: "Arena Gaming Center",
    venueVerified: true,
    city: "کرج",
    district: "عظیمیه",
    date: "پنج‌شنبه ۲۷ دی",
    time: "۱۹:۰۰",
    format: "۱ نفره",
    capacity: 32,
    registered: 14,
    entryFee: 180000,
    fixedPrize: 7000000,
    status: "open",
  },
  {
    id: "t7",
    slug: "warcraft-legends",
    title: "Warcraft Legends",
    game: "Warcraft",
    gameId: "warcraft",
    gamingCenterId: "c3",
    formatKind: "single-elim",
    bracket: "حذفی تک‌حذفی",
    dateBucket: "week",
    venue: "Pixel House",
    venueVerified: true,
    city: "تهران",
    district: "نارمک",
    date: "دوشنبه ۲۴ دی",
    time: "۱۶:۰۰",
    format: "۱ نفره",
    capacity: 12,
    registered: 12,
    entryFee: 90000,
    fixedPrize: 1200000,
    status: "closed",
  },
  {
    id: "t8",
    slug: "mortal-kombat-rumble",
    title: "Mortal Kombat Rumble",
    game: "Mortal Kombat",
    gameId: "mk",
    gamingCenterId: "c2",
    formatKind: "round-robin",
    bracket: "گروهی + حذفی",
    dateBucket: "weekend",
    venue: "Nova Gaming",
    venueVerified: true,
    city: "تهران",
    district: "سعادت‌آباد",
    date: "شنبه ۲۲ دی",
    time: "۲۰:۰۰",
    format: "۱ نفره",
    capacity: 24,
    registered: 19,
    entryFee: 110000,
    fixedPrize: 2800000,
    status: "filling",
  },
  {
    id: "t9",
    slug: "karaj-cs2-arena-cup",
    title: "Karaj CS2 Arena Cup",
    game: "Counter-Strike 2",
    gameId: "cs2",
    gamingCenterId: "c1",
    formatKind: "team",
    bracket: "حذفی تک‌حذفی",
    dateBucket: "weekend",
    venue: "Arena Gaming Center",
    venueVerified: true,
    city: "کرج",
    district: "عظیمیه",
    date: "جمعه ۲۱ دی",
    time: "۱۴:۰۰",
    format: "تیمی ۵ نفره",
    capacity: 8,
    registered: 6,
    entryFee: 500000,
    fixedPrize: 9000000,
    status: "filling",
  },
  {
    id: "t10",
    slug: "tekken-rookie-night",
    title: "Tekken Rookie Night",
    game: "Tekken 8",
    gameId: "tekken8",
    gamingCenterId: "c4",
    formatKind: "1v1",
    bracket: "حذفی تک‌حذفی",
    dateBucket: "today",
    venue: "Gohardasht Play",
    venueVerified: false,
    city: "کرج",
    district: "گوهردشت",
    date: "امروز",
    time: "۱۸:۰۰",
    format: "۱ نفره",
    capacity: 16,
    registered: 4,
    entryFee: 0,
    fixedPrize: 800000,
    status: "open",
  },
  {
    id: "t11",
    slug: "efootball-tehran-derby",
    title: "دربی eFootball تهران",
    game: "eFootball",
    gameId: "efootball",
    gamingCenterId: "c3",
    formatKind: "1v1",
    bracket: "دوحذفی",
    dateBucket: "tomorrow",
    venue: "Pixel House",
    venueVerified: true,
    city: "تهران",
    district: "نارمک",
    date: "فردا",
    time: "۱۹:۳۰",
    format: "۱ نفره",
    capacity: 24,
    registered: 22,
    entryFee: 250000,
    fixedPrize: 4000000,
    status: "filling",
  },
  {
    id: "t12",
    slug: "eafc26-open-friday",
    title: "EA FC 26 جمعه باز",
    game: "EA FC 26",
    gameId: "eafc26",
    gamingCenterId: "c2",
    formatKind: "round-robin",
    bracket: "لیگ گروهی",
    dateBucket: "weekend",
    venue: "Nova Gaming",
    venueVerified: true,
    city: "تهران",
    district: "سعادت‌آباد",
    date: "جمعه ۲۱ دی",
    time: "۱۱:۰۰",
    format: "۱ نفره",
    capacity: 20,
    registered: 3,
    entryFee: 0,
    fixedPrize: 1000000,
    status: "open",
  },
  {
    id: "t13",
    slug: "mk-karaj-masters",
    title: "Mortal Kombat مسترز کرج",
    game: "Mortal Kombat",
    gameId: "mk",
    gamingCenterId: "c4",
    formatKind: "single-elim",
    bracket: "حذفی تک‌حذفی",
    dateBucket: "later",
    venue: "Gohardasht Play",
    venueVerified: false,
    city: "کرج",
    district: "گوهردشت",
    date: "چهارشنبه ۳ بهمن",
    time: "۱۸:۳۰",
    format: "۱ نفره",
    capacity: 16,
    registered: 0,
    entryFee: 300000,
    fixedPrize: 3000000,
    status: "upcoming",
  },
  {
    id: "t14",
    slug: "warcraft-tehran-invitational",
    title: "Warcraft Invitational تهران",
    game: "Warcraft",
    gameId: "warcraft",
    gamingCenterId: "c2",
    formatKind: "double-elim",
    bracket: "دوحذفی",
    dateBucket: "later",
    venue: "Nova Gaming",
    venueVerified: true,
    city: "تهران",
    district: "سعادت‌آباد",
    date: "شنبه ۶ بهمن",
    time: "۱۷:۰۰",
    format: "۱ نفره",
    capacity: 12,
    registered: 0,
    entryFee: 600000,
    fixedPrize: 12000000,
    status: "upcoming",
  },
  {
    id: "t15",
    slug: "tekken-karaj-championship",
    title: "قهرمانی Tekken کرج",
    game: "Tekken 8",
    gameId: "tekken8",
    gamingCenterId: "c1",
    formatKind: "single-elim",
    bracket: "حذفی تک‌حذفی",
    dateBucket: "week",
    venue: "Arena Gaming Center",
    venueVerified: true,
    city: "کرج",
    district: "عظیمیه",
    date: "سه‌شنبه ۲۵ دی",
    time: "۱۸:۰۰",
    format: "۱ نفره",
    capacity: 16,
    registered: 12,
    entryFee: 350000,
    fixedPrize: 4000000,
    status: "filling",
  },
  {
    id: "t16",
    slug: "cs2-tehran-night-league",
    title: "لیگ شبانه CS2 تهران",
    game: "Counter-Strike 2",
    gameId: "cs2",
    gamingCenterId: "c3",
    formatKind: "round-robin",
    bracket: "لیگ گروهی",
    dateBucket: "week",
    venue: "Pixel House",
    venueVerified: true,
    city: "تهران",
    district: "نارمک",
    date: "دوشنبه ۲۴ دی",
    time: "۲۱:۰۰",
    format: "تیمی ۵ نفره",
    capacity: 10,
    registered: 10,
    entryFee: 400000,
    fixedPrize: 5000000,
    status: "closed",
  },
];

/* ---------- discovery options ---------- */

export const gameOptions = [
  { value: "all", label: "همه بازی‌ها" },
  ...popularGames.map((g) => ({ value: g.id, label: g.name })),
];

export const cityOptions = [
  { value: "all", label: "همه شهرها" },
  { value: "karaj", label: "کرج" },
  { value: "tehran", label: "تهران" },
];

const citySlugByName: Record<string, string> = {
  کرج: "karaj",
  تهران: "tehran",
};

export function citySlug(name: string) {
  return citySlugByName[name] ?? name;
}

export const dateFilterOptions = [
  { value: "all", label: "همه تاریخ‌ها" },
  { value: "today", label: "امروز" },
  { value: "tomorrow", label: "فردا" },
  { value: "weekend", label: "آخر هفته" },
  { value: "week", label: "این هفته" },
];

export const statusOptions = [
  { value: "all", label: "همه" },
  { value: "open", label: "ثبت‌نام باز" },
  { value: "filling", label: "ظرفیت رو به تکمیل" },
  { value: "closed", label: "ثبت‌نام بسته" },
  { value: "upcoming", label: "به‌زودی" },
];

export const formatOptions: { value: string; label: string }[] = [
  { value: "all", label: "همه" },
  { value: "1v1", label: "۱ نفره (1v1)" },
  { value: "team", label: "تیمی" },
  { value: "single-elim", label: "حذفی تک‌حذفی" },
  { value: "double-elim", label: "دوحذفی" },
  { value: "round-robin", label: "لیگ گروهی" },
];

export const priceOptions = [
  { value: "all", label: "همه" },
  { value: "free", label: "رایگان" },
  { value: "lt300", label: "تا ۳۰۰ هزار تومان" },
  { value: "300-500", label: "۳۰۰ تا ۵۰۰ هزار تومان" },
  { value: "gt500", label: "بیش از ۵۰۰ هزار تومان" },
];

export const sortOptions = [
  { value: "suggested", label: "پیشنهادی" },
  { value: "soonest", label: "نزدیک‌ترین زمان" },
  { value: "limited", label: "ظرفیت محدود" },
  { value: "cheapest", label: "کمترین هزینه" },
  { value: "prize", label: "بیشترین جایزه ثابت" },
];

export interface TournamentQuery {
  game: string;
  city: string;
  date: string;
  status: string;
  format: string;
  price: string;
  verified: boolean;
  sort: string;
}

const dateOrder: Record<string, number> = { today: 0, tomorrow: 1, weekend: 2, week: 3, later: 4 };
const statusOrder: Record<string, number> = { filling: 0, open: 1, upcoming: 2, closed: 3 };

function matchesPrice(fee: number, price: string) {
  if (price === "free") return fee === 0;
  if (price === "lt300") return fee > 0 && fee < 300000;
  if (price === "300-500") return fee >= 300000 && fee <= 500000;
  if (price === "gt500") return fee > 500000;
  return true;
}

function matchesFormat(t: TournamentSummary, format: string) {
  if (format === "all") return true;
  if (format === "1v1") return t.formatKind === "1v1" || t.format === "۱ نفره";
  return t.formatKind === (format as TournamentFormat);
}

export function filterTournaments(q: TournamentQuery): TournamentSummary[] {
  const list = allTournaments.filter(
    (t) =>
      (q.game === "all" || t.gameId === q.game) &&
      (q.city === "all" || citySlug(t.city) === q.city) &&
      (q.date === "all" || t.dateBucket === q.date) &&
      (q.status === "all" || t.status === q.status) &&
      matchesFormat(t, q.format) &&
      matchesPrice(t.entryFee, q.price) &&
      (!q.verified || t.venueVerified),
  );

  const sorted = [...list];
  switch (q.sort) {
    case "soonest":
      sorted.sort((a, b) => dateOrder[a.dateBucket] - dateOrder[b.dateBucket]);
      break;
    case "limited":
      sorted.sort((a, b) => a.capacity - a.registered - (b.capacity - b.registered));
      break;
    case "cheapest":
      sorted.sort((a, b) => a.entryFee - b.entryFee);
      break;
    case "prize":
      sorted.sort((a, b) => b.fixedPrize - a.fixedPrize);
      break;
    default:
      sorted.sort(
        (a, b) =>
          statusOrder[a.status] - statusOrder[b.status] ||
          dateOrder[a.dateBucket] - dateOrder[b.dateBucket] ||
          b.fixedPrize - a.fixedPrize,
      );
  }
  return sorted;
}

export function getTournament(idOrSlug: string): TournamentSummary | undefined {
  return allTournaments.find((t) => t.slug === idOrSlug || t.id === idOrSlug);
}

export function getCenter(id: string): GamingCenterSummary | undefined {
  return gamingCenters.find((c) => c.id === id);
}

export function tournamentsOfCenter(centerName: string): TournamentSummary[] {
  return allTournaments.filter((t) => t.venue === centerName);
}

export function gameOf(name: string) {
  return popularGames.find((g) => g.name === name);
}

export function rankingOf(game: string) {
  return playerRankings[game] ?? [];
}

export const discoveryStats = {
  tournaments: allTournaments.length,
  centers: 12,
  cities: new Set(allTournaments.map((t) => t.city)).size,
};

export const tournamentRules = [
  { title: "حضور به‌موقع", desc: "بازیکنان باید ۳۰ دقیقه پیش از شروع مسابقه در گیم‌نت حاضر باشند؛ تأخیر بیش از ۱۵ دقیقه به‌منزله باخت فنی است." },
  { title: "احراز هویت", desc: "ارائه کارت شناسایی معتبر هنگام ورود برای تطبیق با اطلاعات ثبت‌نام الزامی است." },
  { title: "تجهیزات", desc: "استفاده از دسته شخصی مجاز است، اما باید پیش از شروع توسط داور بررسی و تأیید شود." },
  { title: "تنظیمات بازی", desc: "تنظیمات مسابقه (زمان، سختی، قوانین انتخاب کاراکتر یا تیم) پیش از هر مرحله توسط داور اعلام می‌شود." },
  { title: "رفتار ورزشی", desc: "توهین، تقلب یا ترک عمدی مسابقه منجر به حذف از تورنمنت و کسر امتیاز رتبه‌بندی می‌شود." },
  { title: "بازگشت هزینه", desc: "لغو ثبت‌نام تا ۲۴ ساعت پیش از شروع مسابقه امکان‌پذیر است و هزینه به‌صورت کامل بازگردانده می‌شود." },
];
