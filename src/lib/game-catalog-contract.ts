import { z } from "zod";

const stableKeySchema = z.string().trim().regex(/^[A-Za-z0-9_-]{1,128}$/);
const slugSchema = z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const labelSchema = z.string().trim().min(1).max(240);
const descriptionSchema = z.string().trim().min(20).max(700);
const nonNegativeIntSchema = z.number().int().nonnegative();

export const gameCatalogItemSchema = z
  .object({
    gameId: stableKeySchema,
    slug: slugSchema,
    publicationState: z.literal("published"),
    name: labelSchema,
    shortName: labelSchema,
    description: descriptionSchema,
    platforms: z.array(labelSchema).min(1).max(8),
    coverImage: z.string().trim().min(1).max(2048).nullable(),
    tournamentCount: nonNegativeIntSchema.nullable(),
  })
  .strict()
  .superRefine((game, ctx) => {
    if (new Set(game.platforms).size !== game.platforms.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["platforms"],
        message: "Platform labels must be unique for a game.",
      });
    }
  });

export const gameCatalogPageSchema = z
  .object({
    schemaVersion: z.literal(1),
    totalItems: nonNegativeIntSchema,
    items: z.array(gameCatalogItemSchema).max(100),
  })
  .strict()
  .superRefine((page, ctx) => {
    if (page.totalItems !== page.items.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["totalItems"],
        message: "Catalog totalItems must equal the complete public item projection.",
      });
    }

    const ids = page.items.map((game) => game.gameId);
    if (new Set(ids).size !== ids.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["items"],
        message: "Game IDs must be unique in the public catalog.",
      });
    }

    const slugs = page.items.map((game) => game.slug);
    if (new Set(slugs).size !== slugs.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["items"],
        message: "Canonical game slugs must be unique in the public catalog.",
      });
    }
  });

export type GameCatalogItem = z.infer<typeof gameCatalogItemSchema>;
export type GameCatalogPageData = z.infer<typeof gameCatalogPageSchema>;

export interface GameCatalogRepository {
  getCatalog(): Promise<GameCatalogPageData>;
}
