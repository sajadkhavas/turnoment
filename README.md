# Turnoment

Turnoment is a Persian RTL platform for discovering and participating in in-person gaming tournaments, following player competition and rankings, managing player activity, and connecting tournament hosts with players.

This repository is the **frontend source of truth**. Backend implementation is intentionally kept out of this repository; the frontend talks to a versioned HTTP API through typed repository contracts.

## Product surface

### Public/indexable routes

- `/`
- `/tournaments`
- `/tournaments/$id`
- `/games`
- `/games/$slug`
- `/centers`
- `/centers/$id`
- `/ranking`
- `/players/$username`
- `/host`
- `/rules`

### Private/noindex routes

- `/tournaments/$id/register`
- `/dashboard`
- `/dashboard/tournaments`
- `/dashboard/matches`
- `/matches/$id/result`
- `/matches/$id/dispute`
- `/login`
- `/register`
- `/dashboard/profile`
- `/dashboard/notifications`
- `/dashboard/settings`
- `/dashboard/rivalries`
- `/dashboard/achievements`
- `/dashboard/teams`
- `/dashboard/challenges`

Legacy ecommerce/service routes from the inherited Iran Mehr Afzar project were explicitly removed in F25 and are not Turnoment backlog items. See `docs/ROUTE_COMPLIANCE_REGISTRY.md`.

## Frontend stack

- TanStack Start + TanStack Router
- React 19
- TypeScript
- Tailwind CSS 4
- Zod runtime validation
- TanStack Query
- Bun
- Vite / Nitro production build
- PWA manifest + service worker + install prompt

The application shell is Persian/RTL (`lang="fa"`, `dir="rtl"`).

## Permanent frontend architecture

Turnoment pages follow this boundary:

`Route → validated params/search → access policy → loader → typed repository/service contract → runtime-validated response → UI`

The frontend must not become authoritative for server-owned truth such as authentication/session state, tournament lifecycle, registration eligibility/capacity, bracket state, match winner/final result, rating changes, challenge eligibility, or dispute/moderation decisions.

## Data adapters

The frontend supports two deliberate adapter modes:

- `mock` — deterministic fixture repositories for local development, browser QA, and explicit pre-backend acceptance.
- `api` — framework-neutral HTTP repositories for the real backend.

Configuration:

```env
VITE_DATA_ADAPTER=mock
VITE_API_BASE_URL=
```

Behavior is centralized in `src/lib/data-adapter.ts`:

- development/test with no adapter configured defaults to `mock`;
- production with no adapter configured defaults to `api`;
- explicit `mock` remains available for controlled production-like frontend acceptance before the backend exists;
- unknown/legacy adapter names fail instead of silently serving mock data.

The frontend does not encode the backend framework in adapter names. Backend technology may change without rebuilding page components or domain contracts.

## Local development and quality gates

Use Bun from the repository root:

```powershell
bun install --frozen-lockfile
bun run lint
bun run typecheck
bun run test
bun run build
```

For deterministic frontend acceptance before the real API is available:

```powershell
$env:VITE_DATA_ADAPTER = "mock"
Remove-Item Env:VITE_API_BASE_URL -ErrorAction SilentlyContinue
bun run quality
```

For real API integration:

```powershell
$env:VITE_DATA_ADAPTER = "api"
$env:VITE_API_BASE_URL = "https://api.example.com/"
```

Do not put secrets in `VITE_*` variables; Vite exposes them to client-side code.

## PWA

Current PWA source files include:

- `public/site.webmanifest`
- `public/sw.js`
- install icons / favicons under `public/`
- `src/components/pwa-install-prompt.tsx`

The root route links the manifest and mounts the install prompt. PWA behavior must be rechecked after real authentication/API integration because session persistence, update behavior, notifications, and offline/network semantics depend on the final backend/runtime design.

## Governance — mandatory first reads

Before materially changing the frontend, read:

1. `PROJECT_CONTINUITY.md`
2. `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`
3. `SEO_FINAL_COPY_PROTOCOL.md` for public/indexable work
4. `docs/ROUTE_COMPLIANCE_REGISTRY.md`

Every material workstream must verify exact `main`, use a dedicated branch/Issue/PR, preserve frozen routes, keep production fail-closed, run required quality gates, and record repository evidence before claiming `DONE / MERGED / FROZEN`.

## Current handoff

The current pre-backend freeze work is tracked in Issue #119 and `docs/workstreams/G00_FRONTEND_FINAL_FREEZE.md`.

After G00 terminal acceptance, one exact frontend SHA becomes the backend contract baseline. Backend implementation starts only from that frozen contract baseline; no VPS/server work belongs to G00.
