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

Latest accepted implementation `main` before F04 closeout:

`79330a95c05161d5896fb9328134caf814528036`

Post-F04-implementation `main` Quality Gate:

`34390091802` — PASS

This main includes:

- F01 Tournament Detail + Registration architecture;
- Player Dashboard final private architecture;
- F02 Game Detail technical + SEO/final-copy acceptance;
- F03 My Tournaments final private implementation + terminal closeout;
- F04 My Matches final private implementation through implementation merge;
- final frontend/SEO delivery protocols.

Active frontend closeout:

- F04 — My Matches `/dashboard/matches`
- implementation status: `MERGED`
- closeout status: `IN PROGRESS`
- START_SHA: `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`
- implementation branch: `phase/f04-my-matches`
- tracking Issue: `#41` — must remain open until terminal closeout main CI is green
- final implementation/evidence head: `c5dce2302b3f33f990b529bb723543c70477be5d`
- implementation PR: `#42` — merged
- implementation merge: `79330a95c05161d5896fb9328134caf814528036`
- post-implementation main Quality Gate: `34390091802` — PASS
- closeout branch: `closeout/f04-my-matches`
- implementation evidence: `docs/workstreams/F04_MY_MATCHES.md`
- closeout record: `docs/workstreams/F04_CLOSEOUT.md`

### Backend

Repo: `sajadkhavas/turnoment-backend`

Latest verified `main` after F04 documentation alignment:

`baeffe042f4dc6ab6d2cbd0433eca4f8404daff6`

- P00 → `DONE / MERGED / FROZEN`
- P01 → `DONE / MERGED / FROZEN`
- F03 My Tournaments cross-repo contract alignment → merged; runtime backend-pending
- F04 My Matches cross-repo contract alignment → Issue #11 completed, PR #12 merged
- F04 backend alignment merge: `baeffe042f4dc6ab6d2cbd0433eca4f8404daff6`
- F04 backend post-merge Quality Gate `34388924185` — PASS on Python 3.12 and 3.14
- My Matches runtime integration remains `FRONTEND MOCK / BACKEND PENDING`
- Backend NEXT remains `P02 — Games / Catalog Foundation`

Web auth truth: Django Session + CSRF + OTP. Never introduce localStorage bearer-token auth.

## 3. Permanent frontend law

Every accepted page is built once as the final frontend architecture.

Required boundary:

`Route → validated params/search → route access policy → loader → typed repository/service contract → runtime-validated data → UI`

Fixtures exist only for development/test/visual QA and implement the same permanent contract.

Frontend is not authoritative for auth/session, tournament lifecycle, registration eligibility, capacity, bracket truth, winner/final result, rating change, result-submission/confirmation eligibility, dispute truth, challenge eligibility, payment/refund/settlement or moderation.

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

Public/indexable routes require the full current SEO/final-copy evidence chain before `FINAL_CURRENT` acceptance.

## 6. Current accepted / active route truth

### `/dashboard`
`DONE / MERGED / FROZEN — FINAL_PRIVATE`

### `/tournaments/$id/register`
`DONE / MERGED / FROZEN — FINAL_PRIVATE`

### `/tournaments/$id`
`DONE / MERGED / FROZEN — FINAL_PRE_SEO`

### `/games/$slug`
`DONE / MERGED / FROZEN — FINAL_CURRENT`

Terminal F02 evidence: frozen main `4afb49e913d5fd7e2420031ae957fde2e79e3e8a`; terminal Quality Gate `34374298544` PASS; Issue #29 completed.

### F03 — My Tournaments `/dashboard/tournaments`

`DONE / MERGED / FROZEN — FINAL_PRIVATE`

Terminal evidence:

- START_SHA `4afb49e913d5fd7e2420031ae957fde2e79e3e8a`
- final implementation/evidence head `98c92846b79d1d715d16b3db9ad762a54e7fa137`
- implementation PR #39 / merge `bc294e8dbdd6c1d61f11203b8c4e0cfe96094d30`
- post-implementation CI `34385716082` — PASS
- closeout PR #40 / closeout head `f50c5244929ed07f8b4224fb6e4ca4ced233b015`
- final frozen main `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`
- terminal Quality Gate `34386636373` — PASS
- Issue #38 closed completed
- runtime integration remains `FRONTEND MOCK / BACKEND PENDING`.

### F04 — My Matches `/dashboard/matches`

Closeout target: `DONE / MERGED / FROZEN — FINAL_PRIVATE`

> Repository closeout may promote the route to `FINAL_PRIVATE`, but F04 itself is only terminally complete after Issue #41 records the closeout merge/frozen main SHA and green terminal post-closeout main Quality Gate.

Identity / implementation:

- START_SHA `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`
- implementation branch `phase/f04-my-matches`
- tracking Issue #41 — remains open through terminal closeout
- evidence `docs/workstreams/F04_MY_MATCHES.md`
- final implementation/evidence head `c5dce2302b3f33f990b529bb723543c70477be5d`
- implementation PR #42 — MERGED
- PR-triggered Quality Gate `34389760407` — PASS
- implementation review threads before merge: `0`
- implementation merge SHA `79330a95c05161d5896fb9328134caf814528036`
- post-implementation `main` Quality Gate `34390091802` — PASS
- closeout branch `closeout/f04-my-matches`
- closeout record `docs/workstreams/F04_CLOSEOUT.md`

Final architecture / product truth:

- inherited placeholder replaced;
- parent Dashboard Session guard/shell reused;
- validated URL-owned `state/kind/game/page` navigation;
- `MyMatchesRepository` with deterministic fixture and Django HTTP adapters;
- planned endpoint `GET /api/v1/me/matches/` with `credentials: include`;
- Zod runtime validation + cross-field integrity checks;
- match lifecycle/check-in/result/dispute/attention/final-result/pagination remain backend-authoritative;
- tournament + challenge contexts supported;
- finalized score/outcome/rating delta rendered only from finalized contract data;
- loading/populated/all-empty/filtered-empty/error/retry/pagination states implemented;
- no dead Result Submission/Dispute links;
- private `noindex,nofollow`;
- responsive QA at `375 / 390 / 430 / 768 / 1024 / 1440`.

Frontend QA evidence:

- initial implementation/browser head `82525fb153ac129754c27c0c021f3ef8e1f10e44`
- initial Quality Gate `34388320768` — PASS
- initial artifact `10118663030`, digest `sha256:ee20d8dc48268a8f97a11c17b14974b10b292b2aa47be157db8e0abe1470baa1`
- representative manual review `375 / 430 / 768 / 1024 / 1440` — PASS
- final exact-head Quality Gate `34389469019` — PASS on `c5dce2302b3f33f990b529bb723543c70477be5d`
- final artifact `10119103403`, digest `sha256:b210905e780219b3425ec84c54167e679c36d2f08789daabc05efd45a6aef33f`
- PR CI `34389760407` — PASS
- post-implementation main CI `34390091802` — PASS

Cross-repo F04 alignment:

- backend owners `matches / results / disputes`
- planned endpoint `GET /api/v1/me/matches/`
- backend Issue #11 — completed
- backend docs PR #12 — merged
- alignment head `91df6a17806f6155c0abf18f6f0c9c010a5a579b`
- backend PR Quality Gate `34388795695` — PASS on Python 3.12/3.14
- backend review threads `0`
- backend alignment merge `baeffe042f4dc6ab6d2cbd0433eca4f8404daff6`
- backend post-merge Quality Gate `34388924185` — PASS on Python 3.12/3.14
- no Python/model/migration/phase-order implementation changed by alignment
- runtime remains `FRONTEND MOCK / BACKEND PENDING`
- backend NEXT remains `P02 — Games / Catalog Foundation`.

F04 does not own Result Submission or Dispute mutation flows. They are the next separately governed frontend workstreams.

## 7. Route compliance registry

Canonical inventory: `docs/ROUTE_COMPLIANCE_REGISTRY.md`

Current closeout highlights:

- `FINAL_CURRENT`: `/games/$slug`
- `FINAL_PRIVATE`: `/dashboard`, `/dashboard/tournaments`, `/dashboard/matches`, `/tournaments/$id/register`
- `FINAL_PRE_SEO`: `/tournaments/$id`
- `REBUILD`: `/login`, `/register`
- remaining dashboard challenge/rivalry/achievement/notification/settings/team routes remain explicit placeholders
- inherited ecommerce/service routes remain `LEGACY_REVIEW` and are not competitive architecture references.

F04 terminal workstream status is confirmed only by Issue #41 after the closeout merge and terminal green main CI.

## 8. Competitive truth retained

- Tournament Rating and Challenge Rating are separate.
- Challenge unlock = 30 finalized valid matches, not wins.
- no wager/betting/stake mechanics.
- frontend never determines finalized result/rating/dispute truth.

## 9. Known constraints

- `/login` and `/register` remain inherited password-oriented flows and must later be rebuilt to OTP/session truth.
- remaining dashboard placeholders must be rebuilt before product acceptance.
- public competitive routes predating current law remain subject to registry recertification.
- F04 frontend architecture may be final while backend runtime remains pending; never equate frontend finality with live backend integration.

## 10. Exact NEXT

F04 closeout NEXT:

1. require closeout exact-head Quality Gate green;
2. open/review closeout PR and require PR Quality Gate PASS + review threads `0`;
3. verify `main` is still `79330a95c05161d5896fb9328134caf814528036` before merge;
4. merge closeout with expected-head lock;
5. require terminal post-closeout `main` Quality Gate PASS;
6. record closeout merge/frozen main SHA + terminal CI in Issue #41;
7. close Issue #41 as completed only then.

Frontend NEXT after terminal F04 closeout:

1. **Result Submission**;
2. **Dispute**;
3. Challenge Hub / Detail;
4. Rivalry Detail;
5. Auth / OTP;
6. Notifications / Settings.

Backend NEXT remains `P02 — Games / Catalog Foundation`.
