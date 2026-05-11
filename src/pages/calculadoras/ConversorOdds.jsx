import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function decimalToAmericana(d) {
  if (d >= 2) return `+${Math.round((d - 1) * 100)}`;
  return `${Math.round(-100 / (d - 1))}`;
}
function decimalToFrac(d) {
  const num = Math.round((d - 1) * 100);
  const den = 100;
  const g = gcd(num, den);
  return `${num / g}/${den / g}`;
}
function americanaToDecimal(a) {
  const v = parseFloat(a);
  if (v > 0) return 1 + v / 100;
  if (v < 0) return 1 - 100 / v;
  return null;
}

const TIPOS = [
  { id: 'decimal', label: 'Decimal', placeholder: '2.50', ex: 'Ex: 2.50' },
  { id: 'americana', label: 'Americana', placeholder: '+150', ex: 'Ex: +150 ou -120' },
  { id: 'fraccionaria', label: 'Fracionária', placeholder: '3/2', ex: 'Ex: 3/2' },
  { id: 'probabilidade', label: 'Probabilidade %', placeholder: '40', ex: 'Ex: 40 (para 40%)' },
];

export default function ConversorOdds() {
  const [input, setInput] = useState('');
  const [tipo, setTipo] = useState('decimal');

  let decimal = null;
  try {
    if (tipo === 'decimal') { const v = parseFloat(input); if (v > 1) decimal = v; }
    else if (tipo === 'americana') decimal = americanaToDecimal(input);
    else if (tipo === 'fraccionaria') {
      const [n, d] = input.split('/').map(Number);
      if (d > 0) decimal = 1 + n / d;
    } else if (tipo === 'probabilidade') {
      const p = parseFloat(input);
      if (p > 0 && p < 100) decimal = 100 / p;
    }
  } catch {}

  const valid = decimal && decimal > 1 && isFinite(decimal);

  const conversoes = valid ? [
    { label: 'Decimal', value: decimal.toFixed(3), desc: 'Padrão Europa / Brasil' },
    { label: 'Americana', value: decimalToAmericana(decimal), desc: 'Padrão EUA / Moneyline' },
    { label: 'Fracionária', value: decimalToFrac(decimal), desc: 'Padrão Reino Unido' },
    { label: 'Probabilidade', value: `${(1 / decimal * 100).toFixed(2)}%`, desc: 'Chance implícita' },
  ] : [];

  const faqs = [
    { q: 'O que é odd decimal?', a: 'Representa o retorno total por unidade apostada. Odd 2.50 = você recebe R$2,50 para cada R$1,00 apostado, incluindo o stake.' },
    { q: 'Como funciona odd americana?', a: 'Positiva (+150): lucro em R$100 apostados. Negativa (-120): quanto apostar para lucrar R$100.' },
    { q: 'O que é probabilidade implícita?', a: 'A probabilidade de vitória que a odd representa. Odd 2.0 = 50% de probabilidade implícita.' },
  ];

  return (
    <CalcLayout
      title="Conversor de Odds"
      description="Converta odds entre decimal, americana (moneyline), fracionária e probabilidade implícita instantaneamente."
      slug="conversor-odds"
      faqs={faqs}
      explanation={
        <div className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>Formatos de odds explicados</h2>
          <div className="space-y-3">
            {[
              { t: 'Decimal (Europa/Brasil)', d: 'O mais simples: retorno total por unidade. Odd 3.0 = triplica o stake.' },
              { t: 'Americana (Moneyline)', d: 'Odds positivas (+150): lucro por R$100. Negativas (-120): quanto apostar para lucrar R$100.' },
              { t: 'Fracionária (UK)', d: '3/2 significa que você ganha 3 partes para cada 2 apostadas. Equivale a odd decimal 2.5.' },
            ].map((f, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-5 h-5 rounded-md flex-shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)', color: '#22d3ee' }}>{i+1}</div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>{f.t}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Type tabs */}
        <div>
          <p className="label">Converter de</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TIPOS.map(t => (
              <button
                key={t.id}
                onClick={() => { setTipo(t.id); setInput(''); }}
                className="px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 text-center"
                style={{
                  background: tipo === t.id ? 'rgba(34,211,238,0.08)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${tipo === t.id ? 'rgba(34,211,238,0.25)' : 'var(--border)'}`,
                  color: tipo === t.id ? '#22d3ee' : 'var(--text-2)',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label">{TIPOS.find(t => t.id === tipo)?.ex}</label>
          <input
            type={tipo === 'fraccionaria' ? 'text' : 'number'}
            className="input-field text-lg"
            placeholder={TIPOS.find(t => t.id === tipo)?.placeholder}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>

        {valid ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {conversoes.map((c, i) => (
              <div
                key={i}
                className="result-box"
                style={{
                  background: c.label === TIPOS.find(t => t.id === tipo)?.label
                    ? 'rgba(34,211,238,0.05)'
                    : undefined,
                  borderColor: c.label === TIPOS.find(t => t.id === tipo)?.label
                    ? 'rgba(34,211,238,0.2)'
                    : undefined,
                }}
              >
                <p className="result-value text-lg">{c.value}</p>
                <p className="result-label">{c.label}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-3)', fontSize: '0.625rem' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl flex items-center justify-center py-10" style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Digite uma odd para converter</p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
