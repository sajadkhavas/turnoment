# F26 — Tournament Detail Recertification Closeout

Status: `CLOSEOUT CANDIDATE`

Tracking Issue: `#116`

Route: `/tournaments/$id`

## Accepted implementation base

START:

`8d6148b563b8fa84d5cef41903b8dea6de07a6c9`

Implementation head:

`ca0463fb9b5c2bf9f0189dec7481badad3d5464b`

Implementation PR:

`#117` — MERGED with expected-head lock.

Implementation merge/main and closeout base:

`73d16522811ef758cbfc0cd6826cdb4a2be84c96`

## Accepted implementation truth

F26 recertified the existing Tournament Detail route under the current Turnoment frontend + SEO/final-copy laws without redesigning the accepted F01 product architecture.

Accepted outcomes:
- SSR remains enabled for the public tournament entity page;
- canonical indexable URLs use the authoritative tournament slug;
- legacy stable identifiers redirect to canonical slugs;
- final dynamic Turnoment title/meta/canonical/robots/OG/Twitter metadata is present;
- inherited Iran Mehr Afzar route metadata is removed;
- final Persian page-owned copy is accepted under the current SEO/final-copy protocol;
- relevant rules/venue/player links remain crawlable and descriptive;
- registration remains a separate private route;
- server/repository-owned lifecycle/eligibility/bracket/payment truth remains authoritative;
- Event JSON-LD is intentionally omitted because the current authoritative venue contract lacks sufficiently detailed postal-address fields; no schema data is fabricated.

No backend, package, dependency, lockfile or registration-contract mutation was part of F26.

## Exact-head acceptance

Final implementation head: `ca0463fb9b5c2bf9f0189dec7481badad3d5464b`.

- Full Frontend Quality `34849589140` — PASS;
  - artifact `10349556999`;
  - digest `sha256:c8be380de56930aabd4a1e4037a60152b7756ed8e2293f688b69294933dc3003`.
- F26 Tournament Detail Recertification `34849589075` — PASS;
  - artifact `10350060005`;
  - digest `sha256:07a05870b5fb16c5488d11a55a566cfaafad3fabf6c503f32ef3cadd74c904bd`.

## PR-context implementation acceptance

PR #117 actually-triggered gates all PASS:
- Full `34850076098`;
- F26 `34850076182`;
- F17 regression `34850076086`.

Immediately before implementation merge:
- mergeable = `true`;
- unresolved review threads = `0`;
- exact live `main` still equaled START;
- merge used expected implementation-head SHA.

## Implementation-main acceptance

Exact implementation merge/main:

`73d16522811ef758cbfc0cd6826cdb4a2be84c96`

Every workflow actually triggered by the implementation merge passed with real runner execution:

- Full Frontend Quality `34864166474` — PASS;
  - artifact `10355383823`;
  - digest `sha256:88ff8d1fef78c248e738315fa358e50b623153e6f64a9d3c191008dc3af3eb9e`.
- F26 Tournament Detail Recertification `34864166083` — PASS;
  - artifact `10356243874`;
  - digest `sha256:d996b4a5f0067087461d1ddee60d69005124c2496f50da9a3ceb7930b328193e`.
- F17 Public Tournament Discovery regression `34864166079` — PASS;
  - artifact `10356049157`;
  - digest `sha256:658b73c2a1b24548a2ab460f43c4346732aeb9c7b1023b440ca53748f73a4069`.

The route may therefore be recorded as `FINAL_CURRENT` while the F26 workstream remains non-terminal until this closeout chain completes.

## Documentation-only closeout scope

Exactly these four Markdown files may change in this closeout commit:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F26_TOURNAMENT_DETAIL_RECERTIFICATION.md`;
4. `docs/workstreams/F26_CLOSEOUT.md`.

No source code, package, lockfile, workflow, dependency, runtime configuration or backend change is permitted.

## Closeout acceptance chain

1. closeout branch starts exactly from `73d16522811ef758cbfc0cd6826cdb4a2be84c96`;
2. exactly one closeout commit;
3. exact compare = ahead `1` / behind `0` / total commits `1` / exactly four Markdown files;
4. open closeout PR to `main` without auto-closing Issue #116;
5. every actually-triggered PR-context Full/frozen-route regression gate PASS;
6. PR mergeable `true` and unresolved review threads `0`;
7. exact live `main` still equals `73d16522811ef758cbfc0cd6826cdb4a2be84c96` immediately before merge;
8. merge using the exact expected closeout-head SHA;
9. observe every actually-triggered terminal frozen-main gate on the exact closeout merge SHA;
10. record terminal run IDs, artifacts and SHA-256 digests in Issue #116;
11. reverify exact live `main`;
12. close Issue #116 as completed.

Only after all terminal evidence exists may F26 be reported `DONE / MERGED / FROZEN`.

## Non-recursive evidence law

The closeout commit cannot truthfully contain its own future commit SHA, merge SHA, terminal CI run IDs or final artifacts. Those facts must be written to Issue #116 after they exist. No extra documentation commit is required solely to self-record them.