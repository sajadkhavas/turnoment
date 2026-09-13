# F24 — Rules Page Recertification / R1 Policy Reconciliation

Status: `F24 ORIGINAL FROZEN / F24-R1 IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Route: `/rules`

Original F24 tracking Issue: `#107` — CLOSED / COMPLETED

F24-R1 tracking Issue: `#110` — OPEN

R1 START_SHA: `e3fc59e6509f25a7128c5c6bdfecd607963108c1`

R1 implementation branch: `phase/f24-r1-rules-policy-reconciliation`

R1 closeout branch: `closeout/f24-r1-rules-policy-reconciliation`

Target route status: `FINAL_CURRENT`

## 1. Historical lock

Original F24 recertified `/rules` under current page/SEO law and was terminally frozen at `e3fc59e6509f25a7128c5c6bdfecd607963108c1`, with terminal evidence recorded in Issue #107.

F24-R1 exists because the product owner later explicitly approved inherited operational rules that original F24 had intentionally rejected as unsupported. R1 does not rewrite the original freeze; it records a later product-policy decision as a bounded revision.

## 2. Permanent architecture

Architecture remains unchanged:

`Route → loader → RulesPageRepository → strict RulesPageDocument validation → RulesPage UI`

R1 adds no new API/backend/dependency/UI architecture and does not claim a production rules endpoint.

## 3. R1 product-policy decision

On 2026-09-13 the product owner explicitly approved the following as current Turnoment platform policy:
1. players should be present 30 minutes before tournament start; delay beyond 15 minutes is a technical loss;
2. a valid identity document must be presented at entry to match registration information;
3. personal controllers are allowed but require referee inspection/approval before play;
4. match settings are announced by the referee before each stage;
5. insult, cheating or deliberate abandonment can result in tournament elimination and ranking-point deduction;
6. cancellation up to 24 hours before tournament start qualifies for a full Turnoment registration-fee refund.

The refund statement is deliberately framed as Turnoment product policy. It is not represented as a complete statement of Iranian law and does not claim to remove independent legal rights.

The previously accepted baseline principles continue to apply: accurate/current registration information, prohibition of cheating/collusion/result manipulation, respectful conduct, and compliance with published event-specific rules.

## 4. SEO and UX scope

R1 preserves the accepted route purpose, H1/title/canonical/robots, semantic grouped UI, SSR loader authority, one-main structure, accessible anchors and responsive behavior. No page-specific structured data is added merely for coverage.

The product-policy change is content/governance only; the accepted visual/technical architecture remains intact.

## 5. Exact implementation ownership

R1 implementation head:

`01c2a9ef1a410ab5a4f4e01e7f7f9beccdfed813`

R1 START → implementation head:
- ahead `1` / behind `0`;
- exactly `1` commit;
- exactly `4` changed files;
- no backend/dependency/UI architecture mutation.

Implementation changed only the bounded policy content/test/governance surface required to publish the newly approved rules.

## 6. Pre-PR exact-head QA

On exact implementation head `01c2a9ef1a410ab5a4f4e01e7f7f9beccdfed813`:
- F24 `34749455409` — PASS — artifact `10315237606` — digest `sha256:ff90a88cee3516c5c08abaa3f70b8824eae4b181ca80d60abbcad4a26a74f5bf`;
- Full `34749455355` — PASS — artifact `10314778970` — digest `sha256:8143713e5ffbb96ac5b507f6ad6f6ac249c076ba6f1bed21126604971f47cced`.

Focused evidence covers lint, F24 contract checks, production build, typecheck, SSR/SEO/copy and responsive evidence. Full evidence covers repository-wide frontend quality and browser smoke/responsive screenshots.

## 7. PR #111 acceptance

PR #111:
- base exact original F24 terminal main `e3fc59e6509f25a7128c5c6bdfecd607963108c1`;
- head `01c2a9ef1a410ab5a4f4e01e7f7f9beccdfed813`;
- exactly one implementation commit and four changed files;
- mergeable `true`;
- unresolved review threads `0`;
- live `main` remained exact R1 START before merge;
- expected-head merge lock used.

PR-context gates:
- F24 `34749648384` — PASS — artifact `10314963775` — digest `sha256:6bc0285ddc28c85142137a7b6b112bfbf6191cdb3626a38a2ff9bff07c977f88`;
- Full `34749648343` — PASS — artifact `10315650310` — digest `sha256:3371925a3e3e1153d29f42d7d33e94c10f18c8eebcd2bb36bf54150172bb55cf`.

Expected-head merge succeeded.

Implementation merge/main:

`3511af765e445146d35e28056645a9cc83f6f104`

## 8. Exact-main implementation acceptance

GitHub connector merge did not dispatch the expected main push workflows, so no PASS was assumed. The already-merged implementation branch ref was safely replayed to the exact merge SHA without changing `main` or repository content, allowing the required workflows to execute on the same commit tree now on `main`.

On exact implementation merge SHA `3511af765e445146d35e28056645a9cc83f6f104`:
- F24 `34749976321` — PASS — artifact `10314954327` — digest `sha256:28d55d5a2b8bfb7880376257bf0eb0aa984c5a27fb68fa898f2ab1f7690f04fc`;
- Full `34749976313` — PASS — artifact `10315622107` — digest `sha256:473e0b15821c93b77df4af43fd1c173f4a082a10c138889ab0086e94d39e9bb3`.

Exact live frontend `main` was reverified at `3511af765e445146d35e28056645a9cc83f6f104` after both exact-main gates were green.

Therefore `/rules` remains `FINAL_CURRENT` under the revised current product-policy truth.

## 9. Documentation-only closeout law

R1 closeout branch:

`closeout/f24-r1-rules-policy-reconciliation`

Closeout is exactly one commit changing exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F24_RULES_RECERTIFICATION.md`;
4. `docs/workstreams/F24_CLOSEOUT.md`.

No source/package/lockfile/workflow/dependency/runtime/backend mutation is authorized in closeout.

Terminal closeout SHA/merge/frozen-main QA facts must be recorded in Issue #110 after they exist, not recursively self-recorded in this commit.

## 10. Remaining terminal chain

F24-R1 still requires:
1. exact closeout compare = ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR without auto-closing Issue #110;
3. every actually-triggered PR-context Full/F24/frozen-route regression gate PASS;
4. mergeable=true and unresolved review threads=0;
5. exact live-main lock at `3511af765e445146d35e28056645a9cc83f6f104` before closeout merge;
6. expected-head closeout merge;
7. terminal frozen-main Full/F24/frozen-route regressions PASS;
8. terminal artifacts/digests recorded in Issue #110;
9. exact live `main` reverified;
10. Issue #110 CLOSED / COMPLETED.

Only after those future facts exist may F24-R1 be reported terminally frozen.

## 11. NEXT after terminal F24-R1

Next public competitive recertification candidate: `/tournaments/$id` — currently `FINAL_PRE_SEO`.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.
