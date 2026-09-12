# F22 — Public Player Profile

Status at governance checkpoint:

`IMPLEMENTATION ACTIVE / EXACT REVIEWED-HEAD QA PENDING`

Route: `/players/$username`

Tracking Issue: `#101` — OPEN

START_SHA:

`36e8685192fede45da8c4e82c32bdc41a2db1be2`

Implementation branch:

`phase/f22-public-player-profile`

Source implementation head before governance checkpoint:

`d8e2cb8448837b3d63cb9727ae44b1a892ab7d64`

This is a non-recursive workstream snapshot. The governance commit SHA, future PR merge SHA, closeout merge SHA and terminal frozen-main CI/artifact evidence must be recorded only after they exist, primarily in Issue #101 and later closeout documentation where permitted.

## 1. Why F22 existed

The START `/players/$username` route did not satisfy current Turnoment public-page law. It read local ranking fixtures directly, derived win rate in the browser, treated ranking/profile/rating truth as local data, lacked a typed repository/runtime boundary, had no deliberate public publication/privacy contract, lacked final canonical/robots behavior, and inherited legacy metadata.

F22 rebuilds the route as a public entity/profile surface with explicit authority and privacy boundaries rather than a larger ranking-card view.

## 2. Permanent architecture

`validated username param → SSR loader → typed PublicPlayerProfileRepository → strict runtime-validated public profile projection → Public Player Profile UI`

Repository contract:

`getByUsername(username): Promise<PublicPlayerProfileLoadResult>`

Load result is intentionally narrow:
- `{ state: "published", profile }`;
- `{ state: "not_found" }`.

Adapters:
- deterministic fixture repository for dev/test/visual QA;
- Django HTTP repository for production.

Production selector:
- explicit `VITE_DATA_ADAPTER=mock` → mock;
- explicit `django` → Django;
- otherwise development → mock;
- otherwise production → Django.

Production never silently falls back to fixtures.

## 3. Target production API

Frontend-reserved target endpoint:

`GET /api/v1/players/{username}/public-profile/`

Production adapter:
- requires `VITE_API_BASE_URL`;
- validates requested username before request;
- uses GET, `credentials: include`, `Accept: application/json`;
- 404 → public not-found;
- other non-2xx → fail closed;
- strictly parses the response;
- rejects returned username identity drift.

Runtime remains:

`FRONTEND MOCK / BACKEND PENDING`

## 4. Identity law

F22 target meanings:
- `playerId` = stable backend relation identity;
- `username` = stable public profile-navigation identity;
- `gamerTag` = display text only and never a relation key.

Frontend route param uses the stable public username identity. Gamer tag may be displayed but must not become the relation key merely because the current P01 backend historically looks players up by gamer tag.

## 5. Publication / privacy law

Only explicitly published public profiles can return a successful projection.

To avoid existence leakage, the public route intentionally cannot distinguish:
- nonexistent player;
- private/unpublished player;
- account/profile ineligible for public projection.

Those states collapse to the same public not-found surface.

Public DTO excludes:
- phone/email;
- private/legal/real name unless separately accepted as public in a future contract;
- `interview_opt_in`;
- auth/session/OTP data;
- staff/groups/permissions;
- moderation/verification evidence;
- payment/refund/settlement data;
- secrets/configuration/private account fields.

## 6. Strict v1 profile projection

Profile:
- `schemaVersion=1`;
- `publicationState=published`;
- `searchVisibility=indexable|noindex`;
- `playerId`;
- `username`;
- `gamerTag`;
- nullable public `avatarUrl`;
- nullable stable city `{cityId, slug, name}`;
- nullable `publicBio`;
- bounded `competitiveSnapshots[]`;
- bounded `recentResults[]`.

Competitive snapshot:
- `snapshotId`;
- stable game and season identities;
- `ratingType=tournament|challenge`;
- authoritative rating;
- nullable positive rank;
- played/wins/losses/draws;
- nullable rank movement.

Recent result:
- `resultId`;
- stable tournament identity;
- stable game identity;
- outcome win/loss/draw;
- nullable opponent gamer tag;
- offset-aware `completedAt`.

## 7. Integrity rules

Strict runtime validation rejects:
- unknown profile/projection fields;
- duplicate snapshot IDs;
- duplicate `(gameId, seasonId, ratingType)` scopes;
- duplicate recent result IDs;
- record arithmetic where wins + losses + draws != played;
- flat movement with nonzero positions;
- up/down movement with zero positions;
- malformed stable keys/slugs/usernames/public asset URLs/datetimes.

Frontend does not calculate authoritative win rate, rank, rating, movement, result validity or eligibility.

## 8. UI acceptance surface

F22 provides:
- identity-first hero with gamer tag / username / optional city/avatar/bio;
- public indexing-visibility-safe profile rendering;
- competitive snapshot section with game/season/rating-type identity;
- authoritative rank/rating/record/movement presentation;
- recent public results;
- links back to `/ranking`, relevant `/games/$slug`, and `/tournaments` discovery;
- neutral empty states when optional public data or recent results are absent;
- pending skeleton;
- retryable error state;
- final public not-found state;
- exactly one page `<main>`.

Movement/status communication is not color-only. Interactive controls preserve visible focus and touch-safe sizing.

## 9. SEO / indexing acceptance

Found profile title pattern:

`{gamerTag} | پروفایل بازیکن Turnoment`

Canonical:

`/players/{username}`

Robots:
- backend projection `indexable` → `index,follow`;
- backend projection `noindex` → `noindex,follow`;
- public not-found → `noindex,nofollow`.

F22 effective route head overrides legacy shared root metadata for the player profile route without mutating the shared `__root.tsx` frozen surface.

No ProfilePage JSON-LD is emitted merely for schema coverage. The accepted page is a competitive/statistical profile and no current requirement justified a creator/person structured-data claim.

No unsupported “best player”, national/official authority, popularity, inferred ranking prestige or achievement claims are authorized.

## 10. Search-intent boundary

- `/players/$username` = one public player entity/profile and its authoritative competitive projection;
- `/ranking` = multi-player leaderboard/discovery;
- `/games` / `/games/$slug` = game discovery/detail;
- `/tournaments` = tournament discovery;
- dashboard profile/rating surfaces = private player-owned account state.

F22 does not duplicate leaderboard discovery or private profile editing.

## 11. Official/current documentation applied

Reviewed before and during F22 implementation:
- TanStack Router data loading / SSR for route-param loader ownership;
- TanStack Router document-head management for title/meta/canonical/robots;
- Google Search guidance around people-first content, indexing metadata and applicability limits of ProfilePage structured data;
- WCAG 2.2 focus visibility / target-size expectations;
- current Django REST framework Permissions, Generic Views, Serializers, Validators and Exceptions guidance during backend contract alignment.

Applied decisions:
- primary public profile data loads through SSR/repository boundary;
- production fails closed;
- public publication/privacy is backend-owned;
- `AllowAny` is explicit on the future public backend endpoint;
- stable username and display gamer tag remain different concepts;
- not-found/publication behavior is deliberately non-enumerating;
- no structured-data type is added solely to make the page appear more “SEO complete.”

## 12. Source implementation diff

Source head:

`d8e2cb8448837b3d63cb9727ae44b1a892ab7d64`

START → source head:
- ahead `1` / behind `0`;
- exactly one source commit;
- exactly `9` changed files;
- no `bun.lock` mutation;
- no dependency/version drift;
- package change only appends F22 contract testing;
- frozen F16/F17/F18/F19/F20/F21/F02 route source is untouched.

Changed implementation surface:
- `.github/workflows/f22-public-player-profile-quality.yml`;
- `package.json` test wiring;
- `src/components/players/public-player-profile-page.tsx`;
- `src/lib/public-player-profile-contract.spec.ts`;
- `src/lib/public-player-profile-contract.ts`;
- `src/lib/public-player-profile-fixture.ts`;
- `src/lib/public-player-profile-http-repository.ts`;
- `src/lib/public-player-profile-repository.ts`;
- `src/routes/players.$username.tsx`.

## 13. Exact-source QA

On `d8e2cb8448837b3d63cb9727ae44b1a892ab7d64`:
- Full Frontend Quality Gate `34688426255` — PASS — artifact `10296039809` — digest `sha256:157f687c8063ebf2726296e6aeb0885e3f6ec131a1ce7a6771ddc603439029f3`;
- F22 Public Player Profile `34688426242` — PASS — artifact `10296158247` — digest `sha256:c435b839332d124788a404f0bf71273f6fdff7f61ee69581df9011d4b6af2be5`.

Manual responsive inspection covered indexable and noindex profile states at 375/390/430/768/1024/1440; no observed horizontal overflow, clipping or overlap.

## 14. QA false-positive investigation record

Before the final source head, focused QA correctly exposed an important shared legacy condition: `src/routes/__root.tsx` still contains old fallback metadata. F22 did not mutate that shared/frozen surface.

The final F22 route instead owns its effective head completely. QA distinguishes:
- F22 source-boundary guards for forbidden private field names;
- effective route `<head>` checks for legacy-brand leakage;
- literal private-value leakage checks in rendered output.

This preserves a strong privacy/SEO gate without treating framework dev serialization from unrelated routes as F22-owned user-visible copy.

## 15. Backend documentation alignment

Backend alignment is terminal documentation-only work:
- Backend START `44f18e462f63c625bc02e07ef93c15f1c385dcd0`;
- Issue #41 CLOSED / COMPLETED;
- docs head `be805235925af8b70a6e8d183e5f8f363dd7c9cb`;
- PR #42 MERGED;
- exact-head gate `34688994229` PASS Python 3.12 / 3.14;
- PR-context gate `34689064802` PASS Python 3.12 / 3.14;
- backend merge/main `215fae68d8003b8df6c034b228d1121d96b0be18`;
- post-main gate `34689119713` PASS Python 3.12 / 3.14.

Current P01 runtime remains:

`GET /api/v1/players/<gamer_tag>/`

It is an existing gamer-tag-based identity/profile endpoint, not the F22 target competitive public-profile contract. No runtime file was changed. Future owning runtime work must add stable username semantics and explicit compatibility/migration behavior before F22 production integration.

Backend NEXT remains exactly `P02 — Games / Catalog Foundation`.

## 16. Remaining implementation chain

1. commit this governance checkpoint without source/runtime mutation;
2. verify START→reviewed head remains clean and only adds the governance Markdown surface;
3. run Full + F22 exact-head QA on the reviewed head;
4. reverify exact live frontend main still equals F22 START;
5. open implementation PR without auto-closing Issue #101;
6. require all triggered Full/F22/frozen-regression PR-context gates PASS with artifacts/digests;
7. require mergeable=true and unresolved review threads=0;
8. expected-head implementation merge;
9. require exact post-main Full/F22/triggered frozen regressions PASS and reverify main;
10. record implementation evidence in Issue #101;
11. perform the separate documentation-only closeout under the four-Markdown/one-commit rule;
12. only after terminal frozen-main evidence may F22 become `DONE / MERGED / FROZEN — FINAL_CURRENT`.

## 17. Protected NEXT

After terminal F22:

`/host` → `/rules`.
