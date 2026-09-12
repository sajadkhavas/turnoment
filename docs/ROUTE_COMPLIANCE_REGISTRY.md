# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.

Last audit: `2026-09-12`

Exact accepted implementation `main` / F23 closeout base:

`78c7d3b33c1d785ae444bb0f4d1e0385ca1ced93`

Active workstream:

`F23 — Host Acquisition` — Issue #104 OPEN — closeout branch `closeout/f23-host-acquisition` — implementation PR #105 merged — implementation/main `78c7d3b33c1d785ae444bb0f4d1e0385ca1ced93` — post-main acceptance complete — closeout in progress.

## Status meanings

- `FINAL_CURRENT` — route implementation is accepted under current page + SEO/final-copy law.
- `FINAL_PRIVATE` — accepted private/noindex route.
- `FINAL_PRE_SEO` — accepted before current strict SEO/final-copy law.
- `IN_PROGRESS` — active route implementation without sufficient merge/post-main evidence.
- `NEEDS_RECERTIFICATION` — existing route lacks current-law acceptance.
- `LEGACY_REVIEW` — inherited non-competitive/ecommerce/general-site route.

Route-level `FINAL_CURRENT` is distinct from terminal workstream `DONE / MERGED / FROZEN`; the latter additionally requires closeout merge + terminal frozen-main CI/artifacts recorded in the tracking Issue.

## A. Accepted / active competitive routes

| Route | Status | Evidence / exact truth |
|---|---|---|
| `/` | `FINAL_CURRENT` | F16 terminally frozen; Issue #81 completed. |
| `/tournaments` | `FINAL_CURRENT` | F17 terminally frozen; Issue #84 completed. |
| `/games` | `FINAL_CURRENT` | F18 terminally frozen; Issue #89 completed. |
| `/centers` | `FINAL_CURRENT` | F19 terminally frozen; Issue #92 completed. |
| `/centers/$id` | `FINAL_CURRENT` | F20 terminally frozen; Issue #95 completed. |
| `/ranking` | `FINAL_CURRENT` | F21 terminally frozen; Issue #98 completed. |
| `/players/$username` | `FINAL_CURRENT` | F22 terminally frozen; Issue #101 CLOSED / COMPLETED; implementation + closeout + terminal frozen-main evidence accepted. |
| `/host` | `FINAL_CURRENT` | F23 implementation PR #105 merged; accepted implementation main `78c7d3b33c1d785ae444bb0f4d1e0385ca1ced93`; required post-main Full/F23/F22/F21/F20/F19/F18/F17/F16 gates all PASS; route-level current-law acceptance is satisfied. F23 workstream terminal freeze still requires closeout merge + frozen-main evidence in Issue #104. |
| `/games/$slug` | `FINAL_CURRENT` | F02 technical + current SEO/final-copy acceptance terminally recorded; frozen/protected. |
| `/tournaments/$id` | `FINAL_PRE_SEO` | F01 accepted before strict current SEO final-copy protocol. |
| `/tournaments/$id/register` | `FINAL_PRIVATE` | F01 final private registration route. |
| `/dashboard` | `FINAL_PRIVATE` | accepted player dashboard. |
| `/dashboard/tournaments` | `FINAL_PRIVATE` | F03 terminal. |
| `/dashboard/matches` | `FINAL_PRIVATE` | F04 terminal. |
| `/matches/$id/result` | `FINAL_PRIVATE` | F05 terminal. |
| `/matches/$id/dispute` | `FINAL_PRIVATE` | F06 terminal. |
| `/login` | `FINAL_PRIVATE` | F07 terminal OTP/session route. |
| `/register` | `FINAL_PRIVATE` | F08 terminal. |
| `/dashboard/profile` | `FINAL_PRIVATE` | F09 terminal. |
| `/dashboard/notifications` | `FINAL_PRIVATE` | F10 terminal. |
| `/dashboard/settings` | `FINAL_PRIVATE` | F11 terminal. |
| `/dashboard/rivalries` | `FINAL_PRIVATE` | F12 terminal. |
| `/dashboard/achievements` | `FINAL_PRIVATE` | F13 terminal. |
| `/dashboard/teams` | `FINAL_PRIVATE` | F14 terminal. |
| `/dashboard/challenges` | `FINAL_PRIVATE` | F15 terminal. |

## B. Public competitive route still requiring current-law recertification

| Route | Status | Why |
|---|---|---|
| `/rules` | `NEEDS_RECERTIFICATION` | Protected NEXT after terminal F23; must reconcile authoritative rules/product copy and current evidence law. |

## C. Accepted F23 architecture

Permanent frontend architecture:

`host application draft → normalization + typed validation → HostApplicationRepository → strict production HTTP adapter / deterministic dev-test fixture → Host Acquisition UI`

Target production endpoint:

`POST /api/v1/host-applications/`

Production invariants:
- production never silently succeeds from a fixture;
- `VITE_API_BASE_URL` is required by the HTTP path;
- request contract is typed and normalized before transport;
- 400/422 → validation, 429 → rate limited, other non-2xx/network → unavailable;
- successful responses are strict-runtime validated;
- malformed 2xx is an invalid response, not success;
- UI never fabricates an application receipt.

Accepted request boundary:
- `venueName` 2..120;
- `managerName` 2..120;
- Iranian mobile normalized to `+989xxxxxxxxx`;
- `city` 2..80;
- `area` 2..120;
- integer `stationCount` 1..1000;
- `games` 2..300;
- nullable `description` max 1200.

Accepted receipt:
- `schemaVersion=1`;
- stable server-issued opaque `applicationId`;
- `state=received`;
- offset-aware `submittedAt`.

`received` is not approval, verification, licensing or activation.

Runtime remains `FRONTEND MOCK / BACKEND PENDING` until the owning backend runtime phase ships the endpoint.

## D. F23 SEO / final-copy acceptance

Purpose: qualified gaming-center host acquisition with transparent review/requirements rather than automatic-acceptance claims.

Audience: gaming-center owners/managers and local operators.

Final H1:

`گیم‌نتت را به میزبان رقابت‌های واقعی تبدیل کن`

Final title:

`میزبانی مسابقات گیمینگ برای گیم‌نت | Turnoment`

Final description:

`برای میزبانی مسابقات حضوری گیمینگ در گیم‌نت خود در Turnoment درخواست بدهید؛ شرایط میزبانی، روند بررسی و مسیر ثبت‌نام بازیکنان را ببینید.`

Canonical: `/host`.

Robots: `index,follow`.

Accepted page hierarchy:
`Hero → benefits → process → requirements → experience preview → application form → FAQ → final CTA`.

The copy is people-first, avoids engineering-stage language, does not guarantee approval and does not invent official/best/largest claims.

## E. F23 implementation evidence

F23 START:

`e1aa1667f3c70a9e00d9664b1e20d3019587cab0`

Source head:

`e70de8ee4acc20014da6a0d10a4343ea26f3e1de`

Final reviewed implementation head:

`3a464f69578102aa8c2e79c0725a4361e46c663f`

Implementation PR:

`#105` — MERGED.

Accepted implementation main / closeout base:

`78c7d3b33c1d785ae444bb0f4d1e0385ca1ced93`

Reviewed-head QA:
- F23 `34702956137` PASS — artifact `10301600267` — digest `sha256:57c572d6246e2988909ece2effb643ced9af92786562b46cc646c39b785ec6b8`;
- Full `34702956119` PASS — artifact `10301031536` — digest `sha256:622b57ecc7af264f422dc37d994d07e6e48f87be160ff84aa9397633d5173953`.

Implementation PR-context Full/F23/F22/F21/F20/F19/F18/F17/F16 gates all passed with mergeable=true, zero unresolved review threads and exact pre-merge main lock.

Post-main implementation acceptance — all PASS on exact merge SHA:
- Full `34703531366` — artifact `10301511456` — digest `sha256:bb1c4606e5976dee23d2b48a94d361825238c6c07aa02547231239933534c7a2`;
- F23 `34703531387` — artifact `10300582171` — digest `sha256:a29b97ad3a966a15babb76b6557001f96c4499dab4f0f14e220894591ed1f566`;
- F22 `34703531403` — artifact `10301466264` — digest `sha256:a6532b5d6311932eda655b26700c4af13b73bf0645d883a13c05a4d46827abca`;
- F21 `34703531297` — artifact `10301491369` — digest `sha256:0373c9e2fb021fd64528a64ff6a07b2c90d5fabc50e6edcdea7b661ee7db8a2d`;
- F20 `34703531473` — artifact `10301032161` — digest `sha256:87a0d9541c290d9f94e5a0a86468346a547168e1e6e112709978111649ea9bfb`;
- F19 `34703531395` — artifact `10301296618` — digest `sha256:bb7fa33ebdd8394a431f88fde1ccbb8c6f45049e3710ee27c327df5eb1e6e4c8`;
- F18 `34703531437` — artifact `10301156811` — digest `sha256:6b3cd7e5633613df0222613f77e7bc42255cd2bffe4abecd64cf62aaa092a459`;
- F17 `34703531424` — artifact `10301311626` — digest `sha256:aefc34255d4b681d32a5e08a0c29e3fe8bd02b24eecaae2b0fd01d2172408ef0`;
- F16 `34703531410` — artifact `10301316540` — digest `sha256:f9e40a9e3ce8ed813244cd04509631e7a09a1851f930591c35f6d2cdc2fbef6b`.

Exact live frontend `main` was reverified at the implementation merge after post-main acceptance. Evidence is recorded in Issue #104.

## F. Backend F23 alignment

Backend documentation alignment is terminal:
- backend Issue #43 CLOSED / COMPLETED;
- docs head `bb481f5c7fbb37d680665c2f397d13ef2f232b55`;
- PR #44 MERGED;
- exact-head `34702635677` PASS on Python 3.12/3.14;
- PR-context `34702687868` PASS on Python 3.12/3.14;
- backend merge/main `46b3f47b38068675ed8a0941a871438e51abd6a2`;
- post-main `34702740266` PASS on Python 3.12/3.14;
- exact live backend main reverified;
- no backend runtime phase implementation or phase-registry reorder occurred.

The planned public create endpoint remains absent. Backend NEXT remains exactly `P02 — Games / Catalog Foundation`.

The contract explicitly freezes a future session-independent public submission policy: `AllowAny` plus deliberate per-view authentication configuration rather than accidentally inheriting global SessionAuthentication/CSRF behavior.

## G. Frozen-route protection

F16 `/`, F17 `/tournaments`, F18 `/games`, F19 `/centers`, F20 `/centers/$id`, F21 `/ranking`, F22 `/players/$username`, F23 `/host`, and F02 `/games/$slug` are protected from unrelated source mutation. F23 closeout is documentation-only.

## H. Legacy / non-competitive surfaces

Existing ecommerce/service/general-content legacy routes remain `LEGACY_REVIEW` until explicitly accepted or removed.

## I. F23 closeout chain

Closeout branch:

`closeout/f23-host-acquisition`

Closeout law:
1. exactly one closeout commit;
2. exactly four changed Markdown files: `PROJECT_CONTINUITY.md`, `docs/ROUTE_COMPLIANCE_REGISTRY.md`, `docs/workstreams/F23_HOST_ACQUISITION.md`, `docs/workstreams/F23_CLOSEOUT.md`;
3. no source/package/lockfile/workflow/dependency/runtime mutation;
4. exact closeout compare must show ahead 1 / behind 0 / one commit / four Markdown files;
5. closeout PR without auto-closing Issue #104;
6. all triggered PR-context Full/F23/F22/F21/F20/F19/F18/F17/F16 gates must PASS;
7. require mergeable=true and unresolved review threads=0;
8. require exact live main still equals `78c7d3b33c1d785ae444bb0f4d1e0385ca1ced93` before expected-head closeout merge;
9. after merge require terminal frozen-main Full/F23/frozen-route regressions PASS with artifacts/digests;
10. reverify exact live main, record terminal evidence in Issue #104, close Issue #104 completed;
11. only then report `F23 — DONE / MERGED / FROZEN — FINAL_CURRENT`.

## J. NEXT

Immediate task: complete F23 documentation-only closeout without runtime drift.

After terminal F23:

`/rules`.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

## K. Registry maintenance law

A route cannot be promoted from chat memory. `/host` is `FINAL_CURRENT` here only because implementation PR #105 is merged and required post-main implementation acceptance exists on exact main `78c7d3b33c1d785ae444bb0f4d1e0385ca1ced93`. F23 workstream terminal status still requires closeout merge + terminal frozen-main evidence in Issue #104.
