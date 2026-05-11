import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

const PRESETS = [10, 25, 50, 100, 200, 500];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de Múltipla / Parlay — CalculaBet',
      url: 'https://calculabet.netlify.app/calculadoras/multipla-parlay',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description: 'Some as odds de múltiplas seleções, calcule a odd combinada, retorno total, lucro e probabilidade acumulada de uma aposta múltipla ou parlay.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'O que é aposta múltipla ou parlay?', acceptedAnswer: { '@type': 'Answer', text: 'É uma aposta que combina duas ou mais seleções em um único bilhete. As odds se multiplicam, gerando retornos muito maiores — mas todas as seleções precisam ganhar para você receber.' } },
        { '@type': 'Question', name: 'Como calcular a odd combinada de uma múltipla?', acceptedAnswer: { '@type': 'Answer', text: 'Multiplique todas as odds entre si. Ex: 1.80 × 2.00 × 1.50 = 5.40. O retorno é o stake multiplicado por essa odd combinada.' } },
        { '@type': 'Question', name: 'Qual é a probabilidade de acertar uma múltipla?', acceptedAnswer: { '@type': 'Answer', text: 'Multiplique as probabilidades implícitas de cada seleção. Ex: 55.6% × 50% × 66.7% ≈ 18.5%. Quanto mais seleções, menor a chance de acertar tudo.' } },
        { '@type': 'Question', name: 'Múltipla ou aposta simples: qual é melhor?', acceptedAnswer: { '@type': 'Answer', text: 'Depende do objetivo. A simples tem probabilidade maior de acerto. A múltipla oferece retornos bem maiores com o mesmo stake, mas o risco é proporcional ao número de seleções.' } },
        { '@type': 'Question', name: 'Quantas seleções devo colocar em uma múltipla?', acceptedAnswer: { '@type': 'Answer', text: 'Profissionais geralmente limitam a 2-4 seleções. Mais que isso reduz drasticamente a probabilidade acumulada, tornando a aposta mais especulativa do que estratégica.' } },
        { '@type': 'Question', name: 'Parlay e múltipla são a mesma coisa?', acceptedAnswer: { '@type': 'Answer', text: 'Sim, são termos diferentes para o mesmo conceito. "Parlay" é o termo em inglês usado nas casas americanas; "múltipla" ou "acumulador" é como é chamada no Brasil e Europa.' } },
        { '@type': 'Question', name: 'A casa de apostas cobra margem extra na múltipla?', acceptedAnswer: { '@type': 'Answer', text: 'Não diretamente, mas a margem já embutida em cada odd se multiplica. Odds com overround de 5% em 4 seleções resultam em margem acumulada de cerca de 18-20% sobre a combinação.' } },
        { '@type': 'Question', name: 'É possível fazer hedge (proteção) de uma múltipla?', acceptedAnswer: { '@type': 'Answer', text: 'Sim, principalmente nas últimas seleções. Se sua múltipla estiver ganhando na penúltima seleção, você pode apostar no oposto da última para garantir lucro. Use nossa calculadora de hedge para isso.' } },
      ],
    },
  ],
};

function MultiplaExplanation() {
  return (
    <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>O que é uma aposta múltipla (parlay)?</h2>
        <p className="mb-3">
          Uma <strong style={{ color: 'var(--text-1)' }}>aposta múltipla</strong> — também chamada de <em>parlay</em>, <em>acumulador</em> ou simplesmente <em>combo</em> — é um tipo de aposta que combina duas ou mais seleções em um único bilhete. O segredo está na <strong style={{ color: 'var(--text-1)' }}>multiplicação das odds</strong>: em vez de somar, cada odd é multiplicada pela próxima, criando um multiplicador que pode transformar R$20 em centenas de reais.
        </p>
        <p className="mb-3">
          O preço dessa alavancagem é o risco: <strong style={{ color: 'var(--text-1)' }}>todas as seleções precisam ganhar</strong>. Se uma única seleção perder, você perde todo o stake. É por isso que a múltipla é uma faca de dois gumes — ela amplifica tanto os ganhos quanto a vulnerabilidade.
        </p>
        <p>
          No Brasil, as múltiplas são populares em mercados de futebol, especialmente no Brasileirão, Copa do Brasil e Champions League. Nas casas como Bet365, Betano e Sportingbet, é possível montar acumuladores com até 20+ seleções — embora profissionais raramente ultrapassem 4 ou 5.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Como calcular a odd combinada e o retorno</h2>
        <p className="mb-4">
          O cálculo é direto: multiplique todas as odds entre si para obter a <strong style={{ color: 'var(--text-1)' }}>odd combinada</strong>, depois multiplique pelo seu stake.
        </p>
        <div className="rounded-xl p-5 mb-4" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
          <p className="text-xs font-semibold mb-3" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Fórmulas</p>
          <div className="space-y-2 font-mono text-xs" style={{ color: 'var(--text-1)' }}>
            <p>Odd combinada = Odd₁ × Odd₂ × Odd₃ × ...</p>
            <p>Retorno total = Stake × Odd combinada</p>
            <p>Lucro = Retorno total − Stake</p>
            <p>ROI = (Lucro / Stake) × 100</p>
            <p>Prob. acumulada = (1/Odd₁) × (1/Odd₂) × (1/Odd₃) × ...</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Seleções</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Odds</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Odd combinada</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Retorno (R$50)</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Prob. acumulada</th>
              </tr>
            </thead>
            <tbody>
              {[
                { sel: 2, odds: '1.80 × 2.00', comb: '3.60', ret: 'R$180', prob: '27.8%' },
                { sel: 3, odds: '1.80 × 2.00 × 1.50', comb: '5.40', ret: 'R$270', prob: '18.5%' },
                { sel: 4, odds: '1.80 × 2.00 × 1.50 × 1.70', comb: '9.18', ret: 'R$459', prob: '10.9%' },
                { sel: 5, odds: '1.80 × 2.00 × 1.50 × 1.70 × 1.60', comb: '14.69', ret: 'R$734', prob: '6.8%' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-1)' }}>{row.sel} seleções</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{row.odds}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: '#22d3ee' }}>{row.comb}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: '#4ade80' }}>{row.ret}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{row.prob}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs" style={{ color: 'var(--text-3)' }}>
          Observe como a probabilidade cai rapidamente enquanto o retorno potencial cresce. Isso é o efeito composto da multiplicação de odds.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>A margem da casa se multiplica nas combinadas</h2>
        <p className="mb-3">
          Um detalhe que muitos apostadores ignoram: <strong style={{ color: 'var(--text-1)' }}>a margem (vig) da casa se acumula</strong> em cada seleção. Se uma odd já embuте 5% de overround, em 4 seleções a margem efetiva sobre a combinação fica em torno de 18-20%.
        </p>
        <p className="mb-3">
          Isso significa que, em múltiplas longas, você está apostando contra uma vantagem estatística crescente. Por isso profissionais preferem múltiplas curtas (2-3 seleções) onde a margem acumulada ainda é gerenciável, ou focam em odds que percebem como subavaliadas (value bets).
        </p>
        <p>
          Use a <Link to="/calculadoras/odds" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de Odds</Link> para detectar value bets antes de incluir cada seleção na sua múltipla. Se a seleção não tem valor individualmente, ela provavelmente está destruindo o valor da sua combinação.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Múltipla vs. Aposta Simples: comparação estratégica</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-xl p-5" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
            <p className="text-xs font-semibold mb-3" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Aposta Simples</p>
            <ul className="space-y-2">
              {['Maior probabilidade de acerto', 'Risco controlado por seleção', 'Melhor para gestão de banca', 'ROI mais previsível a longo prazo', 'Ideal para apostadores consistentes'].map((p, i) => (
                <li key={i} className="flex items-start gap-2" style={{ color: 'var(--text-2)' }}>
                  <span style={{ color: '#22d3ee' }}>→</span> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl p-5" style={{ background: 'rgba(129,140,248,0.04)', border: '1px solid rgba(129,140,248,0.12)' }}>
            <p className="text-xs font-semibold mb-3" style={{ color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Aposta Múltipla</p>
            <ul className="space-y-2">
              {['Retornos muito maiores com mesmo stake', 'Emoção de acompanhar várias seleções', 'Bom para bankroll pequeno com alvo ambicioso', 'Risco: uma seleção derruba tudo', 'Margem da casa acumula por seleção'].map((p, i) => (
                <li key={i} className="flex items-start gap-2" style={{ color: 'var(--text-2)' }}>
                  <span style={{ color: '#818cf8' }}>→</span> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p>
          A escolha ideal depende do seu perfil. Para gerenciar sua banca de forma sustentável, use a <Link to="/calculadoras/gestao-banca" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de Gestão de Banca</Link>. Para montar múltiplas com proteção parcial, veja a <Link to="/calculadoras/hedge" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de Hedge</Link>.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Tipos de múltiplas e acumuladores</h2>
        <p className="mb-4">Além da múltipla tradicional, existem variações populares nas casas brasileiras:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { nome: 'Acumulador (ACCA)', desc: 'A múltipla padrão. 2+ seleções, todas precisam ganhar. Odds se multiplicam.' },
            { nome: 'Trixie', desc: '3 seleções formando 4 apostas: 3 duplas + 1 tripla. Retorno mesmo se uma perder.' },
            { nome: 'Patent', desc: '3 seleções, 7 apostas: 3 simples + 3 duplas + 1 tripla. Retorno com 1 acerto.' },
            { nome: 'Lucky 15', desc: '4 seleções, 15 apostas. Cobertura total com qualquer número de acertos.' },
            { nome: 'Yankee', desc: '4 seleções, 11 apostas (sem as simples). Retorno com mínimo 2 acertos.' },
            { nome: 'Each Way Acca', desc: 'Múltipla com aposta "place" paralela. Popular em corridas e tênis.' },
          ].map((t, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
              <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-1)' }}>{t.nome}</p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>5 dicas para múltiplas mais inteligentes</h2>
        <ol className="space-y-3 list-none">
          {[
            { n: '1', t: 'Limite o número de seleções', d: 'Múltiplas com 2-4 seleções têm probabilidade acumulada mais administrável. Cada seleção extra reduz drasticamente suas chances.' },
            { n: '2', t: 'Selecione apenas value bets', d: 'Inclua uma seleção na múltipla somente se ela tiver valor (odd acima do justo). Use a calculadora de odds para verificar antes de combinar.' },
            { n: '3', t: 'Cuidado com seleções correlacionadas', d: 'Duas seleções que dependem do mesmo evento (ex: time X ganhar e artilheiro do time X marcar) reduzem a diversificação real da múltipla.' },
            { n: '4', t: 'Use hedge na reta final', d: 'Se sua múltipla estiver vencendo nas últimas seleções, considere fazer hedge para garantir lucro. Calcule usando nossa calculadora de hedge.' },
            { n: '5', t: 'Defina um stake fixo para múltiplas', d: 'Nunca aposte mais do que 1-2% da banca em uma múltipla, dada a menor probabilidade de acerto. Preserve sua banca para as apostas simples de valor.' },
          ].map((d, i) => (
            <li key={i} className="flex gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(129,140,248,0.15)', color: '#818cf8' }}>{d.n}</span>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-1)' }}>{d.t}</p>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>{d.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>Ferramentas relacionadas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { to: '/calculadoras/odds', icon: '📊', label: 'Calculadora de Odds' },
            { to: '/calculadoras/aposta-simples', icon: '🎯', label: 'Aposta Simples' },
            { to: '/calculadoras/hedge', icon: '🛡️', label: 'Hedge' },
            { to: '/calculadoras/dutching', icon: '⚖️', label: 'Dutching' },
            { to: '/calculadoras/arbitragem', icon: '💰', label: 'Arbitragem' },
            { to: '/calculadoras/cashout', icon: '💳', label: 'Cash Out' },
            { to: '/calculadoras/gestao-banca', icon: '🏦', label: 'Gestão de Banca' },
            { to: '/calculadoras/roi', icon: '📈', label: 'ROI' },
          ].map((l, i) => (
            <Link
              key={i}
              to={l.to}
              className="flex items-center gap-2 px-3 py-3 rounded-xl text-xs font-medium transition-all duration-150"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(129,140,248,0.3)'; e.currentTarget.style.color = '#818cf8'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)'; }}
            >
              <span>{l.icon}</span> {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MultiplaParlay() {
  const [selecoes, setSelecoes] = useState([{ odd: '' }, { odd: '' }]);
  const [stake, setStake] = useState('');
  const [banca, setBanca] = useState('');

  const atualizar = (i, v) => { const arr = [...selecoes]; arr[i].odd = v; setSelecoes(arr); };
  const adicionar = () => setSelecoes([...selecoes, { odd: '' }]);
  const remover = (i) => selecoes.length > 2 && setSelecoes(selecoes.filter((_, idx) => idx !== i));

  const oddsNums = selecoes.map(s => parseFloat(s.odd));
  const todasValidas = oddsNums.every(o => o > 1) && selecoes.length >= 2;
  const oddTotal = todasValidas ? oddsNums.reduce((acc, o) => acc * o, 1) : 0;
  const probAcumulada = todasValidas ? oddsNums.reduce((acc, o) => acc * (1 / o), 1) * 100 : 0;

  const s = parseFloat(stake);
  const b = parseFloat(banca);
  const valid = todasValidas && s > 0;
  const retorno = valid ? s * oddTotal : 0;
  const lucro = valid ? retorno - s : 0;
  const roi = valid ? (lucro / s) * 100 : 0;
  const percBanca = valid && b > 0 ? (s / b) * 100 : 0;

  const riskLabel = percBanca <= 1 ? 'conservador' : percBanca <= 2 ? 'moderado' : 'alto';
  const riskColor = percBanca <= 1 ? '#4ade80' : percBanca <= 2 ? '#fbbf24' : '#f87171';

  const faqs = [
    { q: 'O que é aposta múltipla ou parlay?', a: 'É uma aposta que combina duas ou mais seleções em um único bilhete. As odds se multiplicam, gerando retornos muito maiores — mas todas as seleções precisam ganhar para você receber.' },
    { q: 'Como calcular a odd combinada de uma múltipla?', a: 'Multiplique todas as odds entre si. Ex: 1.80 × 2.00 × 1.50 = 5.40. O retorno é o stake multiplicado por essa odd combinada.' },
    { q: 'Qual é a probabilidade de acertar uma múltipla?', a: 'Multiplique as probabilidades implícitas de cada seleção. Ex: 55.6% × 50% × 66.7% ≈ 18.5%. Quanto mais seleções, menor a chance de acertar tudo.' },
    { q: 'Múltipla ou aposta simples: qual é melhor?', a: 'Depende do objetivo. A simples tem probabilidade maior de acerto. A múltipla oferece retornos bem maiores com o mesmo stake, mas o risco é proporcional ao número de seleções.' },
    { q: 'Quantas seleções devo colocar em uma múltipla?', a: 'Profissionais geralmente limitam a 2-4 seleções. Mais que isso reduz drasticamente a probabilidade acumulada.' },
    { q: 'Parlay e múltipla são a mesma coisa?', a: 'Sim, são termos diferentes para o mesmo conceito. "Parlay" é o termo em inglês; "múltipla" ou "acumulador" é como é chamada no Brasil e Europa.' },
    { q: 'A casa de apostas cobra margem extra na múltipla?', a: 'Não diretamente, mas a margem já embutida em cada odd se multiplica. Odds com overround de 5% em 4 seleções resultam em margem acumulada de cerca de 18-20%.' },
    { q: 'É possível fazer hedge de uma múltipla?', a: 'Sim, principalmente nas últimas seleções. Se sua múltipla estiver ganhando, você pode apostar no oposto da última seleção para garantir lucro parcial.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Múltipla / Parlay"
      description="Some as odds de múltiplas seleções, calcule a odd combinada, retorno total, lucro, ROI e probabilidade acumulada de acertar toda a múltipla."
      slug="multipla-parlay"
      faqs={faqs}
      schema={schema}
      explanation={<MultiplaExplanation />}
    >
      <div className="space-y-6">

        {/* Selections */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="label mb-0">Seleções ({selecoes.length})</label>
            <button
              onClick={adicionar}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: 'var(--cyan)' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Adicionar seleção
            </button>
          </div>
          <div className="space-y-2.5">
            {selecoes.map((sel, i) => {
              const oddNum = parseFloat(sel.odd);
              const probImpl = oddNum > 1 ? (1 / oddNum) * 100 : null;
              return (
                <div key={i} className="flex items-end gap-3">
                  <div className="flex-1">
                    <label className="label text-xs mb-1.5">Seleção {i + 1} — Odd decimal</label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="1.80"
                      step="0.01"
                      min="1.01"
                      value={sel.odd}
                      onChange={e => atualizar(i, e.target.value)}
                    />
                  </div>
                  {probImpl !== null && (
                    <div
                      className="mb-px px-2.5 py-2 rounded-lg text-xs font-medium flex-shrink-0"
                      style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.15)', color: '#22d3ee' }}
                    >
                      {probImpl.toFixed(1)}%
                    </div>
                  )}
                  {selecoes.length > 2 && (
                    <button
                      onClick={() => remover(i)}
                      className="mb-px p-2.5 rounded-xl transition-colors flex-shrink-0"
                      style={{ color: 'var(--red)', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)' }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Combined odd preview */}
        {todasValidas && (
          <div
            className="flex items-center justify-between rounded-xl px-4 py-3"
            style={{ background: 'rgba(129,140,248,0.06)', border: '1px solid rgba(129,140,248,0.15)' }}
          >
            <div>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Odd combinada</p>
              <p className="text-2xl font-bold mt-0.5" style={{ color: '#818cf8' }}>{oddTotal.toFixed(3)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Prob. acumulada</p>
              <p className="text-2xl font-bold mt-0.5" style={{ color: probAcumulada < 20 ? '#f87171' : probAcumulada < 40 ? '#fbbf24' : '#4ade80' }}>
                {probAcumulada.toFixed(1)}%
              </p>
            </div>
          </div>
        )}

        {/* Stake */}
        <div>
          <label className="label">Stake (R$)</label>
          <div className="flex flex-wrap gap-2 mb-2.5">
            {PRESETS.map(p => (
              <button
                key={p}
                onClick={() => setStake(String(p))}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                style={{
                  background: stake === String(p) ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${stake === String(p) ? 'rgba(34,211,238,0.4)' : 'var(--border)'}`,
                  color: stake === String(p) ? '#22d3ee' : 'var(--text-2)',
                }}
              >
                R${p}
              </button>
            ))}
          </div>
          <input
            type="number"
            className="input-field"
            placeholder="50"
            min="0"
            value={stake}
            onChange={e => setStake(e.target.value)}
          />
        </div>

        {/* Banca */}
        <div>
          <label className="label">Banca total (R$) <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>— opcional</span></label>
          <input
            type="number"
            className="input-field"
            placeholder="ex: 1000"
            min="0"
            value={banca}
            onChange={e => setBanca(e.target.value)}
          />
          {percBanca > 0 && (
            <div className="mt-2.5 space-y-1.5">
              <div className="flex justify-between text-xs" style={{ color: 'var(--text-3)' }}>
                <span>Risco: <strong style={{ color: riskColor }}>{percBanca.toFixed(1)}% da banca</strong></span>
                <span style={{ color: riskColor, textTransform: 'capitalize' }}>{riskLabel}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(percBanca * 10, 100)}%`, background: riskColor }}
                />
              </div>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                Para múltiplas, recomenda-se ≤1% da banca por bilhete.
              </p>
            </div>
          )}
        </div>

        {/* Results */}
        {valid ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="result-box col-span-2 sm:col-span-1">
                <p className="result-value" style={{ color: '#22d3ee' }}>R${retorno.toFixed(2)}</p>
                <p className="result-label">Retorno total</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: '#4ade80' }}>R${lucro.toFixed(2)}</p>
                <p className="result-label">Lucro líquido</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: '#818cf8' }}>{roi.toFixed(1)}%</p>
                <p className="result-label">ROI</p>
              </div>
              <div className="result-box">
                <p className="result-value">{probAcumulada.toFixed(1)}%</p>
                <p className="result-label">Prob. acumulada</p>
              </div>
            </div>
            <div
              className="rounded-xl px-4 py-3 text-xs"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-3)' }}
            >
              Odd combinada <strong style={{ color: 'var(--text-1)' }}>{oddTotal.toFixed(3)}</strong> · Precisa acertar pelo menos <strong style={{ color: 'var(--text-1)' }}>{(1 / oddTotal * 100).toFixed(2)}%</strong> das múltiplas equivalentes para ser lucrativo.
            </div>
          </div>
        ) : (
          <div
            className="rounded-xl flex items-center justify-center py-8"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>
              {!todasValidas ? 'Preencha todas as odds (mín. 1.01)' : 'Informe o stake para calcular'}
            </p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
