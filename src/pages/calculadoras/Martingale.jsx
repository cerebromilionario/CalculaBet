import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de Martingale — CalculaBet',
      url: 'https://calculabet.netlify.app/calculadoras/martingale',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description: 'Simule a estratégia Martingale em apostas e visualize o crescimento exponencial do risco após derrotas consecutivas. Entenda por que o Martingale é perigoso antes de usá-lo.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'O que é a estratégia Martingale em apostas?', acceptedAnswer: { '@type': 'Answer', text: 'Martingale é uma estratégia onde você dobra o stake após cada derrota. A teoria é que um eventual ganho recupera todas as perdas anteriores mais o lucro inicial. Na prática, o crescimento exponencial dos stakes rapidamente ultrapassa qualquer banca.' } },
        { '@type': 'Question', name: 'Por que o Martingale é arriscado?', acceptedAnswer: { '@type': 'Answer', text: 'O risco cresce exponencialmente: 10 derrotas consecutivas partindo de R$10 exigiriam R$10.240 na próxima aposta. Além disso, casas impõem limites máximos que bloqueiam a estratégia no momento mais crítico.' } },
        { '@type': 'Question', name: 'O Martingale funciona a longo prazo?', acceptedAnswer: { '@type': 'Answer', text: 'Não. Matematicamente, qualquer sequência suficientemente longa de apostas eventualmente produzirá uma série de derrotas que esgota a banca. O lucro esperado por aposta é negativo se a odd tiver margem da casa.' } },
        { '@type': 'Question', name: 'Qual a probabilidade de 10 derrotas consecutivas?', acceptedAnswer: { '@type': 'Answer', text: 'Com odd 2.00 (prob. implícita 50%), a chance de 10 derrotas seguidas é (0.5)^10 = 0.097% — rara, mas acontece. Em 1.000 sequências de 10 apostas, você espera que isso ocorra cerca de 1 vez.' } },
        { '@type': 'Question', name: 'Existe uma variação mais segura do Martingale?', acceptedAnswer: { '@type': 'Answer', text: 'O Anti-Martingale dobra o stake após vitórias (não derrotas), limitando perdas. O D\'Alembert usa incremento linear em vez de exponencial. Nenhuma elimina a desvantagem matemática de odds com margem da casa.' } },
        { '@type': 'Question', name: 'Como o limite de apostas das casas afeta o Martingale?', acceptedAnswer: { '@type': 'Answer', text: 'Casas como Bet365 têm limites máximos por aposta. Quando o stake do Martingale atinge esse limite, a estratégia quebra: você não pode mais dobrar e fica com perda total acumulada sem chance de recuperação.' } },
        { '@type': 'Question', name: 'O que é Fibonacci em apostas?', acceptedAnswer: { '@type': 'Answer', text: 'Uma variação do Martingale onde os stakes seguem a sequência de Fibonacci (1, 1, 2, 3, 5, 8, 13...) após derrotas. Cresce mais lentamente que o Martingale puro, mas ainda apresenta risco exponencial a longo prazo.' } },
        { '@type': 'Question', name: 'Qual a alternativa recomendada ao Martingale?', acceptedAnswer: { '@type': 'Answer', text: 'Kelly Criterion ou flat betting são estratégias matematicamente superiores. Em vez de recuperar perdas, foque em encontrar value bets com edge positivo e gerencie a banca de forma sustentável.' } },
      ],
    },
  ],
};

function MartingaleExplanation() {
  return (
    <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
      <div
        className="flex items-start gap-3 p-5 rounded-xl"
        style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)' }}
      >
        <span className="text-xl flex-shrink-0">⚠️</span>
        <div>
          <p className="font-semibold mb-1" style={{ color: '#f87171' }}>O CalculaBet não recomenda o uso do Martingale</p>
          <p className="text-xs" style={{ color: 'var(--text-2)' }}>
            Esta calculadora existe exclusivamente para fins educativos — para que você compreenda os riscos antes de considerar qualquer estratégia baseada em progressão de stakes.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>O que é a estratégia Martingale?</h2>
        <p className="mb-3">
          O <strong style={{ color: 'var(--text-1)' }}>Martingale</strong> é uma das estratégias de apostas mais antigas e conhecidas. A lógica é simples: após cada derrota, você <strong style={{ color: 'var(--text-1)' }}>dobra o stake</strong>. A teoria é que, quando eventualmente ganhar, você recuperará todas as perdas anteriores e ainda lucrará o stake inicial.
        </p>
        <p className="mb-3">
          Exemplo: aposta R$10. Perde. Aposta R$20. Perde. Aposta R$40. Perde. Aposta R$80. Ganha (odd 2.00). Retorno: R$160. Total investido: R$10 + R$20 + R$40 + R$80 = R$150. Lucro: R$10 — exatamente o stake inicial.
        </p>
        <p>
          O problema é que esse "lucro garantido" de R$10 exigiu R$150 em risco. E a sequência de perdas pode continuar por muito mais rodadas do que você imagina.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>O crescimento exponencial: por que o Martingale falha</h2>
        <p className="mb-4">
          O problema central do Martingale é matemático: o stake cresce <strong style={{ color: 'var(--text-1)' }}>exponencialmente</strong> (2^n), enquanto o lucro potencial permanece constante. Veja o impacto real partindo de R$10:
        </p>
        <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Derrota #</th>
                <th className="text-right px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Stake</th>
                <th className="text-right px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Total arriscado</th>
                <th className="text-right px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Lucro se ganhar</th>
                <th className="text-right px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>ROI do risco</th>
              </tr>
            </thead>
            <tbody>
              {[1,2,3,4,5,8,10,15].map((n, i) => {
                const stake = 10 * Math.pow(2, n - 1);
                const total = 10 * (Math.pow(2, n) - 1);
                const roi = (10 / total * 100);
                const danger = n >= 8;
                return (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: danger ? 'rgba(248,113,113,0.04)' : 'transparent' }}>
                    <td className="px-4 py-3 font-medium" style={{ color: danger ? '#f87171' : 'var(--text-1)' }}>{n}ª</td>
                    <td className="px-4 py-3 text-right tabular-nums" style={{ color: danger ? '#f87171' : 'var(--text-1)' }}>R${stake.toLocaleString('pt-BR')}</td>
                    <td className="px-4 py-3 text-right tabular-nums" style={{ color: danger ? '#f87171' : 'var(--text-2)' }}>R${total.toLocaleString('pt-BR')}</td>
                    <td className="px-4 py-3 text-right tabular-nums" style={{ color: '#4ade80' }}>R$10</td>
                    <td className="px-4 py-3 text-right" style={{ color: 'var(--text-3)' }}>{roi.toFixed(2)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs" style={{ color: 'var(--text-3)' }}>
          Na 15ª derrota, você precisaria apostar R$163.840 para lucrar R$10. ROI do risco total: 0.006%.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>A probabilidade de sequências longas de perdas</h2>
        <p className="mb-4">
          Muitos acreditam que sequências longas de perdas são "impossíveis". A matemática diz diferente:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { seq: '5 derrotas', prob: '3.1%', freq: '1 em 32 sequências', cor: '#fbbf24' },
            { seq: '8 derrotas', prob: '0.39%', freq: '1 em 256', cor: '#f87171' },
            { seq: '10 derrotas', prob: '0.097%', freq: '1 em 1.024', cor: '#f87171' },
            { seq: '15 derrotas', prob: '0.003%', freq: '1 em 32.768', cor: '#f87171' },
          ].map((c, i) => (
            <div key={i} className="rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${c.cor}25` }}>
              <p className="font-bold text-sm mb-1" style={{ color: c.cor }}>{c.seq}</p>
              <p className="text-xs mb-1" style={{ color: 'var(--text-1)' }}>{c.prob}</p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>{c.freq}</p>
            </div>
          ))}
        </div>
        <p className="mt-3">
          Com odd 2.00 (50% de ganho). Em <strong style={{ color: 'var(--text-1)' }}>1.000 sessões de apostas</strong>, espere ver pelo menos uma sequência de 10 derrotas. Apostadores frequentes experimentam isso inevitavelmente.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>O limite de apostas das casas quebra o Martingale</h2>
        <p className="mb-3">
          Mesmo que você tivesse banca infinita, há outro obstáculo: <strong style={{ color: 'var(--text-1)' }}>os limites máximos de aposta das casas</strong>. Bet365, Betano e a maioria das casas brasileiras impõem limites por mercado e por evento.
        </p>
        <p className="mb-3">
          Quando o seu stake do Martingale atinge esse limite, você não pode mais dobrar. A sequência quebra e você fica com todo o prejuízo acumulado, sem possibilidade de recuperação pela estratégia.
        </p>
        <p>
          Além disso, padrões de apostas que dobram sistematicamente são facilmente detectados pelas casas, que podem limitar ou fechar sua conta.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Alternativas ao Martingale</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {[
            { nome: 'Kelly Criterion', desc: 'Matematicamente ótimo para crescimento da banca. Apostas proporcionais ao edge — sem progressão de perdas.', cor: '#4ade80', link: '/calculadoras/gestao-banca' },
            { nome: 'Flat Betting', desc: 'Stake fixo como % da banca. Simples, sustentável e protege contra sequências longas de perdas.', cor: '#22d3ee', link: '/calculadoras/gestao-banca' },
            { nome: 'Anti-Martingale', desc: 'Dobra o stake após vitórias, não derrotas. Limita perdas na fase ruim e aproveita boas sequências.', cor: '#818cf8', link: null },
            { nome: 'D\'Alembert', desc: 'Aumenta o stake em 1 unidade após perda e diminui em 1 após vitória. Crescimento linear, não exponencial.', cor: '#fbbf24', link: null },
          ].map((alt, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${alt.cor}20` }}>
              <p className="font-semibold text-sm mb-1" style={{ color: alt.cor }}>{alt.nome}</p>
              <p className="text-xs mb-2" style={{ color: 'var(--text-3)' }}>{alt.desc}</p>
              {alt.link && (
                <Link to={alt.link} className="text-xs font-medium transition-colors" style={{ color: alt.cor }}>
                  Usar calculadora →
                </Link>
              )}
            </div>
          ))}
        </div>
        <p>
          A melhor alternativa a qualquer sistema de progressão é focar em encontrar <strong style={{ color: 'var(--text-1)' }}>value bets</strong> — apostas com edge positivo. Use a <Link to="/calculadoras/odds" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de Odds</Link> para identificar essas oportunidades.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>Ferramentas relacionadas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { to: '/calculadoras/gestao-banca', icon: '🏦', label: 'Gestão de Banca' },
            { to: '/calculadoras/simulador-lucro', icon: '💹', label: 'Simulador de Lucro' },
            { to: '/calculadoras/roi', icon: '📈', label: 'ROI' },
            { to: '/calculadoras/odds', icon: '📊', label: 'Calculadora de Odds' },
            { to: '/calculadoras/aposta-simples', icon: '🎯', label: 'Aposta Simples' },
            { to: '/calculadoras/multipla-parlay', icon: '🎰', label: 'Múltipla / Parlay' },
            { to: '/calculadoras/arbitragem', icon: '💰', label: 'Arbitragem' },
            { to: '/calculadoras/conversor-odds', icon: '🔄', label: 'Conversor de Odds' },
          ].map((l, i) => (
            <Link
              key={i}
              to={l.to}
              className="flex items-center gap-2 px-3 py-3 rounded-xl text-xs font-medium transition-all duration-150"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(248,113,113,0.3)'; e.currentTarget.style.color = '#f87171'; }}
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

export default function Martingale() {
  const [stakeInicial, setStakeInicial] = useState('');
  const [rodadas, setRodadas] = useState('8');
  const [banca, setBanca] = useState('');

  const s = parseFloat(stakeInicial);
  const r = Math.min(parseInt(rodadas) || 1, 20);
  const b = parseFloat(banca);
  const valid = s > 0 && r >= 1;

  const rows = valid ? Array.from({ length: r }, (_, i) => {
    const stake = s * Math.pow(2, i);
    const acumulado = s * (Math.pow(2, i + 1) - 1);
    const percBanca = b > 0 ? (acumulado / b) * 100 : null;
    return { rodada: i + 1, stake, acumulado, lucro: s, percBanca };
  }) : [];

  const maxRisco = rows[rows.length - 1]?.acumulado ?? 0;
  const bancaEsgotada = b > 0 ? rows.findIndex(row => row.acumulado > b) : -1;

  const faqs = [
    { q: 'O que é a estratégia Martingale em apostas?', a: 'Martingale dobra o stake após cada derrota. A teoria é que um ganho eventual recupera todas as perdas mais o lucro inicial — mas o crescimento exponencial torna isso muito arriscado na prática.' },
    { q: 'Por que o Martingale é arriscado?', a: 'O stake cresce exponencialmente. 10 derrotas partindo de R$10 exigiriam R$10.240 na próxima aposta. Casas têm limites máximos que quebram a estratégia.' },
    { q: 'O Martingale funciona a longo prazo?', a: 'Não. Qualquer sequência suficientemente longa produzirá derrotas que esgotam a banca. O lucro esperado é negativo com odds que têm margem da casa.' },
    { q: 'Qual a probabilidade de 10 derrotas consecutivas?', a: 'Com odd 2.00 (50%), a chance é 0.097% — rara, mas em 1.000 sequências acontece pelo menos uma vez. Apostadores frequentes vivenciam isso inevitavelmente.' },
    { q: 'Existe variação mais segura?', a: 'Anti-Martingale (dobra após vitórias) e D\'Alembert (incremento linear) são menos explosivos. Mas a alternativa real é Kelly Criterion ou flat betting com value bets.' },
    { q: 'Como os limites das casas afetam o Martingale?', a: 'Quando o stake atinge o limite máximo da casa, você não pode mais dobrar. A estratégia quebra e você fica com todo o prejuízo acumulado sem recuperação.' },
    { q: 'O que é Fibonacci em apostas?', a: 'Sequência de stakes seguindo Fibonacci (1,1,2,3,5,8,13...) após derrotas. Cresce mais devagar que Martingale, mas ainda apresenta risco exponencial a longo prazo.' },
    { q: 'Qual a alternativa recomendada?', a: 'Kelly Criterion ou flat betting. Em vez de recuperar perdas, foque em value bets com edge positivo e gestão sustentável da banca.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Martingale"
      description="Simule a estratégia Martingale e visualize o crescimento exponencial do risco após derrotas consecutivas. Entenda os perigos antes de usar qualquer sistema de progressão."
      slug="martingale"
      faqs={faqs}
      schema={schema}
      explanation={<MartingaleExplanation />}
    >
      <div className="space-y-6">

        {/* Warning */}
        <div
          className="flex items-start gap-3 px-4 py-3 rounded-xl"
          style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)' }}
        >
          <span className="flex-shrink-0">⚠️</span>
          <p className="text-xs" style={{ color: 'var(--text-2)' }}>
            Calculadora educativa. O CalculaBet <strong style={{ color: '#f87171' }}>não recomenda</strong> o uso do Martingale como estratégia de apostas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Stake inicial (R$)</label>
            <input
              type="number"
              className="input-field"
              placeholder="ex: 10"
              min="1"
              value={stakeInicial}
              onChange={e => setStakeInicial(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Banca disponível (R$) <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>— opcional</span></label>
            <input
              type="number"
              className="input-field"
              placeholder="ex: 500"
              min="0"
              value={banca}
              onChange={e => setBanca(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="label">Derrotas consecutivas a simular: <strong style={{ color: '#22d3ee' }}>{r}</strong></label>
          <input
            type="range"
            min="1"
            max="20"
            value={rodadas}
            onChange={e => setRodadas(e.target.value)}
            className="w-full accent-cyan-400 mb-1"
          />
          <div className="flex justify-between text-xs" style={{ color: 'var(--text-3)' }}>
            <span>1 derrota</span><span>10</span><span>20 derrotas</span>
          </div>
        </div>

        {valid && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="result-box">
                <p className="result-value" style={{ color: 'var(--red)' }}>
                  R${maxRisco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="result-label">Risco total acumulado ({r} derrotas)</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: '#4ade80' }}>R${s.toFixed(2)}</p>
                <p className="result-label">Lucro se ganhar (sempre o stake inicial)</p>
              </div>
            </div>

            {bancaEsgotada >= 0 && (
              <div
                className="flex items-start gap-3 px-4 py-3 rounded-xl"
                style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)' }}
              >
                <span className="flex-shrink-0 text-sm">💥</span>
                <p className="text-xs" style={{ color: '#f87171' }}>
                  Com banca de R${b.toLocaleString('pt-BR')}, sua banca seria esgotada na <strong>{bancaEsgotada + 1}ª derrota</strong> — antes das {r} rodadas simuladas.
                </p>
              </div>
            )}

            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              <div
                className="grid grid-cols-4 px-4 py-2.5"
                style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}
              >
                {['Derrota #', 'Stake', 'Total arriscado', 'Lucro se ganhar'].map(h => (
                  <p key={h} className="text-xs font-semibold text-right first:text-left" style={{ color: 'var(--text-3)' }}>{h}</p>
                ))}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {rows.map((row, i) => {
                  const danger = i >= 7;
                  const esgotada = b > 0 && row.acumulado > b;
                  return (
                    <div
                      key={i}
                      className="grid grid-cols-4 px-4 py-3"
                      style={{
                        borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
                        background: esgotada ? 'rgba(248,113,113,0.08)' : danger ? 'rgba(248,113,113,0.03)' : 'transparent',
                      }}
                    >
                      <p className="text-xs font-medium" style={{ color: esgotada ? '#f87171' : danger ? '#fbbf24' : 'var(--text-2)' }}>
                        {row.rodada}{esgotada ? ' 💥' : ''}
                      </p>
                      <p className="text-xs text-right font-semibold tabular-nums" style={{ color: esgotada ? '#f87171' : 'var(--text-1)' }}>
                        R${row.stake.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs text-right tabular-nums" style={{ color: esgotada ? '#f87171' : danger ? '#fbbf24' : 'var(--text-2)' }}>
                        R${row.acumulado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        {row.percBanca !== null && (
                          <span className="ml-1 text-xs" style={{ color: 'var(--text-3)' }}>({row.percBanca.toFixed(0)}%)</span>
                        )}
                      </p>
                      <p className="text-xs text-right tabular-nums" style={{ color: '#4ade80' }}>
                        R${row.lucro.toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="rounded-xl px-4 py-3 text-xs"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-3)' }}
            >
              Após {r} derrotas, você precisaria apostar{' '}
              <strong style={{ color: '#f87171' }}>R${(s * Math.pow(2, r)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>{' '}
              na {r + 1}ª aposta para lucrar <strong style={{ color: '#4ade80' }}>R${s.toFixed(2)}</strong>.
              ROI do risco total: <strong>{(s / maxRisco * 100).toFixed(3)}%</strong>.
            </div>
          </>
        )}

        {!valid && (
          <div
            className="rounded-xl flex items-center justify-center py-8"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Informe o stake inicial para simular</p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
