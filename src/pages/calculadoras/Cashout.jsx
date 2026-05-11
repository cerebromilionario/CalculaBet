import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function Cashout() {
  const [stake, setStake] = useState('');
  const [oddOriginal, setOddOriginal] = useState('');
  const [oddAtual, setOddAtual] = useState('');

  const s = parseFloat(stake);
  const oo = parseFloat(oddOriginal);
  const oa = parseFloat(oddAtual);
  const valid = s > 0 && oo > 1 && oa > 1;

  const cashoutJusto = valid ? (s * oo) / oa : 0;
  const lucroSeCashout = valid ? cashoutJusto - s : 0;
  const retornoPotencial = valid ? s * oo - s : 0;

  const faqs = [
    { q: 'O que é cashout em apostas?', a: 'Cashout é a opção de fechar uma aposta antes do evento terminar, recebendo parte do valor apostado de volta ou garantindo um lucro parcial.' },
    { q: 'Como calcular o valor justo do cashout?', a: 'Cashout justo = (Stake × Odd Original) ÷ Odd Atual. Se a casa oferecer menos, há uma margem da casa embutida.' },
    { q: 'Quando vale a pena fazer cashout?', a: 'Vale quando a odd da sua seleção subiu muito (seu time está perdendo) para minimizar perdas. Se a odd caiu (seu time está ganhando), pode ser mais lucrativo aguardar o resultado.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Cashout"
      description="Calcule o valor justo do cashout para decidir se vale fechar sua aposta antes do fim do evento."
      slug="cashout"
      faqs={faqs}
      explanation={
        <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">Como calcular o cashout justo</h2>
          <p>O cashout justo é calculado dividindo o retorno potencial da aposta pela odd atual do mercado. Se a casa oferecer menos que isso, há uma margem embutida (que sempre existe).</p>
          <p><strong className="text-gray-300">Fórmula:</strong> Cashout = (Stake × Odd Original) ÷ Odd Atual</p>
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
            <label className="label">Odd no momento da aposta</label>
            <input type="number" className="input-field" placeholder="3.00" step="0.01" min="1.01" value={oddOriginal} onChange={e => setOddOriginal(e.target.value)} />
          </div>
          <div>
            <label className="label">Odd atual no mercado</label>
            <input type="number" className="input-field" placeholder="2.00" step="0.01" min="1.01" value={oddAtual} onChange={e => setOddAtual(e.target.value)} />
          </div>
        </div>

        {valid && (
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-3 gap-3">
              <div className="result-box">
                <p className="result-value">R${cashoutJusto.toFixed(2)}</p>
                <p className="result-label">Cashout justo</p>
              </div>
              <div className={`result-box ${lucroSeCashout >= 0 ? '' : 'border-red-500/30'}`}>
                <p className={`result-value ${lucroSeCashout >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  R${lucroSeCashout.toFixed(2)}
                </p>
                <p className="result-label">{lucroSeCashout >= 0 ? 'Lucro com cashout' : 'Prejuízo com cashout'}</p>
              </div>
              <div className="result-box">
                <p className="result-value text-violet-400">R${retornoPotencial.toFixed(2)}</p>
                <p className="result-label">Lucro se ganhar</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Compare o cashout oferecido pela casa com o valor justo acima. Se for menor, há margem da casa.
            </p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
