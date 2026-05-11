import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function ROI() {
  const [apostas, setApostas] = useState([{ stake: '', retorno: '' }]);

  const adicionar = () => setApostas([...apostas, { stake: '', retorno: '' }]);
  const atualizar = (i, campo, v) => { const a = [...apostas]; a[i][campo] = v; setApostas(a); };
  const remover = (i) => apostas.length > 1 && setApostas(apostas.filter((_, idx) => idx !== i));

  const totalStake = apostas.reduce((acc, a) => acc + (parseFloat(a.stake) || 0), 0);
  const totalRetorno = apostas.reduce((acc, a) => acc + (parseFloat(a.retorno) || 0), 0);
  const lucroLiquido = totalRetorno - totalStake;
  const roi = totalStake > 0 ? (lucroLiquido / totalStake * 100) : 0;
  const winRate = totalStake > 0 ? (apostas.filter(a => parseFloat(a.retorno) > 0).length / apostas.length * 100) : 0;
  const valid = totalStake > 0;

  const faqs = [
    { q: 'O que é ROI em apostas?', a: 'Return on Investment: percentual de retorno sobre o total investido. ROI positivo = lucro, negativo = prejuízo.' },
    { q: 'Qual é um bom ROI?', a: 'Apostadores profissionais geralmente conseguem 5-15% no longo prazo. ROI > 20% é excepcional e difícil de manter.' },
    { q: 'Como calcular ROI?', a: 'ROI = (Lucro Líquido ÷ Total Apostado) × 100. Ex: R$50 de lucro em R$1.000 apostados = 5%.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de ROI em Apostas"
      description="Calcule o retorno sobre investimento (ROI) das suas apostas para medir sua performance real."
      slug="roi"
      faqs={faqs}
      explanation={
        <div className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>Como calcular seu ROI</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Adicione suas apostas com o stake e o retorno recebido (0 se perdeu). O ROI consolidado mostrará sua performance geral como apostador ao longo do período selecionado.
          </p>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="space-y-2.5">
          {apostas.map((a, i) => (
            <div key={i} className="flex items-end gap-3">
              <div className="grid grid-cols-2 gap-2 flex-1">
                <div>
                  <label className="label">Aposta #{i + 1} — Stake (R$)</label>
                  <input type="number" className="input-field" placeholder="100" min="0" value={a.stake} onChange={e => atualizar(i, 'stake', e.target.value)} />
                </div>
                <div>
                  <label className="label">Retorno recebido (R$)</label>
                  <input type="number" className="input-field" placeholder="0 se perdeu" min="0" value={a.retorno} onChange={e => atualizar(i, 'retorno', e.target.value)} />
                </div>
              </div>
              {apostas.length > 1 && (
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
          Adicionar aposta ({apostas.length} registradas)
        </button>

        {valid ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="result-box">
              <p className="result-value text-lg">R${totalStake.toFixed(2)}</p>
              <p className="result-label">Total apostado</p>
            </div>
            <div className="result-box">
              <p className="result-value text-lg">R${totalRetorno.toFixed(2)}</p>
              <p className="result-label">Total recebido</p>
            </div>
            <div className="result-box">
              <p className="result-value text-lg" style={{ color: lucroLiquido >= 0 ? '#4ade80' : 'var(--red)' }}>
                {lucroLiquido >= 0 ? '+' : ''}R${lucroLiquido.toFixed(2)}
              </p>
              <p className="result-label">Lucro líquido</p>
            </div>
            <div className="result-box">
              <p className="result-value text-lg" style={{ color: roi >= 0 ? '#818cf8' : 'var(--red)' }}>
                {roi >= 0 ? '+' : ''}{roi.toFixed(2)}%
              </p>
              <p className="result-label">ROI</p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl flex items-center justify-center py-8" style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Adicione apostas para calcular o ROI</p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
