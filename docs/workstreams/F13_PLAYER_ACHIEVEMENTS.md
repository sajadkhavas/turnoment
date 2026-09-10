# F13 — Player Achievements Hub

Status: `IN PROGRESS — IMPLEMENTATION / EXACT-HEAD QA`

Route: `/dashboard/achievements`

Tracking Issue: `#68`

START_SHA: `a058de708c755d98e7180ffee616b50cbdd8598c`

Implementation branch: `phase/f13-player-achievements`

Target: `FINAL_PRIVATE`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 1. Mandatory preflight

Read before implementation:
- `PROJECT_CONTINUITY.md`;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- current `src/routes/dashboard.achievements.tsx` placeholder;
- accepted F12 private dashboard route/repository/QA pattern;
- backend `PROJECT_CONTINUITY.md`, `PHASE_COMPLETION_PROTOCOL.md`, `docs/PHASE_REGISTRY.md`, `docs/FRONTEND_BACKEND_CONTRACT.md`, and `docs/ENGINEERING_RULES.md` before cross-repo alignment.

Exact frontend main at start:

`a058de708c755d98e7180ffee616b50cbdd8598c`

This is the terminal F12 frozen main. F12 Issue #65 is CLOSED / COMPLETED; terminal Frontend Quality Gate `34520157521` PASS and artifact `10169424034` has digest `sha256:167894d704c2c548f6cf40102bb67f2f584afeff09f8bff96b20a837828911e4`.

The existing `/dashboard/achievements` route was only `DashboardSectionPlaceholder`. It had no loader, typed repository, runtime validation, filter/sort/pagination contract or final achievements UI. No previous F13/Achievements Issue, PR or branch was found.

Challenge Hub remains isolated and outside F13 ownership.

## 2. Official documentation audit

Current official guidance reviewed:
- TanStack Router — Data Loading;
- TanStack Router — Search Parameters / validation;
- TanStack Router — Document Head Management;
- TanStack Start — SSR and environment boundary guidance;
- W3C WCAG 2.2.

Applied decisions:
- loader owns the private critical projection;
- status/category/sort/page navigation state is validated and included explicitly in `loaderDeps`;
- private metadata remains route-owned with `noindex,nofollow`;
- Django adapter reads through `credentials: include` and treats 401/403 as unauthenticated;
- status and progress are exposed with semantic text/ARIA, never by color alone;
- no client-local storage token or browser-derived unlock truth is introduced.

Public SEO research is not applicable to this private route. Final Persian product copy and explicit indexing policy remain mandatory.

## 3. Design-reference audit

Primary design masters are the accepted Turnoment DashboardShell and F10/F11/F12 private pages. PlayStation/Steam achievement surfaces were reviewed only for information hierarchy such as status, grouping, progress and recency. F13 does not copy branding, assets, trophy grades, rarity percentages, reward economies or platform-specific business rules.

Turnoment visual direction remains premium RTL cards, compact summary, accessible filter controls, clear status labels and progress presentation that works from mobile through desktop.

## 4. Bounded product contract

F13 is a private read-only Achievements Hub.

Permanent boundary:

`private dashboard access policy → validated status/category/sort/page search → loader → typed PlayerAchievementsRepository → runtime-validated achievement projection → UI`

Backend/repository-owned truth:
- achievement definitions;
- stable `achievementId` and `code`;
- category identity/membership and filter options;
- achievement status: `locked | in-progress | unlocked`;
- progress `current / target / percent` when present;
- `unlockedAt` timestamp;
- summary, filtering, ordering and pagination.

Frontend-owned presentation:
- validated URL navigation state;
- final Persian labels and explanatory copy;
- formatting supplied `unlockedAt` with supplied timezone;
- visual progress bar from the authoritative percentage;
- responsive/a11y treatment;
- deterministic QA fixture behind the same repository interface.

Explicitly out of scope:
- deriving or awarding achievements from Match/Tournament/Challenge history;
- deriving status from progress percentage;
- XP/points/coin economy or financial rewards;
- trophy grade/rarity/global-population percentages;
- social comparison/friend behavior;
- achievement claim/mutation;
- Achievement Detail route/link;
- Challenge eligibility/rating inference;
- any modification to `/dashboard/challenges`.

No specific achievement condition is declared by F13. Conditions remain authoritative product/domain configuration.

## 5. Backend cross-repo alignment — terminal documentation truth

Backend repository: `sajadkhavas/turnoment-backend`.

Backend START_SHA:
`e81b13a0de6936ded0879d4310eab3883a7556a6`

Terminal evidence:
- Issue `#23` — CLOSED / COMPLETED;
- branch `docs/f13-player-achievements-contract`;
- accepted docs head `f6d54a77370b268f1d240180d5eacda86d100dd8`;
- compare from START: ahead 1 / behind 0 / exactly one commit / exactly two Markdown files;
- PR `#24` — MERGED;
- PR Quality Gate `34521995236` — PASS on Python 3.12 and 3.14;
- mergeable before merge `true`;
- unresolved review threads before merge `0`;
- pre-merge backend main exact START_SHA;
- expected-head merge used;
- accepted backend merge/main `ddfdceaa9746cc6a60ad2b5e18e630c53904f00c`;
- post-main Backend Quality Gate `34522798713` — PASS on Python 3.12 and 3.14;
- live backend main reverified exact accepted SHA.

Planned future endpoint:
`GET /api/v1/me/achievements/`.

No Python/model/migration/serializer/view/URL/dependency/phase-registry implementation was added. Runtime remains exactly `FRONTEND MOCK / BACKEND PENDING`. Backend NEXT remains `P02 — Games / Catalog Foundation`.

## 6. Final frontend contract shape

Validated search:
- `status=locked|in-progress|unlocked`; absence = all;
- `category=<stable-category-id>`;
- `sort=default|recent|progress`; absence = default;
- `page=<positive integer>`; absence = 1.

Projection:
- current player identity;
- IANA timezone;
- summary totals by status;
- stable category filter options;
- achievement items with stable identity, product title/description/category/status/progress/unlock time;
- pagination.

Runtime integrity rejects:
- summary counts that do not partition total;
- impossible pagination or filtered count above total;
- duplicate category IDs, achievement IDs or codes;
- item categories absent from category options or mismatched labels;
- unlocked status without `unlockedAt`;
- non-unlocked status with `unlockedAt`;
- in-progress status without strict partial progress;
- unlocked progress that is not complete when supplied.

## 7. Required UI states

F13 owns:
- pending/loading skeleton;
- populated read state;
- all-empty state;
- filtered-empty/reset state;
- error/retry state;
- unauthenticated/session-expired redirect to Login;
- status/category/sort URL navigation;
- pagination.

No mutation state exists because F13 is read-only.

## 8. Accessibility / responsive acceptance

Required widths:
`375 / 390 / 430 / 768 / 1024 / 1440`

Acceptance requires:
- no horizontal overflow/clipping;
- safe Persian title/description wrapping;
- touch-safe buttons/selects;
- visible focus state;
- semantic headings/navigation/filter labels;
- textual status in addition to color/icon;
- progress bars with accessible progress semantics;
- stable mobile/desktop card hierarchy.

## 9. Quality/evidence gate

Before implementation merge:
1. exact implementation compare reviewed;
2. no Challenge Hub/Detail mutations;
3. no dependency drift; `package.json` only appends F13 contract spec to test chain;
4. frozen install PASS;
5. lint PASS;
6. production build/route generation PASS;
7. typecheck PASS;
8. F13 runtime contract tests PASS;
9. browser SSR/noindex/final-copy gate PASS;
10. browser regression expands from 78 to 84 screenshots by adding F13 at all six widths;
11. manual six-width visual QA PASS;
12. PR CI green, mergeable true, review threads 0;
13. expected-head implementation merge;
14. post-main QA/artifact green;
15. documentation-only closeout + terminal frozen-main QA before Issue #68 may close.

A first frontend candidate `126737d26c1f18b3e2026c79c611397510fa7741` passed frozen install, lint, production build, typecheck, contract checks and the 84-image browser gate; artifact `10170483828` has digest `sha256:d5cdcdfb3239ff3225333eaa8fe0a9035dbd2dfe24914842eb255fd5d9288e28`, and manual F13 visual QA at all six widths passed. It is nevertheless superseded as acceptance evidence because its committed governance text predated the terminal backend #24 closure. The implementation branch is rebuilt from the same F13 START_SHA as one clean final commit with terminal backend evidence.

A transient uncommitted package blob that accidentally changed one dependency version was rejected before any branch commit and is not part of repository history.

## 10. Exact NEXT

1. accept only the rebuilt clean one-commit frontend head from exact START_SHA;
2. compare must prove only F13-owned files, one commit ahead / zero behind, no dependency drift and no Challenge changes;
3. require exact-head Frontend Quality Gate PASS and inspect all six F13 screenshots;
4. open frontend implementation PR without auto-closing Issue #68;
5. require PR CI green, mergeable true, review threads 0 and exact pre-merge main lock;
6. expected-head implementation merge;
7. require post-main QA/artifact/digest;
8. create documentation-only closeout from exact implementation merge;
9. require closeout PR gate + expected-head merge + terminal frozen-main gate/artifact/digest;
10. record terminal evidence in Issue #68 and close completed;
11. only then report `F13 — DONE / MERGED / FROZEN — FINAL_PRIVATE`.
