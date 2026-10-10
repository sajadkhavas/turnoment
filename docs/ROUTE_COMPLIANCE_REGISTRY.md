# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.

Last audit: `2026-10-10`

Last terminal frozen frontend `main` before G00:

`c8c2a9c42ea46a5d694dd924e4a7004aaa7e66e8`

Active workstream:

`G00 — Sync Local Final Frontend, Reconcile Docs, and Freeze` — Issue #119 — source reconciliation head `d231fafc613fb37a616a8d90e572f73eb7195d72` — implementation branch `phase/g00-frontend-final-freeze-20261010`.

G00 is a reconciliation/runtime-boundary workstream. It does not authorize redesign or recertification of accepted routes.

## Status meanings

- `FINAL_CURRENT` — public route implementation is accepted under current page + SEO/final-copy law.
- `FINAL_PRIVATE` — accepted private/noindex route.
- `FINAL_PRE_SEO` — accepted before current strict SEO/final-copy law.
- `IN_PROGRESS` — active route implementation without sufficient merge/post-main evidence.
- `NEEDS_RECERTIFICATION` — existing route lacks current-law acceptance.
- `LEGACY_REVIEW` — inherited route still present and awaiting an explicit product decision.
- `REMOVED` — route was explicitly rejected from Turnoment product scope and is intentionally absent.

Route-level acceptance is distinct from terminal workstream `DONE / MERGED / FROZEN`.

## A. Accepted competitive/public routes

| Route | Status | Evidence / exact truth |
|---|---|---|
| `/` | `FINAL_CURRENT` | F16 terminally frozen; Issue #81 completed. |
| `/tournaments` | `FINAL_CURRENT` | F17 terminally frozen; Issue #84 completed. |
| `/tournaments/$id` | `FINAL_CURRENT` | F26 terminally frozen; Issue #116 completed; final F26 frozen main `c8c2a9c42ea46a5d694dd924e4a7004aaa7e66e8`. |
| `/games` | `FINAL_CURRENT` | F18 terminally frozen; Issue #89 completed. |
| `/games/$slug` | `FINAL_CURRENT` | F02 current-law acceptance terminally recorded; frozen/protected. |
| `/centers` | `FINAL_CURRENT` | F19 terminally frozen; Issue #92 completed. |
| `/centers/$id` | `FINAL_CURRENT` | F20 terminally frozen; Issue #95 completed. |
| `/ranking` | `FINAL_CURRENT` | F21 terminally frozen; Issue #98 completed. |
| `/players/$username` | `FINAL_CURRENT` | F22 terminally frozen; Issue #101 completed. |
| `/host` | `FINAL_CURRENT` | F23 terminally frozen; Issue #104 completed. |
| `/rules` | `FINAL_CURRENT` | F24 + F24-R1 terminally accepted; Issue #110 completed. |

There is no surviving public route classified `FINAL_PRE_SEO` or `NEEDS_RECERTIFICATION`.

## B. Accepted private/noindex routes

| Route | Status | Evidence / exact truth |
|---|---|---|
| `/tournaments/$id/register` | `FINAL_PRIVATE` | F01 final private registration route; preserved by F26/G00. |
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

The product owner explicitly rejected the inherited ecommerce/service/general-site surface from Turnoment product scope. These routes remain `REMOVED`, not backlog items:

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

These paths must not be reintroduced from the historical Iran Mehr Afzar README.

## D. F26 terminal evidence

F26 lineage:

- START/main: `8d6148b563b8fa84d5cef41903b8dea6de07a6c9`;
- implementation head: `ca0463fb9b5c2bf9f0189dec7481badad3d5464b`;
- implementation PR #117 — MERGED;
- implementation merge/main: `73d16522811ef758cbfc0cd6826cdb4a2be84c96`;
- closeout head: `cec2a6f4ddbdaac725e5d9485af1f48ac6326dc2`;
- closeout PR #118 — MERGED;
- final frozen main: `c8c2a9c42ea46a5d694dd924e4a7004aaa7e66e8`;
- Issue #116 — CLOSED / COMPLETED.

Every actually-triggered terminal Full + F16–F24 + F26 workflow passed on the final frozen SHA.

## E. G00 preservation boundary

G00 may change repository/runtime plumbing needed to reconcile the current local frontend and prepare a framework-neutral API handoff, but it must preserve accepted route contracts and visible SEO/final-copy behavior.

Authorized G00 examples:

- PWA source/assets synchronized from the accepted local frontend;
- framework-neutral data-adapter selection;
- no silent production mock fallback;
- repository documentation/current-state correction;
- cross-platform line-ending normalization;
- tests for adapter policy.

G00 must not:

- revive removed ecommerce/service routes;
- make frontend authoritative for backend-owned truth;
- change public search intent/copy without a new page workstream;
- redesign accepted route UX as unrelated cleanup;
- mutate backend runtime or VPS/server configuration.

## F. Frozen-route protection

All routes in sections A and B remain protected from unrelated source mutation.

Any future material public-page change requires the normal page/SEO protocol and new evidence. Any future private-flow change requires its own explicit scope and contract/permission acceptance.

## G. NEXT

Complete G00 implementation/CI/PR/local VS acceptance. Only after the exact G00 merge-main passes required terminal checks may the new frontend SHA be declared `FRONTEND FINAL / BACKEND READY`.

Backend implementation starts from that exact frozen frontend contract baseline.
