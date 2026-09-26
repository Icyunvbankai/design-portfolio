# MR CLYBURN — Fiverr Portfolio

Live site: **https://icyunvbankai.github.io/design-portfolio/**

A one-page portfolio showcasing Fiverr design services. Dark streetwear aesthetic —
Anton display type, acid-green accent, work gallery with lightbox, services, process,
pricing, FAQ, and the 44-second gig promo video.

## How to update it

Everything is plain HTML/CSS/JS — no build step. Edit, commit, push, and the live
site updates in about a minute.

**Add a new service** — in `index.html`, find the `<!-- SERVICES -->` section and copy
the `<article class="card service-card live">` block. Change the badge to
`● LIVE ON FIVERR`, then fill in your title, description, checklist, and price.

**Swap or add portfolio pieces** — drop the image into `assets/` (JPG, ~1400px wide
is plenty), then copy a `<figure class="card work-card">` block in the `#work`
section and point `src` / `data-full` at your file.

**Update pricing** — edit the three `.price-card` blocks in the `#pricing` section.
Keep them in sync with the actual Fiverr gig packages.

**Replace the promo video** — drop the new MP4 over `assets/promo.mp4` (keep the
same filename, or update the `<source>` tag in the hero).

## Files

| File | What it is |
|---|---|
| `index.html` | The whole page — sections, copy, links |
| `styles.css` | All styling (colors live in `:root` at the top) |
| `script.js` | Mobile nav + image lightbox |
| `assets/` | Portfolio images + promo video |

## Deploy notes

Hosted with GitHub Pages from the `main` branch (`/` root). If Pages ever needs
re-enabling: repo → Settings → Pages → Deploy from branch → `main` / `/ (root)`.
