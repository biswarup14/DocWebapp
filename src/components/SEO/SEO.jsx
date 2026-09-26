import { Helmet } from 'react-helmet-async';

import { SITE_NAME } from '../../config/site.js';
import {
  DEFAULT_LOCALE,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  NAP,
  seoFor,
  toAbsolute,
  imageMime,
  webPageSchema,
  breadcrumbSchema,
  localBusinessSchema,
} from '../../config/seo.js';

/**
 * All SEO data and schema factories now live in plain-JS modules so that
 * build/prerender.js can emit the same head and the same JSON-LD into static
 * HTML. These re-exports keep the existing
 * `import SEO, { NAP } from '../../components/SEO/SEO'` style working.
 */
export { SITE_URL, SITE_NAME, OG_IMAGE, absoluteUrl } from '../../config/site.js';
export {
  BRAND_KEYWORD,
  DEFAULT_LOCALE,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  PAGE_SEO,
  NAP,
  AREAS_SERVED,
  SERVICE_CATALOG,
  SOCIAL_PROFILES,
  MAIN_KEYWORD,
  SUPPORTING_KEYWORDS,
  seoFor,
  toAbsolute,
  imageMime,
  localBusinessSchema,
  websiteSchema,
  personSchema,
  webPageSchema,
  breadcrumbSchema,
  serviceSchema,
  emergencyServiceSchema,
  servicesSchema,
  imageGallerySchema,
  GALLERY_ITEMS,
  faqSchema,
  faqData,
} from '../../config/seo.js';

function normalisePath(path = '/') {
  if (!path || path === '/') return '/';
  return path.startsWith('/') ? path.replace(/\/+$/, '') : `/${path}`;
}

/* ------------------------------------------------------------------ *
 * <SEO> — the single component every route renders.
 *
 * Titles, descriptions and keywords all default from PAGE_SEO via the
 * `url` prop, so a page only has to declare its route. `schema={false}`
 * disables every JSON-LD block for that route (legal + error pages).
 * ------------------------------------------------------------------ */
export default function SEO({
  title,
  description,
  keywords,
  url = '/',
  type = 'website',
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  imageWidth = 1200,
  imageHeight = 630,
  schema,
  extraSchemas = [],
  breadcrumb,
  noindex,
  dateModified,
}) {
  const pagePath = normalisePath(url);
  const pageUrl = toAbsolute(pagePath);

  // Looked up lazily, and only for the props not passed in. seoFor() throws for
  // a path with no PAGE_SEO entry on purpose, so resolving it unconditionally
  // would force a config entry even for a page that declares its own title and
  // description — /404 does exactly that.
  const needsPlan =
    title == null || description == null || keywords == null || noindex == null;
  const plan = needsPlan ? seoFor(url) : null;

  const pageTitle = title ?? plan.title;
  const fullTitle = `${pageTitle} | ${SITE_NAME}`;
  const pageDescription = description ?? plan.description;
  const pageName = pageTitle;
  const alt = imageAlt ?? DEFAULT_OG_IMAGE_ALT;
  const mime = imageMime(image);

  // Omit <meta name="keywords"> entirely when a route has no keyword set
  // (legal / error pages) rather than padding it with site-wide terms.
  const keywordList = keywords ?? plan?.keywords;
  const metaKeywords = Array.isArray(keywordList)
    ? keywordList.filter(Boolean).join(', ')
    : keywordList || null;

  // `noindex, follow` — not `nofollow`. Google deprecated the page-level
  // nofollow attribute; the modern directive is to keep crawling the page
  // (so its links are discovered) while excluding it from results. It also has
  // to match ROBOTS_NOINDEX in build/prerender.js, or the served bytes and the
  // hydrated head would disagree about the same URL.
  const robots = (noindex ?? plan?.noindex)
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  const schemas = [];
  if (schema !== false) {
    schemas.push({
      ...localBusinessSchema(),
      ...(schema && typeof schema === 'object' ? schema : {}),
    });
    schemas.push(
      webPageSchema({
        name: pageName,
        description: pageDescription,
        path: pagePath,
        image,
        ...(dateModified ? { dateModified } : {}),
      }),
    );
    if (breadcrumb) schemas.push(breadcrumbSchema(breadcrumb));
    schemas.push(...extraSchemas);
  }

  return (
    <Helmet>
      <html lang="en-IN" />
      <title>{fullTitle}</title>
      <meta name="description" content={pageDescription} />
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      <link rel="canonical" href={pageUrl} />
      <link rel="alternate" hrefLang="en-IN" href={pageUrl} />
      <link rel="alternate" hrefLang="x-default" href={pageUrl} />
      <meta name="robots" content={robots} />

      <meta name="author" content={`${SITE_NAME} — Dr. Deepankar Bhattacharya`} />
      <meta name="publisher" content={SITE_NAME} />
      <meta name="geo.region" content={NAP.regionCode} />
      <meta name="geo.placename" content={NAP.locality} />
      <meta name="geo.position" content={`${NAP.latitude};${NAP.longitude}`} />
      <meta name="ICBM" content={`${NAP.latitude}, ${NAP.longitude}`} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={DEFAULT_LOCALE} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content={mime} />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:image:alt" content={alt} />

      {/* X / Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={alt} />

      {schemas.map((item, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(item)}</script>
      ))}
    </Helmet>
  );
}

