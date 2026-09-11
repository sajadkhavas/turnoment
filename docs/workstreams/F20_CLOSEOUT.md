# F20 — Public Gaming Center Detail Closeout

Status at document creation:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Route: `/centers/$id`

Target route status: `FINAL_CURRENT`

Tracking Issue: `#95`

This is a non-recursive closeout snapshot. It records only evidence that already exists when this document is created. The future closeout merge/frozen-main SHA and terminal post-closeout CI/artifact/digest are intentionally not self-recorded here; they belong in Issue #95 after they exist.

## 1. Exact source lock

Frontend START_SHA:

`a473613191fd5132664c5234b692befda4a5cf41`

Implementation branch:

`phase/f20-public-gaming-center-detail`

Final reviewed implementation head:

`358e269b1d6bdf98d3b0ff9303cbad82add05cd2`

Implementation PR:

`#96` — MERGED with expected-head lock.

Implementation merge / accepted main:

`12cf7013377792f3324a8ac26db66b1a45694aca`

Closeout branch base:

`12cf7013377792f3324a8ac26db66b1a45694aca`

Closeout branch:

`closeout/f20-public-gaming-center-detail`

## 2. Accepted permanent architecture

F20 replaces the legacy local-fixture/detail-name-join route with:

`route publicId param → SSR loader → typed GamingCenterDetailRepository → strict runtime-validated detail projection → Gaming Center Detail UI`

Accepted production behavior:
- planned endpoint `GET /api/v1/centers/{publicId}/`;
- production defaults to Django HTTP repository;
- `VITE_API_BASE_URL` required;
- 404 becomes public not-found;
- other HTTP/contract failures fail closed;
- returned public identity must match the requested `publicId`;
- deterministic fixtures remain dev/test/visual-QA only;
- no silent production fallback;
- no center relation derived from display name.

Canonical v1 public route identity is `publicId`; `centerId` remains the stable backend relation/entity identity. Any future human-readable slug migration requires an explicit compatibility/redirect workstream.

## 3. Public truth / privacy / LocalBusiness acceptance

Backend/repository owns authoritative published center identity, verification, locality, public summary/description, public facilities/media, nullable authoritative tournament count, explicitly public visit information and bounded upcoming-tournament projection by stable IDs/slugs.

Public address, phone, opening hours and map URL are rendered only when explicitly public-authorized. Missing values are valid and are never fabricated.

F20 v1 contains no rating/review fields or markup because no accepted authoritative ratings domain currently defines aggregation/publication semantics.

Generic `LocalBusiness` JSON-LD is emitted only when a complete runtime-validated public address exists and matches visible page content. Optional public phone/opening hours may be included only when authoritative. No `aggregateRating` or review markup is authorized.

## 4. Public SEO / final-copy acceptance

Published detail:
- H1 = authoritative center name;
- title `{name} | گیم‌نت و مرکز گیمینگ در {city} | Turnoment`;
- canonical `/centers/{publicId}`;
- robots `index,follow`;
- OpenGraph type `website`;
- entity-specific natural Persian description;
- no unsupported popularity, ranking, best/largest/number-one, rating or review claim.

Not-found/non-public state:
- no public detail projection;
- final user-facing Persian not-found state;
- `noindex,nofollow`.

Intent boundary remains:
- `/centers` = multi-center discovery;
- `/centers/$id` = one authoritative center/local entity;
- `/tournaments` = tournament discovery;
- `/games` = game catalog;
- `/host` = owner acquisition/onboarding.

## 5. Official documentation applied

Current official guidance reviewed/applied during F20 included:
- TanStack Router data loading, path params, pending/error lifecycle and document-head management;
- TanStack Start SSR/environment guidance;
- Google Search canonicalization, title/snippet and people-first guidance;
- Google `LocalBusiness` structured-data requirements;
- W3C WCAG 2.2 focus/target-size baseline;
- Django REST framework permission/versioning guidance for the separate backend documentation alignment.

Key decisions:
- primary detail data is SSR-loaded;
- production adapter is fail-closed;
- structured data never invents missing local-business truth;
- public/indexability state follows authoritative publication/existence;
- accessible keyboard focus and touch-safe controls are retained.

## 6. Cross-repo backend alignment

Backend repository:

`sajadkhavas/turnoment-backend`

Backend F20 alignment is terminal as documentation alignment only:
- Backend START `b6421e1e76e846c89d799fe4860bc11c8242f2f8`;
- Issue #37 CLOSED / COMPLETED;
- docs head `1844f02993063a5e4f9547d0f564f2e298cc6552`;
- PR #38 MERGED;
- PR-context Backend Quality Gate `34653701760` PASS on Python 3.12 / 3.14;
- backend merge/main `e8e48061cba201b3a12ac534ef97f22565bea5a3`;
- post-main Backend Quality Gate `34653883656` PASS on Python 3.12 / 3.14;
- no runtime Python/model/migration/serializer/view/URL/settings/dependency/workflow/phase-registry implementation added.

Runtime remains:

`FRONTEND MOCK / BACKEND PENDING`

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

## 7. Exact implementation diff evidence

Compare from START to final reviewed implementation head:
- ahead `2`;
- behind `0`;
- `12` changed files;
- no `bun.lock` mutation;
- no dependency/version drift;
- final package delta only appends the F20 contract spec to the existing test command;
- frozen F19/F18/F17/F16/F02 route source is absent from the implementation diff.

## 8. Exact-head QA evidence

Final reviewed implementation head:

`358e269b1d6bdf98d3b0ff9303cbad82add05cd2`

Normal Frontend Quality Gate:
- run `34654126483` — PASS;
- artifact `10284643318`;
- digest `sha256:59d11a61f3b0ef0a65f330cf8cca16b0ad74caaf6a21f7c1700707cdd4b03277`.

Focused F20 Quality Gate:
- run `34654126479` — PASS;
- artifact `10285182279`;
- digest `sha256:7b79201ff34cf0114ef8b18514fc971508de9f802d74e512e415ab1120fed228`.

Manual visual evidence:
- `c1` with public visit information and `c4` without public address/contact were inspected at `375 / 390 / 430 / 768 / 1024 / 1440`;
- no observed horizontal overflow, clipping or overlap.

## 9. Implementation PR-context QA evidence

Implementation PR #96 pre-merge:
- mergeable `true`;
- unresolved review threads `0`;
- exact pre-merge main remained START_SHA;
- expected head `358e269b1d6bdf98d3b0ff9303cbad82add05cd2` used.

PR-context gates:
- Full `34654555350` — PASS; artifact `10284364443`; digest `sha256:f10b01879b3d187c133a6d733f8d98342579a474855b89f72f7f0ed4386fe78f`;
- F20 `34654555391` — PASS; artifact `10284289406`; digest `sha256:b6aaa4a36c51eacba25702ad0fa72612664548509b369ae7d65de4550242965e`;
- F19 `34654555399` — PASS; artifact `10285073293`; digest `sha256:5fb05e4c9169e00e87bccc3f62254871d1c716564c48275cf130efbe6df3f99c`;
- F18 `34654555470` — PASS; artifact `10284718691`; digest `sha256:7ba8239687005c87fc1ced1579fb15f411f29549d2fefd26814c21aab226f765`;
- F17 `34654555326` — PASS; artifact `10284344126`; digest `sha256:f9dbeb5f70c0f448b932330dc05ef73b9fd3fc7ba9c6aa5275e45b63b4bf4bc2`;
- F16 `34654555331` — PASS; artifact `10284848340`; digest `sha256:a949c9ca6481f40ea0974bb93a2e71dd9fc09030ea0792c48ade1f262b4ff550`.

## 10. Post-main implementation QA evidence

Accepted implementation main:

`12cf7013377792f3324a8ac26db66b1a45694aca`

Post-main gates:
- Full `34655166555` — PASS; artifact `10284784860`; digest `sha256:a2cc479e3e56c5b1745fc29ea813f940e618ab0b713e1387b713a59c29a8f430`;
- F20 `34655166499` — PASS; artifact `10284324968`; digest `sha256:6315b0fee250836ee64445fb293f4d785f75ad52d81d1062c0709175893e3a93`;
- F19 `34655166483` — PASS; artifact `10285009224`; digest `sha256:5fd07d07b902f8bb271d39c698c258545f63062c3349559c6e1a3e00c0e72dda`;
- F18 `34655166552` — PASS; artifact `10284309844`; digest `sha256:2494c6c8f731e0a9079970aedb263b0dbdeed487993d1c49d281c56b410841d9`;
- F17 `34655166537` — PASS; artifact `10284879617`; digest `sha256:e48eccc82da8db4320a7c90589327e96411401455f298fc60754f319f77ed762`;
- F16 `34655166488` — PASS; artifact `10284779627`; digest `sha256:3e9179a6c837bfdd9caa3679fbdf290c22b0bde3f202e840aed57cad9e9e47c3`.

Live frontend `main` was the accepted implementation SHA before closeout branch creation.

## 11. Route registry decision

Because implementation is merged and required post-main implementation gates are green, `/centers/$id` is eligible for non-recursive promotion to:

`FINAL_CURRENT`

This route-level promotion does not itself mean the F20 workstream is terminally frozen. Terminal workstream status still requires closeout merge and terminal frozen-main evidence in Issue #95.

## 12. Documentation-only closeout scope

This closeout is restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F20_PUBLIC_GAMING_CENTER_DETAIL.md`;
4. `docs/workstreams/F20_CLOSEOUT.md`.

No source code, package, lockfile, workflow, runtime configuration, dependency or backend runtime phase change is authorized.

## 13. Remaining terminal gates

After this closeout snapshot is committed, F20 still requires:
1. exact closeout compare: ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR to main without auto-closing Issue #95;
3. PR-context Full + F20 and all triggered frozen-route regression gates PASS;
4. mergeable=true and unresolved review threads=0;
5. exact live-main lock at implementation merge SHA before closeout merge;
6. expected-head closeout merge;
7. terminal frozen-main Full + F20 and triggered regressions PASS;
8. terminal artifact IDs and SHA-256 digests recorded in Issue #95;
9. exact live frontend main reverified;
10. Issue #95 updated with terminal evidence and CLOSED / COMPLETED.

Only after those future facts exist may the workstream be reported:

`F20 — DONE / MERGED / FROZEN — FINAL_CURRENT`

## 14. NEXT after F20 terminal freeze

The next public current-law workstream is:

`/ranking`

Then:

`/players/$username` → `/host` → `/rules`.
