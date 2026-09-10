# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> Operational source of truth for continuing Turnoment without duplicate work.

Last update: `2026-09-10`

## 1. Mandatory continuation law

Every chat/agent MUST:
1. read this file before implementation;
2. read `FRONTEND_PAGE_DELIVERY_PROTOCOL.md` for frontend page work;
3. read `SEO_FINAL_COPY_PROTOCOL.md` for public/indexable pages or material public-copy changes;
4. read `docs/ROUTE_COMPLIANCE_REGISTRY.md` before modifying/accepting an existing route;
5. verify current `main` SHA of every repository it will change;
6. read relevant Issue/PR/workstream evidence before repeating work;
7. use a dedicated branch;
8. never claim `DONE / MERGED / FROZEN` from chat memory alone;
9. update continuity before ending even if partial/blocked/merge-ready;
10. record exact branch/SHA/PR/CI evidence;
11. update both repos when a cross-repo contract/global product state changes.

Allowed statuses: `PLANNED`, `IN PROGRESS`, `PARTIAL / SAFE CHECKPOINT`, `READY TO MERGE`, `MERGED / CLOSEOUT IN PROGRESS`, `DONE / MERGED / FROZEN`.

## 2. Repository truth

### Frontend

Repository: `sajadkhavas/turnoment`

Current accepted implementation main / F09 closeout base:

`6b4705ede745427ee4dd1a6aeafdeeab7c73042f`

Post-F09-implementation Frontend Quality Gate:

`34467008288` — **PASS**

Post-main browser artifact:
- id `10148013024`;
- digest `sha256:c1d30a5e53542b230e7dea2f52ba15fa12aadf284a325ccfe88193ab016d7469`.

F09 implementation PR `#57` is MERGED. F09 workstream status at this checkpoint is:

`MERGED / CLOSEOUT IN PROGRESS — TARGET FINAL_PRIVATE`

Tracking Issue `#56` MUST remain open until documentation-only closeout is merged and terminal post-closeout main Quality Gate is green on the final frozen main SHA.

### F09 implementation evidence

F09 — Player Profile Recertification `/dashboard/profile`:
- START_SHA: `9876e5e6c47b42f9f2574f1675de6dab9ba1cc7f`;
- implementation branch: `phase/f09-player-profile`;
- tracking Issue: `#56`;
- accepted browser/code candidate: `7062f629264e78323dedbb84f8151bf29e270a94`;
- candidate Quality Gate: `34460593400` — PASS;
- candidate artifact: `10145475710`;
- candidate digest: `sha256:c261480e9fcbaa6cba6d0a2b972cea4f81b7ed85ca70799c9139c707edf83509`;
- 60 regression screenshots; F09 widths `375 / 390 / 430 / 768 / 1024 / 1440`;
- manual visual review `375 / 430 / 768 / 1024 / 1440` — PASS;
- final implementation/evidence head: `8b362cbe521d39a103c192a7d6ff344f0a08e1d1`;
- exact-head Quality Gate: `34461197903` — PASS;
- exact-head artifact `10145721261`;
- exact-head digest `sha256:23101901d354f4f4a21d50efe8d9fb561d2808a13202739a7c7cde3001c18a20`;
- implementation PR: `#57` — MERGED;
- PR-triggered Quality Gate: `34461614267` — PASS;
- PR artifact `10145875847`;
- PR artifact digest `sha256:b460b561c2efece21cdec465b363893dd6d9e84fd272506e06676449487e2079`;
- mergeable before merge: `true`;
- unresolved review threads before merge: `0`;
- pre-merge `main` verified exact START_SHA;
- implementation merge used expected-head lock;
- implementation merge/current accepted main: `6b4705ede745427ee4dd1a6aeafdeeab7c73042f`;
- post-implementation main Quality Gate: `34467008288` — PASS;
- post-main artifact `10148013024`;
- post-main digest `sha256:c1d30a5e53542b230e7dea2f52ba15fa12aadf284a325ccfe88193ab016d7469`;
- closeout branch: `closeout/f09-player-profile`, created exactly from implementation merge;
- workstream evidence: `docs/workstreams/F09_PLAYER_PROFILE.md`;
- acceptance evidence: `docs/workstreams/F09_ACCEPTANCE_EVIDENCE.md`;
- closeout record: `docs/workstreams/F09_CLOSEOUT.md`.

The `/dashboard/profile` route may be represented as `FINAL_PRIVATE` in closeout governance because implementation is merged and post-implementation main QA is green. The F09 workstream itself is NOT terminally `DONE / MERGED / FROZEN` until Issue #56 records closeout merge/frozen main SHA and terminal green main CI.

### Previously frozen frontend truth

F08 — OTP Account Onboarding `/register`:
- status `DONE / MERGED / FROZEN — FINAL_PRIVATE`;
- frozen main `9876e5e6c47b42f9f2574f1675de6dab9ba1cc7f`;
- terminal Quality Gate `34458480652` — PASS;
- terminal artifact `10144590436`;
- terminal digest `sha256:6407bc926904ef3ff2f3b4747c3744205add4da52dde3e30c537257dd129197f`;
- Issue `#53` CLOSED / COMPLETED.

F07 — Final OTP Login `/login`:
- status `DONE / MERGED / FROZEN — FINAL_PRIVATE`;
- frozen main `0932bef621cf22d3d7a7a95360613061e75d805f`;
- terminal Quality Gate `34453295788` — PASS;
- terminal artifact `10142502630`;
- terminal digest `sha256:5d56f426984edcb6e2bc137eb11475b70057d87accaef41c2265f4954c26a3df`;
- Issue `#50` CLOSED / COMPLETED.

F06 — Match Dispute `/matches/$id/dispute`:
- status `DONE / MERGED / FROZEN — FINAL_PRIVATE`;
- frozen main `e87798a0463677b4da68ee28b80b5e58a91a1883`;
- terminal Quality Gate `34412405721` — PASS;
- Issue `#47` CLOSED / COMPLETED.

F05 — Result Submission `/matches/$id/result`:
- status `DONE / MERGED / FROZEN — FINAL_PRIVATE`;
- frozen main `0407a925974d50b4a75af292231bacb48c66eb38`;
- terminal Quality Gate `34407220433` — PASS;
- Issue `#44` CLOSED / COMPLETED;
- runtime result APIs remain `FRONTEND MOCK / BACKEND PENDING`.

F04 — My Matches `/dashboard/matches`:
- status `DONE / MERGED / FROZEN — FINAL_PRIVATE`;
- frozen main `864fe1491739b06c763be487a73a589c7e0f3609`;
- terminal gate `34391019079` PASS;
- Issue #41 completed.

F03 — My Tournaments `/dashboard/tournaments`:
- status `DONE / MERGED / FROZEN — FINAL_PRIVATE`;
- frozen main `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`;
- terminal gate `34386636373` PASS;
- Issue #38 completed.

F02 — Game Detail `/games/$slug`:
- `DONE / MERGED / FROZEN — FINAL_CURRENT`;
- terminal truth in Issue #29.

F01 — Tournament Detail + Tournament Registration:
- `/tournaments/$id` → `FINAL_PRE_SEO`;
- `/tournaments/$id/register` → `FINAL_PRIVATE`;
- terminal truth in Issue #8.

### Backend

Repository: `sajadkhavas/turnoment-backend`

Latest accepted backend main:

`38dccbf213d5f439e56cd608e3e4ac419d5092d1`

Backend phase truth:
- P00 → `DONE / MERGED / FROZEN`;
- P01 → `DONE / MERGED / FROZEN`;
- backend NEXT → `P02 — Games / Catalog Foundation`.

F09 uses accepted P01 account/profile runtime only:
- `GET /api/v1/auth/csrf/`;
- `GET /api/v1/auth/me/`;
- `PATCH /api/v1/auth/me/profile/`.

Editable profile fields are exactly `gamer_tag`, `display_name`, `city`, `bio`, `interview_opt_in`. `avatar_key`, phone, email, join date, roles, id and active state are not frontend mutation fields. Web auth remains Django Session + CSRF + OTP. Never introduce localStorage/sessionStorage bearer-token auth.

## 3. Permanent frontend law

Every accepted page is built once as final frontend architecture.

Required boundary:

`Route → validated params/search → route access policy → loader → typed repository/service contract → runtime-validated data → UI`

Fixtures exist only for development/test/visual QA and implement the same permanent contract.

Frontend is not authoritative for auth/session, tournament lifecycle, registration eligibility, capacity, bracket truth, winner/final result, rating change, result-submission/confirmation eligibility, dispute truth, challenge eligibility, payment/refund/settlement or moderation.

No accepted page may need a later generic phase to finish SSR/routing, index policy, final copy, accessibility, responsive behavior, complete states, runtime validation or production contract mapping.

User-visible copy must never expose development-stage language such as backend/API/mock/demo/temporary/waiting/service-connection jargon when natural product language is appropriate.

## 4. Mandatory page workflow

1. exact repository/START_SHA lock;
2. official documentation audit;
3. design reference audit;
4. public pages: SEO/search-intent/topic research + final-copy plan;
5. final information architecture/state model;
6. final route/SSR/index-policy/accessibility/contracts/copy;
7. responsive/visual QA;
8. public pages: SEO/final-copy QA;
9. lint/typecheck/contracts/build;
10. implementation PR/review/merge/post-merge CI;
11. documentation-only closeout where required;
12. terminal frozen-main CI before `DONE`.

Private/noindex account/action pages do not require public SERP/keyword research, but final natural copy, accessibility, production-contract mapping and explicit `noindex,nofollow` remain mandatory.

## 5. Accepted / active route truth

- `/dashboard` → `FINAL_PRIVATE`.
- `/dashboard/tournaments` → F03 `FINAL_PRIVATE`.
- `/dashboard/matches` → F04 `FINAL_PRIVATE`.
- `/dashboard/profile` → F09 implementation accepted as `FINAL_PRIVATE`; F09 terminal closeout in progress until Issue #56 closes after terminal main CI.
- `/matches/$id/result` → F05 `FINAL_PRIVATE`; runtime result APIs `FRONTEND MOCK / BACKEND PENDING`.
- `/matches/$id/dispute` → F06 `FINAL_PRIVATE`; runtime dispute APIs `FRONTEND MOCK / BACKEND PENDING`.
- `/tournaments/$id/register` → F01 `FINAL_PRIVATE`.
- `/tournaments/$id` → F01 `FINAL_PRE_SEO`.
- `/games/$slug` → F02 `FINAL_CURRENT`.
- `/login` → F07 `DONE / MERGED / FROZEN — FINAL_PRIVATE`.
- `/register` → F08 `DONE / MERGED / FROZEN — FINAL_PRIVATE`.

Canonical inventory: `docs/ROUTE_COMPLIANCE_REGISTRY.md`.

## 6. F09 frozen product/architecture truth being closed

`/dashboard/profile` is a private `noindex,nofollow` player profile surface with:
- route loader → typed `PlayerProfileRepository` → runtime-validated P01 payload → UI;
- read authority `GET /api/v1/auth/me/`;
- mutation authority `PATCH /api/v1/auth/me/profile/`;
- Django Session + CSRF with `credentials: include` and `X-CSRFToken` on PATCH;
- only gamer tag, display name, city, bio and interview opt-in editable;
- phone, email and join date clearly read-only;
- no password, birthdate, phone/email mutation or fake avatar uploader;
- strict mutation schema rejecting unsupported fields;
- pending/saved/validation/conflict/session-expired/error states;
- final Persian copy and responsive/accessibility acceptance.

## 7. Remaining known work

- `/dashboard/challenges` remains a separate Challenge Hub workstream until its own accepted implementation/evidence chain lands; Lovable output alone is not acceptance.
- `/dashboard/rivalries`, `/dashboard/achievements`, `/dashboard/notifications`, `/dashboard/settings`, `/dashboard/teams` remain placeholders unless a newer accepted workstream supersedes this checkpoint.
- `/`, `/tournaments`, `/games`, `/centers`, `/centers/$id`, `/ranking`, `/players/$username`, `/host`, `/rules` remain public competitive routes requiring current-law recertification.
- inherited ecommerce/service/general routes remain `LEGACY_REVIEW` until explicit keep/remove/repurpose decisions.

## 8. Competitive truth retained

- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth.

## 9. Exact NEXT

F09 terminal closeout NEXT:
1. keep closeout diff exactly four Markdown governance files;
2. compare implementation merge `6b4705ede745427ee4dd1a6aeafdeeab7c73042f` → closeout head and require docs-only scope;
3. open closeout PR without auto-close syntax;
4. require closeout PR exact-head Frontend Quality Gate PASS;
5. require mergeable true + unresolved review threads `0`;
6. verify `main` is still exact implementation merge before closeout merge;
7. merge closeout with expected-head lock;
8. require terminal post-closeout main Quality Gate PASS;
9. record frozen main SHA + terminal CI/artifact/digest in Issue #56;
10. re-verify live `main` exact frozen SHA;
11. close Issue #56 with `state_reason=completed` only then.

After F09 terminal freeze, the next independent frontend workstream is `/dashboard/notifications`, while Challenge Hub/Detail remains isolated for its own Lovable + acceptance chain.

Backend NEXT remains `P02 — Games / Catalog Foundation`.
