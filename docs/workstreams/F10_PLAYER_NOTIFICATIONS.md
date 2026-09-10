# F10 — Player Notifications Inbox

Status: `IN PROGRESS`

Route: `/dashboard/notifications`

START_SHA: `34d6a576691532e4228b2eecc0fea1c1d296d58e`

Branch: `phase/f10-player-notifications`

Tracking Issue: `#59`

Index policy: `PRIVATE / NOINDEX`

Runtime until backend implementation: `FRONTEND MOCK / BACKEND PENDING`

## 1. Source / concurrency lock

F09 Player Profile is terminally frozen at frontend main `34d6a576691532e4228b2eecc0fea1c1d296d58e`; terminal Quality Gate `34468048698` PASS; terminal artifact `10148453532`; Issue #56 CLOSED / COMPLETED.

F10 branch was created exactly from that frozen main. No open Notifications branch/Issue/PR overlapped F10 before creation. Challenge Hub/Detail Lovable work is outside F10 ownership and MUST NOT be modified.

Backend audited main before F10 alignment: `38dccbf213d5f439e56cd608e3e4ac419d5092d1`. Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

## 2. Inherited defect

The inherited `/dashboard/notifications` route rendered only `DashboardSectionPlaceholder` and displayed implementation-stage language about future activation/service connection. It had no route loader, validated search, repository, runtime validation, read-state actions, paging or final product states.

F10 replaces that placeholder completely.

## 3. Cross-repo contract truth

Backend documentation-only alignment:
- backend Issue `#17`;
- branch `docs/f10-player-notifications-contract`;
- docs head `6e452ea74ec91d4c402f282a173384ce27744fde`;
- PR `#18`;
- planned owner document `docs/F10_NOTIFICATIONS_CONTRACT.md`.

Planned endpoints:
- `GET /api/v1/me/notifications/`;
- `POST /api/v1/me/notifications/{notificationId}/read/`;
- `POST /api/v1/me/notifications/read-all/`.

This alignment is documentation only. It does not implement a backend notifications domain and does not reorder P02.

## 4. Permanent frontend boundary

`private dashboard access policy → validated search → loader → typed PlayerNotificationsRepository → runtime-validated projection → UI`

Adapters:
- deterministic in-memory QA repository for development/test/visual acceptance;
- Django HTTP adapter for the planned same-origin private contract.

The production adapter uses Django Session credentials and P01 CSRF bootstrap for unsafe read-state commands. No localStorage/sessionStorage bearer authentication is introduced.

## 5. Query / projection truth

Validated URL search:
- `state=unread|read`; absent = all;
- `kind=tournament|match|challenge|account|system`; absent = all;
- `page=<integer > 1>`; absent = page 1.

Backend/repository owns:
- recipient membership and notification existence;
- total/unread summary;
- filter/order/pagination truth;
- notification ID/kind/title/body/occurredAt/readAt;
- safe typed target projection;
- mark-one/mark-all read receipts and unread count.

Frontend does not infer result, winner, lifecycle, rating, eligibility, moderation or challenge truth from notification copy.

## 6. Safe navigation target law

F10 accepts only strict discriminated targets that already map to accepted routes:
- My Tournaments;
- My Matches;
- Tournament Detail;
- Result Submission;
- Match Dispute;
- Player Profile.

Arbitrary `href` values are rejected by runtime validation. Challenge notifications may exist as content, but F10 does not invent a Challenge Detail route while that route is unaccepted.

## 7. Action law

Mark-one and mark-all are explicit user actions. Frontend does not optimistically decrement unread state. After a successful authoritative receipt, the route is invalidated and reloaded from the repository.

Outcomes include:
- saved;
- unavailable for mark-one when the item no longer exists;
- session-expired;
- unexpected transport/runtime failure handled as final natural Persian error copy.

Commands are planned as backend-idempotent state transitions; repeated read commands must not create duplicate effects.

## 8. UI / accessibility scope

Final page includes:
- page header and unread action;
- total/unread summary;
- all/unread/read state filters;
- domain-kind filter;
- inbox list with explicit unread/read semantics;
- typed target CTA where supported;
- explicit mark-one and mark-all read actions;
- pagination;
- unfiltered and filtered empty states;
- pending/error/session-expired/mutation feedback states;
- responsive dashboard layout.

Accessibility requirements:
- private `noindex,nofollow`;
- exactly one page `<main>` through DashboardShell;
- semantic list, time, buttons, links and pagination nav;
- `aria-pressed` on state filters;
- mutation/status feedback through `role=status`/polite live semantics;
- visible keyboard focus;
- status never communicated by color alone.

## 9. Official guidance reviewed

Current sources checked on 2026-09-10:
- TanStack Router Data Loading: route validation/deps/loaders coordinate required async page data and pending/error boundaries;
- W3C WAI / WCAG status-message guidance: non-focus status changes should be programmatically exposed, with `role=status` providing polite announcement semantics.

F10 is private/noindex, so public SERP/keyword research is not applicable. Final natural Persian copy remains mandatory.

## 10. Design reference findings

Mature notification inboxes use a small number of high-signal triage controls: unread/read state, category/context, clear time, explicit read acknowledgement, and direct navigation to the originating surface. F10 adopts those information-architecture principles while retaining Turnoment's established RTL dashboard visual system and avoiding generic social-feed or email-inbox complexity.

## 11. Runtime validation invariants

Runtime schemas fail closed on:
- arbitrary/unknown target fields;
- unsupported target kinds;
- malformed opaque IDs;
- invalid offset-aware timestamps;
- unread count greater than total;
- filtered total greater than account total;
- item count greater than filtered total;
- invalid pagination relationships;
- duplicate notification IDs on one page.

## 12. QA plan

Contract tests cover schema integrity, target allow-listing, filters, mark-one, unavailable item handling, mark-all and idempotency.

Browser regression gate must expand from 60 to 66 screenshots by adding `/dashboard/notifications` at:

`375 / 390 / 430 / 768 / 1024 / 1440`

Browser smoke must verify:
- final Notifications copy exists;
- `noindex,nofollow` exists;
- inherited placeholder/service-connection copy is absent;
- exactly one page `<main>` remains through DashboardShell.

Representative visual acceptance must include at least `375 / 430 / 768 / 1024 / 1440`.

## 13. Completion law

F10 cannot become `DONE / MERGED / FROZEN` until:
1. backend docs alignment is merged and post-main CI is green;
2. implementation candidate full frontend Quality Gate PASS;
3. 66-shot artifact is manually reviewed;
4. acceptance evidence is committed;
5. final implementation/evidence exact-head Quality Gate PASS;
6. implementation PR CI PASS, mergeable true and review threads zero;
7. pre-merge main exact START_SHA;
8. expected-head implementation merge;
9. post-implementation main Quality Gate PASS;
10. documentation-only closeout from exact implementation merge;
11. closeout PR CI PASS, mergeable true and review threads zero;
12. expected-head closeout merge;
13. terminal frozen-main Quality Gate PASS and artifact recorded;
14. live main exact frozen SHA re-verified;
15. Issue #59 updated with terminal evidence and CLOSED / COMPLETED.
