import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Crown,
  RotateCcw,
  ShieldCheck,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type {
  PlayerTeamMembership,
  PlayerTeamRole,
  PlayerTeamRosterMember,
  PlayerTeamsPageData,
} from "@/lib/player-teams-contract";

const roleMeta: Record<PlayerTeamRole, { label: string; icon: LucideIcon; className: string }> = {
  captain: {
    label: "کاپیتان",
    icon: Crown,
    className: "border-primary/30 bg-primary/10 text-primary",
  },
  member: {
    label: "عضو",
    icon: ShieldCheck,
    className: "border-border bg-elevated text-muted-foreground",
  },
};

function SummaryCard({ icon: Icon, label, value, hint }: { icon: LucideIcon; label: string; value: number; hint: string }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-black tabular-nums sm:text-3xl">{value.toLocaleString("fa-IR")}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary" aria-hidden="true">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-xs leading-6 text-muted-foreground">{hint}</p>
    </article>
  );
}

function MembershipCard({
  membership,
  active,
  onSelect,
}: {
  membership: PlayerTeamMembership;
  active: boolean;
  onSelect: () => void;
}) {
  const role = roleMeta[membership.role];
  const RoleIcon = role.icon;

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={`min-h-[104px] w-full rounded-2xl border p-4 text-right transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        active ? "border-primary bg-primary/10" : "border-border bg-card hover:bg-elevated"
      }`}
    >
      <span className="flex items-start justify-between gap-3">
        <span className="min-w-0">
          <span className="block break-words text-base font-black text-foreground">{membership.name}</span>
          <span className="mt-2 block text-xs font-bold text-muted-foreground">
            {membership.memberCount.toLocaleString("fa-IR")} عضو
          </span>
        </span>
        <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-black ${role.className}`}>
          <RoleIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {role.label}
        </span>
      </span>
    </button>
  );
}

function RosterMemberRow({ member, currentPlayerId }: { member: PlayerTeamRosterMember; currentPlayerId: string }) {
  const role = roleMeta[member.role];
  const RoleIcon = role.icon;
  const isCurrentPlayer = member.playerId === currentPlayerId;

  return (
    <li className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-border bg-elevated/50 p-3.5 sm:p-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-card text-muted-foreground" aria-hidden="true">
          <UserRound className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-black text-foreground" dir="ltr">{member.gamerTag}</p>
          <p className="mt-1 text-[11px] font-bold text-muted-foreground">{isCurrentPlayer ? "حساب شما" : "عضو تیم"}</p>
        </div>
      </div>
      <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-black ${role.className}`}>
        <RoleIcon className="h-3.5 w-3.5" aria-hidden="true" />
        {role.label}
      </span>
    </li>
  );
}

export function PlayerTeamsPage({
  data,
  teamId,
  onTeamChange,
  onPageChange,
  onResetSelection,
}: {
  data: PlayerTeamsPageData;
  teamId?: string;
  onTeamChange: (teamId: string) => void;
  onPageChange: (page: number) => void;
  onResetSelection: () => void;
}) {
  const isEmpty = data.selectionState === "none";
  const isUnavailable = data.selectionState === "unavailable";
  const selectedTeam = data.selectedTeam;

  return (
    <div className="space-y-5 sm:space-y-6">
      <header className="overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold text-primary">داشبورد بازیکن</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">تیم‌های من</h1>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
              عضویت‌های تیمی حسابت و فهرست اعضای هر تیم را یک‌جا ببین. نقش‌ها و ترکیب اعضا بر اساس آخرین وضعیت ثبت‌شده نمایش داده می‌شوند.
            </p>
          </div>
          <div className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-bold text-primary">
            <UsersRound className="h-4 w-4" aria-hidden="true" />
            نمای تیمی حساب
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3" aria-label="خلاصه عضویت‌های تیمی">
        <SummaryCard icon={UsersRound} label="تیم‌های فعال" value={data.summary.totalTeams} hint="همه عضویت‌های تیمی فعلی حساب شما" />
        <SummaryCard icon={Crown} label="در نقش کاپیتان" value={data.summary.captainOf} hint="تیم‌هایی که نقش فعلی شما در آن‌ها کاپیتان است" />
        <SummaryCard icon={ShieldCheck} label="در نقش عضو" value={data.summary.memberOf} hint="تیم‌هایی که نقش فعلی شما در آن‌ها عضو است" />
      </section>

      {isEmpty ? (
        <section className="grid place-items-center rounded-2xl border border-dashed border-border bg-card p-8 text-center sm:p-12">
          <UsersRound className="h-11 w-11 text-muted-foreground" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-black">هنوز عضویت تیمی ثبت نشده است</h2>
          <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
            وقتی عضویت تیمی برای حساب شما ثبت شود، نام تیم، نقش شما و فهرست اعضا در همین بخش دیده می‌شود.
          </p>
        </section>
      ) : (
        <>
          <section className="rounded-2xl border border-border bg-card p-4 sm:p-5" aria-labelledby="team-switcher-title">
            <div className="flex flex-col gap-1">
              <h2 id="team-switcher-title" className="text-sm font-black">تیم‌های حساب شما</h2>
              <p className="text-xs leading-6 text-muted-foreground">برای دیدن ترکیب اعضا، یکی از عضویت‌های فعلی را انتخاب کنید.</p>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {data.memberships.map((membership) => (
                <MembershipCard
                  key={membership.teamId}
                  membership={membership}
                  active={selectedTeam?.teamId === membership.teamId}
                  onSelect={() => onTeamChange(membership.teamId)}
                />
              ))}
            </div>
          </section>

          {isUnavailable ? (
            <section className="rounded-2xl border border-warning/30 bg-warning/10 p-5" role="status" aria-live="polite">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning" aria-hidden="true" />
                <div className="min-w-0">
                  <h2 className="font-black text-foreground">این انتخاب در عضویت‌های فعلی شما نیست</h2>
                  <p className="mt-1 text-sm leading-7 text-muted-foreground">
                    از فهرست بالا یک تیم دیگر انتخاب کنید یا به نمای پیش‌فرض تیم‌های خود برگردید.
                  </p>
                  <button
                    type="button"
                    onClick={onResetSelection}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 text-xs font-black text-foreground hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    بازگشت به تیم‌های من
                  </button>
                </div>
              </div>
            </section>
          ) : selectedTeam ? (
            <section className="overflow-hidden rounded-2xl border border-border bg-card" aria-labelledby="selected-team-title">
              <div className="border-b border-border p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-muted-foreground">تیم انتخاب‌شده</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <h2 id="selected-team-title" className="break-words text-xl font-black sm:text-2xl">{selectedTeam.name}</h2>
                      {(() => {
                        const role = roleMeta[selectedTeam.currentPlayerRole];
                        const RoleIcon = role.icon;
                        return (
                          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-black ${role.className}`}>
                            <RoleIcon className="h-3.5 w-3.5" aria-hidden="true" />
                            {role.label}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-elevated px-4 py-3 text-sm font-black">
                    {selectedTeam.memberCount.toLocaleString("fa-IR")} عضو
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-base font-black">فهرست اعضای تیم</h3>
                    <p className="mt-1 text-xs leading-6 text-muted-foreground">نقش هر بازیکن در کنار شناسه نمایشی او مشخص شده است.</p>
                  </div>
                  <p className="text-xs font-bold text-muted-foreground" aria-live="polite">
                    صفحه {selectedTeam.rosterPagination.currentPage.toLocaleString("fa-IR")} از {selectedTeam.rosterPagination.totalPages.toLocaleString("fa-IR")}
                  </p>
                </div>

                <ul className="mt-4 grid gap-2.5" aria-label={`اعضای تیم ${selectedTeam.name}`}>
                  {selectedTeam.roster.map((member) => (
                    <RosterMemberRow key={member.playerId} member={member} currentPlayerId={data.player.playerId} />
                  ))}
                </ul>

                {selectedTeam.rosterPagination.totalPages > 1 ? (
                  <nav className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-5" aria-label="صفحه‌بندی فهرست اعضای تیم">
                    <button
                      type="button"
                      disabled={selectedTeam.rosterPagination.currentPage <= 1}
                      onClick={() => onPageChange(selectedTeam.rosterPagination.currentPage - 1)}
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-elevated px-3 text-xs font-black disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      صفحه قبل
                    </button>
                    <span className="text-xs font-bold text-muted-foreground">
                      {selectedTeam.rosterPagination.totalItems.toLocaleString("fa-IR")} عضو ثبت‌شده
                    </span>
                    <button
                      type="button"
                      disabled={selectedTeam.rosterPagination.currentPage >= selectedTeam.rosterPagination.totalPages}
                      onClick={() => onPageChange(selectedTeam.rosterPagination.currentPage + 1)}
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-elevated px-3 text-xs font-black disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      صفحه بعد
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </nav>
                ) : null}
              </div>
            </section>
          ) : null}
        </>
      )}

      {teamId && data.selectionState === "selected" ? (
        <p className="sr-only" aria-live="polite">تیم انتخاب‌شده با موفقیت نمایش داده شد.</p>
      ) : null}
    </div>
  );
}

export function PlayerTeamsSkeleton() {
  return (
    <div className="space-y-5 sm:space-y-6" aria-busy="true" aria-label="در حال آماده‌سازی تیم‌های شما">
      <div className="h-36 animate-pulse rounded-2xl border border-border bg-card" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((item) => <div key={item} className="h-32 animate-pulse rounded-2xl border border-border bg-card" />)}
      </div>
      <div className="h-40 animate-pulse rounded-2xl border border-border bg-card" />
      <div className="h-[420px] animate-pulse rounded-2xl border border-border bg-card" />
    </div>
  );
}

export function PlayerTeamsErrorState() {
  return (
    <section className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center" role="alert">
      <AlertTriangle className="mx-auto h-9 w-9 text-destructive" aria-hidden="true" />
      <h1 className="mt-4 text-lg font-black">نمایش تیم‌ها انجام نشد</h1>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-muted-foreground">برای دریافت دوباره اطلاعات، صفحه را تازه‌سازی کنید.</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-black text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        تلاش دوباره
      </button>
    </section>
  );
}
