# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.

Last audit: `2026-09-13`

Exact accepted F24-R1 implementation `main` / closeout base:

`3511af765e445146d35e28056645a9cc83f6f104`

Active workstream:

`F24-R1 — Rules Policy Reconciliation` — Issue #110 OPEN — PR #111 MERGED — implementation/main `3511af765e445146d35e28056645a9cc83f6f104` — focused + Full exact-main acceptance complete — closeout branch `closeout/f24-r1-rules-policy-reconciliation` in progress.

Original F24 is terminally frozen; Issue #107 is CLOSED / COMPLETED and original terminal main is `e3fc59e6509f25a7128c5c6bdfecd607963108c1`.

## Status meanings

- `FINAL_CURRENT` — route implementation is accepted under current page + SEO/final-copy law.
- `FINAL_PRIVATE` — accepted private/noindex route.
- `FINAL_PRE_SEO` — accepted before current strict SEO/final-copy law.
- `IN_PROGRESS` — active route implementation without sufficient merge/post-main evidence.
- `NEEDS_RECERTIFICATION` — existing route lacks current-law acceptance.
- `LEGACY_REVIEW` — inherited non-competitive/ecommerce/general-site route.

Route-level `FINAL_CURRENT` is distinct from terminal workstream `DONE / MERGED / FROZEN`; terminal status additionally requires closeout merge + frozen-main CI/artifacts recorded in the tracking Issue.

## A. Accepted / active competitive routes

| Route | Status | Evidence / exact truth |
|---|---|---|
| `/` | `FINAL_CURRENT` | F16 terminally frozen; Issue #81 completed. |
| `/tournaments` | `FINAL_CURRENT` | F17 terminally frozen; Issue #84 completed. |
| `/games` | `FINAL_CURRENT` | F18 terminally frozen; Issue #89 completed. |
| `/centers` | `FINAL_CURRENT` | F19 terminally frozen; Issue #92 completed. |
| `/centers/$id` | `FINAL_CURRENT` | F20 terminally frozen; Issue #95 completed. |
| `/ranking` | `FINAL_CURRENT` | F21 terminally frozen; Issue #98 completed. |
| `/players/$username` | `FINAL_CURRENT` | F22 terminally frozen; Issue #101 completed. |
| `/host` | `FINAL_CURRENT` | F23 terminally frozen; Issue #104 completed. |
| `/rules` | `FINAL_CURRENT` | Original F24 terminally frozen; F24-R1 PR #111 merged at `3511af765e445146d35e28056645a9cc83f6f104`; focused + Full exact-main acceptance PASS; R1 terminal closeout still pending. |
| `/games/$slug` | `FINAL_CURRENT` | F02 current-law acceptance terminally recorded; frozen/protected. |
| `/tournaments/$id` | `FINAL_PRE_SEO` | F01 accepted before strict current SEO/final-copy protocol; next public competitive recertification candidate after terminal F24-R1. |
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

## B. `/rules` accepted architecture

Permanent frontend boundary:

`Route → loader → RulesPageRepository → strict RulesPageDocument validation → RulesPage UI`

F24-R1 does not change this architecture and does not claim a production rules API endpoint. Backend NEXT remains independently `P02 — Games / Catalog Foundation`.

## C. F24-R1 product-policy truth

The product owner superseded the original F24 rejection of inherited rules and approved the following as platform-wide Turnoment policy:
- arrive 30 minutes before tournament start; more than 15 minutes late is a technical loss;
- valid identity document required at entry for registration matching;
- personal controller allowed after referee inspection/approval;
- game settings announced by the referee before each stage;
- insult, cheating or deliberate abandonment can result in elimination and ranking-point deduction;
- cancellation up to 24 hours before start qualifies for a full Turnoment registration-fee refund.

The refund rule is recorded as Turnoment product policy and does not claim to replace independent legal rights.

The original accepted baseline also remains active: accurate/current participant information, no cheating/collusion/result manipulation, respectful conduct, and following event-specific published rules.

## D. SEO / final-copy acceptance

Purpose remains informational / pre-participation. `/rules` owns general Turnoment participation policy; tournament detail owns event-specific operational detail.

H1: `قوانین شرکت در تورنمنت‌های Turnoment`.

Title: `قوانین و شرایط شرکت در تورنمنت‌ها | Turnoment`.

Canonical: `/rules`.

Robots: `index,follow`.

No page-specific structured data is added merely for coverage.

## E. F24-R1 implementation evidence

R1 START: `e3fc59e6509f25a7128c5c6bdfecd607963108c1`.

Implementation head: `01c2a9ef1a410ab5a4f4e01e7f7f9beccdfed813`.

Implementation PR: `#111` — MERGED with expected-head lock.

Implementation merge/main / closeout base: `3511af765e445146d35e28056645a9cc83f6f104`.

Pre-PR exact-head QA:
- F24 `34749455409` PASS — artifact `10315237606` — digest `sha256:ff90a88cee3516c5c08abaa3f70b8824eae4b181ca80d60abbcad4a26a74f5bf`;
- Full `34749455355` PASS — artifact `10314778970` — digest `sha256:8143713e5ffbb96ac5b507f6ad6f6ac249c076ba6f1bed21126604971f47cced`.

PR-context QA:
- mergeable true / unresolved review threads 0 / exact pre-merge main lock;
- F24 `34749648384` PASS — artifact `10314963775` — digest `sha256:6bc0285ddc28c85142137a7b6b112bfbf6191cdb3626a38a2ff9bff07c977f88`;
- Full `34749648343` PASS — artifact `10315650310` — digest `sha256:3371925a3e3e1153d29f42d7d33e94c10f18c8eebcd2bb36bf54150172bb55cf`.

Exact-main implementation acceptance on `3511af765e445146d35e28056645a9cc83f6f104`:
- F24 `34749976321` PASS — artifact `10314954327` — digest `sha256:28d55d5a2b8bfb7880376257bf0eb0aa984c5a27fb68fa898f2ab1f7690f04fc`;
- Full `34749976313` PASS — artifact `10315622107` — digest `sha256:473e0b15821c93b77df4af43fd1c173f4a082a10c138889ab0086e94d39e9bb3`.

Exact live `main` reverified after exact-main acceptance.

## F. Frozen-route protection

F16 `/`, F17 `/tournaments`, F18 `/games`, F19 `/centers`, F20 `/centers/$id`, F21 `/ranking`, F22 `/players/$username`, F23 `/host`, F24/F24-R1 `/rules`, and F02 `/games/$slug` are protected from unrelated source mutation.

Accepted private routes remain protected. Existing ecommerce/service/general-content legacy routes remain `LEGACY_REVIEW` until explicitly accepted or removed.

## G. F24-R1 closeout chain

Closeout branch: `closeout/f24-r1-rules-policy-reconciliation`.

Closeout law:
1. exactly one closeout commit;
2. exactly four changed Markdown files: `PROJECT_CONTINUITY.md`, `docs/ROUTE_COMPLIANCE_REGISTRY.md`, `docs/workstreams/F24_RULES_RECERTIFICATION.md`, `docs/workstreams/F24_CLOSEOUT.md`;
3. no source/package/lockfile/workflow/dependency/runtime mutation;
4. exact compare must show ahead 1 / behind 0 / one commit / four Markdown files;
5. closeout PR without auto-closing Issue #110;
6. every actually-triggered PR-context Full/F24/frozen-route regression gate must PASS;
7. mergeable=true and unresolved review threads=0;
8. exact live main must still equal `3511af765e445146d35e28056645a9cc83f6f104` before expected-head closeout merge;
9. after merge require terminal frozen-main Full/F24/frozen-route regressions PASS with artifacts/digests;
10. reverify exact live main, record terminal evidence in Issue #110, close Issue #110 completed.

## H. NEXT

Immediate task: complete F24-R1 documentation-only closeout without runtime drift.

After terminal F24-R1, next public competitive recertification candidate: `/tournaments/$id` (`FINAL_PRE_SEO`).

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

## I. Registry maintenance law

A route cannot be promoted from chat memory. `/rules` remains `FINAL_CURRENT` because current-law F24 acceptance existed and F24-R1 implementation is merged with focused + Full exact-main acceptance on `3511af765e445146d35e28056645a9cc83f6f104`. R1 terminal workstream status still requires closeout merge + terminal frozen-main evidence in Issue #110.
