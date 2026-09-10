# F11 — Player Settings & Notification Preferences

Status: `MERGED / CLOSEOUT IN PROGRESS`

Route: `/dashboard/settings`

Target: `FINAL_PRIVATE`

START_SHA: `4e3a347de9140636bc95e37b096f67f146ed2e70`

Implementation branch: `phase/f11-player-settings`

Final implementation/evidence head: `1688356421e07747b36944cf4e47038e843f2a67`

Implementation PR: `#63` — MERGED

Implementation merge / closeout base: `ce3e241e297c86c9c8c09b2d29d774274f0ef847`

Closeout branch: `closeout/f11-player-settings`

Tracking Issue: `#62` — MUST remain open until terminal frozen-main CI/artifact/digest and exact-main verification are complete.

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

Backend docs-alignment Issue: `sajadkhavas/turnoment-backend#19` — CLOSED / COMPLETED

Backend docs-alignment PR: `#20` — MERGED

Accepted backend main: `3fb421cf2c85d94753ddf9352d8bc1134358847a`

Backend post-main Quality Gate: `34477753302` — PASS on Python 3.12 and 3.14

## 1. Prior truth / scope lock

F10 is terminally frozen at frontend main `4e3a347de9140636bc95e37b096f67f146ed2e70`; Issue #59 is CLOSED / COMPLETED; terminal Quality Gate `34474656269` PASS; terminal artifact `10151074107`.

Before F11, `/dashboard/settings` was only `DashboardSectionPlaceholder`. Challenge Hub Lovable work remains isolated and is not owned by F11.

## 2. Accepted product scope

F11 owns only notification preferences already grounded in F10 notification kinds.

Writable optional controls:
- `tournament`;
- `match`;
- `challenge`.

Mandatory/non-disableable categories:
- `account`;
- `system`.

Preference changes are prospective. They do not delete/change existing F10 inbox items and never mutate tournament/match/challenge membership, eligibility, lifecycle, result, rating, dispute or moderation truth.

F11 does not invent unrelated privacy settings, challenge business rules, password flows, email identity, or PWA/web-push subscription behavior.

## 3. Official documentation / design audit

Reviewed before implementation:
- TanStack Router data loading and document head management;
- WCAG 2.2 / WAI guidance for descriptive headings/control labels, visible focus, input assistance and programmatically exposed status feedback;
- existing Turnoment DashboardShell, F09 Player Profile, F10 Notifications and shared design tokens;
- external notification/settings interaction patterns only for information architecture, without copying branding/assets/copy.

Accepted decisions:
- settings are loader-backed, not ad-hoc presentation fetches;
- save state and error/stale feedback are explicit;
- switches expose programmatic labels/descriptions;
- no client-side persisted auth token is introduced.

## 4. Permanent architecture

Accepted frontend boundary:

`private dashboard access policy → loader → typed PlayerSettingsRepository → runtime-validated settings projection → UI`

Repository selection:
- deterministic fixture repository for local/CI/visual QA;
- Django HTTP adapter for the planned production contract;
- both satisfy the same typed interface, so UI does not depend on adapter choice.

## 5. Cross-repo API contract

Backend documentation alignment is terminally accepted as documentation only:
- backend Issue `#19` — CLOSED / COMPLETED;
- docs head `44aee41fac159d5095218af06b635e9caa519375`;
- backend PR `#20` — MERGED;
- PR Quality Gate `34477007799` — PASS on Python 3.12 and 3.14;
- accepted backend main `3fb421cf2c85d94753ddf9352d8bc1134358847a`;
- post-main Backend Quality Gate `34477753302` — PASS on Python 3.12 and 3.14;
- live backend main reverified exact accepted SHA.

Planned endpoints:
- `GET /api/v1/me/settings/notification-preferences/`;
- `PATCH /api/v1/me/settings/notification-preferences/`.

Projection:
- opaque `revision`;
- optional booleans for tournament/match/challenge;
- literal required `account=true`, `system=true`.

Save request contains only revision + the three writable optional values. Account/system cannot enter the writable schema.

Concurrency:
- revision is opaque;
- stale writes return a typed stale outcome + current authoritative settings;
- frontend replaces its persisted baseline with authoritative current projection rather than silently overwriting newer state.

Auth/security:
- Django Session Authentication;
- `credentials: include`;
- existing P01 CSRF bootstrap for PATCH;
- no localStorage/sessionStorage bearer auth.

No live backend Settings implementation is claimed. Runtime remains `FRONTEND MOCK / BACKEND PENDING`. Backend NEXT remains `P02 — Games / Catalog Foundation`.

## 6. Final UI/state requirements accepted

- private `noindex,nofollow` route;
- authenticated loader redirect to Login;
- loading skeleton;
- load error/retry;
- normal settings state;
- three accessible optional switches;
- mandatory account/system notice explanation;
- pristine / dirty state;
- reset;
- save pending;
- save success;
- save failure retaining local draft;
- stale/concurrent result handling;
- session-expired redirect;
- link to `/dashboard/notifications`;
- final Persian copy without implementation-stage wording.

## 7. Implementation acceptance evidence

Clean final implementation/evidence head:

`1688356421e07747b36944cf4e47038e843f2a67`

- exactly one commit ahead of START_SHA and zero behind;
- transient dependency drift was rejected and removed from accepted history;
- transient F11 exhaustive-deps warning was fixed before accepted PR history;
- exact-head Frontend Quality Gate `34478166285` — PASS;
- exact-head artifact `10152549996`;
- exact-head digest `sha256:ffa0c5be43ddf4523756a6e7002c60591c458bd4f2b78e511cc9eeb059c3241d`;
- full artifact contains 72 screenshots;
- F11 manual visual acceptance at `375 / 390 / 430 / 768 / 1024 / 1440` — PASS;
- implementation PR `#63` — MERGED;
- PR Quality Gate `34478792619` — PASS;
- PR artifact `10152775926`;
- PR artifact digest `sha256:4ca1f59d2e3d73d81eefcefcc2d15b302e37ff876f987b938a3db4f5626d4f9b`;
- mergeable immediately before merge: `true`;
- unresolved review threads immediately before merge: `0`;
- pre-merge main verified exact START_SHA;
- expected-head merge used;
- implementation merge/main `ce3e241e297c86c9c8c09b2d29d774274f0ef847`;
- post-implementation main Quality Gate `34481396073` — PASS;
- post-main artifact `10153880614`;
- post-main digest `sha256:7d100b44b2cf2ce2e25fc7d0f273d345680a5f71f0f475ccdc9f57e39f794624`;
- live `main` reverified exact implementation merge after post-main QA.

## 8. Governance promotion

Because implementation PR #63 is merged and post-implementation main Quality Gate `34481396073` is fully green, `/dashboard/settings` may be promoted non-recursively from `PLACEHOLDER` to `FINAL_PRIVATE` in current governance documents.

This does not imply a live Settings backend. Runtime truth remains `FRONTEND MOCK / BACKEND PENDING`.

This also does not make F11 terminally `DONE / MERGED / FROZEN` before closeout merge and terminal frozen-main QA.

## 9. Closeout mutation lock

Relative to implementation merge `ce3e241e297c86c9c8c09b2d29d774274f0ef847`, the closeout commit may change exactly these four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F11_PLAYER_SETTINGS.md`;
4. `docs/workstreams/F11_CLOSEOUT.md`.

Application/runtime source changes: `NONE`.
Workflow/package/dependency changes: `NONE`.
Contract/adapter/fixture changes: `NONE`.
Challenge Hub/Detail product changes: `NONE`.

## 10. Remaining completion law

F11 MUST NOT be called `DONE / MERGED / FROZEN` until:
1. compare implementation merge → closeout head proves exactly four Markdown files, ahead 1 / behind 0;
2. closeout PR contains no auto-close syntax;
3. closeout PR full Frontend Quality Gate is PASS;
4. closeout PR mergeable is `true` and unresolved review threads are `0`;
5. pre-closeout-merge `main` is still exact `ce3e241e297c86c9c8c09b2d29d774274f0ef847`;
6. closeout merge uses expected-head lock;
7. terminal post-closeout main Frontend Quality Gate is PASS on exact frozen main;
8. terminal browser artifact/digest are captured;
9. live `main` is reverified exact frozen SHA;
10. Issue #62 is updated with terminal evidence and closed with `state_reason=completed`.
