import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

/* ── Inline helpers ─────────────────────────────────────── */

const InternalLink = ({ to, children }) => (
  <Link
    to={to}
    style={{ color: '#22d3ee' }}
    className="underline underline-offset-2 hover:opacity-80 transition-opacity"
  >
    {children}
  </Link>
);

const InfoBox = ({ variant = 'info', title, children }) => {
  const v = {
    info:    { bg: 'rgba(34,211,238,0.05)',  border: 'rgba(34,211,238,0.15)',  color: '#22d3ee' },
    success: { bg: 'rgba(74,222,128,0.05)',  border: 'rgba(74,222,128,0.15)',  color: '#4ade80' },
    warning: { bg: 'rgba(251,191,36,0.06)',  border: 'rgba(251,191,36,0.18)',  color: '#fbbf24' },
    danger:  { bg: 'rgba(248,113,113,0.05)', border: 'rgba(248,113,113,0.15)', color: '#f87171' },
    violet:  { bg: 'rgba(129,140,248,0.05)', border: 'rgba(129,140,248,0.15)', color: '#818cf8' },
  }[variant];
  return (
    <div
      className="rounded-xl px-4 py-3.5 text-xs leading-relaxed"
      style={{ background: v.bg, border: `1px solid ${v.border}` }}
    >
      {title && (
        <p className="font-semibold mb-1.5 text-xs" style={{ color: v.color }}>
          {title}
        </p>
      )}
      <div style={{ color: 'var(--text-2)' }}>{children}</div>
    </div>
  );
};

/* ── Schema.org ─────────────────────────────────────────── */

const faqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.answerText || f.a },
  })),
});

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Calculadora de Aposta Simples — CalculaBet',
  description:
    'Calcule retorno total, lucro líquido, ROI e probabilidade implícita de apostas simples em tempo real. Ferramenta gratuita para apostadores esportivos.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  inLanguage: 'pt-BR',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  featureList: [
    'Cálculo de retorno total',
    'Cálculo de lucro líquido',
    'ROI em percentual',
    'Probabilidade implícita',
    'Percentual de banca apostada',
    'Classificação de risco',
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como calcular o retorno de uma aposta simples',
  description:
    'Passo a passo para calcular retorno, lucro e ROI de qualquer aposta simples usando odds decimais.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Calculadora de Aposta Simples — CalculaBet' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Defina o stake',
      text: 'Informe o valor que deseja apostar (stake). Recomendamos entre 1% e 3% da sua banca total para uma gestão conservadora.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Informe a odd decimal',
      text: 'Digite a odd decimal do mercado escolhido exatamente como exibida pela casa de apostas. Ex: 2.50.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Veja o retorno total',
      text: 'O retorno total é calculado automaticamente: Retorno = Stake × Odd. Com R$100 na odd 2.50 você recebe R$250.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Analise o lucro e o ROI',
      text: 'O lucro líquido é Retorno − Stake (R$150 no exemplo). O ROI mostra o percentual de lucro sobre o valor apostado (150%).',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Verifique o risco na banca',
      text: 'Preencha o campo Banca Total para ver automaticamente o percentual que está sendo arriscado e a classificação de risco.',
    },
  ],
};

/* ── Preset stakes ──────────────────────────────────────── */

const PRESETS = [10, 25, 50, 100, 200, 500];

/* ── Component ──────────────────────────────────────────── */

export default function ApostaSimples() {
  const [stake, setStake] = useState('');
  const [odd, setOdd] = useState('');
  const [banca, setBanca] = useState('');

  const s = parseFloat(stake);
  const o = parseFloat(odd);
  const b = parseFloat(banca);
  const valid = s > 0 && o > 1;
  const retorno  = valid ? s * o : 0;
  const lucro    = valid ? retorno - s : 0;
  const roi      = valid ? (lucro / s) * 100 : 0;
  const probImpl = valid ? (1 / o) * 100 : 0;
  const percBanca = valid && b > 0 ? (s / b) * 100 : null;
  const breakeven = valid ? (1 / o) * 100 : 0;

  const faqs = [
    {
      q: 'O que é uma aposta simples?',
      a: 'Uma aposta simples (também chamada de single bet ou aposta única) é uma aposta feita em um único evento ou mercado. Você precisa acertar apenas essa seleção para receber o retorno. É o tipo de aposta mais básico e recomendado para iniciantes.',
    },
    {
      q: 'Como calcular o retorno de uma aposta simples?',
      a: 'Multiplique o stake (valor apostado) pela odd decimal: Retorno = Stake × Odd. O lucro líquido é o retorno menos o stake. Exemplo: R$100 apostados na odd 2.50 retornam R$250 — um lucro de R$150. Nossa calculadora faz isso automaticamente em tempo real.',
    },
    {
      q: 'O que é stake em apostas esportivas?',
      a: 'Stake é o valor em dinheiro que você coloca em risco em uma aposta. Uma boa gestão de banca indica apostar entre 1% e 3% da sua banca total por evento. Nunca aposte mais do que pode perder — apostar valores além do razoável é um dos principais erros dos iniciantes.',
    },
    {
      q: 'O que é ROI em apostas e como interpretar?',
      a: 'ROI (Return on Investment) é o percentual de retorno sobre o valor investido: ROI = (Lucro ÷ Stake) × 100. Apostadores profissionais mantêm ROI entre 5% e 15% no longo prazo. ROI negativo indica prejuízo acumulado — sinal para revisar estratégia.',
    },
    {
      q: 'O que é probabilidade implícita em apostas?',
      a: 'Probabilidade implícita é a chance de vitória que a odd representa matematicamente: 1/Odd × 100. Odd 2.00 implica 50%; odd 1.50 implica 66,7%. Se você acredita que a probabilidade real de um evento é maior do que a implícita pela odd, a aposta tem "value" (valor esperado positivo).',
    },
    {
      q: 'O que é ponto de equilíbrio (breakeven) em apostas?',
      a: 'O breakeven é a taxa mínima de acerto que você precisa ter com uma determinada odd para não perder dinheiro no longo prazo. É igual à probabilidade implícita: para odd 2.00, você precisa acertar mais de 50% das apostas. Quanto menor a odd, maior precisa ser sua taxa de acerto.',
    },
    {
      q: 'Qual a diferença entre aposta simples e aposta múltipla?',
      a: 'Na aposta simples você aposta em um único evento — só precisa acertar uma seleção. Na aposta múltipla (parlay), você combina 2 ou mais seleções: as odds se multiplicam (maior retorno potencial), mas TODAS as seleções precisam ser vencedoras. O risco cresce exponencialmente nas múltiplas.',
    },
    {
      q: 'Qual percentual da banca devo apostar por evento?',
      a: 'Para apostadores conservadores, o recomendado é entre 1% e 2% da banca por aposta. O limite moderado é 3–5%. Acima de 5% é considerado alto risco. Nossa calculadora mostra automaticamente o percentual e a classificação quando você informa a banca total.',
    },
    {
      q: 'A calculadora de aposta simples funciona para qualquer esporte?',
      a: 'Sim. A calculadora funciona para futebol, tênis, basquete, vôlei, e-sports, corridas, MMA e qualquer outro esporte ou mercado — desde que a odd esteja no formato decimal (ex: 2.50, 1.80, 3.40). Se a odd estiver em formato americano ou fracionário, use nosso conversor de odds antes.',
    },
    {
      q: 'Como saber se uma odd tem valor (value bet)?',
      a: 'Uma odd tem valor quando sua probabilidade implícita é menor do que a probabilidade real que você estima para o evento. Ex: se você acredita que um time tem 60% de chance de vencer, mas a odd 1.80 implica apenas 55,6%, existe valor. Value betting é a base do apostador profissional de longo prazo.',
    },
    {
      q: 'Quanto é considerado um bom ROI em apostas esportivas?',
      a: 'Qualquer ROI positivo sustentado por centenas de apostas é excelente. ROI acima de 5% é muito bom; acima de 10% é considerado nível profissional. A maioria dos apostadores amadores tem ROI negativo no longo prazo por conta da margem das casas de apostas (overround).',
    },
    {
      q: 'Odd 2.00 significa 50% de chance de ganhar?',
      a: 'Matematicamente sim — a probabilidade implícita de odd 2.00 é 50%. Mas na prática as casas embutem uma margem (overround), então a probabilidade real pode ser ligeiramente diferente. Para que a aposta seja lucrativa no longo prazo, você precisa que a probabilidade real do evento seja maior que 50%.',
    },
  ];

  return (
    <CalcLayout
      title="Calculadora de Aposta Simples"
      description="Calcule retorno total, lucro líquido, ROI e probabilidade implícita de apostas simples em tempo real. Ferramenta gratuita com guia completo de fórmulas, exemplos práticos e estratégias de gestão de banca."
      slug="aposta-simples"
      faqs={faqs}
      schema={[pageSchema, howToSchema, faqSchema(faqs)]}
      explanation={<ApostaSimplesExplanation />}
    >
      <div className="space-y-6">

        {/* Quick stakes */}
        <div>
          <p className="label">Stake rápido</p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={parseFloat(stake) === v}
                onClick={() => setStake(String(v))}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                style={{
                  background:
                    parseFloat(stake) === v
                      ? 'rgba(34,211,238,0.12)'
                      : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${
                    parseFloat(stake) === v
                      ? 'rgba(34,211,238,0.25)'
                      : 'var(--border)'
                  }`,
                  color:
                    parseFloat(stake) === v ? '#22d3ee' : 'var(--text-2)',
                }}
              >
                R${v}
              </button>
            ))}
          </div>
        </div>

        {/* Main inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="calc-stake" className="label">
              Stake — valor apostado (R$)
            </label>
            <input
              id="calc-stake"
              type="number"
              inputMode="decimal"
              className="input-field"
              placeholder="100"
              min="0"
              step="any"
              value={stake}
              onChange={(e) => setStake(e.target.value)}
              aria-describedby="stake-hint"
            />
            <p id="stake-hint" className="mt-1 text-xs" style={{ color: 'var(--text-3)' }}>
              Recomendado: 1–3% da sua banca
            </p>
          </div>
          <div>
            <label htmlFor="calc-odd" className="label">
              Odd decimal
            </label>
            <input
              id="calc-odd"
              type="text"
              inputMode="decimal"
              className="input-field"
              placeholder="2.50"
              value={odd}
              onChange={(e) => setOdd(e.target.value)}
              aria-describedby="odd-hint"
            />
            <p id="odd-hint" className="mt-1 text-xs" style={{ color: 'var(--text-3)' }}>
              Use ponto como separador decimal
            </p>
          </div>
        </div>

        {/* Optional bankroll */}
        <div>
          <label htmlFor="calc-banca" className="label">
            Banca total (R$){' '}
            <span
              style={{
                color: 'var(--text-3)',
                fontWeight: 400,
                textTransform: 'none',
                letterSpacing: 0,
              }}
            >
              — opcional · calcula % da banca apostada
            </span>
          </label>
          <input
            id="calc-banca"
            type="number"
            inputMode="decimal"
            className="input-field"
            placeholder="Ex: 1000 (deixe vazio se não quiser)"
            min="0"
            value={banca}
            onChange={(e) => setBanca(e.target.value)}
          />
        </div>

        {/* Results */}
        {valid ? (
          <div className="space-y-3 animate-float-in" aria-live="polite" aria-atomic="true">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="result-box">
                <p className="result-value">R${retorno.toFixed(2)}</p>
                <p className="result-label">Retorno total</p>
              </div>
              <div className="result-box">
                <p
                  className="result-value"
                  style={{ color: lucro >= 0 ? '#4ade80' : 'var(--red)' }}
                >
                  R${lucro.toFixed(2)}
                </p>
                <p className="result-label">Lucro líquido</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: '#818cf8' }}>
                  {roi.toFixed(1)}%
                </p>
                <p className="result-label">ROI</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: '#22d3ee' }}>
                  {probImpl.toFixed(1)}%
                </p>
                <p className="result-label">Prob. implícita</p>
              </div>
            </div>

            {/* Bankroll % bar */}
            {percBanca !== null && (
              <div
                className="rounded-xl px-4 py-3 flex items-center justify-between gap-4"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border)',
                }}
                role="meter"
                aria-valuenow={percBanca}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Percentual da banca apostada"
              >
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span style={{ color: 'var(--text-3)' }}>
                      % da banca apostada
                    </span>
                    <span
                      className="font-semibold"
                      style={{
                        color:
                          percBanca > 5
                            ? 'var(--red)'
                            : percBanca > 3
                            ? '#fbbf24'
                            : '#4ade80',
                      }}
                    >
                      {percBanca.toFixed(1)}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(percBanca, 100)}%`,
                        background:
                          percBanca > 5
                            ? 'var(--red)'
                            : percBanca > 3
                            ? '#fbbf24'
                            : '#4ade80',
                      }}
                    />
                  </div>
                </div>
                <span
                  className="text-xs font-medium flex-shrink-0"
                  style={{
                    color:
                      percBanca > 5
                        ? 'var(--red)'
                        : percBanca > 3
                        ? '#fbbf24'
                        : '#4ade80',
                  }}
                >
                  {percBanca > 5
                    ? 'Alto risco'
                    : percBanca > 3
                    ? 'Moderado'
                    : 'Conservador'}
                </span>
              </div>
            )}

            {/* Breakeven note */}
            <p
              className="text-xs text-center"
              style={{ color: 'var(--text-3)' }}
            >
              Ponto de equilíbrio: você precisa acertar pelo menos{' '}
              <strong style={{ color: 'var(--text-2)' }}>
                {breakeven.toFixed(1)}%
              </strong>{' '}
              das apostas nessa odd para não perder no longo prazo.
            </p>
          </div>
        ) : (
          <div
            className="rounded-xl flex flex-col items-center justify-center py-10 gap-2"
            style={{
              background: 'rgba(255,255,255,0.01)',
              border: '1px dashed var(--border)',
            }}
            aria-label="Aguardando dados para calcular"
          >
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>
              Preencha o stake e a odd para ver os resultados
            </p>
            <p
              className="text-xs"
              style={{ color: 'var(--text-3)', opacity: 0.6 }}
            >
              Os cálculos acontecem em tempo real
            </p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}

/* ── Long-form SEO content ────────────────────────────────── */

function ApostaSimplesExplanation() {
  return (
    <article
      className="space-y-10 text-sm leading-relaxed"
      style={{ color: 'var(--text-2)' }}
    >

      {/* ── 1. Introdução SEO ─────────────────────────────── */}
      <section className="space-y-4" aria-labelledby="intro-heading">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
          style={{
            background: 'rgba(34,211,238,0.07)',
            border: '1px solid rgba(34,211,238,0.15)',
            color: '#22d3ee',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#22d3ee' }}
          />
          Ferramenta gratuita · Sem cadastro · Tempo real
        </div>

        <h2
          id="intro-heading"
          className="text-xl font-bold"
          style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
        >
          O que é a Calculadora de Aposta Simples e para que serve
        </h2>

        <p>
          A <strong style={{ color: 'var(--text-1)' }}>Calculadora de Aposta Simples</strong> do CalculaBet é uma ferramenta gratuita que calcula, em tempo real, o retorno total, o lucro líquido, o ROI e a probabilidade implícita de qualquer aposta individual. Você informa o valor apostado (stake) e a odd decimal — e todos os números aparecem instantaneamente, sem precisar apertar um botão.
        </p>

        <p>
          Use esta calculadora <strong style={{ color: 'var(--text-1)' }}>antes de confirmar qualquer aposta</strong>: ela elimina o cálculo mental e garante que você saiba exatamente quanto pode ganhar ou perder em cada cenário. É especialmente útil para comparar apostas com odds diferentes, verificar se o percentual da banca está dentro da sua estratégia e entender o ponto de equilíbrio de cada odd.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              icon: '⚡',
              title: 'Instantâneo',
              desc: 'Resultados em tempo real conforme você digita, sem cliques extras.',
            },
            {
              icon: '📊',
              title: 'Completo',
              desc: 'Calcula retorno, lucro, ROI, prob. implícita e percentual de banca.',
            },
            {
              icon: '🎯',
              title: 'Para todos',
              desc: 'Funciona para qualquer esporte, mercado e casa de apostas regulamentada.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl p-4"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border)',
              }}
            >
              <p className="text-base mb-1.5">{item.icon}</p>
              <p
                className="text-xs font-semibold mb-1"
                style={{ color: 'var(--text-1)' }}
              >
                {item.title}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. Como usar ──────────────────────────────────── */}
      <section className="space-y-4" aria-labelledby="how-to-heading">
        <h2
          id="how-to-heading"
          className="text-xl font-bold"
          style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
        >
          Como usar a calculadora passo a passo
        </h2>

        <ol className="space-y-3 list-none">
          {[
            {
              step: '1',
              title: 'Informe o stake',
              desc: 'Digite o valor que pretende apostar em reais. Use os botões de atalho para selecionar valores comuns rapidamente.',
            },
            {
              step: '2',
              title: 'Informe a odd decimal',
              desc: 'Digite a odd decimal exatamente como aparece na casa de apostas. Use ponto como separador (ex: 2.50, não 2,50). Se a odd estiver em outro formato, use nosso conversor de odds antes.',
            },
            {
              step: '3',
              title: 'Opcionalmente, informe sua banca total',
              desc: 'Preencha a banca total para ver automaticamente o percentual que está arriscando e a classificação: conservador (até 3%), moderado (3–5%) ou alto risco (acima de 5%).',
            },
            {
              step: '4',
              title: 'Leia os resultados em tempo real',
              desc: 'Retorno total, lucro líquido, ROI e probabilidade implícita aparecem instantaneamente. Veja também o ponto de equilíbrio abaixo dos cards.',
            },
          ].map((item) => (
            <li key={item.step} className="flex gap-4">
              <span
                className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  background: 'rgba(34,211,238,0.1)',
                  border: '1px solid rgba(34,211,238,0.2)',
                  color: '#22d3ee',
                }}
              >
                {item.step}
              </span>
              <div className="pt-0.5">
                <p
                  className="text-xs font-semibold mb-0.5"
                  style={{ color: 'var(--text-1)' }}
                >
                  {item.title}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-2)' }}>
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <InfoBox variant="info" title="Dica de uso">
          Para comparar rapidamente o impacto de odds diferentes, mantenha o stake fixo e altere apenas a odd. Você verá em tempo real como cada ponto na odd afeta o lucro potencial e a probabilidade implícita.
        </InfoBox>
      </section>

      {/* ── 3. Fórmulas matemáticas ───────────────────────── */}
      <section className="space-y-4" aria-labelledby="formula-heading">
        <h2
          id="formula-heading"
          className="text-xl font-bold"
          style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
        >
          Fórmulas para calcular apostas simples
        </h2>

        <p>
          Todas as quatro métricas da calculadora são derivadas de fórmulas simples com odds decimais — o padrão utilizado no Brasil e na maioria das casas de apostas internacionais.
        </p>

        {/* Formula block */}
        <div
          className="rounded-xl px-5 py-4 space-y-2.5 font-mono text-xs"
          style={{
            background: 'rgba(34,211,238,0.04)',
            border: '1px solid rgba(34,211,238,0.12)',
          }}
        >
          {[
            {
              label: 'Retorno total',
              formula: 'Stake × Odd decimal',
              color: '#22d3ee',
            },
            {
              label: 'Lucro líquido',
              formula: 'Retorno total − Stake',
              color: '#4ade80',
            },
            {
              label: 'ROI',
              formula: '(Lucro ÷ Stake) × 100',
              color: '#818cf8',
            },
            {
              label: 'Probabilidade implícita',
              formula: '(1 ÷ Odd) × 100',
              color: '#fbbf24',
            },
          ].map((f) => (
            <div key={f.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span
                className="flex-shrink-0 text-xs"
                style={{ color: 'var(--text-3)', minWidth: '160px' }}
              >
                {f.label}
              </span>
              <span style={{ color: f.color }}>= {f.formula}</span>
            </div>
          ))}
        </div>

        {/* Variable explanation */}
        <div className="space-y-2">
          <p
            className="text-xs font-semibold"
            style={{ color: 'var(--text-1)' }}
          >
            Significado das variáveis:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              {
                var: 'Stake',
                def: 'Valor em R$ que você aposta no evento.',
              },
              {
                var: 'Odd decimal',
                def: 'Cotação decimal da casa de apostas (ex: 2.50).',
              },
              {
                var: 'Retorno total',
                def: 'Valor bruto que você recebe se ganhar, incluindo o stake.',
              },
              {
                var: 'Lucro líquido',
                def: 'Ganho real após deduzir o valor apostado.',
              },
              {
                var: 'ROI',
                def: 'Percentual de lucro sobre o valor apostado.',
              },
              {
                var: 'Prob. implícita',
                def: 'Probabilidade de vitória segundo a odd — base para análise de valor.',
              },
            ].map((item) => (
              <div
                key={item.var}
                className="flex gap-2 text-xs px-3 py-2 rounded-lg"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border)',
                }}
              >
                <span
                  className="font-mono font-semibold flex-shrink-0"
                  style={{ color: '#22d3ee' }}
                >
                  {item.var}:
                </span>
                <span style={{ color: 'var(--text-2)' }}>{item.def}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Exemplos práticos ──────────────────────────── */}
      <section className="space-y-4" aria-labelledby="examples-heading">
        <h2
          id="examples-heading"
          className="text-xl font-bold"
          style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
        >
          Exemplos práticos resolvidos
        </h2>

        <p>
          Veja como os cálculos funcionam em situações reais. Estes exemplos cobrem diferentes perfis de stake e odds comuns nos principais mercados esportivos.
        </p>

        <div className="overflow-x-auto -mx-1">
          <table
            className="w-full text-xs border-collapse"
            aria-label="Exemplos de apostas simples calculadas"
          >
            <thead>
              <tr>
                {['Stake', 'Odd', 'Retorno', 'Lucro', 'ROI', 'Prob. implícita'].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-3 py-2.5 font-semibold"
                      style={{
                        color: 'var(--text-3)',
                        borderBottom: '1px solid var(--border)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {[
                ['R$50',  '1.80', 'R$90,00',   'R$40,00',   '80,0%',  '55,6%'],
                ['R$100', '2.00', 'R$200,00',  'R$100,00',  '100,0%', '50,0%'],
                ['R$100', '2.50', 'R$250,00',  'R$150,00',  '150,0%', '40,0%'],
                ['R$200', '1.50', 'R$300,00',  'R$100,00',  '50,0%',  '66,7%'],
                ['R$150', '3.20', 'R$480,00',  'R$330,00',  '220,0%', '31,3%'],
                ['R$500', '1.30', 'R$650,00',  'R$150,00',  '30,0%',  '76,9%'],
              ].map((row, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                  }}
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="px-3 py-2.5"
                      style={{
                        color:
                          j === 3
                            ? '#4ade80'
                            : j === 4
                            ? '#818cf8'
                            : j === 5
                            ? '#fbbf24'
                            : 'var(--text-2)',
                        fontWeight: j === 0 || j === 1 ? 600 : 400,
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resolved example */}
        <div
          className="rounded-xl p-5 space-y-3"
          style={{
            background: 'rgba(129,140,248,0.04)',
            border: '1px solid rgba(129,140,248,0.12)',
          }}
        >
          <p
            className="text-xs font-semibold"
            style={{ color: '#818cf8' }}
          >
            Exemplo resolvido passo a passo
          </p>
          <p className="text-xs" style={{ color: 'var(--text-2)' }}>
            <strong style={{ color: 'var(--text-1)' }}>Situação:</strong> Você quer apostar R$100 em um jogo de futebol, mercado "Resultado final — Mandante ganha", odd 2.50.
          </p>
          <ol className="space-y-1.5 text-xs" style={{ color: 'var(--text-2)' }}>
            <li>
              <strong style={{ color: 'var(--text-1)' }}>Retorno total</strong> = R$100 × 2.50 ={' '}
              <span style={{ color: '#22d3ee' }}>R$250,00</span>
            </li>
            <li>
              <strong style={{ color: 'var(--text-1)' }}>Lucro líquido</strong> = R$250 − R$100 ={' '}
              <span style={{ color: '#4ade80' }}>R$150,00</span>
            </li>
            <li>
              <strong style={{ color: 'var(--text-1)' }}>ROI</strong> = (R$150 ÷ R$100) × 100 ={' '}
              <span style={{ color: '#818cf8' }}>150%</span>
            </li>
            <li>
              <strong style={{ color: 'var(--text-1)' }}>Prob. implícita</strong> = (1 ÷ 2.50) × 100 ={' '}
              <span style={{ color: '#fbbf24' }}>40%</span> — você precisa acertar mais de 40% das apostas nessa odd para lucrar.
            </li>
          </ol>
        </div>
      </section>

      {/* ── 5. Stake: o que é e como definir ─────────────── */}
      <section className="space-y-4" aria-labelledby="stake-heading">
        <h2
          id="stake-heading"
          className="text-xl font-bold"
          style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
        >
          Stake: o que é e como definir o valor correto para apostar
        </h2>

        <p>
          O <strong style={{ color: 'var(--text-1)' }}>stake</strong> é o valor em dinheiro que você coloca em risco em uma aposta. Definir o stake correto é tão importante quanto escolher a odd certa: apostar demais em um único evento pode destruir a banca rapidamente; apostar de menos limita o crescimento mesmo quando a estratégia está funcionando.
        </p>

        <p>Existem três abordagens principais para definir o stake:</p>

        <ul className="space-y-3 list-none">
          {[
            {
              title: 'Flat betting (percentual fixo)',
              desc: 'Apostar sempre o mesmo percentual da banca por evento, independentemente da odd ou da confiança. Ex: sempre 2% da banca. É a estratégia mais simples, mais fácil de controlar e a mais recomendada para iniciantes.',
              color: '#22d3ee',
            },
            {
              title: 'Critério de Kelly',
              desc: 'Fórmula matemática que calcula o percentual ideal da banca com base na sua estimativa de probabilidade e na odd oferecida. Maximiza o crescimento no longo prazo, mas exige estimativas precisas. Use nossa calculadora de gestão de banca para calcular.',
              color: '#818cf8',
            },
            {
              title: 'Stake variável por confiança',
              desc: 'Variar o stake de acordo com o nível de confiança em cada aposta. Apostas de alta confiança recebem stakes maiores. Exige experiência e disciplina — sem registro rigoroso, é difícil avaliar se a variação está funcionando.',
              color: '#4ade80',
            },
          ].map((item) => (
            <li key={item.title} className="flex gap-3">
              <span
                className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold"
                style={{
                  background: `${item.color}18`,
                  border: `1px solid ${item.color}30`,
                  color: item.color,
                }}
              >
                →
              </span>
              <span>
                <strong style={{ color: 'var(--text-1)' }}>{item.title}:</strong>{' '}
                {item.desc}
              </span>
            </li>
          ))}
        </ul>

        <p>
          Nossa calculadora inclui um campo opcional de banca total que mostra automaticamente o percentual em risco e classifica como conservador (até 3%), moderado (3–5%) ou alto risco (acima de 5%). Para cálculos mais avançados com Kelly Criterion, use a{' '}
          <InternalLink to="/calculadoras/gestao-banca">
            calculadora de gestão de banca
          </InternalLink>
          .
        </p>

        <InfoBox variant="warning" title="Regra de ouro da gestão de banca">
          Nunca aposte mais do que pode perder sem impacto na sua vida financeira. Defina antes da primeira aposta qual é o valor máximo que você está disposto a perder — e respeite esse limite. Apostas esportivas devem ser tratadas como entretenimento, não como fonte de renda garantida.
        </InfoBox>
      </section>

      {/* ── 6. ROI e desempenho ───────────────────────────── */}
      <section className="space-y-4" aria-labelledby="roi-heading">
        <h2
          id="roi-heading"
          className="text-xl font-bold"
          style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
        >
          ROI em apostas: como medir e interpretar seu desempenho
        </h2>

        <p>
          O <strong style={{ color: 'var(--text-1)' }}>ROI (Return on Investment)</strong> é a métrica mais importante para avaliar a performance de um apostador no longo prazo. Diferentemente do lucro absoluto, o ROI permite comparar resultados independentemente do volume apostado.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { range: 'Negativo',  label: 'Prejuízo',     color: '#f87171', bg: 'rgba(248,113,113,0.06)' },
            { range: '0% – 5%',   label: 'Iniciante',    color: '#fbbf24', bg: 'rgba(251,191,36,0.06)'  },
            { range: '5% – 10%',  label: 'Avançado',     color: '#4ade80', bg: 'rgba(74,222,128,0.06)'  },
            { range: '10%+',      label: 'Profissional', color: '#22d3ee', bg: 'rgba(34,211,238,0.06)'  },
          ].map((item) => (
            <div
              key={item.range}
              className="rounded-xl p-3 text-center"
              style={{ background: item.bg, border: `1px solid ${item.color}20` }}
            >
              <p
                className="text-sm font-bold mb-0.5"
                style={{ color: item.color }}
              >
                {item.range}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <p>
          A maioria dos apostadores amadores tem ROI negativo no longo prazo — a margem das casas de apostas (overround) já garante que isso aconteça sem análise criteriosa. Para acompanhar o ROI acumulado de todas as suas apostas, use a{' '}
          <InternalLink to="/calculadoras/roi">
            calculadora de ROI em apostas
          </InternalLink>
          . Para projetar como sua banca pode evoluir com determinado ROI e frequência de apostas, use o{' '}
          <InternalLink to="/calculadoras/simulador-lucro">
            simulador de lucro
          </InternalLink>
          .
        </p>
      </section>

      {/* ── 7. Probabilidade implícita e value betting ────── */}
      <section className="space-y-4" aria-labelledby="prob-heading">
        <h2
          id="prob-heading"
          className="text-xl font-bold"
          style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
        >
          Probabilidade implícita, breakeven e value betting
        </h2>

        <p>
          A <strong style={{ color: 'var(--text-1)' }}>probabilidade implícita</strong> é a chance de vitória que a odd representa matematicamente. A fórmula é simples: divide-se 1 pela odd e multiplica-se por 100. Odd 2.00 implica 50% de chance; odd 1.50 implica 66,7%.
        </p>

        <p>
          O <strong style={{ color: 'var(--text-1)' }}>breakeven (ponto de equilíbrio)</strong> é o percentual mínimo de acertos que você precisa ter com uma determinada odd para não perder dinheiro no longo prazo. É numericamente igual à probabilidade implícita: para odd 2.00, você precisa acertar mais de 50% das apostas.
        </p>

        <p>
          O conceito de <strong style={{ color: 'var(--text-1)' }}>value bet</strong> vai além: uma aposta tem valor quando sua estimativa de probabilidade real é maior do que a probabilidade implícita da odd. Se você acredita que um time tem 60% de chance de vencer, mas a odd 1.80 implica apenas 55,6%, há valor positivo na aposta.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { odd: '1.50', impl: '66,7%', note: 'Precisa acertar >2 em 3' },
            { odd: '2.00', impl: '50,0%', note: 'Precisa acertar >1 em 2' },
            { odd: '3.00', impl: '33,3%', note: 'Precisa acertar >1 em 3' },
          ].map((item) => (
            <div
              key={item.odd}
              className="rounded-xl p-3 text-center"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border)',
              }}
            >
              <p
                className="text-lg font-bold"
                style={{ color: '#22d3ee' }}
              >
                {item.odd}
              </p>
              <p
                className="text-xs font-semibold mt-0.5"
                style={{ color: 'var(--text-1)' }}
              >
                Breakeven: {item.impl}
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>
                {item.note}
              </p>
            </div>
          ))}
        </div>

        <p>
          Para analisar se uma odd específica tem valor em relação à sua estimativa de probabilidade, use a{' '}
          <InternalLink to="/calculadoras/odds">calculadora de odds</InternalLink>{' '}
          com detecção automática de value bets.
        </p>
      </section>

      {/* ── 8. Erros comuns ───────────────────────────────── */}
      <section className="space-y-4" aria-labelledby="mistakes-heading">
        <h2
          id="mistakes-heading"
          className="text-xl font-bold"
          style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
        >
          Erros comuns em apostas simples que você deve evitar
        </h2>

        <p>
          Conhecer os erros mais frequentes é tão importante quanto dominar os cálculos. Veja os que mais impactam os resultados de apostadores iniciantes e intermediários:
        </p>

        <ul className="space-y-3 list-none">
          {[
            {
              err: 'Apostar sem calcular o retorno antes',
              fix: 'Sempre use esta calculadora antes de confirmar uma aposta. Saber exatamente quanto você pode ganhar ou perder é o primeiro passo para decisões racionais.',
            },
            {
              err: 'Ignorar a probabilidade implícita',
              fix: 'Odds altas não significam necessariamente bons negócios. Verifique sempre se a probabilidade implícita é coerente com sua análise do evento.',
            },
            {
              err: 'Apostar percentuais altos da banca em um único evento',
              fix: 'Mesmo apostas com alta confiança podem perder. Limitar cada aposta a no máximo 3–5% da banca protege você de sequências de derrotas.',
            },
            {
              err: 'Não registrar apostas e não calcular o ROI acumulado',
              fix: 'Sem registro sistemático, é impossível saber se você está realmente lucrando. Anote stake, odd e resultado de cada aposta para calcular o ROI real.',
            },
            {
              err: 'Apostar por emoção ou para recuperar perdas (tilt)',
              fix: 'Decidir por impulso após uma derrota é um dos comportamentos mais prejudiciais. Estabeleça regras claras de quando e quanto apostar — e siga-as independentemente de resultados recentes.',
            },
            {
              err: 'Usar apenas uma casa de apostas',
              fix: 'As odds variam entre casas de apostas. Cadastrar-se em múltiplas plataformas regulamentadas e comparar antes de apostar pode aumentar seu retorno significativamente no longo prazo.',
            },
          ].map((item) => (
            <li
              key={item.err}
              className="rounded-xl p-4"
              style={{
                background: 'rgba(248,113,113,0.03)',
                border: '1px solid rgba(248,113,113,0.08)',
              }}
            >
              <div className="flex gap-2.5 mb-1.5">
                <span className="text-xs flex-shrink-0" style={{ color: '#f87171' }}>
                  ✕
                </span>
                <p
                  className="text-xs font-semibold"
                  style={{ color: '#f87171' }}
                >
                  {item.err}
                </p>
              </div>
              <div className="flex gap-2.5">
                <span className="text-xs flex-shrink-0" style={{ color: '#4ade80' }}>
                  ✓
                </span>
                <p className="text-xs" style={{ color: 'var(--text-2)' }}>
                  {item.fix}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 9. Simples vs. Múltipla ───────────────────────── */}
      <section className="space-y-4" aria-labelledby="comparison-heading">
        <h2
          id="comparison-heading"
          className="text-xl font-bold"
          style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
        >
          Aposta simples vs. aposta múltipla: qual escolher?
        </h2>

        <p>
          A diferença entre apostas simples e múltiplas está no risco, no retorno e na consistência de longo prazo. Entender essa diferença é fundamental para definir a estratégia correta para o seu perfil.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              title: 'Aposta Simples',
              color: '#22d3ee',
              pontos: [
                'Uma única seleção — mais fácil de acertar',
                'Risco previsível e controlável',
                'ROI mais consistente no longo prazo',
                'Ideal para qualquer nível de experiência',
                'Mais simples de analisar e registrar',
                'Favorita entre apostadores profissionais',
              ],
            },
            {
              title: 'Aposta Múltipla (Parlay)',
              color: '#818cf8',
              pontos: [
                'Todas as seleções precisam ganhar',
                'Odds multiplicadas — retorno muito maior',
                'Risco cresce exponencialmente',
                'Variância altíssima — resultados imprevisíveis',
                'A margem da casa incide em cada seleção',
                'Difícil de manter ROI positivo no longo prazo',
              ],
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl p-4"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${card.color}22`,
              }}
            >
              <p
                className="text-sm font-semibold mb-3"
                style={{ color: card.color }}
              >
                {card.title}
              </p>
              <ul className="space-y-2">
                {card.pontos.map((p) => (
                  <li
                    key={p}
                    className="flex gap-2 text-xs"
                    style={{ color: 'var(--text-2)' }}
                  >
                    <span style={{ color: card.color, flexShrink: 0 }}>→</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p>
          Para calcular apostas múltiplas com 2 ou mais seleções, use a{' '}
          <InternalLink to="/calculadoras/multipla-parlay">
            calculadora de múltipla e parlay
          </InternalLink>
          . Para calcular apostas simultâneas com lucro garantido independentemente do resultado, veja a{' '}
          <InternalLink to="/calculadoras/arbitragem">
            calculadora de arbitragem
          </InternalLink>
          .
        </p>
      </section>

      {/* ── 10. Mercados populares ────────────────────────── */}
      <section className="space-y-4" aria-labelledby="markets-heading">
        <h2
          id="markets-heading"
          className="text-xl font-bold"
          style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
        >
          Mercados mais comuns para apostas simples no Brasil
        </h2>

        <p>
          Esta calculadora funciona para qualquer mercado — basta informar a odd decimal correta. Os mercados mais populares entre apostadores brasileiros são:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            {
              t: 'Resultado final (1X2)',
              d: 'Vitória do mandante (1), empate (X) ou vitória do visitante (2). O mercado mais líquido do futebol.',
            },
            {
              t: 'Dupla chance',
              d: 'Cobre 2 dos 3 resultados possíveis com odds menores — útil em jogos equilibrados.',
            },
            {
              t: 'Over/Under gols',
              d: 'Aposta no total de gols: acima (over) ou abaixo (under) de um número pré-definido.',
            },
            {
              t: 'Ambas marcam (BTTS)',
              d: 'Se ambos os times vão marcar pelo menos 1 gol — independentemente do resultado.',
            },
            {
              t: 'Handicap asiático',
              d: 'Equaliza as forças com vantagens/desvantagens de gols, eliminando o resultado de empate em muitos casos.',
            },
            {
              t: 'Vencedor do torneio',
              d: 'Aposta em quem vai ganhar a competição — odds maiores, resultado a longo prazo.',
            },
          ].map((item) => (
            <div
              key={item.t}
              className="p-3 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border)',
              }}
            >
              <p
                className="text-xs font-semibold mb-1"
                style={{ color: 'var(--text-1)' }}
              >
                {item.t}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                {item.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 11. Boas práticas ─────────────────────────────── */}
      <section className="space-y-4" aria-labelledby="tips-heading">
        <h2
          id="tips-heading"
          className="text-xl font-bold"
          style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
        >
          Boas práticas para apostadores: dicas para começar com o pé direito
        </h2>

        <ul className="space-y-3 list-none">
          {[
            {
              t: 'Calcule sempre antes de apostar',
              d: 'Use esta calculadora para saber exatamente o retorno, lucro e ROI antes de confirmar. Nunca aposte no impulso.',
            },
            {
              t: 'Compare odds entre múltiplas casas',
              d: 'A mesma seleção pode ter odds diferentes entre plataformas. Pequenas diferenças acumulam grande impacto no longo prazo. Use casas regulamentadas pelo Governo Federal.',
            },
            {
              t: 'Registre todas as apostas',
              d: 'Anote stake, odd, mercado e resultado de cada aposta. Sem histórico, é impossível calcular o ROI real e identificar onde melhorar.',
            },
            {
              t: 'Defina limites de banca previamente',
              d: 'Estabeleça antes quanto está disposto a perder por dia, semana e mês. Respeite esses limites mesmo em sequências positivas.',
            },
            {
              t: 'Concentre-se em mercados que você conhece',
              d: 'Apostar em ligas ou esportes que você acompanha de perto aumenta a qualidade das suas estimativas de probabilidade.',
            },
            {
              t: 'Use formatos decimais para precisão',
              d: 'Odds decimais são mais fáceis de calcular e comparar do que formatos fracionários ou americanos. Se precisar converter, use nosso conversor de odds.',
            },
          ].map((item) => (
            <li key={item.t} className="flex gap-3">
              <span
                className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold"
                style={{
                  background: 'rgba(74,222,128,0.1)',
                  border: '1px solid rgba(74,222,128,0.2)',
                  color: '#4ade80',
                }}
              >
                ✓
              </span>
              <span>
                <strong style={{ color: 'var(--text-1)' }}>{item.t}:</strong>{' '}
                {item.d}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 12. Jogo responsável ──────────────────────────── */}
      <section aria-labelledby="responsible-heading">
        <div
          className="rounded-xl p-5 space-y-3"
          style={{
            background: 'rgba(251,191,36,0.04)',
            border: '1px solid rgba(251,191,36,0.12)',
          }}
        >
          <div className="flex items-start gap-3">
            <span className="text-lg flex-shrink-0" aria-hidden="true">
              ⚠️
            </span>
            <div className="space-y-2">
              <h2
                id="responsible-heading"
                className="text-sm font-semibold"
                style={{ color: '#fbbf24' }}
              >
                Aposte com responsabilidade — Aviso importante
              </h2>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
                Apostas esportivas envolvem risco real de perda financeira. Esta ferramenta tem fins educativos e informativos — não constitui aconselhamento financeiro, nem incentiva apostas. O jogo pode causar dependência. Se você sentir que está perdendo o controle, procure ajuda:{' '}
                <a
                  href="https://www.jogadores-anonimos.org.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#fbbf24', textDecoration: 'underline' }}
                >
                  Jogadores Anônimos Brasil
                </a>
                .
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-semibold"
                  style={{
                    background: 'rgba(251,191,36,0.1)',
                    border: '1px solid rgba(251,191,36,0.2)',
                    color: '#fbbf24',
                  }}
                >
                  +18 anos
                </span>
                <Link
                  to="/jogo-responsavel"
                  className="text-xs transition-colors"
                  style={{ color: 'var(--text-3)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fbbf24')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
                >
                  Central de Jogo Responsável →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 13. Outras calculadoras ───────────────────────── */}
      <section className="space-y-4" aria-labelledby="tools-heading">
        <h2
          id="tools-heading"
          className="text-xl font-bold"
          style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
        >
          Outras calculadoras gratuitas para apostadores
        </h2>

        <p>
          O CalculaBet oferece ferramentas para cada etapa da sua jornada como apostador — do cálculo básico à análise avançada de valor e gestão de banca.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            {
              to: '/calculadoras/odds',
              label: 'Calculadora de Odds',
              desc: 'Retorno, lucro, ROI e detecção automática de value bets',
              tag: 'Popular',
            },
            {
              to: '/calculadoras/multipla-parlay',
              label: 'Calculadora de Múltipla/Parlay',
              desc: 'Odd combinada, retorno e risco de apostas múltiplas',
              tag: null,
            },
            {
              to: '/calculadoras/arbitragem',
              label: 'Calculadora de Arbitragem',
              desc: 'Calcule stakes para lucro garantido com sure bets',
              tag: null,
            },
            {
              to: '/calculadoras/cashout',
              label: 'Calculadora de Cashout',
              desc: 'Valor justo do cashout e comparação com manter a aposta',
              tag: null,
            },
            {
              to: '/calculadoras/gestao-banca',
              label: 'Gestão de Banca (Kelly)',
              desc: 'Stake ideal por aposta usando o Critério de Kelly',
              tag: 'Recomendado',
            },
            {
              to: '/calculadoras/roi',
              label: 'Calculadora de ROI',
              desc: 'Acompanhe sua performance e lucratividade acumulada',
              tag: null,
            },
            {
              to: '/calculadoras/simulador-lucro',
              label: 'Simulador de Lucro',
              desc: 'Projeção de banca com simulação de Monte Carlo',
              tag: null,
            },
            {
              to: '/calculadoras/conversor-odds',
              label: 'Conversor de Odds',
              desc: 'Converta entre decimal, americana, fracionária e probabilidade',
              tag: null,
            },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-start gap-2.5 p-3 rounded-xl transition-all duration-150"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(34,211,238,0.2)';
                e.currentTarget.style.background = 'rgba(34,211,238,0.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
              }}
            >
              <span
                style={{ color: '#22d3ee', flexShrink: 0, marginTop: '1px' }}
              >
                →
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p
                    className="text-xs font-semibold"
                    style={{ color: 'var(--text-1)' }}
                  >
                    {item.label}
                  </p>
                  {item.tag && (
                    <span
                      className="text-xs px-1.5 py-0.5 rounded font-medium"
                      style={{
                        background: 'rgba(34,211,238,0.08)',
                        border: '1px solid rgba(34,211,238,0.15)',
                        color: '#22d3ee',
                        fontSize: '0.6rem',
                      }}
                    >
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </article>
  );
}
