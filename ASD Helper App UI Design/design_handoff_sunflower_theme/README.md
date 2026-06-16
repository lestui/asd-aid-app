# Handoff: ASD Helper Guide — Sunflower Lanyard theme

## Overview
A calm visual re-skin of the **ASD Helper Guide** web app (the existing
React + Vite app in `lestui/asd-aid-app`). It re-themes the whole product in
the official **Hidden Disabilities Sunflower** lanyard colours — a calming
**leaf green** primary with a **sunflower gold** accent — replacing the current
soft-blue / warm-orange palette. The information architecture, screens, copy,
and logic are unchanged; this is a styling + identity pass.

## About the design files
The file in this bundle — **`ASD Helper Guide.dc.html`** — is a **design
reference**, not production code. It is a self-contained HTML prototype that
shows the intended look, palette, type, spacing, and interactions for every
screen. **Do not ship the HTML.** Recreate its look inside the existing
React/Vite codebase using that app's established patterns (component files +
`App.css` + CSS variables in `index.css`).

Because the prototype was rebuilt to mirror your real data (`flows.js`,
`furtherReading.js`) and component structure, almost everything maps 1:1 to
existing components.

## Fidelity
**High-fidelity.** Final colours, typography, spacing, radii, shadows, and
interactions are all specified. Recreate pixel-for-pixel using the codebase's
existing components — most of it is achieved by swapping CSS-variable values.

---

## The fastest path (recommended)
Your app already drives its styling from CSS custom properties in
`src/index.css` and consumes them throughout `src/App.css`. So:

1. **Replace the `:root` block in `src/index.css`** with the values in
   **`tokens.css`** (included). Same variable *names*, new *values*.
2. **Patch ~6 hardcoded hex/rgba spots in `src/App.css`** (blue shadows,
   the orange urgent-note / evidence-pill / delete-button, and the gold
   primary-action text). Exact find/replace list is at the bottom of
   `tokens.css`.
3. **Swap the font** from Inter to **Hanken Grotesk** (add the Google Fonts
   `@import`/`<link>`; the `font-family` is already in `tokens.css`).
4. **Replace the logo asset** `public/asd-helper-guide-logo.svg` with the new
   sunflower mark in `assets/` (and add a favicon — see Assets).

That alone re-skins Home, Flow, Result, Profile, Saved, Evidence, and Further
reading. The notes below cover the finer polish the prototype adds on top.

---

## Design tokens

### Colour
| Token (existing var)      | Old (blue/orange) | New (sunflower)   | Used for |
|---------------------------|-------------------|-------------------|----------|
| `--color-primary`         | `#2f6f9e`         | **`#2e7a48`**     | Primary actions, labels, links, icons |
| `--color-primary-soft`    | `#4d89b8`         | **`#4f9b67`**     | Hover borders, focus rings |
| `--color-primary-pale`    | `#dcecf8`         | **`#e7f1e9`**     | Selected button, script bg, chips |
| `--color-primary-deep` *(new)* | —            | **`#1d5532`**     | Headings / strong green text |
| `--color-accent`          | `#e9904a`         | **`#f6c544`**     | Save/CTA bg, script left border |
| `--color-accent-deep` *(new)* | —             | **`#8a5f0c`**     | Gold text on pale gold (pills) |
| `--color-background`      | `#f6f8f4`         | **`#f1efe6`**     | App background (warm paper) |
| `--color-background-warm` | `#fff8f1`         | **`#f1f7f2`**     | Decision-panel surface (green tint) |
| `--color-surface`         | `#ffffff`         | `#ffffff`         | Cards, buttons |
| `--color-surface-soft`    | `#edf6fb`         | **`#e7f1e9`**     | Soft fills |
| `--color-card`            | `#fbfdf9`         | **`#f7faf5`**     | Result/saved/support cards |
| `--color-border`          | `#cddfea`         | **`#d3e4d7`**     | Inputs, secondary borders |
| `--color-border-soft`     | `#dce8ef`         | **`#e0ebe2`**     | Card borders |
| `--color-text`            | `#183247`         | **`#243029`**     | Body text |
| `--color-text-muted`      | `#4d6475`         | **`#5f6b62`**     | Secondary text |

Supporting literals used in the prototype:
- **Calm alert** (urgent-note): text `#6f3320`, bg `#fbece2`, border `#ecd0c0`,
  warning icon `#b85a35`. (Intentionally a gentle terracotta — never harsh red.)
- **Gold bright** (logo petals, progress fill, Save button): `#f6c544`;
  **gold mid** `#cf930f`; **seed centre** `#7a4f08`.
- **Green tint** surface: `#f1f7f2`; **green pale**: `#e7f1e9`.

### Shadows
- Soft: `0 1.1rem 2.6rem rgba(29, 85, 50, 0.12)`
- Card / button rest: `0 6px 16px rgba(29, 85, 50, 0.07)`
- Button hover lift: `0 16px 30px rgba(29, 85, 50, 0.12)`

### Radii
- Cards / panels: `1.25rem` (`--radius-card`, unchanged)
- Controls / inputs: `1rem` (`--radius-control`, unchanged)
- Pills / chips / progress bar: `999px`

### Type — Hanken Grotesk
Weights 400/500/600/700/800.
- App title (`h1`): 800, ~20–34px responsive, letter-spacing −0.01em
- Screen heading (`h2`): 800, 23–25px, letter-spacing −0.02em, line-height ~1.15
- Section heading (`h3`): 800, 15px, colour `--color-primary-deep`
- Eyebrow / section labels: 700, 11–12px, uppercase, letter-spacing 0.08–0.13em,
  colour `--color-primary`
- Body: 400–600, 13–15px, line-height 1.5
- Buttons: 700–800

### Spacing
8px base rhythm. Card padding 18px; panel gaps 14–20px; list gaps 9–11px.

---

## Screens / views
All seven already exist as components. Notes are the design deltas on top of the
token swap.

### 1. App header (all screens)
- Sunflower mark (46px green rounded square, `border-radius:15px`) + a
  two-line wordmark: eyebrow **"SUNFLOWER SUPPORT"** (green, uppercase) over
  **"ASD Helper Guide"** (`--color-primary-deep`, 800).
- In the current app the logo sits centred in a hero (`App.jsx`). Either keep
  that, or move to this compact left-aligned bar — both work with the new asset.

### 2. Home (`HomeScreen.jsx`)
- **Heading:** "What is happening right now?" + muted sub-line.
- **Situation cards** (the 4 `situations`): full-width rows, not the current
  2-col grid — `display:flex; align-items:center; gap:14px`, white surface,
  `1.5px` `--color-border` border, `--radius-control`, rest shadow. Each row =
  46px green-pale icon tile (line icon, `--color-primary-deep`) + title (16px/700)
  + one-line muted hint + a green chevron. Hover: border → `--color-primary`,
  `translateY(-2px)`, deeper shadow.
  - Hints: Sensory = "Big distress, overwhelm, hard to cope" · Communication =
    "Words are hard, not answering, frustrated" · School = "Refusing, clinging,
    after-school crash" · Body = "Calm, private, practical body-care support".
- **"Keep close"** quick links (2×2): profile / saved / evidence / reading —
  green-tint tiles with a small white icon chip.
- **"Guide areas"** (2-col): the 8 cards, each a gold-pale icon chip + title +
  short blurb (kept from the brief).
- **Further reading** preview: first 3 items + "View all".
- Privacy + disclaimer notes retained.

### 3. Guided flow (`FlowScreen.jsx`)
- Top row: flow label (green uppercase) + "Step N of M".
- **Progress bar** (new): 8px track `--color-primary-pale`, fill is a gold
  gradient `linear-gradient(90deg, #cf930f, #f6c544)`, width = `(step+1)/total`,
  `transition: width .35s ease`.
- Question `h2`; option list = full-width buttons (white, `1.5px` border,
  15.5px/600, green chevron). Selecting advances; last step → Result.
- "Back to start" pill (top-left) resets to Home.

### 4. Result (`ResultScreen.jsx`)
- Flow label + result heading.
- **Alert** (only when an alert answer was chosen): calm terracotta panel
  (see tokens) with a triangle icon — replaces the current `.urgent-note`.
- **Scripts:** gold-bordered quote cards (`border-left:4px #f6c544`, gold-pale
  bg) under a "Gentle words you can use" label.
- **Result sections:** green-tint cards, `h3` in `--color-primary-deep`, bullet
  lists with a 6px green dot per item.
- **"Your answers":** collapsed into a `<details>` accordion (tidier than the
  always-open summary).
- **Save:** full-width **gold** pill (`#f6c544`, dark text `#3c2c05`) with a
  bookmark icon → writes to `localStorage` (`asd-aid-saved-strategies`).

### 5. Child profile (`ChildProfileScreen.jsx`)
- Same 6 fields; inputs use green-tint bg, `--color-border`, focus → green
  border + white bg. Added placeholders (e.g. nickname "What you call them",
  age "e.g. 7", triggers "Noise, transitions, hunger…"). Save = green pill.

### 6. Saved strategies (`SavedStrategiesScreen.jsx`)
- Cards: title (`--color-primary-deep`) + "Saved {date}" stacked in a
  `flex-direction:column; gap:4px` block (prevents title/date collision),
  section chips (green-pale, `white-space:nowrap`), and a terracotta "Remove"
  pill. Friendly empty state with a bookmark glyph + "Start a guide".

### 7. Evidence-informed supports (`EvidenceSupportScreen.jsx`)
- Educational disclaimer in a green-tint note.
- Search field with a leading magnifier icon.
- **Category filter as chips** (instead of a `<select>`): active chip = solid
  green / white text; inactive = white / green text, green border;
  `white-space:nowrap`. "Showing N of M" count.
- Support cards: category label, title, gold support-level pill, Situation /
  Caregiver goal lines, and three colour-coded lists — **Try first** (green
  bullets), **Avoid** (terracotta bullets), **When to seek help** (gold bullets).

### 8. Further reading (`FurtherReadingScreen.jsx`)
- Cards: category eyebrow (green) + source-type chip (green-pale) on one row,
  then title, author (`--color-primary-deep`), and summary.

---

## Interactions & behaviour
- **Navigation:** single-view state machine (Home ↔ flow ↔ result, plus
  profile/saved/evidence/reading) — exactly the current `currentView` model in
  `App.jsx`. "Back to start" resets step/answers.
- **Flow:** choosing an option records the answer and advances; final step
  routes to Result. Alert appears if any answer equals the flow's `alertAnswer`.
- **Hover:** cards/buttons lift `translateY(-1px→-2px)`, border → green, shadow
  deepens (~160ms ease).
- **Progress bar:** animates width 350ms ease.
- **Entrance:** main card fades/rises in 400ms (cosmetic; optional).
- **Persistence:** profile and saved strategies in `localStorage`
  (`asd-aid-child-profile`, `asd-aid-saved-strategies`) — already implemented.
- **Responsive:** mobile-first single column, max width ~468px centred; the
  existing `@media (min-width: 44rem)` rules in `App.css` still apply.

## State management
No change from the current app. State variables: `currentView`, `currentStep`,
`answers`, `activeFlowKey`, `profile`, `savedStrategies`, plus evidence-screen
`searchTerm` / `activeCategory`. All data comes from `src/data/*`.

## Assets
- **`assets/asd-helper-guide-icon.svg`** — icon-only sunflower mark (green
  rounded square + 10 gold petals + seed centre). Use for the favicon
  (`public/`, reference from `index.html`) and anywhere a compact mark is needed.
- **`assets/asd-helper-guide-logo.svg`** — full horizontal logo (mark +
  "SUNFLOWER SUPPORT / ASD Helper Guide" wordmark). Drop in as
  `public/asd-helper-guide-logo.svg` to replace the current brand logo that
  `App.jsx` references. *(The wordmark is set in Hanken Grotesk; if you need it
  perfectly crisp without the font installed, keep rendering the title as HTML
  text and use the icon-only mark in the header.)*
- **Line icons** in the prototype (situation/guide/quick-link glyphs) are simple
  stroke SVGs (1.9px, round caps). Recreate as small inline SVGs or your icon
  component; colours: `--color-primary-deep` on green-pale, `--color-accent-deep`
  on gold-pale.
- **`HelperIllustration.jsx`** (existing): retune its palette to green primary +
  small gold accents to match. No puzzle pieces (per brand brief).

## Brand rules (from the project's design brief)
- Green is the dominant colour; **gold is an accent only** — keep contrast
  accessible (gold always carries dark or deep-gold text, never gold-on-white).
- No puzzle pieces, no medical-cross symbols, no harsh red. Alerts stay calm.

## Files
- `ASD Helper Guide.dc.html` — the full interactive design reference (open in a
  browser to click through every screen and state).
- `tokens.css` — drop-in `:root` values + the `App.css` find/replace list.
- `assets/asd-helper-guide-icon.svg` — favicon / app mark.
- `assets/asd-helper-guide-logo.svg` — full horizontal logo.

### Target files to edit in `lestui/asd-aid-app`
- `src/index.css` — replace `:root` (use `tokens.css`), update `body` gradient.
- `src/App.css` — patch the ~6 hardcoded hex/rgba spots (list in `tokens.css`).
- `index.html` — add the Hanken Grotesk `<link>`; point favicon at the new icon.
- `public/asd-helper-guide-logo.svg` — replace with the new logo.
- Component polish (optional, per "Screens" above): `HomeScreen.jsx` (card
  layout), `FlowScreen.jsx` (progress bar), `ResultScreen.jsx` (`<details>`
  answers), `EvidenceSupportScreen.jsx` (category chips),
  `HelperIllustration.jsx` (recolour).
