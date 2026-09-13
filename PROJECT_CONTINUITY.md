# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> Operational source of truth for continuing Turnoment without duplicate work.

Last update: `2026-09-13`

## 1. Mandatory continuation law

Every chat/agent MUST read `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, `SEO_FINAL_COPY_PROTOCOL.md` for public/indexable work, and `docs/ROUTE_COMPLIANCE_REGISTRY.md`; verify exact live `main`; use a dedicated branch/Issue/PR; preserve frozen routes; keep production fail-closed; and never claim `DONE / MERGED / FROZEN` from chat memory alone.

Terminal closeout SHA/CI belongs in the tracking Issue after merge. Do not create recursive documentation commits to self-record their own SHA.

## 2. Current frontend baseline

Repository: `sajadkhavas/turnoment`.

Original F24 `/rules` recertification is terminally frozen:
- Issue #107 — CLOSED / COMPLETED;
- final original F24 main `e3fc59e6509f25a7128c5c6bdfecd607963108c1`;
- final status `F24 — DONE / MERGED / FROZEN — FINAL_CURRENT`.

A later product-owner decision required a bounded policy revision, tracked separately as **F24-R1** so the original freeze/history was not rewritten.

Exact accepted F24-R1 implementation main / closeout base:

`3511af765e445146d35e28056645a9cc83f6f104`

F24-R1:
- Tracking Issue #110 — OPEN;
- implementation branch `phase/f24-r1-rules-policy-reconciliation`;
- implementation head `01c2a9ef1a410ab5a4f4e01e7f7f9beccdfed813`;
- implementation PR #111 — MERGED with expected-head lock;
- implementation merge/main `3511af765e445146d35e28056645a9cc83f6f104`;
- focused exact-main QA `34749976321` — PASS;
- Full exact-main QA `34749976313` — PASS;
- live `main` reverified exact at the implementation merge after QA;
- route `/rules` remains `FINAL_CURRENT`;
- terminal F24-R1 workstream freeze still requires docs-only closeout merge + terminal frozen-main evidence in Issue #110.

Protected/frozen or accepted-current public routes:
- F16 `/`;
- F17 `/tournaments`;
- F18 `/games`;
- F19 `/centers`;
- F20 `/centers/$id`;
- F21 `/ranking`;
- F22 `/players/$username`;
- F23 `/host`;
- F24/F24-R1 `/rules`;
- F02 `/games/$slug`.

`/tournaments/$id` remains `FINAL_PRE_SEO` and is the next public competitive recertification candidate after terminal F24-R1.

## 3. Active workstream — F24-R1 Rules Policy Reconciliation closeout

Route: `/rules`.

Tracking Issue: `#110` — OPEN.

R1 START_SHA:

`e3fc59e6509f25a7128c5c6bdfecd607963108c1`

Implementation branch:

`phase/f24-r1-rules-policy-reconciliation`

Implementation head:

`01c2a9ef1a410ab5a4f4e01e7f7f9beccdfed813`

Implementation PR:

`#111` — MERGED with expected-head lock.

Accepted implementation main / closeout base:

`3511af765e445146d35e28056645a9cc83f6f104`

Closeout branch:

`closeout/f24-r1-rules-policy-reconciliation`

Current status:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

F24-R1 is not terminally `DONE / MERGED / FROZEN` until the closeout PR is accepted, merged with expected-head lock, terminal frozen-main gates pass, terminal artifacts/digests are recorded in Issue #110, exact live `main` is reverified, and Issue #110 is closed completed.

## 4. Permanent `/rules` architecture

`Route → loader → RulesPageRepository → strict RulesPageDocument validation → RulesPage UI`

R1 does not alter this architecture. No production rules API endpoint is claimed as existing. Backend NEXT remains independently `P02 — Games / Catalog Foundation`.

## 5. F24-R1 product-policy truth

The product owner explicitly superseded the original F24 policy-rejection snapshot and approved these additional platform-wide rules:
1. participants should arrive 30 minutes before the tournament start; more than 15 minutes late is treated as a technical loss;
2. a valid identity document is required at entry for registration matching;
3. personal controllers are allowed after referee inspection/approval;
4. tournament game settings are announced by the referee before each stage;
5. insult, cheating or deliberate abandonment can lead to elimination and ranking-point deduction;
6. cancellation up to 24 hours before tournament start qualifies for a full Turnoment registration-fee refund.

The refund sentence is a Turnoment product policy, not a claim that it exhausts or replaces any independent legal right. Event-specific published rules may add operational detail where they do not contradict the platform-wide baseline.

The previously accepted baseline also remains in force: accurate/current participant information, no cheating/collusion/result manipulation, respectful conduct, and following published event-specific rules.

## 6. SEO / final-copy lock

R1 does not change the accepted search intent or SEO ownership of `/rules`.

Final H1: `قوانین شرکت در تورنمنت‌های Turnoment`.

Final title: `قوانین و شرایط شرکت در تورنمنت‌ها | Turnoment`.

Canonical: `/rules`.

Robots: `index,follow`.

Page-specific structured data remains intentionally omitted unless later supported by the visible page and current structured-data rules.

## 7. F24-R1 evidence accepted so far

Pre-PR exact implementation head `01c2a9ef1a410ab5a4f4e01e7f7f9beccdfed813`:
- exact compare from R1 START: ahead `1` / behind `0` / exactly `1` commit / exactly `4` changed files;
- no backend/dependency/UI architecture mutation;
- F24 `34749455409` — PASS — artifact `10315237606` — digest `sha256:ff90a88cee3516c5c08abaa3f70b8824eae4b181ca80d60abbcad4a26a74f5bf`;
- Full `34749455355` — PASS — artifact `10314778970` — digest `sha256:8143713e5ffbb96ac5b507f6ad6f6ac249c076ba6f1bed21126604971f47cced`.

PR #111 context:
- mergeable `true`;
- unresolved review threads `0`;
- exact live `main` remained R1 START before merge;
- expected head `01c2a9ef1a410ab5a4f4e01e7f7f9beccdfed813` used;
- F24 `34749648384` — PASS — artifact `10314963775` — digest `sha256:6bc0285ddc28c85142137a7b6b112bfbf6191cdb3626a38a2ff9bff07c977f88`;
- Full `34749648343` — PASS — artifact `10315650310` — digest `sha256:3371925a3e3e1153d29f42d7d33e94c10f18c8eebcd2bb36bf54150172bb55cf`.

Implementation merge/main:

`3511af765e445146d35e28056645a9cc83f6f104`

Exact-main implementation acceptance:
- F24 `34749976321` — PASS — artifact `10314954327` — digest `sha256:28d55d5a2b8bfb7880376257bf0eb0aa984c5a27fb68fa898f2ab1f7690f04fc`;
- Full `34749976313` — PASS — artifact `10315622107` — digest `sha256:473e0b15821c93b77df4af43fd1c173f4a082a10c138889ab0086e94d39e9bb3`.

Exact live `main` was reverified at `3511af765e445146d35e28056645a9cc83f6f104` after exact-main QA.

## 8. Documentation-only closeout law

Closeout is exactly one commit changing exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F24_RULES_RECERTIFICATION.md`;
4. `docs/workstreams/F24_CLOSEOUT.md`.

No source code, package, lockfile, workflow, dependency, runtime configuration or backend mutation is authorized.

Future closeout head/merge/frozen-main facts must be recorded in Issue #110 after they exist, not recursively self-recorded here.

## 9. Remaining terminal chain

After this closeout commit exists, F24-R1 still requires:
1. exact closeout compare = ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR to `main` without auto-closing Issue #110;
3. every actually-triggered PR-context Full/F24/frozen-route regression gate PASS;
4. `mergeable=true` and unresolved review threads=0;
5. exact live-main lock at `3511af765e445146d35e28056645a9cc83f6f104` before merge;
6. expected-head closeout merge;
7. terminal frozen-main Full/F24/frozen-route regressions PASS;
8. terminal artifact IDs and SHA-256 digests recorded in Issue #110;
9. exact live frontend `main` reverified;
10. Issue #110 updated with terminal evidence and CLOSED / COMPLETED.

Only after those facts exist may F24-R1 be reported terminally frozen.

## 10. NEXT after terminal F24-R1

Frontend public recertification candidate: `/tournaments/$id` — currently `FINAL_PRE_SEO`.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.
