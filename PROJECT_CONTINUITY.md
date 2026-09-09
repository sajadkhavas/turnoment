# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> This file is the operational source of truth for continuing Turnoment without duplicate work. Every frontend page workstream MUST also read `FRONTEND_PAGE_DELIVERY_PROTOCOL.md` before implementation.

Last checkpoint update: `2026-09-09`

## 1. Mandatory continuation protocol

Every working chat/agent MUST:

1. Read this file before implementation.
2. For frontend page work, read `FRONTEND_PAGE_DELIVERY_PROTOCOL.md` before implementation.
3. Verify the current `main` SHA of every repository it will change.
4. Read relevant PR/Issue/phase evidence before repeating work.
5. Work on a dedicated branch for controlled changes.
6. Never claim `DONE / MERGED / FROZEN` from conversation memory alone.
7. Update this file before ending the session, whether work is complete, partial, blocked, or merge-ready.
8. Record exact branch / SHA / PR / CI evidence when available.
9. If a cross-repo API contract or global product state changes, update continuity in both repositories.

Allowed statuses: `PLANNED`, `IN PROGRESS`, `PARTIAL / SAFE CHECKPOINT`, `BLOCKED`, `READY TO MERGE`, `DONE / MERGED / FROZEN`.

## 2. Repository truth

### Frontend

Repository: `sajadkhavas/turnoment`

Verified `main` SHA before the active protocol branch:

`d5e1eadf294211630dacb2f5adfc96ad7bd4d6e3`

Final main Quality Gate for the Player Dashboard closeout:

`34326343712` — PASS

Current protocol branch:

`chore/final-page-delivery-protocol`

### Backend

Repository: `sajadkhavas/turnoment-backend`

Current verified `main` SHA:

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
- metadata/canonical strategy
- accessibility baseline
- responsive layout
- loading/error/empty/notFound states
- runtime API validation
- production contract mapping

These are acceptance requirements of the page itself.

User-visible product copy MUST NOT expose implementation-stage wording such as waiting for backend/server/API connection, mock/demo/temporary mode, or similar engineering status language.

## 4. Mandatory page workflow

Every frontend page workstream follows this order:

1. exact repository/START_SHA lock
2. official documentation audit
3. design reference audit
4. final information architecture and state model
5. final route/SSR/SEO/accessibility/contract implementation
6. responsive and visual QA
7. lint/typecheck/contract tests/production build
8. PR/review/merge/post-merge CI
9. continuity update

Full requirements are in `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`.

### Official-source baseline verified for this rule

The protocol was based on current official documentation covering:

- TanStack Start router-first architecture and SSR
- TanStack Start selective SSR
- TanStack Router data loading/search/head management
- TanStack Start environment-variable boundaries
- W3C WCAG 2.2 accessibility requirements
- Google Search Central canonicalization and structured-data policies

Every page must add page-specific official sources as needed.

### Design research rule

Before implementation, inspect Turnoment's existing design masters first, then research current high-quality real-product interfaces solving the same page problem. Extract information architecture, interaction and responsive patterns without copying branding/assets. Design research is required evidence for new major pages.

## 5. Current important frontend page truth

### Homepage

Strong visual reference. Any future material rebuild must follow the final page protocol.

### Tournament Discovery `/tournaments`

Merged and working with URL-driven filters/search, stable slugs, responsive filtering and SEO metadata. Future material changes follow the final page protocol.

### Tournament Detail `/tournaments/$id`

Status: `PROTOTYPE — NOT FINAL`.

It predates the final page delivery rule and must be rebuilt once as the final implementation. The accepted rebuild must include permanent route/data contract, registration architecture, SSR/SEO/indexing, rules/participants/bracket states, accessibility, responsive QA and quality gates in the same workstream.

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

## 7. Known constraints / debt

- `/login` is an inherited password-oriented prototype and is not accepted as the final Turnoment auth page. Its replacement must follow the final page protocol and the existing Django Session + CSRF + OTP contract.
- Several inherited ecommerce routes remain in the repository. Do not copy their architecture into Turnoment competitive flows.
- Formatting debt remains separate from correctness lint; avoid massive unrelated formatting diffs inside feature phases.
- Any page explicitly marked `PROTOTYPE — NOT FINAL` must be rebuilt under `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`; do not patch it incrementally into a second temporary layer.

## 8. Exact NEXT

Independent engineering workstreams that may proceed under the final page protocol:

1. Final Tournament Detail + Registration
2. Game Detail
3. My Tournaments
4. My Matches
5. Result Submission
6. Dispute
7. Challenge Hub / Detail
8. Rivalry Detail
9. Auth / OTP
10. Notifications / Settings

Next Lovable Design Master:

`Live Tournament / Bracket`

Lovable output is a design input, not an automatic acceptance. Its final merge must satisfy the same route/SSR/SEO/indexing/accessibility/contract/CI rules.

## 9. Active protocol-registration workstream

Workstream: `Final Frontend Page Delivery Protocol`

Status: `IN PROGRESS`

START_SHA:

`d5e1eadf294211630dacb2f5adfc96ad7bd4d6e3`

Branch:

`chore/final-page-delivery-protocol`

Created:

`FRONTEND_PAGE_DELIVERY_PROTOCOL.md`

Purpose:

- make official-document review mandatory before implementation
- make design-reference research mandatory before implementation
- make every new page a one-pass final frontend implementation
- prohibit user-facing engineering/waiting/temporary language
- make SSR/routing/SEO/accessibility/contracts/states/CI part of page completion
- ensure every chat leaves exact continuity evidence

Blockers: `none`

Exact NEXT: `run Quality Gate for this documentation branch, open/review/merge the protocol PR, verify post-merge main CI, update continuity closeout if required, then start page workstreams only under this protocol.`
