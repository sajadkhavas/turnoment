import {
  tournamentDiscoveryPageSchema,
  type TournamentDiscoveryDate,
  type TournamentDiscoveryFormat,
  type TournamentDiscoveryItem,
  type TournamentDiscoveryPageData,
  type TournamentDiscoveryQuery,
  type TournamentDiscoveryRepository,
} from "./tournament-discovery-contract";

const games = [
  { gameId: "eafc26", slug: "ea-fc-26", name: "EA FC 26" },
  { gameId: "efootball", slug: "efootball", name: "eFootball" },
  { gameId: "tekken8", slug: "tekken-8", name: "Tekken 8" },
  { gameId: "mk", slug: "mortal-kombat", name: "Mortal Kombat" },
  { gameId: "cs2", slug: "counter-strike-2", name: "Counter-Strike 2" },
  { gameId: "warcraft", slug: "warcraft", name: "Warcraft" },
] as const;

const cities = [
  { value: "karaj", label: "کرج" },
  { value: "tehran", label: "تهران" },
] as const;

type FixtureRecord = {
  item: TournamentDiscoveryItem;
  cityValue: string;
  dateBuckets: TournamentDiscoveryDate[];
  formatValue: TournamentDiscoveryFormat;
  suggestedRank: number;
};

const records: FixtureRecord[] = [
  {
    item: {
      tournamentId: "t1",
      tournamentSlug: "fc26-karaj-champions-cup",
      title: "جام قهرمانان کرج",
      game: games[0],
      venue: { gamingCenterId: "c1", name: "Arena Gaming Center", verified: true, city: "کرج", district: "عظیمیه" },
      lifecycleState: "filling",
      registrationState: "filling",
      startsAt: "2026-09-18T20:30:00+03:30",
      timezone: "Asia/Tehran",
      displayDate: "جمعه ۲۷ شهریور",
      displayTime: "۲۰:۳۰",
      formatLabel: "۱ نفره",
      bracketFormatLabel: "حذفی تک‌حذفی",
      capacity: { limit: 32, registered: 26, remaining: 6 },
      entryFee: { amount: 1500000, currency: "IRR" },
      fixedPrize: { amount: 50000000, currency: "IRR" },
    },
    cityValue: "karaj",
    dateBuckets: ["weekend", "week"],
    formatValue: "single-elim",
    suggestedRank: 1,
  },
  {
    item: {
      tournamentId: "t2",
      tournamentSlug: "tekken-night-04",
      title: "Tekken Night #04",
      game: games[2],
      venue: { gamingCenterId: "c2", name: "Nova Gaming", verified: true, city: "تهران", district: "سعادت‌آباد" },
      lifecycleState: "registration_open",
      registrationState: "open",
      startsAt: "2026-09-17T18:00:00+03:30",
      timezone: "Asia/Tehran",
      displayDate: "پنج‌شنبه ۲۶ شهریور",
      displayTime: "۱۸:۰۰",
      formatLabel: "۱ نفره",
      bracketFormatLabel: "دوحذفی",
      capacity: { limit: 16, registered: 9, remaining: 7 },
      entryFee: { amount: 1000000, currency: "IRR" },
      fixedPrize: { amount: 25000000, currency: "IRR" },
    },
    cityValue: "tehran",
    dateBuckets: ["week"],
    formatValue: "double-elim",
    suggestedRank: 2,
  },
  {
    item: {
      tournamentId: "t3",
      tournamentSlug: "mortal-kombat-clash",
      title: "Mortal Kombat Clash",
      game: games[3],
      venue: { gamingCenterId: "c3", name: "Pixel House", verified: true, city: "تهران", district: "نارمک" },
      lifecycleState: "registration_closed",
      registrationState: "closed",
      startsAt: "2026-09-19T19:00:00+03:30",
      timezone: "Asia/Tehran",
      displayDate: "شنبه ۲۸ شهریور",
      displayTime: "۱۹:۰۰",
      formatLabel: "۱ نفره",
      bracketFormatLabel: "گروهی + حذفی",
      capacity: { limit: 24, registered: 24, remaining: 0 },
      entryFee: { amount: 1200000, currency: "IRR" },
      fixedPrize: { amount: 30000000, currency: "IRR" },
    },
    cityValue: "tehran",
    dateBuckets: ["weekend", "week"],
    formatValue: "round-robin",
    suggestedRank: 7,
  },
  {
    item: {
      tournamentId: "t4",
      tournamentSlug: "efootball-weekly-league",
      title: "لیگ هفتگی eFootball",
      game: games[1],
      venue: { gamingCenterId: "c2", name: "Nova Gaming", verified: true, city: "تهران", district: "سعادت‌آباد" },
      lifecycleState: "registration_open",
      registrationState: "open",
      startsAt: "2026-09-20T17:30:00+03:30",
      timezone: "Asia/Tehran",
      displayDate: "یکشنبه ۲۹ شهریور",
      displayTime: "۱۷:۳۰",
      formatLabel: "۱ نفره",
      bracketFormatLabel: "لیگ گروهی",
      capacity: { limit: 20, registered: 11, remaining: 9 },
      entryFee: { amount: 800000, currency: "IRR" },
      fixedPrize: { amount: 15000000, currency: "IRR" },
    },
    cityValue: "tehran",
    dateBuckets: ["week"],
    formatValue: "round-robin",
    suggestedRank: 4,
  },
  {
    item: {
      tournamentId: "t5",
      tournamentSlug: "cs2-open-cup",
      title: "CS2 Open Cup",
      game: games[4],
      venue: { gamingCenterId: "c3", name: "Pixel House", verified: true, city: "تهران", district: "نارمک" },
      lifecycleState: "registration_open",
      registrationState: "open",
      startsAt: "2026-09-25T15:00:00+03:30",
      timezone: "Asia/Tehran",
      displayDate: "جمعه ۳ مهر",
      displayTime: "۱۵:۰۰",
      formatLabel: "تیمی ۵ نفره",
      bracketFormatLabel: "حذفی تک‌حذفی",
      capacity: { limit: 16, registered: 6, remaining: 10 },
      entryFee: { amount: 2000000, currency: "IRR" },
      fixedPrize: { amount: 60000000, currency: "IRR" },
    },
    cityValue: "tehran",
    dateBuckets: ["weekend"],
    formatValue: "team",
    suggestedRank: 5,
  },
  {
    item: {
      tournamentId: "t6",
      tournamentSlug: "eafc26-winter-cup-karaj",
      title: "جام آزاد EA FC 26 کرج",
      game: games[0],
      venue: { gamingCenterId: "c1", name: "Arena Gaming Center", verified: true, city: "کرج", district: "عظیمیه" },
      lifecycleState: "upcoming",
      registrationState: "upcoming",
      startsAt: "2026-09-26T19:00:00+03:30",
      timezone: "Asia/Tehran",
      displayDate: "شنبه ۴ مهر",
      displayTime: "۱۹:۰۰",
      formatLabel: "۱ نفره",
      bracketFormatLabel: "دوحذفی",
      capacity: { limit: 32, registered: 0, remaining: 32 },
      entryFee: { amount: 1800000, currency: "IRR" },
      fixedPrize: { amount: 70000000, currency: "IRR" },
    },
    cityValue: "karaj",
    dateBuckets: [],
    formatValue: "double-elim",
    suggestedRank: 6,
  },
  {
    item: {
      tournamentId: "t7",
      tournamentSlug: "tekken-rookie-night",
      title: "Tekken Rookie Night",
      game: games[2],
      venue: { gamingCenterId: "c4", name: "Gohardasht Play", verified: false, city: "کرج", district: "گوهردشت" },
      lifecycleState: "registration_open",
      registrationState: "open",
      startsAt: "2026-09-12T18:00:00+03:30",
      timezone: "Asia/Tehran",
      displayDate: "شنبه ۲۱ شهریور",
      displayTime: "۱۸:۰۰",
      formatLabel: "۱ نفره",
      bracketFormatLabel: "حذفی تک‌حذفی",
      capacity: { limit: 16, registered: 4, remaining: 12 },
      entryFee: { amount: 0, currency: "IRR" },
      fixedPrize: { amount: 8000000, currency: "IRR" },
    },
    cityValue: "karaj",
    dateBuckets: ["tomorrow", "weekend", "week"],
    formatValue: "1v1",
    suggestedRank: 3,
  },
  {
    item: {
      tournamentId: "t8",
      tournamentSlug: "efootball-tehran-derby",
      title: "دربی eFootball تهران",
      game: games[1],
      venue: { gamingCenterId: "c3", name: "Pixel House", verified: true, city: "تهران", district: "نارمک" },
      lifecycleState: "filling",
      registrationState: "filling",
      startsAt: "2026-09-11T19:30:00+03:30",
      timezone: "Asia/Tehran",
      displayDate: "جمعه ۲۰ شهریور",
      displayTime: "۱۹:۳۰",
      formatLabel: "۱ نفره",
      bracketFormatLabel: "دوحذفی",
      capacity: { limit: 24, registered: 22, remaining: 2 },
      entryFee: { amount: 2500000, currency: "IRR" },
      fixedPrize: { amount: 40000000, currency: "IRR" },
    },
    cityValue: "tehran",
    dateBuckets: ["today", "weekend", "week"],
    formatValue: "1v1",
    suggestedRank: 1,
  },
  {
    item: {
      tournamentId: "t9",
      tournamentSlug: "eafc26-open-friday",
      title: "EA FC 26 جمعه باز",
      game: games[0],
      venue: { gamingCenterId: "c2", name: "Nova Gaming", verified: true, city: "تهران", district: "سعادت‌آباد" },
      lifecycleState: "registration_open",
      registrationState: "open",
      startsAt: "2026-09-18T11:00:00+03:30",
      timezone: "Asia/Tehran",
      displayDate: "جمعه ۲۷ شهریور",
      displayTime: "۱۱:۰۰",
      formatLabel: "۱ نفره",
      bracketFormatLabel: "لیگ گروهی",
      capacity: { limit: 20, registered: 3, remaining: 17 },
      entryFee: { amount: 0, currency: "IRR" },
      fixedPrize: { amount: 10000000, currency: "IRR" },
    },
    cityValue: "tehran",
    dateBuckets: ["weekend", "week"],
    formatValue: "round-robin",
    suggestedRank: 8,
  },
  {
    item: {
      tournamentId: "t10",
      tournamentSlug: "warcraft-tehran-invitational",
      title: "Warcraft Invitational تهران",
      game: games[5],
      venue: { gamingCenterId: "c2", name: "Nova Gaming", verified: true, city: "تهران", district: "سعادت‌آباد" },
      lifecycleState: "upcoming",
      registrationState: "upcoming",
      startsAt: "2026-10-03T17:00:00+03:30",
      timezone: "Asia/Tehran",
      displayDate: "شنبه ۱۱ مهر",
      displayTime: "۱۷:۰۰",
      formatLabel: "۱ نفره",
      bracketFormatLabel: "دوحذفی",
      capacity: { limit: 12, registered: 0, remaining: 12 },
      entryFee: { amount: 6000000, currency: "IRR" },
      fixedPrize: { amount: 120000000, currency: "IRR" },
    },
    cityValue: "tehran",
    dateBuckets: [],
    formatValue: "double-elim",
    suggestedRank: 9,
  },
];

function matchesPrice(amount: number, price: TournamentDiscoveryQuery["price"]) {
  if (!price) return true;
  if (price === "free") return amount === 0;
  if (price === "lt300") return amount > 0 && amount < 3000000;
  if (price === "300-500") return amount >= 3000000 && amount <= 5000000;
  return amount > 5000000;
}

function matches(record: FixtureRecord, query: TournamentDiscoveryQuery) {
  const { item } = record;
  return (
    (!query.game || item.game.gameId === query.game || item.game.slug === query.game) &&
    (!query.city || record.cityValue === query.city) &&
    (!query.date || record.dateBuckets.includes(query.date)) &&
    (!query.status || item.registrationState === query.status) &&
    (!query.format || record.formatValue === query.format) &&
    matchesPrice(item.entryFee.amount, query.price) &&
    (!query.verified || item.venue.verified)
  );
}

function sortRecords(items: FixtureRecord[], sort: TournamentDiscoveryQuery["sort"]) {
  const sorted = [...items];
  if (sort === "soonest") sorted.sort((a, b) => Date.parse(a.item.startsAt) - Date.parse(b.item.startsAt));
  else if (sort === "limited") sorted.sort((a, b) => a.item.capacity.remaining - b.item.capacity.remaining);
  else if (sort === "cheapest") sorted.sort((a, b) => a.item.entryFee.amount - b.item.entryFee.amount);
  else if (sort === "prize") sorted.sort((a, b) => b.item.fixedPrize.amount - a.item.fixedPrize.amount);
  else sorted.sort((a, b) => a.suggestedRank - b.suggestedRank || Date.parse(a.item.startsAt) - Date.parse(b.item.startsAt));
  return sorted;
}

export function getTournamentDiscoveryFixture(query: TournamentDiscoveryQuery): TournamentDiscoveryPageData {
  const pageSize = 6;
  const filtered = sortRecords(records.filter((record) => matches(record, query)), query.sort);
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(query.page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageRecords = filtered.slice(start, start + pageSize);
  const items = pageRecords.map((record) => structuredClone(record.item));
  const featuredTournamentId = items.some((item) => item.tournamentId === "t1") ? "t1" : null;

  return tournamentDiscoveryPageSchema.parse({
    schemaVersion: 1,
    filters: {
      games: games.map((game) => ({ ...game })),
      cities: cities.map((city) => ({ ...city })),
    },
    activeQuery: { ...query, page: currentPage },
    featuredTournamentId,
    items,
    pagination: { currentPage, totalPages, totalItems, pageSize },
  });
}

export class MockTournamentDiscoveryRepository implements TournamentDiscoveryRepository {
  async getDiscovery(query: TournamentDiscoveryQuery): Promise<TournamentDiscoveryPageData> {
    return getTournamentDiscoveryFixture(query);
  }
}
