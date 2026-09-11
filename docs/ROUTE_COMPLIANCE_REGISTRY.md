# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.
>
> Every chat/agent modifying an existing route MUST read this registry together with `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, and when applicable `SEO_FINAL_COPY_PROTOCOL.md`.

Last audit: `2026-09-11`

Current terminal frontend baseline before active F19:

`41bdbb90f127474ecabd61cb5ceda5db1b91ae49` — F18 terminal frozen main.

F18 terminal evidence:
- Issue #89 CLOSED / COMPLETED;
- implementation PR #90 MERGED;
- closeout PR #91 MERGED;
- terminal Frontend Quality Gate `34633797889` PASS, artifact `10276883583`, digest `sha256:c744532c931fde55fdc27c66b0f8c8eb5d7ea1de1ec2329ddb01ca21f5471826`;
- terminal focused F18 gate `34633797871` PASS, artifact `10276653827`, digest `sha256:1a2de3b501d690cc72faf1c1f1238daa0a71647a7f1d131bb30b9668619180da`;
- exact frozen main `41bdbb90f127474ecabd61cb5ceda5db1b91ae49`.

Active current-law workstream:

`F19 — Public Gaming Center Discovery` — Issue #92 — branch `phase/f19-public-gaming-center-discovery` — START `41bdbb90f127474ecabd61cb5ceda5db1b91ae49`.

## Status meanings

- `FINAL_CURRENT` — accepted under the current applicable protocol set, including current SEO/final-copy law for public/indexable pages.
- `FINAL_PRIVATE` — final private/noindex route; public SEO research is not applicable, but final architecture/UX/contracts are accepted.
- `FINAL_PRE_SEO` — technically/factually final under page protocol but frozen before the stricter SEO final-copy law.
- `IN_PROGRESS` — active controlled workstream exists; not final until its full acceptance chain is complete.
- `NEEDS_RECERTIFICATION` — route exists but has not passed the full current-law evidence chain.
- `PLACEHOLDER` — intentionally incomplete/temporary product surface; must be rebuilt before product acceptance.
- `REBUILD` — known product/architecture truth is wrong and must be rebuilt rather than patched as-is.
- `LEGACY_REVIEW` — inherited non-Turnoment/ecommerce/general-site route; not an approved competitive architecture reference.

## A. Accepted / active competitive routes

| Route | Status | Evidence / exact truth |
|---|---|---|
| `/` | `FINAL_CURRENT` | F16 terminally frozen. Issue #81 CLOSED / COMPLETED. Permanent boundary: SSR loader → typed `PublicHomeRepository` → runtime-validated projection → UI. Runtime remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/tournaments` | `FINAL_CURRENT` | F17 terminally frozen. Issue #84 CLOSED / COMPLETED; frozen main `73955783add94c562f4eea0bb55300aab077c342`. Permanent boundary: validated URL search → loaderDeps → SSR loader → typed `TournamentDiscoveryRepository` → runtime-validated projection → UI. Runtime remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/games` | `FINAL_CURRENT` | F18 terminally frozen. Issue #89 CLOSED / COMPLETED; implementation PR #90 MERGED; closeout PR #91 MERGED; frozen main `41bdbb90f127474ecabd61cb5ceda5db1b91ae49`; terminal full gate `34633797889` PASS; terminal focused gate `34633797871` PASS. Permanent boundary: `/games → SSR loader → typed GameCatalogRepository → runtime-validated catalog projection → UI`. Runtime remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/centers` | `IN_PROGRESS` | F19 current-law recertification. Issue #92 OPEN; START `41bdbb90f127474ecabd61cb5ceda5db1b91ae49`; branch `phase/f19-public-gaming-center-discovery`; target permanent boundary `validated URL search → loaderDeps → SSR loader → typed GamingCenterDiscoveryRepository → runtime-validated directory projection → UI`; planned `GET /api/v1/centers/`; runtime remains `FRONTEND MOCK / BACKEND PENDING`. `/centers/$id` is protected as a separate next workstream. |
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
| `/games/$slug` | `FINAL_CURRENT` | F02 technical + SEO/final-copy acceptance terminally recorded. Frozen and protected outside later listing workstreams. |

## B. Public competitive routes requiring current-law recertification

| Route | Status | Why it is not current-law final |
|---|---|---|
| `/centers/$id` | `NEEDS_RECERTIFICATION` | Local lookup; lacks current repository/runtime contract, authoritative address/contact policy, current SEO evidence and final stable public identifier/canonical decision. |
| `/ranking` | `NEEDS_RECERTIFICATION` | No dedicated final ranking contract/SSR/search-intent workstream. |
| `/players/$username` | `NEEDS_RECERTIFICATION` | Uses local ranking data/frontend-derived values; must move to authoritative player/rating contract. |
| `/host` | `NEEDS_RECERTIFICATION` | Public acquisition route has not passed current final page + SEO gates. |
| `/rules` | `NEEDS_RECERTIFICATION` | Must be reconciled with authoritative ruleset/product copy and current evidence law. |

## C. Active F19 Public Gaming Center Discovery truth

Permanent route architecture:

`validated URL search → loaderDeps → SSR loader → typed GamingCenterDiscoveryRepository → runtime-validated directory projection → Gaming Center Discovery UI`

Repository/backend owns:
- published center membership/order;
- stable center ID + public navigation-key projection;
- verification state;
- stable city identity/slug + district;
- public center summary;
- equipment labels;
- optional cover image;
- nullable authoritative upcoming-tournament count;
- city facets/counts/filtering;
- pagination.

Frontend owns:
- safe normalized/shareable `city` and `page` URL state;
- final Persian page copy and information hierarchy;
- presentation/accessibility/responsive behavior;
- canonical/robots policy;
- deterministic dev/test/visual-QA fixture behind the same typed contract.

Production invariant:
- planned endpoint `GET /api/v1/centers/`;
- production HTTP adapter fails closed;
- production MUST NOT silently fall back to fixture centers;
- production MUST NOT derive directory membership, verification, facility truth, city facets/filtering/pagination or tournament counts from local arrays;
- rating/review fields are intentionally absent from F19 v1.

SEO/final-copy lock:
- H1 `گیم‌نت‌ها و مراکز گیمینگ میزبان مسابقات`;
- title `گیم‌نت‌ها و مراکز گیمینگ میزبان مسابقات | Turnoment`;
- base canonical `/centers`;
- base robots `index,follow`;
- current city/page variants `noindex,follow` + canonical `/centers`;
- SSR primary directory;
- no LocalBusiness structured data on this multi-entity listing;
- no unsupported popularity/rating/review/superlative claims.

F19 remains `IN_PROGRESS` until exact-head QA, implementation PR, post-main QA, documentation-only closeout, terminal frozen-main QA and Issue #92 completion exist.

## D. Accepted F18 Public Game Catalog truth

Permanent route architecture:

`/games → SSR loader → typed GameCatalogRepository → runtime-validated catalog projection → Game Catalog UI`

Production invariant:
- planned endpoint `GET /api/v1/games/`;
- no production fixture fallback;
- backend/repository owns published catalog membership/order, stable game identity, canonical slug and optional authoritative tournament count.

SEO truth:
- H1 `بازی‌های مسابقات گیمینگ`;
- title `بازی‌های مسابقات گیمینگ حضوری | Turnoment`;
- canonical `/games`;
- robots `index,follow`.

## E. Accepted F17 Public Tournament Discovery truth

Permanent route architecture:

`validated URL search → loaderDeps → SSR loader → typed TournamentDiscoveryRepository → runtime-validated discovery projection → UI`

Production invariant:
- planned endpoint `GET /api/v1/tournaments/`;
- no production fixture fallback;
- backend/repository owns filtering/order/pagination, lifecycle/registration, venue verification, capacity, fee/prize and featured identity.

SEO truth:
- H1 `تورنمنت‌ها و مسابقات گیمینگ حضوری`;
- title `تورنمنت‌ها و مسابقات گیمینگ حضوری | Turnoment`;
- base canonical `/tournaments`, robots `index,follow`;
- normalized facet/sort/page variants `noindex,follow` + canonical `/tournaments`.

## F. Inherited legacy / ecommerce / non-competitive routes

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

## G. Shared accepted private/account invariants

Existing final private routes retain their frozen architecture records. Shared invariants include:
- Django Session authority;
- CSRF bootstrap + `credentials: include` + `X-CSRFToken` on unsafe calls;
- no localStorage/sessionStorage bearer token;
- private `noindex,nofollow`;
- final Persian copy/accessibility/responsive states;
- QA fixture test-only behind the same permanent production contract.

Competitive truth retained:
- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth.

## H. Compliance priorities / NEXT

Immediate active task: complete F19 `/centers` exact-head QA and acceptance chain without mutating `/centers/$id` or frozen F16/F17/F18/F02 source.

After F19 terminal freeze, next public recertification order is:

`/centers/$id` → `/ranking` → `/players/$username` → `/host` → `/rules`

unless an explicit product decision changes order.

Backend NEXT independently remains:

`P02 — Games / Catalog Foundation`

## I. Registry maintenance law

- A route cannot be promoted from chat memory.
- `IN_PROGRESS` is mandatory while any required implementation/merge/terminal gate is missing.
- A merged implementation with required green post-implementation main gates may be promoted non-recursively in closeout governance.
- Terminal `DONE / MERGED / FROZEN` additionally requires closeout merge + terminal main CI recorded in its tracking Issue.
- New/placeholder/legacy routes remain visible until accepted or intentionally removed.
- If implementation truth and this registry conflict, treat the route as not final until reconciled.
- Do not create recursive documentation-only commits merely to record the SHA of the commit containing that same record; terminal closeout SHA/CI belongs in the tracking Issue after merge.
