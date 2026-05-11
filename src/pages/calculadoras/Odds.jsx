import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

function americanaToDecimal(a) {
  const v = parseFloat(a);
  if (v > 0) return 1 + v / 100;
  if (v < 0) return 1 - 100 / v;
  return null;
}

export default function CalculadoraOdds() {
  const [stake, setStake] = useState('');
  const [odd, setOdd] = useState('');
  const [formato, setFormato] = useState('decimal');

  let oddDecimal = null;
  const o = parseFloat(odd);
  if (formato === 'decimal' && o > 1) oddDecimal = o;
  else if (formato === 'americana' && odd !== '') oddDecimal = americanaToDecimal(odd);
  else if (formato === 'fraccionaria') {
    const parts = odd.split('/');
    if (parts.length === 2) {
      const n = parseFloat(parts[0]), d = parseFloat(parts[1]);
      if (d > 0) oddDecimal = 1 + n / d;
    }
  }

  const s = parseFloat(stake);
  const valid = s > 0 && oddDecimal && oddDecimal > 1;
  const retorno = valid ? s * oddDecimal : 0;
  const lucro = valid ? retorno - s : 0;
  const prob = valid ? (1 / oddDecimal * 100) : 0;

  const faqs = [
    { q: 'Como funciona a calculadora de odds?', a: 'Digite o valor apostado (stake) e a odd. A calculadora calcula instantaneamente o retorno total, lucro e probabilidade implícita.' },
    { q: 'O que é probabilidade implícita?', a: 'É a chance que a odd representa. Odd 2.0 = 50%. Se você acredita que a chance real é maior, há valor (value) na aposta.' },
    { q: 'Quais formatos de odds são aceitos?', a: 'Decimal (Europa/Brasil), Americana/Moneyline (EUA) e Fracionária (Reino Unido).' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Odds"
      description="Calcule o retorno total, lucro e probabilidade implícita de qualquer aposta. Suporte a odds decimal, americana e fracionária."
      slug="odds"
      faqs={faqs}
      explanation={
        <div className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>Como usar a calculadora de odds</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
            A calculadora de odds é a ferramenta mais fundamental para apostadores. Informe o valor apostado e a odd para ver instantaneamente quanto você receberá de volta e qual é o lucro esperado.
          </p>
          <div
            className="rounded-xl p-4 space-y-2"
            style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.1)' }}
          >
            <p className="text-xs font-semibold mb-2" style={{ color: '#22d3ee' }}>Exemplos práticos</p>
            {[
              'R$50 × odd 2.80 = R$140 retorno (R$90 lucro)',
              'R$200 × odd 1.50 = R$300 retorno (R$100 lucro)',
              'R$100 × odd 5.00 = R$500 retorno (R$400 lucro)',
            ].map((ex, i) => (
              <p key={i} className="text-xs" style={{ color: 'var(--text-2)' }}>→ {ex}</p>
            ))}
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Format tabs */}
        <div>
          <p className="label">Formato da odd</p>
          <div
            className="inline-flex rounded-xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: '3px' }}
          >
            {[
              { id: 'decimal', label: 'Decimal' },
              { id: 'americana', label: 'Americana' },
              { id: 'fraccionaria', label: 'Fracionária' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => { setFormato(f.id); setOdd(''); }}
                className="px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                style={{
                  background: formato === f.id ? 'rgba(34,211,238,0.12)' : 'transparent',
                  color: formato === f.id ? '#22d3ee' : 'var(--text-2)',
                  border: formato === f.id ? '1px solid rgba(34,211,238,0.2)' : '1px solid transparent',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Stake (R$)</label>
            <input type="number" className="input-field" placeholder="100" min="0" value={stake} onChange={e => setStake(e.target.value)} />
          </div>
          <div>
            <label className="label">
              Odd {formato === 'decimal' ? '— ex: 2.50' : formato === 'americana' ? '— ex: +150 ou -120' : '— ex: 3/2'}
            </label>
            <input
              type={formato === 'fraccionaria' ? 'text' : 'number'}
              className="input-field"
              placeholder={formato === 'decimal' ? '2.50' : formato === 'americana' ? '+150' : '3/2'}
              value={odd}
              onChange={e => setOdd(e.target.value)}
            />
          </div>
        </div>

        {valid ? (
          <div className="grid grid-cols-3 gap-3">
            <div className="result-box">
              <p className="result-value">R${retorno.toFixed(2)}</p>
              <p className="result-label">Retorno total</p>
            </div>
            <div className="result-box">
              <p className="result-value" style={{ color: lucro >= 0 ? '#4ade80' : 'var(--red)' }}>
                R${lucro.toFixed(2)}
              </p>
              <p className="result-label">Lucro</p>
            </div>
            <div className="result-box">
              <p className="result-value" style={{ color: '#818cf8' }}>{prob.toFixed(1)}%</p>
              <p className="result-label">Prob. implícita</p>
            </div>
          </div>
        ) : (
          <div
            className="rounded-xl flex items-center justify-center py-10"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Preencha stake e odd para ver os resultados</p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
