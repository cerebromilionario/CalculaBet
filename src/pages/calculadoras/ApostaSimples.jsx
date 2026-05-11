import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function ApostaSimples() {
  const [stake, setStake] = useState('');
  const [odd, setOdd] = useState('');

  const s = parseFloat(stake);
  const o = parseFloat(odd);
  const valid = s > 0 && o > 1;
  const retorno = valid ? s * o : 0;
  const lucro = valid ? retorno - s : 0;
  const roi = valid ? ((lucro / s) * 100) : 0;

  const faqs = [
    { q: 'O que é stake em apostas?', a: 'Stake é o valor apostado em uma partida. Definir bem a stake é fundamental para uma boa gestão de banca.' },
    { q: 'Como calcular o retorno de uma aposta?', a: 'Multiplique o stake pela odd. Ex: R$50 × 2.20 = R$110 de retorno total (R$60 de lucro).' },
    { q: 'O que é ROI em apostas?', a: 'ROI (Retorno sobre Investimento) mede em % quanto você lucrou em relação ao que apostou.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Aposta Simples"
      description="Calcule o retorno total, lucro e ROI de uma aposta simples com stake e odd."
      slug="aposta-simples"
      faqs={faqs}
      explanation={
        <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">Como funciona a calculadora de aposta simples</h2>
          <p>Digite o valor que deseja apostar (stake) e a odd da aposta. A calculadora mostrará o retorno total, o lucro esperado e o ROI da operação.</p>
          <p><strong className="text-gray-300">Exemplo:</strong> Apostar R$100 em uma odd de 2.50 resulta em R$250 de retorno e R$150 de lucro.</p>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Stake (R$)</label>
            <input type="number" className="input-field" placeholder="100" min="0" value={stake} onChange={e => setStake(e.target.value)} />
          </div>
          <div>
            <label className="label">Odd Decimal</label>
            <input type="number" className="input-field" placeholder="2.50" step="0.01" min="1.01" value={odd} onChange={e => setOdd(e.target.value)} />
          </div>
        </div>

        {valid && (
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="result-box">
              <p className="result-value">R${retorno.toFixed(2)}</p>
              <p className="result-label">Retorno total</p>
            </div>
            <div className={`result-box ${lucro >= 0 ? '' : 'border-red-500/30'}`}>
              <p className={`result-value ${lucro >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>R${lucro.toFixed(2)}</p>
              <p className="result-label">Lucro</p>
            </div>
            <div className="result-box">
              <p className="result-value text-violet-400">{roi.toFixed(1)}%</p>
              <p className="result-label">ROI</p>
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
