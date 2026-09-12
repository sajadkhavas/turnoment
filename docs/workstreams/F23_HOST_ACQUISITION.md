# F23 — Host Acquisition

Status at closeout snapshot:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Route: `/host`

Tracking Issue: `#104` — OPEN

START_SHA:

`e1aa1667f3c70a9e00d9664b1e20d3019587cab0`

Implementation branch:

`phase/f23-host-acquisition`

Source implementation head:

`e70de8ee4acc20014da6a0d10a4343ea26f3e1de`

Final reviewed implementation head:

`3a464f69578102aa8c2e79c0725a4361e46c663f`

Implementation PR:

`#105` — MERGED with expected-head lock.

Implementation merge / accepted main / closeout base:

`78c7d3b33c1d785ae444bb0f4d1e0385ca1ced93`

Closeout branch:

`closeout/f23-host-acquisition`

This is a non-recursive workstream snapshot. Future closeout head/merge/frozen-main SHA and terminal post-closeout CI/artifact/digest facts are intentionally not self-recorded here; those facts belong in Issue #104 after they exist.

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

## 10. Exact-source and reviewed-head QA evidence

Source-focused F23:
- run `34702167115` — PASS;
- artifact `10300084668`;
- digest `sha256:d1de24c54a127f66cc097d05e0ef17e9cc631ec61aa3e687421bc782bb8c87d3`.

Source Full Frontend Quality Gate:
- run `34702167120` — PASS;
- browser artifact `10300094875`;
- digest `sha256:363f125ae1c2e476383ad660ab7fca3ef3094f23a0a6916c55e1837eed02c649`.

Final reviewed implementation head:

`3a464f69578102aa8c2e79c0725a4361e46c663f`

Reviewed-head QA:
- F23 `34702956137` — PASS — artifact `10301600267` — digest `sha256:57c572d6246e2988909ece2effb643ced9af92786562b46cc646c39b785ec6b8`;
- Full `34702956119` — PASS — artifact `10301031536` — digest `sha256:622b57ecc7af264f422dc37d994d07e6e48f87be160ff84aa9397633d5173953`.

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

## 14. Implementation PR acceptance

Implementation PR #105 was opened without auto-closing Issue #104.

Pre-merge acceptance:
- expected reviewed head `3a464f69578102aa8c2e79c0725a4361e46c663f`;
- `mergeable=true`;
- unresolved review threads `0`;
- live `main` still exact F23 START before merge;
- PR-context Full/F23/F22/F21/F20/F19/F18/F17/F16 gates all PASS.

Implementation was merged with expected-head lock.

Accepted implementation merge/main:

`78c7d3b33c1d785ae444bb0f4d1e0385ca1ced93`

## 15. Post-main implementation acceptance

All required post-main gates passed on exact implementation merge SHA:
- Full `34703531366` — artifact `10301511456` — digest `sha256:bb1c4606e5976dee23d2b48a94d361825238c6c07aa02547231239933534c7a2`;
- F23 `34703531387` — artifact `10300582171` — digest `sha256:a29b97ad3a966a15babb76b6557001f96c4499dab4f0f14e220894591ed1f566`;
- F22 `34703531403` — artifact `10301466264` — digest `sha256:a6532b5d6311932eda655b26700c4af13b73bf0645d883a13c05a4d46827abca`;
- F21 `34703531297` — artifact `10301491369` — digest `sha256:0373c9e2fb021fd64528a64ff6a07b2c90d5fabc50e6edcdea7b661ee7db8a2d`;
- F20 `34703531473` — artifact `10301032161` — digest `sha256:87a0d9541c290d9f94e5a0a86468346a547168e1e6e112709978111649ea9bfb`;
- F19 `34703531395` — artifact `10301296618` — digest `sha256:bb7fa33ebdd8394a431f88fde1ccbb8c6f45049e3710ee27c327df5eb1e6e4c8`;
- F18 `34703531437` — artifact `10301156811` — digest `sha256:6b3cd7e5633613df0222613f77e7bc42255cd2bffe4abecd64cf62aaa092a459`;
- F17 `34703531424` — artifact `10301311626` — digest `sha256:aefc34255d4b681d32a5e08a0c29e3fe8bd02b24eecaae2b0fd01d2172408ef0`;
- F16 `34703531410` — artifact `10301316540` — digest `sha256:f9e40a9e3ce8ed813244cd04509631e7a09a1851f930591c35f6d2cdc2fbef6b`.

Exact live frontend `main` was reverified at implementation SHA after post-main QA. Implementation evidence is recorded in Issue #104 comment `5647020555`.

## 16. Route registry decision

Because implementation PR #105 is merged and required post-main implementation gates are green, `/host` is eligible for non-recursive promotion to `FINAL_CURRENT`.

This route-level promotion does not itself mean F23 is terminally frozen. Terminal workstream status still requires closeout merge and terminal frozen-main evidence in Issue #104.

## 17. Documentation-only closeout scope

This closeout is restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F23_HOST_ACQUISITION.md`;
4. `docs/workstreams/F23_CLOSEOUT.md`.

Exactly one closeout commit is allowed. No source code, package, lockfile, workflow, runtime configuration, dependency or backend runtime phase change is authorized.

## 18. Remaining terminal gates

After this closeout snapshot is committed, F23 still requires:
1. exact closeout compare: ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR to main without auto-closing Issue #104;
3. PR-context Full + F23 + F22/F21/F20/F19/F18/F17/F16 gates PASS;
4. mergeable=true and unresolved review threads=0;
5. exact live-main lock at implementation merge SHA before closeout merge;
6. expected-head closeout merge;
7. terminal frozen-main Full + F23 + regressions PASS;
8. terminal artifact IDs and SHA-256 digests recorded in Issue #104;
9. exact live frontend main reverified;
10. Issue #104 updated with terminal evidence and CLOSED / COMPLETED.

Only after those future facts exist may the workstream be reported:

`F23 — DONE / MERGED / FROZEN — FINAL_CURRENT`

## 19. Protected NEXT

After terminal F23:

`/rules`

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.
