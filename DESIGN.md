---
name: The AI-Native Marketing Handbook
description: A field-guide handbook site teaching the Intelligent Marketing Operating System (I-MOS), in warm editorial paper tones with two rationed accents.
colors:
  paper: "oklch(0.971 0.006 84.6)"
  surface: "oklch(0.946 0.008 91.5)"
  rule: "oklch(0.883 0.015 84.6)"
  ink: "oklch(0.183 0.007 78.1)"
  ink-soft: "oklch(0.335 0.012 78.2)"
  muted: "oklch(0.520 0.017 80.7)"
  ember: "oklch(0.553 0.174 38.4)"
  ember-deep: "oklch(0.470 0.143 37.3)"
  pine: "oklch(0.470 0.125 192.0)"
  pine-deep: "oklch(0.400 0.105 192.0)"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 8vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "2.125rem"
    fontWeight: 700
    lineHeight: 1.15
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Switzer, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.7rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.22em"
rounded:
  sm: "2px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.paper}"
    typography: "{typography.title}"
    rounded: "{rounded.xl}"
    padding: "0 24px"
  button-primary-hover:
    backgroundColor: "{colors.ember-deep}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  chip-hover:
    textColor: "{colors.ember-deep}"
  card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.xl}"
    padding: "20px"
---

# Design System: The AI-Native Marketing Handbook

## Overview

**Creative North Star: "The Annotated Ledger"**

This is a working reference document, not a marketing site pretending to teach — the visual language of a well-kept field notebook: warm paper, hairline rules, mono-set labels standing in for margin notes, and exactly two colors of ink used on purpose. Ember marks consequence — a risk, a stake, a claim being asserted, a fabricated figure that needs flagging. Pine marks construction — sequence, structure, formulas, the mechanical parts of a system. Neither is decoration; hierarchy comes from type weight, spacing, and hairline rules first, color only when something specifically needs it. Both accents are deliberately rationed: most components use neither.

The system is flat by design — no shadows, no gradients, no glass. Depth comes from a single elevated surface tone (`surface`, barely darker than `paper`) and hairline borders, never from blur or offset. One custom shape carries the whole personality: a rounded rectangle with one corner squared off (`rounded-xl rounded-bl-none rounded-tr-none`), used only on the site's primary calls-to-action — a single confident, faintly architectural gesture repeated nowhere else, so it stays legible as "this is the one to click."

**Key Characteristics:**
- Warm, near-white paper background — never pure white, never dark mode
- Two rationed accent hues (burnt ember, ledger pine), each with a fixed semantic job
- Bricolage Grotesque display type paired with Switzer body copy and Geist Mono for every label/kicker/rail
- Flat surfaces, hairline `rule` borders, zero shadows
- One signature cut-corner shape, reserved for primary CTAs only
- Decorative background curves ("swooshes") at 4% ember opacity — texture, never a competing color

## Colors

Two accents, each rationed to a specific job; everything else is ink, paper, and hairlines.

### Primary
- **Burnt Ember** (`oklch(0.553 0.174 38.4)` / ≈ `#C2410C`): the consequence color — risk, stakes, an asserted claim, a fabricated figure that needs flagging. Rare by design; most screens use it once, if at all (primary CTA fill, decorative background swooshes, small-text links via the AA-safe deep variant).
- **Deep Ember** (`oklch(0.470 0.143 37.3)` / ≈ `#9A3412`): the AA-safe variant for small accent text and hover states — `ember` itself fails AA at body-text size on `surface`.

### Secondary
- **Ledger Pine** (`oklch(0.470 0.125 192.0)` / ≈ `#006F6D`): the construction color — sequence, structure, formulas, mono rails, numerals, markers. Never appears as inline prose text or a link (that role belongs to ember-deep only, so a second dark accent in running text never gets mistaken for a link). A deliberately desaturated, green-shifted teal — chosen specifically to avoid reading as generic SaaS-dashboard blue against this warm palette, and to sit on the opposite pole of the blue-yellow confusion axis from ember for colorblind-safe pairing.
- **Deep Pine** (`oklch(0.400 0.105 192.0)` / ≈ `#005856`): the AA-safe variant for small pine-colored text.

### Neutral
- **Warm Paper** (`oklch(0.971 0.006 84.6)` / ≈ `#F7F5F1`): the page background, everywhere, always. Never pure white.
- **Raised Surface** (`oklch(0.946 0.008 91.5)` / ≈ `#EFEDE7`): the one elevated tone — chips, tinted callouts, code/quote blocks. The entire depth system.
- **Hairline Rule** (`oklch(0.883 0.015 84.6)` / ≈ `#DDD8CE`): every border in the system. No border is ever a stronger color than this.
- **Ink** (`oklch(0.183 0.007 78.1)` / ≈ `#14120F`): headings.
- **Soft Ink** (`oklch(0.335 0.012 78.2)` / ≈ `#3A3630`): body text.
- **Muted** (`oklch(0.520 0.017 80.7)` / ≈ `#6E685E`): captions and meta text only — never body copy.

### Named Rules
**The One-Job Rule.** Ember means consequence, pine means construction. A color never gets reused for its "other" meaning just because a screen needs another accent — reach for weight or spacing instead.

**The Never-Alone Rule.** Ember and pine are never the sole difference between two things a reader has to tell apart. Always pair color with position, an icon, or a text label — colorblind-safe by construction, not by luck.

## Typography

**Display Font:** Bricolage Grotesque (with system-ui, sans-serif fallback)
**Body Font:** Switzer (with system-ui, sans-serif fallback)
**Label/Mono Font:** Geist Mono (with ui-monospace, monospace fallback)

**Character:** A confident, slightly architectural grotesque for headings against a restrained humanist sans for reading copy — the display face carries the personality, the body face gets out of the way for long-form reading, and mono type marks anything that's metadata rather than prose.

### Hierarchy
- **Display** (800, `clamp(2.6rem, 8vw, 6rem)`, line-height 0.98, tracking -0.02em): the single hero headline per page — Home's title, nothing else.
- **Display-lg** (800, `clamp(1.9rem, 5vw, 3.25rem)`, line-height 1.02): secondary large headlines, one step down from Display.
- **Headline / h2** (700, 2.125rem, line-height 1.15): section-level headings.
- **h3** (700, 1.6875rem, line-height 1.25): sub-section headings.
- **Title / h4** (600, 1.3125rem, line-height 1.3): card and component titles, question sub-headlines.
- **Body** (400, 1.0625rem, line-height 1.65): running prose. Max measure 68ch (`max-w-prose`).
- **Label** (400, 0.7rem, letter-spacing 0.22em, uppercase, mono): the `.kicker` class — every eyebrow, rail label, and mono meta tag in the system.

### Named Rules
**The Mono-Meta Rule.** Anything that is metadata about the content — a kicker, a D-number, a provenance chip, a tab label — renders in Geist Mono, uppercase, wide-tracked. Anything that *is* the content renders in Bricolage Grotesque or Switzer. The typeface itself signals which kind of text a reader is looking at.

## Layout

Single-column editorial measure, capped at `max-w-5xl` for the content column, with prose text further capped at 68ch inside it so line length never runs away even on wide viewports. Desktop reserves a fixed 260px-wide sidebar (`md:pl-[260px]` on the content wrapper); mobile collapses to a header + slide-out drawer. Sections stack vertically with generous vertical rhythm (`gap-8` between major blocks); the system leans on whitespace and hairline rules for separation rather than boxed containers. One easing constant governs every authored motion: `cubic-bezier(.16,1,.3,1)` (`ease-out-expo`), applied once per view, not scattered across every element.

## Elevation & Depth

Flat by design — no shadows anywhere in the codebase. Depth is conveyed entirely through two mechanisms: a single raised neutral tone (`surface`, barely darker than `paper`) for anything that needs to read as "grouped," and hairline `rule` borders for anything that needs to read as "separated." There is no shadow vocabulary to catalogue because none exists; introducing one would break the flat-paper metaphor the whole system is built on.

### Named Rules
**The Flat-Paper Rule.** No `box-shadow` anywhere. If something needs to feel lifted, give it a `surface` fill and a `rule` border, not a shadow.

## Shapes

Two shapes cover the entire system. Everything not explicitly a chip or a card renders with square or lightly-rounded (`rounded-lg`/`rounded-xl`, 8–16px) corners and a 1px `rule` border where a boundary is needed. Pills (`rounded-full`) are reserved for small controls — chips, tags, prerequisite links. The one signature departure is the cut-corner shape (`rounded-xl` with the top-right and bottom-left corners squared to `rounded-tr-none`/`rounded-bl-none`) — used exclusively on the site's primary call-to-action buttons, nowhere else, so its irregularity stays a deliberate signal rather than becoming visual noise.

### Named Rules
**The One-Cut Rule.** The asymmetric cut-corner shape appears on primary CTAs only. The moment it shows up on a second component type, it stops meaning "click this" and starts meaning nothing.

## Components

### Buttons
- **Shape:** Cut-corner rounded rectangle (`rounded-xl`, top-right and bottom-left corners squared off — see The One-Cut Rule).
- **Primary:** `ember` background, `paper` text, Title-weight type, `px-6` horizontal padding, 44px minimum tap target.
- **Hover:** background shifts to `ember-deep`.
- **Secondary (inline text links):** no button chrome at all — `ember-deep` text with a 2px underline offset, decoration darkens to `ember-deep` on hover. The site otherwise has no ghost/tertiary button variant; a plain underlined link fills that role.

### Chips
- **Style:** `surface` background (or transparent with a `rule` border for prerequisite/nav chips), `ink-soft` text, fully rounded (`rounded-full`), small mono or body-weight type.
- **State:** hover shifts border and text to `ember-deep`. Provenance chips additionally carry an icon (link/graduation-cap/flask) so meaning never rests on color alone.

### Cards / Containers
- **Corner style:** `rounded-2xl` (16px) for tinted callouts, `rounded-xl` elsewhere.
- **Background:** `surface`, or `ember/5` for a "key"/"caution" tinted callout.
- **Shadow strategy:** none — see Elevation & Depth.
- **Border:** 1px `rule`, always present on a card that isn't tint-differentiated from its background.
- **Internal padding:** `p-5` (20px) is the standard card interior.

### Inputs / Fields
Not a data-entry site — no form inputs exist in the live component set beyond the command-palette search field, which uses the same flat/`rule`-bordered/`surface` treatment as everything else, with an `ember` focus-visible outline (see Do's and Don'ts).

### Navigation
Desktop: a fixed 260px sidebar, mono-set part/chapter labels, `ink-soft` default text shifting to `ink` + a `rule`-colored active-state background on the current page. Mobile: a slide-out drawer triggered from a fixed header, identical type treatment. Both share the same `⌘K` / `/` command-palette search trigger.

### Decorative Background Curves (signature component)
Full-bleed SVG bezier-curve washes (`Swoosh` component) sit behind a page's hero content at 4% `ember` opacity, `-z-10`, `aria-hidden`, `pointer-events-none`. Five distinct silhouettes rotate across pages (deterministic per-slug hash, not re-randomized on revisit). Pure geometry, one hue, never a gradient or a texture — the opacity is tuned low enough that it can never affect text contrast, verified at ≈10:1 for body text over the tinted background.

## Do's and Don'ts

### Do:
- **Do** keep ember and pine rare — most components use neither; color is the exception, not the default source of hierarchy.
- **Do** pair every color-coded distinction with an icon, label, or position, never color alone.
- **Do** use `ember-deep`/`pine-deep`, not the base hue, for any small-size text — the base hues fail AA at body size on `surface`.
- **Do** render every kicker, rail label, D-number, and meta tag in mono, uppercase, wide-tracked.
- **Do** use the cut-corner shape only on primary CTA buttons.
- **Do** keep decorative background curves at ≈4% opacity, single-hue, geometry only.

### Don't:
- **Don't** add a shadow anywhere. The system is flat; a shadow breaks the paper metaphor.
- **Don't** use pine as inline prose text or a link color — that's ember-deep's job; a second dark link-colored accent reads as a broken link.
- **Don't** introduce a second signature shape. The cut corner means "click this"; a second irregular shape dilutes it.
- **Don't** go dark mode. `color-scheme: light` is set explicitly at `:root`; this is a light-only system.
- **Don't** use pure white or pure black — `paper`/`ink` are both warm-tinted, and a true `#FFF`/`#000` reads as a foreign palette next to them.
