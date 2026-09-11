# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> Operational source of truth for continuing Turnoment without duplicate work.

Last update: `2026-09-12`

## 1. Mandatory continuation law

Every chat/agent MUST read `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, `SEO_FINAL_COPY_PROTOCOL.md` for public/indexable work, and `docs/ROUTE_COMPLIANCE_REGISTRY.md`; verify exact live `main`; use a dedicated branch/Issue/PR; preserve frozen routes; keep production fail-closed; and never claim `DONE / MERGED / FROZEN` from chat memory alone.

Terminal closeout SHA/CI belongs in the tracking Issue after merge; do not create recursive documentation commits to self-record their own SHA.

## 2. Current frontend main / freeze truth

Repository: `sajadkhavas/turnoment`.

Accepted F20 implementation merge/main at closeout creation:

`12cf7013377792f3324a8ac26db66b1a45694aca`

Last terminal frozen baseline before F20 remains F19:

`a473613191fd5132664c5234b692befda4a5cf41`

F19 `/centers` remains `DONE / MERGED / FROZEN — FINAL_CURRENT` with Issue #92 CLOSED / COMPLETED.

## 3. Active workstream — F20 Public Gaming Center Detail

Route: `/centers/$id`.

Tracking Issue: `#95` — OPEN.

START_SHA:

`a473613191fd5132664c5234b692befda4a5cf41`

Implementation branch:

`phase/f20-public-gaming-center-detail`

Final reviewed implementation head:

`358e269b1d6bdf98d3b0ff9303cbad82add05cd2`

Implementation PR:

`#96` — MERGED with expected-head lock.

Implementation merge / accepted main:

`12cf7013377792f3324a8ac26db66b1a45694aca`

Closeout branch:

`closeout/f20-public-gaming-center-detail`

Current workstream status:

`MERGED / CLOSEOUT IN PROGRESS`

Route-level status is now eligible for non-recursive promotion to:

`FINAL_CURRENT`

The workstream is not terminally frozen until closeout merge + terminal frozen-main CI/artifacts are recorded in Issue #95.

## 4. Permanent F20 architecture

`route publicId param → SSR loader → typed GamingCenterDetailRepository → strict runtime-validated detail projection → Gaming Center Detail UI`

Planned production endpoint:

`GET /api/v1/centers/{publicId}/`

Canonical v1 route identity is `publicId`; `centerId` remains backend relation identity; display names are never relation keys. Production defaults to the Django adapter, requires `VITE_API_BASE_URL`, maps 404 to not-found, fails closed on other HTTP/contract errors, validates returned identity, and never silently falls back to fixture data.

Ratings/reviews remain excluded until an authoritative ratings domain exists. Public address/phone/opening-hours/map data is shown only when explicitly public. `LocalBusiness` JSON-LD is emitted only when a complete authoritative public address exists and matches visible content; no review/rating markup is authorized.

Runtime remains exactly:

`FRONTEND MOCK / BACKEND PENDING`

## 5. SEO / final-copy truth

Published authoritative detail:
- title format `{name} | گیم‌نت و مرکز گیمینگ در {city} | Turnoment`;
- canonical `/centers/{publicId}`;
- robots `index,follow`;
- OpenGraph type `website`;
- entity-specific natural description;
- no fabricated popularity, superlative, rating or review claims.

Not-found/non-public state:
- no public detail projection;
- final Persian not-found UX;
- `noindex,nofollow`.

## 6. Implementation evidence

Final compare START → reviewed implementation head:
- ahead `2`, behind `0`;
- `12` changed files;
- no `bun.lock` mutation;
- no dependency/version drift;
- package delta only adds the F20 contract spec to the test chain;
- frozen F19/F18/F17/F16/F02 route source not changed.

Exact-head QA on `358e269b1d6bdf98d3b0ff9303cbad82add05cd2`:
- Full `34654126483` PASS — artifact `10284643318` — digest `sha256:59d11a61f3b0ef0a65f330cf8cca16b0ad74caaf6a21f7c1700707cdd4b03277`;
- F20 `34654126479` PASS — artifact `10285182279` — digest `sha256:7b79201ff34cf0114ef8b18514fc971508de9f802d74e512e415ab1120fed228`;
- c1 + c4 manually inspected at 375/390/430/768/1024/1440 without observed overflow/clipping/overlap.

PR #96 acceptance:
- mergeable `true`;
- unresolved review threads `0`;
- exact pre-merge main remained START_SHA;
- expected head `358e269b1d6bdf98d3b0ff9303cbad82add05cd2` used;
- PR-context Full/F20/F19/F18/F17/F16 all PASS.

PR-context runs:
- Full `34654555350` PASS — artifact `10284364443` — digest `sha256:f10b01879b3d187c133a6d733f8d98342579a474855b89f72f7f0ed4386fe78f`;
- F20 `34654555391` PASS — artifact `10284289406` — digest `sha256:b6aaa4a36c51eacba25702ad0fa72612664548509b369ae7d65de4550242965e`;
- F19 `34654555399` PASS — artifact `10285073293` — digest `sha256:5fb05e4c9169e00e87bccc3f62254871d1c716564c48275cf130efbe6df3f99c`;
- F18 `34654555470` PASS — artifact `10284718691` — digest `sha256:7ba8239687005c87fc1ced1579fb15f411f29549d2fefd26814c21aab226f765`;
- F17 `34654555326` PASS — artifact `10284344126` — digest `sha256:f9dbeb5f70c0f448b932330dc05ef73b9fd3fc7ba9c6aa5275e45b63b4bf4bc2`;
- F16 `34654555331` PASS — artifact `10284848340` — digest `sha256:a949c9ca6481f40ea0974bb93a2e71dd9fc09030ea0792c48ade1f262b4ff550`.

Post-main implementation QA on exact `12cf7013377792f3324a8ac26db66b1a45694aca`:
- Full `34655166555` PASS — artifact `10284784860` — digest `sha256:a2cc479e3e56c5b1745fc29ea813f940e618ab0b713e1387b713a59c29a8f430`;
- F20 `34655166499` PASS — artifact `10284324968` — digest `sha256:6315b0fee250836ee64445fb293f4d785f75ad52d81d1062c0709175893e3a93`;
- F19 `34655166483` PASS — artifact `10285009224` — digest `sha256:5fd07d07b902f8bb271d39c698c258545f63062c3349559c6e1a3e00c0e72dda`;
- F18 `34655166552` PASS — artifact `10284309844` — digest `sha256:2494c6c8f731e0a9079970aedb263b0dbdeed487993d1c49d281c56b410841d9`;
- F17 `34655166537` PASS — artifact `10284879617` — digest `sha256:e48eccc82da8db4320a7c90589327e96411401455f298fc60754f319f77ed762`;
- F16 `34655166488` PASS — artifact `10284779627` — digest `sha256:3e9179a6c837bfdd9caa3679fbdf290c22b0bde3f202e840aed57cad9e9e47c3`.

## 7. Backend alignment truth

Backend Issue #37 is CLOSED / COMPLETED and PR #38 is MERGED. Backend main after documentation alignment is `e8e48061cba201b3a12ac534ef97f22565bea5a3`; PR-context gate `34653701760` and post-main gate `34653883656` both PASS on Python 3.12 / 3.14. No runtime gaming-center implementation or phase reordering was added.

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

## 8. Documentation-only closeout law

F20 closeout is restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F20_PUBLIC_GAMING_CENTER_DETAIL.md`;
4. `docs/workstreams/F20_CLOSEOUT.md`.

No source, package, lockfile, workflow, dependency or runtime configuration change is authorized.

## 9. Remaining terminal F20 chain

1. verify closeout compare = ahead 1 / behind 0 / exactly one commit / exactly four Markdown files;
2. open closeout PR without auto-closing Issue #95;
3. require PR-context Full + F20 + all triggered frozen-route regressions PASS;
4. require mergeable=true, unresolved review threads=0 and exact main lock at implementation merge SHA;
5. expected-head closeout merge;
6. require terminal frozen-main Full + F20 + triggered regressions PASS with artifact IDs/digests;
7. reverify exact live main;
8. record terminal facts in Issue #95 and close `completed`;
9. only then report `F20 — DONE / MERGED / FROZEN — FINAL_CURRENT`.

## 10. NEXT after terminal F20

`/ranking` → `/players/$username` → `/host` → `/rules`.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.
