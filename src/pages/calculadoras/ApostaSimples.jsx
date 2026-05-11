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
  const roi = valid ? (lucro / s) * 100 : 0;

  const faqs = [
    { q: 'O que é stake em apostas?', a: 'Stake é o valor apostado. Definir o stake corretamente é essencial para uma boa gestão de banca.' },
    { q: 'Como calcular o retorno de uma aposta?', a: 'Stake × Odd = Retorno total. Subtraia o stake para obter o lucro. Ex: R$50 × 2.20 = R$110 (R$60 de lucro).' },
    { q: 'O que é ROI em apostas?', a: 'Return on Investment: (Lucro ÷ Stake) × 100. Mede a eficiência das suas apostas.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Aposta Simples"
      description="Calcule instantaneamente o retorno total, lucro líquido e ROI de uma aposta simples."
      slug="aposta-simples"
      faqs={faqs}
      explanation={
        <div className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>Como calcular uma aposta simples</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Digite o valor que deseja apostar (stake) e a odd decimal oferecida pela casa. Você verá em tempo real o retorno total e o lucro esperado caso a aposta seja vencedora.
          </p>
          <p className="text-sm" style={{ color: 'var(--text-2)' }}>
            <strong style={{ color: 'var(--text-1)' }}>Exemplo:</strong> R$100 em odd 2.50 → R$250 de retorno → R$150 de lucro → ROI de 150%.
          </p>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Stake (R$)</label>
            <input type="number" className="input-field" placeholder="100" min="0" value={stake} onChange={e => setStake(e.target.value)} />
          </div>
          <div>
            <label className="label">Odd decimal</label>
            <input type="number" className="input-field" placeholder="2.50" step="0.01" min="1.01" value={odd} onChange={e => setOdd(e.target.value)} />
          </div>
        </div>

        {valid ? (
          <div className="grid grid-cols-3 gap-3">
            <div className="result-box">
              <p className="result-value">R${retorno.toFixed(2)}</p>
              <p className="result-label">Retorno total</p>
            </div>
            <div className="result-box">
              <p className="result-value" style={{ color: lucro >= 0 ? '#4ade80' : 'var(--red)' }}>R${lucro.toFixed(2)}</p>
              <p className="result-label">Lucro</p>
            </div>
            <div className="result-box">
              <p className="result-value" style={{ color: '#818cf8' }}>{roi.toFixed(1)}%</p>
              <p className="result-label">ROI</p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl flex items-center justify-center py-10" style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Preencha stake e odd para ver os resultados</p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
