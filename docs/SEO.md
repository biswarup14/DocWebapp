# SEO Tool — Architecture & Maintenance Guide

**Site:** Incapremo Dental Care — https://incapremodentalcare.com
**Owner files:** `src/components/SEO/SEO.jsx`, `index.html`, `public/sitemap.xml`, `public/robots.txt`
**Test suite:** `src/components/SEO/SEO.test.jsx`

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

This is a Vite + React single-page application deployed to Cloudflare, not a server-rendered framework.
There are two layers of metadata, and understanding which is which explains most of the tool's design.

**Layer 1 — static `index.html`.** Cloudflare serves this file for every route because
`wrangler.jsonc` sets `not_found_handling: "single-page-application"`. It contains a complete, correct
set of head tags for the **home page only**. This is the only metadata a non-JS crawler (a social
scraper, `curl`, some monitoring bots) will ever see, and it is identical for all nine routes.

**Layer 2 — client-side `<SEO>`.** On hydration, `react-helmet-async` replaces the static tags with the
correct per-route values, and repeats this on every client-side navigation. Googlebot executes
JavaScript, so it reads the client-rendered values. This is where per-route keyword targeting lives.

Both layers must agree for the home page. A mismatch produces two conflicting crawl views of the same
URL, which is worse than either layer being merely suboptimal. The test suite asserts they match.

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

These are declared once as `MAIN_KEYWORD` and `SUPPORTING_KEYWORDS` in `SEO.jsx`. The rule the codebase
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

`public/robots.txt` allows the site, disallows `/500` and `/404`, and points at
`https://incapremodentalcare.com/sitemap.xml`. The sitemap lists the six indexable routes with
`lastmod`, `changefreq` and `priority`, and the `/proof-of-work` entry carries Google image-sitemap
annotations for the six gallery images.

## 8. Making a change

**Retarget a keyword.** Edit the `keywords` array for that route in `PAGE_SEO`. The test suite rejects
any term not on the approved list.

**Add a keyword to the approved set.** Add it to `SUPPORTING_KEYWORDS`, then allocate it to at least one
page — the keyword-coverage test fails if a term is declared but never targeted.

**Change the business phone number or address.** Edit `NAP`. Check whether the value is duplicated in
`index.html`'s JSON-LD, which is a separate static copy and must be updated by hand.

**Add a new page.** Create the route in `src/App.jsx`, add a `PAGE_SEO` entry, render
`<SEO url="/new-route" breadcrumb={[…]} />`, and add a `<url>` entry to `public/sitemap.xml`.

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
