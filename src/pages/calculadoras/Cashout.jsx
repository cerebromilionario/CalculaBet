import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

const PRESETS_STAKE = [10, 25, 50, 100, 200, 500];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de Cashout — CalculaBet',
      url: 'https://calculabet.netlify.app/calculadoras/cashout',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description: 'Calcule o valor justo do cashout, compare com o oferecido pela casa, descubra a margem cobrada e decida com dados se vale fechar sua aposta antecipadamente.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'O que é cashout em apostas esportivas?', acceptedAnswer: { '@type': 'Answer', text: 'Cashout é a opção de fechar uma aposta antes do evento terminar, recebendo um valor parcial. Permite garantir lucro antecipado ou limitar perdas se o jogo virar contra você.' } },
        { '@type': 'Question', name: 'Como calcular o cashout justo?', acceptedAnswer: { '@type': 'Answer', text: 'Cashout justo = (Stake × Odd Original) ÷ Odd Atual. Se a odd caiu (você está ganhando), o valor é maior que o stake. Se subiu (você está perdendo), é menor.' } },
        { '@type': 'Question', name: 'Por que o cashout da casa é menor que o valor justo?', acceptedAnswer: { '@type': 'Answer', text: 'A casa cobra uma margem sobre o cashout justo, geralmente entre 5% e 15%. Essa margem é o lucro da casa ao oferecer a liquidação antecipada.' } },
        { '@type': 'Question', name: 'Quando vale a pena fazer cashout?', acceptedAnswer: { '@type': 'Answer', text: 'Vale quando a margem da casa é baixa (<5%) e você tem razões para crer que o resultado pode mudar (lesão de jogador, gol sofrido em múltipla, etc.). Matematicamente, o cashout raramente tem valor esperado positivo.' } },
        { '@type': 'Question', name: 'Como usar cashout em apostas múltiplas?', acceptedAnswer: { '@type': 'Answer', text: 'Em múltiplas, o cashout é calculado com base na odd acumulada restante e na odd original total. Se 3 de 4 seleções já ganharam, o cashout reflete apenas o risco da última seleção.' } },
        { '@type': 'Question', name: 'Cashout parcial vale a pena?', acceptedAnswer: { '@type': 'Answer', text: 'O cashout parcial permite fechar apenas uma fração da aposta, mantendo parte em aberto. É uma alternativa ao cashout total — útil quando você quer garantir algo mas ainda acredita na seleção.' } },
        { '@type': 'Question', name: 'Qual a alternativa ao cashout para proteger uma aposta?', acceptedAnswer: { '@type': 'Answer', text: 'O hedge (aposta de proteção) é uma alternativa onde você aposta no resultado oposto em outra casa para garantir lucro sem depender da margem de cashout. Geralmente tem condições melhores.' } },
        { '@type': 'Question', name: 'Todas as casas oferecem cashout?', acceptedAnswer: { '@type': 'Answer', text: 'Não. Casas como Bet365, Betano e Sportingbet oferecem cashout em muitos mercados. Pinnacle, por exemplo, não oferece cashout. A disponibilidade depende da casa e do mercado.' } },
      ],
    },
  ],
};

function CashoutExplanation() {
  return (
    <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>O que é cashout e como funciona?</h2>
        <p className="mb-3">
          <strong style={{ color: 'var(--text-1)' }}>Cashout</strong> é a funcionalidade que permite fechar uma aposta antes do evento terminar, recebendo um valor calculado com base nas odds atuais do mercado. É como um "seguro" que as casas oferecem — você pode garantir lucro parcial se estiver ganhando, ou limitar seu prejuízo se o jogo virar.
        </p>
        <p className="mb-3">
          No Brasil, o cashout está disponível nas principais casas como Bet365, Betano e Sportingbet, geralmente em mercados de futebol, tênis e basquete. Ele pode ser acionado durante o jogo (cashout ao vivo) ou, em alguns casos, antes do início do evento se as odds mudarem.
        </p>
        <p>
          O ponto crítico: <strong style={{ color: 'var(--text-1)' }}>a casa sempre paga menos que o valor justo</strong>. Ela cobra uma margem sobre o cashout — exatamente como cobra nas odds normais. Nossa calculadora mostra o valor justo e a margem da casa para que você decida com informação.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>A fórmula do cashout justo</h2>
        <p className="mb-4">
          O cálculo é baseado em uma lógica simples: se você vendesse sua aposta pelo valor justo de mercado, quanto receberia?
        </p>
        <div className="rounded-xl p-5 mb-4" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
          <p className="text-xs font-semibold mb-3" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Fórmulas</p>
          <div className="space-y-2 font-mono text-xs" style={{ color: 'var(--text-1)' }}>
            <p>Cashout justo = (Stake × Odd original) ÷ Odd atual</p>
            <p>Lucro com cashout = Cashout justo − Stake</p>
            <p>Lucro se ganhar = Stake × (Odd original − 1)</p>
            <p>Margem da casa = (Cashout justo − Cashout ofertado) ÷ Cashout justo × 100</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Cenário</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Stake</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Odd original → atual</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Cashout justo</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Situação</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cen: 'Ganhando bem', stake: 'R$100', odds: '3.00 → 1.30', co: 'R$230,77', sit: 'Lucro parcial garantido' },
                { cen: 'Ganhando pouco', stake: 'R$100', odds: '2.00 → 1.60', co: 'R$125,00', sit: 'Lucro menor que esperar' },
                { cen: 'Empatado', stake: 'R$100', odds: '2.00 → 2.00', co: 'R$100,00', sit: 'Recupera o stake' },
                { cen: 'Perdendo', stake: 'R$100', odds: '2.00 → 4.00', co: 'R$50,00', sit: 'Limita a perda' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-1)' }}>{row.cen}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{row.stake}</td>
                  <td className="px-4 py-3" style={{ color: '#22d3ee' }}>{row.odds}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: '#4ade80' }}>{row.co}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-3)' }}>{row.sit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>A margem do cashout: quanto a casa cobra?</h2>
        <p className="mb-4">
          Toda vez que você faz cashout, a casa cobra uma margem — assim como nas apostas normais. A diferença é que a margem do cashout pode ser ainda maior. Analise a margem antes de decidir:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Margem < 5%', cor: '#4ade80', desc: 'Cashout justo. Vale considerar, especialmente com risco real de perda.' },
            { label: 'Margem 5%–10%', cor: '#fbbf24', desc: 'Margem normal. Use se tiver motivo estratégico claro para fechar.' },
            { label: 'Margem > 10%', cor: '#f87171', desc: 'Cashout caro. A casa está cobrando muito — considere hedge como alternativa.' },
          ].map((c, i) => (
            <div key={i} className="rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${c.cor}25` }}>
              <p className="text-sm font-bold mb-2" style={{ color: c.cor }}>{c.label}</p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>{c.desc}</p>
            </div>
          ))}
        </div>
        <p>
          Quando a margem do cashout é alta, considere fazer <strong style={{ color: 'var(--text-1)' }}>hedge manual</strong>: apostar no resultado oposto em outra casa. Use a <Link to="/calculadoras/hedge" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de Hedge</Link> para comparar as condições.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Cashout vs. Hedge: qual é melhor?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-xl p-5" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
            <p className="text-xs font-semibold mb-3" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Cashout (pela casa)</p>
            <ul className="space-y-2">
              {[
                'Instantâneo — um clique',
                'Disponível em apostas ao vivo',
                'A casa determina o valor',
                'Margem de 5–15% sobre o valor justo',
                'Não requer conta em outra casa',
                'Pode ser parcial (fechar % da aposta)',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2" style={{ color: 'var(--text-2)' }}>
                  <span style={{ color: '#22d3ee' }}>→</span> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl p-5" style={{ background: 'rgba(129,140,248,0.04)', border: '1px solid rgba(129,140,248,0.12)' }}>
            <p className="text-xs font-semibold mb-3" style={{ color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Hedge (aposta oposta)</p>
            <ul className="space-y-2">
              {[
                'Você controla o valor de proteção',
                'Pode obter condições melhores em outra casa',
                'Requer conta ativa em outra plataforma',
                'Margem menor em casas competitivas',
                'Mais trabalho — pesquisar odds, calcular stake',
                'Flexibilidade para cobertura parcial ou total',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2" style={{ color: 'var(--text-2)' }}>
                  <span style={{ color: '#818cf8' }}>→</span> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Cashout em apostas múltiplas</h2>
        <p className="mb-3">
          O cashout em múltiplas é calculado com base na <strong style={{ color: 'var(--text-1)' }}>odd acumulada restante</strong>. Se você tem 4 seleções e 3 já ganharam, a odd efetiva atual é o preço atual da 4ª seleção.
        </p>
        <p className="mb-3">
          Exemplo: múltipla original com 4 seleções, odd total 10.00, stake R$50 → retorno potencial R$500. Após 3 seleções ganharem, a última seleção agora tem odd 1.30 (estava 1.50 quando você apostou). O cashout justo seria: (50 × 10.00) / 1.30 = <strong style={{ color: 'var(--text-1)' }}>R$384,62</strong>.
        </p>
        <p>
          Use a <Link to="/calculadoras/multipla-parlay" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de Múltipla</Link> para calcular a odd original da sua combinação e então inserir aqui o valor correto.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Quando fazer (e quando evitar) o cashout</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { tipo: '✓ Considere fazer cashout', cor: '#4ade80', bg: 'rgba(34,197,94,0.04)', border: 'rgba(34,197,94,0.12)', items: ['Lesão do seu jogador/time durante o jogo', 'Odd caiu muito e a margem da casa está abaixo de 5%', 'Penúltima seleção de uma múltipla longa acabou de ganhar', 'Você precisa do dinheiro e o lucro atual já é satisfatório'] },
            { tipo: '✗ Evite fazer cashout', cor: '#f87171', bg: 'rgba(248,113,113,0.04)', border: 'rgba(248,113,113,0.12)', items: ['Apenas por ansiedade — sem motivo estratégico', 'Quando a margem da casa está acima de 10%', 'Em jogos com muitos minutos ainda pela frente sem pressão', 'Quando o hedge manual oferece condições muito melhores'] },
          ].map((sec, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: sec.bg, border: `1px solid ${sec.border}` }}>
              <p className="text-xs font-semibold mb-3" style={{ color: sec.cor, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{sec.tipo}</p>
              <ul className="space-y-2">
                {sec.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-2)' }}>
                    <span style={{ color: sec.cor }}>→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>Ferramentas relacionadas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { to: '/calculadoras/hedge', icon: '🛡️', label: 'Hedge' },
            { to: '/calculadoras/multipla-parlay', icon: '🎰', label: 'Múltipla / Parlay' },
            { to: '/calculadoras/odds', icon: '📊', label: 'Calculadora de Odds' },
            { to: '/calculadoras/arbitragem', icon: '💰', label: 'Arbitragem' },
            { to: '/calculadoras/aposta-simples', icon: '🎯', label: 'Aposta Simples' },
            { to: '/calculadoras/dutching', icon: '⚖️', label: 'Dutching' },
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

export default function Cashout() {
  const [stake, setStake] = useState('');
  const [oddOriginal, setOddOriginal] = useState('');
  const [oddAtual, setOddAtual] = useState('');
  const [cashoutCasa, setCashoutCasa] = useState('');

  const s = parseFloat(stake);
  const oo = parseFloat(oddOriginal);
  const oa = parseFloat(oddAtual);
  const cc = parseFloat(cashoutCasa);
  const valid = s > 0 && oo > 1 && oa > 1;

  const cashoutJusto = valid ? (s * oo) / oa : 0;
  const lucroSeCashout = valid ? cashoutJusto - s : 0;
  const lucroSeGanhar = valid ? s * oo - s : 0;
  const margemCasa = valid && cc > 0 ? ((cashoutJusto - cc) / cashoutJusto) * 100 : null;

  const tendencia = valid ? (oa < oo ? 'ganhando' : oa > oo ? 'perdendo' : 'neutro') : null;
  const tendenciaCor = tendencia === 'ganhando' ? '#4ade80' : tendencia === 'perdendo' ? '#f87171' : '#fbbf24';

  const faqs = [
    { q: 'O que é cashout em apostas esportivas?', a: 'Cashout é a opção de fechar uma aposta antes do evento terminar, recebendo um valor parcial baseado nas odds atuais.' },
    { q: 'Como calcular o cashout justo?', a: 'Cashout justo = (Stake × Odd Original) ÷ Odd Atual. Se a odd caiu, você recebe mais que o stake; se subiu, menos.' },
    { q: 'Por que o cashout da casa é menor que o valor justo?', a: 'A casa cobra uma margem de 5-15% sobre o cashout justo. Essa margem é o custo de fechar a aposta antecipadamente.' },
    { q: 'Quando vale a pena fazer cashout?', a: 'Vale quando a margem é baixa (<5%) e existe motivo estratégico real (lesão, virada iminente). Por emoção, raramente vale.' },
    { q: 'Como usar cashout em apostas múltiplas?', a: 'O cashout de uma múltipla é calculado com base na odd acumulada restante. Use nossa calculadora de múltipla para encontrar a odd original.' },
    { q: 'Cashout parcial vale a pena?', a: 'O cashout parcial fecha uma fração da aposta. É alternativa ao cashout total — útil para garantir parte do valor sem perder toda a posição.' },
    { q: 'Qual a alternativa ao cashout?', a: 'O hedge manual: apostar no resultado oposto em outra casa. Geralmente tem condições melhores que o cashout da casa original.' },
    { q: 'Todas as casas oferecem cashout?', a: 'Não. Bet365, Betano e Sportingbet oferecem. Pinnacle não. A disponibilidade depende da casa e do mercado.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Cashout"
      description="Calcule o valor justo do cashout, compare com o oferecido pela casa, descubra a margem cobrada e decida com dados se vale fechar sua aposta antecipadamente."
      slug="cashout"
      faqs={faqs}
      schema={schema}
      explanation={<CashoutExplanation />}
    >
      <div className="space-y-6">

        {/* Stake */}
        <div>
          <label className="label">Stake original (R$)</label>
          <div className="flex flex-wrap gap-2 mb-2.5">
            {PRESETS_STAKE.map(p => (
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
            placeholder="ex: 100"
            min="0"
            value={stake}
            onChange={e => setStake(e.target.value)}
          />
        </div>

        {/* Odds */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Odd no momento da aposta</label>
            <input
              type="number"
              className="input-field"
              placeholder="ex: 3.00"
              step="0.01"
              min="1.01"
              value={oddOriginal}
              onChange={e => setOddOriginal(e.target.value)}
            />
            {oo > 1 && (
              <p className="text-xs mt-1.5" style={{ color: 'var(--text-3)' }}>
                Prob. implícita: <strong style={{ color: '#22d3ee' }}>{((1 / oo) * 100).toFixed(1)}%</strong>
              </p>
            )}
          </div>
          <div>
            <label className="label">Odd atual no mercado</label>
            <input
              type="number"
              className="input-field"
              placeholder="ex: 1.80"
              step="0.01"
              min="1.01"
              value={oddAtual}
              onChange={e => setOddAtual(e.target.value)}
            />
            {oa > 1 && (
              <p className="text-xs mt-1.5" style={{ color: 'var(--text-3)' }}>
                Prob. implícita: <strong style={{ color: '#22d3ee' }}>{((1 / oa) * 100).toFixed(1)}%</strong>
              </p>
            )}
          </div>
        </div>

        {/* Tendência */}
        {tendencia && (
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-2.5"
            style={{
              background: `${tendenciaCor}0d`,
              border: `1px solid ${tendenciaCor}25`,
            }}
          >
            <span className="text-sm">
              {tendencia === 'ganhando' ? '📈' : tendencia === 'perdendo' ? '📉' : '➡️'}
            </span>
            <p className="text-xs" style={{ color: 'var(--text-2)' }}>
              Odd {tendencia === 'ganhando' ? 'caiu' : tendencia === 'perdendo' ? 'subiu' : 'igual'} →{' '}
              <strong style={{ color: tendenciaCor }}>
                {tendencia === 'ganhando' ? 'você está ganhando' : tendencia === 'perdendo' ? 'você está perdendo' : 'situação neutra'}
              </strong>
            </p>
          </div>
        )}

        {/* Cashout da casa */}
        <div>
          <label className="label">
            Cashout oferecido pela casa (R$){' '}
            <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>— opcional</span>
          </label>
          <input
            type="number"
            className="input-field"
            placeholder="ex: 145.00"
            min="0"
            value={cashoutCasa}
            onChange={e => setCashoutCasa(e.target.value)}
          />
        </div>

        {/* Results */}
        {valid ? (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="result-box">
                <p className="result-value" style={{ color: '#22d3ee' }}>R${cashoutJusto.toFixed(2)}</p>
                <p className="result-label">Cashout justo</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: lucroSeCashout >= 0 ? '#4ade80' : 'var(--red)' }}>
                  {lucroSeCashout >= 0 ? '+' : ''}R${lucroSeCashout.toFixed(2)}
                </p>
                <p className="result-label">{lucroSeCashout >= 0 ? 'Lucro' : 'Prejuízo'} com cashout</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: '#818cf8' }}>+R${lucroSeGanhar.toFixed(2)}</p>
                <p className="result-label">Lucro se ganhar</p>
              </div>
            </div>

            {cc > 0 && (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="result-box">
                    <p className="result-value">R${cc.toFixed(2)}</p>
                    <p className="result-label">Cashout da casa</p>
                  </div>
                  <div className="result-box">
                    <p className="result-value" style={{ color: margemCasa > 10 ? 'var(--red)' : margemCasa > 5 ? '#fbbf24' : '#4ade80' }}>
                      {margemCasa !== null ? margemCasa.toFixed(1) : 0}%
                    </p>
                    <p className="result-label">Margem da casa</p>
                  </div>
                </div>
                <div
                  className="flex items-start gap-3 px-4 py-3 rounded-xl"
                  style={{
                    background: margemCasa > 10 ? 'rgba(248,113,113,0.06)' : margemCasa > 5 ? 'rgba(251,191,36,0.04)' : 'rgba(34,197,94,0.04)',
                    border: `1px solid ${margemCasa > 10 ? 'rgba(248,113,113,0.2)' : margemCasa > 5 ? 'rgba(251,191,36,0.15)' : 'rgba(34,197,94,0.15)'}`,
                  }}
                >
                  <span className="text-base flex-shrink-0">{margemCasa > 10 ? '⚠️' : margemCasa > 5 ? 'ℹ️' : '✓'}</span>
                  <p className="text-xs" style={{ color: 'var(--text-2)' }}>
                    {margemCasa > 10
                      ? `Margem de ${margemCasa.toFixed(1)}% — cashout caro. Considere hedge manual em outra casa para condições melhores.`
                      : margemCasa > 5
                        ? `Margem de ${margemCasa.toFixed(1)}% — dentro do esperado. Use se tiver motivo estratégico para fechar agora.`
                        : `Margem de ${margemCasa.toFixed(1)}% — cashout competitivo. Vale considerar fechar se a situação justificar.`}
                  </p>
                </div>
              </div>
            )}

            <div
              className="rounded-xl px-4 py-3 text-xs"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-3)' }}
            >
              {lucroSeCashout >= 0
                ? `Fazendo cashout agora você garante R${lucroSeCashout.toFixed(2)} de lucro. Aguardar pode render mais R${(lucroSeGanhar - lucroSeCashout).toFixed(2)} se a aposta ganhar — ou perder tudo.`
                : `Fazendo cashout você recupera R${cashoutJusto.toFixed(2)} de R${s.toFixed(2)} apostados. Se a aposta ganhar ainda renderia R${lucroSeGanhar.toFixed(2)} de lucro.`}
            </div>
          </div>
        ) : (
          <div
            className="rounded-xl flex items-center justify-center py-10"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Preencha stake e as duas odds para calcular</p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
