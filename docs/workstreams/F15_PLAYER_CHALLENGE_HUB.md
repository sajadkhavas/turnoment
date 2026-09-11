# F15 — Player Challenge Hub

Status: `MERGED / CLOSEOUT IN PROGRESS`

Route: `/dashboard/challenges`

Tracking Issue: `#77`

START_SHA: `398e963f1ecdbe86013ce3b0052c4e1891f48854`

Implementation branch: `phase/f15-player-challenge-hub`

Closeout branch: `closeout/f15-player-challenge-hub`

Target: `FINAL_PRIVATE`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 1. Accepted implementation evidence

- final reviewed implementation head: `e9110fc6e01220e17e728dc0e491fff1a0b979c0`;
- compare from START: ahead 1 / behind 0 / exactly one implementation commit;
- exactly 12 F15-owned files;
- no dependency/version/lockfile drift;
- exact-head Frontend Quality Gate `34584422266` — PASS;
- exact-head artifact `10193125417`;
- exact-head digest `sha256:c6a547e94003645daccf0acc3dec19181834fe9f46198b9039317b3d6f025e99`;
- exact-head regression produced 96 PNGs;
- manual visual QA at 375 / 390 / 430 / 768 / 1024 / 1440 — PASS;
- implementation PR `#79` — MERGED;
- PR-context Frontend Quality Gate `34585124291` — PASS;
- PR-context artifact `10193400756`;
- PR-context digest `sha256:9e4fc717f2ad00ad7581acf6215db8ec524772d520f4e4030e90ac7a2075976a`;
- implementation PR mergeable before merge: `true`;
- unresolved review threads before merge: `0`;
- exact pre-merge frontend main remained START_SHA;
- expected-head implementation merge used;
- implementation merge `5db25c291a250a94676e143ba11642c86b2f8152`;
- post-implementation main Frontend Quality Gate `34585660833` — PASS;
- post-main artifact `10193629332`;
- post-main digest `sha256:e29f1e77ee9347fc917df4ee4d594f5d9f9896438183ee44edf5391b51da8821`;
- live main reverified exact implementation merge before closeout branch creation.

## 2. Lovable productionization outcome

The preserved Lovable visual system was retained where valid, while the incomplete behavior was replaced with the permanent F15 contract.

Completed behavior:
- private validated `status/page` route search and loader ownership;
- runtime-validated Challenge list/access/summary/pagination projection;
- accessible create dialog;
- authoritative opponent search with stable `playerId` selection;
- server-projected stable game/format selection;
- typed create Challenge command;
- typed accept/decline response command;
- typed cancel command;
- idempotency per logical attempt;
- opaque revision + stale handling for respond/cancel;
- Django Session + P01 CSRF bootstrap for unsafe requests;
- router invalidation/authoritative reload after mutation outcomes;
- final Persian loading/error/empty/locked/pagination/action states;
- dead `view` behavior removed;
- typed navigation limited to already accepted Match routes;
- private `noindex,nofollow` metadata retained;
- browser regression expanded 90 → 96 images.

No frontend optimistic lifecycle authority remains.

## 3. Permanent boundary

`private dashboard access policy → validated status/page search → loader → typed ChallengeHubRepository → runtime-validated Challenge projection/commands → authoritative reload → UI`

Backend/repository owns Challenge access/unlock, Challenge Rating, list membership/scope, stable Challenge identity, opaque revision, lifecycle/direction/status, allowed commands, creation options/policy, opponent eligibility, Match/result/rating projection, typed navigation targets, summary/pagination and mutation authorization/outcomes.

Frontend owns validated navigation/search state, final Persian presentation, create-form interaction over server-projected options, confirmation/pending/error presentation, deterministic QA adapter behind the same interface and route invalidation after mutations.

## 4. Competitive/security truth

- Tournament Rating and Challenge Rating remain separate.
- Challenge unlock = 30 finalized valid Matches, not wins.
- no wager/betting/stake mechanics.
- opponent selection uses stable `playerId`, never display text alone.
- create uses stable server-projected `gameId` + `formatId`.
- respond/cancel use opaque Challenge revision.
- create/respond/cancel use one idempotency key per logical attempt.
- unsafe calls use Django Session + CSRF bootstrap + `credentials: include` + `X-CSRFToken`.
- no localStorage/sessionStorage bearer contract.
- no Challenge Detail route is introduced by F15.

## 5. Official documentation audit retained

Reviewed and applied:
- TanStack Router Data Loading — `https://tanstack.com/router/latest/docs/guide/data-loading`;
- TanStack Router Data Mutations — `https://tanstack.com/router/latest/docs/guide/data-mutations`;
- Django CSRF — `https://docs.djangoproject.com/en/6.0/ref/csrf/`;
- Django CSRF AJAX guidance — `https://docs.djangoproject.com/en/dev/howto/csrf/`;
- DRF SessionAuthentication — `https://www.django-rest-framework.org/api-guide/authentication/`;
- W3C WAI-ARIA modal dialog pattern — `https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/`;
- W3C WAI-ARIA alert dialog pattern — `https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/`.

Applied decisions: loader-consumed search only in loader dependencies, authoritative revalidation after mutations, CSRF for unsafe SessionAuthentication commands, accessible dialog/alert-dialog focus semantics, visible focus and touch-safe controls.

Public SEO research is not applicable because the route is private.

## 6. Backend cross-repo contract alignment — terminal

Backend repo: `sajadkhavas/turnoment-backend`.

- backend alignment START_SHA `1977db3c9995336166907b9fd85ac26093e6c254`;
- backend Issue `#27` — CLOSED / COMPLETED;
- docs head `184c4a5baaa5ddd464d98cd8ae01c2c65397393b`;
- PR `#28` — MERGED;
- PR Backend Quality Gate `34583290252` — PASS on Python 3.12 and 3.14;
- accepted backend main `c72ec545782a25719009ae329d74ffd13259d020`;
- post-main Backend Quality Gate `34584360023` — PASS.

Planned API family remains:
- `GET /api/v1/me/challenges/`;
- `GET /api/v1/me/challenges/opponents/`;
- `POST /api/v1/me/challenges/`;
- `POST /api/v1/me/challenges/{challengeId}/response/`;
- `POST /api/v1/me/challenges/{challengeId}/cancel/`.

This alignment is documentation-only. Challenge runtime backend APIs are not claimed implemented. Backend NEXT remains `P02 — Games / Catalog Foundation`.

## 7. Closeout mutation boundary

Closeout base:

`5db25c291a250a94676e143ba11642c86b2f8152`

Closeout branch:

`closeout/f15-player-challenge-hub`

Closeout diff is restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`
3. `docs/workstreams/F15_PLAYER_CHALLENGE_HUB.md`
4. `docs/workstreams/F15_CLOSEOUT.md`

Forbidden: runtime/application source, workflow/package/lockfile/dependency, contract/repository/adapter/fixture/test, other route, or backend changes.

## 8. Non-recursive completion law

Committed closeout documentation intentionally cannot contain its own future closeout merge SHA or terminal frozen-main Quality Gate/artifact/digest. Those facts occur after this content is committed and merged and therefore belong in Issue #77.

Until terminal frozen-main QA is green and Issue #77 closes `completed`, status remains:

`MERGED / CLOSEOUT IN PROGRESS`.

## 9. Exact remaining gates

1. closeout compare proves one commit ahead / zero behind and exactly four Markdown files;
2. closeout PR full Frontend Quality Gate PASS;
3. mergeable=true and unresolved review threads=0;
4. pre-merge main remains exact closeout base `5db25c291a250a94676e143ba11642c86b2f8152`;
5. expected-head closeout merge;
6. terminal frozen-main Frontend Quality Gate PASS;
7. terminal artifact/digest belongs to exact frozen main SHA;
8. live main reverified exact frozen SHA;
9. Issue #77 records terminal evidence and closes completed;
10. only then report `F15 — DONE / MERGED / FROZEN — FINAL_PRIVATE`.
