import SEOHead from '../components/ui/SEOHead';
import CasaCard from '../components/ui/CasaCard';
import AffiliateBanner from '../components/ui/AffiliateBanner';
import { casas } from '../data/casas';
import AdNativeBanner from '../components/ads/AdNativeBanner';

export default function CasasApostas() {
  return (
    <>
      <SEOHead
        title="Casa Parceira 1XBIT"
        description="Conheça a parceira 1XBIT no CalculaBet. Aviso +18, link de afiliado, jogo responsável e orientação para verificar termos diretamente na plataforma."
        canonical="/casas-apostas"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AdNativeBanner />

        <div className="mt-10 mb-12">
          <span className="badge-green badge mb-4">Parceiro aprovado · +18 · Jogo responsável</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.03em' }}>
            Casa parceira em destaque: 1XBIT
          </h1>
          <p className="text-base max-w-2xl" style={{ color: 'var(--text-2)' }}>
            O CalculaBet exibe somente a 1XBIT como parceira aprovada no momento. Antes de abrir conta, verifique termos, bônus, regras, licença e disponibilidade diretamente na plataforma parceira.
          </p>
          <div
            className="inline-flex flex-wrap items-center gap-2 mt-4 px-3 py-1.5 rounded-lg text-xs"
            style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)', color: '#fbbf24' }}
          >
            ⚠️ Publicidade • Link de afiliado • +18 • Aposte com responsabilidade
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
          <div className="space-y-6">
            {casas.map(c => <CasaCard key={c.id} casa={c} variant="featured" />)}

            <div
              className="rounded-2xl p-6 md:p-8"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-1)' }}>Transparência e jogo responsável</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: '+18', desc: 'Apostas são destinadas exclusivamente a maiores de 18 anos.' },
                  { title: 'Afiliado', desc: 'O CalculaBet pode receber comissão se você se cadastrar por links de parceiros.' },
                  { title: 'Termos', desc: 'Bônus, regras, licença e disponibilidade devem ser conferidos na plataforma.' },
                ].map(item => (
                  <div
                    key={item.title}
                    className="rounded-xl p-4"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}
                  >
                    <p className="text-sm font-semibold mb-2" style={{ color: '#22d3ee' }}>{item.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm leading-relaxed mt-5" style={{ color: 'var(--text-2)' }}>
                Não tratamos bônus como garantido e não fazemos promessa de lucro. Use as ferramentas do CalculaBet para análise educacional, defina limites e aposte apenas valores que você pode perder sem comprometer seu orçamento.
              </p>
            </div>
          </div>

          <aside
            className="rounded-2xl p-4 lg:sticky lg:top-24"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
            aria-label="Publicidade 1XBIT"
          >
            <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Banner oficial
            </p>
            <p className="text-xs mb-3" style={{ color: 'var(--text-3)', fontSize: '0.6rem' }}>Publicidade • Link de afiliado • +18</p>
            <div className="hidden lg:block">
              <AffiliateBanner size="300x600" placement="casas" />
            </div>
            <div className="lg:hidden">
              <AffiliateBanner size="320x50" placement="casas" />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
