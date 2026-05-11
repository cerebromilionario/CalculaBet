import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

const PRESETS_BANCA = [500, 1000, 2000, 5000, 10000];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de Gestão de Banca — CalculaBet',
      url: 'https://calculabet.netlify.app/calculadoras/gestao-banca',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description: 'Calcule o stake ideal para cada aposta usando Kelly Criterion, Half-Kelly, flat betting ou percentual fixo. Gerencie sua banca com disciplina e maximize o crescimento a longo prazo.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'O que é o critério de Kelly em apostas?', acceptedAnswer: { '@type': 'Answer', text: 'O critério de Kelly é uma fórmula matemática que calcula o percentual ideal da banca a apostar em cada evento para maximizar o crescimento a longo prazo, considerando sua estimativa de probabilidade e a odd disponível.' } },
        { '@type': 'Question', name: 'Como calcular o Kelly Criterion?', acceptedAnswer: { '@type': 'Answer', text: 'Kelly % = (p × (o-1) - (1-p)) / (o-1), onde p é sua probabilidade estimada (entre 0 e 1) e o é a odd decimal. Um resultado positivo indica edge; negativo indica que a aposta não tem valor.' } },
        { '@type': 'Question', name: 'O que é Half-Kelly e por que usá-lo?', acceptedAnswer: { '@type': 'Answer', text: 'Half-Kelly é apostar 50% do que o Kelly puro recomenda. Reduz a variância significativamente com pequena perda de crescimento esperado. É amplamente recomendado para apostadores que superestimam seu edge.' } },
        { '@type': 'Question', name: 'Qual percentual da banca devo apostar por evento?', acceptedAnswer: { '@type': 'Answer', text: 'Apostadores conservadores usam 1-3% por aposta. Apostadores mais arrojados chegam a 5%. Acima disso o risco de ruína aumenta drasticamente. Kelly raramente recomenda mais que 10% em apostas de alto edge.' } },
        { '@type': 'Question', name: 'O que é flat betting?', acceptedAnswer: { '@type': 'Answer', text: 'Flat betting é apostar sempre o mesmo percentual fixo da banca em todas as apostas, independente da odd ou do edge estimado. É a estratégia mais simples e protege contra sequências longas de perdas.' } },
        { '@type': 'Question', name: 'Qual a diferença entre banca fixa e banca variável?', acceptedAnswer: { '@type': 'Answer', text: 'Na banca fixa, o stake em reais é sempre igual (ex: R$50 por aposta). Na banca variável (recomendada), o stake é sempre um percentual da banca atual — então crescem juntos ou se reduzem após perdas.' } },
        { '@type': 'Question', name: 'O Kelly Criterion funciona sem probabilidade estimada?', acceptedAnswer: { '@type': 'Answer', text: 'Não. Kelly exige uma estimativa de probabilidade real do evento. Sem isso, use flat betting ou percentual fixo. A qualidade do Kelly depende da precisão da sua estimativa.' } },
        { '@type': 'Question', name: 'Quantas unidades de banca devo ter?', acceptedAnswer: { '@type': 'Answer', text: 'A regra geral é ter no mínimo 50-100 unidades de aposta na banca. Se você aposta 2% da banca por jogo, precisa de pelo menos 50 apostas para absorver variâncias normais sem risco de ruína.' } },
      ],
    },
  ],
};

function GestaoBancaExplanation() {
  return (
    <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Por que gestão de banca é mais importante que escolher vencedores</h2>
        <p className="mb-3">
          A maioria dos apostadores foca 90% do tempo escolhendo seleções e quase nada em quanto apostar. Isso é um erro crítico. Um apostador com <strong style={{ color: 'var(--text-1)' }}>55% de acerto</strong> pode perder toda a banca se apostar valores inconsistentes. Um apostador com 50% de acerto pode crescer a banca se tiver edge nas odds e gestão disciplinada.
        </p>
        <p className="mb-3">
          A gestão de banca define <strong style={{ color: 'var(--text-1)' }}>quanto você aposta em cada evento</strong>. Ela protege contra sequências de perdas (que acontecem com qualquer apostador) e maximiza o crescimento quando você está em vantagem.
        </p>
        <p>
          Use a <Link to="/calculadoras/odds" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de Odds</Link> para identificar value bets e a <Link to="/calculadoras/roi" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de ROI</Link> para acompanhar seus resultados — então use esta calculadora para definir o stake ideal.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Kelly Criterion: a fórmula matemática do stake ideal</h2>
        <p className="mb-4">
          O <strong style={{ color: 'var(--text-1)' }}>critério de Kelly</strong>, desenvolvido por John L. Kelly Jr. em 1956, calcula o percentual ideal da banca a apostar em cada evento para <strong style={{ color: 'var(--text-1)' }}>maximizar o crescimento geométrico a longo prazo</strong>.
        </p>
        <div className="rounded-xl p-5 mb-4" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
          <p className="text-xs font-semibold mb-3" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Fórmulas</p>
          <div className="space-y-2 font-mono text-xs" style={{ color: 'var(--text-1)' }}>
            <p>Kelly % = (p × (o−1) − (1−p)) / (o−1)</p>
            <p>Half-Kelly = Kelly % × 0.5</p>
            <p>Stake Kelly = Banca × Kelly %</p>
            <p>Prob. implícita da odd = 1 / odd</p>
            <p>Edge = p_estimada − p_implícita</p>
          </div>
        </div>
        <p className="mb-3">
          Onde <strong>p</strong> é a sua probabilidade estimada (entre 0 e 1) e <strong>o</strong> é a odd decimal. Se o resultado for negativo, a aposta não tem valor esperado positivo — não aposte.
        </p>
        <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Odd</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Prob. estimada</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Edge</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Kelly %</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Stake (R$1000)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { odd: '2.00', prob: '55%', edge: '+5%', kelly: '10%', stake: 'R$100' },
                { odd: '2.50', prob: '45%', edge: '+5%', kelly: '7%', stake: 'R$70' },
                { odd: '3.00', prob: '38%', edge: '+4.7%', kelly: '5.8%', stake: 'R$58' },
                { odd: '1.80', prob: '60%', edge: '+4.4%', kelly: '11%', stake: 'R$110' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-1)' }}>{row.odd}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{row.prob}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: '#4ade80' }}>{row.edge}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: '#22d3ee' }}>{row.kelly}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-1)' }}>{row.stake}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Half-Kelly: por que a maioria dos profissionais usa metade</h2>
        <p className="mb-3">
          O Kelly puro assume que sua estimativa de probabilidade é perfeita — o que raramente é verdade. Na prática, apostadores tendem a <strong style={{ color: 'var(--text-1)' }}>superestimar seu edge</strong>. Isso faz o Kelly puro recomendar stakes muito altos, aumentando a variância e o risco de ruína.
        </p>
        <p className="mb-3">
          O <strong style={{ color: 'var(--text-1)' }}>Half-Kelly</strong> (50% do Kelly calculado) é amplamente preferido porque:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          {[
            { label: 'Reduz variância em ~50%', desc: 'Sequências ruins ficam significativamente menores.' },
            { label: 'Cresce ~75% do máximo', desc: 'Perda pequena de crescimento em troca de muito mais estabilidade.' },
            { label: 'Margem para erro', desc: 'Se você superestimou o edge, o Half-Kelly ainda é positivo.' },
          ].map((c, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(129,140,248,0.04)', border: '1px solid rgba(129,140,248,0.12)' }}>
              <p className="font-semibold text-sm mb-1" style={{ color: '#818cf8' }}>{c.label}</p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Flat betting: simples e eficaz para iniciantes</h2>
        <p className="mb-3">
          O <strong style={{ color: 'var(--text-1)' }}>flat betting</strong> consiste em apostar sempre o mesmo percentual fixo da banca em todas as apostas — independente da odd ou do edge estimado. É a estratégia mais simples e tem vantagens importantes:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-xl p-5" style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.12)' }}>
            <p className="text-xs font-semibold mb-3" style={{ color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Vantagens</p>
            <ul className="space-y-2">
              {[
                'Fácil de executar sem cálculos',
                'Protege contra sequências de perdas',
                'Não requer estimativa de probabilidade',
                'Consistência psicológica',
                'Ideal para iniciantes e mercados incertos',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2" style={{ color: 'var(--text-2)' }}>
                  <span style={{ color: '#4ade80' }}>→</span> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl p-5" style={{ background: 'rgba(248,113,113,0.04)', border: '1px solid rgba(248,113,113,0.1)' }}>
            <p className="text-xs font-semibold mb-3" style={{ color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Limitações</p>
            <ul className="space-y-2">
              {[
                'Não aproveita edges maiores com mais capital',
                'Aposta igual em eventos de valor diferente',
                'Crescimento mais lento que Kelly em condições ideais',
                'Não se adapta automaticamente ao tamanho da banca',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2" style={{ color: 'var(--text-2)' }}>
                  <span style={{ color: '#f87171' }}>→</span> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p>
          Para a maioria dos apostadores casuais, flat betting entre 1% e 3% da banca por aposta é o ponto de partida ideal.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Risco de ruína: quantas unidades você precisa?</h2>
        <p className="mb-4">
          O <strong style={{ color: 'var(--text-1)' }}>risco de ruína</strong> é a probabilidade de perder toda a banca. Ele depende do seu edge, da variância e do tamanho das apostas. A regra prática:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { unid: '50 unidades', pct: '2% por aposta', risco: 'Moderado', cor: '#fbbf24' },
            { unid: '100 unidades', pct: '1% por aposta', risco: 'Baixo', cor: '#4ade80' },
            { unid: '200 unidades', pct: '0.5% por aposta', risco: 'Muito baixo', cor: '#22d3ee' },
          ].map((u, i) => (
            <div key={i} className="rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${u.cor}25` }}>
              <p className="text-sm font-bold mb-1" style={{ color: u.cor }}>{u.unid}</p>
              <p className="text-xs mb-1" style={{ color: 'var(--text-2)' }}>{u.pct}</p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>Risco de ruína: {u.risco}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>5 regras de ouro da gestão de banca</h2>
        <ol className="space-y-3 list-none">
          {[
            { n: '1', t: 'Nunca aposte mais de 5% em um único evento', d: 'Mesmo apostas com edge alto têm variância. Concentrar muito em uma aposta pode destruir meses de trabalho em um único resultado.' },
            { n: '2', t: 'Use banca variável, não fixa', d: 'Aposte sempre um % da banca atual, não um valor fixo em reais. Assim, os stakes crescem com a banca e diminuem após perdas — proteção automática.' },
            { n: '3', t: 'Separe a banca de apostas das finanças pessoais', d: 'A banca de apostas deve ser dinheiro que você pode perder sem comprometer sua vida financeira. Misturar cria pressão psicológica que leva a decisões ruins.' },
            { n: '4', t: 'Registre cada aposta com detalhes', d: 'Odds, stake, resultado, mercado e casa. Sem dados é impossível calcular ROI, identificar mercados lucrativos ou corrigir erros de julgamento.' },
            { n: '5', t: 'Revise a estratégia periodicamente', d: 'Após 100-200 apostas, analise seus resultados. Ajuste o percentual de stake conforme seu ROI real — não apenas o estimado.' },
          ].map((d, i) => (
            <li key={i} className="flex gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee' }}>{d.n}</span>
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
            { to: '/calculadoras/roi', icon: '📈', label: 'ROI' },
            { to: '/calculadoras/odds', icon: '📊', label: 'Calculadora de Odds' },
            { to: '/calculadoras/martingale', icon: '🎲', label: 'Martingale' },
            { to: '/calculadoras/simulador-lucro', icon: '💹', label: 'Simulador' },
            { to: '/calculadoras/aposta-simples', icon: '🎯', label: 'Aposta Simples' },
            { to: '/calculadoras/multipla-parlay', icon: '🎰', label: 'Múltipla / Parlay' },
            { to: '/calculadoras/arbitragem', icon: '💰', label: 'Arbitragem' },
            { to: '/calculadoras/conversor-odds', icon: '🔄', label: 'Conversor de Odds' },
          ].map((l, i) => (
            <Link
              key={i}
              to={l.to}
              className="flex items-center gap-2 px-3 py-3 rounded-xl text-xs font-medium transition-all duration-150"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)'; e.currentTarget.style.color = '#22d3ee'; }}
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
  const halfKelly = kellyStake / 2;
  const flatStake = validFlat ? b * pctN : 0;

  const probImpl = o > 1 ? (1 / o) * 100 : 0;
  const edge = validKelly ? (p * 100 - probImpl) : null;

  const metodos = [
    { id: 'kelly', label: 'Kelly Criterion', desc: 'Maximiza crescimento' },
    { id: 'flat', label: 'Flat Betting', desc: 'Percentual fixo' },
    { id: 'fixo', label: '% Personalizado', desc: 'Você define' },
  ];

  const faqs = [
    { q: 'O que é o critério de Kelly em apostas?', a: 'Fórmula que calcula o percentual ideal da banca a apostar em cada evento para maximizar o crescimento a longo prazo, com base na sua estimativa de probabilidade e a odd disponível.' },
    { q: 'Como calcular o Kelly Criterion?', a: 'Kelly % = (p × (o-1) - (1-p)) / (o-1), onde p é sua probabilidade estimada e o é a odd decimal. Resultado positivo indica edge; negativo indica que não tem valor.' },
    { q: 'O que é Half-Kelly e por que usá-lo?', a: 'Half-Kelly é 50% do Kelly puro. Reduz variância significativamente com pequena perda de crescimento. Recomendado para quem pode superestimar o edge.' },
    { q: 'Qual percentual da banca devo apostar?', a: 'Apostadores conservadores usam 1-3% por aposta. Acima de 5% o risco de ruína aumenta drasticamente mesmo com edge positivo.' },
    { q: 'O que é flat betting?', a: 'Apostar sempre o mesmo percentual fixo da banca em todas as apostas. É a estratégia mais simples e protege contra sequências longas de perdas.' },
    { q: 'Qual a diferença entre banca fixa e banca variável?', a: 'Na banca variável (recomendada), o stake é sempre um % da banca atual — cresce com a banca e reduz após perdas. Na fixa, o valor em reais não muda.' },
    { q: 'O Kelly Criterion funciona sem probabilidade estimada?', a: 'Não. Kelly exige uma estimativa precisa de probabilidade. Sem isso, use flat betting ou percentual fixo.' },
    { q: 'Quantas unidades de banca devo ter?', a: 'No mínimo 50-100 unidades. Com 2% por aposta (50 unidades), você absorve variâncias normais sem risco alto de ruína.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Gestão de Banca"
      description="Calcule o stake ideal usando Kelly Criterion, Half-Kelly, flat betting ou percentual fixo. Gerencie sua banca com disciplina e maximize o crescimento a longo prazo."
      slug="gestao-banca"
      faqs={faqs}
      schema={schema}
      explanation={<GestaoBancaExplanation />}
    >
      <div className="space-y-6">

        {/* Method selector */}
        <div>
          <p className="label">Método de gestão</p>
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

        {/* Banca */}
        <div>
          <label className="label">Banca atual (R$)</label>
          <div className="flex flex-wrap gap-2 mb-2.5">
            {PRESETS_BANCA.map(p => (
              <button
                key={p}
                onClick={() => setBanca(String(p))}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                style={{
                  background: banca === String(p) ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${banca === String(p) ? 'rgba(34,211,238,0.4)' : 'var(--border)'}`,
                  color: banca === String(p) ? '#22d3ee' : 'var(--text-2)',
                }}
              >
                R${p.toLocaleString('pt-BR')}
              </button>
            ))}
          </div>
          <input
            type="number"
            className="input-field"
            placeholder="ex: 1000"
            min="0"
            value={banca}
            onChange={e => setBanca(e.target.value)}
          />
        </div>

        {/* Kelly inputs */}
        {metodo === 'kelly' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Odd decimal</label>
              <input
                type="number"
                className="input-field"
                placeholder="ex: 2.50"
                step="0.01"
                min="1.01"
                value={odd}
                onChange={e => setOdd(e.target.value)}
              />
              {probImpl > 0 && (
                <p className="text-xs mt-1.5" style={{ color: 'var(--text-3)' }}>
                  Prob. implícita da odd: <strong style={{ color: '#22d3ee' }}>{probImpl.toFixed(1)}%</strong>
                </p>
              )}
            </div>
            <div>
              <label className="label">Sua probabilidade estimada (%)</label>
              <input
                type="number"
                className="input-field"
                placeholder="ex: 55"
                min="1"
                max="99"
                value={prob}
                onChange={e => setProb(e.target.value)}
              />
              {edge !== null && (
                <p className="text-xs mt-1.5" style={{ color: 'var(--text-3)' }}>
                  Edge: <strong style={{ color: edge > 0 ? '#4ade80' : '#f87171' }}>
                    {edge > 0 ? '+' : ''}{edge.toFixed(1)}%
                  </strong>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Flat / Fixo slider */}
        {(metodo === 'flat' || metodo === 'fixo') && (
          <div>
            <label className="label">Percentual da banca: <strong style={{ color: '#22d3ee' }}>{pct}%</strong></label>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={pct}
              onChange={e => setPct(e.target.value)}
              className="w-full accent-cyan-400 mb-2"
            />
            <div className="flex justify-between text-xs" style={{ color: 'var(--text-3)' }}>
              <span>0.5% conservador</span>
              <span>5% arrojado</span>
              <span>10% alto risco</span>
            </div>
          </div>
        )}

        {/* Results — Kelly */}
        {metodo === 'kelly' && validKelly && (
          kellyFrac <= 0 ? (
            <div
              className="flex items-center gap-3 px-4 py-4 rounded-xl"
              style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.18)' }}
            >
              <span className="text-lg">⚠️</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--red)' }}>Sem edge — não aposte</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>
                  Kelly negativo ({(kellyFrac * 100).toFixed(1)}%). As odds não compensam a probabilidade estimada.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="result-box">
                  <p className="result-value" style={{ color: '#22d3ee' }}>R${kellyStake.toFixed(2)}</p>
                  <p className="result-label">Stake Kelly puro</p>
                </div>
                <div className="result-box">
                  <p className="result-value" style={{ color: '#818cf8' }}>R${halfKelly.toFixed(2)}</p>
                  <p className="result-label">Half-Kelly (recomendado)</p>
                </div>
                <div className="result-box">
                  <p className="result-value" style={{ color: '#fbbf24' }}>{(kellyFrac * 100).toFixed(2)}%</p>
                  <p className="result-label">% Kelly da banca</p>
                </div>
                <div className="result-box">
                  <p className="result-value" style={{ color: edge > 0 ? '#4ade80' : '#f87171' }}>
                    {edge > 0 ? '+' : ''}{edge !== null ? edge.toFixed(1) : 0}%
                  </p>
                  <p className="result-label">Edge estimado</p>
                </div>
              </div>
              <div
                className="rounded-xl px-4 py-3 text-xs"
                style={{ background: 'rgba(129,140,248,0.06)', border: '1px solid rgba(129,140,248,0.15)', color: 'var(--text-3)' }}
              >
                Kelly puro recomenda <strong style={{ color: '#22d3ee' }}>{(kellyFrac * 100).toFixed(1)}%</strong> da banca. Na prática, use o <strong style={{ color: '#818cf8' }}>Half-Kelly (R${halfKelly.toFixed(2)})</strong> para reduzir variância mantendo crescimento próximo ao ótimo.
              </div>
            </div>
          )
        )}

        {/* Results — Flat / Fixo */}
        {(metodo === 'flat' || metodo === 'fixo') && validFlat && (
          <div className="space-y-3">
            <div className="result-box">
              <p className="result-value" style={{ color: '#22d3ee' }}>R${flatStake.toFixed(2)}</p>
              <p className="result-label">Stake recomendado ({pct}% de R${b.toLocaleString('pt-BR')})</p>
            </div>
            <div
              className="rounded-xl px-4 py-3 text-xs"
              style={{
                background: pctN > 0.05 ? 'rgba(248,113,113,0.06)' : pctN > 0.03 ? 'rgba(251,191,36,0.04)' : 'rgba(34,197,94,0.04)',
                border: `1px solid ${pctN > 0.05 ? 'rgba(248,113,113,0.2)' : pctN > 0.03 ? 'rgba(251,191,36,0.15)' : 'rgba(34,197,94,0.15)'}`,
                color: 'var(--text-3)',
              }}
            >
              {pctN <= 0.03
                ? `✓ ${pct}% — nível conservador. Boa proteção contra sequências de perdas.`
                : pctN <= 0.05
                  ? `⚠ ${pct}% — nível moderado/arrojado. Certifique-se de ter edge real antes de usar.`
                  : `⚠ ${pct}% — risco alto. Com ${pct}% por aposta você precisa de apenas ${Math.ceil(100 / parseFloat(pct))} perdas consecutivas para perder metade da banca.`}
            </div>
          </div>
        )}

        {!b && (
          <div
            className="rounded-xl flex items-center justify-center py-8"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Informe a banca para calcular o stake</p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
