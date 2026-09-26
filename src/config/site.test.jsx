import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

import SEO, {
  SITE_URL,
  PAGE_SEO,
  seoFor,
  localBusinessSchema,
  websiteSchema,
  personSchema,
  webPageSchema,
  breadcrumbSchema,
  serviceSchema,
} from '../components/SEO/SEO';
import { faqSchema } from '../components/FAQ/FAQ';
import {
  INDEXABLE_ROUTES,
  DISALLOWED_PATHS,
  absoluteUrl,
  absoluteAssetUrl,
} from './site';
import { NOINDEX_PATHS } from './seo';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');

/** Hosts that are legitimately not ours. Everything else must be first-party. */
const EXTERNAL_HOSTS = [
  'schema.org',
  'sitemaps.org',
  'google.com',
  'googleapis.com',
  'gstatic.com',
  'facebook.com',
  'instagram.com',
  'linkedin.com',
  'maps.app.goo.gl',
  'unsplash.com',
  'vite.dev',
  'w3.org',
  'developers.cloudflare.com',
];

function isFirstParty(url) {
  const host = new URL(url).hostname.toLowerCase();
  return !EXTERNAL_HOSTS.some(
    (allowed) => host === allowed || host.endsWith(`.${allowed}`),
  );
}

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return walk(full);
    return [full];
  });
}

function renderHead(url) {
  render(
    <HelmetProvider context={{}}>
      <SEO url={url} />
    </HelmetProvider>,
  );
  return document.head.innerHTML;
}

beforeEach(() => {
  document.head.innerHTML = '';
});

describe('site URL configuration', () => {
  it('declares an https origin with no trailing slash or path', () => {
    expect(SITE_URL).toMatch(/^https:\/\/[^/\s]+\.[a-z]{2,}$/);
  });

  it('builds absolute URLs without doubling or dropping slashes', () => {
    expect(absoluteUrl('/')).toBe(`${SITE_URL}/`);
    expect(absoluteUrl('/services')).toBe(`${SITE_URL}/services`);
    expect(absoluteUrl('services')).toBe(`${SITE_URL}/services`);
    expect(absoluteUrl('/services/')).toBe(`${SITE_URL}/services`);
    expect(absoluteAssetUrl('gall1.webp')).toBe(`${SITE_URL}/gall1.webp`);
  });

  it('lists no duplicate routes and writes none with a trailing slash', () => {
    const paths = INDEXABLE_ROUTES.map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const path of paths) {
      expect(path).toBe(`/${path.replace(/^\/|\/+$/g, '')}`);
    }
  });

  it('keeps noindex routes out of the sitemap', () => {
    const paths = INDEXABLE_ROUTES.map((route) => route.path);
    for (const path of DISALLOWED_PATHS) {
      expect(paths).not.toContain(path);
    }
  });

  it('has an on-page plan for every indexable route', () => {
    for (const route of INDEXABLE_ROUTES) {
      expect(PAGE_SEO[route.path]).toBeDefined();
    }
  });
});

describe('sitemap, canonical and schema agreement', () => {
  it('emits a canonical identical to the matching sitemap loc', () => {
    for (const route of INDEXABLE_ROUTES) {
      const head = renderHead(route.path);
      expect(head).toContain(`rel="canonical" href="${absoluteUrl(route.path)}"`);
    }
  });

  it('gives every gallery image an absolute <image:loc>', () => {
    const gallery = INDEXABLE_ROUTES.find((route) => route.path === '/proof-of-work');
    expect(gallery.images).toHaveLength(6);
    for (const image of gallery.images) {
      expect(absoluteAssetUrl(image.src).startsWith(`${SITE_URL}/`)).toBe(true);
    }
  });

  it('anchors every absolute URL in every schema to the canonical origin', () => {
    const schemas = [
      localBusinessSchema(),
      websiteSchema(),
      personSchema(),
      webPageSchema({ name: 'Test', path: '/services' }),
      breadcrumbSchema([{ name: 'Home', path: '/' }]),
      serviceSchema('/services', 'Dental Treatment', 'desc'),
      faqSchema,
    ];

    // Deep-walk, because @id references are nested at arbitrary depth
    // (itemListElement[].item.provider['@id'] and so on).
    const collectUrls = (node) => {
      if (typeof node === 'string') return /^https?:/i.test(node) ? [node] : [];
      if (Array.isArray(node)) return node.flatMap(collectUrls);
      if (node && typeof node === 'object') {
        return Object.values(node).flatMap(collectUrls);
      }
      return [];
    };

    const urls = schemas.flatMap(collectUrls);
    expect(urls.length).toBeGreaterThan(10);

    for (const url of urls) {
      // @context, hasMap and sameAs point off-site by design.
      if (!isFirstParty(url)) continue;
      expect(url.startsWith(`${SITE_URL}/`)).toBe(true);
    }
  });
});

/**
 * These read dist/, so they only mean anything after `npm run build`. They
 * exist because the three places a URL can be written — src/config/seo.js
 * (runtime <SEO>), dist/<route>/index.html (prerender), and dist/sitemap.xml —
 * are separate code paths, and the original soft-404 bug was exactly the kind
 * of drift that no in-memory assertion catches.
 */
const DIST = join(ROOT, 'dist');
const isBuilt = existsSync(join(DIST, 'index.html'));
const describeBuilt = isBuilt ? describe : describe.skip;

describeBuilt('prerendered dist output', () => {
  const read = (file) => readFileSync(join(DIST, file), 'utf8');
  const fileFor = (path) => (path === '/' ? 'index.html' : `${path.slice(1)}/index.html`);

  it('gives every indexable route its own file with a matching canonical', () => {
    const canonicals = new Set();

    for (const route of INDEXABLE_ROUTES) {
      const file = fileFor(route.path);
      expect(existsSync(join(DIST, file)), `missing dist/${file}`).toBe(true);

      const html = read(file);
      const canonical = absoluteUrl(route.path);
      expect(html).toContain(`rel="canonical" href="${canonical}"`);
      expect(html).toContain(`property="og:url" content="${canonical}"`);

      // The soft-404 bug: every URL shipping the home page's head.
      expect(html).toContain(`href="${canonical}"`);
      canonicals.add(canonical);
    }

    // Each file must be self-describing, not six copies of one head.
    expect(canonicals.size).toBe(INDEXABLE_ROUTES.length);
  });

  it('lists exactly the prerendered canonicals in the sitemap', () => {
    const sitemap = read('sitemap.xml');
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

    expect(new Set(locs)).toEqual(new Set(INDEXABLE_ROUTES.map((r) => absoluteUrl(r.path))));
  });

  it('keeps noindex pages out of the sitemap but still on disk', () => {
    const sitemap = read('sitemap.xml');
    expect(NOINDEX_PATHS.length).toBeGreaterThan(0);

    for (const path of NOINDEX_PATHS) {
      const file = fileFor(path);
      expect(existsSync(join(DIST, file)), `missing dist/${file}`).toBe(true);

      const html = read(file);
      expect(html).toContain('content="noindex, follow"');
      expect(sitemap).not.toContain(`<loc>${absoluteUrl(path)}</loc>`);
    }
  });

  it('gives the 404 page noindex and no canonical', () => {
    const html = read('404.html');
    expect(html).toContain('content="noindex, follow"');
    // A 404 that advertises a canonical tells crawlers to index it.
    expect(html).not.toMatch(/rel="canonical"/);
    expect(html).toContain('id="root"');
  });

  it('never emits a pre-rendered head that contradicts the runtime config', () => {
    for (const route of INDEXABLE_ROUTES) {
      const html = read(fileFor(route.path));
      // Both derive from seoFor(path); a mismatch means the head was hand-edited.
      expect(html).toContain(`<title>${PAGE_SEO[route.path].title} | Incapremo Dental Care</title>`
        .replace(/&/g, '&amp;'));
      expect(html).not.toContain('__SITE_URL__');
    }
  });

  it('resolves a distinct title for every noindex page at runtime too', () => {
    // PAGE_SEO is the only place these pages' copy lives; if a path is missing
    // from it, seoFor() throws rather than handing back the home page's title.
    for (const path of NOINDEX_PATHS) {
      const head = renderHead(path);
      expect(head).toContain(
        `<title>${PAGE_SEO[path].title.replace(/&/g, '&amp;')} | Incapremo Dental Care</title>`,
      );
      expect(head).toContain('content="noindex, follow"');
    }
  });

  it('refuses to invent SEO for a path that was never declared', () => {
    // The silent `PAGE_SEO[path] || PAGE_SEO['/']` fallback paired a foreign
    // title with a self-referential canonical and read as correct in review.
    expect(() => seoFor('/a-route-that-does-not-exist')).toThrow(/no PAGE_SEO entry/);
  });
});

/**
 * The failure that motivated all of this: the domain was hardcoded in eight
 * files and had already drifted, so no single edit could move the site. This
 * test fails the build if a literal origin reappears anywhere else.
 */
describe('no hardcoded origins outside the single source of truth', () => {
  it('finds first-party domains in exactly one file', () => {
    const offenders = [];

    for (const file of [
      ...walk(join(ROOT, 'src')),
      ...walk(join(ROOT, 'build')),
      join(ROOT, 'index.html'),
    ]) {
      const rel = relative(ROOT, file);
      if (rel === join('src', 'config', 'site.js')) continue;
      if (/\.(test|spec)\.[a-z]+$/.test(rel)) continue;

      const found = readFileSync(file, 'utf8').match(
        /https?:\/\/[a-z0-9-]+(?:\.[a-z0-9-]+)+/gi,
      );

      const firstParty = (found ?? []).filter(isFirstParty);

      if (firstParty.length) {
        offenders.push(`${rel}: ${[...new Set(firstParty)].join(', ')}`);
      }
    }

    expect(offenders).toEqual([]);
  });
});
