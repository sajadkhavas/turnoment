# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.

Last audit: `2026-09-14`

Exact accepted F26 implementation `main` / closeout base:

`73d16522811ef758cbfc0cd6826cdb4a2be84c96`

Active workstream:

`F26 — Tournament Detail Current-Law Recertification` — Issue #116 OPEN — implementation PR #117 MERGED — implementation/main `73d16522811ef758cbfc0cd6826cdb4a2be84c96` — exact post-main acceptance PASS — documentation-only closeout in progress.

F25 is terminally `DONE / MERGED / FROZEN`; Issue #113 is CLOSED / COMPLETED and final F25 closeout main was `8d6148b563b8fa84d5cef41903b8dea6de07a6c9`.

F24-R1 `/rules` is terminally `DONE / MERGED / FROZEN`; Issue #110 is CLOSED / COMPLETED.

## Status meanings

- `FINAL_CURRENT` — route implementation is accepted under current page + SEO/final-copy law.
- `FINAL_PRIVATE` — accepted private/noindex route.
- `FINAL_PRE_SEO` — accepted before current strict SEO/final-copy law.
- `IN_PROGRESS` — active route implementation without sufficient merge/post-main evidence.
- `NEEDS_RECERTIFICATION` — existing route lacks current-law acceptance.
- `LEGACY_REVIEW` — inherited route still present and awaiting an explicit product decision.
- `REMOVED` — route was explicitly rejected from Turnoment product scope and is intentionally absent from the frontend.

Route-level acceptance is distinct from terminal workstream `DONE / MERGED / FROZEN`; terminal status additionally requires the workstream closeout and frozen-main evidence.

## A. Accepted competitive/public routes

| Route | Status | Evidence / exact truth |
|---|---|---|
| `/` | `FINAL_CURRENT` | F16 terminally frozen; Issue #81 completed. |
| `/tournaments` | `FINAL_CURRENT` | F17 terminally frozen; Issue #84 completed. |
| `/tournaments/$id` | `FINAL_CURRENT` | F26 implementation merged in PR #117; exact implementation-main acceptance PASS on `73d16522811ef758cbfc0cd6826cdb4a2be84c96`; terminal F26 closeout still in progress. |
| `/games` | `FINAL_CURRENT` | F18 terminally frozen; Issue #89 completed. |
| `/games/$slug` | `FINAL_CURRENT` | F02 current-law acceptance terminally recorded; frozen/protected. |
| `/centers` | `FINAL_CURRENT` | F19 terminally frozen; Issue #92 completed. |
| `/centers/$id` | `FINAL_CURRENT` | F20 terminally frozen; Issue #95 completed. |
| `/ranking` | `FINAL_CURRENT` | F21 terminally frozen; Issue #98 completed. |
| `/players/$username` | `FINAL_CURRENT` | F22 terminally frozen; Issue #101 completed. |
| `/host` | `FINAL_CURRENT` | F23 terminally frozen; Issue #104 completed. |
| `/rules` | `FINAL_CURRENT` | F24 + F24-R1 terminally accepted; Issue #110 completed. |

There is currently no surviving public route classified `FINAL_PRE_SEO` or `NEEDS_RECERTIFICATION` after F26 route-level acceptance.

## B. Accepted private/noindex routes

| Route | Status | Evidence / exact truth |
|---|---|---|
| `/tournaments/$id/register` | `FINAL_PRIVATE` | F01 final private registration route; preserved by F26. |
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

These paths must not be reintroduced merely to satisfy the historical Iran Mehr Afzar README.

## D. F26 implementation evidence

START/main:

`8d6148b563b8fa84d5cef41903b8dea6de07a6c9`

Implementation head:

`ca0463fb9b5c2bf9f0189dec7481badad3d5464b`

Implementation PR: `#117` — MERGED with expected-head lock.

Implementation merge/main / closeout base:

`73d16522811ef758cbfc0cd6826cdb4a2be84c96`

Accepted implementation facts:
- existing F01 route/repository/Zod/SSR architecture preserved;
- dynamic Turnoment title/meta/canonical/robots/OG/Twitter metadata accepted;
- inherited Iran Mehr Afzar route metadata removed;
- current-law Persian final copy accepted;
- canonical legacy identifier → slug redirect preserved;
- public links to rules, venue and player profiles preserved;
- private registration route preserved;
- Event JSON-LD intentionally omitted because detailed authoritative postal-address data is unavailable;
- no backend/package/lockfile/dependency/registration-contract mutation.

Exact implementation-head acceptance on `ca0463fb9b5c2bf9f0189dec7481badad3d5464b`:
- Full Frontend Quality `34849589140` — PASS — artifact `10349556999` — digest `sha256:c8be380de56930aabd4a1e4037a60152b7756ed8e2293f688b69294933dc3003`;
- F26 focused gate `34849589075` — PASS — artifact `10350060005` — digest `sha256:07a05870b5fb16c5488d11a55a566cfaafad3fabf6c503f32ef3cadd74c904bd`.

PR #117 actually-triggered PR-context gates:
- Full `34850076098` — PASS;
- F26 `34850076182` — PASS;
- F17 regression `34850076086` — PASS;
- unresolved review threads `0`;
- mergeable `true`;
- exact START main reverified before merge.

## E. F26 exact implementation-main acceptance

Exact implementation merge/main:

`73d16522811ef758cbfc0cd6826cdb4a2be84c96`

Actually-triggered push gates all passed with real runner execution:

- Full Frontend Quality `34864166474` — PASS;
  - artifact `10355383823`;
  - digest `sha256:88ff8d1fef78c248e738315fa358e50b623153e6f64a9d3c191008dc3af3eb9e`.
- F26 Tournament Detail Recertification `34864166083` — PASS;
  - artifact `10356243874`;
  - digest `sha256:d996b4a5f0067087461d1ddee60d69005124c2496f50da9a3ceb7930b328193e`.
- F17 Public Tournament Discovery regression `34864166079` — PASS;
  - artifact `10356049157`;
  - digest `sha256:658b73c2a1b24548a2ab460f43c4346732aeb9c7b1023b440ca53748f73a4069`.

The Full run passed frozen install, lint, production build + route generation, typecheck, contracts and browser/responsive QA. The F26 run passed tournament-detail contracts, build/typecheck, SSR/head/canonical/link evidence and responsive screenshots at `375 / 390 / 430 / 768 / 1024 / 1440`.

## F. Frozen-route protection

F16 `/`, F17 `/tournaments`, F18 `/games`, F19 `/centers`, F20 `/centers/$id`, F21 `/ranking`, F22 `/players/$username`, F23 `/host`, F24/F24-R1 `/rules`, F02 `/games/$slug`, and now route-level accepted F26 `/tournaments/$id` remain protected from unrelated source mutation.

Accepted private routes remain protected.

## G. F26 closeout chain

Closeout branch: `closeout/f26-tournament-detail-recertification`.

Closeout law:
1. exactly one closeout commit;
2. exactly four changed Markdown files: `PROJECT_CONTINUITY.md`, `docs/ROUTE_COMPLIANCE_REGISTRY.md`, `docs/workstreams/F26_TOURNAMENT_DETAIL_RECERTIFICATION.md`, `docs/workstreams/F26_CLOSEOUT.md`;
3. no source/package/lockfile/workflow/dependency/runtime/backend mutation;
4. exact compare from `73d16522811ef758cbfc0cd6826cdb4a2be84c96` = ahead `1` / behind `0` / one commit / four Markdown files;
5. closeout PR without auto-closing Issue #116;
6. every actually-triggered PR-context Full/frozen-route regression gate must PASS;
7. mergeable=true and unresolved review threads=0;
8. exact live `main` must still equal `73d16522811ef758cbfc0cd6826cdb4a2be84c96` before expected-head closeout merge;
9. after merge, every actually-triggered terminal frozen-main gate must PASS with artifacts/digests recorded in Issue #116;
10. exact live `main` must be reverified and Issue #116 closed completed.

Future closeout-head/merge/frozen-main facts belong in Issue #116 after they exist; do not create a recursive docs commit solely to self-record them.

## H. NEXT

Immediate task: complete F26 documentation-only closeout without runtime drift.

After terminal F26 there is no remaining public route in the registry awaiting current-law recertification. Do not invent a new frontend recertification phase without an explicit product requirement/audit.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.