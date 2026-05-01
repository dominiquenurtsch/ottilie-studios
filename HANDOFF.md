# Ottilie Studios — Handoff

This is a static rebuild of [ottilie-studios.com.au](https://ottilie-studios.com.au/) styled after [theundone.com](https://www.theundone.com/). Pure HTML / CSS / JS, no build step, no framework.

**Live demo:** https://rankify-ops.github.io/ottilie-studios/

## Quick start

```bash
# from this folder
python -m http.server 8080
# open http://localhost:8080
```

That's it — no `npm install`, no toolchain. Open any .html file directly and it works.

## File map

```
ottilie-rebuild/
├── index.html              ← homepage
├── about.html              ← biography
├── work-with-me.html       ← services + audience stats
├── contact.html            ← form + email + socials
├── shop.html               ← e-book listing
├── journal.html            ← blog archive
├── delivery-policy.html    ← legal
├── posts/                  ← blog post pages (6)
│   ├── louis-vuitton-ss26.html
│   ├── cartier-love-unlimited.html
│   ├── cartier-polka-dot.html
│   ├── tnt-brisbane.html
│   ├── tnt-christopher-esber.html
│   └── louis-vuitton-beauty.html
├── products/               ← product detail pages
│   └── paris-travel-guide.html
├── partials/               ← shared HTML included by every page
│   ├── header.html         ← announcement + nav
│   └── footer.html
├── public/                 ← all images
│   ├── images/             ← logo + featured artwork
│   ├── posts/              ← blog hero + article galleries
│   ├── work/               ← work-with-me portraits
│   ├── shop/               ← shop tiles
│   └── products/           ← product galleries (paris-guide/)
├── styles.css              ← every visual rule
├── script.js               ← partial loader + nav active state + footer year
└── README.md
```

## How the partials work

Every page has these two lines instead of pasting the nav/footer:

```html
<div data-include="partials/header.html"></div>
...
<div data-include="partials/footer.html"></div>
```

`script.js` finds those elements, fetches the partial, replaces `{BASE}` placeholders so links work from sub-pages too (e.g. `/posts/`), then drops the markup in. Change `partials/header.html` once → updates everywhere.

`<body data-page="journal">` controls which nav link gets the `is-active` underline.

## Design system

- **Colours** — pure white `#FFFFFF`, warm cream `#FAF7F2` / `#EFE7DB`, ink `#1B1815`, soft brown accent `#8B6F47`. All defined as CSS variables at the top of `styles.css`.
- **Typography** — Cormorant Garamond for display (italic emphasis everywhere), Inter for spaced small-caps labels. Both loaded from Google Fonts.
- **Editorial pieces** — sticky centred wordmark "the OTTILIE", thin small-caps top nav, slow scrolling marquee announcement bar (48s loop, two alternating messages, pauses on hover).
- **Layout shapes** — three-panel tryptych hero, undone-style blog feed (pill filters → big split feature → 3-col card grid), product page with thumbnail gallery and tabbed description.

## Product page conversion sections

The `products/paris-travel-guide.html` description tab is the main conversion canvas. It runs:

1. Stat ribbon (4 italic numbers on cream)
2. Persona grid (6 audience tiles)
3. Interactive `<details>` accordion — "What's inside" × 6 categories
4. Before/After grid with × and ✓ markers
5. Social-proof row (TikTok / Instagram / Google)
6. FAQ accordion (5 questions)
7. Creator card with portrait + italic signature
8. Dark final CTA that smooth-scrolls to the buy module
9. Sticky mobile buy bar at the bottom (price + "Get the guide →")

To add new products, copy `products/paris-travel-guide.html` and `public/products/paris-guide/`, change copy, swap images, update the nav include — done.

## Deploy

GitHub Pages is already on for the demo repo. The whole folder is publishable as-is to:
- GitHub Pages
- Netlify (drag-and-drop)
- Vercel (zero config)
- Any S3 bucket
- Any shared host

No build step is required.

## Things still to do (suggested)

- Real cart / checkout — currently the "Add to basket" buttons show a confirmation message but don't transact. Easiest path: connect to Shopify Buy SDK, Stripe Payment Links, or Lemon Squeezy.
- Blog CMS — right now each post is a static HTML file. If posts get added often, consider hooking the journal up to a headless CMS (Sanity, Contentful) or a flat-file system like `posts/*.md` with a small build step.
- Newsletter form — currently a stub. Wire to Mailchimp / Klaviyo / ConvertKit.
- Contact form — also a stub. Easiest: Formspree, Basin, Netlify Forms.
- Social og:image — add a proper share-card image at `public/og.png` and reference it in each `<head>`.

## Conventions for the next Claude

- **Don't add a framework.** This site is fast and easy because everything is plain HTML+CSS. If a feature needs JS, write small vanilla JS. No React/Next/etc.
- **Edit partials, not pages.** Header/footer changes live in `partials/`.
- **Keep CSS classes scoped to a section.** Use BEM-ish names like `.product__media`, `.persona__mark`, `.inside__sum`.
- **Italic emphasis is the move.** Almost every heading uses `<em>` for the romantic word — that's the look.
- **Scraped content is in `.firecrawl/`.** All the original article markdown is saved there if you need to pull more body copy.
