# F22 — Public Player Profile

Status at closeout creation:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Route: `/players/$username`

Tracking Issue: `#101` — OPEN

START_SHA:

`36e8685192fede45da8c4e82c32bdc41a2db1be2`

Implementation branch:

`phase/f22-public-player-profile`

Source implementation head:

`d8e2cb8448837b3d63cb9727ae44b1a892ab7d64`

Final reviewed implementation head:

`1e234e1c9877cb2c62f1b8e677d64356c5725a58`

Implementation PR:

`#102` — MERGED with expected-head lock.

Implementation merge / accepted main:

`d1b1ff3bd24318e9714a6af7585c5b7299479db5`

Closeout branch:

`closeout/f22-public-player-profile`

This is a non-recursive workstream snapshot. Future closeout head/merge/frozen-main SHA and terminal post-closeout CI/artifact evidence are intentionally not self-recorded here; those facts belong in Issue #101 after they exist.

## 1. Why F22 existed

The START `/players/$username` route did not satisfy current Turnoment public-page law. It read local ranking fixtures directly, derived win rate in the browser, treated profile/ranking/rating truth as local data, lacked a typed repository/runtime boundary, had no deliberate public publication/privacy contract, lacked final canonical/robots behavior, and inherited legacy metadata.

F22 rebuilt the route as a public entity/profile surface with explicit authority and privacy boundaries rather than a larger ranking-card view.

## 2. Permanent architecture

`validated username param → SSR loader → typed PublicPlayerProfileRepository → strict runtime-validated public profile projection → Public Player Profile UI`

Repository contract:

`getByUsername(username): Promise<PublicPlayerProfileLoadResult>`

Load result:
- `{ state: "published", profile }`;
- `{ state: "not_found" }`.

Adapters:
- deterministic fixture repository for dev/test/visual QA;
- Django HTTP repository for production.

Selector behavior:
- explicit `VITE_DATA_ADAPTER=mock` → mock;
- explicit `django` → Django;
- otherwise development → mock;
- otherwise production → Django.

Production never silently falls back to fixture data.

## 3. Target production API / runtime truth

Frontend-reserved target endpoint:

`GET /api/v1/players/{username}/public-profile/`

Production adapter:
- requires `VITE_API_BASE_URL`;
- validates requested username before request;
- GET + `credentials: include` + `Accept: application/json`;
- 404 → one public not-found state;
- other non-2xx → fail closed;
- strict response parse;
- returned username must equal requested public username.

Runtime remains exactly:

`FRONTEND MOCK / BACKEND PENDING`

## 4. Identity law

- `playerId` = stable backend relation identity;
- `username` = stable public profile-navigation identity;
- `gamerTag` = display text only and never a relation key.

The route param is the stable public username identity. Gamer tag may be displayed but must not become the relation key merely because the current P01 backend historically looks players up by gamer tag.

## 5. Publication / privacy law

Only explicitly published public profiles can return a successful projection.

To avoid existence leakage, the public route intentionally does not distinguish nonexistent, private/unpublished, or otherwise non-public identities. Those states collapse to the same public not-found surface.

Public DTO excludes:
- phone/email;
- private/legal/real name unless separately accepted as public in a future contract;
- `interview_opt_in`;
- auth/session/OTP data;
- staff/groups/permissions;
- moderation/verification evidence;
- payment/refund/settlement data;
- secrets/configuration/private account fields.

## 6. Competitive authority / strict v1 projection

Successful profile projection includes `schemaVersion=1`, `publicationState=published`, `searchVisibility=indexable|noindex`, stable player/public identity, optional public avatar/city/bio, bounded `competitiveSnapshots[]`, and bounded `recentResults[]`.

Competitive snapshots carry stable game/season identity, `ratingType=tournament|challenge`, authoritative rating, nullable positive rank, played/wins/losses/draws, and nullable rank movement.

Recent results carry stable result/tournament/game identity, outcome, optional opponent gamer tag and offset-aware completion time.

Backend/repository eventually owns publication/search visibility, rank, rating, record, movement and finalized public-result membership/order. Frontend does not calculate authoritative win rate, rating, rank, movement, result validity or challenge eligibility.

Strict validation rejects unknown fields, duplicate snapshot/result identity, duplicate competitive scope, inconsistent match arithmetic, invalid movement semantics, malformed keys/slugs/usernames/public URLs and invalid datetimes.

## 7. UI / accessibility acceptance

F22 provides:
- identity-first hero with gamer tag / username / optional city/avatar/bio;
- competitive snapshot section;
- authoritative rank/rating/record/movement presentation;
- recent public results;
- links to ranking, games and tournaments discovery;
- neutral optional-data and recent-results empty states;
- pending skeleton;
- retryable error state;
- final public not-found state;
- exactly one page `<main>`.

Movement/status is not represented by color alone. Interactive controls preserve visible focus and touch-safe sizing.

## 8. SEO / final-copy lock

Found profile title pattern:

`{gamerTag} | پروفایل بازیکن Turnoment`

Canonical:

`/players/{username}`

Robots:
- `indexable` → `index,follow`;
- `noindex` → `noindex,follow`;
- public not-found → `noindex,nofollow`.

The route owns its effective head without mutating shared frozen `src/routes/__root.tsx`.

No ProfilePage JSON-LD is emitted merely for schema coverage. No unsupported “best player”, national/official authority, popularity, inferred ranking prestige or achievement claim is authorized.

Intent boundary:
- `/players/$username` = one public player entity/profile;
- `/ranking` = multi-player leaderboard/discovery;
- `/games` / `/games/$slug` = game discovery/detail;
- `/tournaments` = tournament discovery;
- dashboard profile/rating surfaces = private player-owned state.

## 9. Official/current documentation applied

Reviewed/applied during F22:
- TanStack Router data loading / SSR loader behavior;
- TanStack Router document-head management;
- Google Search people-first/indexing/metadata and ProfilePage applicability boundaries;
- WCAG 2.2 focus visibility / target-size expectations;
- Django REST framework Permissions, Generic Views, Serializers, Validators and Exceptions during backend alignment.

Key decisions: SSR owns primary public profile data, production fails closed, publication/privacy is backend-owned, future anonymous public API explicitly uses `AllowAny`, stable username and display gamer tag remain distinct, and no schema type is added solely for SEO coverage.

## 10. Implementation diff evidence

Source implementation commit:

`d8e2cb8448837b3d63cb9727ae44b1a892ab7d64`

Final reviewed implementation head after governance checkpoint:

`1e234e1c9877cb2c62f1b8e677d64356c5725a58`

START → reviewed head:
- ahead `2` / behind `0`;
- `2` commits;
- `12` changed files;
- no `bun.lock` mutation;
- no dependency/version drift;
- package delta only adds F22 contract testing;
- frozen F16/F17/F18/F19/F20/F21/F02 route source untouched.

Source implementation surface remained the 9-file F22 source package; the second commit added only governance Markdown.

## 11. Exact QA before implementation PR

Exact source `d8e2...`:
- Full `34688426255` PASS — artifact `10296039809` — digest `sha256:157f687c8063ebf2726296e6aeb0885e3f6ec131a1ce7a6771ddc603439029f3`;
- F22 `34688426242` PASS — artifact `10296158247` — digest `sha256:c435b839332d124788a404f0bf71273f6fdff7f61ee69581df9011d4b6af2be5`.

Final reviewed head `1e234e1...`:
- Full `34689322978` PASS — artifact `10297071463` — digest `sha256:105d1dabb65b9ebf73b1efd03a573bfbd17e31959a00b2c03a88be59b01b831b`;
- F22 `34689323008` PASS — artifact `10296652097` — digest `sha256:f4dad751ad6f231d0307b34ee065ccb303a806c4af429122a47d42e6190e1d46`.

Manual responsive inspection covered indexable/noindex profile states at 375/390/430/768/1024/1440 without observed horizontal overflow, clipping or overlap.

## 12. Implementation PR #102 acceptance

Before merge:
- `mergeable=true`;
- unresolved review threads `0`;
- exact live `main` remained START_SHA;
- expected head `1e234e1c9877cb2c62f1b8e677d64356c5725a58` used.

PR-context gates — all PASS:
- Full `34689564225` — artifact `10296866945` — digest `sha256:b68d26de41197e7532ea2d1a59be3743797e0887888d93c7c22b43e1b7e18b5f`;
- F22 `34689564335` — artifact `10297046557` — digest `sha256:1d3bb290a5fc798905a2f42f34aebf4e37782d93fc1c18d356709ae5eb75ec7e`;
- F21 `34689564304` — artifact `10297266039` — digest `sha256:cd5eeb5b6a08bc32011a68a1b2b9e66e9ebe1f8814ed97f97f648f624f12d6f6`;
- F20 `34689564262` — artifact `10296257681` — digest `sha256:686ac9397ecf0d2c802ceec530ec9d3d83139e1db96aff18fe5362ebe7632661`;
- F19 `34689564295` — artifact `10296807097` — digest `sha256:d9373e5a0cd79ec232d4273d514482fd1880f34f92e86a15b2d786c298a3578e`;
- F18 `34689564267` — artifact `10296452384` — digest `sha256:f63dd625784117e5d98eaaf124c4074f17563e040230ff4c9cbdb0c4d94b6a7e`;
- F17 `34689564297` — artifact `10296646522` — digest `sha256:5edccb80166527973db55c079260c6025f33f04ae3da284404b750b574313371`;
- F16 `34689564243` — artifact `10296966747` — digest `sha256:9f85ae977cd0571e3f29207b92bee861a7e4f3eab2b01f2949aa16bdac3c2589`.

Implementation PR #102 merged to:

`d1b1ff3bd24318e9714a6af7585c5b7299479db5`

## 13. Post-main implementation QA

On exact implementation main `d1b1ff3bd24318e9714a6af7585c5b7299479db5`:
- Full `34696582708` PASS — artifact `10298279733` — digest `sha256:6f20fcbc83b3a55b4420e4a86b6e5539be645df57ec767f679ec53af9aa0b475`;
- F22 `34696582677` PASS — artifact `10299246223` — digest `sha256:c4628d6350affda50284c07a5a02ed66b9033a7b62a39ffebb2cccf908777320`;
- F21 `34696582664` PASS — artifact `10299570131` — digest `sha256:1193aba9e605029f7d296bd9819192b96144117a829296d5acf4272ef4e7581a`;
- F20 `34696582676` PASS — artifact `10298309370` — digest `sha256:b3cb6ae34c1a01f5697a1e1f1fc157cb7c7584f756449f1ee57ad543bd5d0541`;
- F19 `34696582758` PASS — artifact `10298812119` — digest `sha256:1b1fbd512ae7dce313ced3cabd81c69a95cdaf7859d190540775608358899677`;
- F18 `34696582743` PASS — artifact `10298324552` — digest `sha256:8fa737d685aadedd33e77041e6aa0373a7497be95642235cdf8a603dfb23d67c`;
- F17 `34696582642` PASS — artifact `10298099830` — digest `sha256:f18d15feb42d150000882f8a5ea6498846e21b14ba954d2e631b2c41c18dca24`;
- F16 `34696582648` PASS — artifact `10299291014` — digest `sha256:181a47040bc99cdcb4bb1bb29d15978dcc234ed2ce477b560400ff16c8191340`.

Exact live main was reverified at the implementation merge after this QA. Issue #101 comment `5646216302` records the implementation checkpoint.

## 14. Backend documentation alignment

Backend F22 alignment is terminal documentation-only work:
- Backend START `44f18e462f63c625bc02e07ef93c15f1c385dcd0`;
- Issue #41 CLOSED / COMPLETED;
- docs head `be805235925af8b70a6e8d183e5f8f363dd7c9cb`;
- PR #42 MERGED;
- exact-head `34688994229`, PR-context `34689064802`, post-main `34689119713` PASS on Python 3.12 / 3.14;
- backend merge/main `215fae68d8003b8df6c034b228d1121d96b0be18`;
- no F22 backend runtime phase implementation/reorder occurred.

Existing P01 runtime remains `GET /api/v1/players/<gamer_tag>/`. The F22 target username endpoint remains planned pending stable username/compatibility and competitive-domain runtime work.

Backend NEXT remains `P02 — Games / Catalog Foundation`.

## 15. Route-level acceptance

Because implementation is merged and every required post-main implementation gate is green, `/players/$username` is promoted non-recursively to:

`FINAL_CURRENT`

This does not mean F22 is terminally frozen. Terminal status still requires closeout merge and terminal frozen-main evidence in Issue #101.

## 16. Closeout scope / remaining terminal chain

F22 closeout is exactly one commit changing exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F22_PUBLIC_PLAYER_PROFILE.md`;
4. `docs/workstreams/F22_CLOSEOUT.md`.

No source/package/lockfile/workflow/dependency/runtime mutation is authorized.

Remaining terminal gates:
1. closeout compare = ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR without auto-closing Issue #101;
3. PR-context Full + F22 + F21/F20/F19/F18/F17/F16 PASS;
4. mergeable=true, review threads=0 and exact implementation-main lock;
5. expected-head closeout merge;
6. terminal frozen-main Full + F22 + regressions PASS with artifacts/digests;
7. exact live-main verification;
8. terminal evidence in Issue #101 and close `completed`;
9. only then report `DONE / MERGED / FROZEN — FINAL_CURRENT`.

## 17. Protected NEXT

After terminal F22:

`/host` → `/rules`.
