import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, Ban, CalendarClock, Clock3, Gamepad2, LockKeyhole, MapPin, ShieldCheck, Trophy } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toPersianDigits } from "@/lib/format";
import type { ChallengeCommand, ChallengeHubPageData, ChallengeItem, ChallengeLifecycle, ChallengeOutcome } from "@/lib/challenge-hub-contract";

const lifecyclePresentation: Record<ChallengeLifecycle, { label: string; className: string }> = {
  "invitation-pending": { label: "در انتظار پاسخ", className: "bg-primary/15 text-primary" },
  "invitation-expired": { label: "مهلت پایان یافته", className: "bg-elevated text-muted-foreground" },
  "invitation-declined": { label: "رد شده", className: "bg-elevated text-muted-foreground" },
  accepted: { label: "پذیرفته‌شده", className: "bg-success/15 text-success" },
  "match-ready": { label: "Match آماده است", className: "bg-secondary/15 text-secondary" },
  "awaiting-result": { label: "در انتظار نتیجه", className: "bg-warning/15 text-warning" },
  "action-required": { label: "نیازمند اقدام", className: "bg-warning/15 text-warning" },
  completed: { label: "پایان‌یافته", className: "bg-success/15 text-success" },
  cancelled: { label: "لغوشده", className: "bg-elevated text-muted-foreground" },
};

const outcomePresentation: Record<ChallengeOutcome, { label: string; className: string }> = {
  win: { label: "برد", className: "text-success" },
  loss: { label: "باخت", className: "text-destructive" },
  draw: { label: "مساوی", className: "text-muted-foreground" },
  void: { label: "باطل‌شده", className: "text-muted-foreground" },
};

export function ChallengeSummaryCard({ label, value, icon }: { label: string; value: number; icon: ReactNode }) {
  return <div className="rounded-2xl border border-border bg-card p-4"><div className="flex items-center justify-between gap-3"><span className="text-xs font-bold text-muted-foreground">{label}</span><span className="text-primary" aria-hidden="true">{icon}</span></div><p className="mt-3 font-mono-num text-2xl font-black" dir="ltr">{toPersianDigits(value)}</p></div>;
}

export function ChallengeAccessCard({ data }: { data: ChallengeHubPageData }) {
  const { access } = data;
  const progress = Math.min(100, Math.max(0, (access.finalizedValidMatches / access.requiredFinalizedMatches) * 100));

  if (access.unlocked) {
    return <section aria-labelledby="challenge-access-title" className="overflow-hidden rounded-2xl border border-success/30 bg-card"><div className="h-1 bg-gradient-to-l from-success via-secondary to-primary" /><div className="grid gap-5 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><div className="flex items-center gap-2 text-success"><ShieldCheck className="h-5 w-5" aria-hidden="true" /><h2 id="challenge-access-title" className="text-sm font-black">بخش چالش فعال است</h2></div><p className="mt-2 max-w-xl text-xs leading-6 text-muted-foreground">دعوت‌های مستقیم را مدیریت کن؛ ایجاد دعوت فقط با حریف، بازی و فرمت مجاز انجام می‌شود.</p></div><dl className="grid grid-cols-2 gap-3 sm:min-w-80"><div className="rounded-xl border border-secondary/25 bg-secondary/8 p-3"><dt className="text-[11px] font-bold text-muted-foreground">امتیاز چالش</dt><dd className="mt-1 font-mono-num text-xl font-black text-secondary" dir="ltr">{access.challengeRating === null ? "—" : toPersianDigits(access.challengeRating)}</dd></div><div className="rounded-xl border border-border bg-elevated/60 p-3"><dt className="text-[11px] font-bold text-muted-foreground">Match نهایی معتبر</dt><dd className="mt-1 font-mono-num text-xl font-black" dir="ltr">{toPersianDigits(access.finalizedValidMatches)}</dd></div></dl></div></section>;
  }

  return <section aria-labelledby="challenge-access-title" className="rounded-2xl border border-border bg-card p-5"><div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-elevated text-muted-foreground"><LockKeyhole className="h-5 w-5" aria-hidden="true" /></span><div className="min-w-0 flex-1"><h2 id="challenge-access-title" className="text-sm font-black">چالش هنوز فعال نشده</h2><p className="mt-1.5 text-xs leading-6 text-muted-foreground">فعال‌سازی این بخش به تعداد Matchهای نهایی معتبر حساب وابسته است؛ برد یا باخت به‌تنهایی معیار فعال‌سازی نیست.</p><div className="mt-4 flex items-center justify-between gap-3 text-xs font-bold"><span>{toPersianDigits(access.finalizedValidMatches)} از {toPersianDigits(access.requiredFinalizedMatches)} Match نهایی معتبر</span><span className="text-muted-foreground">{toPersianDigits(Math.round(progress))}٪</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-elevated" role="progressbar" aria-valuemin={0} aria-valuemax={access.requiredFinalizedMatches} aria-valuenow={access.finalizedValidMatches} aria-label="پیشرفت فعال‌سازی چالش"><div className="h-full rounded-full bg-gradient-to-l from-primary to-secondary" style={{ width: `${progress}%` }} /></div><Button asChild variant="outline" className="mt-4 min-h-11"><Link to="/dashboard/matches">مشاهده Matchهای من <ArrowLeft aria-hidden="true" /></Link></Button></div></div></section>;
}

function NavigationButton({ item }: { item: ChallengeItem }) {
  const target = item.navigationTarget;
  if (!target) return null;
  if (target.kind === "my-matches") return <Button asChild className="min-h-11 flex-1"><Link to="/dashboard/matches">مشاهده Matchها <ArrowLeft aria-hidden="true" /></Link></Button>;
  if (target.kind === "result-submission") return <Button asChild className="min-h-11 flex-1"><Link to="/matches/$id/result" params={{ id: target.matchId }}>ثبت یا بررسی نتیجه <ArrowLeft aria-hidden="true" /></Link></Button>;
  return <Button asChild className="min-h-11 flex-1"><Link to="/matches/$id/dispute" params={{ id: target.matchId }}>مشاهده اعتراض <ArrowLeft aria-hidden="true" /></Link></Button>;
}

export function ChallengeCard({ item, pendingKey, onCommand, onConfirm }: { item: ChallengeItem; pendingKey: string | null; onCommand: (item: ChallengeItem, command: ChallengeCommand) => void; onConfirm: (item: ChallengeItem, command: "decline" | "cancel") => void }) {
  const presentation = lifecyclePresentation[item.lifecycle];
  const result = item.result ? outcomePresentation[item.result.outcome] : null;
  const isPending = pendingKey?.startsWith(`${item.challengeId}:`) ?? false;
  const isInvitation = item.lifecycle.startsWith("invitation");

  return <li className={cn("flex min-w-0 flex-col rounded-2xl border bg-card p-4 sm:p-5", item.actionRequiredLabel ? "border-warning/40" : "border-border")}>
    <div className="flex min-w-0 items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><Avatar className="h-12 w-12 border border-primary/30"><AvatarFallback className="bg-primary/15 font-mono-num text-xs font-black text-primary">{item.opponent.avatarInitials}</AvatarFallback></Avatar><div className="min-w-0"><p className="truncate text-sm font-black" dir="ltr">{item.opponent.gamerTag}</p><p className="mt-1 truncate text-[11px] text-muted-foreground">{item.game.name}</p></div></div><span className={cn("shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black", presentation.className)}>{item.statusLabel || presentation.label}</span></div>
    <dl className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-border bg-elevated/50 p-3 text-xs"><div><dt className="text-[10px] text-muted-foreground">نوع دعوت</dt><dd className="mt-1 font-bold">{item.direction === "incoming" ? "دریافتی" : "ارسال‌شده"}</dd></div><div><dt className="text-[10px] text-muted-foreground">فرمت Match</dt><dd className="mt-1 font-bold" dir="ltr">{item.format.label}</dd></div><div><dt className="text-[10px] text-muted-foreground">زمان ایجاد</dt><dd className="mt-1 font-bold">{item.createdAtLabel}</dd></div><div><dt className="text-[10px] text-muted-foreground">امتیاز چالش حریف</dt><dd className="mt-1 font-mono-num font-bold text-secondary" dir="ltr">{item.opponent.challengeRating === null ? "ثبت نشده" : toPersianDigits(item.opponent.challengeRating)}</dd></div></dl>
    {item.responseDeadlineLabel ? <p className={cn("mt-3 flex items-center gap-2 text-xs", item.lifecycle === "invitation-expired" ? "text-muted-foreground" : "text-warning")}><Clock3 className="h-4 w-4" aria-hidden="true" /> مهلت پاسخ: {item.responseDeadlineLabel}</p> : null}
    {item.note ? <blockquote className="mt-3 rounded-xl border-s-2 border-primary bg-primary/8 p-3 text-xs leading-6 text-muted-foreground">«{item.note}»</blockquote> : null}
    {item.match ? <div className="mt-3 space-y-2 rounded-xl border border-border p-3 text-xs">{item.match.startsAtLabel ? <p className="flex items-center gap-2"><CalendarClock className="h-4 w-4 text-primary" aria-hidden="true" /> {item.match.startsAtLabel}</p> : null}{item.match.venueLabel ? <p className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" aria-hidden="true" /> {item.match.venueLabel}</p> : null}{item.match.contextLabel ? <p className="flex items-center gap-2 text-muted-foreground"><Gamepad2 className="h-4 w-4" aria-hidden="true" /> {item.match.contextLabel}</p> : null}</div> : null}
    {item.actionRequiredLabel ? <div className="mt-3 flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/8 p-3" role="status"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" /><div><p className="text-xs font-black text-warning">نیازمند توجه</p><p className="mt-1 text-[11px] leading-5 text-muted-foreground">{item.actionRequiredLabel}</p></div></div> : null}
    {item.result && result ? <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-elevated/60 p-3.5"><div className="flex items-center gap-2"><Trophy className={cn("h-4 w-4", result.className)} aria-hidden="true" /><div><p className={cn("text-xs font-black", result.className)}>{result.label}</p><p className="mt-0.5 text-[10px] text-muted-foreground">{item.result.completedAtLabel}</p></div></div><div className="text-left"><p className="font-mono-num text-lg font-black" dir="ltr">{item.result.scoreLabel ?? "—"}</p>{item.result.ratingDelta !== null ? <p className={cn("mt-0.5 font-mono-num text-xs font-black", item.result.ratingDelta > 0 ? "text-success" : item.result.ratingDelta < 0 ? "text-destructive" : "text-muted-foreground")} dir="ltr">{item.result.ratingDelta > 0 ? "+" : ""}{toPersianDigits(item.result.ratingDelta)} امتیاز چالش</p> : null}</div></div> : null}
    <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row">{item.allowedCommands.includes("accept") ? <Button className="min-h-11 flex-1" disabled={isPending} onClick={() => onCommand(item, "accept")}>{isPending ? "در حال ثبت..." : "پذیرفتن چالش"}</Button> : null}{item.allowedCommands.includes("decline") ? <Button variant="outline" className="min-h-11 flex-1" disabled={isPending} onClick={() => onConfirm(item, "decline")}>رد کردن</Button> : null}{item.allowedCommands.includes("cancel") ? <Button variant="outline" className="min-h-11 flex-1" disabled={isPending} onClick={() => onConfirm(item, "cancel")}>لغو دعوت</Button> : null}<NavigationButton item={item} />{isInvitation && item.allowedCommands.length === 0 && !item.navigationTarget ? <p className="flex min-h-11 flex-1 items-center justify-center rounded-lg bg-elevated px-4 text-xs font-bold text-muted-foreground"><Ban className="me-2 h-4 w-4" aria-hidden="true" /> این دعوت دیگر قابل اقدام نیست</p> : null}</div>
  </li>;
}
