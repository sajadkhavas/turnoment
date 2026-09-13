# F24-R1 — Rules Legacy Policy Reconciliation

Status: `IMPLEMENTATION IN PROGRESS`

Route: `/rules`

Tracking Issue: `#110`

START_SHA: `e3fc59e6509f25a7128c5c6bdfecd607963108c1`

Branch: `phase/f24-r1-rules-policy-reconciliation`

## 1. Baseline and root-law lock

F24 baseline is terminally frozen at `e3fc59e6509f25a7128c5c6bdfecd607963108c1`; Issue #107 is CLOSED / COMPLETED. R1 does not rewrite F24 terminal evidence.

Mandatory root documents were reread from the exact R1 START before mutation:
- `PROJECT_CONTINUITY.md`;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `SEO_FINAL_COPY_PROTOCOL.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- current F24 content, contract, tests and focused workflow.

## 2. Product-owner policy revision

After the F24 freeze, the product owner explicitly requested reconciliation of six inherited rules that F24 had previously excluded. R1 therefore treats the following as approved Turnoment product policy:
1. players arrive 30 minutes before the tournament start; lateness over 15 minutes is a technical loss;
2. valid identification is required on entry to match registration information;
3. personal controllers are allowed after referee review/approval before play;
4. match settings are announced by the referee before each stage;
5. insults, cheating or deliberate abandonment lead to tournament removal and ranking-point deduction;
6. cancellation up to 24 hours before tournament start receives a full registration-fee refund.

These are product-policy statements, not representations of statutory Iranian law.

## 3. Refund/legal wording boundary

R1 does not encode a legal interpretation or state that the 24-hour Turnoment rule is the user's only legal remedy. The public copy explicitly frames it as Turnoment policy and says it does not limit independent legal rights that may otherwise apply.

No additional refund window, statutory deadline, exception, damages promise or legal conclusion is invented by R1.

## 4. Architecture decision

The permanent F24 boundary remains unchanged:

`Route → loader → RulesPageRepository → strict RulesPageDocument validation → RulesPage UI`

The existing schema can already represent the approved rules as stable sections/items. R1 therefore does **not** add a parallel type system, new API endpoint, backend dependency, package or UI state.

Production authority remains reviewed version-controlled policy content behind `RulesPageRepository`.

## 5. Information architecture / precedence

R1 keeps the reading-first UI and reorganizes the public document into:
- pre-registration checks;
- attendance and participant information;
- equipment and match settings;
- fair play and sportsmanlike conduct;
- cancellation/refund;
- tournament-specific rules.

Global rules are the Turnoment baseline. A tournament page supplies operational details; an explicit event-specific exception/condition, when published, is the source for that event.

## 6. SEO/final-copy review

Page purpose and search intent remain the same: informational/pre-participation rules and conditions for gaming tournaments. The existing H1/title/canonical/robots remain aligned with that purpose.

R1 updates the visible summary and meta description so they truthfully reflect the materially broader published content (attendance, identity, equipment, conduct and cancellation) without keyword stuffing.

No page-specific structured data is added.

## 7. Quality/safety changes

The previous focused CI intentionally rejected the six inherited rule phrases. R1 replaces that obsolete negative guard with positive policy-presence checks, while retaining guards against:
- legacy `ایران مهر افزار` branding;
- engineering-stage `backend` / `API` / `mock` wording in public source.

Contract tests require stable IDs for all six approved R1 rules and verify representative policy text plus the refund legal-rights disclaimer.

Focused SSR QA must verify the new sections and policy text in server-rendered HTML and must capture responsive screenshots at `375 / 390 / 430 / 768 / 1024 / 1440`.

## 8. Scope protection

R1 implementation source scope is intentionally limited to:
- `src/lib/rules-page-content.ts`;
- `src/lib/rules-page-contract.spec.ts`;
- `.github/workflows/f24-rules-quality.yml`;
- this R1 workstream record.

The route, RulesPage component, shared layout, other frozen routes, dependencies, lockfiles and backend remain untouched unless a later evidence-backed blocker proves a change necessary.

## 9. Acceptance chain

R1 is not final from this document. Required evidence remains:
1. exact implementation compare from START;
2. focused F24 + Full exact-head QA;
3. implementation PR with PR-context gates, mergeable=true and zero unresolved review threads;
4. expected-head merge;
5. post-main focused + Full QA;
6. current-law documentation closeout if required;
7. terminal frozen-main regression evidence and artifacts/digests;
8. exact live-main verification;
9. Issue #110 CLOSED / COMPLETED.
