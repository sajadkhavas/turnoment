import { playerAchievementsPageSchema } from "./player-achievements-contract";
import { MockPlayerAchievementsRepository } from "./player-achievements-data";

const repository = new MockPlayerAchievementsRepository();

const firstLoad = await repository.getAchievements({ status: "all", sort: "default", page: 1 });
if (firstLoad.state !== "authenticated") {
  throw new Error("Achievements fixture unexpectedly returned unauthenticated state.");
}
const firstPage = firstLoad.data;

if (!playerAchievementsPageSchema.safeParse(firstPage).success) {
  throw new Error("Mock Achievements data no longer matches the runtime contract.");
}
if (
  firstPage.summary.total !== 8 ||
  firstPage.summary.unlocked !== 3 ||
  firstPage.summary.inProgress !== 3 ||
  firstPage.summary.locked !== 2
) {
  throw new Error("Achievements fixture summary truth drifted unexpectedly.");
}
if (firstPage.pagination.totalItems !== 8 || firstPage.items.length !== 4) {
  throw new Error("Achievements first-page pagination is not deterministic.");
}

const secondLoad = await repository.getAchievements({ status: "all", sort: "default", page: 2 });
if (secondLoad.state !== "authenticated" || secondLoad.data.pagination.currentPage !== 2 || secondLoad.data.items.length !== 4) {
  throw new Error("Achievements second-page pagination is not deterministic.");
}

const unlockedLoad = await repository.getAchievements({ status: "unlocked", sort: "default", page: 1 });
if (
  unlockedLoad.state !== "authenticated" ||
  unlockedLoad.data.items.length !== 3 ||
  unlockedLoad.data.items.some((item) => item.status !== "unlocked")
) {
  throw new Error("Achievements status filter returned unrelated statuses.");
}

const categoryLoad = await repository.getAchievements({
  status: "all",
  categoryId: "rivalry",
  sort: "default",
  page: 1,
});
if (
  categoryLoad.state !== "authenticated" ||
  categoryLoad.data.items.length === 0 ||
  categoryLoad.data.items.some((item) => item.category.categoryId !== "rivalry")
) {
  throw new Error("Achievements category filter returned an unrelated category.");
}

const progressLoad = await repository.getAchievements({ status: "in-progress", sort: "progress", page: 1 });
if (progressLoad.state !== "authenticated") {
  throw new Error("Achievements progress fixture unexpectedly returned unauthenticated state.");
}
for (let index = 1; index < progressLoad.data.items.length; index += 1) {
  const previous = progressLoad.data.items[index - 1].progress?.percent ?? -1;
  const current = progressLoad.data.items[index].progress?.percent ?? -1;
  if (previous < current) {
    throw new Error("Achievements progress sort is not descending by authoritative progress.");
  }
}

const recentLoad = await repository.getAchievements({ status: "unlocked", sort: "recent", page: 1 });
if (
  recentLoad.state !== "authenticated" ||
  recentLoad.data.items[0]?.achievementId !== "ach-close-rivalry"
) {
  throw new Error("Achievements recent sort does not preserve authoritative unlock recency in the fixture.");
}

const impossibleSummary = {
  ...firstPage,
  summary: { ...firstPage.summary, locked: firstPage.summary.locked + 1 },
};
if (playerAchievementsPageSchema.safeParse(impossibleSummary).success) {
  throw new Error("Achievements runtime contract accepted a summary that does not partition total achievements.");
}

const inProgressItem = (await repository.getAchievements({ status: "in-progress", sort: "default", page: 1 }));
if (inProgressItem.state !== "authenticated" || !inProgressItem.data.items[0]) {
  throw new Error("In-progress fixture item is missing.");
}
const invalidMissingProgress = {
  ...firstPage,
  items: [
    { ...inProgressItem.data.items[0], progress: null },
    ...firstPage.items.slice(1),
  ],
};
if (playerAchievementsPageSchema.safeParse(invalidMissingProgress).success) {
  throw new Error("Achievements runtime contract accepted in-progress status without progress.");
}

const invalidCompletedProgress = {
  ...firstPage,
  items: [
    {
      ...inProgressItem.data.items[0],
      progress: { current: 10, target: 10, percent: 100 },
    },
    ...firstPage.items.slice(1),
  ],
};
if (playerAchievementsPageSchema.safeParse(invalidCompletedProgress).success) {
  throw new Error("Achievements runtime contract accepted completed progress as in-progress.");
}

const unlockedItem = unlockedLoad.state === "authenticated" ? unlockedLoad.data.items[0] : undefined;
if (!unlockedItem) throw new Error("Unlocked fixture item is missing.");
const invalidUnlockedTimestamp = {
  ...firstPage,
  items: [{ ...unlockedItem, unlockedAt: null }, ...firstPage.items.slice(1)],
};
if (playerAchievementsPageSchema.safeParse(invalidUnlockedTimestamp).success) {
  throw new Error("Achievements runtime contract accepted unlocked status without unlockedAt.");
}

const invalidCategory = {
  ...firstPage,
  items: [
    {
      ...firstPage.items[0],
      category: { categoryId: "missing-category", name: "دسته ناشناخته" },
    },
    ...firstPage.items.slice(1),
  ],
};
if (playerAchievementsPageSchema.safeParse(invalidCategory).success) {
  throw new Error("Achievements runtime contract accepted an item category absent from category options.");
}

const duplicateId = {
  ...firstPage,
  items: firstPage.items.length > 1
    ? [firstPage.items[0], { ...firstPage.items[1], achievementId: firstPage.items[0].achievementId }, ...firstPage.items.slice(2)]
    : firstPage.items,
};
if (playerAchievementsPageSchema.safeParse(duplicateId).success) {
  throw new Error("Achievements runtime contract accepted duplicate achievement IDs.");
}

const impossiblePagination = {
  ...firstPage,
  pagination: { ...firstPage.pagination, currentPage: 3, totalPages: 2 },
};
if (playerAchievementsPageSchema.safeParse(impossiblePagination).success) {
  throw new Error("Achievements runtime contract accepted currentPage greater than totalPages.");
}

console.log("F13 Player Achievements contract checks passed.");
