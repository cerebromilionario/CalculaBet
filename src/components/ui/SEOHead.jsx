import { Helmet } from 'react-helmet-async';

export const BASE_URL = 'https://calculabet.site';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

export default function SEOHead({ title, description, canonical, schema, ogImage, noindex }) {
  const fullTitle = title
    ? `${title} | CalculaBet`
    : 'CalculaBet – Ferramentas gratuitas para apostadores esportivos';
  const canonicalUrl = canonical
    ? canonical.startsWith('http')
      ? canonical
      : `${BASE_URL}${canonical}`
    : `${BASE_URL}/`;
  const ogImg = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {noindex
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow" />
      }
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="CalculaBet" />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImg} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:image" content={ogImg} />

      {/* Structured data */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
