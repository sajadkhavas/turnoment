# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.
>
> Every chat/agent modifying an existing route MUST read this registry together with `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, and when applicable `SEO_FINAL_COPY_PROTOCOL.md`.

Last audit: `2026-09-11`

Current accepted frontend baseline before active F18:

`73955783add94c562f4eea0bb55300aab077c342` — F17 terminal frozen main.

F17 terminal evidence:
- Issue #84 CLOSED / COMPLETED;
- implementation PR #87 MERGED;
- closeout PR #88 MERGED;
- terminal Frontend Quality Gate `34618556371` PASS, artifact `10271498535`, digest `sha256:100caa7b4d63f2135008cb0295e5ffdeac55b0b944863731acb34f90f9a0891c`;
- terminal F17 focused gate `34618556522` PASS, artifact `10271735232`, digest `sha256:a6b549f6bbbd84f0ad46601a6a6fe0077109fd6ef73baf18c633a4a229920aa8`;
- exact frozen main `73955783add94c562f4eea0bb55300aab077c342`.

Active current-law workstream:

`F18 — Public Game Catalog` — Issue #89 — branch `phase/f18-public-game-catalog` — START `73955783add94c562f4eea0bb55300aab077c342`.

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
| `/` | `FINAL_CURRENT` | F16 terminally frozen. Issue #81 CLOSED / COMPLETED; frozen main `fb87a7d84470db6ed1eba03ce0251c5f1eb6b7a9`; terminal full gate `34604894800` PASS; terminal focused F16 gate `34604894703` PASS. Permanent boundary: SSR loader → typed `PublicHomeRepository` → runtime-validated projection → UI. Runtime remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/tournaments` | `FINAL_CURRENT` | F17 terminally frozen. Issue #84 CLOSED / COMPLETED; PR #87 MERGED; implementation merge `22e4c67425f2bf0cefe9079b2e014c2395f6448a`; closeout PR #88 MERGED; frozen main `73955783add94c562f4eea0bb55300aab077c342`; terminal full gate `34618556371` PASS; terminal focused gate `34618556522` PASS. Permanent boundary: validated URL search → loaderDeps → SSR loader → typed `TournamentDiscoveryRepository` → runtime-validated projection → UI. Runtime remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/games` | `IN_PROGRESS` | F18 current-law recertification. Issue #89 OPEN; START `73955783add94c562f4eea0bb55300aab077c342`; branch `phase/f18-public-game-catalog`; permanent target boundary `/games → SSR loader → typed GameCatalogRepository → runtime-validated catalog projection → UI`; planned production `GET /api/v1/games/`; runtime remains `FRONTEND MOCK / BACKEND PENDING` until P02 implementation. F02 `/games/$slug` is frozen and protected outside F18 diff. |
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
| `/games/$slug` | `FINAL_CURRENT` | F02 technical + SEO/final-copy acceptance terminally recorded. Frozen dependency for F18; must remain outside F18 implementation diff unless separately authorized. |

## B. Public competitive routes requiring current-law recertification

| Route | Status | Why it is not current-law final |
|---|---|---|
| `/centers` | `NEEDS_RECERTIFICATION` | Local direct data; no final repository/runtime contract/current SEO evidence. |
| `/centers/$id` | `NEEDS_RECERTIFICATION` | Local lookups; lacks current final contract/SEO evidence and stable public identifier decision. |
| `/ranking` | `NEEDS_RECERTIFICATION` | No dedicated final ranking contract/SSR/search-intent workstream. |
| `/players/$username` | `NEEDS_RECERTIFICATION` | Uses local ranking data/frontend-derived values; must move to authoritative player/rating contract. |
| `/host` | `NEEDS_RECERTIFICATION` | Public acquisition route has not passed current final page + SEO gates. |
| `/rules` | `NEEDS_RECERTIFICATION` | Must be reconciled with authoritative ruleset/product copy and current evidence law. |

## C. Active F18 public Game Catalog truth

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

F18 remains `IN_PROGRESS` until exact-head QA, implementation PR, post-main QA, documentation-only closeout, terminal frozen-main QA and Issue #89 completion exist.

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

Immediate active task: complete F18 `/games` exact-head QA and acceptance chain without mutating frozen F02 `/games/$slug`.

After F18 terminal freeze, next public recertification order is:

`/centers` → `/centers/$id` → `/ranking` → `/players/$username` → `/host` → `/rules`

unless an explicit product decision changes order.

Backend NEXT independently remains:

`P02 — Games / Catalog Foundation`

## H. Registry maintenance law

- A route cannot be promoted from chat memory.
- `IN_PROGRESS` is mandatory while any required implementation/merge/terminal gate is missing.
- A merged implementation with required green post-implementation main gates may be promoted non-recursively in closeout governance.
- Terminal `DONE / MERGED / FROZEN` additionally requires closeout merge + terminal main CI recorded in its tracking Issue.
- New/placeholder/legacy routes remain visible until accepted or intentionally removed.
- If implementation truth and this registry conflict, treat the route as not final until reconciled.
- Do not create recursive documentation-only commits merely to record the SHA of the commit containing that same record; terminal closeout SHA/CI belongs in the tracking Issue after merge.
