# Incapremo Dental Care

Production website for a pediatric dental practice in Purulia, West Bengal, India —
live at [dentalcarebest.in](https://dentalcarebest.in).

A React SPA deployed to Cloudflare Workers Static Assets, with a custom build-time
SEO pipeline that prerenders a correct `<head>` for every route so crawlers which
never execute JavaScript still index each page as itself rather than as a
duplicate of the home page.

---

## Tech stack

| Concern | Choice |
| --- | --- |
| UI | React 19, React Router 7 |
| Build | Vite 8, `@vitejs/plugin-react` |
| Edge hosting | Cloudflare Workers Static Assets (`@cloudflare/vite-plugin`, Wrangler 4) |
| Styling | CSS Modules + CSS custom properties (no CSS framework) |
| Animation | Framer Motion 13 (`AnimatePresence` page transitions, `whileInView`) |
| SEO | `react-helmet-async`, custom prerenderer, JSON-LD schema factories |
| Analytics | `react-ga4` |
| Tests | Vitest 4, Testing Library, jsdom |
| Lint | oxlint |

## Requirements

Node 20.19+ or 22.12+ (Vite 8). Verified on Node 24.

## Setup

```bash
npm install
cp .env.example .env
```

`.env` only needs a GA4 measurement ID. If it is missing or left as the
placeholder `G-XXXXXXXXXX`, analytics initialisation is skipped and the site
works normally.

```bash
npm run dev        # dev server
npm test           # 31 tests
npm run lint       # oxlint
npm run build      # vite build + prerender + generate sitemap/robots/_redirects
npm run deploy     # build, then wrangler deploy
```

`npm run preview` builds and serves through `wrangler dev`, which is the closest
local approximation of production — plain `vite preview` does not apply the
`wrangler.jsonc` assets config, so it will not reproduce the 404 or
trailing-slash behaviour.

## Project structure

```
src/
├── components/    # Reusable UI (Header, Footer, Layout, SEO, FAQ, forms)
├── pages/         # One folder per route, each with its own CSS Module
├── config/        # site.js (origin + route inventory), seo.js (on-page plan + schemas)
├── context/       # ThemeContext (dark mode)
├── hooks/         # useOpenStatus, useCountUp, useTheme
├── styles/        # globals.css, variables.css (design tokens)
└── utils/         # analytics.js

build/
├── prerender.js   # Post-build: one static HTML file per route
└── seo-assets.js  # Vite plugin: sitemap.xml, robots.txt, _redirects, __SITE_URL__ substitution

docs/
├── SEO.md               # Architecture & maintenance guide for the SEO tool
└── DOMAIN-MIGRATION.md  # Moving domains without losing ranking
```

## Routes

`/` · `/services` · `/about` · `/contact` · `/emergency` · `/proof-of-work` ·
`/privacy-policy` · `/terms-and-conditions` · `/500` · catch-all 404

All page components are lazy-loaded (`React.lazy` + `Suspense`) in
`src/App.jsx`.

## How SEO works

This is the part of the codebase with the most non-obvious design, so it is worth
reading before making changes. Full detail in [`docs/SEO.md`](docs/SEO.md).

There are two metadata layers, both generated from the same config modules so they
cannot drift:

1. **Prerendered static head** — `build/prerender.js` runs after `vite build` and
   writes `dist/<route>/index.html` plus `dist/404.html`, each with a
   route-specific title, description, canonical, `hreflang`, Open Graph, Twitter
   card and JSON-LD. It rewrites `<head>` only; the body still ships an empty
   `#root` that React fills in, so there is no hydration mismatch and no flash of
   unstyled content.
2. **Client-side `<SEO>`** — on hydration, `react-helmet-async` re-emits the same
   tags and repeats it on every client-side navigation.

`sitemap.xml`, `robots.txt` and `_redirects` are build artifacts emitted by
`build/seo-assets.js` from `src/config/site.js`. **Never edit them by hand and
never create a `public/sitemap.xml`** — it would shadow the generated one.

### Adding a route

1. Add it to `INDEXABLE_ROUTES` in `src/config/site.js`.
2. Add a matching `PAGE_SEO` entry in `src/config/seo.js`. `seoFor()` throws for
   an undeclared path rather than falling back to the home page, so this step
   cannot be skipped.
3. Add the route to `src/App.jsx`.
4. If the page has structured data, add it to `EXTRA_SCHEMAS` in
   `build/prerender.js`, or the prerendered head will be missing schema the
   client-side render produces.

## Changing the domain

Edit `SITE_URL` in `src/config/site.js` — that is the only required change. Every
prerendered head, the sitemap and robots all follow, and a test fails the build if
a literal origin is hardcoded anywhere else.

If you are also retiring an old domain, set `PREVIOUS_SITE_URL` and then work
through [`docs/DOMAIN-MIGRATION.md`](docs/DOMAIN-MIGRATION.md). Note that Workers
Static Assets silently ignores domain-level rules in `_redirects`, so the 301 has
to be a zone-level Cloudflare Redirect Rule; `npm run build` deliberately fails
until `HOST_REDIRECTS_CONFIRMED = true`.

## Testing

```bash
npm test
```

31 tests across 4 files. Most assert on the SEO config's internal consistency,
but `src/config/site.test.jsx` also contains a suite that **reads the real
built files in `dist/`** and fails if a route's canonical, title, robots
directive or JSON-LD disagrees with the sitemap or with `PAGE_SEO`. Those tests
skip themselves when `dist/` is absent, so run `npm run build` first to exercise
them.

## Accessibility notes

Skip-to-content link, semantic landmarks, `aria-expanded` on the mobile menu,
theme toggle and FAQ accordions, visible focus rings, descriptive `alt` text, and
`aria-hidden` on purely decorative status dots. Live open/closed status resolves
in `Asia/Kolkata` explicitly rather than the visitor's local timezone — the
clinic's hours are a property of its own wall clock — and returns `null` until
mounted so the first client render matches the prerendered HTML.

## Known limitations

- `ContactForm` simulates submission with a `setTimeout`; there is no backend or
  form service wired up yet.
- Prerendering covers `<head>` only. Body copy is still client-rendered, so a
  crawler that executes no JavaScript sees correct metadata but no page content.
  Fixing this properly means rendering the React tree to a string, which is a
  larger change with real mismatch risk.
