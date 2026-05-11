import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de ROI em Apostas — CalculaBet',
      url: 'https://calculabet.netlify.app/calculadoras/roi',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description: 'Calcule o ROI (Retorno sobre Investimento) das suas apostas esportivas, track win rate e meça sua performance real como apostador.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'O que é ROI em apostas esportivas?', acceptedAnswer: { '@type': 'Answer', text: 'ROI (Return on Investment) é o percentual de retorno sobre o total apostado. ROI = (Lucro líquido / Total apostado) × 100. ROI positivo indica lucro; negativo indica prejuízo.' } },
        { '@type': 'Question', name: 'Qual é um bom ROI em apostas?', acceptedAnswer: { '@type': 'Answer', text: 'Apostadores recreativos geralmente têm ROI negativo (-5% a -10%). Apostadores consistentemente lucrativos ficam em 5-15%. ROI acima de 20% é excepcional e difícil de manter a longo prazo.' } },
        { '@type': 'Question', name: 'Como calcular o ROI de apostas?', acceptedAnswer: { '@type': 'Answer', text: 'ROI = (Soma dos retornos - Soma dos stakes) / Soma dos stakes × 100. Exemplo: R$1.200 recebidos em R$1.000 apostados = (1.200-1.000)/1.000 × 100 = 20%.' } },
        { '@type': 'Question', name: 'Qual a diferença entre ROI e yield?', acceptedAnswer: { '@type': 'Answer', text: 'São sinônimos em apostas esportivas. Yield é o termo mais usado no contexto de apostas (especialmente em inglês), enquanto ROI é o termo financeiro equivalente. Ambos calculam lucro percentual sobre total investido.' } },
        { '@type': 'Question', name: 'Quantas apostas preciso para calcular um ROI confiável?', acceptedAnswer: { '@type': 'Answer', text: 'Estatisticamente, são necessárias pelo menos 300-500 apostas para o ROI ser uma medida confiável de habilidade. Com menos apostas, a variância pode fazer um apostador ruim parecer lucrativo e vice-versa.' } },
        { '@type': 'Question', name: 'O que é win rate em apostas?', acceptedAnswer: { '@type': 'Answer', text: 'Win rate é o percentual de apostas vencedoras sobre o total. Win rate de 55% com odds de 2.00 é lucrativo. Porém, win rate alto com odds baixas pode ser menos lucrativo que win rate menor com odds altas.' } },
        { '@type': 'Question', name: 'Como melhorar o ROI em apostas?', acceptedAnswer: { '@type': 'Answer', text: 'Foque em identificar value bets (odds subavaliadas), especialize-se em mercados que conhece bem, use gestão de banca consistente e registre cada aposta para analisar onde seu edge é maior.' } },
        { '@type': 'Question', name: 'ROI por aposta ou ROI total: qual usar?', acceptedAnswer: { '@type': 'Answer', text: 'Ambos são úteis. ROI por aposta (yield) compara apostadores com volumes diferentes. ROI total mostra o retorno absoluto do período. Use o yield para benchmarking e o ROI total para acompanhar crescimento da banca.' } },
      ],
    },
  ],
};

function ROIExplanation() {
  return (
    <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>O que é ROI em apostas esportivas?</h2>
        <p className="mb-3">
          <strong style={{ color: 'var(--text-1)' }}>ROI</strong> (Return on Investment — Retorno sobre Investimento) é a métrica mais importante para avaliar a performance de um apostador. Ele responde à pergunta: <em>"Para cada real apostado, quanto retornou?"</em>
        </p>
        <p className="mb-3">
          Em apostas, o ROI (também chamado de <strong style={{ color: 'var(--text-1)' }}>yield</strong>) compara o lucro líquido com o total investido em um período. Um ROI de +5% significa que, para cada R$100 apostados, você lucrou R$5 no total.
        </p>
        <p>
          É a diferença entre sorte e habilidade: um apostador sortudo pode ter ROI positivo em 50 apostas; um apostador habilidoso tem ROI positivo consistente em 500 apostas.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Fórmula e exemplos de cálculo</h2>
        <div className="rounded-xl p-5 mb-4" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
          <p className="text-xs font-semibold mb-3" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Fórmulas</p>
          <div className="space-y-2 font-mono text-xs" style={{ color: 'var(--text-1)' }}>
            <p>ROI = (Lucro líquido / Total apostado) × 100</p>
            <p>Lucro líquido = Total recebido − Total apostado</p>
            <p>Win rate = (Nº de apostas ganhas / Total de apostas) × 100</p>
            <p>Odd média = Total recebido / Total de apostas ganhas</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Cenário</th>
                <th className="text-right px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Apostado</th>
                <th className="text-right px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Recebido</th>
                <th className="text-right px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Lucro</th>
                <th className="text-right px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>ROI</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cen: 'Iniciante recreativo', ap: 'R$1.000', rec: 'R$920', luc: '−R$80', roi: '−8%', cor: '#f87171' },
                { cen: 'Apostador médio', ap: 'R$1.000', rec: 'R$975', luc: '−R$25', roi: '−2.5%', cor: '#fbbf24' },
                { cen: 'Apostador consistente', ap: 'R$1.000', rec: 'R$1.080', luc: '+R$80', roi: '+8%', cor: '#4ade80' },
                { cen: 'Profissional experiente', ap: 'R$1.000', rec: 'R$1.150', luc: '+R$150', roi: '+15%', cor: '#22d3ee' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-1)' }}>{row.cen}</td>
                  <td className="px-4 py-3 text-right" style={{ color: 'var(--text-2)' }}>{row.ap}</td>
                  <td className="px-4 py-3 text-right" style={{ color: 'var(--text-2)' }}>{row.rec}</td>
                  <td className="px-4 py-3 text-right font-semibold" style={{ color: row.cor }}>{row.luc}</td>
                  <td className="px-4 py-3 text-right font-bold" style={{ color: row.cor }}>{row.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>ROI vs. Win Rate: por que não basta acertar muito</h2>
        <p className="mb-4">
          Win rate alto não garante lucro. O que importa é a combinação de win rate com a odd média apostada. Exemplos:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {[
            { wr: '60%', odd: '1.60', ev: '+EV', roi: '+(-4%)', desc: 'Win rate alto, odds baixas → prejuízo', cor: '#f87171' },
            { wr: '50%', odd: '2.00', ev: 'neutro', roi: '0%', desc: 'Equilíbrio perfeito (sem edge)', cor: '#fbbf24' },
            { wr: '45%', odd: '2.30', ev: '+EV', roi: '+3.5%', desc: 'Win rate menor, mas odds melhores → lucro', cor: '#4ade80' },
          ].map((c, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${c.cor}25` }}>
              <div className="flex justify-between mb-2">
                <p className="text-xs font-semibold" style={{ color: c.cor }}>Win Rate: {c.wr}</p>
                <p className="text-xs font-semibold" style={{ color: c.cor }}>Odd: {c.odd}</p>
              </div>
              <p className="font-bold text-sm mb-1" style={{ color: c.cor }}>ROI ≈ {c.roi}</p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>{c.desc}</p>
            </div>
          ))}
        </div>
        <p>
          Use a <Link to="/calculadoras/odds" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de Odds</Link> para verificar se uma odd tem valor esperado positivo antes de apostar. Use o <Link to="/calculadoras/simulador-lucro" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Simulador de Lucro</Link> para projetar seu ROI ao longo de centenas de apostas.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Benchmarks de ROI por tipo de apostador</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { tipo: 'Recreativo casual', roi: '−5% a −15%', desc: 'Aposta por diversão, sem estratégia definida. ROI negativo é a norma.', cor: '#f87171' },
            { tipo: 'Semi-sério disciplinado', roi: '−2% a +3%', desc: 'Usa alguma análise, gestão básica de banca. Próximo do equilíbrio.', cor: '#fbbf24' },
            { tipo: 'Apostador consistente', roi: '+5% a +12%', desc: 'Especializado em 1-3 mercados, usa gestão de banca e registra tudo.', cor: '#4ade80' },
            { tipo: 'Profissional experiente', roi: '+12% a +20%', desc: 'Edge real e sustentável, volume alto, análise quantitativa.', cor: '#22d3ee' },
          ].map((b, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${b.cor}20` }}>
              <div>
                <p className="font-semibold text-sm" style={{ color: b.cor }}>{b.tipo}</p>
                <p className="text-xs font-bold mt-0.5 mb-1" style={{ color: 'var(--text-1)' }}>ROI: {b.roi}</p>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Como registrar apostas para ROI preciso</h2>
        <p className="mb-3">
          Para calcular um ROI confiável, você precisa registrar <strong style={{ color: 'var(--text-1)' }}>todas as apostas</strong> — não apenas as vencedoras. Muitos apostadores inflam o ROI inconscientemente ao "esquecer" apostas perdidas.
        </p>
        <ol className="space-y-3 list-none">
          {[
            { n: '1', t: 'Registre antes de receber o resultado', d: 'Anote o stake, odd e mercado antes do jogo. Jamais após saber o resultado — isso cria viés de confirmação.' },
            { n: '2', t: 'Separe por mercado e liga', d: 'ROI no Over/Under pode ser diferente do ROI em resultado final. Identificar onde está seu edge é fundamental para melhorar.' },
            { n: '3', t: 'Aguarde volume suficiente', d: 'Com menos de 100 apostas, o ROI é altamente volátil. Com 300-500 apostas, começa a ser estatisticamente significativo.' },
            { n: '4', t: 'Calcule ROI por casa de apostas', d: 'Talvez você tenha edge em uma casa específica (odds melhores em determinado mercado). Identificar isso é uma vantagem.' },
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
            { to: '/calculadoras/simulador-lucro', icon: '💹', label: 'Simulador de Lucro' },
            { to: '/calculadoras/gestao-banca', icon: '🏦', label: 'Gestão de Banca' },
            { to: '/calculadoras/odds', icon: '📊', label: 'Calculadora de Odds' },
            { to: '/calculadoras/aposta-simples', icon: '🎯', label: 'Aposta Simples' },
            { to: '/calculadoras/multipla-parlay', icon: '🎰', label: 'Múltipla / Parlay' },
            { to: '/calculadoras/martingale', icon: '🎲', label: 'Martingale' },
            { to: '/calculadoras/conversor-odds', icon: '🔄', label: 'Conversor de Odds' },
            { to: '/calculadoras/arbitragem', icon: '💰', label: 'Arbitragem' },
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

export default function ROI() {
  const [apostas, setApostas] = useState([{ stake: '', retorno: '', label: '' }]);

  const adicionar = () => setApostas([...apostas, { stake: '', retorno: '', label: '' }]);
  const atualizar = (i, campo, v) => { const a = [...apostas]; a[i][campo] = v; setApostas(a); };
  const remover = (i) => apostas.length > 1 && setApostas(apostas.filter((_, idx) => idx !== i));

  const validas = apostas.filter(a => parseFloat(a.stake) > 0);
  const totalStake = validas.reduce((acc, a) => acc + parseFloat(a.stake), 0);
  const totalRetorno = validas.reduce((acc, a) => acc + (parseFloat(a.retorno) || 0), 0);
  const lucroLiquido = totalRetorno - totalStake;
  const roi = totalStake > 0 ? (lucroLiquido / totalStake) * 100 : 0;
  const ganhas = validas.filter(a => parseFloat(a.retorno) > 0).length;
  const winRate = validas.length > 0 ? (ganhas / validas.length) * 100 : 0;
  const valid = totalStake > 0;

  const faqs = [
    { q: 'O que é ROI em apostas esportivas?', a: 'ROI = (Lucro líquido / Total apostado) × 100. ROI positivo indica lucro; negativo indica prejuízo. Também chamado de yield.' },
    { q: 'Qual é um bom ROI?', a: 'Iniciantes têm ROI negativo (−5% a −15%). Apostadores consistentes ficam em +5% a +12%. ROI acima de 20% é excepcional.' },
    { q: 'Como calcular ROI?', a: 'ROI = (Soma dos retornos − Soma dos stakes) / Soma dos stakes × 100.' },
    { q: 'Qual a diferença entre ROI e yield?', a: 'São sinônimos em apostas. Yield é o termo mais usado no contexto esportivo; ROI vem do mercado financeiro.' },
    { q: 'Quantas apostas preciso para ROI confiável?', a: 'Estatisticamente, 300-500 apostas para ser significativo. Com menos, a variância pode distorcer os resultados.' },
    { q: 'O que é win rate?', a: 'Percentual de apostas vencedoras. Win rate alto não garante lucro — depende da combinação com as odds médias.' },
    { q: 'Como melhorar o ROI?', a: 'Foque em value bets, especialize-se em mercados que conhece e registre todas as apostas para identificar onde seu edge é maior.' },
    { q: 'ROI por aposta ou total: qual usar?', a: 'Use o yield (ROI por aposta) para benchmarking e comparação. Use o ROI total para acompanhar crescimento da banca.' },
  ];

  return (
    <CalcLayout
      title="Calculadora de ROI em Apostas"
      description="Calcule o ROI (Retorno sobre Investimento) das suas apostas esportivas, acompanhe win rate e meça sua performance real como apostador."
      slug="roi"
      faqs={faqs}
      schema={schema}
      explanation={<ROIExplanation />}
    >
      <div className="space-y-6">

        {/* Apostas */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="label mb-0">Apostas ({apostas.length} registradas)</label>
            <button
              onClick={adicionar}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: 'var(--cyan)' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Adicionar aposta
            </button>
          </div>
          <div className="space-y-2.5">
            {apostas.map((a, i) => {
              const s = parseFloat(a.stake);
              const r = parseFloat(a.retorno);
              const lucro = s > 0 ? (r || 0) - s : null;
              return (
                <div key={i} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                  <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end">
                    <div>
                      <label className="label text-xs mb-1.5">Stake #{i + 1} (R$)</label>
                      <input
                        type="number"
                        className="input-field"
                        placeholder="ex: 100"
                        min="0"
                        value={a.stake}
                        onChange={e => atualizar(i, 'stake', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label text-xs mb-1.5">Retorno (R$, 0 se perdeu)</label>
                      <input
                        type="number"
                        className="input-field"
                        placeholder="0"
                        min="0"
                        value={a.retorno}
                        onChange={e => atualizar(i, 'retorno', e.target.value)}
                      />
                    </div>
                    {apostas.length > 1 && (
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
                  {lucro !== null && a.retorno !== '' && (
                    <p className="text-xs mt-1.5" style={{ color: 'var(--text-3)' }}>
                      {lucro >= 0 ? '✓ Ganhou' : '✗ Perdeu'}{' '}
                      <strong style={{ color: lucro >= 0 ? '#4ade80' : '#f87171' }}>
                        {lucro >= 0 ? '+' : ''}R${lucro.toFixed(2)}
                      </strong>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Results */}
        {valid ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="result-box">
                <p className="result-value text-lg">R${totalStake.toFixed(2)}</p>
                <p className="result-label">Total apostado</p>
              </div>
              <div className="result-box">
                <p className="result-value text-lg">R${totalRetorno.toFixed(2)}</p>
                <p className="result-label">Total recebido</p>
              </div>
              <div className="result-box">
                <p className="result-value text-lg" style={{ color: lucroLiquido >= 0 ? '#4ade80' : 'var(--red)' }}>
                  {lucroLiquido >= 0 ? '+' : ''}R${lucroLiquido.toFixed(2)}
                </p>
                <p className="result-label">Lucro líquido</p>
              </div>
              <div className="result-box">
                <p className="result-value text-lg" style={{ color: roi >= 0 ? '#818cf8' : 'var(--red)' }}>
                  {roi >= 0 ? '+' : ''}{roi.toFixed(2)}%
                </p>
                <p className="result-label">ROI</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="result-box">
                <p className="result-value">{winRate.toFixed(1)}%</p>
                <p className="result-label">Win rate ({ganhas}/{validas.length} apostas)</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: roi >= 5 ? '#4ade80' : roi >= 0 ? '#fbbf24' : '#f87171' }}>
                  {roi >= 12 ? 'Profissional' : roi >= 5 ? 'Consistente' : roi >= 0 ? 'Equilibrado' : 'Negativo'}
                </p>
                <p className="result-label">Nível estimado</p>
              </div>
            </div>

            <div
              className="rounded-xl px-4 py-3 text-xs"
              style={{
                background: roi >= 0 ? 'rgba(34,197,94,0.04)' : 'rgba(248,113,113,0.04)',
                border: `1px solid ${roi >= 0 ? 'rgba(34,197,94,0.15)' : 'rgba(248,113,113,0.15)'}`,
                color: 'var(--text-3)',
              }}
            >
              {validas.length < 50
                ? `⚠ Com apenas ${validas.length} apostas, o ROI ainda tem alta variância. Adicione mais registros para uma medida confiável.`
                : roi >= 5
                  ? `✓ ROI de ${roi.toFixed(1)}% em ${validas.length} apostas — performance sólida. Mantenha o registro para identificar onde está seu edge.`
                  : `ROI de ${roi.toFixed(1)}% em ${validas.length} apostas. Continue registrando para identificar padrões e mercados mais lucrativos.`}
            </div>
          </div>
        ) : (
          <div
            className="rounded-xl flex items-center justify-center py-8"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Adicione apostas com stake para calcular o ROI</p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
