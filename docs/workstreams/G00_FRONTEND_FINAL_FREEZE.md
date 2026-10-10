# G00 — FRONTEND FINAL RECONCILIATION AND FREEZE

Tracking Issue: #119

Status: `IMPLEMENTATION IN PROGRESS`

## 1. Purpose

G00 exists because the accepted VS Code frontend advanced beyond the last terminal GitHub frontend baseline. The goal is to make GitHub authoritative again without losing local work, then remove pre-backend repository drift and freeze one exact frontend contract baseline.

G00 is not a page redesign and not a backend phase.

## 2. Exact source locks

Last terminal frontend main before reconciliation:

`c8c2a9c42ea46a5d694dd924e4a7004aaa7e66e8`

Source-reconciliation branch:

`sync/local-final-20261010`

Exact synchronized local head:

`d231fafc613fb37a616a8d90e572f73eb7195d72`

Implementation branch:

`phase/g00-frontend-final-freeze-20261010`

Implementation branch was created from exact synchronized head `d231fafc613fb37a616a8d90e572f73eb7195d72`.

## 3. Reconciliation evidence

The local sync gate completed before push with:

- source lock PASS;
- secret-file gate PASS;
- PWA source gate PASS;
- diff gate PASS;
- frozen Bun install PASS;
- lint PASS;
- typecheck PASS;
- all contract tests PASS;
- production build PASS;
- built PWA gate PASS;
- Git commit/push PASS.

Sync commit changed 27 frontend/runtime files and introduced the accepted local PWA assets/install prompt.

## 4. Authorized implementation scope

G00 may:

- replace legacy root README content with current Turnoment documentation;
- update current-state/route documentation;
- centralize adapter policy in `src/lib/data-adapter.ts`;
- add focused adapter-policy tests;
- rename frontend HTTP repository classes from framework-specific Django names to framework-neutral API names;
- use `VITE_DATA_ADAPTER=api` as the production HTTP adapter contract;
- ensure production defaults toward the real API rather than mock when adapter config is omitted;
- reject unsupported/legacy adapter values;
- preserve explicit `mock` for deterministic local and production-like frontend acceptance;
- add `.gitattributes` to keep text line endings stable across Windows/Linux;
- update `.env.example` to the final frontend adapter contract.

G00 may not:

- implement or mutate backend runtime;
- change API business truth into frontend truth;
- redesign frozen routes;
- rewrite accepted public SEO/copy;
- revive F25-removed routes;
- touch VPS/server deployment.

## 5. Official-source audit

Reviewed for G00:

- Vite — Env Variables and Modes:
  https://vite.dev/guide/env-and-mode.html
- TanStack Start — Environment Variables:
  https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

Applied decisions:

- `VITE_*` variables are client-visible configuration and must not contain secrets;
- `import.meta.env.PROD` is the correct Vite production-mode signal for the adapter default;
- missing production adapter config must not result in fabricated mock data;
- required real API configuration remains explicit;
- sensitive backend configuration remains outside `VITE_*`.

No public-page design/SEO research is required because G00 does not authorize visible public copy or route redesign; previously accepted page-level evidence remains frozen.

## 6. Adapter acceptance law

Final adapter contract:

```text
explicit mock -> mock
explicit api  -> api
missing in dev/test -> mock
missing in production -> api
unknown/legacy value -> fail
```

This removes the old frontend assumption that the production backend framework is Django. HTTP endpoint/domain contracts remain unchanged unless a future backend integration workstream explicitly changes them with cross-repo evidence.

## 7. Required quality gates before PR acceptance

- frozen Bun install;
- lint;
- TypeScript typecheck;
- all contract tests including `data-adapter.spec.ts`;
- production build;
- existing browser/responsive Full Frontend Quality gate;
- PWA source/build presence;
- exact diff review;
- no removed route reintroduction;
- no secret/env leakage.

## 8. Final VS acceptance

After GitHub implementation and PR-context CI are green, the project owner must pull the exact reviewed head in VS Code and run the final acceptance gate.

No merge/freeze claim is allowed before that exact local acceptance passes.

## 9. Terminal chain

1. implementation head finalized on `phase/g00-frontend-final-freeze-20261010`;
2. exact compare against `c8c2a9c42ea46a5d694dd924e4a7004aaa7e66e8` reviewed;
3. actually-triggered GitHub implementation/PR gates PASS;
4. PR mergeable and unresolved review threads = 0;
5. exact reviewed head accepted in VS Code;
6. exact live `main` reverified before merge;
7. expected-head merge;
8. actually-triggered post-main gates PASS;
9. exact final main SHA + terminal run evidence recorded in Issue #119;
10. Issue #119 closed completed;
11. status becomes `FRONTEND FINAL / BACKEND READY`.

Future terminal facts belong in Issue #119 after they exist; do not create recursive documentation commits solely to record their own SHA.
