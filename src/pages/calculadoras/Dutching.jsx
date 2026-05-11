import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

const PRESETS_BANCA = [100, 200, 500, 1000, 2000, 5000];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de Dutching — CalculaBet',
      url: 'https://calculabet.netlify.app/calculadoras/dutching',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description: 'Distribua sua banca entre múltiplas seleções para garantir o mesmo retorno independente de qual vença. Calcula stakes proporcionais, lucro, ROI e probabilidade acumulada.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'O que é dutching em apostas esportivas?', acceptedAnswer: { '@type': 'Answer', text: 'Dutching é uma estratégia que distribui o stake entre múltiplas seleções de forma proporcional, garantindo o mesmo retorno total independente de qual das seleções cobertas vencer.' } },
        { '@type': 'Question', name: 'Como calcular o stake de cada seleção no dutching?', acceptedAnswer: { '@type': 'Answer', text: 'Some os inversos de todas as odds (1/odd₁ + 1/odd₂ + ...) para obter o total de probabilidades implícitas. O stake de cada seleção é: Banca / (Odd × Total de probabilidades implícitas).' } },
        { '@type': 'Question', name: 'Qual a diferença entre dutching e arbitragem?', acceptedAnswer: { '@type': 'Answer', text: 'Na arbitragem, você cobre todos os resultados possíveis de um evento para garantir lucro livre de risco. No dutching, você cobre apenas as seleções de sua escolha — se uma seleção não coberta vencer, você perde.' } },
        { '@type': 'Question', name: 'O dutching sempre gera lucro?', acceptedAnswer: { '@type': 'Answer', text: 'Não. O dutching garante retorno igual se uma das seleções cobertas vencer, mas a soma das probabilidades implícitas geralmente é maior que 100% (margem da casa), então o retorno esperado é negativo a menos que você tenha edge.' } },
        { '@type': 'Question', name: 'Quando usar dutching é vantajoso?', acceptedAnswer: { '@type': 'Answer', text: 'Quando você acredita que múltiplos resultados têm odds subavaliadas (value bets), pode usar dutching para cobrir todos eles com exposição equalizada, sem se comprometer com um único resultado.' } },
        { '@type': 'Question', name: 'Posso usar dutching em trocas de apostas (exchanges)?', acceptedAnswer: { '@type': 'Answer', text: 'Sim, exchanges como Betfair permitem dutching eficiente pois têm spreads menores. O Betfair até tem ferramenta nativa de dutching. Porém, a comissão sobre lucros precisa ser considerada no cálculo.' } },
        { '@type': 'Question', name: 'Qual o número ideal de seleções para dutching?', acceptedAnswer: { '@type': 'Answer', text: 'Geralmente 2 a 4 seleções. Com mais seleções, a soma das probabilidades implícitas cresce, aumentando a margem efetiva contra você e reduzindo o retorno garantido.' } },
        { '@type': 'Question', name: 'Dutching é permitido nas casas de apostas?', acceptedAnswer: { '@type': 'Answer', text: 'Sim, é completamente permitido. Você está apenas fazendo múltiplas apostas no mesmo evento. Diferente da arbitragem entre casas, o dutching é feito tipicamente em uma única casa ou exchange.' } },
      ],
    },
  ],
};

function DutchingExplanation() {
  return (
    <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>O que é dutching em apostas?</h2>
        <p className="mb-3">
          <strong style={{ color: 'var(--text-1)' }}>Dutching</strong> é uma estratégia de apostas que distribui o stake entre múltiplas seleções de forma proporcional, garantindo que o <strong style={{ color: 'var(--text-1)' }}>retorno total seja igual independente de qual das seleções cobertas vencer</strong>. O nome vem de uma estratégia clássica de corridas de cavalos.
        </p>
        <p className="mb-3">
          Imagine que você analisa um jogo e acredita que tanto o Time A quanto o empate têm boas chances — mas não quer escolher apenas um. Com dutching, você distribui sua banca entre os dois de forma que, se o Time A vencer ou se empatar, você receba exatamente o mesmo valor de retorno.
        </p>
        <p>
          O dutching é muito usado em corridas de cavalos, futebol e tênis — mercados onde a probabilidade se distribui entre vários resultados plausíveis e o apostador tem convicção em mais de um desfecho.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Como calcular o dutching: fórmulas e exemplos</h2>
        <p className="mb-4">
          A matemática do dutching é baseada nas probabilidades implícitas (1/odd) de cada seleção.
        </p>
        <div className="rounded-xl p-5 mb-4" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
          <p className="text-xs font-semibold mb-3" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Fórmulas</p>
          <div className="space-y-2 font-mono text-xs" style={{ color: 'var(--text-1)' }}>
            <p>Total implícito = 1/Odd₁ + 1/Odd₂ + 1/Odd₃</p>
            <p>Stake N = Banca / (OddN × Total implícito)</p>
            <p>Retorno = Banca / Total implícito</p>
            <p>Lucro = Retorno − Banca</p>
            <p>ROI = (Lucro / Banca) × 100</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Seleção</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Odd</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>1/Odd</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Stake (R$500)</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Retorno</th>
              </tr>
            </thead>
            <tbody>
              {[
                { sel: 'Time A ganha', odd: '2.20', inv: '45.5%', stake: 'R$227', ret: 'R$499' },
                { sel: 'Empate', odd: '3.10', inv: '32.3%', stake: 'R$161', ret: 'R$499' },
                { sel: 'Time B ganha', odd: '4.50', inv: '22.2%', stake: 'R$111', ret: 'R$499' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-1)' }}>{row.sel}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{row.odd}</td>
                  <td className="px-4 py-3" style={{ color: '#22d3ee' }}>{row.inv}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-1)' }}>{row.stake}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: '#4ade80' }}>{row.ret}</td>
                </tr>
              ))}
              <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-1)' }}>Total</td>
                <td className="px-4 py-3" style={{ color: 'var(--text-3)' }}>—</td>
                <td className="px-4 py-3 font-semibold" style={{ color: '#fbbf24' }}>100% (sem lucro)</td>
                <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-1)' }}>R$499</td>
                <td className="px-4 py-3" style={{ color: 'var(--text-3)' }}>ROI ≈ 0%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs" style={{ color: 'var(--text-3)' }}>
          Neste exemplo, cobrindo os 3 resultados com odds que totalizam exatamente 100%, o retorno é igual mas sem lucro. Na prática, as odds das casas somam mais de 100%, gerando retorno menor que a banca.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Dutching vs. Arbitragem: quando usar cada um</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-xl p-5" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
            <p className="text-xs font-semibold mb-3" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Dutching</p>
            <ul className="space-y-2">
              {[
                'Cobre seleções de sua escolha (não todos os resultados)',
                'Pode ser feito em uma única casa',
                'Retorno igual para qualquer seleção coberta',
                'Menos risco de limitação de conta',
                'Exige convicção em múltiplos resultados',
                'ROI depende do edge nas odds escolhidas',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2" style={{ color: 'var(--text-2)' }}>
                  <span style={{ color: '#22d3ee' }}>→</span> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl p-5" style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.12)' }}>
            <p className="text-xs font-semibold mb-3" style={{ color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Arbitragem</p>
            <ul className="space-y-2">
              {[
                'Cobre todos os resultados possíveis',
                'Requer contas em múltiplas casas',
                'Lucro garantido independente do resultado',
                'Maior risco de limitação de conta',
                'Não requer opinião sobre o evento',
                'ROI fixo pela margem de arbitragem',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2" style={{ color: 'var(--text-2)' }}>
                  <span style={{ color: '#4ade80' }}>→</span> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p>
          Se você identificou arbitragem completa entre casas, use a <Link to="/calculadoras/arbitragem" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de Arbitragem</Link>. Para cobrir apenas algumas seleções com retorno equalizado, o dutching é a ferramenta certa. Veja também a <Link to="/calculadoras/hedge" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de Hedge</Link> para proteger apostas abertas.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Quando o dutching é lucrativo?</h2>
        <p className="mb-4">
          A maioria das aplicações de dutching resulta em retorno <em>menor</em> que a banca, porque as odds das casas já embutem margem. Para o dutching ser lucrativo, a soma das probabilidades implícitas das seleções escolhidas deve ser menor que 100% — o que só ocorre quando você está capturando odds acima do valor justo.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Soma < 100%', cor: '#4ade80', desc: 'Dutching lucrativo. Você tem edge combinado nas seleções escolhidas.' },
            { label: 'Soma = 100%', cor: '#fbbf24', desc: 'Retorno igual à banca. Sem lucro, mas sem prejuízo se uma seleção coberta vencer.' },
            { label: 'Soma > 100%', cor: '#f87171', desc: 'Retorno menor que a banca. Situação normal com odds de casas com margem embutida.' },
          ].map((c, i) => (
            <div key={i} className="rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${c.cor}25` }}>
              <p className="text-sm font-bold mb-2" style={{ color: c.cor }}>{c.label}</p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>{c.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4">
          Use a <Link to="/calculadoras/odds" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de Odds</Link> para verificar se cada seleção tem valor (EV positivo) antes de incluí-la no dutching.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Dutching em exchanges: Betfair e similares</h2>
        <p className="mb-3">
          O dutching é especialmente eficiente em <strong style={{ color: 'var(--text-1)' }}>trocas de apostas (exchanges)</strong> como Betfair, onde as odds são determinadas pelo mercado de apostadores — não pela casa. Isso significa spreads menores e odds mais próximas do valor real.
        </p>
        <p className="mb-3">
          O Betfair oferece uma ferramenta nativa de dutching que calcula automaticamente os stakes para equalizar o retorno. A desvantagem é a <strong style={{ color: 'var(--text-1)' }}>comissão sobre os lucros</strong> (geralmente 5%), que deve ser incorporada ao cálculo.
        </p>
        <p>
          Em exchanges, o dutching também é usado como estratégia de <strong style={{ color: 'var(--text-1)' }}>trading esportivo</strong>: você monta posições em múltiplos preços para sair com lucro independente da direção do mercado.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>5 estratégias práticas de dutching</h2>
        <ol className="space-y-3 list-none">
          {[
            { n: '1', t: 'Dutching de value bets', d: 'Identifique 2-3 seleções com odds subavaliadas no mesmo evento. Use dutching para cobrí-las e capturar o edge combinado com exposição equalizada.' },
            { n: '2', t: 'Dutching parcial', d: 'Em vez de cobrir todos os resultados, cubra os 2 mais prováveis e deixe o outsider descoberto. Reduz o custo e ainda protege a maior parte da probabilidade.' },
            { n: '3', t: 'Dutching em corridas de cavalos', d: 'Uma das aplicações clássicas. Selecione 3-5 cavalos que você analisa como os mais prováveis e distribua a banca proporcionalmente às odds.' },
            { n: '4', t: 'Dutching para cashout manual', d: 'Se você tem uma aposta simples ganhando e quer garantir parte do lucro, faça dutching no(s) resultado(s) oposto(s) para proteger sua posição — similar ao cashout mas com controle total.' },
            { n: '5', t: 'Limite seleções com prob. implícita baixa', d: 'Evite incluir seleções com probabilidade implícita abaixo de 15-20%. Elas consomem pouco stake mas distorcem o total implícito, piorando o ROI das seleções principais.' },
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
            { to: '/calculadoras/arbitragem', icon: '💰', label: 'Arbitragem' },
            { to: '/calculadoras/hedge', icon: '🛡️', label: 'Hedge' },
            { to: '/calculadoras/odds', icon: '📊', label: 'Calculadora de Odds' },
            { to: '/calculadoras/cashout', icon: '💳', label: 'Cash Out' },
            { to: '/calculadoras/aposta-simples', icon: '🎯', label: 'Aposta Simples' },
            { to: '/calculadoras/multipla-parlay', icon: '🎰', label: 'Múltipla / Parlay' },
            { to: '/calculadoras/gestao-banca', icon: '🏦', label: 'Gestão de Banca' },
            { to: '/calculadoras/roi', icon: '📈', label: 'ROI' },
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

export default function Dutching() {
  const [selecoes, setSelecoes] = useState([{ odd: '', nome: '' }, { odd: '', nome: '' }]);
  const [banca, setBanca] = useState('');

  const atualizar = (i, campo, v) => { const s = [...selecoes]; s[i][campo] = v; setSelecoes(s); };
  const adicionar = () => setSelecoes([...selecoes, { odd: '', nome: '' }]);
  const remover = (i) => selecoes.length > 2 && setSelecoes(selecoes.filter((_, idx) => idx !== i));

  const oddsN = selecoes.map(s => parseFloat(s.odd));
  const todasValidas = oddsN.every(o => o > 1) && selecoes.length >= 2;
  const bancaN = parseFloat(banca);
  const valid = todasValidas && bancaN > 0;

  const totalInv = todasValidas ? oddsN.reduce((acc, o) => acc + 1 / o, 0) : 0;
  const stakes = valid ? oddsN.map(o => bancaN / (o * totalInv)) : [];
  const retorno = valid ? bancaN / totalInv : 0;
  const lucro = valid ? retorno - bancaN : 0;
  const roi = valid ? (lucro / bancaN) * 100 : 0;

  const faqs = [
    { q: 'O que é dutching em apostas esportivas?', a: 'Dutching distribui o stake entre múltiplas seleções proporcionalmente, garantindo o mesmo retorno total independente de qual das seleções cobertas vencer.' },
    { q: 'Como calcular o stake de cada seleção no dutching?', a: 'Stake N = Banca / (OddN × soma de 1/todas as odds). Nossa calculadora faz isso automaticamente.' },
    { q: 'Qual a diferença entre dutching e arbitragem?', a: 'Na arbitragem você cobre todos os resultados em casas diferentes para lucro garantido. No dutching você escolhe quais resultados cobrir, geralmente em uma única casa.' },
    { q: 'O dutching sempre gera lucro?', a: 'Não. A soma das probabilidades implícitas normalmente supera 100% (margem da casa), então o retorno é menor que a banca. Para lucro, é necessário ter edge nas odds escolhidas.' },
    { q: 'Quando usar dutching é vantajoso?', a: 'Quando você identifica múltiplas seleções com odds subavaliadas no mesmo evento e quer cobrir todas com exposição equalizada.' },
    { q: 'Posso usar dutching em exchanges?', a: 'Sim. Exchanges como Betfair têm odds mais eficientes e o Betfair até oferece ferramenta nativa de dutching. Lembre de considerar a comissão sobre lucros (geralmente 5%).' },
    { q: 'Qual o número ideal de seleções para dutching?', a: 'Geralmente 2 a 4 seleções. Mais seleções aumentam a soma de probabilidades implícitas, piorando o ROI.' },
    { q: 'Dutching é permitido nas casas de apostas?', a: 'Sim, é completamente permitido. Você está apenas fazendo múltiplas apostas no mesmo evento em uma única casa.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Dutching"
      description="Distribua sua banca entre múltiplas seleções para garantir o mesmo retorno independente de qual vença. Calcula stakes proporcionais, lucro, ROI e probabilidade acumulada."
      slug="dutching"
      faqs={faqs}
      schema={schema}
      explanation={<DutchingExplanation />}
    >
      <div className="space-y-6">

        {/* Selections */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="label mb-0">Seleções</label>
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
            {selecoes.map((s, i) => {
              const oddNum = parseFloat(s.odd);
              const probImpl = oddNum > 1 ? (1 / oddNum) * 100 : null;
              return (
                <div key={i} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                  <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-end">
                    <div>
                      <label className="label text-xs mb-1.5">Nome da seleção</label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder={`Seleção ${i + 1}`}
                        value={s.nome}
                        onChange={e => atualizar(i, 'nome', e.target.value)}
                      />
                    </div>
                    <div className="w-28">
                      <label className="label text-xs mb-1.5">Odd</label>
                      <input
                        type="number"
                        className="input-field"
                        placeholder="3.50"
                        step="0.01"
                        min="1.01"
                        value={s.odd}
                        onChange={e => atualizar(i, 'odd', e.target.value)}
                      />
                    </div>
                    {selecoes.length > 2 && (
                      <button
                        onClick={() => remover(i)}
                        className="p-2.5 rounded-xl transition-colors mb-px"
                        style={{ color: 'var(--red)', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)' }}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {probImpl !== null && (
                    <p className="text-xs mt-2" style={{ color: 'var(--text-3)' }}>
                      Prob. implícita: <strong style={{ color: '#22d3ee' }}>{probImpl.toFixed(1)}%</strong>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Soma das probabilidades preview */}
        {todasValidas && (
          <div
            className="flex items-center justify-between rounded-xl px-4 py-3"
            style={{
              background: totalInv <= 1 ? 'rgba(34,197,94,0.06)' : 'rgba(251,191,36,0.04)',
              border: `1px solid ${totalInv <= 1 ? 'rgba(34,197,94,0.2)' : 'rgba(251,191,36,0.15)'}`,
            }}
          >
            <div>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Soma das probabilidades</p>
              <p className="text-2xl font-bold mt-0.5" style={{ color: totalInv <= 1 ? '#4ade80' : '#fbbf24' }}>
                {(totalInv * 100).toFixed(2)}%
              </p>
            </div>
            <p className="text-xs text-right max-w-[140px]" style={{ color: 'var(--text-3)' }}>
              {totalInv <= 1 ? '✓ Abaixo de 100% → dutching lucrativo' : 'Acima de 100% → retorno menor que banca (normal)'}
            </p>
          </div>
        )}

        {/* Banca */}
        <div>
          <label className="label">Banca total (R$)</label>
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
            placeholder="ex: 500"
            min="0"
            value={banca}
            onChange={e => setBanca(e.target.value)}
          />
        </div>

        {/* Results */}
        {valid ? (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="result-box">
                <p className="result-value" style={{ color: '#22d3ee' }}>R${retorno.toFixed(2)}</p>
                <p className="result-label">Retorno garantido</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: lucro >= 0 ? '#4ade80' : 'var(--red)' }}>
                  {lucro >= 0 ? '+' : ''}R${lucro.toFixed(2)}
                </p>
                <p className="result-label">Lucro / Prejuízo</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: '#818cf8' }}>{roi.toFixed(2)}%</p>
                <p className="result-label">ROI</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>Distribuição de stakes</p>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>Total: R${stakes.reduce((a, b) => a + b, 0).toFixed(2)}</p>
              </div>
              {stakes.map((st, i) => {
                const pct = (st / bancaN) * 100;
                return (
                  <div key={i} className="px-4 py-3" style={{ borderBottom: i < stakes.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="text-xs font-medium" style={{ color: 'var(--text-1)' }}>
                          {selecoes[i].nome || `Seleção ${i + 1}`}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                          odd {parseFloat(selecoes[i].odd).toFixed(2)} · {pct.toFixed(1)}% da banca
                        </p>
                      </div>
                      <span className="text-sm font-bold tabular-nums" style={{ color: '#22d3ee' }}>R${st.toFixed(2)}</span>
                    </div>
                    <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="h-1 rounded-full transition-all duration-300" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #22d3ee, #818cf8)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div
            className="rounded-xl flex items-center justify-center py-8"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>
              {!todasValidas ? 'Preencha as odds de todas as seleções (mín. 1.01)' : 'Informe a banca total para calcular os stakes'}
            </p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
