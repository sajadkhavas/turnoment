# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.

Last audit: `2026-09-13`

Exact accepted F25 implementation `main` / closeout base:

`cb02d65ad9fc5c1d4a27ca775bcb5840f33026c1`

Active workstream:

`F25 — Remove Non-Turnoment Legacy Routes` — Issue #113 OPEN — implementation PR #114 MERGED — implementation/main `cb02d65ad9fc5c1d4a27ca775bcb5840f33026c1` — Full exact-main acceptance PASS — documentation-only closeout in progress.

F24-R1 `/rules` is terminally `DONE / MERGED / FROZEN`; Issue #110 is CLOSED / COMPLETED and terminal evidence is recorded there. Final F24-R1 main was `faf2b18287484d2ed78094589fe2db80f2841f55`.

## Status meanings

- `FINAL_CURRENT` — route implementation is accepted under current page + SEO/final-copy law.
- `FINAL_PRIVATE` — accepted private/noindex route.
- `FINAL_PRE_SEO` — accepted before current strict SEO/final-copy law.
- `IN_PROGRESS` — active route implementation without sufficient merge/post-main evidence.
- `NEEDS_RECERTIFICATION` — existing route lacks current-law acceptance.
- `LEGACY_REVIEW` — inherited route still present and awaiting an explicit product decision.
- `REMOVED` — route was explicitly rejected from Turnoment product scope and is intentionally absent from the frontend.

Route-level acceptance is distinct from terminal workstream `DONE / MERGED / FROZEN`; terminal status additionally requires the workstream's closeout and frozen-main evidence.

## A. Accepted competitive/public routes

| Route | Status | Evidence / exact truth |
|---|---|---|
| `/` | `FINAL_CURRENT` | F16 terminally frozen; Issue #81 completed. |
| `/tournaments` | `FINAL_CURRENT` | F17 terminally frozen; Issue #84 completed. |
| `/games` | `FINAL_CURRENT` | F18 terminally frozen; Issue #89 completed. |
| `/games/$slug` | `FINAL_CURRENT` | F02 current-law acceptance terminally recorded; frozen/protected. |
| `/centers` | `FINAL_CURRENT` | F19 terminally frozen; Issue #92 completed. |
| `/centers/$id` | `FINAL_CURRENT` | F20 terminally frozen; Issue #95 completed. |
| `/ranking` | `FINAL_CURRENT` | F21 terminally frozen; Issue #98 completed. |
| `/players/$username` | `FINAL_CURRENT` | F22 terminally frozen; Issue #101 completed. |
| `/host` | `FINAL_CURRENT` | F23 terminally frozen; Issue #104 completed. |
| `/rules` | `FINAL_CURRENT` | F24 + F24-R1 terminally accepted; Issue #110 closed completed. |
| `/tournaments/$id` | `FINAL_PRE_SEO` | F01 accepted before strict current SEO/final-copy protocol; next public recertification candidate after terminal F25. |

## B. Accepted private/noindex routes

| Route | Status | Evidence / exact truth |
|---|---|---|
| `/tournaments/$id/register` | `FINAL_PRIVATE` | F01 final private registration route. |
| `/dashboard` | `FINAL_PRIVATE` | accepted player dashboard. |
| `/dashboard/tournaments` | `FINAL_PRIVATE` | F03 terminal. |
| `/dashboard/matches` | `FINAL_PRIVATE` | F04 terminal. |
| `/matches/$id/result` | `FINAL_PRIVATE` | F05 terminal. |
| `/matches/$id/dispute` | `FINAL_PRIVATE` | F06 terminal. |
| `/login` | `FINAL_PRIVATE` | F07 terminal OTP/session route. |
| `/register` | `FINAL_PRIVATE` | F08 terminal. |
| `/dashboard/profile` | `FINAL_PRIVATE` | F09 terminal. |
| `/dashboard/notifications` | `FINAL_PRIVATE` | F10 terminal. |
| `/dashboard/settings` | `FINAL_PRIVATE` | F11 terminal. |
| `/dashboard/rivalries` | `FINAL_PRIVATE` | F12 terminal. |
| `/dashboard/achievements` | `FINAL_PRIVATE` | F13 terminal. |
| `/dashboard/teams` | `FINAL_PRIVATE` | F14 terminal. |
| `/dashboard/challenges` | `FINAL_PRIVATE` | F15 terminal. |

## C. F25 intentionally removed routes

The product owner explicitly rejected the inherited ecommerce/service/general-site surface from Turnoment product scope. The following routes are `REMOVED`, not pending recertification:

| Route | Status |
|---|---|
| `/about` | `REMOVED` |
| `/blog` | `REMOVED` |
| `/blog/$slug` | `REMOVED` |
| `/cart` | `REMOVED` |
| `/category/$slug` | `REMOVED` |
| `/checkout` | `REMOVED` |
| `/contact` | `REMOVED` |
| `/faq` | `REMOVED` |
| `/payment/result` | `REMOVED` |
| `/products` | `REMOVED` |
| `/products/$slug` | `REMOVED` |
| `/services` | `REMOVED` |
| `/services/request` | `REMOVED` |
| `/dashboard/addresses` | `REMOVED` |
| `/dashboard/orders` | `REMOVED` |
| `/dashboard/services` | `REMOVED` |
| `/dashboard/wishlist` | `REMOVED` |

These paths must not be reintroduced merely to satisfy the historical Iran Mehr Afzar README.

## D. F25 implementation evidence

START: `faf2b18287484d2ed78094589fe2db80f2841f55`.

Implementation head: `f9200802c1d67899d018bf23de417fcce017c31c`.

Implementation PR: `#114` — MERGED with expected-head lock.

Implementation merge/main / closeout base: `cb02d65ad9fc5c1d4a27ca775bcb5840f33026c1`.

Exact compare from START to implementation head:
- ahead `1` / behind `0` / one implementation commit;
- 17 legacy route files removed;
- inherited legacy `src/components/site/*`, cart store and mock catalog removed;
- root no longer mounts the ecommerce cart provider/site layout and default metadata now identifies Turnoment;
- no package/lock/dependency/backend mutation.

PR-context Full Frontend Quality:
- run `34760912403` — PASS;
- artifact `10319201127`;
- digest `sha256:03146af8f55b263b353a9170d43be1cd06e566d816a6c02291af4bd16f767e6d`;
- install, lint, production build + official route generation, typecheck, contract checks, browser smoke/responsive QA all PASS.

Exact-main acceptance on `cb02d65ad9fc5c1d4a27ca775bcb5840f33026c1`:
- Full Frontend Quality `34761207642` — PASS;
- artifact `10319136486`;
- digest `sha256:944a5b64f199a653644c0510fb7966ea6da634f784536daad18697cc184c2e3d`;
- production route generation, typecheck, contracts and browser/responsive evidence all PASS.

Exact live `main` was reverified after exact-main acceptance.

## E. Generated router law after F25

`src/routeTree.gen.ts` is generated output. F25 intentionally does not hand-author stale route-tree content. The official TanStack/Vite production build generates routing from the surviving file routes before typecheck; this passed in both PR-context and exact-main acceptance.

## F. Frozen-route protection

F16 `/`, F17 `/tournaments`, F18 `/games`, F19 `/centers`, F20 `/centers/$id`, F21 `/ranking`, F22 `/players/$username`, F23 `/host`, F24/F24-R1 `/rules`, and F02 `/games/$slug` remain protected from unrelated source mutation.

Accepted private routes remain protected.

## G. F25 closeout chain

Closeout branch: `closeout/f25-remove-legacy-routes`.

Closeout law:
1. exactly one closeout commit;
2. exactly four changed Markdown files: `PROJECT_CONTINUITY.md`, `docs/ROUTE_COMPLIANCE_REGISTRY.md`, `docs/workstreams/F25_LEGACY_ROUTE_REMOVAL.md`, `docs/workstreams/F25_CLOSEOUT.md`;
3. no source/package/lockfile/workflow/dependency/runtime/backend mutation;
4. exact compare = ahead 1 / behind 0 / one commit / four Markdown files;
5. closeout PR without auto-closing Issue #113;
6. every actually-triggered PR-context Full/frozen-route regression gate must PASS;
7. mergeable=true and unresolved review threads=0;
8. exact live `main` must still equal `cb02d65ad9fc5c1d4a27ca775bcb5840f33026c1` before expected-head closeout merge;
9. after merge, terminal frozen-main actually-triggered gates must PASS with artifacts/digests recorded in Issue #113;
10. exact live `main` must be reverified and Issue #113 closed completed.

## H. NEXT

Immediate task: complete F25 documentation-only closeout without runtime drift.

After terminal F25, next public competitive recertification candidate: `/tournaments/$id` (`FINAL_PRE_SEO`).

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.
