import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function Dutching() {
  const [selecoes, setSelecoes] = useState([{ odd: '', nome: '' }, { odd: '', nome: '' }]);
  const [banca, setBanca] = useState('');

  const atualizar = (i, campo, v) => { const s = [...selecoes]; s[i][campo] = v; setSelecoes(s); };
  const adicionar = () => setSelecoes([...selecoes, { odd: '', nome: '' }]);
  const remover = (i) => selecoes.length > 2 && setSelecoes(selecoes.filter((_, idx) => idx !== i));

  const oddsN = selecoes.map(s => parseFloat(s.odd)).filter(o => o > 1);
  const bancaN = parseFloat(banca);
  const valid = oddsN.length === selecoes.length && bancaN > 0;

  const totalInv = valid ? oddsN.reduce((acc, o) => acc + 1 / o, 0) : 0;
  const stakes = valid ? oddsN.map(o => bancaN / (o * totalInv)) : [];
  const retorno = valid && stakes[0] ? stakes[0] * oddsN[0] : 0;
  const lucro = valid ? retorno - bancaN : 0;
  const roi = valid && bancaN > 0 ? (lucro / bancaN * 100) : 0;

  const faqs = [
    { q: 'O que é dutching?', a: 'Distribuir o stake entre múltiplos resultados para obter o mesmo lucro independentemente de qual ocorra.' },
    { q: 'Diferença entre dutching e arbitragem?', a: 'Na arbitragem você garante lucro cobrindo todos os resultados em casas diferentes. No dutching, você cobre seleções de sua escolha para equalizar o retorno.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Dutching"
      description="Distribua sua banca entre múltiplos resultados para garantir o mesmo retorno em qualquer desfecho."
      slug="dutching"
      faqs={faqs}
      explanation={
        <div className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>Como funciona o dutching</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
            No dutching, você divide o stake entre várias seleções de forma proporcional às probabilidades implícitas. Se qualquer uma das seleções vencer, você recebe o mesmo retorno total.
          </p>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="space-y-2.5">
          {selecoes.map((s, i) => (
            <div key={i} className="flex items-end gap-3">
              <div className="grid grid-cols-2 gap-2 flex-1">
                <div>
                  <label className="label">Seleção {i + 1}</label>
                  <input type="text" className="input-field" placeholder="Ex: Time A" value={s.nome} onChange={e => atualizar(i, 'nome', e.target.value)} />
                </div>
                <div>
                  <label className="label">Odd</label>
                  <input type="number" className="input-field" placeholder="3.50" step="0.01" min="1.01" value={s.odd} onChange={e => atualizar(i, 'odd', e.target.value)} />
                </div>
              </div>
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

        <button onClick={adicionar} className="text-xs font-medium flex items-center gap-1.5" style={{ color: 'var(--cyan)' }}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Adicionar seleção
        </button>

        <div>
          <label className="label">Banca total (R$)</label>
          <input type="number" className="input-field" placeholder="500" min="0" value={banca} onChange={e => setBanca(e.target.value)} />
        </div>

        {valid ? (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="result-box">
                <p className="result-value">R${retorno.toFixed(2)}</p>
                <p className="result-label">Retorno (qualquer seleção)</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: lucro >= 0 ? '#4ade80' : 'var(--red)' }}>R${lucro.toFixed(2)}</p>
                <p className="result-label">Lucro / Prejuízo</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: '#818cf8' }}>{roi.toFixed(2)}%</p>
                <p className="result-label">ROI</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              <div className="px-4 py-2.5" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>Distribuição de stakes</p>
              </div>
              {stakes.map((st, i) => {
                const pct = (st / bancaN * 100);
                return (
                  <div key={i} className="px-4 py-3" style={{ borderBottom: i < stakes.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs" style={{ color: 'var(--text-2)' }}>
                        {selecoes[i].nome || `Seleção ${i + 1}`} · odd {parseFloat(selecoes[i].odd).toFixed(2)}
                      </span>
                      <span className="text-sm font-semibold tabular-nums" style={{ color: 'var(--text-1)' }}>R${st.toFixed(2)}</span>
                    </div>
                    <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="h-1 rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #22d3ee, #818cf8)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="rounded-xl flex items-center justify-center py-8" style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Preencha todas as odds e a banca</p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
