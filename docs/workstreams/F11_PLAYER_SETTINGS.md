# F11 — Player Settings & Notification Preferences

Status: `IN PROGRESS`

Route: `/dashboard/settings`

Target: `FINAL_PRIVATE`

START_SHA: `4e3a347de9140636bc95e37b096f67f146ed2e70`

Implementation branch: `phase/f11-player-settings`

Tracking Issue: `#62`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

Backend docs-alignment Issue: `sajadkhavas/turnoment-backend#19` — CLOSED / COMPLETED

Backend docs-alignment PR: `#20` — MERGED

Accepted backend main after F11 docs alignment: `3fb421cf2c85d94753ddf9352d8bc1134358847a`

Backend post-main Quality Gate: `34477753302` — PASS on Python 3.12 and 3.14

## 1. Prior truth / scope lock

F10 is terminally frozen at frontend main `4e3a347de9140636bc95e37b096f67f146ed2e70`; Issue #59 is CLOSED / COMPLETED; terminal Quality Gate `34474656269` PASS; terminal artifact `10151074107`.

Before F11, `/dashboard/settings` was only `DashboardSectionPlaceholder` with private robots metadata. No F11/settings branch, Issue or PR existed.

Challenge Hub Lovable work is isolated and not owned by F11.

## 2. Accepted product scope

F11 owns only notification preferences already grounded in F10 notification kinds.

Optional player controls:
- `tournament`;
- `match`;
- `challenge`.

Mandatory/non-disableable categories:
- `account`;
- `system`.

Preference changes are prospective. They do not delete or change existing F10 inbox items and never mutate tournament/match/challenge membership, eligibility, lifecycle, result, rating, dispute or moderation truth.

F11 does not invent unrelated privacy settings, challenge business rules, password flows, email identity, or PWA/web-push subscription behavior.

## 3. Official documentation audit

Reviewed before implementation:
- TanStack Router — Data Loading: route loader coordinates critical settings data and authenticated redirect behavior;
- TanStack Router — Document Head Management: route owns private title + `noindex,nofollow` metadata;
- WCAG 2.2 / WAI guidance: descriptive headings and control labels, visible focus, input assistance and programmatically exposed status feedback.

Implementation decisions:
- settings are loader-backed rather than fetched ad hoc from the presentation component;
- save state is explicit and user feedback uses status/alert semantics;
- switches have programmatic labels/descriptions;
- no client-side persisted auth token is introduced.

## 4. Design-reference audit

Turnoment design masters used first:
- existing DashboardShell navigation/layout;
- F09 Player Profile information hierarchy and private-route pattern;
- F10 Notifications visual language and domain labels;
- existing Turnoment tokens/components.

External interaction references reviewed:
- GitHub notification settings: explicit notification-category preferences and clear setting ownership;
- Discord privacy/settings organization: grouped settings with plain-language explanations.

Only information architecture/interaction ideas were considered. No external branding, artwork, copy or proprietary asset is copied.

## 5. Permanent architecture

Accepted frontend boundary:

`private dashboard access policy → loader → typed PlayerSettingsRepository → runtime-validated settings projection → UI`

Repository selection follows the established environment adapter boundary:
- deterministic fixture repository for local/CI/visual QA;
- Django HTTP adapter for the planned production contract.

The UI does not know which adapter supplies data.

## 6. Cross-repo API contract

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

Save request contains only the opaque revision and the three writable optional values. Account/system controls cannot enter the writable schema.

Concurrency:
- backend revision is opaque;
- stale writes return a typed stale outcome plus current authoritative settings;
- frontend replaces its baseline with the current projection rather than silently overwriting newer state.

Auth/security:
- Django Session Authentication;
- `credentials: include`;
- existing P01 CSRF bootstrap for PATCH;
- no localStorage/sessionStorage bearer auth.

No live backend Settings implementation is claimed by this workstream. Runtime remains `FRONTEND MOCK / BACKEND PENDING`.

Backend NEXT remains `P02 — Games / Catalog Foundation`.

## 7. Final UI/state requirements implemented

- private `noindex,nofollow` route;
- authenticated loader redirect to Login;
- loading skeleton;
- load error/retry state;
- normal settings state;
- three accessible optional switches;
- mandatory account/system notice explanation;
- pristine / dirty form state;
- reset action;
- save pending state;
- save success feedback;
- save failure with local draft retained;
- stale/concurrent result handling;
- session-expired redirect;
- link to accepted `/dashboard/notifications` route;
- final Persian user-facing copy with no implementation-stage wording.

## 8. Quality / responsive plan

F11 adds its contract spec to `bun run test` and extends the repository browser gate to include `/dashboard/settings`.

Required F11 browser evidence:
- SSR content smoke;
- private robots check;
- no placeholder/implementation-stage copy;
- exactly one `<main>` inherited from DashboardShell;
- screenshots at `375 / 390 / 430 / 768 / 1024 / 1440`.

The full browser regression artifact increases from 66 to 72 screenshots without dropping F01–F10 coverage.

A transient accepted-head candidate exposed one new F11 `react-hooks/exhaustive-deps` warning. It was rejected before PR acceptance, fixed, and removed from the final reviewed history by rebuilding the branch as one clean commit from START_SHA. Pre-existing unrelated repository lint warnings are not part of F11 scope.

## 9. Completion law

F11 remains `IN PROGRESS` until all applicable gates are complete:
1. frontend implementation branch Quality Gate PASS on exact clean head;
2. browser artifact captured and F11 responsive screenshots manually reviewed;
3. implementation PR exact-head/full CI PASS, mergeable and zero unresolved review threads;
4. pre-merge main exact START_SHA;
5. expected-head implementation merge;
6. post-implementation main Quality Gate/artifact PASS;
7. documentation-only closeout with route registry/continuity/workstream evidence;
8. closeout PR full gate PASS and expected-head merge;
9. terminal post-closeout main Quality Gate/artifact/digest PASS;
10. live main exact frozen SHA reverified;
11. Issue #62 updated with terminal evidence and closed `completed`.
