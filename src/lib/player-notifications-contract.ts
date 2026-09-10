import { z } from "zod";

export const notificationStateFilters = ["all", "unread", "read"] as const;
export const notificationKindFilters = ["all", "tournament", "match", "challenge", "account", "system"] as const;

export type NotificationStateFilter = (typeof notificationStateFilters)[number];
export type NotificationKindFilter = (typeof notificationKindFilters)[number];

const notificationIdSchema = z.string().regex(/^[A-Za-z0-9_-]{1,128}$/);
const routeIdSchema = z.string().regex(/^[A-Za-z0-9_-]{1,128}$/);
const offsetDateTimeSchema = z.string().datetime({ offset: true });
const notificationKindSchema = z.enum(["tournament", "match", "challenge", "account", "system"]);

export const notificationTargetSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("my-tournaments") }).strict(),
  z.object({ kind: z.literal("my-matches") }).strict(),
  z.object({ kind: z.literal("tournament-detail"), tournamentSlug: routeIdSchema }).strict(),
  z.object({ kind: z.literal("result-submission"), matchId: routeIdSchema }).strict(),
  z.object({ kind: z.literal("match-dispute"), matchId: routeIdSchema }).strict(),
  z.object({ kind: z.literal("player-profile") }).strict(),
]);

export type NotificationTarget = z.infer<typeof notificationTargetSchema>;

export const playerNotificationSchema = z
  .object({
    notificationId: notificationIdSchema,
    kind: notificationKindSchema,
    title: z.string().trim().min(1).max(160),
    body: z.string().trim().min(1).max(500),
    occurredAt: offsetDateTimeSchema,
    readAt: offsetDateTimeSchema.nullable(),
    target: notificationTargetSchema.nullable(),
  })
  .strict();

export type PlayerNotification = z.infer<typeof playerNotificationSchema>;

export const notificationsPageDataSchema = z
  .object({
    summary: z.object({ total: z.number().int().nonnegative(), unread: z.number().int().nonnegative() }).strict(),
    items: z.array(playerNotificationSchema),
    pagination: z
      .object({
        currentPage: z.number().int().positive(),
        totalPages: z.number().int().nonnegative(),
        totalItems: z.number().int().nonnegative(),
      })
      .strict(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.summary.unread > value.summary.total) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["summary", "unread"],
        message: "Unread notifications cannot exceed total notifications.",
      });
    }
    if (value.pagination.totalItems > value.summary.total) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pagination", "totalItems"],
        message: "Filtered notification count cannot exceed the account total.",
      });
    }
    if (value.items.length > value.pagination.totalItems) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["items"],
        message: "Returned items cannot exceed the filtered total.",
      });
    }
    if (value.pagination.totalPages === 0 && value.pagination.totalItems !== 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pagination", "totalPages"],
        message: "A non-empty filtered result must have at least one page.",
      });
    }
    if (value.pagination.totalPages > 0 && value.pagination.currentPage > value.pagination.totalPages) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pagination", "currentPage"],
        message: "Current page cannot exceed total pages.",
      });
    }
    const identities = new Set<string>();
    for (const item of value.items) {
      if (identities.has(item.notificationId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["items"],
          message: "Notification identities must be unique within a page.",
        });
        break;
      }
      identities.add(item.notificationId);
    }
  });

export type NotificationsPageData = z.infer<typeof notificationsPageDataSchema>;

export const notificationsLoadResultSchema = z.discriminatedUnion("state", [
  z.object({ state: z.literal("authenticated"), data: notificationsPageDataSchema }).strict(),
  z.object({ state: z.literal("unauthenticated") }).strict(),
]);

export type NotificationsLoadResult = z.infer<typeof notificationsLoadResultSchema>;

export type NotificationsQuery = {
  state: NotificationStateFilter;
  kind: NotificationKindFilter;
  page: number;
};

export const markNotificationReadActionSchema = z.discriminatedUnion("outcome", [
  z
    .object({
      outcome: z.literal("saved"),
      notificationId: notificationIdSchema,
      readAt: offsetDateTimeSchema,
      unreadCount: z.number().int().nonnegative(),
    })
    .strict(),
  z.object({ outcome: z.literal("unavailable"), message: z.string().trim().min(1) }).strict(),
  z.object({ outcome: z.literal("session_expired"), message: z.string().trim().min(1) }).strict(),
]);

export type MarkNotificationReadAction = z.infer<typeof markNotificationReadActionSchema>;

export const markAllNotificationsReadActionSchema = z.discriminatedUnion("outcome", [
  z
    .object({
      outcome: z.literal("saved"),
      markedCount: z.number().int().nonnegative(),
      readAt: offsetDateTimeSchema,
      unreadCount: z.number().int().nonnegative(),
    })
    .strict(),
  z.object({ outcome: z.literal("session_expired"), message: z.string().trim().min(1) }).strict(),
]);

export type MarkAllNotificationsReadAction = z.infer<typeof markAllNotificationsReadActionSchema>;

export interface PlayerNotificationsRepository {
  getNotifications(query: NotificationsQuery): Promise<NotificationsLoadResult>;
  markRead(notificationId: string): Promise<MarkNotificationReadAction>;
  markAllRead(): Promise<MarkAllNotificationsReadAction>;
}
