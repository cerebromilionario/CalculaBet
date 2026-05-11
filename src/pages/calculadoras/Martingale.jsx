import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function Martingale() {
  const [stakeInicial, setStakeInicial] = useState('');
  const [rodadas, setRodadas] = useState('8');

  const s = parseFloat(stakeInicial);
  const r = Math.min(parseInt(rodadas) || 1, 20);
  const valid = s > 0 && r >= 1;

  const rows = valid ? Array.from({ length: r }, (_, i) => {
    const stake = s * Math.pow(2, i);
    const acumulado = s * (Math.pow(2, i + 1) - 1);
    return { rodada: i + 1, stake, acumulado, lucro: s };
  }) : [];

  const maxRisco = rows[rows.length - 1]?.acumulado ?? 0;

  const faqs = [
    { q: 'O que é Martingale?', a: 'Estratégia de dobrar o stake após cada derrota, na expectativa de recuperar todas as perdas com um único lucro.' },
    { q: 'Por que o Martingale é arriscado?', a: 'Uma sequência de 10 derrotas partindo de R$10 exigiria R$10.240 na próxima aposta. O risco cresce exponencialmente.' },
    { q: 'Existe alternativa mais segura?', a: 'Sim: D\'Alembert (incremento linear), Anti-Martingale (dobra após vitórias) ou Kelly Criterion. Nenhuma elimina o risco, mas são menos explosivas.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Martingale"
      description="Simule a estratégia Martingale e visualize o crescimento exponencial do risco após derrotas consecutivas."
      slug="martingale"
      faqs={faqs}
      explanation={
        <div className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>Por que o Martingale é perigoso</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
            O Martingale parece infalível no curto prazo, mas o crescimento exponencial dos stakes rapidamente ultrapassa qualquer banca real. Casas impõem limites de apostas que bloqueiam a estratégia no momento mais crítico.
          </p>
          <div
            className="flex items-start gap-3 p-4 rounded-xl"
            style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)' }}
          >
            <span className="text-base flex-shrink-0 mt-0.5">⚠️</span>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
              O CalculaBet não recomenda Martingale. Use esta calculadora exclusivamente para compreender os riscos envolvidos.
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Stake inicial (R$)</label>
            <input type="number" className="input-field" placeholder="10" min="1" value={stakeInicial} onChange={e => setStakeInicial(e.target.value)} />
          </div>
          <div>
            <label className="label">Derrotas consecutivas a simular ({r})</label>
            <input type="range" min="1" max="20" value={rodadas} onChange={e => setRodadas(e.target.value)} className="w-full accent-cyan-400" />
            <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-3)' }}>
              <span>1</span><span>{r}</span><span>20</span>
            </div>
          </div>
        </div>

        {valid && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="result-box">
                <p className="result-value" style={{ color: 'var(--red)' }}>R${maxRisco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <p className="result-label">Risco total acumulado</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: '#4ade80' }}>R${s.toFixed(2)}</p>
                <p className="result-label">Lucro se ganhar (sempre R${s.toFixed(2)})</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              <div
                className="grid grid-cols-4 px-4 py-2.5"
                style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}
              >
                {['Derrota #', 'Stake', 'Total arriscado', 'Lucro se ganhar'].map(h => (
                  <p key={h} className="text-xs font-semibold text-right first:text-left" style={{ color: 'var(--text-3)' }}>{h}</p>
                ))}
              </div>
              <div className="max-h-64 overflow-y-auto">
                {rows.map((row, i) => {
                  const danger = i >= 7;
                  return (
                    <div
                      key={i}
                      className="grid grid-cols-4 px-4 py-3"
                      style={{
                        borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
                        background: danger ? 'rgba(248,113,113,0.04)' : 'transparent',
                      }}
                    >
                      <p className="text-xs" style={{ color: 'var(--text-2)' }}>{row.rodada}</p>
                      <p className="text-xs text-right font-medium tabular-nums" style={{ color: 'var(--text-1)' }}>
                        R${row.stake.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs text-right tabular-nums" style={{ color: danger ? 'var(--red)' : 'var(--text-2)' }}>
                        R${row.acumulado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs text-right tabular-nums" style={{ color: '#4ade80' }}>
                        R${row.lucro.toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </CalcLayout>
  );
}
