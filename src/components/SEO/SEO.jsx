import { Helmet } from 'react-helmet-async';

/* ------------------------------------------------------------------ *
 * Site identity
 * ------------------------------------------------------------------ */
export const SITE_NAME = 'Incapremo Dental Care';
export const SITE_URL = 'https://incapremodentalcare.com';
export const BRAND_KEYWORD = 'dentalcarewb';
export const DEFAULT_LOCALE = 'en_IN';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/oie_Xo2NfYNrbzXd.png`;
export const DEFAULT_OG_IMAGE_ALT =
  'Incapremo Dental Care — dentist near me in Purulia, West Bengal';

/* ------------------------------------------------------------------ *
 * Keyword strategy
 *
 * MAIN_KEYWORD is the commercial head term. Every indexable page
 * targets exactly one primary keyword from SUPPORTING_KEYWORDS (or the
 * main keyword itself) and carries a small supporting set. No page
 * should ever list the whole set — that is keyword stuffing.
 * ------------------------------------------------------------------ */
export const MAIN_KEYWORD = 'dentist';

export const SUPPORTING_KEYWORDS = [
  'dentist near me',
  'pediatric dentist near me',
  'kids dentist near me',
  'dental treatment in purulia',
  'dental treatment in kolkata',
  'best dentist near me',
  'orthodontics in Kolkata',
  'dentist clinic near me',
];

/**
 * Per-route on-page SEO plan. `primary` is the term the page's title,
 * description and H1 are written around. `supporting` is the closed
 * vocabulary that page is allowed to reinforce.
 */
export const PAGE_SEO = {
  '/': {
    primary: MAIN_KEYWORD,
    title: 'Dentist Near Me in Purulia & Kolkata',
    description:
      'Dentist near me in Purulia, West Bengal. Incapremo Dental Care is a kids dentist offering dental treatment in Purulia & Kolkata. Call (+91) 7050576335.',
    keywords: [
      MAIN_KEYWORD,
      'dentist near me',
      'best dentist near me',
      'dental treatment in purulia',
      'dental treatment in kolkata',
      'pediatric dentist near me',
    ],
  },
  '/services': {
    primary: 'dental treatment in purulia',
    title: 'Dental Treatment in Purulia & Kolkata',
    description:
      'Dental treatment in Purulia & Kolkata — preventive dentistry, pediatric root canal, dental trauma, space maintenance & orthodontics. Call (+91) 7050576335.',
    keywords: [
      'dental treatment in purulia',
      'dental treatment in kolkata',
      MAIN_KEYWORD,
      'dentist near me',
      'orthodontics in Kolkata',
    ],
  },
  '/about': {
    primary: 'best dentist near me',
    title: 'Best Dentist Near Me in Purulia',
    description:
      'Best dentist near me in Purulia — Dr. Deepankar Bhattacharya, B.D.S., M.D.S. (Pediatric Dentistry), Ex-Associate Professor. Call (+91) 7050576335.',
    keywords: [
      'best dentist near me',
      MAIN_KEYWORD,
      'dentist near me',
      'pediatric dentist near me',
      'kids dentist near me',
    ],
  },
  '/contact': {
    primary: 'dentist clinic near me',
    title: 'Dental Clinic Near Me in Purulia',
    description:
      'Dentist clinic near me in Purulia, West Bengal. Incapremo Dental Care, Deshbandhu Rd — call (+91) 7050576335 or book online. Open Mon–Sat, 10AM–2PM & 5PM–8PM.',
    keywords: [
      'dentist clinic near me',
      'dentist near me',
      MAIN_KEYWORD,
      'dental treatment in purulia',
    ],
  },
  '/emergency': {
    primary: 'dentist near me',
    title: 'Emergency Dentist Near Me in Purulia',
    description:
      'Emergency dentist near me in Purulia. Same-day care for severe toothache, knocked-out or broken teeth, abscess & swelling. Call (+91) 7050576335 now.',
    keywords: [
      'dentist near me',
      'dentist clinic near me',
      MAIN_KEYWORD,
      'dental treatment in purulia',
    ],
  },
  '/proof-of-work': {
    primary: 'best dentist near me',
    title: 'Dental Results & Before-After Photos',
    description:
      'Before-and-after photos of real dental treatment in Purulia by Dr. Deepankar Bhattacharya — pediatric, root canal, cosmetic and emergency cases.',
    keywords: [
      'best dentist near me',
      MAIN_KEYWORD,
      'dentist near me',
      'dental treatment in purulia',
    ],
  },
};

/* ------------------------------------------------------------------ *
 * Business data (single source of truth for NAP + schema)
 * ------------------------------------------------------------------ */
export const NAP = {
  street: 'Deshbandhu Rd, behind Reliance Digital',
  locality: 'Purulia',
  region: 'West Bengal',
  regionCode: 'IN-WB',
  postalCode: '723101',
  country: 'IN',
  countryName: 'India',
  phone: '(+91) 7050576335',
  phoneHref: '+917050576335',
  email: 'dr.deepankarbhattacharya@gmail.com',
  latitude: 23.3315,
  longitude: 86.3644,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '14:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '17:00',
      closes: '20:00',
    },
  ],
};

export const AREAS_SERVED = ['Purulia', 'Kolkata', 'Dhanbad', 'Bokaro', 'Asansol', 'Ranchi'];

export const SOCIAL_PROFILES = [
  'https://www.facebook.com/people/Incapremo-Dental-Care/61568445414620/',
  'https://www.instagram.com/incapremodental/',
  'https://maps.app.goo.gl/p3BLPCVnkG4gG2HB6',
];

export const SERVICE_CATALOG = [
  'Preventive Dentistry',
  'Pediatric Endodontics',
  'Dental Trauma Management',
  'Space Maintenance & Growth Modification',
  'Pediatric Periodontics',
  'Interceptive Orthodontics',
  'Root Canal Treatment',
  'Emergency Dental Care',
];

const DENTIST_ID = `${SITE_URL}/#dentist`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const IMAGE_MIME = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
};

function imageMime(url) {
  const ext = String(url).split('?')[0].split('.').pop().toLowerCase();
  return IMAGE_MIME[ext] || 'image/png';
}

function toAbsolute(path = '/') {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function normalisePath(path = '/') {
  if (!path || path === '/') return '/';
  return path.startsWith('/') ? path.replace(/\/+$/, '') : `/${path}`;
}

/** Look up the on-page plan for a route, falling back to the home page plan. */
export function seoFor(path = '/') {
  return PAGE_SEO[normalisePath(path)] || PAGE_SEO['/'];
}

/* ------------------------------------------------------------------ *
 * JSON-LD schema factories
 * ------------------------------------------------------------------ */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': DENTIST_ID,
    name: SITE_NAME,
    alternateName: [BRAND_KEYWORD, 'Dental Care WB', 'Incapremo Dental Care West Bengal'],
    slogan: 'Your smile is our priority',
    description: PAGE_SEO['/'].description,
    url: `${SITE_URL}/`,
    telephone: NAP.phone,
    email: NAP.email,
    image: DEFAULT_OG_IMAGE,
    logo: `${SITE_URL}/logo.png`,
    priceRange: '$$',
    currenciesAccepted: 'INR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: NAP.street,
      addressLocality: NAP.locality,
      addressRegion: NAP.region,
      postalCode: NAP.postalCode,
      addressCountry: NAP.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: NAP.latitude,
      longitude: NAP.longitude,
    },
    hasMap: 'https://maps.app.goo.gl/p3BLPCVnkG4gG2HB6',
    openingHoursSpecification: NAP.openingHoursSpecification,
    areaServed: [
      ...AREAS_SERVED.map((name) => ({ '@type': 'City', name })),
      { '@type': 'State', name: 'West Bengal' },
    ],
    sameAs: SOCIAL_PROFILES,
    founder: {
      '@type': 'Person',
      name: 'Dr. Deepankar Bhattacharya',
      jobTitle: 'Pediatric Dentist',
      description:
        'B.D.S., M.D.S. (Pediatric Dentistry & Preventive Dentistry) with 15+ years of experience and former Ex-Associate Professor.',
    },
    availableLanguage: ['English', 'Hindi', 'Bengali'],
    medicalSpecialty: ['Pediatric', 'Preventive', 'Orthodontic'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Dental treatments in Purulia & Kolkata',
      itemListElement: SERVICE_CATALOG.map((name, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'MedicalProcedure',
          name,
          provider: { '@id': DENTIST_ID },
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: PAGE_SEO['/'].description,
    inLanguage: 'en-IN',
    publisher: { '@id': DENTIST_ID },
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/about/#dr-deepankar-bhattacharya`,
    name: 'Dr. Deepankar Bhattacharya',
    jobTitle: 'Pediatric Dentist',
    description:
      'B.D.S., M.D.S. (Pediatric Dentistry & Preventive Dentistry), Ex-Associate Professor with 15+ years of clinical experience in pediatric and family dentistry.',
    url: `${SITE_URL}/about`,
    telephone: NAP.phone,
    email: NAP.email,
    worksFor: { '@id': DENTIST_ID },
    knowsLanguage: ['en', 'hi', 'bn'],
    knowsAbout: [
      'Pediatric Dentistry',
      'Preventive Dentistry',
      'Endodontics',
      'Dental Trauma Management',
      'Space Maintenance',
      'Interceptive Orthodontics',
      'Pediatric Periodontics',
    ],
  };
}

export function webPageSchema({
  name,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  datePublished = '2026-01-01',
  dateModified = '2026-09-26',
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${toAbsolute(path)}#webpage`,
    url: toAbsolute(path),
    name,
    description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': DENTIST_ID },
    primaryImageOfPage: { '@id': image },
    datePublished,
    dateModified,
  };
}

export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: toAbsolute(item.path),
    })),
  };
}

export function serviceSchema(path, name, description, procedures = SERVICE_CATALOG) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${toAbsolute(path)}#services`,
    name,
    description,
    itemListElement: procedures.map((procedure, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'MedicalProcedure',
        name: procedure,
        provider: { '@id': DENTIST_ID },
      },
    })),
  };
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
  noindex = false,
  dateModified,
}) {
  const plan = seoFor(url);
  const pagePath = normalisePath(url);
  const pageUrl = toAbsolute(pagePath);

  const pageTitle = title ?? plan.title;
  const fullTitle = `${pageTitle} | ${SITE_NAME}`;
  const pageDescription = description ?? plan.description;
  const pageName = pageTitle;
  const alt = imageAlt ?? DEFAULT_OG_IMAGE_ALT;
  const mime = imageMime(image);

  // Omit <meta name="keywords"> entirely when a route has no keyword set
  // (legal / error pages) rather than padding it with site-wide terms.
  const keywordList = keywords ?? plan.keywords;
  const metaKeywords = Array.isArray(keywordList)
    ? keywordList.filter(Boolean).join(', ')
    : keywordList || null;

  const robots = noindex
    ? 'noindex, nofollow'
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
