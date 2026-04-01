# k1m.dev

Landing page for **k1m.dev** — Tech Engineer & MVP Builder. Static site served via Cloudflare Pages (Wrangler).

**This project is for learning purposes.** Use it as a reference for structure, styling, or deployment; it is not intended for production reuse as-is.

## Setup

```bash
npm install
npm start
```

Runs a local dev server (Wrangler Pages) with the `public` directory.

## Deploy

```bash
npm run deploy
```

Deploys the `public` folder to Cloudflare Pages.

## Structure

- `public/` — Static assets: HTML, CSS, JS, images, blog, `site.webmanifest`, etc.
- `wrangler.toml` — Cloudflare Pages/Workers config (assets from `./public`).

## License

Private / for learning. See repo for details.
