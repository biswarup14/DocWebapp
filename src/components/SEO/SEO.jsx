import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Incapremo Dental Care';
const SITE_URL = 'https://incapremodental.com';
const DEFAULT_DESCRIPTION = 'Incapremo Dental Care — best dentist near me in Purulia. Dr. Deepankar Bhattacharya offers pediatric dental care, emergency dentist services, and more. Book your appointment today.';

const defaultSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/oie_Xo2NfYNrbzXd.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Deshbandhu Rd, behind Reliance Digital',
    addressLocality: 'Purulia',
    addressRegion: 'West Bengal',
    postalCode: '723101',
    addressCountry: 'IN',
  },
  telephone: '(+91) 7050576335',
  openingHours: ['Mo-Sa 10:00-14:00', 'Mo-Sa 17:00-20:00'],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.3315,
    longitude: 86.3644,
  },
  priceRange: '$$',
  areaServed: {
    '@type': 'City',
    name: 'Purulia',
  },
  founder: {
    '@type': 'Person',
    name: 'Dr. Deepankar Bhattacharya',
    jobTitle: 'Pediatric Dentist',
  },
};

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  url,
  type = 'website',
  image,
  schema,
  extraSchemas = [],
  noindex = false,
}) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const pageUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const pageImage = image || `${SITE_URL}/oie_Xo2NfYNrbzXd.png`;

  const jsonLd = schema === false
    ? null
    : { ...defaultSchema, url: pageUrl, description, ...(schema && typeof schema === 'object' ? schema : {}) };

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={pageUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={pageImage} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
      {extraSchemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
