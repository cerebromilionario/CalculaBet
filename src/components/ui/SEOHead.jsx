import { Helmet } from 'react-helmet-async';

export const BASE_URL = 'https://calculabet.site';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

function toCanonicalUrl(pathOrUrl = '/') {
  const value = String(pathOrUrl || '/').trim();

  if (value.startsWith('http://') || value.startsWith('https://')) {
    const parsedUrl = new URL(value);
    return `${BASE_URL}${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
  }

  const normalizedPath = value.startsWith('/') ? value : `/${value}`;
  return `${BASE_URL}${normalizedPath}`;
}

export default function SEOHead({ title, description, canonical, schema, ogImage, noindex, ogType = 'website', appendSiteName = true, ogTitle, ogDescription, twitterCard = 'summary_large_image' }) {
  const fullTitle = title
    ? (appendSiteName && !title.includes('CalculaBet') ? `${title} | CalculaBet` : title)
    : 'CalculaBet – Ferramentas gratuitas para apostadores esportivos';
  const canonicalUrl = toCanonicalUrl(canonical);
  const ogImg = ogImage || DEFAULT_OG_IMAGE;
  const resolvedOgTitle = ogTitle || fullTitle;
  const resolvedOgDescription = ogDescription || description;

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
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="CalculaBet" />
      <meta property="og:title" content={resolvedOgTitle} />
      {resolvedOgDescription && <meta property="og:description" content={resolvedOgDescription} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImg} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={resolvedOgTitle} />
      {resolvedOgDescription && <meta name="twitter:description" content={resolvedOgDescription} />}
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:image" content={ogImg} />

      {/* Structured data */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
