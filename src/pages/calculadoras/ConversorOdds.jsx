import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

function decimalToAmericana(d) {
  if (d >= 2) return `+${Math.round((d - 1) * 100)}`;
  return `${Math.round(-100 / (d - 1))}`;
}
function decimalToFrac(d) {
  const n = d - 1;
  const den = 100;
  const num = Math.round(n * den);
  const mdc = gcd(num, den);
  return `${num / mdc}/${den / mdc}`;
}
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function decimalToProb(d) { return ((1 / d) * 100).toFixed(2); }

function americanaToDecimal(a) {
  const v = parseFloat(a);
  if (v > 0) return 1 + v / 100;
  return 1 - 100 / v;
}

export default function ConversorOdds() {
  const [input, setInput] = useState('');
  const [tipo, setTipo] = useState('decimal');

  let decimal = null;
  try {
    if (tipo === 'decimal') decimal = parseFloat(input);
    else if (tipo === 'americana') decimal = americanaToDecimal(input);
    else if (tipo === 'fraccionaria') {
      const [n, d] = input.split('/').map(Number);
      decimal = 1 + n / d;
    } else if (tipo === 'probabilidade') {
      decimal = 100 / parseFloat(input);
    }
  } catch {}

  const valid = decimal && decimal > 1 && isFinite(decimal);

  const faqs = [
    { q: 'O que é odd decimal?', a: 'A odd decimal representa o retorno total por unidade apostada. Uma odd de 2.50 significa que você recebe R$2,50 para cada R$1,00 apostado, incluindo sua stake.' },
    { q: 'Como funciona a odd americana?', a: 'Odds positivas (+150) indicam o lucro em uma aposta de R$100. Odds negativas (-120) indicam quanto você precisa apostar para lucrar R$100.' },
    { q: 'O que é probabilidade implícita?', a: 'É a probabilidade de vitória que a odd representa. Uma odd de 2.0 equivale a 50% de probabilidade implícita.' },
  ];

  return (
    <CalcLayout
      title="Conversor de Odds"
      description="Converta odds entre os formatos decimal, americana (moneyline), fracionária e probabilidade implícita."
      slug="conversor-odds"
      faqs={faqs}
      explanation={
        <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">Como usar o conversor de odds</h2>
          <p>Digite o valor da odd no campo abaixo, selecione o formato de origem e veja a conversão instantânea para todos os outros formatos.</p>
          <h3 className="font-semibold text-white">Formatos de odds</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-gray-300">Decimal:</strong> Padrão na Europa e no Brasil. Ex: 2.50</li>
            <li><strong className="text-gray-300">Americana:</strong> Usada nos EUA. Ex: +150 ou -120</li>
            <li><strong className="text-gray-300">Fracionária:</strong> Padrão no Reino Unido. Ex: 3/2</li>
            <li><strong className="text-gray-300">Probabilidade:</strong> Chance implícita em %. Ex: 40%</li>
          </ul>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {['decimal', 'americana', 'fraccionaria', 'probabilidade'].map(t => (
            <button
              key={t}
              onClick={() => { setTipo(t); setInput(''); }}
              className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${tipo === t ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
            >
              {t === 'fraccionaria' ? 'Fracionária' : t === 'probabilidade' ? 'Prob. %' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div>
          <label className="label">
            Odd {tipo === 'fraccionaria' ? '(ex: 3/2)' : tipo === 'americana' ? '(ex: +150 ou -120)' : tipo === 'probabilidade' ? '(ex: 40)' : '(ex: 2.50)'}
          </label>
          <input
            type="text"
            className="input-field"
            placeholder={tipo === 'fraccionaria' ? '3/2' : tipo === 'americana' ? '+150' : tipo === 'probabilidade' ? '40' : '2.50'}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>

        {valid && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="result-box">
              <p className="result-value text-lg">{decimal.toFixed(3)}</p>
              <p className="result-label">Decimal</p>
            </div>
            <div className="result-box">
              <p className="result-value text-lg">{decimalToAmericana(decimal)}</p>
              <p className="result-label">Americana</p>
            </div>
            <div className="result-box">
              <p className="result-value text-lg">{decimalToFrac(decimal)}</p>
              <p className="result-label">Fracionária</p>
            </div>
            <div className="result-box">
              <p className="result-value text-lg">{decimalToProb(decimal)}%</p>
              <p className="result-label">Probabilidade</p>
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
