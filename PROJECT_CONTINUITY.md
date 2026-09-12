# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> Operational source of truth for continuing Turnoment without duplicate work.

Last update: `2026-09-12`

## 1. Mandatory continuation law

Every chat/agent MUST read `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, `SEO_FINAL_COPY_PROTOCOL.md` for public/indexable work, and `docs/ROUTE_COMPLIANCE_REGISTRY.md`; verify exact live `main`; use a dedicated branch/Issue/PR; preserve frozen routes; keep production fail-closed; and never claim `DONE / MERGED / FROZEN` from chat memory alone.

Terminal closeout SHA/CI belongs in the tracking Issue after merge. Do not create recursive documentation commits to self-record their own SHA.

## 2. Current frozen frontend baseline

Repository: `sajadkhavas/turnoment`.

Exact live frontend `main` / F22 START_SHA:

`36e8685192fede45da8c4e82c32bdc41a2db1be2`

F21 `/ranking` is terminally frozen:
- Issue #98 — CLOSED / COMPLETED;
- implementation PR #99 — MERGED;
- closeout PR #100 — MERGED;
- closeout head `feb05365468a66db837c828872743d2f070489c2`;
- frozen main `36e8685192fede45da8c4e82c32bdc41a2db1be2`;
- terminal Full `34686940459` PASS;
- terminal F21 `34686940446` PASS;
- required frozen-route regressions also PASS on the same frozen main;
- terminal evidence is recorded in Issue #98.

Protected/frozen public routes:
- F16 `/`;
- F17 `/tournaments`;
- F18 `/games`;
- F19 `/centers`;
- F20 `/centers/$id`;
- F21 `/ranking`;
- F02 `/games/$slug`.

## 3. Active workstream — F22 Public Player Profile

Route:

`/players/$username`

Tracking Issue:

`#101` — OPEN

START_SHA:

`36e8685192fede45da8c4e82c32bdc41a2db1be2`

Implementation branch:

`phase/f22-public-player-profile`

Accepted source implementation head before governance checkpoint:

`d8e2cb8448837b3d63cb9727ae44b1a892ab7d64`

Current status:

`IMPLEMENTATION ACTIVE / GOVERNANCE CHECKPOINT`

F22 is not route-level `FINAL_CURRENT`, merged, or frozen until the implementation PR is accepted and exact post-main QA exists. Issue #101 remains open through documentation-only closeout and terminal frozen-main evidence.

## 4. Permanent F22 architecture

`validated username param → SSR loader → typed PublicPlayerProfileRepository → strict runtime-validated public profile projection → Public Player Profile UI`

Adapters:
- deterministic fixture-backed repository for dev/test/visual QA;
- Django HTTP repository for production.

Production behavior:
- defaults to Django adapter;
- requires `VITE_API_BASE_URL`;
- GET + `credentials: include` + JSON Accept;
- target endpoint `GET /api/v1/players/{username}/public-profile/`;
- 404 maps to one public not-found state;
- other non-2xx fails closed;
- strict Zod response validation;
- requested/returned username identity must match;
- no production fixture fallback.

Runtime remains exactly:

`FRONTEND MOCK / BACKEND PENDING`

## 5. Public identity / privacy truth

F22 target identity semantics:
- `playerId` = stable backend relation identity;
- `username` = stable public profile-navigation identity;
- `gamerTag` = public display text only and never a relation key.

Only explicitly published profiles are public. Private/unpublished/nonexistent identities collapse to the same public not-found surface so the frontend does not expose account existence through distinct states.

Public DTO excludes phone, email, private/real-name identity, `interview_opt_in`, authentication/session/OTP data, permissions/groups, moderation/verification/payment data and secrets.

Optional avatar, city and public bio are displayed only when present in the accepted public projection.

## 6. Competitive authority truth

F22 v1 public projection contains bounded competitive snapshots and recent public results.

Backend/repository eventually owns:
- publication/search-visibility truth;
- stable player/game/season/tournament/result identities;
- Tournament Rating and Challenge Rating;
- rank, record and movement;
- finalized public result membership/order.

Frontend owns presentation, SEO/canonical/robots, accessibility/responsive behavior and deterministic QA fixtures only.

Frontend MUST NOT calculate authoritative win rate, rating, rank, movement, result validity or challenge eligibility.

## 7. Strict projection / indexing truth

Successful public projection includes:
- `schemaVersion=1`;
- `publicationState=published`;
- `searchVisibility=indexable|noindex`;
- player identity/public optional profile fields;
- unique competitive snapshot identities/scopes;
- internally consistent played/win/loss/draw totals and movement semantics;
- unique recent result identities with offset-aware completion time.

Indexing:
- published `indexable` profile → canonical `/players/{username}`, robots `index,follow`;
- published `noindex` profile → same canonical, robots `noindex,follow`;
- public not-found → robots `noindex,nofollow`.

No ProfilePage structured data is emitted merely for schema coverage because the accepted F22 use case is a competitive/statistical public profile and no current requirement justified a potentially misleading person/creator schema projection.

## 8. SEO / final-copy boundary

F22 is a single-player entity/profile route, distinct from `/ranking` multi-player leaderboard discovery.

Accepted title pattern:

`{gamerTag} | پروفایل بازیکن Turnoment`

The page uses public gamer tag/profile identity, competitive snapshot labels and recent-result content without unsupported “best player”, popularity, official-national authority or inferred-achievement claims.

The F22 route overrides the effective legacy shared root metadata for its own head. Shared `src/routes/__root.tsx` remains outside F22 scope and is not mutated because it affects frozen surfaces.

## 9. Source diff / exact-source evidence

Source implementation head:

`d8e2cb8448837b3d63cb9727ae44b1a892ab7d64`

START → source head:
- ahead `1`, behind `0`, exactly one commit;
- exactly `9` changed files;
- no `bun.lock` mutation;
- no dependency/version drift;
- `package.json` changes only test wiring;
- frozen F16/F17/F18/F19/F20/F21/F02 route source remains untouched.

Exact-source QA:
- Full Frontend Quality Gate `34688426255` — PASS — artifact `10296039809` — digest `sha256:157f687c8063ebf2726296e6aeb0885e3f6ec131a1ce7a6771ddc603439029f3`;
- F22 Public Player Profile `34688426242` — PASS — artifact `10296158247` — digest `sha256:c435b839332d124788a404f0bf71273f6fdff7f61ee69581df9011d4b6af2be5`.

Manual visual review covered indexable and noindex profile states at 375/390/430/768/1024/1440 with no observed horizontal overflow, clipping or overlap.

## 10. Backend F22 documentation alignment

Backend Issue #41 is CLOSED / COMPLETED and PR #42 is MERGED.

Backend alignment:
- backend START `44f18e462f63c625bc02e07ef93c15f1c385dcd0`;
- docs head `be805235925af8b70a6e8d183e5f8f363dd7c9cb`;
- exact-head pre-PR gate `34688994229` PASS on Python 3.12 / 3.14;
- PR-context gate `34689064802` PASS on Python 3.12 / 3.14;
- backend merge/main `215fae68d8003b8df6c034b228d1121d96b0be18`;
- post-main gate `34689119713` PASS on Python 3.12 / 3.14.

Backend contract preserves current P01 truth: existing `GET /api/v1/players/<gamer_tag>/` remains gamer-tag lookup and is not silently reinterpreted as stable username. The F22 target `/api/v1/players/{username}/public-profile/` remains planned until a future owning runtime phase establishes stable username storage/uniqueness/compatibility and competitive-domain projections.

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

## 11. Official/current documentation applied

F22 preflight/review applied current official guidance for:
- TanStack Router data loading / SSR and document head management;
- Google Search people-first/indexing/metadata and ProfilePage applicability boundaries;
- WCAG 2.2 focus visibility and touch-target/accessibility expectations;
- Django REST framework permissions/detail lookup/serializers/validators/not-found behavior for the cross-repo contract.

Key decisions: SSR owns primary profile data; production fails closed; public/private publication is backend-owned; public username and display gamer tag are distinct; anonymous public API requires explicit `AllowAny`; no structured data is added solely for coverage.

## 12. Implementation PR acceptance chain — remaining

1. governance checkpoint must remain Markdown-only and preserve source behavior;
2. rerun Full + F22 exact-head QA on the reviewed branch head;
3. verify exact live `main` still equals F22 START;
4. open implementation PR without auto-closing Issue #101;
5. require all triggered Full/F22/frozen-regression PR-context gates PASS with artifacts/digests;
6. require mergeable=true and unresolved review threads=0;
7. expected-head merge;
8. require exact post-main Full/F22/triggered frozen regressions PASS;
9. reverify exact live `main` and record implementation checkpoint in Issue #101;
10. only then create the documentation-only closeout branch.

## 13. NEXT after terminal F22

`/host` → `/rules`.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.
