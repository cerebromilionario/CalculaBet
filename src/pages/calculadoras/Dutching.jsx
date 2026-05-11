import { useState } from 'react';
import CalcLayout from '../../components/ui/CalcLayout';

export default function Dutching() {
  const [selecoes, setSelecoes] = useState([{ odd: '', nome: '' }, { odd: '', nome: '' }]);
  const [banca, setBanca] = useState('');
  const [lucroAlvo, setLucroAlvo] = useState('');

  const atualizar = (i, campo, v) => {
    const s = [...selecoes];
    s[i][campo] = v;
    setSelecoes(s);
  };
  const adicionar = () => setSelecoes([...selecoes, { odd: '', nome: '' }]);
  const remover = (i) => selecoes.length > 2 && setSelecoes(selecoes.filter((_, idx) => idx !== i));

  const oddsN = selecoes.map(s => parseFloat(s.odd)).filter(o => o > 1);
  const bancaN = parseFloat(banca);
  const valid = oddsN.length === selecoes.length && bancaN > 0;

  const totalInv = valid ? oddsN.reduce((acc, o) => acc + 1 / o, 0) : 0;
  const stakes = valid ? oddsN.map(o => bancaN / (o * totalInv)) : [];
  const retorno = valid ? stakes[0] * oddsN[0] : 0;
  const lucro = valid ? retorno - bancaN : 0;

  const faqs = [
    { q: 'O que é dutching?', a: 'Dutching é uma estratégia de apostas onde você distribui o stake entre múltiplos resultados para obter o mesmo lucro independentemente de qual deles ocorra.' },
    { q: 'Qual a diferença entre dutching e arbitragem?', a: 'Na arbitragem você usa odds de casas diferentes para garantir lucro. No dutching você aposta em vários resultados na mesma casa ou em eventos com mais de 2 resultados.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Dutching"
      description="Distribua sua banca entre múltiplos resultados para obter lucro igual em qualquer desfecho."
      slug="dutching"
      faqs={faqs}
      explanation={
        <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">Como funciona o dutching</h2>
          <p>No dutching, você divide o stake entre várias seleções de forma que, se qualquer uma delas ganhar, você obtém o mesmo retorno. É útil quando você não tem certeza de qual resultado específico ocorrerá, mas acredita que um conjunto deles é mais provável.</p>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="space-y-3">
          {selecoes.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="grid grid-cols-2 gap-2 flex-1">
                <div>
                  <label className="label">Seleção {i + 1}</label>
                  <input type="text" className="input-field" placeholder="Ex: Time A vence" value={s.nome} onChange={e => atualizar(i, 'nome', e.target.value)} />
                </div>
                <div>
                  <label className="label">Odd</label>
                  <input type="number" className="input-field" placeholder="3.50" step="0.01" min="1.01" value={s.odd} onChange={e => atualizar(i, 'odd', e.target.value)} />
                </div>
              </div>
              {selecoes.length > 2 && (
                <button onClick={() => remover(i)} className="mt-6 p-2 text-red-400 hover:text-red-300 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        <button onClick={adicionar} className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Adicionar seleção
        </button>

        <div>
          <label className="label">Banca total (R$)</label>
          <input type="number" className="input-field" placeholder="500" min="0" value={banca} onChange={e => setBanca(e.target.value)} />
        </div>

        {valid && (
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="result-box">
                <p className="result-value">R${retorno.toFixed(2)}</p>
                <p className="result-label">Retorno (qualquer resultado)</p>
              </div>
              <div className={`result-box ${lucro >= 0 ? '' : 'border-red-500/30'}`}>
                <p className={`result-value ${lucro >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>R${lucro.toFixed(2)}</p>
                <p className="result-label">Lucro / Prejuízo</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-4 space-y-2">
              <p className="text-sm font-semibold text-white mb-2">Stakes por seleção</p>
              {stakes.map((st, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-400">{selecoes[i].nome || `Seleção ${i + 1}`} (odd {parseFloat(selecoes[i].odd).toFixed(2)}):</span>
                  <span className="text-white font-medium">R${st.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
