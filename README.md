# Ottilie Studios — rebuild

Static rebuild of [ottilie-studios.com.au](https://ottilie-studios.com.au/) homepage.

- Pure HTML / CSS / JS, no build step
- Editorial Firecrawl-style layout (sectioned, numbered, bracketed mono labels)
- Warm cream palette matching the original site
- Deployable to GitHub Pages out of the box

## Run locally

```bash
python -m http.server 8080
# open http://localhost:8080
```

## Structure

```
index.html
styles.css
script.js
public/
  images/  — logo + hero
  posts/   — journal thumbnails
  work/    — work-with-me portraits
  shop/    — shop-my-looks grid
```
