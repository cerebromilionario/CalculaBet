import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function MultiplaParlay() {
  const [selecoes, setSelecoes] = useState([{ odd: '' }, { odd: '' }]);
  const [stake, setStake] = useState('');

  const atualizar = (i, v) => { const s = [...selecoes]; s[i].odd = v; setSelecoes(s); };
  const adicionar = () => setSelecoes([...selecoes, { odd: '' }]);
  const remover = (i) => selecoes.length > 2 && setSelecoes(selecoes.filter((_, idx) => idx !== i));

  const oddsValidas = selecoes.map(s => parseFloat(s.odd)).filter(o => o > 1);
  const oddTotal = oddsValidas.reduce((acc, o) => acc * o, 1);
  const s = parseFloat(stake);
  const valid = oddsValidas.length === selecoes.length && selecoes.length >= 2 && s > 0;
  const retorno = valid ? s * oddTotal : 0;
  const lucro = valid ? retorno - s : 0;

  const faqs = [
    { q: 'O que é aposta múltipla/parlay?', a: 'Combina duas ou mais seleções. Todas devem ser vencedoras. As odds se multiplicam, aumentando o potencial de ganho.' },
    { q: 'Qual o risco de uma aposta múltipla?', a: 'Alto. Se uma seleção perder, toda a aposta é perdida. Quanto mais seleções, maior o retorno potencial e menor a probabilidade de acertar.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Múltipla / Parlay"
      description="Some as odds de múltiplas seleções e calcule o retorno total de uma aposta combinada."
      slug="multipla-parlay"
      faqs={faqs}
      explanation={
        <div className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>Como funciona uma aposta múltipla</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Em uma múltipla, as odds se multiplicam. Três seleções com odds 1.80, 2.00 e 1.50 resultam em odd combinada de 5.40. O retorno é muito maior, mas todas as seleções precisam ganhar.
          </p>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="space-y-2.5">
          {selecoes.map((s, i) => (
            <div key={i} className="flex items-end gap-3">
              <div className="flex-1">
                <label className="label">Seleção {i + 1} — Odd decimal</label>
                <input type="number" className="input-field" placeholder="1.80" step="0.01" min="1.01" value={s.odd} onChange={e => atualizar(i, e.target.value)} />
              </div>
              {oddsValidas[i] > 1 && (
                <div className="mb-px px-2.5 py-2 rounded-lg text-xs font-medium flex-shrink-0" style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.15)', color: '#22d3ee' }}>
                  {((1 / parseFloat(s.odd)) * 100).toFixed(1)}%
                </div>
              )}
              {selecoes.length > 2 && (
                <button onClick={() => remover(i)} className="mb-px p-2.5 rounded-xl transition-colors" style={{ color: 'var(--red)', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)' }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        <button onClick={adicionar} className="text-xs font-medium flex items-center gap-1.5 transition-colors" style={{ color: 'var(--cyan)' }}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Adicionar seleção ({selecoes.length} selecionadas)
        </button>

        <div>
          <label className="label">Stake (R$)</label>
          <input type="number" className="input-field" placeholder="50" min="0" value={stake} onChange={e => setStake(e.target.value)} />
        </div>

        {valid ? (
          <div className="grid grid-cols-3 gap-3">
            <div className="result-box">
              <p className="result-value" style={{ color: '#22d3ee' }}>{oddTotal.toFixed(3)}</p>
              <p className="result-label">Odd total</p>
            </div>
            <div className="result-box">
              <p className="result-value">R${retorno.toFixed(2)}</p>
              <p className="result-label">Retorno total</p>
            </div>
            <div className="result-box">
              <p className="result-value" style={{ color: '#4ade80' }}>R${lucro.toFixed(2)}</p>
              <p className="result-label">Lucro</p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl flex items-center justify-center py-8" style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Preencha todas as odds e o stake</p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
