---
name: Puzzie
description: A little puzzle for your brain.
colors:
  paper: "#f3eee5"
  surface: "#fffdf8"
  ink: "#17252c"
  ink-muted: "#617077"
  line: "#d5ccc0"
  coral: "#e9655e"
  coral-dark: "#b94d49"
  mint: "#dcebe3"
  mint-dark: "#2d7165"
  sun: "#f3ce79"
  lavender: "#e9e4f3"
  blue: "#dcebf1"
typography:
  display:
    fontFamily: "Space Grotesk, Avenir Next, sans-serif"
    fontSize: "clamp(3.4rem, 9vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  body:
    fontFamily: "DM Sans, Avenir Next, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "DM Sans, Avenir Next, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 800
    letterSpacing: "0.14em"
rounded:
  none: "0px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "#fffaf7"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "48px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "48px"
  surface-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.none}"
    padding: "20px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 15px"
    height: "52px"
  badge:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "4px 10px"

# Design System: Puzzie

## Overview

**Creative North Star: "The Puzzle Desk"**

Puzzie feels like a well-made puzzle sheet laid out on a warm desk: direct, tactile, and inviting without being childish. The system uses a warm paper ground, dark ink, a coral action colour, and small blocks of mint, sun, lavender, and blue to distinguish puzzle types and progress states.

The visual language is crisp and editorial. Strong alignment, square corners, one-pixel borders, and flat colour fields establish hierarchy without relying on shadows or decorative effects. Purposeful motion makes the puzzle sheet feel handled: a featured tile settles into place, navigation maintains continuity, and feedback responds directly to the action that caused it.

**Key Characteristics:**

- Square-corner geometry with clear borders.
- Warm paper surfaces with dark ink contrast.
- Distinctive Space Grotesk display type paired with readable DM Sans body copy.
- Flat colour accents with border-led, shadow-free depth.
- CSS-only motion that explains arrival, selection, feedback, and completion.

**The Puzzle-in-Hand Rule.** Motion should feel like arranging paper pieces on a desk: short, direct, and tied to a meaningful state change.

## Colors

The palette is warm, high-contrast, and functional: coral calls for action, dark ink anchors the interface, and tonal accents classify puzzles and progress.

### Primary

- **Coral action** (`{colors.coral}`): Primary actions, positive emphasis, and the active visual spark.
- **Deep coral** (`{colors.coral-dark}`): Action borders, eyebrow labels, and darker coral text.

### Secondary

- **Mint** (`{colors.mint}`): Streaks, success states, and calm puzzle surfaces.
- **Sun** (`{colors.sun}`): Score and high-energy number or word moments.
- **Lavender** (`{colors.lavender}`): Secondary progress and category variation.
- **Blue** (`{colors.blue}`): Number and visual puzzle surfaces.

### Neutral

- **Warm paper** (`{colors.paper}`): Global page background.
- **Soft surface** (`{colors.surface}`): Cards, controls, and readable content planes.
- **Dark ink** (`{colors.ink}`): Primary text and dark featured surfaces.
- **Ink muted** (`{colors.ink-muted}`): Supporting text and metadata.
- **Desk line** (`{colors.line}`): Dividers and quiet borders.

### Named Rules

**The Signal Colour Rule.** Coral is reserved for actions and meaningful emphasis; do not turn every surface into an accent.

## Typography

**Display Font:** Space Grotesk (with Avenir Next, sans-serif fallback)
**Body Font:** DM Sans (with Avenir Next, sans-serif fallback)
**Label/Mono Font:** System monospace only for codes and puzzle measurements.

**Character:** Space Grotesk gives the product a sharp, curious voice for headlines and puzzle marks. DM Sans keeps instructions, metadata, and game feedback calm and easy to scan.

### Hierarchy

- **Display** (600, `clamp(3.4rem, 9vw, 6rem)`, `0.9`): Home statement and major page titles.
- **Headline** (600, `2.25rem–3rem`, tight leading): Section titles and puzzle names.
- **Title** (600, `1.25rem–1.5rem`): Card titles and question prompts.
- **Body** (400–500, `1rem`, `1.5`, 45–75ch): Explanations, descriptions, and feedback.
- **Label** (800, `0.72rem`, `0.14em`, uppercase): Category labels, state labels, and compact metadata.

### Named Rules

**The Two-Voice Rule.** Space Grotesk carries hierarchy and personality; DM Sans carries reading and interaction. Do not add another family without a role the two cannot perform.

## Layout

Pages use a centred container up to 1180px wide with 40px outer gutters on larger screens and 28px gutters below 640px. The home screen pairs a large statement with a featured daily puzzle, then moves into compact stats, recommended puzzles, category links, and a final progress prompt. Puzzle play uses a narrower 800px reading column so the question and controls stay close together.

Spacing follows a compact 4/8/16/24/32/48px rhythm. Dense controls remain touch-friendly at 44–56px minimum heights. Responsive grids collapse to a single column on small screens and keep the primary action visible before secondary exploration.

## Elevation & Depth

Depth is tonal and structural. Warm surface blocks, dark featured planes, accent fills, borders, spacing, and controlled overlap establish the layer order; the system uses no shadows. Motion may clarify an arriving or changing layer, but it never substitutes for readable static hierarchy.

### Named Rules

**The Flat Desk Rule.** Use borders, contrast, spacing, and overlap for depth. Do not add shadows, gradients, glass, or blur.

## Shapes

Every interface surface has square corners (`0px`). Borders are thin and deliberate, with no pill-shaped controls or rounded cards. Decorative geometry may rotate, but the underlying forms stay rectangular and legible.

## Components

### Buttons

- **Shape:** Square corners (`0px`), 48px minimum height.
- **Primary:** Coral fill with a deep coral border.
- **Hover / Focus:** A short colour transition confirms hover; press feedback moves the control by one pixel, and keyboard focus uses a clear coral ring.
- **Secondary / Ghost:** Ink outline or transparent quiet action; hover changes the surface colour rather than changing shape.

### Chips

- **Style:** Square label blocks with flat mint, sun, lavender, or coral-tinted backgrounds.
- **State:** Selected filters use dark ink fill with warm surface text; unselected filters use a quiet border.

### Cards / Containers

- **Corner Style:** Square (`0px`).
- **Background:** Warm surface or one of the functional accent colours.
- **Shadow Strategy:** None; contrast and one-pixel borders separate surfaces.
- **Border:** One-pixel desk line, dark ink for hero and completion surfaces.
- **Internal Padding:** 16–32px depending on density.

### Inputs / Fields

- **Style:** Square, one-pixel desk line, soft surface background, 52px minimum height.
- **Focus:** Coral border with a restrained translucent focus ring.
- **Error / Disabled:** Error uses a coral-tinted surface and explicit feedback; disabled controls reduce opacity and remain still.

### Navigation

The header is a quiet paper strip with a thin divider. Active navigation uses a flat surface block. Desktop navigation is inline; mobile navigation expands beneath the header with a short directional transition.

### Puzzle Marks

TypeGlyph provides a compact, colour-coded square mark for each puzzle family. The mark uses display type plus a small SVG icon so categories remain scannable without relying on colour alone.

### Motion & Feedback

- **Focal entrance:** Home copy uncovers over 560ms while the featured puzzle settles over 680ms using confident exponential deceleration.
- **Routine continuity:** Route and mobile-menu changes complete within 240–360ms.
- **State feedback:** Hints, validation outcomes, selections, and completion results respond within 120–520ms according to consequence.
- **Reduced motion:** Spatial transforms and clipping are removed; brief opacity and colour feedback remain so state changes are still legible.

## Do's and Don'ts

### Do:

- **Do** keep all UI corners square and consistent.
- **Do** use Space Grotesk for display roles and DM Sans for reading roles.
- **Do** keep body copy readable and limit prose to a comfortable measure.
- **Do** use flat colour fields, borders, spacing, and overlap to create hierarchy.
- **Do** reserve authored motion for navigation, state feedback, completion, and the featured home puzzle.
- **Do** keep success, error, disabled, and focus states explicit and accessible.

### Don't:

- **Don't** reintroduce rounded cards, pills, or shadows.
- **Don't** use gradients, glass effects, decorative blur, or looping ornamental motion.
- **Don't** animate layout dimensions when a transform can communicate the same relationship.
- **Don't** use colour alone to communicate puzzle state.
- **Don't** substitute emoji or arbitrary glyphs for the existing SVG icon language.
- **Don't** add display font weights that are not loaded through `next/font`.
