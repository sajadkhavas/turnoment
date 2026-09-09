# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> This file is the operational source of truth for continuing Turnoment without duplicate work. Every frontend page workstream MUST also read `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`. Every public/indexable page workstream or material public copy change MUST additionally read `SEO_FINAL_COPY_PROTOCOL.md` before implementation or final-copy decisions.

Last checkpoint update: `2026-09-09`

## 1. Mandatory continuation protocol

Every working chat/agent MUST:

1. Read this file before implementation.
2. For frontend page work, read `FRONTEND_PAGE_DELIVERY_PROTOCOL.md` before implementation.
3. For every public/indexable page or material public copy change, read `SEO_FINAL_COPY_PROTOCOL.md` before writing or accepting final copy.
4. Verify the current `main` SHA of every repository it will change.
5. Read relevant PR/Issue/phase evidence before repeating work.
6. Work on a dedicated branch for controlled changes.
7. Never claim `DONE / MERGED / FROZEN` from conversation memory alone.
8. Update this file before ending the session, whether work is complete, partial, blocked, or merge-ready.
9. Record exact branch / SHA / PR / CI evidence when available.
10. If a cross-repo API contract or global product state changes, update continuity in both repositories.

Allowed statuses: `PLANNED`, `IN PROGRESS`, `PARTIAL / SAFE CHECKPOINT`, `BLOCKED`, `READY TO MERGE`, `DONE / MERGED / FROZEN`.

## 2. Repository truth

### Frontend

Repository: `sajadkhavas/turnoment`

Current verified implementation `main` SHA before this governance branch:

`6c36325e92dacc3eb60f895afa2b553e3046087a`

Main Frontend Quality Gate:

`34352013348` — PASS

This SHA includes F01 Final Tournament Detail + Registration and the merged F02 Game Detail implementation.

### Backend

Repository: `sajadkhavas/turnoment-backend`

Current verified `main` SHA at the latest backend checkpoint:

`b92213436c5acbc8cb40ce22d2d6e7dbe2b82f86`

Backend phase state:

- `P00 — Backend Foundation & Frontend Contract Baseline` → `DONE / MERGED / FROZEN`
- `P01 — Accounts, Player Identity & Authentication Foundation` → `DONE / MERGED / FROZEN`
- Backend NEXT: `P02 — Games / Catalog Foundation`

Backend P01 authentication truth for the web frontend is Django Session + CSRF + OTP. Do not introduce localStorage bearer-token auth.

## 3. Permanent frontend architecture law

Every new or rebuilt frontend page is implemented as the final frontend version from its first accepted merge.

Required direction:

`Route → validated params/search → route access policy → loader → typed repository/service contract → runtime-validated data → UI`

Production data contracts are defined first. Deterministic fixture implementations may satisfy the same interfaces for local development, automated tests, and visual QA only. Changing environment/data source must not require rebuilding page components or changing user-facing behavior.

Frontend is never the source of truth for competitive/business/user state.

No page created under the final delivery protocol may depend on a later generic phase to add its fundamental:

- SSR architecture
- routing/URL validation
- SEO/indexing policy
- keyword/search-intent research for public pages
- final public copy
- title/meta/canonical strategy
- internal-link/anchor strategy
- supported structured-data decision
- accessibility baseline
- responsive layout
- loading/error/empty/notFound states
- runtime API validation
- production contract mapping

These are acceptance requirements of the page itself.

User-visible product copy MUST NOT expose implementation-stage wording such as waiting for backend/server/API connection, mock/demo/temporary mode, or similar engineering status language.

For public/indexable pages, engineering/domain truth must be translated into natural, accurate, researched people-first product copy. Technical SEO without researched final visible copy is not accepted as SEO-complete.

## 4. Mandatory page workflow

Every frontend page workstream follows this order:

1. exact repository/START_SHA lock
2. official documentation audit
3. design reference audit
4. for public/indexable pages: SEO/search-intent/topic research and final-copy plan
5. final information architecture and state model
6. final route/SSR/SEO/accessibility/contract/copy implementation
7. responsive and visual QA
8. SEO/final-copy QA for public/indexable pages
9. lint/typecheck/contract tests/production build
10. PR/review/merge/post-merge CI
11. continuity update

Full page requirements are in `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`.

Full SEO/copy requirements are in `SEO_FINAL_COPY_PROTOCOL.md`.

Mandatory supporting files:

- `docs/OFFICIAL_FRONTEND_SOURCES.md`
- `docs/DESIGN_REFERENCE_AUDIT_TEMPLATE.md`
- `docs/SEO_CONTENT_RESEARCH_TEMPLATE.md`
- `docs/PAGE_WORKSTREAM_EVIDENCE_TEMPLATE.md`

### Official-source baseline verified for this rule

The page-delivery and SEO protocols are based on current official documentation covering:

- TanStack Start router-first architecture and SSR
- TanStack Start selective SSR
- TanStack Router data loading/search/head management
- TanStack Start environment-variable boundaries
- W3C WCAG 2.2 accessibility requirements
- Google Search Central SEO Starter Guide
- Google Search Central helpful/reliable/people-first content guidance
- Google Search Central title-link guidance
- Google Search Central snippet/meta-description guidance
- Google Search Central link/anchor best practices
- Google Search Central URL/canonical guidance
- Google Search Central structured-data policies
- Google Search Central spam policies

Every page must add page-specific official sources as needed.

### Design research rule

Before implementation, inspect Turnoment's existing design masters first, then research current high-quality real-product interfaces solving the same page problem. Extract information architecture, interaction and responsive patterns without copying branding/assets. Design research is required evidence for new major pages.

### SEO and final-copy research rule

Before final copy is accepted on any public/indexable page:

- define page purpose and audience;
- research current search intent/SERP/content landscape;
- select a primary topic/query cluster and supporting clusters;
- evaluate relevant Persian/English names/spellings/local variants;
- identify content gaps/opportunities;
- check cannibalization against existing Turnoment routes;
- finalize H1/title/meta/heading outline/internal anchors;
- audit every meaningful visible string for natural language, usefulness, engineering jargon, unsupported claims and keyword stuffing;
- record the evidence.

Do not invent search volume, keyword difficulty, rankings, popularity or authority claims.

## 5. Current important frontend page truth

### Homepage

Strong visual reference. Any future material rebuild must follow the final page protocol and, because it is public/indexable, the SEO final-copy protocol.

### Tournament Discovery `/tournaments`

Merged and working with URL-driven filters/search, stable slugs, responsive filtering and SEO metadata. Future material changes follow both final-page and SEO final-copy protocols.

### Tournament Detail `/tournaments/$id`

Status: `DONE / MERGED / FROZEN`.

F01 rebuilt the inherited prototype once under the final frontend delivery protocol. The accepted implementation includes:

- SSR-first route loader and stable semantic slug canonicalization with legacy identifier compatibility
- title/meta/robots/canonical/Open Graph policy
- authoritative lifecycle/capacity/rules/participant/bracket/registration state contracts
- compact tournament event hero and responsive detail information architecture
- overview, rules, participants, bracket preview and gaming-center sections
- desktop sticky registration summary and mobile registration action bar
- explicit loading/error/notFound boundaries
- exactly-one-`<main>` landmark invariant
- sticky section navigation offset below the persistent header
- browser QA at 375/390/430/768/1024/1440

Event JSON-LD was intentionally not shipped because the current production contract does not yet provide the detailed venue PostalAddress required for valid event markup.

Note: F01 was frozen before the stricter SEO final-copy protocol was added. Future material public-copy changes to F01 must use the new SEO protocol. A later performance/content audit may improve F01, but no architectural rebuild is implied.

### Tournament Registration `/tournaments/$id/register`

Status: `DONE / MERGED / FROZEN`.

The route is the final frontend registration flow and includes:

- route-level signed-in session UX policy
- player identity reuse instead of duplicate name/mobile inputs
- solo/team modes and eligible-team selection
- exact Ruleset version acknowledgement
- authoritative `available / already_registered / full / closed / upcoming / ineligible` states
- typed outcomes for `confirmed / payment_required / already_registered / unavailable / stale / validation_error`
- Django Session + CSRF production adapter boundary
- private `noindex,nofollow` indexing policy
- accessible status/error handling and responsive UI

Frontend does not calculate registration eligibility, tournament lifecycle, capacity truth or payment truth.

### Player Dashboard `/dashboard`

Status: `DONE / MERGED / FROZEN`.

Lovable Design Master was accepted visually and productionized with:

- private `noindex,nofollow` policy
- route session UX guard
- replaceable session repository
- Django P01 session contract via `GET /api/v1/auth/me/` with credentials included
- typed Player Dashboard repository boundary
- deterministic fixture data path for development/test/visual QA
- production dashboard contract prepared for `GET /api/v1/me/dashboard/`
- Zod runtime validation
- runtime dashboard contract test
- environment-based adapter selection
- Quality Gate: frozen install + lint + typecheck + dashboard contract test + production build

Competitive rules preserved:

- Tournament Rating and Challenge Rating are separate systems.
- Challenge unlock is based on 30 finalized valid matches, not wins.
- frontend never calculates authoritative winner/rating/eligibility state.
- challenge flow contains no wager/betting/stake mechanics.

### Game Detail `/games/$slug`

Status: `IN PROGRESS — IMPLEMENTATION MERGED / SEO FINAL-COPY GATE PENDING`.

F02 implementation is already merged to `main` and technically green:

- START_SHA: `2ea5df3ecbd3a698fa838a8023994c0fc73e18a1`
- implementation branch: `phase/f02-game-detail`
- final reviewed branch SHA: `a72bdcbcba0b54674adc1e8d6eb6685818e245d4`
- implementation PR: `#30 — F02 — Final Game Detail`
- PR CI: `34351774310` — PASS
- open review threads before merge: `0`
- implementation merge SHA: `6c36325e92dacc3eb60f895afa2b553e3046087a`
- post-merge main CI: `34352013348` — PASS
- responsive/browser QA: PASS at `375 / 390 / 430 / 768 / 1024 / 1440`
- implementation browser artifact id: `10103768778`
- implementation artifact digest: `sha256:b287add1165d611a03e6a98fd35cb5baae6ae67d0bf2856019cfb851105176e8`

Implemented F02 capabilities:

- SSR-first `/games/$slug`
- semantic public game slugs with legacy/internal identifier canonicalization
- typed/runtime-validated Game Detail contract
- Django HTTP adapter boundary for `GET /api/v1/games/{slug}/`
- game hero/platform identity
- tournament discovery
- competitive formats
- ranking state/preview
- supporting gaming centers
- loading/error/notFound/empty states
- dynamic metadata/canonical/OG
- `/games` semantic detail links
- F01 regression browser checks retained

**F02 is not frozen.** Before F02 closeout it must run the newly mandatory `SEO_FINAL_COPY_PROTOCOL.md` because user review identified engineering-style visible wording such as contract/UI/system language. Required NEXT for F02 is current SERP/search-intent/topic research, final copy rewrite, metadata/heading/anchor validation, SEO QA, CI, PR/merge if copy changes, then terminal continuity freeze.

## 6. Player Dashboard completion evidence

Status: `DONE / MERGED / FROZEN`

Lovable/main START_SHA:

`91a924e38194096a26070e11d2a9ae28858d20a3`

Productionization branch:

`phase/player-dashboard-productionization`

Green implementation head:

`022256dd71e84914b44bc2c748107aaee5eb8137`

Implementation CI:

`34325863864` — PASS

Final reviewed branch head:

`8ceb861483da547b20530ec81c89a54733f78093`

PR:

`#4 — Player Dashboard productionization`

PR Quality Gate:

`34326017238` — PASS

Open review threads before merge:

`0`

Implementation merge SHA:

`2375122848b435d052ec926626b3d1f4a9d3f107`

Implementation post-merge main Quality Gate:

`34326094888` — PASS

Closeout PR:

`#5 — Freeze Player Dashboard continuity`

Final frozen main SHA:

`d5e1eadf294211630dacb2f5adfc96ad7bd4d6e3`

Final main Quality Gate:

`34326343712` — PASS

## 7. Final Frontend Page Delivery Protocol evidence

Status: `DONE / MERGED / FROZEN`

START_SHA:

`d5e1eadf294211630dacb2f5adfc96ad7bd4d6e3`

Implementation branch:

`chore/final-page-delivery-protocol`

Final reviewed branch head:

`1d937cb122bdb05c1543e76c876bfe93b53cd4b4`

Created/updated:

- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`
- `docs/OFFICIAL_FRONTEND_SOURCES.md`
- `docs/DESIGN_REFERENCE_AUDIT_TEMPLATE.md`
- `docs/PAGE_WORKSTREAM_EVIDENCE_TEMPLATE.md`
- `PROJECT_CONTINUITY.md`

PR:

`#6 — Enforce final frontend page delivery protocol`

PR Quality Gate:

`34328467961` — PASS

Open review threads before merge:

`0`

Implementation merge SHA:

`c692f900ce290d7925a16724004e47221e7518c2`

Post-merge main Quality Gate:

`34328618238` — PASS

Purpose enforced for all page workstreams:

- official documentation audit before implementation
- design reference audit before implementation
- one-pass final frontend architecture
- no user-facing engineering/waiting/temporary language
- SSR/routing/SEO/accessibility/contracts/states/CI included in page completion
- exact continuity evidence after every complete or incomplete session

## 8. F01 — Tournament Detail & Registration completion evidence

Status: `DONE / MERGED / FROZEN`

START_SHA:

`678c436998417933ee13224754c93cfe71068210`

Implementation branch:

`phase/f01-final-tournament-detail-registration`

Implementation acceptance head:

`3d962cb6eb26a4088618cf052948e78c139f04fe`

Implementation acceptance Quality Gate:

`34346918992` — PASS

Final reviewed branch head:

`ee08a067c82217db4dfe9ef0c6abc7f38d061695`

Exact-head pre-PR Quality Gate:

`34347206840` — PASS

PR:

`#26 — F01 — Final Tournament Detail & Registration`

PR Quality Gate:

`34347532831` — PASS

Open review threads before merge:

`0`

Implementation merge SHA:

`71d2382012b1042ab7667217e8691fad3303f711`

Implementation post-merge main Quality Gate:

`34347780114` — PASS

Browser QA evidence:

- Detail and Registration each verified at `375 / 390 / 430 / 768 / 1024 / 1440`
- 12 screenshots
- representative mobile/desktop captures manually reviewed — PASS
- artifact id: `10102113344`
- artifact digest: `sha256:143f4b4f55904e85cec85a72d6700dc3fe5924eeb2019c0b6101fd1d513aae85`
- SSR exactly-one-`<main>` assertion — PASS

Terminal closeout evidence is recorded in Issue `#8`.

## 9. Final SEO & Copy Protocol governance checkpoint

Status: `IN PROGRESS` until its PR/CI/merge/final-main evidence exists.

START_SHA:

`6c36325e92dacc3eb60f895afa2b553e3046087a`

Branch:

`chore/seo-final-copy-protocol`

Created/updated in this governance workstream:

- `SEO_FINAL_COPY_PROTOCOL.md`
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`
- `docs/OFFICIAL_FRONTEND_SOURCES.md`
- `docs/SEO_CONTENT_RESEARCH_TEMPLATE.md`
- `docs/PAGE_WORKSTREAM_EVIDENCE_TEMPLATE.md`
- `PROJECT_CONTINUITY.md`

Rules now being made mandatory:

- public page SEO is not just title/meta/canonical;
- search intent and topic/keyword research happen before final copy acceptance;
- every meaningful visible string is reviewed as product + SEO copy;
- people-first usefulness is required;
- keyword stuffing/search-engine-first content is forbidden;
- engineering/backend/API/contract/mock language is forbidden when natural user language should be used;
- unique title/H1/meta/heading hierarchy are required;
- descriptive crawlable internal links/anchor text are required;
- structured data must be supported, visible-content accurate and evidence-backed;
- no later generic SEO-copy phase is allowed to finish pages accepted under this protocol;
- site-wide future SEO may analyze performance/new opportunities, but must not be required to finish page fundamentals.

Official baseline includes Google Search SEO Starter Guide, people-first content, title links, snippets, links, URL structure, canonicalization, structured data and spam policies.

## 10. Known constraints / debt

- `/login` is an inherited password-oriented prototype and is not accepted as the final Turnoment auth page. Its replacement must follow the final page protocol and the existing Django Session + CSRF + OTP contract.
- Several inherited ecommerce routes remain in the repository. Do not copy their architecture into Turnoment competitive flows.
- Formatting debt remains separate from correctness lint; avoid massive unrelated formatting diffs inside feature phases.
- Any page explicitly marked `PROTOTYPE — NOT FINAL` must be rebuilt under `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`; do not patch it incrementally into a second temporary layer.
- F01 deliberately does not emit Google Event structured data until the tournament/venue contract exposes a sufficiently detailed postal address.
- F02 implementation is merged/green but its final SEO content/copy closeout is intentionally still open under the new protocol.

## 11. Exact NEXT

### Required immediate engineering NEXT

Complete F02 Game Detail under `SEO_FINAL_COPY_PROTOCOL.md`:

1. research current Game Detail search intent/SERP/topic clusters;
2. select final Persian/English topic/keyword language for game detail pages;
3. rewrite engineering-style visible copy into final people-first SEO-aware product copy;
4. validate H1/title/meta/headings/internal anchors/canonical/robots/structured-data decision;
5. run responsive/technical regression gates;
6. PR/review/merge any required F02 copy changes;
7. final-main CI;
8. freeze F02 continuity and close Issue #29 only after all evidence is green.

After F02 is frozen, independent engineering workstreams may proceed in this order unless a parallel ownership plan is explicitly recorded:

1. My Tournaments
2. My Matches
3. Result Submission
4. Dispute
5. Challenge Hub / Detail
6. Rivalry Detail
7. Auth / OTP
8. Notifications / Settings

Next Lovable Design Master:

`Live Tournament / Bracket`

Lovable output is a design input, not an automatic acceptance. Its final merge must satisfy route/SSR/SEO search-intent/final-copy/indexing/accessibility/contract/CI rules.

## 12. Latest session checkpoint

- Date: `2026-09-09`
- Repo: `sajadkhavas/turnoment`
- Governance workstream: `Final SEO & Copy Protocol`
- Status: `IN PROGRESS`
- START_SHA: `6c36325e92dacc3eb60f895afa2b553e3046087a`
- Branch: `chore/seo-final-copy-protocol`
- Current implementation main before governance merge: `6c36325e92dacc3eb60f895afa2b553e3046087a`
- Current main CI: `34352013348` — PASS
- Backend main at latest checkpoint: `b92213436c5acbc8cb40ce22d2d6e7dbe2b82f86`
- F02 implementation: MERGED / main CI PASS / NOT FROZEN because SEO final-copy gate is now pending
- Exact NEXT for this governance workstream: run branch CI, open/review/merge protocol PR, verify post-merge main CI, then mark governance `DONE / MERGED / FROZEN`.
- Exact NEXT for engineering after governance: complete F02 SEO/final-copy research and polish before F02 closeout.
