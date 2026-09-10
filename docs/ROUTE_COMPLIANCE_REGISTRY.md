# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under the current Turnoment delivery laws.
>
> Every chat/agent modifying an existing route MUST read this registry together with `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, and when applicable `SEO_FINAL_COPY_PROTOCOL.md`.

Last audit: `2026-09-10`

Audit baseline: `c522e9593c1628097ee20e2de8ba14f97c0a5334` — F07 implementation merge; post-implementation main Quality Gate `34452092176` PASS.

F06 terminal truth is independently confirmed by completed Issue #47: frozen main `e87798a0463677b4da68ee28b80b5e58a91a1883`, terminal gate `34412405721` PASS.

F07 route is promoted non-recursively to `FINAL_PRIVATE` because implementation is merged and post-implementation main QA is green. The F07 workstream itself is not terminally `DONE / MERGED / FROZEN` until closeout merge + terminal frozen-main CI are recorded in Issue #50.

## Status meanings

- `FINAL_CURRENT` — accepted under the current applicable protocol set, including current SEO/final-copy law for public/indexable pages.
- `FINAL_PRIVATE` — final private/noindex route; public SEO research is not applicable, but final page architecture/UX/contracts are accepted.
- `FINAL_PRE_SEO` — technically/factually final under the page protocol but frozen before the stricter SEO final-copy law.
- `IN_PROGRESS` — active controlled workstream exists; not final until its required acceptance chain is complete.
- `NEEDS_RECERTIFICATION` — route exists but has not passed the full current-law evidence chain.
- `PLACEHOLDER` — intentionally incomplete/temporary product surface; must be rebuilt before product acceptance.
- `REBUILD` — known product/architecture truth is wrong and must be rebuilt rather than patched as-is.
- `LEGACY_REVIEW` — inherited non-Turnoment/ecommerce/general-site route; not an approved competitive architecture reference.

## A. Accepted / active competitive routes

| Route | Status | Evidence / exact truth |
|---|---|---|
| `/dashboard` | `FINAL_PRIVATE` | Player Dashboard productionization + closeout accepted; private session/repository/runtime contract. |
| `/dashboard/tournaments` | `FINAL_PRIVATE` | F03 terminally frozen. Main `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`; gate `34386636373` PASS; Issue #38 completed. |
| `/dashboard/matches` | `FINAL_PRIVATE` | F04 terminally frozen. Main `864fe1491739b06c763be487a73a589c7e0f3609`; gate `34391019079` PASS; Issue #41 completed. F06 later reconciled result/dispute navigation under full regression coverage. |
| `/matches/$id/result` | `FINAL_PRIVATE` | F05 terminally frozen. Main `0407a925974d50b4a75af292231bacb48c66eb38`; gate `34407220433` PASS; Issue #44 completed. Runtime result APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/matches/$id/dispute` | `FINAL_PRIVATE` | F06 terminally frozen. Main `e87798a0463677b4da68ee28b80b5e58a91a1883`; terminal gate `34412405721` PASS; Issue #47 CLOSED / COMPLETED. Runtime dispute APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/login` | `FINAL_PRIVATE` | F07 implementation accepted/merged. START `64c760af73f6cb30b02e0ac9464ccbdeb18922e5`; final implementation head `5e37a7349c0f1408d9f55682d5aeca7f7318cbc8`; exact-head gate `34451450368` PASS; PR #51 gate `34451772869` PASS; implementation merge `c522e9593c1628097ee20e2de8ba14f97c0a5334`; post-main gate `34452092176` PASS. Maps to existing backend P01 OTP/Session runtime. F07 terminal closeout still belongs in Issue #50. |
| `/tournaments/$id` | `FINAL_PRE_SEO` | F01 terminally accepted before current strict SEO final-copy protocol. |
| `/tournaments/$id/register` | `FINAL_PRIVATE` | F01 final registration action route; private noindex and Session/CSRF boundary accepted. |
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
| `/players/$username` | `NEEDS_RECERTIFICATION` | Uses local ranking data/frontend derived values; must move to authoritative player/rating contract. |
| `/host` | `NEEDS_RECERTIFICATION` | Public acquisition route has not passed current final page + SEO gates. |
| `/rules` | `NEEDS_RECERTIFICATION` | Must be reconciled with authoritative ruleset/product copy and current evidence law. |

## C. Known rebuild routes

| Route | Status | Required truth |
|---|---|---|
| `/register` | `REBUILD` | Existing name/email/mobile/password form is not final P01 identity truth. Must be rebuilt as the accepted OTP/account onboarding continuation; F07 did not rebuild it. |

`/login` is no longer a rebuild route after F07 implementation acceptance.

## D. Player dashboard routes that remain explicit placeholders

| Route | Status | Planned product workstream |
|---|---|---|
| `/dashboard/challenges` | `PLACEHOLDER` | Challenge Hub. A Lovable planning file exists, but planning alone is not accepted implementation evidence. |
| `/dashboard/rivalries` | `PLACEHOLDER` | Rivalry. |
| `/dashboard/achievements` | `PLACEHOLDER` | Achievements. |
| `/dashboard/notifications` | `PLACEHOLDER` | Notifications. |
| `/dashboard/settings` | `PLACEHOLDER` | Settings. |
| `/dashboard/teams` | `PLACEHOLDER` | Team / Clan operations. |

## E. Private dashboard route requiring recertification

| Route | Status | Note |
|---|---|---|
| `/dashboard/profile` | `NEEDS_RECERTIFICATION` | Existing profile page predates current final-page contract/evidence law. |

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

## G. F07 accepted auth truth

`/login` permanently follows:

`validated optional redirect → SSR loader → typed LoginAuthRepository → runtime-validated adapter → OTP UI`

Required invariants:
- phone OTP only;
- Django Session authority;
- P01 CSRF bootstrap + `credentials: include` + `X-CSRFToken` on unsafe OTP calls;
- no localStorage/sessionStorage bearer token;
- safe internal return-to only; unsafe redirects fail closed;
- authoritative challenge/session/error state;
- private `noindex,nofollow`;
- final Persian copy/accessibility/responsive states;
- QA fixture is test-only and shares the permanent production contract.

## H. Compliance priorities

F07 terminal closeout is the immediate governance task until Issue #50 is completed.

Parallel frontend roadmap after that:
1. Challenge Hub / Detail — planning exists, implementation still requires full controlled evidence chain;
2. Rivalry Detail;
3. auth completion `/register`;
4. Notifications / Settings;
5. recertify remaining public competitive routes;
6. decide keep/remove/repurpose for all `LEGACY_REVIEW` routes before production delivery.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

## I. Registry maintenance law

- A route cannot be promoted from chat memory.
- A merged implementation with required green post-implementation main gate may be promoted non-recursively in closeout governance.
- Terminal workstream `DONE / MERGED / FROZEN` additionally requires closeout merge + terminal main CI recorded in its tracking Issue.
- New/placeholder/legacy routes remain visible until accepted or intentionally removed.
- If implementation truth and this registry conflict, treat the route as not final until reconciled.
