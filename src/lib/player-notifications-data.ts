import {
  markAllNotificationsReadActionSchema,
  markNotificationReadActionSchema,
  notificationsLoadResultSchema,
  notificationsPageDataSchema,
  type NotificationsQuery,
  type PlayerNotification,
  type PlayerNotificationsRepository,
} from "./player-notifications-contract";

const PAGE_SIZE = 5;
const MOCK_READ_AT = "2026-09-10T11:10:00+03:30";

const initialItems: PlayerNotification[] = [
  {
    notificationId: "ntf-result-m204",
    kind: "match",
    title: "زمان ثبت نتیجه Match رسیده",
    body: "Match تو به مرحله ثبت نتیجه رسیده است. امتیاز را فقط از مسیر رسمی همان Match ثبت کن.",
    occurredAt: "2026-09-10T10:48:00+03:30",
    readAt: null,
    target: { kind: "result-submission", matchId: "m-204" },
  },
  {
    notificationId: "ntf-tournament-confirmed",
    kind: "tournament",
    title: "ثبت‌نام مسابقه تأیید شد",
    body: "ثبت‌نامت برای جام قهرمانان کرج تأیید شده است. جزئیات زمان و محل را از صفحه تورنومنت ببین.",
    occurredAt: "2026-09-10T09:35:00+03:30",
    readAt: null,
    target: { kind: "tournament-detail", tournamentSlug: "fc26-karaj-champions-cup" },
  },
  {
    notificationId: "ntf-dispute-m206",
    kind: "match",
    title: "وضعیت اعتراض Match به‌روزرسانی شد",
    body: "پرونده اعتراض این Match وارد مرحله بررسی شده است. آخرین وضعیت را در صفحه همان اعتراض دنبال کن.",
    occurredAt: "2026-09-10T08:20:00+03:30",
    readAt: null,
    target: { kind: "match-dispute", matchId: "m-206" },
  },
  {
    notificationId: "ntf-challenge-invite",
    kind: "challenge",
    title: "یک دعوت تازه برای چالش داری",
    body: "یک بازیکن برای رقابت مستقیم از تو دعوت کرده است. وضعیت دعوت در بخش چالش‌ها نمایش داده می‌شود.",
    occurredAt: "2026-09-09T22:10:00+03:30",
    readAt: null,
    target: null,
  },
  {
    notificationId: "ntf-match-schedule",
    kind: "match",
    title: "زمان Match بعدی مشخص شد",
    body: "برنامه Match بعدی در حساب تو ثبت شده است. فهرست Matchها مرجع زمان و وضعیت رسمی مسابقه است.",
    occurredAt: "2026-09-09T19:45:00+03:30",
    readAt: "2026-09-09T20:04:00+03:30",
    target: { kind: "my-matches" },
  },
  {
    notificationId: "ntf-profile-ready",
    kind: "account",
    title: "پروفایل بازیکن به‌روزرسانی شد",
    body: "اطلاعات عمومی پروفایلت با موفقیت ذخیره شده است. هر زمان خواستی می‌توانی آن‌ها را از پروفایل ویرایش کنی.",
    occurredAt: "2026-09-09T16:30:00+03:30",
    readAt: "2026-09-09T16:31:00+03:30",
    target: { kind: "player-profile" },
  },
  {
    notificationId: "ntf-tournaments-update",
    kind: "tournament",
    title: "فهرست مسابقاتت به‌روزرسانی شد",
    body: "یک تغییر جدید در مسابقات ثبت‌شده حسابت وجود دارد. آخرین وضعیت را از بخش مسابقات من بررسی کن.",
    occurredAt: "2026-09-08T18:15:00+03:30",
    readAt: "2026-09-08T18:30:00+03:30",
    target: { kind: "my-tournaments" },
  },
  {
    notificationId: "ntf-system-security",
    kind: "system",
    title: "امنیت ورود به حساب فعال است",
    body: "ورود به حساب بازیکن با شماره موبایل و کد یکبارمصرف انجام می‌شود. کد ورودت را در اختیار دیگران نگذار.",
    occurredAt: "2026-09-07T12:00:00+03:30",
    readAt: "2026-09-07T12:08:00+03:30",
    target: null,
  },
];

export class MockPlayerNotificationsRepository implements PlayerNotificationsRepository {
  private items = initialItems.map((item) => ({ ...item, target: item.target ? { ...item.target } : null }));

  async getNotifications(query: NotificationsQuery) {
    const summary = {
      total: this.items.length,
      unread: this.items.filter((item) => item.readAt === null).length,
    };

    const filtered = this.items.filter((item) => {
      const stateMatches =
        query.state === "all" ||
        (query.state === "unread" && item.readAt === null) ||
        (query.state === "read" && item.readAt !== null);
      const kindMatches = query.kind === "all" || item.kind === query.kind;
      return stateMatches && kindMatches;
    });

    const totalPages = filtered.length === 0 ? 0 : Math.ceil(filtered.length / PAGE_SIZE);
    const currentPage = totalPages === 0 ? 1 : Math.min(query.page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const data = notificationsPageDataSchema.parse({
      summary,
      items: filtered.slice(start, start + PAGE_SIZE),
      pagination: {
        currentPage,
        totalPages,
        totalItems: filtered.length,
      },
    });

    return notificationsLoadResultSchema.parse({ state: "authenticated", data });
  }

  async markRead(notificationId: string) {
    const item = this.items.find((candidate) => candidate.notificationId === notificationId);
    if (!item) {
      return markNotificationReadActionSchema.parse({
        outcome: "unavailable",
        message: "این اعلان دیگر در دسترس نیست.",
      });
    }

    if (item.readAt === null) item.readAt = MOCK_READ_AT;

    return markNotificationReadActionSchema.parse({
      outcome: "saved",
      notificationId: item.notificationId,
      readAt: item.readAt,
      unreadCount: this.items.filter((candidate) => candidate.readAt === null).length,
    });
  }

  async markAllRead() {
    let markedCount = 0;
    for (const item of this.items) {
      if (item.readAt === null) {
        item.readAt = MOCK_READ_AT;
        markedCount += 1;
      }
    }

    return markAllNotificationsReadActionSchema.parse({
      outcome: "saved",
      markedCount,
      readAt: MOCK_READ_AT,
      unreadCount: 0,
    });
  }
}
