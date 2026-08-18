import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Incapremo Dental Care';
const DEFAULT_DESCRIPTION = 'Professional dental care services. Book your appointment today for a healthier, brighter smile.';

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  url,
  type = 'website',
  image,
}) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const pageUrl = url ? `https://brightsmiledental.com${url}` : 'https://brightsmiledental.com';

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

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Dentist',
          name: SITE_NAME,
          url: pageUrl,
          description,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Behind Reliance Digital, Deshbandhu Road, Badulia',
            addressLocality: 'Bardhaman',
            addressRegion: 'West Bengal',
            postalCode: '713101',
          },
          telephone: '(+91) 7050576335',
          openingHours: ['Mo-Fr 08:00-18:00', 'Sa 09:00-14:00'],
        })}
      </script>
    </Helmet>
  );
}
