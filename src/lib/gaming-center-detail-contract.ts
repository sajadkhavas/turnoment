import { z } from "zod";

export const gamingCenterPublicIdSchema = z.string().trim().regex(/^[A-Za-z0-9_-]{1,128}$/);
const stableKeySchema = z.string().trim().regex(/^[A-Za-z0-9_-]{1,128}$/);
const slugSchema = z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const labelSchema = z.string().trim().min(1).max(240);
const summarySchema = z.string().trim().min(20).max(420);
const descriptionSchema = z.string().trim().min(40).max(1800);
const assetSchema = z.string().trim().min(1).max(2048);
const nonNegativeIntSchema = z.number().int().nonnegative();
const clockSchema = z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/);

export function parseGamingCenterPublicId(value: unknown) {
  const parsed = gamingCenterPublicIdSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

const cityIdentitySchema = z
  .object({
    cityId: stableKeySchema,
    slug: slugSchema,
    name: labelSchema,
  })
  .strict();

const publicAddressSchema = z
  .object({
    streetAddress: z.string().trim().min(3).max(400),
    addressLocality: labelSchema,
    addressRegion: labelSchema.nullable(),
    postalCode: z.string().trim().min(3).max(20).nullable(),
    addressCountry: z.literal("IR"),
    displayAddress: z.string().trim().min(5).max(500),
  })
  .strict();

const dayOfWeekSchema = z.enum([
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]);

const openingHoursSchema = z
  .object({
    dayOfWeek: z.array(dayOfWeekSchema).min(1).max(7),
    opens: clockSchema,
    closes: clockSchema,
  })
  .strict()
  .superRefine((hours, ctx) => {
    if (new Set(hours.dayOfWeek).size !== hours.dayOfWeek.length) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["dayOfWeek"], message: "Opening-hour days must be unique." });
    }
  });

export const gamingCenterDetailRegistrationSchema = z.enum(["open", "filling", "closed", "upcoming", "unavailable"]);

const gameIdentitySchema = z
  .object({
    gameId: stableKeySchema,
    slug: slugSchema,
    name: labelSchema,
  })
  .strict();

export const gamingCenterDetailTournamentSchema = z
  .object({
    tournamentId: stableKeySchema,
    tournamentSlug: slugSchema,
    title: labelSchema,
    game: gameIdentitySchema,
    startsAt: z.string().datetime({ offset: true }),
    displayDate: labelSchema,
    displayTime: labelSchema,
    registrationState: gamingCenterDetailRegistrationSchema,
  })
  .strict();

const publicPhoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[0-9۰-۹٠-٩ ()-]{7,32}$/)
  .nullable();

export const gamingCenterDetailSchema = z
  .object({
    schemaVersion: z.literal(1),
    centerId: stableKeySchema,
    publicId: gamingCenterPublicIdSchema,
    publicationState: z.literal("published"),
    name: labelSchema,
    verified: z.boolean(),
    city: cityIdentitySchema,
    district: labelSchema,
    summary: summarySchema,
    description: descriptionSchema,
    equipmentLabels: z.array(labelSchema).max(16),
    coverImage: assetSchema.nullable(),
    galleryImages: z.array(assetSchema).max(8),
    upcomingTournamentCount: nonNegativeIntSchema.nullable(),
    publicAddress: publicAddressSchema.nullable(),
    publicPhone: publicPhoneSchema,
    openingHours: z.array(openingHoursSchema).max(7),
    mapUrl: z.string().trim().url().max(2048).nullable(),
    tournaments: z.array(gamingCenterDetailTournamentSchema).max(8),
  })
  .strict()
  .superRefine((center, ctx) => {
    const unique = (values: string[], path: (string | number)[], message: string) => {
      if (new Set(values).size !== values.length) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path, message });
      }
    };

    unique(center.equipmentLabels, ["equipmentLabels"], "Equipment labels must be unique.");
    unique(center.galleryImages, ["galleryImages"], "Gallery images must be unique.");
    unique(center.tournaments.map((tournament) => tournament.tournamentId), ["tournaments"], "Tournament IDs must be unique.");
    unique(center.tournaments.map((tournament) => tournament.tournamentSlug), ["tournaments"], "Tournament slugs must be unique.");

    const openingDays = center.openingHours.flatMap((hours) => hours.dayOfWeek);
    unique(openingDays, ["openingHours"], "A weekday may appear in only one opening-hours rule.");

    if (center.upcomingTournamentCount === 0 && center.tournaments.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["upcomingTournamentCount"],
        message: "An authoritative zero count requires an empty tournament projection.",
      });
    }
    if (center.upcomingTournamentCount !== null && center.upcomingTournamentCount < center.tournaments.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["upcomingTournamentCount"],
        message: "Projected tournaments cannot exceed the authoritative upcoming count.",
      });
    }
  });

export type GamingCenterDetailData = z.infer<typeof gamingCenterDetailSchema>;
export type GamingCenterDetailRegistrationState = z.infer<typeof gamingCenterDetailRegistrationSchema>;

export interface GamingCenterDetailRepository {
  getByPublicId(publicId: string): Promise<GamingCenterDetailData | null>;
}

export function buildGamingCenterLocalBusinessJsonLd(center: GamingCenterDetailData) {
  if (!center.publicAddress) return null;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: center.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: center.publicAddress.streetAddress,
      addressLocality: center.publicAddress.addressLocality,
      ...(center.publicAddress.addressRegion ? { addressRegion: center.publicAddress.addressRegion } : {}),
      ...(center.publicAddress.postalCode ? { postalCode: center.publicAddress.postalCode } : {}),
      addressCountry: center.publicAddress.addressCountry,
    },
    ...(center.publicPhone ? { telephone: center.publicPhone } : {}),
    ...(center.openingHours.length > 0
      ? {
          openingHoursSpecification: center.openingHours.map((hours) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: hours.dayOfWeek,
            opens: hours.opens,
            closes: hours.closes,
          })),
        }
      : {}),
    ...(center.coverImage && /^https?:\/\//i.test(center.coverImage) ? { image: [center.coverImage] } : {}),
  } as const;
}
