# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> Operational source of truth for continuing Turnoment without duplicate work.

Last update: `2026-10-10`

## 1. Mandatory continuation law

Every chat/agent MUST read `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, `SEO_FINAL_COPY_PROTOCOL.md` for public/indexable work, and `docs/ROUTE_COMPLIANCE_REGISTRY.md`; verify exact live `main`; use a dedicated branch/Issue/PR; preserve frozen routes; keep production fail-closed; and never claim `DONE / MERGED / FROZEN` from chat memory alone.

Terminal closeout SHA/CI belongs in the tracking Issue after merge. Do not create recursive documentation commits solely to self-record a commit's own SHA.

## 2. Last terminal frontend baseline

Repository: `sajadkhavas/turnoment`.

F26 Tournament Detail recertification is terminally closed:

- Issue #116 — `CLOSED / COMPLETED`;
- implementation PR #117 — MERGED;
- closeout PR #118 — MERGED;
- final frozen-main SHA: `c8c2a9c42ea46a5d694dd924e4a7004aaa7e66e8`;
- all 11 actually-triggered terminal Full/frozen-route workflows passed on that exact SHA;
- `/tournaments/$id` = `FINAL_CURRENT`.

F25 legacy-route removal remains terminally closed. The 17 inherited ecommerce/service/general-site routes remain intentionally `REMOVED`.

## 3. Active workstream — G00 frontend final reconciliation and freeze

Tracking Issue: `#119`.

Purpose: reconcile the newer accepted VS Code frontend into GitHub, remove stale inherited repository metadata, make the frontend API boundary framework-neutral and production-safe, run final local/GitHub acceptance, then freeze one exact frontend SHA before backend implementation.

### Source reconciliation

GitHub baseline before local reconciliation:

`c8c2a9c42ea46a5d694dd924e4a7004aaa7e66e8`

Sync evidence branch:

`sync/local-final-20261010`

Exact synchronized local head:

`d231fafc613fb37a616a8d90e572f73eb7195d72`

Local acceptance recorded before push:

- source safety gate — PASS;
- secret-file gate — PASS;
- PWA source gate — PASS;
- diff gate — PASS;
- frozen Bun install — PASS;
- lint — PASS;
- TypeScript typecheck — PASS;
- contract tests — PASS;
- production build — PASS;
- built PWA gate — PASS;
- commit/push — PASS.

The sync added the current PWA assets/install prompt and current local UI/runtime changes while preserving the accepted route/product scope.

### Active implementation branch

`phase/g00-frontend-final-freeze-20261010`

This branch starts from exact synchronized head `d231fafc613fb37a616a8d90e572f73eb7195d72`.

Authorized G00 implementation scope:

- replace the legacy Iran Mehr Afzar root README with Turnoment documentation;
- refresh continuity/route-state documentation to terminal F26 + active G00 truth;
- centralize data-adapter selection;
- use framework-neutral `api` naming instead of Django-specific frontend adapter naming;
- prevent any silent production fallback to mock;
- preserve all existing domain/page contracts and route behavior;
- preserve the synchronized PWA;
- normalize repository text line endings for future cross-platform work;
- add focused adapter tests and keep the full quality gate green.

No backend runtime or VPS/server mutation is authorized in G00.

## 4. Permanent frontend data boundary

Permanent page architecture remains:

`Route → validated params/search → route access policy → loader → typed repository/service contract → runtime-validated response → UI`

The production adapter boundary is framework-neutral:

`typed repository contract → API repository → /api/v1/... → backend`

Adapter policy:

- `VITE_DATA_ADAPTER=mock` selects deterministic local fixtures;
- `VITE_DATA_ADAPTER=api` selects real HTTP repositories;
- missing adapter in development/test defaults to `mock`;
- missing adapter in production defaults to `api`;
- unsupported/legacy adapter values fail;
- production therefore cannot silently fall back to fabricated data.

Explicit `mock` remains valid for controlled production-like frontend acceptance before the real backend exists.

## 5. Accepted route inventory

Public/current routes:

- `/` — `FINAL_CURRENT`;
- `/tournaments` — `FINAL_CURRENT`;
- `/tournaments/$id` — `FINAL_CURRENT`;
- `/games` — `FINAL_CURRENT`;
- `/games/$slug` — `FINAL_CURRENT`;
- `/centers` — `FINAL_CURRENT`;
- `/centers/$id` — `FINAL_CURRENT`;
- `/ranking` — `FINAL_CURRENT`;
- `/players/$username` — `FINAL_CURRENT`;
- `/host` — `FINAL_CURRENT`;
- `/rules` — `FINAL_CURRENT`.

Accepted private/noindex routes:

- `/tournaments/$id/register`;
- `/dashboard`;
- `/dashboard/tournaments`;
- `/dashboard/matches`;
- `/matches/$id/result`;
- `/matches/$id/dispute`;
- `/login`;
- `/register`;
- `/dashboard/profile`;
- `/dashboard/notifications`;
- `/dashboard/settings`;
- `/dashboard/rivalries`;
- `/dashboard/achievements`;
- `/dashboard/teams`;
- `/dashboard/challenges`.

G00 does not recertify or redesign these routes; it preserves their accepted contracts while reconciling the source/runtime boundary.

## 6. PWA truth after reconciliation

The synchronized frontend contains:

- `public/site.webmanifest`;
- `public/sw.js`;
- install/favicons and Turnoment brand assets under `public/`;
- `src/components/pwa-install-prompt.tsx`;
- root manifest link + mounted install prompt.

PWA installation is frontend-complete for the current mock acceptance baseline. Authentication persistence, real notifications/push, and final network/offline semantics must be re-accepted after the real backend is integrated.

## 7. G00 official-source audit

For adapter/environment behavior, the workstream reviewed current official Vite environment/mode guidance and TanStack Start environment-variable guidance.

Applied decisions:

- `VITE_*` variables are public client configuration and must never contain secrets;
- Vite production builds expose `import.meta.env.PROD`;
- required configuration should be validated rather than silently changing to fabricated production data;
- backend secrets remain server-only and outside this frontend adapter configuration.

No public-page SEO/copy rewrite is authorized by G00, so existing accepted SEO/final-copy decisions remain frozen.

## 8. GitHub/VS working law from G00 onward

After source reconciliation, GitHub is the authoritative source of frontend mutations.

Workflow:

`GitHub branch/PR implementation → VS Code pulls exact branch/head → local final acceptance → merge/freeze`

Do not mutate the old Downloads source and later overwrite GitHub again. Any post-reconciliation code change belongs in GitHub first.

## 9. NEXT

Immediate task: finish G00 implementation on `phase/g00-frontend-final-freeze-20261010`, obtain green GitHub CI, open/review the G00 PR, then run final VS Code acceptance on the exact reviewed head.

Only after that local acceptance may the PR merge and the resulting exact `main` SHA be recorded as:

`FRONTEND FINAL / BACKEND READY`

Backend architecture/implementation is intentionally out of scope until that exact frontend freeze exists.
