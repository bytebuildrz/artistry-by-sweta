# DESIGN.md — Artistry by Sweta J (sample site)

## Direction (one line)
Editorial broadsheet for a handmade studio: warm paper ground, ink type, oversized serif display, rows over cards, square corners — composed per the editorial-minimal pack, but palette and type taken from the subject (her photos are white concrete, blush pink and gold), not the pack's vermillion.

Idea: her own Instagram becomes the printed catalogue — her photos, her words, her collections, typeset like a broadsheet.

## Palette (from her product photos)
- Paper (ground): #FAF6F0
- Panel (tone step): #F3EADF
- Ink: #2B211A
- Muted ink: #6E5D4E
- Faint: #97826E
- Accent (her gold, deepened for contrast): #A8742C — buttons, prices, active states only
- Blush (field colour, bulk banner): #F6E3E0 with ink text
- Hairline: #E7DACB / stronger #D8C6AC
- WhatsApp green: #1FAB55 (order action only)

## Type
- Display: "Cormorant Garamond" 600 — headlines, product names, prices. Tight leading 1.02–1.1, tracking -0.01em.
- Body/UI: "Archivo" 400–800 — 16–17px, leading 1.55–1.65, measure ≤ 65ch.
- Scale: display clamp(2.9rem, 8vw, 5.4rem); section head clamp(1.9rem, 4.5vw, 2.6rem) serif; card name 1.3rem serif; body 16px; small 13px.
- No uppercase tracked labels except the facts-table keys (11.5px, gold) — kept from v2 as the one label device.

## Space & shape
- Frame: max 1180px, side padding 20px (16px phone), equal both sides.
- Section gap: 88px desktop / 56px phone. Inside gaps clearly smaller.
- Corners: 4px everywhere (buttons, cards, images, inputs). No pill buttons, no rounded cards.
- No shadows at rest. Tone steps separate surfaces. Shadow only on the bag drawer and floating bag (things that truly float).
- Product photos: true colour, never overlaid, tinted or blended. object-fit cover, aspect 4/5 cards, hero natural.

## Motion (tokens)
- Reveal: translateY(10px) + opacity, 420ms cubic-bezier(.22,.8,.3,1), stagger 70ms, once, via IntersectionObserver; initial hidden state set by JS only (no-JS keeps content visible).
- Press: scale .98 on :active, 120ms.
- Links: underline sweep (background-size) on nav and index rows.
- Drawer: transform 300ms ease.
- prefers-reduced-motion: all travel removed, content shown, feedback kept as instant state.

## Components
- Buttons: flat, one fill (ink or gold), 4px corners, sentence case. Primary = ink; WhatsApp order = green.
- Cards: paper surface, 1px hairline, no shadow, image square-top, name serif, price serif gold.
- Index rows (collections): number in italic serif gold, name serif 23px, note right-aligned muted; hairline between rows.
- Footer: designed close — brand name returns at display size across the full width.

## Rules kept from the kit
- One direction only. Real content only (her words, her photos, her ₹149). Samples labelled on the page.
- Mobile-first: check 390px, then 768, then 1440. Hero fits without scrolling at 390.
- Every control works; visible focus (:focus-visible outline gold 2px offset 2px); selection blush.
