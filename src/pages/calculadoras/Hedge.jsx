import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

const PRESETS_STAKE = [10, 25, 50, 100, 200, 500];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de Hedge — CalculaBet',
      url: 'https://calculabet.netlify.app/calculadoras/hedge',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description: 'Calcule o stake ideal para fazer hedge em apostas esportivas, proteger sua banca ou garantir lucro independente do resultado.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'O que é hedge em apostas esportivas?', acceptedAnswer: { '@type': 'Answer', text: 'Hedge é apostar no resultado oposto de uma aposta existente para garantir lucro ou limitar perdas, independente do desfecho. É como um seguro sobre sua posição original.' } },
        { '@type': 'Question', name: 'Como calcular o stake ideal para hedge?', acceptedAnswer: { '@type': 'Answer', text: 'Stake de hedge = (Stake original × Odd original) ÷ Odd de hedge. Isso garante retorno igual nos dois resultados. Nossa calculadora faz esse cálculo automaticamente.' } },
        { '@type': 'Question', name: 'Hedge sempre garante lucro?', acceptedAnswer: { '@type': 'Answer', text: 'Não necessariamente. Se as odds combinadas não forem favoráveis, o hedge pode apenas limitar a perda. Use a calculadora para ver o resultado exato em cada cenário.' } },
        { '@type': 'Question', name: 'Qual a diferença entre hedge e cashout?', acceptedAnswer: { '@type': 'Answer', text: 'Cashout é fechar a aposta direto na casa, que cobra uma margem. Hedge é apostar no oposto em outra casa — você tem controle total sobre o stake e pode obter condições melhores.' } },
        { '@type': 'Question', name: 'Quando é melhor fazer hedge do que cashout?', acceptedAnswer: { '@type': 'Answer', text: 'Quando a margem do cashout da casa está alta (>10%) e você encontra boa odd no lado oposto em outra casa. O hedge manual geralmente oferece condições melhores.' } },
        { '@type': 'Question', name: 'Posso fazer hedge parcial?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. Apostar um stake menor no lado oposto reduz o risco sem eliminar totalmente a aposta original. Use a calculadora ajustando o stake de hedge para ver o impacto em cada cenário.' } },
        { '@type': 'Question', name: 'Hedge é útil em apostas múltiplas?', acceptedAnswer: { '@type': 'Answer', text: 'Sim, especialmente na última seleção de uma múltipla. Se as primeiras seleções ganharam, você pode fazer hedge na última para garantir lucro independente do resultado final.' } },
        { '@type': 'Question', name: 'O hedge prejudica minha conta na casa de apostas?', acceptedAnswer: { '@type': 'Answer', text: 'O hedge em si (apostar em outra casa) não é detectado. Porém, padrões consistentes de apostas no lado oposto na mesma casa podem chamar atenção. O ideal é usar casas diferentes para cada lado.' } },
      ],
    },
  ],
};

function HedgeExplanation() {
  return (
    <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>O que é hedge em apostas esportivas?</h2>
        <p className="mb-3">
          <strong style={{ color: 'var(--text-1)' }}>Hedge</strong> é a prática de apostar no resultado oposto de uma aposta existente para proteger sua posição — como um seguro. A ideia vem do mercado financeiro, onde "hedging" significa proteger um investimento contra movimentos adversos de preço.
        </p>
        <p className="mb-3">
          Em apostas esportivas, o hedge é usado em dois cenários principais: quando você está <strong style={{ color: 'var(--text-1)' }}>ganhando e quer garantir lucro</strong> (a odd do lado oposto caiu, tornando o hedge vantajoso), ou quando está <strong style={{ color: 'var(--text-1)' }}>perdendo e quer limitar o prejuízo</strong>.
        </p>
        <p>
          Diferente do cashout — onde você vende sua aposta de volta para a casa com margem embutida — o hedge manual é feito em outra casa de apostas, dando a você controle total sobre o stake e potencialmente condições melhores. Use a <Link to="/calculadoras/cashout" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de Cashout</Link> para comparar as duas opções.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Como calcular o stake de hedge</h2>
        <p className="mb-4">
          O cálculo é direto: você quer que o retorno da aposta original e o retorno do hedge sejam iguais, garantindo o mesmo lucro (ou prejuízo mínimo) em qualquer resultado.
        </p>
        <div className="rounded-xl p-5 mb-4" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
          <p className="text-xs font-semibold mb-3" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Fórmulas</p>
          <div className="space-y-2 font-mono text-xs" style={{ color: 'var(--text-1)' }}>
            <p>Stake hedge = (Stake original × Odd original) ÷ Odd hedge</p>
            <p>Total investido = Stake original + Stake hedge</p>
            <p>Lucro se original ganha = (Stake original × Odd original) − Total investido</p>
            <p>Lucro se hedge ganha = (Stake hedge × Odd hedge) − Total investido</p>
            <p>ROI hedge = (Lucro mínimo ÷ Total investido) × 100</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Cenário</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Stake original</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Odd orig. / hedge</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Stake hedge</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Lucro garantido</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cen: 'Ganhando bem', so: 'R$100', odds: '5.00 → 1.40', sh: 'R$357', lg: '+R$143' },
                { cen: 'Ganhando pouco', so: 'R$100', odds: '3.00 → 1.80', sh: 'R$167', lg: '+R$33' },
                { cen: 'Empate de odds', so: 'R$100', odds: '2.00 → 2.00', sh: 'R$100', lg: 'R$0 (neutro)' },
                { cen: 'Perdendo', so: 'R$100', odds: '2.00 → 3.50', sh: 'R$57', lg: '−R$43 (limitado)' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-1)' }}>{row.cen}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{row.so}</td>
                  <td className="px-4 py-3" style={{ color: '#22d3ee' }}>{row.odds}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-1)' }}>{row.sh}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: row.lg.startsWith('+') ? '#4ade80' : row.lg.startsWith('−') ? '#f87171' : 'var(--text-3)' }}>{row.lg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Hedge vs. Cashout: qual escolher?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-xl p-5" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
            <p className="text-xs font-semibold mb-3" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Hedge manual</p>
            <ul className="space-y-2">
              {[
                'Você controla o stake e as condições',
                'Pode encontrar odds melhores em outra casa',
                'Sem margem adicional da casa original',
                'Requer conta ativa em outra plataforma',
                'Mais trabalho — pesquisar odds, executar',
                'Melhor para apostas de alto valor',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2" style={{ color: 'var(--text-2)' }}>
                  <span style={{ color: '#22d3ee' }}>→</span> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl p-5" style={{ background: 'rgba(129,140,248,0.04)', border: '1px solid rgba(129,140,248,0.12)' }}>
            <p className="text-xs font-semibold mb-3" style={{ color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Cashout</p>
            <ul className="space-y-2">
              {[
                'Instantâneo — um clique na casa',
                'Disponível ao vivo',
                'A casa define o valor (margem embutida)',
                'Não requer outra conta',
                'Pode ser parcial (% da aposta)',
                'Melhor para apostas pequenas e urgentes',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2" style={{ color: 'var(--text-2)' }}>
                  <span style={{ color: '#818cf8' }}>→</span> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p>
          Regra prática: calcule o cashout justo com a <Link to="/calculadoras/cashout" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de Cashout</Link> e compare com o hedge manual. Se a margem do cashout da casa ultrapassar 8%, o hedge quase sempre é mais vantajoso.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Hedge em apostas múltiplas</h2>
        <p className="mb-3">
          O hedge é especialmente poderoso em <strong style={{ color: 'var(--text-1)' }}>apostas múltiplas</strong>. Imagine uma múltipla de 4 seleções com odd combinada de 12.00 e stake de R$50 — retorno potencial R$600. Após 3 seleções ganharem, a última seleção tem odd atual de 1.35 no lado oposto.
        </p>
        <p className="mb-3">
          Stake de hedge = (50 × 12.00) / 1.35 = <strong style={{ color: 'var(--text-1)' }}>R$444</strong>. Total investido: R$494. Lucro se a múltipla fecha: R$106. Lucro se hedge ganha: R$600 − R$494 = R$106. <strong style={{ color: '#4ade80' }}>Lucro garantido de R$106 em qualquer resultado.</strong>
        </p>
        <p>
          Use a <Link to="/calculadoras/multipla-parlay" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de Múltipla</Link> para calcular a odd combinada original e então inserir aqui para calcular o hedge.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Hedge parcial: proteger sem fechar tudo</h2>
        <p className="mb-3">
          Nem sempre você quer fechar completamente a posição. O <strong style={{ color: 'var(--text-1)' }}>hedge parcial</strong> permite proteger uma fração da aposta: você aposta um stake menor no lado oposto, reduzindo o risco mas mantendo parte da exposição original.
        </p>
        <p className="mb-4">
          Exemplo: stake de hedge completo seria R$200, mas você aposta apenas R$100 no oposto. Você ainda tem lucro em um dos lados, mas o lucro mínimo garantido é menor. A calculadora abaixo mostra os dois resultados — ajuste o stake de hedge até encontrar o equilíbrio ideal.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Hedge completo', desc: 'Mesmo lucro nos dois resultados. Risco zero.', cor: '#4ade80' },
            { label: 'Hedge parcial', desc: 'Lucros diferentes por resultado. Risco reduzido.', cor: '#fbbf24' },
            { label: 'Sem hedge', desc: 'Máximo lucro se ganhar, perda total se perder.', cor: '#f87171' },
          ].map((h, i) => (
            <div key={i} className="rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${h.cor}25` }}>
              <p className="font-semibold text-sm mb-2" style={{ color: h.cor }}>{h.label}</p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>{h.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>5 situações ideais para fazer hedge</h2>
        <ol className="space-y-3 list-none">
          {[
            { n: '1', t: 'Última seleção de uma múltipla lucrativa', d: 'O cenário mais comum. Após acertar 3 de 4 seleções, hedge na última para garantir lucro independente do resultado.' },
            { n: '2', t: 'Odd subiu muito no pré-jogo', d: 'Você apostou em um time a 3.00 e antes do jogo a odd subiu para 5.00 (a equipe favorita se lesionou). Faça hedge no favorito para limitar o risco.' },
            { n: '3', t: 'Apostas ao vivo com mudança de placar', d: 'Seu time estava ganhando e levou um gol. A odd no lado oposto caiu. Hedge agora pode garantir parte do lucro original.' },
            { n: '4', t: 'Notícias de última hora', d: 'Lesão de jogador chave, mudança de árbitro, condição climática adversa — qualquer fator que mude significativamente a probabilidade justifica reavaliação da posição.' },
            { n: '5', t: 'Apostas de alto valor próximas ao encerramento', d: 'Se você tem R$1.000+ em risco em uma aposta que fecha em horas, avaliar hedge é prudente — especialmente se a odd do lado oposto está atraente.' },
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
            { to: '/calculadoras/cashout', icon: '💳', label: 'Cash Out' },
            { to: '/calculadoras/arbitragem', icon: '💰', label: 'Arbitragem' },
            { to: '/calculadoras/multipla-parlay', icon: '🎰', label: 'Múltipla / Parlay' },
            { to: '/calculadoras/dutching', icon: '⚖️', label: 'Dutching' },
            { to: '/calculadoras/odds', icon: '📊', label: 'Calculadora de Odds' },
            { to: '/calculadoras/aposta-simples', icon: '🎯', label: 'Aposta Simples' },
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

export default function Hedge() {
  const [stake, setStake] = useState('');
  const [oddOriginal, setOddOriginal] = useState('');
  const [oddHedge, setOddHedge] = useState('');

  const s = parseFloat(stake);
  const oo = parseFloat(oddOriginal);
  const oh = parseFloat(oddHedge);
  const valid = s > 0 && oo > 1 && oh > 1;

  const retornoOriginal = valid ? s * oo : 0;
  const stakeHedge = valid ? retornoOriginal / oh : 0;
  const totalInvestido = valid ? s + stakeHedge : 0;
  const lucroSeOriginalGanha = valid ? retornoOriginal - totalInvestido : 0;
  const lucroSeHedgeGanha = valid ? stakeHedge * oh - totalInvestido : 0;
  const lucroMinimo = valid ? Math.min(lucroSeOriginalGanha, lucroSeHedgeGanha) : 0;
  const roi = valid ? (lucroMinimo / totalInvestido) * 100 : 0;

  const faqs = [
    { q: 'O que é hedge em apostas esportivas?', a: 'Hedge é apostar no resultado oposto de uma aposta existente para garantir lucro ou limitar perdas, independente do desfecho.' },
    { q: 'Como calcular o stake ideal para hedge?', a: 'Stake hedge = (Stake original × Odd original) ÷ Odd hedge. Nossa calculadora faz esse cálculo automaticamente.' },
    { q: 'Hedge sempre garante lucro?', a: 'Não. Se as odds não forem favoráveis, o hedge pode apenas limitar a perda. Veja o resultado exato no campo "Mínimo garantido".' },
    { q: 'Qual a diferença entre hedge e cashout?', a: 'Cashout é fechar a aposta na própria casa com margem embutida. Hedge é apostar no oposto em outra casa — você controla o stake e pode obter condições melhores.' },
    { q: 'Quando é melhor fazer hedge do que cashout?', a: 'Quando a margem do cashout está alta (>8%) e você encontra boa odd no lado oposto em outra casa. Calcule os dois e compare.' },
    { q: 'Posso fazer hedge parcial?', a: 'Sim. Aposte um stake menor no lado oposto para reduzir o risco sem eliminar totalmente a posição original.' },
    { q: 'Hedge é útil em apostas múltiplas?', a: 'Sim, especialmente na última seleção de uma múltipla. Garante lucro independente do resultado final.' },
    { q: 'O hedge prejudica minha conta?', a: 'O hedge em outra casa não é detectado. Padrões de apostas no lado oposto na mesma casa podem chamar atenção — use casas diferentes para cada lado.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Hedge"
      description="Calcule o stake ideal para fazer hedge e proteger sua aposta — garanta lucro ou limite perdas independente do resultado."
      slug="hedge"
      faqs={faqs}
      schema={schema}
      explanation={<HedgeExplanation />}
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
            <label className="label">Odd original (sua aposta)</label>
            <input
              type="number"
              className="input-field"
              placeholder="ex: 4.00"
              step="0.01"
              min="1.01"
              value={oddOriginal}
              onChange={e => setOddOriginal(e.target.value)}
            />
            {oo > 1 && s > 0 && (
              <p className="text-xs mt-1.5" style={{ color: 'var(--text-3)' }}>
                Retorno potencial: <strong style={{ color: '#22d3ee' }}>R${(s * oo).toFixed(2)}</strong>
              </p>
            )}
          </div>
          <div>
            <label className="label">Odd para hedge (lado oposto)</label>
            <input
              type="number"
              className="input-field"
              placeholder="ex: 1.80"
              step="0.01"
              min="1.01"
              value={oddHedge}
              onChange={e => setOddHedge(e.target.value)}
            />
            {oh > 1 && (
              <p className="text-xs mt-1.5" style={{ color: 'var(--text-3)' }}>
                Prob. implícita: <strong style={{ color: '#22d3ee' }}>{((1 / oh) * 100).toFixed(1)}%</strong>
              </p>
            )}
          </div>
        </div>

        {/* Results */}
        {valid ? (
          <div className="space-y-3">
            {/* Stake de hedge destacado */}
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-4 rounded-xl"
              style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.15)' }}
            >
              <div>
                <p className="text-xs font-semibold mb-1" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Stake recomendado para hedge</p>
                <p className="text-3xl font-bold tabular-nums" style={{ color: 'var(--text-1)', letterSpacing: '-0.03em' }}>
                  R${stakeHedge.toFixed(2)}
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-xs mb-0.5" style={{ color: 'var(--text-3)' }}>Total investido</p>
                <p className="text-lg font-semibold" style={{ color: 'var(--text-1)' }}>R${totalInvestido.toFixed(2)}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>
                  ROI: <strong style={{ color: roi >= 0 ? '#4ade80' : '#f87171' }}>{roi.toFixed(1)}%</strong>
                </p>
              </div>
            </div>

            {/* 3 métricas */}
            <div className="grid grid-cols-3 gap-3">
              <div className="result-box">
                <p className="result-value" style={{ color: lucroSeOriginalGanha >= 0 ? '#4ade80' : 'var(--red)' }}>
                  {lucroSeOriginalGanha >= 0 ? '+' : ''}R${lucroSeOriginalGanha.toFixed(2)}
                </p>
                <p className="result-label">Se original ganha</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: lucroSeHedgeGanha >= 0 ? '#4ade80' : 'var(--red)' }}>
                  {lucroSeHedgeGanha >= 0 ? '+' : ''}R${lucroSeHedgeGanha.toFixed(2)}
                </p>
                <p className="result-label">Se hedge ganha</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: lucroMinimo >= 0 ? '#4ade80' : 'var(--red)' }}>
                  {lucroMinimo >= 0 ? '+' : ''}R${lucroMinimo.toFixed(2)}
                </p>
                <p className="result-label">Mínimo garantido</p>
              </div>
            </div>

            <div
              className="rounded-xl px-4 py-3 text-xs"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-3)' }}
            >
              {lucroMinimo >= 0
                ? `Hedge garante lucro de R${lucroMinimo.toFixed(2)} em qualquer resultado. Aguardar pode render até R${Math.max(lucroSeOriginalGanha, lucroSeHedgeGanha).toFixed(2)} se acertar — mas com risco de perder tudo.`
                : `Hedge limita a perda máxima para R${Math.abs(lucroMinimo).toFixed(2)}. Sem hedge, a perda seria R${s.toFixed(2)} caso perca.`}
            </div>
          </div>
        ) : (
          <div
            className="rounded-xl flex items-center justify-center py-10"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Preencha stake e as duas odds para calcular o hedge</p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
