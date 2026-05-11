import Breadcrumbs from './Breadcrumbs';
import AdBanner from './AdBanner';
import FAQSection from './FAQSection';
import SEOHead from './SEOHead';
import { Link } from 'react-router-dom';
import { calculadoras } from '../../data/casas';

export default function CalcLayout({ title, description, slug, children, faqs, schema, explanation }) {
  const outros = calculadoras.filter(c => c.slug !== slug).slice(0, 5);

  return (
    <>
      <SEOHead title={title} description={description} canonical={`/calculadoras/${slug}`} schema={schema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Calculadoras', href: '/calculadoras' }, { label: title }]} />

        <AdBanner size="leaderboard" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h1>
              <p className="text-gray-400 text-lg">{description}</p>
            </div>

            {/* Calculator tool */}
            <div className="card">
              {children}
            </div>

            {/* Explanation */}
            {explanation && (
              <div className="prose-custom space-y-4">
                {explanation}
              </div>
            )}

            {faqs && faqs.length > 0 && <FAQSection items={faqs} />}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <AdBanner size="rectangle" />

            <div className="card">
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Outras calculadoras</h3>
              <ul className="space-y-2">
                {outros.map(c => (
                  <li key={c.slug}>
                    <Link
                      to={`/calculadoras/${c.slug}`}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-violet-400 transition-colors py-1"
                    >
                      <span>{c.icon}</span>
                      {c.nome}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card bg-violet-900/20 border-violet-700/40">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Destaque parceiro</p>
              <p className="font-semibold text-white text-sm mb-1">Bet365</p>
              <p className="text-xs text-gray-400 mb-3">Bônus de boas-vindas até R$200. Pix disponível.</p>
              <a href="#afiliado-bet365" rel="noopener noreferrer nofollow sponsored" className="btn-accent text-sm py-2 w-full justify-center">
                Abrir conta →
              </a>
              <p className="text-xs text-gray-600 text-center mt-2">+18 | Conteúdo patrocinado</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
