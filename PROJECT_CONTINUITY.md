# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> This file is the operational source of truth for continuing Turnoment without duplicate work. Read it before making changes and update it before ending every session, even when the work is incomplete or blocked.

Last checkpoint update: `2026-09-09`

## 1. Mandatory continuation protocol

Every working chat/agent MUST:

1. Read this file before implementation.
2. Verify the current `main` SHA of every repository it will change.
3. Read the relevant phase/PR/Issue evidence before repeating work.
4. Work on a dedicated branch for controlled changes.
5. Never claim `DONE / MERGED / FROZEN` from conversation memory alone.
6. Update this file before ending the session, whether work is complete, partial or blocked.
7. Record exact branch / SHA / PR / CI evidence when available.
8. If a cross-repo API contract or global product state changes, update continuity in both repositories.

Allowed statuses: `PLANNED`, `IN PROGRESS`, `PARTIAL / SAFE CHECKPOINT`, `BLOCKED`, `READY TO MERGE`, `DONE / MERGED / FROZEN`.

## 2. Repository truth

### Frontend

Repository: `sajadkhavas/turnoment`

Latest accepted implementation merge on `main` before this documentation freeze:

`2375122848b435d052ec926626b3d1f4a9d3f107`

Post-merge Frontend Quality Gate:

`34326094888` — PASS

This SHA includes the Lovable Player Dashboard visual design plus the accepted productionization layer.

### Backend

Repository: `sajadkhavas/turnoment-backend`

Current verified `main` SHA:

`b92213436c5acbc8cb40ce22d2d6e7dbe2b82f86`

Backend phase state:

- `P00 — Backend Foundation & Frontend Contract Baseline` → `DONE / MERGED / FROZEN`
- `P01 — Accounts, Player Identity & Authentication Foundation` → `DONE / MERGED / FROZEN`
- Backend NEXT: `P02 — Games / Catalog Foundation`

Backend P01 authentication truth for the web frontend is Django Session + CSRF + OTP. Do not introduce localStorage bearer-token auth.

## 3. Product architecture law

Frontend is never the source of truth for competitive/business/user state.

Required direction:

`Route → validated params/search → route guard where needed → loader → typed repository → active adapter → runtime-validated data → UI`

Parallel-development adapter model:

`Mock adapter now → Django HTTP adapter later`

Switching adapters must not require rewriting page components. Public important pages should be SSR-friendly and SEO-aware from day one. Private pages must be explicitly `noindex` and protected at the route UX layer while Django/API authorization remains the security boundary.

## 4. Current important frontend page truth

### Homepage

Strong visual reference. Backend/data-contract productionization remains a later controlled task.

### Tournament Discovery `/tournaments`

Visual discovery page is merged and working with URL-driven filters/search, stable slugs, responsive filtering and SEO metadata.

### Tournament Detail `/tournaments/$id`

Status: `PROTOTYPE — NOT FINAL`.

Still must replace fake local registration/payment copy and complete rules/participants/bracket/registration architecture in its own workstream.

### Player Dashboard `/dashboard`

Status: `DONE / MERGED / FROZEN`.

Lovable Design Master was accepted visually and then productionized without redesigning the accepted UI.

Final accepted architecture includes:

- private route `noindex,nofollow`
- `beforeLoad` session UX guard
- replaceable `PlayerSessionRepository`
- mock session adapter for current design/development
- Django P01 session adapter using `GET /api/v1/auth/me/` with `credentials: include`
- typed Player Dashboard repository boundary
- mock dashboard adapter for parallel frontend development
- Django dashboard adapter prepared for `GET /api/v1/me/dashboard/`
- Zod runtime validation for dashboard payloads
- runtime dashboard contract test
- `VITE_DATA_ADAPTER=mock|django` adapter selection
- `VITE_API_BASE_URL` documented as public configuration only
- Quality Gate: frozen install + lint + typecheck + dashboard contract test + production build

Competitive rules preserved:

- Tournament Rating and Challenge Rating are separate systems.
- Challenge unlock is based on 30 finalized valid matches, not wins.
- frontend never calculates authoritative winner/rating/eligibility state.
- challenge flow contains no wager/betting/stake mechanics.

## 5. Player Dashboard completion evidence

Status: `DONE / MERGED / FROZEN`

Lovable/main START_SHA:

`91a924e38194096a26070e11d2a9ae28858d20a3`

Productionization branch:

`phase/player-dashboard-productionization`

Green implementation head before final continuity commit:

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

Post-merge main Quality Gate:

`34326094888` — PASS

Closeout branch:

`chore/player-dashboard-continuity-freeze`

The route guard is intentionally not treated as the security boundary. Django/API endpoints must authorize private requests independently.

## 6. Known constraints / debt

- Player Dashboard uses the mock data adapter by default until `GET /api/v1/me/dashboard/` exists and is accepted in Django.
- `/login` is still the old visual/password prototype and does not represent final OTP UX; Auth/OTP frontend productionization remains a separate workstream.
- Several inherited ecommerce routes remain in the repository. Do not copy their architecture into Turnoment competitive flows.
- Formatting debt remains separate from correctness lint; avoid massive unrelated formatting diffs inside feature phases.

## 7. Exact NEXT

Engineering workstreams that can proceed independently:

1. Final Tournament Detail + Registration Contract
2. Game Detail productionization
3. My Tournaments
4. Result Submission
5. Dispute
6. Challenge Hub / Detail
7. Rivalry Detail
8. Auth / OTP frontend integration
9. Notifications / Settings

Next Lovable Design Master:

`Live Tournament / Bracket`

Lovable output is never automatically production-final; it must pass the same branch/repository/runtime-validation/CI process.

## 8. Latest session checkpoint

- Date: `2026-09-09`
- Repo: `sajadkhavas/turnoment`
- Completed workstream: `Player Dashboard Productionization`
- Status: `DONE / MERGED / FROZEN`
- Accepted implementation main SHA before closeout: `2375122848b435d052ec926626b3d1f4a9d3f107`
- Post-merge CI: `34326094888` — PASS
- Closeout branch: `chore/player-dashboard-continuity-freeze`
- Backend main: `b92213436c5acbc8cb40ce22d2d6e7dbe2b82f86`
- Blockers: `none`
- Exact NEXT for Lovable: `Live Tournament / Bracket`
- Exact NEXT for engineering: start one of the independent workstreams above from verified current main after this closeout is merged.
