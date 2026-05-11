import { Link } from 'react-router-dom';
import { calculadoras, casas } from '../data/casas';
import SEOHead from '../components/ui/SEOHead';
import CasaCard from '../components/ui/CasaCard';
import AdBanner from '../components/ui/AdBanner';
import FAQSection from '../components/ui/FAQSection';

const faqs = [
  { q: 'O CalculaBet é gratuito?', a: 'Sim. Todas as calculadoras são 100% gratuitas e sem necessidade de cadastro. Nos mantemos através de parcerias comerciais com casas de apostas regulamentadas.' },
  { q: 'Preciso me cadastrar para usar as ferramentas?', a: 'Não. Todas as ferramentas funcionam diretamente no navegador. Nenhum dado pessoal é coletado pelas calculadoras.' },
  { q: 'As calculadoras funcionam no celular?', a: 'Sim, o CalculaBet é desenvolvido mobile-first e funciona perfeitamente em qualquer dispositivo.' },
  { q: 'O que é arbitragem em apostas?', a: 'Arbitragem ocorre quando as odds em diferentes casas permitem cobrir todos os resultados e garantir lucro independentemente do desfecho.' },
  { q: 'O que é Kelly Criterion?', a: 'É uma fórmula matemática que calcula o percentual ideal da banca a apostar em cada evento, maximizando o crescimento da banca no longo prazo.' },
  { q: 'O CalculaBet recomenda apostas?', a: 'Não. Somos uma plataforma educacional e de ferramentas. Apostas envolvem risco e são recomendadas apenas para maiores de 18 anos com total responsabilidade.' },
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
        description="Calculadoras gratuitas para apostadores: odds, arbitragem, dutching, cashout, gestão de banca, Kelly Criterion e muito mais. Para apostadores brasileiros."
        canonical="/"
        schema={schema}
      />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '92dvh', display: 'flex', alignItems: 'center' }}>

        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {/* Grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          {/* Radial glow top */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: '800px',
              height: '600px',
              background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.08) 0%, transparent 70%)',
              animation: 'glow-pulse 6s ease-in-out infinite',
            }}
          />
          {/* Side glow */}
          <div
            className="absolute top-1/3 -right-32"
            style={{
              width: '500px',
              height: '500px',
              background: 'radial-gradient(ellipse at center, rgba(129,140,248,0.06) 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-4xl mx-auto text-center">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-8">
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: 'rgba(34,211,238,0.07)',
                  border: '1px solid rgba(34,211,238,0.18)',
                  color: '#22d3ee',
                }}
              >
                <span className="dot-live" />
                Grátis · Sem cadastro · Para apostadores brasileiros
              </span>
            </div>

            {/* Heading */}
            <h1
              className="font-bold tracking-tight mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                lineHeight: '1.07',
                letterSpacing: '-0.04em',
              }}
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
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                lineHeight: '1.6',
                color: 'var(--text-2)',
                maxWidth: '580px',
              }}
            >
              Calcule odds, arbitragem, gestão de banca, cashout e muito mais.
              Precisão profissional, completamente gratuito.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
              <Link
                to="/calculadoras/odds"
                className="btn-primary px-7 py-3.5 text-sm font-semibold w-full sm:w-auto"
              >
                Explorar calculadoras
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link to="/casas-apostas" className="btn-ghost w-full sm:w-auto">
                Comparar casas de apostas
              </Link>
            </div>

            {/* Stats row */}
            <div
              className="inline-grid grid-cols-4 gap-px rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--border)', background: 'var(--border)' }}
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="px-6 py-5"
                  style={{ background: 'var(--bg-card)' }}
                >
                  <p
                    className="font-bold tabular-nums"
                    style={{ fontSize: '1.75rem', color: 'var(--text-1)', letterSpacing: '-0.03em' }}
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
        <AdBanner size="leaderboard" />
      </div>

      {/* ─── CALCULADORAS ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-14">
          <p
            className="text-xs font-semibold mb-3"
            style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
          >
            Ferramentas
          </p>
          <h2 className="section-title mb-4">Calculadoras gratuitas</h2>
          <p style={{ color: 'var(--text-2)', maxWidth: '480px' }}>
            Tudo que você precisa para apostar com mais inteligência, em uma plataforma só.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {calculadoras.map((c, i) => (
            <Link
              key={c.slug}
              to={`/calculadoras/${c.slug}`}
              className="group flex flex-col p-5 rounded-2xl transition-all duration-200"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
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
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-lg transition-transform duration-200 group-hover:scale-110"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border)',
                }}
              >
                {c.icon}
              </div>
              <h3
                className="text-sm font-semibold mb-2 transition-colors"
                style={{ color: 'var(--text-1)' }}
              >
                {c.nome}
              </h3>
              <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--text-2)' }}>{c.desc}</p>
              <div
                className="flex items-center gap-1 mt-4 text-xs font-medium transition-all duration-200 opacity-0 group-hover:opacity-100"
                style={{ color: '#22d3ee' }}
              >
                Abrir
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────── */}
      <section style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-14 max-w-xl">
            <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Como funciona
            </p>
            <h2 className="section-title mb-4">Simples. Rápido. Preciso.</h2>
            <p style={{ color: 'var(--text-2)' }}>
              Sem cadastro, sem formulários. Insira os dados e receba resultados em tempo real.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: '01', t: 'Escolha a calculadora', d: 'Selecione a ferramenta ideal para sua necessidade — odds, arbitragem, banca ou qualquer outra.' },
              { n: '02', t: 'Insira os valores', d: 'Preencha stake, odds e parâmetros. Os resultados aparecem instantaneamente.' },
              { n: '03', t: 'Analise os dados', d: 'Veja retorno, lucro, ROI e métricas detalhadas para tomar decisões informadas.' },
              { n: '04', t: 'Aposte com responsabilidade', d: 'Use os insights como referência. Defina limites e nunca aposte o que não pode perder.' },
            ].map((p, i) => (
              <div
                key={i}
                className="relative p-5 rounded-2xl"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <p
                  className="text-4xl font-bold mb-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(129,140,248,0.1))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.05em',
                    lineHeight: '1',
                  }}
                >
                  {p.n}
                </p>
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-1)' }}>{p.t}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CASAS PARCEIRAS ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Casas parceiras
            </p>
            <h2 className="section-title mb-2">Melhores casas para começar</h2>
            <p style={{ color: 'var(--text-2)', fontSize: '0.875rem' }}>
              Regulamentadas, com Pix e bônus de boas-vindas.
            </p>
          </div>
          <span
            className="text-xs px-2.5 py-1 rounded-lg flex-shrink-0 self-start sm:self-auto"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text-3)' }}
          >
            Conteúdo patrocinado
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {casas.map(c => <CasaCard key={c.id} casa={c} />)}
        </div>

        <p className="text-xs mt-5 text-center" style={{ color: 'var(--text-3)' }}>
          Links de afiliado. Consulte nossa{' '}
          <Link to="/afiliados" style={{ color: 'var(--text-2)' }} className="underline underline-offset-2 hover:opacity-80">
            política de afiliados
          </Link>.
          {' '}Apenas para maiores de 18 anos.
        </p>
      </section>

      {/* ─── RESPONSIBLE GAMBLING ─────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'rgba(251,191,36,0.03)', borderTop: '1px solid rgba(251,191,36,0.08)', borderBottom: '1px solid rgba(251,191,36,0.08)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-5"
              style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)' }}
            >
              <span className="text-xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold mb-3" style={{ color: '#fbbf24' }}>Jogue com Responsabilidade</h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-2)' }}>
              Apostas esportivas envolvem risco financeiro real.
              Defina limites, nunca aposte mais do que pode perder e busque ajuda se necessário.
            </p>
            <Link to="/jogo-responsavel" className="btn-ghost text-sm">
              Saiba mais sobre jogo responsável →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FAQSection items={faqs} />
      </section>
    </>
  );
}
