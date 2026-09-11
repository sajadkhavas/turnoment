# F15 — Player Challenge Hub

Status: `IN PROGRESS — IMPLEMENTATION / EXACT-HEAD QA`

Route: `/dashboard/challenges`

Tracking Issue: `#77`

START_SHA: `398e963f1ecdbe86013ce3b0052c4e1891f48854`

Implementation branch: `phase/f15-player-challenge-hub`

Target: `FINAL_PRIVATE`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 1. Mandatory preflight

Read before implementation:
- `PROJECT_CONTINUITY.md`;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- current Lovable-preserved `/dashboard/challenges` route/component/contracts;
- accepted P01 auth/CSRF frontend contract;
- accepted F05/F06 Match result/dispute contracts;
- backend `PROJECT_CONTINUITY.md`, `PHASE_COMPLETION_PROTOCOL.md`, `docs/PHASE_REGISTRY.md`, `docs/FRONTEND_BACKEND_CONTRACT.md`, and `docs/ENGINEERING_RULES.md` before cross-repo alignment.

Exact frontend main at start:

`398e963f1ecdbe86013ce3b0052c4e1891f48854`

This is terminal F14 frozen main. `/dashboard/challenges` had preserved Lovable source but remained `PLACEHOLDER` in the canonical registry and had no dedicated acceptance Issue/PR/freeze chain.

## 2. Lovable source audit

Accepted parts retained:
- private dashboard shell;
- validated `status` / `page` search skeleton;
- loader-driven list projection;
- access/rating summary card;
- status filters;
- Challenge cards and result presentation;
- responsive visual hierarchy.

Blocking gaps found before F15:
- repository contract was read-only;
- create button only surfaced implementation-stage placeholder copy and created nothing;
- accept/decline/cancel only set local pending text and never called authoritative commands;
- `view` was a no-op dead control;
- no CSRF/idempotency/revision/stale handling existed for Challenge commands;
- no authoritative opponent search/stable opponent selection existed;
- retry used browser reload instead of router revalidation;
- browser regression had no Challenge Hub evidence.

F15 therefore productionizes the existing design rather than replacing it gratuitously.

## 3. Permanent boundary

`private dashboard access policy → validated status/page search → loader → typed ChallengeHubRepository → runtime-validated Challenge projection/commands → authoritative reload → UI`

Backend/repository owns:
- Challenge access/unlock and `canCreate`;
- Challenge Rating;
- current-player Challenge scope;
- stable Challenge identity and opaque revision;
- direction/lifecycle/status/action-required truth;
- allowed commands;
- creation games/formats/policy;
- opponent-search eligibility and stable player identity;
- Match/result/rating projection;
- typed navigation target;
- summary/pagination;
- create/respond/cancel authorization and typed command outcomes.

Frontend owns:
- validated URL navigation;
- final Persian presentation;
- create-form interaction over backend-projected options;
- confirmations/pending/error presentation;
- deterministic QA adapter behind the same permanent interface;
- router invalidation after mutations.

Frontend never optimistically owns Challenge lifecycle/result/rating/eligibility.

## 4. Competitive/security truth

- Tournament Rating and Challenge Rating remain separate.
- Challenge unlock = `30` finalized valid Matches, not wins.
- no wager/betting/stake mechanics.
- opponent selection uses stable `playerId` from authoritative search, never display text alone.
- creation uses stable server-projected `gameId` + `formatId`.
- respond/cancel use opaque Challenge revision.
- create/respond/cancel use one idempotency key per logical attempt.
- unsafe requests use P01 Django Session + CSRF bootstrap + `credentials: include` + `X-CSRFToken`.
- no localStorage/sessionStorage bearer contract.
- no Challenge Detail route is introduced by F15.
- Hub navigation is restricted to typed targets for already accepted Match surfaces.

## 5. Official documentation audit

Reviewed current official sources:
- TanStack Router Data Loading — `https://tanstack.com/router/latest/docs/guide/data-loading`;
- TanStack Router Data Mutations — `https://tanstack.com/router/latest/docs/guide/data-mutations`;
- Django CSRF — `https://docs.djangoproject.com/en/6.0/ref/csrf/`;
- Django CSRF AJAX guidance — `https://docs.djangoproject.com/en/dev/howto/csrf/`;
- Django REST Framework authentication / SessionAuthentication — `https://www.django-rest-framework.org/api-guide/authentication/`;
- W3C WAI-ARIA modal dialog pattern — `https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/`;
- W3C WAI-ARIA alert dialog pattern — `https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/`.

Applied decisions:
- loader-consumed `status/page` are the only loader dependencies;
- mutation success/stale/unavailable paths reload authoritative loader data with router invalidation;
- no optimistic server-owned lifecycle mutation in UI;
- unsafe SessionAuthentication POSTs use CSRF;
- create modal and destructive confirmation use accessible modal/alert-dialog focus semantics;
- visible focus and touch-safe controls remain mandatory.

Public SEO research is not applicable; the route remains explicit `noindex,nofollow`.

## 6. Cross-repo backend alignment

Backend repo: `sajadkhavas/turnoment-backend`.

Backend START_SHA:
`1977db3c9995336166907b9fd85ac26093e6c254`

Tracking Issue: backend `#27`.

Docs branch: `docs/f15-player-challenge-hub-contract`.

Docs head:
`184c4a5baaa5ddd464d98cd8ae01c2c65397393b`

Backend PR: `#28`.

Backend Quality Gate:
`34583290252` — PASS on Python 3.12 and 3.14.

Planned authenticated API family:
- `GET /api/v1/me/challenges/`;
- `GET /api/v1/me/challenges/opponents/`;
- `POST /api/v1/me/challenges/`;
- `POST /api/v1/me/challenges/{challengeId}/response/`;
- `POST /api/v1/me/challenges/{challengeId}/cancel/`.

This alignment is documentation-only and does not reorder backend phases. Backend NEXT remains exactly `P02 — Games / Catalog Foundation`. Runtime remains `FRONTEND MOCK / BACKEND PENDING` until an owning backend Challenge phase implements these APIs.

## 7. F15 implementation scope

Exactly these implementation/governance files are owned before closeout:
1. `.github/workflows/frontend-quality.yml`
2. `PROJECT_CONTINUITY.md`
3. `docs/workstreams/F15_PLAYER_CHALLENGE_HUB.md`
4. `src/components/dashboard/challenge-hub-card.tsx`
5. `src/components/dashboard/challenge-hub-create-dialog.tsx`
6. `src/components/dashboard/challenge-hub-page.tsx`
7. `src/lib/challenge-hub-contract.ts`
8. `src/lib/challenge-hub-contract.spec.ts`
9. `src/lib/challenge-hub-data.ts`
10. `src/lib/challenge-hub-http-repository.ts`
11. `src/lib/challenge-hub-repository.ts`
12. `src/routes/dashboard.challenges.tsx`

No package/dependency/version/lockfile mutation is required. The accepted `package.json` already includes `challenge-hub-contract.spec.ts` in the contract chain.

## 8. Required product states

- pending skeleton;
- loader error/retry;
- unauthenticated/session-expired redirect;
- locked access progress;
- create-enabled/create-disabled access;
- populated list;
- filtered empty and account empty;
- pagination;
- accessible create dialog;
- opponent-search pending/empty/error/results;
- stable opponent selection;
- game/format/note validation;
- typed create validation/conflict/unavailable outcomes;
- accept pending/success/error;
- decline confirmation/pending/success/error;
- cancel confirmation/pending/success/error;
- stale authoritative reload;
- typed navigation to accepted Match routes;
- completed result/rating presentation.

No dead action or implementation-stage engineering copy may remain.

## 9. Quality/evidence gate

Before implementation merge:
1. exact compare reviewed;
2. only the 12 F15-owned files changed;
3. no dependency/lockfile drift;
4. frozen install PASS;
5. lint PASS;
6. production build/route generation PASS;
7. typecheck PASS;
8. full contract chain PASS including F15 positive/negative/idempotency/stale checks;
9. F15 SSR/private-noindex/final-copy browser gate PASS;
10. browser regression expands `90 → 96` screenshots by adding F15 at `375 / 390 / 430 / 768 / 1024 / 1440`;
11. manual F15 six-width visual QA PASS;
12. implementation PR CI green;
13. mergeable=true;
14. unresolved review threads=0;
15. exact pre-merge main lock;
16. expected-head implementation merge;
17. post-main QA/artifact/digest;
18. documentation-only closeout + terminal frozen-main QA before Issue #77 may close.

## 10. Exact NEXT

1. finish backend Issue #27 terminal docs alignment;
2. create one clean F15 frontend implementation commit from exact START_SHA;
3. compare one commit ahead / zero behind and exactly 12 owned files;
4. require exact-head Frontend Quality Gate PASS with 96-image regression;
5. manually inspect all six F15 screenshots;
6. open implementation PR without auto-closing Issue #77;
7. require PR CI green, mergeable=true, review threads=0 and exact pre-merge main lock;
8. expected-head implementation merge;
9. require post-main QA/artifact/digest;
10. create documentation-only closeout;
11. require closeout PR CI + expected-head merge + terminal frozen-main QA/artifact/digest;
12. reverify live main exact frozen SHA;
13. record terminal evidence in Issue #77 and close completed;
14. only then report `F15 — DONE / MERGED / FROZEN — FINAL_PRIVATE`.
