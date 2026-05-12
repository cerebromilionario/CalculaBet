import SEOHead from '../components/ui/SEOHead';
import CasaCard from '../components/ui/CasaCard';
import { casas } from '../data/casas';
import AdNativeBanner from '../components/ads/AdNativeBanner';

export default function CasasApostas() {
  return (
    <>
      <SEOHead
        title="Melhores Casas de Apostas no Brasil"
        description="Compare as melhores casas de apostas regulamentadas no Brasil com Pix, bônus e odds competitivas."
        canonical="/casas-apostas"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AdNativeBanner />

        <div className="mt-10 mb-12">
          <span className="badge-green badge mb-4">Regulamentadas · Pix · Bônus</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.03em' }}>
            Melhores Casas de Apostas para Brasileiros
          </h1>
          <p className="text-base max-w-2xl" style={{ color: 'var(--text-2)' }}>
            Selecionamos casas regulamentadas, com Pix disponível e boa reputação. Comparamos odds, bônus e experiência de uso.
          </p>
          <div
            className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-lg text-xs"
            style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)', color: '#fbbf24' }}
          >
            ⚠️ Conteúdo patrocinado · +18 · Jogue com responsabilidade
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {casas.map(c => <CasaCard key={c.id} casa={c} />)}
        </div>

        <div
          className="mt-12 rounded-2xl p-6 md:p-8"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <h2 className="text-lg font-bold mb-5" style={{ color: 'var(--text-1)' }}>Como escolher uma casa de apostas no Brasil</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold mb-3" style={{ color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.07em' }}>✓ O que verificar</p>
              <ul className="space-y-2">
                {[
                  'Licença pela SPA (Secretaria de Prêmios e Apostas)',
                  'Pix para depósito e saque rápido',
                  'Odds competitivas nos principais mercados',
                  'Suporte em português',
                  'Termos claros do bônus de boas-vindas',
                ].map((i, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                    <span className="flex-shrink-0 mt-0.5 text-green-400">→</span> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold mb-3" style={{ color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>✗ Sinais de alerta</p>
              <ul className="space-y-2">
                {[
                  'Sites sem licença brasileira',
                  'Saques lentos ou com muitas restrições',
                  'Odds muito abaixo do mercado',
                  'Suporte inexistente ou em outro idioma',
                  'Rollover do bônus acima de 20x',
                ].map((i, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                    <span className="flex-shrink-0 mt-0.5 text-red-400">→</span> {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
