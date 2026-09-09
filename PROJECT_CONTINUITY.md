# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> Operational source of truth for continuing Turnoment without duplicate work.
>
> Frontend page work MUST read `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`.
>
> Public/indexable page work or material public copy changes MUST also read `SEO_FINAL_COPY_PROTOCOL.md`.

Last update: `2026-09-09`

## 1. Mandatory continuation law

Every chat/agent MUST:

1. read this file before implementation;
2. read `FRONTEND_PAGE_DELIVERY_PROTOCOL.md` for frontend page work;
3. read `SEO_FINAL_COPY_PROTOCOL.md` for public/indexable pages or material public copy changes;
4. verify current `main` SHA of every repo it will change;
5. read relevant issue/PR/workstream evidence before repeating work;
6. use a dedicated branch;
7. never claim `DONE / MERGED / FROZEN` from chat memory alone;
8. update continuity before ending, even if partial/blocked/merge-ready;
9. record exact branch/SHA/PR/CI evidence;
10. update both repos when a cross-repo contract or global product state changes.

Allowed statuses: `PLANNED`, `IN PROGRESS`, `PARTIAL / SAFE CHECKPOINT`, `BLOCKED`, `READY TO MERGE`, `DONE / MERGED / FROZEN`.

## 2. Repository truth

### Frontend

Repo: `sajadkhavas/turnoment`

Latest accepted `main` before this closeout-only commit:

`451633b1cd8c6a3d8b73920d02e8ff2e6165a76f`

Main Quality Gate:

`34354977487` — PASS

This main includes F01, merged F02 implementation, Final Page Delivery Protocol and Final SEO & Copy Protocol.

### Backend

Repo: `sajadkhavas/turnoment-backend`

Latest verified main:

`b92213436c5acbc8cb40ce22d2d6e7dbe2b82f86`

- P00 → `DONE / MERGED / FROZEN`
- P01 → `DONE / MERGED / FROZEN`
- Backend NEXT → `P02 — Games / Catalog Foundation`

Web auth truth: Django Session + CSRF + OTP. Do not introduce localStorage bearer-token auth.

## 3. Permanent frontend architecture law

Every accepted page is built once as the final frontend version.

Required boundary:

`Route → validated params/search → route access policy → loader → typed repository/service contract → runtime-validated data → UI`

Fixtures are only for development/test/visual QA and must implement the same permanent contract.

Frontend is not authoritative for authentication/session, tournament lifecycle, registration eligibility, capacity, bracket truth, winner/final result, rating changes, challenge eligibility, payment/refund/settlement, moderation or disputes.

No accepted page may require a later generic phase to finish:

- SSR/routing/URL validation
- SEO/indexing
- search-intent/topic research for public pages
- final public copy
- title/meta/canonical
- internal links/anchor strategy
- structured-data decision
- accessibility
- responsive behavior
- loading/error/empty/notFound states
- runtime validation
- production contract mapping

User-visible copy must never expose implementation-stage language such as waiting for backend/server/API, mock/demo/temporary mode, or engineering internals that do not belong in the product.

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
11. continuity update

Mandatory files:

- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`
- `SEO_FINAL_COPY_PROTOCOL.md`
- `docs/OFFICIAL_FRONTEND_SOURCES.md`
- `docs/DESIGN_REFERENCE_AUDIT_TEMPLATE.md`
- `docs/SEO_CONTENT_RESEARCH_TEMPLATE.md`
- `docs/PAGE_WORKSTREAM_EVIDENCE_TEMPLATE.md`

### SEO research law

Before final public copy is accepted:

- define page purpose/audience;
- research current search intent/SERP/content landscape;
- choose primary topic/query cluster and supporting clusters;
- evaluate useful Persian/English spellings/terms/local intent;
- identify content gaps;
- check cannibalization;
- finalize H1/title/meta/headings/internal anchors;
- review all meaningful visible strings for natural language, usefulness, engineering jargon, unsupported claims and keyword stuffing;
- record evidence.

Do not invent search volume, keyword difficulty, rankings, popularity or authority claims.

Official baseline includes current Google Search Central SEO Starter Guide, people-first content, title links, snippets, link best practices, URL structure, canonicalization, structured-data policies and spam policies.

## 5. Current page truth

### Homepage
Strong visual reference. Future material changes follow Final Page + SEO Final Copy protocols.

### Tournament Discovery `/tournaments`
Merged/working with URL-driven filters, stable slugs, responsive filtering and metadata. Future material changes follow both protocols.

### Tournament Detail `/tournaments/$id`
`DONE / MERGED / FROZEN`

F01 accepted implementation includes SSR loader, semantic slug canonicalization, metadata/canonical/OG, authoritative lifecycle/capacity/rules/participants/bracket/registration state, final responsive IA, loading/error/notFound, single-main invariant and QA at 375/390/430/768/1024/1440.

Event JSON-LD was omitted because detailed venue PostalAddress is not yet present in the authoritative contract.

### Tournament Registration `/tournaments/$id/register`
`DONE / MERGED / FROZEN`

Final private registration flow with session UX policy, solo/team modes, Ruleset acknowledgement, authoritative availability/outcome states, Django Session + CSRF boundary, `noindex,nofollow`, accessibility and responsive QA.

### Player Dashboard `/dashboard`
`DONE / MERGED / FROZEN`

Private `noindex,nofollow`; session guard/repository; Django `/api/v1/auth/me/`; typed dashboard repository; runtime validation; contract tests.

Competitive truth: Tournament Rating != Challenge Rating; challenge unlock = 30 finalized valid matches, not wins; no wager/betting/stake mechanics.

### Game Detail `/games/$slug`
`IN PROGRESS — IMPLEMENTATION MERGED / SEO FINAL-COPY GATE PENDING`

F02 implementation evidence:

- START_SHA: `2ea5df3ecbd3a698fa838a8023994c0fc73e18a1`
- branch: `phase/f02-game-detail`
- final reviewed head: `a72bdcbcba0b54674adc1e8d6eb6685818e245d4`
- PR #30
- PR CI: `34351774310` — PASS
- review threads: `0`
- merge SHA: `6c36325e92dacc3eb60f895afa2b553e3046087a`
- post-merge main CI: `34352013348` — PASS
- browser QA: PASS at `375/390/430/768/1024/1440`
- artifact id: `10103768778`
- digest: `sha256:b287add1165d611a03e6a98fd35cb5baae6ae67d0bf2856019cfb851105176e8`

Implemented: SSR `/games/$slug`, semantic game slugs, runtime contract, Django HTTP adapter boundary, game hero/platforms, tournament discovery, competitive formats, ranking state, supporting centers, loading/error/notFound/empty, metadata/canonical/OG and semantic links from `/games`.

F02 is intentionally NOT frozen. User review found engineering-style visible copy. It must now complete current SEO/search-intent/topic research, final people-first copy, title/H1/meta/headings/anchor validation and SEO QA under `SEO_FINAL_COPY_PROTOCOL.md` before Issue #29 can close.

## 6. Important completion evidence

### Player Dashboard
- final reviewed head: `8ceb861483da547b20530ec81c89a54733f78093`
- PR #4
- PR CI `34326017238` PASS
- threads `0`
- merge `2375122848b435d052ec926626b3d1f4a9d3f107`
- post-merge CI `34326094888` PASS
- closeout PR #5
- frozen main `d5e1eadf294211630dacb2f5adfc96ad7bd4d6e3`
- final CI `34326343712` PASS

### Final Frontend Page Delivery Protocol
- START `d5e1eadf294211630dacb2f5adfc96ad7bd4d6e3`
- final reviewed head `1d937cb122bdb05c1543e76c876bfe93b53cd4b4`
- PR #6
- PR CI `34328467961` PASS
- threads `0`
- merge `c692f900ce290d7925a16724004e47221e7518c2`
- post-merge CI `34328618238` PASS

### F01 Tournament Detail + Registration
- START `678c436998417933ee13224754c93cfe71068210`
- final reviewed head `ee08a067c82217db4dfe9ef0c6abc7f38d061695`
- PR #26
- PR CI `34347532831` PASS
- threads `0`
- merge `71d2382012b1042ab7667217e8691fad3303f711`
- post-merge CI `34347780114` PASS
- terminal closeout evidence: Issue #8

## 7. Final SEO & Copy Protocol governance

`DONE / MERGED / FROZEN` once this documentation-only closeout PR is merged; terminal closeout evidence is recorded in Issue #31.

- START_SHA: `6c36325e92dacc3eb60f895afa2b553e3046087a`
- implementation branch: `chore/seo-final-copy-protocol`
- final reviewed head: `f1e1765b795ede96803ab314d5af616cb219fbdb`
- tracking Issue #31
- implementation PR #32
- PR Quality Gate: `34354697661` — PASS
- open review threads: `0`
- implementation merge: `451633b1cd8c6a3d8b73920d02e8ff2e6165a76f`
- implementation post-merge main CI: `34354977487` — PASS
- closeout branch: `closeout/seo-final-copy-protocol`

Permanent SEO law now enforced:

- public SEO is not merely title/meta/canonical;
- research search intent/topic clusters before final copy;
- review all meaningful visible strings as final product + SEO copy;
- prioritize people-first usefulness;
- prohibit keyword stuffing/search-engine-first copy/hidden SEO text/unsupported claims;
- prohibit visible engineering/backend/API/contract/mock language when natural product language is appropriate;
- require unique H1/title/meta and meaningful heading hierarchy;
- require descriptive crawlable internal anchors;
- structured data must be supported and match visible authoritative content;
- no later generic SEO-copy phase may be required to finish accepted pages.

## 8. Known constraints

- `/login` remains an inherited password-oriented prototype and must be rebuilt under final page protocol + Django Session/CSRF/OTP truth.
- inherited ecommerce routes remain; do not copy their architecture into Turnoment competitive flows.
- formatting debt stays separate from correctness phases.
- explicit prototypes must be rebuilt under final protocol, not layered with another temporary implementation.
- F02 remains open specifically for SEO final-copy completion.

## 9. Exact NEXT

Immediate engineering NEXT: **finish F02 Game Detail under the new SEO protocol**.

Required steps:

1. current search-intent/SERP/topic research;
2. choose final Persian/English topic language;
3. rewrite engineering-style copy into people-first SEO-aware product copy;
4. validate H1/title/meta/headings/internal anchors/canonical/robots/structured-data decision;
5. run technical/responsive regressions;
6. PR/review/merge copy changes if needed;
7. final-main CI;
8. freeze F02 and close Issue #29.

After F02:

1. My Tournaments
2. My Matches
3. Result Submission
4. Dispute
5. Challenge Hub / Detail
6. Rivalry Detail
7. Auth / OTP
8. Notifications / Settings

Next Lovable Design Master: `Live Tournament / Bracket`.

Lovable output is design input only and must satisfy final route/SSR/search-intent/final-copy/indexing/accessibility/contracts/CI rules before acceptance.

## 10. Latest session checkpoint

- governance workstream: Final SEO & Copy Protocol
- implementation: MERGED / post-merge green
- closeout branch: `closeout/seo-final-copy-protocol`
- implementation PR #32
- PR CI `34354697661` PASS
- implementation merge `451633b1cd8c6a3d8b73920d02e8ff2e6165a76f`
- post-merge CI `34354977487` PASS
- tracking Issue #31
- exact governance NEXT: merge this closeout, verify terminal main CI, record terminal evidence in Issue #31 and close completed
- exact engineering NEXT: F02 SEO/final-copy research and polish
