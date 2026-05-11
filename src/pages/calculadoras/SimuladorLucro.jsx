import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function SimuladorLucro() {
  const [banca, setBanca] = useState('');
  const [stakePerc, setStakePerc] = useState('2');
  const [odd, setOdd] = useState('2.00');
  const [winRate, setWinRate] = useState('55');
  const [apostas, setApostas] = useState('200');
  const [resultado, setResultado] = useState(null);
  const [historico, setHistorico] = useState([]);

  const b = parseFloat(banca);
  const sp = parseFloat(stakePerc) / 100;
  const o = parseFloat(odd);
  const wr = parseFloat(winRate) / 100;
  const n = Math.min(parseInt(apostas) || 1, 1000);
  const valid = b > 0 && sp > 0 && o > 1 && wr > 0 && wr < 1 && n >= 1;

  const ev = valid ? (wr * (o - 1) - (1 - wr)) * 100 : null;
  const evColor = ev === null ? 'var(--text-3)' : ev > 0 ? '#4ade80' : ev < 0 ? '#f87171' : '#fbbf24';

  const runSim = () => {
    if (!valid) return;
    let bancaAtual = b;
    const pontos = [{ aposta: 0, banca: bancaAtual }];
    const step = Math.max(1, Math.floor(n / 80));
    for (let i = 1; i <= n; i++) {
      const stake = bancaAtual * sp;
      const ganhou = Math.random() < wr;
      bancaAtual = Math.max(0, ganhou ? bancaAtual + stake * (o - 1) : bancaAtual - stake);
      if (i % step === 0 || i === n) pontos.push({ aposta: i, banca: bancaAtual });
      if (bancaAtual === 0) break;
    }
    return pontos;
  };

  const executar = () => {
    if (!valid) return;
    const pontos = runSim();
    setResultado(pontos);
    const bancaFinal = pontos[pontos.length - 1].banca;
    const roi = ((bancaFinal - b) / b) * 100;
    setHistorico(prev => [{ bancaFinal, roi, ruina: bancaFinal === 0 }, ...prev].slice(0, 5));
  };

  const bancaFinal = resultado?.[resultado.length - 1]?.banca ?? 0;
  const lucroTotal = bancaFinal - b;
  const maxBanca = resultado ? Math.max(...resultado.map(r => r.banca)) : 0;
  const minBanca = resultado ? Math.min(...resultado.map(r => r.banca)) : 0;
  const ruina = bancaFinal === 0;

  const presetsBanca = [500, 1000, 2000, 5000];

  const faqs = [
    { q: 'O que é o Simulador de Lucro?', a: 'Uma ferramenta que projeta como sua banca evolui ao longo de centenas de apostas, usando probabilidade estatística baseada no seu win rate e odds médias. Cada simulação é única — como um cenário real poderia se desenrolar.' },
    { q: 'O que é Monte Carlo em apostas?', a: 'Método que roda milhares de cenários aleatórios para estimar a distribuição de resultados possíveis. Aqui você vê um cenário por vez; rodando múltiplas vezes, você visualiza a variância real da sua estratégia.' },
    { q: 'O que é Expected Value (EV)?', a: 'EV ou Valor Esperado é o retorno médio por aposta no longo prazo. EV positivo (ex: +3%) significa que sua estratégia lucra em média. Fórmula: EV = (win rate × (odd − 1) − (1 − win rate)) × 100.' },
    { q: 'Win rate alto garante lucro?', a: 'Não. Um win rate de 60% com odds médias de 1.40 tem EV negativo (−4%). O que importa é a combinação entre win rate e odds. É possível lucrar com 45% de win rate em odds altas.' },
    { q: 'Por que os resultados variam a cada simulação?', a: 'Por variância estatística. Mesmo com EV positivo, sequências de derrotas são normais. Quanto menor o número de apostas, maior a influência da sorte. Com 1000+ apostas, a média se aproxima do EV teórico.' },
    { q: 'O que significa "ruína" na simulação?', a: 'Ruína acontece quando a banca chega a R$0,00. Com stake fixo em % da banca (Kelly ou flat), a ruína matemática é impossível — mas stakes muito altos podem aproximar a banca de zero rapidamente.' },
    { q: 'Qual stake percentual usar?', a: 'Apostadores conservadores usam 1–2% da banca. 2–5% é moderado. Acima de 5% é agressivo e aumenta muito o risco de ruin em sequências negativas, mesmo com EV positivo.' },
    { q: 'Como interpretar o gráfico de evolução?', a: 'Barras verdes mostram quando a banca estava acima do valor inicial. Barras vermelhas indicam banca abaixo do início. Uma sequência longa de barras vermelhas é normal — o importante é a tendência de longo prazo.' },
  ];

  return (
    <CalcLayout
      title="Simulador de Lucro em Apostas"
      description="Projete o crescimento da sua banca com simulação Monte Carlo. Configure win rate, odds médias e gestão de banca para ver cenários reais de lucro ou prejuízo."
      slug="simulador-lucro"
      faqs={faqs}
      explanation={
        <div className="space-y-6">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: 'Simulador de Lucro em Apostas',
                description: 'Simule centenas de apostas com Monte Carlo e veja como sua banca evolui com base em win rate, odds e gestão de stakes.',
                url: 'https://calculabet.com.br/calculadoras/simulador-lucro',
                applicationCategory: 'FinanceApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
              }),
            }}
          />
          <div>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-1)' }}>O que é simulação Monte Carlo em apostas</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Monte Carlo é um método estatístico que gera cenários aleatórios para estimar resultados possíveis. No contexto de apostas, você define seus parâmetros — win rate, odds médias, gestão de banca — e o simulador projeta como sua banca poderia evoluir ao longo de centenas de apostas.
            </p>
            <p className="text-sm leading-relaxed mt-2" style={{ color: 'var(--text-2)' }}>
              Cada clique em "Simular" gera um novo cenário. A variância entre simulações revela quanta sorte ou azar pode influenciar seus resultados no curto prazo — e como a lei dos grandes números nivela os resultados no longo prazo.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--text-1)' }}>O que é Expected Value (EV)</h3>
            <div className="rounded-xl p-4 space-y-3" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
              <p className="text-sm" style={{ color: 'var(--text-2)' }}>O EV (Valor Esperado) mede o retorno médio de cada aposta no longo prazo:</p>
              <div className="rounded-lg p-3 text-center font-mono text-sm" style={{ background: 'rgba(0,0,0,0.2)', color: '#22d3ee' }}>
                EV% = (Win Rate × (Odd − 1) − (1 − Win Rate)) × 100
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1">
                {[
                  { label: 'EV positivo', desc: 'Lucra no longo prazo', color: '#4ade80' },
                  { label: 'EV zero', desc: 'Empate matemático', color: '#fbbf24' },
                  { label: 'EV negativo', desc: 'Perde no longo prazo', color: '#f87171' },
                ].map(ev => (
                  <div key={ev.label} className="rounded-lg p-2 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                    <p className="text-xs font-semibold" style={{ color: ev.color }}>{ev.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{ev.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--text-1)' }}>Win rate vs. odds: a combinação que importa</h3>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              <div className="grid grid-cols-4 px-3 py-2" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                {['Win Rate', 'Odd média', 'EV/aposta', 'Resultado'].map(h => (
                  <p key={h} className="text-xs font-semibold" style={{ color: 'var(--text-3)' }}>{h}</p>
                ))}
              </div>
              {[
                { wr: '55%', odd: '2.00', ev: '+10%', res: 'Lucrativo', color: '#4ade80' },
                { wr: '50%', odd: '2.00', ev: '0%', res: 'Neutro', color: '#fbbf24' },
                { wr: '45%', odd: '2.00', ev: '−10%', res: 'Deficitário', color: '#f87171' },
                { wr: '40%', odd: '3.00', ev: '+20%', res: 'Lucrativo', color: '#4ade80' },
                { wr: '60%', odd: '1.40', ev: '−4%', res: 'Deficitário', color: '#f87171' },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-4 px-3 py-2.5" style={{ borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                  <p className="text-xs" style={{ color: 'var(--text-2)' }}>{row.wr}</p>
                  <p className="text-xs" style={{ color: 'var(--text-2)' }}>{row.odd}</p>
                  <p className="text-xs font-medium" style={{ color: row.color }}>{row.ev}</p>
                  <p className="text-xs" style={{ color: row.color }}>{row.res}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--text-1)' }}>Como interpretar os resultados</h3>
            <div className="space-y-2">
              {[
                { n: '1', t: 'Rode múltiplas simulações', d: 'Clique em Simular 5–10 vezes. Se a maioria dos cenários é lucrativa, sua estratégia tem EV positivo robusto.' },
                { n: '2', t: 'Observe a variância', d: 'Resultados muito diferentes entre simulações indicam alta variância — o que é normal em amostras pequenas ou com odds altas.' },
                { n: '3', t: 'Aumente o número de apostas', d: 'Com 1000 apostas, a banca final se aproxima do retorno teórico esperado pelo EV. Com 50 apostas, a sorte domina.' },
                { n: '4', t: 'Verifique o EV antes de simular', d: 'Se o EV for negativo, nenhuma gestão de banca transforma perdas em lucros no longo prazo. Primeiro, encontre value nas odds.' },
              ].map(s => (
                <div key={s.n} className="flex gap-3">
                  <div className="w-5 h-5 rounded-md flex-shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold"
                    style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)', color: '#22d3ee' }}>
                    {s.n}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>{s.t}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--text-1)' }}>Impacto do stake % nos resultados</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Conservador', range: '1–2%', desc: 'Baixa variância, crescimento lento, máxima proteção contra ruin', color: '#4ade80' },
                { label: 'Moderado', range: '3–5%', desc: 'Equilíbrio entre crescimento e risco. Sequências de 20 derrotas ainda recuperáveis', color: '#fbbf24' },
                { label: 'Agressivo', range: '6–20%', desc: 'Crescimento acelerado, mas risco elevado de ruin em sequências negativas curtas', color: '#f87171' },
              ].map(p => (
                <div key={p.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                  <p className="text-xs font-bold mb-1" style={{ color: p.color }}>{p.label}</p>
                  <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-1)' }}>{p.range}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--text-1)' }}>Ferramentas relacionadas</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Calculadora de ROI', href: '/calculadoras/roi' },
                { label: 'Gestão de Banca (Kelly)', href: '/calculadoras/gestao-banca' },
                { label: 'Martingale', href: '/calculadoras/martingale' },
                { label: 'Conversor de Odds', href: '/calculadoras/conversor-odds' },
                { label: 'Calculadora de Hedge', href: '/calculadoras/hedge' },
                { label: 'Aposta Simples', href: '/calculadoras/aposta-simples' },
              ].map(link => (
                <a key={link.href} href={link.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
                >
                  <span style={{ color: '#22d3ee' }}>→</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Banca inicial (R$)</label>
            <input type="number" className="input-field" placeholder="1.000" min="1" value={banca} onChange={e => setBanca(e.target.value)} />
            <div className="flex gap-2 mt-2 flex-wrap">
              {presetsBanca.map(v => (
                <button key={v} onClick={() => setBanca(String(v))}
                  className="text-xs px-2.5 py-1 rounded-lg transition-all"
                  style={{ background: banca === String(v) ? 'rgba(34,211,238,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${banca === String(v) ? 'rgba(34,211,238,0.3)' : 'var(--border)'}`, color: banca === String(v) ? '#22d3ee' : 'var(--text-3)' }}>
                  R${v.toLocaleString('pt-BR')}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Odd média</label>
            <input type="number" className="input-field" placeholder="2.00" step="0.01" min="1.01" value={odd} onChange={e => setOdd(e.target.value)} />
            <div className="flex gap-2 mt-2 flex-wrap">
              {['1.50', '1.80', '2.00', '3.00'].map(v => (
                <button key={v} onClick={() => setOdd(v)}
                  className="text-xs px-2.5 py-1 rounded-lg transition-all"
                  style={{ background: odd === v ? 'rgba(34,211,238,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${odd === v ? 'rgba(34,211,238,0.3)' : 'var(--border)'}`, color: odd === v ? '#22d3ee' : 'var(--text-3)' }}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Stake por aposta ({stakePerc}%)</label>
            <input type="range" min="0.5" max="20" step="0.5" value={stakePerc} onChange={e => setStakePerc(e.target.value)} className="w-full accent-cyan-400 mt-1" />
            <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-3)' }}>
              <span>0.5%</span><span style={{ color: parseFloat(stakePerc) > 5 ? '#fbbf24' : 'var(--text-3)' }}>{stakePerc}%</span><span>20%</span>
            </div>
          </div>
          <div>
            <label className="label">Win rate ({winRate}%)</label>
            <input type="range" min="10" max="90" step="1" value={winRate} onChange={e => setWinRate(e.target.value)} className="w-full accent-cyan-400 mt-1" />
            <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-3)' }}>
              <span>10%</span><span>{winRate}%</span><span>90%</span>
            </div>
          </div>
          <div>
            <label className="label">Nº de apostas ({n})</label>
            <input type="range" min="10" max="1000" step="10" value={apostas} onChange={e => setApostas(e.target.value)} className="w-full accent-cyan-400 mt-1" />
            <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-3)' }}>
              <span>10</span><span>{n}</span><span>1000</span>
            </div>
          </div>
        </div>

        {/* EV & params preview */}
        {valid && (
          <div
            className="flex flex-wrap items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: 'var(--text-3)' }}>EV por aposta:</span>
              <span className="text-sm font-bold" style={{ color: evColor }}>
                {ev >= 0 ? '+' : ''}{ev?.toFixed(1)}%
              </span>
              {ev > 0 && <span className="text-xs px-1.5 py-0.5 rounded-md font-medium" style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80' }}>Positivo</span>}
              {ev < 0 && <span className="text-xs px-1.5 py-0.5 rounded-md font-medium" style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171' }}>Negativo</span>}
              {ev === 0 && <span className="text-xs px-1.5 py-0.5 rounded-md font-medium" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}>Neutro</span>}
            </div>
            <div className="h-3 w-px" style={{ background: 'var(--border)' }} />
            {[
              { l: 'Stake', v: `R$${b > 0 ? (b * sp).toFixed(2) : '—'}` },
              { l: 'Retorno se ganhar', v: b > 0 ? `R$${(b * sp * (o - 1)).toFixed(2)}` : '—' },
            ].map(p => (
              <span key={p.l} className="text-xs" style={{ color: 'var(--text-3)' }}>
                {p.l}: <strong style={{ color: 'var(--text-1)' }}>{p.v}</strong>
              </span>
            ))}
          </div>
        )}

        <button
          onClick={executar}
          disabled={!valid}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Simular {n} apostas
        </button>

        {resultado && (
          <div className="space-y-4">
            {ruina && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)' }}>
                <span className="text-base">💀</span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#f87171' }}>Ruína — banca zerada</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>A banca chegou a R$0 antes de completar {n} apostas. Considere reduzir o stake %.</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3">
              <div className="result-box">
                <p className="result-value" style={{ color: ruina ? '#f87171' : 'var(--text-1)' }}>
                  R${bancaFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="result-label">Banca final</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: lucroTotal >= 0 ? '#4ade80' : '#f87171' }}>
                  {lucroTotal >= 0 ? '+' : ''}R${lucroTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="result-label">Lucro / Prejuízo</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: lucroTotal >= 0 ? '#818cf8' : '#f87171' }}>
                  {b > 0 ? ((lucroTotal / b) * 100).toFixed(1) : 0}%
                </p>
                <p className="result-label">ROI total</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="result-box">
                <p className="result-value text-base" style={{ color: '#4ade80' }}>
                  R${maxBanca.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
                <p className="result-label">Banca máxima atingida</p>
              </div>
              <div className="result-box">
                <p className="result-value text-base" style={{ color: '#f87171' }}>
                  R${minBanca.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
                <p className="result-label">Banca mínima atingida</p>
              </div>
            </div>

            {/* Chart */}
            <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)' }}>
              <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-2)' }}>Evolução da banca</p>
              <div className="flex items-end gap-px h-28">
                {resultado.map((p, i) => {
                  const range = (maxBanca - minBanca) || 1;
                  const pct = Math.max(2, ((p.banca - minBanca) / range) * 100);
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm transition-all"
                      style={{
                        height: `${pct}%`,
                        background: p.banca >= b ? 'rgba(74,222,128,0.5)' : 'rgba(248,113,113,0.5)',
                        minWidth: '2px',
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 text-xs" style={{ color: 'var(--text-3)' }}>
                <span>Início (R${b.toLocaleString('pt-BR')})</span>
                <span style={{ color: maxBanca > b ? '#4ade80' : '#f87171' }}>
                  Máx: R${maxBanca.toFixed(0)}
                </span>
                <span>Aposta {n}</span>
              </div>
            </div>

            {/* Histórico de simulações */}
            {historico.length > 1 && (
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <div className="px-4 py-2.5" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-3)' }}>Histórico das últimas simulações</p>
                </div>
                <div className="grid grid-cols-3 px-4 py-1.5" style={{ background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border)' }}>
                  {['Simulação', 'Banca final', 'ROI'].map(h => (
                    <p key={h} className="text-xs" style={{ color: 'var(--text-3)' }}>{h}</p>
                  ))}
                </div>
                {historico.map((h, i) => (
                  <div key={i} className="grid grid-cols-3 px-4 py-2.5" style={{ borderBottom: i < historico.length - 1 ? '1px solid var(--border)' : 'none', background: i === 0 ? 'rgba(34,211,238,0.03)' : 'transparent' }}>
                    <p className="text-xs" style={{ color: i === 0 ? '#22d3ee' : 'var(--text-3)' }}>
                      {i === 0 ? '● Atual' : `#${historico.length - i}`}
                    </p>
                    <p className="text-xs font-medium tabular-nums" style={{ color: h.ruina ? '#f87171' : 'var(--text-1)' }}>
                      {h.ruina ? '💀 Ruína' : `R$${h.bancaFinal.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
                    </p>
                    <p className="text-xs font-medium tabular-nums" style={{ color: h.roi >= 0 ? '#4ade80' : '#f87171' }}>
                      {h.roi >= 0 ? '+' : ''}{h.roi.toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
