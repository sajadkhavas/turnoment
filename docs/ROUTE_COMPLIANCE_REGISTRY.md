# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.
>
> Every chat/agent modifying an existing route MUST read this registry together with `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, and when applicable `SEO_FINAL_COPY_PROTOCOL.md`.

Last audit: `2026-09-11`

Current audit baseline: `22e4c67425f2bf0cefe9079b2e014c2395f6448a` — F17 implementation merge; post-main Frontend Quality Gate `34617140049` PASS, artifact `10270983180`, digest `sha256:0ee55d941a16e51812ae89a0e66402c45dacaf70c6a1b5c60396528c86fb6c94`; focused F17 gate `34617140093` PASS, artifact `10270487803`, digest `sha256:a1752a6cd4deb55e5921cbe68b100d2f3d4689584fa279653521bce334b30c4e`; F16 Home regression gate `34617140003` PASS.

F17 `/tournaments` is promoted non-recursively to `FINAL_CURRENT` because its current-law implementation is merged and required post-implementation main QA is green. The F17 workstream itself remains `MERGED / CLOSEOUT IN PROGRESS` until documentation-only closeout merge plus terminal frozen-main CI/artifact/digest are recorded in Issue #84.

F16 terminal truth: frozen main `fb87a7d84470db6ed1eba03ce0251c5f1eb6b7a9`; Issue #81 CLOSED / COMPLETED; terminal Frontend Quality Gate `34604894800` PASS and focused F16 gate `34604894703` PASS.

## Status meanings

- `FINAL_CURRENT` — accepted under the current applicable protocol set, including current SEO/final-copy law for public/indexable pages.
- `FINAL_PRIVATE` — final private/noindex route; public SEO research is not applicable, but final architecture/UX/contracts are accepted.
- `FINAL_PRE_SEO` — technically/factually final under page protocol but frozen before the stricter SEO final-copy law.
- `IN_PROGRESS` — active controlled workstream exists; not final until its required acceptance chain is complete.
- `NEEDS_RECERTIFICATION` — route exists but has not passed the full current-law evidence chain.
- `PLACEHOLDER` — intentionally incomplete/temporary product surface; must be rebuilt before product acceptance.
- `REBUILD` — known product/architecture truth is wrong and must be rebuilt rather than patched as-is.
- `LEGACY_REVIEW` — inherited non-Turnoment/ecommerce/general-site route; not an approved competitive architecture reference.

## A. Accepted / active competitive routes

| Route | Status | Evidence / exact truth |
|---|---|---|
| `/` | `FINAL_CURRENT` | F16 terminally frozen. Issue #81 CLOSED / COMPLETED; frozen main `fb87a7d84470db6ed1eba03ce0251c5f1eb6b7a9`; terminal full gate `34604894800` PASS; terminal focused F16 gate `34604894703` PASS. Permanent boundary: SSR loader → typed `PublicHomeRepository` → runtime-validated projection → UI. Runtime endpoint remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/tournaments` | `FINAL_CURRENT` | F17 implementation accepted under current public-page + SEO law. START `fb87a7d84470db6ed1eba03ce0251c5f1eb6b7a9`; implementation head `e160029e30cba55543abffc4a7974f261ecd2ad4`; PR #87 MERGED; implementation merge `22e4c67425f2bf0cefe9079b2e014c2395f6448a`; post-main full gate `34617140049` PASS; focused F17 gate `34617140093` PASS; F16 regression gate `34617140003` PASS. Permanent boundary: validated URL search → loaderDeps → SSR loader → typed `TournamentDiscoveryRepository` → runtime-validated projection → UI. Runtime endpoint remains `FRONTEND MOCK / BACKEND PENDING`; F17 terminal closeout remains Issue #84. |
| `/dashboard` | `FINAL_PRIVATE` | Player Dashboard productionization + closeout accepted; private session/repository/runtime contract. |
| `/dashboard/tournaments` | `FINAL_PRIVATE` | F03 terminally frozen; Issue #38 completed. |
| `/dashboard/matches` | `FINAL_PRIVATE` | F04 terminally frozen; Issue #41 completed. |
| `/dashboard/profile` | `FINAL_PRIVATE` | F09 terminally frozen; Issue #56 completed. |
| `/dashboard/notifications` | `FINAL_PRIVATE` | F10 terminally frozen; Issue #59 completed. Runtime notification APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/settings` | `FINAL_PRIVATE` | F11 terminally frozen; Issue #62 completed. Runtime settings APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/rivalries` | `FINAL_PRIVATE` | F12 terminally frozen; Issue #65 completed. Runtime Rivalries API remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/achievements` | `FINAL_PRIVATE` | F13 terminally frozen; Issue #68 completed. Runtime Achievements API remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/teams` | `FINAL_PRIVATE` | F14 terminally frozen; Issue #71 completed. Runtime Teams API remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/challenges` | `FINAL_PRIVATE` | F15 terminally frozen; Issue #77 completed. Runtime Challenge APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/matches/$id/result` | `FINAL_PRIVATE` | F05 terminally frozen; Issue #44 completed. Runtime result APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/matches/$id/dispute` | `FINAL_PRIVATE` | F06 terminally frozen; Issue #47 completed. Runtime dispute APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/login` | `FINAL_PRIVATE` | F07 terminally frozen; Phone OTP, Django Session + CSRF, no password/local bearer auth. |
| `/register` | `FINAL_PRIVATE` | F08 terminally frozen; Issue #53 completed. |
| `/tournaments/$id` | `FINAL_PRE_SEO` | F01 terminally accepted before current strict SEO final-copy protocol. |
| `/tournaments/$id/register` | `FINAL_PRIVATE` | F01 final tournament-registration action route; private noindex and Session/CSRF boundary accepted. |
| `/games/$slug` | `FINAL_CURRENT` | F02 technical + SEO/final-copy acceptance terminally recorded in its tracking evidence; F17 deliberately leaves its shared discovery card/source untouched. |

## B. Public competitive routes requiring current-law recertification

| Route | Status | Why it is not current-law final |
|---|---|---|
| `/games` | `NEEDS_RECERTIFICATION` | Local direct data usage; no current-law listing contract/SEO workstream. |
| `/centers` | `NEEDS_RECERTIFICATION` | Local direct data; no final repository/runtime contract/current SEO evidence. |
| `/centers/$id` | `NEEDS_RECERTIFICATION` | Local lookups; lacks current final contract/SEO evidence and stable public identifier decision. |
| `/ranking` | `NEEDS_RECERTIFICATION` | No dedicated final ranking contract/SSR/search-intent workstream. |
| `/players/$username` | `NEEDS_RECERTIFICATION` | Uses local ranking data/frontend-derived values; must move to authoritative player/rating contract. |
| `/host` | `NEEDS_RECERTIFICATION` | Public acquisition route has not passed current final page + SEO gates. |
| `/rules` | `NEEDS_RECERTIFICATION` | Must be reconciled with authoritative ruleset/product copy and current evidence law. |

## C. Known rebuild / placeholder routes

No currently accepted auth/account or player-dashboard route remains in `REBUILD` or `PLACEHOLDER`. Any newly discovered route requires its own product decision, exact-source audit and controlled workstream.

## D. Inherited legacy / ecommerce / non-competitive routes

Commerce / checkout legacy:
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

## E. Accepted public Home truth — F16

Permanent route architecture:

`public / route → SSR loader → typed PublicHomeRepository → runtime-validated public-home projection → Home UI`

Key invariants retained:
- backend/repository owns dynamic discovery truth, verification, lifecycle/capacity and ranking/result-derived facts;
- frontend owns static final copy, temporary finder state, semantic navigation and presentation;
- production never silently falls back to fabricated Home records;
- canonical `/`, robots `index,follow`, SSR public content;
- legacy `ایران مهر افزار` shell branding and fabricated contact/social facts remain removed;
- backend planned endpoint `GET /api/v1/discovery/home/` remains pending authorized runtime implementation.

## F. Accepted Public Tournament Discovery truth — F17

Permanent route architecture:

`validated URL search → loaderDeps → SSR loader → typed TournamentDiscoveryRepository → runtime-validated discovery projection → UI`

Backend/repository owns:
- filter validation and query semantics;
- ordering and pagination;
- stable tournament/game/venue identity;
- lifecycle and registration state;
- center verification/location;
- capacity, entry fee, fixed prize and featured identity.

Frontend owns:
- validated/shareable URL navigation state;
- page reset when facets change;
- static Persian final copy;
- accessibility/responsive presentation;
- base-vs-faceted canonical/robots policy;
- deterministic dev/test/visual-QA fixture behind the same typed contract.

Production invariant:
- planned endpoint `GET /api/v1/tournaments/`;
- production HTTP adapter does not silently fall back to fixture records;
- production does not download arbitrary inventory and become authoritative for filtering/sorting/pagination.

SEO/final-copy truth:
- H1 `تورنمنت‌ها و مسابقات گیمینگ حضوری`;
- title `تورنمنت‌ها و مسابقات گیمینگ حضوری | Turnoment`;
- base `/tournaments` canonical `/tournaments`, robots `index,follow`;
- normalized filtered/sorted/paginated variants `noindex,follow` + canonical `/tournaments`;
- primary inventory SSR-rendered;
- Event structured data intentionally omitted on the multi-event listing route;
- no unsupported popularity/search-volume/ranking/superlative claims.

Frozen-route protection:
- F02 `/games/$slug` and shared `src/components/tournaments/tournament-discovery-card.tsx` remain outside the F17 final diff;
- F17 owns `tournament-inventory-card.tsx` instead.

Backend alignment:
- backend Issue #31 CLOSED / COMPLETED;
- backend PR #32 MERGED;
- accepted backend main `a5644ae4b4e64908088f389e43155c268fe6e29d`;
- post-main backend gate `34609435404` PASS on Python 3.12/3.14;
- Backend NEXT remains `P02 — Games / Catalog Foundation`;
- runtime remains `FRONTEND MOCK / BACKEND PENDING` until authorized endpoint implementation lands.

## G. Accepted private account / player invariants

Existing final private routes retain their frozen architecture records. Shared invariants include:
- Django Session authority;
- P01 CSRF bootstrap + `credentials: include` + `X-CSRFToken` on unsafe calls;
- no localStorage/sessionStorage bearer token;
- private `noindex,nofollow`;
- final Persian copy/accessibility/responsive states;
- QA fixture test-only behind the same permanent production contract.

Competitive truth retained:
- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth.

## H. Compliance priorities

F17 documentation-only closeout is the immediate governance task until Issue #84 is completed.

After F17 terminal freeze, the next current-law public recertification target is `/games`, followed by `/centers`, `/centers/$id`, `/ranking`, `/players/$username`, `/host`, and `/rules` unless an explicit product decision changes order.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

## I. Registry maintenance law

- A route cannot be promoted from chat memory.
- A merged implementation with required green post-implementation main gate may be promoted non-recursively in closeout governance.
- Terminal workstream `DONE / MERGED / FROZEN` additionally requires closeout merge + terminal main CI recorded in its tracking Issue.
- New/placeholder/legacy routes remain visible until accepted or intentionally removed.
- If implementation truth and this registry conflict, treat the route as not final until reconciled.
- Do not create recursive documentation-only commits merely to record the SHA of the commit containing that same record; terminal closeout SHA/CI belongs in the tracking Issue after merge.
