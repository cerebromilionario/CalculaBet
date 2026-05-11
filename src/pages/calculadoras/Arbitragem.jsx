import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function Arbitragem() {
  const [odds, setOdds] = useState(['', '']);
  const [banca, setBanca] = useState('');

  const atualizar = (i, v) => {
    const o = [...odds];
    o[i] = v;
    setOdds(o);
  };
  const adicionar = () => setOdds([...odds, '']);
  const remover = (i) => odds.length > 2 && setOdds(odds.filter((_, idx) => idx !== i));

  const oddsN = odds.map(o => parseFloat(o)).filter(o => o > 1);
  const bancaN = parseFloat(banca);
  const valid = oddsN.length === odds.length && oddsN.length >= 2 && bancaN > 0;

  const margem = valid ? oddsN.reduce((acc, o) => acc + 1 / o, 0) : null;
  const isArb = valid && margem < 1;
  const lucroGarantido = isArb ? bancaN * (1 / margem - 1) : 0;
  const stakes = valid && isArb ? oddsN.map(o => bancaN / (o * margem)) : [];

  const faqs = [
    { q: 'O que é arbitragem em apostas?', a: 'Arbitragem (ou "sure bet") ocorre quando as odds de diferentes casas permitem apostar em todos os resultados e garantir lucro independentemente do resultado.' },
    { q: 'Como identificar uma oportunidade de arbitragem?', a: 'Some os inversos das odds (1/odd) de cada resultado. Se o total for menor que 1 (100%), existe arbitragem.' },
    { q: 'A arbitragem é permitida nas casas de apostas?', a: 'Tecnicamente sim, mas muitas casas limitam ou suspendem contas de apostadores que praticam arbitragem regularmente.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Arbitragem"
      description="Identifique oportunidades de arbitragem (sure bet) e calcule como distribuir sua banca para lucro garantido."
      slug="arbitragem"
      faqs={faqs}
      explanation={
        <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">O que é arbitragem em apostas esportivas</h2>
          <p>A arbitragem ocorre quando as odds em diferentes casas cobrem todos os resultados possíveis e ainda garantem lucro. Isso acontece quando há divergência de opinião entre casas diferentes.</p>
          <p><strong className="text-gray-300">Como calcular:</strong> Some 1/odd de cada resultado. Se o total for menor que 1, há arbitragem. O lucro é proporcional à diferença para 1.</p>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="space-y-3">
          {odds.map((o, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-1">
                <label className="label">Resultado {i + 1} – Odd</label>
                <input type="number" className="input-field" placeholder="2.10" step="0.01" min="1.01" value={o} onChange={e => atualizar(i, e.target.value)} />
              </div>
              {odds.length > 2 && (
                <button onClick={() => remover(i)} className="mt-6 p-2 text-red-400 hover:text-red-300 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        <button onClick={adicionar} className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Adicionar resultado
        </button>

        <div>
          <label className="label">Banca total (R$)</label>
          <input type="number" className="input-field" placeholder="1000" min="0" value={banca} onChange={e => setBanca(e.target.value)} />
        </div>

        {valid && (
          <div className="space-y-3 pt-2">
            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl ${isArb ? 'bg-emerald-900/30 border border-emerald-700/50' : 'bg-red-900/30 border border-red-700/50'}`}>
              <span className="text-xl">{isArb ? '✅' : '❌'}</span>
              <div>
                <p className={`font-semibold ${isArb ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isArb ? 'Arbitragem encontrada!' : 'Sem arbitragem'}
                </p>
                <p className="text-xs text-gray-400">Margem: {(margem * 100).toFixed(2)}% {isArb ? '(abaixo de 100%)' : '(acima de 100%)'}</p>
              </div>
            </div>

            {isArb && (
              <div className="grid grid-cols-2 gap-3">
                <div className="result-box">
                  <p className="result-value">R${lucroGarantido.toFixed(2)}</p>
                  <p className="result-label">Lucro garantido</p>
                </div>
                <div className="result-box">
                  <p className="result-value text-violet-400">{((lucroGarantido / bancaN) * 100).toFixed(2)}%</p>
                  <p className="result-label">ROI</p>
                </div>
              </div>
            )}

            {isArb && stakes.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-4 space-y-2">
                <p className="text-sm font-semibold text-white mb-2">Distribuição de stakes</p>
                {stakes.map((s, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-400">Resultado {i + 1} (odd {parseFloat(odds[i]).toFixed(2)}):</span>
                    <span className="text-white font-medium">R${s.toFixed(2)}</span>
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
