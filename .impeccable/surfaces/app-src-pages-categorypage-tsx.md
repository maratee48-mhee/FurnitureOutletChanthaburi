---
version: 1
slug: "app-src-pages-categorypage-tsx"
primary_target: "app/src/pages/CategoryPage.tsx"
related_targets: []
---

# Category page (/category/:id)

Scope: one route template for all 8 rooms. Mode: Persuade (browse → shop/contact). Extension of the orbit home world; code-led (no image generation).

Audience: Thai shoppers on desktop + mobile arriving from the orbit home. Job: feel the room, then scan real products and prices, then open the product on furniture-outletshop.com or message via LINE.
Content: real products scraped from furniture-outletshop.com (first page per category, prices as listed). Outdoor & Other have no products live → designed empty state. Hero photos are Unsplash stand-ins, credited, to be replaced by showroom photos.

## Direction contract

THESIS: The orbit card you clicked becomes the room. The page refuses the stock "banner + grid" e-shop: the hero is the card itself grown to full bleed (view transition), and the list keeps the home's card language.

OWN-WORLD: Home tokens unchanged: ground #EBEBEB, card #F7F7F9, hairline #C6C6D0, ink #0B0B1C, logo blue #0000FF, 6px radius, Archivo + Noto Sans Thai, tracked uppercase English. Photo hero with ink scrim; white type. The room's own line icon from the home orbit, drawn in white.

STORY: Visitor sees the room name land in the centre over the room photo, understands they are "in" the bedroom, follows the arrow, filters by furniture type, compares real prices, taps through to buy or messages LINE. Page closes on a full blue contact band and a "next room" link.

FIRST VIEWPORT: Full-viewport photo (100svh). Centre: room icon (stroke draws in), Thai name at display size, English tracked below, hairline rule drawing outward. Top: back to all rooms (left), LINE/phone (right). Bottom centre: 44px circular arrow button + "เลื่อนดูสินค้า", bobbing; click scrolls to list. Photo credit bottom right.

FORM: Extension of the established orbit world; shaped directly (precise brief), no concept roll; seed key n/a.

Signature interaction: box → hero morph via View Transitions API; name reveal = masked line rise + rule draw; product cards reveal on scroll once.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
