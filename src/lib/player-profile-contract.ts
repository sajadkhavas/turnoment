import { z } from "zod";
import {
  authenticatedPlayerSchema,
  playerProfileSchema,
  type AuthenticatedPlayer,
} from "./login-auth-contract";

const gamerTagPattern = /^[A-Za-z0-9_.-]{3,24}$/;

export const playerProfileLoadResultSchema = z.discriminatedUnion("state", [
  z.object({ state: z.literal("authenticated"), player: authenticatedPlayerSchema }),
  z.object({ state: z.literal("unauthenticated") }),
]);

export type PlayerProfileLoadResult = z.infer<typeof playerProfileLoadResultSchema>;

export const playerProfileUpdateCommandSchema = z
  .object({
    gamer_tag: z.string().regex(gamerTagPattern).nullable(),
    display_name: z.string().max(80),
    city: z.string().max(80),
    bio: z.string().max(280),
    interview_opt_in: z.boolean(),
  })
  .strict();

export type PlayerProfileUpdateCommand = z.infer<typeof playerProfileUpdateCommandSchema>;

export type PlayerProfileDraft = {
  gamerTag: string;
  displayName: string;
  city: string;
  bio: string;
  interviewOptIn: boolean;
};

export type PlayerProfileFieldErrors = Partial<
  Record<"gamerTag" | "displayName" | "city" | "bio" | "interviewOptIn", string>
>;

const fieldErrorsSchema = z
  .object({
    gamerTag: z.string().min(1).optional(),
    displayName: z.string().min(1).optional(),
    city: z.string().min(1).optional(),
    bio: z.string().min(1).optional(),
    interviewOptIn: z.string().min(1).optional(),
  })
  .strict();

export const updatePlayerProfileActionSchema = z.discriminatedUnion("outcome", [
  z.object({ outcome: z.literal("saved"), profile: playerProfileSchema }),
  z.object({
    outcome: z.literal("validation_error"),
    message: z.string().min(1),
    fieldErrors: fieldErrorsSchema,
  }),
  z.object({
    outcome: z.literal("conflict"),
    message: z.string().min(1),
    fieldErrors: fieldErrorsSchema,
  }),
  z.object({ outcome: z.literal("session_expired"), message: z.string().min(1) }),
]);

export type UpdatePlayerProfileAction = z.infer<typeof updatePlayerProfileActionSchema>;

export type ProfileDraftValidation =
  | { valid: true; command: PlayerProfileUpdateCommand }
  | { valid: false; fieldErrors: PlayerProfileFieldErrors };

export function playerToProfileDraft(player: AuthenticatedPlayer): PlayerProfileDraft {
  return {
    gamerTag: player.profile.gamer_tag ?? "",
    displayName: player.profile.display_name,
    city: player.profile.city,
    bio: player.profile.bio,
    interviewOptIn: player.profile.interview_opt_in,
  };
}

export function validatePlayerProfileDraft(draft: PlayerProfileDraft): ProfileDraftValidation {
  const gamerTag = draft.gamerTag.trim();
  const displayName = draft.displayName.trim();
  const city = draft.city.trim();
  const bio = draft.bio.trim();
  const fieldErrors: PlayerProfileFieldErrors = {};

  if (gamerTag && !gamerTagPattern.test(gamerTag)) {
    fieldErrors.gamerTag =
      "شناسه بازیکن باید ۳ تا ۲۴ کاراکتر و فقط شامل حروف لاتین، عدد، نقطه، خط تیره یا زیرخط باشد.";
  }
  if (displayName.length > 80) {
    fieldErrors.displayName = "نام نمایشی نمی‌تواند بیشتر از ۸۰ کاراکتر باشد.";
  }
  if (city.length > 80) {
    fieldErrors.city = "نام شهر نمی‌تواند بیشتر از ۸۰ کاراکتر باشد.";
  }
  if (bio.length > 280) {
    fieldErrors.bio = "معرفی کوتاه نمی‌تواند بیشتر از ۲۸۰ کاراکتر باشد.";
  }

  if (Object.keys(fieldErrors).length) {
    return { valid: false, fieldErrors };
  }

  return {
    valid: true,
    command: playerProfileUpdateCommandSchema.parse({
      gamer_tag: gamerTag || null,
      display_name: displayName,
      city,
      bio,
      interview_opt_in: draft.interviewOptIn,
    }),
  };
}

export interface PlayerProfileRepository {
  getProfile(): Promise<PlayerProfileLoadResult>;
  updateProfile(command: PlayerProfileUpdateCommand): Promise<UpdatePlayerProfileAction>;
}
