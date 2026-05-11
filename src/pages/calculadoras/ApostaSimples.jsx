import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

const InternalLink = ({ to, children }) => (
  <Link to={to} style={{ color: '#22d3ee' }} className="underline underline-offset-2 hover:opacity-80 transition-opacity">
    {children}
  </Link>
);

const faqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Calculadora de Aposta Simples — CalculaBet',
  description: 'Calculadora gratuita de aposta simples. Calcule retorno, lucro, ROI e probabilidade implícita de apostas individuais em apostas esportivas.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
};

const PRESETS = [10, 25, 50, 100, 200, 500];

export default function ApostaSimples() {
  const [stake, setStake] = useState('');
  const [odd, setOdd] = useState('');
  const [banca, setBanca] = useState('');

  const s = parseFloat(stake);
  const o = parseFloat(odd);
  const b = parseFloat(banca);
  const valid = s > 0 && o > 1;
  const retorno   = valid ? s * o : 0;
  const lucro     = valid ? retorno - s : 0;
  const roi       = valid ? (lucro / s) * 100 : 0;
  const probImpl  = valid ? (1 / o) * 100 : 0;
  const percBanca = valid && b > 0 ? (s / b) * 100 : null;
  const breakeven = valid ? (1 / o) * 100 : 0; // same as prob. implícita

  const faqs = [
    {
      q: 'O que é uma aposta simples?',
      a: 'Uma aposta simples (ou aposta única) é uma aposta feita em um único evento ou mercado. Diferente das apostas múltiplas, aqui você precisa acertar apenas uma seleção para receber o retorno.',
    },
    {
      q: 'Como calcular o retorno de uma aposta simples?',
      a: 'Multiplique o stake (valor apostado) pela odd decimal. Retorno = Stake × Odd. O lucro é o retorno menos o stake. Exemplo: R$100 × 2.50 = R$250 de retorno e R$150 de lucro.',
    },
    {
      q: 'O que é stake em apostas esportivas?',
      a: 'Stake é o valor que você aposta em um evento. Definir o stake correto é fundamental para uma boa gestão de banca. O recomendado é apostar entre 1% e 5% da sua banca por aposta.',
    },
    {
      q: 'O que é ROI em apostas?',
      a: 'ROI (Return on Investment) é o percentual de retorno sobre o valor investido. ROI = (Lucro ÷ Stake) × 100. Um ROI de 10% significa que você lucrou R$10 para cada R$100 apostados.',
    },
    {
      q: 'O que é probabilidade implícita?',
      a: 'É a probabilidade de vitória que a odd representa. Calculada como 1/Odd × 100. Odd 2.00 implica 50% de chance. Se você acredita que a chance real é maior, a aposta tem valor (value).',
    },
    {
      q: 'Qual a diferença entre aposta simples e múltipla?',
      a: 'Na aposta simples você aposta em um único resultado. Na múltipla, você combina 2 ou mais seleções — as odds se multiplicam, aumentando o retorno, mas todas precisam ser vencedoras.',
    },
    {
      q: 'Qual percentual da banca devo apostar por evento?',
      a: 'O recomendado para apostadores conservadores é entre 1% e 3% da banca por aposta. Nunca aposte mais de 5% em um único evento, independentemente do nível de confiança.',
    },
    {
      q: 'A calculadora funciona para qualquer esporte?',
      a: 'Sim. A calculadora de aposta simples funciona para futebol, tênis, basquete, vôlei, e-sports, corridas e qualquer outro mercado — desde que você informe a odd decimal corretamente.',
    },
  ];

  return (
    <CalcLayout
      title="Calculadora de Aposta Simples"
      description="Calcule retorno total, lucro, ROI e probabilidade implícita de apostas simples. Informe stake e odd — os resultados aparecem em tempo real."
      slug="aposta-simples"
      faqs={faqs}
      schema={[pageSchema, faqSchema(faqs)]}
      explanation={<ApostaSimplesExplanation />}
    >
      <div className="space-y-6">

        {/* Preset stakes */}
        <div>
          <p className="label">Stake rápido</p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map(v => (
              <button
                key={v}
                onClick={() => setStake(String(v))}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                style={{
                  background: parseFloat(stake) === v ? 'rgba(34,211,238,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${parseFloat(stake) === v ? 'rgba(34,211,238,0.25)' : 'var(--border)'}`,
                  color: parseFloat(stake) === v ? '#22d3ee' : 'var(--text-2)',
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
            <label className="label">Stake — valor apostado (R$)</label>
            <input
              type="number"
              className="input-field"
              placeholder="100"
              min="0"
              step="any"
              value={stake}
              onChange={e => setStake(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Odd decimal</label>
            <input
              type="text"
              inputMode="decimal"
              className="input-field"
              placeholder="2.50"
              value={odd}
              onChange={e => setOdd(e.target.value)}
            />
          </div>
        </div>

        {/* Optional banca */}
        <div>
          <label className="label">
            Banca total (R$) —{' '}
            <span style={{ color: 'var(--text-3)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
              opcional · calcula % da banca apostada
            </span>
          </label>
          <input
            type="number"
            className="input-field"
            placeholder="Ex: 1000 (deixe vazio se não quiser)"
            min="0"
            value={banca}
            onChange={e => setBanca(e.target.value)}
          />
        </div>

        {/* Results */}
        {valid ? (
          <div className="space-y-3 animate-float-in">
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
                <p className="result-value" style={{ color: '#818cf8' }}>{roi.toFixed(1)}%</p>
                <p className="result-label">ROI</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: '#22d3ee' }}>{probImpl.toFixed(1)}%</p>
                <p className="result-label">Prob. implícita</p>
              </div>
            </div>

            {/* Banca % indicator */}
            {percBanca !== null && (
              <div
                className="rounded-xl px-4 py-3 flex items-center justify-between gap-4"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
              >
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span style={{ color: 'var(--text-3)' }}>% da banca apostada</span>
                    <span
                      className="font-semibold"
                      style={{ color: percBanca > 5 ? 'var(--red)' : percBanca > 3 ? '#fbbf24' : '#4ade80' }}
                    >
                      {percBanca.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(percBanca, 100)}%`,
                        background: percBanca > 5 ? 'var(--red)' : percBanca > 3 ? '#fbbf24' : '#4ade80',
                      }}
                    />
                  </div>
                </div>
                <span
                  className="text-xs font-medium flex-shrink-0"
                  style={{ color: percBanca > 5 ? 'var(--red)' : percBanca > 3 ? '#fbbf24' : '#4ade80' }}
                >
                  {percBanca > 5 ? 'Alto risco' : percBanca > 3 ? 'Moderado' : 'Conservador'}
                </span>
              </div>
            )}

            {/* Breakeven note */}
            <p className="text-xs text-center" style={{ color: 'var(--text-3)' }}>
              Ponto de equilíbrio: você precisa acertar pelo menos{' '}
              <strong style={{ color: 'var(--text-2)' }}>{breakeven.toFixed(1)}%</strong>{' '}
              das apostas nessa odd para não perder dinheiro no longo prazo.
            </p>
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

/* ── Long-form SEO content ─────────────────────────────── */
function ApostaSimplesExplanation() {
  return (
    <article className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>

      <section className="space-y-3">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          O que é uma aposta simples e como ela funciona
        </h2>
        <p>
          A <strong style={{ color: 'var(--text-1)' }}>aposta simples</strong> (também chamada de aposta única ou single bet) é o tipo mais básico de aposta esportiva: você seleciona um único resultado em um único evento e aposta um determinado valor — o <strong style={{ color: 'var(--text-1)' }}>stake</strong>. Se o resultado for o que você escolheu, você recebe o stake multiplicado pela odd. Se não, perde o valor apostado.
        </p>
        <p>
          É o ponto de partida obrigatório para qualquer apostador. Antes de avançar para apostas múltiplas, sistemas ou estratégias mais complexas, é essencial dominar a aposta simples: entender como calcular o retorno, o lucro, o ROI e a probabilidade implícita de cada odd.
        </p>
        <p>
          Nossa <strong style={{ color: 'var(--text-1)' }}>calculadora de aposta simples</strong> faz tudo isso automaticamente. Você também pode usar nossa{' '}
          <InternalLink to="/calculadoras/odds">calculadora de odds</InternalLink>{' '}
          para analisar o valor de cada odd antes de apostar, ou o{' '}
          <InternalLink to="/calculadoras/conversor-odds">conversor de odds</InternalLink>{' '}
          para traduzir cotações entre os formatos decimal, americana e fracionária.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          Como calcular o retorno de uma aposta simples
        </h2>
        <p>
          O cálculo é direto. Com odds decimais (padrão no Brasil), basta multiplicar o stake pela odd:
        </p>
        <div
          className="rounded-xl px-5 py-4 space-y-2 font-mono text-xs"
          style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)', color: '#22d3ee' }}
        >
          <p>Retorno total  = Stake × Odd decimal</p>
          <p>Lucro líquido  = Retorno total − Stake</p>
          <p>ROI            = (Lucro ÷ Stake) × 100</p>
          <p>Prob. implícita = (1 ÷ Odd) × 100</p>
        </div>
        <p>
          <strong style={{ color: 'var(--text-1)' }}>Exemplos práticos:</strong>
        </p>
        <div
          className="rounded-xl p-4 space-y-2"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
        >
          {[
            ['R$50 × odd 1.80', 'R$90 retorno', 'R$40 lucro', 'ROI 80%'],
            ['R$100 × odd 2.50', 'R$250 retorno', 'R$150 lucro', 'ROI 150%'],
            ['R$200 × odd 3.20', 'R$640 retorno', 'R$440 lucro', 'ROI 220%'],
            ['R$500 × odd 1.40', 'R$700 retorno', 'R$200 lucro', 'ROI 40%'],
          ].map(([aposta, retorno, lucro, roi], i) => (
            <div key={i} className="grid grid-cols-4 gap-2 text-xs">
              <span style={{ color: 'var(--text-1)', fontWeight: 600 }}>{aposta}</span>
              <span style={{ color: 'var(--text-2)' }}>{retorno}</span>
              <span style={{ color: '#4ade80' }}>{lucro}</span>
              <span style={{ color: '#818cf8' }}>{roi}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          Stake: o que é e como definir o valor certo para apostar
        </h2>
        <p>
          O <strong style={{ color: 'var(--text-1)' }}>stake</strong> é o valor que você coloca em risco em uma aposta. Definir o stake correto é tão importante quanto escolher a odd certa. Apostar muito em um único evento pode destruir sua banca rapidamente; apostar pouco limita o crescimento mesmo quando você está ganhando.
        </p>
        <p>
          Existem três abordagens principais para definir o stake:
        </p>
        <ul className="space-y-3 list-none">
          {[
            ['Flat betting (percentual fixo)', 'Apostar sempre o mesmo percentual da banca, independentemente da odd ou do nível de confiança. Ex: sempre 2% da banca. É a estratégia mais simples e mais recomendada para iniciantes.'],
            ['Critério de Kelly', 'Fórmula matemática que calcula o percentual ideal da banca com base na sua estimativa de probabilidade e na odd oferecida. Maximiza o crescimento no longo prazo, mas exige estimativas precisas. Use nossa calculadora de gestão de banca para calcular.'],
            ['Stake proporcional à confiança', 'Variar o stake de acordo com o nível de confiança em cada aposta. Apostas de alta confiança recebem stakes maiores. Exige experiência e disciplina para não exagerar.'],
          ].map(([t, d]) => (
            <li key={t} className="flex gap-3">
              <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)', color: '#22d3ee', flexShrink: 0 }}>→</span>
              <span><strong style={{ color: 'var(--text-1)' }}>{t}:</strong> {d}</span>
            </li>
          ))}
        </ul>
        <p>
          Nossa calculadora inclui um campo opcional de <strong style={{ color: 'var(--text-1)' }}>banca total</strong>, que mostra automaticamente o percentual da banca que você está arriscando e classifica o risco como conservador (até 3%), moderado (3–5%) ou alto (acima de 5%). Para cálculo mais detalhado, use a{' '}
          <InternalLink to="/calculadoras/gestao-banca">calculadora de gestão de banca</InternalLink>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          ROI em apostas simples: como medir sua performance
        </h2>
        <p>
          O <strong style={{ color: 'var(--text-1)' }}>ROI (Return on Investment)</strong> é a métrica mais importante para avaliar se você está lucrando ou perdendo como apostador. Ele mede o percentual de retorno sobre o total apostado, independentemente do valor absoluto.
        </p>
        <p>
          Um apostador que apostou R$10.000 e lucrou R$800 tem ROI de 8%. Isso é considerado excelente no mundo das apostas esportivas. Apostadores profissionais geralmente mantêm ROI entre 5% e 15% no longo prazo. Se seu ROI for negativo por muitas apostas consecutivas, é hora de revisar sua estratégia.
        </p>
        <p>
          Para acompanhar o ROI acumulado de todas as suas apostas ao longo do tempo, use nossa{' '}
          <InternalLink to="/calculadoras/roi">calculadora de ROI em apostas</InternalLink>.
          Para projetar como sua banca pode evoluir com determinado ROI e frequência de apostas, use o{' '}
          <InternalLink to="/calculadoras/simulador-lucro">simulador de lucro</InternalLink>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          Probabilidade implícita e ponto de equilíbrio (breakeven)
        </h2>
        <p>
          Todo apostador precisa entender o conceito de <strong style={{ color: 'var(--text-1)' }}>ponto de equilíbrio</strong> (breakeven): o percentual mínimo de apostas que você precisa acertar para não perder dinheiro com uma determinada odd.
        </p>
        <p>
          Esse valor é exatamente a probabilidade implícita da odd: <em>Breakeven = 1/Odd × 100</em>. Se você aposta consistentemente em odds de 2.00 (probabilidade implícita de 50%), precisa acertar mais de 50% das apostas para lucrar. Em odds de 1.50 (66,7%), precisa acertar mais de 2 em cada 3 apostas.
        </p>
        <p>
          Nossa calculadora exibe o ponto de equilíbrio automaticamente logo abaixo dos resultados, para você sempre saber qual é a taxa mínima de acerto necessária com a odd escolhida.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          Aposta simples vs. aposta múltipla: qual escolher?
        </h2>
        <p>
          A diferença fundamental entre apostas simples e múltiplas está no risco e no retorno potencial:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              titulo: 'Aposta Simples',
              cor: '#22d3ee',
              pontos: [
                'Acertar apenas 1 seleção',
                'Risco menor e mais previsível',
                'ROI mais consistente no longo prazo',
                'Ideal para apostadores iniciantes e profissionais',
                'Mais fácil de analisar e registrar',
              ],
            },
            {
              titulo: 'Aposta Múltipla',
              cor: '#818cf8',
              pontos: [
                'Todas as seleções precisam ganhar',
                'Odds se multiplicam (retorno maior)',
                'Risco exponencialmente maior',
                'Variância altíssima',
                'Margem da casa é cobrada em cada seleção',
              ],
            },
          ].map(card => (
            <div key={card.titulo} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${card.cor}20` }}>
              <p className="text-sm font-semibold mb-3" style={{ color: card.cor }}>{card.titulo}</p>
              <ul className="space-y-1.5">
                {card.pontos.map(p => (
                  <li key={p} className="flex gap-2 text-xs" style={{ color: 'var(--text-2)' }}>
                    <span style={{ color: card.cor, flexShrink: 0 }}>→</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p>
          Para calcular apostas múltiplas com 2 ou mais seleções, use nossa{' '}
          <InternalLink to="/calculadoras/multipla-parlay">calculadora de múltipla e parlay</InternalLink>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          Mercados mais comuns para apostas simples no Brasil
        </h2>
        <p>
          No Brasil, as apostas simples mais populares são feitas nos seguintes mercados:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            ['Resultado final (1X2)', 'Vitória mandante, empate ou visitante. O mercado mais popular no futebol.'],
            ['Dupla chance', 'Cobre 2 dos 3 resultados possíveis, com odds menores mas maior segurança.'],
            ['Over/Under gols', 'Aposta no total de gols da partida: acima ou abaixo de um determinado número.'],
            ['Ambas marcam (BTTS)', 'Aposta se ambos os times vão marcar pelo menos 1 gol.'],
            ['Handicap asiático', 'Equaliza as forças dos times com vantagens e desvantagens de gols.'],
            ['Vencedor do torneio', 'Quem vai ganhar a competição — odds mais altas e resultado demorado.'],
          ].map(([t, d]) => (
            <div key={t} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-1)' }}>{t}</p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          Dicas para apostar melhor em apostas simples
        </h2>
        <ul className="space-y-3">
          {[
            ['Calcule sempre antes de apostar', 'Use esta calculadora para saber exatamente quanto pode ganhar ou perder antes de confirmar qualquer aposta.'],
            ['Compare odds entre casas', 'A mesma seleção pode ter odds diferentes em casas diferentes. Pequenas diferenças acumulam impacto enorme no longo prazo. Use múltiplas casas regulamentadas.'],
            ['Registre todas as suas apostas', `Anote stake, odd, resultado e lucro/prejuízo de cada aposta. Sem registro, é impossível calcular seu ROI real. Use nossa ${(<InternalLink to="/calculadoras/roi">calculadora de ROI</InternalLink>)}.`],
            ['Defina um limite de banca', 'Decida antes quanto está disposto a perder. Aposte apenas o que pode perder sem impacto na sua vida financeira.'],
            ['Evite apostas emocionais', 'Não aposte no seu time favorito por torcer por ele. Análise fria e objetiva é a base do apostador consistente.'],
          ].map(([t, d]) => (
            <li key={t} className="flex gap-3">
              <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', color: '#4ade80', flexShrink: 0 }}>✓</span>
              <span><strong style={{ color: 'var(--text-1)' }}>{t}:</strong> {d}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          Outras calculadoras gratuitas para apostadores
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { to: '/calculadoras/odds', label: 'Calculadora de Odds', desc: 'Retorno, lucro e detecção de value bet' },
            { to: '/calculadoras/multipla-parlay', label: 'Calculadora de Múltipla/Parlay', desc: 'Odd combinada e retorno de parlays' },
            { to: '/calculadoras/arbitragem', label: 'Calculadora de Arbitragem', desc: 'Lucro garantido com sure bets' },
            { to: '/calculadoras/cashout', label: 'Calculadora de Cashout', desc: 'Valor justo do cashout em tempo real' },
            { to: '/calculadoras/gestao-banca', label: 'Gestão de Banca (Kelly)', desc: 'Stake ideal por aposta com Kelly Criterion' },
            { to: '/calculadoras/roi', label: 'Calculadora de ROI', desc: 'Acompanhe sua performance no longo prazo' },
            { to: '/calculadoras/simulador-lucro', label: 'Simulador de Lucro', desc: 'Projeção de banca com Monte Carlo' },
            { to: '/calculadoras/conversor-odds', label: 'Conversor de Odds', desc: 'Decimal, americana, fracionária e probabilidade' },
          ].map(item => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-start gap-2.5 p-3 rounded-xl transition-all duration-150"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,211,238,0.2)'; e.currentTarget.style.background = 'rgba(34,211,238,0.03)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
            >
              <span style={{ color: '#22d3ee', flexShrink: 0, marginTop: '1px' }}>→</span>
              <div>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-1)' }}>{item.label}</p>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="text-xs pt-1" style={{ color: 'var(--text-3)' }}>
          Apostas esportivas são proibidas para menores de 18 anos. Jogue com responsabilidade —{' '}
          <InternalLink to="/jogo-responsavel">saiba mais</InternalLink>.
        </p>
      </section>

    </article>
  );
}
