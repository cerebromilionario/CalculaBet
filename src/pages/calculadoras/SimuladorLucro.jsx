import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function SimuladorLucro() {
  const [banca, setBanca] = useState('');
  const [stakePerc, setStakePerc] = useState('2');
  const [odd, setOdd] = useState('2.00');
  const [winRate, setWinRate] = useState('55');
  const [apostas, setApostas] = useState('200');
  const [resultado, setResultado] = useState(null);

  const b = parseFloat(banca);
  const sp = parseFloat(stakePerc) / 100;
  const o = parseFloat(odd);
  const wr = parseFloat(winRate) / 100;
  const n = Math.min(parseInt(apostas) || 1, 1000);
  const valid = b > 0 && sp > 0 && o > 1 && wr > 0 && wr < 1 && n >= 1;

  const executar = () => {
    if (!valid) return;
    let bancaAtual = b;
    const pontos = [{ aposta: 0, banca: bancaAtual }];
    const step = Math.max(1, Math.floor(n / 80));
    for (let i = 1; i <= n; i++) {
      const stake = bancaAtual * sp;
      const ganhou = Math.random() < wr;
      bancaAtual = Math.max(0, ganhou ? bancaAtual + stake * (o - 1) : bancaAtual - stake);
      if (i % step === 0 || i === n) pontos.push({ aposta: i, banca: bancaAtual });
    }
    setResultado(pontos);
  };

  const bancaFinal = resultado?.[resultado.length - 1]?.banca ?? 0;
  const lucroTotal = bancaFinal - b;
  const maxBanca = resultado ? Math.max(...resultado.map(r => r.banca)) : 0;
  const minBanca = resultado ? Math.min(...resultado.map(r => r.banca)) : 0;

  const faqs = [
    { q: 'Como funciona o simulador?', a: 'Simula uma sequência de apostas usando probabilidade aleatória com base no seu win rate. Cada clique em Simular gera um cenário diferente (Monte Carlo).' },
    { q: 'Os resultados são garantidos?', a: 'Não. É uma simulação probabilística. Resultados reais variam por variância natural, qualidade das escolhas e outros fatores.' },
  ];

  return (
    <CalcLayout
      title="Simulador de Lucro em Apostas"
      description="Projete o crescimento da sua banca ao longo de centenas de apostas com base em win rate, odds e gestão de banca."
      slug="simulador-lucro"
      faqs={faqs}
      explanation={
        <div className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>Como usar o simulador</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Configure sua banca inicial, stake por aposta, odds médias e win rate estimado. Cada simulação usa Monte Carlo — clique várias vezes para ver a distribuição de cenários possíveis.
          </p>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Banca inicial (R$)</label>
            <input type="number" className="input-field" placeholder="1.000" min="1" value={banca} onChange={e => setBanca(e.target.value)} />
          </div>
          <div>
            <label className="label">Stake por aposta ({stakePerc}%)</label>
            <input type="range" min="0.5" max="20" step="0.5" value={stakePerc} onChange={e => setStakePerc(e.target.value)} className="w-full accent-cyan-400 mt-3" />
          </div>
          <div>
            <label className="label">Odd média</label>
            <input type="number" className="input-field" placeholder="2.00" step="0.01" min="1.01" value={odd} onChange={e => setOdd(e.target.value)} />
          </div>
          <div>
            <label className="label">Win rate ({winRate}%)</label>
            <input type="range" min="10" max="90" step="1" value={winRate} onChange={e => setWinRate(e.target.value)} className="w-full accent-cyan-400 mt-3" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="label">Nº de apostas ({n})</label>
            <input type="range" min="10" max="1000" step="10" value={apostas} onChange={e => setApostas(e.target.value)} className="w-full accent-cyan-400 mt-3" />
          </div>
        </div>

        {/* Params preview */}
        <div className="flex flex-wrap gap-2">
          {[
            { l: 'Stake', v: `${stakePerc}%` },
            { l: 'Odd', v: parseFloat(odd).toFixed(2) },
            { l: 'Win rate', v: `${winRate}%` },
            { l: 'Apostas', v: n },
            { l: 'EV por aposta', v: valid ? `${((wr * (o - 1) - (1 - wr)) * 100).toFixed(1)}%` : '—' },
          ].map(p => (
            <span key={p.l} className="badge">
              <span style={{ color: 'var(--text-3)' }}>{p.l}:</span>
              <strong style={{ color: 'var(--text-1)' }}>{p.v}</strong>
            </span>
          ))}
        </div>

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
          <div className="space-y-4 animate-float-in">
            <div className="grid grid-cols-3 gap-3">
              <div className="result-box">
                <p className="result-value">R${bancaFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className="result-label">Banca final</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: lucroTotal >= 0 ? '#4ade80' : 'var(--red)' }}>
                  {lucroTotal >= 0 ? '+' : ''}R${lucroTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="result-label">Lucro / Prejuízo</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: lucroTotal >= 0 ? '#818cf8' : 'var(--red)' }}>
                  {b > 0 ? ((lucroTotal / b) * 100).toFixed(1) : 0}%
                </p>
                <p className="result-label">ROI total</p>
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
                        background: p.banca >= b
                          ? 'rgba(74,222,128,0.5)'
                          : 'rgba(248,113,113,0.5)',
                        minWidth: '2px',
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 text-xs" style={{ color: 'var(--text-3)' }}>
                <span>Início</span>
                <span style={{ color: maxBanca > b ? '#4ade80' : 'var(--red)' }}>
                  Máx: R${maxBanca.toFixed(0)}
                </span>
                <span>Aposta {n}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
