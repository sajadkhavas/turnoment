# F11 — Player Settings & Notification Preferences Closeout

Status: `CLOSEOUT IN PROGRESS / TARGET FINAL_PRIVATE`

Route: `/dashboard/settings`

START_SHA: `4e3a347de9140636bc95e37b096f67f146ed2e70`

Implementation branch: `phase/f11-player-settings`

Final implementation/evidence head: `1688356421e07747b36944cf4e47038e843f2a67`

Implementation PR: `#63` — MERGED

Implementation merge / closeout base: `ce3e241e297c86c9c8c09b2d29d774274f0ef847`

Closeout branch: `closeout/f11-player-settings`

Tracking Issue: `#62` — MUST remain open until terminal frozen-main CI/artifact/digest are green and final evidence is recorded.

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 1. Implementation acceptance

Clean final implementation/evidence head:

`1688356421e07747b36944cf4e47038e843f2a67`

- exactly one commit ahead of START_SHA and zero behind;
- exact-head Quality Gate `34478166285` — PASS;
- exact-head artifact `10152549996`;
- exact-head digest `sha256:ffa0c5be43ddf4523756a6e7002c60591c458bd4f2b78e511cc9eeb059c3241d`;
- full artifact contains 72 regression screenshots;
- F11 responsive/manual acceptance `375 / 390 / 430 / 768 / 1024 / 1440` — PASS;
- implementation PR `#63` exact head `1688356421e07747b36944cf4e47038e843f2a67` — MERGED;
- PR Quality Gate `34478792619` — PASS;
- PR artifact `10152775926`;
- PR artifact digest `sha256:4ca1f59d2e3d73d81eefcefcc2d15b302e37ff876f987b938a3db4f5626d4f9b`;
- mergeable immediately before merge: `true`;
- unresolved review threads immediately before merge: `0`;
- pre-merge `main` verified exact START_SHA;
- merge used expected-head SHA lock;
- implementation merge/main `ce3e241e297c86c9c8c09b2d29d774274f0ef847`;
- post-implementation main Quality Gate `34481396073` — PASS;
- post-main artifact `10153880614`;
- post-main digest `sha256:7d100b44b2cf2ce2e25fc7d0f273d345680a5f71f0f475ccdc9f57e39f794624`;
- live `main` reverified exact implementation merge after post-main QA.

## 2. Final route truth being frozen

`/dashboard/settings` is a private `noindex,nofollow` current-player settings surface limited to notification preferences grounded in the accepted notification domain.

Permanent behavior:
- dashboard session access policy protects the surface;
- loader reads through typed `PlayerSettingsRepository`;
- read/save payloads and receipts are runtime-validated before UI use;
- deterministic QA fixture and Django HTTP adapter share the same permanent contract;
- only `tournament`, `match`, `challenge` are writable optional preferences;
- `account` and `system` notices remain required/non-disableable;
- backend/repository owns persisted settings truth and revision;
- stale writes fail closed and return current authoritative settings;
- frontend does not silently overwrite newer persisted state;
- preference changes are prospective and do not remove/change existing notification inbox items;
- preferences do not mutate registration, match/challenge lifecycle, result, rating, dispute, eligibility or moderation truth;
- loading/load-error/pristine/dirty/reset/pending/success/failure/stale/session-expired states are covered;
- final Persian copy contains no backend/API/mock/temporary language;
- accessibility semantics and responsive behavior are accepted at six standard widths.

## 3. Backend contract / runtime boundary

Backend F11 alignment is terminally complete as documentation only:
- backend Issue `#19` — CLOSED / COMPLETED;
- docs head `44aee41fac159d5095218af06b635e9caa519375`;
- backend PR `#20` — MERGED;
- PR Quality Gate `34477007799` — PASS on Python 3.12 and 3.14;
- accepted backend main `3fb421cf2c85d94753ddf9352d8bc1134358847a`;
- post-main Backend Quality Gate `34477753302` — PASS on Python 3.12 and 3.14.

Planned endpoints remain:
- `GET /api/v1/me/settings/notification-preferences/`;
- `PATCH /api/v1/me/settings/notification-preferences/`.

No Python settings domain/model/migration/URL registration has been accepted. Runtime remains `FRONTEND MOCK / BACKEND PENDING` until a future owning backend phase implements and accepts these surfaces.

Backend phase order was not changed. Backend NEXT remains `P02 — Games / Catalog Foundation`.

## 4. Auth / security boundary

- private web auth remains Django Session + OTP;
- unsafe future PATCH uses existing P01 CSRF bootstrap, `credentials: include`, and `X-CSRFToken`;
- no localStorage/sessionStorage bearer auth was introduced;
- 401/403 map to session-expired handling;
- frontend validation is convenience/defense-in-depth; backend remains authoritative for player ownership and persisted preferences;
- stale revision conflicts fail closed rather than last-write-wins silently.

## 5. Scope integrity

F11 remained independent from Challenge Hub/Detail Lovable work. No Challenge product file was modified.

A transient dependency edit and a transient new F11 exhaustive-deps warning were both detected before acceptance; the dependency drift was removed from accepted history and the F11 warning was fixed before the final one-commit reviewed head.

## 6. Governance promotion

Because implementation PR #63 is merged and post-implementation main Quality Gate `34481396073` is fully green, `/dashboard/settings` may be promoted non-recursively from `PLACEHOLDER` to `FINAL_PRIVATE` in current governance documents.

This does not imply a live Settings backend. Runtime truth remains `FRONTEND MOCK / BACKEND PENDING`.

This also does not make the F11 workstream terminally complete before closeout/terminal CI.

## 7. Closeout mutation lock

Relative to implementation merge `ce3e241e297c86c9c8c09b2d29d774274f0ef847`, this closeout commit may change exactly these four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F11_PLAYER_SETTINGS.md`;
4. `docs/workstreams/F11_CLOSEOUT.md`.

Application/runtime source changes: `NONE`.
Workflow/package/dependency changes: `NONE`.
Contract/adapter/fixture changes: `NONE`.
Challenge Hub/Detail product changes: `NONE`.

## 8. Non-recursive terminal evidence rule

This document intentionally cannot contain the closeout merge SHA or terminal post-closeout main CI run because those events happen only after this commit is reviewed and merged.

F11 MUST NOT be called `DONE / MERGED / FROZEN` until all remaining gates complete:
1. compare implementation merge → closeout head proves exactly four Markdown changes, ahead-only;
2. closeout PR contains no auto-close syntax;
3. closeout PR full Frontend Quality Gate is PASS on exact closeout head/PR merge context;
4. closeout PR mergeable is `true` and unresolved review threads are `0`;
5. pre-closeout-merge `main` is still exact `ce3e241e297c86c9c8c09b2d29d774274f0ef847`;
6. closeout merge uses expected-head lock;
7. terminal post-closeout main Frontend Quality Gate is PASS on exact frozen main;
8. terminal browser artifact/digest are captured;
9. live `main` is reverified exact frozen SHA;
10. Issue #62 is updated with terminal evidence and closed with `state_reason=completed`.

After terminal freeze, Challenge Hub remains isolated under its own acceptance chain; the next independent dashboard placeholder may be Rivalry unless product priority explicitly selects another controlled workstream.
