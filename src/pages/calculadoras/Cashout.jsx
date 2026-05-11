import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function Cashout() {
  const [stake, setStake] = useState('');
  const [oddOriginal, setOddOriginal] = useState('');
  const [oddAtual, setOddAtual] = useState('');
  const [cashoutCasa, setCashoutCasa] = useState('');

  const s = parseFloat(stake);
  const oo = parseFloat(oddOriginal);
  const oa = parseFloat(oddAtual);
  const cc = parseFloat(cashoutCasa);
  const valid = s > 0 && oo > 1 && oa > 1;

  const cashoutJusto = valid ? (s * oo) / oa : 0;
  const lucroSeCashout = valid ? cashoutJusto - s : 0;
  const lucroSeGanhar = valid ? s * oo - s : 0;
  const margemCasa = valid && cc > 0 ? ((cashoutJusto - cc) / cashoutJusto * 100) : null;

  const faqs = [
    { q: 'O que é cashout?', a: 'Opção de fechar uma aposta antes do evento terminar, recebendo parte do valor ou garantindo lucro parcial.' },
    { q: 'Como calcular o cashout justo?', a: 'Cashout justo = (Stake × Odd Original) ÷ Odd Atual. A casa sempre oferece menos, cobrando uma margem.' },
    { q: 'Quando fazer cashout?', a: 'Se a odd subiu muito (sua seleção está perdendo), cashout reduz a perda. Se caiu (está ganhando), você pode garantir lucro parcial ou aguardar.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Cashout"
      description="Calcule o valor justo do cashout e compare com o que a casa está oferecendo para decidir com inteligência."
      slug="cashout"
      faqs={faqs}
      explanation={
        <div className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>Como calcular o cashout justo</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
            O cashout justo é o valor que você deveria receber com base na odd atual. A casa sempre cobra uma margem sobre esse valor — normalmente entre 5% e 15%.
          </p>
          <p className="text-sm font-mono text-xs px-3 py-2 rounded-lg" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.1)', color: '#22d3ee' }}>
            Cashout justo = (Stake × Odd Original) ÷ Odd Atual
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
            <label className="label">Odd no momento da aposta</label>
            <input type="number" className="input-field" placeholder="3.00" step="0.01" min="1.01" value={oddOriginal} onChange={e => setOddOriginal(e.target.value)} />
          </div>
          <div>
            <label className="label">Odd atual no mercado</label>
            <input type="number" className="input-field" placeholder="1.80" step="0.01" min="1.01" value={oddAtual} onChange={e => setOddAtual(e.target.value)} />
          </div>
        </div>

        <div>
          <label className="label">Cashout oferecido pela casa (R$) — opcional</label>
          <input type="number" className="input-field" placeholder="Deixe em branco se não souber" min="0" value={cashoutCasa} onChange={e => setCashoutCasa(e.target.value)} />
        </div>

        {valid ? (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="result-box">
                <p className="result-value">R${cashoutJusto.toFixed(2)}</p>
                <p className="result-label">Cashout justo</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: lucroSeCashout >= 0 ? '#4ade80' : 'var(--red)' }}>
                  R${lucroSeCashout.toFixed(2)}
                </p>
                <p className="result-label">{lucroSeCashout >= 0 ? 'Lucro' : 'Prejuízo'} com cashout</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: '#818cf8' }}>R${lucroSeGanhar.toFixed(2)}</p>
                <p className="result-label">Lucro se ganhar</p>
              </div>
            </div>

            {margemCasa !== null && (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{
                  background: margemCasa > 10 ? 'rgba(248,113,113,0.06)' : 'rgba(251,191,36,0.06)',
                  border: `1px solid ${margemCasa > 10 ? 'rgba(248,113,113,0.2)' : 'rgba(251,191,36,0.15)'}`,
                }}
              >
                <span className="text-base">{margemCasa > 10 ? '⚠️' : 'ℹ️'}</span>
                <p className="text-xs" style={{ color: 'var(--text-2)' }}>
                  Margem da casa no cashout:{' '}
                  <strong style={{ color: margemCasa > 10 ? 'var(--red)' : '#fbbf24' }}>
                    {margemCasa.toFixed(1)}%
                  </strong>
                  {margemCasa > 10 ? ' — acima da média. Considere aguardar.' : ' — dentro do esperado.'}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-xl flex items-center justify-center py-10" style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Preencha stake e odds para calcular</p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
