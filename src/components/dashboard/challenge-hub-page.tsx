import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, Plus, Send, Sparkles, Swords, UserRoundPlus, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ChallengeCreateDialog } from "@/components/dashboard/challenge-hub-create-dialog";
import { ChallengeAccessCard, ChallengeCard, ChallengeSummaryCard } from "@/components/dashboard/challenge-hub-card";
import { cn } from "@/lib/utils";
import { toPersianDigits } from "@/lib/format";
import type {
  ChallengeCommand,
  ChallengeHubFilter,
  ChallengeHubPageData,
  ChallengeItem,
  ChallengeMutationAction,
  OpponentSearchAction,
  OpponentSearchRequest,
} from "@/lib/challenge-hub-contract";

const filters: Array<{ value: ChallengeHubFilter; label: string }> = [
  { value: "all", label: "همه" },
  { value: "incoming", label: "دعوت‌های دریافتی" },
  { value: "outgoing", label: "ارسال‌شده" },
  { value: "active", label: "فعال" },
  { value: "action-required", label: "نیازمند اقدام" },
  { value: "completed", label: "پایان‌یافته" },
];

type CreateDraft = { opponentPlayerId: string; gameId: string; formatId: string; note: string };
type ConfirmIntent = { item: ChallengeItem; command: "decline" | "cancel" } | null;

export function ChallengeHubPage({
  data,
  filter,
  pendingKey,
  mutationMessage,
  onFilterChange,
  onPageChange,
  onSearchOpponents,
  onCreate,
  onCommand,
}: {
  data: ChallengeHubPageData;
  filter: ChallengeHubFilter;
  pendingKey: string | null;
  mutationMessage: { tone: "success" | "error"; text: string } | null;
  onFilterChange: (value: ChallengeHubFilter) => void;
  onPageChange: (page: number) => void;
  onSearchOpponents: (request: OpponentSearchRequest) => Promise<OpponentSearchAction>;
  onCreate: (draft: CreateDraft) => Promise<ChallengeMutationAction | null>;
  onCommand: (item: ChallengeItem, command: ChallengeCommand) => void;
}) {
  const [createOpen, setCreateOpen] = useState(false);
  const [confirmIntent, setConfirmIntent] = useState<ConfirmIntent>(null);
  const hasAnyChallenges = data.summary.incoming + data.summary.outgoing + data.summary.active + data.summary.completed > 0;

  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-primary"><Swords className="h-5 w-5" aria-hidden="true" /><p className="text-xs font-bold">مرکز رقابت مستقیم</p></div>
          <h1 className="mt-2 text-2xl font-black sm:text-3xl">چالش‌های من</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">دعوت‌های مستقیم، Matchهای چالشی و نتایج نهایی ثبت‌شده را از یکجا دنبال و مدیریت کن.</p>
        </div>
        <Button className="min-h-11 w-full sm:w-auto" disabled={!data.access.canCreate || pendingKey !== null} onClick={() => setCreateOpen(true)}><Plus aria-hidden="true" /> ایجاد چالش جدید</Button>
      </header>

      {mutationMessage ? (
        <div className={cn("rounded-xl border p-3 text-xs font-bold leading-6", mutationMessage.tone === "success" ? "border-success/30 bg-success/8 text-success" : "border-destructive/30 bg-destructive/8 text-destructive")} role="status" aria-live="polite">
          {mutationMessage.text}
        </div>
      ) : null}

      <ChallengeAccessCard data={data} />

      <section aria-label="خلاصه چالش‌ها" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <ChallengeSummaryCard label="دعوت‌های دریافتی" value={data.summary.incoming} icon={<UserRoundPlus className="h-4 w-4" />} />
        <ChallengeSummaryCard label="دعوت‌های ارسال‌شده" value={data.summary.outgoing} icon={<Send className="h-4 w-4" />} />
        <ChallengeSummaryCard label="چالش‌های فعال" value={data.summary.active} icon={<Sparkles className="h-4 w-4" />} />
        <ChallengeSummaryCard label="پایان‌یافته" value={data.summary.completed} icon={<CheckCircle2 className="h-4 w-4" />} />
      </section>

      <section className="rounded-2xl border border-border bg-card p-3 sm:p-4" aria-labelledby="challenge-filters-title">
        <div className="flex items-center justify-between gap-3 px-1"><h2 id="challenge-filters-title" className="text-sm font-black">وضعیت چالش‌ها</h2><span className="text-[11px] text-muted-foreground" aria-live="polite">{toPersianDigits(data.pagination.totalItems)} مورد</span></div>
        <div className="mt-3 overflow-x-auto pb-1" aria-label="فیلتر وضعیت چالش‌ها"><div className="flex min-w-max gap-2">{filters.map((item) => <Button key={item.value} type="button" aria-pressed={filter === item.value} variant="outline" onClick={() => onFilterChange(item.value)} className={cn("min-h-10 rounded-full px-4 text-xs", filter === item.value ? "border-primary/50 bg-primary/15 text-primary hover:bg-primary/15" : "bg-elevated text-muted-foreground")}>{item.label}</Button>)}</div></div>
      </section>

      {data.items.length ? (
        <ul className="grid min-w-0 gap-4 xl:grid-cols-2">
          {data.items.map((item) => <ChallengeCard key={item.challengeId} item={item} pendingKey={pendingKey} onCommand={onCommand} onConfirm={(target, command) => setConfirmIntent({ item: target, command })} />)}
        </ul>
      ) : (
        <section className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
          <UsersRound className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
          <h2 className="mt-3 text-sm font-black">{hasAnyChallenges ? "چالشی با این وضعیت پیدا نشد" : "هنوز چالشی نداری"}</h2>
          <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-muted-foreground">{hasAnyChallenges ? "فیلتر دیگری را انتخاب کن یا همه چالش‌ها را ببین." : data.access.canCreate ? "برای شروع، حریف را جست‌وجو کن و یک دعوت چالش بفرست." : "دعوت‌های جدید و Matchهای چالشی بعد از ثبت در همین بخش نمایش داده می‌شوند."}</p>
          <Button className="mt-4 min-h-11" disabled={!hasAnyChallenges && !data.access.canCreate} onClick={() => hasAnyChallenges ? onFilterChange("all") : setCreateOpen(true)}>{hasAnyChallenges ? "نمایش همه" : "ایجاد اولین چالش"}</Button>
        </section>
      )}

      {data.pagination.totalPages > 1 ? (
        <nav className="flex items-center justify-center gap-2" aria-label="صفحه‌بندی چالش‌ها">
          <Button variant="outline" className="min-h-10" disabled={data.pagination.currentPage <= 1} onClick={() => onPageChange(data.pagination.currentPage - 1)}>قبلی</Button>
          <span className="px-2 text-xs text-muted-foreground">صفحه {toPersianDigits(data.pagination.currentPage)} از {toPersianDigits(data.pagination.totalPages)}</span>
          <Button variant="outline" className="min-h-10" disabled={data.pagination.currentPage >= data.pagination.totalPages} onClick={() => onPageChange(data.pagination.currentPage + 1)}>بعدی</Button>
        </nav>
      ) : null}

      <ChallengeCreateDialog data={data} open={createOpen} pending={pendingKey === "create"} onOpenChange={setCreateOpen} onSearchOpponents={onSearchOpponents} onCreate={onCreate} />

      <AlertDialog open={confirmIntent !== null} onOpenChange={(open) => { if (!open) setConfirmIntent(null); }}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader className="text-right sm:text-right">
            <AlertDialogTitle>{confirmIntent?.command === "cancel" ? "لغو دعوت چالش؟" : "رد کردن دعوت چالش؟"}</AlertDialogTitle>
            <AlertDialogDescription>{confirmIntent?.command === "cancel" ? "اگر دعوت را لغو کنی، حریف دیگر نمی‌تواند همین دعوت را بپذیرد." : "با رد کردن دعوت، این درخواست برای تو بسته می‌شود."}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:space-x-0">
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (confirmIntent) onCommand(confirmIntent.item, confirmIntent.command); setConfirmIntent(null); }}>{confirmIntent?.command === "cancel" ? "لغو دعوت" : "رد کردن دعوت"}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function SkeletonBar({ className }: { className: string }) { return <div className={cn("skeleton-shimmer rounded-xl", className)} />; }

export function ChallengeHubSkeleton() {
  return <div className="space-y-5" aria-busy="true" aria-live="polite"><SkeletonBar className="h-24" /><SkeletonBar className="h-32" /><div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{Array.from({ length: 4 }).map((_, index) => <SkeletonBar key={index} className="h-24" />)}</div><SkeletonBar className="h-24" /><div className="grid gap-4 xl:grid-cols-2"><SkeletonBar className="h-80" /><SkeletonBar className="h-80" /></div></div>;
}

export function ChallengeHubErrorState() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  return <div className="grid place-items-center rounded-2xl border border-border bg-card p-10 text-center"><AlertTriangle className="h-8 w-8 text-warning" aria-hidden="true" /><h2 className="mt-4 text-base font-black">اطلاعات چالش‌ها بارگذاری نشد</h2><p className="mt-2 max-w-sm text-sm leading-7 text-muted-foreground">اطلاعات فعلی در دسترس نیست. دوباره تلاش کن.</p><Button className="mt-5 min-h-11" disabled={pending} onClick={() => { setPending(true); void router.invalidate({ sync: true }).finally(() => setPending(false)); }}>{pending ? "در حال تلاش..." : "تلاش دوباره"}</Button></div>;
}
