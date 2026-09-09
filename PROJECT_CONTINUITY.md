# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> Operational source of truth for continuing Turnoment without duplicate work.

Last update: `2026-09-09`

## 1. Mandatory continuation law

Every chat/agent MUST:

1. read this file before implementation;
2. read `FRONTEND_PAGE_DELIVERY_PROTOCOL.md` for frontend page work;
3. read `SEO_FINAL_COPY_PROTOCOL.md` for public/indexable pages or material public-copy changes;
4. read `docs/ROUTE_COMPLIANCE_REGISTRY.md` before modifying/accepting an existing route;
5. verify current `main` SHA of every repo it will change;
6. read relevant Issue/PR/workstream evidence before repeating work;
7. use a dedicated branch;
8. never claim `DONE / MERGED / FROZEN` from chat memory alone;
9. update continuity before ending even if partial/blocked/merge-ready;
10. record exact branch/SHA/PR/CI evidence;
11. update both repos if a cross-repo contract/global product state changes.

Allowed statuses: `PLANNED`, `IN PROGRESS`, `PARTIAL / SAFE CHECKPOINT`, `BLOCKED`, `READY TO MERGE`, `DONE / MERGED / FROZEN`.

## 2. Repository truth

### Frontend

Repo: `sajadkhavas/turnoment`

Latest terminal accepted `main` before active F04:

`df7c4e8c6c60c35616bba1143814b5d2a7a408c7`

Latest terminal main Quality Gate:

`34386636373` — PASS

This frozen main includes F01 Tournament Detail + Registration architecture, Player Dashboard final private architecture, F02 Game Detail technical + SEO/final-copy acceptance, F03 My Tournaments final private implementation + closeout, and the final frontend/SEO delivery protocols.

Active frontend workstream:

- F04 — My Matches `/dashboard/matches`
- status: `IN PROGRESS / IMPLEMENTED / ACCEPTANCE IN PROGRESS`
- START_SHA: `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`
- branch: `phase/f04-my-matches`
- tracking Issue: `#41`
- evidence: `docs/workstreams/F04_MY_MATCHES.md`
- initial implementation/browser head: `82525fb153ac129754c27c0c021f3ef8e1f10e44`
- initial Quality Gate `34388320768` — PASS
- artifact `10118663030`, digest `sha256:ee20d8dc48268a8f97a11c17b14974b10b292b2aa47be157db8e0abe1470baa1`
- manual representative responsive review `375 / 430 / 768 / 1024 / 1440` — PASS

### Backend

Repo: `sajadkhavas/turnoment-backend`

Latest verified `main` after F04 documentation alignment:

`baeffe042f4dc6ab6d2cbd0433eca4f8404daff6`

- P00 → `DONE / MERGED / FROZEN`
- P01 → `DONE / MERGED / FROZEN`
- F03 My Tournaments contract alignment docs → merged; runtime still backend-pending
- F04 My Matches contract alignment docs → Issue #11 completed, PR #12 merged
- F04 backend alignment merge: `baeffe042f4dc6ab6d2cbd0433eca4f8404daff6`
- F04 post-merge Backend Quality Gate `34388924185` — PASS on Python 3.12 and 3.14
- F04 cross-repo runtime integration remains `FRONTEND MOCK / BACKEND PENDING`
- Backend NEXT remains `P02 — Games / Catalog Foundation`

Web auth truth: Django Session + CSRF + OTP. Do not introduce localStorage bearer-token auth.

## 3. Permanent frontend law

Every accepted page is built once as the final frontend architecture.

Required boundary:

`Route → validated params/search → route access policy → loader → typed repository/service contract → runtime-validated data → UI`

Fixtures exist only for development/test/visual QA and implement the same permanent contract.

Frontend is not authoritative for auth/session, tournament lifecycle, registration eligibility, capacity, bracket truth, winner/final result, rating change, result submission/confirmation eligibility, dispute truth, challenge eligibility, payment/refund/settlement or moderation.

No accepted page may need a later generic phase to finish SSR/routing, index policy, final copy, accessibility, responsive behavior, complete states, runtime validation or production contract mapping.

User-visible copy must never expose development-stage language such as backend/API/mock/demo/temporary/waiting/service-connection jargon when natural product language is appropriate.

## 4. Mandatory page workflow

1. exact repository/START_SHA lock
2. official documentation audit
3. design reference audit
4. public pages: SEO/search-intent/topic research + final-copy plan
5. final information architecture/state model
6. final route/SSR/index-policy/accessibility/contracts/copy
7. responsive/visual QA
8. public pages: SEO/final-copy QA
9. lint/typecheck/contracts/build
10. PR/review/merge/post-merge CI
11. continuity + route-registry update
12. terminal closeout/freeze + final main CI before `DONE`

Mandatory supporting files:

- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`
- `SEO_FINAL_COPY_PROTOCOL.md`
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`
- `docs/OFFICIAL_FRONTEND_SOURCES.md`
- `docs/DESIGN_REFERENCE_AUDIT_TEMPLATE.md`
- `docs/SEO_CONTENT_RESEARCH_TEMPLATE.md`
- `docs/PAGE_WORKSTREAM_EVIDENCE_TEMPLATE.md`

## 5. SEO/final-copy law

Private/noindex account pages do not require public SERP/keyword research, but final natural copy, accessibility, production-contract mapping and explicit `noindex,nofollow` remain mandatory.

Public/indexable routes still require the full current SEO/final-copy evidence chain before `FINAL_CURRENT` acceptance.

## 6. Current accepted / active route truth

### `/dashboard`
`DONE / MERGED / FROZEN — FINAL_PRIVATE`

### `/tournaments/$id/register`
`DONE / MERGED / FROZEN — FINAL_PRIVATE`

### `/tournaments/$id`
`DONE / MERGED / FROZEN — FINAL_PRE_SEO`

### `/games/$slug`
`DONE / MERGED / FROZEN — FINAL_CURRENT`

F02 terminal evidence: final frozen main `4afb49e913d5fd7e2420031ae957fde2e79e3e8a`; terminal Quality Gate `34374298544` PASS; Issue #29 completed.

### F03 — My Tournaments `/dashboard/tournaments`

`DONE / MERGED / FROZEN — FINAL_PRIVATE`

Terminal evidence:
- START_SHA `4afb49e913d5fd7e2420031ae957fde2e79e3e8a`
- final implementation/evidence head `98c92846b79d1d715d16b3db9ad762a54e7fa137`
- implementation PR #39 / merge `bc294e8dbdd6c1d61f11203b8c4e0cfe96094d30`
- post-implementation CI `34385716082` — PASS
- closeout PR #40 / head `f50c5244929ed07f8b4224fb6e4ca4ced233b015`
- final frozen main `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`
- terminal Quality Gate `34386636373` — PASS
- Issue #38 closed completed
- backend runtime integration remains `FRONTEND MOCK / BACKEND PENDING`.

### F04 — My Matches `/dashboard/matches`

Status: `IN PROGRESS / IMPLEMENTED / ACCEPTANCE IN PROGRESS`

Identity:
- START_SHA `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`
- branch `phase/f04-my-matches`
- Issue #41
- evidence `docs/workstreams/F04_MY_MATCHES.md`

Accepted architecture on active branch:
- placeholder replaced by validated `state/kind/game/page` URL search;
- parent Dashboard Session guard/shell reused;
- dedicated `MyMatchesRepository`;
- deterministic fixture + Django HTTP adapter behind the same interface;
- planned private endpoint `GET /api/v1/me/matches/` with `credentials: include`;
- Zod runtime validation + cross-field integrity checks;
- backend-authoritative lifecycle/check-in/result/dispute/attention/final-result/pagination states;
- tournament + challenge context;
- finalized score/outcome/rating delta only from contract;
- loading/normal/empty/filtered-empty/error/pagination states;
- no dead Result Submission/Dispute links before those workstreams exist;
- private `noindex,nofollow`;
- browser QA at all six required widths.

Initial quality evidence:
- head `82525fb153ac129754c27c0c021f3ef8e1f10e44`
- Quality Gate `34388320768` — PASS
- artifact `10118663030`
- digest `sha256:ee20d8dc48268a8f97a11c17b14974b10b292b2aa47be157db8e0abe1470baa1`
- manual representative responsive review — PASS

Cross-repo F04 alignment:
- backend owners: `matches / results / disputes`
- backend Issue #11 — completed
- backend docs PR #12 — merged
- alignment head `91df6a17806f6155c0abf18f6f0c9c010a5a579b`
- PR Quality Gate `34388795695` — PASS on Python 3.12/3.14
- PR review threads `0`
- alignment merge `baeffe042f4dc6ab6d2cbd0433eca4f8404daff6`
- post-merge backend Quality Gate `34388924185` — PASS on Python 3.12/3.14
- runtime status remains `FRONTEND MOCK / BACKEND PENDING`
- backend domain implementation was not started or reordered.

F04 does NOT own Result Submission or Dispute mutation flows; they remain the next separately governed frontend workstreams.

## 7. Route compliance registry

Canonical inventory: `docs/ROUTE_COMPLIANCE_REGISTRY.md`

Current highlights:
- `FINAL_CURRENT`: `/games/$slug`
- `FINAL_PRIVATE`: `/dashboard`, `/dashboard/tournaments`, `/tournaments/$id/register`
- `FINAL_PRE_SEO`: `/tournaments/$id`
- `IN_PROGRESS`: `/dashboard/matches` — F04
- `REBUILD`: `/login`, `/register`
- remaining dashboard challenge/rivalry/achievement/notification/settings/team routes remain explicit placeholders
- inherited ecommerce/service routes remain `LEGACY_REVIEW` and are not competitive architecture references.

## 8. Competitive truth retained

- Tournament Rating and Challenge Rating are separate.
- Challenge unlock = 30 finalized valid matches, not wins.
- no wager/betting/stake mechanics.
- frontend never determines finalized result/rating/dispute truth.

## 9. Known constraints

- `/login` and `/register` remain inherited password-oriented flows and must later be rebuilt to OTP/session truth.
- remaining dashboard placeholders must be rebuilt before product acceptance.
- public competitive routes predating current law remain subject to registry recertification.
- F04 frontend architecture may become final while backend runtime remains pending; do not equate frontend finality with live backend integration.

## 10. Exact NEXT

Frontend engineering NEXT:

1. **complete active F04 — My Matches `/dashboard/matches`** through final PR/merge/closeout/terminal CI;
2. Result Submission;
3. Dispute;
4. Challenge Hub / Detail;
5. Rivalry Detail;
6. Auth / OTP;
7. Notifications / Settings.

Backend NEXT remains `P02 — Games / Catalog Foundation`.
