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

Latest terminal frozen frontend `main` before active F06:

`0407a925974d50b4a75af292231bacb48c66eb38`

Terminal F05 frontend Quality Gate:

`34407220433` — PASS

That frozen main includes terminal F01–F05 accepted work. F05 Issue #44 is closed completed.

Active frontend workstream:
- `F06 — Match Dispute`;
- route `/matches/$id/dispute`;
- status `IN PROGRESS / IMPLEMENTATION ACCEPTED / PR PENDING`;
- START_SHA `0407a925974d50b4a75af292231bacb48c66eb38`;
- branch `phase/f06-dispute`;
- Issue #47 — must remain open through terminal closeout;
- accepted code/browser head `1a1bf97da61ce9f4845c7ed78262519f54e1a3f3`;
- accepted Quality Gate `34410106647` — PASS;
- accepted artifact `10126954058`;
- artifact digest `sha256:385120df87ea2ea15cae7eccfa978aba0a8f083f82b8101b6138cdc232118bcd`;
- workstream evidence `docs/workstreams/F06_DISPUTE.md`;
- acceptance evidence `docs/workstreams/F06_ACCEPTANCE_EVIDENCE.md`.

Current F06 implementation also contains a bounded navigation correction discovered during source audit:
- My Matches `attention=submit-result` → `/matches/$id/result`;
- My Matches `attention=dispute` → `/matches/$id/dispute`;
- F05 disputed Result Submission state → `/matches/$id/dispute`;
- no `confirm-result` route is invented.

This correction is included in the same full frontend regression gate.

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
- PR gate `34409560819` — PASS Python 3.12 / 3.14;
- review threads `0`;
- merge/main `38dccbf213d5f439e56cd608e3e4ac419d5092d1`;
- post-merge gate `34409893478` — PASS Python 3.12 / 3.14;
- Python/domain/model/migration/phase-registry changes: `NONE`.

F06 runtime integration remains:

`FRONTEND MOCK / BACKEND PENDING`

The dispute endpoints are documented contracts; no live disputes backend implementation is claimed.

Web authentication truth remains Django Session + CSRF + OTP. Never introduce localStorage bearer auth.

## 3. Permanent frontend law

Every accepted page is built once as final frontend architecture.

Required boundary:

`Route → validated params/search → route access policy → loader → typed repository/service contract → runtime-validated data → UI`

Fixtures exist only for development/test/visual QA and implement the same permanent contract.

Frontend is not authoritative for auth/session, tournament lifecycle, registration eligibility, capacity, bracket truth, winner/final result, rating change, result submission/confirmation eligibility, dispute truth, challenge eligibility, payment/refund/settlement or moderation.

No accepted page may need a later generic phase to finish SSR/routing, index policy, final copy, accessibility, responsive behavior, complete states, runtime validation or production contract mapping.

User-visible copy must not expose engineering-stage language such as backend/API/mock/demo/temporary/waiting/service-connection jargon when natural product language is appropriate.

## 4. Mandatory page workflow

1. exact repository/START_SHA lock;
2. official documentation audit;
3. design/reference audit;
4. public pages: SEO/search-intent/topic research + final-copy plan;
5. final information architecture/state model;
6. final route/SSR/index policy/accessibility/contracts/copy;
7. responsive/visual QA;
8. public pages: SEO/final-copy QA;
9. lint/typecheck/contracts/build;
10. PR/review/merge/post-merge CI;
11. continuity + route-registry update;
12. terminal closeout/freeze + final main CI before `DONE`.

Mandatory supporting files:
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `SEO_FINAL_COPY_PROTOCOL.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- `docs/OFFICIAL_FRONTEND_SOURCES.md`;
- `docs/DESIGN_REFERENCE_AUDIT_TEMPLATE.md`;
- `docs/SEO_CONTENT_RESEARCH_TEMPLATE.md`;
- `docs/PAGE_WORKSTREAM_EVIDENCE_TEMPLATE.md`.

Private/noindex action pages do not require public SERP research, but final natural copy, accessibility, production-contract mapping and explicit `noindex,nofollow` remain mandatory.

## 5. Accepted competitive route truth

### `/dashboard`
`DONE / MERGED / FROZEN — FINAL_PRIVATE`

### `/tournaments/$id/register`
`DONE / MERGED / FROZEN — FINAL_PRIVATE`

### `/tournaments/$id`
`DONE / MERGED / FROZEN — FINAL_PRE_SEO`

### `/games/$slug`
`DONE / MERGED / FROZEN — FINAL_CURRENT`

F02 terminal frozen main `4afb49e913d5fd7e2420031ae957fde2e79e3e8a`; terminal Quality Gate `34374298544` PASS; Issue #29 completed.

### F03 — My Tournaments `/dashboard/tournaments`

`DONE / MERGED / FROZEN — FINAL_PRIVATE`

- frozen main `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`;
- terminal Quality Gate `34386636373` — PASS;
- Issue #38 — completed;
- runtime `FRONTEND MOCK / BACKEND PENDING`.

### F04 — My Matches `/dashboard/matches`

`DONE / MERGED / FROZEN — FINAL_PRIVATE`

- START_SHA `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`;
- final implementation/evidence head `c5dce2302b3f33f990b529bb723543c70477be5d`;
- implementation PR #42;
- implementation merge `79330a95c05161d5896fb9328134caf814528036`;
- final frozen main `864fe1491739b06c763be487a73a589c7e0f3609`;
- terminal Quality Gate `34391019079` — PASS;
- Issue #41 — completed;
- runtime `FRONTEND MOCK / BACKEND PENDING`.

### F05 — Result Submission `/matches/$id/result`

`DONE / MERGED / FROZEN — FINAL_PRIVATE`

- START_SHA `864fe1491739b06c763be487a73a589c7e0f3609`;
- implementation PR #45 — merged;
- implementation merge `80b0f00860741f352208c41f79edaae5fd1872ac`;
- final closeout/frozen main `0407a925974d50b4a75af292231bacb48c66eb38`;
- terminal Quality Gate `34407220433` — PASS;
- Issue #44 — `CLOSED / COMPLETED`;
- backend F05 docs alignment main `93d4158e55ebe5d4cb0e724c84104ddd9fbf0c17`;
- runtime `FRONTEND MOCK / BACKEND PENDING`.

Accepted F05 truth includes stable Match param validation, private Session UX gate, `noindex,nofollow`, typed repository, Django GET/POST mapping, CSRF, idempotency, opaque revision/stale handling, authoritative score policy/state, review-before-submit and no frontend-derived winner/rating.

### F06 — Match Dispute `/matches/$id/dispute`

Workstream status:

`IN PROGRESS / IMPLEMENTATION ACCEPTED / PR PENDING`

Identity:
- START_SHA `0407a925974d50b4a75af292231bacb48c66eb38`;
- branch `phase/f06-dispute`;
- Issue #47 — open until terminal closeout;
- accepted code/browser head `1a1bf97da61ce9f4845c7ed78262519f54e1a3f3`;
- Quality Gate `34410106647` — PASS;
- artifact `10126954058`;
- digest `sha256:385120df87ea2ea15cae7eccfa978aba0a8f083f82b8101b6138cdc232118bcd`;
- 42 regression screenshots; F06 captured at 375/390/430/768/1024/1440;
- representative manual review 375/768/1440 — PASS after localizing the evidence picker.

Accepted F06 architecture/product truth:
- stable safe Match ID validation;
- private Session UX access policy + independent backend object authorization contract;
- `noindex,nofollow`;
- typed `MatchDisputeRepository` with deterministic fixture and Django HTTP adapters;
- planned read/create/evidence endpoints;
- Django Session credentials + P01 CSRF bootstrap + `X-CSRFToken`;
- one `Idempotency-Key` per logical create/evidence attempt;
- opaque revision/stale handling;
- read states `eligible/open/under-review/resolved/unavailable`;
- explicit review-before-create;
- backend-authoritative reason/statement/evidence policy;
- private evidence upload with browser validation as UX only and backend-owned real security validation;
- runtime identity/integrity checks;
- no frontend moderation/result/rating decision;
- no dispute-withdrawal transition invented;
- final localized accessible evidence picker;
- corrected My Matches/F05 navigation under regression coverage.

Backend F06 alignment:
- Issue #15 closed completed;
- PR #16 merged;
- docs head `c38052f2c9aaa79ad269e5445610f5f2a28c6845`;
- PR gate `34409560819` PASS Python 3.12/3.14;
- merge/main `38dccbf213d5f439e56cd608e3e4ac419d5092d1`;
- post-merge gate `34409893478` PASS Python 3.12/3.14;
- runtime still `FRONTEND MOCK / BACKEND PENDING`;
- backend NEXT still P02.

F06 is not terminally DONE until implementation merge, post-merge main gate, documentation-only closeout merge and terminal frozen-main gate are all recorded in Issue #47.

## 6. Route compliance registry

Canonical inventory: `docs/ROUTE_COMPLIANCE_REGISTRY.md`.

Current highlights:
- `FINAL_CURRENT`: `/games/$slug`;
- `FINAL_PRIVATE`: `/dashboard`, `/dashboard/tournaments`, `/dashboard/matches`, `/matches/$id/result`, `/tournaments/$id/register`;
- `FINAL_PRE_SEO`: `/tournaments/$id`;
- `IN_PROGRESS`: `/matches/$id/dispute`;
- `REBUILD`: `/login`, `/register`;
- remaining dashboard challenge/rivalry/achievement/notification/settings/team routes remain explicit placeholders;
- inherited ecommerce/service routes remain `LEGACY_REVIEW`.

## 7. Competitive truth retained

- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute truth.

## 8. Known constraints

- matches/results/disputes backend runtimes are pending their accepted backend phases; frontend finality does not mean live API integration;
- `/login` and `/register` remain inherited password-oriented flows and must later be rebuilt to OTP/session truth;
- remaining dashboard placeholders must be rebuilt before product acceptance;
- public competitive routes predating current law remain subject to registry recertification.

## 9. Exact NEXT

Frontend F06:
1. commit final governance/evidence reconciliation on `phase/f06-dispute`;
2. require exact-head branch Quality Gate PASS;
3. open implementation PR without auto-closing Issue #47;
4. require exact-head PR CI PASS + mergeable true + review threads `0`;
5. verify `main` remains exact START_SHA before implementation merge;
6. merge with expected-head lock;
7. require post-implementation `main` Quality Gate PASS on exact merge SHA;
8. update Issue #47 to `MERGED / CLOSEOUT IN PROGRESS` but keep it open;
9. create documentation-only closeout branch exactly from implementation merge;
10. add closeout record, update continuity/registry non-recursively and target `/matches/$id/dispute` as `FINAL_PRIVATE`;
11. require closeout PR CI PASS + mergeable true + threads `0`;
12. merge closeout with expected-head lock;
13. require terminal post-closeout `main` Quality Gate PASS on frozen main SHA;
14. record terminal SHA/CI in Issue #47 and close completed;
15. only then claim `DONE / MERGED / FROZEN — FINAL_PRIVATE`.

Frontend NEXT after terminal F06:
1. Challenge Hub / Detail;
2. Rivalry Detail;
3. Auth / OTP;
4. Notifications / Settings.

Backend NEXT remains `P02 — Games / Catalog Foundation`.
