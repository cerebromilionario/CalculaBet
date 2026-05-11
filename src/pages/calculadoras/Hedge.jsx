import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function Hedge() {
  const [stake, setStake] = useState('');
  const [oddOriginal, setOddOriginal] = useState('');
  const [oddHedge, setOddHedge] = useState('');
  const [modo, setModo] = useState('lucro-garantido');

  const s = parseFloat(stake);
  const oo = parseFloat(oddOriginal);
  const oh = parseFloat(oddHedge);
  const valid = s > 0 && oo > 1 && oh > 1;

  const retornoOriginal = valid ? s * oo : 0;
  const stakeHedge = valid ? retornoOriginal / oh : 0;
  const lucroSeOriginalGanha = valid ? retornoOriginal - s - stakeHedge : 0;
  const lucroSeHedgeGanha = valid ? stakeHedge * oh - stakeHedge - s : 0;

  const faqs = [
    { q: 'O que é hedge em apostas?', a: 'Hedge é apostar no lado oposto de uma aposta já realizada para garantir lucro ou reduzir perdas, independentemente do resultado.' },
    { q: 'Quando devo fazer hedge?', a: 'Quando sua odd original subiu (sua seleção está em desvantagem) para proteger parte da banca, ou quando a odd caiu muito e você quer garantir o lucro parcial.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Hedge"
      description="Calcule o stake ideal para fazer hedge e proteger sua banca ou garantir lucro parcial."
      slug="hedge"
      faqs={faqs}
      explanation={
        <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">O que é hedge em apostas</h2>
          <p>Hedge é a estratégia de apostar contra sua própria aposta para garantir um resultado positivo ou reduzir perdas. É amplamente usada em apostas ao vivo quando o cenário muda.</p>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Stake original (R$)</label>
            <input type="number" className="input-field" placeholder="100" min="0" value={stake} onChange={e => setStake(e.target.value)} />
          </div>
          <div>
            <label className="label">Odd original</label>
            <input type="number" className="input-field" placeholder="4.00" step="0.01" min="1.01" value={oddOriginal} onChange={e => setOddOriginal(e.target.value)} />
          </div>
          <div>
            <label className="label">Odd para hedge</label>
            <input type="number" className="input-field" placeholder="1.80" step="0.01" min="1.01" value={oddHedge} onChange={e => setOddHedge(e.target.value)} />
          </div>
        </div>

        {valid && (
          <div className="space-y-3 pt-2">
            <div className="bg-violet-900/20 border border-violet-700/40 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-1">Stake recomendado para hedge:</p>
              <p className="text-2xl font-bold text-violet-400">R${stakeHedge.toFixed(2)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="result-box">
                <p className={`result-value ${lucroSeOriginalGanha >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  R${lucroSeOriginalGanha.toFixed(2)}
                </p>
                <p className="result-label">Lucro se aposta original ganha</p>
              </div>
              <div className="result-box">
                <p className={`result-value ${lucroSeHedgeGanha >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  R${lucroSeHedgeGanha.toFixed(2)}
                </p>
                <p className="result-label">Lucro se hedge ganha</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
