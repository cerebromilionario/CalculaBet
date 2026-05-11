import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function SimuladorLucro() {
  const [banca, setBanca] = useState('');
  const [stakePerc, setStakePerc] = useState('2');
  const [odd, setOdd] = useState('2.00');
  const [winRate, setWinRate] = useState('55');
  const [apostas, setApostas] = useState('100');

  const b = parseFloat(banca);
  const sp = parseFloat(stakePerc) / 100;
  const o = parseFloat(odd);
  const wr = parseFloat(winRate) / 100;
  const n = parseInt(apostas);

  const valid = b > 0 && sp > 0 && o > 1 && wr > 0 && wr < 1 && n >= 1 && n <= 1000;

  const simular = () => {
    if (!valid) return [];
    let bancaAtual = b;
    const pontos = [{ aposta: 0, banca: bancaAtual }];
    const step = Math.max(1, Math.floor(n / 50));
    for (let i = 1; i <= n; i++) {
      const stake = bancaAtual * sp;
      const ganhou = Math.random() < wr;
      bancaAtual = ganhou ? bancaAtual + stake * (o - 1) : bancaAtual - stake;
      if (i % step === 0 || i === n) pontos.push({ aposta: i, banca: bancaAtual });
    }
    return pontos;
  };

  const [resultado, setResultado] = useState(null);

  const executar = () => {
    if (valid) setResultado(simular());
  };

  const lucroTotal = resultado ? resultado[resultado.length - 1]?.banca - b : 0;
  const bancaFinal = resultado ? resultado[resultado.length - 1]?.banca : 0;

  const faqs = [
    { q: 'Para que serve o simulador de lucro?', a: 'Para entender como sua banca evoluiria ao longo de um período de apostas, dado um win rate e odds médias. É uma simulação Monte Carlo simplificada.' },
    { q: 'O simulador garante resultados reais?', a: 'Não. É uma simulação baseada em probabilidades. Resultados reais variam por fatores de variância, sequências de perdas e outros.' },
  ];

  return (
    <CalcLayout
      title="Simulador de Lucro em Apostas"
      description="Projete o crescimento da sua banca ao longo de várias apostas com base em win rate, odds e gestão de banca."
      slug="simulador-lucro"
      faqs={faqs}
      explanation={
        <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">Como usar o simulador</h2>
          <p>Informe sua banca inicial, o percentual apostado por evento, as odds médias esperadas, seu win rate estimado e o número de apostas a simular. Cada clique em "Simular" gera um cenário diferente.</p>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Banca inicial (R$)</label>
            <input type="number" className="input-field" placeholder="1000" min="1" value={banca} onChange={e => setBanca(e.target.value)} />
          </div>
          <div>
            <label className="label">Stake por aposta (%)</label>
            <input type="number" className="input-field" placeholder="2" min="0.1" max="50" step="0.1" value={stakePerc} onChange={e => setStakePerc(e.target.value)} />
          </div>
          <div>
            <label className="label">Odd média</label>
            <input type="number" className="input-field" placeholder="2.00" step="0.01" min="1.01" value={odd} onChange={e => setOdd(e.target.value)} />
          </div>
          <div>
            <label className="label">Win rate (%)</label>
            <input type="number" className="input-field" placeholder="55" min="1" max="99" value={winRate} onChange={e => setWinRate(e.target.value)} />
          </div>
          <div>
            <label className="label">Nº de apostas (máx 1000)</label>
            <input type="number" className="input-field" placeholder="100" min="1" max="1000" value={apostas} onChange={e => setApostas(e.target.value)} />
          </div>
        </div>

        <button onClick={executar} disabled={!valid} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
          Simular
        </button>

        {resultado && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-3 gap-3">
              <div className="result-box">
                <p className="result-value">R${bancaFinal.toFixed(2)}</p>
                <p className="result-label">Banca final</p>
              </div>
              <div className={`result-box ${lucroTotal >= 0 ? '' : 'border-red-500/30'}`}>
                <p className={`result-value ${lucroTotal >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {lucroTotal >= 0 ? '+' : ''}R${lucroTotal.toFixed(2)}
                </p>
                <p className="result-label">Lucro / Prejuízo</p>
              </div>
              <div className="result-box">
                <p className={`result-value ${lucroTotal >= 0 ? 'text-violet-400' : 'text-red-400'}`}>
                  {b > 0 ? ((lucroTotal / b) * 100).toFixed(1) : 0}%
                </p>
                <p className="result-label">ROI total</p>
              </div>
            </div>

            {/* Mini chart using divs */}
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-sm font-semibold text-white mb-3">Evolução da banca</p>
              <div className="flex items-end gap-0.5 h-32">
                {resultado.map((p, i) => {
                  const max = Math.max(...resultado.map(r => r.banca));
                  const min = Math.min(...resultado.map(r => r.banca), 0);
                  const range = max - min || 1;
                  const height = ((p.banca - min) / range) * 100;
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-sm ${p.banca >= b ? 'bg-emerald-500/70' : 'bg-red-500/70'}`}
                      style={{ height: `${Math.max(2, height)}%` }}
                      title={`Aposta ${p.aposta}: R$${p.banca.toFixed(2)}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
