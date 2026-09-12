# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.

Last audit: `2026-09-12`

Exact live frontend `main` / F23 START at this governance checkpoint:

`e1aa1667f3c70a9e00d9664b1e20d3019587cab0`

Active workstream:

`F23 — Host Acquisition` — Issue #104 OPEN — branch `phase/f23-host-acquisition` — source head `e70de8ee4acc20014da6a0d10a4343ea26f3e1de` — governance checkpoint in progress.

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
| `/host` | `IN_PROGRESS` | F23 source head `e70de8ee4acc20014da6a0d10a4343ea26f3e1de`; exact-source focused `34702167115` PASS and Full `34702167120` PASS; backend docs alignment terminal at backend main `46b3f47b38068675ed8a0941a871438e51abd6a2`; implementation PR/post-main/closeout still required. |
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

## C. Accepted F23 architecture checkpoint

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

## D. F23 SEO / final-copy checkpoint

Purpose: qualified gaming-center host acquisition with transparent review/requirements rather than automatic-acceptance claims.

Audience: gaming-center owners/managers and local operators.

Final H1:

`گیم‌نتت را به میزبان رقابت‌های واقعی تبدیل کن`

Final title:

`میزبانی مسابقات گیمینگ برای گیم‌نت | Turnoment`

Canonical: `/host`.

Robots: `index,follow`.

Page hierarchy accepted at source checkpoint:
`Hero → benefits → process → requirements → experience preview → application form → FAQ → final CTA`.

The copy is people-first, avoids engineering-stage language, does not guarantee approval and does not invent official/best/largest claims.

## E. F23 exact-source evidence

F23 START:

`e1aa1667f3c70a9e00d9664b1e20d3019587cab0`

Source head:

`e70de8ee4acc20014da6a0d10a4343ea26f3e1de`

START → source head:
- ahead `1` / behind `0` / one commit;
- `9` changed files;
- no `bun.lock` mutation;
- no dependency/version drift;
- frozen F16/F17/F18/F19/F20/F21/F22/F02 route source untouched.

Exact-source QA:
- F23 `34702167115` PASS — artifact `10300084668` — digest `sha256:d1de24c54a127f66cc097d05e0ef17e9cc631ec61aa3e687421bc782bb8c87d3`;
- Full `34702167120` PASS — browser artifact `10300094875` — digest `sha256:363f125ae1c2e476383ad660ab7fca3ef3094f23a0a6916c55e1837eed02c649`.

The F23 focused gate renders evidence at 375/390/430/768/1024/1440. Manual full-page source evidence review at 375/768/1440 found no observed horizontal overflow, clipping or overlap.

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

F16 `/`, F17 `/tournaments`, F18 `/games`, F19 `/centers`, F20 `/centers/$id`, F21 `/ranking`, F22 `/players/$username`, and F02 `/games/$slug` are protected. F23 implementation/governance must not mutate their accepted route source.

## H. Legacy / non-competitive surfaces

Existing ecommerce/service/general-content legacy routes remain `LEGACY_REVIEW` until explicitly accepted or removed.

## I. F23 remaining chain

1. governance checkpoint = one commit / exactly three Markdown files;
2. exact reviewed-head Full + F23 PASS;
3. exact live main remains F23 START;
4. implementation PR without auto-closing Issue #104;
5. PR-context Full/F23/F22/F21/F20/F19/F18/F17/F16 PASS;
6. mergeable=true / review threads=0 / expected-head merge;
7. post-main Full/F23/frozen regressions PASS;
8. exact implementation-main verification and Issue #104 checkpoint;
9. documentation-only closeout exactly four Markdown files;
10. closeout PR-context required gates PASS + expected-head merge;
11. terminal frozen-main Full/F23/frozen regressions PASS with artifacts/digests;
12. exact live-main verification;
13. terminal evidence in Issue #104 and close completed;
14. only then promote `/host` to `FINAL_CURRENT` and report `F23 — DONE / MERGED / FROZEN — FINAL_CURRENT`.

## J. NEXT

Immediate task: complete F23 governance exact-head QA and implementation PR chain without source drift.

After terminal F23:

`/rules`.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

## K. Registry maintenance law

A route cannot be promoted from chat memory. `/host` remains `IN_PROGRESS` at this governance checkpoint even though exact-source QA and backend documentation alignment are accepted. `FINAL_CURRENT` requires implementation merge + post-main acceptance; terminal `DONE / MERGED / FROZEN` additionally requires closeout merge + terminal frozen-main evidence in Issue #104.
