import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

const PRESETS_BANCA = [100, 200, 500, 1000, 2000, 5000];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de Arbitragem — CalculaBet',
      url: 'https://calculabet.netlify.app/calculadoras/arbitragem',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description: 'Identifique oportunidades de arbitragem (sure bet) em apostas esportivas e calcule como distribuir a banca para garantir lucro independente do resultado.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'O que é arbitragem em apostas esportivas?', acceptedAnswer: { '@type': 'Answer', text: 'Arbitragem (ou sure bet) ocorre quando as odds de diferentes casas de apostas permitem cobrir todos os resultados possíveis de um evento com lucro garantido, independente do desfecho.' } },
        { '@type': 'Question', name: 'Como calcular se existe arbitragem?', acceptedAnswer: { '@type': 'Answer', text: 'Some os inversos das odds de cada resultado (1/odd₁ + 1/odd₂ + ...). Se o total for menor que 1 (ou 100%), existe arbitragem. O lucro é: banca × (1/margem − 1).' } },
        { '@type': 'Question', name: 'Quanto posso ganhar com arbitragem?', acceptedAnswer: { '@type': 'Answer', text: 'O lucro típico de arbitragem varia entre 0.5% e 5% da banca por oportunidade. Oportunidades acima de 3% são raras e geralmente indicam erro de odd ou evento com alta incerteza.' } },
        { '@type': 'Question', name: 'A arbitragem é legal no Brasil?', acceptedAnswer: { '@type': 'Answer', text: 'Sim, é legal. Porém muitas casas de apostas limitam ou fecham contas de arbitragistas. Não existe lei proibindo, mas as casas têm o direito de recusar apostas ou encerrar contas.' } },
        { '@type': 'Question', name: 'Qual a diferença entre arbitragem e value bet?', acceptedAnswer: { '@type': 'Answer', text: 'Arbitragem garante lucro cobrindo todos os resultados em casas diferentes. Value bet é uma aposta em uma única odd que você acredita estar acima do valor justo. Arbitragem tem lucro garantido; value bet tem lucro esperado positivo a longo prazo.' } },
        { '@type': 'Question', name: 'Como distribuir a banca em uma arbitragem de 3 resultados?', acceptedAnswer: { '@type': 'Answer', text: 'A fórmula é: stake de cada resultado = Banca total / (Odd × Margem total). Nossa calculadora faz esse cálculo automaticamente para qualquer número de resultados.' } },
        { '@type': 'Question', name: 'Onde encontrar oportunidades de arbitragem?', acceptedAnswer: { '@type': 'Answer', text: 'Em jogos com odds equilibradas entre casas (ex: partidas de tênis ou futebol com equipes do mesmo nível). Ferramentas como OddsPortal ou RebelBetting monitoram divergências entre casas em tempo real.' } },
        { '@type': 'Question', name: 'Qual o maior risco da arbitragem?', acceptedAnswer: { '@type': 'Answer', text: 'O principal risco é o cancelamento ou alteração de uma odd após você já ter apostado em outro lado. Também existe o risco de limitação de conta pela casa e erros de execução (apostar valor errado).' } },
      ],
    },
  ],
};

function ArbExplanation() {
  return (
    <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>O que é arbitragem em apostas (sure bet)?</h2>
        <p className="mb-3">
          <strong style={{ color: 'var(--text-1)' }}>Arbitragem</strong> — ou <em>sure bet</em> — é uma estratégia que explora divergências entre as odds oferecidas por diferentes casas de apostas para garantir lucro independente do resultado do evento. Ao contrário das apostas tradicionais, onde você escolhe um vencedor, na arbitragem você cobre <strong style={{ color: 'var(--text-1)' }}>todos os resultados possíveis</strong>.
        </p>
        <p className="mb-3">
          Isso é possível porque casas de apostas diferentes têm modelos preditivos diferentes, equipes de analistas distintas e estratégias comerciais próprias. Essas divergências criam janelas — geralmente estreitas e temporárias — onde o mercado combinado é ineficiente o suficiente para permitir lucro livre de risco.
        </p>
        <p>
          No mercado brasileiro, as oportunidades surgem principalmente em jogos internacionais de futebol, tênis ATP/WTA, basquete NBA e e-sports. Casas como Bet365, Betano, Pinnacle e Sportsbet.io frequentemente divergem em eventos com odds equilibradas.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Como identificar e calcular uma arbitragem</h2>
        <p className="mb-4">
          A matemática é simples. Some os <strong style={{ color: 'var(--text-1)' }}>inversos de todas as odds</strong> (probabilidades implícitas). Se o total for menor que 1 (100%), existe arbitragem.
        </p>
        <div className="rounded-xl p-5 mb-4" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
          <p className="text-xs font-semibold mb-3" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Fórmulas</p>
          <div className="space-y-2 font-mono text-xs" style={{ color: 'var(--text-1)' }}>
            <p>Margem = 1/Odd₁ + 1/Odd₂ + 1/Odd₃</p>
            <p>Arbitragem existe se Margem {'<'} 1</p>
            <p>Lucro garantido = Banca × (1/Margem − 1)</p>
            <p>Stake resultado N = Banca / (OddN × Margem)</p>
            <p>ROI = (Lucro / Banca) × 100</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Resultado</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Odd (casa A/B)</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>1/Odd</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Stake (R$1000)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { res: 'Time A ganha', odd: '2.15 (Bet365)', inv: '46.5%', stake: 'R$465' },
                { res: 'Empate', odd: '3.40 (Betano)', inv: '29.4%', stake: 'R$294' },
                { res: 'Time B ganha', odd: '4.10 (Pinnacle)', inv: '24.4%', stake: 'R$244' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-1)' }}>{row.res}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{row.odd}</td>
                  <td className="px-4 py-3" style={{ color: '#22d3ee' }}>{row.inv}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: '#4ade80' }}>{row.stake}</td>
                </tr>
              ))}
              <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-1)' }}>Total</td>
                <td className="px-4 py-3" style={{ color: 'var(--text-3)' }}>—</td>
                <td className="px-4 py-3 font-semibold" style={{ color: '#4ade80' }}>100.3% → 99.7% ✓</td>
                <td className="px-4 py-3 font-semibold" style={{ color: '#4ade80' }}>Lucro ~R$3</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs" style={{ color: 'var(--text-3)' }}>
          Neste exemplo, a margem é 99.7% (abaixo de 100%), gerando ~R$3 de lucro garantido por R$1000 apostados (ROI ≈ 0.3%).
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Arbitragem vs. Value Bet: qual escolher?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-xl p-5" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
            <p className="text-xs font-semibold mb-3" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Arbitragem (Sure Bet)</p>
            <ul className="space-y-2">
              {[
                'Lucro garantido independente do resultado',
                'ROI menor (0.5–5% por oportunidade)',
                'Requer monitoramento constante de odds',
                'Risco de limitação de conta pelas casas',
                'Exige contas em múltiplas casas',
                'Capital maior para lucro absoluto significativo',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2" style={{ color: 'var(--text-2)' }}>
                  <span style={{ color: '#22d3ee' }}>→</span> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl p-5" style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.12)' }}>
            <p className="text-xs font-semibold mb-3" style={{ color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Value Bet</p>
            <ul className="space-y-2">
              {[
                'Lucro esperado positivo a longo prazo',
                'ROI maior (5–15%+ para bons apostadores)',
                'Requer 1 conta, 1 seleção por aposta',
                'Menor risco de limitação de conta',
                'Variância maior no curto prazo',
                'Requer habilidade de precificação',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2" style={{ color: 'var(--text-2)' }}>
                  <span style={{ color: '#4ade80' }}>→</span> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p>
          Para detectar value bets individuais, use a <Link to="/calculadoras/odds" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de Odds</Link>. Para proteger posições abertas em arbitragem parcial, veja a <Link to="/calculadoras/hedge" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de Hedge</Link>.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Riscos práticos da arbitragem</h2>
        <p className="mb-4">
          Apesar do lucro "garantido", existem riscos reais que todo arbitragista deve conhecer:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { risco: 'Odd cancelada ou alterada', desc: 'Casas podem cancelar odds após você apostar em outro lado. Você fica exposto em uma posição descoberta.' },
            { risco: 'Erro de stake', desc: 'Apostar valor errado em uma das pontas desequilibra a cobertura, podendo transformar lucro em prejuízo.' },
            { risco: 'Limitação de conta', desc: 'Casas como Bet365 e Betano limitam ou fecham contas identificadas como arbitragistas frequentes.' },
            { risco: 'Diferença de fuso horário', desc: 'Em eventos internacionais, delays de transmissão podem fazer a odds ser movida antes de você fechar o outro lado.' },
            { risco: 'Fundos insuficientes', desc: 'Precisar de capital simultâneo em múltiplas casas pode ser difícil de gerenciar sem planejamento.' },
            { risco: 'Evento cancelado', desc: 'Se o evento for cancelado após uma aposta já feita, a outra ponta pode não ser reembolsada da mesma forma.' },
          ].map((r, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(248,113,113,0.04)', border: '1px solid rgba(248,113,113,0.1)' }}>
              <p className="font-semibold text-sm mb-1" style={{ color: '#f87171' }}>{r.risco}</p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>5 boas práticas para arbitragistas</h2>
        <ol className="space-y-3 list-none">
          {[
            { n: '1', t: 'Feche as pontas rapidamente', d: 'Odds de arbitragem desaparecem em minutos. Tenha as abas das casas abertas e fundos disponíveis em ambas antes de iniciar.' },
            { n: '2', t: 'Comece com margem confortável', d: 'Busque oportunidades com margem abaixo de 98.5% (lucro >1.5%) para ter buffer contra variações de odds durante a execução.' },
            { n: '3', t: 'Varie os valores de stake', d: 'Apostas com valores exatos e redondos em múltiplas casas simultaneamente são padrão que as casas usam para identificar arbitragistas.' },
            { n: '4', t: 'Diversifique as casas utilizadas', d: 'Use ao menos 4-6 casas diferentes para reduzir o risco de limitação simultânea. Pinnacle aceita arbitragistas por política.' },
            { n: '5', t: 'Registre cada operação', d: 'Controle ROI por casa, por esporte e por tipo de mercado. Isso ajuda a identificar onde estão as melhores oportunidades.' },
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
            { to: '/calculadoras/odds', icon: '📊', label: 'Calculadora de Odds' },
            { to: '/calculadoras/hedge', icon: '🛡️', label: 'Hedge' },
            { to: '/calculadoras/dutching', icon: '⚖️', label: 'Dutching' },
            { to: '/calculadoras/cashout', icon: '💳', label: 'Cash Out' },
            { to: '/calculadoras/aposta-simples', icon: '🎯', label: 'Aposta Simples' },
            { to: '/calculadoras/gestao-banca', icon: '🏦', label: 'Gestão de Banca' },
            { to: '/calculadoras/roi', icon: '📈', label: 'ROI' },
            { to: '/calculadoras/multipla-parlay', icon: '🎰', label: 'Múltipla / Parlay' },
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

export default function Arbitragem() {
  const [odds, setOdds] = useState(['', '']);
  const [banca, setBanca] = useState('');
  const [labels, setLabels] = useState(['Resultado 1', 'Resultado 2']);

  const atualizar = (i, v) => { const o = [...odds]; o[i] = v; setOdds(o); };
  const atualizarLabel = (i, v) => { const l = [...labels]; l[i] = v; setLabels(l); };
  const adicionar = () => { setOdds([...odds, '']); setLabels([...labels, `Resultado ${odds.length + 1}`]); };
  const remover = (i) => {
    if (odds.length <= 2) return;
    setOdds(odds.filter((_, idx) => idx !== i));
    setLabels(labels.filter((_, idx) => idx !== i));
  };

  const oddsN = odds.map(o => parseFloat(o));
  const bancaN = parseFloat(banca);
  const todasPreenchidas = oddsN.every(o => o > 1) && oddsN.length >= 2;
  const valid = todasPreenchidas && bancaN > 0;

  const margem = todasPreenchidas ? oddsN.reduce((acc, o) => acc + 1 / o, 0) : null;
  const isArb = valid && margem !== null && margem < 1;
  const lucroGarantido = isArb ? bancaN * (1 / margem - 1) : 0;
  const roi = isArb ? (lucroGarantido / bancaN) * 100 : 0;
  const stakes = isArb ? oddsN.map(o => bancaN / (o * margem)) : [];

  const faqs = [
    { q: 'O que é arbitragem em apostas esportivas?', a: 'Arbitragem (ou sure bet) ocorre quando as odds de diferentes casas permitem cobrir todos os resultados com lucro garantido, independente do desfecho.' },
    { q: 'Como calcular se existe arbitragem?', a: 'Some os inversos das odds (1/odd₁ + 1/odd₂ + ...). Se o total for menor que 1, existe arbitragem. Lucro = banca × (1/margem − 1).' },
    { q: 'Quanto posso ganhar com arbitragem?', a: 'O lucro típico varia entre 0.5% e 5% por oportunidade. Oportunidades acima de 3% são raras.' },
    { q: 'A arbitragem é legal no Brasil?', a: 'Sim, é legal. Porém casas podem limitar contas de arbitragistas. Não há lei proibindo.' },
    { q: 'Qual a diferença entre arbitragem e value bet?', a: 'Arbitragem garante lucro cobrindo todos os resultados. Value bet é uma aposta em uma odd subavaliada com lucro esperado positivo a longo prazo.' },
    { q: 'Como distribuir a banca em arbitragem de 3 resultados?', a: 'Stake de cada resultado = Banca / (Odd × Margem). A calculadora faz esse cálculo automaticamente.' },
    { q: 'Onde encontrar oportunidades de arbitragem?', a: 'Em jogos com odds equilibradas entre casas. Ferramentas como OddsPortal ou RebelBetting monitoram divergências em tempo real.' },
    { q: 'Qual o maior risco da arbitragem?', a: 'Cancelamento ou alteração de odd após apostar em outro lado, deixando você exposto em posição descoberta.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Arbitragem"
      description="Identifique oportunidades de arbitragem (sure bet) e calcule como distribuir sua banca para garantir lucro independente do resultado do evento."
      slug="arbitragem"
      faqs={faqs}
      schema={schema}
      explanation={<ArbExplanation />}
    >
      <div className="space-y-6">

        {/* Outcomes */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="label mb-0">Resultados e odds por casa</label>
            <button
              onClick={adicionar}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: 'var(--cyan)' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Adicionar resultado
            </button>
          </div>
          <div className="space-y-3">
            {odds.map((o, i) => (
              <div key={i} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    className="flex-1 bg-transparent text-xs font-semibold outline-none"
                    style={{ color: 'var(--text-2)' }}
                    value={labels[i]}
                    onChange={e => atualizarLabel(i, e.target.value)}
                    placeholder={`Resultado ${i + 1}`}
                  />
                  {odds.length > 2 && (
                    <button
                      onClick={() => remover(i)}
                      className="p-1.5 rounded-lg transition-colors"
                      style={{ color: 'var(--red)', background: 'rgba(248,113,113,0.08)' }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    className="input-field flex-1"
                    placeholder="ex: 2.10"
                    step="0.01"
                    min="1.01"
                    value={o}
                    onChange={e => atualizar(i, e.target.value)}
                  />
                  {parseFloat(o) > 1 && (
                    <div
                      className="px-2.5 py-2 rounded-lg text-xs font-medium flex-shrink-0"
                      style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.15)', color: '#22d3ee' }}
                    >
                      {((1 / parseFloat(o)) * 100).toFixed(1)}%
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Margem preview */}
        {todasPreenchidas && margem !== null && (
          <div
            className="flex items-center justify-between rounded-xl px-4 py-3"
            style={{
              background: margem < 1 ? 'rgba(34,197,94,0.06)' : 'rgba(248,113,113,0.06)',
              border: `1px solid ${margem < 1 ? 'rgba(34,197,94,0.2)' : 'rgba(248,113,113,0.2)'}`,
            }}
          >
            <div>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                {margem < 1 ? '✓ Arbitragem detectada' : '✗ Sem arbitragem'}
              </p>
              <p className="text-2xl font-bold mt-0.5" style={{ color: margem < 1 ? '#4ade80' : '#f87171' }}>
                {(margem * 100).toFixed(2)}%
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>
                {margem < 1 ? `Abaixo de 100% → oportunidade de ${((1 / margem - 1) * 100).toFixed(2)}%` : 'Precisa ser < 100% para ter arbitragem'}
              </p>
            </div>
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
            placeholder="ex: 1000"
            min="0"
            value={banca}
            onChange={e => setBanca(e.target.value)}
          />
        </div>

        {/* Results */}
        {valid && (
          <div className="space-y-3">
            {isArb ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="result-box">
                    <p className="result-value" style={{ color: '#4ade80' }}>R${lucroGarantido.toFixed(2)}</p>
                    <p className="result-label">Lucro garantido</p>
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
                  <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                    {stakes.map((st, i) => (
                      <div key={i} className="flex justify-between items-center px-4 py-3">
                        <div>
                          <p className="text-xs font-medium" style={{ color: 'var(--text-1)' }}>{labels[i]}</p>
                          <p className="text-xs" style={{ color: 'var(--text-3)' }}>odd {parseFloat(odds[i]).toFixed(2)} · retorno R${(st * parseFloat(odds[i])).toFixed(2)}</p>
                        </div>
                        <span className="text-sm font-bold tabular-nums" style={{ color: '#22d3ee' }}>
                          R${st.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div
                className="rounded-xl px-4 py-4 text-center"
                style={{ background: 'rgba(248,113,113,0.04)', border: '1px solid rgba(248,113,113,0.15)' }}
              >
                <p className="text-sm font-semibold mb-1" style={{ color: '#f87171' }}>Sem oportunidade de arbitragem</p>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                  Margem atual: {(margem * 100).toFixed(2)}% — precisa ser abaixo de 100% para existir sure bet. Tente encontrar odds mais altas em outras casas.
                </p>
              </div>
            )}
          </div>
        )}

        {!valid && !todasPreenchidas && (
          <div
            className="rounded-xl flex items-center justify-center py-8"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Preencha as odds de cada resultado (mín. 1.01)</p>
          </div>
        )}

        {todasPreenchidas && !bancaN && (
          <div
            className="rounded-xl flex items-center justify-center py-5"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Informe a banca total para ver a distribuição de stakes</p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
