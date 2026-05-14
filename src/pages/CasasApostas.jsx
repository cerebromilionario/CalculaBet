import SEOHead from '../components/ui/SEOHead';
import CasaCard from '../components/ui/CasaCard';
import AffiliateBanner from '../components/ui/AffiliateBanner';
import AffiliateDisclosure from '../components/ui/AffiliateDisclosure';
import { AFFILIATE_DISCLOSURE_FULL, casas } from '../data/casas';
import AdNativeBanner from '../components/ads/AdNativeBanner';

export default function CasasApostas() {
  const heroPartner = casas.find(casa => casa.id === 'blaze') || casas[0];
  const bannerPartners = casas.filter(casa => Object.keys(casa.banners || {}).length > 0).slice(0, 2);

  return (
    <>
      <SEOHead
        title="Casas de apostas parceiras"
        description="Conheça as plataformas parceiras aprovadas no CalculaBet: 1XBIT, Blaze, Superbet, Melbet, Stake e BETOBET. Aviso +18, links de afiliado, jogo responsável e transparência."
        canonical="/casas-apostas"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AdNativeBanner />

        <section className="mt-10 mb-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-8 items-center" aria-labelledby="casas-title">
          <div>
            <span className="badge-green badge mb-4">Parceiros aprovados · +18 · Jogo responsável</span>
            <h1 id="casas-title" className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.04em' }}>
              Casas parceiras para comparar com responsabilidade
            </h1>
            <p className="text-base max-w-3xl leading-relaxed" style={{ color: 'var(--text-2)' }}>
              O CalculaBet lista somente plataformas aprovadas para o contexto de apostas esportivas e mantém foco em ferramentas, educação e cálculo. Antes de abrir conta, verifique termos, bônus, regras, licença, disponibilidade regional e requisitos diretamente em cada plataforma.
            </p>
            <div
              className="inline-flex flex-wrap items-center gap-2 mt-4 px-3 py-1.5 rounded-lg text-xs"
              style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)', color: '#fbbf24' }}
            >
              ⚠️ Publicidade • Link de afiliado • +18 • Aposte com responsabilidade
            </div>
          </div>

          <div className="rounded-3xl p-4" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}>
            <AffiliateBanner partner={heroPartner} placement="casas" preferredSizes={['1400x400', '1200x628', '770x436', '800x360', '728x90']} />
            <p className="mt-3 text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
              Banner promocional exibido de forma responsiva. Ofertas e condições podem mudar sem aviso no CalculaBet.
            </p>
          </div>
        </section>

        <AffiliateDisclosure />

        <section className="mt-8" aria-labelledby="grid-parceiros">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                6 plataformas aprovadas
              </p>
              <h2 id="grid-parceiros" className="section-title">Parceiros ativos</h2>
            </div>
            <p className="text-xs max-w-sm" style={{ color: 'var(--text-3)' }}>
              Lista curada para manter o foco em apostas esportivas, ferramentas e uso responsável.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {casas.map(casa => <CasaCard key={casa.id} casa={casa} />)}
          </div>
        </section>

        {bannerPartners.length > 0 && (
          <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5" aria-label="Banners promocionais de parceiros">
            {bannerPartners.map(partner => (
              <div
                key={partner.id}
                className="rounded-2xl p-4"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
              >
                <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Publicidade • {partner.nome}
                </p>
                <AffiliateBanner partner={partner} placement="content" />
              </div>
            ))}
          </section>
        )}

        <section
          className="rounded-2xl p-6 md:p-8 mt-10"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          aria-labelledby="transparencia-parceiros"
        >
          <h2 id="transparencia-parceiros" className="text-lg font-bold mb-4" style={{ color: 'var(--text-1)' }}>Transparência, termos e jogo responsável</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: '+18', desc: 'Apostas são destinadas exclusivamente a maiores de 18 anos.' },
              { title: 'Afiliado', desc: 'O CalculaBet pode receber comissão se você se cadastrar por links de parceiros.' },
              { title: 'Termos', desc: 'Bônus, regras, licença, requisitos e disponibilidade devem ser conferidos na plataforma.' },
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
            {AFFILIATE_DISCLOSURE_FULL} Não tratamos bônus como garantido e não fazemos promessa de lucro. Use as ferramentas do CalculaBet para análise educacional, defina limites e aposte apenas valores que você pode perder sem comprometer seu orçamento.
          </p>
        </section>
      </div>
    </>
  );
}
