import {
  playerAchievementsLoadResultSchema,
  playerAchievementItemSchema,
  type PlayerAchievementsQuery,
  type PlayerAchievementsRepository,
} from "./player-achievements-contract";

const categories = [
  { categoryId: "competitive-path", name: "مسیر رقابتی" },
  { categoryId: "consistency", name: "حضور و استمرار" },
  { categoryId: "rivalry", name: "رویارویی‌ها" },
] as const;

const fixtureItems = playerAchievementItemSchema.array().parse([
  {
    achievementId: "ach-start",
    code: "competitive_start",
    title: "آغاز مسیر",
    description: "نخستین نشان ثبت‌شده در مسیر رقابتی حساب تو.",
    category: categories[0],
    status: "unlocked",
    progress: null,
    unlockedAt: "2026-08-18T18:40:00+03:30",
  },
  {
    achievementId: "ach-steady-rhythm",
    code: "steady_rhythm",
    title: "ریتم ثابت",
    description: "یک مرحله کامل از مسیر استمرار رقابتی برای حساب تو ثبت شده است.",
    category: categories[1],
    status: "unlocked",
    progress: { current: 5, target: 5, percent: 100 },
    unlockedAt: "2026-09-02T21:15:00+03:30",
  },
  {
    achievementId: "ach-close-rivalry",
    code: "close_rivalry",
    title: "رقابت نزدیک",
    description: "یک نقطه شاخص در سابقه رویارویی‌های ثبت‌شده حساب تو کامل شده است.",
    category: categories[2],
    status: "unlocked",
    progress: null,
    unlockedAt: "2026-09-08T20:05:00+03:30",
  },
  {
    achievementId: "ach-forward-path",
    code: "forward_path",
    title: "مسیر رو به جلو",
    description: "پیشرفت این دستاورد هنوز ادامه دارد و آخرین وضعیت ثبت‌شده را می‌بینی.",
    category: categories[1],
    status: "in-progress",
    progress: { current: 7, target: 10, percent: 70 },
    unlockedAt: null,
  },
  {
    achievementId: "ach-field-variety",
    code: "field_variety",
    title: "تنوع میدان",
    description: "بخشی از پیشرفت این دستاورد ثبت شده و هنوز تا تکمیل آن فاصله باقی است.",
    category: categories[0],
    status: "in-progress",
    progress: { current: 3, target: 5, percent: 60 },
    unlockedAt: null,
  },
  {
    achievementId: "ach-more-encounters",
    code: "more_encounters",
    title: "رویارویی بیشتر",
    description: "پیشرفت فعلی این نشان از سابقه معتبر ثبت‌شده در حساب تو آمده است.",
    category: categories[2],
    status: "in-progress",
    progress: { current: 4, target: 8, percent: 50 },
    unlockedAt: null,
  },
  {
    achievementId: "ach-next-stage",
    code: "next_stage",
    title: "مرحله بعدی",
    description: "این دستاورد هنوز باز نشده است؛ وضعیت نهایی آن از مسیر رقابتی حساب تو تعیین می‌شود.",
    category: categories[0],
    status: "locked",
    progress: null,
    unlockedAt: null,
  },
  {
    achievementId: "ach-special-mark",
    code: "special_mark",
    title: "نشان ویژه",
    description: "این نشان هنوز در وضعیت قفل است و زمان بازشدن آن در همین بخش ثبت خواهد شد.",
    category: categories[1],
    status: "locked",
    progress: null,
    unlockedAt: null,
  },
]);

const PAGE_SIZE = 4;

const fixtureSummary = {
  total: fixtureItems.length,
  unlocked: fixtureItems.filter((item) => item.status === "unlocked").length,
  inProgress: fixtureItems.filter((item) => item.status === "in-progress").length,
  locked: fixtureItems.filter((item) => item.status === "locked").length,
};

function filteredAndSorted(query: PlayerAchievementsQuery) {
  let items = fixtureItems.filter((item) => query.status === "all" || item.status === query.status);
  if (query.categoryId) items = items.filter((item) => item.category.categoryId === query.categoryId);

  if (query.sort === "default") return items;

  return [...items].sort((a, b) => {
    if (query.sort === "recent") {
      const aTime = a.unlockedAt ? Date.parse(a.unlockedAt) : 0;
      const bTime = b.unlockedAt ? Date.parse(b.unlockedAt) : 0;
      return bTime !== aTime ? bTime - aTime : a.achievementId.localeCompare(b.achievementId);
    }

    const aProgress = a.progress?.percent ?? (a.status === "unlocked" ? 100 : 0);
    const bProgress = b.progress?.percent ?? (b.status === "unlocked" ? 100 : 0);
    return bProgress !== aProgress ? bProgress - aProgress : a.achievementId.localeCompare(b.achievementId);
  });
}

export class MockPlayerAchievementsRepository implements PlayerAchievementsRepository {
  async getAchievements(query: PlayerAchievementsQuery) {
    const filtered = filteredAndSorted(query);
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(query.page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;

    return playerAchievementsLoadResultSchema.parse({
      state: "authenticated",
      data: {
        player: { playerId: "p-001", gamerTag: "SajadX" },
        timezone: "Asia/Tehran",
        summary: fixtureSummary,
        categories,
        items: filtered.slice(start, start + PAGE_SIZE),
        pagination: {
          currentPage,
          totalPages,
          totalItems: filtered.length,
        },
      },
    });
  }
}
