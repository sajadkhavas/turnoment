# F20 — Public Gaming Center Detail

Status at closeout creation:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Route: `/centers/$id`

Tracking Issue: `#95`

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

Target route status:

`FINAL_CURRENT`

This is a non-recursive workstream record. Future closeout merge/frozen-main SHA and terminal post-closeout CI/artifacts belong in Issue #95 after they exist.

## 1. Why F20 existed

The START route used local fixture lookup, center-name tournament joins, unsupported rating/review truth, legacy metadata and lacked a typed production repository, public visit-information policy, stable canonical identifier decision, fail-closed production behavior and current-law SEO evidence.

F20 rebuilt the route architecture rather than cosmetically patching it.

## 2. Official-source decisions

Applied current guidance from TanStack Router data loading/path params/pending/error/document-head management, TanStack Start SSR, Google canonical/title/snippet/people-first and LocalBusiness structured-data guidance, and WCAG 2.2 focus/target-size requirements.

Decisions:
- `ssr: true` primary detail load;
- validated route identity;
- route-owned head/canonical/robots/structured data;
- published detail indexable, not-found/non-public noindex;
- LocalBusiness only with authoritative complete public address matching visible page data;
- no fabricated rating/review/superlative facts;
- keyboard-visible focus and touch-safe controls.

## 3. Permanent architecture

`route publicId param → SSR loader → typed GamingCenterDetailRepository → strict runtime-validated detail projection → Gaming Center Detail UI`

Repository interface:

`getByPublicId(publicId): Promise<GamingCenterDetailData | null>`

Adapters:
- deterministic mock for dev/test/visual QA;
- Django HTTP repository for production.

Production selector never silently falls back to fixtures.

## 4. Canonical identity / API contract

Canonical v1 public route key: `publicId`.

Canonical URL: `/centers/{publicId}`.

`centerId` remains backend relation/entity identity. Display names are never keys. Future human-readable slug migration requires explicit alias/redirect compatibility work.

Planned production endpoint:

`GET /api/v1/centers/{publicId}/`

Production behavior:
- requires `VITE_API_BASE_URL`;
- GET + credentials include + JSON accept;
- 404 → not-found;
- non-404 HTTP failure → error/fail-closed;
- strict Zod parse;
- returned `publicId` must match request;
- no fixture substitution.

Runtime remains:

`FRONTEND MOCK / BACKEND PENDING`

## 5. Public detail / privacy / LocalBusiness truth

Strict projection owns published center identity, verification, locality, summary/description, facilities, media, nullable authoritative upcoming-tournament count, optional explicitly public visit data and bounded public tournament cards keyed by stable tournament IDs/slugs.

Public address, phone, opening hours and map URL are shown only when authoritative/public. Private operator/account contact, verification evidence, permissions, moderation, payment/settlement or secret data is forbidden.

Ratings/reviews are absent from v1 until an authoritative ratings domain exists.

`LocalBusiness` JSON-LD is emitted only when a complete `publicAddress` exists. Optional phone/hours may appear only when public-authorized. No aggregateRating/review markup is authorized.

## 6. SEO/final-copy lock

H1 = authoritative center name.

Title:

`{name} | گیم‌نت و مرکز گیمینگ در {city} | Turnoment`

Description:

`{name} در {city}، {district}؛ امکانات مرکز، وضعیت تأیید و مسابقات حضوری پیش‌رو را در Turnoment ببین.`

Published detail:
- canonical `/centers/{publicId}`;
- robots `index,follow`;
- OpenGraph `website`.

Not-found/non-public:
- final Persian state;
- `noindex,nofollow`.

No unsupported best/largest/number-one/popularity/rating/review claim is accepted.

## 7. Implementation diff / exact-head evidence

Final implementation compare from START:
- ahead `2`, behind `0`;
- `12` changed files;
- no `bun.lock` mutation;
- no dependency/version drift;
- package delta only adds F20 contract spec;
- frozen F19/F18/F17/F16/F02 route source untouched.

Exact final reviewed head:

`358e269b1d6bdf98d3b0ff9303cbad82add05cd2`

Exact-head gates:
- Full `34654126483` PASS — artifact `10284643318` — digest `sha256:59d11a61f3b0ef0a65f330cf8cca16b0ad74caaf6a21f7c1700707cdd4b03277`;
- F20 `34654126479` PASS — artifact `10285182279` — digest `sha256:7b79201ff34cf0114ef8b18514fc971508de9f802d74e512e415ab1120fed228`;
- c1 + c4 manually inspected at 375/390/430/768/1024/1440 without observed overflow/clipping/overlap.

## 8. PR-context evidence

PR #96 pre-merge:
- mergeable `true`;
- unresolved review threads `0`;
- exact pre-merge main stayed START_SHA;
- expected head `358e269b1d6bdf98d3b0ff9303cbad82add05cd2` used.

PR-context gates:
- Full `34654555350` PASS — artifact `10284364443` — digest `sha256:f10b01879b3d187c133a6d733f8d98342579a474855b89f72f7f0ed4386fe78f`;
- F20 `34654555391` PASS — artifact `10284289406` — digest `sha256:b6aaa4a36c51eacba25702ad0fa72612664548509b369ae7d65de4550242965e`;
- F19 `34654555399` PASS — artifact `10285073293` — digest `sha256:5fb05e4c9169e00e87bccc3f62254871d1c716564c48275cf130efbe6df3f99c`;
- F18 `34654555470` PASS — artifact `10284718691` — digest `sha256:7ba8239687005c87fc1ced1579fb15f411f29549d2fefd26814c21aab226f765`;
- F17 `34654555326` PASS — artifact `10284344126` — digest `sha256:f9dbeb5f70c0f448b932330dc05ef73b9fd3fc7ba9c6aa5275e45b63b4bf4bc2`;
- F16 `34654555331` PASS — artifact `10284848340` — digest `sha256:a949c9ca6481f40ea0974bb93a2e71dd9fc09030ea0792c48ade1f262b4ff550`.

## 9. Post-main implementation evidence

Implementation merge/main:

`12cf7013377792f3324a8ac26db66b1a45694aca`

Post-main gates on exact merge SHA:
- Full `34655166555` PASS — artifact `10284784860` — digest `sha256:a2cc479e3e56c5b1745fc29ea813f940e618ab0b713e1387b713a59c29a8f430`;
- F20 `34655166499` PASS — artifact `10284324968` — digest `sha256:6315b0fee250836ee64445fb293f4d785f75ad52d81d1062c0709175893e3a93`;
- F19 `34655166483` PASS — artifact `10285009224` — digest `sha256:5fd07d07b902f8bb271d39c698c258545f63062c3349559c6e1a3e00c0e72dda`;
- F18 `34655166552` PASS — artifact `10284309844` — digest `sha256:2494c6c8f731e0a9079970aedb263b0dbdeed487993d1c49d281c56b410841d9`;
- F17 `34655166537` PASS — artifact `10284879617` — digest `sha256:e48eccc82da8db4320a7c90589327e96411401455f298fc60754f319f77ed762`;
- F16 `34655166488` PASS — artifact `10284779627` — digest `sha256:3e9179a6c837bfdd9caa3679fbdf290c22b0bde3f202e840aed57cad9e9e47c3`.

Because implementation merge + required post-main gates are green, the route is eligible for non-recursive `FINAL_CURRENT` promotion.

## 10. Backend alignment

Backend F20 documentation alignment is terminal:
- Issue #37 CLOSED / COMPLETED;
- PR #38 MERGED;
- backend main `e8e48061cba201b3a12ac534ef97f22565bea5a3`;
- PR gate `34653701760` PASS on Python 3.12/3.14;
- post-main gate `34653883656` PASS on Python 3.12/3.14;
- no gaming-center runtime code or phase reorder.

Backend NEXT remains `P02 — Games / Catalog Foundation`.

## 11. Closeout scope

Exactly four Markdown files only:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F20_PUBLIC_GAMING_CENTER_DETAIL.md`;
4. `docs/workstreams/F20_CLOSEOUT.md`.

No source/package/lockfile/workflow/runtime/dependency mutation is authorized.

## 12. Remaining terminal gates

After this closeout commit:
1. compare must be ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR without auto-closing Issue #95;
3. PR-context Full + F20 + triggered frozen regressions PASS;
4. mergeable=true, review threads=0, exact main lock at `12cf7013377792f3324a8ac26db66b1a45694aca`;
5. expected-head closeout merge;
6. terminal frozen-main Full + F20 + triggered regressions PASS with artifact/digest evidence;
7. exact live-main reverify;
8. terminal evidence comment in Issue #95 and close `completed`;
9. only then claim `DONE / MERGED / FROZEN — FINAL_CURRENT`.

## 13. NEXT

After terminal F20 freeze:

`/ranking` → `/players/$username` → `/host` → `/rules`.
