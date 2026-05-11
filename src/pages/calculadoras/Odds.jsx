import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function CalculadoraOdds() {
  const [stake, setStake] = useState('');
  const [odd, setOdd] = useState('');
  const [formato, setFormato] = useState('decimal');

  let oddDecimal = null;
  const o = parseFloat(odd);
  if (formato === 'decimal' && o > 1) oddDecimal = o;
  else if (formato === 'americana') {
    if (o > 0) oddDecimal = 1 + o / 100;
    else if (o < 0) oddDecimal = 1 - 100 / o;
  } else if (formato === 'fraccionaria') {
    const parts = odd.split('/');
    if (parts.length === 2) {
      const n = parseFloat(parts[0]);
      const d = parseFloat(parts[1]);
      if (d > 0) oddDecimal = 1 + n / d;
    }
  }

  const s = parseFloat(stake);
  const valid = s > 0 && oddDecimal && oddDecimal > 1;
  const retorno = valid ? s * oddDecimal : 0;
  const lucro = valid ? retorno - s : 0;
  const prob = valid ? (1 / oddDecimal * 100) : 0;

  const faqs = [
    { q: 'Como funciona a calculadora de odds?', a: 'Digite o valor apostado e a odd (em qualquer formato). A calculadora mostra o retorno total, o lucro esperado e a probabilidade implícita.' },
    { q: 'O que é probabilidade implícita?', a: 'É a probabilidade que a odd representa. Uma odd de 2.0 implica 50% de chance. Se você acredita que a chance real é maior, há valor na aposta.' },
    { q: 'Quais formatos de odds são aceitos?', a: 'Decimal (Europa/Brasil), Americana/Moneyline (EUA) e Fracionária (Reino Unido). Use o conversor de odds para transformar entre eles.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Odds"
      description="Calcule retorno, lucro e probabilidade implícita de qualquer aposta. Aceita odds decimal, americana e fracionária."
      slug="odds"
      faqs={faqs}
      explanation={
        <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">Como usar a calculadora de odds</h2>
          <p>A calculadora de odds é a ferramenta mais básica para apostadores. Informe o valor que deseja apostar e a odd oferecida pela casa. Você verá instantaneamente quanto receberá de volta e qual é o lucro esperado.</p>
          <h3 className="font-semibold text-white">Exemplos práticos</h3>
          <div className="bg-gray-800 rounded-xl p-4 space-y-2">
            <p>✅ R$50 × odd 2.80 = R$140 de retorno (R$90 de lucro)</p>
            <p>✅ R$200 × odd 1.50 = R$300 de retorno (R$100 de lucro)</p>
            <p>✅ R$100 × odd 5.00 = R$500 de retorno (R$400 de lucro)</p>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-2">
          {['decimal', 'americana', 'fraccionaria'].map(f => (
            <button
              key={f}
              onClick={() => { setFormato(f); setOdd(''); }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${formato === f ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
            >
              {f === 'fraccionaria' ? 'Fracionária' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Stake (R$)</label>
            <input type="number" className="input-field" placeholder="100" min="0" value={stake} onChange={e => setStake(e.target.value)} />
          </div>
          <div>
            <label className="label">
              Odd {formato === 'decimal' ? '(ex: 2.50)' : formato === 'americana' ? '(ex: +150 ou -120)' : '(ex: 3/2)'}
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

        {valid && (
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="result-box">
              <p className="result-value">R${retorno.toFixed(2)}</p>
              <p className="result-label">Retorno total</p>
            </div>
            <div className="result-box">
              <p className="result-value text-emerald-400">R${lucro.toFixed(2)}</p>
              <p className="result-label">Lucro</p>
            </div>
            <div className="result-box">
              <p className="result-value text-violet-400">{prob.toFixed(1)}%</p>
              <p className="result-label">Prob. implícita</p>
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
