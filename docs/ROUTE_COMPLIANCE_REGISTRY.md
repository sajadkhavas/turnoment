# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.
>
> Every chat/agent modifying an existing route MUST read this registry together with `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, and when applicable `SEO_FINAL_COPY_PROTOCOL.md`.

Last audit: `2026-09-11`

Audit baseline: `5db25c291a250a94676e143ba11642c86b2f8152` — F15 implementation merge; post-implementation main Frontend Quality Gate `34585660833` PASS; artifact `10193629332`; digest `sha256:e29f1e77ee9347fc917df4ee4d594f5d9f9896438183ee44edf5391b51da8821`.

F15 `/dashboard/challenges` is promoted non-recursively to `FINAL_PRIVATE` because its implementation is merged and required post-implementation main QA is green. The F15 workstream itself is not terminally `DONE / MERGED / FROZEN` until documentation-only closeout merge plus terminal frozen-main CI/artifact/digest are recorded in Issue #77.

F14 terminal truth: frozen main `398e963f1ecdbe86013ce3b0052c4e1891f48854`; terminal gate `34574038117` PASS; artifact `10189030449`; digest `sha256:e4f1a951192fc1d6a5a6d7d17b0b8c634ecbd2a3921eb3abef63d1bb6987bf2c`; Issue #71 CLOSED / COMPLETED.

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
| `/dashboard/rivalries` | `FINAL_PRIVATE` | F12 terminally frozen; Issue #65 completed. Runtime Rivalries API remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/achievements` | `FINAL_PRIVATE` | F13 terminally frozen; Issue #68 completed. Runtime Achievements API remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/teams` | `FINAL_PRIVATE` | F14 terminally frozen; Issue #71 completed; frozen main `398e963f1ecdbe86013ce3b0052c4e1891f48854`; terminal gate `34574038117` PASS. Runtime Teams API remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/challenges` | `FINAL_PRIVATE` | F15 implementation accepted/merged. START `398e963f1ecdbe86013ce3b0052c4e1891f48854`; final reviewed head `e9110fc6e01220e17e728dc0e491fff1a0b979c0`; exact-head gate `34584422266` PASS; PR #79 gate `34585124291` PASS; implementation merge `5db25c291a250a94676e143ba11642c86b2f8152`; post-main gate `34585660833` PASS; artifact `10193629332`; digest `sha256:e29f1e77ee9347fc917df4ee4d594f5d9f9896438183ee44edf5391b51da8821`. Runtime Challenge APIs remain `FRONTEND MOCK / BACKEND PENDING`. F15 terminal closeout remains Issue #77. |
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

## D. Player dashboard placeholders

No currently identified player-dashboard route remains `PLACEHOLDER` after F15 implementation acceptance.

Any newly discovered or newly requested dashboard route must receive its own product decision, source audit and controlled workstream; do not invent additional dashboard scope from this registry.

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

### `/dashboard/teams` — F14
`private dashboard access policy → validated team/page search → loader → typed PlayerTeamsRepository → runtime-validated current-player team membership/roster projection → Teams UI`

### `/dashboard/challenges` — F15
`private dashboard access policy → validated status/page search → loader → typed ChallengeHubRepository → runtime-validated Challenge projection/commands → authoritative reload → Challenge Hub UI`

Shared permanent invariants:
- Django Session authority;
- P01 CSRF bootstrap + `credentials: include` + `X-CSRFToken` on unsafe calls;
- no localStorage/sessionStorage bearer token;
- private `noindex,nofollow`;
- final Persian copy/accessibility/responsive states;
- QA fixture is test-only and shares the permanent production contract.

F15-specific truth:
- Challenge Rating and Tournament Rating are separate;
- Challenge unlock is 30 finalized valid Matches, not wins;
- access, lifecycle, revision, capabilities, opponent eligibility, create options, result/rating, summary/pagination and mutation outcomes are backend/repository-owned;
- create/respond/cancel use idempotency; respond/cancel use opaque revision and stale handling;
- frontend invalidates/reloads authoritative truth after mutations rather than optimistically owning lifecycle;
- no wager/betting/stake mechanics;
- no Challenge Detail route is introduced;
- navigation from Hub is only through typed targets for already accepted Match routes;
- backend documentation alignment is terminally accepted, but runtime Challenge APIs are not implemented yet.

## H. Competitive truth retained

- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth.

## I. Compliance priorities

F15 documentation-only closeout is the immediate governance task until Issue #77 is completed.

After F15 terminal freeze, no independent player-dashboard placeholder remains. The next non-F15 frontend workstream must be selected from current-law public recertification or an explicitly approved legacy/product decision.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

## J. Registry maintenance law

- A route cannot be promoted from chat memory.
- A merged implementation with required green post-implementation main gate may be promoted non-recursively in closeout governance.
- Terminal workstream `DONE / MERGED / FROZEN` additionally requires closeout merge + terminal main CI recorded in its tracking Issue.
- New/placeholder/legacy routes remain visible until accepted or intentionally removed.
- If implementation truth and this registry conflict, treat the route as not final until reconciled.
