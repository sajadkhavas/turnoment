# F02 — Final Game Detail

Status: `DONE / MERGED / FROZEN — terminal self-referential evidence recorded in Issue #29`

> This file freezes all evidence knowable before the closeout PR merges. The closeout PR's own future merge SHA and terminal `main` CI cannot be embedded in the commit that creates them; those terminal values are recorded in tracking Issue #29. Do not make a user-facing DONE claim until that terminal evidence is green.

Original F02 START_SHA: `2ea5df3ecbd3a698fa838a8023994c0fc73e18a1`

SEO/final-copy START_SHA: `ad6daedaa900e3b79969295e6ed16e7cb8302e9f`

Tracking issue: `#29`

## 1. Goal

Deliver `/games/$slug` as a final public competitive game hub under:

- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`
- `SEO_FINAL_COPY_PROTOCOL.md`

No later generic SEO/copy phase is required for this route after terminal closeout.

## 2. Original technical implementation

- branch: `phase/f02-game-detail`
- reviewed head: `a72bdcbcba0b54674adc1e8d6eb6685818e245d4`
- PR `#30 — F02 — Final Game Detail`
- PR CI `34351774310` — PASS
- open review threads: `0`
- implementation merge SHA: `6c36325e92dacc3eb60f895afa2b553e3046087a`
- post-merge main CI: `34352013348` — PASS
- responsive/browser QA at `375 / 390 / 430 / 768 / 1024 / 1440` — PASS

The issue was intentionally reopened after the stricter SEO/final-copy protocol became mandatory.

## 3. SEO/final-copy recertification

SEO branch: `phase/f02-seo-final-copy`

SEO evidence:

- research: `docs/workstreams/F02_GAME_DETAIL_SEO_RESEARCH.md`
- primary intent: find tournaments/competitions for one game in Iran and understand how to participate
- primary/supporting topic clusters researched and recorded
- Persian/English terminology/local intent evaluated
- content-gap and cannibalization map recorded
- visible engineering/system wording removed from final copy
- H1/title/meta/headings/internal anchors finalized
- canonical/robots/structured-data decision revalidated
- final-copy regression checks added

Final reviewed SEO branch head:

`0558e0ef9290c3d84429e65df06dd4e1ab1a74fa`

Exact-head branch Quality Gate:

`34372783510` — PASS

SEO/final-copy PR:

- PR `#34 — F02 — Finalize Game Detail SEO and public copy`
- PR CI `34373132933` — PASS
- open review threads: `0`
- expected-head merge SHA: `21c16a95eb6dd31e2f23d8bf1b15ec50d168d3b2`
- post-merge main CI `34373382549` — PASS

## 4. Final information architecture

1. Games → current-game breadcrumb
2. game identity + platforms + people-first competitive summary
3. aggregate competition stats
4. current/open/upcoming tournaments
5. competition formats
6. ranking state/preview
7. gaming centers hosting/supporting the game
8. descriptive internal links to tournaments, rankings and centers

## 5. Permanent contract

Production mapping:

`GET /api/v1/games/{slug}/`

Frontend does not authoritatively calculate publication state, tournament lifecycle, ranking eligibility, venue support or competition-format truth.

## 6. Final SEO/copy decisions

- page is a competitive game hub, not an encyclopedia/ecommerce product page;
- final metadata pattern: `مسابقات {game} در ایران | تورنمنت حضوری | ایران مهر افزار`;
- natural Persian query language includes tournaments, registration, formats, ranking and gaming centers without keyword stuffing;
- no search volume/difficulty/ranking/popularity figures are invented;
- `/games/$slug` owns one-game competitive intent;
- `/games`, `/tournaments`, `/ranking`, `/centers` retain their adjacent distinct intents;
- visible breadcrumb is retained;
- `BreadcrumbList` JSON-LD remains intentionally omitted until stable absolute public-origin URLs are available;
- speculative `VideoGame` rich-result markup remains omitted.

## 7. Final QA evidence

Reviewed visual/checkpoint artifact:

- Quality Gate `34358425752` — PASS on `dfa43a178ab11c9607720494bcb165e003ae0691`
- 18 captures at `375 / 390 / 430 / 768 / 1024 / 1440`
- artifact `10106806417`
- digest `sha256:2c941652f83398f8fb6cb2f328a31b5c3995104c57c04d5a3e4996ce5d6ec5c7`
- manual Game Detail review at `375 / 430 / 768 / 1440` — PASS
- no clipping/horizontal overflow/broken Persian wrapping/hidden primary CTA observed

Final SEO reviewed head gate:

- exact-head CI `34372783510` — PASS
- PR CI `34373132933` — PASS
- post-merge main CI `34373382549` — PASS

All gates retained frozen install, lint, production build/route generation, typecheck, contract/final-copy tests, browser smoke, single-`<main>` invariant and responsive screenshots.

## 8. Closeout

Closeout branch:

`closeout/f02-game-detail-seo-final-copy`

The route registry is promoted in this closeout to:

`/games/$slug` → `FINAL_CURRENT`

No production code changes are part of closeout.

Terminal closeout PR number, closeout merge SHA and terminal main Quality Gate are recorded in Issue #29 after they actually exist.

## 9. Next workstream

After terminal F02 acceptance:

1. My Tournaments
2. My Matches
3. Result Submission
4. Dispute
5. Challenge Hub / Detail
6. Rivalry Detail
7. Auth / OTP
8. Notifications / Settings
