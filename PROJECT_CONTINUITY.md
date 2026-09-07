# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> This file is the current operational checkpoint for the whole Turnoment project. Read it before making changes. Update it before ending the session — even when the work is incomplete, blocked, or only partially implemented.

Last checkpoint update: `2026-09-07`

## 1. Mandatory continuation protocol

Every chat/agent working on this project MUST:

1. Read this file before implementation.
2. Verify the recorded `main` SHA of the repository it will change.
3. Read the relevant phase/PR/Issue evidence before repeating work.
4. Work on a dedicated branch unless explicitly doing a documented closeout branch.
5. Never mark work `DONE` from conversation memory alone.
6. Before ending the session, update this file with the real current state, even if the task is unfinished.
7. Record exact SHA / branch / PR / CI / test evidence when available.
8. If cross-repo API contracts or global project state changed, update this file in BOTH repositories.

Allowed operational statuses:

- `PLANNED`
- `IN PROGRESS`
- `PARTIAL / SAFE CHECKPOINT`
- `BLOCKED`
- `READY TO MERGE`
- `DONE / MERGED / FROZEN`

A session MUST NOT use `DONE / MERGED / FROZEN` unless the required implementation is merged and its required final gates are green.

## 2. Source-of-truth repositories

### Frontend

Repository: `sajadkhavas/turnoment`

Role: public/player/venue product UI and SSR frontend.

Stack:

- TanStack Start
- TanStack Router
- React 19
- TypeScript
- Tailwind CSS 4
- Radix / shadcn-style components

Current `main` SHA at this checkpoint:

`4d714579fc97d1400b5a2b50b680d93b090ceac5`

Latest merged frontend work:

- PR `#1` — Tournament Discovery completion
- Merge SHA: `4d714579fc97d1400b5a2b50b680d93b090ceac5`
- Post-merge Frontend Quality Gate: run `34104818438` — PASS

### Backend

Repository: `sajadkhavas/turnoment-backend`

Role: domain/data/business-logic source of truth and API.

Stack:

- Python
- Django 6.1
- Django REST Framework
- PostgreSQL
- Redis
- Celery

Current `main` SHA at this checkpoint:

`113e597ec94aaaae02186daf09c98fc1900cb62c`

Backend phase state:

- `P00 — Backend Foundation & Frontend Contract Baseline` → `DONE / MERGED / FROZEN`
- `P01 — Accounts, Player Identity & Authentication Foundation` → `DONE / MERGED / FROZEN`
- Next backend phase: `P02 — Games / Catalog Foundation`

Backend historical phase evidence remains authoritative in:

- `PHASE_COMPLETION_PROTOCOL.md`
- `docs/PHASE_REGISTRY.md`
- phase-specific GitHub Issues / PRs

## 3. Product architecture law

Frontend is NOT the business source of truth.

Anything that is content, commercial data, competitive state, user state, configurable product data, operational status, SEO entity data, or an action that changes system truth must ultimately be backend-authoritative and available through an API contract.

Frontend-owned examples:

- spacing
- layout
- visual effects
- animation
- design tokens
- purely presentational component behavior

Backend-authoritative examples:

- tournaments
- games
- gaming centers
- players
- rankings
- registrations
- match state/results
- challenges
- rivalries
- stories/content
- notifications
- payments/refunds/settlements
- configurable SEO entity metadata

## 4. New frontend production rule

From this checkpoint onward, pages must be built as the FINAL frontend architecture, not temporary mock-only screens that require a later SSR/router/SEO reconstruction phase.

Target flow:

`Route → validated params/search → loader/service → typed repository contract → Mock adapter now → Django HTTP adapter later → UI`

Rules:

- Public important pages: SSR-friendly from day one.
- Search/filter state: URL/search params, not localStorage.
- Dynamic public pages: loader-driven metadata where applicable.
- Private pages: explicit `noindex` and auth boundary.
- Every important route needs loading/error/empty/not-found handling as appropriate.
- Business logic must not live in presentational components.
- Mock data must be behind replaceable typed contracts before a page is considered API-ready final.

## 5. Current frontend state

### Strong visual/reference pages already present

- Homepage
- Tournament Listing / Discovery
- Ranking
- Tournament Detail prototype
- Gaming Center listing/profile prototype
- Games listing prototype
- Player Profile prototype

### Tournament Discovery

Status: `MERGED / BUILD GREEN`, but must still be migrated through the new repository/service adapter layer before the frontend can be declared globally backend-ready.

Already completed:

- URL-driven filters
- validated search parameters
- game/city/date/status/format/price/verified filters
- sorting
- mobile filter Sheet
- active filter chips
- featured tournament treatment
- stable tournament slugs
- empty state
- skeleton component
- canonical metadata
- build CI

### Tournament Detail

Status: `PROTOTYPE — NOT FINAL`

Known debt that MUST NOT be mistaken for final implementation:

- fake registration uses local UI state (`setDone` style behavior)
- current copy says payment is completed in person at the gaming center
- registration should become its own real route/flow
- data is still direct mock data
- needs final status/rules/participant/bracket/API-ready contract architecture

### Ranking

Status: `VISUAL / FRONTEND PROTOTYPE — PRODUCTIONIZATION PENDING`

### Player Profile

Status: `VISUAL / FRONTEND PROTOTYPE — PRODUCTIONIZATION PENDING`

### Legacy routes

Old ecommerce routes still exist in the repository. Do not use them as product architecture for the tournament platform. They may be isolated/deprecated/removed in a later controlled phase.

## 6. Current active frontend plan

### F00 — Frontend Production Architecture Foundation

Status: `PLANNED / BRANCH CREATED`

Branch:

`phase/f00-frontend-production-foundation`

START_SHA:

`4d714579fc97d1400b5a2b50b680d93b090ceac5`

Required scope:

- typed API/domain contract boundary
- repository/service interface layer
- mock adapters behind those interfaces
- future Django HTTP adapter boundary
- centralized API client/environment configuration
- loader-first data access rules
- SEO/head helper conventions
- public/private route conventions
- noindex/auth-route conventions
- loading/error/not-found conventions
- improve frontend CI toward lint + typecheck + build + tests
- document frontend engineering rules
- migrate at least one important route as reference implementation

Do NOT create more large pages on top of direct mock imports before this foundation is established, unless the session explicitly records a justified exception here.

### After F00

1. Final Tournament Detail
2. Game Detail
3. My Tournaments
4. Result Submission
5. Dispute
6. Challenge Hub / Detail
7. Rivalry Detail
8. Auth / OTP frontend integration shell
9. Notifications / Settings

## 7. Lovable usage plan

Lovable is optional and is used only when rapid high-value visual exploration is worth the credit cost.

Credits should be reserved primarily for design-master screens such as:

- Player Dashboard
- Live Tournament / Bracket
- Match Room
- Gaming Center Dashboard
- Gaming Center Tournament Operations

Any Lovable output is a design/code input, NOT automatically production-final. It must still satisfy the production frontend rules in this file.

## 8. Exact NEXT

Frontend NEXT:

`Start and complete F00 — Frontend Production Architecture Foundation from main SHA 4d714579fc97d1400b5a2b50b680d93b090ceac5.`

Backend NEXT, independently in parallel:

`Start P02 — Games / Catalog Foundation from backend main SHA 113e597ec94aaaae02186daf09c98fc1900cb62c.`

## 9. End-of-session update template

Every working chat must replace/update the relevant sections above and append a concise checkpoint below.

### Latest session checkpoint

- Date: `2026-09-07`
- Repo changed: `none yet — continuity bootstrap only`
- Phase/workstream: `Project continuity bootstrap`
- Status: `IN PROGRESS until continuity PR is merged`
- START_SHA frontend: `4d714579fc97d1400b5a2b50b680d93b090ceac5`
- START_SHA backend: `113e597ec94aaaae02186daf09c98fc1900cb62c`
- Active frontend branch: `phase/f00-frontend-production-foundation`
- Blockers: `none`
- Exact NEXT: `merge continuity bootstrap, then implement F00`
