import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function MultiplaParlay() {
  const [selecoes, setSelecoes] = useState([{ odd: '' }, { odd: '' }]);
  const [stake, setStake] = useState('');

  const atualizar = (i, v) => {
    const s = [...selecoes];
    s[i].odd = v;
    setSelecoes(s);
  };
  const adicionar = () => setSelecoes([...selecoes, { odd: '' }]);
  const remover = (i) => selecoes.length > 2 && setSelecoes(selecoes.filter((_, idx) => idx !== i));

  const oddsValidas = selecoes.map(s => parseFloat(s.odd)).filter(o => o > 1);
  const oddTotal = oddsValidas.reduce((acc, o) => acc * o, 1);
  const s = parseFloat(stake);
  const valid = oddsValidas.length === selecoes.length && selecoes.length >= 2 && s > 0;
  const retorno = valid ? s * oddTotal : 0;
  const lucro = valid ? retorno - s : 0;

  const faqs = [
    { q: 'O que é uma aposta múltipla/parlay?', a: 'É uma aposta que combina duas ou mais seleções. Todas precisam ser vencedoras para você receber. As odds se multiplicam, aumentando o potencial de ganho.' },
    { q: 'Qual é o risco de uma aposta múltipla?', a: 'Alto. Se apenas uma seleção perder, toda a aposta é perdida. Por isso múltiplas oferecem odds maiores.' },
    { q: 'Quantas seleções posso combinar?', a: 'A maioria das casas permite até 20 seleções. Porém, quanto mais seleções, menor a chance de acertar todas.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Múltipla / Parlay"
      description="Some odds de múltiplas seleções e calcule o retorno total da aposta combinada."
      slug="multipla-parlay"
      faqs={faqs}
      explanation={
        <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">Como calcular uma aposta múltipla</h2>
          <p>Adicione as odds de cada seleção. A odd total é o produto de todas elas. Multiplique pela sua stake para obter o retorno potencial.</p>
          <p><strong className="text-gray-300">Exemplo:</strong> Três seleções com odds 1.80, 2.00 e 1.50 resultam em odd combinada de 5.40.</p>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="space-y-3">
          {selecoes.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-1">
                <label className="label">Seleção {i + 1} – Odd</label>
                <input type="number" className="input-field" placeholder="1.80" step="0.01" min="1.01" value={s.odd} onChange={e => atualizar(i, e.target.value)} />
              </div>
              {selecoes.length > 2 && (
                <button onClick={() => remover(i)} className="mt-6 p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors">
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
          Adicionar seleção
        </button>

        <div>
          <label className="label">Stake (R$)</label>
          <input type="number" className="input-field" placeholder="50" min="0" value={stake} onChange={e => setStake(e.target.value)} />
        </div>

        {valid && (
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="result-box">
              <p className="result-value text-lg">{oddTotal.toFixed(3)}</p>
              <p className="result-label">Odd total</p>
            </div>
            <div className="result-box">
              <p className="result-value">R${retorno.toFixed(2)}</p>
              <p className="result-label">Retorno total</p>
            </div>
            <div className="result-box">
              <p className="result-value text-emerald-400">R${lucro.toFixed(2)}</p>
              <p className="result-label">Lucro</p>
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
