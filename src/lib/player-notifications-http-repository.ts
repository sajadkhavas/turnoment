import { z } from "zod";
import {
  markAllNotificationsReadActionSchema,
  markNotificationReadActionSchema,
  notificationsLoadResultSchema,
  type MarkAllNotificationsReadAction,
  type MarkNotificationReadAction,
  type NotificationsQuery,
  type PlayerNotificationsRepository,
} from "./player-notifications-contract";

const csrfSchema = z.object({ csrf_token: z.string().min(1) });

function apiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) throw new PlayerNotificationsHttpError(0, "اطلاعات اعلان‌ها در دسترس نیست.");
  return configured.endsWith("/") ? configured : `${configured}/`;
}

function queryString(query: NotificationsQuery) {
  const search = new URLSearchParams();
  if (query.state !== "all") search.set("state", query.state);
  if (query.kind !== "all") search.set("kind", query.kind);
  if (query.page > 1) search.set("page", String(query.page));
  const value = search.toString();
  return value ? `?${value}` : "";
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
  if (!response.ok) throw new PlayerNotificationsHttpError(response.status, "ثبت وضعیت اعلان انجام نشد.");
  return csrfSchema.parse(await responseJson(response)).csrf_token;
}

export class PlayerNotificationsHttpError extends Error {
  readonly status: number;

  constructor(status: number, message = "دریافت اعلان‌ها انجام نشد.") {
    super(message);
    this.name = "PlayerNotificationsHttpError";
    this.status = status;
  }
}

export class DjangoPlayerNotificationsRepository implements PlayerNotificationsRepository {
  async getNotifications(query: NotificationsQuery) {
    const baseUrl = apiBaseUrl();
    const response = await fetch(new URL(`api/v1/me/notifications/${queryString(query)}`, baseUrl), {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (response.status === 401 || response.status === 403) {
      return notificationsLoadResultSchema.parse({ state: "unauthenticated" });
    }
    if (!response.ok) throw new PlayerNotificationsHttpError(response.status);

    return notificationsLoadResultSchema.parse({
      state: "authenticated",
      data: await responseJson(response),
    });
  }

  async markRead(notificationId: string): Promise<MarkNotificationReadAction> {
    const baseUrl = apiBaseUrl();
    const csrfToken = await bootstrapCsrf(baseUrl);
    const response = await fetch(
      new URL(`api/v1/me/notifications/${encodeURIComponent(notificationId)}/read/`, baseUrl),
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: "{}",
      },
    );
    const payload = await responseJson(response);

    if (response.status === 401 || response.status === 403) {
      return markNotificationReadActionSchema.parse({
        outcome: "session_expired",
        message: "نشست ورود پایان یافته است. دوباره وارد حساب شو.",
      });
    }
    if (response.status === 404) {
      return markNotificationReadActionSchema.parse({
        outcome: "unavailable",
        message: "این اعلان دیگر در دسترس نیست.",
      });
    }
    if (!response.ok) throw new PlayerNotificationsHttpError(response.status, "ثبت وضعیت اعلان انجام نشد.");

    return markNotificationReadActionSchema.parse(payload);
  }

  async markAllRead(): Promise<MarkAllNotificationsReadAction> {
    const baseUrl = apiBaseUrl();
    const csrfToken = await bootstrapCsrf(baseUrl);
    const response = await fetch(new URL("api/v1/me/notifications/read-all/", baseUrl), {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: "{}",
    });
    const payload = await responseJson(response);

    if (response.status === 401 || response.status === 403) {
      return markAllNotificationsReadActionSchema.parse({
        outcome: "session_expired",
        message: "نشست ورود پایان یافته است. دوباره وارد حساب شو.",
      });
    }
    if (!response.ok) throw new PlayerNotificationsHttpError(response.status, "ثبت وضعیت اعلان‌ها انجام نشد.");

    return markAllNotificationsReadActionSchema.parse(payload);
  }
}
