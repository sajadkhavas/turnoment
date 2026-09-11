import { z } from "zod";

export const achievementStatusFilters = ["all", "locked", "in-progress", "unlocked"] as const;
export const achievementSortModes = ["default", "recent", "progress"] as const;

export type AchievementStatusFilter = (typeof achievementStatusFilters)[number];
export type AchievementSortMode = (typeof achievementSortModes)[number];

export interface PlayerAchievementsQuery {
  status: AchievementStatusFilter;
  categoryId?: string;
  sort: AchievementSortMode;
  page: number;
}

const stableIdSchema = z.string().trim().min(1).max(128).regex(/^[A-Za-z0-9_-]+$/);
const displayTextSchema = z.string().trim().min(1).max(240);

export const achievementCategorySchema = z
  .object({
    categoryId: stableIdSchema,
    name: z.string().trim().min(1).max(80),
  })
  .strict();

export const achievementProgressSchema = z
  .object({
    current: z.number().int().nonnegative(),
    target: z.number().int().positive(),
    percent: z.number().int().min(0).max(100),
  })
  .strict();

export const playerAchievementItemSchema = z
  .object({
    achievementId: stableIdSchema,
    code: stableIdSchema,
    title: z.string().trim().min(1).max(120),
    description: displayTextSchema,
    category: achievementCategorySchema,
    status: z.enum(["locked", "in-progress", "unlocked"]),
    progress: achievementProgressSchema.nullable(),
    unlockedAt: z.string().datetime({ offset: true }).nullable(),
  })
  .strict()
  .superRefine((item, ctx) => {
    if (item.status === "unlocked" && item.unlockedAt === null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Unlocked achievements require unlockedAt.", path: ["unlockedAt"] });
    }
    if (item.status !== "unlocked" && item.unlockedAt !== null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Only unlocked achievements may expose unlockedAt.", path: ["unlockedAt"] });
    }

    if (item.status === "in-progress") {
      if (item.progress === null) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "In-progress achievements require progress.", path: ["progress"] });
      } else if (
        item.progress.current <= 0 ||
        item.progress.current >= item.progress.target ||
        item.progress.percent <= 0 ||
        item.progress.percent >= 100
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "In-progress achievement progress must be strictly between zero and completion.",
          path: ["progress"],
        });
      }
    }

    if (item.status === "unlocked" && item.progress !== null) {
      if (item.progress.current < item.progress.target || item.progress.percent !== 100) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Unlocked achievement progress must be complete when progress is exposed.",
          path: ["progress"],
        });
      }
    }
  });

export const playerAchievementsSummarySchema = z
  .object({
    total: z.number().int().nonnegative(),
    unlocked: z.number().int().nonnegative(),
    inProgress: z.number().int().nonnegative(),
    locked: z.number().int().nonnegative(),
  })
  .strict()
  .refine((summary) => summary.unlocked + summary.inProgress + summary.locked === summary.total, {
    message: "Achievement status counts must partition the total.",
    path: ["total"],
  });

export const playerAchievementsPaginationSchema = z
  .object({
    currentPage: z.number().int().positive(),
    totalPages: z.number().int().positive(),
    totalItems: z.number().int().nonnegative(),
  })
  .strict()
  .refine((pagination) => pagination.currentPage <= pagination.totalPages, {
    message: "Current page cannot exceed total pages.",
    path: ["currentPage"],
  });

export const playerAchievementsPageSchema = z
  .object({
    player: z
      .object({
        playerId: stableIdSchema,
        gamerTag: z.string().trim().min(1).max(80),
      })
      .strict(),
    timezone: z.string().trim().min(1).max(64),
    summary: playerAchievementsSummarySchema,
    categories: z.array(achievementCategorySchema),
    items: z.array(playerAchievementItemSchema),
    pagination: playerAchievementsPaginationSchema,
  })
  .strict()
  .superRefine((page, ctx) => {
    if (page.pagination.totalItems > page.summary.total) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Filtered achievement total cannot exceed overall total.",
        path: ["pagination", "totalItems"],
      });
    }

    const categoryIds = page.categories.map((category) => category.categoryId);
    if (new Set(categoryIds).size !== categoryIds.length) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Achievement category IDs must be unique.", path: ["categories"] });
    }

    const categoryNames = new Map(page.categories.map((category) => [category.categoryId, category.name]));
    page.items.forEach((item, index) => {
      const expectedName = categoryNames.get(item.category.categoryId);
      if (!expectedName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Achievement item category must exist in category options.",
          path: ["items", index, "category"],
        });
      } else if (expectedName !== item.category.name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Achievement item category label must match its category option.",
          path: ["items", index, "category", "name"],
        });
      }
    });

    const itemIds = page.items.map((item) => item.achievementId);
    if (new Set(itemIds).size !== itemIds.length) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Achievement IDs must be unique within a page.", path: ["items"] });
    }

    const codes = page.items.map((item) => item.code);
    if (new Set(codes).size !== codes.length) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Achievement codes must be unique within a page.", path: ["items"] });
    }
  });

export type PlayerAchievementsPageData = z.infer<typeof playerAchievementsPageSchema>;
export type PlayerAchievementItem = z.infer<typeof playerAchievementItemSchema>;

export const playerAchievementsLoadResultSchema = z.discriminatedUnion("state", [
  z.object({ state: z.literal("authenticated"), data: playerAchievementsPageSchema }).strict(),
  z.object({ state: z.literal("unauthenticated") }).strict(),
]);

export type PlayerAchievementsLoadResult = z.infer<typeof playerAchievementsLoadResultSchema>;

export interface PlayerAchievementsRepository {
  getAchievements(query: PlayerAchievementsQuery): Promise<PlayerAchievementsLoadResult>;
}
