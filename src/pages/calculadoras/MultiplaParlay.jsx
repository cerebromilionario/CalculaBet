import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

const PRESETS = [10, 25, 50, 100, 200, 500];

const faqs = [
  {
    q: 'Como calcular uma aposta múltipla ou parlay?',
    a: 'Para calcular uma múltipla, multiplique as odds decimais de todas as seleções escolhidas. O resultado é a odd combinada. Em seguida, multiplique essa odd combinada pelo valor do stake para obter o retorno total. O lucro líquido é o retorno total menos o stake inicial. Exemplo: odds 1.80 × 2.10 = odd combinada 3.78. Com stake de R$50, o retorno total seria R$189 e o lucro líquido R$139.',
  },
  {
    q: 'O que significa odd combinada na múltipla?',
    a: 'A odd combinada é o multiplicador final do bilhete, obtido pela multiplicação das odds decimais de todas as seleções incluídas. Ela representa quanto o stake retorna caso todas as apostas sejam vencedoras. Uma odd combinada de 5.00 significa que cada real apostado retorna cinco reais — ou seja, lucro de quatro vezes o stake. Quanto mais seleções no bilhete, maior a odd combinada, mas também menor a probabilidade de acerto.',
  },
  {
    q: 'Qual é a fórmula da calculadora de múltipla?',
    a: 'A fórmula principal segue três passos: (1) Odd combinada = Odd₁ × Odd₂ × … × Oddₙ; (2) Retorno total = Stake × Odd combinada; (3) Lucro líquido = Retorno total − Stake. Para o ROI: Lucro ÷ Stake × 100. Para a probabilidade implícita acumulada: (1 ÷ Odd₁) × (1 ÷ Odd₂) × … × (1 ÷ Oddₙ) × 100. Todas essas métricas são calculadas instantaneamente nesta ferramenta ao preencher odds e stake.',
  },
  {
    q: 'Como calcular a probabilidade de acertar uma múltipla?',
    a: 'A probabilidade implícita de cada seleção é calculada como 1 dividido pela odd decimal. Para a acumulada, multiplique todas as probabilidades individuais. Por exemplo, três seleções com odds 1.80, 2.00 e 1.70 têm probabilidades implícitas de 55,6%, 50,0% e 58,8%, respectivamente. A probabilidade acumulada é 0,556 × 0,500 × 0,588 ≈ 16,3%. Isso não considera a margem das casas, então a estimativa real é ainda menor.',
  },
  {
    q: 'Vale a pena usar aposta múltipla?',
    a: 'Depende do objetivo. A múltipla pode ser útil para simular cenários com stake pequeno e retorno potencial elevado, ou para combinar seleções que você analisou e considerou com valor. No entanto, ela concentra risco: qualquer seleção errada cancela todo o retorno. Ela não garante resultado positivo, não substitui análise e nunca deve ser usada para tentar recuperar perdas. Use a calculadora para entender o que você está arriscando antes de confirmar.',
  },
  {
    q: 'Múltipla e parlay são a mesma coisa?',
    a: 'Sim, são termos para o mesmo tipo de aposta. "Parlay" é o nome em inglês, amplamente usado em apostas americanas, especialmente em futebol americano e basquete. No Brasil, o termo mais comum é "múltipla" ou "acumulada". Em algumas plataformas você também pode encontrar os nomes "combo", "acumulador" ou "bilhete combinado". A lógica matemática é idêntica: odds multiplicadas e todas as seleções precisam ganhar.',
  },
  {
    q: 'Quantas seleções devo colocar em uma múltipla?',
    a: 'Não há um número ideal universal, mas a análise matemática mostra que cada seleção adicionada reduz a probabilidade acumulada de forma exponencial. Bilhetes com 2 a 4 seleções são mais fáceis de analisar com critério e justificar com dados. Múltiplas com 7 ou mais seleções geralmente apresentam probabilidade implícita inferior a 5%, o que as torna extremamente difíceis de acertar mesmo com boas análises individuais. Prefira qualidade à quantidade de seleções.',
  },
  {
    q: 'Por que a probabilidade da múltipla cai tanto?',
    a: 'Porque todas as seleções precisam ser vencedoras simultaneamente. Em probabilidade, isso é uma interseção de eventos: a chance de A e B acontecerem juntos é sempre menor ou igual à chance de cada um separadamente. Mesmo eventos com 70% de probabilidade individual chegam a apenas 34% quando combinados em uma dupla. Com quatro eventos de 70%, a chance cai para menos de 24%. É a matemática da multiplicação aplicada a frações menores que 1.',
  },
  {
    q: 'Como interpretar o ROI na calculadora de parlay?',
    a: 'O ROI (Retorno sobre Investimento) mostra o lucro potencial em relação ao stake, em percentual. Um ROI de 400% significa que o lucro potencial é quatro vezes o valor apostado. Importante: o ROI exibido é do cenário vencedor, não do resultado esperado a longo prazo. Para avaliar valor real, compare o ROI potencial com a probabilidade implícita e leve em conta quantas vezes você precisaria acertar esse bilhete para ter retorno positivo.',
  },
  {
    q: 'Posso usar hedge ou cash out em uma múltipla?',
    a: 'Sim, dependendo da casa e do estágio do bilhete. O cash out permite encerrar parcialmente ou totalmente a aposta antes do resultado final, trocando o retorno potencial por um valor menor garantido. O hedge envolve apostar no resultado oposto de uma seleção para reduzir exposição. Ambas as estratégias podem ser úteis para gerenciar risco em múltiplas em andamento. Use nossa calculadora de hedge para simular esses cenários.',
  },
  {
    q: 'Qual é a diferença entre múltipla e aposta simples?',
    a: 'Na aposta simples, você aposta em uma única seleção e o resultado depende apenas dela. Na múltipla, você combina duas ou mais seleções em um único bilhete, e todas precisam ganhar para você receber. As odds são multiplicadas (não somadas), o que eleva o retorno potencial mas também o risco. A simples preserva o capital com mais consistência; a múltipla eleva a variância do resultado.',
  },
  {
    q: 'Como a margem da casa afeta a múltipla?',
    a: 'Cada odd já embute uma margem da casa (overround), que reduz o valor implícito da aposta. Em uma múltipla, essa margem é multiplicada junto com as odds. Quanto mais seleções, mais a margem acumulada pressiona o valor real do bilhete para baixo. Por isso, comparar odds em diferentes casas antes de montar a múltipla pode fazer diferença significativa no retorno potencial e no valor esperado.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de Múltipla / Parlay — CalculaBet',
      url: 'https://calculabet.site/calculadoras/multipla-parlay',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Calculadora gratuita para simular aposta múltipla ou parlay: odd combinada, retorno total, lucro líquido, ROI, probabilidade implícita acumulada e risco sobre a banca. Educativa e sem cadastro.',
      featureList: [
        'Cálculo de odd combinada',
        'Retorno total e lucro líquido',
        'ROI percentual',
        'Probabilidade implícita acumulada',
        'Análise de risco sobre a banca',
        'Suporte a dupla, tripla e acumuladas longas',
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

/* ─── Shared UI components ─────────────────────────────── */

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

function ProbTable() {
  const rows = [
    { n: 1, odds: '1.80', prob: '55,6%', color: '#4ade80' },
    { n: 2, odds: '1.80 × 1.80', prob: '30,9%', color: '#4ade80' },
    { n: 3, odds: '1.80 × 1.80 × 1.80', prob: '17,1%', color: '#fbbf24' },
    { n: 4, odds: '(×4)', prob: '9,5%', color: '#fbbf24' },
    { n: 5, odds: '(×5)', prob: '5,3%', color: '#f87171' },
    { n: 6, odds: '(×6)', prob: '2,9%', color: '#f87171' },
  ];
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            {['Seleções', 'Odds (todas 1.80)', 'Prob. implícita acumulada'].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.n} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
              <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-1)' }}>{r.n}x</td>
              <td className="px-4 py-3 font-mono" style={{ color: 'var(--text-2)' }}>{r.odds}</td>
              <td className="px-4 py-3 font-bold" style={{ color: r.color }}>{r.prob}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Main explanation component (SEO content) ─────────── */

function MultiplaExplanation() {
  const examples = [
    {
      title: 'Dupla conservadora',
      odds: '1.55 × 1.70',
      stake: 'R$50',
      oddComb: '2.635',
      retorno: 'R$131,75',
      lucro: 'R$81,75',
      prob: '38,0%',
      note: 'A dupla é a múltipla mais simples. Com dois jogos de baixo risco, a probabilidade implícita ainda é razoável. Antes de confirmar, vale comparar se as odds oferecem valor real frente à análise do confronto.',
    },
    {
      title: 'Tripla de futebol',
      odds: '1.80 × 2.10 × 1.65',
      stake: 'R$30',
      oddComb: '6.237',
      retorno: 'R$187,11',
      lucro: 'R$157,11',
      prob: '16,0%',
      note: 'Uma tripla clássica de fim de semana. O retorno potencial é atraente com um stake pequeno, mas a probabilidade implícita já caiu para 16%. Cada seleção precisa ser bem justificada individualmente.',
    },
    {
      title: 'Quádrupla mista (futebol + basquete)',
      odds: '1.90 × 1.75 × 2.00 × 1.80',
      stake: 'R$20',
      oddComb: '11.970',
      retorno: 'R$239,40',
      lucro: 'R$219,40',
      prob: '8,4%',
      note: 'A probabilidade implícita cai para menos de 9%. Com odds de valor, pode ser interessante simular; sem análise, o risco de perda total aumenta significativamente.',
    },
    {
      title: 'Acumulada longa (5 seleções)',
      odds: '1.40 × 1.50 × 1.60 × 1.70 × 1.80',
      stake: 'R$10',
      oddComb: '10.282',
      retorno: 'R$102,82',
      lucro: 'R$92,82',
      prob: '9,7%',
      note: 'Mesmo com odds baixas individualmente, cinco seleções geram uma odd combinada de mais de 10x. A probabilidade implícita está abaixo de 10%, o que exige muita consistência para ter retorno positivo a longo prazo.',
    },
  ];

  const variables = [
    ['Odd₁ … Oddₙ', 'Odds decimais de cada seleção incluída no bilhete'],
    ['n', 'Quantidade total de seleções na múltipla'],
    ['Stake', 'Valor apostado no bilhete (em R$)'],
    ['O_comb', 'Odd combinada: produto de todas as odds individuais'],
    ['P_impl', 'Probabilidade implícita acumulada estimada pelas odds'],
    ['ROI', 'Retorno sobre investimento em caso de acerto (percentual)'],
  ];

  return (
    <article className="space-y-12 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>

      {/* ── Intro ── */}
      <section className="space-y-5">
        <SectionLabel>Guia completo da ferramenta</SectionLabel>
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          Calculadora de múltipla e parlay: simule o bilhete antes de apostar
        </h2>
        <p>
          A <strong style={{ color: 'var(--text-1)' }}>calculadora de múltipla ou parlay</strong> é uma ferramenta educativa que transforma as odds de um bilhete combinado em números concretos: odd combinada, retorno total, lucro líquido, ROI percentual e probabilidade implícita acumulada. Em poucos segundos, você visualiza o que realmente está em jogo antes de confirmar qualquer aposta.
        </p>
        <p>
          Ela é útil para quem quer sair do "achismo" e analisar bilhetes com base matemática. Seja avaliando se vale a pena combinar duas seleções numa dupla, comparando o impacto de adicionar mais um jogo a uma tripla já montada, ou simplesmente querendo entender como a odd combinada é calculada, esta ferramenta oferece resposta instantânea e gratuita, sem cadastro.
        </p>
        <p>
          Use a calculadora quando estiver montando um bilhete e quiser saber: qual é o retorno potencial? Qual porcentagem da minha banca estou expondo? A probabilidade implícita condiz com minha análise? Essas perguntas transformam apostas impulsivas em decisões mais conscientes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <InfoCard title="O que calcula" tone="cyan">
            <p>Odd combinada, retorno total, lucro líquido, ROI, probabilidade implícita acumulada e percentual da banca exposto no bilhete.</p>
          </InfoCard>
          <InfoCard title="Quando usar" tone="violet">
            <p>Antes de confirmar duplas, triplas, acumuladas de futebol, parlays de NBA ou NFL e qualquer bilhete com duas ou mais seleções combinadas.</p>
          </InfoCard>
          <InfoCard title="Principal benefício" tone="green">
            <p>Torna visível a queda de probabilidade a cada seleção adicionada, ajudando a calibrar stake, avaliar risco e tomar decisões com mais clareza.</p>
          </InfoCard>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Como funciona uma aposta múltipla</h2>
        <p>
          Em uma aposta simples, uma única seleção determina o resultado. Na múltipla, duas ou mais seleções são agrupadas em um único bilhete. A diferença fundamental está na matemática: as odds <strong style={{ color: 'var(--text-1)' }}>não são somadas</strong>, elas são <strong style={{ color: 'var(--text-1)' }}>multiplicadas</strong>. Por isso, o retorno potencial cresce muito mais rápido do que numa simples equivalente, mas a condição é muito mais exigente: <strong style={{ color: 'var(--text-1)' }}>todas as seleções precisam ser vencedoras</strong> para o bilhete pagar.
        </p>
        <p>
          Se você tem uma odd de 1.80 e outra de 2.00, a odd combinada da dupla é 3.60 — não 3.80. Com um stake de R$100, o retorno total seria R$360 e o lucro líquido R$260. Porém, a probabilidade implícita acumulada cai de aproximadamente 55% (para cada seleção individual) para cerca de 27% na dupla. A lógica cresce de forma exponencial: cada seleção adicionada eleva o retorno potencial, mas também multiplica a dificuldade.
        </p>
        <p>
          Além da matemática pura, é importante lembrar que cada odd já carrega uma <strong style={{ color: 'var(--text-1)' }}>margem da casa</strong> (overround). Numa múltipla, essa margem é aplicada em cada seleção e se acumula ao longo do bilhete. Isso significa que o valor esperado de uma múltipla costuma ser menor do que o de apostas simples equivalentes — um ponto frequentemente ignorado por apostadores iniciantes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard title="Lógica da multiplicação" tone="cyan">
            <p>Odds 1.80 e 2.00 geram odd combinada de 3.60 (não 3.80). Com stake de R$100, o retorno total é R$360 e o lucro líquido R$260 — se ambas as seleções acertarem.</p>
          </InfoCard>
          <InfoCard title="Atenção à margem" tone="amber">
            <p>Cada odd embute uma margem da casa. Em múltiplas, essa margem se multiplica a cada seleção adicionada, reduzindo silenciosamente o valor real do bilhete. Compare odds em mais de uma casa antes de montar o bilhete.</p>
          </InfoCard>
        </div>
      </section>

      {/* ── Formula ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Fórmula matemática da múltipla</h2>
        <p>
          A matemática da múltipla é simples e direta. Todas as fórmulas abaixo são aplicadas automaticamente pela calculadora ao preencher as odds e o stake:
        </p>
        <div className="rounded-2xl p-5" style={{ background: 'rgba(15,23,42,0.55)', border: '1px solid var(--border)' }}>
          <div className="space-y-3 font-mono text-xs md:text-sm" style={{ color: 'var(--text-1)' }}>
            <p><span style={{ color: '#22d3ee' }}>O_comb</span>   = Odd₁ × Odd₂ × … × Oddₙ</p>
            <p><span style={{ color: '#4ade80' }}>Retorno</span>   = Stake × O_comb</p>
            <p><span style={{ color: '#4ade80' }}>Lucro</span>     = Retorno − Stake</p>
            <p><span style={{ color: '#818cf8' }}>ROI</span>       = (Lucro ÷ Stake) × 100</p>
            <p><span style={{ color: '#fbbf24' }}>P_impl</span>    = (1÷Odd₁) × (1÷Odd₂) × … × (1÷Oddₙ) × 100</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {variables.map(([name, desc]) => (
            <div key={name} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
              <p className="font-semibold font-mono mb-1 text-xs" style={{ color: 'var(--text-1)' }}>{name}</p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>{desc}</p>
            </div>
          ))}
        </div>

        <InfoCard title="Exemplo resolvido passo a passo" tone="violet">
          <p>Múltipla tripla com odds <strong style={{ color: 'var(--text-1)' }}>1.80</strong>, <strong style={{ color: 'var(--text-1)' }}>2.00</strong> e <strong style={{ color: 'var(--text-1)' }}>1.50</strong> e stake de <strong style={{ color: 'var(--text-1)' }}>R$40</strong>.</p>
          <p><strong style={{ color: 'var(--text-1)' }}>1. Odd combinada:</strong> 1.80 × 2.00 × 1.50 = <strong style={{ color: '#818cf8' }}>5.40</strong></p>
          <p><strong style={{ color: 'var(--text-1)' }}>2. Retorno total:</strong> R$40 × 5.40 = <strong style={{ color: '#4ade80' }}>R$216,00</strong></p>
          <p><strong style={{ color: 'var(--text-1)' }}>3. Lucro líquido:</strong> R$216 − R$40 = <strong style={{ color: '#4ade80' }}>R$176,00</strong></p>
          <p><strong style={{ color: 'var(--text-1)' }}>4. ROI:</strong> (176 ÷ 40) × 100 = <strong style={{ color: '#818cf8' }}>440%</strong></p>
          <p><strong style={{ color: 'var(--text-1)' }}>5. Probabilidade implícita:</strong> (1/1.80) × (1/2.00) × (1/1.50) × 100 ≈ <strong style={{ color: '#fbbf24' }}>18,5%</strong></p>
        </InfoCard>
      </section>

      {/* ── Probability degradation ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Como a probabilidade cai a cada seleção adicionada</h2>
        <p>
          Um dos erros mais comuns ao montar uma múltipla é subestimar o impacto de cada seleção na probabilidade final. A tabela abaixo mostra o que acontece quando você vai acrescentando eventos com odd 1.80 (probabilidade implícita de 55,6% cada) ao bilhete:
        </p>
        <ProbTable />
        <p>
          Note como uma seleção com mais de 55% de chance individual chega a menos de 3% de probabilidade acumulada com seis eventos. Esse fenômeno — chamado de <strong style={{ color: 'var(--text-1)' }}>degradação exponencial da probabilidade</strong> — é intuitivamente subestimado pela maioria das pessoas. O cérebro tende a avaliar cada seleção em separado ("esse parece fácil", "esse também") sem fazer a multiplicação mental correta.
        </p>
        <p>
          A calculadora de probabilidade implícita desta ferramenta ajuda a tornar isso visível: ao inserir as odds, você vê em tempo real como a probabilidade acumulada cai. Esse número é fundamental para avaliar se a odd combinada oferece valor real frente ao risco assumido.
        </p>
        <InfoCard title="Por que a probabilidade é apenas uma estimativa?" tone="amber">
          <p>A probabilidade implícita é calculada a partir das odds, que já incluem a margem da casa. Isso significa que a chance real de cada evento é ligeiramente menor do que a odds sugere. A probabilidade acumulada exibida pela ferramenta é uma referência útil, mas sempre otimista: na prática, a chance de acerto tende a ser ainda menor quando considerada a margem de cada mercado.</p>
        </InfoCard>
      </section>

      {/* ── Multipla vs Simples ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Múltipla vs aposta simples: quando escolher cada uma</h2>
        <p>
          A escolha entre múltipla e apostas simples depende do objetivo, do perfil de risco e da qualidade das seleções. Nenhuma das duas é objetivamente superior para todos os contextos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard title="Apostas simples — quando faz sentido" tone="green">
            <ul className="space-y-2 list-disc pl-4">
              <li>Quando você quer preservar a banca com mais consistência ao longo do tempo.</li>
              <li>Quando cada seleção tem valor identificado independentemente.</li>
              <li>Quando o objetivo é construir resultados gradualmente, não maximizar um retorno único.</li>
              <li>Quando as odds individuais já oferecem retorno satisfatório sem precisar combinar.</li>
            </ul>
          </InfoCard>
          <InfoCard title="Múltipla/parlay — quando pode fazer sentido" tone="violet">
            <ul className="space-y-2 list-disc pl-4">
              <li>Quando você quer exposição maior com stake pequeno, entendendo o risco elevado.</li>
              <li>Quando todas as seleções foram analisadas individualmente e têm justificativa.</li>
              <li>Quando o bilhete é tratado como entretenimento consciente, não como estratégia de renda.</li>
              <li>Quando você usa a calculadora para visualizar exatamente o que está arriscando.</li>
            </ul>
          </InfoCard>
        </div>
        <p>
          Em termos de valor esperado a longo prazo, a maioria das múltiplas apresenta resultado negativo devido à acumulação de margem das casas. Isso não significa que a múltipla não tem lugar em uma estratégia de apostas, mas sim que ela exige análise criteriosa de cada seleção incluída e consciência do risco concentrado que representa.
        </p>
      </section>

      {/* ── Practical examples ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Exemplos práticos de cálculo</h2>
        <p>
          Veja abaixo quatro cenários reais com diferentes perfis de risco. Use-os como referência ao simular seus próprios bilhetes:
        </p>
        <div className="grid grid-cols-1 gap-4">
          {examples.map(ex => (
            <div key={ex.title} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <h3 className="font-semibold" style={{ color: 'var(--text-1)' }}>{ex.title}</h3>
                <span className="text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0" style={{ color: '#22d3ee', background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.14)' }}>{ex.odds}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  ['Stake', ex.stake, 'var(--text-1)'],
                  ['Odd combinada', ex.oddComb, '#818cf8'],
                  ['Retorno total', ex.retorno, '#22d3ee'],
                  ['Prob. implícita', ex.prob, ex.prob.replace('%','').replace(',','.')  > 20 ? '#4ade80' : parseFloat(ex.prob) > 10 ? '#fbbf24' : '#f87171'],
                ].map(([label, val, color]) => (
                  <div key={label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                    <p className="text-xs font-bold mb-1" style={{ color }}>{val}</p>
                    <p className="text-xs" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>{ex.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Risk management ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Gestão de banca e análise de risco</h2>
        <p>
          Apostas esportivas envolvem risco financeiro real. A calculadora inclui o campo "banca total" exatamente para tornar esse risco visível: ao preencher seu saldo disponível, você vê instantaneamente qual porcentagem da banca está sendo exposta no bilhete, com classificação em conservador (até 1%), moderado (1–2%) e alto (acima de 2%).
        </p>
        <p>
          Em múltiplas, essa métrica é especialmente relevante porque a probabilidade acumulada costuma ser consideravelmente menor do que a intuição sugere. Usar stakes pequenos e bem dimensionados é uma das formas mais eficazes de manter a sustentabilidade da banca a longo prazo, independentemente dos resultados de curto prazo.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard title="Boas práticas" tone="green">
            <ul className="space-y-2 list-disc pl-4">
              <li>Defina um limite de stake por bilhete antes de montar as seleções, não depois.</li>
              <li>Compare odds na mesma seleção em mais de uma casa: diferenças de 0.05 a 0.10 fazem diferença real no acumulado.</li>
              <li>Prefira seleções com justificativa analítica clara — histórico, contexto, forma recente, fatores táticos.</li>
              <li>Registre todos os bilhetes (acertos e erros) para entender seu ROI real, não apenas os vencedores.</li>
              <li>Evite múltiplas de recuperação: usar um bilhete longo para tentar cobrir perdas anteriores acelera a quebra de banca.</li>
            </ul>
          </InfoCard>
          <InfoCard title="Erros mais comuns" tone="red">
            <ul className="space-y-2 list-disc pl-4">
              <li>Adicionar seleções ao bilhete apenas para "elevar a odd", sem análise individual de cada evento.</li>
              <li>Ignorar a margem acumulada das casas em múltiplas longas.</li>
              <li>Apostar valores altos em bilhetes com probabilidade implícita abaixo de 10%.</li>
              <li>Não usar a calculadora e confiar apenas na intuição sobre o retorno potencial.</li>
              <li>Tratar múltiplas como estratégia de longo prazo ao invés de entretenimento com risco controlado.</li>
            </ul>
          </InfoCard>
        </div>

        <InfoCard title="Sobre critério de Kelly e gestão de stake" tone="cyan">
          <p>
            O Critério de Kelly é um método matemático para calcular o tamanho ideal de cada aposta com base na sua vantagem estimada e nas odds oferecidas. Ele é mais aplicável em apostas simples com edge identificado. Em múltiplas, a análise de Kelly precisa considerar a odd combinada e a probabilidade real estimada para o bilhete inteiro — o que aumenta a complexidade. Nossa <Link to="/calculadoras/gestao-banca" style={{ color: '#22d3ee', fontWeight: 600 }}>calculadora de gestão de banca</Link> permite simular Kelly, flat e percentual fixo para calibrar seus stakes com mais precisão.
          </p>
        </InfoCard>
      </section>

      {/* ── Responsible gaming ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Jogo responsável e avisos importantes</h2>
        <InfoCard title="+18 · Conteúdo educativo · Jogo responsável" tone="amber">
          <p>
            Este conteúdo é destinado exclusivamente a maiores de 18 anos. Todas as simulações desta calculadora são educativas e não constituem recomendação, aconselhamento financeiro ou garantia de resultado. Apostas esportivas envolvem risco de perda financeira e devem ser tratadas como entretenimento adulto.
          </p>
          <p>
            Se você sentir que apostas estão afetando negativamente sua vida financeira, profissional ou pessoal, procure ajuda. Acesse nossa página de <Link to="/jogo-responsavel" style={{ color: '#fbbf24', fontWeight: 600 }}>jogo responsável</Link> para recursos, orientações e canais de apoio disponíveis no Brasil.
          </p>
        </InfoCard>
      </section>

      {/* ── CTA links ── */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Explore outras ferramentas relacionadas</h2>
        <p>
          A calculadora de múltipla é uma das ferramentas do CalculaBet. Após simular seu bilhete, você pode complementar a análise com:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { to: '/calculadoras/conversor-odds', label: 'Conversor de Odds', desc: 'Converta entre formatos decimal, americano e fracionário e veja a probabilidade implícita de cada seleção.' },
            { to: '/calculadoras/gestao-banca', label: 'Gestão de Banca', desc: 'Calcule o stake ideal com Kelly, flat stake ou percentual fixo para manter a banca sustentável.' },
            { to: '/calculadoras/hedge', label: 'Calculadora de Hedge', desc: 'Simule como proteger parte de uma múltipla em andamento apostando no resultado oposto.' },
            { to: '/calculadoras/roi', label: 'Calculadora de ROI', desc: 'Avalie o retorno sobre investimento acumulado em uma série de apostas ao longo do tempo.' },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-2xl p-4 block transition-all duration-150"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
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

/* ─── Page component ───────────────────────────────────── */

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
      description="Calcule aposta múltipla ou parlay grátis: odd combinada, retorno total, lucro líquido, ROI, probabilidade implícita acumulada e risco sobre a banca. Ferramenta educativa sem cadastro."
      slug="multipla-parlay"
      faqs={faqs}
      schema={schema}
      explanation={<MultiplaExplanation />}
    >
      <div className="space-y-6">

        {/* Info banner */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.14)' }}>
          <p className="text-sm" style={{ color: 'var(--text-2)' }}>
            Insira as <strong style={{ color: 'var(--text-1)' }}>odds decimais</strong> de cada seleção, informe o stake e, opcionalmente, sua banca total para medir exposição. O cálculo é instantâneo e nenhum dado é enviado a terceiros.
          </p>
        </div>

        {/* Selections */}
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

        {/* Combined odd preview */}
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

        {/* Stake */}
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

        {/* Banca */}
        <div>
          <label className="label" htmlFor="banca">
            Banca total (R$){' '}
            <span style={{ color: 'var(--text-3)', fontWeight: 400, textTransform: 'none' }}>— opcional</span>
          </label>
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
                Em múltiplas, stakes menores ajudam a preservar a banca. Evite usar apostas para recuperar perdas anteriores.
              </p>
            </div>
          )}
        </div>

        {/* Results */}
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
              Odd combinada{' '}
              <strong style={{ color: 'var(--text-1)' }}>{oddTotal.toFixed(3)}</strong>
              {' '}·{' '}
              Ponto de equilíbrio: acertar{' '}
              <strong style={{ color: 'var(--text-1)' }}>{(1 / oddTotal * 100).toFixed(2)}%</strong>
              {' '}dos bilhetes equivalentes antes de considerar margem e variação.
            </div>
          </div>
        ) : (
          <div
            className="rounded-xl flex items-center justify-center py-8"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
          >
            <p className="text-sm text-center px-4" style={{ color: 'var(--text-3)' }}>
              {!todasValidas
                ? 'Preencha todas as odds decimais (mínimo 1.01) para ver a odd combinada'
                : 'Informe o stake para calcular retorno total, lucro líquido e ROI'}
            </p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
