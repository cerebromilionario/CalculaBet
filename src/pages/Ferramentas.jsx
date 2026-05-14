import { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { calculadoras } from '../data/casas';
import Icon from '../components/ui/Icons';
import AdNativeBanner from '../components/ads/AdNativeBanner';
import FAQSection from '../components/ui/FAQSection';
import { getSeoFaqsForPage } from '../data/seoFaqs.jsx';

/* ─── Rich descriptions (local — does NOT modify casas.js) ─── */
const RICH_DESC = {
  'odds': 'Calcule retorno total, lucro líquido, probabilidade implícita e valor esperado de qualquer aposta em tempo real. Indispensável antes de confirmar qualquer aposta esportiva.',
  'aposta-simples': 'Simule ganho, lucro líquido, ROI e percentual de banca consumido em apostas individuais. Veja instantaneamente se a aposta faz sentido matemático para sua estratégia.',
  'múltipla-parlay': 'Combine as odds de múltiplas seleções e calcule o retorno composto, o risco acumulado é o ROI do parlay completo. Entenda como cada leg impacta o resultado final.',
  'arbitragem': 'Identifique oportunidades de sure bet e distribua os stakes ideais entre casas para garantir lucro independente do resultado. Insira as odds é a banca — a calculadora faz o resto.',
  'dutching': 'Distribua stakes proporcionalmenteente entre vários resultados de um mesmo evento para garantir lucro igual em qualquer cenário. Estratégia utilizada em corridas, futebol e esportes com múltiplos desfechos.',
  'cashout': 'Calcule o valor matemático justo do cashout e compare com manter a aposta até o final. Decida com dados concretos se vale a pena encerrar a posição antecipadamente.',
  'hedge': 'Proteja seu lucro ou minimize prejuízo com apostas opostas estratégicas. Calcule o stake de hedge ideal para qualquer cenário e visualize o resultado líquido de cada opção.',
  'gestao-banca': 'Aplique Kelly Critérion completo, meio Kelly ou um quarto Kelly conforme seu perfil de risco. Inclui flat betting e percentual fixo para apostadores em diferentes estágios.',
  'martingale': 'Simule a estratégia de dobrar stakes após cada perda e visualize com clareza o risco matemático real, a rápida erosão da banca e por que a estratégia é matematicamente perigosa.',
  'conversor-odds': 'Converta instantaneamente entre odds decimais, americanas (moneyline), fracionárias e probabilidade percentual. Facilita a comparação de odds entre casas de apostas internacionais.',
  'roi': 'Calcule o Retorno sobre Investimento acumulado, acompanhe sua performance ao longo do tempo e identifique se sua estratégia é lucrativa. Inclui cálculo de yield e análise por período.',
  'simulador-lucro': 'Projete o crescimento da banca com simulação Monte Carlo para centenas de cenários simultâneos. Visualize a variância esperada, os intervalos de confiança é o drawdown máximo.',
};

/* ─── Category metadata ─── */
const CATEGORIES = [
  { id: 'all',        label: 'Todos',            count: 12 },
  { id: 'odds',       label: 'Odds & Apostas',   count: 3 },
  { id: 'arbitragem', label: 'Arbitragem',        count: 4 },
  { id: 'gestao',     label: 'Gestão',            count: 2 },
  { id: 'roi',        label: 'ROI & Análise',     count: 1 },
  { id: 'simulacao',  label: 'Simulação',         count: 1 },
  { id: 'conversao',  label: 'Conversão',         count: 1 },
];

const CAT_COLOR = {
  odds:       '#22d3ee',
  arbitragem: '#4ade80',
  gestao:     '#818cf8',
  roi:        '#fbbf24',
  simulacao:  '#818cf8',
  conversao:  '#fbbf24',
};

const CAT_LABEL = {
  odds:       'Odds & Apostas',
  arbitragem: 'Arbitragem',
  gestao:     'Gestão',
  roi:        'ROI & Análise',
  simulacao:  'Simulação',
  conversao:  'Conversão',
};

const GLOBAL_SEO_FAQS = getSeoFaqsForPage('global');

/* ─── Schema.org JSON-LD ─── */
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Calculadoras de Apostas Esportivas Gratuitas — CalculaBet',
      description: '12 calculadoras gratuitas para apostas esportivas: odds, arbitragem, gestão de banca com Kelly Critérion, ROI, simulador Monte Carlo e conversão de odds. Sem cadastro.',
      url: 'https://calculabet.site/ferramentas',
      inLanguage: 'pt-BR',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://calculabet.site' },
          { '@type': 'ListItem', position: 2, name: 'Ferramentas', item: 'https://calculabet.site/ferramentas' },
        ],
      },
    },
    {
      '@type': 'ItemList',
      name: 'Calculadoras de apostas esportivas gratuitas',
      description: 'Conjunto de 12 ferramentas matemáticas para apostadores esportivos: cálculo de odds, arbitragem, gestão de banca, ROI e simulação.',
      numberOfItems: calculadoras.length,
      itemListElement: calculadoras.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.nome,
        description: RICH_DESC[c.slug] || c.desc,
        url: `https://calculabet.site/calculadoras/${c.slug}`,
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: GLOBAL_SEO_FAQS.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answerText },
      })),
    },
  ],
};

/* ─── SVG helpers ─── */
function ArrowRight() {
  return (
    <svg
      className="w-3.5 h-3.5 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function ChevronDown({ open }) {
  return (
    <svg
      className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* ─── Tool card ─── */
function ToolCard({ tool }) {
  const color = CAT_COLOR[tool.categoria] || '#22d3ee';
  const catLabel = CAT_LABEL[tool.categoria] || tool.categoria;
  const desc = RICH_DESC[tool.slug] || tool.desc;

  return (
    <Link
      to={`/calculadoras/${tool.slug}`}
      className="group flex flex-col rounded-2xl p-5 transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.borderColor = `${color}30`;
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px ${color}18`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.025)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      aria-label={`${tool.nome}: ${desc}`}
    >
      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}15`, color }}
          aria-hidden="true"
        >
          <Icon name={tool.icon} className="w-5 h-5" />
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{ background: `${color}12`, color, border: `1px solid ${color}20` }}
        >
          {catLabel}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-base font-semibold mb-2 leading-tight" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
        {tool.nome}
      </h3>
      <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-2)' }}>
        {desc}
      </p>

      {/* CTA */}
      <div
        className="flex items-center gap-1.5 mt-4 text-xs font-semibold transition-colors duration-150"
        style={{ color }}
      >
        Usar ferramenta
        <ArrowRight />
      </div>
    </Link>
  );
}

/* ─── FAQ accordion item ─── */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const answerId = `faq-answer-${id}`;
  const btnId = `faq-btn-${id}`;

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        border: '1px solid rgba(255,255,255,0.07)',
        background: open ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)',
      }}
    >
      <button
        id={btnId}
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        aria-expanded={open}
        aria-controls={answerId}
      >
        <span className="text-sm font-medium pr-4" style={{ color: 'var(--text-1)' }}>{q}</span>
        <ChevronDown open={open} />
      </button>
      {open && (
        <div
          id={answerId}
          role="region"
          aria-labelledby={btnId}
          className="px-5 pb-5"
        >
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{a}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Main page ─── */
export default function Ferramentas() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = calculadoras.filter(t => {
    const q = search.toLowerCase();
    const desc = RICH_DESC[t.slug] || t.desc;
    const matchSearch = q === '' || t.nome.toLowerCase().includes(q) || desc.toLowerCase().includes(q) || t.slug.toLowerCase().includes(q);
    const matchCat = category === 'all' || t.categoria === category;
    return matchSearch && matchCat;
  });

  return (
    <>
      <Helmet>
        <title>Calculadoras de Apostas Esportivas Gratuitas | CalculaBet</title>
        <meta
          name="description"
          content="12 calculadoras gratuitas para apostas esportivas: odds, arbitragem, gestão de banca com Kelly Critérion, ROI, simulador Monte Carlo e conversão de odds. Sem cadastro, sem login."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://calculabet.site/ferramentas" />
        <meta property="og:title" content="Calculadoras de Apostas Esportivas Gratuitas | CalculaBet" />
        <meta property="og:description" content="12 calculadoras gratuitas para apostas esportivas. Odds, arbitragem, gestão de banca, ROI e simulação Monte Carlo. Sem cadastro." />
        <meta property="og:url" content="https://calculabet.site/ferramentas" />
        <meta property="og:image" content="https://calculabet.site/og-image.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Calculadoras de Apostas Esportivas Gratuitas | CalculaBet" />
        <meta name="twitter:description" content="12 calculadoras gratuitas para apostas esportivas. Odds, arbitragem, gestão de banca, ROI e simulação Monte Carlo. Sem cadastro." />
        <meta name="twitter:url" content="https://calculabet.site/ferramentas" />
        <meta name="twitter:image" content="https://calculabet.site/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div style={{ color: 'var(--text-2)' }}>

        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden"
          style={{ paddingTop: '80px', paddingBottom: '64px' }}
          aria-labelledby="hero-heading"
        >
          {/* Radial gradient decoration */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '900px',
              height: '450px',
              background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.07) 0%, rgba(129,140,248,0.04) 40%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">

            {/* Breadcrumb nav */}
            <nav aria-label="Navegação estrutural" className="flex items-center justify-center gap-1.5 mb-6">
              <Link
                to="/"
                className="text-xs transition-colors duration-150"
                style={{ color: 'var(--text-3)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-2)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
              >
                Início
              </Link>
              <span className="text-xs" style={{ color: 'var(--text-3)' }} aria-hidden="true">/</span>
              <span className="text-xs" style={{ color: 'var(--text-2)' }} aria-current="page">Ferramentas</span>
            </nav>

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 text-xs font-medium"
              style={{
                background: 'rgba(34,211,238,0.07)',
                border: '1px solid rgba(34,211,238,0.2)',
                color: '#22d3ee',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" aria-hidden="true" />
              12 ferramentas gratuitas · sem cadastro · sem login
            </div>

            {/* H1 */}
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight"
              style={{ color: 'var(--text-1)', letterSpacing: '-0.03em' }}
            >
              Calculadoras de Apostas
              <br />
              <span style={{ color: '#22d3ee' }}>Esportivas Gratuitas</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg mb-6 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-2)' }}>
              O CalculaBet reúne 12 ferramentas matemáticas para apostadores esportivos: cálculo de odds, gestão de banca com Kelly Critérion, arbitragem, ROI, simulação Monte Carlo e conversão de formatos. Tome decisões baseadas em dados, não em intuição.
            </p>

            {/* Intro paragraph */}
            <p className="text-sm leading-relaxed mb-8 max-w-3xl mx-auto" style={{ color: 'var(--text-3)' }}>
              Seja você um apostador iniciante que quer entender como funciona o retorno de uma aposta simples, um intermediário explorando arbitragem e dutching, ou um avançado que acompanha ROI e utiliza simulação para avaliar estratégias no longo prazo — todas as ferramentas estão aqui, gratuitas e sem necessidade de cadastro. Os cálculos acontecem diretamente no seu navegador, em tempo real, com base em matemática financeira aplicada ao mercado de apostas esportivas.
            </p>

            {/* Search bar */}
            <div className="relative max-w-lg mx-auto mb-8">
              <div
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: 'var(--text-3)' }}
              >
                <SearchIcon />
              </div>
              <input
                type="search"
                placeholder="Buscar ferramenta... ex: ROI, arbitragem, Kelly"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full text-sm font-medium transition-all duration-150"
                style={{
                  paddingLeft: '44px',
                  paddingRight: search ? '44px' : '16px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-1)',
                  outline: 'none',
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = 'rgba(34,211,238,0.4)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(34,211,238,0.07)';
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                aria-label="Buscar ferramenta"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors"
                  style={{ color: 'var(--text-3)' }}
                  aria-label="Limpar busca"
                >
                  <CloseIcon />
                </button>
              )}
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
              {[
                { value: '12', label: 'ferramentas' },
                { value: '100%', label: 'gratuitas' },
                { value: '0', label: 'cadastros' },
                { value: '5+', label: 'categorias' },
              ].map(s => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>{s.value}</span>
                  <span className="text-xs" style={{ color: 'var(--text-3)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tools section ── */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
          aria-labelledby="tools-heading"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="pt-12">
            <h2 id="tools-heading" className="sr-only">Todas as ferramentas disponíveis</h2>

            {/* Category tabs */}
            <div
              className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide"
              role="tablist"
              aria-label="Filtrar ferramentas por categoria"
            >
              {CATEGORIES.map(cat => {
                const active = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCategory(cat.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 flex-shrink-0"
                    style={{
                      background: active ? 'rgba(34,211,238,0.12)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${active ? 'rgba(34,211,238,0.3)' : 'rgba(255,255,255,0.07)'}`,
                      color: active ? '#22d3ee' : 'var(--text-3)',
                    }}
                  >
                    {cat.label}
                    <span
                      className="px-1.5 py-0.5 rounded-full"
                      style={{
                        background: active ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.06)',
                        color: active ? '#22d3ee' : 'var(--text-3)',
                        fontSize: '0.625rem',
                      }}
                    >
                      {cat.id === 'all' ? calculadoras.length : calculadoras.filter(c => c.categoria === cat.id).length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tool grid or empty state */}
            {filtered.length > 0 ? (
              <div
                className="grid gap-5"
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))' }}
                role="list"
                aria-label={`${filtered.length} ferramenta${filtered.length !== 1 ? 's' : ''} encontrada${filtered.length !== 1 ? 's' : ''}`}
              >
                {filtered.map(tool => (
                  <div key={tool.slug} role="listitem">
                    <ToolCard tool={tool} />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center py-20 rounded-2xl"
                style={{ border: '1px dashed rgba(255,255,255,0.08)' }}
              >
                <svg className="w-10 h-10 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true" style={{ color: 'var(--text-3)' }}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-2)' }}>
                  Nenhuma ferramenta encontrada
                </p>
                <p className="text-xs mb-4" style={{ color: 'var(--text-3)' }}>
                  Tente outros termos ou redefina os filtros
                </p>
                <button
                  onClick={() => { setSearch(''); setCategory('all'); }}
                  className="text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-150"
                  style={{
                    background: 'rgba(34,211,238,0.1)',
                    border: '1px solid rgba(34,211,238,0.2)',
                    color: '#22d3ee',
                  }}
                >
                  Ver todas as ferramentas
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── Native Ad — mid-page ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Publicidade">
          <AdNativeBanner />
        </div>

        {/* ── Como usar ── */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
          aria-labelledby="how-heading"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="pt-16">
            <p
              className="text-xs font-semibold mb-3 uppercase tracking-widest"
              style={{ color: '#22d3ee' }}
            >
              Como usar
            </p>
            <h2
              id="how-heading"
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
            >
              Três passos para calcular com precisão
            </h2>
            <p className="text-sm leading-relaxed mb-12 max-w-2xl" style={{ color: 'var(--text-2)' }}>
              Cada ferramenta do CalculaBet foi projetada para ser intuitiva e entregar resultados em tempo real. Não é necessário instalar nada, criar conta ou pagar — basta acessar pelo navegador e inserir os dados da aposta.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
              {[
                {
                  step: '01',
                  title: 'Escolha a ferramenta certa',
                  desc: 'Selecione a calculadora de acordo com o tipo de análise: use a calculadora de odds para apostas simples, a de arbitragem para sure bets, gestão de banca para dimensionar stakes ou ROI para acompanhar performance acumulada.',
                  color: '#22d3ee',
                },
                {
                  step: '02',
                  title: 'Insira os dados da aposta',
                  desc: 'Preencha stake, odds e os parâmetros solicitados. Todos os cálculos acontecem em tempo real — à medida que você digita, os resultados são atualizados instantaneamente, sem precisar clicar em nenhum botão.',
                  color: '#818cf8',
                },
                {
                  step: '03',
                  title: 'Analise e tome a decisão',
                  desc: 'Leia os indicadores: retorno, lucro líquido, ROI, probabilidade implícita, valor esperado e nível de risco. Use esses dados para decidir com base em matemática — não em intuição ou emoção.',
                  color: '#4ade80',
                },
              ].map(s => (
                <div key={s.step} className="relative">
                  <div
                    className="text-5xl font-black mb-4 leading-none select-none"
                    style={{ color: `${s.color}18`, fontVariantNumeric: 'tabular-nums' }}
                    aria-hidden="true"
                  >
                    {s.step}
                  </div>
                  <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Dica rápida callout */}
            <div
              className="rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              style={{
                background: 'rgba(129,140,248,0.06)',
                border: '1px solid rgba(129,140,248,0.18)',
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(129,140,248,0.15)', color: '#818cf8' }}
                aria-hidden="true"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#818cf8' }}>Dica rápida</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  Use as ferramentas em conjunto para obter resultados mais completos. Comece pela <Link to="/calculadoras/odds" style={{ color: '#22d3ee', textDecoration: 'underline' }}>calculadora de odds</Link> para avaliar o valor da aposta, passe pela <Link to="/calculadoras/gestao-banca" style={{ color: '#818cf8', textDecoration: 'underline' }}>gestão de banca</Link> para dimensionar o stake ideal e finalize com o <Link to="/calculadoras/roi" style={{ color: '#fbbf24', textDecoration: 'underline' }}>acompanhamento de ROI</Link> para medir sua performance acumulada ao longo das apostas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Category sections — SEO internal linking hub ── */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
          aria-labelledby="cat-hub-heading"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="pt-16 mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#22d3ee' }}>
              Categorias
            </p>
            <h2
              id="cat-hub-heading"
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
            >
              Explore por área de conhecimento
            </h2>
            <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--text-2)' }}>
              As ferramentas do CalculaBet estão organizadas em quatro grandes áreas: análise de odds, estratégias de arbitragem e cobertura, gestão profissional de banca e análise de longo prazo com ROI e simulação.
            </p>
          </div>

          <div className="space-y-10">

            {/* Odds & Apostas */}
            <div
              className="rounded-2xl p-7"
              style={{ background: 'rgba(34,211,238,0.03)', border: '1px solid rgba(34,211,238,0.12)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#22d3ee' }}>Odds & Apostas</p>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
                Entendendo odds e calculando retornos
              </h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                As odds são o ponto de partida de qualquer aposta esportiva. Elas representam o pagamento que a casa de apostas oferece para cada resultado e carregam embutida a probabilidade implícita que a casa atribui ao evento. Entender como ler e interpretar odds decimais, americanas e fracionárias é a habilidade fundamental para qualquer apostador que deseja tomar decisões informadas — e nossas ferramentas tornam esse processo imediato.
              </p>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-2)' }}>
                Mais do que calcular o retorno bruto, o apostador profissional avalia o valor esperado (EV) de cada aposta: a diferença entre a probabilidade real que ele estima para o evento é a probabilidade implícita embutida na odd. Quando essa diferença é positiva, a aposta tem valor. A calculadora de odds do CalculaBet exibe automaticamente todos esses indicadores — retorno, lucro, probabilidade implícita e EV — em tempo real, para apostas simples e múltiplas.
              </p>
              <div className="flex flex-wrap gap-2">
                {calculadoras.filter(c => c.categoria === 'odds').map(t => (
                  <Link
                    key={t.slug}
                    to={`/calculadoras/${t.slug}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150"
                    style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', color: '#22d3ee' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(34,211,238,0.15)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(34,211,238,0.08)'}
                  >
                    {t.nome}
                    <ArrowRight />
                  </Link>
                ))}
              </div>
            </div>

            {/* Arbitragem & Cobertura */}
            <div
              className="rounded-2xl p-7"
              style={{ background: 'rgba(74,222,128,0.03)', border: '1px solid rgba(74,222,128,0.12)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#4ade80' }}>Arbitragem & Cobertura</p>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
                Sure bets, dutching, hedge e cashout
              </h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                Arbitragem esportiva — também chamada de sure bet — é a prática de identificar divergências entre as odds oferecidas por diferentes casas de apostas para um mesmo evento, apostando em todos os resultados possíveis de forma a garantir lucro independente do desfecho. A condição para que uma arbitragem exista é que a soma das probabilidades implícitas de todos os resultados seja inferior a 100%. Nossa calculadora de arbitragem identifica essa oportunidade e distribui automaticamente os stakes ideais para cada casa.
              </p>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-2)' }}>
                Dutching é uma estratégia relacionada, usada quando o apostador quer cobrir múltiplos resultados de um mesmo evento numa única casa de apostas, eliminando desfechos que considera improváveis e distribuindo o stake proporcionalmenteente entre os demais. Hedge e cashout são ferramentas de proteção: o hedge usa uma aposta oposta para travar lucro ou limitar prejuízo, enquanto o cashout permite encerrar antecipadamente uma posição com base no valor de mercado atual.
              </p>
              <div className="flex flex-wrap gap-2">
                {calculadoras.filter(c => c.categoria === 'arbitragem').map(t => (
                  <Link
                    key={t.slug}
                    to={`/calculadoras/${t.slug}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150"
                    style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', color: '#4ade80' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,222,128,0.15)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(74,222,128,0.08)'}
                  >
                    {t.nome}
                    <ArrowRight />
                  </Link>
                ))}
              </div>
            </div>

            {/* Gestão de Banca */}
            <div
              className="rounded-2xl p-7"
              style={{ background: 'rgba(129,140,248,0.03)', border: '1px solid rgba(129,140,248,0.12)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#818cf8' }}>Gestão de Banca</p>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
                Kelly Critérion e proteção do capital
              </h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                Gestão de banca é o conjunto de técnicas que determinam quanto apostar em cada evento, com o objetivo de maximizar o crescimento do capital no longo prazo enquanto se controla o risco de ruína. O Critério de Kelly é o método matematicamente ótimo: ele calcula o percentual exato da banca a arriscar com base na edge estimada e na odd disponível. A fórmula é f = (bp - q) / b, onde b é o lucro líquido por unidade, p é a probabilidade estimada de vitória e q é a probabilidade de derrota.
              </p>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-2)' }}>
                Na prática, muitos apostadores profissionais utilizam meio Kelly ou um quarto Kelly para reduzir a variância e tornar a curva de crescimento da banca mais estável, aceitando crescimento ligeiramente menor em troca de menor volatilidade. Nossa calculadora de gestão de banca oferece Kelly completo, 1/2 Kelly e 1/4 Kelly, além de flat betting e percentual fixo para apostadores em diferentes estágios de desenvolvimento.
              </p>
              <div className="flex flex-wrap gap-2">
                {calculadoras.filter(c => c.categoria === 'gestao').map(t => (
                  <Link
                    key={t.slug}
                    to={`/calculadoras/${t.slug}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150"
                    style={{ background: 'rgba(129,140,248,0.08)', border: '1px solid rgba(129,140,248,0.2)', color: '#818cf8' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(129,140,248,0.15)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(129,140,248,0.08)'}
                  >
                    {t.nome}
                    <ArrowRight />
                  </Link>
                ))}
              </div>
            </div>

            {/* Analise & Simulacao */}
            <div
              className="rounded-2xl p-7"
              style={{ background: 'rgba(251,191,36,0.03)', border: '1px solid rgba(251,191,36,0.12)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#fbbf24' }}>Analise & Simulacao</p>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
                ROI, Monte Carlo e conversao de odds
              </h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                Acompanhar o ROI acumulado é indispensável para avaliar se uma estratégia de apostas é genuinamente lucrativa ou se os resultados positivos são fruto de variância favorável. O Retorno sobre Investimento — calculado como (lucro total / total apostado) x 100 — fornece uma visão objetiva da edge real. Nossa calculadora de ROI organiza esse acompanhamento por período, mercado ou estratégia, exibindo yield médio por aposta e curva de crescimento da banca.
              </p>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-2)' }}>
                Para análises prospectivas, o Simulador de Lucro usa simulação Monte Carlo para projetar centenas de cenários possíveis com base nos parâmetros informados — taxa de acerto, odds médias e número de apostas. O resultado é um intervalo de confiança para o crescimento esperado da banca, ilustrando tanto o potencial de ganho quanto o risco de drawdown. Já o Conversor de Odds fácilita a comparação entre casas internacionais ao converter instantaneamente entre formatos decimal, americano, fracionário e probabilidade percentual.
              </p>
              <div className="flex flex-wrap gap-2">
                {calculadoras.filter(c => ['roi','simulacao','conversao'].includes(c.categoria)).map(t => (
                  <Link
                    key={t.slug}
                    to={`/calculadoras/${t.slug}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150"
                    style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', color: '#fbbf24' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(251,191,36,0.15)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(251,191,36,0.08)'}
                  >
                    {t.nome}
                    <ArrowRight />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── Educational content ── */}
        <section
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
          aria-labelledby="edu-heading"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="pt-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#818cf8' }}>
              Guia educativo
            </p>
            <h2
              id="edu-heading"
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
            >
              Matematica das apostas esportivas
            </h2>
            <p className="text-sm leading-relaxed mb-14 max-w-2xl" style={{ color: 'var(--text-2)' }}>
              Antes de usar qualquer calculadora, entender os conceitos por trás de cada metrica torna o apostador mais critico e menos suscetivel a erros de interpretacao. Os topicos abaixo cobrem os fundamentos matemáticos que embasam todas as ferramentas desta plataforma.
            </p>

            <div className="space-y-14">

              {/* A. Formatos de odds */}
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
                  A. Como funcionam as odds decimais, americanas e fracionarias
                </h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                  Odds decimais são o formato mais direto: uma odd de 2.50 significa que para cada R$1,00 apostado o retorno total sera R$2,50, incluindo o capital inicial. O lucro líquido é a odd menos 1 — nesse caso, R$1,50. Esse formato e dominante nas casas de apostas europeias e brasileiras, e é o mais simples para calcular retorno e probabilidade implícita.
                </p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                  Odds americanas (moneyline) usam sinal positivo ou negativo. Uma odd +250 indica que uma aposta de R$100 rende lucro de R$250. Uma odd -150 indica que e preciso apostar R$150 para lucrar R$100. São comuns em casas norte-americanas e em mercados de beisebol, futebol americano e basquete NBA. Odds fracionarias, usadas no Reino Unido, expressam o lucro em relacao ao stake: 3/2 significa lucro de R$3 para cada R$2 apostados.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  Converter entre formatos rápidamente e essencial para comparar odds entre casas internacionais. Utilize o <Link to="/calculadoras/conversor-odds" style={{ color: '#fbbf24', textDecoration: 'underline' }}>conversor de odds do CalculaBet</Link> para transformar instantaneamente qualquer formato nos quatro sistemas principais.
                </p>
              </div>

              {/* B. Probabilidade implícita e valor esperado */}
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
                  B. O que e probabilidade implícita e valor esperado
                </h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                  A probabilidade implícita é a probabilidade de vitoria que a casa de apostas embutiu na odd. A fórmula e simples: probabilidade implícita (%) = (1 / odd decimal) x 100. Uma odd 2.00 implica probabilidade de 50%. Uma odd 1.50 implica 66.7%. A soma das probabilidades implícitas de todos os resultados de um evento e sempre superior a 100% — a diferença é a margem da casa, também chamada de vigeria ou overround.
                </p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                  Valor esperado (EV) é o indicador central para avaliar se uma aposta e matematicamente atrativa. EV = (probabilidade estimada x odd decimal) - 1. Se o resultado for positivo, a aposta tem valor positivo (EV+). Por exemplo: se você estima que um time tem 60% de chance de vencer, é a casa oferece odd 2.00 (implicando 50%), o EV e (0,60 x 2,00) - 1 = +0,20, ou 20%. Isso significa que, em media, você ganha R$0,20 para cada R$1,00 apostado nessa situacao.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  Apostar sistematicamente em situações de EV positivo é a base matemática da rentabilidade no longo prazo. Use a <Link to="/calculadoras/odds" style={{ color: '#22d3ee', textDecoration: 'underline' }}>calculadora de odds</Link> para visualizar o EV de qualquer aposta automaticamente, inserindo sua estimativa de probabilidade.
                </p>
              </div>

              {/* C. Apostas múltiplas e parlays */}
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
                  C. Como calcular apostas múltiplas e parlays
                </h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                  Em apostas múltiplas (parlays), as odds decimais de cada seleção são multiplicadas para gerar a odd composta final. Uma múltipla com tres seleções de odds 1.80, 2.10 e 1.65 produz odd combinada de 1.80 x 2.10 x 1.65 = 6.237. O retorno potencial e elevado, mas a exigencia e total: todas as seleções precisam ser vencedoras. A probabilidade de acerto cai exponencialmente com cada leg adicionada.
                </p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                  Matematicamente, a múltipla so tem valor esperado positivo se cada seleção individual tiver EV positivo. Na prática, casas de apostas frequentemente oferecem bonus de parlay (odds boosted) para incentivar esse tipo de aposta — nesses casos, o cálculo de EV muda. O risco de uma múltipla e concentrado: um único resultado errado invalida toda a aposta, independente de quantas seleções acertaram.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  Use a <Link to="/calculadoras/múltipla-parlay" style={{ color: '#22d3ee', textDecoration: 'underline' }}>calculadora de múltipla e parlay</Link> para inserir as odds de cada seleção e visualizar retorno, lucro e ROI do conjunto antes de confirmar.
                </p>
              </div>

              {/* D. Arbitragem */}
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
                  D. O que e arbitragem esportiva e como funciona
                </h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                  Arbitragem esportiva ocorre quando as odds de diferentes casas de apostas para um mesmo evento permitem apostar em todos os resultados possíveis e garantir lucro independente do desfecho. A condição matemática e que a soma das probabilidades implícitas de todos os resultados seja inferior a 100%. Por exemplo: em um jogo com dois resultados, se uma casa oferece odd 2.10 para o time A e outra casa oferece odd 2.10 para o time B, a soma das probabilidades implícitas e 1/2.10 + 1/2.10 = 47.6% + 47.6% = 95.2% — abaixo de 100%, configurando arbitragem de aproximadamente 5%.
                </p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                  A distribuição dos stakes e proporcional as probabilidades implícitas de cada resultado. A calculadora cuida automaticamente dessa distribuição, informando quanto apostar em cada casa para garantir o lucro máximo com o capital disponível. Dutching é uma variante usada dentro de uma única casa: o apostador elimina resultados improváveis e distribui o stake proporcionalmenteente entre os demais.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  Acesse a <Link to="/calculadoras/arbitragem" style={{ color: '#4ade80', textDecoration: 'underline' }}>calculadora de arbitragem</Link> ou a <Link to="/calculadoras/dutching" style={{ color: '#4ade80', textDecoration: 'underline' }}>calculadora de dutching</Link> para identificar e calcular essas oportunidades.
                </p>
              </div>

              {/* E. Kelly e gestao de banca */}
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
                  E. Critério de Kelly e gestao de banca profissional
                </h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                  O Critério de Kelly é uma fórmula matemática derivada da teoria da informação que calcula o percentual ideal da banca a arriscar em cada aposta para maximizar o crescimento geometrico do capital no longo prazo. A fórmula completa e f = (bp - q) / b, onde f é a fracao da banca a apostar, b é o lucro líquido por unidade de stake (odd - 1), p é a probabilidade estimada de vitoria e q é a probabilidade estimada de derrota (1 - p). Uma edge de 5% em uma odd de 2.00 resultaria em Kelly de 5%, ou seja, apostar 5% da banca atual.
                </p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                  Apostadores profissionais frequentemente usam meio Kelly (50% do valor calculado) ou um quarto Kelly (25%) para reduzir a variância sem comprometer significativamente o crescimento esperado. O Kelly completo maximiza o crescimento de longo prazo, mas gera drawdowns expressivos no curto prazo — o que pode ser psicologicamente dificil de sustentar e arriscado em caso de superestimacao da edge.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  Experimente diferentes cenarios com a <Link to="/calculadoras/gestao-banca" style={{ color: '#818cf8', textDecoration: 'underline' }}>calculadora de gestao de banca</Link>, que oferece Kelly completo, meio Kelly, 1/4 Kelly e flat betting em uma única interface.
                </p>
              </div>

              {/* F. ROI */}
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
                  F. O que e ROI em apostas e como acompanhar
                </h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                  ROI (Retorno sobre Investimento) em apostas é calculado como: ROI = (lucro total / total apostado) x 100. Um apostador que apostou R$10.000 acumulados e obteve R$800 de lucro líquido tem ROI de 8%. E o indicador mais objetivo para avaliar se uma estratégia e genuinamente lucrativa ou se os resultados positivos são atribuíveis a variância favoravel — algo especialmente comum em amostras pequenas de menos de 200 apostas.
                </p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                  Yield é o ROI medio por aposta individual: yield = (lucro total / soma de todos os stakes) x 100. Um yield de 3% ao longo de 500 apostas e considerado excelente por profissionais. O ROI acumulado pode parecer impressionante com poucas apostas mesmo sem edge real — por isso, a amostra estatisticamente relevante (geralmente 300-500+ apostas) é o critério definitivo para avaliar uma estratégia.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  Acompanhe sua performance com a <Link to="/calculadoras/roi" style={{ color: '#fbbf24', textDecoration: 'underline' }}>calculadora de ROI</Link>, que organiza o historico por período e exibe a curva de crescimento da banca.
                </p>
              </div>

              {/* G. Cashout e Hedge */}
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
                  G. Cashout, hedge e protecao de apostas abertas
                </h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                  Cashout é a opcao oferecida pelas casas de apostas de encerrar uma aposta antes do fim do evento, recebendo um valor proporcional ao estado atual do mercado. O valor oferecido geralmente e inferior ao valor esperado matemático da aposta — a casa desconta uma margem adicional. A calculadora de cashout compara o valor oferecido com o valor esperado de manter a aposta aberta, indicando quando o cashout representa um acordo favoravel ou desfavoravel para o apostador.
                </p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                  Hedge é a estratégia de usar um mercado alternativo para travar lucro ou limitar prejuizo em uma aposta ja aberta. Por exemplo: se uma aposta pre-jogo ficou com odd favoravel após o inicio do evento, o apostador pode fazer uma aposta oposta no mercado ao vivo para garantir lucro independente do resultado final. O cálculo do stake de hedge ideal leva em conta o stake original, a odd original é a odd atual de hedge.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  Use a <Link to="/calculadoras/cashout" style={{ color: '#4ade80', textDecoration: 'underline' }}>calculadora de cashout</Link> é a <Link to="/calculadoras/hedge" style={{ color: '#4ade80', textDecoration: 'underline' }}>calculadora de hedge</Link> para tomar essas decisoes com base em numeros concretos.
                </p>
              </div>

              {/* H. Erros comuns */}
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
                  H. Erros comuns em apostas esportivas
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>
                  Conhecer os erros mais frequentes e tao importante quanto dominar as ferramentas matemáticas. Os quatro erros abaixo são responsaveis pela maioria das perdas desnecessárias em apostas esportivas:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      titulo: 'Falacia do jogador',
                      desc: 'Acreditar que resultados anteriores influenciam eventos futuros independentes. Cada partida é um evento estatisticamente independente — uma sequência de derrotas não torna a vitoria seguinte mais provavel.',
                    },
                    {
                      titulo: 'Perseguir perdas',
                      desc: 'Aumentar o stake após uma derrota para recuperar o prejuizo rápidamente. Essa prática acelera a erosao da banca e frequentemente resulta em perdas ainda maiores em um ciclo dificil de romper.',
                    },
                    {
                      titulo: 'Ausencia de gestao de banca',
                      desc: 'Apostar valores aleatories ou excessivos sem um critério matemático de dimensionamento de stake. Sem gestao de banca, mesmo uma estratégia lucrativa pode levar a ruína por conta da variância natural.',
                    },
                    {
                      titulo: 'Decisoes emocionais',
                      desc: 'Apostar em times favoritos, ignorar analise e confiar em intuicao. O apostador profissional trata cada aposta como uma decisao financeira baseada em dados — não em preferencias pessoais ou sentimentos sobre o jogo.',
                    },
                  ].map(item => (
                    <div
                      key={item.titulo}
                      className="flex gap-4 p-4 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div
                        className="w-1 rounded-full flex-shrink-0 mt-0.5"
                        style={{ background: '#818cf8', minHeight: '100%' }}
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-1)' }}>{item.titulo}</p>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* I. Controle financeiro */}
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
                  I. A importancia do controle financeiro nas apostas
                </h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                  Tratar apostas esportivas como um investimento requer o mesmo nível de disciplina e controle financeiro que qualquer outra atividade especulativa. Isso significa definir antecipadamente limites de perda diarios, semanais e mensais — e respeita-los independentemente dos resultados do momento. Um apostador que perde 5% da banca em um dia ruim sem ultrapassar o limite estabelecido está exercendo controle financeiro correto, mesmo que a experiencia seja desconfortavel.
                </p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
                  E igualmente importante definir limites de ganho: saber quando parar após uma sessao lucrativa evita que a euforia leve a apostas impulsivas que devolvem o lucro conquistado. Registrar todas as apostas — incluindo as perdedoras — e essencial para construir uma base de dados real para avaliar a estratégia ao longo do tempo. Ferramentas como a calculadora de ROI do CalculaBet fácilitam esse acompanhamento sistematico.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  Se você sentir que as apostas estao impactando negativamente sua vida financeira, emocional ou relacional, busque informações e suporte. A pagina de <Link to="/jogo-responsavel" style={{ color: '#fbbf24', textDecoration: 'underline' }}>jogo responsável do CalculaBet</Link> reune orientacoes e recursos de apoio para apostadores que precisam de ajuda.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── FAQ section ── */}
        <section
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
          aria-labelledby="faq-heading"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="pt-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#818cf8' }}>
              Perguntas frequentes
            </p>
            <h2
              id="faq-heading"
              className="text-2xl font-bold mb-3"
              style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
            >
              Duvidas sobre as ferramentas e matemática de apostas
            </h2>
            <p className="text-sm leading-relaxed mb-10" style={{ color: 'var(--text-2)' }}>
              20 perguntas frequentes sobre as calculadoras, conceitos matemáticos e estratégias de apostas esportivas.
            </p>

            <div className="space-y-3">
              {[
                {
                  q: 'O que é uma calculadora de odds e para que serve?',
                  a: 'Uma calculadora de odds converte a odd oferecida pela casa de apostas em retorno total, lucro líquido, probabilidade implícita e valor esperado automaticamente. Ela elimina cálculos manuais e erros humanos, permitindo ao apostador avaliar em segundos se a aposta e matematicamente atrativa. A calculadora de odds do CalculaBet exibe todos esses indicadores em tempo real, atualizando os resultados a medida que você digita os dados da aposta.',
                },
                {
                  q: 'Como calcular o retorno de uma aposta esportiva?',
                  a: 'O retorno total de uma aposta é calculado multiplicando o stake pela odd decimal: retorno = stake x odd. O lucro líquido é o retorno menos o stake inicial: lucro = stake x (odd - 1). Por exemplo, uma aposta de R$100 com odd 2.50 resulta em retorno total de R$250 e lucro líquido de R$150. A calculadora de aposta simples do CalculaBet realiza esse cálculo instantaneamente e exibe também o ROI é o percentual da banca consumido.',
                },
                {
                  q: 'O que são odds decimais e como funcionam?',
                  a: 'Odds decimais expressam o retorno total por unidade apostada, incluindo o stake original. Uma odd 3.00 significa que para cada R$1,00 apostado o retorno e R$3,00 — lucro de R$2,00 mais o capital devolvido. São o formato mais intuitivo para calcular probabilidade implícita: basta dividir 1 pela odd. Uma odd 2.00 implica probabilidade de 50%; uma odd 5.00 implica 20%. E o formato padrao nas casas de apostas brasileiras e europeias.',
                },
                {
                  q: 'O que e probabilidade implícita nas odds?',
                  a: 'Probabilidade implícita é a probabilidade de vitoria que a casa de apostas embutiu na odd, calculada como (1 / odd decimal) x 100. Uma odd 2.00 implica 50% de probabilidade. A soma das probabilidades implícitas de todos os resultados de um evento sempre supera 100% — a diferença é a margem da casa (vigeria). Se você estima que a probabilidade real de um evento e maior que a implícita, a aposta tem valor esperado positivo.',
                },
                {
                  q: 'O que e value bet (aposta de valor)?',
                  a: 'Value bet é uma aposta onde a probabilidade real estimada de vitoria e maior do que a probabilidade implícita refletida na odd da casa. O valor esperado é calculado como EV = (probabilidade estimada x odd decimal) - 1. Um EV positivo indica que a aposta tem valor. Identificar e apostar sistematicamente em situações de EV+ é a base matemática de qualquer estratégia lucrativa no longo prazo. Nossa calculadora de odds exibe o EV automaticamente quando você informa sua estimativa de probabilidade.',
                },
                {
                  q: 'Como funciona uma aposta múltipla (parlay)?',
                  a: 'Em uma aposta múltipla, as odds decimais de cada seleção são multiplicadas entre si para gerar a odd composta final. Tres seleções com odds 1.80, 2.10 e 1.65 resultam em odd combinada de aproximadamente 6.24. O retorno potencial e significativamente maior do que apostas individuais, mas a exigencia e total: todas as seleções precisam acertar. Uma única derrota invalida toda a múltipla. Use a calculadora de múltipla do CalculaBet para calcular retorno, lucro e risco de qualquer combinacao.',
                },
                {
                  q: 'O que e arbitragem esportiva (sure bet)?',
                  a: 'Arbitragem esportiva ocorre quando odds divergentes entre casas permitem apostar em todos os resultados de um evento e garantir lucro independente do desfecho. A condição e que a soma das probabilidades implícitas seja inferior a 100%. Os stakes são distribuidos proporcionalmenteente para garantir o mesmo retorno em qualquer resultado. A calculadora de arbitragem do CalculaBet identifica a oportunidade e calcula automaticamente quanto apostar em cada casa com base no capital disponível.',
                },
                {
                  q: 'O que e dutching e quando usar?',
                  a: 'Dutching é a estratégia de distribuir o stake entre varios resultados de um mesmo evento numa única casa de apostas, garantindo lucro igual independente de qual deles ocorra. E usado quando o apostador elimina desfechos que considera improváveis e quer cobrir os demais com risco equilibrado. Diferentemente da arbitragem — que usa múltiplas casas — o dutching funciona dentro de uma única plataforma. Nossa calculadora de dutching distribui os stakes automaticamente e exibe o lucro garantido.',
                },
                {
                  q: 'O que e hedge em apostas?',
                  a: 'Hedge é o ato de fazer uma aposta oposta a uma posicao ja aberta para travar lucro ou limitar prejuizo, independente do resultado final. Por exemplo, se uma aposta pre-jogo ficou muito favoravel após o inicio do evento, o apostador faz uma aposta contraria no mercado ao vivo para garantir um lucro fixo. O cálculo do stake de hedge ideal leva em conta o stake original, a odd original é a odd atual. Nossa calculadora de hedge realiza esse cálculo e exibe o resultado liquido de cada cenario.',
                },
                {
                  q: 'Quando vale aceitar o cashout?',
                  a: 'O cashout vale a pena matematicamente quando o valor oferecido pela casa e maior ou igual ao valor esperado de manter a aposta aberta, que é calculado multiplicando a probabilidade atual de vitoria pelo retorno total. Na prática, as casas quase sempre oferecem cashout com desconto — abaixo do valor justo. Nossa calculadora de cashout compara esses dois numeros automaticamente, indicando com clareza se o cashout representa ganho ou perda em relacao a manutenção da aposta.',
                },
                {
                  q: 'O que é o Critério de Kelly?',
                  a: 'O Critério de Kelly é uma fórmula matemática que calcula o percentual ideal da banca a arriscar em cada aposta para maximizar o crescimento geometrico do capital no longo prazo. A fórmula e f = (bp - q) / b, onde b é o lucro líquido por unidade, p é a probabilidade estimada de vitoria e q é a probabilidade de derrota. Muitos apostadores usam meio Kelly ou um quarto Kelly para reduzir a variância. Nossa calculadora de gestao de banca oferece todos esses modos com cálculo em tempo real.',
                },
                {
                  q: 'Como gerenciar a banca em apostas esportivas?',
                  a: 'Gestão de banca é o conjunto de regras que determina quanto apostar em cada evento. As abordagens mais comuns sao: flat betting (valor fixo por aposta), percentual fixo da banca e Kelly Critérion (percentual variavel baseado na edge estimada). Nenhuma estratégia elimina o risco, mas uma boa gestao de banca garante que uma sequência de resultados negativos não leve a ruína. Use nossa calculadora de gestao de banca para calcular o stake ideal para cada método.',
                },
                {
                  q: 'O que e ROI em apostas é o que e considerado bom?',
                  a: 'ROI (Retorno sobre Investimento) é calculado como (lucro total / total apostado) x 100. Yield é o ROI medio por aposta individual. Um ROI positivo e sustentado acima de 5% ao longo de 300 ou mais apostas e considerado excelente — a maioria dos apostadores profissionais opera entre 3% e 8% de yield. Amostras pequenas podem gerar ROI elevado por variância, portanto a amostra estatistica relevante e critério fundamental. Nossa calculadora de ROI organiza esse acompanhamento por período.',
                },
                {
                  q: 'O que é um simulador de apostas Monte Carlo?',
                  a: 'O simulador Monte Carlo projeta centenas ou milhares de cenarios possíveis para uma estratégia de apostas com base em parametros como taxa de acerto estimada, odd media e numero de apostas planejadas. O resultado é um intervalo de confiança para o crescimento da banca, mostrando tanto o cenario otimista quanto o pessimista é o drawdown máximo esperado. E uma ferramenta essencial para entender a variância real de qualquer estratégia antes de aplica-la com dinheiro real.',
                },
                {
                  q: 'Como converter odds decimais para americanas?',
                  a: 'Para converter odds decimais acima de 2.00 para americanas, a fórmula e: odds americanas = (odd decimal - 1) x 100, com sinal positivo. Para odds abaixo de 2.00: odds americanas = -100 / (odd decimal - 1), com sinal negativo. Por exemplo, odd decimal 2.50 vira +150; odd decimal 1.67 vira aproximadamente -150. Use o conversor de odds do CalculaBet para transformar instantaneamente entre todos os quatro formatos.',
                },
                {
                  q: 'O que e Martingale e por que e arriscado?',
                  a: 'Martingale é a estratégia de dobrar o stake após cada derrota, buscando recuperar tudo com uma única vitoria. O problema e matemático: sequências de 5, 6 ou 7 derrotas consecutivas — estatisticamente normais — levam o stake necessario a níveis exorbitantes. A estratégia assume banca infinita, o que nenhum apostador tem. Alem disso, as casas de apostas impõem limites máximos de stake que inviabilizam a continuidade do Martingale. Nossa calculadora demonstra visualmente o colapso inevitável da estratégia.',
                },
                {
                  q: 'Preciso me cadastrar para usar as ferramentas?',
                  a: 'Não. Todas as 12 calculadoras do CalculaBet são 100% gratuitas e não exigem cadastro, login, email ou qualquer dado pessoal. Acesse qualquer ferramenta diretamente pelo navegador — os cálculos acontecem localmente, em tempo real, sem necessidade de conta ou conexão com servidores externos.',
                },
                {
                  q: 'As calculadoras funcionam para qualquer esporte?',
                  a: 'Sim. As ferramentas são baseadas em matemática universal de apostas — odds decimais, probabilidade implícita, gestao de banca — e funcionam para futebol, tenis, basquete, futebol americano, e-sports, corridas, MMA, beisebol e qualquer outro mercado que utilize odds numericas. Os principios matemáticos de valor esperado, arbitragem e Kelly Critérion são independentes do esporte ou mercado especifico.',
                },
                {
                  q: 'Como saber se uma aposta tem valor positivo?',
                  a: 'Calcule o valor esperado: EV = (probabilidade estimada x odd decimal) - 1. Se o resultado for maior que zero, a aposta tem valor positivo. A dificuldade está em estimar a probabilidade real com precisao — que é o trabalho central do apostador profissional. A calculadora de odds do CalculaBet exibe o EV automaticamente: insira sua estimativa de probabilidade é a odd oferecida para ver se a aposta tem valor.',
                },
                {
                  q: 'O CalculaBet incentiva apostas?',
                  a: 'Não. O CalculaBet é uma plataforma educacional e de ferramentas matemáticas. As calculadoras tem finalidade de apoio a tomada de decisao racional e não constituem incentivo a apostas. Apostas esportivas envolvem risco financeiro real, podem gerar dependência e não são adequadas para todas as pessoas. O site mantem uma pagina completa de jogo responsável com orientacoes, limites recomendados e recursos de apoio para apostadores que precisam de ajuda.',
                },
              ].map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>


        {/* ── FAQ global SEO ── */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
          aria-label="Perguntas frequentes sobre odds, apostas e ferramentas"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="pt-16">
            <FAQSection
              items={GLOBAL_SEO_FAQS}
              title="Perguntas frequentes sobre odds, apostas e ferramentas"
              eyebrow="FAQ SEO"
              description="Respostas educativas para dúvidas de busca sobre odds, probabilidade implícita, banca, ROI, cash out, surebet, múltiplas e dutching — com links para as calculadoras certas do CalculaBet. Conteúdo para maiores de 18 anos, sem promessa de lucro."
            />
          </div>
        </section>

        {/* ── Explore também ── */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
          aria-labelledby="explore-heading"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="pt-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#22d3ee' }}>
              Explore também
            </p>
            <h2
              id="explore-heading"
              className="text-xl font-bold mb-8"
              style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}
            >
              Mais recursos do CalculaBet
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { to: '/sobre', label: 'Sobre o CalculaBet', desc: 'Conheça a plataforma, sua missao e como as ferramentas foram desenvolvidas.', color: '#22d3ee' },
                { to: '/casas-apostas', label: 'Casas de Apostas', desc: 'Informações sobre a casa parceira aprovada, avisos +18 e transparência de afiliados.', color: '#4ade80' },
                { to: '/jogo-responsavel', label: 'Jogo Responsável', desc: 'Orientações, limites recomendados e recursos de apoio para apostas com controle.', color: '#fbbf24' },
                { to: '/calculadoras/gestao-banca', label: 'Gestão de Banca', desc: 'Kelly Critérion, flat betting e percentual fixo para crescer sua banca com disciplina.', color: '#818cf8' },
                { to: '/calculadoras/roi', label: 'ROI em Apostas', desc: 'Acompanhe seu retorno sobre investimento e avalie sua performance acumulada.', color: '#fbbf24' },
                { to: '/calculadoras/arbitragem', label: 'Arbitragem', desc: 'Calcule stakes para sure bets e garanta lucro independente do resultado.', color: '#4ade80' },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex flex-col p-5 rounded-2xl transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `rgba(255,255,255,0.035)`;
                    e.currentTarget.style.borderColor = `${link.color}25`;
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <p className="text-sm font-semibold mb-1.5" style={{ color: link.color }}>{link.label}</p>
                  <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--text-3)' }}>{link.desc}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs font-medium" style={{ color: link.color }}>
                    Acessar
                    <ArrowRight />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA bottom ── */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div
            className="pt-16 mt-2 rounded-2xl px-8 py-14 text-center relative overflow-hidden"
            style={{
              background: 'rgba(34,211,238,0.04)',
              border: '1px solid rgba(34,211,238,0.14)',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-60px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '600px',
                height: '200px',
                background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.08) 0%, transparent 65%)',
                pointerEvents: 'none',
              }}
            />
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 relative" style={{ color: '#22d3ee' }}>
              Comece agora
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 relative" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
              Pronto para calcular com precisao?
            </h2>
            <p className="text-sm mb-8 max-w-lg mx-auto leading-relaxed relative" style={{ color: 'var(--text-2)' }}>
              Comece pela calculadora de odds — a mais usada da plataforma — e explore todas as ferramentas no seu ritmo. Sem cadastro, sem custo, sem limite de uso.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap relative">
              <Link to="/calculadoras/odds" className="btn-primary">
                Calcular odds agora
                <ArrowRight />
              </Link>
              <Link
                to="/calculadoras/gestao-banca"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-1)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.09)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                Gestão de banca
                <ArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Responsible gaming notice ── */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
          aria-label="Aviso de jogo responsável"
        >
          <div
            className="rounded-xl px-5 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5"
            style={{
              background: 'rgba(251,191,36,0.04)',
              border: '1px solid rgba(251,191,36,0.1)',
            }}
          >
            <span
              className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}
              aria-hidden="true"
            >
              +18
            </span>
            <div className="flex-1">
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
                <strong style={{ color: 'var(--text-2)' }}>Jogo responsável:</strong> Apostas esportivas envolvem risco financeiro real e podem causar dependência. As ferramentas desta plataforma tem finalidade educativa e matemática — não constituem incentivo ou recomendação de apostas. Apostar deve ser uma atividade de lazer consciente: defina limites antes de jogar, nunca aposte valores que comprometam suas finanças ou responsabilidades, e procure ajuda se sentir que as apostas estão fora de controle. Proibido para menores de 18 anos.
              </p>
            </div>
            <Link
              to="/jogo-responsavel"
              className="flex items-center gap-1.5 text-xs font-semibold flex-shrink-0 transition-colors duration-150"
              style={{ color: '#fbbf24' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fde68a'}
              onMouseLeave={e => e.currentTarget.style.color = '#fbbf24'}
            >
              Jogo responsável
              <ArrowRight />
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
