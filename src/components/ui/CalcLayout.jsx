import Breadcrumbs from './Breadcrumbs';
import AdBanner from './AdBanner';
import FAQSection from './FAQSection';
import SEOHead from './SEOHead';
import Icon from './Icons';
import { Link } from 'react-router-dom';
import { calculadoras } from '../../data/casas';

const breadcrumbSchema = (title, slug) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'CalculaBet', item: 'https://calculabet.com.br' },
    { '@type': 'ListItem', position: 2, name: 'Calculadoras', item: 'https://calculabet.com.br/#calculadoras' },
    { '@type': 'ListItem', position: 3, name: title, item: `https://calculabet.com.br/calculadoras/${slug}` },
  ],
});

export default function CalcLayout({ title, description, slug, children, faqs, schema, explanation }) {
  const outros = calculadoras.filter(c => c.slug !== slug);
  const relacionadas = outros.slice(0, 4);

  const combinedSchema = [
    breadcrumbSchema(title, slug),
    ...(Array.isArray(schema) ? schema : schema ? [schema] : []),
  ];

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical={`/calculadoras/${slug}`}
        schema={combinedSchema}
      />

      {/* Top banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <AdBanner size="leaderboard" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={[{ label: 'Calculadoras', href: '/' }, { label: title }]} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">

          {/* ── Main content ── */}
          <main className="space-y-8 min-w-0">

            {/* Title block */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="badge-cyan badge text-xs">Gratuito</span>
                <span className="badge text-xs">Sem cadastro</span>
              </div>
              <h1
                className="font-bold tracking-tight mb-3"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--text-1)', letterSpacing: '-0.03em' }}
              >
                {title}
              </h1>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-2)', maxWidth: '640px' }}>
                {description}
              </p>
            </div>

            {/* Calculator panel */}
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.02) inset',
              }}
            >
              {children}
            </div>

            {/* Explanation / SEO content */}
            {explanation && (
              <div
                className="rounded-2xl p-6 md:p-8"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
              >
                {explanation}
              </div>
            )}

            {/* FAQ */}
            {faqs && faqs.length > 0 && (
              <div className="pt-2">
                <FAQSection items={faqs} />
              </div>
            )}

            {/* Related tools */}
            <div
              className="rounded-2xl p-6"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <p className="text-xs font-semibold mb-4" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Ferramentas relacionadas
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {relacionadas.map(c => (
                  <Link
                    key={c.slug}
                    to={`/calculadoras/${c.slug}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(34,211,238,0.2)';
                      e.currentTarget.style.background = 'rgba(34,211,238,0.03)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    }}
                  >
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(34,211,238,0.07)', color: '#22d3ee', border: '1px solid rgba(34,211,238,0.12)' }}
                    >
                      <Icon name={c.icon} className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: 'var(--text-1)' }}>{c.nome}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{c.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                to="/"
                className="flex items-center gap-1.5 mt-4 text-xs font-medium transition-colors"
                style={{ color: 'var(--text-3)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#22d3ee'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
              >
                Ver todas as calculadoras
                <Icon name="arrowRight" className="w-3.5 h-3.5" />
              </Link>
            </div>
          </main>

          {/* ── Sidebar ── */}
          <aside className="space-y-5" aria-label="Sidebar">

            {/* All calculators list */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Todas as ferramentas
              </p>
              <ul className="space-y-0.5" role="list">
                {calculadoras.map(c => {
                  const isActive = c.slug === slug;
                  return (
                    <li key={c.slug}>
                      <Link
                        to={`/calculadoras/${c.slug}`}
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-all duration-150"
                        aria-current={isActive ? 'page' : undefined}
                        style={{
                          background: isActive ? 'rgba(34,211,238,0.08)' : 'transparent',
                          color: isActive ? '#22d3ee' : 'var(--text-2)',
                          borderLeft: `2px solid ${isActive ? 'rgba(34,211,238,0.5)' : 'transparent'}`,
                        }}
                        onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-1)'; } }}
                        onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-2)'; } }}
                      >
                        <Icon name={c.icon} className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{c.nome}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Partner card */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.12)' }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Parceiro destaque
              </p>
              <p className="text-xs mb-3" style={{ color: 'var(--text-3)', fontSize: '0.6rem' }}>Publicidade</p>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: 'rgba(0,166,81,0.15)', color: '#00a651', border: '1px solid rgba(0,166,81,0.22)' }}
                  aria-hidden="true"
                >
                  B3
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>Bet365</p>
                  <p className="text-xs" style={{ color: 'var(--text-3)' }}>Bônus até R$200 · Pix</p>
                </div>
              </div>
              <a
                href="#afiliado-bet365"
                rel="noopener noreferrer nofollow sponsored"
                className="btn-green w-full text-xs py-2"
                aria-label="Abrir conta na Bet365 (link patrocinado)"
              >
                Abrir conta →
              </a>
              <p className="text-center mt-2" style={{ color: 'var(--text-3)', fontSize: '0.6rem' }}>
                +18 · Patrocinado · Verifique termos
              </p>
            </div>

            {/* Institutional links */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            >
              <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Informações
              </p>
              <ul className="space-y-1.5" role="list">
                {[
                  { to: '/casas-apostas', label: 'Casas de Apostas' },
                  { to: '/sobre', label: 'Sobre o CalculaBet' },
                  { to: '/jogo-responsavel', label: 'Jogo Responsável' },
                  { to: '/afiliados', label: 'Política de Afiliados' },
                ].map(l => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-xs transition-colors flex items-center gap-1.5"
                      style={{ color: 'var(--text-3)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
                    >
                      <Icon name="arrowRight" className="w-3 h-3 flex-shrink-0" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <AdBanner size="rectangle" />
          </aside>
        </div>
      </div>
    </>
  );
}
