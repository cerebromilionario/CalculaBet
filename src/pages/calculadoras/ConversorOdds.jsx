import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function decimalToAmericana(d) {
  if (d >= 2) return `+${Math.round((d - 1) * 100)}`;
  return `${Math.round(-100 / (d - 1))}`;
}
function decimalToFrac(d) {
  const num = Math.round((d - 1) * 100);
  const den = 100;
  const g = gcd(num, den);
  return `${num / g}/${den / g}`;
}
function americanaToDecimal(a) {
  const v = parseFloat(a);
  if (v > 0) return 1 + v / 100;
  if (v < 0) return 1 - 100 / v;
  return null;
}

const TIPOS = [
  { id: 'decimal', label: 'Decimal', placeholder: '2.50', ex: 'Odd decimal (ex: 2.50)' },
  { id: 'americana', label: 'Americana', placeholder: '+150', ex: 'Odd americana (ex: +150 ou -120)' },
  { id: 'fraccionaria', label: 'Fracionária', placeholder: '3/2', ex: 'Odd fracionária (ex: 3/2 ou 5/4)' },
  { id: 'probabilidade', label: 'Probabilidade %', placeholder: '40', ex: 'Probabilidade implícita em % (ex: 40)' },
];

const EXEMPLOS = [
  { decimal: 1.50, label: 'Favorito forte' },
  { decimal: 2.00, label: 'Equilíbrio' },
  { decimal: 3.00, label: 'Azarão' },
  { decimal: 5.00, label: 'Grande azarão' },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Conversor de Odds — CalculaBet',
      url: 'https://calculabet.netlify.app/calculadoras/conversor-odds',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description: 'Converta odds entre decimal, americana (moneyline), fracionária e probabilidade implícita instantaneamente. Ferramenta gratuita para apostadores brasileiros.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'O que é odd decimal?', acceptedAnswer: { '@type': 'Answer', text: 'Odd decimal representa o retorno total por unidade apostada, incluindo o stake. Odd 2.50 = você recebe R$2,50 para cada R$1,00 apostado (lucro de R$1,50). É o formato padrão no Brasil e Europa.' } },
        { '@type': 'Question', name: 'Como funciona a odd americana (moneyline)?', acceptedAnswer: { '@type': 'Answer', text: 'Odd positiva (+150): lucro de R$150 para cada R$100 apostados. Odd negativa (-120): você precisa apostar R$120 para lucrar R$100. É o padrão nos EUA e em casas como DraftKings.' } },
        { '@type': 'Question', name: 'O que é odd fracionária?', acceptedAnswer: { '@type': 'Answer', text: 'Padrão britânico. 3/2 significa que você ganha 3 partes para cada 2 apostadas — equivale à odd decimal 2.5. 1/1 (evens) equivale a odd 2.0.' } },
        { '@type': 'Question', name: 'O que é probabilidade implícita?', acceptedAnswer: { '@type': 'Answer', text: 'É a probabilidade de vitória que a odd representa: 1/odd × 100. Odd 2.00 = 50%. Odd 1.50 = 66.7%. Quando a soma das probabilidades implícitas de um mercado supera 100%, a diferença é a margem da casa (overround).' } },
        { '@type': 'Question', name: 'Como converter odd americana para decimal?', acceptedAnswer: { '@type': 'Answer', text: 'Americana positiva (+X): decimal = 1 + X/100. Americana negativa (-X): decimal = 1 + 100/X. Exemplo: +150 → 1 + 150/100 = 2.50. Exemplo: -120 → 1 + 100/120 = 1.833.' } },
        { '@type': 'Question', name: 'Como converter odd fracionária para decimal?', acceptedAnswer: { '@type': 'Answer', text: 'Decimal = (numerador / denominador) + 1. Exemplo: 3/2 → (3/2) + 1 = 2.5. Exemplo: 1/4 → (1/4) + 1 = 1.25.' } },
        { '@type': 'Question', name: 'Qual o formato de odds mais usado no Brasil?', acceptedAnswer: { '@type': 'Answer', text: 'O formato decimal é padrão em todas as casas de apostas brasileiras (Bet365, Betano, Sportingbet, etc.). Odds americanas aparecem em casas internacionais. Odds fracionárias são raras no mercado brasileiro.' } },
        { '@type': 'Question', name: 'O que é o overround de uma casa de apostas?', acceptedAnswer: { '@type': 'Answer', text: 'Overround (ou vig) é a margem da casa: a soma das probabilidades implícitas de todos os resultados de um mercado. Se soma 105%, a margem é 5% — o custo de apostar nessa casa. Casas mais eficientes como Pinnacle têm overround de 2-3%.' } },
      ],
    },
  ],
};

function ConversorExplanation() {
  return (
    <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Os três formatos de odds explicados</h2>
        <p className="mb-4">
          As odds (cotações) em apostas esportivas podem ser expressas em três formatos principais. Todos representam a mesma informação — o retorno potencial de uma aposta — mas de formas diferentes. Saber converter entre eles é essencial para comparar odds entre casas internacionais e brasileiras.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              titulo: 'Decimal (Europa/Brasil)',
              exemplo: '2.50',
              cor: '#22d3ee',
              desc: 'O mais simples e intuitivo. Representa o retorno total por unidade apostada, incluindo o stake original.',
              formula: 'Retorno = Stake × Odd',
              uso: 'Padrão no Brasil, Europa e Oceania. Todas as casas brasileiras usam este formato.',
            },
            {
              titulo: 'Americana (Moneyline)',
              exemplo: '+150 / -120',
              cor: '#818cf8',
              desc: 'Usa valores positivos (favoritos para underdog) e negativos (favoritos). Comum nos EUA.',
              formula: '+150: lucro de R$150/R$100\n-120: aposta R$120 para lucrar R$100',
              uso: 'Casas americanas como DraftKings, FanDuel, PointsBet.',
            },
            {
              titulo: 'Fracionária (Reino Unido)',
              exemplo: '3/2',
              cor: '#4ade80',
              desc: 'Expressa o lucro em relação ao stake. 3/2 = ganho 3 para cada 2 apostados.',
              formula: 'Decimal = (num/den) + 1',
              uso: 'Tradicional em corridas de cavalos e apostas no Reino Unido.',
            },
          ].map((f, i) => (
            <div key={i} className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${f.cor}20` }}>
              <p className="text-xs font-semibold mb-2" style={{ color: f.cor, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{f.titulo}</p>
              <p className="text-2xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>{f.exemplo}</p>
              <p className="text-xs mb-3" style={{ color: 'var(--text-2)' }}>{f.desc}</p>
              <p className="font-mono text-xs px-2 py-1 rounded mb-3 whitespace-pre-line" style={{ background: `${f.cor}10`, color: f.cor }}>{f.formula}</p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>{f.uso}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Tabela de conversão rápida</h2>
        <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Decimal</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Americana</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Fracionária</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Prob. implícita</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Retorno (R$100)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { dec: '1.25', am: '-400', frac: '1/4', prob: '80.0%', ret: 'R$125' },
                { dec: '1.50', am: '-200', frac: '1/2', prob: '66.7%', ret: 'R$150' },
                { dec: '2.00', am: '+100', frac: '1/1', prob: '50.0%', ret: 'R$200' },
                { dec: '2.50', am: '+150', frac: '3/2', prob: '40.0%', ret: 'R$250' },
                { dec: '3.00', am: '+200', frac: '2/1', prob: '33.3%', ret: 'R$300' },
                { dec: '4.00', am: '+300', frac: '3/1', prob: '25.0%', ret: 'R$400' },
                { dec: '5.00', am: '+400', frac: '4/1', prob: '20.0%', ret: 'R$500' },
                { dec: '10.00', am: '+900', frac: '9/1', prob: '10.0%', ret: 'R$1.000' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="px-4 py-3 font-bold" style={{ color: '#22d3ee' }}>{row.dec}</td>
                  <td className="px-4 py-3 font-medium" style={{ color: '#818cf8' }}>{row.am}</td>
                  <td className="px-4 py-3" style={{ color: '#4ade80' }}>{row.frac}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{row.prob}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-1)' }}>{row.ret}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Probabilidade implícita e overround</h2>
        <p className="mb-3">
          A <strong style={{ color: 'var(--text-1)' }}>probabilidade implícita</strong> de uma odd é simplesmente 1/odd × 100. Odd 2.00 = 50%. Odd 1.50 = 66.7%. Ela representa a probabilidade de ganho que a casa assume ao oferecer aquela odd.
        </p>
        <p className="mb-3">
          O <strong style={{ color: 'var(--text-1)' }}>overround</strong> (ou vig) é a margem da casa. Em um mercado de dois resultados, some as probabilidades implícitas das duas odds. Se somam 105%, a margem é 5% — ou seja, para cada R$100 apostados na média, a casa retorna R$95.
        </p>
        <div className="rounded-xl p-5 mb-3" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
          <p className="text-xs font-semibold mb-3" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Exemplo de overround</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {[
              { res: 'Time A ganha', odd: '2.10', prob: '47.6%' },
              { res: 'Empate', odd: '3.40', prob: '29.4%' },
              { res: 'Time B ganha', odd: '3.60', prob: '27.8%' },
            ].map((r, i) => (
              <div key={i} className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <p style={{ color: 'var(--text-3)' }}>{r.res}</p>
                <p className="font-bold mt-1" style={{ color: '#22d3ee' }}>{r.odd}</p>
                <p style={{ color: 'var(--text-2)' }}>{r.prob}</p>
              </div>
            ))}
          </div>
          <p className="text-xs mt-3" style={{ color: 'var(--text-3)' }}>
            Soma: 47.6% + 29.4% + 27.8% = <strong style={{ color: '#fbbf24' }}>104.8%</strong> → Overround de <strong style={{ color: '#fbbf24' }}>4.8%</strong>
          </p>
        </div>
        <p>
          Use a <Link to="/calculadoras/odds" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de Odds</Link> para verificar se uma odd específica tem valor (EV positivo) comparando a probabilidade implícita com sua estimativa.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Fórmulas de conversão passo a passo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              titulo: 'Decimal → Americana',
              passos: ['Se decimal ≥ 2.0: americana = +(decimal − 1) × 100', 'Se decimal < 2.0: americana = −100 / (decimal − 1)', 'Ex: 2.50 → +(2.50−1)×100 = +150', 'Ex: 1.50 → −100/(1.50−1) = −200'],
              cor: '#22d3ee',
            },
            {
              titulo: 'Americana → Decimal',
              passos: ['Se positiva (+X): decimal = 1 + X/100', 'Se negativa (−X): decimal = 1 + 100/X', 'Ex: +150 → 1 + 150/100 = 2.50', 'Ex: −200 → 1 + 100/200 = 1.50'],
              cor: '#818cf8',
            },
            {
              titulo: 'Fracionária → Decimal',
              passos: ['decimal = (numerador ÷ denominador) + 1', 'Ex: 3/2 → (3÷2) + 1 = 2.50', 'Ex: 1/4 → (1÷4) + 1 = 1.25', 'Ex: 1/1 → (1÷1) + 1 = 2.00'],
              cor: '#4ade80',
            },
            {
              titulo: 'Probabilidade → Decimal',
              passos: ['decimal = 100 ÷ probabilidade (%)', 'Ex: 40% → 100/40 = 2.50', 'Ex: 66.7% → 100/66.7 = 1.50', 'Ex: 25% → 100/25 = 4.00'],
              cor: '#fbbf24',
            },
          ].map((f, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${f.cor}20` }}>
              <p className="font-semibold text-sm mb-3" style={{ color: f.cor }}>{f.titulo}</p>
              <ul className="space-y-1">
                {f.passos.map((p, j) => (
                  <li key={j} className="font-mono text-xs" style={{ color: j < 2 ? 'var(--text-1)' : 'var(--text-3)' }}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>Ferramentas relacionadas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { to: '/calculadoras/odds', icon: '📊', label: 'Calculadora de Odds' },
            { to: '/calculadoras/aposta-simples', icon: '🎯', label: 'Aposta Simples' },
            { to: '/calculadoras/multipla-parlay', icon: '🎰', label: 'Múltipla / Parlay' },
            { to: '/calculadoras/arbitragem', icon: '💰', label: 'Arbitragem' },
            { to: '/calculadoras/gestao-banca', icon: '🏦', label: 'Gestão de Banca' },
            { to: '/calculadoras/roi', icon: '📈', label: 'ROI' },
            { to: '/calculadoras/dutching', icon: '⚖️', label: 'Dutching' },
            { to: '/calculadoras/simulador-lucro', icon: '💹', label: 'Simulador' },
          ].map((l, i) => (
            <Link
              key={i}
              to={l.to}
              className="flex items-center gap-2 px-3 py-3 rounded-xl text-xs font-medium transition-all duration-150"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)'; e.currentTarget.style.color = '#22d3ee'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)'; }}
            >
              <span>{l.icon}</span> {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ConversorOdds() {
  const [input, setInput] = useState('');
  const [tipo, setTipo] = useState('decimal');

  let decimal = null;
  try {
    if (tipo === 'decimal') { const v = parseFloat(input); if (v > 1) decimal = v; }
    else if (tipo === 'americana') decimal = americanaToDecimal(input);
    else if (tipo === 'fraccionaria') {
      const parts = input.split('/');
      if (parts.length === 2) {
        const n = parseFloat(parts[0]);
        const d = parseFloat(parts[1]);
        if (d > 0 && !isNaN(n)) decimal = 1 + n / d;
      }
    } else if (tipo === 'probabilidade') {
      const p = parseFloat(input);
      if (p > 0 && p < 100) decimal = 100 / p;
    }
  } catch {}

  const valid = decimal && decimal > 1 && isFinite(decimal);

  const conversoes = valid ? [
    { label: 'Decimal', value: decimal.toFixed(3), desc: 'Europa / Brasil' },
    { label: 'Americana', value: decimalToAmericana(decimal), desc: 'EUA / Moneyline' },
    { label: 'Fracionária', value: decimalToFrac(decimal), desc: 'Reino Unido' },
    { label: 'Prob. implícita', value: `${(1 / decimal * 100).toFixed(2)}%`, desc: 'Chance implícita' },
  ] : [];

  const tipoAtual = TIPOS.find(t => t.id === tipo);

  const faqs = [
    { q: 'O que é odd decimal?', a: 'Odd decimal representa o retorno total por unidade apostada, incluindo o stake. Odd 2.50 = você recebe R$2,50 para cada R$1,00 apostado.' },
    { q: 'Como funciona a odd americana (moneyline)?', a: 'Positiva (+150): lucro de R$150 para cada R$100. Negativa (-120): você aposta R$120 para lucrar R$100.' },
    { q: 'O que é odd fracionária?', a: 'Padrão britânico. 3/2 significa que você ganha 3 partes para cada 2 apostadas — equivale à odd decimal 2.5.' },
    { q: 'O que é probabilidade implícita?', a: 'A probabilidade de vitória que a odd representa: 1/odd × 100. Odd 2.00 = 50%.' },
    { q: 'Como converter odd americana para decimal?', a: 'Positiva (+X): decimal = 1 + X/100. Negativa (−X): decimal = 1 + 100/X.' },
    { q: 'Como converter fracionária para decimal?', a: 'Decimal = (numerador / denominador) + 1. Ex: 3/2 → (3/2) + 1 = 2.50.' },
    { q: 'Qual o formato de odds mais usado no Brasil?', a: 'O formato decimal é padrão em todas as casas brasileiras. Americanas aparecem em casas internacionais.' },
    { q: 'O que é overround?', a: 'Margem da casa: soma das probabilidades implícitas de todos os resultados. Se soma 105%, a margem é 5%.' },
  ];

  return (
    <CalcLayout
      title="Conversor de Odds"
      description="Converta odds entre decimal, americana (moneyline), fracionária e probabilidade implícita instantaneamente. Tabela de conversão completa e fórmulas explicadas."
      slug="conversor-odds"
      faqs={faqs}
      schema={schema}
      explanation={<ConversorExplanation />}
    >
      <div className="space-y-6">

        {/* Type tabs */}
        <div>
          <p className="label">Converter de</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TIPOS.map(t => (
              <button
                key={t.id}
                onClick={() => { setTipo(t.id); setInput(''); }}
                className="px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 text-center"
                style={{
                  background: tipo === t.id ? 'rgba(34,211,238,0.08)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${tipo === t.id ? 'rgba(34,211,238,0.25)' : 'var(--border)'}`,
                  color: tipo === t.id ? '#22d3ee' : 'var(--text-2)',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick examples */}
        {tipo === 'decimal' && (
          <div>
            <p className="text-xs mb-2" style={{ color: 'var(--text-3)' }}>Exemplos rápidos:</p>
            <div className="flex flex-wrap gap-2">
              {EXEMPLOS.map(ex => (
                <button
                  key={ex.decimal}
                  onClick={() => setInput(String(ex.decimal))}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                  style={{
                    background: input === String(ex.decimal) ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${input === String(ex.decimal) ? 'rgba(34,211,238,0.4)' : 'var(--border)'}`,
                    color: input === String(ex.decimal) ? '#22d3ee' : 'var(--text-2)',
                  }}
                >
                  {ex.decimal} <span style={{ color: 'var(--text-3)' }}>({ex.label})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div>
          <label className="label">{tipoAtual?.ex}</label>
          <input
            type={tipo === 'fraccionaria' ? 'text' : 'number'}
            className="input-field text-xl font-semibold"
            placeholder={tipoAtual?.placeholder}
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ letterSpacing: tipo === 'fraccionaria' ? '0.05em' : undefined }}
          />
        </div>

        {/* Results */}
        {valid ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {conversoes.map((c, i) => {
                const isSource = c.label === tipoAtual?.label || (c.label === 'Prob. implícita' && tipo === 'probabilidade');
                return (
                  <div
                    key={i}
                    className="result-box"
                    style={{
                      background: isSource ? 'rgba(34,211,238,0.07)' : undefined,
                      borderColor: isSource ? 'rgba(34,211,238,0.25)' : undefined,
                    }}
                  >
                    {isSource && (
                      <p className="text-xs mb-1" style={{ color: '#22d3ee', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Entrada</p>
                    )}
                    <p className="result-value text-lg tabular-nums">{c.value}</p>
                    <p className="result-label">{c.label}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-3)', fontSize: '0.6rem' }}>{c.desc}</p>
                  </div>
                );
              })}
            </div>
            <div
              className="rounded-xl px-4 py-3 text-xs"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-3)' }}
            >
              Odd <strong style={{ color: 'var(--text-1)' }}>{decimal.toFixed(3)}</strong> ·
              Retorno de <strong style={{ color: '#22d3ee' }}>R${(decimal * 100).toFixed(2)}</strong> para R$100 apostados ·
              Lucro: <strong style={{ color: '#4ade80' }}>R${((decimal - 1) * 100).toFixed(2)}</strong>
            </div>
          </div>
        ) : (
          <div
            className="rounded-xl flex items-center justify-center py-10"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Digite uma odd para converter</p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
