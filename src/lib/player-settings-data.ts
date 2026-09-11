import {
  playerSettingsLoadResultSchema,
  playerSettingsSaveActionSchema,
  playerSettingsSaveRequestSchema,
  playerSettingsSchema,
  type PlayerSettings,
  type PlayerSettingsRepository,
} from "./player-settings-contract";

function copySettings(settings: PlayerSettings): PlayerSettings {
  return playerSettingsSchema.parse({
    revision: settings.revision,
    optional: { ...settings.optional },
    required: { ...settings.required },
  });
}

export class MockPlayerSettingsRepository implements PlayerSettingsRepository {
  private revisionNumber = 1;
  private settings = playerSettingsSchema.parse({
    revision: "settings-v1",
    optional: {
      tournament: true,
      match: true,
      challenge: false,
    },
    required: {
      account: true,
      system: true,
    },
  });

  async getSettings() {
    return playerSettingsLoadResultSchema.parse({
      state: "authenticated",
      data: copySettings(this.settings),
    });
  }

  async saveSettings(input: Parameters<PlayerSettingsRepository["saveSettings"]>[0]) {
    const request = playerSettingsSaveRequestSchema.parse(input);

    if (request.revision !== this.settings.revision) {
      return playerSettingsSaveActionSchema.parse({
        outcome: "stale",
        message: "تنظیمات از آخرین بار تغییر کرده است. آخرین نسخه نمایش داده شد؛ دوباره انتخابت را بررسی کن.",
        settings: copySettings(this.settings),
      });
    }

    this.revisionNumber += 1;
    this.settings = playerSettingsSchema.parse({
      revision: `settings-v${this.revisionNumber}`,
      optional: { ...request.optional },
      required: { account: true, system: true },
    });

    return playerSettingsSaveActionSchema.parse({
      outcome: "saved",
      settings: copySettings(this.settings),
    });
  }
}
