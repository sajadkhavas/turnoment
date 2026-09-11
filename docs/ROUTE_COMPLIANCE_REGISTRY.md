# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.

Last audit: `2026-09-12`

Accepted F20 implementation main at closeout creation:

`12cf7013377792f3324a8ac26db66b1a45694aca`

Last terminal frozen baseline before F20:

`a473613191fd5132664c5234b692befda4a5cf41` — F19 terminal frozen main.

Active closeout workstream:

`F20 — Public Gaming Center Detail` — Issue #95 OPEN — implementation PR #96 MERGED — closeout branch `closeout/f20-public-gaming-center-detail`.

## Status meanings

- `FINAL_CURRENT` — route implementation is accepted under current page + SEO/final-copy law.
- `FINAL_PRIVATE` — accepted private/noindex route.
- `FINAL_PRE_SEO` — accepted before current strict SEO/final-copy law.
- `IN_PROGRESS` — active route implementation without sufficient merge/post-main evidence.
- `NEEDS_RECERTIFICATION` — existing route lacks current-law acceptance.
- `LEGACY_REVIEW` — inherited non-competitive/ecommerce/general-site route.

Route-level `FINAL_CURRENT` is distinct from terminal workstream `DONE / MERGED / FROZEN`; the latter additionally requires closeout merge + terminal frozen-main CI/artifacts recorded in the tracking Issue.

## A. Accepted / active competitive routes

| Route | Status | Evidence / exact truth |
|---|---|---|
| `/` | `FINAL_CURRENT` | F16 terminally frozen; Issue #81 completed. |
| `/tournaments` | `FINAL_CURRENT` | F17 terminally frozen; Issue #84 completed. |
| `/games` | `FINAL_CURRENT` | F18 terminally frozen; Issue #89 completed. |
| `/centers` | `FINAL_CURRENT` | F19 terminally frozen; Issue #92 completed; frozen main `a473613191fd5132664c5234b692befda4a5cf41`. |
| `/centers/$id` | `FINAL_CURRENT` | F20 implementation accepted under current law. START `a473613191fd5132664c5234b692befda4a5cf41`; final reviewed head `358e269b1d6bdf98d3b0ff9303cbad82add05cd2`; PR #96 MERGED; implementation merge/main `12cf7013377792f3324a8ac26db66b1a45694aca`; post-main Full/F20/F19/F18/F17/F16 all PASS. Workstream remains closeout-in-progress until terminal freeze evidence exists. |
| `/games/$slug` | `FINAL_CURRENT` | F02 technical + current SEO/final-copy acceptance terminally recorded; frozen/protected. |
| `/tournaments/$id` | `FINAL_PRE_SEO` | F01 accepted before strict current SEO final-copy protocol. |
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

## B. Public competitive routes requiring current-law recertification

| Route | Status | Why |
|---|---|---|
| `/ranking` | `NEEDS_RECERTIFICATION` | No dedicated current-law ranking SSR/contract/search-intent workstream. |
| `/players/$username` | `NEEDS_RECERTIFICATION` | Must reconcile authoritative player/rating truth. |
| `/host` | `NEEDS_RECERTIFICATION` | Public acquisition route has not passed current page + SEO gates. |
| `/rules` | `NEEDS_RECERTIFICATION` | Must reconcile authoritative ruleset/product copy and current evidence law. |

## C. Accepted F20 Public Gaming Center Detail truth

Permanent architecture:

`route publicId param → SSR loader → typed GamingCenterDetailRepository → strict runtime-validated detail projection → Gaming Center Detail UI`

Canonical identity:
- v1 route key `publicId`;
- canonical `/centers/{publicId}`;
- stable backend relation key `centerId`;
- display names never relation keys;
- future slug migration requires explicit compatibility/redirect work.

Production contract:
- planned `GET /api/v1/centers/{publicId}/`;
- production defaults to Django adapter;
- no production fixture fallback;
- 404 → not-found; other HTTP/contract failures fail closed;
- strict response validation and requested/returned identity match;
- no rating/review projection;
- no tournament join by center display name.

Public information policy:
- address/phone/opening hours/map only when explicitly public and authoritative;
- missing data is valid and never fabricated;
- generic `LocalBusiness` JSON-LD only with complete public address matching visible content;
- no aggregateRating/review markup.

SEO:
- found published detail: title `{name} | گیم‌نت و مرکز گیمینگ در {city} | Turnoment`, canonical `/centers/{publicId}`, robots `index,follow`, OG `website`;
- not-found/non-public: no public projection and `noindex,nofollow`.

Runtime remains `FRONTEND MOCK / BACKEND PENDING`.

Implementation evidence:
- final reviewed head `358e269b1d6bdf98d3b0ff9303cbad82add05cd2`;
- compare ahead 2 / behind 0 / 12 files;
- no lockfile/dependency drift;
- exact-head Full `34654126483` PASS and F20 `34654126479` PASS;
- implementation PR #96 mergeable=true, review threads=0, exact main START lock, expected-head merge;
- PR-context Full `34654555350`, F20 `34654555391`, F19 `34654555399`, F18 `34654555470`, F17 `34654555326`, F16 `34654555331` — all PASS;
- implementation merge/main `12cf7013377792f3324a8ac26db66b1a45694aca`;
- post-main Full `34655166555`, F20 `34655166499`, F19 `34655166483`, F18 `34655166552`, F17 `34655166537`, F16 `34655166488` — all PASS.

Because implementation merge + required post-main gates are accepted, `/centers/$id` is promoted non-recursively to `FINAL_CURRENT`. Terminal workstream freeze still requires closeout merge and terminal evidence in Issue #95.

## D. Backend alignment

Backend F20 documentation alignment: Issue #37 CLOSED / COMPLETED, PR #38 MERGED, backend main `e8e48061cba201b3a12ac534ef97f22565bea5a3`; pre/post gates pass on Python 3.12/3.14. No runtime gaming-center implementation or phase reorder was added.

Backend NEXT remains `P02 — Games / Catalog Foundation`.

## E. Frozen-route protection

F16 `/`, F17 `/tournaments`, F18 `/games`, F19 `/centers`, and F02 `/games/$slug` remain protected. F20 implementation did not mutate their route source. Regression workflows continue to gate closeout/terminal freezes when triggered.

## F. Legacy / non-competitive surfaces

Existing ecommerce/service/general-content legacy routes remain `LEGACY_REVIEW` until explicitly accepted or removed. Do not use them as competitive architecture references.

## G. NEXT

Immediate task: complete F20 documentation-only closeout and terminal frozen-main evidence without source/runtime mutation.

After terminal F20 freeze:

`/ranking` → `/players/$username` → `/host` → `/rules`.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

## H. Registry maintenance law

A route cannot be promoted from chat memory. Terminal evidence is non-recursive: future closeout merge SHA and terminal CI/artifact digests belong in the route's tracking Issue after merge, not in a self-referential docs commit.
