# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.

Last audit: `2026-09-12`

Exact accepted F24 implementation `main` / closeout base:

`3e1f4747997afda1c4c275db93f2905379d36a37`

Active workstream:

`F24 — Rules Page Recertification` — Issue #107 OPEN — implementation PR #108 MERGED — implementation/main `3e1f4747997afda1c4c275db93f2905379d36a37` — post-main acceptance complete — closeout branch `closeout/f24-rules-recertification` in progress.

F23 `/host` is terminally `DONE / MERGED / FROZEN — FINAL_CURRENT`; Issue #104 is CLOSED / COMPLETED and exact F23 terminal main is `b3143885a4aacc4301a952eb24bdad608b594d3b`.

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
| `/players/$username` | `FINAL_CURRENT` | F22 terminally frozen; Issue #101 completed. |
| `/host` | `FINAL_CURRENT` | F23 terminally frozen; Issue #104 CLOSED / COMPLETED; final F23 main `b3143885a4aacc4301a952eb24bdad608b594d3b`. |
| `/rules` | `FINAL_CURRENT` | F24 implementation PR #108 merged at `3e1f4747997afda1c4c275db93f2905379d36a37`; focused + Full post-main acceptance PASS. F24 terminal workstream freeze still requires closeout merge + frozen-main evidence in Issue #107. |
| `/games/$slug` | `FINAL_CURRENT` | F02 technical + current SEO/final-copy acceptance terminally recorded; frozen/protected. |
| `/tournaments/$id` | `FINAL_PRE_SEO` | F01 accepted before strict current SEO/final-copy protocol; current-law recertification is the next public competitive candidate after terminal F24. |
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

## B. F24 accepted architecture

Permanent frontend boundary:

`Route → loader → RulesPageRepository → strict RulesPageDocument validation → RulesPage UI`

Current authority is reviewed version-controlled policy content behind the repository interface. No production rules API is claimed to exist. A later HTTP/admin-backed implementation may satisfy the same repository contract without rewriting the UI.

Public policy metadata fields `version`, `effectiveDate`, and `lastSubstantiveRevisionDate` remain nullable until authoritative values exist.

Backend NEXT remains independently `P02 — Games / Catalog Foundation`.

## C. F24 product-policy truth

Approved platform-wide principles:
- accurate/current participant information for registration/coordination;
- no cheating, collusion, or deliberate result manipulation;
- respectful conduct toward players, hosts, organizers, and staff;
- review/follow the published rules specific to each event.

Event detail owns operational values such as timing/check-in, eligibility, format, equipment, venue and event-specific conditions.

Not authorized as global Turnoment policy:
- 30-minute early-arrival rule;
- 15-minute technical-loss rule;
- universal mandatory ID;
- personal-controller referee-approval requirement;
- elimination/ranking-point deduction claim;
- 24-hour/full-refund promise or any invented refund timeline.

No unapproved sanction, refund, identity, age, dispute, payment or legal rule is inferred.

## D. F24 SEO / final-copy acceptance

Purpose: explain common participation rules and where users must inspect tournament-specific operational details.

Audience: players considering or completing tournament participation.

Primary intent: informational / pre-participation.

Final H1:

`قوانین شرکت در تورنمنت‌های Turnoment`

Final title:

`قوانین و شرایط شرکت در تورنمنت‌ها | Turnoment`

Final description:

`قوانین عمومی شرکت در تورنمنت‌های Turnoment را بخوانید و ببینید کدام شرایط در همه رقابت‌ها مشترک است و کدام جزئیات در صفحه هر تورنمنت اعلام می‌شود.`

Canonical: `/rules`.

Robots: `index,follow`.

Primary CTA: `مشاهده تورنمنت‌ها` → `/tournaments`.

Page-specific structured data intentionally omitted; the route does not fabricate FAQ/Article/Event markup.

## E. F24 implementation evidence

F24 START:

`b3143885a4aacc4301a952eb24bdad608b594d3b`

Implementation head:

`b11101bfd6261360a31e66e10e2bd5b08c260e63`

Implementation PR:

`#108` — MERGED with expected-head lock.

Accepted implementation main / closeout base:

`3e1f4747997afda1c4c275db93f2905379d36a37`

Exact implementation compare:
- ahead 1 / behind 0;
- exactly one implementation commit;
- exactly eight changed files;
- no package/lock/dependency drift;
- frozen route source untouched.

Exact-head QA:
- F24 `34707551043` PASS — artifact `10302685750` — digest `sha256:8504a47e1e80f283e460572e6d69812b5f899bd60b88a02fe4d8b9b54c8d705a`;
- Full `34707550985` PASS — artifact `10301957784` — digest `sha256:1074ab071c9c78416e810435b1656f238de3dc11cf227d215c97b9c0fca86b47`.

Implementation PR-context QA:
- mergeable true / unresolved review threads 0 / exact pre-merge main lock;
- F24 `34710086614` PASS — artifact `10303535413` — digest `sha256:1f6c8b8c2d9efe5cc82088774f042b96f60af02894c92d09b3232e3a4a8c978b`;
- Full `34710086598` PASS — artifact `10302723472` — digest `sha256:8330d3959aaba5c7ccfec82214669a622e53d2a5b63d3c2c8b869924d31b56d6`.

Post-main implementation acceptance on exact `3e1f4747997afda1c4c275db93f2905379d36a37`:
- F24 `34710368111` PASS — artifact `10302858188` — digest `sha256:0d1099a0fe6858595adc6437ed9ff35ee67a846a47e21d9bb215343d107e9d60`;
- Full `34710368093` PASS — artifact `10303176790` — digest `sha256:7c83f34d566af8797e34f9a05911fe62c74ca1bc30e8c6ccaee2b1a7e2672dcb`.

Exact live `main` reverified after post-main acceptance.

## F. Frozen-route protection

F16 `/`, F17 `/tournaments`, F18 `/games`, F19 `/centers`, F20 `/centers/$id`, F21 `/ranking`, F22 `/players/$username`, F23 `/host`, F24 `/rules`, and F02 `/games/$slug` are protected from unrelated source mutation.

Accepted private routes remain protected. Existing ecommerce/service/general-content legacy routes remain `LEGACY_REVIEW` until explicitly accepted or removed.

## G. F24 closeout chain

Closeout branch:

`closeout/f24-rules-recertification`

Closeout law:
1. exactly one closeout commit;
2. exactly four changed Markdown files: `PROJECT_CONTINUITY.md`, `docs/ROUTE_COMPLIANCE_REGISTRY.md`, `docs/workstreams/F24_RULES_RECERTIFICATION.md`, `docs/workstreams/F24_CLOSEOUT.md`;
3. no source/package/lockfile/workflow/dependency/runtime mutation;
4. exact closeout compare must show ahead 1 / behind 0 / one commit / four Markdown files;
5. closeout PR without auto-closing Issue #107;
6. every actually-triggered PR-context Full/F24/frozen-route regression gate must PASS;
7. require mergeable=true and unresolved review threads=0;
8. require exact live main still equals `3e1f4747997afda1c4c275db93f2905379d36a37` before expected-head closeout merge;
9. after merge require terminal frozen-main Full/F24/frozen-route regressions PASS with artifacts/digests;
10. reverify exact live main, record terminal evidence in Issue #107, close Issue #107 completed;
11. only then report `F24 — DONE / MERGED / FROZEN — FINAL_CURRENT`.

## H. NEXT

Immediate task: complete F24 documentation-only closeout without runtime drift.

After terminal F24, next public competitive recertification candidate:

`/tournaments/$id` (`FINAL_PRE_SEO`).

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

## I. Registry maintenance law

A route cannot be promoted from chat memory. `/rules` is `FINAL_CURRENT` here only because implementation PR #108 is merged and required post-main implementation acceptance exists on exact main `3e1f4747997afda1c4c275db93f2905379d36a37`. F24 workstream terminal status still requires closeout merge + terminal frozen-main evidence in Issue #107.
