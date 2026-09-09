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

Allowed statuses:

- `PLANNED`
- `IN PROGRESS`
- `PARTIAL / SAFE CHECKPOINT`
- `BLOCKED`
- `READY TO MERGE`
- `DONE / MERGED / FROZEN`

## 2. Repository truth

### Frontend

Repository: `sajadkhavas/turnoment`

Current `main` SHA before the active productionization merge:

`91a924e38194096a26070e11d2a9ae28858d20a3`

That commit is the latest Lovable Player Dashboard result (`تکمیل داشبورد بازیکن`).

Main quality run for the Lovable result:

`34324869851` — PASS, but the inherited workflow at that point checked build only.

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

Required frontend direction:

`Route → validated params/search → route guard where needed → loader → typed repository → active adapter → runtime-validated data → UI`

Parallel-development adapter model:

`Mock adapter now → Django HTTP adapter later`

Switching adapters must not require rewriting page components.

Public important pages should be SSR-friendly and SEO-aware from day one. Private pages must be explicitly `noindex` and protected at the route UX layer while Django/API authorization remains the actual security boundary.

## 4. Current important frontend page truth

### Homepage

Strong visual reference. Backend/data-contract productionization remains a later controlled task.

### Tournament Discovery `/tournaments`

Visual discovery page is merged and working with URL-driven filters/search, stable slugs, responsive filtering and SEO metadata.

### Tournament Detail `/tournaments/$id`

Status: `PROTOTYPE — NOT FINAL`.

Still must replace fake local registration/payment copy and complete rules/participants/bracket/registration architecture in its own workstream.

### Player Dashboard `/dashboard`

Lovable visual Design Master is present on `main`.

Active productionization workstream upgrades it to the permanent frontend architecture without redesigning the accepted visual system.

Implemented on the active branch:

- private route remains `noindex,nofollow`
- `beforeLoad` session UX guard
- replaceable `PlayerSessionRepository`
- mock session adapter for current design/development
- Django P01 session adapter using `GET /api/v1/auth/me/` with `credentials: include`
- typed Player Dashboard repository boundary
- mock dashboard adapter retained for parallel frontend development
- Django dashboard adapter prepared for `GET /api/v1/me/dashboard/`
- Zod runtime validation for dashboard payloads
- runtime dashboard contract test
- `VITE_DATA_ADAPTER=mock|django` public adapter selection
- `VITE_API_BASE_URL` documented as public configuration only
- Quality Gate upgraded to lint + typecheck + dashboard contract test + production build
- inherited legacy `catch {}` correctness error fixed without reformatting unrelated legacy ecommerce files

## 5. Active frontend workstream

### Player Dashboard Productionization

Status: `READY TO MERGE`

Branch:

`phase/player-dashboard-productionization`

START_SHA:

`91a924e38194096a26070e11d2a9ae28858d20a3`

Reviewed implementation head before this continuity documentation commit:

`022256dd71e84914b44bc2c748107aaee5eb8137`

Green branch Quality Gate:

`34325863864` — PASS

Passed steps:

- frozen dependency install
- full-repo ESLint correctness
- TypeScript `tsc --noEmit`
- Player Dashboard runtime contract checks
- production build

The route guard is intentionally not treated as the security boundary. Django/API endpoints must authorize private requests independently.

## 6. Known constraints / debt

- Player Dashboard still uses the mock adapter by default until the corresponding Django dashboard endpoint exists and is accepted.
- `/login` is still the old visual/password prototype and does not represent the final OTP UX; Auth/OTP frontend productionization remains a separate workstream.
- Several inherited ecommerce routes remain in the repository. Do not copy their architecture into Turnoment competitive flows.
- Formatting debt remains separate from correctness lint; do not create a massive unrelated formatting diff inside feature phases.

## 7. Next frontend work

After Player Dashboard productionization is merged and post-merge CI is green:

1. Final Tournament Detail + Registration Contract
2. Game Detail productionization
3. My Tournaments
4. Result Submission
5. Dispute
6. Challenge Hub / Detail
7. Rivalry Detail
8. Auth / OTP frontend integration
9. Notifications / Settings

Lovable credits should be reserved for high-value visual Design Masters. The next strong Lovable candidate after Player Dashboard is:

`Live Tournament / Bracket`

Lovable output is never automatically production-final; it must pass the same architecture/quality process.

## 8. Latest session checkpoint

- Date: `2026-09-09`
- Repo: `sajadkhavas/turnoment`
- Workstream: `Player Dashboard Productionization`
- Status: `READY TO MERGE`
- Frontend main before merge: `91a924e38194096a26070e11d2a9ae28858d20a3`
- Active branch: `phase/player-dashboard-productionization`
- Green implementation head: `022256dd71e84914b44bc2c748107aaee5eb8137`
- Green CI: `34325863864`
- Backend main: `b92213436c5acbc8cb40ce22d2d6e7dbe2b82f86`
- Blockers: `none`
- Exact NEXT: `run the continuity-head quality gate, open/review/merge the productionization PR, verify post-merge main CI, then update this file with the final merged SHA and begin the next page workstream.`
