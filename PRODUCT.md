# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Thai furniture shoppers on both desktop and mobile. They arrive at the Furniture Outlet site, browse by room (bedroom, living room, sofas, home office, dining & kitchen, storage, outdoor & garden, other), look at sub-categories and products, then go on to the existing shop (furniture-outletshop.com) or contact the store (LINE, phone, Facebook) to order.

## Product Purpose
A browsing front door for Furniture Outlet: the orbit home page presents the eight rooms; each room opens a category page that sets the mood with a full-screen photo and the room name, then lists that room's sub-categories and products. Success = a shopper quickly finds the room and product type they want and moves on to buy/contact.

## Capabilities and Constraints
- React + TypeScript + Vite app in `app/`; reference design in `design/reference.html`.
- Bilingual copy: Thai primary, English secondary on every category.
- Category data lives in `app/src/data/categories.ts` (names, sub-categories, shop links).
- Hero images: stock photos as stand-ins for now, to be replaced with real showroom photos.
- Product data (names, images, prices, links) is a snapshot of furniture-outletshop.com taken 25 Sep 2026 (first page per category) in `app/src/data/products.ts`; no live feed yet. Never invent prices or claims.

## Brand Commitments
- Name: Furniture Outlet. Logo: red (#E11A45) "FURNITURE OUTLET" wordmark with a black rule, transparent PNG at `app/public/logo.png` (recoloured from the client JPG). Page colours around it are a warm paper palette.
- Contact: Facebook `furnituresoutlet`, TikTok `@furniture_outlet`, LINE `@furnitureoutlet`, phone 039-303-304 (all in `app/src/data/contact.ts`), site furniture-outletshop.com.
- Existing visual language of the orbit home page is binding (tokens in `app/src/styles/tokens.css`).

## Evidence on Hand
- Category names, Thai/English labels and sub-category lists in `categories.ts`.
- Real products, product photos and listed prices from furniture-outletshop.com (snapshot, see above). Outdoor & Garden and Other have no products listed on the shop.
- Category hero photos are Unsplash stand-ins (credited on the page) until showroom photos exist.
- No testimonials, reviews or customer counts exist — do not fabricate them.

## Product Principles
1. Rooms first: shoppers think in rooms, then furniture types.
2. Thai first, English alongside — never English only.
3. Every screen leads toward buying or contacting the shop.
4. Real photos and real products will replace stand-ins; structure must make swapping trivial.
