import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function GestaoBanca() {
  const [banca, setBanca] = useState('');
  const [odd, setOdd] = useState('');
  const [prob, setProb] = useState('');
  const [metodo, setMetodo] = useState('kelly');
  const [pct, setPct] = useState('2');

  const b = parseFloat(banca);
  const o = parseFloat(odd);
  const p = parseFloat(prob) / 100;
  const pctN = parseFloat(pct) / 100;

  const validKelly = b > 0 && o > 1 && p > 0 && p < 1;
  const validFlat = b > 0 && pctN > 0;

  const kellyFrac = validKelly ? (p * (o - 1) - (1 - p)) / (o - 1) : 0;
  const kellyStake = validKelly && kellyFrac > 0 ? b * kellyFrac : 0;
  const flatStake = validFlat ? b * pctN : 0;

  const faqs = [
    { q: 'O que é critério de Kelly?', a: 'O critério de Kelly é uma fórmula matemática que calcula o percentual ideal da banca a apostar em cada evento, maximizando o crescimento da banca a longo prazo.' },
    { q: 'O que é gestão de banca flat?', a: 'Flat betting significa apostar sempre o mesmo percentual ou valor fixo da banca, independente das odds ou confiança na aposta. É a estratégia mais simples e segura.' },
    { q: 'Qual percentual da banca devo apostar?', a: 'Recomenda-se entre 1% e 5% por aposta para apostadores conservadores. O critério de Kelly pode sugerir mais, mas muitos apostadores usam 1/4 do Kelly para reduzir risco.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Gestão de Banca"
      description="Calcule o stake ideal usando Kelly Criterion, flat betting ou percentual fixo para proteger e fazer crescer sua banca."
      slug="gestao-banca"
      faqs={faqs}
      explanation={
        <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">Métodos de gestão de banca</h2>
          <ul className="space-y-2">
            <li><strong className="text-gray-300">Kelly Criterion:</strong> Calcula o % ideal com base na sua edge (vantagem). Requer estimar a probabilidade real do evento.</li>
            <li><strong className="text-gray-300">Flat Betting:</strong> Aposta sempre o mesmo % da banca. Simples e protege de perdas grandes.</li>
            <li><strong className="text-gray-300">% Fixo:</strong> Variação do flat betting onde você define o percentual manualmente.</li>
          </ul>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-2">
          {['kelly', 'flat', 'fixo'].map(m => (
            <button
              key={m}
              onClick={() => setMetodo(m)}
              className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${metodo === m ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
            >
              {m === 'kelly' ? 'Kelly' : m === 'flat' ? 'Flat 2%' : '% Fixo'}
            </button>
          ))}
        </div>

        <div>
          <label className="label">Banca atual (R$)</label>
          <input type="number" className="input-field" placeholder="1000" min="0" value={banca} onChange={e => setBanca(e.target.value)} />
        </div>

        {metodo === 'kelly' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Odd decimal</label>
              <input type="number" className="input-field" placeholder="2.50" step="0.01" min="1.01" value={odd} onChange={e => setOdd(e.target.value)} />
            </div>
            <div>
              <label className="label">Sua probabilidade estimada (%)</label>
              <input type="number" className="input-field" placeholder="55" min="1" max="99" value={prob} onChange={e => setProb(e.target.value)} />
            </div>
          </div>
        )}

        {(metodo === 'flat' || metodo === 'fixo') && (
          <div>
            <label className="label">Percentual da banca (%)</label>
            <input type="number" className="input-field" placeholder="2" min="0.1" max="50" step="0.1" value={pct} onChange={e => setPct(e.target.value)} />
          </div>
        )}

        {metodo === 'kelly' && validKelly && (
          <div className="space-y-3 pt-2">
            {kellyFrac <= 0 ? (
              <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-4">
                <p className="text-red-400 font-semibold">Sem edge nesta aposta</p>
                <p className="text-sm text-gray-400 mt-1">Kelly negativo indica que as odds não compensam o risco. Não aposte.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div className="result-box">
                  <p className="result-value">R${kellyStake.toFixed(2)}</p>
                  <p className="result-label">Stake Kelly</p>
                </div>
                <div className="result-box">
                  <p className="result-value text-violet-400">R${(kellyStake / 4).toFixed(2)}</p>
                  <p className="result-label">½ Kelly (conservador)</p>
                </div>
                <div className="result-box col-span-2">
                  <p className="result-value text-amber-400">{(kellyFrac * 100).toFixed(2)}%</p>
                  <p className="result-label">% da banca recomendado</p>
                </div>
              </div>
            )}
          </div>
        )}

        {(metodo === 'flat' || metodo === 'fixo') && validFlat && (
          <div className="pt-2">
            <div className="result-box">
              <p className="result-value">R${flatStake.toFixed(2)}</p>
              <p className="result-label">Stake recomendado ({pct}% da banca)</p>
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
