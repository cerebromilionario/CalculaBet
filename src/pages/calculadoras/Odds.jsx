import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';
import { getSeoFaqsForPage, toLegacyFaq } from '../../data/seoFaqs.jsx';

function americanaToDecimal(a) {
  const v = parseFloat(a);
  if (v > 0) return 1 + v / 100;
  if (v < 0) return 1 - 100 / v;
  return null;
}

function decimalToAmericana(d) {
  if (d >= 2) return `+${Math.round((d - 1) * 100)}`;
  return `${Math.round(-100 / (d - 1))}`;
}

const faqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.answerText || f.a },
  })),
});

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Calculadora de Odds — CalculaBet',
  description: 'Calculadora gratuita de odds para apostas esportivas. Calcule retorno, lucro e probabilidade implícita em formato decimal, americana e fracionária.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
};

const InternalLink = ({ to, children }) => (
  <Link
    to={to}
    style={{ color: '#22d3ee' }}
    className="underline underline-offset-2 hover:opacity-80 transition-opacity"
  >
    {children}
  </Link>
);

export default function CalculadoraOdds() {
  const [stake, setStake] = useState('');
  const [odd, setOdd] = useState('');
  const [formato, setFormato] = useState('decimal');
  const [probEstimada, setProbEstimada] = useState('');

  /* ── Parsing ── */
  let oddDecimal = null;
  try {
    if (formato === 'decimal') {
      const v = parseFloat(odd);
      if (v > 1) oddDecimal = v;
    } else if (formato === 'americana' && odd !== '') {
      oddDecimal = americanaToDecimal(odd);
    } else if (formato === 'fraccionaria') {
      const parts = odd.split('/');
      if (parts.length === 2) {
        const n = parseFloat(parts[0]), d = parseFloat(parts[1]);
        if (d > 0 && n >= 0) oddDecimal = 1 + n / d;
      }
    }
  } catch {
        // Ignore invalid ad/odds runtime values and keep the UI responsive.
      }

  const s = parseFloat(stake);
  const pe = parseFloat(probEstimada);
  const valid = s > 0 && oddDecimal && oddDecimal > 1;
  const retorno = valid ? s * oddDecimal : 0;
  const lucro = valid ? retorno - s : 0;
  const probImplicita = valid ? (1 / oddDecimal) * 100 : 0;
  const roi = valid ? (lucro / s) * 100 : 0;
  const temProbEstimada = pe > 0 && pe < 100;
  const ev = valid && temProbEstimada ? (pe / 100) * (oddDecimal - 1) - (1 - pe / 100) : null;
  const isValue = ev !== null && ev > 0;

  /* ── FAQs ── */
  const faqs = [
    {
      q: 'O que é uma odd em apostas esportivas?',
      a: 'Odd (ou cotação) é o número que representa o retorno potencial de uma aposta. Uma odd de 2.00 significa que você recebe R$2 para cada R$1 apostado. Quanto maior a odd, maior o retorno potencial — mas também menor a probabilidade de ocorrência segundo a casa de apostas.',
    },
    {
      q: 'Como calcular o retorno de uma aposta com odds?',
      a: 'Multiplique o valor apostado (stake) pela odd decimal. Retorno = Stake × Odd. O lucro é o retorno menos o stake. Exemplo: R$100 × odd 2.50 = R$250 de retorno e R$150 de lucro.',
    },
    {
      q: 'Qual a diferença entre odds decimal, americana e fracionária?',
      a: 'Decimal (padrão no Brasil e Europa): retorno total por unidade. Americana: positiva mostra lucro por R$100 apostados, negativa mostra quanto apostar para lucrar R$100. Fracionária (padrão no Reino Unido): numerador/denominador representa lucro/stake.',
    },
    {
      q: 'O que é probabilidade implícita nas odds?',
      a: 'É a probabilidade de vitória que a odd representa: Prob = 1/Odd × 100. Uma odd de 2.00 implica 50% de chance. A soma das probabilidades implícitas de todos os resultados é sempre acima de 100%, o que forma a margem da casa.',
    },
    {
      q: 'O que é value bet (aposta de valor)?',
      a: 'Uma aposta tem "value" quando você acredita que a probabilidade real de um resultado é maior do que a probabilidade implícita da odd. Se a odd implica 40% de chance e você estima 55%, essa aposta tem expected value (EV) positivo.',
    },
    {
      q: 'Como saber se uma odd está boa?',
      a: 'Compare a probabilidade implícita da odd com sua estimativa da probabilidade real. Se sua estimativa for maior, a odd oferece valor. Ferramentas como a nossa calculadora de value bet (campo "Probabilidade estimada") ajudam nessa análise.',
    },
    {
      q: 'Posso usar a calculadora sem me cadastrar?',
      a: 'Sim. Todas as calculadoras do CalculaBet são 100% gratuitas e não exigem cadastro, login ou qualquer dado pessoal.',
    },
    {
      q: 'A calculadora funciona para futebol, tênis e outros esportes?',
      a: 'Sim. A calculadora de odds funciona para qualquer esporte ou mercado — futebol, tênis, basquete, e-sports, corridas de cavalos — desde que você informe a odd corretamente.',
    },
    ...getSeoFaqsForPage('odds').map(toLegacyFaq),
  ];

  return (
    <CalcLayout
      title="Calculadora de Odds"
      description="Calcule retorno, lucro, ROI e probabilidade implícita de qualquer aposta. Suporte a odds decimal, americana e fracionária. Detecta value bets."
      slug="odds"
      faqs={faqs}
      schema={[pageSchema, faqSchema(faqs)]}
      explanation={<OddsExplanation />}
    >
      <div className="space-y-6">

        {/* Format tabs */}
        <div>
          <p className="label">Formato da odd</p>
          <div
            className="inline-flex rounded-xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: '3px' }}
          >
            {[
              { id: 'decimal', label: 'Decimal' },
              { id: 'americana', label: 'Americana' },
              { id: 'fraccionaria', label: 'Fracionária' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => { setFormato(f.id); setOdd(''); }}
                className="px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                style={{
                  background: formato === f.id ? 'rgba(34,211,238,0.12)' : 'transparent',
                  color: formato === f.id ? '#22d3ee' : 'var(--text-2)',
                  border: formato === f.id ? '1px solid rgba(34,211,238,0.2)' : '1px solid transparent',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Stake — valor apostado (R$)</label>
            <input
              type="number"
              inputMode="decimal"
              className="input-field"
              placeholder="100"
              min="0"
              step="any"
              value={stake}
              onChange={e => setStake(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              Odd{' '}
              {formato === 'decimal' && '— ex: 2.50'}
              {formato === 'americana' && '— ex: +150 ou -120'}
              {formato === 'fraccionaria' && '— ex: 3/2'}
            </label>
            <input
              type={formato === 'fraccionaria' ? 'text' : 'text'}
              inputMode={formato === 'fraccionaria' ? 'text' : 'decimal'}
              className="input-field"
              placeholder={formato === 'decimal' ? '2.50' : formato === 'americana' ? '+150' : '3/2'}
              value={odd}
              onChange={e => setOdd(e.target.value)}
            />
          </div>
        </div>

        {/* Optional value bet field */}
        <div>
          <label className="label">
            Sua probabilidade estimada (%) —{' '}
            <span style={{ color: 'var(--text-3)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
              opcional · detecta value bet
            </span>
          </label>
          <input
            type="number"
            inputMode="decimal"
            className="input-field"
            placeholder="Ex: 55 (deixe vazio se não souber)"
            min="1"
            max="99"
            value={probEstimada}
            onChange={e => setProbEstimada(e.target.value)}
          />
        </div>

        {/* Results */}
        {valid ? (
          <div className="space-y-3 animate-float-in">
            {/* Main results */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="result-box">
                <p className="result-value">R${retorno.toFixed(2)}</p>
                <p className="result-label">Retorno total</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: lucro >= 0 ? '#4ade80' : 'var(--red)' }}>
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
                  {probImplicita.toFixed(1)}%
                </p>
                <p className="result-label">Prob. implícita</p>
              </div>
            </div>

            {/* Conversions */}
            {oddDecimal && (
              <div
                className="grid grid-cols-3 gap-2 rounded-xl px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
              >
                <div className="text-center">
                  <p className="text-xs font-semibold tabular-nums" style={{ color: 'var(--text-1)' }}>{oddDecimal.toFixed(3)}</p>
                  <p style={{ fontSize: '0.625rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Decimal</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-1)' }}>{decimalToAmericana(oddDecimal)}</p>
                  <p style={{ fontSize: '0.625rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Americana</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-1)' }}>{(1 / oddDecimal * 100).toFixed(2)}%</p>
                  <p style={{ fontSize: '0.625rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Prob. implícita</p>
                </div>
              </div>
            )}

            {/* Value bet indicator */}
            {ev !== null && (
              <div
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
                style={{
                  background: isValue ? 'rgba(34,197,94,0.06)' : 'rgba(248,113,113,0.06)',
                  border: `1px solid ${isValue ? 'rgba(34,197,94,0.2)' : 'rgba(248,113,113,0.18)'}`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
                  style={{ background: isValue ? 'rgba(34,197,94,0.15)' : 'rgba(248,113,113,0.12)' }}
                >
                  {isValue ? '✓' : '✗'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: isValue ? '#4ade80' : 'var(--red)' }}>
                    {isValue ? 'Aposta com value!' : 'Sem value aparente'}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>
                    EV: {ev > 0 ? '+' : ''}{(ev * 100).toFixed(2)}% · Prob. estimada {pe}% vs implícita {probImplicita.toFixed(1)}%
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className="rounded-xl flex flex-col items-center justify-center py-10 gap-2"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Preencha o stake e a odd para ver os resultados</p>
            <p className="text-xs" style={{ color: 'var(--text-3)', opacity: 0.6 }}>Os cálculos acontecem em tempo real</p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}

/* ── Long-form SEO explanation ─────────────────────────── */
function OddsExplanation() {
  return (
    <article className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>

      <section className="space-y-3">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          O que é uma calculadora de odds e por que usá-la?
        </h2>
        <p>
          A <strong style={{ color: 'var(--text-1)' }}>calculadora de odds</strong> é a ferramenta mais básica e essencial para qualquer apostador esportivo. Ela permite calcular, em segundos, o retorno total de uma aposta, o lucro líquido esperado, o ROI (retorno sobre investimento) e a probabilidade implícita que a odd representa.
        </p>
        <p>
          Antes de fazer qualquer aposta — seja em futebol, tênis, basquete, e-sports ou qualquer outro esporte — é fundamental entender exatamente quanto você pode ganhar e qual a probabilidade de vitória que a casa de apostas está precificando. Com essa informação em mãos, você pode tomar decisões muito mais inteligentes e evitar apostas com valor negativo.
        </p>
        <p>
          No <strong style={{ color: 'var(--text-1)' }}>CalculaBet</strong>, a calculadora de odds é gratuita, sem cadastro e funciona com os três principais formatos de odds usados no mundo: <strong style={{ color: 'var(--text-1)' }}>decimal</strong> (padrão no Brasil e Europa), <strong style={{ color: 'var(--text-1)' }}>americana ou moneyline</strong> (usada nos EUA) e <strong style={{ color: 'var(--text-1)' }}>fracionária</strong> (padrão no Reino Unido). Se precisar converter entre eles, use também nosso{' '}
          <InternalLink to="/calculadoras/conversor-odds">conversor de odds</InternalLink>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          Como calcular o retorno de uma aposta: a fórmula completa
        </h2>
        <p>
          O cálculo de uma aposta simples com odds decimais é direto:
        </p>
        <div
          className="rounded-xl px-5 py-4 space-y-2 font-mono text-xs"
          style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)', color: '#22d3ee' }}
        >
          <p>Retorno total = Stake × Odd decimal</p>
          <p>Lucro líquido = Retorno total − Stake</p>
          <p>ROI = (Lucro ÷ Stake) × 100</p>
          <p>Probabilidade implícita = (1 ÷ Odd) × 100</p>
        </div>
        <p>
          <strong style={{ color: 'var(--text-1)' }}>Exemplo prático:</strong> você aposta R$150 em uma vitória com odd 2.80. O retorno total é R$150 × 2.80 = R$420. O lucro líquido é R$420 − R$150 = R$270. O ROI é 180%. A probabilidade implícita é 1/2.80 × 100 = 35,7%.
        </p>
        <p>
          Isso significa que a casa de apostas avalia que esse resultado tem 35,7% de chance de ocorrer. Se você acredita que a chance real é maior — digamos, 45% — essa aposta tem <em>value</em> (valor esperado positivo). Nosso campo "Probabilidade estimada" na ferramenta acima detecta isso automaticamente.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          Formatos de odds: decimal, americana e fracionária
        </h2>
        <p>
          Entender os diferentes formatos de odds é essencial para comparar mercados de diferentes casas de apostas ao redor do mundo.
        </p>

        <h3 className="text-base font-semibold mt-4" style={{ color: 'var(--text-1)' }}>Odds Decimal (Europa e Brasil)</h3>
        <p>
          O formato mais intuitivo e amplamente usado no Brasil. A odd representa o <strong style={{ color: 'var(--text-1)' }}>retorno total por unidade apostada</strong>, incluindo o stake. Odd 3.00 significa que você triplica o valor apostado: aposta R$100, recebe R$300 (lucro de R$200).
        </p>
        <p>
          Este é o formato padrão em todas as principais casas de apostas brasileiras e europeias. Odds decimais abaixo de 2.00 são consideradas "favoritas" (probabilidade acima de 50%). Odds acima de 2.00 são consideradas "zebras".
        </p>

        <h3 className="text-base font-semibold mt-4" style={{ color: 'var(--text-1)' }}>Odds Americana (Moneyline)</h3>
        <p>
          Comum nos mercados americanos e em algumas casas internacionais. Funciona de dois modos: <strong style={{ color: 'var(--text-1)' }}>positivo (+150)</strong> indica o lucro em uma aposta de R$100; <strong style={{ color: 'var(--text-1)' }}>negativo (-120)</strong> indica quanto você precisa apostar para lucrar R$100.
        </p>
        <p>
          Conversão para decimal: <em>odds positivas:</em> (valor/100) + 1. Exemplo: +200 → 3.00. <em>Odds negativas:</em> (100/|valor|) + 1. Exemplo: -150 → 1.667. Prefere calcular automaticamente? Use o{' '}
          <InternalLink to="/calculadoras/conversor-odds">conversor de odds</InternalLink>.
        </p>

        <h3 className="text-base font-semibold mt-4" style={{ color: 'var(--text-1)' }}>Odds Fracionária (Reino Unido)</h3>
        <p>
          O formato tradicional britânico, expresso como "lucro/stake". A odd 5/2 significa que para cada R$2 apostados, você ganha R$5 de lucro (total de R$7). Para converter: odd decimal = (numerador/denominador) + 1. Exemplo: 5/2 → 2.5 + 1 = 3.50.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          Probabilidade implícita e a margem da casa
        </h2>
        <p>
          Todo apostador inteligente precisa entender o conceito de <strong style={{ color: 'var(--text-1)' }}>probabilidade implícita</strong>. A fórmula é simples: divida 100 pela odd decimal. Odd 1.50 → probabilidade implícita de 66,7%. Odd 4.00 → 25%.
        </p>
        <p>
          A <strong style={{ color: 'var(--text-1)' }}>margem da casa</strong> (também chamada de "overround" ou "vigorish") é a razão pela qual as casas de apostas lucram no longo prazo. Se você somar as probabilidades implícitas de todos os resultados de uma partida, o total sempre será <em>maior que 100%</em>. Essa diferença é a margem. Casas com margens menores oferecem odds mais competitivas.
        </p>
        <p>
          Exemplo: Em um jogo de futebol com 3 resultados possíveis, as odds poderiam ser 2.10 (vitória mandante), 3.40 (empate) e 4.00 (vitória visitante). As probabilidades implícitas somam: 47,6% + 29,4% + 25% = 102%. A margem da casa é de 2%. Quanto menor essa margem, melhor para o apostador.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          Value betting: como encontrar apostas com valor
        </h2>
        <p>
          O conceito de <strong style={{ color: 'var(--text-1)' }}>value bet</strong> é o fundamento das apostas profissionais. Uma aposta tem valor quando a probabilidade real de um resultado é <em>maior</em> do que a probabilidade implícita da odd. Em outras palavras: quando a odd paga mais do que deveria.
        </p>
        <p>
          A fórmula do <strong style={{ color: 'var(--text-1)' }}>Expected Value (EV)</strong> é:
        </p>
        <div
          className="rounded-xl px-5 py-4 font-mono text-xs"
          style={{ background: 'rgba(129,140,248,0.05)', border: '1px solid rgba(129,140,248,0.12)', color: '#818cf8' }}
        >
          EV = (Probabilidade estimada × Lucro potencial) − (Probabilidade de derrota × Stake)
        </div>
        <p>
          Se o EV for positivo, a aposta tem valor. Se for negativo, você perde dinheiro em expectativa no longo prazo — mesmo que ganhe apostas individuais por sorte.
        </p>
        <p>
          Nossa calculadora de odds inclui um campo de "probabilidade estimada" exatamente para isso: você insere sua estimativa e a ferramenta calcula o EV automaticamente, indicando se há value na aposta.
        </p>
        <p>
          Para maximizar seu edge, combine a detecção de value com uma boa <InternalLink to="/calculadoras/gestao-banca">gestão de banca</InternalLink> usando o Critério de Kelly — disponível gratuitamente no CalculaBet.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          Calculadora de odds para apostas múltiplas e especiais
        </h2>
        <p>
          Quando você combina múltiplas seleções em uma única aposta (chamada de <strong style={{ color: 'var(--text-1)' }}>aposta múltipla ou parlay</strong>), as odds se multiplicam entre si. Uma seleção com odd 1.80 combinada com outra de odd 2.20 resulta em odd combinada de 3.96.
        </p>
        <p>
          O retorno potencial de apostas múltiplas é muito maior, mas todas as seleções precisam ser vencedoras. Use nossa{' '}
          <InternalLink to="/calculadoras/multipla-parlay">calculadora de múltipla e parlay</InternalLink>{' '}
          para calcular o retorno exato de combinações com 2 ou mais seleções.
        </p>
        <p>
          Para estratégias mais avançadas como{' '}
          <InternalLink to="/calculadoras/arbitragem">arbitragem</InternalLink>{' '}
          (explorar diferenças de odds entre casas para lucro garantido) ou{' '}
          <InternalLink to="/calculadoras/dutching">dutching</InternalLink>{' '}
          (distribuir o stake entre múltiplos resultados para equalizar o retorno), o CalculaBet oferece calculadoras específicas e gratuitas.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          Gestão de banca: tão importante quanto escolher as odds
        </h2>
        <p>
          Encontrar boas odds é apenas metade da equação. A outra metade é <strong style={{ color: 'var(--text-1)' }}>quanto apostar</strong> em cada evento. Apostar valores aleatórios ou inconsistentes é uma das principais causas de falência de banca — mesmo para apostadores com bom nível de acerto.
        </p>
        <p>
          Os métodos mais usados de gestão de banca são:
        </p>
        <ul className="space-y-2 list-none">
          {[
            ['Flat betting', 'Apostar sempre o mesmo percentual da banca (ex: 2%). Simples e protege contra oscilações. Ideal para iniciantes.'],
            ['Critério de Kelly', 'Calcula o percentual ideal da banca com base na sua edge. Maximiza o crescimento no longo prazo. Mais complexo mas matematicamente ótimo.'],
            ['Half Kelly', 'Versão conservadora do Kelly (50% do Kelly puro). Reduz a variância mantendo bom crescimento esperado.'],
          ].map(([t, d]) => (
            <li key={t} className="flex gap-3">
              <span className="flex-shrink-0 mt-0.5" style={{ color: '#22d3ee' }}>→</span>
              <span><strong style={{ color: 'var(--text-1)' }}>{t}:</strong> {d}</span>
            </li>
          ))}
        </ul>
        <p>
          Use nossa <InternalLink to="/calculadoras/gestao-banca">calculadora de gestão de banca</InternalLink> para determinar o stake ideal em cada aposta com base no seu método preferido.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          Outras ferramentas para apostadores no CalculaBet
        </h2>
        <p>
          Além da calculadora de odds, o CalculaBet oferece um conjunto completo de ferramentas gratuitas para apostadores brasileiros:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {[
            { to: '/calculadoras/aposta-simples', label: 'Calculadora de Aposta Simples', desc: 'Retorno e lucro de apostas individuais' },
            { to: '/calculadoras/multipla-parlay', label: 'Calculadora de Múltipla/Parlay', desc: 'Odd combinada e retorno de parlays' },
            { to: '/calculadoras/arbitragem', label: 'Calculadora de Arbitragem', desc: 'Lucro garantido com sure bets' },
            { to: '/calculadoras/dutching', label: 'Calculadora de Dutching', desc: 'Distribua stake entre múltiplos resultados' },
            { to: '/calculadoras/cashout', label: 'Calculadora de Cashout', desc: 'Valor justo do cashout antes do fim' },
            { to: '/calculadoras/hedge', label: 'Calculadora de Hedge', desc: 'Proteja lucros com apostas opostas' },
            { to: '/calculadoras/gestao-banca', label: 'Gestão de Banca (Kelly)', desc: 'Stake ideal por aposta' },
            { to: '/calculadoras/martingale', label: 'Simulador de Martingale', desc: 'Riscos da estratégia de dobrar stakes' },
            { to: '/calculadoras/conversor-odds', label: 'Conversor de Odds', desc: 'Decimal, americana, fracionária e probabilidade' },
            { to: '/calculadoras/roi', label: 'Calculadora de ROI', desc: 'Retorno sobre investimento em apostas' },
            { to: '/calculadoras/simulador-lucro', label: 'Simulador de Lucro', desc: 'Projeção de banca a longo prazo' },
          ].map(item => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-start gap-2.5 p-3 rounded-xl transition-all duration-150"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,211,238,0.2)'; e.currentTarget.style.background = 'rgba(34,211,238,0.03)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
            >
              <span style={{ color: '#22d3ee', marginTop: '1px', flexShrink: 0 }}>→</span>
              <div>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-1)' }}>{item.label}</p>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          Dicas para usar bem as odds nas suas apostas
        </h2>
        <ul className="space-y-3">
          {[
            ['Compare odds entre casas', 'Odds diferentes para o mesmo evento significam retornos diferentes. Pequenas diferenças de odd acumulam impacto significativo ao longo de centenas de apostas. Compare plataformas e verifique licença, termos e disponibilidade diretamente em cada uma.'],
            ['Calcule sempre antes de apostar', 'Nunca aposte sem saber exatamente quanto pode ganhar ou perder. A calculadora de odds elimina esse erro básico.'],
            ['Entenda a margem da casa', 'Casas com menor margem (overround) pagam odds melhores. Em geral, mercados principais de futebol têm margens de 4–7%. Mercados menores podem ter 10–20%.'],
            ['Registre suas apostas', 'Use nossa calculadora de ROI para acompanhar sua performance real ao longo do tempo. Sem registro, é impossível saber se você está lucrando ou perdendo sistematicamente.'],
            ['Aposte com responsabilidade', 'Defina um limite de banca antes de começar e nunca aposte mais do que pode perder. Acesse nossa página de jogo responsável para mais informações.'],
          ].map(([t, d]) => (
            <li key={t} className="flex gap-3">
              <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)', color: '#22d3ee', flexShrink: 0 }}>✓</span>
              <span><strong style={{ color: 'var(--text-1)' }}>{t}:</strong> {d}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs pt-2" style={{ color: 'var(--text-3)' }}>
          Para aprender mais sobre gestão responsável da sua banca, visite nossa{' '}
          <InternalLink to="/jogo-responsavel">página de jogo responsável</InternalLink>.
          Apostas são proibidas para menores de 18 anos.
        </p>
      </section>

    </article>
  );
}
