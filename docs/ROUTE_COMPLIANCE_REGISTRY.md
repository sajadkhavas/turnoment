# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.
>
> Every chat/agent modifying an existing route MUST read this registry together with `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, and when applicable `SEO_FINAL_COPY_PROTOCOL.md`.

Last audit: `2026-09-11`

Audit baseline: `638d3de4006372e8ec2604152a7523a10f39ea63` — F13 implementation merge; post-implementation main Frontend Quality Gate `34536367379` PASS; artifact `10175682558`; digest `sha256:263e59b171afa14882c7b0e454dff927647128a33be0909147ebfd1ff25f9254`.

F13 `/dashboard/achievements` is promoted non-recursively to `FINAL_PRIVATE` because its implementation is merged and required post-implementation main QA is green. The F13 workstream itself is not terminally `DONE / MERGED / FROZEN` until documentation-only closeout merge plus terminal frozen-main CI/artifact/digest are recorded in Issue #68.

F12 terminal truth: frozen main `a058de708c755d98e7180ffee616b50cbdd8598c`; terminal gate `34520157521` PASS; artifact `10169424034`; digest `sha256:167894d704c2c548f6cf40102bb67f2f584afeff09f8bff96b20a837828911e4`; Issue #65 CLOSED / COMPLETED.

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
| `/dashboard` | `FINAL_PRIVATE` | Player Dashboard productionization + closeout accepted; private session/repository/runtime contract. |
| `/dashboard/tournaments` | `FINAL_PRIVATE` | F03 terminally frozen; Issue #38 completed. |
| `/dashboard/matches` | `FINAL_PRIVATE` | F04 terminally frozen; Issue #41 completed. |
| `/dashboard/profile` | `FINAL_PRIVATE` | F09 terminally frozen; Issue #56 completed. |
| `/dashboard/notifications` | `FINAL_PRIVATE` | F10 terminally frozen; Issue #59 completed. Runtime notification APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/settings` | `FINAL_PRIVATE` | F11 terminally frozen; Issue #62 completed. Runtime settings APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/rivalries` | `FINAL_PRIVATE` | F12 terminally frozen; frozen main `a058de708c755d98e7180ffee616b50cbdd8598c`; terminal gate `34520157521` PASS; artifact `10169424034`; Issue #65 completed. Runtime Rivalries API remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/achievements` | `FINAL_PRIVATE` | F13 implementation accepted/merged. START `a058de708c755d98e7180ffee616b50cbdd8598c`; final reviewed head `f3806f5403157a4d0ca97d51bf69ded2e9dcff53`; exact-head gate `34523505639` PASS; PR #69 gate `34535849148` PASS; implementation merge `638d3de4006372e8ec2604152a7523a10f39ea63`; post-main gate `34536367379` PASS; artifact `10175682558`; digest `sha256:263e59b171afa14882c7b0e454dff927647128a33be0909147ebfd1ff25f9254`. Runtime Achievements API remains `FRONTEND MOCK / BACKEND PENDING`. F13 terminal closeout remains Issue #68. |
| `/matches/$id/result` | `FINAL_PRIVATE` | F05 terminally frozen; Issue #44 completed. Runtime result APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/matches/$id/dispute` | `FINAL_PRIVATE` | F06 terminally frozen; Issue #47 completed. Runtime dispute APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/login` | `FINAL_PRIVATE` | F07 terminally frozen; Phone OTP, Django Session + CSRF, no password/local bearer auth. |
| `/register` | `FINAL_PRIVATE` | F08 terminally frozen; Issue #53 completed. |
| `/tournaments/$id` | `FINAL_PRE_SEO` | F01 terminally accepted before current strict SEO final-copy protocol. |
| `/tournaments/$id/register` | `FINAL_PRIVATE` | F01 final tournament-registration action route; private noindex and Session/CSRF boundary accepted. |
| `/games/$slug` | `FINAL_CURRENT` | F02 technical + SEO/final-copy acceptance terminally recorded in Issue #29. |

## B. Public competitive routes requiring current-law recertification

| Route | Status | Why it is not current-law final |
|---|---|---|
| `/` | `NEEDS_RECERTIFICATION` | No complete current official-doc + design + SEO + production-contract + evidence chain. |
| `/tournaments` | `NEEDS_RECERTIFICATION` | Discovery route predates the full final-page/SEO evidence system. |
| `/games` | `NEEDS_RECERTIFICATION` | Local direct data usage; no current-law listing contract/SEO workstream. |
| `/centers` | `NEEDS_RECERTIFICATION` | Local direct data; no final repository/runtime contract/current SEO evidence. |
| `/centers/$id` | `NEEDS_RECERTIFICATION` | Local lookups; lacks current final contract/SEO evidence and stable public identifier decision. |
| `/ranking` | `NEEDS_RECERTIFICATION` | No dedicated final ranking contract/SSR/search-intent workstream. |
| `/players/$username` | `NEEDS_RECERTIFICATION` | Uses local ranking data/frontend-derived values; must move to authoritative player/rating contract. |
| `/host` | `NEEDS_RECERTIFICATION` | Public acquisition route has not passed current final page + SEO gates. |
| `/rules` | `NEEDS_RECERTIFICATION` | Must be reconciled with authoritative ruleset/product copy and current evidence law. |

## C. Known rebuild routes

No currently accepted auth/account route remains in `REBUILD`.

## D. Player dashboard routes that remain explicit placeholders

| Route | Status | Planned product workstream |
|---|---|---|
| `/dashboard/challenges` | `PLACEHOLDER` | Challenge Hub. Lovable planning/output does not become accepted implementation until its own controlled evidence chain lands. |
| `/dashboard/teams` | `PLACEHOLDER` | Team / Clan operations. |

`/dashboard/rivalries` and `/dashboard/achievements` are no longer placeholders; they are listed in section A as `FINAL_PRIVATE`.

## E. Private dashboard routes requiring recertification

No currently identified private account route remains in this section. Any newly discovered route must be added through source audit.

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

## G. Accepted private account / player truth

### `/login` — F07
`validated optional redirect → SSR loader → typed LoginAuthRepository → runtime-validated adapter → OTP Login UI`

### `/register` — F08
`validated optional redirect → route loader/session preflight → typed LoginAuthRepository → runtime-validated P01 actions → OTP Account Onboarding UI`

### `/dashboard/profile` — F09
`private dashboard access policy → route loader → typed PlayerProfileRepository → runtime-validated P01 player/profile payload → Profile UI`

### `/dashboard/notifications` — F10
`private dashboard access policy → validated state/kind/page → loader → typed PlayerNotificationsRepository → runtime-validated projection → Notifications Inbox UI`

### `/dashboard/settings` — F11
`private dashboard access policy → loader → typed PlayerSettingsRepository → runtime-validated settings projection → Settings UI`

### `/dashboard/rivalries` — F12
`private dashboard access policy → validated game/kind/sort/page search → loader → typed PlayerRivalriesRepository → runtime-validated rivalry projection → Rivalries UI`

### `/dashboard/achievements` — F13
`private dashboard access policy → validated status/category/sort/page search → loader → typed PlayerAchievementsRepository → runtime-validated achievement projection → Achievements UI`

Shared permanent invariants:
- Django Session authority;
- P01 CSRF bootstrap + `credentials: include` + `X-CSRFToken` on unsafe calls;
- no localStorage/sessionStorage bearer token;
- private `noindex,nofollow`;
- final Persian copy/accessibility/responsive states;
- QA fixture is test-only and shares the permanent production contract.

F13-specific truth:
- achievement definitions/IDs/codes/categories/status/progress/unlock time/summary/filter/sort/pagination are backend/repository-owned;
- frontend never derives or awards an achievement from raw competitive history or infers status from progress;
- status is `locked | in-progress | unlocked` and progress is server-projected when present;
- no XP/coin/financial reward/trophy rarity/social comparison/claim mutation/Achievement Detail behavior is introduced;
- `/dashboard/challenges` remains isolated;
- backend docs alignment is terminally accepted, but runtime Achievements domain/endpoint is not implemented yet.

## H. Competitive truth retained

- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth.

## I. Compliance priorities

F13 documentation-only closeout is the immediate governance task until Issue #68 is completed.

Challenge Hub remains isolated under its own Lovable + acceptance chain and must not be modified by unrelated workstreams.

After F13 terminal freeze, `/dashboard/teams` is the next independent dashboard placeholder unless product priority explicitly selects another controlled workstream. Public competitive routes still require current-law recertification and `LEGACY_REVIEW` routes require explicit keep/remove/repurpose decisions before production delivery.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

## J. Registry maintenance law

- A route cannot be promoted from chat memory.
- A merged implementation with required green post-implementation main gate may be promoted non-recursively in closeout governance.
- Terminal workstream `DONE / MERGED / FROZEN` additionally requires closeout merge + terminal main CI recorded in its tracking Issue.
- New/placeholder/legacy routes remain visible until accepted or intentionally removed.
- If implementation truth and this registry conflict, treat the route as not final until reconciled.
