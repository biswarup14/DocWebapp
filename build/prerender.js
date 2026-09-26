/**
 * Emits one static HTML file per route so that crawlers which do not execute
 * JavaScript still see a correct <head>.
 *
 * Why this exists
 * ---------------
 * `not_found_handling: "single-page-application"` used to serve the same
 * index.html for every path. The <head> in that file always described the home
 * page, so every URL on the site looked like a duplicate of `/` to any crawler
 * that does not run JavaScript. Correct canonicals are the strongest on-page
 * signal for indexing, so they have to be in the served bytes, not produced by
 * React after the fact.
 *
 * What it does and does not do
 * ----------------------------
 * It rewrites <head> only. The <body> still ships an empty #root and is filled
 * in by React on load, exactly as before — so there is no hydration mismatch
 * and no visual flash. That means titles, descriptions, canonicals, hreflang,
 * Open Graph, Twitter cards and JSON-LD are all served statically, while body
 * copy is still client-rendered. Serving body copy too would need the React
 * tree rendered to a string, which is a larger change with real mismatch risk.
 *
 * Every value written here comes from src/config/seo.js, which is the same
 * module the <SEO> component reads at runtime, so the two cannot disagree.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { INDEXABLE_ROUTES, SITE_NAME, SITE_URL, absoluteUrl } from '../src/config/site.js';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_LOCALE,
  PAGE_SEO,
  NOINDEX_PATHS,
  localBusinessSchema,
  webPageSchema,
  breadcrumbSchema,
  faqSchema,
  emergencyServiceSchema,
  servicesSchema,
  imageGallerySchema,
} from '../src/config/seo.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** JSON-LD is injected into a <script>, so only `</script` needs breaking out. */
function safeJsonLd(value) {
  return JSON.stringify(value, null, 2).replace(/</g, '\\u003c');
}

/**
 * Per-route extras, mirroring the `extraSchemas` each page passes to <SEO>.
 * A new page with structured data must be added here too — the consistency
 * test in src/config/site.test.jsx fails if the two ever disagree.
 */
const EXTRA_SCHEMAS = {
  '/': () => [faqSchema],
  '/services': () => [servicesSchema()],
  '/emergency': () => [emergencyServiceSchema()],
  '/proof-of-work': () => [imageGallerySchema()],
};

const BREADCRUMBS = {
  '/services': ['Services'],
  '/emergency': ['Emergency'],
  '/about': ['About'],
  '/contact': ['Contact'],
  '/proof-of-work': ['Proof of Work'],
};

const ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const ROBOTS_NOINDEX = 'noindex, follow';

/** The tags this script owns. React re-emits all of them on hydration. */
const MANAGED = [
  /<title>[\s\S]*?<\/title>/gi,
  /<meta\s+name="description"[^>]*>/gi,
  /<meta\s+name="keywords"[^>]*>/gi,
  /<meta\s+name="robots"[^>]*>/gi,
  /<meta\s+name="googlebot"[^>]*>/gi,
  /<meta\s+property="og:(title|description|url|image|image:secure_url|image:alt|type|width|height|locale)"[^>]*>/gi,
  /<meta\s+name="twitter:(title|description|image|image:alt)"[^>]*>/gi,
  /<link\s+rel="canonical"[^>]*>/gi,
  /<link\s+rel="alternate"[^>]*>/gi,
  /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi,
];

/**
 * Builds the static <head> for one route.
 *
 * Copy comes from PAGE_SEO, which is the single source for every route and the
 * same module the <SEO> component reads, so the served bytes and the hydrated
 * head cannot disagree. The 404 is the one path with no entry, so it passes
 * explicit copy, and gets no canonical (a 404 must not ask to be indexed).
 */
function buildHead({ path, title, description, keywords, noindex }) {
  const pageUrl = absoluteUrl(path);
  const plan = PAGE_SEO[path];
  const fullTitle = `${title ?? plan.title} | ${SITE_NAME}`;
  const pageDescription = description ?? plan.description;
  const robotsValue = noindex ?? plan.noindex;
  const image = DEFAULT_OG_IMAGE;

  const meta = [
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(pageDescription)}" />`,
  ];

  if (keywords?.length) {
    meta.push(`<meta name="keywords" content="${escapeHtml(keywords.join(', '))}" />`);
  }

  const robots = robotsValue ? ROBOTS_NOINDEX : ROBOTS;
  meta.push(`<meta name="robots" content="${robots}" />`);
  meta.push(`<meta name="googlebot" content="${robots}" />`);

  if (!noindex) {
    meta.push(
      `<link rel="canonical" href="${pageUrl}" />`,
      `<link rel="alternate" hreflang="en-IN" href="${pageUrl}" />`,
      `<link rel="alternate" hreflang="x-default" href="${pageUrl}" />`,
    );
  }

  meta.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:locale" content="${DEFAULT_LOCALE}" />`,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(pageDescription)}" />`,
    `<meta property="og:url" content="${pageUrl}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:secure_url" content="${image}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(DEFAULT_OG_IMAGE_ALT)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(pageDescription)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(DEFAULT_OG_IMAGE_ALT)}" />`,
  );

  // Geo tags are identical on every page, so they stay in the base template.
  const schemas = [
    localBusinessSchema(),
    webPageSchema({ name: title ?? plan.title, description: pageDescription, path }),
  ];

  const trail = BREADCRUMBS[path];
  if (trail) {
    schemas.push(
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        ...trail.map((name) => ({ name, path })),
      ]),
    );
  }

  for (const extra of EXTRA_SCHEMAS[path]?.() ?? []) schemas.push(extra);

  for (const schema of schemas) {
    meta.push(`<script type="application/ld+json">${safeJsonLd(schema)}</script>`);
  }

  return meta.join('\n    ');
}

function rewriteHead(html, head) {
  let out = html;
  for (const pattern of MANAGED) out = out.replace(pattern, '');
  // Collapse the blank lines the removals leave behind, then inject.
  out = out.replace(/\n{3,}/g, '\n\n');
  return out.replace('</head>', `    ${head}\n  </head>`);
}

function routeFile(path) {
  return path === '/' ? 'index.html' : `${path.replace(/^\//, '')}/index.html`;
}

function write(file, html) {
  const full = join(DIST, file);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, html);
  return file;
}

function main() {
  const templatePath = join(DIST, 'index.html');
  if (!existsSync(templatePath)) {
    throw new Error(`prerender: ${templatePath} not found — run vite build first`);
  }
  const template = readFileSync(templatePath, 'utf8');

  const written = [];

  // One file per route in PAGE_SEO: the indexable set plus the noindex pages.
  // The home page is written to dist/index.html; the rest to
  // dist/<route>/index.html, which `html_handling: "drop-trailing-slash"`
  // serves at the trailing-slash-free canonical.
  for (const route of [...INDEXABLE_ROUTES.map((r) => r.path), ...NOINDEX_PATHS]) {
    written.push(write(routeFile(route), rewriteHead(template, buildHead({ path: route }))));
  }

  // Served with a real 404 status by assets.not_found_handling: "404-page".
  // /404 is deliberately absent from PAGE_SEO, so its copy is passed inline and
  // it gets no canonical — a 404 must not ask to be indexed.
  written.push(
    write(
      '404.html',
      rewriteHead(
        template,
        buildHead({
          path: '/404',
          title: 'Page Not Found',
          description: 'The page you were looking for could not be found.',
          keywords: [],
          noindex: true,
        }),
      ),
    ),
  );

  // Every prerendered file must name its own canonical, so that a stale
  // __SITE_URL__ token or an inherited head cannot ship unnoticed.
  for (const file of written) {
    const contents = readFileSync(join(DIST, file), 'utf8');
    if (contents.includes('__SITE_URL__')) {
      throw new Error(`prerender: ${file} still contains an unsubstituted __SITE_URL__`);
    }
    if (!contents.includes(SITE_URL)) {
      throw new Error(`prerender: ${file} never mentions ${SITE_URL}`);
    }
    if (file === '404.html') continue;

    const path = file === 'index.html' ? '/' : `/${file.split('/')[0]}`;
    if (!contents.includes(absoluteUrl(path))) {
      throw new Error(`prerender: ${file} is missing its own canonical ${absoluteUrl(path)}`);
    }
  }

  console.log(`prerender: wrote ${written.length} files`);
  for (const file of written) console.log(`  dist/${file}`);
}

main();
