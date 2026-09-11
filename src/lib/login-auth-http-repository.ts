import { z } from "zod";
import {
  authenticatedPlayerSchema,
  loginSessionSchema,
  normalizeIranMobileForUi,
  requestOtpActionSchema,
  verifyOtpActionSchema,
  verifyOtpCommandSchema,
  type LoginAuthRepository,
  type RequestOtpAction,
  type VerifyOtpAction,
  type VerifyOtpCommand,
} from "./login-auth-contract";

const csrfSchema = z.object({ csrf_token: z.string().min(1) });
const issuedSchema = z.object({
  challenge_id: z.string().uuid(),
  expires_in: z.number().int().positive(),
  resend_after: z.number().int().nonnegative(),
});

type ErrorInfo = { code: string | null; message: string | null; retryAfter: number | null };

function apiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) throw new LoginAuthHttpError(0, "پیکربندی ورود در دسترس نیست.");
  return configured.endsWith("/") ? configured : `${configured}/`;
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
    return { code: null, message: firstMessage(payload), retryAfter: null };
  }
  const root = payload as Record<string, unknown>;
  const error = root.error;
  if (error && typeof error === "object") {
    const record = error as Record<string, unknown>;
    return {
      code: typeof record.code === "string" ? record.code : null,
      message: firstMessage(record.message) ?? firstMessage(error),
      retryAfter: typeof record.retry_after === "number" ? record.retry_after : null,
    };
  }
  return { code: null, message: firstMessage(root), retryAfter: null };
}

async function responseJson(response: Response) {
  return response.json().catch(() => null) as Promise<unknown>;
}

async function bootstrapCsrf(baseUrl: string) {
  const response = await fetch(new URL("api/v1/auth/csrf/", baseUrl), {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new LoginAuthHttpError(response.status, "دریافت مجوز امن ورود انجام نشد.");
  return csrfSchema.parse(await responseJson(response)).csrf_token;
}

export class LoginAuthHttpError extends Error {
  readonly status: number;
  constructor(status: number, message = "ارتباط ورود با خطا روبه‌رو شد.") {
    super(message);
    this.name = "LoginAuthHttpError";
    this.status = status;
  }
}

export class DjangoLoginAuthRepository implements LoginAuthRepository {
  async getSession() {
    const baseUrl = apiBaseUrl();
    const response = await fetch(new URL("api/v1/auth/me/", baseUrl), {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });
    if (response.status === 401 || response.status === 403) {
      return loginSessionSchema.parse({ state: "unauthenticated" });
    }
    if (!response.ok) throw new LoginAuthHttpError(response.status);
    return loginSessionSchema.parse({
      state: "authenticated",
      player: authenticatedPlayerSchema.parse(await responseJson(response)),
    });
  }

  async requestOtp(phone: string): Promise<RequestOtpAction> {
    const normalized = normalizeIranMobileForUi(phone);
    if (!normalized) {
      return requestOtpActionSchema.parse({ outcome: "validation_error", message: "شماره موبایل ایران معتبر نیست." });
    }

    const baseUrl = apiBaseUrl();
    const csrfToken = await bootstrapCsrf(baseUrl);
    const response = await fetch(new URL("api/v1/auth/otp/request/", baseUrl), {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify({ phone: normalized }),
    });
    const payload = await responseJson(response);

    if (response.status === 201) {
      const issued = issuedSchema.parse(payload);
      return requestOtpActionSchema.parse({
        outcome: "issued",
        challenge: {
          challengeId: issued.challenge_id,
          phone: normalized,
          expiresIn: issued.expires_in,
          resendAfter: issued.resend_after,
        },
      });
    }

    const info = errorInfo(payload);
    if (response.status === 429) {
      const headerRetry = Number.parseInt(response.headers.get("Retry-After") ?? "", 10);
      const retryAfter = info.retryAfter && info.retryAfter > 0
        ? info.retryAfter
        : Number.isFinite(headerRetry) && headerRetry > 0
          ? headerRetry
          : 1;
      return requestOtpActionSchema.parse({
        outcome: "rate_limited",
        retryAfter,
        message: info.message ?? "برای درخواست کد جدید کمی صبر کن.",
      });
    }
    if (response.status === 503 || info.code === "otp_delivery_unavailable") {
      return requestOtpActionSchema.parse({
        outcome: "delivery_unavailable",
        message: info.message ?? "ارسال کد ورود در حال حاضر در دسترس نیست.",
      });
    }
    if (response.status === 400) {
      return requestOtpActionSchema.parse({
        outcome: "validation_error",
        message: info.message ?? "شماره موبایل واردشده معتبر نیست.",
      });
    }
    throw new LoginAuthHttpError(response.status);
  }

  async verifyOtp(command: VerifyOtpCommand): Promise<VerifyOtpAction> {
    const parsed = verifyOtpCommandSchema.parse(command);
    const baseUrl = apiBaseUrl();
    const csrfToken = await bootstrapCsrf(baseUrl);
    const response = await fetch(new URL("api/v1/auth/otp/verify/", baseUrl), {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify({ challenge_id: parsed.challengeId, code: parsed.code }),
    });
    const payload = await responseJson(response);

    if (response.status === 200) {
      return verifyOtpActionSchema.parse({
        outcome: "authenticated",
        player: authenticatedPlayerSchema.parse(payload),
      });
    }

    const info = errorInfo(payload);
    if (response.status === 403 && info.code === "account_inactive") {
      return verifyOtpActionSchema.parse({ outcome: "inactive", message: info.message ?? "این حساب غیرفعال است." });
    }
    if (response.status === 400) {
      const outcome = info.code === "otp_expired"
        ? "expired"
        : info.code === "otp_consumed"
          ? "consumed"
          : info.code === "otp_invalid"
            ? "invalid"
            : "validation_error";
      return verifyOtpActionSchema.parse({
        outcome,
        message: info.message ?? (outcome === "invalid" ? "کد ورود صحیح نیست." : "تأیید کد ورود انجام نشد."),
      });
    }
    throw new LoginAuthHttpError(response.status);
  }
}
