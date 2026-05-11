import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function Martingale() {
  const [stakeInicial, setStakeInicial] = useState('');
  const [rodadas, setRodadas] = useState('5');
  const [odd, setOdd] = useState('2.00');

  const s = parseFloat(stakeInicial);
  const r = parseInt(rodadas);
  const o = parseFloat(odd);
  const valid = s > 0 && r >= 1 && r <= 20 && o > 1;

  const simular = () => {
    if (!valid) return [];
    const rows = [];
    let acumulado = 0;
    for (let i = 0; i < r; i++) {
      const stake = s * Math.pow(o - 1, i) / Math.pow(o - 1, 0);
      // standard martingale: double stake each time (for o=2, factor=2)
      const stakeM = s * Math.pow(2, i);
      const lucroSeGanhar = stakeM * o - stakeM - acumulado;
      acumulado += stakeM;
      rows.push({ rodada: i + 1, stake: stakeM, totalArriscado: acumulado, lucroSeGanhar });
    }
    return rows;
  };

  const rows = simular();

  const faqs = [
    { q: 'O que é a estratégia Martingale?', a: 'Martingale é uma estratégia de apostas onde você dobra o stake após cada derrota, na expectativa de recuperar todas as perdas com um único lucro.' },
    { q: 'Por que o Martingale é perigoso?', a: 'Uma sequência de derrotas pode exigir stakes enormes rapidamente. Com 10 derrotas seguidas a partir de R$10, você precisaria apostar R$10.240 na próxima rodada.' },
    { q: 'Existe versão mais segura do Martingale?', a: 'Sim: o Anti-Martingale (dobra após vitórias) ou o D\'Alembert (aumenta e diminui gradualmente). Mas todas têm riscos.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Martingale"
      description="Simule a estratégia Martingale: veja quanto você precisaria apostar após cada derrota consecutiva."
      slug="martingale"
      faqs={faqs}
      explanation={
        <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">Entenda o risco do Martingale</h2>
          <p>O Martingale parece seguro no curto prazo mas é extremamente arriscado. Matematicamente, você sempre enfrenta a possibilidade de uma sequência de derrotas que ultrapassa o limite da sua banca.</p>
          <div className="bg-red-900/20 border border-red-800/40 rounded-xl p-4">
            <p className="text-red-400 font-semibold text-sm">⚠️ Aviso importante</p>
            <p className="text-sm mt-1">O CalculaBet não recomenda o uso de Martingale. Use esta calculadora apenas para entender os riscos envolvidos.</p>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Stake inicial (R$)</label>
            <input type="number" className="input-field" placeholder="10" min="1" value={stakeInicial} onChange={e => setStakeInicial(e.target.value)} />
          </div>
          <div>
            <label className="label">Odd por rodada</label>
            <input type="number" className="input-field" placeholder="2.00" step="0.01" min="1.01" value={odd} onChange={e => setOdd(e.target.value)} />
          </div>
          <div>
            <label className="label">Simular {rodadas} derrotas seguidas</label>
            <input type="number" className="input-field" placeholder="5" min="1" max="20" value={rodadas} onChange={e => setRodadas(e.target.value)} />
          </div>
        </div>

        {valid && rows.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Derrota #</th>
                  <th className="px-4 py-3 text-right text-gray-400 font-medium">Stake</th>
                  <th className="px-4 py-3 text-right text-gray-400 font-medium">Total arriscado</th>
                  <th className="px-4 py-3 text-right text-gray-400 font-medium">Lucro se ganhar</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className={`border-t border-gray-800 ${i >= 7 ? 'bg-red-950/20' : ''}`}>
                    <td className="px-4 py-3 text-gray-300">{row.rodada}</td>
                    <td className="px-4 py-3 text-right text-white font-medium">R${row.stake.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right text-red-400">R${row.totalArriscado.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right text-emerald-400">R${row.lucroSeGanhar.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
