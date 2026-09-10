# F10 — Player Notifications Inbox Closeout

Status: `CLOSEOUT IN PROGRESS / TARGET FINAL_PRIVATE`

Route: `/dashboard/notifications`

START_SHA: `34d6a576691532e4228b2eecc0fea1c1d296d58e`

Implementation branch: `phase/f10-player-notifications`

Final implementation/evidence head: `0629febdebda58a1d0373e005aa80999e1a75623`

Implementation PR: `#60` — MERGED

Implementation merge / closeout base: `74f0e25275ea2bb64ee374c0ea0f8e50e519c3d9`

Closeout branch: `closeout/f10-player-notifications`

Tracking Issue: `#59` — MUST remain open until terminal frozen-main CI/artifact are green and final evidence is recorded.

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 1. Implementation acceptance

Accepted visual candidate:

`77d89d7143d315b1f8db92ab10dc32085d0ac963`

- candidate Quality Gate `34471158110` — PASS;
- candidate artifact `10149666864`;
- candidate digest `sha256:b36b923ada03c4f346de8b87794e644e2fdd202ec620b3fb9a2ffcd88b605950`;
- 66 regression screenshots;
- F10 widths `375 / 390 / 430 / 768 / 1024 / 1440`;
- representative manual review `375 / 430 / 768 / 1024 / 1440` — PASS;
- visual-review microcopy correction included before final head.

Clean final implementation/evidence head:

`0629febdebda58a1d0373e005aa80999e1a75623`

- exactly one commit ahead of START_SHA and zero behind;
- reviewed history contains no transient dependency-version drift;
- exact-head Quality Gate `34472707498` — PASS;
- exact-head artifact `10150299042`;
- exact-head digest `sha256:413113078075f7b979d023e52d447e25ef953c6e3eb369bcfe6543b56d0d2232`;
- implementation PR `#60` exact head `0629febdebda58a1d0373e005aa80999e1a75623`;
- PR Quality Gate `34473099462` — PASS;
- PR artifact `10150419030`;
- PR artifact digest `sha256:19325defe0b8fefacecb0541a52970a298dbaf10178571be9e2b04e973c645eb`;
- mergeable immediately before merge: `true`;
- unresolved review threads immediately before merge: `0`;
- pre-merge `main` verified exact START_SHA;
- merge used expected-head SHA lock;
- implementation merge/main `74f0e25275ea2bb64ee374c0ea0f8e50e519c3d9`;
- post-implementation main Quality Gate `34473462713` — PASS;
- post-main artifact `10150600270`;
- post-main digest `sha256:b503925b92b89bd9a27eb0d1d20ac900b7bbbd69024eaefb5865c91bc169234c`;
- live `main` re-verified exact implementation merge after post-main QA.

## 2. Final route truth being frozen

`/dashboard/notifications` is a private `noindex,nofollow` current-player notification inbox.

Permanent behavior:
- dashboard session access policy protects the surface;
- search state is validated/canonicalized for read state, domain kind and page;
- loader reads through the typed `PlayerNotificationsRepository`;
- payloads and mutation receipts are runtime-validated before UI use;
- deterministic QA fixture and Django HTTP adapter share the same permanent contract;
- backend/repository owns notification membership, content, read state, ordering, summary and pagination truth;
- frontend never infers competitive result, rating, eligibility, moderation, challenge state or winner from notification copy;
- mark-one and mark-all are explicit commands;
- frontend does not optimistically decrement unread truth;
- successful receipts cause repository-backed reload;
- strict discriminated navigation targets are limited to already accepted application routes;
- arbitrary `href` / open-redirect payloads fail validation;
- Challenge Detail navigation is intentionally not invented;
- final Persian copy contains no mock/backend/service-connection placeholder language;
- loading, filtered/unfiltered empty, error, session-expired, mutation-pending/success/failure and pagination states are covered;
- accessibility semantics and responsive behavior are accepted at six standard widths.

## 3. Backend contract / runtime boundary

Backend F10 alignment is terminally complete as documentation only:
- backend Issue `#17` — CLOSED / COMPLETED;
- docs head `6e452ea74ec91d4c402f282a173384ce27744fde`;
- backend PR `#18` — MERGED;
- accepted backend main `e1d8d86f9b44a2874afc29f4ef9de13aeb34d9f7`;
- post-main Backend Quality Gate `34469522243` — PASS on Python 3.12 and 3.14.

Planned endpoints remain:
- `GET /api/v1/me/notifications/`;
- `POST /api/v1/me/notifications/{notificationId}/read/`;
- `POST /api/v1/me/notifications/read-all/`.

No Python notification domain/model/migration/URL registration has been accepted. F10 frontend therefore remains `FRONTEND MOCK / BACKEND PENDING` until a future owning backend phase implements and accepts these surfaces.

Backend phase order was not changed. Backend NEXT remains `P02 — Games / Catalog Foundation`.

## 4. Auth / security boundary

- private web auth truth remains Django Session + OTP;
- unsafe future notification commands use existing P01 CSRF bootstrap, `credentials: include`, and `X-CSRFToken`;
- no localStorage/sessionStorage bearer auth was introduced;
- 401/403 map to session-expired handling;
- mark-one 404 maps to explicit unavailable state;
- frontend validation is convenience/defense-in-depth; backend remains authoritative for recipient authorization and final read-state persistence;
- arbitrary target URL injection is rejected by strict target schemas.

## 5. Scope integrity

F10 remained independent from Challenge Hub/Detail Lovable work. No Challenge product file was modified.

A transient unrelated dev-dependency edit occurred during development but was detected before acceptance, reverted, and then removed entirely from the reviewed implementation history by rebuilding the accepted implementation as one clean commit from START_SHA. Final dependency versions are unchanged.

## 6. Governance promotion

Because implementation PR #60 is merged and post-implementation main Quality Gate `34473462713` is fully green, `/dashboard/notifications` may be promoted non-recursively from `PLACEHOLDER` to `FINAL_PRIVATE` in current governance documents.

This does not imply a live Notifications backend. Runtime truth remains `FRONTEND MOCK / BACKEND PENDING`.

This also does not make the F10 workstream terminally complete before closeout/terminal CI.

## 7. Closeout mutation lock

Relative to implementation merge `74f0e25275ea2bb64ee374c0ea0f8e50e519c3d9`, this closeout commit may change exactly these four Markdown files:

1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F10_PLAYER_NOTIFICATIONS.md`;
4. `docs/workstreams/F10_CLOSEOUT.md`.

Application/runtime source changes: `NONE`.
Workflow/package/dependency changes: `NONE`.
Contract/adapter/fixture changes: `NONE`.
Challenge Hub/Detail product changes: `NONE`.

## 8. Non-recursive terminal evidence rule

This document intentionally cannot contain the closeout merge SHA or terminal post-closeout main CI run because those events happen only after this commit is reviewed and merged.

F10 MUST NOT be called `DONE / MERGED / FROZEN` until all remaining gates complete:
1. compare implementation merge → closeout head proves exactly four Markdown changes, ahead-only;
2. closeout PR contains no auto-close syntax;
3. closeout PR full Frontend Quality Gate is PASS on the exact closeout head/PR merge context;
4. closeout PR mergeable is `true` and unresolved review threads are `0`;
5. pre-closeout-merge `main` is still exact `74f0e25275ea2bb64ee374c0ea0f8e50e519c3d9`;
6. closeout merge uses expected-head lock;
7. terminal post-closeout main Frontend Quality Gate is PASS on exact frozen main;
8. terminal browser artifact/digest are captured;
9. live `main` is re-verified exact frozen SHA;
10. Issue #59 is updated with terminal evidence and closed with `state_reason=completed`.

After terminal freeze, `/dashboard/settings` is the next independent controlled placeholder unless product priority explicitly selects another route. Challenge Hub remains isolated under its own acceptance chain.
