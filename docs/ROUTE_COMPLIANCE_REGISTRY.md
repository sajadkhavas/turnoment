# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.
>
> Every chat/agent modifying an existing route MUST read this registry together with `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, and when applicable `SEO_FINAL_COPY_PROTOCOL.md`.

Last audit: `2026-09-11`

Current accepted implementation main before F18 closeout:

`112c3bbd2df7ca3988c81efa4dfb6ad569f621c2`

Active governance workstream:

`F18 — Public Game Catalog` — Issue #89 — closeout branch `closeout/f18-public-game-catalog`.

The F18 implementation is merged and required post-main implementation QA is green. Therefore `/games` is promoted non-recursively to `FINAL_CURRENT`, while the F18 workstream remains `MERGED / CLOSEOUT IN PROGRESS` until closeout merge and terminal frozen-main evidence are recorded in Issue #89.

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
| `/tournaments` | `FINAL_CURRENT` | F17 terminally frozen. Issue #84 CLOSED / COMPLETED; implementation PR #87 MERGED; closeout PR #88 MERGED; frozen main `73955783add94c562f4eea0bb55300aab077c342`. Permanent boundary: validated URL search → loaderDeps → SSR loader → typed `TournamentDiscoveryRepository` → runtime-validated projection → UI. Runtime remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/games` | `FINAL_CURRENT` | F18 implementation merged in PR #90 at `112c3bbd2df7ca3988c81efa4dfb6ad569f621c2`; post-main full gate `34631796666` PASS and focused F18 gate `34631796765` PASS. Permanent boundary `/games → SSR loader → typed GameCatalogRepository → runtime-validated catalog projection → UI`. Route-level acceptance is current; workstream closeout/terminal freeze still pending Issue #89 terminal evidence. Runtime remains `FRONTEND MOCK / BACKEND PENDING`. |
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
| `/games/$slug` | `FINAL_CURRENT` | F02 technical + SEO/final-copy acceptance terminally recorded. Frozen dependency for F18 and kept outside F18 implementation diff. |

## B. Public competitive routes requiring current-law recertification

| Route | Status | Why it is not current-law final |
|---|---|---|
| `/centers` | `NEEDS_RECERTIFICATION` | Local direct data; no final repository/runtime contract/current SEO evidence. |
| `/centers/$id` | `NEEDS_RECERTIFICATION` | Local lookups; lacks current final contract/SEO evidence and stable public identifier decision. |
| `/ranking` | `NEEDS_RECERTIFICATION` | No dedicated final ranking contract/SSR/search-intent workstream. |
| `/players/$username` | `NEEDS_RECERTIFICATION` | Uses local ranking data/frontend-derived values; must move to authoritative player/rating contract. |
| `/host` | `NEEDS_RECERTIFICATION` | Public acquisition route has not passed current final page + SEO gates. |
| `/rules` | `NEEDS_RECERTIFICATION` | Must be reconciled with authoritative ruleset/product copy and current evidence law. |

## C. Accepted F18 Public Game Catalog truth

Permanent route architecture:

`/games → SSR loader → typed GameCatalogRepository → runtime-validated catalog projection → Game Catalog UI`

Repository/backend owns:
- published catalog membership and order;
- stable game ID + canonical slug;
- authoritative game name/short name/platform labels;
- game-entity summary/image;
- optional authoritative tournament-count projection.

Frontend owns:
- final Persian page copy and information hierarchy;
- presentation/accessibility/responsive behavior;
- canonical/robots policy;
- crawlable links into `/games/$slug` and `/tournaments?game=<stable-game-id>`;
- deterministic dev/test/visual-QA fixture behind the same typed contract.

Production invariant:
- planned endpoint `GET /api/v1/games/`;
- production HTTP adapter fails closed;
- production MUST NOT silently fall back to fixture games;
- production MUST NOT derive catalog membership/counts from local tournament arrays.

SEO/final-copy lock:
- H1 `بازی‌های مسابقات گیمینگ`;
- title `بازی‌های مسابقات گیمینگ حضوری | Turnoment`;
- canonical `/games`;
- robots `index,follow`;
- SSR primary catalog;
- no unsupported rich-result schema or popularity/search-volume/ranking/superlative claims.

Implementation acceptance evidence:
- START `73955783add94c562f4eea0bb55300aab077c342`;
- reviewed head `e44a3ba812a937aa41d5dbeb17c21b8ed641510d`;
- PR #90 MERGED;
- implementation merge/main `112c3bbd2df7ca3988c81efa4dfb6ad569f621c2`;
- exact-head full `34630735395` PASS and focused F18 `34630735403` PASS;
- PR-context full `34631270914` PASS and focused F18 `34631270926` PASS;
- post-main full `34631796666` PASS and focused F18 `34631796765` PASS;
- post-main F17 and F16 regression gates PASS;
- live main reverified exact implementation merge before closeout.

F18 workstream remains `MERGED / CLOSEOUT IN PROGRESS` until its documentation-only closeout is merged and terminal frozen-main evidence is recorded in Issue #89.

## D. Accepted F17 Public Tournament Discovery truth

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
- normalized filter/sort/page variants `noindex,follow` + canonical `/tournaments`.

## E. Inherited legacy / ecommerce / non-competitive routes

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

## F. Shared accepted private/account invariants

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

## G. Compliance priorities / NEXT

Immediate active task: finish F18 documentation-only closeout and terminal frozen-main evidence without mutating accepted source/runtime files.

After F18 terminal freeze, next public recertification order is:

`/centers` → `/centers/$id` → `/ranking` → `/players/$username` → `/host` → `/rules`

unless an explicit product decision changes order.

Backend NEXT independently remains:

`P02 — Games / Catalog Foundation`

## H. Registry maintenance law

- A route cannot be promoted from chat memory.
- `IN_PROGRESS` is mandatory while implementation/post-main acceptance is missing.
- A merged implementation with required green post-main gates may be promoted non-recursively to route-level `FINAL_CURRENT` in closeout governance.
- Workstream terminal `DONE / MERGED / FROZEN` additionally requires closeout merge + terminal main CI recorded in its tracking Issue.
- New/placeholder/legacy routes remain visible until accepted or intentionally removed.
- If implementation truth and this registry conflict, treat the route as not final until reconciled.
- Do not create recursive documentation-only commits merely to record the SHA of the commit containing that same record; terminal closeout SHA/CI belongs in the tracking Issue after merge.
