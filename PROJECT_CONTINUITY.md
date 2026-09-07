# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> This file is the operational source of truth for continuing Turnoment without duplicate work. Read it before making changes. Update it before ending every session — even when work is incomplete, blocked, or only partially implemented.

Last checkpoint update: `2026-09-07`

## 1. Mandatory continuation protocol

Every chat/agent working on this project MUST:

1. Read this file before implementation.
2. Verify the recorded `main` SHA of every repository it will change.
3. Read the relevant phase registry / Issue / PR evidence before repeating work.
4. Work on a dedicated branch unless doing a documented closeout branch.
5. Never mark work `DONE` from conversation memory alone.
6. Before ending the session, update this file with the real state even if the task is unfinished.
7. Record exact SHA / branch / PR / CI / test evidence when available.
8. If a cross-repo API contract or global product state changes, update this file in BOTH repositories.

Allowed operational statuses:

- `PLANNED`
- `IN PROGRESS`
- `PARTIAL / SAFE CHECKPOINT`
- `BLOCKED`
- `READY TO MERGE`
- `DONE / MERGED / FROZEN`

A session MUST NOT use `DONE / MERGED / FROZEN` unless implementation is merged and required final gates are green.

## 2. Source-of-truth repositories

### Frontend

Repository: `sajadkhavas/turnoment`

Role: TanStack Start SSR product frontend for public, player and venue experiences.

Current `main` SHA before the active F00 merge:

`fca358aa15b3d088809011fc451a30518d888344`

Last completed frontend work before F00:

- Project continuity bootstrap PR `#2` merged to `fca358aa15b3d088809011fc451a30518d888344`
- Tournament Discovery PR `#1` merged earlier at `4d714579fc97d1400b5a2b50b680d93b090ceac5`
- Tournament Discovery post-merge quality run `34104818438` — PASS

### Backend

Repository: `sajadkhavas/turnoment-backend`

Current `main` SHA:

`b92213436c5acbc8cb40ce22d2d6e7dbe2b82f86`

- Backend continuity PR `#8` merged at this SHA
- Post-merge Backend Quality Gate run `34109357575` — PASS
- `P00 — Backend Foundation & Frontend Contract Baseline` → `DONE / MERGED / FROZEN`
- `P01 — Accounts, Player Identity & Authentication Foundation` → `DONE / MERGED / FROZEN`
- Backend NEXT: `P02 — Games / Catalog Foundation`

Backend historical evidence remains authoritative in `PHASE_COMPLETION_PROTOCOL.md`, `docs/PHASE_REGISTRY.md`, and phase-specific Issues/PRs.

## 3. Product architecture law

Frontend is NOT the business source of truth.

Anything that is content, commercial data, competitive state, user state, configurable product data, operational status, SEO entity data, or a mutation of system truth must ultimately be backend-authoritative and exposed through an API contract.

Frontend owns presentation such as layout, spacing, animation and design tokens. Backend owns entities/state such as games, tournaments, gaming centers, players, registrations, rankings, matches/results, challenges, rivalries, stories/content, notifications, payments/refunds/settlements and configurable entity SEO metadata.

## 4. Final frontend architecture law

From F00 onward, pages must be built once in their final frontend architecture. Do NOT build large direct-mock pages that require a later SSR/router/SEO/API reconstruction phase.

Required direction:

`Route → validated params/search → loader → typed repository port → active adapter → runtime-validated data → UI`

During parallel development:

`Mock adapter now → Django HTTP adapter later`

Swapping adapters must not require rewriting route/page components.

Rules:

- Important public pages are SSR-friendly from day one.
- Search/filter truth lives in URL/search params, not localStorage.
- Dynamic public metadata is loader-driven where applicable.
- Private/operational routes use explicit auth boundaries and `noindex` when productionized.
- Important routes implement pending/error/empty/not-found states as appropriate.
- External HTTP payloads are runtime-validated; TypeScript alone is not enough.
- Business decisions do not live in presentational components.
- `VITE_*` contains public configuration only; never secrets.
- Web auth will follow backend P01: Django Session + CSRF + OTP, not localStorage bearer-token auth.

Detailed rules: `docs/FRONTEND_ENGINEERING.md`.

## 5. Active frontend phase

### F00 — Frontend Production Architecture Foundation

Status: `READY TO MERGE`

Tracking Issue: `#3`

Branch:

`phase/f00-frontend-production-foundation`

START_SHA:

`fca358aa15b3d088809011fc451a30518d888344`

Reviewed implementation head before this documentation checkpoint:

`eef2b4fd97ac5572a58bfb8aa748729f47dba4b1`

Green branch quality run:

`34110148073` — PASS

Passed gates:

- frozen dependency install
- ESLint correctness checks
- TypeScript `tsc --noEmit`
- tournament URL/search contract checks
- tournament HTTP/Zod runtime contract checks
- production build

F00 implemented:

- typed tournament frontend contracts
- Zod runtime API validation
- repository port
- mock repository adapter
- future Django HTTP repository adapter
- typed HTTP error/status handling
- public API client boundary
- public API base URL environment convention
- validated URL search parsing
- deterministic `loaderDeps`
- centralized SEO/head helpers
- reusable route error/retry state
- Tournament Discovery migrated to loader/repository/facets architecture
- Tournament Detail tournament read path migrated to repository architecture
- pending/loading reference states
- frontend quality gate upgraded to lint + typecheck + contracts + build
- frontend engineering documentation
- frontend phase registry

Known historical quality debt discovered by F00:

- the inherited repository had large Prettier-only formatting debt, especially legacy ecommerce files
- Prettier was separated from ESLint correctness checks rather than formatting hundreds of unrelated legacy files inside F00
- full-repo ESLint correctness now passes; existing Fast Refresh warnings remain non-blocking
- legacy ecommerce isolation/removal remains a separate controlled workstream

## 6. Current page truth

### Homepage

Strong visual reference; production data-contract migration still pending.

### Tournament Discovery `/tournaments`

Visual implementation merged earlier. Under F00 it is now the reference production route with validated URL search, loader dependencies, repository data access, dynamic repository facets, SSR-friendly loading, error state, SEO helper and runtime-ready HTTP contract.

### Tournament Detail `/tournaments/$id`

Status: `PROTOTYPE — NOT FINAL`

F00 productionized ONLY the tournament read/SSR/SEO path. The dedicated next workstream must still replace:

- fake local registration (`setDone` style behavior)
- copy saying payment occurs in person at the gaming center
- inline registration form with a real registration route/flow
- direct mock gaming-center/rules reads
- incomplete tournament lifecycle/participants/bracket/ruleset architecture

Do not report Tournament Detail as final before that workstream closes.

### Ranking / Player Profile / Centers / Games

Visual/frontend prototypes or partial references; productionization pending.

### Legacy ecommerce routes

Inherited code. They are NOT Turnoment product architecture and must not be copied into tournament flows.

## 7. Frontend NEXT after F00 merge

1. `F01 — Final Tournament Detail & Registration Contract`
2. Game Detail
3. My Tournaments
4. Result Submission
5. Dispute
6. Challenge Hub / Detail
7. Rivalry Detail
8. Auth / OTP frontend integration shell
9. Notifications / Settings

Lovable credits, when available, should be reserved for high-value design-master screens such as Player Dashboard, Live/Bracket, Match Room, Gaming Center Dashboard and Tournament Operations. Lovable output is never automatically production-final.

## 8. Latest session checkpoint

- Date: `2026-09-07`
- Repo changed: `sajadkhavas/turnoment` plus cross-repo continuity bootstrap already merged in backend
- Workstream: `F00 — Frontend Production Architecture Foundation`
- Status: `READY TO MERGE`
- Frontend main before merge: `fca358aa15b3d088809011fc451a30518d888344`
- Backend current main: `b92213436c5acbc8cb40ce22d2d6e7dbe2b82f86`
- Active branch: `phase/f00-frontend-production-foundation`
- Green implementation head: `eef2b4fd97ac5572a58bfb8aa748729f47dba4b1`
- Green implementation CI: `34110148073`
- Blockers: `none`
- Exact NEXT: `run the documentation-head quality gate, open/review/merge the F00 PR, verify post-merge main CI, then freeze continuity and begin Final Tournament Detail.`
