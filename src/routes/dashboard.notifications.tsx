import { useState } from "react";
import { createFileRoute, redirect, useNavigate, useRouter } from "@tanstack/react-router";
import {
  PlayerNotificationsErrorState,
  PlayerNotificationsPage,
  PlayerNotificationsSkeleton,
} from "@/components/dashboard/player-notifications-page";
import {
  notificationKindFilters,
  notificationStateFilters,
  type NotificationKindFilter,
  type NotificationsQuery,
  type NotificationStateFilter,
} from "@/lib/player-notifications-contract";
import { playerNotificationsRepository } from "@/lib/player-notifications-repository";

interface NotificationsSearch {
  state?: Exclude<NotificationStateFilter, "all">;
  kind?: Exclude<NotificationKindFilter, "all">;
  page?: number;
}

const stateSet = new Set<string>(notificationStateFilters.filter((value) => value !== "all"));
const kindSet = new Set<string>(notificationKindFilters.filter((value) => value !== "all"));

function positivePage(value: unknown): number | undefined {
  const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;
  return Number.isInteger(parsed) && parsed > 1 ? parsed : undefined;
}

function toQuery(search: NotificationsSearch): NotificationsQuery {
  return {
    state: search.state ?? "all",
    kind: search.kind ?? "all",
    page: search.page ?? 1,
  };
}

function compactSearch(
  state: NotificationStateFilter,
  kind: NotificationKindFilter,
  page = 1,
): NotificationsSearch {
  return {
    state: state === "all" ? undefined : state,
    kind: kind === "all" ? undefined : kind,
    page: page > 1 ? page : undefined,
  };
}

export const Route = createFileRoute("/dashboard/notifications")({
  validateSearch: (search: Record<string, unknown>): NotificationsSearch => ({
    state:
      typeof search.state === "string" && stateSet.has(search.state)
        ? (search.state as Exclude<NotificationStateFilter, "all">)
        : undefined,
    kind:
      typeof search.kind === "string" && kindSet.has(search.kind)
        ? (search.kind as Exclude<NotificationKindFilter, "all">)
        : undefined,
    page: positivePage(search.page),
  }),
  loaderDeps: ({ search }) => toQuery(search),
  loader: async ({ deps }) => {
    const result = await playerNotificationsRepository.getNotifications(deps);
    if (result.state !== "authenticated") {
      throw redirect({
        to: "/login",
        search: { redirect: "/dashboard/notifications" },
      });
    }
    return result.data;
  },
  head: () => ({
    meta: [
      { title: "اعلان‌ها — داشبورد بازیکن" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  pendingComponent: PlayerNotificationsSkeleton,
  errorComponent: PlayerNotificationsErrorState,
  component: PlayerNotificationsRoute,
});

function PlayerNotificationsRoute() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const router = useRouter();
  const state = search.state ?? "all";
  const kind = search.kind ?? "all";
  const [pendingNotificationId, setPendingNotificationId] = useState<string | null>(null);
  const [markAllPending, setMarkAllPending] = useState(false);
  const [mutationMessage, setMutationMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  const navigateTo = (nextState: NotificationStateFilter, nextKind: NotificationKindFilter, page = 1) => {
    void navigate({ search: compactSearch(nextState, nextKind, page) });
  };

  const expireSession = () => {
    void navigate({
      to: "/login",
      search: { redirect: "/dashboard/notifications" },
      replace: true,
    });
  };

  const handleMarkRead = async (notificationId: string) => {
    if (pendingNotificationId || markAllPending) return;
    setPendingNotificationId(notificationId);
    setMutationMessage(null);
    try {
      const action = await playerNotificationsRepository.markRead(notificationId);
      if (action.outcome === "session_expired") {
        expireSession();
        return;
      }
      if (action.outcome === "unavailable") {
        setMutationMessage({ tone: "error", text: action.message });
        await router.invalidate();
        return;
      }
      setMutationMessage({ tone: "success", text: "اعلان به‌عنوان خوانده‌شده ثبت شد." });
      await router.invalidate();
    } catch {
      setMutationMessage({ tone: "error", text: "ثبت وضعیت اعلان انجام نشد. دوباره تلاش کن." });
    } finally {
      setPendingNotificationId(null);
    }
  };

  const handleMarkAllRead = async () => {
    if (pendingNotificationId || markAllPending) return;
    setMarkAllPending(true);
    setMutationMessage(null);
    try {
      const action = await playerNotificationsRepository.markAllRead();
      if (action.outcome === "session_expired") {
        expireSession();
        return;
      }
      setMutationMessage({
        tone: "success",
        text: action.markedCount > 0 ? "همه اعلان‌های خوانده‌نشده ثبت شدند." : "اعلان خوانده‌نشده‌ای باقی نمانده است.",
      });
      await router.invalidate();
    } catch {
      setMutationMessage({ tone: "error", text: "ثبت وضعیت اعلان‌ها انجام نشد. دوباره تلاش کن." });
    } finally {
      setMarkAllPending(false);
    }
  };

  return (
    <PlayerNotificationsPage
      data={data}
      state={state}
      kind={kind}
      pendingNotificationId={pendingNotificationId}
      markAllPending={markAllPending}
      mutationMessage={mutationMessage}
      onStateChange={(nextState) => navigateTo(nextState, kind)}
      onKindChange={(nextKind) => navigateTo(state, nextKind)}
      onPageChange={(page) => navigateTo(state, kind, page)}
      onResetFilters={() => navigateTo("all", "all")}
      onMarkRead={(notificationId) => void handleMarkRead(notificationId)}
      onMarkAllRead={() => void handleMarkAllRead()}
    />
  );
}
