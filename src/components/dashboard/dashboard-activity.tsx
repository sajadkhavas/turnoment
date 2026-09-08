import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, CalendarCheck2, Flame, MapPin, Medal, Swords, Trophy, Users } from "lucide-react";
import type {
  AchievementSummary,
  ChallengeSummary,
  NotificationSummary,
  PlayerMatchSummary,
  RivalryPreview,
  TeamSummary,
  TournamentRegistrationSummary,
  UpcomingMatchSummary,
} from "@/lib/dashboard-data";
import { toPersianDigits } from "@/lib/format";
import { EmptyState, SectionCard } from "./dashboard-states";

const moreLink = "text-xs font-bold text-primary hover:underline";

export function NextTournamentCard({ tournament }: { tournament: TournamentRegistrationSummary | null }) {
  if (!tournament) {
    return (
      <SectionCard title="مسابقه بعدی">
        <EmptyState text="هنوز در مسابقه‌ای ثبت‌نام نکردی" ctaLabel="پیدا کردن مسابقه" ctaTo="/tournaments" />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="مسابقه بعدی">
      <h3 className="text-base font-black">{tournament.title}</h3>
      <p className="mt-1 text-xs text-secondary">{tournament.game}</p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div><dt className="text-muted-foreground">گیم‌نت</dt><dd className="mt-1 font-bold">{tournament.venue}</dd></div>
        <div><dt className="text-muted-foreground">تاریخ</dt><dd className="mt-1 font-bold">{tournament.date}</dd></div>
        <div><dt className="text-muted-foreground">ساعت</dt><dd className="mt-1 font-mono-num font-bold">{tournament.time}</dd></div>
        <div><dt className="text-muted-foreground">فرمت</dt><dd className="mt-1 font-bold" dir="ltr">{tournament.format}</dd></div>
      </dl>
      <p className="mt-4 inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-bold text-success">
        <CalendarCheck2 className="h-3.5 w-3.5" aria-hidden="true" /> {tournament.registrationState}
      </p>
      <div className="mt-4">
        <Link
          to="/tournaments/$id"
          params={{ id: tournament.tournamentSlug }}
          className="inline-flex h-10 items-center rounded-lg border border-border bg-elevated px-4 text-xs font-bold hover:border-primary/60 hover:text-primary"
        >
          مشاهده جزئیات
        </Link>
      </div>
    </SectionCard>
  );
}

export function UpcomingMatchCard({ match, gamerTag }: { match: UpcomingMatchSummary | null; gamerTag: string }) {
  if (!match) {
    return (
      <SectionCard title="مسابقه بعدی من">
        <EmptyState text="هنوز مسابقه رسمی نداری" ctaLabel="پیدا کردن مسابقه" ctaTo="/tournaments" />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="مسابقه بعدی من">
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 rounded-xl border border-border bg-elevated p-4 text-center">
        <span className="truncate text-sm font-black text-primary" dir="ltr">{gamerTag}</span>
        <span className="font-mono-num text-xs font-black text-muted-foreground">VS</span>
        <span className="truncate text-sm font-black text-secondary" dir="ltr">{match.opponentTag}</span>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div><dt className="text-muted-foreground">بازی</dt><dd className="mt-1 font-bold">{match.game}</dd></div>
        <div><dt className="text-muted-foreground">مسابقه</dt><dd className="mt-1 font-bold">{match.competition}</dd></div>
        <div><dt className="text-muted-foreground">مرحله</dt><dd className="mt-1 font-bold" dir="ltr">{match.round}</dd></div>
        <div><dt className="text-muted-foreground">ساعت</dt><dd className="mt-1 font-mono-num font-bold">{match.time}</dd></div>
        <div className="col-span-2"><dt className="text-muted-foreground">گیم‌نت</dt><dd className="mt-1 font-bold">{match.venue}</dd></div>
      </dl>
      <p className="mt-4 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-bold text-primary">
        {match.statusLabel}
      </p>
      <div className="mt-4">
        <Link to="/dashboard/matches" className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-xs font-bold text-primary-foreground">
          مشاهده Match
        </Link>
      </div>
    </SectionCard>
  );
}

const resultLabel: Record<PlayerMatchSummary["result"], { text: string; className: string }> = {
  win: { text: "برد", className: "bg-success/15 text-success" },
  loss: { text: "باخت", className: "bg-destructive/15 text-destructive" },
  draw: { text: "مساوی", className: "bg-elevated text-muted-foreground" },
};

export function RecentMatches({ matches }: { matches: PlayerMatchSummary[] }) {
  return (
    <SectionCard
      title="آخرین مسابقات"
      action={<Link to="/dashboard/matches" className={moreLink}>مشاهده همه مسابقات</Link>}
    >
      {matches.length === 0 ? (
        <EmptyState text="هنوز مسابقه رسمی نداری" ctaLabel="پیدا کردن مسابقه" ctaTo="/tournaments" />
      ) : (
        <ul className="space-y-2">
          {matches.map((m) => {
            const r = resultLabel[m.result];
            return (
              <li key={m.matchId} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-elevated p-3.5">
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold" dir="ltr">vs {m.opponentTag}</div>
                  <div className="mt-1 truncate text-[11px] text-muted-foreground">
                    {m.game} · {m.competition} · {m.kind === "challenge" ? "چالش" : "مسابقه"} · {m.date}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-end">
                  <span className="font-mono-num text-sm font-black" dir="ltr">{m.score}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${r.className}`}>{r.text}</span>
                  {m.ratingDelta !== null && (
                    <span
                      className={`font-mono-num text-[11px] font-bold ${m.ratingDelta > 0 ? "text-success" : m.ratingDelta < 0 ? "text-destructive" : "text-muted-foreground"}`}
                      dir="ltr"
                    >
                      {m.ratingDelta > 0 ? `+${m.ratingDelta}` : m.ratingDelta}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </SectionCard>
  );
}

const tabs = [
  { id: "upcoming", label: "پیش رو" },
  { id: "live", label: "در حال برگزاری" },
  { id: "completed", label: "تکمیل‌شده" },
] as const;

export function MyTournamentsPreview({ tournaments }: { tournaments: TournamentRegistrationSummary[] }) {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("upcoming");
  const list = tournaments.filter((t) => t.tournamentState === tab);

  return (
    <SectionCard title="مسابقات من" action={<Link to="/dashboard/tournaments" className={moreLink}>همه مسابقات من</Link>}>
      <div role="tablist" aria-label="وضعیت مسابقات" className="mb-4 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`h-9 rounded-full border px-3.5 text-xs font-bold transition-colors ${
              tab === t.id ? "border-primary/50 bg-primary/15 text-primary" : "border-border bg-elevated text-muted-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <EmptyState text="در این وضعیت مسابقه‌ای نداری" ctaLabel="پیدا کردن مسابقه" ctaTo="/tournaments" />
      ) : (
        <ul className="space-y-2">
          {list.map((t) => (
            <li key={t.tournamentId} className="rounded-xl border border-border bg-elevated p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-black">{t.title}</h3>
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">{t.registrationState}</span>
              </div>
              <p className="mt-1.5 text-[11px] text-muted-foreground">
                {t.game} · <MapPin className="inline h-3 w-3" aria-hidden="true" /> {t.venue} · {t.date} · {t.time}
              </p>
              <Link
                to="/tournaments/$id"
                params={{ id: t.tournamentSlug }}
                className="mt-3 inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 text-[11px] font-bold hover:text-primary"
              >
                {t.nextActionLabel}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}

export function ChallengesPreview({
  challenges,
  unlocked,
  finalizedMatches,
  requiredMatches,
}: {
  challenges: ChallengeSummary[];
  unlocked: boolean;
  finalizedMatches: number;
  requiredMatches: number;
}) {
  return (
    <SectionCard title="چالش‌ها" action={<Link to="/dashboard/challenges" className={moreLink}>مدیریت چالش‌ها</Link>}>
      {!unlocked ? (
        <div className="rounded-xl border border-border bg-elevated p-4">
          <p className="text-sm font-bold">چالش هنوز فعال نشده</p>
          <p className="mt-1.5 font-mono-num text-xs text-muted-foreground" dir="ltr">
            {finalizedMatches} / {requiredMatches}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            با ثبت {toPersianDigits(requiredMatches)} مسابقه معتبر، ارسال و دریافت چالش فعال می‌شود.
          </p>
        </div>
      ) : challenges.length === 0 ? (
        <EmptyState text="هنوز چالشی نداری" ctaLabel="پیدا کردن رقیب" ctaTo="/ranking" />
      ) : (
        <ul className="space-y-2">
          {challenges.map((c) => (
            <li key={c.challengeId} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-elevated p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">
                  <span dir="ltr">{c.opponentTag}</span> {c.direction === "incoming" ? "تو را به چالش دعوت کرده" : "دعوت تو را دریافت کرده"}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">{c.game} · {c.statusLabel}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {c.isNew && <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-[10px] font-black text-secondary">جدید</span>}
                <Link to="/dashboard/challenges" className="inline-flex h-9 items-center rounded-lg bg-primary px-3 text-[11px] font-bold text-primary-foreground">
                  مشاهده چالش
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}

export function RivalryPreviewCard({ rivalry, gamerTag }: { rivalry: RivalryPreview | null; gamerTag: string }) {
  if (!rivalry) return null;
  return (
    <SectionCard title="رقابت داغ">
      <div className="rounded-xl border border-warning/35 bg-warning/8 p-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 text-center">
          <span className="truncate text-sm font-black text-primary" dir="ltr">{gamerTag}</span>
          <span className="font-mono-num text-lg font-black" dir="ltr">{rivalry.playerScore} — {rivalry.opponentScore}</span>
          <span className="truncate text-sm font-black text-secondary" dir="ltr">{rivalry.opponentTag}</span>
        </div>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          {toPersianDigits(rivalry.meetings)} رویارویی · آخرین دیدار: {rivalry.lastMeeting}
        </p>
      </div>
      <Link to="/dashboard/rivalries" className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-elevated px-4 text-xs font-bold hover:text-warning">
        <Flame className="h-4 w-4" aria-hidden="true" /> مشاهده رقابت
      </Link>
    </SectionCard>
  );
}

export function TeamPreview({ team }: { team: TeamSummary | null }) {
  return (
    <SectionCard title="تیم من">
      {!team ? (
        <EmptyState text="هنوز عضو تیمی نیستی" ctaLabel="پیدا کردن مسابقه تیمی" ctaTo="/tournaments" />
      ) : (
        <>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-elevated text-secondary" aria-hidden="true">
              <Users className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-black" dir="ltr">{team.name}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {toPersianDigits(team.members)} عضو · {team.game} · {toPersianDigits(team.upcomingEvents)} رویداد پیش رو
              </p>
            </div>
          </div>
          <Link to="/dashboard/teams" className="mt-4 inline-flex h-10 items-center rounded-lg border border-border bg-elevated px-4 text-xs font-bold hover:text-primary">
            مدیریت تیم
          </Link>
        </>
      )}
    </SectionCard>
  );
}

export function AchievementsPreview({ achievements }: { achievements: AchievementSummary[] }) {
  return (
    <SectionCard title="دستاوردها" action={<Link to="/dashboard/achievements" className={moreLink}>مشاهده همه</Link>}>
      <ul className="grid gap-2 sm:grid-cols-2">
        {achievements.map((a) => (
          <li
            key={a.achievementId}
            className={`flex items-center gap-3 rounded-xl border p-3.5 ${a.unlocked ? "border-primary/30 bg-primary/8" : "border-border bg-elevated opacity-70"}`}
          >
            <Medal className={`h-5 w-5 shrink-0 ${a.unlocked ? "text-primary" : "text-muted-foreground"}`} aria-hidden="true" />
            <div className="min-w-0">
              <p className="truncate text-xs font-bold">{a.title}</p>
              <p className="truncate text-[11px] text-muted-foreground">{a.unlocked ? a.description : "هنوز باز نشده"}</p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

const notifIcon = { schedule: CalendarCheck2, result: Trophy, challenge: Swords, registration: Bell } as const;

export function NotificationsPreview({ notifications }: { notifications: NotificationSummary[] }) {
  return (
    <SectionCard title="اعلان‌های مهم" action={<Link to="/dashboard/notifications" className={moreLink}>مشاهده همه اعلان‌ها</Link>}>
      {notifications.length === 0 ? (
        <EmptyState text="اعلان جدیدی نداری" />
      ) : (
        <ul className="space-y-1.5">
          {notifications.map((n) => {
            const Icon = notifIcon[n.kind];
            return (
              <li key={n.notificationId}>
                <Link
                  to="/dashboard/notifications"
                  className="flex items-center gap-3 rounded-xl border border-border bg-elevated p-3.5 hover:border-primary/40"
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate text-xs font-bold">{n.title}</span>
                  {n.unread && <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-[10px] font-black text-secondary">خوانده‌نشده</span>}
                  <span className="shrink-0 text-[11px] text-muted-foreground">{n.timeAgo}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </SectionCard>
  );
}

export function QuickActions() {
  return (
    <SectionCard title="دسترسی سریع">
      <div className="flex flex-wrap gap-2">
        <Link to="/tournaments" className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-xs font-bold text-primary-foreground">
          <Trophy className="h-4 w-4" aria-hidden="true" /> پیدا کردن مسابقه
        </Link>
        <Link to="/ranking" className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-elevated px-4 text-xs font-bold hover:text-primary">
          مشاهده رتبه‌بندی
        </Link>
      </div>
    </SectionCard>
  );
}
