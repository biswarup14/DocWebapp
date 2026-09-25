import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import SEO, {
  websiteSchema,
  breadcrumbSchema,
  serviceSchema,
  webPageSchema,
  localBusinessSchema,
  personSchema,
  seoFor,
  AREAS_SERVED,
  PAGE_SEO,
  SUPPORTING_KEYWORDS,
  MAIN_KEYWORD,
  NAP,
} from './SEO';
import { faqSchema } from '../FAQ/FAQ';

const extras = [
  websiteSchema(),
  webPageSchema({ name: 'Test', path: '/' }),
  breadcrumbSchema([{ name: 'Home', path: '/' }]),
  serviceSchema('/services', 'Dental Treatment in Purulia & Kolkata', 'desc'),
  personSchema(),
  localBusinessSchema(),
  faqSchema,
];

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderHead(props) {
  render(
    <HelmetProvider context={{}}>
      <SEO {...props} />
    </HelmetProvider>,
  );
  return document.head.innerHTML;
}

describe('SEO output', () => {
  it('emits parseable JSON-LD and required meta', () => {
    const head = renderHead({ url: '/', extraSchemas: extras });

    const scripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
    expect(scripts.length).toBe(extras.length + 2);
    for (const s of scripts) {
      expect(() => JSON.parse(s.textContent)).not.toThrow();
    }

    for (const needle of [
      'og:type',
      'og:title',
      'og:description',
      'og:url',
      'og:image',
      'og:image:secure_url',
      'og:image:type',
      'og:image:width',
      'og:image:height',
      'og:image:alt',
      'og:site_name',
      'og:locale',
      'twitter:card',
      'twitter:title',
      'twitter:description',
      'twitter:image',
      'twitter:image:alt',
      'rel="canonical"',
      'hreflang="en-IN"',
      'hreflang="x-default"',
      'name="robots"',
      'max-image-preview:large',
      'name="keywords"',
      'Dentist Near Me in Purulia',
    ]) {
      expect(head, `missing ${needle}`).toContain(needle);
    }
  });

  it('derives title, description and keywords from the route', () => {
    const head = renderHead({ url: '/services' });
    const plan = PAGE_SEO['/services'];
    const escaped = escapeHtml(plan.title);

    expect(head).toContain(`<title>${escaped} | Incapremo Dental Care</title>`);
    expect(head).toContain(escapeHtml(plan.description));
    for (const kw of plan.keywords) {
      expect(head).toContain(kw);
    }
    expect(head).toContain('rel="canonical" href="https://incapremodentalcare.com/services"');
  });

  it('covers the full requested keyword set across the site', () => {
    expect(MAIN_KEYWORD).toBe('dentist');
    expect(SUPPORTING_KEYWORDS).toEqual([
      'dentist near me',
      'pediatric dentist near me',
      'kids dentist near me',
      'dental treatment in purulia',
      'dental treatment in kolkata',
      'best dentist near me',
      'orthodontics in Kolkata',
      'dentist clinic near me',
    ]);

    const used = new Set(Object.values(PAGE_SEO).flatMap((p) => p.keywords));
    for (const kw of [MAIN_KEYWORD, ...SUPPORTING_KEYWORDS]) {
      expect(used, `keyword never targeted: ${kw}`).toContain(kw);
    }
  });

  it('only uses approved keywords and assigns one primary term per page', () => {
    const approved = new Set([MAIN_KEYWORD, ...SUPPORTING_KEYWORDS]);

    for (const [path, plan] of Object.entries(PAGE_SEO)) {
      expect(approved.has(plan.primary), `${path} primary not approved`).toBe(true);
      expect(plan.title.length, `${path} title too long`).toBeLessThanOrEqual(65);
      expect(plan.description.length, `${path} description too long`).toBeLessThanOrEqual(160);
      for (const kw of plan.keywords) {
        expect(approved.has(kw), `${path} uses unapproved keyword: ${kw}`).toBe(true);
      }
    }
  });

  it('omits the keywords tag when a route has no keyword set', () => {
    renderHead({ url: '/privacy-policy', keywords: [], noindex: true, schema: false });
    expect(document.head.innerHTML).not.toContain('name="keywords"');
    expect(document.head.innerHTML).toContain('noindex, nofollow');
  });

  it('suppresses every JSON-LD block when schema is false', () => {
    renderHead({
      url: '/404',
      keywords: [],
      noindex: true,
      schema: false,
      breadcrumb: [{ name: 'Home', path: '/' }],
      extraSchemas: extras,
    });
    expect(document.querySelectorAll('script[type="application/ld+json"]').length).toBe(0);
  });

  it('falls back to the home page plan for unmapped routes', () => {
    expect(seoFor('/does-not-exist')).toBe(PAGE_SEO['/']);
    expect(seoFor('/')).toBe(PAGE_SEO['/']);
  });

  it('keeps schema NAP consistent', () => {
    const biz = localBusinessSchema();
    expect(biz.address.addressLocality).toBe(NAP.locality);
    expect(biz.telephone).toBe(NAP.phone);
    expect(biz.areaServed.map((a) => a.name)).toEqual(expect.arrayContaining(AREAS_SERVED));
    expect(biz.hasOfferCatalog.itemListElement.length).toBeGreaterThan(0);
    expect(biz.description).toBe(PAGE_SEO['/'].description);
  });
});
