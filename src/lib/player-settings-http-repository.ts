import { z } from "zod";
import {
  playerSettingsLoadResultSchema,
  playerSettingsSaveActionSchema,
  playerSettingsSaveRequestSchema,
  type PlayerSettingsRepository,
  type PlayerSettingsSaveAction,
  type PlayerSettingsSaveRequest,
} from "./player-settings-contract";

const csrfSchema = z.object({ csrf_token: z.string().min(1) }).strict();

function apiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) throw new PlayerSettingsHttpError(0, "تنظیمات حساب در دسترس نیست.");
  return configured.endsWith("/") ? configured : `${configured}/`;
}

async function responseJson(response: Response) {
  return response.json().catch(() => null) as Promise<unknown>;
}

async function bootstrapCsrf(baseUrl: string): Promise<string | null> {
  const response = await fetch(new URL("api/v1/auth/csrf/", baseUrl), {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  if (response.status === 401 || response.status === 403) return null;
  if (!response.ok) throw new PlayerSettingsHttpError(response.status, "ذخیره تنظیمات انجام نشد.");

  return csrfSchema.parse(await responseJson(response)).csrf_token;
}

export class PlayerSettingsHttpError extends Error {
  readonly status: number;

  constructor(status: number, message = "دریافت تنظیمات حساب انجام نشد.") {
    super(message);
    this.name = "PlayerSettingsHttpError";
    this.status = status;
  }
}

export class DjangoPlayerSettingsRepository implements PlayerSettingsRepository {
  async getSettings() {
    const baseUrl = apiBaseUrl();
    const response = await fetch(new URL("api/v1/me/settings/notification-preferences/", baseUrl), {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (response.status === 401 || response.status === 403) {
      return playerSettingsLoadResultSchema.parse({ state: "unauthenticated" });
    }
    if (!response.ok) throw new PlayerSettingsHttpError(response.status);

    return playerSettingsLoadResultSchema.parse({
      state: "authenticated",
      data: await responseJson(response),
    });
  }

  async saveSettings(input: PlayerSettingsSaveRequest): Promise<PlayerSettingsSaveAction> {
    const request = playerSettingsSaveRequestSchema.parse(input);
    const baseUrl = apiBaseUrl();
    const csrfToken = await bootstrapCsrf(baseUrl);

    if (!csrfToken) {
      return playerSettingsSaveActionSchema.parse({
        outcome: "session_expired",
        message: "نشست ورود پایان یافته است. دوباره وارد حساب شو.",
      });
    }

    const response = await fetch(new URL("api/v1/me/settings/notification-preferences/", baseUrl), {
      method: "PATCH",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(request),
    });
    const payload = await responseJson(response);

    if (response.status === 401 || response.status === 403) {
      return playerSettingsSaveActionSchema.parse({
        outcome: "session_expired",
        message: "نشست ورود پایان یافته است. دوباره وارد حساب شو.",
      });
    }

    if (response.status === 409) {
      const stale = playerSettingsSaveActionSchema.parse(payload);
      if (stale.outcome !== "stale") {
        throw new PlayerSettingsHttpError(response.status, "نسخه تنظیمات همگام نشد.");
      }
      return stale;
    }

    if (!response.ok) throw new PlayerSettingsHttpError(response.status, "ذخیره تنظیمات انجام نشد.");

    const action = playerSettingsSaveActionSchema.parse(payload);
    if (action.outcome !== "saved") {
      throw new PlayerSettingsHttpError(response.status, "پاسخ ذخیره تنظیمات معتبر نبود.");
    }
    return action;
  }
}
