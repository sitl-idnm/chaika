# Project State: Верёвочный парк «Чайка» — Landing

## Meta
- **Source (v1)**: Design handoff bundle (HTML/CSS reference).
  Bundle: `Чайка Design System.zip` → `design_handoff_chaika_landing/`.
- **Source (v2 — current)**: live Figma file `Сайт`
  - fileKey `u1Mg41CzS9CExyN7lknyIu`, layout section «Верстка» node `193:4087`,
    additional screens (modals/pages) section «Дополнительное» node `204:1179`.
  - Read via Figma REST API + curl (token in `.claude/settings.local.json`
    `env.FIGMA_API_KEY`). MCP server not loaded in-session; curl is the path.
  - Figma parse helpers + reference renders live in `figma/` (not for prod).
- **Boilerplate**: https://github.com/pandaprofit/nextjs-boilerplate
- **Repo**: https://github.com/sitl-idnm/chaika.git (branch `main`; standalone
  git repo nested inside the workspace — `.env.local` gitignored, `figma/`
  helpers gitignored)
- **Started**: 2026-07-06 · **v2 revisions**: 2026-07-08
- **Overall status**: ✅ Done (v2 — client review fixes + modals/pages/cookie)
- **Revisions checklist**: `REVISIONS.md` (all 10 groups closed)
- **Stack**: Next.js 14 (App Router) · SCSS modules · Inter Tight + Arsenal · Jotai
- **v2 additions**: booking/event modals (`src/components/modal`, Jotai `modalAtom`
  + `ModalHost` in layout), cookie banner (`src/components/cookie`),
  `/privacy` page, `app/not-found.tsx` (404). Content pulled from Figma.

---

## Design Tokens (verbatim from `reference/tokens/`)

### Colors
| CSS Variable | Value | Usage |
|---|---|---|
| `--green-main` | `rgb(53,92,75)` | brand / panels / headings / strokes |
| `--green-100/200/400/600/800` | green @ 0.1–0.8 alpha | tints |
| `--orange-main` | `rgb(217,107,43)` | primary CTA / accent |
| `--orange-active` | `rgb(205,90,24)` | pressed CTA |
| `--orange-800` | orange @ 0.8 | CTA hover |
| `--light-main` | `rgb(240,240,240)` | page bg / on-dark text |
| `--light-200/400/600/800` | light @ alpha | on-dark muted / hairlines |
| `--surface-card` | `rgb(244,244,244)` | route pill bg |
| `--white-100` | `rgb(247,247,247)` | contact buttons bg |
| `--dark-main` | `rgb(21,21,21)` | body text |
| `--dark-800/600` | dark @ alpha | secondary text |
| `--ink` | `rgb(15,15,15)` | headings |

### Typography
- **UI/headings/body**: Inter Tight (400/500/600/700) — `--font-ui`
- **Logotype + hero title**: Arsenal (400/700) — `--font-logo`
- Both loaded via `next/font/google` (cyrillic + latin), vars
  `--font-inter-tight` / `--font-arsenal`.
- Scale: hero 48 (mobile 32) · section-title 40 (→32→26) · panel h3 32 ·
  h3 24 · body 20/18/16 · caption 14 · buttons 18.
- Line-height: headings 1.0–1.1, running text 1.15–1.3.

### Spacing (x1–x10)
`4 · 6 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 88`

### Radii
input/small `8` · button `12` · card `16`/`24` · chip/pill `100`/`160` · panel `48`

### Layout / Breakpoints
- Container: `max-width 1312px`, gutters `64` → `24` (≤900) → `12` (≤560)
- Breakpoints: **tablet ≤900px**, **mobile ≤560px** (in `variables.scss`)

---

## Pages

### / (Home) — section order
1. Header (`src/modules/header`)
2. Hero (`src/views/home/sections/hero`)
3. Care — «Парк, где заботятся…» (`.../care`)
4. Tracks — «4 трассы» + price table + trail maps + Батут (`.../tracks`)
5. Hammock banner (`.../hammock`)
6. Party — tabs + kids photo (`.../party`)
7. Safety — chips + booking form + contacts + reviews stub (`.../safety`)
8. Footer (`src/modules/footer`)

---

## Component Registry

| Component | Type | Status | File Path |
|-----------|------|--------|-----------|
| Header (nav, route pill, contacts, burger + mobile menu) | module | ✅ Done | `src/modules/header/` |
| Footer | module | ✅ Done | `src/modules/footer/` |
| Hero | section | ✅ Done | `src/views/home/sections/hero/` |
| Care | section | ✅ Done | `.../sections/care/` |
| Tracks (+ price table, trail maps, trampoline) | section | ✅ Done | `.../sections/tracks/` |
| Hammock banner | section | ✅ Done | `.../sections/hammock/` |
| Party (tabs state) | section | ✅ Done | `.../sections/party/` |
| Safety (booking form state) | section | ✅ Done | `.../sections/safety/` |
| Button (orange/light) | ui | ✅ Done | `src/ui/button/` |
| Icon (masked Tilda icons) | ui | ✅ Done | `src/ui/icon/` |
| Logo (+ shared LogoDefs) | ui | ✅ Done | `src/ui/logo/` |
| Glyph (stroke SVGs) | ui | ✅ Done | `src/ui/glyph/` |
| Dropdown (custom select, event modal) | form | ✅ Done | `src/components/form/Dropdown.tsx` |
| Rules page (`/rules`, Figma 211:1692) | page | ✅ Done | `src/app/rules/` |

---

## Interactions (implemented)
- **Party tabs**: `activeTab` state (`birthday | graduation | corporate`);
  visual highlight only (content is shared, per handoff).
- **Forms (3)** — Safety inline + BookingModal + EventModal. All share:
  controlled state, RU phone mask, validation (`canSubmit` = name + full
  phone + consent), loading/error states, real submit → `POST /api/lead`,
  then success panel / ThanksBody. See "Forms, Submission & Analytics" below.
- **Mobile menu**: `menuOpen` burger reveals a dropdown nav ≤900px.
- **Smooth scroll**: `html { scroll-behavior:smooth }`; nav anchors
  `#tracks / #safety / #party`.

---

## Forms, Submission & Analytics (added 2026-07-08)

### Phone mask
- `src/shared/lib/phone.ts` — `formatRuPhone` (idempotent, hard RU mask
  `+7 (999) 999-99-99`), `isCompleteRuPhone` (11 digits), `phoneDigits`.
- `src/components/form/PhoneInput.tsx` — controlled masked `<input>` reused by
  all three forms (inherits existing `.field input` SCSS, no new styles).

### Submission → Telegram
- `src/shared/lib/leads.ts` — `submitLead(payload)` client fn → `POST /api/lead`
  (adds `page` + `referrer`). Returns `{ ok, error? }`.
- `src/app/api/lead/route.ts` — validates (name + 11-digit phone), formats an
  HTML message and calls Telegram `sendMessage`. **Graceful degradation**: if
  `TELEGRAM_BOT_TOKEN`/`TELEGRAM_CHAT_ID` are unset it logs a warning and still
  returns `{ ok:true, delivered:false }` so the UI works pre-config.
- **Env**: secrets in `.env.local` (gitignored) — see `.env.example`. Client
  never sees the token (server route only).

### Yandex.Metrika (counter `110512444`)
- `src/components/analytics/YandexMetrika.tsx` — injects counter via
  `next/script` (id from `NEXT_PUBLIC_YM_ID`, set in committed `.env`),
  clickmap + webvisor on. Mounted in `layout.tsx`. Renders nothing if id is 0.
- `src/shared/lib/metrika.ts` — `YM_ID`, typed `GOALS` map, `ymGoal(target,
  params?)` (safe no-op on server / before load), `window.ym` typing.
- `src/components/analytics/TrackedLink.tsx` — client `<a>` firing a goal on
  click; lets the **server** Footer track contact clicks without going client.
- **Goals fired**:
  | Goal | Where |
  |------|-------|
  | `open_booking_modal` / `open_event_modal` | CtaButton (every CTA) |
  | `submit_booking` / `submit_event` / `submit_safety` | on successful send |
  | `submit_error` (param `form`) | send failure |
  | `click_phone` / `click_telegram` / `click_vk` (param `place`) | header, footer, safety, thanks |
  | `cookie_accept` | cookie banner |
- **Goal registration**: `scripts/create-ym-goals.mjs` creates all goals in the
  counter via the Management API (`YM_OAUTH_TOKEN` env, scope `metrika:write`) —
  no manual dashboard work. reachGoal goals are type `action`.

### Contacts (single source)
- `src/shared/const/contacts.ts` — phone `+7 926 242-06-08`, VK
  `vk.com/chaika_park`, Telegram `telegram.me/chaika_park` (switched from `t.me`
  after the domain was placed on registry serverHold on 2026-07-13), site
  `chaikapark.ru`, Yandex
  maps org. Wired into header/footer/safety/thanks (external links `_blank`).
- **Telegram creds** (`.env.local`) filled + verified live (bot
  `@ropeparkchaika_bot`, chat `-1004317842742`).

### Sticky header
- `header.module.scss .root` → `position: sticky; top:0; z-index:50`. Required
  changing `body` `overflow-x: hidden` → `clip` in `global.scss` (hidden traps
  sticky in a scroll container).

---

## Assets (`public/`)
| Asset | Local Path | Notes |
|-------|-----------|-------|
| hero background (responsive) | `public/images/hero-{desktop,tablet,mobile}.jpg` | per-breakpoint crops from Figma imageTransform (180/118/91 KB); old 14 MB hero.png removed |
| party photo | `public/images/kids.png` | real photo (1371×1148) |
| trail schemes ×4 | `public/icons/trail-*.svg` | `<img>`, height 200px |
| Tilda icons ×6 | `public/icons/icon-*.svg` | CSS-mask (monochrome under currentColor) |

---

## Implementation Notes
- **Not from Figma** — built from the HTML/CSS handoff reference. All values
  transcribed verbatim from `reference/page.css` + `reference/tokens/`.
- **Icons**: Tilda icons applied as CSS `mask` → monochrome (matches the hifi
  reference). If the two-color originals are ever wanted, swap to `<img>`.
- **UI glyphs** (phone/telegram/map-pin/paper-plane/clock): inlined as stroke
  SVGs in `src/ui/glyph` (handoff suggested Phosphor as an alternative).
- **Logo**: SVG reconstruction (no source file). Shared `<defs>` (`#ropeSeg`,
  `#breve`) rendered once via `<LogoDefs/>` in `layout.tsx`; `<Logo/>` `<use>`s them.
- **⚠️ Price-table numbers** (вес/высота/протяжённость) are partly placeholder
  in the source — verify with the client before production (per handoff README).
- **Reviews block** (Safety) & **map** (footer) now embed real Yandex.Maps
  widgets for org `193894342382` — `src/components/widgets/` (`ReviewsWidget`,
  `YandexMap`). Route links (header/footer) point to the org maps URL.
- Boilerplate scaling `Provider` was simplified to a plain Jotai provider
  (its zoom-scaling conflicts with the media-query responsive design).
- Fonts: mapped `--font-ui`/`--font-logo` to the next/font vars — no circular
  redefinition of `--font-inter-tight`/`--font-arsenal` in `:root`.

---

## Verification Log
| Check | Result |
|-------|--------|
| `yarn build` | ✅ compiles, types + lint pass |
| Computed fonts (Playwright) | ✅ body=Inter Tight, hero/logo=Arsenal (no Times New Roman) |
| Desktop / tablet / mobile screenshots | ✅ match reference; burger + single-column on mobile |
| Assets load | ✅ hero bg, kids.png, 4 trail SVGs, masked icons |
