import { useRef, useState } from "react";
import { createFileRoute, redirect, useNavigate, useRouter } from "@tanstack/react-router";
import {
  ChallengeHubErrorState,
  ChallengeHubPage,
  ChallengeHubSkeleton,
} from "@/components/dashboard/challenge-hub-page";
import {
  challengeHubFilters,
  type ChallengeCommand,
  type ChallengeHubFilter,
  type ChallengeHubQuery,
  type ChallengeItem,
  type ChallengeMutationAction,
  type OpponentSearchAction,
  type OpponentSearchRequest,
} from "@/lib/challenge-hub-contract";
import { challengeHubRepository } from "@/lib/challenge-hub-repository";

interface ChallengeHubSearch {
  status?: Exclude<ChallengeHubFilter, "all">;
  page?: number;
}

type CreateDraft = { opponentPlayerId: string; gameId: string; formatId: string; note: string };

const statusSet = new Set<string>(challengeHubFilters.filter((value) => value !== "all"));

function positivePage(value: unknown): number | undefined {
  const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;
  return Number.isInteger(parsed) && parsed > 1 ? parsed : undefined;
}

function toQuery(search: ChallengeHubSearch): ChallengeHubQuery {
  return { status: search.status ?? "all", page: search.page ?? 1 };
}

function compactSearch(status: ChallengeHubFilter, page = 1): ChallengeHubSearch {
  return { status: status === "all" ? undefined : status, page: page > 1 ? page : undefined };
}

function randomKey() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `f15-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export const Route = createFileRoute("/dashboard/challenges")({
  validateSearch: (search: Record<string, unknown>): ChallengeHubSearch => ({
    status:
      typeof search.status === "string" && statusSet.has(search.status)
        ? (search.status as Exclude<ChallengeHubFilter, "all">)
        : undefined,
    page: positivePage(search.page),
  }),
  loaderDeps: ({ search }) => toQuery(search),
  loader: async ({ deps }) => {
    const result = await challengeHubRepository.getChallengeHub(deps);
    if (result.state !== "authenticated") {
      throw redirect({ to: "/login", search: { redirect: "/dashboard/challenges" } });
    }
    return result.data;
  },
  head: () => ({
    meta: [
      { title: "چالش‌های من — داشبورد بازیکن" },
      { name: "description", content: "مدیریت دعوت‌ها، Matchهای چالشی و نتایج ثبت‌شده بازیکن" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  pendingComponent: ChallengeHubSkeleton,
  errorComponent: ChallengeHubErrorState,
  component: ChallengeHubRoute,
});

function ChallengeHubRoute() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const router = useRouter();
  const filter = search.status ?? "all";
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const [mutationMessage, setMutationMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const idempotencyKeys = useRef(new Map<string, string>());

  const getIdempotencyKey = (fingerprint: string) => {
    const existing = idempotencyKeys.current.get(fingerprint);
    if (existing) return existing;
    const key = randomKey();
    idempotencyKeys.current.set(fingerprint, key);
    return key;
  };

  const releaseIdempotencyKey = (fingerprint: string) => {
    idempotencyKeys.current.delete(fingerprint);
  };

  const expireSession = () => {
    void navigate({ to: "/login", search: { redirect: "/dashboard/challenges" }, replace: true });
  };

  const handleSearchOpponents = async (request: OpponentSearchRequest): Promise<OpponentSearchAction> => {
    const action = await challengeHubRepository.searchOpponents(request);
    if (action.outcome === "session_expired") expireSession();
    return action;
  };

  const handleCreate = async (draft: CreateDraft): Promise<ChallengeMutationAction | null> => {
    if (pendingKey) return null;
    const fingerprint = `create:${JSON.stringify(draft)}`;
    const idempotencyKey = getIdempotencyKey(fingerprint);
    setPendingKey("create");
    setMutationMessage(null);
    try {
      const action = await challengeHubRepository.createChallenge({ ...draft, idempotencyKey });
      if (action.outcome === "session_expired") {
        releaseIdempotencyKey(fingerprint);
        expireSession();
        return action;
      }
      if (action.outcome === "accepted") {
        releaseIdempotencyKey(fingerprint);
        setMutationMessage({ tone: "success", text: "دعوت چالش ثبت شد." });
        await navigate({ search: compactSearch("outgoing", 1) });
        await router.invalidate({ sync: true });
        return action;
      }
      releaseIdempotencyKey(fingerprint);
      if (action.outcome === "unavailable") await router.invalidate({ sync: true });
      return action;
    } catch {
      setMutationMessage({ tone: "error", text: "ارسال دعوت چالش انجام نشد. دوباره تلاش کن." });
      return null;
    } finally {
      setPendingKey(null);
    }
  };

  const handleCommand = async (item: ChallengeItem, command: ChallengeCommand) => {
    if (pendingKey) return;
    const fingerprint = `${item.challengeId}:${item.revision}:${command}`;
    const idempotencyKey = getIdempotencyKey(fingerprint);
    setPendingKey(`${item.challengeId}:${command}`);
    setMutationMessage(null);
    try {
      const action =
        command === "cancel"
          ? await challengeHubRepository.cancelChallenge(item.challengeId, { revision: item.revision, idempotencyKey })
          : await challengeHubRepository.respondToChallenge(item.challengeId, {
              revision: item.revision,
              action: command,
              idempotencyKey,
            });

      if (action.outcome === "session_expired") {
        releaseIdempotencyKey(fingerprint);
        expireSession();
        return;
      }

      if (action.outcome === "accepted") {
        releaseIdempotencyKey(fingerprint);
        const text = command === "accept" ? "دعوت چالش پذیرفته شد." : command === "decline" ? "دعوت چالش رد شد." : "دعوت چالش لغو شد.";
        setMutationMessage({ tone: "success", text });
        await router.invalidate({ sync: true });
        return;
      }

      releaseIdempotencyKey(fingerprint);
      const text =
        action.outcome === "stale" || action.outcome === "unavailable" || action.outcome === "conflict"
          ? action.message
          : action.fields.form ?? "ثبت این تغییر با وضعیت فعلی چالش ممکن نیست.";
      setMutationMessage({ tone: "error", text });
      await router.invalidate({ sync: true });
    } catch {
      setMutationMessage({ tone: "error", text: "ثبت تغییرات چالش انجام نشد. دوباره تلاش کن." });
    } finally {
      setPendingKey(null);
    }
  };

  return (
    <ChallengeHubPage
      data={data}
      filter={filter}
      pendingKey={pendingKey}
      mutationMessage={mutationMessage}
      onFilterChange={(status) => void navigate({ search: compactSearch(status, 1) })}
      onPageChange={(page) => void navigate({ search: compactSearch(filter, page) })}
      onSearchOpponents={handleSearchOpponents}
      onCreate={handleCreate}
      onCommand={(item, command) => void handleCommand(item, command)}
    />
  );
}
