import { MockPlayerNotificationsRepository } from "./player-notifications-data";
import {
  markAllNotificationsReadActionSchema,
  markNotificationReadActionSchema,
  notificationTargetSchema,
  notificationsPageDataSchema,
} from "./player-notifications-contract";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const validPage = notificationsPageDataSchema.parse({
  summary: { total: 2, unread: 1 },
  items: [
    {
      notificationId: "ntf-1",
      kind: "match",
      title: "نتیجه Match آماده ثبت است",
      body: "وضعیت رسمی این Match نیازمند ثبت نتیجه است.",
      occurredAt: "2026-09-10T10:00:00+03:30",
      readAt: null,
      target: { kind: "result-submission", matchId: "m-204" },
    },
  ],
  pagination: { currentPage: 1, totalPages: 1, totalItems: 1 },
});
assert(validPage.items[0]?.target?.kind === "result-submission", "Typed notification targets must parse.");

assert(
  !notificationTargetSchema.safeParse({ kind: "my-matches", href: "https://example.com" }).success,
  "Notification targets must reject arbitrary href fields.",
);
assert(
  !notificationTargetSchema.safeParse({ kind: "challenge-detail", challengeId: "ch-1" }).success,
  "Unaccepted Challenge Detail routes must not enter the F10 target contract.",
);
assert(
  !notificationsPageDataSchema.safeParse({
    summary: { total: 1, unread: 2 },
    items: [],
    pagination: { currentPage: 1, totalPages: 0, totalItems: 0 },
  }).success,
  "Unread count cannot exceed total count.",
);
assert(
  !notificationsPageDataSchema.safeParse({
    summary: { total: 1, unread: 0 },
    items: [],
    pagination: { currentPage: 1, totalPages: 1, totalItems: 2 },
  }).success,
  "Filtered count cannot exceed account total.",
);
assert(
  !notificationsPageDataSchema.safeParse({
    summary: { total: 2, unread: 0 },
    items: [
      {
        notificationId: "duplicate",
        kind: "system",
        title: "یک",
        body: "یک اعلان",
        occurredAt: "2026-09-10T10:00:00+03:30",
        readAt: "2026-09-10T10:01:00+03:30",
        target: null,
      },
      {
        notificationId: "duplicate",
        kind: "system",
        title: "دو",
        body: "اعلان دوم",
        occurredAt: "2026-09-10T09:00:00+03:30",
        readAt: "2026-09-10T09:01:00+03:30",
        target: null,
      },
    ],
    pagination: { currentPage: 1, totalPages: 1, totalItems: 2 },
  }).success,
  "Duplicate notification identities must be rejected.",
);

const repository = new MockPlayerNotificationsRepository();
const initial = await repository.getNotifications({ state: "all", kind: "all", page: 1 });
assert(initial.state === "authenticated", "QA notifications repository must provide an authenticated inbox.");
assert(initial.data.summary.total === 8, "QA inbox total must be authoritative from repository data.");
assert(initial.data.summary.unread === 4, "QA inbox unread summary must match repository state.");

const unreadMatches = await repository.getNotifications({ state: "unread", kind: "match", page: 1 });
assert(unreadMatches.state === "authenticated", "Filtered inbox must stay authenticated.");
assert(unreadMatches.data.pagination.totalItems === 2, "Unread match filtering must be repository-owned.");
assert(unreadMatches.data.items.every((item) => item.kind === "match" && item.readAt === null), "Filtered items must match both filters.");

const readAction = await repository.markRead("ntf-result-m204");
assert(readAction.outcome === "saved", "Mark-one must return a saved receipt.");
assert(readAction.notificationId === "ntf-result-m204", "Mark-one receipt must retain notification identity.");
assert(readAction.unreadCount === 3, "Mark-one receipt must return authoritative unread count.");

const repeatedRead = await repository.markRead("ntf-result-m204");
assert(repeatedRead.outcome === "saved", "Mark-one must be idempotent for an already-read notification.");
assert(repeatedRead.unreadCount === 3, "Repeated mark-one must not decrement unread count twice.");

const missingRead = await repository.markRead("missing-notification");
assert(missingRead.outcome === "unavailable", "Missing notification mutation must fail as unavailable.");

const markAll = await repository.markAllRead();
assert(markAll.outcome === "saved", "Mark-all must return a saved receipt.");
assert(markAll.markedCount === 3 && markAll.unreadCount === 0, "Mark-all must report authoritative affected/unread counts.");

const repeatedMarkAll = await repository.markAllRead();
assert(repeatedMarkAll.outcome === "saved", "Mark-all must be idempotent.");
assert(repeatedMarkAll.markedCount === 0 && repeatedMarkAll.unreadCount === 0, "Repeated mark-all must not create duplicate state changes.");

assert(
  markNotificationReadActionSchema.safeParse({
    outcome: "saved",
    notificationId: "ntf-1",
    readAt: "2026-09-10T11:00:00+03:30",
    unreadCount: 0,
  }).success,
  "Mark-one action receipt must accept the documented saved shape.",
);
assert(
  markAllNotificationsReadActionSchema.safeParse({
    outcome: "saved",
    markedCount: 2,
    readAt: "2026-09-10T11:00:00+03:30",
    unreadCount: 0,
  }).success,
  "Mark-all action receipt must accept the documented saved shape.",
);

console.log("F10 Player Notifications contract checks passed.");
