import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function ROI() {
  const [apostas, setApostas] = useState([{ stake: '', retorno: '' }]);

  const adicionar = () => setApostas([...apostas, { stake: '', retorno: '' }]);
  const atualizar = (i, campo, v) => {
    const a = [...apostas];
    a[i][campo] = v;
    setApostas(a);
  };
  const remover = (i) => apostas.length > 1 && setApostas(apostas.filter((_, idx) => idx !== i));

  const totalStake = apostas.reduce((acc, a) => acc + (parseFloat(a.stake) || 0), 0);
  const totalRetorno = apostas.reduce((acc, a) => acc + (parseFloat(a.retorno) || 0), 0);
  const lucroLiquido = totalRetorno - totalStake;
  const roi = totalStake > 0 ? (lucroLiquido / totalStake) * 100 : 0;
  const valid = totalStake > 0;

  const faqs = [
    { q: 'O que é ROI em apostas esportivas?', a: 'ROI (Return on Investment) é o percentual de retorno sobre o total investido em apostas. Um ROI positivo indica lucro, negativo indica prejuízo.' },
    { q: 'Qual é um bom ROI em apostas?', a: 'Apostadores profissionais geralmente conseguem ROI entre 5% e 15% no longo prazo. Qualquer coisa acima de 20% é excepcional e difícil de manter.' },
    { q: 'Como calcular o ROI?', a: 'ROI = (Lucro Líquido ÷ Total Investido) × 100. Por exemplo: R$50 de lucro em R$1.000 apostados = ROI de 5%.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de ROI em Apostas"
      description="Calcule o retorno sobre investimento (ROI) das suas apostas esportivas para avaliar sua performance."
      slug="roi"
      faqs={faqs}
      explanation={
        <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">Como calcular seu ROI em apostas</h2>
          <p>Adicione cada aposta com o stake e o retorno recebido (0 se perdeu). O ROI consolidado mostrará sua performance geral como apostador.</p>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="space-y-3">
          {apostas.map((a, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="grid grid-cols-2 gap-2 flex-1">
                <div>
                  <label className="label">Stake #{i + 1} (R$)</label>
                  <input type="number" className="input-field" placeholder="100" min="0" value={a.stake} onChange={e => atualizar(i, 'stake', e.target.value)} />
                </div>
                <div>
                  <label className="label">Retorno recebido (R$)</label>
                  <input type="number" className="input-field" placeholder="0 se perdeu" min="0" value={a.retorno} onChange={e => atualizar(i, 'retorno', e.target.value)} />
                </div>
              </div>
              {apostas.length > 1 && (
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
          Adicionar aposta
        </button>

        {valid && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="result-box">
              <p className="result-value text-lg">R${totalStake.toFixed(2)}</p>
              <p className="result-label">Total apostado</p>
            </div>
            <div className="result-box">
              <p className="result-value text-lg">R${totalRetorno.toFixed(2)}</p>
              <p className="result-label">Total recebido</p>
            </div>
            <div className={`result-box ${lucroLiquido >= 0 ? '' : 'border-red-500/30'}`}>
              <p className={`result-value text-lg ${lucroLiquido >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                R${lucroLiquido.toFixed(2)}
              </p>
              <p className="result-label">Lucro líquido</p>
            </div>
            <div className={`result-box ${roi >= 0 ? '' : 'border-red-500/30'}`}>
              <p className={`result-value text-lg ${roi >= 0 ? 'text-violet-400' : 'text-red-400'}`}>
                {roi.toFixed(2)}%
              </p>
              <p className="result-label">ROI</p>
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
