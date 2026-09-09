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
4. read `docs/ROUTE_COMPLIANCE_REGISTRY.md` before modifying or accepting any existing route;
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

Latest accepted `main` after F03 implementation merge:

`bc294e8dbdd6c1d61f11203b8c4e0cfe96094d30`

Latest post-implementation-merge main Quality Gate:

`34385716082` — PASS

This main includes:

- F01 Tournament Detail + Registration
- F02 technical Game Detail implementation
- F02 mandatory SEO/final-copy recertification
- F02 terminal closeout / FINAL_CURRENT promotion
- F03 final private My Tournaments implementation + acceptance evidence
- Final Frontend Page Delivery Protocol
- Final SEO & Copy Protocol

Active frontend closeout:

- F03 — My Tournaments `/dashboard/tournaments`
- implementation status: `MERGED`
- closeout status: `IN PROGRESS`
- START_SHA: `4afb49e913d5fd7e2420031ae957fde2e79e3e8a`
- implementation branch: `phase/f03-my-tournaments`
- implementation PR: `#39` — merged
- implementation merge: `bc294e8dbdd6c1d61f11203b8c4e0cfe96094d30`
- closeout branch: `closeout/f03-my-tournaments`
- tracking Issue: `#38` — must remain open until terminal closeout main CI is green
- evidence: `docs/workstreams/F03_MY_TOURNAMENTS.md`, `docs/workstreams/F03_ACCEPTANCE_EVIDENCE.md`, `docs/workstreams/F03_CLOSEOUT.md`

### Backend

Repo: `sajadkhavas/turnoment-backend`

Latest verified main:

`cd47fff8b82359b12d86fad10735a2e9fa52472d`

- P00 → `DONE / MERGED / FROZEN`
- P01 → `DONE / MERGED / FROZEN`
- F03 cross-repo contract alignment docs → merged; backend implementation was **not** started by F03
- My Tournaments runtime integration remains `FRONTEND MOCK / BACKEND PENDING`
- Backend NEXT → `P02 — Games / Catalog Foundation`

Web auth truth: Django Session + CSRF + OTP. Do not introduce localStorage bearer-token auth.

## 3. Permanent frontend law

Every accepted page is built once as the final frontend version.

Required boundary:

`Route → validated params/search → route access policy → loader → typed repository/service contract → runtime-validated data → UI`

Fixtures exist only for development/test/visual QA and implement the same permanent contract.

Frontend is not authoritative for auth/session, tournament lifecycle, registration eligibility, capacity, bracket truth, winner/final result, rating change, challenge eligibility, payment/refund/settlement, moderation or disputes.

No accepted page may need a later generic phase to finish SSR/routing, SEO/indexing, search-intent/topic research, final copy, title/meta/canonical, internal links, structured-data decision, accessibility, responsive behavior, complete states, runtime validation or production contract mapping.

User-visible copy must never expose development/engineering-stage language such as waiting for backend/server/API, mock/demo/temporary mode, contract/adapter/UI-state jargon when natural product language is appropriate.

## 4. Mandatory page workflow

1. exact repository/START_SHA lock
2. official documentation audit
3. design reference audit
4. public pages: SEO/search-intent/topic research + final-copy plan
5. final information architecture/state model
6. final route/SSR/SEO/accessibility/contracts/copy
7. responsive/visual QA
8. public pages: SEO/final-copy QA
9. lint/typecheck/contracts/build
10. PR/review/merge/post-merge CI
11. continuity + route-registry update

Mandatory supporting files:

- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`
- `SEO_FINAL_COPY_PROTOCOL.md`
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`
- `docs/OFFICIAL_FRONTEND_SOURCES.md`
- `docs/DESIGN_REFERENCE_AUDIT_TEMPLATE.md`
- `docs/SEO_CONTENT_RESEARCH_TEMPLATE.md`
- `docs/PAGE_WORKSTREAM_EVIDENCE_TEMPLATE.md`

## 5. SEO/final-copy law

Before final public copy is accepted:

- define purpose/audience;
- research current search intent/SERP/content landscape;
- choose primary/supporting topic clusters;
- evaluate useful Persian/English spellings/terms/local intent;
- identify content gaps;
- check cannibalization;
- finalize H1/title/meta/headings/internal anchors;
- audit visible strings for natural language, usefulness, engineering jargon, unsupported claims and keyword stuffing;
- record evidence.

Do not invent search volume, keyword difficulty, rankings, popularity or authority claims.

Private/noindex account pages do not require public SERP/keyword research, but final natural copy, accessibility and production-contract rules still apply.

## 6. Current accepted / active page truth

### Tournament Detail `/tournaments/$id`

Status: `DONE / MERGED / FROZEN — FINAL_PRE_SEO`

F01 architecture/contract/SSR/responsive acceptance is final. It was frozen before the stricter SEO final-copy protocol; material public-copy changes require SEO recertification.

### Tournament Registration `/tournaments/$id/register`

Status: `DONE / MERGED / FROZEN — FINAL_PRIVATE`

Final private registration flow with Django Session + CSRF boundary, authoritative states, accessibility/responsive QA and `noindex,nofollow`.

### Player Dashboard `/dashboard`

Status: `DONE / MERGED / FROZEN — FINAL_PRIVATE`

Private noindex dashboard with session guard/repository/runtime contract/tests.

Competitive truth:

- Tournament Rating and Challenge Rating are separate;
- challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics.

### Game Detail `/games/$slug`

Status: `DONE / MERGED / FROZEN — FINAL_CURRENT`

Original technical implementation:

- original START: `2ea5df3ecbd3a698fa838a8023994c0fc73e18a1`
- branch: `phase/f02-game-detail`
- reviewed head: `a72bdcbcba0b54674adc1e8d6eb6685818e245d4`
- PR #30
- PR CI `34351774310` — PASS
- threads `0`
- merge `6c36325e92dacc3eb60f895afa2b553e3046087a`
- post-merge CI `34352013348` — PASS

SEO/final-copy recertification:

- SEO START_SHA: `ad6daedaa900e3b79969295e6ed16e7cb8302e9f`
- branch: `phase/f02-seo-final-copy`
- final reviewed head: `0558e0ef9290c3d84429e65df06dd4e1ab1a74fa`
- exact-head branch CI `34372783510` — PASS
- SEO PR #34 — MERGED
- PR CI `34373132933` — PASS
- review threads `0`
- SEO/copy merge `21c16a95eb6dd31e2f23d8bf1b15ec50d168d3b2`
- post-merge main CI `34373382549` — PASS

Terminal closeout:

- closeout branch: `closeout/f02-game-detail-seo-final-copy`
- closeout head: `9dcff39702f6badde42513c213ee2b7b4277feda`
- closeout PR #35 — MERGED
- closeout PR CI `34374064620` — PASS
- closeout review threads `0`
- final frozen main: `4afb49e913d5fd7e2420031ae957fde2e79e3e8a`
- terminal main Quality Gate `34374298544` — PASS
- tracking Issue #29 — closed completed

Research/QA:

- `docs/workstreams/F02_GAME_DETAIL_SEO_RESEARCH.md`
- `docs/workstreams/F02_GAME_DETAIL.md`
- current Iranian/regional search-intent/topic research completed
- content-gap + cannibalization map completed
- final visible copy and metadata completed
- final-copy regression tests completed
- responsive/browser QA completed at `375 / 390 / 430 / 768 / 1024 / 1440`
- manually reviewed Game Detail captures at `375 / 430 / 768 / 1440` — PASS
- reviewed artifact `10106806417`
- digest `sha256:2c941652f83398f8fb6cb2f328a31b5c3995104c57c04d5a3e4996ce5d6ec5c7`

### F03 — My Tournaments `/dashboard/tournaments`

Closeout target status: `DONE / MERGED / FROZEN — FINAL_PRIVATE`

> The closeout commit cannot contain its own future merge SHA/terminal main CI. F03 may only be reported terminally complete after Issue #38 records the closeout merge/frozen main SHA and a green terminal post-closeout main Quality Gate.

Identity / implementation:

- START_SHA: `4afb49e913d5fd7e2420031ae957fde2e79e3e8a`
- implementation branch: `phase/f03-my-tournaments`
- tracking Issue #38 — reopened after GitHub auto-closed it at implementation merge; it must remain open through terminal closeout
- pre-implementation evidence: `docs/workstreams/F03_MY_TOURNAMENTS.md`
- acceptance evidence: `docs/workstreams/F03_ACCEPTANCE_EVIDENCE.md`
- accepted implementation/evidence head: `98c92846b79d1d715d16b3db9ad762a54e7fa137`
- implementation PR #39 — MERGED
- implementation merge SHA: `bc294e8dbdd6c1d61f11203b8c4e0cfe96094d30`
- post-implementation-merge main Quality Gate `34385716082` — PASS
- closeout branch: `closeout/f03-my-tournaments`
- closeout record: `docs/workstreams/F03_CLOSEOUT.md`

Governance / design / source audit:

- mandatory frontend root laws read before implementation;
- route registry read before modifying the placeholder route;
- TanStack authenticated-route/data-loading/search-param docs reviewed;
- WCAG 2.2 reviewed;
- existing Dashboard/F01 architecture audited and reused instead of duplicated;
- external joined-tournament/check-in/team tournament patterns reviewed;
- public SEO research correctly treated as N/A because this is authenticated `noindex,nofollow`;
- backend root laws read before cross-repo alignment.

Final architecture / product truth:

- placeholder replaced by validated URL search for state/game/page;
- parent `/dashboard` Session guard reused;
- `MyTournamentsRepository` with deterministic fixture adapter and Django HTTP adapter;
- production adapter maps to the already-planned `GET /api/v1/me/tournaments/` with `credentials: include`;
- Zod runtime validation + cross-field integrity checks;
- lifecycle/registration/check-in/result/next-action truth remains contract-authoritative;
- team + individual participation supported;
- loading/normal/empty/filtered-empty/error/pagination states implemented;
- filter/pagination navigation preserves browser Back/Forward;
- no engineering/mock/backend-waiting wording in player-facing UI.

Quality / visual evidence:

- implementation acceptance head `66beb620ced7003b6cbc6b9447aab35ccd15d086`
- exact-head Quality Gate `34380756688` — PASS
- browser artifact `10115803738`
- artifact digest `sha256:0e3a35d6d2809f39753a73b174e9fb29f0b42af2b5333a70792093bd4086841c`
- responsive captures at `375 / 390 / 430 / 768 / 1024 / 1440`
- manual review at `375 / 430 / 768 / 1024 / 1440` — PASS
- final evidence head `98c92846b79d1d715d16b3db9ad762a54e7fa137`
- evidence-head push Quality Gate `34385385299` — PASS
- PR Quality Gate `34385390759` — PASS
- review threads immediately before implementation merge: `0`

Cross-repo truth:

- backend owner `registrations/tournaments` and endpoint family existed before F03;
- backend alignment PR #10 merged;
- backend alignment main `cd47fff8b82359b12d86fad10735a2e9fa52472d`;
- backend main Quality Gate `34380281593` — PASS;
- runtime integration remains `FRONTEND MOCK / BACKEND PENDING` until its owning backend phase is actually implemented;
- this does not block final frontend architecture acceptance and does not change backend phase order.

Exact F03 closeout next:

1. finish continuity/route-registry reconciliation on `closeout/f03-my-tournaments`;
2. require closeout exact-head + PR Quality Gates green and review threads `0`;
3. merge closeout;
4. require terminal post-closeout main Quality Gate green;
5. record closeout merge/frozen main SHA + terminal main CI in Issue #38;
6. close Issue #38 as completed only then.

## 7. Route compliance registry

Canonical inventory:

`docs/ROUTE_COMPLIANCE_REGISTRY.md`

### `FINAL_CURRENT`
- `/games/$slug`

### `FINAL_PRIVATE`
- `/dashboard`
- `/dashboard/tournaments` — F03 terminal status is confirmed by Issue #38 only after closeout merge + terminal main CI
- `/tournaments/$id/register`

### `FINAL_PRE_SEO`
- `/tournaments/$id`

### `NEEDS_RECERTIFICATION`
- `/`
- `/tournaments`
- `/games`
- `/centers`
- `/centers/$id`
- `/ranking`
- `/players/$username`
- `/host`
- `/rules`
- `/dashboard/profile`

### `REBUILD`
- `/login`
- `/register`

### `PLACEHOLDER`
- `/dashboard/matches`
- `/dashboard/challenges`
- `/dashboard/rivalries`
- `/dashboard/achievements`
- `/dashboard/notifications`
- `/dashboard/settings`
- `/dashboard/teams`

### `LEGACY_REVIEW`
Inherited ecommerce/service/general routes remain explicitly listed in the registry and must not be used as Turnoment architecture references.

## 8. Governance evidence

### Final Frontend Page Delivery Protocol

`DONE / MERGED / FROZEN`

- PR #6
- PR CI `34328467961` PASS
- merge `c692f900ce290d7925a16724004e47221e7518c2`
- post-merge CI `34328618238` PASS

### Final SEO & Copy Protocol

`DONE / MERGED / FROZEN`

- implementation PR #32
- PR CI `34354697661` PASS
- threads `0`
- implementation merge `451633b1cd8c6a3d8b73920d02e8ff2e6165a76f`
- post-merge CI `34354977487` PASS
- closeout PR #33
- closeout merge / frozen main `ad6daedaa900e3b79969295e6ed16e7cb8302e9f`
- terminal main CI `34355802846` PASS
- Issue #31 closed completed

## 9. Known constraints

- `/login` and `/register` are inherited password-oriented flows and must be rebuilt to OTP/session truth.
- remaining dashboard placeholder routes contain prohibited future/service-connection language and must be replaced by final product pages.
- inherited ecommerce routes remain; do not copy them into competitive flows.
- public competitive routes predating current law remain visible in the route registry until recertified.
- F03 defines the permanent frontend My Tournaments contract and production adapter mapping; backend runtime delivery remains independently governed and every private API response must authorize server-side.
- F03 cross-repo runtime status remains `FRONTEND MOCK / BACKEND PENDING`; never reinterpret frontend finality as backend domain completion.

## 10. Exact NEXT

After F03 terminal closeout is confirmed in Issue #38, frontend engineering NEXT is:

1. **My Matches `/dashboard/matches`**
2. Result Submission
3. Dispute
4. Challenge Hub / Detail
5. Rivalry Detail
6. Auth / OTP
7. Notifications / Settings

Backend NEXT remains `P02 — Games / Catalog Foundation`.

Next Lovable Design Master remains `Live Tournament / Bracket`.
