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
5. verify current `main` SHA of every repo it will change;
6. read relevant Issue/PR/workstream evidence before repeating work;
7. use a dedicated branch;
8. never claim `DONE / MERGED / FROZEN` from chat memory alone;
9. update continuity before ending even if partial/blocked/merge-ready;
10. record exact branch/SHA/PR/CI evidence;
11. update both repos if a cross-repo contract/global product state changes.

Allowed statuses: `PLANNED`, `IN PROGRESS`, `PARTIAL / SAFE CHECKPOINT`, `BLOCKED`, `READY TO MERGE`, `MERGED / CLOSEOUT IN PROGRESS`, `DONE / MERGED / FROZEN`.

## 2. Repository truth

### Frontend

Repo: `sajadkhavas/turnoment`

Latest implementation `main` before F05 closeout:

`80b0f00860741f352208c41f79edaae5fd1872ac`

Post-F05-implementation `main` Quality Gate:

`34406381160` — PASS

This main includes:

- F01 Tournament Detail + Registration architecture;
- Player Dashboard final private architecture;
- F02 Game Detail technical + SEO/final-copy acceptance;
- F03 My Tournaments terminal closeout;
- F04 My Matches terminal closeout;
- F05 Result Submission final private implementation through implementation merge;
- current frontend/SEO delivery protocols and F05 acceptance evidence.

Active frontend closeout:

- workstream: `F05 — Result Submission`
- route: `/matches/$id/result`
- implementation status: `MERGED`
- closeout status: `IN PROGRESS`
- START_SHA: `864fe1491739b06c763be487a73a589c7e0f3609`
- implementation branch: `phase/f05-result-submission`
- tracking Issue: `#44` — MUST remain open until closeout merge/frozen main and terminal post-closeout `main` Quality Gate are recorded green
- accepted implementation/browser head: `5961e7b986b6e8751c137434d00472e17e1e1376`
- final implementation/evidence head: `8daa47c2e12f548a9a4d2c0c39d4a5b653aeb8bc`
- implementation PR: `#45` — MERGED
- implementation PR CI: `34406070865` — PASS
- implementation review threads before merge: `0`
- implementation merge: `80b0f00860741f352208c41f79edaae5fd1872ac`
- post-implementation main Quality Gate: `34406381160` — PASS
- closeout branch: `closeout/f05-result-submission`, created exactly from implementation merge
- implementation evidence: `docs/workstreams/F05_ACCEPTANCE_EVIDENCE.md`
- closeout record: `docs/workstreams/F05_CLOSEOUT.md` once committed on the closeout branch

### Backend

Repo: `sajadkhavas/turnoment-backend`

Latest verified backend `main` after F05 documentation alignment:

`93d4158e55ebe5d4cb0e724c84104ddd9fbf0c17`

Backend phase truth:

- P00 → `DONE / MERGED / FROZEN`
- P01 → `DONE / MERGED / FROZEN`
- backend NEXT → `P02 — Games / Catalog Foundation`

F05 Result Submission cross-repo documentation alignment:

- backend owner: `results`
- Issue #13 → `CLOSED / COMPLETED`
- docs PR #14 → MERGED
- docs head `4e1826d7be562e3cecef3d61070fe7ab8baa2379`
- PR Quality Gate `34394337599` — PASS on Python 3.12 and 3.14
- review threads before merge: `0`
- merge/main `93d4158e55ebe5d4cb0e724c84104ddd9fbf0c17`
- post-merge Quality Gate `34394628782` — PASS on Python 3.12 and 3.14
- Python/models/migrations/phase-registry changes from this alignment: `NONE`

F05 runtime integration remains:

`FRONTEND MOCK / BACKEND PENDING`

The planned Result Submission endpoints are documented but not claimed implemented/live.

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

Private/noindex account/action pages do not require public SERP/keyword research, but final natural copy, accessibility, production-contract mapping and explicit `noindex,nofollow` remain mandatory.

Public/indexable routes require the full current SEO/final-copy evidence chain before `FINAL_CURRENT` acceptance.

## 6. Accepted / active competitive route truth

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

- frozen main `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`
- terminal Quality Gate `34386636373` — PASS
- Issue #38 — completed
- runtime remains `FRONTEND MOCK / BACKEND PENDING`.

### F04 — My Matches `/dashboard/matches`

`DONE / MERGED / FROZEN — FINAL_PRIVATE`

- START_SHA `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`
- final implementation/evidence head `c5dce2302b3f33f990b529bb723543c70477be5d`
- implementation PR #42
- implementation merge `79330a95c05161d5896fb9328134caf814528036`
- final frozen main `864fe1491739b06c763be487a73a589c7e0f3609`
- terminal Quality Gate `34391019079` — PASS
- Issue #41 — completed
- runtime remains `FRONTEND MOCK / BACKEND PENDING`.

### F05 — Result Submission `/matches/$id/result`

Repository route status in the closeout registry: `FINAL_PRIVATE`.

Workstream status at this checkpoint: `MERGED / CLOSEOUT IN PROGRESS`.

> The route may be promoted in the non-recursive closeout registry after its final implementation is merged and post-implementation main CI is green. The F05 workstream itself is NOT terminally `DONE / MERGED / FROZEN` until Issue #44 records the closeout merge/frozen main SHA and terminal green post-closeout main Quality Gate.

Identity:

- START_SHA `864fe1491739b06c763be487a73a589c7e0f3609`
- implementation branch `phase/f05-result-submission`
- tracking Issue #44 — open through terminal closeout
- accepted implementation/browser head `5961e7b986b6e8751c137434d00472e17e1e1376`
- final implementation/evidence head `8daa47c2e12f548a9a4d2c0c39d4a5b653aeb8bc`
- implementation PR #45 — MERGED
- implementation merge `80b0f00860741f352208c41f79edaae5fd1872ac`
- closeout branch `closeout/f05-result-submission`

Accepted architecture/product truth:

- safe stable Match route-param validation;
- private Session UX access policy and separate server authorization contract;
- `noindex,nofollow`;
- typed `ResultSubmissionRepository` with deterministic fixture and Django HTTP adapters;
- planned `GET/POST /api/v1/matches/{matchId}/result/` mapping;
- `credentials: include`, P01 CSRF bootstrap and `X-CSRFToken`;
- one `Idempotency-Key` per logical submit attempt;
- opaque backend revision/stale-state contract;
- backend-authoritative score policy, eligibility, submitted/final state and rating delta;
- reportable/submitting/validation-error/transport-error/stale/awaiting-confirmation/finalized/disputed/unavailable/not-found/session-expired states;
- explicit review-before-submit;
- stale state blocks reuse of old revision;
- unavailable action removes the stale submit surface;
- accepted receipt route-identity invariant;
- supplied IANA timezone used for civil-time rendering;
- frontend never infers winner/final outcome/rating from submitted scores;
- F04 My Matches links only `attention=submit-result` to F05;
- confirmation/dispute remain separate governed workstreams with no dead links.

Frontend QA evidence:

- accepted implementation/browser head `5961e7b986b6e8751c137434d00472e17e1e1376`
- Quality Gate `34394538199` — PASS
- artifact `10121043332`
- digest `sha256:78d409ade10ef50124a374cd50475b139749221acc3c51332690b253c36cc860`
- responsive captures `375 / 390 / 430 / 768 / 1024 / 1440`
- representative manual visual review `375 / 430 / 768 / 1024 / 1440` — PASS
- final evidence head `8daa47c2e12f548a9a4d2c0c39d4a5b653aeb8bc`
- exact-head push Quality Gate `34405746632` — PASS
- implementation PR CI `34406070865` — PASS
- review threads immediately before implementation merge: `0`
- main verified unchanged at F04 frozen `864fe1491739b06c763be487a73a589c7e0f3609` before merge
- implementation merge `80b0f00860741f352208c41f79edaae5fd1872ac`
- post-implementation main Quality Gate `34406381160` — PASS

Cross-repo F05 alignment:

- backend owner `results`
- planned `GET/POST /api/v1/matches/{matchId}/result/`
- backend Issue #13 — completed
- backend docs PR #14 — merged
- backend docs head `4e1826d7be562e3cecef3d61070fe7ab8baa2379`
- backend PR Quality Gate `34394337599` — PASS on Python 3.12/3.14
- backend review threads `0`
- backend alignment merge/current main `93d4158e55ebe5d4cb0e724c84104ddd9fbf0c17`
- backend post-merge Quality Gate `34394628782` — PASS on Python 3.12/3.14
- no backend result-domain implementation, models, migrations or phase-order change is claimed
- runtime remains `FRONTEND MOCK / BACKEND PENDING`
- backend NEXT remains `P02 — Games / Catalog Foundation`.

## 7. Route compliance registry

Canonical inventory: `docs/ROUTE_COMPLIANCE_REGISTRY.md`

Current closeout highlights:

- `FINAL_CURRENT`: `/games/$slug`
- `FINAL_PRIVATE`: `/dashboard`, `/dashboard/tournaments`, `/dashboard/matches`, `/matches/$id/result`, `/tournaments/$id/register`
- `FINAL_PRE_SEO`: `/tournaments/$id`
- `REBUILD`: `/login`, `/register`
- remaining dashboard challenge/rivalry/achievement/notification/settings/team routes remain explicit placeholders
- inherited ecommerce/service routes remain `LEGACY_REVIEW` and are not competitive architecture references.

F05 terminal workstream status is confirmed only by Issue #44 after closeout merge and terminal green main CI.

## 8. Competitive truth retained

- Tournament Rating and Challenge Rating are separate.
- Challenge unlock = 30 finalized valid matches, not wins.
- no wager/betting/stake mechanics.
- frontend never determines finalized result/rating/dispute truth.

## 9. Known constraints

- backend Result Submission runtime is still pending its accepted backend phase; frontend finality does not mean live API integration;
- `/login` and `/register` remain inherited password-oriented flows and must later be rebuilt to OTP/session truth;
- remaining dashboard placeholders must be rebuilt before product acceptance;
- public competitive routes predating current law remain subject to registry recertification.

## 10. Exact NEXT

F05 closeout NEXT:

1. finish non-recursive closeout/governance docs on `closeout/f05-result-submission`;
2. require final closeout exact-head Quality Gate PASS;
3. open closeout PR without auto-closing Issue #44;
4. require closeout PR Quality Gate PASS + review threads `0` + exact head lock;
5. verify `main` remains exact implementation merge `80b0f00860741f352208c41f79edaae5fd1872ac` before merge;
6. merge closeout with expected-head lock;
7. require terminal post-closeout `main` Quality Gate PASS;
8. record closeout merge/frozen main SHA + terminal CI in Issue #44;
9. close Issue #44 as completed only then.

Frontend NEXT after terminal F05 closeout:

1. **Dispute**;
2. Challenge Hub / Detail;
3. Rivalry Detail;
4. Auth / OTP;
5. Notifications / Settings.

Backend NEXT remains `P02 — Games / Catalog Foundation`.
