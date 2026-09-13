# F25 — Legacy Route Removal Closeout

Status: `CLOSEOUT CANDIDATE`

Tracking Issue: `#113`

## Accepted implementation base

START: `faf2b18287484d2ed78094589fe2db80f2841f55`

Implementation head: `f9200802c1d67899d018bf23de417fcce017c31c`

Implementation PR: `#114` — MERGED with expected-head lock.

Implementation merge/main and closeout base:

`cb02d65ad9fc5c1d4a27ca775bcb5840f33026c1`

Implementation-main acceptance:
- Full `34761207642` — PASS;
- artifact `10319136486`;
- digest `sha256:944a5b64f199a653644c0510fb7966ea6da634f784536daad18697cc184c2e3d`.

## Final product truth being closed

All 17 inherited `LEGACY_REVIEW` ecommerce/service/general-site routes identified by F25 are intentionally removed from Turnoment. They must not be treated as unfinished Turnoment pages or silently reintroduced from the historical Iran Mehr Afzar README.

Accepted Turnoment public/private routes remain in product scope. `/tournaments/$id` remains `FINAL_PRE_SEO` and is the next public recertification candidate after F25 is terminal.

## Documentation-only closeout scope

Exactly these four Markdown files may change in this closeout commit:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F25_LEGACY_ROUTE_REMOVAL.md`;
4. `docs/workstreams/F25_CLOSEOUT.md`.

No source code, package, lockfile, workflow, dependency, runtime configuration or backend change is permitted.

## Closeout acceptance chain

1. closeout branch starts exactly from `cb02d65ad9fc5c1d4a27ca775bcb5840f33026c1`;
2. exactly one closeout commit;
3. exact compare = ahead `1` / behind `0` / total commits `1` / exactly four Markdown files;
4. open closeout PR to `main` without auto-closing Issue #113;
5. every actually-triggered PR-context Full/frozen-route regression gate PASS;
6. PR mergeable `true` and unresolved review threads `0`;
7. exact live `main` still equals `cb02d65ad9fc5c1d4a27ca775bcb5840f33026c1` immediately before merge;
8. merge using the exact expected closeout-head SHA;
9. run/observe every actually-triggered terminal frozen-main gate on the exact closeout merge SHA;
10. record terminal run IDs, artifacts and SHA-256 digests in Issue #113;
11. reverify exact live `main`;
12. close Issue #113 as completed.

Only after all terminal evidence exists may F25 be reported `DONE / MERGED / FROZEN`.

## Non-recursive evidence law

The closeout commit cannot truthfully contain its own future commit SHA, merge SHA, terminal CI run IDs or final artifacts. Those facts must be written to Issue #113 after they exist. No extra documentation commit is required solely to self-record them.
