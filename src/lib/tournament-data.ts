import {
  featuredTournaments,
  gamingCenters,
  popularGames,
  playerRankings,
  type TournamentSummary,
  type GamingCenterSummary,
} from "./tournament-home-data";

export * from "./tournament-home-data";

export const allTournaments: TournamentSummary[] = [
  ...featuredTournaments,
  {
    id: "t4",
    title: "لیگ هفتگی eFootball",
    game: "eFootball",
    venue: "Nova Gaming",
    venueVerified: true,
    city: "تهران",
    district: "سعادت‌آباد",
    date: "یکشنبه ۱۶ دی",
    time: "۱۷:۳۰",
    format: "لیگ گروهی",
    capacity: 20,
    registered: 11,
    entryFee: 80000,
    fixedPrize: 1500000,
    status: "open",
  },
  {
    id: "t5",
    title: "CS2 Open Cup",
    game: "Counter-Strike 2",
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
    title: "جام زمستانی EA FC 26",
    game: "EA FC 26",
    venue: "Arena Gaming Center",
    venueVerified: true,
    city: "کرج",
    district: "عظیمیه",
    date: "پنج‌شنبه ۲۷ دی",
    time: "۱۹:۰۰",
    format: "دوحذفی",
    capacity: 32,
    registered: 14,
    entryFee: 180000,
    fixedPrize: 7000000,
    status: "open",
  },
  {
    id: "t7",
    title: "Warcraft Legends",
    game: "Warcraft",
    venue: "Pixel House",
    venueVerified: true,
    city: "تهران",
    district: "نارمک",
    date: "دوشنبه ۲۴ دی",
    time: "۱۶:۰۰",
    format: "حذفی تک‌حذفی",
    capacity: 12,
    registered: 12,
    entryFee: 90000,
    fixedPrize: 1200000,
    status: "closed",
  },
  {
    id: "t8",
    title: "Mortal Kombat Rumble",
    game: "Mortal Kombat",
    venue: "Nova Gaming",
    venueVerified: true,
    city: "تهران",
    district: "سعادت‌آباد",
    date: "شنبه ۲۲ دی",
    time: "۲۰:۰۰",
    format: "گروهی + حذفی",
    capacity: 24,
    registered: 19,
    entryFee: 110000,
    fixedPrize: 2800000,
    status: "filling",
  },
];

export function getTournament(id: string): TournamentSummary | undefined {
  return allTournaments.find((t) => t.id === id);
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

export const tournamentRules = [
  { title: "حضور به‌موقع", desc: "بازیکنان باید ۳۰ دقیقه پیش از شروع مسابقه در گیم‌نت حاضر باشند؛ تأخیر بیش از ۱۵ دقیقه به‌منزله باخت فنی است." },
  { title: "احراز هویت", desc: "ارائه کارت شناسایی معتبر هنگام ورود برای تطبیق با اطلاعات ثبت‌نام الزامی است." },
  { title: "تجهیزات", desc: "استفاده از دسته شخصی مجاز است، اما باید پیش از شروع توسط داور بررسی و تأیید شود." },
  { title: "تنظیمات بازی", desc: "تنظیمات مسابقه (زمان، سختی، قوانین انتخاب کاراکتر یا تیم) پیش از هر مرحله توسط داور اعلام می‌شود." },
  { title: "رفتار ورزشی", desc: "توهین، تقلب یا ترک عمدی مسابقه منجر به حذف از تورنمنت و کسر امتیاز رتبه‌بندی می‌شود." },
  { title: "بازگشت هزینه", desc: "لغو ثبت‌نام تا ۲۴ ساعت پیش از شروع مسابقه امکان‌پذیر است و هزینه به‌صورت کامل بازگردانده می‌شود." },
];
