# Project structure (reference template)

Use this document to reproduce the **layout and conventions** of this repo in another project. This site is a **static HTML/CSS/JS** personal portfolio + blog, deployed as **Cloudflare Pages** static assets (no build step for HTML).

---

## High-level architecture

| Layer | Role |
|--------|------|
| **`public/`** | Entire deployable site: HTML pages, global CSS/JS, images, SEO files. |
| **`wrangler.toml`** | Cloudflare config: project name, compatibility date, static assets directory. |
| **`package.json`** | npm scripts for local dev (`wrangler pages dev`) and deploy (`wrangler deploy`). |
| **`src/index.js`** | Optional Worker fetch handler that proxies to `ASSETS` (used when pairing Worker + assets). |

There is **no bundler** for pages: edit HTML directly. Styles and behavior live in shared `styles.css` and `script.js`.

---

## Directory layout

```
.
├── package.json              # Scripts: start → wrangler pages dev public; deploy → wrangler deploy
├── package-lock.json
├── wrangler.toml             # Pages/assets config
├── README.md                 # Short human readme
├── PROJECT_STRUCTURE.md      # This file
├── .gitignore
├── .gitattributes
├── src/
│   └── index.js              # Worker entry: env.ASSETS.fetch(request)
└── public/                   # ★ Root of what Cloudflare serves
    ├── index.html            # Home / landing
    ├── ai-revenue.html       # Additional marketing page (example)
    ├── styles.css            # Global site styles (dark/light, layout, blog, prose)
    ├── script.js             # Shared JS (nav, theme, etc.)
    ├── favicon.svg
    ├── site.webmanifest
    ├── robots.txt
    ├── sitemap.xml           # Maintain when adding URLs
    ├── llms.txt              # Optional AI/crawler hints
    ├── blog/
    │   ├── index.html        # Blog listing (cards → each article)
    │   └── *.html            # One file per article (Title-Case-With-Hyphens.html)
    └── images/
        └── *.{png,jpg,svg}   # Heroes, thumbnails; referenced as /images/...
```

---

## URL and routing rules

- **Pretty paths**: Use paths like `/blog/` for the listing (`blog/index.html`).
- **Articles**: Flat files under `/blog/<Article-Slug>.html` (slug matches filename).
- **Asset URLs**: Root-relative, e.g. `href="/styles.css"`, `src="/images/foo.png"` from pages in `public/` root; from `public/blog/*.html` use `href="../styles.css"` where applicable for sibling consistency with this repo (blog pages link `../styles.css` and `../script.js`).
- **No framework router**: Each URL is a real file (or `index.html` in a folder).

---

## Page templates (conventions)

### Home (`public/index.html`)

- Site header: logo, nav (Home, Blog, other links), theme toggle.
- Sections: hero, projects/cards, optional “latest articles” grid linking to `/blog/...`.
- Footer + inline or shared theme script pattern matching blog pages.

### Blog index (`public/blog/index.html`)

- Same header/nav as inner pages.
- `blog-hero` block with breadcrumb.
- List of `article.blog-card` entries; each links to an HTML article and shows thumbnail from `/images/`, title, summary, meta (author, read time, date).

### Article (`public/blog/<slug>.html`)

Typical structure:

1. `<head>` — title, meta description, Open Graph (`og:title`, `og:description`, `og:image`, `og:url`), `link` to `../styles.css`.
2. Optional **page-scoped** `<style>` for article-specific components (keeps global CSS smaller).
3. GTM / analytics snippets if used.
4. `site-header` (same as other pages).
5. `blog-hero` — breadcrumb (Home / Blog / current title), `h1.blog-title`, subtitle, meta row.
6. `cover-wrap` — hero image (`/images/...`) inside `.container` / `.cover-wrap-inner`.
7. `<article>` → `.container-narrow` → `.prose.blog-prose` (optional extra class for scoped styling).
8. Body content: `h2`, `h3`, `p`, lists, `blockquote`, `.code-block` / `pre`, `.callout-*`, `.magic-box`, `.guide-step`, `.cta-section`, `.author-card`.
9. Footer + `../script.js` + theme-toggle inline script + third-party scripts (e.g. HubSpot).

**Adding a new post**: duplicate an existing article HTML, update meta and body, add a card on `blog/index.html`, add thumbnail under `public/images/` if needed, add URL to `sitemap.xml`, consider home page “latest articles” grid.

---

## Shared styling (`public/styles.css`)

Single global stylesheet covers:

- Layout containers (`.container`, `.container-narrow`, `.container-wide`).
- Header, nav, mobile menu, theme toggle (`.dark` / `.light` on `html`).
- Landing sections, cards, grids.
- Blog list (`.blog-card`, `.blog-list`), article hero (`.blog-hero`, `.cover-wrap`).
- Prose (`.prose h2`, `.prose p`, `.prose strong`).
- Utilities: `.code-block`, `.inline-code`, `.callout-*`, `.guide-step`, `.magic-box`, `.cta-section`, `.author-card`, etc.

Prefer extending existing classes over one-off global rules; use a wrapper class + scoped `<style>` on rare pages with heavy custom layout.

---

## Shared behavior (`public/script.js`)

Central place for navigation (e.g. hamburger), overlays, and any site-wide interactions referenced by all pages.

---

## Deploy and local dev

```bash
npm install
npm start          # npx wrangler pages dev public
npm run deploy     # wrangler deploy (uses wrangler.toml assets)
```

`wrangler.toml` points static assets at `./public`. Adjust `name` and `compatibility_date` per project.

---

## SEO and discovery

| File | Purpose |
|------|---------|
| `public/sitemap.xml` | List canonical URLs + `lastmod` / priority. |
| `public/robots.txt` | Crawl rules. |
| `public/site.webmanifest` | PWA-lite metadata. |
| Per-page `<meta name="description">` | Snippets for search/social. |
| Per-page `og:*` | Social previews (absolute `og:image` URL recommended). |

---

## Naming conventions (recommended)

- **Blog filenames**: `Title-Words-Separated-By-Hyphens.html` (match URL slug).
- **Images**: Either mirror article title or short descriptive slug; keep extensions consistent (`png`, `jpg`).
- **IDs**: Use stable anchors (`id="contact"` for CTA) if linking from elsewhere.

---

## Checklist: new site from this structure

1. Copy `public/` skeleton (minimal `index.html`, `styles.css`, `script.js`).
2. Copy `wrangler.toml`, `package.json`; rename project and adjust scripts if asset dir differs.
3. Replace branding: favicon, `site.webmanifest`, meta URLs in templates.
4. Implement header/footer once; reuse across pages (or extract manually—there is no templating engine).
5. Configure analytics (GTM, etc.) in each HTML shell as needed.
6. After each new route: update `sitemap.xml` and verify internal links.

---

## Optional Worker (`src/index.js`)

If Cloudflare serves both a Worker and Pages assets, the Worker can delegate static requests to `env.ASSETS.fetch(request)`. For **assets-only** Pages deploys, this file may be unused; deployment still works off `public/` via Wrangler assets config.

---

## Related docs

- `README.md` — Quick setup and deploy commands for this repo.
