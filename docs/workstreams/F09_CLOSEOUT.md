# F09 — Player Profile Recertification Closeout

Status: `CLOSEOUT IN PROGRESS / TARGET FINAL_PRIVATE`

Route: `/dashboard/profile`

START_SHA: `9876e5e6c47b42f9f2574f1675de6dab9ba1cc7f`

Implementation branch: `phase/f09-player-profile`

Final implementation/evidence head: `8b362cbe521d39a103c192a7d6ff344f0a08e1d1`

Implementation PR: `#57` — MERGED

Implementation merge / closeout base: `6b4705ede745427ee4dd1a6aeafdeeab7c73042f`

Closeout branch: `closeout/f09-player-profile`

Tracking Issue: `#56` — MUST remain open until terminal frozen-main CI is green and terminal evidence is recorded.

## 1. Implementation acceptance

Accepted browser/code candidate:

`7062f629264e78323dedbb84f8151bf29e270a94`

- candidate Quality Gate `34460593400` — PASS;
- candidate artifact `10145475710`;
- candidate digest `sha256:c261480e9fcbaa6cba6d0a2b972cea4f81b7ed85ca70799c9139c707edf83509`;
- 60 regression screenshots;
- F09 widths `375 / 390 / 430 / 768 / 1024 / 1440`;
- manual review `375 / 430 / 768 / 1024 / 1440` — PASS.

Final implementation/evidence head:

`8b362cbe521d39a103c192a7d6ff344f0a08e1d1`

- exact-head push Quality Gate `34461197903` — PASS;
- exact-head artifact `10145721261`;
- exact-head digest `sha256:23101901d354f4f4a21d50efe8d9fb561d2808a13202739a7c7cde3001c18a20`;
- implementation PR `#57` exact head `8b362cbe521d39a103c192a7d6ff344f0a08e1d1`;
- PR Quality Gate `34461614267` — PASS;
- PR artifact `10145875847`;
- PR artifact digest `sha256:b460b561c2efece21cdec465b363893dd6d9e84fd272506e06676449487e2079`;
- mergeable immediately before merge: `true`;
- unresolved review threads immediately before merge: `0`;
- pre-merge `main` verified exact START_SHA;
- merge used expected-head SHA lock;
- implementation merge/main `6b4705ede745427ee4dd1a6aeafdeeab7c73042f`;
- post-implementation main Quality Gate `34467008288` — PASS;
- post-main artifact `10148013024`;
- post-main digest `sha256:c1d30a5e53542b230e7dea2f52ba15fa12aadf284a325ccfe88193ab016d7469`.

## 2. Final route truth being frozen

`/dashboard/profile` is a private `noindex,nofollow` player account/profile surface built on accepted backend P01 truth.

Permanent behavior:
- route loader obtains the current authenticated player through the typed `PlayerProfileRepository`;
- unauthenticated/session-expired states return to Login with a safe internal destination;
- read authority is `GET /api/v1/auth/me/`;
- mutation authority is `PATCH /api/v1/auth/me/profile/`;
- profile mutation uses Django Session + CSRF, `credentials: include` and `X-CSRFToken`;
- only `gamer_tag`, `display_name`, `city`, `bio`, `interview_opt_in` may be edited;
- phone, email and join date are read-only account identity;
- `avatar_key`, roles/id/active state are not exposed as invented mutation controls;
- no password change, birthdate, phone change, email mutation or fake avatar upload is invented;
- strict command validation rejects unsupported fields;
- gamer-tag conflict remains backend-authoritative;
- pending/saved/validation/conflict/session-expired/unexpected-error states are explicit;
- final Persian copy, accessibility semantics, responsive behavior and exactly one dashboard `<main>` are accepted.

## 3. Runtime truth

F09 maps entirely to already accepted backend P01 account/profile runtime and introduces no backend model, migration, endpoint or phase reorder.

Backend main remains `38dccbf213d5f439e56cd608e3e4ac419d5092d1`.

Backend NEXT remains `P02 — Games / Catalog Foundation`.

## 4. Concurrency integrity

F09 was intentionally developed independently from Challenge Hub/Detail Lovable work. START_SHA → final implementation head was ahead-only and no Challenge product file was modified.

`/dashboard/challenges` keeps its own controlled implementation/evidence chain. F09 does not accept or redefine it.

## 5. Governance repair included

Current `PROJECT_CONTINUITY.md` and `docs/ROUTE_COMPLIANCE_REGISTRY.md` had retained an old F08 closeout-in-progress snapshot even though Issue #53 had already recorded terminal F08 completion. This closeout corrects those two current source-of-truth documents to the verified F08 terminal evidence without rewriting historical F08 closeout records.

Verified F08 terminal truth:
- frozen main `9876e5e6c47b42f9f2574f1675de6dab9ba1cc7f`;
- terminal gate `34458480652` PASS;
- artifact `10144590436`;
- digest `sha256:6407bc926904ef3ff2f3b4747c3744205add4da52dde3e30c537257dd129197f`;
- Issue #53 CLOSED / COMPLETED.

## 6. Closeout mutation lock

Relative to implementation merge `6b4705ede745427ee4dd1a6aeafdeeab7c73042f`, this closeout commit may change exactly these four Markdown governance files:

1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F09_PLAYER_PROFILE.md`;
4. `docs/workstreams/F09_CLOSEOUT.md`.

Application/runtime source changes: `NONE`.
Workflow/package/dependency changes: `NONE`.
Contract/adapter/fixture changes: `NONE`.
Challenge Hub/Detail product changes: `NONE`.

## 7. Non-recursive terminal evidence rule

This closeout commit cannot contain its own future merge SHA or terminal main CI run. It records all evidence available before closeout merge.

The `/dashboard/profile` route may be promoted to `FINAL_PRIVATE` in closeout governance because implementation is merged and post-implementation main QA is green. The F09 workstream itself MUST NOT be called `DONE / MERGED / FROZEN` until:

1. implementation-merge → closeout-head compare proves documentation-only scope;
2. closeout PR is opened without auto-close syntax;
3. closeout PR exact-head Frontend Quality Gate is PASS;
4. closeout PR is mergeable with unresolved review threads `0`;
5. pre-closeout-merge `main` is still exact implementation merge `6b4705ede745427ee4dd1a6aeafdeeab7c73042f`;
6. closeout merge uses expected-head lock;
7. terminal post-closeout main Quality Gate is PASS on exact frozen main;
8. terminal browser artifact/digest are recorded in Issue #56;
9. live `main` is re-verified exact frozen SHA;
10. Issue #56 is closed with `state_reason=completed`.

After that terminal freeze, `/dashboard/notifications` is the next independent controlled frontend workstream.
