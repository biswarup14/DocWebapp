# SEO Tool — Architecture & Maintenance Guide

**Site:** Incapremo Dental Care — the canonical origin is `SITE_URL` in `src/config/site.js`
**Owner files:** `src/config/site.js` (domain + route inventory), `src/config/seo.js` (on-page plan, keywords, NAP + schema factories), `src/components/SEO/SEO.jsx` (the `<SEO>` component), `build/prerender.js` (static per-route head), `index.html` (base head, uses the `__SITE_URL__` token)
**Generated files:** `sitemap.xml`, `robots.txt`, `_redirects` — emitted into `dist/` by `build/seo-assets.js`, never edited by hand
**Test suites:** `src/components/SEO/SEO.test.jsx`, `src/config/site.test.jsx`

---

## 1. What the SEO tool is

The SEO tool is a single React component, `<SEO>`, plus one configuration object. Every route in the
site renders `<SEO>` once, and the component writes the correct `<title>`, meta description, canonical,
Open Graph tags, Twitter card tags and JSON-LD structured data into `<head>` for that route. It also
exposes schema factory functions that build the structured-data blocks.

The design goal is **centralisation**. Titles, descriptions and keywords are not written inside page
components. They live in one `PAGE_SEO` map keyed by route path, and each page just declares which
route it is. Retargeting a keyword is a one-line change in one file rather than an edit across ten
components — because inconsistent metadata across pages is the most common silent SEO defect in a
multi-page app.

## 2. How it fits the build

This is a Vite + React app deployed to Cloudflare Workers Static Assets. The `<body>` is a single
client-rendered shell, but the `<head>` is prerendered per route, so crawlers that never execute
JavaScript still get correct metadata. There are two layers of metadata, and understanding which is
which explains most of the tool's design.

**Layer 1 — prerendered static head.** `build/prerender.js` runs after `vite build` and writes one
HTML file per route (`dist/services/index.html`, `dist/privacy-policy/index.html`, …) plus
`dist/404.html`. Each file's `<head>` is built from the same `src/config/seo.js` module the React
component reads, so the two cannot drift. This is the only metadata a non-JS crawler (a social
scraper, `curl`, some monitoring bots) will ever see, and it is **route-specific** — this is the
point of the step.

**Layer 2 — client-side `<SEO>`.** On hydration, `react-helmet-async` re-emits the same tags and
repeats this on every client-side navigation. Googlebot executes JavaScript, so it reads these
values too. This is where per-route keyword targeting lives.

Because both layers are generated from one config, they agree by construction rather than by
convention. The test suite asserts it: `src/config/site.test.jsx` reads the built files in `dist/`
and fails if a route's canonical, title, robots directive or JSON-LD disagrees with the sitemap or
with `PAGE_SEO`.

### Why the soft 404 mattered

`not_found_handling` used to be `"single-page-application"`, which served the home page's
`index.html` with **HTTP 200** for every path. Every URL on the site was therefore a byte-identical
copy of `/` to any crawler that does not run JavaScript — a site-wide duplicate-content problem, and
`/anything-typo` answered 200 instead of 404. It is now `"404-page"`, so `dist/404.html` is served
with a real 404 status while still booting React and rendering the styled NotFound page.

### Adding a route

1. Add it to `INDEXABLE_ROUTES` in `src/config/site.js` (sitemap, prerender, canonical).
2. Add a matching `PAGE_SEO` entry in `src/config/seo.js`, with its own `title` and `description`.
   `seoFor()` **throws** for a path with no entry rather than falling back to the home page, so this
   step cannot be skipped.
3. Add the page's structured data to `EXTRA_SCHEMAS` in `build/prerender.js` if it has any, or the
   prerendered head will be missing schema the client-side render produces.

Step 2's throw is deliberate. The previous `PAGE_SEO[path] || PAGE_SEO['/']` fallback silently gave
an undeclared route the home page's title and description, which pairs a foreign title with a
self-referential canonical and reads as correct in review.

## 3. Keyword strategy

The site targets one commercial head term and eight supporting terms:

| Role | Keyword |
| --- | --- |
| Main | `dentist` |
| Supporting | `dentist near me` |
| Supporting | `pediatric dentist near me` |
| Supporting | `kids dentist near me` |
| Supporting | `dental treatment in purulia` |
| Supporting | `dental treatment in kolkata` |
| Supporting | `best dentist near me` |
| Supporting | `orthodontics in Kolkata` |
| Supporting | `dentist clinic near me` |

These are declared once as `MAIN_KEYWORD` and `SUPPORTING_KEYWORDS` in `config/seo.js`. The rule the codebase
enforces is that **no page may use a term outside this approved set.** Once a list drifts, pages start
competing for the same query and each page's signal is diluted. A test asserts every keyword in
`PAGE_SEO` is on the approved list, and that every approved keyword is used somewhere — so an orphan
keyword fails CI.

### Per-page allocation

Each entry in `PAGE_SEO` names a `primary` term. The primary term is what the title, the meta
description and the page's H1 are written around. Supporting terms reinforce it.

| Route | Primary term | Also reinforced |
| --- | --- | --- |
| `/` | `dentist` | `dentist near me`, `best dentist near me`, `dental treatment in purulia`, `dental treatment in kolkata`, `pediatric dentist near me` |
| `/services` | `dental treatment in purulia` | `dental treatment in kolkata`, `dentist`, `dentist near me`, `orthodontics in Kolkata` |
| `/about` | `best dentist near me` | `dentist`, `dentist near me`, `pediatric dentist near me`, `kids dentist near me` |
| `/contact` | `dentist clinic near me` | `dentist near me`, `dentist`, `dental treatment in purulia` |
| `/emergency` | `dentist near me` | `dentist clinic near me`, `dentist`, `dental treatment in purulia` |
| `/proof-of-work` | `best dentist near me` | `dentist`, `dentist near me`, `dental treatment in purulia` |

`/privacy-policy`, `/terms-and-conditions`, `/404` and `/500` are deliberately excluded. They pass
`noindex` and `keywords={[]}`, so no `<meta name="keywords">` is emitted at all. Attaching commercial
keywords to a legal page is noise.

## 4. The `<SEO>` component

`<SEO>` is rendered inside each page component, never in the shared layout, because React Router swaps
page components on navigation and each new page must be able to claim the head.

```jsx
<SEO
  url="/services"                              // required — drives all defaults
  breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]}
  extraSchemas={[serviceSchema('/services', '…', '…')]}
/>
```

**Props.** `url` is the only required prop; everything else defaults through `seoFor(url)`. `title`,
`description` and `keywords` fall back to the `PAGE_SEO` entry, so pages should normally omit them.
`type`, `image`, `imageAlt`, `imageWidth` and `imageHeight` control social previews. `breadcrumb` and
`extraSchemas` add structured data. `noindex` switches robots to `noindex, nofollow`. `schema={false}`
suppresses **all** JSON-LD for that route.

Two behaviours are worth knowing. `schema={false}` disables the entire structured-data block —
including breadcrumbs and `extraSchemas` — which is what legal and error pages want. And an empty keyword
list omits `<meta name="keywords">` entirely rather than emitting an empty tag.

**Titles** compose as `` `${pageTitle} | ${SITE_NAME}` ``. Titles are capped at 65 characters and
descriptions at 160 in the test suite, because Google truncates beyond those points and a truncated
title hides the keyword that matters most.

## 5. Open Graph and Twitter

The home page's static head carries a complete Open Graph set: `og:type`, `og:site_name`, `og:locale`,
`og:title`, `og:description`, `og:url`, `og:image`, `og:image:secure_url`, `og:image:type`,
`og:image:width`, `og:image:height` and `og:image:alt`, mirrored by `twitter:card`
(`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image` and
`twitter:image:alt`. `<SEO>` emits the same set client-side, so a shared link renders correctly
regardless of which layer the scraper reads.

The OG image is `public/oie_Xo2NfYNrbzXd.png` at 1200×630 — the size Facebook, LinkedIn and WhatsApp
expect. `imageMime()` infers MIME type from the extension, so swapping in a `.webp` needs no other
change. The filename is an auto-generated asset name; renaming it to something descriptive is a safe
future improvement, but requires updating `DEFAULT_OG_IMAGE` and four references in `index.html`.

## 6. Structured data

`<SEO>` always injects a `Dentist` node (`localBusinessSchema`) and a `WebPage` node
(`webPageSchema`) on indexable routes, keyed by `@id` so they form a connected graph rather than
disconnected blobs. Additional factories are exported for specific pages: `websiteSchema()` for the home
page, `personSchema()` for `/about`, `serviceSchema()` for `/services` (an `ItemList` of the eight
procedures), and `breadcrumbSchema()` for every inner page. `faqSchema` is exported from
`src/components/FAQ/FAQ.jsx`; `EmergencyService` and `ImageGallery` are defined inline in their pages.

`NAP` is the single source of truth for name, address, phone, email, geo-coordinates and opening hours.
The `Dentist` node and the `geo.*` / `ICBM` meta tags all read from it, so a phone number changes in
exactly one place.

## 7. Crawler directives

`robots.txt` and `sitemap.xml` are build artifacts, generated from `src/config/site.js` by
`build/seo-assets.js`. The generated robots allows the site, disallows `/500` and `/404` from
`DISALLOWED_PATHS`, and points at `SITE_URL/sitemap.xml`. The sitemap lists every route in
`INDEXABLE_ROUTES` with `lastmod`, `changefreq` and `priority`, and the `/proof-of-work` entry carries
Google image-sitemap annotations for the six gallery images.

`dist/_redirects` is generated by the same plugin, but it carries **no active rules**. Two things
that used to live there moved, and the reason matters:

- **Host-level 301s** (`PREVIOUS_SITE_URL`, `CANONICAL_ALIASES`) cannot live in `_redirects` at all —
  Workers Static Assets silently ignores a rule whose source names another host. They belong in a
  zone-level Cloudflare Redirect Rule, and `npm run build` fails until you confirm one exists. See
  `docs/DOMAIN-MIGRATION.md`.
- **Trailing-slash normalisation** is owned by `html_handling: "drop-trailing-slash"` in
  `wrangler.jsonc`, which is the only place that redirect actually runs. The assets layer answers
  `/services/` from disk before `_redirects` is consulted, so a 301 written here would be dead config
  that looks like the real one. `drop-trailing-slash` also makes the served URL match the canonical
  exactly; the default `auto-trailing-slash` derives its direction from the on-disk layout and would
  307 `/services` to `/services/`, pointing every canonical URL at a non-canonical one.

## 8. Making a change

**Retarget a keyword.** Edit the `keywords` array for that route in `PAGE_SEO`. The test suite rejects
any term not on the approved list.

**Add a keyword to the approved set.** Add it to `SUPPORTING_KEYWORDS`, then allocate it to at least one
page — the keyword-coverage test fails if a term is declared but never targeted.

**Change the business phone number or address.** Edit `NAP`. Check whether the value is duplicated in
`index.html`'s JSON-LD, which is a separate static copy and must be updated by hand.

**Change the domain.** Edit `SITE_URL` in `src/config/site.js`. That is the only edit required; the
prerendered heads, sitemap and robots all follow. Set `PREVIOUS_SITE_URL` as well if the old
domain is being retired, then work through `docs/DOMAIN-MIGRATION.md` — a domain move without a 301
and a Search Console *Change of Address* will lose ranking.

**Add a new page.** Create the route in `src/App.jsx`, add a `PAGE_SEO` entry, render
`<SEO url="/new-route" breadcrumb={[…]} />`, and add an entry to `INDEXABLE_ROUTES` in
`src/config/site.js`. The sitemap entry is generated from that; do not create a `public/sitemap.xml`.
`src/config/site.test.jsx` fails if the route and its canonical disagree.

## 9. Known constraint

Because there is no server rendering or prerendering, a crawler that does not execute JavaScript sees
home-page metadata on every URL, including a canonical pointing at `/`. Googlebot handles this, but other
crawlers may not. Fixing it properly means generating per-route static HTML at build time. Until then,
treat the static head as an accurate description of the home page and nothing more.

## 10. Verifying

```bash
npx vitest run     # 14 tests: metadata, schemas, keyword coverage, length limits
npx oxlint         # 0 errors
npm run build      # production bundle
```

To check a page by hand, view source on the deployed URL and confirm the title, description, canonical,
`og:url` and JSON-LD all reference that route rather than `/`.
