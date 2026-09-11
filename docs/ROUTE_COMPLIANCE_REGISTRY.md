# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.
>
> Every chat/agent modifying an existing route MUST read this registry together with `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, and when applicable `SEO_FINAL_COPY_PROTOCOL.md`.

Last audit: `2026-09-11`

Current audit baseline: `2b66c5140511febaa98e96d93351cfdb62773bbf` — F16 implementation merge; post-main Frontend Quality Gate `34598728780` PASS, artifact `10263148439`, digest `sha256:6522b08fc635fbcef7844257d37083681a4407b3de4afa14eebc51034b003fda`; focused F16 gate `34598728817` PASS, artifact `10263087863`, digest `sha256:6337d86bbaa94e83ced301825445483c5b59c91a93426480a1d4ff810c18dd3d`.

F16 `/` is promoted non-recursively to `FINAL_CURRENT` because its current-law implementation is merged and required post-implementation main QA is green. The F16 workstream itself remains `MERGED / CLOSEOUT IN PROGRESS` until documentation-only closeout merge plus terminal frozen-main CI/artifact/digest are recorded in Issue #81.

F15 terminal truth: frozen main `008f4fbd959138e3abe6bf85078f6cf700319bd2`; terminal Frontend Quality Gate `34589429398` PASS; artifact `10195137753`; digest `sha256:61e8e493f8be1ea5c0262afa4cddecba8dc126a7c5bba0ba4b6e916499ecbbd0`; Issue #77 CLOSED / COMPLETED.

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
| `/` | `FINAL_CURRENT` | F16 implementation accepted under current public-page + SEO law. START `008f4fbd959138e3abe6bf85078f6cf700319bd2`; implementation head `41aeba987fa4435832361db95d2e232817c668b3`; PR #82 MERGED; implementation merge `2b66c5140511febaa98e96d93351cfdb62773bbf`; post-main full gate `34598728780` PASS; focused F16 gate `34598728817` PASS. Permanent boundary: SSR loader → typed `PublicHomeRepository` → runtime-validated projection → UI. Runtime endpoint remains `FRONTEND MOCK / BACKEND PENDING`; F16 terminal closeout remains Issue #81. |
| `/dashboard` | `FINAL_PRIVATE` | Player Dashboard productionization + closeout accepted; private session/repository/runtime contract. |
| `/dashboard/tournaments` | `FINAL_PRIVATE` | F03 terminally frozen; Issue #38 completed. |
| `/dashboard/matches` | `FINAL_PRIVATE` | F04 terminally frozen; Issue #41 completed. |
| `/dashboard/profile` | `FINAL_PRIVATE` | F09 terminally frozen; Issue #56 completed. |
| `/dashboard/notifications` | `FINAL_PRIVATE` | F10 terminally frozen; Issue #59 completed. Runtime notification APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/settings` | `FINAL_PRIVATE` | F11 terminally frozen; Issue #62 completed. Runtime settings APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/rivalries` | `FINAL_PRIVATE` | F12 terminally frozen; Issue #65 completed. Runtime Rivalries API remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/achievements` | `FINAL_PRIVATE` | F13 terminally frozen; Issue #68 completed. Runtime Achievements API remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/teams` | `FINAL_PRIVATE` | F14 terminally frozen; Issue #71 completed; frozen main `398e963f1ecdbe86013ce3b0052c4e1891f48854`; terminal gate `34574038117` PASS. Runtime Teams API remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/challenges` | `FINAL_PRIVATE` | F15 terminally frozen; Issue #77 completed; implementation merge `5db25c291a250a94676e143ba11642c86b2f8152`; frozen main `008f4fbd959138e3abe6bf85078f6cf700319bd2`; terminal gate `34589429398` PASS. Runtime Challenge APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/matches/$id/result` | `FINAL_PRIVATE` | F05 terminally frozen; Issue #44 completed. Runtime result APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/matches/$id/dispute` | `FINAL_PRIVATE` | F06 terminally frozen; Issue #47 completed. Runtime dispute APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/login` | `FINAL_PRIVATE` | F07 terminally frozen; Phone OTP, Django Session + CSRF, no password/local bearer auth. |
| `/register` | `FINAL_PRIVATE` | F08 terminally frozen; Issue #53 completed. |
| `/tournaments/$id` | `FINAL_PRE_SEO` | F01 terminally accepted before current strict SEO final-copy protocol. |
| `/tournaments/$id/register` | `FINAL_PRIVATE` | F01 final tournament-registration action route; private noindex and Session/CSRF boundary accepted. |
| `/games/$slug` | `FINAL_CURRENT` | F02 technical + SEO/final-copy acceptance terminally recorded in its tracking evidence. |

## B. Public competitive routes requiring current-law recertification

| Route | Status | Why it is not current-law final |
|---|---|---|
| `/tournaments` | `NEEDS_RECERTIFICATION` | Discovery route predates the full final-page/SEO evidence system and still relies on legacy local discovery data. |
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

No currently identified player-dashboard route remains `PLACEHOLDER` after F15 terminal acceptance.

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

## G. Accepted public Home truth — F16

Permanent route architecture:

`public / route → SSR loader → typed PublicHomeRepository → runtime-validated public-home projection → Home UI`

Backend/repository owns dynamic discovery truth:
- aggregate stats when authoritative;
- game identity/slug and active-tournament counts;
- finder option identity;
- tournament lifecycle/registration/capacity/fee/prize;
- center verification/location/reviews/equipment/upcoming counts;
- ranking/rating/result-derived projection;
- optional showdown projection;
- stable IDs/slugs for relations/navigation.

Frontend owns static final copy, temporary finder form state, semantic navigation and presentation only.

F16 product/SEO truth:
- H1 `مسابقات گیمینگ حضوری نزدیکت را پیدا کن`;
- title `مسابقات گیمینگ حضوری و تورنمنت‌های گیم‌نت | Turnoment`;
- canonical `/`;
- robots `index,follow`;
- public content is SSR-rendered;
- Home is the broad discovery gateway; `/tournaments` owns full inventory/filter intent;
- no unsupported popularity/search-volume/superlative claims;
- no Organization JSON-LD until stable absolute production identity exists;
- legacy `ایران مهر افزار` shell branding and fabricated contact/social facts were removed from the active tournament shell.

Production adapter invariant:
- explicit mock is dev/test/visual QA only;
- production defaults to Django/HTTP;
- production never silently falls back to fabricated Home records.

Backend alignment:
- planned `GET /api/v1/discovery/home/`;
- backend Issue #29 completed as docs alignment only;
- backend PR #30 merged;
- accepted backend main `335211d711c197a440e086bc570b86f2c5cd65f8`;
- post-main backend gate `34591528685` PASS;
- Backend NEXT remains `P02 — Games / Catalog Foundation`;
- runtime remains `FRONTEND MOCK / BACKEND PENDING` until authorized backend implementation lands.

## H. Accepted private account / player truth

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
- navigation from Hub is only through typed targets for already accepted Match routes.

## I. Competitive truth retained

- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth.

## J. Compliance priorities

F16 documentation-only closeout is the immediate governance task until Issue #81 is completed.

After F16 terminal freeze, the next current-law public recertification target is `/tournaments`, followed by `/games`, `/centers`, `/centers/$id`, `/ranking`, `/players/$username`, `/host`, and `/rules` unless an explicit product decision changes order.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

## K. Registry maintenance law

- A route cannot be promoted from chat memory.
- A merged implementation with required green post-implementation main gate may be promoted non-recursively in closeout governance.
- Terminal workstream `DONE / MERGED / FROZEN` additionally requires closeout merge + terminal main CI recorded in its tracking Issue.
- New/placeholder/legacy routes remain visible until accepted or intentionally removed.
- If implementation truth and this registry conflict, treat the route as not final until reconciled.
- Do not create recursive documentation-only commits merely to record the SHA of the commit containing that same record; terminal closeout SHA/CI belongs in the tracking Issue after merge.
