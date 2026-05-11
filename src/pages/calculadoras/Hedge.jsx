import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function Hedge() {
  const [stake, setStake] = useState('');
  const [oddOriginal, setOddOriginal] = useState('');
  const [oddHedge, setOddHedge] = useState('');

  const s = parseFloat(stake);
  const oo = parseFloat(oddOriginal);
  const oh = parseFloat(oddHedge);
  const valid = s > 0 && oo > 1 && oh > 1;

  const retornoOriginal = valid ? s * oo : 0;
  const stakeHedge = valid ? retornoOriginal / oh : 0;
  const totalInvestido = valid ? s + stakeHedge : 0;
  const lucroSeOriginalGanha = valid ? retornoOriginal - totalInvestido : 0;
  const lucroSeHedgeGanha = valid ? stakeHedge * oh - totalInvestido : 0;
  const lucroMinimo = valid ? Math.min(lucroSeOriginalGanha, lucroSeHedgeGanha) : 0;

  const faqs = [
    { q: 'O que é hedge em apostas?', a: 'Apostar no lado oposto de uma aposta existente para garantir lucro ou reduzir perdas, independente do resultado.' },
    { q: 'Quando fazer hedge?', a: 'Quando sua odd subiu (você está perdendo) para minimizar perdas. Ou quando caiu muito e você quer garantir lucro parcial.' },
    { q: 'Hedge garante lucro?', a: 'Não necessariamente. Se as odds não forem favoráveis, o hedge pode garantir apenas perda menor. Use a calculadora para ver o resultado exato.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Hedge"
      description="Calcule o stake ideal para fazer hedge e proteger sua banca ou garantir lucro garantido."
      slug="hedge"
      faqs={faqs}
      explanation={
        <div className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>O que é hedge em apostas</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Hedge é apostar contra sua própria aposta. Se você apostou em um time e ele está ganhando com alta probabilidade, pode fazer hedge para garantir lucro mesmo que percam no final.
          </p>
        </div>
      }
    >
      <div className="space-y-6">
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
            <label className="label">Odd para hedge (lado oposto)</label>
            <input type="number" className="input-field" placeholder="1.80" step="0.01" min="1.01" value={oddHedge} onChange={e => setOddHedge(e.target.value)} />
          </div>
        </div>

        {valid ? (
          <div className="space-y-3">
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 rounded-xl"
              style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.15)' }}
            >
              <div>
                <p className="text-xs font-semibold mb-1" style={{ color: '#22d3ee' }}>Stake recomendado para hedge</p>
                <p className="text-3xl font-bold tabular-nums" style={{ color: 'var(--text-1)', letterSpacing: '-0.03em' }}>
                  R${stakeHedge.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs" style={{ color: 'var(--text-2)' }}>Total investido</p>
                <p className="text-lg font-semibold" style={{ color: 'var(--text-1)' }}>R${totalInvestido.toFixed(2)}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="result-box">
                <p className="result-value" style={{ color: lucroSeOriginalGanha >= 0 ? '#4ade80' : 'var(--red)' }}>
                  R${lucroSeOriginalGanha.toFixed(2)}
                </p>
                <p className="result-label">Se original ganha</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: lucroSeHedgeGanha >= 0 ? '#4ade80' : 'var(--red)' }}>
                  R${lucroSeHedgeGanha.toFixed(2)}
                </p>
                <p className="result-label">Se hedge ganha</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: lucroMinimo >= 0 ? '#4ade80' : 'var(--red)' }}>
                  R${lucroMinimo.toFixed(2)}
                </p>
                <p className="result-label">Mínimo garantido</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl flex items-center justify-center py-10" style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Preencha stake e odds para calcular o hedge</p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
