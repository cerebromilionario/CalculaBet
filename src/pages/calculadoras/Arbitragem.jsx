import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function Arbitragem() {
  const [odds, setOdds] = useState(['', '']);
  const [banca, setBanca] = useState('');

  const atualizar = (i, v) => { const o = [...odds]; o[i] = v; setOdds(o); };
  const adicionar = () => setOdds([...odds, '']);
  const remover = (i) => odds.length > 2 && setOdds(odds.filter((_, idx) => idx !== i));

  const oddsN = odds.map(o => parseFloat(o)).filter(o => o > 1);
  const bancaN = parseFloat(banca);
  const valid = oddsN.length === odds.length && oddsN.length >= 2 && bancaN > 0;

  const margem = valid ? oddsN.reduce((acc, o) => acc + 1 / o, 0) : null;
  const isArb = valid && margem < 1;
  const lucroGarantido = isArb ? bancaN * (1 / margem - 1) : 0;
  const stakes = valid && isArb ? oddsN.map(o => bancaN / (o * margem)) : [];

  const faqs = [
    { q: 'O que é arbitragem em apostas?', a: 'Arbitragem (sure bet) ocorre quando as odds de diferentes casas permitem cobrir todos os resultados com lucro garantido.' },
    { q: 'Como identificar arbitragem?', a: 'Some os inversos das odds (1/odd) de cada resultado. Se o total for menor que 1 (100%), existe arbitragem.' },
    { q: 'A arbitragem é permitida?', a: 'Tecnicamente sim, mas muitas casas limitam contas de arbitragistas. Use com moderação.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Arbitragem"
      description="Identifique oportunidades de arbitragem (sure bet) e calcule como distribuir sua banca para garantir lucro."
      slug="arbitragem"
      faqs={faqs}
      explanation={
        <div className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>O que é arbitragem em apostas</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
            A arbitragem ocorre quando odds em diferentes casas criam uma oportunidade de cobrir todos os resultados com lucro garantido. Isso acontece por divergências de opinião entre casas.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
            <strong style={{ color: 'var(--text-1)' }}>Fórmula:</strong> Some 1/odd de cada resultado. Se menor que 1 → arbitragem. Lucro = banca × (1/margem − 1).
          </p>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="space-y-3">
          {odds.map((o, i) => (
            <div key={i} className="flex items-end gap-3">
              <div className="flex-1">
                <label className="label">Resultado {i + 1} — Odd (casa diferente)</label>
                <input type="number" className="input-field" placeholder="2.10" step="0.01" min="1.01" value={o} onChange={e => atualizar(i, e.target.value)} />
              </div>
              {odds.length > 2 && (
                <button
                  onClick={() => remover(i)}
                  className="mb-px p-2.5 rounded-xl transition-colors"
                  style={{ color: 'var(--red)', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={adicionar}
          className="text-xs font-medium flex items-center gap-1.5 transition-colors"
          style={{ color: 'var(--cyan)' }}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Adicionar resultado
        </button>

        <div>
          <label className="label">Banca total (R$)</label>
          <input type="number" className="input-field" placeholder="1000" min="0" value={banca} onChange={e => setBanca(e.target.value)} />
        </div>

        {valid && (
          <div className="space-y-3">
            <div
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
              style={{
                background: isArb ? 'rgba(34,197,94,0.06)' : 'rgba(248,113,113,0.06)',
                border: `1px solid ${isArb ? 'rgba(34,197,94,0.2)' : 'rgba(248,113,113,0.2)'}`,
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
                style={{ background: isArb ? 'rgba(34,197,94,0.15)' : 'rgba(248,113,113,0.15)' }}
              >
                {isArb ? '✓' : '✗'}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: isArb ? '#4ade80' : 'var(--red)' }}>
                  {isArb ? 'Arbitragem encontrada!' : 'Sem arbitragem'}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>
                  Margem: {margem ? (margem * 100).toFixed(2) : 0}% {isArb ? '(< 100% ✓)' : '(> 100% ✗)'}
                </p>
              </div>
            </div>

            {isArb && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="result-box">
                    <p className="result-value">R${lucroGarantido.toFixed(2)}</p>
                    <p className="result-label">Lucro garantido</p>
                  </div>
                  <div className="result-box">
                    <p className="result-value" style={{ color: '#818cf8' }}>{((lucroGarantido / bancaN) * 100).toFixed(2)}%</p>
                    <p className="result-label">ROI</p>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                  <div className="px-4 py-2.5" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                    <p className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>Distribuição de stakes</p>
                  </div>
                  <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                    {stakes.map((s, i) => (
                      <div key={i} className="flex justify-between items-center px-4 py-3">
                        <span className="text-xs" style={{ color: 'var(--text-2)' }}>
                          Resultado {i + 1} · odd {parseFloat(odds[i]).toFixed(2)}
                        </span>
                        <span className="text-sm font-semibold tabular-nums" style={{ color: 'var(--text-1)' }}>
                          R${s.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
