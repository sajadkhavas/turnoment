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

Current accepted implementation `main` before F06 closeout:

`e5e39ea2db0dadae3a9acb75c64dcf8ecb6dba4d`

Post-F06-implementation `main` Frontend Quality Gate:

`34411457787` — PASS

This main includes terminal F01–F05 plus the merged F06 Match Dispute implementation and the bounded F04/F05 navigation reconciliation.

Active frontend closeout:
- workstream: `F06 — Match Dispute`;
- route: `/matches/$id/dispute`;
- workstream status: `MERGED / CLOSEOUT IN PROGRESS`;
- START_SHA: `0407a925974d50b4a75af292231bacb48c66eb38`;
- implementation branch: `phase/f06-dispute`;
- tracking Issue: `#47` — MUST remain open until closeout merge/frozen main and terminal post-closeout main Quality Gate are recorded green;
- accepted code/browser head: `1a1bf97da61ce9f4845c7ed78262519f54e1a3f3`;
- accepted code/browser Quality Gate: `34410106647` — PASS;
- browser artifact: `10126954058`;
- browser artifact digest: `sha256:385120df87ea2ea15cae7eccfa978aba0a8f083f82b8101b6138cdc232118bcd`;
- final implementation/evidence head: `d4579c811f87e415747a44ae1c213ba71cf86030`;
- final exact-head push Quality Gate: `34410842966` — PASS;
- implementation PR: `#48` — MERGED;
- implementation PR Quality Gate: `34411147988` — PASS;
- implementation review threads before merge: `0`;
- implementation merge/current main: `e5e39ea2db0dadae3a9acb75c64dcf8ecb6dba4d`;
- post-implementation main Quality Gate: `34411457787` — PASS;
- closeout branch: `closeout/f06-dispute`, created exactly from implementation merge;
- workstream evidence: `docs/workstreams/F06_DISPUTE.md`;
- acceptance evidence: `docs/workstreams/F06_ACCEPTANCE_EVIDENCE.md`;
- closeout record: `docs/workstreams/F06_CLOSEOUT.md`.

Accepted F06 navigation reconciliation under the same regression suite:
- My Matches `attention=submit-result` → `/matches/$id/result`;
- My Matches `attention=dispute` → `/matches/$id/dispute`;
- F05 disputed Result Submission state → `/matches/$id/dispute`;
- Check-in unchanged;
- no `confirm-result` route invented.

### Backend

Repository: `sajadkhavas/turnoment-backend`

Latest accepted backend `main` after F06 documentation alignment:

`38dccbf213d5f439e56cd608e3e4ac419d5092d1`

Backend phase truth:
- P00 → `DONE / MERGED / FROZEN`;
- P01 → `DONE / MERGED / FROZEN`;
- backend NEXT → `P02 — Games / Catalog Foundation`.

F06 Match Dispute cross-repo documentation alignment:
- backend Issue #15 → `CLOSED / COMPLETED`;
- docs PR #16 → MERGED;
- docs head `c38052f2c9aaa79ad269e5445610f5f2a28c6845`;
- PR Quality Gate `34409560819` — PASS on Python 3.12 and 3.14;
- review threads before merge: `0`;
- merge/current backend main `38dccbf213d5f439e56cd608e3e4ac419d5092d1`;
- post-merge Quality Gate `34409893478` — PASS on Python 3.12 and 3.14;
- Python/domain/models/migrations/phase-registry changes from this alignment: `NONE`.

F06 runtime integration remains:

`FRONTEND MOCK / BACKEND PENDING`

The planned dispute endpoints are documented contracts; no live disputes backend implementation is claimed.

Web auth truth remains Django Session + CSRF + OTP. Never introduce localStorage bearer-token auth.

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
10. PR/review/merge/post-merge CI;
11. continuity + route-registry update;
12. terminal closeout/freeze + final main CI before `DONE`.

Private/noindex account/action pages do not require public SERP/keyword research, but final natural copy, accessibility, production-contract mapping and explicit `noindex,nofollow` remain mandatory.

## 5. Accepted / active competitive route truth

### `/dashboard`
`DONE / MERGED / FROZEN — FINAL_PRIVATE`

### `/tournaments/$id/register`
`DONE / MERGED / FROZEN — FINAL_PRIVATE`

### `/tournaments/$id`
`DONE / MERGED / FROZEN — FINAL_PRE_SEO`

### `/games/$slug`
`DONE / MERGED / FROZEN — FINAL_CURRENT`

F02 terminal evidence: frozen main `4afb49e913d5fd7e2420031ae957fde2e79e3e8a`; terminal Quality Gate `34374298544` PASS; Issue #29 completed.

### F03 — My Tournaments `/dashboard/tournaments`

`DONE / MERGED / FROZEN — FINAL_PRIVATE`

- frozen main `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`;
- terminal Quality Gate `34386636373` — PASS;
- Issue #38 — completed;
- runtime remains `FRONTEND MOCK / BACKEND PENDING`.

### F04 — My Matches `/dashboard/matches`

`DONE / MERGED / FROZEN — FINAL_PRIVATE`

- START_SHA `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`;
- final implementation/evidence head `c5dce2302b3f33f990b529bb723543c70477be5d`;
- implementation PR #42;
- implementation merge `79330a95c05161d5896fb9328134caf814528036`;
- final frozen main `864fe1491739b06c763be487a73a589c7e0f3609`;
- terminal Quality Gate `34391019079` — PASS;
- Issue #41 — completed;
- runtime remains `FRONTEND MOCK / BACKEND PENDING`.

### F05 — Result Submission `/matches/$id/result`

`DONE / MERGED / FROZEN — FINAL_PRIVATE`

- START_SHA `864fe1491739b06c763be487a73a589c7e0f3609`;
- implementation PR #45 — MERGED;
- implementation merge `80b0f00860741f352208c41f79edaae5fd1872ac`;
- final closeout/frozen main `0407a925974d50b4a75af292231bacb48c66eb38`;
- terminal Quality Gate `34407220433` — PASS;
- Issue #44 — CLOSED / COMPLETED;
- runtime remains `FRONTEND MOCK / BACKEND PENDING`.

### F06 — Match Dispute `/matches/$id/dispute`

Route status in the closeout registry: `FINAL_PRIVATE`.

Workstream status at this checkpoint: `MERGED / CLOSEOUT IN PROGRESS`.

> The route may be promoted non-recursively after implementation merge + post-implementation main QA. The F06 workstream itself is NOT terminally `DONE / MERGED / FROZEN` until Issue #47 records the closeout merge/frozen main SHA and terminal green post-closeout main Quality Gate.

Identity:
- START_SHA `0407a925974d50b4a75af292231bacb48c66eb38`;
- implementation branch `phase/f06-dispute`;
- tracking Issue #47 — open through terminal closeout;
- accepted code/browser head `1a1bf97da61ce9f4845c7ed78262519f54e1a3f3`;
- final implementation/evidence head `d4579c811f87e415747a44ae1c213ba71cf86030`;
- implementation PR #48 — MERGED;
- implementation merge `e5e39ea2db0dadae3a9acb75c64dcf8ecb6dba4d`;
- closeout branch `closeout/f06-dispute`.

Accepted architecture/product truth:
- safe stable Match route-param validation;
- private Session UX access policy and separate server object authorization contract;
- `noindex,nofollow`;
- typed `MatchDisputeRepository` with deterministic fixture and Django HTTP adapters;
- planned GET/read, POST/create and POST/evidence mapping;
- `credentials: include`, P01 CSRF bootstrap and `X-CSRFToken`;
- one `Idempotency-Key` per logical create/evidence attempt;
- opaque backend revision/stale-state contract;
- backend-authoritative dispute eligibility, reason policy, statement limits, evidence policy, moderation state and resolution;
- eligible/open/under-review/resolved/unavailable states;
- explicit review-before-create;
- private evidence metadata and localized accessible file picker;
- browser file checks are convenience only; backend owns actual type/signature/size/count/storage/security/access validation;
- no public evidence URL invented;
- no dispute withdrawal transition invented;
- frontend never derives corrected score, winner, rating impact, moderation decision or Match lifecycle;
- corrected My Matches/F05 navigation under full regression coverage.

Frontend QA evidence:
- accepted code/browser head `1a1bf97da61ce9f4845c7ed78262519f54e1a3f3`;
- Quality Gate `34410106647` — PASS;
- artifact `10126954058`;
- digest `sha256:385120df87ea2ea15cae7eccfa978aba0a8f083f82b8101b6138cdc232118bcd`;
- 42 regression screenshots; F06 widths `375 / 390 / 430 / 768 / 1024 / 1440`;
- representative manual review after picker localization `375 / 768 / 1440` — PASS;
- final implementation/evidence head `d4579c811f87e415747a44ae1c213ba71cf86030`;
- exact-head push Quality Gate `34410842966` — PASS;
- implementation PR CI `34411147988` — PASS;
- review threads immediately before implementation merge: `0`;
- main verified unchanged at START_SHA before merge;
- implementation merge `e5e39ea2db0dadae3a9acb75c64dcf8ecb6dba4d`;
- post-implementation main Quality Gate `34411457787` — PASS.

Cross-repo F06 alignment:
- backend owner `disputes`;
- backend Issue #15 — completed;
- backend docs PR #16 — merged;
- backend docs head `c38052f2c9aaa79ad269e5445610f5f2a28c6845`;
- backend PR Quality Gate `34409560819` — PASS Python 3.12/3.14;
- backend review threads `0`;
- backend alignment merge/current main `38dccbf213d5f439e56cd608e3e4ac419d5092d1`;
- backend post-merge Quality Gate `34409893478` — PASS Python 3.12/3.14;
- no backend dispute-domain implementation, models, migrations or phase-order change is claimed;
- runtime remains `FRONTEND MOCK / BACKEND PENDING`;
- backend NEXT remains `P02 — Games / Catalog Foundation`.

## 6. Route compliance registry

Canonical inventory: `docs/ROUTE_COMPLIANCE_REGISTRY.md`.

Current closeout highlights:
- `FINAL_CURRENT`: `/games/$slug`;
- `FINAL_PRIVATE`: `/dashboard`, `/dashboard/tournaments`, `/dashboard/matches`, `/matches/$id/result`, `/matches/$id/dispute`, `/tournaments/$id/register`;
- `FINAL_PRE_SEO`: `/tournaments/$id`;
- `REBUILD`: `/login`, `/register`;
- remaining dashboard challenge/rivalry/achievement/notification/settings/team routes remain explicit placeholders;
- inherited ecommerce/service routes remain `LEGACY_REVIEW`.

F06 terminal workstream status is confirmed only by Issue #47 after closeout merge and terminal green main CI.

## 7. Competitive truth retained

- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute truth.

## 8. Known constraints

- matches/results/disputes backend runtimes remain pending their accepted backend phases; frontend finality does not mean live API integration;
- `/login` and `/register` remain inherited password-oriented flows and must later be rebuilt to OTP/session truth;
- remaining dashboard placeholders must be rebuilt before product acceptance;
- public competitive routes predating current law remain subject to registry recertification.

## 9. Exact NEXT

F06 closeout NEXT:
1. verify closeout branch diff is documentation-only;
2. open closeout PR without auto-closing Issue #47;
3. require closeout PR exact-head Frontend Quality Gate PASS;
4. require closeout PR mergeable true + review threads `0`;
5. verify `main` remains exact implementation merge `e5e39ea2db0dadae3a9acb75c64dcf8ecb6dba4d` before merge;
6. merge closeout with expected-head lock;
7. require terminal post-closeout `main` Quality Gate PASS;
8. record closeout merge/frozen main SHA + terminal CI in Issue #47;
9. close Issue #47 as completed only then.

Frontend NEXT after terminal F06 closeout:
1. **Challenge Hub / Detail**;
2. Rivalry Detail;
3. Auth / OTP;
4. Notifications / Settings.

Backend NEXT remains `P02 — Games / Catalog Foundation`.
