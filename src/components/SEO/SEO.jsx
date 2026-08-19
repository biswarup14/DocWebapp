import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Incapremo Dental Care';
const DEFAULT_DESCRIPTION = 'Professional dental care services. Book your appointment today for a healthier, brighter smile.';

const defaultSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Deshbandhu Rd, behind Reliance Digital',
    addressLocality: 'Purulia',
    addressRegion: 'West Bengal',
    postalCode: '723101',
  },
  telephone: '(+91) 7050576335',
  openingHours: ['Mo-Sa 10:00-14:00', 'Mo-Sa 17:00-20:00'],
};

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  url,
  type = 'website',
  image,
  schema,
}) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const pageUrl = url ? `https://incapremodental.com${url}` : 'https://incapremodental.com';

  const jsonLd = schema === false
    ? null
    : { ...defaultSchema, url: pageUrl, description, ...(schema && typeof schema === 'object' ? schema : {}) };

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={pageUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
