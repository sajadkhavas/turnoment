import { z } from "zod";

const stableKeySchema = z.string().trim().regex(/^[A-Za-z0-9_-]{1,128}$/);
const slugSchema = z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const labelSchema = z.string().trim().min(1).max(240);
const descriptionSchema = z.string().trim().min(20).max(700);
const nonNegativeIntSchema = z.number().int().nonnegative();
const positiveIntSchema = z.number().int().positive();

export interface GamingCenterDiscoverySearch {
  city?: string;
  page?: number;
}

export interface GamingCenterDiscoveryQuery {
  city?: string;
  page: number;
}

function stableSlug(value: unknown) {
  return typeof value === "string" && slugSchema.safeParse(value).success ? value : undefined;
}

function positivePage(value: unknown) {
  if (typeof value === "number" && Number.isSafeInteger(value) && value > 0) return value;
  if (typeof value === "string" && /^\d+$/.test(value)) {
    const parsed = Number(value);
    if (Number.isSafeInteger(parsed) && parsed > 0) return parsed;
  }
  return undefined;
}

export function normalizeGamingCenterDiscoverySearch(search: Record<string, unknown>): GamingCenterDiscoverySearch {
  const page = positivePage(search.page);
  return {
    city: stableSlug(search.city),
    page: page && page > 1 ? page : undefined,
  };
}

export function buildGamingCenterDiscoveryQuery(search: GamingCenterDiscoverySearch): GamingCenterDiscoveryQuery {
  return {
    city: search.city,
    page: search.page ?? 1,
  };
}

export function compactGamingCenterDiscoverySearch(query: GamingCenterDiscoveryQuery): GamingCenterDiscoverySearch {
  return {
    city: query.city,
    page: query.page > 1 ? query.page : undefined,
  };
}

export function hasGamingCenterDiscoveryFacets(search: GamingCenterDiscoverySearch) {
  return Object.values(search).some((value) => value !== undefined);
}

const cityIdentitySchema = z
  .object({
    cityId: stableKeySchema,
    slug: slugSchema,
    name: labelSchema,
  })
  .strict();

const cityFacetSchema = cityIdentitySchema
  .extend({
    count: nonNegativeIntSchema,
  })
  .strict();

export const gamingCenterDiscoveryItemSchema = z
  .object({
    centerId: stableKeySchema,
    publicId: stableKeySchema,
    publicationState: z.literal("published"),
    name: labelSchema,
    verified: z.boolean(),
    city: cityIdentitySchema,
    district: labelSchema,
    summary: descriptionSchema,
    equipmentLabels: z.array(labelSchema).max(12),
    coverImage: z.string().trim().min(1).max(2048).nullable(),
    upcomingTournamentCount: nonNegativeIntSchema.nullable(),
  })
  .strict()
  .superRefine((center, ctx) => {
    if (new Set(center.equipmentLabels).size !== center.equipmentLabels.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["equipmentLabels"],
        message: "Equipment labels must be unique for a center.",
      });
    }
  });

const activeQuerySchema = z
  .object({
    city: slugSchema.optional(),
    page: positiveIntSchema,
  })
  .strict();

const paginationSchema = z
  .object({
    currentPage: positiveIntSchema,
    totalPages: positiveIntSchema,
    totalItems: nonNegativeIntSchema,
    pageSize: positiveIntSchema.max(50),
  })
  .strict();

export const gamingCenterDiscoveryPageSchema = z
  .object({
    schemaVersion: z.literal(1),
    filters: z
      .object({
        cities: z.array(cityFacetSchema).max(100),
      })
      .strict(),
    activeQuery: activeQuerySchema,
    items: z.array(gamingCenterDiscoveryItemSchema).max(50),
    pagination: paginationSchema,
  })
  .strict()
  .superRefine((page, ctx) => {
    const unique = (values: string[], path: (string | number)[]) => {
      if (new Set(values).size !== values.length) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path, message: "Projected identities must be unique." });
      }
    };

    unique(page.filters.cities.map((city) => city.cityId), ["filters", "cities"]);
    unique(page.filters.cities.map((city) => city.slug), ["filters", "cities"]);
    unique(page.items.map((center) => center.centerId), ["items"]);
    unique(page.items.map((center) => center.publicId), ["items"]);

    if (page.items.length > page.pagination.pageSize) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["items"], message: "Page items cannot exceed pageSize." });
    }

    const expectedTotalPages = Math.max(1, Math.ceil(page.pagination.totalItems / page.pagination.pageSize));
    if (page.pagination.totalPages !== expectedTotalPages) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pagination", "totalPages"],
        message: "totalPages must match totalItems and pageSize.",
      });
    }

    if (page.pagination.currentPage > page.pagination.totalPages) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pagination", "currentPage"],
        message: "currentPage cannot exceed totalPages.",
      });
    }

    if (page.pagination.totalItems === 0 && page.items.length !== 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["items"], message: "Zero totalItems requires an empty page." });
    }
  });

export type GamingCenterDiscoveryItem = z.infer<typeof gamingCenterDiscoveryItemSchema>;
export type GamingCenterDiscoveryPageData = z.infer<typeof gamingCenterDiscoveryPageSchema>;

export interface GamingCenterDiscoveryRepository {
  getDiscovery(query: GamingCenterDiscoveryQuery): Promise<GamingCenterDiscoveryPageData>;
}
