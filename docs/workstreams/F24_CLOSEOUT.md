# F24-R1 — Rules Policy Reconciliation Closeout

Status at document creation:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Route: `/rules`

Target route status: `FINAL_CURRENT`

Tracking Issue: `#110`

This is a non-recursive closeout snapshot. It records only evidence that already exists when this document is created. The future closeout head/merge/frozen-main SHA and terminal post-closeout CI/artifact/digest facts are intentionally not self-recorded here; they belong in Issue #110 after they exist.

## 1. Exact source lock

R1 START_SHA:

`e3fc59e6509f25a7128c5c6bdfecd607963108c1`

Implementation branch:

`phase/f24-r1-rules-policy-reconciliation`

Implementation head:

`01c2a9ef1a410ab5a4f4e01e7f7f9beccdfed813`

Implementation PR:

`#111` — MERGED with expected-head lock.

Implementation merge / accepted main / closeout base:

`3511af765e445146d35e28056645a9cc83f6f104`

Closeout branch:

`closeout/f24-r1-rules-policy-reconciliation`

Original F24 Issue #107 remains historical and CLOSED / COMPLETED; R1 terminal evidence belongs only in Issue #110.

## 2. Why R1 exists

Original F24 deliberately withheld six inherited operational/refund statements because they lacked product-owner authority. After original F24 was fully frozen, the product owner explicitly approved those rules. R1 therefore records a later policy decision without rewriting the original acceptance history.

## 3. Accepted permanent architecture

`Route → loader → RulesPageRepository → strict RulesPageDocument validation → RulesPage UI`

R1 does not alter the accepted route architecture, visual system, backend boundary, dependencies or public SEO ownership.

## 4. Product-policy acceptance

Current Turnoment platform-wide rules now include:
1. arrive 30 minutes before tournament start; more than 15 minutes late is a technical loss;
2. present valid identification at entry for registration matching;
3. personal controllers require referee inspection/approval before use;
4. match settings are announced by the referee before each stage;
5. insult, cheating or deliberate abandonment can lead to elimination and ranking-point deduction;
6. cancellation up to 24 hours before tournament start qualifies for a full Turnoment registration-fee refund.

The refund rule is product policy, not a representation that it replaces independent legal rights.

The previously accepted platform baseline remains active as well: accurate/current participant information, prohibition of cheating/collusion/result manipulation, respectful conduct, and following event-specific published rules.

## 5. Public SEO / UX acceptance

R1 keeps the accepted `/rules` public SEO/UX contract unchanged:
- H1 `قوانین شرکت در تورنمنت‌های Turnoment`;
- title `قوانین و شرایط شرکت در تورنمنت‌ها | Turnoment`;
- canonical `/rules`;
- robots `index,follow`;
- SSR content through the existing loader/repository boundary;
- no page-specific schema merely for coverage;
- existing semantic/accessibility/responsive UI retained.

## 6. Exact implementation diff evidence

R1 START → implementation head `01c2a9ef1a410ab5a4f4e01e7f7f9beccdfed813`:
- ahead `1` / behind `0`;
- exactly `1` implementation commit;
- exactly `4` changed files;
- no backend/dependency/UI architecture mutation.

## 7. Pre-PR exact-head QA evidence

On exact implementation head `01c2a9ef1a410ab5a4f4e01e7f7f9beccdfed813`:
- F24 `34749455409` — PASS — artifact `10315237606` — digest `sha256:ff90a88cee3516c5c08abaa3f70b8824eae4b181ca80d60abbcad4a26a74f5bf`;
- Full `34749455355` — PASS — artifact `10314778970` — digest `sha256:8143713e5ffbb96ac5b507f6ad6f6ac249c076ba6f1bed21126604971f47cced`.

## 8. Implementation PR-context QA evidence

PR #111 pre-merge:
- mergeable `true`;
- unresolved review threads `0`;
- exact live `main` remained R1 START;
- expected head `01c2a9ef1a410ab5a4f4e01e7f7f9beccdfed813` used.

PR-context gates:
- F24 `34749648384` — PASS — artifact `10314963775` — digest `sha256:6bc0285ddc28c85142137a7b6b112bfbf6191cdb3626a38a2ff9bff07c977f88`;
- Full `34749648343` — PASS — artifact `10315650310` — digest `sha256:3371925a3e3e1153d29f42d7d33e94c10f18c8eebcd2bb36bf54150172bb55cf`.

Expected-head merge succeeded.

Implementation merge/main:

`3511af765e445146d35e28056645a9cc83f6f104`

## 9. Exact-main implementation QA evidence

Focused exact-main acceptance:
- F24 `34749976321` — PASS — artifact `10314954327` — digest `sha256:28d55d5a2b8bfb7880376257bf0eb0aa984c5a27fb68fa898f2ab1f7690f04fc`.

Full exact-main acceptance:
- Full `34749976313` — PASS — artifact `10315622107` — digest `sha256:473e0b15821c93b77df4af43fd1c173f4a082a10c138889ab0086e94d39e9bb3`.

Exact live frontend `main` was reverified at `3511af765e445146d35e28056645a9cc83f6f104` after both gates were green.

## 10. Route registry decision

`/rules` remains `FINAL_CURRENT`. R1 changes product-policy truth only and has passed the same focused + Full quality boundaries on the exact implementation main.

This route-level acceptance does not itself mean R1 is terminally frozen. Terminal R1 status still requires docs-only closeout merge and terminal frozen-main evidence in Issue #110.

## 11. Documentation-only closeout scope

This closeout is restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F24_RULES_RECERTIFICATION.md`;
4. `docs/workstreams/F24_CLOSEOUT.md`.

Exactly one closeout commit is allowed. No source code, package, lockfile, workflow, runtime configuration, dependency or backend phase change is authorized.

## 12. Remaining terminal gates

After this closeout snapshot is committed, F24-R1 still requires:
1. exact closeout compare: ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR to main without auto-closing Issue #110;
3. every actually-triggered PR-context Full + F24 + frozen-route regression gate PASS;
4. mergeable=true and unresolved review threads=0;
5. exact live-main lock at implementation merge SHA before closeout merge;
6. expected-head closeout merge;
7. terminal frozen-main Full + F24 + frozen-route regressions PASS;
8. terminal artifact IDs and SHA-256 digests recorded in Issue #110;
9. exact live frontend main reverified;
10. Issue #110 updated with terminal evidence and CLOSED / COMPLETED.

Only after those future facts exist may F24-R1 be reported terminally frozen.

## 13. NEXT after F24-R1 terminal freeze

Next public competitive recertification candidate: `/tournaments/$id` — currently `FINAL_PRE_SEO`.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.
