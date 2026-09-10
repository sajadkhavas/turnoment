# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.
>
> Every chat/agent modifying an existing route MUST read this registry together with `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, and when applicable `SEO_FINAL_COPY_PROTOCOL.md`.

Last audit: `2026-09-10`

Audit baseline: `0188324915160f5c6b751b831d394228688cc3f2` — F12 implementation merge; post-implementation main Frontend Quality Gate `34518845218` PASS; artifact `10168931114`; digest `sha256:250fa6ba63d84efc93af8e82bd2259f3b32c9cffb45d09f35285fc6e315fbf60`.

F12 `/dashboard/rivalries` is promoted non-recursively to `FINAL_PRIVATE` because its implementation is merged and post-implementation main QA is green. The F12 workstream itself is not terminally `DONE / MERGED / FROZEN` until documentation-only closeout merge + terminal frozen-main CI/artifact/digest are recorded in Issue #65.

F11 terminal truth: frozen main `47ea1ed9bda2a788860f382bc75ea50a83efaaf3`; terminal gate `34482788767` PASS; artifact `10154473010`; digest `sha256:6a77a9dbcf8cab8cad5c3a9bd4507ef31011d56c5f4b1b69c4368a64970f412c`; Issue #62 CLOSED / COMPLETED.

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
| `/dashboard/settings` | `FINAL_PRIVATE` | F11 terminally frozen. Frozen main `47ea1ed9bda2a788860f382bc75ea50a83efaaf3`; terminal gate `34482788767` PASS; artifact `10154473010`; Issue #62 completed. Runtime settings APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/rivalries` | `FINAL_PRIVATE` | F12 implementation accepted/merged. START `47ea1ed9bda2a788860f382bc75ea50a83efaaf3`; clean head `27fa3bc599923e8e9687197bd9e153748ebe565b`; exact-head gate `34517344762` PASS; PR #66 gate `34517973585` PASS; implementation merge `0188324915160f5c6b751b831d394228688cc3f2`; post-main gate `34518845218` PASS; artifact `10168931114`, digest `sha256:250fa6ba63d84efc93af8e82bd2259f3b32c9cffb45d09f35285fc6e315fbf60`. Runtime Rivalries API remains `FRONTEND MOCK / BACKEND PENDING`. F12 terminal closeout remains Issue #65. |
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
| `/dashboard/achievements` | `PLACEHOLDER` | Achievements. |
| `/dashboard/teams` | `PLACEHOLDER` | Team / Clan operations. |

`/dashboard/rivalries` is no longer a placeholder; it is listed in section A as `FINAL_PRIVATE`.

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

Shared permanent invariants:
- Django Session authority;
- P01 CSRF bootstrap + `credentials: include` + `X-CSRFToken` on unsafe calls;
- no localStorage/sessionStorage bearer token;
- private `noindex,nofollow`;
- final Persian copy/accessibility/responsive states;
- QA fixture is test-only and shares the permanent production contract.

F10-specific truth:
- backend owns recipient/list/content/read/order/summary/pagination truth;
- mark-one and mark-all are explicit actions;
- frontend does not optimistically own unread count;
- typed targets only; arbitrary href/open redirect is rejected;
- Challenge Detail URL is not invented.

F11-specific truth:
- only `tournament`, `match`, `challenge` are writable optional preferences;
- `account` and `system` remain required/non-disableable;
- settings revision is opaque and stale writes fail closed;
- preference changes do not mutate existing inbox items or competitive truth;
- backend docs alignment is terminally accepted but runtime settings domain is not implemented yet.

F12-specific truth:
- rivalry membership/identity/head-to-head/latest encounter/summary/filter/sort/pagination truth is backend/repository-owned;
- only finalized valid non-void encounters contribute;
- frontend never groups raw Match history into authoritative Rivalry rows;
- no Rivalry Detail route/link is introduced by F12;
- no friend/block/social graph, wager/stake or Challenge eligibility/rating behavior is introduced;
- backend docs alignment is terminally accepted, but runtime Rivalries domain/endpoint is not implemented yet.

## H. Competitive truth retained

- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth.

## I. Compliance priorities

F12 documentation-only closeout is the immediate governance task until Issue #65 is completed.

Challenge Hub / Detail remains isolated under its own Lovable + acceptance chain and must not be modified by unrelated workstreams.

After F12 terminal freeze, the next independent placeholder may be `/dashboard/achievements` or `/dashboard/teams` unless product priority explicitly selects another controlled workstream. Public competitive routes still require current-law recertification and `LEGACY_REVIEW` routes require explicit keep/remove/repurpose decisions before production delivery.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

## J. Registry maintenance law

- A route cannot be promoted from chat memory.
- A merged implementation with required green post-implementation main gate may be promoted non-recursively in closeout governance.
- Terminal workstream `DONE / MERGED / FROZEN` additionally requires closeout merge + terminal main CI recorded in its tracking Issue.
- New/placeholder/legacy routes remain visible until accepted or intentionally removed.
- If implementation truth and this registry conflict, treat the route as not final until reconciled.
