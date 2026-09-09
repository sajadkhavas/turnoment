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

Latest accepted `main` before F02 closeout:

`21c16a95eb6dd31e2f23d8bf1b15ec50d168d3b2`

Latest main Quality Gate:

`34373382549` — PASS

This main includes:

- F01 Tournament Detail + Registration
- F02 technical Game Detail implementation
- F02 mandatory SEO/final-copy recertification
- Final Frontend Page Delivery Protocol
- Final SEO & Copy Protocol

### Backend

Repo: `sajadkhavas/turnoment-backend`

Latest verified main:

`b92213436c5acbc8cb40ce22d2d6e7dbe2b82f86`

- P00 → `DONE / MERGED / FROZEN`
- P01 → `DONE / MERGED / FROZEN`
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

## 6. Current accepted page truth

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

> The closeout commit cannot contain its own future merge SHA/terminal main CI. Those terminal self-referential values are recorded in Issue #29, and no chat may claim final completion until they are green.

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
- SEO PR #34
- PR CI `34373132933` — PASS
- review threads `0`
- SEO/copy merge `21c16a95eb6dd31e2f23d8bf1b15ec50d168d3b2`
- post-merge main CI `34373382549` — PASS
- closeout branch: `closeout/f02-game-detail-seo-final-copy`
- tracking Issue #29

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

The closeout promotes `/games/$slug` to `FINAL_CURRENT`. Exact closeout PR/merge/terminal main CI are recorded in Issue #29 once they exist.

## 7. Route compliance registry

Canonical inventory:

`docs/ROUTE_COMPLIANCE_REGISTRY.md`

### `FINAL_CURRENT`
- `/games/$slug`

### `FINAL_PRIVATE`
- `/dashboard`
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
- `/dashboard/tournaments`
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
- dashboard placeholder routes contain prohibited future/service-connection language and must be replaced by final product pages.
- inherited ecommerce routes remain; do not copy them into competitive flows.
- public competitive routes predating current law remain visible in the route registry until recertified.

## 10. Exact NEXT

After terminal F02 closeout, frontend engineering NEXT is:

1. **My Tournaments** `/dashboard/tournaments`
2. My Matches
3. Result Submission
4. Dispute
5. Challenge Hub / Detail
6. Rivalry Detail
7. Auth / OTP
8. Notifications / Settings

Backend NEXT remains `P02 — Games / Catalog Foundation`.

Next Lovable Design Master remains `Live Tournament / Bracket`.
