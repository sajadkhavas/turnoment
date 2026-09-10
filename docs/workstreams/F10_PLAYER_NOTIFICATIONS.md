# F10 — Player Notifications Inbox

Status: `MERGED / CLOSEOUT IN PROGRESS — TARGET FINAL_PRIVATE`

Route: `/dashboard/notifications`

START_SHA: `34d6a576691532e4228b2eecc0fea1c1d296d58e`

Implementation branch: `phase/f10-player-notifications`

Final implementation/evidence head: `0629febdebda58a1d0373e005aa80999e1a75623`

Implementation PR: `#60` — MERGED

Implementation merge / closeout base: `74f0e25275ea2bb64ee374c0ea0f8e50e519c3d9`

Closeout branch: `closeout/f10-player-notifications`

Tracking Issue: `#59` — MUST remain open until terminal frozen-main CI/artifact are green and terminal evidence is recorded.

Index policy: `PRIVATE / NOINDEX`

Runtime status: `FRONTEND MOCK / BACKEND PENDING`

## 1. Source / concurrency lock

F09 Player Profile is terminally frozen at frontend main `34d6a576691532e4228b2eecc0fea1c1d296d58e`; terminal Quality Gate `34468048698` PASS; artifact `10148453532`; Issue #56 CLOSED / COMPLETED.

F10 started exactly from that frozen main. Challenge Hub/Detail Lovable work remained outside F10 ownership and no Challenge product file was modified.

## 2. Inherited defect removed

The inherited `/dashboard/notifications` route was only a `DashboardSectionPlaceholder` with implementation-stage copy and no loader, validated search, repository, runtime validation, read-state actions, paging or final states.

F10 replaced that placeholder completely.

## 3. Cross-repo backend contract truth

Backend documentation-only alignment is terminally complete:
- backend Issue `#17` — CLOSED / COMPLETED;
- backend START_SHA `38dccbf213d5f439e56cd608e3e4ac419d5092d1`;
- docs branch `docs/f10-player-notifications-contract`;
- docs head `6e452ea74ec91d4c402f282a173384ce27744fde`;
- backend PR `#18` — MERGED;
- PR gate `34468881823` — PASS on Python 3.12 and 3.14;
- accepted backend main `e1d8d86f9b44a2874afc29f4ef9de13aeb34d9f7`;
- post-main gate `34469522243` — PASS on Python 3.12 and 3.14.

Planned endpoints:
- `GET /api/v1/me/notifications/`;
- `POST /api/v1/me/notifications/{notificationId}/read/`;
- `POST /api/v1/me/notifications/read-all/`.

This is contract documentation only. No notification Python domain, model, migration or URL registration was implemented. Backend NEXT remains `P02 — Games / Catalog Foundation`.

Therefore runtime truth remains deliberately:

`FRONTEND MOCK / BACKEND PENDING`

## 4. Permanent frontend boundary

`private dashboard access policy → validated search → loader → typed PlayerNotificationsRepository → runtime-validated projection → UI`

Adapters:
- deterministic in-memory QA repository for development/test/visual acceptance;
- Django HTTP adapter mapped to the planned private contract.

The Django adapter uses Django Session credentials and P01 CSRF bootstrap for unsafe read-state commands. No localStorage/sessionStorage bearer authentication is introduced.

## 5. Query / projection truth

Validated URL search:
- `state=unread|read`; absent = all;
- `kind=tournament|match|challenge|account|system`; absent = all;
- `page=<integer > 1>`; absent = page 1.

Repository/backend owns:
- recipient membership and notification existence;
- total/unread summary;
- filter/order/pagination truth;
- notification ID/kind/title/body/occurredAt/readAt;
- safe typed target projection;
- mark-one/mark-all read receipts and unread count.

Frontend does not infer result, winner, lifecycle, rating, eligibility, moderation or challenge truth from notification copy.

## 6. Safe navigation target law

F10 accepts only strict discriminated targets that map to already accepted routes:
- My Tournaments;
- My Matches;
- Tournament Detail;
- Result Submission;
- Match Dispute;
- Player Profile.

Arbitrary `href` values and unknown target fields are rejected by runtime validation. Challenge notifications may exist as content, but F10 does not invent a Challenge Detail route while that route is unaccepted.

## 7. Read-state action law

Mark-one and mark-all are explicit user actions. Frontend does not optimistically decrement unread state. After an accepted receipt, the route is invalidated and reloaded through the repository.

Supported outcomes preserve saved, unavailable and session-expired semantics without inventing state.

## 8. UI / accessibility acceptance

Final page includes:
- page header and mark-all action;
- total/unread summary;
- all/unread/read filters;
- domain-kind filter;
- inbox list with explicit unread/read semantics;
- typed context CTA where supported;
- explicit mark-one and mark-all read actions;
- pagination;
- unfiltered and filtered empty states;
- pending/error/session-expired/mutation feedback states;
- responsive dashboard layout.

Accessibility:
- `noindex,nofollow`;
- DashboardShell remains the single page `<main>` owner;
- semantic list, time, buttons, links and pagination nav;
- `aria-pressed` on state filters;
- status feedback exposed through live/status semantics;
- visible keyboard focus;
- status is not communicated by color alone.

## 9. Runtime validation invariants

Schemas fail closed on:
- arbitrary/unknown target fields;
- unsupported target kinds;
- malformed opaque IDs;
- invalid offset-aware timestamps;
- unread count greater than total;
- filtered total greater than account total;
- item count greater than filtered total;
- invalid pagination relationships;
- duplicate notification IDs on one page.

## 10. Accepted implementation evidence

Accepted visual candidate:

`77d89d7143d315b1f8db92ab10dc32085d0ac963`

- Quality Gate `34471158110` — PASS;
- artifact `10149666864`;
- digest `sha256:b36b923ada03c4f346de8b87794e644e2fdd202ec620b3fb9a2ffcd88b605950`;
- 66 regression screenshots;
- F10 screenshots at `375 / 390 / 430 / 768 / 1024 / 1440`;
- manual visual review `375 / 430 / 768 / 1024 / 1440` — PASS.

Visual review corrected the unread action microcopy from status-like `خوانده شد` to explicit action `این را خوانده‌ام` before final implementation acceptance.

Clean final implementation/evidence head:

`0629febdebda58a1d0373e005aa80999e1a75623`

- rebuilt as exactly one clean commit from START_SHA;
- ahead 1 / behind 0;
- no transient dependency-version drift in reviewed history;
- exact-head Quality Gate `34472707498` — PASS;
- exact-head artifact `10150299042`;
- exact-head digest `sha256:413113078075f7b979d023e52d447e25ef953c6e3eb369bcfe6543b56d0d2232`.

Implementation PR `#60`:
- PR Quality Gate `34473099462` — PASS;
- PR artifact `10150419030`;
- PR artifact digest `sha256:19325defe0b8fefacecb0541a52970a298dbaf10178571be9e2b04e973c645eb`;
- mergeable immediately before merge `true`;
- unresolved review threads immediately before merge `0`;
- pre-merge main exact START_SHA;
- expected-head merge used.

Implementation merge / closeout base:

`74f0e25275ea2bb64ee374c0ea0f8e50e519c3d9`

Post-implementation main:
- Quality Gate `34473462713` — PASS;
- artifact `10150600270`;
- digest `sha256:b503925b92b89bd9a27eb0d1d20ac900b7bbbd69024eaefb5865c91bc169234c`;
- full browser regression including 66 screenshots PASS;
- live `main` re-verified exact implementation merge after the gate.

## 11. Scope integrity

Final reviewed implementation diff contains only F10 source/evidence plus the F10 extension of the existing regression gate and test script. No Challenge Hub/Detail product file was changed. Dependency versions are unchanged.

## 12. Closeout mutation lock

Relative to implementation merge `74f0e25275ea2bb64ee374c0ea0f8e50e519c3d9`, the closeout commit may change exactly these four Markdown governance/workstream files:

1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F10_PLAYER_NOTIFICATIONS.md`;
4. `docs/workstreams/F10_CLOSEOUT.md`.

Application/runtime source changes: `NONE`.
Workflow/package/dependency changes: `NONE`.
Contract/adapter/fixture changes: `NONE`.
Challenge Hub/Detail product changes: `NONE`.

## 13. Non-recursive terminal rule

This closeout document cannot contain its own future merge SHA or terminal main CI run.

The route may be promoted to `FINAL_PRIVATE` because implementation is merged and post-main QA is green. F10 itself MUST NOT be called `DONE / MERGED / FROZEN` until:
1. implementation-merge → closeout-head compare proves exactly four Markdown files changed;
2. closeout PR is opened without auto-close syntax;
3. closeout PR full Quality Gate is PASS;
4. closeout PR is mergeable with unresolved review threads `0`;
5. pre-closeout-merge `main` remains exact implementation merge;
6. closeout merge uses expected-head lock;
7. terminal post-closeout main Quality Gate is PASS on exact frozen main;
8. terminal artifact/digest are recorded in Issue #59;
9. live `main` is re-verified exact frozen SHA;
10. Issue #59 is closed with `state_reason=completed`.
