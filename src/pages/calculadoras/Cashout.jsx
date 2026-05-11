import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

const PRESETS_STAKE = [10, 25, 50, 100, 200, 500];

/* ─── FAQ content ───────────────────────────────────────── */

const faqs = [
  {
    q: 'O que é cashout em apostas esportivas?',
    a: 'Cashout é a funcionalidade que permite encerrar uma aposta antes do evento terminar, recebendo um valor calculado com base nas odds atuais do mercado. Se a odd da sua seleção caiu desde a aposta original (o mercado está favorável a você), o cashout oferece um retorno maior que o stake. Se a odd subiu (o mercado virou contra você), o cashout recupera apenas parte do stake. O valor é dinâmico e muda a cada segundo em jogos ao vivo.',
  },
  {
    q: 'Como calcular o cashout justo?',
    a: 'O cashout justo é calculado pela fórmula: Cashout justo = (Stake × Odd original) ÷ Odd atual. Essa fórmula reflete o valor de mercado da sua posição no momento. Exemplo: stake R$100, odd original 3.00, odd atual 1.50. Cashout justo = (100 × 3.00) ÷ 1.50 = R$200. O valor da casa sempre será menor que isso — a diferença é a margem cobrada pelo serviço de cashout.',
  },
  {
    q: 'Por que o cashout oferecido pela casa é menor que o valor justo?',
    a: 'A casa de apostas cobra uma margem sobre o cashout justo — exatamente como cobra margem nas odds normais. Essa margem de cashout geralmente varia entre 5% e 15% e representa o custo financeiro de encerrar a aposta antecipadamente. Se o cashout justo é R$200 e a casa oferece R$174, a margem é de 13%: a casa retém R$26 pelo serviço. Quanto maior a margem, mais caro é o cashout — e mais vantajoso se torna fazer hedge manual em outra casa.',
  },
  {
    q: 'Quando vale a pena fazer cashout?',
    a: 'Cashout vale quando há um motivo estratégico claro: lesão de jogador-chave, expulsão, mudança tática que prejudica seu time, ou quando você está no final de uma múltipla longa e quer garantir o lucro já conquistado. Do ponto de vista matemático, cashout raramente tem valor esperado positivo — você está sempre pagando uma margem. Mas pode fazer sentido como gerenciamento de risco consciente quando a situação do jogo mudou significativamente em relação ao momento da aposta.',
  },
  {
    q: 'O que é cashout parcial e quando usar?',
    a: 'Cashout parcial permite encerrar apenas uma fração da aposta — por exemplo, 50% — mantendo a outra metade ativa. Você garante parte do retorno atual e ainda tem participação no resultado final. É uma alternativa ao cashout total especialmente útil quando você quer reduzir a exposição sem abrir mão completamente da posição. Matematicamente, o custo da margem se aplica apenas à fração fechada.',
  },
  {
    q: 'Como calcular o cashout de uma aposta múltipla?',
    a: 'Em múltiplas, o cashout justo usa a odd acumulada restante como "odd atual". Se você tem uma múltipla de 4 seleções com odd total 10.00, stake R$50 (retorno potencial R$500), e 3 seleções já ganharam, a última seleção agora tem odd 1.30 (estava 1.50 originalmente). O cashout justo é: (50 × 10.00) ÷ 1.30 = R$384,62. Use a Calculadora de Múltipla para encontrar a odd original do bilhete e insira aqui a odd atual da seleção restante.',
  },
  {
    q: 'Cashout ou hedge manual: qual é melhor?',
    a: 'O hedge manual — apostar no resultado oposto em outra casa — geralmente oferece condições melhores que o cashout da casa original, porque você escolhe as melhores odds disponíveis no mercado em vez de aceitar o valor definido pela casa. A desvantagem é que requer uma segunda conta e mais trabalho. Compare as duas opções: use esta calculadora para saber o valor justo e a margem do cashout, e use a Calculadora de Hedge para simular o custo do hedge manual. Escolha a alternativa com menor custo.',
  },
  {
    q: 'O que é cashout automático?',
    a: 'Cashout automático é uma funcionalidade oferecida por algumas casas (como Bet365) que fecha a aposta automaticamente quando o cashout atingir um valor mínimo definido por você. Exemplo: você define que quer fechar se o cashout chegar a R$150. Assim que o mercado atingir esse ponto, a aposta é encerrada automaticamente, mesmo que você não esteja acompanhando o jogo. É útil para jogos ao vivo em que não é possível monitorar em tempo real, mas cuidado: a margem da casa ainda se aplica ao valor automático.',
  },
  {
    q: 'Por que o cashout some ou fica suspenso durante o jogo?',
    a: 'Durante momentos críticos do jogo — como pênaltis, gols, lesões, revisões de VAR — a casa suspende temporariamente o cashout para recalibrar as odds. Isso acontece porque as odds mudam muito rápido nesses momentos e a casa precisa proteger sua margem. Em jogos ao vivo, é comum o cashout ficar indisponível exatamente quando você mais quer usar. Planejar com antecedência e, se possível, fazer hedge manual antes do momento crítico é uma alternativa mais segura.',
  },
  {
    q: 'Todas as casas de apostas oferecem cashout?',
    a: 'Não. Casas como Bet365, Betano, Sportingbet e KTO oferecem cashout em vários mercados. Pinnacle, por exemplo, não oferece cashout — a filosofia da casa é diferente. A disponibilidade também varia por mercado: alguns eventos têm cashout disponível durante o jogo, outros apenas pré-evento, e alguns mercados específicos nunca têm cashout. Sempre verifique a política da casa antes de contar com essa funcionalidade.',
  },
  {
    q: 'Cashout é influenciado pela psicologia?',
    a: 'Sim, e muito. A principal armadilha psicológica do cashout é tomar a decisão baseada em emoção — ansiedade de perder o lucro atual ou pânico com uma virada momentânea — em vez de análise racional. Estudos sobre comportamento de apostadores mostram que o cashout é acionado com mais frequência em momentos de estresse emocional, justamente quando a decisão tende a ser pior. Usar esta calculadora para ver a margem da casa antes de clicar ajuda a criar um processo mais racional.',
  },
  {
    q: 'O que fazer quando o cashout oferecido parece muito baixo?',
    a: 'Quando o cashout da casa está muito abaixo do valor justo (margem acima de 10%), você tem três alternativas: (1) aguardar — se a situação do jogo pode melhorar, esperar pode ser a decisão correta; (2) fazer hedge manual — apostar no resultado oposto em uma casa com melhores odds; (3) aceitar o risco e manter a aposta original. A calculadora mostra a margem exata para embasar essa escolha. Nunca aceite um cashout caro apenas por ansiedade.',
  },
];

/* ─── Schema ─────────────────────────────────────────────── */

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de Cashout — CalculaBet',
      url: 'https://calculabet.com.br/calculadoras/cashout',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Calculadora gratuita de cashout: descubra o valor justo, compare com o oferecido pela casa, veja a margem cobrada e decida com dados se vale fechar sua aposta antecipadamente.',
      featureList: [
        'Cálculo do cashout justo de mercado',
        'Comparação com o cashout oferecido pela casa',
        'Margem percentual da casa sobre o cashout',
        'Lucro com cashout vs lucro se ganhar',
        'Indicador de tendência (ganhando/perdendo)',
        'Classificação da margem (baixa, média, alta)',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
};

/* ─── Shared UI ──────────────────────────────────────────── */

function InfoCard({ title, children, tone = 'cyan' }) {
  const palette = {
    cyan:   ['rgba(34,211,238,0.06)',  'rgba(34,211,238,0.16)',  '#22d3ee'],
    violet: ['rgba(129,140,248,0.06)', 'rgba(129,140,248,0.16)', '#818cf8'],
    green:  ['rgba(74,222,128,0.06)',  'rgba(74,222,128,0.16)',  '#4ade80'],
    amber:  ['rgba(251,191,36,0.06)',  'rgba(251,191,36,0.18)',  '#fbbf24'],
    red:    ['rgba(248,113,113,0.06)', 'rgba(248,113,113,0.18)', '#f87171'],
  }[tone];
  return (
    <div className="rounded-2xl p-5" style={{ background: palette[0], border: `1px solid ${palette[1]}` }}>
      <p className="text-xs font-semibold mb-3" style={{ color: palette[2], textTransform: 'uppercase', letterSpacing: '0.07em' }}>{title}</p>
      <div className="space-y-2 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{children}</div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-semibold" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
      {children}
    </p>
  );
}

function MarginTable() {
  const rows = [
    { range: 'Abaixo de 3%',  label: 'Cashout competitivo',  action: 'Considere fechar se houver motivo estratégico.', color: '#4ade80' },
    { range: '3% – 5%',       label: 'Cashout justo',        action: 'Aceitável. Analise a situação do jogo antes.', color: '#4ade80' },
    { range: '5% – 8%',       label: 'Margem moderada',      action: 'Dentro do esperado. Use apenas com razão clara.', color: '#fbbf24' },
    { range: '8% – 12%',      label: 'Margem elevada',       action: 'Caro. Compare com hedge manual em outra casa.', color: '#fbbf24' },
    { range: 'Acima de 12%',  label: 'Cashout caro',         action: 'Evite ou prefira hedge manual — melhor custo-benefício.', color: '#f87171' },
  ];
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            {['Margem da casa', 'Classificação', 'O que fazer'].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
              <td className="px-4 py-3 font-mono font-semibold" style={{ color: r.color, whiteSpace: 'nowrap' }}>{r.range}</td>
              <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-1)' }}>{r.label}</td>
              <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-3)' }}>{r.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScenariosTable() {
  const rows = [
    { cen: 'Ganhando muito (odd caiu bastante)',  stake: 'R$100', odds: '4.00 → 1.20', justo: 'R$333,33', lucro: '+R$233,33', sit: 'Lucro expressivo garantido', color: '#4ade80' },
    { cen: 'Ganhando moderadamente',              stake: 'R$100', odds: '2.50 → 1.60', justo: 'R$156,25', lucro: '+R$56,25',  sit: 'Lucro parcial seguro',      color: '#4ade80' },
    { cen: 'Jogo empatado (odds iguais)',          stake: 'R$100', odds: '2.00 → 2.00', justo: 'R$100,00', lucro: 'R$0',       sit: 'Recupera apenas o stake',   color: '#fbbf24' },
    { cen: 'Perdendo levemente',                  stake: 'R$100', odds: '2.00 → 3.00', justo: 'R$66,67',  lucro: '−R$33,33',  sit: 'Limita a perda em 33%',     color: '#f87171' },
    { cen: 'Perdendo muito (odd subiu muito)',     stake: 'R$100', odds: '2.00 → 8.00', justo: 'R$25,00',  lucro: '−R$75,00',  sit: 'Cashout de emergência',     color: '#f87171' },
  ];
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            {['Cenário', 'Stake', 'Odd original → atual', 'Cashout justo', 'Lucro/Prejuízo', 'Situação'].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
              <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-1)' }}>{r.cen}</td>
              <td className="px-4 py-3 font-mono" style={{ color: 'var(--text-2)' }}>{r.stake}</td>
              <td className="px-4 py-3 font-mono" style={{ color: '#22d3ee' }}>{r.odds}</td>
              <td className="px-4 py-3 font-bold" style={{ color: '#22d3ee' }}>{r.justo}</td>
              <td className="px-4 py-3 font-bold" style={{ color: r.color }}>{r.lucro}</td>
              <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-3)' }}>{r.sit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Main explanation component (SEO) ──────────────────── */

function CashoutExplanation() {

  const decisionSteps = [
    { n: '1', t: 'Calcule o cashout justo', d: 'Use esta calculadora para saber quanto sua posição vale de fato no mercado atual. Insira o stake, a odd original e a odd atual. O cashout justo é o número de referência — qualquer valor abaixo disso pago pela casa representa a margem cobrada.' },
    { n: '2', t: 'Avalie a margem da casa', d: 'Compare o valor justo com o oferecido pela casa. Se a margem está acima de 8–10%, o cashout está caro. Nesse caso, verifique se um hedge manual em outra casa oferece condições melhores antes de decidir.' },
    { n: '3', t: 'Analise a situação do jogo', d: 'A decisão de cashout deve ser baseada em análise, não em emoção. Sua seleção ainda tem as mesmas condições de quando você apostou? Houve lesão, expulsão, mudança tática? A situação mudou significativamente?' },
    { n: '4', t: 'Compare cashout vs. aguardar', d: 'Calcule o custo de oportunidade: se você fechar agora, você garante X. Se aguardar e ganhar, você recebe Y. Se aguardar e perder, você recebe zero. A decisão racional envolve estimar a probabilidade de cada caminho.' },
    { n: '5', t: 'Decida com critério, não com emoção', d: 'Ansiedade de perder o lucro atual é o gatilho mais comum de cashouts ruins. Defina antes do jogo um critério claro — margem máxima aceitável, margem mínima de lucro garantido — e siga o plano independente da emoção no momento.' },
  ];

  return (
    <article className="space-y-12 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>

      {/* ── Intro ── */}
      <section className="space-y-5">
        <SectionLabel>Guia completo da ferramenta</SectionLabel>
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          Calculadora de cashout: descubra o valor justo e a margem antes de fechar sua aposta
        </h2>
        <p>
          A <strong style={{ color: 'var(--text-1)' }}>calculadora de cashout</strong> é uma ferramenta educativa que revela o <strong style={{ color: 'var(--text-1)' }}>valor justo de mercado</strong> da sua aposta no momento atual e o compara com o valor que a casa está oferecendo. A diferença entre os dois é a <strong style={{ color: 'var(--text-1)' }}>margem de cashout</strong> — o custo real de fechar a aposta antecipadamente, que frequentemente passa despercebido por apostadores.
        </p>
        <p>
          O cashout é uma das funcionalidades mais populares das casas de apostas modernas, disponível em Bet365, Betano, Sportingbet e outras. Permite encerrar uma aposta antes do resultado final — seja para garantir lucro parcial quando você está vencendo, seja para limitar o prejuízo quando o jogo virou contra você. Parece simples, mas a matemática por trás revela que a casa sempre cobra um preço por essa conveniência.
        </p>
        <p>
          Use esta ferramenta antes de clicar em "fazer cashout": ela mostra em segundos se o valor oferecido está próximo do justo ou se a margem da casa está inflada — caso em que um <strong style={{ color: 'var(--text-1)' }}>hedge manual em outra casa</strong> pode ser significativamente mais vantajoso.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <InfoCard title="O que calcula" tone="cyan">
            <p>Cashout justo de mercado, comparação com o valor da casa, margem percentual cobrada, lucro com cashout e lucro potencial se aguardar o resultado.</p>
          </InfoCard>
          <InfoCard title="Quando usar" tone="violet">
            <p>Antes de fechar qualquer aposta antecipadamente — simples, múltipla ou ao vivo — para saber se o preço oferecido pela casa está justo ou se existe alternativa melhor.</p>
          </InfoCard>
          <InfoCard title="Principal benefício" tone="green">
            <p>Transforma a decisão emocional de "fechar ou não fechar" em uma análise numérica com margem, custo de oportunidade e alternativa de hedge calculada.</p>
          </InfoCard>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Como o cashout funciona: mecânica e fórmula</h2>
        <p>
          Quando você faz uma aposta, está comprando uma posição no mercado. Se as odds mudarem a seu favor — ou seja, a probabilidade implícita da sua seleção aumentou — sua posição vale mais do que pagou. O cashout é essencialmente a <strong style={{ color: 'var(--text-1)' }}>venda dessa posição</strong> para a casa pelo valor atual de mercado, menos a margem cobrada.
        </p>
        <p>
          A fórmula do cashout justo é direta: você recebe o valor proporcional ao quanto a odd caiu. Se a odd caiu pela metade (de 3.00 para 1.50), sua posição dobrou de valor. Se a odd subiu para o dobro (de 2.00 para 4.00), sua posição vale metade do stake.
        </p>
        <div className="rounded-2xl p-5" style={{ background: 'rgba(15,23,42,0.55)', border: '1px solid var(--border)' }}>
          <div className="space-y-3 font-mono text-xs md:text-sm" style={{ color: 'var(--text-1)' }}>
            <p><span style={{ color: '#22d3ee' }}>Cashout justo</span>   = (Stake × Odd original) ÷ Odd atual</p>
            <p><span style={{ color: '#4ade80' }}>Lucro c/ cashout</span> = Cashout justo − Stake</p>
            <p><span style={{ color: '#818cf8' }}>Lucro se ganhar</span>  = Stake × (Odd original − 1)</p>
            <p><span style={{ color: '#f87171' }}>Margem da casa</span>   = (Cashout justo − Cashout ofertado) ÷ Cashout justo × 100</p>
          </div>
        </div>
        <InfoCard title="Exemplo resolvido passo a passo" tone="violet">
          <p>Aposta: stake <strong style={{ color: 'var(--text-1)' }}>R$100</strong>, odd original <strong style={{ color: 'var(--text-1)' }}>3.00</strong>. Jogo em andamento — odd atual caiu para <strong style={{ color: 'var(--text-1)' }}>1.50</strong>. Casa oferece cashout de <strong style={{ color: 'var(--text-1)' }}>R$182</strong>.</p>
          <p><strong style={{ color: 'var(--text-1)' }}>Cashout justo:</strong> (100 × 3.00) ÷ 1.50 = <strong style={{ color: '#22d3ee' }}>R$200,00</strong></p>
          <p><strong style={{ color: 'var(--text-1)' }}>Lucro com cashout:</strong> R$200 − R$100 = <strong style={{ color: '#4ade80' }}>+R$100,00</strong></p>
          <p><strong style={{ color: 'var(--text-1)' }}>Lucro se ganhar:</strong> R$100 × (3.00 − 1) = <strong style={{ color: '#818cf8' }}>+R$200,00</strong></p>
          <p><strong style={{ color: 'var(--text-1)' }}>Margem da casa:</strong> (200 − 182) ÷ 200 × 100 = <strong style={{ color: '#f87171' }}>9% (elevada)</strong></p>
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>Com 9% de margem, este cashout é caro. Vale considerar hedge manual para obter condições melhores.</p>
        </InfoCard>
      </section>

      {/* ── Scenarios table ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Cenários de cashout: do jogo ganhado ao jogo perdido</h2>
        <p>
          O cashout justo varia muito dependendo de como as odds se moveram desde a aposta original. A tabela abaixo mostra cinco cenários típicos com stake de R$100 para ilustrar como o valor muda conforme a posição no jogo:
        </p>
        <ScenariosTable />
        <p className="text-xs" style={{ color: 'var(--text-3)' }}>
          Valores calculados com a fórmula do cashout justo, sem desconto de margem da casa. O valor real oferecido pela casa será sempre menor.
        </p>
      </section>

      {/* ── Margin table ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Como interpretar a margem do cashout</h2>
        <p>
          A margem do cashout é o indicador mais importante para decidir se vale fechar a aposta. Ela representa o percentual que a casa retém sobre o valor justo — quanto maior, mais caro é o cashout. Use a tabela abaixo como referência:
        </p>
        <MarginTable />
        <InfoCard title="Por que a margem do cashout tende a ser maior que a margem das odds?" tone="amber">
          <p>Quando você apostou originalmente, a casa cobrou uma margem de, digamos, 5% nas odds. No cashout, a mesma casa cobra sua margem novamente — agora sobre o valor corrente da posição. Em jogos ao vivo com odds mudando rapidamente, essa margem pode ser ainda maior porque a casa precisa proteger sua exposição em tempo real. É por isso que o cashout de uma aposta ganhadora em jogo ao vivo muitas vezes paga menos do que seria matematicamente justo.</p>
        </InfoCard>
      </section>

      {/* ── Partial vs full ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Cashout total vs. cashout parcial: qual escolher</h2>
        <p>
          Quando a opção de cashout parcial está disponível, você pode fechar apenas uma fração da aposta. A escolha entre total e parcial depende da sua avaliação sobre o jogo e do quanto de exposição você tolera manter:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard title="Cashout total" tone="cyan">
            <ul className="space-y-2 list-disc pl-4">
              <li>Encerra toda a aposta — sem mais risco ou exposição.</li>
              <li>Garante o valor do cashout integralmente.</li>
              <li>Indicado quando você perdeu convicção no resultado ou quer capital disponível.</li>
              <li>A margem da casa se aplica ao valor total.</li>
            </ul>
          </InfoCard>
          <InfoCard title="Cashout parcial" tone="violet">
            <ul className="space-y-2 list-disc pl-4">
              <li>Fecha uma fração (ex: 50%) e mantém o restante ativo.</li>
              <li>Garante parte do lucro atual e preserva exposição ao resultado final.</li>
              <li>Útil quando você quer reduzir risco mas ainda acredita na seleção.</li>
              <li>A margem da casa se aplica apenas à fração fechada.</li>
            </ul>
          </InfoCard>
        </div>
        <InfoCard title="Exemplo de cashout parcial" tone="green">
          <p>Cashout justo: R$200. Casa oferece R$182. Você faz cashout parcial de 50%: recebe R$91. A outra metade permanece ativa com retorno potencial de R$100 se a aposta ganhar. Se perder, você perde os R$50 de stake restante.</p>
          <p>Resultado possível A — aposta ganha: <strong style={{ color: 'var(--text-1)' }}>R$91 (cashout) + R$100 (lucro restante) = R$191 total</strong></p>
          <p>Resultado possível B — aposta perde: <strong style={{ color: 'var(--text-1)' }}>R$91 (cashout) − R$50 (stake perdido) = R$41 de lucro líquido</strong></p>
        </InfoCard>
      </section>

      {/* ── Cashout vs Hedge ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Cashout vs. hedge manual: análise comparativa</h2>
        <p>
          O cashout e o hedge manual têm o mesmo objetivo — reduzir exposição a uma aposta aberta — mas funcionam de formas diferentes. Entender a diferença pode economizar dinheiro real:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl p-5" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.15)' }}>
            <p className="text-xs font-semibold mb-4" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Cashout (pela casa original)</p>
            <ul className="space-y-2.5">
              {[
                'Instantâneo — um clique, sem pesquisa',
                'Disponível em apostas ao vivo',
                'A casa define o valor sem negociação',
                'Margem de 5–15% sobre o valor justo',
                'Pode ser suspenso em momentos críticos',
                'Opção parcial disponível em algumas casas',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                  <span className="flex-shrink-0 mt-0.5" style={{ color: '#22d3ee' }}>→</span>{p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl p-5" style={{ background: 'rgba(129,140,248,0.05)', border: '1px solid rgba(129,140,248,0.15)' }}>
            <p className="text-xs font-semibold mb-4" style={{ color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Hedge manual (em outra casa)</p>
            <ul className="space-y-2.5">
              {[
                'Você escolhe as melhores odds disponíveis',
                'Exige conta ativa em outra casa com saldo',
                'Pode oferecer margem de 2–5% em casas competitivas',
                'Mais trabalho: pesquisar odds, calcular stake',
                'Sempre disponível enquanto o mercado existir',
                'Flexibilidade total de cobertura parcial ou total',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                  <span className="flex-shrink-0 mt-0.5" style={{ color: '#818cf8' }}>→</span>{p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p>
          Para simular o custo de um hedge manual, use a{' '}
          <Link to="/calculadoras/hedge" style={{ color: '#22d3ee', fontWeight: 600 }}>Calculadora de Hedge</Link>.
          Compare o resultado com a margem do cashout mostrada por esta calculadora e escolha a opção com menor custo.
        </p>
      </section>

      {/* ── Cashout in multiples ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Cashout em apostas múltiplas: como funciona o cálculo</h2>
        <p>
          O cashout de uma aposta múltipla usa a <strong style={{ color: 'var(--text-1)' }}>odd acumulada restante</strong> como parâmetro. Conforme as seleções do bilhete vão sendo resolvidas, a odd restante muda — e com ela o valor do cashout.
        </p>
        <InfoCard title="Exemplo: múltipla com 4 seleções, 3 já ganhas" tone="violet">
          <p>Múltipla original: 4 seleções, odd total <strong style={{ color: 'var(--text-1)' }}>10.00</strong>, stake <strong style={{ color: 'var(--text-1)' }}>R$50</strong> → retorno potencial <strong style={{ color: 'var(--text-1)' }}>R$500</strong>.</p>
          <p>Após 3 seleções ganharem, a última seleção que estava com odd 1.50 agora está com odd <strong style={{ color: 'var(--text-1)' }}>1.30</strong> (favorita a vencer).</p>
          <p><strong style={{ color: 'var(--text-1)' }}>Odd original (para o cálculo):</strong> 10.00 (toda a múltipla)</p>
          <p><strong style={{ color: 'var(--text-1)' }}>Odd atual:</strong> 1.30 (só a última seleção restante)</p>
          <p><strong style={{ color: 'var(--text-1)' }}>Cashout justo:</strong> (50 × 10.00) ÷ 1.30 = <strong style={{ color: '#4ade80' }}>R$384,62</strong></p>
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>Use a Calculadora de Múltipla para encontrar a odd original total do bilhete e insira a odd atual da seleção restante nesta calculadora.</p>
        </InfoCard>
        <p>
          Um ponto importante: o cashout de múltiplas tende a ter margem mais alta do que o de apostas simples. A casa sabe que o apostador está emocionalmente mais envolvido numa múltipla quase completa — e isso se reflete no preço oferecido. Sempre calcule a margem antes de aceitar.
        </p>
        <p>
          Para calcular a odd combinada original da sua múltipla, use a{' '}
          <Link to="/calculadoras/multipla-parlay" style={{ color: '#22d3ee', fontWeight: 600 }}>Calculadora de Múltipla</Link>.
        </p>
      </section>

      {/* ── Psychology ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>A psicologia do cashout: por que apostadores tomam decisões ruins</h2>
        <p>
          O cashout é uma das funcionalidades mais estudadas em psicologia comportamental aplicada a apostas. Pesquisas mostram que apostadores tendem a acionar o cashout em momentos de pico emocional — não de análise racional — e que a maioria das decisões de cashout é subótima quando avaliada matematicamente.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard title="Armadilhas psicológicas comuns" tone="red">
            <ul className="space-y-2 list-disc pl-4">
              <li><strong style={{ color: 'var(--text-1)' }}>Aversão à perda:</strong> o medo de ver o lucro desaparecer é mais intenso do que a satisfação de ganhar mais. Isso leva ao cashout prematuro.</li>
              <li><strong style={{ color: 'var(--text-1)' }}>Falácia do custo irrecuperável:</strong> "já apostei, preciso garantir algo" — mas a melhor decisão deve ignorar o que já foi apostado.</li>
              <li><strong style={{ color: 'var(--text-1)' }}>Viés do presente:</strong> o lucro imediato parece mais real do que o potencial futuro, mesmo que matematicamente o futuro valha mais.</li>
              <li><strong style={{ color: 'var(--text-1)' }}>Ansiedade de jogo ao vivo:</strong> cada ataque do adversário aumenta o impulso de fechar, mesmo sem mudança real nas probabilidades.</li>
            </ul>
          </InfoCard>
          <InfoCard title="Como tomar decisões mais racionais" tone="green">
            <ul className="space-y-2 list-disc pl-4">
              <li>Calcule o cashout justo e a margem <em>antes</em> de assistir o jogo — tenha o número na cabeça.</li>
              <li>Defina um critério claro antecipadamente: "só faço cashout se a margem for menor que X%".</li>
              <li>Use cashout automático com limite definido para remover a emoção do momento.</li>
              <li>Pergunte-se: "se eu ainda não tivesse apostado, eu apostaria no resultado oposto agora?" Se sim, o cashout faz sentido.</li>
            </ul>
          </InfoCard>
        </div>
      </section>

      {/* ── Decision framework ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>5 passos para decidir se vale fazer cashout</h2>
        <p>
          Em vez de decidir por impulso, use este processo estruturado sempre que estiver considerando fechar uma aposta antecipadamente:
        </p>
        <ol className="space-y-3 list-none">
          {decisionSteps.map(d => (
            <li key={d.n} className="flex gap-4 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee' }}>{d.n}</span>
              <div>
                <p className="font-semibold text-sm mb-1.5" style={{ color: 'var(--text-1)' }}>{d.t}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>{d.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── When to / avoid ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Quando usar e quando evitar o cashout</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard title="Considere fazer cashout" tone="green">
            <ul className="space-y-2 list-disc pl-4">
              <li>Lesão ou expulsão do seu jogador/time durante o jogo.</li>
              <li>Odd caiu muito e a margem da casa está abaixo de 5%.</li>
              <li>Você está na penúltima seleção de uma múltipla longa e quer garantir o lucro.</li>
              <li>A situação do jogo mudou estruturalmente (não apenas pontualmente).</li>
              <li>Você precisa do capital para outra oportunidade identificada.</li>
            </ul>
          </InfoCard>
          <InfoCard title="Evite fazer cashout" tone="red">
            <ul className="space-y-2 list-disc pl-4">
              <li>Apenas por ansiedade, sem motivo estratégico real.</li>
              <li>Quando a margem da casa está acima de 10%.</li>
              <li>Em jogos com muito tempo restante e sem mudança relevante.</li>
              <li>Quando o hedge manual oferece condições significativamente melhores.</li>
              <li>Para "recuperar parte" após uma rodada ruim — decisão emocional típica.</li>
            </ul>
          </InfoCard>
        </div>
      </section>

      {/* ── Responsible gaming ── */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Jogo responsável e avisos importantes</h2>
        <InfoCard title="+18 · Conteúdo educativo · Jogo responsável" tone="amber">
          <p>
            Este conteúdo é destinado exclusivamente a maiores de 18 anos. As simulações desta calculadora são educativas e não constituem recomendação financeira nem garantia de resultado. O cashout é uma funcionalidade que envolve custo real — a margem da casa — e deve ser usado com base em análise, não em emoção.
          </p>
          <p>
            Se apostas esportivas estiverem afetando sua vida financeira, profissional ou pessoal, procure ajuda. Acesse nossa página de{' '}
            <Link to="/jogo-responsavel" style={{ color: '#fbbf24', fontWeight: 600 }}>jogo responsável</Link>
            {' '}para recursos e orientações disponíveis no Brasil.
          </p>
        </InfoCard>
      </section>

      {/* ── CTA links ── */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Ferramentas que complementam o cashout</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { to: '/calculadoras/hedge', label: 'Calculadora de Hedge', desc: 'Simule o custo de um hedge manual e compare com a margem do cashout da casa.' },
            { to: '/calculadoras/multipla-parlay', label: 'Calculadora de Múltipla', desc: 'Encontre a odd original do seu bilhete combinado para usar no cálculo de cashout.' },
            { to: '/calculadoras/arbitragem', label: 'Calculadora de Arbitragem', desc: 'Identifique oportunidades de sure bet entre casas para garantir lucro sem cashout.' },
            { to: '/calculadoras/odds', label: 'Calculadora de Odds', desc: 'Converta odds e calcule probabilidade implícita para avaliar a odd atual do mercado.' },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-2xl p-4 block transition-all duration-150"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,211,238,0.22)'; e.currentTarget.style.background = 'rgba(34,211,238,0.03)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
            >
              <p className="font-semibold mb-1.5 text-sm" style={{ color: 'var(--text-1)' }}>{link.label}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>{link.desc}</p>
            </Link>
          ))}
        </div>
        <p className="text-xs" style={{ color: 'var(--text-3)' }}>
          Todas as ferramentas são gratuitas, sem cadastro e sem envio de dados a terceiros.{' '}
          <Link to="/" style={{ color: '#22d3ee' }}>Ver todas as calculadoras →</Link>
        </p>
      </section>
    </article>
  );
}

/* ─── Page component ─────────────────────────────────────── */

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
  const margemCasa = valid && cc > 0 && cc < cashoutJusto
    ? ((cashoutJusto - cc) / cashoutJusto) * 100
    : null;

  const tendencia = valid
    ? oa < oo ? 'ganhando' : oa > oo ? 'perdendo' : 'neutro'
    : null;
  const tendenciaCor = tendencia === 'ganhando' ? '#4ade80'
    : tendencia === 'perdendo' ? '#f87171' : '#fbbf24';
  const tendenciaLabel = tendencia === 'ganhando' ? 'Odd caiu — você está ganhando'
    : tendencia === 'perdendo' ? 'Odd subiu — você está perdendo'
    : 'Odd igual — situação neutra';

  const margemCor = margemCasa === null ? null
    : margemCasa < 5 ? '#4ade80' : margemCasa < 10 ? '#fbbf24' : '#f87171';
  const margemMsg = margemCasa === null ? null
    : margemCasa < 5
      ? `Margem de ${margemCasa.toFixed(1)}% — cashout competitivo. Vale considerar fechar se a situação justificar.`
      : margemCasa < 10
        ? `Margem de ${margemCasa.toFixed(1)}% — dentro do esperado. Use se tiver motivo estratégico claro.`
        : `Margem de ${margemCasa.toFixed(1)}% — cashout caro. Considere hedge manual em outra casa para condições melhores.`;

  return (
    <CalcLayout
      title="Calculadora de Cashout Online"
      description="Calcule o valor justo do cashout grátis: compare com o oferecido pela casa, descubra a margem cobrada e decida com dados se vale fechar sua aposta antecipadamente. Educativa, sem cadastro."
      slug="cashout"
      faqs={faqs}
      schema={schema}
      explanation={<CashoutExplanation />}
    >
      <div className="space-y-6">

        {/* Info banner */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.14)' }}>
          <p className="text-sm" style={{ color: 'var(--text-2)' }}>
            Insira o stake original, a odd no momento da aposta e a odd atual. Se souber o valor oferecido pela casa, adicione-o para ver a <strong style={{ color: 'var(--text-1)' }}>margem cobrada</strong>.
          </p>
        </div>

        {/* Stake */}
        <div>
          <label className="label" htmlFor="stake-cashout">Stake original (R$)</label>
          <div className="flex flex-wrap gap-2 mb-2.5" aria-label="Atalhos de stake">
            {PRESETS_STAKE.map(p => (
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
            id="stake-cashout"
            type="number"
            className="input-field"
            placeholder="ex: 100"
            min="0"
            inputMode="decimal"
            value={stake}
            onChange={e => setStake(e.target.value)}
          />
        </div>

        {/* Odds */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="odd-original">Odd no momento da aposta</label>
            <input
              id="odd-original"
              type="number"
              className="input-field"
              placeholder="ex: 3.00"
              step="0.01"
              min="1.01"
              inputMode="decimal"
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
            <label className="label" htmlFor="odd-atual">Odd atual no mercado</label>
            <input
              id="odd-atual"
              type="number"
              className="input-field"
              placeholder="ex: 1.50"
              step="0.01"
              min="1.01"
              inputMode="decimal"
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
            style={{ background: `${tendenciaCor}0d`, border: `1px solid ${tendenciaCor}25` }}
            aria-live="polite"
          >
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: tendenciaCor }} aria-hidden="true" />
            <p className="text-xs font-medium" style={{ color: tendenciaCor }}>{tendenciaLabel}</p>
          </div>
        )}

        {/* Cashout da casa */}
        <div>
          <label className="label" htmlFor="cashout-casa">
            Cashout oferecido pela casa (R$){' '}
            <span style={{ color: 'var(--text-3)', fontWeight: 400, textTransform: 'none' }}>— opcional</span>
          </label>
          <input
            id="cashout-casa"
            type="number"
            className="input-field"
            placeholder="ex: 145,00"
            min="0"
            inputMode="decimal"
            value={cashoutCasa}
            onChange={e => setCashoutCasa(e.target.value)}
          />
          <p className="text-xs mt-1.5" style={{ color: 'var(--text-3)' }}>
            Preencha para ver a margem percentual que a casa está cobrando.
          </p>
        </div>

        {/* Results */}
        {valid ? (
          <div className="space-y-3" aria-live="polite">
            <div className="grid grid-cols-3 gap-3">
              <div className="result-box">
                <p className="result-value" style={{ color: '#22d3ee' }}>R${cashoutJusto.toFixed(2)}</p>
                <p className="result-label">Cashout justo</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: lucroSeCashout >= 0 ? '#4ade80' : '#f87171' }}>
                  {lucroSeCashout >= 0 ? '+' : ''}R${lucroSeCashout.toFixed(2)}
                </p>
                <p className="result-label">{lucroSeCashout >= 0 ? 'Lucro' : 'Prejuízo'} c/ cashout</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: '#818cf8' }}>+R${lucroSeGanhar.toFixed(2)}</p>
                <p className="result-label">Lucro se ganhar</p>
              </div>
            </div>

            {margemCasa !== null && (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="result-box">
                    <p className="result-value">R${cc.toFixed(2)}</p>
                    <p className="result-label">Cashout da casa</p>
                  </div>
                  <div className="result-box">
                    <p className="result-value" style={{ color: margemCor }}>{margemCasa.toFixed(1)}%</p>
                    <p className="result-label">Margem da casa</p>
                  </div>
                </div>
                <div
                  className="flex items-start gap-3 px-4 py-3 rounded-xl"
                  style={{
                    background: margemCasa > 10 ? 'rgba(248,113,113,0.05)' : margemCasa > 5 ? 'rgba(251,191,36,0.04)' : 'rgba(34,197,94,0.04)',
                    border: `1px solid ${margemCasa > 10 ? 'rgba(248,113,113,0.18)' : margemCasa > 5 ? 'rgba(251,191,36,0.15)' : 'rgba(34,197,94,0.15)'}`,
                  }}
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: margemCor }} aria-hidden="true" />
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>{margemMsg}</p>
                </div>
              </div>
            )}

            <div className="rounded-xl px-4 py-3 text-xs" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-3)' }}>
              {lucroSeCashout >= 0
                ? `Cashout agora: garante +R$${lucroSeCashout.toFixed(2)} de lucro. Aguardar pode render +R$${lucroSeGanhar.toFixed(2)} se a aposta ganhar — ou perder os R$${s.toFixed(2)} apostados.`
                : `Cashout agora: recupera R$${cashoutJusto.toFixed(2)} de R$${s.toFixed(2)} apostados (prejuízo de R$${Math.abs(lucroSeCashout).toFixed(2)}). Se ganhar, o lucro seria +R$${lucroSeGanhar.toFixed(2)}.`}
            </div>
          </div>
        ) : (
          <div
            className="rounded-xl flex items-center justify-center py-10"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
          >
            <p className="text-sm text-center px-4" style={{ color: 'var(--text-3)' }}>
              Preencha o stake, a odd original e a odd atual para calcular o cashout justo
            </p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
