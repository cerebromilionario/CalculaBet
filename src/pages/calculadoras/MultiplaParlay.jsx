import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

const PRESETS = [10, 25, 50, 100, 200, 500];

const faqs = [
  {
    q: 'Como calcular uma aposta múltipla ou parlay?',
    a: 'Para calcular uma múltipla, multiplique as odds decimais de todas as seleções. Depois, multiplique a odd combinada pelo valor apostado para encontrar o retorno total. O lucro líquido é o retorno total menos o stake inicial.',
  },
  {
    q: 'O que significa odd combinada na múltipla?',
    a: 'Odd combinada é o multiplicador final do bilhete. Ela representa o produto das odds individuais e mostra quanto o stake retorna se todas as seleções forem vencedoras.',
  },
  {
    q: 'Qual é a fórmula da calculadora de múltipla?',
    a: 'A fórmula principal é: Odd combinada = Odd 1 × Odd 2 × ... × Odd n. Retorno total = Stake × Odd combinada. Lucro = Retorno total − Stake.',
  },
  {
    q: 'Como calcular a probabilidade de acertar uma múltipla?',
    a: 'Em odds decimais, a probabilidade implícita de cada seleção é 1 dividido pela odd. Para estimar a probabilidade acumulada, multiplique as probabilidades implícitas das seleções e converta para porcentagem.',
  },
  {
    q: 'Vale a pena usar aposta múltipla?',
    a: 'A múltipla pode ser útil para simular cenários com stake pequeno e retorno potencial maior, mas o risco cresce rapidamente. Ela não deve substituir análise, gestão de banca e comparação de odds.',
  },
  {
    q: 'Múltipla e parlay são a mesma coisa?',
    a: 'Sim. Parlay é o termo em inglês para aposta múltipla. No Brasil, também é comum encontrar os nomes acumulada, acumulador ou combo.',
  },
  {
    q: 'Quantas seleções devo colocar em uma múltipla?',
    a: 'Não existe número ideal para todos. Como cada nova seleção reduz a chance acumulada, bilhetes com 2 a 4 seleções costumam ser mais fáceis de analisar do que acumuladas muito longas.',
  },
  {
    q: 'Por que a probabilidade da múltipla cai tanto?',
    a: 'Porque todas as seleções precisam acontecer. Mesmo escolhas com alta probabilidade individual podem gerar uma probabilidade final baixa quando combinadas em sequência.',
  },
  {
    q: 'Como interpretar o ROI na calculadora de parlay?',
    a: 'O ROI mostra o retorno líquido em relação ao stake. Um ROI de 300% significa que o lucro potencial é três vezes o valor apostado, mas não indica garantia de resultado.',
  },
  {
    q: 'Posso usar hedge ou cash out em uma múltipla?',
    a: 'Pode, dependendo da casa e do momento do bilhete. Hedge e cash out são formas de reduzir exposição ou travar parte do resultado, mas também podem diminuir o retorno final.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de Múltipla / Parlay — CalculaBet',
      url: 'https://calculabet.com.br/calculadoras/multipla-parlay',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description: 'Calculadora gratuita para simular aposta múltipla ou parlay com odd combinada, retorno total, lucro líquido, ROI, probabilidade implícita e risco sobre a banca.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
  ],
};

function InfoCard({ title, children, tone = 'cyan' }) {
  const palette = {
    cyan: ['rgba(34,211,238,0.06)', 'rgba(34,211,238,0.16)', '#22d3ee'],
    violet: ['rgba(129,140,248,0.06)', 'rgba(129,140,248,0.16)', '#818cf8'],
    green: ['rgba(74,222,128,0.06)', 'rgba(74,222,128,0.16)', '#4ade80'],
    amber: ['rgba(251,191,36,0.06)', 'rgba(251,191,36,0.18)', '#fbbf24'],
    red: ['rgba(248,113,113,0.06)', 'rgba(248,113,113,0.18)', '#f87171'],
  }[tone];

  return (
    <div className="rounded-2xl p-5" style={{ background: palette[0], border: `1px solid ${palette[1]}` }}>
      <p className="text-xs font-semibold mb-3" style={{ color: palette[2], textTransform: 'uppercase', letterSpacing: '0.07em' }}>{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function MultiplaExplanation() {
  const examples = [
    { title: 'Dupla conservadora', odds: '1.55 × 1.70', stake: 'R$50', result: 'Odd 2.635 · retorno R$131,75 · lucro R$81,75', note: 'Útil para comparar se duas seleções realmente compensam mais do que apostas simples separadas.' },
    { title: 'Tripla de futebol', odds: '1.80 × 2.10 × 1.65', stake: 'R$30', result: 'Odd 6.237 · retorno R$187,11 · lucro R$157,11', note: 'A probabilidade implícita aproximada cai para 16,0%, então o bilhete exige critério.' },
    { title: 'Acumulada longa', odds: '1.40 × 1.50 × 1.60 × 1.70 × 1.80', stake: 'R$20', result: 'Odd 10.282 · retorno R$205,63 · lucro R$185,63', note: 'O retorno chama atenção, mas a chance de todas as seleções baterem fica muito menor.' },
  ];

  const variables = [
    ['Odd₁, Odd₂, Oddₙ', 'odds decimais de cada seleção do bilhete'],
    ['n', 'quantidade de seleções na múltipla'],
    ['Stake', 'valor investido no bilhete'],
    ['O_comb', 'odd combinada resultante da multiplicação das odds'],
    ['P_impl', 'probabilidade implícita estimada a partir das odds'],
  ];

  return (
    <article className="space-y-10 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
      <section className="space-y-4">
        <p className="text-xs font-semibold" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Guia premium da ferramenta</p>
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-1)' }}>Calculadora de múltipla/parlay: entenda o retorno antes de montar o bilhete</h2>
        <p>
          A <strong style={{ color: 'var(--text-1)' }}>calculadora de múltipla ou parlay</strong> ajuda a simular, em poucos segundos, quanto uma aposta combinada pode retornar, qual seria o lucro líquido, qual ROI aparece no cenário e qual probabilidade implícita está embutida nas odds. Ela é indicada para quem quer sair do “achismo” e analisar o bilhete com números claros antes de confirmar qualquer aposta.
        </p>
        <p>
          Use a ferramenta quando estiver comparando duas ou mais seleções, avaliando se uma odd combinada faz sentido, definindo um stake compatível com sua banca ou estudando o impacto de adicionar mais uma seleção ao bilhete. O objetivo é educativo: transformar uma acumulada visualmente atraente em uma decisão mais consciente, com noção de risco, retorno e exposição.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <InfoCard title="O que calcula" tone="cyan"><p>Odd combinada, retorno total, lucro líquido, ROI, probabilidade acumulada e porcentagem da banca arriscada.</p></InfoCard>
          <InfoCard title="Quando usar" tone="violet"><p>Antes de criar uma dupla, tripla, acumulada de futebol, parlay de NBA/NFL ou qualquer bilhete com seleções combinadas.</p></InfoCard>
          <InfoCard title="Benefício" tone="green"><p>Ajuda a visualizar se o retorno potencial compensa a queda de probabilidade e se o stake está dentro de um limite responsável.</p></InfoCard>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Como funciona uma aposta múltipla</h2>
        <p>
          Em uma aposta simples, uma seleção gera um resultado. Na múltipla, duas ou mais seleções são agrupadas em um único bilhete. As odds não são somadas: elas são multiplicadas. Por isso, o retorno potencial cresce rápido, mas a condição também fica mais exigente: <strong style={{ color: 'var(--text-1)' }}>todas as seleções precisam ser vencedoras</strong> para o bilhete pagar.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard title="Lógica do cálculo" tone="cyan">
            <p>Odd 1.80 combinada com odd 2.00 gera 3.60, não 3.80. Com stake de R$100, o retorno total seria R$360 e o lucro líquido R$260.</p>
          </InfoCard>
          <InfoCard title="Interpretação correta" tone="amber">
            <p>Uma odd combinada alta não significa maior valor esperado por si só. Ela mostra apenas o multiplicador. A qualidade do bilhete depende da análise das probabilidades e do preço oferecido.</p>
          </InfoCard>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Fórmula matemática da múltipla</h2>
        <div className="rounded-2xl p-5" style={{ background: 'rgba(15,23,42,0.55)', border: '1px solid var(--border)' }}>
          <div className="space-y-3 font-mono text-xs md:text-sm" style={{ color: 'var(--text-1)' }}>
            <p>O_comb = Odd₁ × Odd₂ × ... × Oddₙ</p>
            <p>Retorno total = Stake × O_comb</p>
            <p>Lucro líquido = Retorno total − Stake</p>
            <p>ROI = (Lucro líquido ÷ Stake) × 100</p>
            <p>P_impl = (1 ÷ Odd₁) × (1 ÷ Odd₂) × ... × (1 ÷ Oddₙ) × 100</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {variables.map(([name, desc]) => (
            <div key={name} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
              <p className="font-semibold mb-1" style={{ color: 'var(--text-1)' }}>{name}</p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>{desc}</p>
            </div>
          ))}
        </div>
        <InfoCard title="Exemplo resolvido" tone="violet">
          <p>Imagine uma múltipla com odds 1.80, 2.00 e 1.50, usando stake de R$40.</p>
          <p><strong style={{ color: 'var(--text-1)' }}>Odd combinada:</strong> 1.80 × 2.00 × 1.50 = 5.40.</p>
          <p><strong style={{ color: 'var(--text-1)' }}>Retorno total:</strong> R$40 × 5.40 = R$216.</p>
          <p><strong style={{ color: 'var(--text-1)' }}>Lucro líquido:</strong> R$216 − R$40 = R$176.</p>
          <p><strong style={{ color: 'var(--text-1)' }}>Probabilidade implícita:</strong> (1/1.80) × (1/2.00) × (1/1.50) ≈ 18,52%.</p>
        </InfoCard>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Exemplos práticos de uso</h2>
        <div className="grid grid-cols-1 gap-3">
          {examples.map(example => (
            <div key={example.title} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <h3 className="font-semibold" style={{ color: 'var(--text-1)' }}>{example.title}</h3>
                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: '#22d3ee', background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.14)' }}>{example.odds}</span>
              </div>
              <p><strong style={{ color: 'var(--text-1)' }}>Stake:</strong> {example.stake}. <strong style={{ color: 'var(--text-1)' }}>Resultado:</strong> {example.result}.</p>
              <p className="text-xs mt-2" style={{ color: 'var(--text-3)' }}>{example.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Gestão de banca, risco e boas práticas</h2>
        <p>
          Apostas envolvem risco financeiro e devem ser tratadas como entretenimento adulto, não como fonte de renda. A calculadora inclui o campo “banca total” para mostrar quanto do seu saldo ficaria exposto no bilhete. Em múltiplas, essa métrica é especialmente importante porque a probabilidade acumulada costuma ser menor que a sensação inicial do apostador.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard title="Boas práticas" tone="green">
            <ul className="space-y-2 list-disc pl-4">
              <li>Defina um limite de stake antes de escolher as odds.</li>
              <li>Compare odds em mais de uma casa antes de montar o bilhete.</li>
              <li>Prefira seleções que você consegue justificar com dados e contexto.</li>
              <li>Registre resultados para entender ROI real, não apenas bilhetes vencedores.</li>
            </ul>
          </InfoCard>
          <InfoCard title="Erros comuns" tone="red">
            <ul className="space-y-2 list-disc pl-4">
              <li>Adicionar seleções apenas para “aumentar a odd”.</li>
              <li>Ignorar a margem embutida nas odds de cada mercado.</li>
              <li>Usar múltiplas para tentar recuperar perdas rapidamente.</li>
              <li>Apostar valores altos em bilhetes com probabilidade acumulada baixa.</li>
            </ul>
          </InfoCard>
        </div>
        <InfoCard title="Aviso +18 e jogo responsável" tone="amber">
          <p>Conteúdo destinado exclusivamente a maiores de 18 anos. As simulações são educativas, não garantem lucro e não constituem recomendação de aposta. Se apostar deixou de ser entretenimento, procure ajuda e consulte nossa página de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>jogo responsável</Link>.</p>
        </InfoCard>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Próximos passos recomendados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { to: '/calculadoras/conversor-odds', label: 'Converter odds', desc: 'Entenda odds decimais, americanas, fracionárias e probabilidade.' },
            { to: '/calculadoras/gestao-banca', label: 'Aprender gestão de banca', desc: 'Defina stake com Kelly, flat ou percentual fixo.' },
            { to: '/calculadoras/hedge', label: 'Simular hedge', desc: 'Veja como proteger parte de uma múltipla em andamento.' },
            { to: '/casas-apostas', label: 'Comparar odds', desc: 'Espaço preparado para análises e parceiros, sempre com transparência.' },
          ].map(link => (
            <Link key={link.to} to={link.to} className="rounded-2xl p-4 transition-all duration-150" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
              <p className="font-semibold mb-1" style={{ color: 'var(--text-1)' }}>{link.label}</p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

export default function MultiplaParlay() {
  const [selecoes, setSelecoes] = useState([{ odd: '' }, { odd: '' }]);
  const [stake, setStake] = useState('');
  const [banca, setBanca] = useState('');

  const atualizar = (i, v) => {
    const arr = [...selecoes];
    arr[i].odd = v;
    setSelecoes(arr);
  };
  const adicionar = () => setSelecoes([...selecoes, { odd: '' }]);
  const remover = i => selecoes.length > 2 && setSelecoes(selecoes.filter((_, idx) => idx !== i));

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

  return (
    <CalcLayout
      title="Calculadora de Múltipla / Parlay Online"
      description="Calcule aposta múltipla ou parlay com odd combinada, retorno total, lucro líquido, ROI, probabilidade implícita e risco sobre a banca. Ferramenta gratuita e educativa."
      slug="multipla-parlay"
      faqs={faqs}
      schema={schema}
      explanation={<MultiplaExplanation />}
    >
      <div className="space-y-6">
        <div className="rounded-2xl p-4" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.14)' }}>
          <p className="text-sm" style={{ color: 'var(--text-2)' }}>
            Insira as odds decimais de cada seleção, informe o stake e, se quiser, adicione sua banca para medir exposição. A simulação é instantânea e não envia dados para terceiros.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3 gap-3">
            <label className="label mb-0">Seleções ({selecoes.length})</label>
            <button
              type="button"
              onClick={adicionar}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: 'var(--cyan)' }}
              aria-label="Adicionar nova seleção à múltipla"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
                    <label className="label text-xs mb-1.5" htmlFor={`odd-${i}`}>Seleção {i + 1} — Odd decimal</label>
                    <input
                      id={`odd-${i}`}
                      type="number"
                      className="input-field"
                      placeholder="1.80"
                      step="0.01"
                      min="1.01"
                      inputMode="decimal"
                      value={sel.odd}
                      onChange={e => atualizar(i, e.target.value)}
                    />
                  </div>
                  {probImpl !== null && (
                    <div
                      className="mb-px px-2.5 py-2 rounded-lg text-xs font-medium flex-shrink-0"
                      style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.15)', color: '#22d3ee' }}
                      aria-label={`Probabilidade implícita da seleção ${i + 1}: ${probImpl.toFixed(1)}%`}
                    >
                      {probImpl.toFixed(1)}%
                    </div>
                  )}
                  {selecoes.length > 2 && (
                    <button
                      type="button"
                      onClick={() => remover(i)}
                      className="mb-px p-2.5 rounded-xl transition-colors flex-shrink-0"
                      style={{ color: 'var(--red)', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)' }}
                      aria-label={`Remover seleção ${i + 1}`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {todasValidas && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-2xl p-4"
            style={{ background: 'rgba(129,140,248,0.06)', border: '1px solid rgba(129,140,248,0.15)' }}
            aria-live="polite"
          >
            <div>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Odd combinada</p>
              <p className="text-3xl font-bold mt-0.5" style={{ color: '#818cf8' }}>{oddTotal.toFixed(3)}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs font-semibold" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Probabilidade implícita acumulada</p>
              <p className="text-3xl font-bold mt-0.5" style={{ color: probAcumulada < 20 ? '#f87171' : probAcumulada < 40 ? '#fbbf24' : '#4ade80' }}>
                {probAcumulada.toFixed(1)}%
              </p>
            </div>
          </div>
        )}

        <div>
          <label className="label" htmlFor="stake">Stake (R$)</label>
          <div className="flex flex-wrap gap-2 mb-2.5" aria-label="Atalhos de stake">
            {PRESETS.map(p => (
              <button
                key={p}
                type="button"
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
            id="stake"
            type="number"
            className="input-field"
            placeholder="50"
            min="0"
            inputMode="decimal"
            value={stake}
            onChange={e => setStake(e.target.value)}
          />
        </div>

        <div>
          <label className="label" htmlFor="banca">Banca total (R$) <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>— opcional</span></label>
          <input
            id="banca"
            type="number"
            className="input-field"
            placeholder="ex: 1000"
            min="0"
            inputMode="decimal"
            value={banca}
            onChange={e => setBanca(e.target.value)}
          />
          {percBanca > 0 && (
            <div className="mt-2.5 space-y-1.5">
              <div className="flex justify-between text-xs" style={{ color: 'var(--text-3)' }}>
                <span>Risco: <strong style={{ color: riskColor }}>{percBanca.toFixed(1)}% da banca</strong></span>
                <span style={{ color: riskColor, textTransform: 'capitalize' }}>{riskLabel}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }} aria-hidden="true">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(percBanca * 10, 100)}%`, background: riskColor }}
                />
              </div>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                Para múltiplas, stakes pequenos ajudam a preservar a banca. Evite usar apostas para recuperar perdas.
              </p>
            </div>
          )}
        </div>

        {valid ? (
          <div className="space-y-3" aria-live="polite">
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
                <p className="result-label">Prob. implícita</p>
              </div>
            </div>
            <div
              className="rounded-xl px-4 py-3 text-xs"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-3)' }}
            >
              Odd combinada <strong style={{ color: 'var(--text-1)' }}>{oddTotal.toFixed(3)}</strong> · Ponto de equilíbrio aproximado: acertar <strong style={{ color: 'var(--text-1)' }}>{(1 / oddTotal * 100).toFixed(2)}%</strong> de bilhetes equivalentes antes de considerar margem, variação e qualidade das cotações.
            </div>
          </div>
        ) : (
          <div
            className="rounded-xl flex items-center justify-center py-8"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>
              {!todasValidas ? 'Preencha todas as odds decimais (mín. 1.01)' : 'Informe o stake para calcular retorno, lucro e ROI'}
            </p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
