# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.
>
> Every chat/agent modifying an existing route MUST read this registry together with `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, and when applicable `SEO_FINAL_COPY_PROTOCOL.md`.

Last audit: `2026-09-12`

Current terminal frozen frontend `main` before F20:

`a473613191fd5132664c5234b692befda4a5cf41` — F19 terminal frozen main.

Active workstream:

`F20 — Public Gaming Center Detail` — Issue #95 OPEN — branch `phase/f20-public-gaming-center-detail` — START `a473613191fd5132664c5234b692befda4a5cf41`.

## Status meanings

- `FINAL_CURRENT` — route implementation is accepted under the current applicable protocol set, including current SEO/final-copy law for public/indexable pages.
- `FINAL_PRIVATE` — final private/noindex route; public SEO research is not applicable, but final architecture/UX/contracts are accepted.
- `FINAL_PRE_SEO` — technically/factually final under page protocol but frozen before the stricter SEO final-copy law.
- `IN_PROGRESS` — active controlled implementation workstream exists; not final until its required acceptance chain completes.
- `NEEDS_RECERTIFICATION` — route exists but has not passed the full current-law evidence chain.
- `PLACEHOLDER` — intentionally incomplete/temporary product surface.
- `REBUILD` — known product/architecture truth is wrong and must be rebuilt rather than patched as-is.
- `LEGACY_REVIEW` — inherited non-Turnoment/ecommerce/general-site route.

Route-level `FINAL_CURRENT` does not alone mean a workstream is terminally `DONE / MERGED / FROZEN`; terminal evidence still requires closeout merge + frozen-main CI/artifacts in the tracking Issue.

## A. Accepted / active competitive routes

| Route | Status | Evidence / exact truth |
|---|---|---|
| `/` | `FINAL_CURRENT` | F16 terminally frozen; Issue #81 CLOSED / COMPLETED. SSR loader → typed repository → runtime-validated projection. Runtime remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/tournaments` | `FINAL_CURRENT` | F17 terminally frozen; Issue #84 CLOSED / COMPLETED; permanent validated-search/SSR/repository architecture accepted. |
| `/games` | `FINAL_CURRENT` | F18 terminally frozen; Issue #89 CLOSED / COMPLETED; no production fixture fallback. |
| `/centers` | `FINAL_CURRENT` | F19 `DONE / MERGED / FROZEN`; Issue #92 CLOSED / COMPLETED; frozen main `a473613191fd5132664c5234b692befda4a5cf41`; terminal Full/F19/F18/F17/F16 gates PASS. |
| `/centers/$id` | `IN_PROGRESS` | F20 Issue #95. START `a473613191fd5132664c5234b692befda4a5cf41`. Legacy local lookup/name-join replaced on branch by `publicId → SSR loader → typed GamingCenterDetailRepository → strict runtime-validated projection → detail UI`; exact implementation QA accepted, but PR/merge/closeout/terminal freeze are still pending. |
| `/dashboard` | `FINAL_PRIVATE` | Player Dashboard productionization + closeout accepted. |
| `/dashboard/tournaments` | `FINAL_PRIVATE` | F03 terminally frozen; Issue #38 completed. |
| `/dashboard/matches` | `FINAL_PRIVATE` | F04 terminally frozen; Issue #41 completed. |
| `/dashboard/profile` | `FINAL_PRIVATE` | F09 terminally frozen; Issue #56 completed. |
| `/dashboard/notifications` | `FINAL_PRIVATE` | F10 terminally frozen; Issue #59 completed. Runtime API remains backend pending. |
| `/dashboard/settings` | `FINAL_PRIVATE` | F11 terminally frozen; Issue #62 completed. |
| `/dashboard/rivalries` | `FINAL_PRIVATE` | F12 terminally frozen; Issue #65 completed. |
| `/dashboard/achievements` | `FINAL_PRIVATE` | F13 terminally frozen; Issue #68 completed. |
| `/dashboard/teams` | `FINAL_PRIVATE` | F14 terminally frozen; Issue #71 completed. |
| `/dashboard/challenges` | `FINAL_PRIVATE` | F15 terminally frozen; Issue #77 completed. |
| `/matches/$id/result` | `FINAL_PRIVATE` | F05 terminally frozen; Issue #44 completed. |
| `/matches/$id/dispute` | `FINAL_PRIVATE` | F06 terminally frozen; Issue #47 completed. |
| `/login` | `FINAL_PRIVATE` | F07 terminally frozen; Phone OTP, Django Session + CSRF. |
| `/register` | `FINAL_PRIVATE` | F08 terminally frozen; Issue #53 completed. |
| `/tournaments/$id` | `FINAL_PRE_SEO` | F01 accepted before current strict SEO final-copy protocol. |
| `/tournaments/$id/register` | `FINAL_PRIVATE` | F01 final private registration action route. |
| `/games/$slug` | `FINAL_CURRENT` | F02 technical + SEO/final-copy acceptance terminally recorded; frozen/protected. |

## B. Public competitive routes requiring current-law recertification

| Route | Status | Why it is not current-law final |
|---|---|---|
| `/ranking` | `NEEDS_RECERTIFICATION` | No dedicated final ranking contract/SSR/search-intent workstream. |
| `/players/$username` | `NEEDS_RECERTIFICATION` | Uses frontend/local ranking-derived truth and needs authoritative player/rating contract reconciliation. |
| `/host` | `NEEDS_RECERTIFICATION` | Public acquisition route has not passed current page + SEO gates. |
| `/rules` | `NEEDS_RECERTIFICATION` | Must be reconciled with authoritative ruleset/product copy and current evidence law. |

## C. Active F20 Public Gaming Center Detail truth

Permanent target architecture:

`route publicId param → SSR loader → typed GamingCenterDetailRepository → strict runtime-validated detail projection → Gaming Center Detail UI`

Canonical identity:
- F20 v1 canonical public route key = `publicId`;
- canonical URL `/centers/{publicId}`;
- `centerId` remains stable backend relation/entity identity;
- display name is never a relation key;
- future slug migration requires explicit redirect/alias compatibility work.

Planned production endpoint:

`GET /api/v1/centers/{publicId}/`

Production invariants:
- production defaults to Django HTTP adapter;
- requires `VITE_API_BASE_URL`;
- 404 maps to not-found;
- non-404 HTTP errors fail closed;
- strict runtime validation required;
- returned `publicId` must match requested identity;
- no fixture fallback in production;
- no rating/review projection;
- no tournament relation by center display name.

Public visit-information policy:
- address/phone/opening hours/map are displayed only when explicitly public in the authoritative projection;
- missing values are valid and never fabricated.

LocalBusiness policy:
- emit generic `LocalBusiness` only when complete authoritative public address exists and is visibly rendered;
- optional public phone/opening hours only when authoritative;
- no rating/review schema;
- no public address => no LocalBusiness markup.

Indexing policy:
- found published detail: canonical `/centers/{publicId}`, robots `index,follow`;
- not-found/non-public state: no public detail projection, `noindex,nofollow` metadata path.

Current runtime remains:

`FRONTEND MOCK / BACKEND PENDING`

Exact implementation source head before governance checkpoint:

`a424b8ef1ea9cef4173ce5caa86106371281e1e4`

Exact-head QA:
- Full `34653443343` PASS; artifact `10284697461`; digest `sha256:d241f96dafd5394b1de5c4bdd2eb9d2d4871f68dc66b22b36be31a8d556ef773`;
- F20 `34653443430` PASS; artifact `10284771804`; digest `sha256:1ce354668583c5b9fba17811640eb5d5990e9a42ded90f93c0799b911bdc6661`;
- c1 + c4 responsive evidence manually inspected at 375/390/430/768/1024/1440 without observed overflow/clipping/overlap.

Backend F20 documentation alignment:
- Issue #37 CLOSED / COMPLETED;
- PR #38 MERGED;
- backend main `e8e48061cba201b3a12ac534ef97f22565bea5a3`;
- PR gate `34653701760` PASS on Python 3.12/3.14;
- post-main gate `34653883656` PASS on Python 3.12/3.14;
- Backend NEXT remains `P02 — Games / Catalog Foundation`.

## D. Accepted F19 Public Gaming Center Discovery truth

Permanent route architecture:

`validated URL search → loaderDeps → SSR loader → typed GamingCenterDiscoveryRepository → runtime-validated directory projection → Gaming Center Discovery UI`

Production invariant:
- planned endpoint `GET /api/v1/centers/`;
- no production fixture fallback;
- no rating/review fields;
- backend/repository owns public membership/order/verification/locality/facilities/count/filter/pagination truth.

SEO truth:
- H1 `گیم‌نت‌ها و مراکز گیمینگ میزبان مسابقات`;
- title `گیم‌نت‌ها و مراکز گیمینگ میزبان مسابقات | Turnoment`;
- base canonical `/centers`, robots `index,follow`;
- city/page variants `noindex,follow` + canonical `/centers`;
- no LocalBusiness markup on the multi-entity listing.

Terminal frozen main:

`a473613191fd5132664c5234b692befda4a5cf41`

## E. Other accepted public discovery truth

F18 `/games`:
- `SSR loader → typed GameCatalogRepository → runtime-validated projection → UI`;
- planned `GET /api/v1/games/`;
- canonical `/games`, robots `index,follow`.

F17 `/tournaments`:
- validated URL search + loaderDeps + SSR loader + typed repository;
- planned `GET /api/v1/tournaments/`;
- base canonical `/tournaments`, robots `index,follow`;
- normalized facet/page variants `noindex,follow`.

## F. Inherited legacy / ecommerce / non-competitive routes

Commerce/checkout legacy:
- `/cart`
- `/checkout`
- `/products`
- `/products/$slug`
- `/category/$slug`
- `/payment/result`
- `/dashboard/orders`
- `/dashboard/addresses`
- `/dashboard/wishlist`

Service/ecommerce legacy:
- `/services`
- `/services/request`
- `/dashboard/services`

General content requiring explicit product decision:
- `/about`
- `/blog`
- `/blog/$slug`
- `/contact`
- `/faq`

All above remain `LEGACY_REVIEW`.

## G. Shared accepted private/account invariants

Existing final private routes retain their frozen records. Shared invariants include:
- Django Session authority;
- CSRF bootstrap + `credentials: include` + `X-CSRFToken` on unsafe calls;
- no localStorage/sessionStorage bearer token;
- private `noindex,nofollow`;
- final Persian copy/accessibility/responsive states;
- QA fixtures test-only behind permanent production contracts.

Competitive truth retained:
- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth.

## H. Compliance priorities / NEXT

Immediate active task: finish F20 implementation PR → post-main QA → documentation-only closeout → terminal frozen-main QA without reopening frozen F19/F18/F17/F16/F02 source.

After terminal F20 freeze, next public recertification order:

`/ranking` → `/players/$username` → `/host` → `/rules`

unless an explicit product decision changes order.

Backend NEXT independently remains:

`P02 — Games / Catalog Foundation`

## I. Registry maintenance law

- A route cannot be promoted from chat memory.
- `IN_PROGRESS` is mandatory while required implementation/merge/post-main evidence is missing.
- Route-level `FINAL_CURRENT` may be promoted non-recursively only after accepted implementation merge + required post-main gates.
- Terminal workstream `DONE / MERGED / FROZEN` additionally requires closeout merge + terminal main CI recorded in the tracking Issue.
- If implementation truth and this registry conflict, treat the route as not final until reconciled.
- Do not create recursive documentation commits merely to record their own future SHA; terminal closeout SHA/CI belongs in the tracking Issue after merge.
