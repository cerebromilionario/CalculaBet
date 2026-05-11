import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function GestaoBanca() {
  const [banca, setBanca] = useState('');
  const [odd, setOdd] = useState('');
  const [prob, setProb] = useState('');
  const [metodo, setMetodo] = useState('kelly');
  const [pct, setPct] = useState('2');

  const b = parseFloat(banca);
  const o = parseFloat(odd);
  const p = parseFloat(prob) / 100;
  const pctN = parseFloat(pct) / 100;

  const validKelly = b > 0 && o > 1 && p > 0 && p < 1;
  const validFlat = b > 0 && pctN > 0;

  const kellyFrac = validKelly ? (p * (o - 1) - (1 - p)) / (o - 1) : 0;
  const kellyStake = validKelly && kellyFrac > 0 ? b * kellyFrac : 0;
  const flatStake = validFlat ? b * pctN : 0;

  const metodos = [
    { id: 'kelly', label: 'Kelly Criterion', desc: 'Maximiza crescimento' },
    { id: 'flat', label: 'Flat 2%', desc: 'Conservador' },
    { id: 'fixo', label: '% Fixo', desc: 'Personalizado' },
  ];

  const faqs = [
    { q: 'O que é o critério de Kelly?', a: 'Fórmula matemática que calcula o % ideal da banca a apostar em cada evento, maximizando o crescimento no longo prazo. Requer estimar a probabilidade real.' },
    { q: 'Qual percentual da banca devo apostar?', a: 'Apostadores conservadores usam 1-3% por aposta. Kelly puro pode sugerir mais, mas o Half-Kelly (50% do Kelly) é amplamente recomendado.' },
    { q: 'O que é flat betting?', a: 'Apostar sempre o mesmo % da banca. Simples e protege contra sequências de perdas. Ideal para iniciantes.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Gestão de Banca"
      description="Calcule o stake ideal usando Kelly Criterion, flat betting ou percentual fixo para proteger e fazer crescer sua banca."
      slug="gestao-banca"
      faqs={faqs}
      explanation={
        <div className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>Métodos de gestão de banca</h2>
          <div className="space-y-3">
            {[
              { t: 'Kelly Criterion', d: 'Calcula o % ideal com base na sua edge. Requer estimar a probabilidade real com precisão.' },
              { t: 'Flat Betting', d: 'Aposta sempre o mesmo % da banca. Simples e protege de grandes oscilações.' },
              { t: '% Fixo', d: 'Você define o percentual. Útil quando tem uma estratégia específica em mente.' },
            ].map((m, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className="w-5 h-5 rounded-md flex-shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold"
                  style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)', color: '#22d3ee' }}
                >
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>{m.t}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>{m.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Method selector */}
        <div>
          <p className="label">Método</p>
          <div className="grid grid-cols-3 gap-2">
            {metodos.map(m => (
              <button
                key={m.id}
                onClick={() => setMetodo(m.id)}
                className="flex flex-col items-center gap-1 px-3 py-3 rounded-xl text-center transition-all duration-150"
                style={{
                  background: metodo === m.id ? 'rgba(34,211,238,0.08)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${metodo === m.id ? 'rgba(34,211,238,0.25)' : 'var(--border)'}`,
                  color: metodo === m.id ? '#22d3ee' : 'var(--text-2)',
                }}
              >
                <span className="text-xs font-semibold">{m.label}</span>
                <span className="text-xs opacity-60">{m.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label">Banca atual (R$)</label>
          <input type="number" className="input-field" placeholder="1.000" min="0" value={banca} onChange={e => setBanca(e.target.value)} />
        </div>

        {metodo === 'kelly' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Odd decimal</label>
              <input type="number" className="input-field" placeholder="2.50" step="0.01" min="1.01" value={odd} onChange={e => setOdd(e.target.value)} />
            </div>
            <div>
              <label className="label">Sua probabilidade estimada (%)</label>
              <input type="number" className="input-field" placeholder="55" min="1" max="99" value={prob} onChange={e => setProb(e.target.value)} />
            </div>
          </div>
        )}

        {(metodo === 'flat' || metodo === 'fixo') && (
          <div>
            <label className="label">Percentual da banca ({pct}%)</label>
            <input type="range" min="0.5" max="20" step="0.5" value={pct} onChange={e => setPct(e.target.value)} className="w-full accent-cyan-400" />
            <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-3)' }}>
              <span>0.5%</span><span>{pct}%</span><span>20%</span>
            </div>
          </div>
        )}

        {/* Results */}
        {metodo === 'kelly' && validKelly && (
          kellyFrac <= 0 ? (
            <div
              className="flex items-center gap-3 px-4 py-4 rounded-xl"
              style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.18)' }}
            >
              <span className="text-lg">⚠️</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--red)' }}>Sem edge nesta aposta</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>Kelly negativo. As odds não compensam o risco estimado.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div className="result-box">
                <p className="result-value">R${kellyStake.toFixed(2)}</p>
                <p className="result-label">Stake Kelly</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: '#818cf8' }}>R${(kellyStake / 2).toFixed(2)}</p>
                <p className="result-label">Half-Kelly (conservador)</p>
              </div>
              <div className="result-box col-span-2">
                <p className="result-value" style={{ color: '#fbbf24' }}>{(kellyFrac * 100).toFixed(2)}%</p>
                <p className="result-label">% da banca recomendado (Kelly puro)</p>
              </div>
            </div>
          )
        )}

        {(metodo === 'flat' || metodo === 'fixo') && validFlat && (
          <div className="grid grid-cols-2 gap-3">
            <div className="result-box col-span-2">
              <p className="result-value">R${flatStake.toFixed(2)}</p>
              <p className="result-label">Stake recomendado ({pct}% de R${b.toLocaleString('pt-BR')})</p>
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
