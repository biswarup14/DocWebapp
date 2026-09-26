/**
 * Every piece of SEO data and every JSON-LD factory, in plain JavaScript with
 * no React and no browser APIs.
 *
 * This module exists so the site has exactly one copy of its SEO facts. Three
 * consumers import it, and they would otherwise drift apart:
 *
 *   - src/components/SEO/SEO.jsx  client-side <head> via react-helmet-async
 *   - src/components/FAQ/FAQ.jsx  renders the FAQ, emits the FAQPage schema
 *   - build/prerender.js           writes per-route static HTML at build time
 *
 * Keep it free of JSX. Define new schemas here and import them into the page
 * component — a schema declared inside a page component will be missing from
 * the prerendered HTML, and the two versions of the page will disagree.
 */

import {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
  absoluteUrl,
} from './site.js';

export const BRAND_KEYWORD = 'dentalcarewb';
export const DEFAULT_LOCALE = 'en_IN';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/${OG_IMAGE}`;
export const DEFAULT_OG_IMAGE_ALT =
  'Incapremo Dental Care \u2014 dentist near me in Purulia, West Bengal';


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

  /*
   * Real pages that must never be indexed. They are absent from the sitemap
   * but still need their own title and description, because a route with no
   * PAGE_SEO entry used to silently inherit the home page's — the same defect
   * that made every URL in dist/index.html look like a duplicate of `/`.
   */
  '/privacy-policy': {
    primary: '',
    title: 'Privacy Policy',
    description:
      'How Incapremo Dental Care collects, uses and protects your personal and health information.',
    keywords: [],
    noindex: true,
  },
  '/terms-and-conditions': {
    primary: '',
    title: 'Terms & Conditions',
    description:
      'The terms that apply to appointments, payments and website use at Incapremo Dental Care, Purulia.',
    keywords: [],
    noindex: true,
  },
};

/**
 * Paths that resolve to a real page but must stay out of search results.
 * Derived from PAGE_SEO rather than restated, so the `noindex` flag cannot
 * drift between the two lists.
 */
export const NOINDEX_PATHS = Object.freeze(
  Object.keys(PAGE_SEO).filter((path) => PAGE_SEO[path].noindex),
);

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

export function imageMime(url) {
  const ext = String(url).split('?')[0].split('.').pop().toLowerCase();
  return IMAGE_MIME[ext] || 'image/png';
}

export function toAbsolute(path = '/') {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function normalisePath(path = '/') {
  if (!path || path === '/') return '/';
  return path.startsWith('/') ? path.replace(/\/+$/, '') : `/${path}`;
}

/** Look up the on-page plan for a route, falling back to the home page plan. */
/**
 * Throws on an unknown path rather than falling back to the home page.
 *
 * The old `PAGE_SEO[path] || PAGE_SEO['/']` silently handed the home page's
 * title, description and keywords to any path that was missing an entry, which
 * pairs a foreign title with a self-referential canonical — a duplicate-content
 * bug that reads as correct in review. A new route now has to declare its copy.
 */
export function seoFor(path = '/') {
  const key = normalisePath(path);
  const page = PAGE_SEO[key];
  if (!page) {
    throw new Error(
      `seoFor: no PAGE_SEO entry for "${key}". Add one to src/config/seo.js ` +
        `so the route gets its own title and description.`,
    );
  }
  return page;
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
 * FAQ content. Rendered by src/components/FAQ/FAQ.jsx; the schema is
 * emitted from here so the prerendered HTML carries it too.
 * ------------------------------------------------------------------ */
export const faqData = [
  {
    question: 'How to remove plaque from teeth?',
    answer: 'Plaque can be effectively removed by brushing your teeth twice daily with a fluoride toothpaste, flossing regularly, and visiting your dentist for professional cleanings. Use a soft-bristled toothbrush and brush in gentle circular motions along the gumline. Rinsing with an antimicrobial mouthwash can also help reduce plaque buildup between brushing sessions.',
  },
  {
    question: 'Which toothpaste is best for teeth?',
    answer: 'The best toothpaste depends on your specific dental needs. For general use, choose a fluoride toothpaste approved by dental associations. For sensitive teeth, look for toothpastes containing potassium nitrate or stannous fluoride. For cavity prevention, fluoride-based toothpastes are highly recommended. Consult Dr. Deepankar Bhattacharya at Incapremo Dental Care for personalized toothpaste recommendations.',
  },
  {
    question: 'How to remove yellow stains from teeth?',
    answer: 'Yellow stains can be caused by food, beverages, smoking, or aging. Professional teeth whitening treatments are the most effective solution. At-home options include whitening toothpastes and over-the-counter whitening strips. For stubborn stains, professional dental cleaning and scaling can significantly improve tooth appearance. Avoid excessive consumption of tea, coffee, and tobacco products to prevent further staining.',
  },
  {
    question: 'How to cure gum problems?',
    answer: 'Gum problems like gingivitis can be managed with proper oral hygiene — brushing twice daily, flossing, and using antibacterial mouthwash. For advanced gum disease (periodontitis), professional treatment such as scaling and root planing may be required. Regular dental check-ups at Incapremo Dental Care can help detect and treat gum issues early. Maintain a balanced diet and avoid smoking for healthier gums.',
  },
  {
    question: 'What is endodontics?',
    answer: 'Endodontics is a specialized branch of dentistry focused on the diagnosis and treatment of issues related to the dental pulp and tissues surrounding the roots of teeth. The most common endodontic treatment is root canal therapy, which involves removing infected or damaged pulp tissue, cleaning and shaping the root canal, and sealing it to prevent further infection. Dr. Deepankar Bhattacharya is skilled in pediatric endodontic procedures.',
  },
  {
    question: 'When to start brushing after tooth extraction?',
    answer: 'You should wait at least 24 hours after a tooth extraction before gently brushing the extraction site. During the first 24 hours, avoid rinsing, spitting forcefully, or using a straw, as these actions can dislodge the blood clot and delay healing. After 24 hours, brush gently around the extraction site while avoiding direct contact. Rinse gently with warm salt water to keep the area clean. Follow your dentist\'s specific post-extraction care instructions.',
  },
  {
    question: 'Dr. Deepankar Bhattacharya dentist?',
    answer: 'Dr. Deepankar Bhattacharya is a highly experienced pediatric dentist at Incapremo Dental Care in West Bengal. With B.D.S. and M.D.S. qualifications and over 15 years of experience, he specializes in pediatric dentistry, endodontics, dental trauma management, and preventive dentistry. He is known for providing gentle, child-friendly dental care in a comfortable environment.',
  },
  {
    question: 'Incapremo Dental Care West Bengal?',
    answer: 'Incapremo Dental Care is a leading dental clinic located on Deshbandhu Road, behind Reliance Digital, in Purulia, West Bengal 723101. Led by Dr. Deepankar Bhattacharya, the clinic offers comprehensive dental services including pediatric dentistry, endodontics, emergency dental care, and preventive treatments. The clinic is open Monday to Saturday, 10 AM to 2 PM and 5 PM to 8 PM. Book your appointment by calling (+91) 7050576335.',
  },
  {
    question: 'Where can I find a dentist near me in Purulia?',
    answer: 'Incapremo Dental Care is a dentist near me in Purulia at Deshbandhu Road, behind Reliance Digital, Purulia, West Bengal 723101. We are open Monday to Saturday, 10 AM to 2 PM and 5 PM to 8 PM, and we keep same-day slots available for emergencies. Call (+91) 7050576335 before travelling and we will confirm the earliest appointment for you.',
  },
  {
    question: 'Do you have a pediatric dentist near me for my child?',
    answer: 'Yes. Dr. Deepankar Bhattacharya holds a B.D.S. and an M.D.S. in Pediatric Dentistry and Preventive Dentistry, and is a former Ex-Associate Professor. If you are searching for a pediatric dentist near me in Purulia, Kolkata or across West Bengal, our clinic treats children from their first dental visit through pulp therapy, dental trauma management and interceptive orthodontics, in a calm, child-friendly environment.',
  },
  {
    question: 'When should I take my child to a kids dentist near me?',
    answer: 'The American Academy of Pediatric Dentistry recommends a first dental visit by age one, or within six months of the first tooth erupting. A kids dentist near me can spot early decay, tongue-tie, bite problems and thumb-sucking habits long before they cause pain. From age two onward, six-monthly check-ups and fluoride varnish help protect baby teeth until the adult teeth arrive.',
  },
  {
    question: 'Do you provide orthodontics in Kolkata?',
    answer: 'Yes. We provide interceptive orthodontics in Kolkata and across West Bengal, including custom space maintainers after early tooth loss, habit-breaking appliances for thumb sucking and pacifier use, and growth-guiding appliances for developing bite problems. A growth assessment around age seven can often prevent the need for lengthy braces treatment later. Call (+91) 7050576335 to book an orthodontic consultation in Purulia.',
  },
  {
    question: 'What dental treatment do you offer in Purulia and Kolkata?',
    answer: 'We offer dental treatment in Purulia for the whole family: preventive dentistry with sealants and fluoride, pediatric endodontics (pulpotomy, pulpectomy and root canal), dental trauma management including re-implantation and splinting, space maintenance and growth modification, pediatric periodontics, teeth whitening, scaling, crowns and emergency dental care. Patients also travel to us for dental treatment in Kolkata from nearby towns such as Bokaro, Dhanbad and Asansol.',
  },
  {
    question: 'How do I choose the best dentist near me?',
    answer: 'When comparing the best dentist near me, look at qualifications, whether the dentist holds a specialist degree in the area you need, how they explain your treatment plan, and whether they ever recommend unnecessary work. At Incapremo Dental Care you will get a clear diagnosis, a written estimate of options, and honest advice about whether you need to come in at all. Our 4.9-star Google rating reflects 5,000+ patients treated.',
  },
  {
    question: 'Is there a dental clinic near me open on Saturdays?',
    answer: 'Yes. Incapremo Dental Care, a dental clinic near me on Deshbandhu Road in Purulia, is open Monday through Saturday with two sessions: 10 AM to 2 PM and 5 PM to 8 PM. Sunday is closed, so plan routine check-ups and cleanings on a weekday or Saturday, and save the emergency line (+91) 7050576335 for urgent problems such as swelling, trauma or severe pain.',
  },
];

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: faqData.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};


/* ------------------------------------------------------------------ *
 * Per-page schemas.
 *
 * These live here rather than inside the page components so that
 * build/prerender.js can emit exactly the same JSON-LD into the static HTML.
 * A schema declared inline in a component is invisible to the prerenderer, so
 * the served HTML and the client-rendered page would disagree.
 * ------------------------------------------------------------------ */

/** Rendered by src/pages/Emergency/Emergency.jsx. */
export function emergencyServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EmergencyService',
    '@id': `${SITE_URL}/emergency/#emergency`,
    name: 'Incapremo Dental Care — Emergency Dental Care',
    description:
      'Same-day emergency dental treatment in Purulia, West Bengal for severe toothache, dental trauma, abscess and swelling.',
    url: `${SITE_URL}/emergency`,
    telephone: '(+91) 7050576335',
    provider: { '@id': DENTIST_ID },
    areaServed: { '@type': 'City', name: 'Purulia' },
    availableOpeningHoursSpecification: NAP.openingHoursSpecification,
  };
}

/** Image list, shared with src/pages/ProofOfWork/ProofOfWork.jsx. */
export const GALLERY_ITEMS = [
  { src: '/gall1.webp', alt: 'Restored smile after dental treatment' },
  { src: '/gall2.webp', alt: 'Pediatric dental care in progress' },
  { src: '/gall3.webp', alt: 'Preventive dental treatment result' },
  { src: '/gall4.jpeg', alt: 'Modern dental clinical setup' },
  { src: '/gall5.jpeg', alt: 'Advanced dental equipment and tools' },
  { src: '/gall6.jpeg', alt: 'Happy patient after dental procedure' },
];

/** Rendered by src/pages/ProofOfWork/ProofOfWork.jsx. */
export function imageGallerySchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${SITE_URL}/proof-of-work/#gallery`,
    name: 'Dental Treatment Results — Incapremo Dental Care',
    url: `${SITE_URL}/proof-of-work`,
    about: { '@id': DENTIST_ID },
    image: GALLERY_ITEMS.map((item) => ({
      '@type': 'ImageObject',
      contentUrl: absoluteUrl(item.src),
      caption: item.alt,
    })),
  };
}

/** Rendered by src/pages/Services/Services.jsx. */
export function servicesSchema() {
  return serviceSchema(
    '/services',
    'Dental Treatment in Purulia & Kolkata',
    'Preventive dentistry, pediatric endodontics, dental trauma management, space maintenance and growth modification, pediatric periodontics, interceptive orthodontics, root canal treatment and emergency dental care in Purulia, West Bengal.',
  );
}
