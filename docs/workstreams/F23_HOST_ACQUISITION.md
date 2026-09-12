# F23 — Host Acquisition

Status at governance checkpoint:

`SOURCE IMPLEMENTED / EXACT-SOURCE QA ACCEPTED / BACKEND ALIGNMENT TERMINAL / GOVERNANCE IN PROGRESS`

Route: `/host`

Tracking Issue: `#104` — OPEN

START_SHA:

`e1aa1667f3c70a9e00d9664b1e20d3019587cab0`

Implementation branch:

`phase/f23-host-acquisition`

Source implementation head:

`e70de8ee4acc20014da6a0d10a4343ea26f3e1de`

This is a non-recursive workstream snapshot. Future governance head, implementation merge/main, closeout head/merge and terminal frozen-main CI/artifact facts are intentionally not self-recorded here; those facts belong in Issue #104 after they exist.

## 1. Why F23 exists

The inherited `/host` route had not passed current Turnoment public-page law. F23 recertifies it as a real host-acquisition surface rather than a decorative landing page.

The accepted page must:
- explain host value without promising automatic approval;
- communicate a real review/process/requirements path;
- collect a typed, validated application;
- never fabricate a successful submission;
- reserve a production backend contract without pretending that contract is already live;
- satisfy current SEO/final-copy/accessibility/responsive evidence law;
- preserve every earlier frozen competitive route.

## 2. Permanent architecture

`host application draft → normalization + typed validation → HostApplicationRepository → strict production HTTP adapter / deterministic dev-test fixture → Host Acquisition UI`

Repository boundary:

`submit(input): Promise<HostApplicationReceipt>`

Adapters:
- deterministic fixture implementation for development/test/visual QA;
- Django HTTP implementation for production.

Production selection remains fail-closed. Missing API configuration or failed transport does not silently switch to a success fixture.

## 3. Target production API / runtime truth

Frontend-reserved target endpoint:

`POST /api/v1/host-applications/`

Production adapter behavior:
- requires `VITE_API_BASE_URL`;
- POST JSON;
- `credentials: include`;
- 400/422 → validation failure;
- 429 → rate limited;
- other non-2xx → unavailable;
- network failure → unavailable;
- successful JSON is strict-runtime validated;
- malformed successful response → invalid response;
- no production fixture fallback.

Runtime remains exactly:

`FRONTEND MOCK / BACKEND PENDING`

The planned backend endpoint does not exist yet.

## 4. Request contract and normalization

External request fields:

```text
venueName: string
managerName: string
phone: string
city: string
area: string
stationCount: integer
games: string
description: string | null
```

Accepted frontend bounds:
- `venueName`: 2..120 characters;
- `managerName`: 2..120 characters;
- `phone`: canonical Iranian mobile `+989xxxxxxxxx`;
- `city`: 2..80 characters;
- `area`: 2..120 characters;
- `stationCount`: integer 1..1000;
- `games`: 2..300 characters;
- `description`: null or max 1200 characters.

Normalization before the typed boundary includes:
- Persian digits `۰..۹` → ASCII where needed;
- Arabic-Indic digits `٠..٩` → ASCII where needed;
- valid Iranian `09xxxxxxxxx` / `989xxxxxxxxx` mobile variants → `+989xxxxxxxxx`;
- station count → safe integer;
- optional blank description → null.

Frontend validation is defense in depth only. Backend remains authoritative when runtime ships.

## 5. Receipt / success law

Successful v1 receipt:

```text
schemaVersion: 1
applicationId: string
state: received
submittedAt: offset-aware ISO datetime
```

Rules:
- `applicationId` is server-issued and opaque;
- `submittedAt` is server-owned;
- `state=received` confirms only the accepted create receipt;
- receipt must not be interpreted as approval, verification, licensing, host activation or tournament eligibility;
- UI only shows success after a valid receipt is returned;
- no timer, local random id or optimistic copy may simulate a successful backend submission.

## 6. Public page / product acceptance

Accepted page hierarchy:

`Hero → benefits → process → requirements → experience preview → application form → FAQ → final CTA`

The Hero and supporting copy frame hosting as an application/review path, not instant enablement.

Benefits explain real host-facing product value such as tournament publication, online player registration, capacity/time planning, public center presentation after applicable approval/setup, competition information management and registration visibility.

Process explains:
1. submit application;
2. information review;
3. complete host profile if accepted;
4. prepare/publish competitions after setup.

Requirements cover physical space, suitable equipment, stable network, responsible operator, schedule commitment and compliance with applicable Turnoment/location rules.

The preview is explicitly a sample experience and does not represent live host data.

FAQ answers eligibility, review factors, games, capacity, multiple tournaments, public center display and rule handling without fabricating business/legal approval claims.

## 7. Layout / accessibility acceptance

The route uses real `TournamentLayout` with `pageOwnsMain`, preserving exactly one page `<main>`.

Accepted interaction requirements include:
- semantic form controls and labels;
- field-level validation feedback;
- useful submit pending/error/success states;
- keyboard/focus visibility;
- touch-safe actions;
- FAQ controls that remain operable without pointer-only interaction;
- no horizontal overflow/clipping/overlap at required responsive sizes.

## 8. SEO / final-copy lock

Page purpose: qualify and convert gaming-center owners/managers who want to host gaming tournaments while clearly explaining requirements and review flow.

Primary audience: gaming-center owners/managers and local operators.

Primary search intent: service/acquisition intent around hosting/organizing gaming tournaments in a gaming center, supported by informational intent about requirements and process.

Primary topic/query cluster:
- `میزبانی مسابقات گیمینگ`
- `برگزاری مسابقه در گیم‌نت`
- host/venue participation in Turnoment.

Cannibalization boundary:
- `/centers` and `/centers/$id` = public gaming-center discovery/detail;
- `/tournaments` = player-facing public tournament discovery;
- `/host` = gaming-center host acquisition/application;
- `/rules` = rules/policy content and remains separate protected NEXT.

Final H1:

`گیم‌نتت را به میزبان رقابت‌های واقعی تبدیل کن`

Final title:

`میزبانی مسابقات گیمینگ برای گیم‌نت | Turnoment`

Final description:

`برای میزبانی مسابقات حضوری گیمینگ در گیم‌نت خود در Turnoment درخواست بدهید؛ شرایط میزبانی، روند بررسی و مسیر ثبت‌نام بازیکنان را ببینید.`

Canonical:

`/host`

Robots:

`index,follow`

No unsupported “best / official / largest / guaranteed acceptance” claim is authorized. No legacy Iran Mehr Afzar branding or engineering-stage words such as backend/API/mock may enter rendered public copy/head.

No structured data is added merely for schema coverage; no current supported search feature was required to represent this acquisition form more accurately than ordinary semantic page/head content.

## 9. Exact source implementation diff

Source head:

`e70de8ee4acc20014da6a0d10a4343ea26f3e1de`

START → source head:
- ahead `1`;
- behind `0`;
- exactly `1` source commit;
- exactly `9` changed files;
- no `bun.lock` mutation;
- no dependency/version drift;
- package change is F23 test wiring only;
- frozen F16/F17/F18/F19/F20/F21/F22/F02 route source remains untouched.

Source implementation files:
- `.github/workflows/f23-host-acquisition-quality.yml`;
- `package.json` test wiring;
- `src/components/host/host-acquisition-page.tsx`;
- `src/lib/host-application-contract.spec.ts`;
- `src/lib/host-application-contract.ts`;
- `src/lib/host-application-fixture.ts`;
- `src/lib/host-application-http-repository.ts`;
- `src/lib/host-application-repository.ts`;
- `src/routes/host.tsx`.

## 10. Exact-source QA evidence

Focused F23:
- run `34702167115` — PASS;
- artifact `10300084668`;
- digest `sha256:d1de24c54a127f66cc097d05e0ef17e9cc631ec61aa3e687421bc782bb8c87d3`.

Full Frontend Quality Gate:
- run `34702167120` — PASS;
- browser artifact `10300094875`;
- digest `sha256:363f125ae1c2e476383ad660ab7fca3ef3094f23a0a6916c55e1837eed02c649`.

Focused workflow assertions include:
- contract tests;
- production build;
- typecheck;
- SSR content/head verification;
- canonical/robots/site identity;
- form boundary fields;
- exactly one `<main>`;
- legacy/engineering wording rejection;
- screenshots at 375/390/430/768/1024/1440.

Manual full-page evidence review covered 375/768/1440 and verified complete Hero, benefits, process, requirements, preview, form, FAQ and final CTA without observed horizontal overflow, clipping or overlap.

## 11. Backend documentation alignment

Backend repository: `sajadkhavas/turnoment-backend`.

F23 alignment is terminal documentation-only work:
- Backend START `215fae68d8003b8df6c034b228d1121d96b0be18`;
- Issue #43 — CLOSED / COMPLETED;
- docs branch `phase/f23-host-application-contract-docs`;
- docs head `bb481f5c7fbb37d680665c2f397d13ef2f232b55`;
- PR #44 — MERGED;
- exact-head Backend Quality Gate `34702635677` PASS on Python 3.12 / 3.14;
- PR-context Backend Quality Gate `34702687868` PASS on Python 3.12 / 3.14;
- merge/main `46b3f47b38068675ed8a0941a871438e51abd6a2`;
- post-main Backend Quality Gate `34702740266` PASS on Python 3.12 / 3.14;
- exact live backend main reverified at the merge;
- no Python/model/migration/serializer/view/URL/settings/dependency/workflow/phase-registry implementation occurred.

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

## 12. Backend public-write authentication / CSRF boundary

Current backend global defaults use `SessionAuthentication` + `IsAuthenticated`.

The F23 target is deliberately session-independent public submission. Backend documentation freezes:
- explicit `AllowAny` for the future create view;
- explicit per-view authentication policy that does not accidentally inherit session-authenticated CSRF semantics because a browser happens to have a valid session cookie.

An empty per-view authentication class list is one acceptable implementation consistent with the accepted contract.

This decision does not weaken global auth defaults, does not implement runtime, and does not convert an anonymous application into an authenticated account action.

Future runtime also owns server validation, request-rate/abuse controls, duplicate/idempotency semantics, PII storage/access/retention and authoritative receipt creation.

DRF throttling may be one policy layer but is not documented as complete brute-force/DoS protection.

## 13. Official/current documentation applied

Reviewed/applied during F23:
- TanStack Router / Start route, SSR and document-head behavior;
- Google Search people-first content, unique titles/descriptions, canonical/indexing principles;
- WCAG 2.2 keyboard/focus/target-size/accessibility baseline;
- Django REST framework Permissions, Authentication, Settings, Serializers, AJAX/CSRF/CORS and Throttling during backend alignment.

Key decisions:
- route owns final `/host` metadata;
- production fails closed;
- typed/runtime validation gates transport and receipt;
- no fake success;
- future public POST must explicitly define both permission and authentication policy;
- backend is authoritative for validation and receipt truth;
- no schema is added merely for SEO coverage.

## 14. Governance checkpoint scope

The governance checkpoint is exactly one additional commit changing exactly three Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F23_HOST_ACQUISITION.md`.

It must not change source code, package data, lockfiles, workflows, dependencies or frozen-route implementation.

After the governance commit, Full + focused F23 must rerun on the exact reviewed branch head before implementation PR creation.

## 15. Remaining implementation PR chain

1. verify START → reviewed head = ahead 2 / behind 0 / exactly 2 commits and source+three governance docs only;
2. require exact reviewed-head Full + F23 PASS with artifacts/digests;
3. verify live `main` remains exact F23 START;
4. open implementation PR without auto-closing Issue #104;
5. require triggered Full/F23/F22/F21/F20/F19/F18/F17/F16 PR-context gates PASS;
6. require `mergeable=true` and unresolved review threads=0;
7. merge with expected reviewed-head SHA;
8. require post-main Full/F23/frozen-route regression PASS;
9. reverify exact live main and record implementation evidence in Issue #104;
10. only then create closeout.

## 16. Closeout scope after implementation acceptance

F23 closeout will be exactly one commit changing exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F23_HOST_ACQUISITION.md`;
4. `docs/workstreams/F23_CLOSEOUT.md`.

Closeout may promote route-level `/host` to `FINAL_CURRENT` only after implementation merge + post-main evidence exist.

Terminal workstream `DONE / MERGED / FROZEN` still requires:
- closeout PR-context required gates;
- mergeable/thread/main lock;
- expected-head closeout merge;
- terminal frozen-main Full/F23/frozen regressions;
- artifacts/digests;
- exact live-main verification;
- terminal evidence in Issue #104;
- Issue #104 closed with state reason `completed`.

## 17. Protected NEXT

After terminal F23:

`/rules`

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.
