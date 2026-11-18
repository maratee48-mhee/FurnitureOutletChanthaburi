---
name: Furniture Outlet
description: Rooms first. An orbit of room cards around the logo; each card opens into its room.
colors:
  brand-red: "#e11a45"
  ink: "#1c1517"
  muted: "#75686b"
  hairline: "#ddd3d1"
  ground: "#f6f2ee"
  card: "#fcfaf8"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Archivo, 'Noto Sans Thai', system-ui, sans-serif"
    fontSize: "clamp(3rem, 10vw, 6rem)"
    fontWeight: 600
    lineHeight: 1.2
  headline:
    fontFamily: "Archivo, 'Noto Sans Thai', system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3.2vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.25
  title:
    fontFamily: "Archivo, 'Noto Sans Thai', system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.45
  price:
    fontFamily: "Archivo, 'Noto Sans Thai', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.2
    fontFeature: "tnum"
  body:
    fontFamily: "Archivo, 'Noto Sans Thai', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "Archivo, 'Noto Sans Thai', system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.14em"
  english-echo:
    fontFamily: "Archivo, 'Noto Sans Thai', system-ui, sans-serif"
    fontSize: "clamp(11px, 1.2vw, 14px)"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.32em"
    fontVariation: "'wdth' 125"
rounded:
  tag: "3px"
  card: "6px"
  pill: "999px"
  circle: "50%"
spacing:
  xs: "8px"
  bar: "14px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  gutter: "clamp(16px, 4vw, 48px)"
components:
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "14px 14px 16px"
  orbit-box:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    size: "120px"
  orbit-box-hover:
    size: "168px"
  chip:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "40px"
  chip-pressed:
    backgroundColor: "{colors.brand-red}"
    textColor: "{colors.white}"
  badge-discount:
    backgroundColor: "{colors.brand-red}"
    textColor: "{colors.white}"
    rounded: "{rounded.tag}"
    padding: "4px 8px"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.brand-red}"
    rounded: "{rounded.card}"
    padding: "0 24px"
    height: "48px"
  button-white-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  button-line:
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "0 24px"
    height: "48px"
---

# Design System: Furniture Outlet

## Overview

**Creative North Star: "The Showroom Orbit"**

The home is one screen: the red wordmark logo sits at the centre of a hairline ring, and the eight rooms orbit it as small pale cards. Hovering a card grows it and turns it over to show the room's detail; clicking it grows the card into the room itself. On the category page that card becomes a full-bleed photo hero (View Transition `room-hero`), and the product list below reuses the same card: pale fill, hairline border, 6px corners, red on hover.

The world is quiet, warm and exact. It uses one saturated colour, the logo red (#E11A45). Everything else is a narrow set of warm neutrals: a paper page, a lighter card, a hairline and near-black ink. Depth comes from the hairline border and a single soft, red-tinted lift that appears only on hover or focus. Photography brings the only warm colour, and only in the category hero and the product pictures.

Every piece of copy pairs Thai with English. Thai carries the meaning at full size, and English sits beside or below it as a small, wide, tracked uppercase line.

**Key Characteristics:**
- One accent, the brand red, used for state, prices, sale badges and the contact band.
- Pale cards (#F7F7F9) on grey (#EBEBEB), outlined with a 1px hairline and 6px corners.
- Archivo + Noto Sans Thai in one stack. English appears as a tracked uppercase echo of the Thai.
- Surfaces are flat at rest. They lift only in response to hover or focus.
- Motion settles and grows: cards expand, heroes morph, lines draw.

## Colors

The palette is warm neutrals plus one red taken straight from the logo.

### Primary
- **Brand Red** (brand-red): the brand's only colour. Used for hover and focus borders, focus outlines, pressed filter chips, prices, sale badges, the text of the orbit card's back face, `::selection`, and the full-width contact band, where it covers the page.

### Neutral
- **Night Ink** (ink): all primary text. Also the photo scrim, as `rgb(11 11 28)` at alpha 0.18 to 0.6, and the hover fill of the white button.
- **Slate Muted** (muted): secondary text, English echoes on light surfaces, struck-through prices, counts. It clears AA on the card surface. On the grey ground it measures about 4.45:1, so keep small text in this colour on card surfaces or make it darker.
- **Hairline** (hairline): 1px borders on cards, chips, the orbit ring and section dividers. Also the stroke colour of the room icon when a product image fails to load.
- **Showroom Grey** (ground): the page background, matched to the grey of the logo file.
- **Card White** (card): the fill for cards, chips, the empty state, and the hover state of the room links.
- **White** (white): product picture wells, type on photos and on red, and the white button. `--on-photo` holds the same value.

### Named Rules
**The One Red Rule.** Brand Red is the only chromatic colour the interface itself uses. A new state, tag or highlight uses red or a neutral, never a new hue.

**The Photo Scrim Rule.** White type sits on photos only over an ink scrim: a radial pool behind the title plus a linear top-and-bottom darkening, with a soft ink text-shadow on the display line. Gradients in this world are scrims, not decoration.

## Typography

**Display Font:** Archivo (variable, width 75 to 125), with Noto Sans Thai for Thai glyphs, falling back to system-ui
**Body Font:** the same stack

**Character:** a single grotesque. Archivo's expanded width (125%) and wide tracking mark the English lines. Thai is always set at normal width and with no tracking.

### Hierarchy
- **Display** (600, clamp(3rem, 10vw, 6rem), 1.2): the Thai room name at the centre of the category hero, balanced.
- **Headline** (600, clamp(1.5rem, 3.2vw, 2.25rem), 1.25): section heads such as "สินค้าทั้งหมด". The contact band uses a larger step (clamp(1.75rem, 4.4vw, 3rem)), and the next/previous room links use clamp(1.25rem, 3vw, 2rem).
- **Title** (500, 15px, 1.45): product names, clamped to two lines. The orbit card's back face uses 600 at 13px.
- **Price** (600, 1.125rem, 1.2, tabular numerals): in Brand Red. The struck-through original price sits beside it at 13px in muted.
- **Body** (400, 14px, 1.4): the default text.
- **Label** (500, 11px, 0.14em, uppercase): the top and bottom bars, the English under the room links, and the English line on each orbit card. A Thai line under a label drops the tracking and the case and steps up to 12px.
- **English Echo** (500, clamp(11px, 1.2vw, 14px), width 125%, 0.32em, uppercase): the English room name under the Thai display. Its siblings use the same width at 0.22 to 0.24em: the brand wordmark and the English line under the contact heading.

### Named Rules
**The Thai-First Rule.** Thai comes first and takes the larger size. English follows at label or echo scale. Never show English alone where Thai belongs.

**The Wide-English Rule.** Tracking and 125% width belong to Latin uppercase only. Thai lines always reset to `letter-spacing: 0` and normal case.

## Layout

The home is exactly one screen tall (100svh) with 16px side padding. A label bar sits at the top and bottom, and the orbit stage fills the space between them. Box size, hover size and logo width are CSS variables that OrbitStage recalculates at runtime.

The category page is a series of full-width bands:
1. A 100svh photo hero (minimum 520px).
2. The product shelf, at most 1280px wide.
3. The red contact band.
4. A two-column next/previous room nav split by a hairline.

Horizontal padding everywhere is `gutter`. Vertical section padding uses clamps between about 48px and 120px. The product grid uses `auto-fill` columns of at least 236px with a 16px gap. At 560px and below it becomes exactly two columns with a 10px gap. The filter chips stick to the top of the viewport on a 92% ground veil with a 10px backdrop blur.

Spacing steps observed: 8px (chip gap, small gaps), 14px (bar padding and card padding), 16px (grid gap), 24px (below the chips, button padding), 32px (above the "see all" link). Mobile breakpoints are 600px on the home and 560px on the category page, plus `(hover: none)`, which switches the instructions from mouse wording to touch wording.

## Elevation & Depth

Surfaces are flat, and depth is carried by the hairline border. There is one shadow, a soft drop tinted toward the red, and it appears only when a card is hovered or focused, together with a red border and a 2px lift.

### Shadow Vocabulary
- **Red lift** (`box-shadow: 0 22px 44px -22px rgba(120, 10, 35, .4)`): orbit cards and product cards on hover or focus. Nothing else.
- **Title glow** (`text-shadow: 0 2px 24px rgba(11, 11, 28, .35)`): the display line over a photo, as part of the scrim.

### Named Rules
**The Lift-On-Intent Rule.** Nothing casts a shadow at rest. The red lift is a reply to the pointer or focus, always paired with a Brand Red border.

## Shapes

Corners are slightly rounded (6px) on every container: cards, orbit faces, buttons, the empty state. Small tags such as the sale badge and photo credit use 3px. Chips are full pills (999px). Circles are reserved for the orbit ring and the scroll-cue ring. Borders are always 1px. The "opens elsewhere" chip uses a dashed hairline, and so does the empty-state panel.

Icons are authored line drawings. The room icons use a 64-unit grid with a 2.5 stroke and miter joins. The one Arrow component uses a 24-unit grid with a 1.8 stroke and comes in four directions: left, right, down and out. Both inherit `currentColor`.

## Components

### Buttons
Solid and quiet. They appear only on the red contact band.
- **Shape:** 6px corners, at least 48px tall, 24px side padding, 600 weight at 15px.
- **White:** white fill with red text. On hover the fill turns ink and the text turns white.
- **Line:** transparent, with a 1px border in 55% white and white text. On hover the border becomes solid white over a 10% white wash.
- **Focus:** 2px outline in currentColor, offset 3px.

### Chips
- **Style:** pill, at least 40px tall, card fill, hairline border, 500 at 14px. A trailing count is shown in muted with tabular numerals.
- **State:** hover turns the border and text red. Pressed (`aria-pressed`) is a solid red fill with white text and the count at 75% white. A chip that links out to the shop is transparent with a dashed border, muted text and the "out" Arrow.

### Cards / Containers
- **Corner Style:** 6px.
- **Background:** card fill. The product picture sits in a white square well, `object-fit: contain`, with 6% inset.
- **Shadow Strategy:** the red lift, on hover or focus only (see Elevation & Depth).
- **Border:** 1px hairline, turning red on hover. A hairline also divides the picture from the body.
- **Internal Padding:** 14px 14px 16px (10px on mobile). Order: name, then price row, then the muted "ดูสินค้า" link with the out arrow, which turns red on hover.
- **Reveal:** cards rise 24px and fade in once, staggered 70ms per column.

### Navigation
- **Home bars:** label type in muted. Links are ink with a transparent bottom border. On hover or focus they turn red and the underline appears.
- **Hero bar (on photo):** three columns: back to all rooms (Thai over small English, with the left Arrow nudging 4px), the white chair mark with the expanded wordmark, and LINE and phone links. All targets are at least 44px. Hover underlines with a 4px offset.
- **Room links:** a two-column band at the foot of the category page. The Thai name is at headline-small size and the English label sits below. On hover the fill turns card, the text turns red, and the arrow slides 4px outward.

### Orbit Box (signature)
A 6px pale card holding the room's line icon and its Thai and English names, placed on the ring around the logo. On hover, focus or tap it grows from `--s` to `--hs` over 0.35s on `--ease`, takes the red border and red lift, and cross-fades (0.12s delay) to a fixed-size back face: title, red English label, muted sub-categories and a red call to action. On click the card morphs into the category hero.

### Category Hero (signature)
A full-bleed room photo that settles in from 1.12 scale with blur, under the ink scrim. In the centre, top to bottom:
- The room icon in white, drawing its strokes in and then filling.
- The display name, rising in from blur.
- A 72px hairline rule that grows from the centre.
- The English echo.
A 48px circular scroll cue with a bobbing down Arrow sits at the bottom centre and fades out once the visitor scrolls. All of this animation is turned off under reduced motion.

## Do's and Don'ts

### Do:
- **Do** build every new surface from the six tokens in `app/src/styles/tokens.css`: ground, card, hairline, ink, muted and Brand Red.
- **Do** put content on pale cards with a 1px hairline and 6px corners. On hover or focus, answer with a red border, the red lift (`0 22px 44px -22px rgba(120,10,35,.4)`) and a 2px rise.
- **Do** pair every Thai heading with an English line at label or echo scale, and reset tracking to 0 on Thai.
- **Do** use the Arrow and RoomIcon SVG components for every directional or room cue, stroked in currentColor.
- **Do** keep white type on photos over the ink scrim, and give a photo credit its own local scrim.
- **Do** use `--ease` (cubic-bezier(.2,.7,.2,1)) for growth and state, and `--ease-out` (cubic-bezier(.16,1,.3,1)) for entrances. Honour `prefers-reduced-motion` everywhere.

### Don't:
- **Don't** introduce a second accent hue. Sale, active and link states all use Brand Red.
- **Don't** cast a shadow at rest, and don't use hard or offset shadows.
- **Don't** track or widen Thai text, or set it in uppercase styling.
- **Don't** use text glyphs (↗, →) as icons. Use the Arrow component.
- **Don't** round containers beyond 6px. Pills are for chips only, and circles are for the ring and the scroll cue only.
