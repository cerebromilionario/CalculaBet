import { Helmet } from 'react-helmet-async';

export default function SEOHead({ title, description, canonical, schema }) {
  const fullTitle = title ? `${title} | CalculaBet` : 'CalculaBet – Ferramentas gratuitas para apostadores';
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={`https://calculabet.com.br${canonical}`} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
}
