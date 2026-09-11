# F20 — Public Gaming Center Detail

Status: `IN PROGRESS — IMPLEMENTATION QA ACCEPTED / PR PENDING`

Route: `/centers/$id`

Tracking Issue: `#95`

START_SHA:

`a473613191fd5132664c5234b692befda4a5cf41`

Implementation branch:

`phase/f20-public-gaming-center-detail`

Implementation source head before documentation checkpoint:

`a424b8ef1ea9cef4173ce5caa86106371281e1e4`

## 1. Why F20 exists

The START route was not acceptable under current Turnoment public-page law. It:
- read `getCenter` / `tournamentsOfCenter` directly from local fixture data;
- joined tournaments by center display name;
- exposed local rating/review values as if authoritative;
- had no typed detail repository or strict production network boundary;
- had no final public contact/address/opening-hours publication policy;
- used legacy `ایران مهر افزار` metadata;
- used `og:type=article` for a local entity detail;
- had no canonical link, explicit SSR policy, final pending/error state or current-law SEO evidence;
- had not frozen a stable public canonical identifier decision.

F20 is therefore a recertification/rebuild of the route architecture, not a cosmetic patch.

## 2. Root-law preflight

Read from exact START before mutation:
- `PROJECT_CONTINUITY.md`;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `SEO_FINAL_COPY_PROTOCOL.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- current `src/routes/centers.$id.tsx`;
- accepted F19 discovery contract/frontend implementation;
- accepted F19 backend contract alignment;
- accepted F02 public detail pattern for loader/head/not-found discipline.

Live `main` was verified exact START before Issue/branch creation.

## 3. Research / intent audit

Primary user:
- a player evaluating one specific gaming center/game net for in-person play or tournaments.

Primary intent:
- local/entity discovery;
- navigational detail;
- facilities/visit information;
- upcoming competitive events.

Relevant query/topic cluster:
- `{center name}`;
- `{center name} گیم نت`;
- `گیم نت {city/district}` when supported by authoritative locality;
- center facilities/equipment;
- center tournaments;
- center address/hours/contact when public-authorized.

Observed local-directory/venue patterns emphasize locality, address/contact/hours, facilities and events. F20 uses those needs without copying competitor assets/copy or inventing business facts.

Cannibalization boundary:
- `/centers` = multi-center discovery;
- `/centers/$id` = one authoritative local entity;
- `/tournaments` = tournament inventory;
- `/games` = game catalog;
- `/host` = owner acquisition/onboarding.

## 4. Official-document decisions

Reviewed before implementation:
- TanStack Router data-loading/path-param/pending/error lifecycle;
- TanStack Router document head management;
- Google LocalBusiness structured-data guidance;
- Google canonical/title/snippet/people-first requirements inherited from root protocol;
- WCAG 2.2 focus/target-size baseline.

Applied decisions:
- `ssr: true` for primary detail data;
- route parameter validated before repository use;
- route `head` owns title/meta/canonical/structured-data scripts;
- published detail is indexable;
- not-found/non-public state is not indexable;
- LocalBusiness only when authoritative complete public address exists;
- visible address/contact/hours must match structured public facts;
- visible focus + touch-safe controls preserved.

## 5. Canonical identity decision

F20 v1 canonical public identifier:

`publicId`

Canonical shape:

`/centers/{publicId}`

`centerId` remains backend relation/entity identity.

The decision intentionally preserves compatibility with frozen F19 listing links. Display names are never relation keys. A future human-readable slug migration must define alias/redirect compatibility explicitly instead of silently changing frozen routing.

## 6. Permanent architecture

Accepted target:

`route publicId param → SSR loader → typed GamingCenterDetailRepository → strict runtime-validated detail projection → Gaming Center Detail UI`

Repository interface:

`getByPublicId(publicId): Promise<GamingCenterDetailData | null>`

Adapters:
- deterministic mock repository for dev/test/visual QA;
- Django HTTP repository for production.

Production selector behavior:
- explicit `VITE_DATA_ADAPTER=mock` → mock;
- explicit `django` → Django;
- otherwise dev → mock;
- otherwise production → Django.

No silent production fallback exists.

## 7. Planned production API

`GET /api/v1/centers/{publicId}/`

Production adapter:
- requires `VITE_API_BASE_URL`;
- GET + `credentials: include` + JSON Accept;
- validated `publicId` encoded into path;
- 404 → public not-found;
- non-404 HTTP failure → error state;
- strict Zod parse;
- response `publicId` must equal requested identity;
- no fixture substitution.

Current runtime:

`FRONTEND MOCK / BACKEND PENDING`

## 8. Detail contract

Strict v1 projection includes:
- `schemaVersion = 1`;
- `centerId`;
- `publicId`;
- `publicationState = published`;
- `name`;
- `verified`;
- stable city identity/slug/name;
- `district`;
- `summary`;
- `description`;
- unique `equipmentLabels[]`;
- nullable `coverImage`;
- unique bounded `galleryImages[]`;
- nullable non-negative `upcomingTournamentCount`;
- nullable public address;
- nullable public phone;
- public opening-hours rules;
- nullable public map URL;
- bounded public tournament projection by stable tournament ID + canonical slug + stable game identity.

Integrity checks include:
- strict unknown-field rejection;
- unique equipment/gallery/tournament IDs/slugs;
- unique weekdays across opening-hours rules;
- authoritative zero count cannot coexist with projected tournaments;
- non-null count cannot be smaller than returned tournament projection;
- private/unknown verification/tournament fields rejected.

## 9. Privacy / visit information

Allowed only when explicitly public in authoritative domain projection:
- physical address;
- business/public phone;
- opening hours;
- map URL.

Missing visit data is valid. UI presents a neutral useful state and never fills gaps from local fixture assumptions.

Forbidden public truth includes private operator/account contact, verification documents, permission/group internals, moderation evidence and financial/secret data.

## 10. Ratings/reviews

F20 v1 has no rating/review fields or markup.

Reason: no accepted authoritative backend ratings domain currently defines aggregation, abuse handling and publication semantics.

The legacy route's local rating/review values were removed from the accepted detail contract/UI.

## 11. LocalBusiness decision

`buildGamingCenterLocalBusinessJsonLd(center)` returns null unless complete `publicAddress` exists.

When eligible it may map:
- `name`;
- `PostalAddress` fields;
- optional public `telephone`;
- optional public opening-hours specifications;
- optional HTTP(S) cover image.

It does not emit rating/review data.

F20 focused SSR evidence locks both paths:
- `c1` with public address → LocalBusiness exists;
- `c4` without public address → LocalBusiness absent.

## 12. UI / states

Final F20 UI provides:
- responsive center hero/identity;
- verification badge/state;
- city/district + final summary;
- natural links to city tournaments and city center directory;
- About section;
- facilities section;
- conditional visit-info section;
- public address/map/phone/hours only when available;
- authoritative projected tournaments with stable tournament/game links;
- related navigation to centers/tournaments/games;
- pending skeleton;
- retryable error state;
- final not-found state.

No implementation-stage language is visible in accepted copy.

## 13. SEO/final-copy lock

H1:
- authoritative center name.

Title format:

`{name} | گیم‌نت و مرکز گیمینگ در {city} | Turnoment`

Description format:

`{name} در {city}، {district}؛ امکانات مرکز، وضعیت تأیید و مسابقات حضوری پیش‌رو را در Turnoment ببین.`

Found route:
- canonical `/centers/{publicId}`;
- robots `index,follow`;
- OpenGraph `website`;
- cover image only when available.

Not-found route:
- final Persian user-facing state;
- `noindex,nofollow` metadata path.

No unsupported “best/largest/number one”, popularity, rating or review claim is authorized.

## 14. Source implementation scope

Implementation commit:

`a424b8ef1ea9cef4173ce5caa86106371281e1e4`

Changed source/package/workflow surface before docs:
1. `.github/workflows/f20-public-gaming-center-detail-quality.yml`
2. `package.json`
3. `src/components/centers/gaming-center-detail-page.tsx`
4. `src/lib/gaming-center-detail-contract.spec.ts`
5. `src/lib/gaming-center-detail-contract.ts`
6. `src/lib/gaming-center-detail-fixture.ts`
7. `src/lib/gaming-center-detail-http-repository.ts`
8. `src/lib/gaming-center-detail-repository.ts`
9. `src/routes/centers.$id.tsx`

Compare:
- ahead 1;
- behind 0;
- exactly one commit;
- exactly nine files;
- `bun.lock` untouched;
- no dependency/version delta;
- package change only appends F20 contract spec;
- frozen route source outside F20 untouched.

## 15. Exact-head QA

On exact source head `a424b8ef1ea9cef4173ce5caa86106371281e1e4`:

Frontend Quality Gate:
- run `34653443343` — PASS;
- artifact `10284697461`;
- digest `sha256:d241f96dafd5394b1de5c4bdd2eb9d2d4871f68dc66b22b36be31a8d556ef773`;
- lint/build/typecheck/full contracts/browser smoke/responsive screenshots PASS.

F20 focused gate:
- run `34653443430` — PASS;
- artifact `10284771804`;
- digest `sha256:1ce354668583c5b9fba17811640eb5d5990e9a42ded90f93c0799b911bdc6661`;
- contract/build/typecheck/SSR/SEO/LocalBusiness/responsive evidence PASS.

Manual visual review:
- `c1` with full visit information checked at 375/390/430/768/1024/1440;
- `c4` without address/contact checked at the same widths;
- no observed horizontal overflow, clipping or overlap.

## 16. Backend alignment

Backend repository: `sajadkhavas/turnoment-backend`.

F20 backend alignment terminal as documentation-only work:
- START `b6421e1e76e846c89d799fe4860bc11c8242f2f8`;
- Issue #37 CLOSED / COMPLETED;
- docs head `1844f02993063a5e4f9547d0f564f2e298cc6552`;
- PR #38 MERGED;
- merge/main `e8e48061cba201b3a12ac534ef97f22565bea5a3`;
- PR-context gate `34653701760` PASS Python 3.12/3.14;
- post-main gate `34653883656` PASS Python 3.12/3.14;
- no runtime implementation or phase reorder.

Backend NEXT remains `P02 — Games / Catalog Foundation`.

## 17. Remaining acceptance chain

Before implementation PR:
- commit this governance/workstream checkpoint;
- require Full + F20 exact-head QA again on the final reviewed branch head;
- verify cumulative compare and protected frozen routes.

Then:
1. implementation PR without auto-closing Issue #95;
2. PR-context Full + F20 + triggered F19/F18/F17/F16 regressions PASS;
3. mergeable=true, unresolved review threads=0, exact `main` START lock;
4. expected-head merge;
5. post-main Full + F20 QA PASS;
6. non-recursive documentation-only closeout;
7. closeout PR-context required gates PASS;
8. expected-head closeout merge;
9. terminal frozen-main Full + F20 + triggered regressions PASS with artifact/digest evidence;
10. exact live-main reverify;
11. terminal evidence in Issue #95;
12. close Issue #95 `completed`;
13. only then claim `DONE / MERGED / FROZEN — FINAL_CURRENT`.

## 18. Protected NEXT boundary

After terminal F20 freeze, next public current-law recertification is:

`/ranking`

Then:

`/players/$username` → `/host` → `/rules`.
