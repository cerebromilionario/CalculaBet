import { Link } from 'react-router-dom';
import { calculadoras, casas } from '../data/casas';
import SEOHead from '../components/ui/SEOHead';
import CasaCard from '../components/ui/CasaCard';
import AdNativeBanner from '../components/ads/AdNativeBanner';
import FAQSection from '../components/ui/FAQSection';
import Icon from '../components/ui/Icons';
import AffiliateDisclosure from '../components/ui/AffiliateDisclosure';
import ResponsibleGamingNotice from '../components/ui/ResponsibleGamingNotice';

const faqs = [
  { q: 'O CalculaBet é gratuito?', a: 'Sim. Todas as calculadoras são 100% gratuitas e sem necessidade de cadastro. Nos mantemos por meio de parcerias comerciais com casas de apostas.' },
  { q: 'Preciso me cadastrar para usar as ferramentas?', a: 'Não. Todas as ferramentas funcionam diretamente no navegador. Nenhum dado pessoal é coletado pelas calculadoras.' },
  { q: 'As calculadoras funcionam no celular?', a: 'Sim, o CalculaBet é desenvolvido mobile-first e funciona perfeitamente em qualquer dispositivo.' },
  { q: 'O que é arbitragem em apostas?', a: 'Arbitragem ocorre quando as odds em diferentes casas permitem cobrir todos os resultados e garantir lucro independentemente do desfecho.' },
  { q: 'O que é Kelly Criterion?', a: 'É uma fórmula matemática que calcula o percentual ideal da banca a apostar em cada evento, maximizando o crescimento da banca no longo prazo.' },
  { q: 'O CalculaBet recomenda apostas?', a: 'Não. Somos uma plataforma educacional de ferramentas. Apostas envolvem risco e são recomendadas apenas para maiores de 18 anos com total responsabilidade.' },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CalculaBet',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  description: '12 calculadoras profissionais gratuitas para apostadores esportivos brasileiros.',
  url: 'https://calculabet.site',
};

const stats = [
  { value: '12', label: 'Calculadoras', suffix: '+' },
  { value: '100', label: 'Gratuito', suffix: '%' },
  { value: '0', label: 'Cadastros', suffix: '' },
  { value: '∞', label: 'Simulações', suffix: '' },
];

export default function Home() {
  return (
    <>
      <SEOHead
        title={null}
        description="12 calculadoras gratuitas para apostadores: odds, arbitragem, dutching, cashout, Kelly Criterion e muito mais. Sem cadastro, 100% gratuito. Para apostadores brasileiros."
        canonical="/"
        schema={[schema, websiteSchema]}
      />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: '92dvh', display: 'flex', alignItems: 'center' }}
        aria-label="Hero"
      >
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: '900px',
              height: '700px',
              background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.07) 0%, transparent 65%)',
              animation: 'glow-pulse 8s ease-in-out infinite',
            }}
          />
          <div
            className="absolute top-1/3 -right-40"
            style={{
              width: '600px',
              height: '600px',
              background: 'radial-gradient(ellipse at center, rgba(129,140,248,0.05) 0%, transparent 65%)',
            }}
          />
          <div
            className="absolute bottom-0 left-0"
            style={{
              width: '500px',
              height: '400px',
              background: 'radial-gradient(ellipse at bottom left, rgba(34,197,94,0.04) 0%, transparent 65%)',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-4xl mx-auto text-center">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-8">
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium"
                style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.18)', color: '#22d3ee' }}
              >
                <span className="dot-live" aria-hidden="true" />
                Grátis · Sem cadastro · Para apostadores brasileiros
              </span>
            </div>

            {/* Heading */}
            <h1
              className="font-bold tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.4rem, 6.5vw, 4.75rem)', lineHeight: '1.07', letterSpacing: '-0.04em' }}
            >
              <span className="text-gradient">Ferramentas inteligentes</span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #22d3ee 0%, #818cf8 50%, #4ade80 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                para apostas esportivas
              </span>
            </h1>

            {/* Subheading */}
            <p
              className="mb-10 mx-auto"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: '1.65', color: 'var(--text-2)', maxWidth: '540px' }}
            >
              Calcule odds, arbitragem, Kelly Criterion, cashout e muito mais.
              Precisão profissional, completamente gratuito.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
              <Link to="/calculadoras/odds" className="btn-primary px-7 py-3.5 text-sm font-semibold w-full sm:w-auto">
                Explorar calculadoras
                <Icon name="arrowRight" className="w-4 h-4" />
              </Link>
              <Link to="/casas-apostas" className="btn-ghost px-7 py-3.5 text-sm w-full sm:w-auto">
                Comparar casas de apostas
              </Link>
            </div>

            {/* Stats row */}
            <div
              className="inline-grid grid-cols-4 gap-px rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--border)', background: 'var(--border)' }}
              aria-label="Números da plataforma"
            >
              {stats.map((s, i) => (
                <div key={i} className="px-5 py-4 sm:px-6 sm:py-5" style={{ background: 'var(--bg-card)' }}>
                  <p
                    className="font-bold tabular-nums"
                    style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: 'var(--text-1)', letterSpacing: '-0.03em' }}
                  >
                    {s.value}<span className="text-gradient-cyan">{s.suffix}</span>
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>{s.label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─── AD ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdNativeBanner />
      </div>

      {/* ─── CALCULADORAS ─────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        id="calculadoras"
        aria-labelledby="calculadoras-heading"
      >
        <div className="mb-14">
          <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Ferramentas
          </p>
          <h2 id="calculadoras-heading" className="section-title mb-4">12 calculadoras gratuitas</h2>
          <p style={{ color: 'var(--text-2)', maxWidth: '480px' }}>
            Tudo que você precisa para apostar com mais inteligência, em uma plataforma só.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {calculadoras.map(c => (
            <Link
              key={c.slug}
              to={`/calculadoras/${c.slug}`}
              className="group flex flex-col p-5 rounded-2xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400/50"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(34,211,238,0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(34,211,238,0.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-200 group-hover:scale-110 group-hover:bg-[rgba(34,211,238,0.1)]"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: '#22d3ee' }}
                aria-hidden="true"
              >
                <Icon name={c.icon} className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-1)' }}>
                {c.nome}
              </h3>
              <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--text-2)' }}>{c.desc}</p>
              <div
                className="flex items-center gap-1 mt-4 text-xs font-medium transition-all duration-200 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-0.5"
                style={{ color: '#22d3ee' }}
                aria-hidden="true"
              >
                Abrir
                <Icon name="arrowRight" className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── MOCKUP / FEATURE PREVIEW ──────────────────────── */}
      <section
        style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
        aria-label="Como funciona"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: text */}
            <div>
              <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Como funciona
              </p>
              <h2 className="section-title mb-5">Simples. Rápido. Preciso.</h2>
              <p className="mb-8" style={{ color: 'var(--text-2)', maxWidth: '440px' }}>
                Sem cadastro, sem formulários. Insira os dados e receba resultados em tempo real, diretamente no navegador.
              </p>
              <div className="space-y-5">
                {[
                  { n: '01', t: 'Escolha a calculadora', d: 'Selecione a ferramenta ideal — odds, arbitragem, banca ou qualquer outra das 12 disponíveis.' },
                  { n: '02', t: 'Insira os valores', d: 'Preencha stake, odds e parâmetros. Os resultados aparecem instantaneamente.' },
                  { n: '03', t: 'Analise e decida', d: 'Veja retorno, lucro, ROI e métricas detalhadas para tomar decisões mais informadas.' },
                ].map(s => (
                  <div key={s.n} className="flex gap-4">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                      style={{
                        background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(129,140,248,0.08))',
                        border: '1px solid rgba(34,211,238,0.2)',
                        color: '#22d3ee',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                      aria-hidden="true"
                    >
                      {s.n}
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-1)' }}>{s.t}</p>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: mockup */}
            <div className="relative" aria-hidden="true">
              <div
                className="absolute inset-0 rounded-3xl blur-2xl opacity-20 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.3), rgba(129,140,248,0.2))' }}
              />
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-md)', boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}
              >
                {/* Mock header bar */}
                <div
                  className="flex items-center gap-2 px-5 py-3.5"
                  style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.015)' }}
                >
                  <div className="flex gap-1.5">
                    {['#f87171', '#fbbf24', '#4ade80'].map(c => (
                      <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.6 }} />
                    ))}
                  </div>
                  <div
                    className="flex-1 rounded-md px-3 py-1 text-xs"
                    style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-3)', maxWidth: '200px', margin: '0 auto' }}
                  >
                    calculabet.site
                  </div>
                </div>

                {/* Mock calculator UI */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-xs font-semibold mb-3" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                      Calculadora de Odds
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[['Odd', '2.50'], ['Stake (R$)', '100']].map(([l, v]) => (
                        <div key={l}>
                          <div className="text-xs mb-1.5" style={{ color: 'var(--text-3)' }}>{l}</div>
                          <div
                            className="rounded-lg px-3 py-2 text-sm font-medium"
                            style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.2)', color: 'var(--text-1)' }}
                          >
                            {v}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { l: 'Retorno', v: 'R$250', c: '#4ade80' },
                      { l: 'Lucro', v: 'R$150', c: '#22d3ee' },
                      { l: 'ROI', v: '+150%', c: '#818cf8' },
                    ].map(r => (
                      <div
                        key={r.l}
                        className="rounded-xl p-3 text-center"
                        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
                      >
                        <div className="text-base font-bold" style={{ color: r.c }}>{r.v}</div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--text-3)', textTransform: 'uppercase', fontSize: '0.6rem', letterSpacing: '0.06em' }}>{r.l}</div>
                      </div>
                    ))}
                  </div>

                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: '75%', background: 'linear-gradient(90deg, #22d3ee, #818cf8)' }}
                    />
                  </div>
                  <div className="flex justify-between text-xs" style={{ color: 'var(--text-3)' }}>
                    <span>Probabilidade implícita</span>
                    <span style={{ color: '#22d3ee' }}>40%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CASAS PARCEIRAS ──────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        aria-labelledby="casas-heading"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Casas parceiras
            </p>
            <h2 id="casas-heading" className="section-title mb-2">Casas para começar</h2>
            <p style={{ color: 'var(--text-2)', fontSize: '0.875rem' }}>
              Verifique licença, termos e disponibilidade na sua região antes de se cadastrar.
            </p>
          </div>
          <span
            className="text-xs px-2.5 py-1 rounded-lg flex-shrink-0 self-start sm:self-auto"
            style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)', color: '#fbbf24' }}
          >
            Conteúdo patrocinado
          </span>
        </div>

        <AffiliateDisclosure />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {casas.map(c => <CasaCard key={c.id} casa={c} />)}
        </div>
      </section>

      {/* ─── RESPONSIBLE GAMBLING ─────────────────────────── */}
      <ResponsibleGamingNotice variant="banner" />

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20" aria-label="Perguntas frequentes">
        <FAQSection items={faqs} />
      </section>
    </>
  );
}
