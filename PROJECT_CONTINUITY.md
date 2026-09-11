# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> Operational source of truth for continuing Turnoment without duplicate work.

Last update: `2026-09-12`

## 1. Mandatory continuation law

Every chat/agent MUST:
1. read this file before implementation;
2. read `FRONTEND_PAGE_DELIVERY_PROTOCOL.md` for frontend page work;
3. read `SEO_FINAL_COPY_PROTOCOL.md` for public/indexable pages or material public-copy changes;
4. read `docs/ROUTE_COMPLIANCE_REGISTRY.md` before modifying/accepting an existing route;
5. verify exact current `main` SHA of every repository it will change;
6. read the relevant Issue/PR/workstream evidence before repeating work;
7. use a dedicated branch;
8. never claim `DONE / MERGED / FROZEN` from chat memory alone;
9. record exact branch/SHA/PR/CI/artifact evidence;
10. update both repositories when a cross-repo contract/global product truth changes;
11. preserve frozen routes outside the active workstream;
12. keep production fail-closed: deterministic fixtures are dev/test/visual-QA only.

Allowed statuses: `PLANNED`, `IN PROGRESS`, `PARTIAL / SAFE CHECKPOINT`, `READY TO MERGE`, `MERGED / CLOSEOUT IN PROGRESS`, `DONE / MERGED / FROZEN`.

## 2. Current frontend frozen-main truth

Repository: `sajadkhavas/turnoment`

Current terminal frozen frontend `main` before F20:

`a473613191fd5132664c5234b692befda4a5cf41`

This is the F19 closeout merge/frozen-main SHA.

F19 `/centers` terminal evidence:
- Issue #92 — CLOSED / COMPLETED;
- implementation PR #93 — MERGED;
- closeout PR #94 — MERGED;
- frozen main `a473613191fd5132664c5234b692befda4a5cf41`;
- terminal Full `34650034489` — PASS;
- terminal F19 `34650034427` — PASS;
- terminal F18 `34650034399` — PASS;
- terminal F17 `34650034345` — PASS;
- terminal F16 `34650034387` — PASS.

Therefore F19 is terminal:

`DONE / MERGED / FROZEN — FINAL_CURRENT`

## 3. Active frontend workstream — F20

Workstream:

`F20 — Public Gaming Center Detail`

Route:

`/centers/$id`

Tracking Issue:

`#95` — OPEN

START_SHA:

`a473613191fd5132664c5234b692befda4a5cf41`

Implementation branch:

`phase/f20-public-gaming-center-detail`

Current implementation source head before this documentation checkpoint:

`a424b8ef1ea9cef4173ce5caa86106371281e1e4`

Status:

`IN PROGRESS — IMPLEMENTATION QA ACCEPTED / DOCUMENTATION CHECKPOINT`

Frozen dependencies outside F20:
- F16 `/`;
- F17 `/tournaments`;
- F18 `/games`;
- F19 `/centers`;
- F02 `/games/$slug`.

F20 does not mutate those frozen route sources.

## 4. F20 permanent architecture

F20 replaces the legacy local-fixture/detail-name-join route with:

`route publicId param → SSR loader → typed GamingCenterDetailRepository → strict runtime-validated detail projection → Gaming Center Detail UI`

Production endpoint planned:

`GET /api/v1/centers/{publicId}/`

Repository/backend owns:
- published/public center identity and existence;
- stable `centerId` relation identity;
- public `publicId` route identity;
- verification state;
- city/district identity;
- public summary/description;
- public facilities/media;
- explicitly public address/phone/opening-hours/map projection;
- authoritative upcoming-tournament count;
- bounded tournament projection by stable tournament IDs/slugs.

Frontend owns:
- route presentation and final natural Persian copy;
- title/meta/canonical/robots;
- conditional LocalBusiness structured data using only authoritative public values;
- accessibility/responsive behavior;
- deterministic fixture repository for dev/test/visual QA only.

Production invariant:
- no direct import from legacy `tournament-data`;
- no center-name joins;
- no production fixture fallback;
- no rating/review fabrication;
- HTTP/contract failures fail closed.

## 5. F20 canonical identifier decision

F20 v1 keeps `publicId` as the canonical public route identifier.

Canonical URL:

`/centers/{publicId}`

Reason:
- frozen F19 already links with `publicId`;
- `centerId` remains backend relation identity;
- display names are never keys;
- avoiding a URL migration prevents reopening frozen F19 without an explicit redirect/alias contract.

Any future human-readable slug migration requires its own compatibility/redirect workstream.

## 6. F20 SEO / LocalBusiness truth

Published authoritative detail:
- robots `index,follow`;
- canonical `/centers/{publicId}`;
- entity-specific title format: `{name} | گیم‌نت و مرکز گیمینگ در {city} | Turnoment`;
- natural meta description from authoritative center/locality identity;
- OpenGraph type `website`;
- no unsupported popularity, “best/largest/number one”, rating or review claim.

Not-found/non-public detail:
- no public detail payload;
- final not-found UX;
- `noindex,nofollow` metadata path.

LocalBusiness decision:
- emit generic `LocalBusiness` JSON-LD only when a complete runtime-validated `publicAddress` exists;
- visible page address must match structured data;
- optional phone/opening hours only when public-authorized and visible;
- no aggregateRating/review markup;
- if public address is missing, omit LocalBusiness rather than invent values.

## 7. F20 implementation source scope

Current implementation commit:

`a424b8ef1ea9cef4173ce5caa86106371281e1e4`

Compare from START:
- ahead `1` / behind `0` / exactly one implementation commit;
- exactly `9` changed files before governance docs;
- no `bun.lock` mutation;
- package delta only appends `gaming-center-detail-contract.spec.ts` to the full test chain;
- no dependency/version mutation;
- no frozen F19/F18/F17/F16/F02 source mutation.

Implementation source files:
- `.github/workflows/f20-public-gaming-center-detail-quality.yml`;
- `package.json` test wiring only;
- `src/routes/centers.$id.tsx`;
- `src/components/centers/gaming-center-detail-page.tsx`;
- `src/lib/gaming-center-detail-contract.ts`;
- `src/lib/gaming-center-detail-contract.spec.ts`;
- `src/lib/gaming-center-detail-fixture.ts`;
- `src/lib/gaming-center-detail-http-repository.ts`;
- `src/lib/gaming-center-detail-repository.ts`.

## 8. Exact-head F20 QA evidence

Exact implementation head:

`a424b8ef1ea9cef4173ce5caa86106371281e1e4`

Focused F20 gate:
- run `34653443430` — PASS;
- contract/build/typecheck/SSR/SEO/LocalBusiness/responsive evidence PASS;
- artifact `10284771804`;
- digest `sha256:1ce354668583c5b9fba17811640eb5d5990e9a42ded90f93c0799b911bdc6661`.

Full Frontend Quality Gate:
- run `34653443343` — PASS;
- lint/build/typecheck/full contracts/browser smoke/responsive screenshots PASS;
- artifact `10284697461`;
- digest `sha256:d241f96dafd5394b1de5c4bdd2eb9d2d4871f68dc66b22b36be31a8d556ef773`.

Manual responsive inspection:
- `c1` authoritative visit-info state checked at `375 / 390 / 430 / 768 / 1024 / 1440`;
- `c4` no-public-address state checked at the same six widths;
- no observed horizontal overflow, clipping or overlap;
- no-address state remains useful without fabricated contact/address data.

## 9. Backend F20 alignment truth

Backend repository:

`sajadkhavas/turnoment-backend`

Backend F20 alignment is terminal **as documentation alignment only**:
- Backend START `b6421e1e76e846c89d799fe4860bc11c8242f2f8`;
- Issue #37 — CLOSED / COMPLETED;
- docs head `1844f02993063a5e4f9547d0f564f2e298cc6552`;
- PR #38 — MERGED with expected-head lock;
- backend merge/main `e8e48061cba201b3a12ac534ef97f22565bea5a3`;
- PR-context Backend Quality Gate `34653701760` — PASS on Python 3.12 / 3.14;
- post-main Backend Quality Gate `34653883656` — PASS on Python 3.12 / 3.14;
- no runtime Python/model/migration/serializer/view/URL/settings/dependency/phase-registry implementation was added.

Runtime remains exactly:

`FRONTEND MOCK / BACKEND PENDING`

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

## 10. F20 remaining acceptance chain

F20 is not terminal yet. Required remaining chain:
1. commit this implementation documentation checkpoint;
2. re-run exact-head Full + focused F20 QA on final reviewed implementation/docs head;
3. final compare and frozen-route protection verification;
4. implementation PR without auto-closing Issue #95;
5. PR-context Full + F20 + all triggered frozen-route regressions PASS;
6. mergeable=true, unresolved review threads=0, exact pre-merge main lock;
7. expected-head implementation merge;
8. post-main Full + F20 QA PASS;
9. documentation-only non-recursive closeout;
10. closeout PR-context gates PASS and expected-head merge;
11. terminal frozen-main Full + F20 + triggered regression QA/artifacts/digests;
12. exact live-main verification;
13. terminal evidence in Issue #95 and close `completed`;
14. only then report `DONE / MERGED / FROZEN — FINAL_CURRENT`.

## 11. Public-route NEXT after terminal F20

After F20 terminal freeze, current-law order remains:

`/ranking` → `/players/$username` → `/host` → `/rules`

unless an explicit product decision changes that order.

Backend NEXT independently remains:

`P02 — Games / Catalog Foundation`
