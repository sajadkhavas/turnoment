import { z } from "zod";
import { authenticatedPlayerSchema, playerProfileSchema } from "./login-auth-contract";
import {
  playerProfileLoadResultSchema,
  playerProfileUpdateCommandSchema,
  updatePlayerProfileActionSchema,
  type PlayerProfileFieldErrors,
  type PlayerProfileRepository,
  type PlayerProfileUpdateCommand,
} from "./player-profile-contract";

const csrfSchema = z.object({ csrf_token: z.string().min(1) });

type ErrorInfo = { code: string | null; message: string | null };

function apiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) throw new PlayerProfileHttpError(0, "پیکربندی پروفایل در دسترس نیست.");
  return configured.endsWith("/") ? configured : `${configured}/`;
}

async function responseJson(response: Response) {
  return response.json().catch(() => null) as Promise<unknown>;
}

function firstMessage(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (Array.isArray(value)) {
    for (const item of value) {
      const message = firstMessage(item);
      if (message) return message;
    }
  }
  if (value && typeof value === "object") {
    for (const item of Object.values(value as Record<string, unknown>)) {
      const message = firstMessage(item);
      if (message) return message;
    }
  }
  return null;
}

function errorInfo(payload: unknown): ErrorInfo {
  if (!payload || typeof payload !== "object") {
    return { code: null, message: firstMessage(payload) };
  }
  const root = payload as Record<string, unknown>;
  const error = root.error;
  if (error && typeof error === "object") {
    const record = error as Record<string, unknown>;
    return {
      code: typeof record.code === "string" ? record.code : null,
      message: firstMessage(record.message) ?? firstMessage(error),
    };
  }
  return { code: null, message: firstMessage(root) };
}

function fieldErrors(payload: unknown): PlayerProfileFieldErrors {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return {};
  const root = payload as Record<string, unknown>;
  const map: Record<string, keyof PlayerProfileFieldErrors> = {
    gamer_tag: "gamerTag",
    display_name: "displayName",
    city: "city",
    bio: "bio",
    interview_opt_in: "interviewOptIn",
  };
  const errors: PlayerProfileFieldErrors = {};
  for (const [backendField, frontendField] of Object.entries(map)) {
    const message = firstMessage(root[backendField]);
    if (message) errors[frontendField] = message;
  }
  return errors;
}

async function bootstrapCsrf(baseUrl: string) {
  const response = await fetch(new URL("api/v1/auth/csrf/", baseUrl), {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new PlayerProfileHttpError(response.status, "دریافت مجوز امن ذخیره تغییرات انجام نشد.");
  }
  return csrfSchema.parse(await responseJson(response)).csrf_token;
}

export class PlayerProfileHttpError extends Error {
  readonly status: number;

  constructor(status: number, message = "ارتباط با پروفایل با خطا روبه‌رو شد.") {
    super(message);
    this.name = "PlayerProfileHttpError";
    this.status = status;
  }
}

export class DjangoPlayerProfileRepository implements PlayerProfileRepository {
  async getProfile() {
    const baseUrl = apiBaseUrl();
    const response = await fetch(new URL("api/v1/auth/me/", baseUrl), {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (response.status === 401 || response.status === 403) {
      return playerProfileLoadResultSchema.parse({ state: "unauthenticated" });
    }
    if (!response.ok) throw new PlayerProfileHttpError(response.status);

    return playerProfileLoadResultSchema.parse({
      state: "authenticated",
      player: authenticatedPlayerSchema.parse(await responseJson(response)),
    });
  }

  async updateProfile(command: PlayerProfileUpdateCommand) {
    const parsed = playerProfileUpdateCommandSchema.parse(command);
    const baseUrl = apiBaseUrl();
    const csrfToken = await bootstrapCsrf(baseUrl);
    const response = await fetch(new URL("api/v1/auth/me/profile/", baseUrl), {
      method: "PATCH",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(parsed),
    });
    const payload = await responseJson(response);

    if (response.status === 401 || response.status === 403) {
      return updatePlayerProfileActionSchema.parse({
        outcome: "session_expired",
        message: "نشست ورود پایان یافته است. دوباره وارد حساب شو.",
      });
    }

    if (response.status === 200) {
      return updatePlayerProfileActionSchema.parse({
        outcome: "saved",
        profile: playerProfileSchema.parse(payload),
      });
    }

    if (response.status === 400) {
      const info = errorInfo(payload);
      const errors = fieldErrors(payload);
      if (info.code === "gamer_tag_conflict") {
        return updatePlayerProfileActionSchema.parse({
          outcome: "conflict",
          message: info.message ?? "این شناسه بازیکن قبلاً استفاده شده است.",
          fieldErrors: {
            ...errors,
            gamerTag: errors.gamerTag ?? info.message ?? "این شناسه بازیکن قبلاً استفاده شده است.",
          },
        });
      }

      return updatePlayerProfileActionSchema.parse({
        outcome: "validation_error",
        message: info.message ?? firstMessage(payload) ?? "اطلاعات پروفایل نیاز به اصلاح دارد.",
        fieldErrors: errors,
      });
    }

    throw new PlayerProfileHttpError(response.status, "ذخیره تغییرات پروفایل انجام نشد.");
  }
}
