import { z } from "zod";

const settingsRevisionSchema = z.string().trim().min(1).max(128);

export const optionalNotificationPreferencesSchema = z
  .object({
    tournament: z.boolean(),
    match: z.boolean(),
    challenge: z.boolean(),
  })
  .strict();

export type OptionalNotificationPreferences = z.infer<typeof optionalNotificationPreferencesSchema>;

export const requiredNotificationPreferencesSchema = z
  .object({
    account: z.literal(true),
    system: z.literal(true),
  })
  .strict();

export const playerSettingsSchema = z
  .object({
    revision: settingsRevisionSchema,
    optional: optionalNotificationPreferencesSchema,
    required: requiredNotificationPreferencesSchema,
  })
  .strict();

export type PlayerSettings = z.infer<typeof playerSettingsSchema>;

export const playerSettingsLoadResultSchema = z.discriminatedUnion("state", [
  z.object({ state: z.literal("authenticated"), data: playerSettingsSchema }).strict(),
  z.object({ state: z.literal("unauthenticated") }).strict(),
]);

export type PlayerSettingsLoadResult = z.infer<typeof playerSettingsLoadResultSchema>;

export const playerSettingsSaveRequestSchema = z
  .object({
    revision: settingsRevisionSchema,
    optional: optionalNotificationPreferencesSchema,
  })
  .strict();

export type PlayerSettingsSaveRequest = z.infer<typeof playerSettingsSaveRequestSchema>;

export const playerSettingsSaveActionSchema = z.discriminatedUnion("outcome", [
  z.object({ outcome: z.literal("saved"), settings: playerSettingsSchema }).strict(),
  z
    .object({
      outcome: z.literal("stale"),
      message: z.string().trim().min(1).max(300),
      settings: playerSettingsSchema,
    })
    .strict(),
  z
    .object({
      outcome: z.literal("session_expired"),
      message: z.string().trim().min(1).max(300),
    })
    .strict(),
]);

export type PlayerSettingsSaveAction = z.infer<typeof playerSettingsSaveActionSchema>;

export interface PlayerSettingsRepository {
  getSettings(): Promise<PlayerSettingsLoadResult>;
  saveSettings(request: PlayerSettingsSaveRequest): Promise<PlayerSettingsSaveAction>;
}
