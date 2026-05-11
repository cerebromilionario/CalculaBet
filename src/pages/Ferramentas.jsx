import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { calculadoras } from '../data/casas';
import Icon from '../components/ui/Icons';

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

/* ─── Schema.org ─── */
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Ferramentas para Apostas Esportivas — CalculaBet',
      description: '12 calculadoras gratuitas para apostas esportivas: odds, arbitragem, gestão de banca, ROI, simulador e conversão de odds.',
      url: 'https://calculabet.com.br/ferramentas',
      inLanguage: 'pt-BR',
    },
    {
      '@type': 'ItemList',
      name: 'Ferramentas de apostas esportivas',
      numberOfItems: calculadoras.length,
      itemListElement: calculadoras.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.nome,
        description: c.desc,
        url: `https://calculabet.com.br/calculadoras/${c.slug}`,
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'O que é o CalculaBet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O CalculaBet é uma plataforma gratuita de ferramentas matemáticas para apostadores esportivos. Oferece 12 calculadoras cobrindo odds, arbitragem, gestão de banca, ROI, simulação Monte Carlo e conversão de formatos de odds.',
          },
        },
        {
          '@type': 'Question',
          name: 'As ferramentas são gratuitas?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. Todas as 12 ferramentas do CalculaBet são 100% gratuitas e não exigem cadastro, login ou dados pessoais para uso.',
          },
        },
        {
          '@type': 'Question',
          name: 'Para quem são indicadas as calculadoras?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'As ferramentas são úteis para qualquer apostador — do iniciante que quer entender retorno e odds, ao intermediário que busca gestão de banca e arbitragem, até o avançado que trabalha com ROI, simulação e conversão de formatos.',
          },
        },
        {
          '@type': 'Question',
          name: 'As calculadoras funcionam para qualquer esporte?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. As ferramentas são baseadas em matemática universal de apostas (odds decimais, probabilidade, gestão de banca) e funcionam para futebol, tênis, basquete, e-sports, corridas e qualquer outro mercado.',
          },
        },
        {
          '@type': 'Question',
          name: 'O que é arbitragem em apostas?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Arbitragem (sure bet) é quando as odds de diferentes casas de apostas permitem apostar em todos os resultados possíveis de um evento e obter lucro garantido, independentemente do resultado. A calculadora de arbitragem do CalculaBet calcula automaticamente os stakes ideais para cada cenário.',
          },
        },
        {
          '@type': 'Question',
          name: 'O que é o Critério de Kelly?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O Critério de Kelly é uma fórmula matemática que calcula o percentual ideal da banca a apostar em cada evento, baseado na probabilidade estimada e na odd oferecida. Maximiza o crescimento da banca no longo prazo. A calculadora de gestão de banca do CalculaBet oferece Kelly completo, 1/2 Kelly e 1/4 Kelly.',
          },
        },
      ],
    },
  ],
};

/* ─── Small helper ─── */
function ArrowRight() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/* ─── Tool card ─── */
function ToolCard({ tool }) {
  const color = CAT_COLOR[tool.categoria] || '#22d3ee';
  const catLabel = CAT_LABEL[tool.categoria] || tool.categoria;

  return (
    <Link
      to={`/calculadoras/${tool.slug}`}
      className="group flex flex-col rounded-2xl p-5 transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = `rgba(255,255,255,0.04)`;
        e.currentTarget.style.borderColor = `${color}30`;
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.3)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.025)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      aria-label={`${tool.nome}: ${tool.desc}`}
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
      <p className="text-sm font-semibold mb-1.5 leading-tight" style={{ color: 'var(--text-1)' }}>
        {tool.nome}
      </p>
      <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--text-3)' }}>
        {tool.desc}
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
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{ border: '1px solid rgba(255,255,255,0.07)', background: open ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)' }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium pr-4" style={{ color: 'var(--text-1)' }}>{q}</span>
        <svg
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5">
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
    const matchSearch = q === '' || t.nome.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q);
    const matchCat = category === 'all' || t.categoria === category;
    return matchSearch && matchCat;
  });

  return (
    <>
      <Helmet>
        <title>Ferramentas para Apostas Esportivas | CalculaBet</title>
        <meta
          name="description"
          content="12 calculadoras gratuitas para apostas esportivas: odds, arbitragem, gestão de banca, ROI, simulador Monte Carlo e conversão de odds. Calcule com precisão, aposte com inteligência."
        />
        <link rel="canonical" href="https://calculabet.com.br/ferramentas" />
        <meta property="og:title" content="Ferramentas para Apostas Esportivas | CalculaBet" />
        <meta property="og:description" content="12 calculadoras gratuitas para apostas esportivas. Sem cadastro, sem custo." />
        <meta property="og:url" content="https://calculabet.com.br/ferramentas" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div style={{ color: 'var(--text-2)' }}>

        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden"
          style={{ paddingTop: '80px', paddingBottom: '64px' }}
          aria-labelledby="hero-heading"
        >
          {/* Subtle background glow */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '800px',
              height: '400px',
              background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.07) 0%, transparent 65%)',
              pointerEvents: 'none',
            }}
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 text-xs font-medium"
              style={{
                background: 'rgba(34,211,238,0.07)',
                border: '1px solid rgba(34,211,238,0.2)',
                color: '#22d3ee',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" aria-hidden="true" />
              12 ferramentas gratuitas · sem cadastro
            </div>

            {/* Heading */}
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight"
              style={{
                color: 'var(--text-1)',
                letterSpacing: '-0.03em',
              }}
            >
              Ferramentas inteligentes
              <br />
              <span style={{ color: '#22d3ee' }}>para apostas calculadas</span>
            </h1>

            <p className="text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Calculadoras precisas para odds, gestão de banca, arbitragem, ROI e simulações.
              Tome decisões baseadas em matemática, não em intuição.
            </p>

            {/* Search bar */}
            <div className="relative max-w-lg mx-auto mb-8">
              <div
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: 'var(--text-3)' }}
                aria-hidden="true"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
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
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {[
                { value: '12', label: 'ferramentas' },
                { value: '100%', label: 'gratuitas' },
                { value: '0', label: 'cadastros' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>{s.value}</span>
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
        >
          <h2 id="tools-heading" className="sr-only">Todas as ferramentas</h2>

          {/* Category tabs */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide"
            role="tablist"
            aria-label="Filtrar por categoria"
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
                    className="px-1.5 py-0.5 rounded-full text-xs"
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
              className="grid gap-4"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
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
              className="flex flex-col items-center justify-center py-16 rounded-2xl"
              style={{ border: '1px dashed rgba(255,255,255,0.08)' }}
            >
              <svg className="w-10 h-10 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true" style={{ color: 'var(--text-3)' }}>
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-2)' }}>
                Nenhuma ferramenta encontrada
              </p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                Tente outros termos ou{' '}
                <button
                  onClick={() => { setSearch(''); setCategory('all'); }}
                  style={{ color: '#22d3ee', textDecoration: 'underline' }}
                >
                  ver todas
                </button>
              </p>
            </div>
          )}
        </section>

        {/* ── How it works ── */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
          aria-labelledby="how-heading"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="pt-16">
            <p
              className="text-xs font-semibold mb-3"
              style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.1em' }}
            >
              Como funciona
            </p>
            <h2
              id="how-heading"
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
            >
              Por que usar ferramentas de cálculo?
            </h2>
            <p className="text-sm leading-relaxed mb-12 max-w-2xl" style={{ color: 'var(--text-2)' }}>
              Apostas esportivas têm uma matemática precisa por trás de cada decisão. Usar calculadoras elimina erros humanos, acelera a análise e permite identificar oportunidades que o cálculo mental perderia.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
              {[
                {
                  step: '01',
                  title: 'Escolha a ferramenta',
                  desc: 'Selecione a calculadora de acordo com o tipo de aposta: simples, múltipla, arbitragem, hedge ou gestão de banca.',
                  color: '#22d3ee',
                },
                {
                  step: '02',
                  title: 'Informe os dados',
                  desc: 'Preencha stake, odds e parâmetros. Os cálculos acontecem em tempo real — sem precisar apertar nenhum botão.',
                  color: '#818cf8',
                },
                {
                  step: '03',
                  title: 'Analise e decida',
                  desc: 'Veja retorno, lucro, ROI, probabilidade implícita e riscos. Tome decisões baseadas em dados, não em intuição.',
                  color: '#4ade80',
                },
              ].map(s => (
                <div key={s.step} className="relative">
                  <div
                    className="text-4xl font-black mb-4 leading-none"
                    style={{ color: `${s.color}20`, fontVariantNumeric: 'tabular-nums' }}
                    aria-hidden="true"
                  >
                    {s.step}
                  </div>
                  <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-1)' }}>
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Category deep-dives */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  cat: 'Odds & Retorno',
                  color: '#22d3ee',
                  title: 'Entenda o retorno de cada aposta',
                  body: 'As calculadoras de odds calculam retorno total, lucro líquido, ROI e probabilidade implícita. Antes de confirmar qualquer aposta, verifique se o valor esperado (EV) é positivo — essa é a base do apostador consistente.',
                  tools: ['odds', 'aposta-simples', 'multipla-parlay'],
                },
                {
                  cat: 'Arbitragem',
                  color: '#4ade80',
                  title: 'Lucro garantido independente do resultado',
                  body: 'Arbitragem (sure bets), dutching e hedge são estratégias que eliminam ou reduzem o risco usando odds de diferentes fontes ou apostas opostas. As calculadoras distribuem os stakes ideais automaticamente.',
                  tools: ['arbitragem', 'dutching', 'cashout', 'hedge'],
                },
                {
                  cat: 'Gestão de Banca',
                  color: '#818cf8',
                  title: 'Kelly Criterion e proteção da banca',
                  body: 'A gestão de banca é o que separa apostadores amadores de profissionais. O Critério de Kelly maximiza o crescimento matemático da banca. A calculadora oferece Kelly completo, 1/2 Kelly e 1/4 Kelly para diferentes perfis de risco.',
                  tools: ['gestao-banca', 'martingale'],
                },
                {
                  cat: 'Análise & Simulação',
                  color: '#fbbf24',
                  title: 'ROI, variância e projeções de longo prazo',
                  body: 'O ROI (Retorno sobre Investimento) revela se sua estratégia é lucrativa no longo prazo. O Simulador de Lucro usa Monte Carlo para projetar centenas de cenários. O Conversor de Odds facilita comparações entre casas.',
                  tools: ['roi', 'simulador-lucro', 'conversor-odds'],
                },
              ].map(card => {
                const tools = calculadoras.filter(c => card.tools.includes(c.slug));
                return (
                  <div
                    key={card.cat}
                    className="rounded-2xl p-6"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: `1px solid ${card.color}18`,
                    }}
                  >
                    <span
                      className="inline-block text-xs font-semibold mb-3 px-2.5 py-1 rounded-full"
                      style={{ background: `${card.color}12`, color: card.color }}
                    >
                      {card.cat}
                    </span>
                    <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-1)' }}>
                      {card.title}
                    </h3>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-3)' }}>
                      {card.body}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tools.map(t => (
                        <Link
                          key={t.slug}
                          to={`/calculadoras/${t.slug}`}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150"
                          style={{
                            background: `${card.color}0d`,
                            border: `1px solid ${card.color}20`,
                            color: card.color,
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = `${card.color}18`}
                          onMouseLeave={e => e.currentTarget.style.background = `${card.color}0d`}
                        >
                          {t.nome}
                          <ArrowRight />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
          aria-labelledby="faq-heading"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="pt-16">
            <p
              className="text-xs font-semibold mb-3"
              style={{ color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.1em' }}
            >
              Perguntas frequentes
            </p>
            <h2
              id="faq-heading"
              className="text-2xl font-bold mb-8"
              style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
            >
              Dúvidas sobre as ferramentas
            </h2>

            <div className="space-y-3">
              {[
                {
                  q: 'O que é o CalculaBet e como funciona?',
                  a: 'O CalculaBet é uma plataforma gratuita de ferramentas matemáticas para apostadores esportivos. Oferece 12 calculadoras cobrindo desde cálculo básico de odds até simulação Monte Carlo, gestão de banca com Kelly Criterion e arbitragem. Tudo funciona no navegador, sem instalação, sem cadastro e sem custos.',
                },
                {
                  q: 'As ferramentas são realmente gratuitas?',
                  a: 'Sim, todas as 12 ferramentas são 100% gratuitas. Não há plano pago, assinatura ou funcionalidade bloqueada. O CalculaBet é mantido através de parcerias com casas de apostas regulamentadas — essas parcerias não afetam os cálculos ou os resultados das ferramentas.',
                },
                {
                  q: 'Preciso me cadastrar ou criar uma conta?',
                  a: 'Não. Nenhuma ferramenta exige cadastro, login, email ou qualquer dado pessoal. Acesse qualquer calculadora diretamente pelo navegador e comece a usar imediatamente.',
                },
                {
                  q: 'As calculadoras funcionam para qualquer esporte?',
                  a: 'Sim. As ferramentas são baseadas em matemática universal de apostas — odds decimais, probabilidade, gestão de banca — e funcionam para futebol, tênis, basquete, e-sports, corridas, MMA e qualquer outro mercado esportivo.',
                },
                {
                  q: 'Como as ferramentas ajudam a melhorar meu ROI?',
                  a: 'As ferramentas permitem calcular o Valor Esperado (EV) de cada aposta antes de confirmar, identificar oportunidades de arbitragem, aplicar gestão de banca matematicamente correta e acompanhar o ROI acumulado ao longo do tempo. Juntas, essas práticas reduzem decisões emocionais e aumentam a consistência.',
                },
                {
                  q: 'O CalculaBet incentiva apostas?',
                  a: 'Não. O CalculaBet é uma plataforma educacional e de ferramentas matemáticas. Apostas esportivas envolvem risco financeiro real. Todas as calculadoras incluem alertas de jogo responsável, e o site mantém uma página completa sobre jogo responsável com recursos de apoio.',
                },
              ].map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
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
            className="pt-16 pb-2 rounded-2xl px-8 py-12 text-center"
            style={{
              background: 'rgba(34,211,238,0.04)',
              border: '1px solid rgba(34,211,238,0.12)',
            }}
          >
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
              Pronto para calcular com precisão?
            </h2>
            <p className="text-sm mb-8 max-w-lg mx-auto" style={{ color: 'var(--text-2)' }}>
              Comece pela calculadora de odds — a mais usada da plataforma — e explore todas as ferramentas no seu ritmo.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
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
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                Gestão de banca
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
            className="rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5"
            style={{
              background: 'rgba(251,191,36,0.04)',
              border: '1px solid rgba(251,191,36,0.1)',
            }}
          >
            <span
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}
              aria-hidden="true"
            >
              +18
            </span>
            <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--text-3)' }}>
              <strong style={{ color: 'var(--text-2)' }}>Jogo responsável:</strong> Apostas esportivas envolvem risco financeiro real. As ferramentas desta plataforma têm finalidade educativa e matemática — não constituem incentivo a apostas. Defina limites antes de jogar e nunca aposte valores que comprometam suas finanças.
            </p>
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
