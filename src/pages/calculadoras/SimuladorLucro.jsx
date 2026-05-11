import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

const faqs = [
  {
    q: 'O que é o Simulador de Lucro em apostas?',
    a: 'O Simulador de Lucro é uma ferramenta de simulação estocástica que projeta como uma banca evolui ao longo de centenas de apostas com base nos parâmetros definidos pelo usuário: banca inicial, stake percentual, odd média e win rate. Cada execução gera um cenário diferente porque usa aleatoriedade controlada — exatamente como apostas reais se comportam. Rodar múltiplas simulações com os mesmos parâmetros mostra a distribuição de resultados possíveis, revelando tanto o potencial de lucro quanto o risco de perdas.',
  },
  {
    q: 'O que é simulação Monte Carlo e qual sua origem?',
    a: 'Monte Carlo é um método computacional desenvolvido nos anos 1940 por Stanisław Ulam e John von Neumann durante o Projeto Manhattan para calcular probabilidades de reações nucleares. O nome faz referência ao cassino de Monte Carlo, em Mônaco. O método usa aleatoriedade repetida para estimar resultados de problemas complexos que não têm solução analítica simples. Em apostas, permite simular centenas de trajetórias de banca possíveis, visualizando a distribuição real de resultados em vez de apenas o valor esperado médio.',
  },
  {
    q: 'O que é EV (Expected Value / Valor Esperado)?',
    a: 'EV ou Valor Esperado é o retorno médio que cada aposta gera no longo prazo, calculado como: EV% = (Win Rate × (Odd − 1) − (1 − Win Rate)) × 100. Um EV de +5% significa que, em média, cada R$100 apostados retorna R$105. Porém, EV é uma média de longo prazo — em curto prazo, a variância pode produzir resultados muito diferentes do esperado, tanto positivos quanto negativos. EV positivo é condição necessária mas não suficiente para lucratividade sustentada: sem gestão de banca adequada, mesmo apostadores com EV positivo podem falir.',
  },
  {
    q: 'Por que os resultados variam a cada simulação?',
    a: 'Porque cada simulação usa números aleatórios para determinar se cada aposta é ganha ou perdida, baseado na probabilidade (win rate). Mesmo com EV positivo de +8%, uma sequência de 15 derrotas consecutivas é estatisticamente possível. Isso é variância — a dispersão natural dos resultados em torno da média esperada. Quanto menor a amostra, maior o impacto da variância. Com 1.000 apostas, os resultados tendem a convergir para o EV teórico. Com 50 apostas, a sorte tem peso enorme.',
  },
  {
    q: 'Qual a diferença entre retorno aritmético e retorno geométrico em apostas?',
    a: 'O EV calculado pela fórmula é o retorno aritmético — a média simples de cada aposta. O retorno geométrico é o que realmente acontece com a banca quando você reinveste os lucros (stake como % da banca). Retorno geométrico = retorno aritmético − (variância / 2). Isso significa que quanto maior a variância (apostas em odds mais altas), maior o "imposto da variância" sobre o crescimento real da banca. Por isso apostadores em odds altas precisam de EV muito maior para compensar o custo da variância.',
  },
  {
    q: 'O que significa "ruína" na simulação e é possível com stake percentual?',
    a: 'Ruína significa que a banca chegou a zero ou próximo de zero. Com stake fixo em percentual da banca (stake proporcional), a ruína matemática teórica é impossível — porque o stake diminui à medida que a banca encolhe. Porém, na prática, se a banca cair abaixo de um valor mínimo de aposta das casas, a situação é equivalente à ruína. Com EV negativo, a banca converge para zero mesmo com stake percentual. Com EV positivo, a ruína só ocorre em simulações com parameters extremos (stake alto + EV muito próximo de zero).',
  },
  {
    q: 'Qual stake percentual é recomendado para iniciantes?',
    a: 'Para apostadores que estão validando sua estratégia (menos de 300 apostas de histórico), o recomendado é 1–2% da banca por aposta. Esse nível permite atravessar sequências de 40–70 derrotas consecutivas sem chegar à ruína. A partir de 5%, sequências de 20 derrotas podem reduzir a banca em mais de 60%. Acima de 10%, qualquer sequência negativa moderada pode ser devastadora. O Critério de Kelly sugere stake proporcional ao edge (EV), mas mesmo apostadores com edge comprovado raramente usam Kelly completo — preferem 1/4 ou 1/2 Kelly para reduzir a variância.',
  },
  {
    q: 'Como a lei dos grandes números se aplica às apostas?',
    a: 'A Lei dos Grandes Números (LGN) afirma que a média de um grande número de tentativas converge para o valor esperado (EV). Em apostas: com 50 apostas, o resultado real pode desviar muito do EV. Com 500 apostas, o desvio diminui. Com 5.000 apostas, o resultado real fica muito próximo do EV teórico. Isso explica por que apostadores com edge real podem ter meses negativos (amostras pequenas dominadas pela variância) mas tendem a ser lucrativos no longo prazo. É também por isso que avaliar uma estratégia com menos de 300 apostas é estatisticamente impreciso.',
  },
  {
    q: 'Posso usar o simulador para testar sistemas como Martingale?',
    a: 'O simulador atual usa stake proporcional (% da banca). Para testar sistemas como Martingale, que dobram o stake após perdas, seria necessário um simulador especializado. O que você pode observar aqui: ao comparar stake 2% vs stake 10%, você vê o efeito de stakes crescentes no risco de ruína e na variância da banca. Sistemas como Martingale têm EV idêntico ao flat betting — nenhuma progressão de stake altera o EV matemático de cada aposta individual. O que muda é apenas a distribuição dos resultados: Martingale reduz a frequência de perdas mas aumenta dramaticamente o tamanho das perdas quando ocorrem.',
  },
  {
    q: 'O que é drawdown e como interpretar o mínimo da banca?',
    a: 'Drawdown é a redução máxima da banca a partir do pico anterior. Na simulação, o valor mínimo da banca indica o pior momento durante aquele cenário. Um drawdown de 30% (banca caiu 30% do valor inicial em algum momento) é normal e esperado mesmo com EV positivo. Apostadores profissionais definem antecipadamente um "stop loss" de drawdown — por exemplo, parar de apostar se a banca cair 50% para reavaliar a estratégia. Drawdowns acima de 60-70% devem ser investigados mesmo com EV positivo, pois podem indicar mudança na margem das casas ou erros na estimativa do win rate.',
  },
  {
    q: 'Por que rodar a simulação múltiplas vezes é mais informativo do que uma única vez?',
    a: 'Uma única simulação é apenas um dos infinitos caminhos possíveis. Ao rodar 10 ou 20 simulações com os mesmos parâmetros, você começa a ver a distribuição real de resultados: quantos cenários terminam com lucro, qual é o pior cenário razoável, qual é o melhor. Se a maioria das simulações (7+ de 10) terminar com lucro, a estratégia é robusta. Se apenas 4 em 10 forem positivas mesmo com EV positivo, o stake pode estar muito alto e a variância excessiva. O histórico de simulações dentro da ferramenta permite essa comparação diretamente.',
  },
  {
    q: 'Win rate de 60% garante que a simulação termine com lucro?',
    a: 'Não necessariamente. Win rate de 60% em odds de 1.50 tem EV de: (0.60 × 0.50) − (0.40 × 1.00) = 0.30 − 0.40 = −0.10, ou seja, EV de −10% — deficitário. Um apostador com 60% de win rate em odds de 1.50 perde dinheiro no longo prazo. O que importa não é o win rate isolado, mas a combinação de win rate com a odd média. A fórmula EV% = (WR × (Odd − 1) − (1 − WR)) × 100 é a resposta definitiva. Configure os parâmetros da simulação e observe o EV calculado antes de simular.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Simulador de Lucro em Apostas — CalculaBet',
      url: 'https://calculabet.com.br/calculadoras/simulador-lucro',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Simule centenas de apostas com Monte Carlo e veja como sua banca evolui com base em win rate, odds e gestão de stakes.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

/* ─── Helpers ─── */
function InfoCard({ title, children, tone = 'neutral' }) {
  const colors = {
    cyan:    { bg: 'rgba(34,211,238,0.04)',   border: 'rgba(34,211,238,0.15)',   title: '#22d3ee' },
    violet:  { bg: 'rgba(129,140,248,0.04)',  border: 'rgba(129,140,248,0.15)',  title: '#818cf8' },
    green:   { bg: 'rgba(74,222,128,0.04)',   border: 'rgba(74,222,128,0.15)',   title: '#4ade80' },
    amber:   { bg: 'rgba(251,191,36,0.04)',   border: 'rgba(251,191,36,0.15)',   title: '#fbbf24' },
    red:     { bg: 'rgba(248,113,113,0.04)',  border: 'rgba(248,113,113,0.18)',  title: '#f87171' },
    neutral: { bg: 'rgba(255,255,255,0.02)',  border: 'var(--border)',           title: 'var(--text-2)' },
  };
  const c = colors[tone] || colors.neutral;
  return (
    <div className="rounded-xl p-5" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      {title && (
        <p className="text-xs font-semibold mb-3" style={{ color: c.title, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          {title}
        </p>
      )}
      <div className="text-sm" style={{ color: 'var(--text-2)' }}>{children}</div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-semibold mb-4" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
      {children}
    </p>
  );
}

/* ─── Unique Visual Component 1: EV por combinação WR × Odd ─── */
function EVCombinationTable() {
  const rows = [
    { wr: '60%', odd: '1.40', ev: '-4.0%', resultado: 'Deficitário', cor: '#f87171', obs: 'Favorito com margem da casa consumindo o edge' },
    { wr: '55%', odd: '1.60', ev: '-1.5%', resultado: 'Deficitário', cor: '#f87171', obs: 'Win rate alto, mas odds baixas demais' },
    { wr: '50%', odd: '2.00', ev: '0.0%',  resultado: 'Neutro',      cor: '#fbbf24', obs: 'Break-even exato — nem lucro nem prejuízo' },
    { wr: '52%', odd: '2.00', ev: '+4.0%', resultado: 'Lucrativo',   cor: '#4ade80', obs: 'Pequeno edge em odds equilibradas' },
    { wr: '55%', odd: '2.00', ev: '+10.0%',resultado: 'Lucrativo',   cor: '#4ade80', obs: 'Edge sólido em mercados de valor' },
    { wr: '45%', odd: '2.30', ev: '+3.5%', resultado: 'Lucrativo',   cor: '#4ade80', obs: 'Win rate menor, odds melhores — ainda lucrativo' },
    { wr: '40%', odd: '3.00', ev: '+20.0%',resultado: 'Excelente',   cor: '#22d3ee', obs: 'Edge muito alto — típico de azarões subavaliados' },
    { wr: '35%', odd: '3.50', ev: '+22.5%',resultado: 'Excelente',   cor: '#22d3ee', obs: 'Alta variância, mas EV excepcional' },
    { wr: '30%', odd: '4.00', ev: '+20.0%',resultado: 'Excelente',   cor: '#22d3ee', obs: 'Win rate baixo, odds altas — edge real possível' },
    { wr: '25%', odd: '5.00', ev: '+25.0%',resultado: 'Excepcional', cor: '#818cf8', obs: 'Raríssimo — alto risco de estimativa incorreta' },
  ];
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
            {['Win Rate', 'Odd média', 'EV/aposta', 'Resultado', 'Contexto típico'].map(h => (
              <th key={h} className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <td className="px-4 py-3 font-bold" style={{ color: 'var(--text-1)' }}>{r.wr}</td>
              <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{r.odd}</td>
              <td className="px-4 py-3 font-bold" style={{ color: r.cor }}>{r.ev}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ background: `${r.cor}18`, color: r.cor }}>
                  {r.resultado}
                </span>
              </td>
              <td className="px-4 py-3" style={{ color: 'var(--text-3)' }}>{r.obs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Unique Visual Component 2: Variância × Volume de apostas ─── */
function VarianceVolumeTable() {
  const rows = [
    { n: '50',    esperado: '+R$50',    pessimista: '−R$180', otimista: '+R$310', confianca: 'Baixa' },
    { n: '100',   esperado: '+R$100',   pessimista: '−R$130', otimista: '+R$360', confianca: 'Baixa' },
    { n: '200',   esperado: '+R$200',   pessimista: '−R$20',  otimista: '+R$450', confianca: 'Razoável' },
    { n: '300',   esperado: '+R$300',   pessimista: '+R$60',  otimista: '+R$550', confianca: 'Razoável' },
    { n: '500',   esperado: '+R$500',   pessimista: '+R$200', otimista: '+R$820', confianca: 'Boa' },
    { n: '1.000', esperado: '+R$1.000', pessimista: '+R$550', otimista: '+R$1.500', confianca: 'Alta' },
  ];
  const confCor = { 'Baixa': '#f87171', 'Razoável': '#fbbf24', 'Boa': '#4ade80', 'Alta': '#22d3ee' };
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <p className="text-xs px-4 pt-3 pb-1" style={{ color: 'var(--text-3)' }}>
        Estimativa para banca R$1.000 | Stake 2% | EV +5% por aposta (Win Rate 55%, Odd 2.00)
      </p>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
            {['N.º apostas', 'Resultado esperado', 'Cenário pessimista (10%)', 'Cenário otimista (90%)', 'Confiança'].map(h => (
              <th key={h} className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <td className="px-4 py-3 font-bold" style={{ color: 'var(--text-1)' }}>{r.n}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: '#4ade80' }}>{r.esperado}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: r.pessimista.startsWith('+') ? '#4ade80' : '#f87171' }}>{r.pessimista}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: '#22d3ee' }}>{r.otimista}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ background: `${confCor[r.confianca]}18`, color: confCor[r.confianca] }}>
                  {r.confianca}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Unique Visual Component 3: Risco de ruína por stake% × EV ─── */
function RuinRiskTable() {
  const rows = [
    { stake: '1%',  evPos: 'Praticamente zero', evNeu: '~2%',  evNeg: '~35%', rec: 'Conservador' },
    { stake: '2%',  evPos: '< 1%',              evNeu: '~8%',  evNeg: '~65%', rec: 'Recomendado' },
    { stake: '3%',  evPos: '~2%',               evNeu: '~15%', evNeg: '~80%', rec: 'Moderado' },
    { stake: '5%',  evPos: '~8%',               evNeu: '~30%', evNeg: '~95%', rec: 'Agressivo' },
    { stake: '10%', evPos: '~25%',              evNeu: '~55%', evNeg: '~99%', rec: 'Muito arriscado' },
    { stake: '20%', evPos: '~50%',              evNeu: '~85%', evNeg: '~100%',rec: 'Extremo' },
  ];
  const recCor = { 'Conservador': '#4ade80', 'Recomendado': '#22d3ee', 'Moderado': '#4ade80', 'Agressivo': '#fbbf24', 'Muito arriscado': '#f87171', 'Extremo': '#f87171' };
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <p className="text-xs px-4 pt-3 pb-1" style={{ color: 'var(--text-3)' }}>
        Probabilidade estimada de ruína em 500 apostas. EV positivo = +5% | EV neutro = 0% | EV negativo = −5%
      </p>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
            {['Stake %', 'EV Positivo (+5%)', 'EV Neutro (0%)', 'EV Negativo (−5%)', 'Perfil'].map(h => (
              <th key={h} className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none', background: r.rec === 'Recomendado' ? 'rgba(34,211,238,0.03)' : 'transparent' }}>
              <td className="px-4 py-3 font-bold" style={{ color: 'var(--text-1)' }}>{r.stake}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: '#4ade80' }}>{r.evPos}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: '#fbbf24' }}>{r.evNeu}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: '#f87171' }}>{r.evNeg}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ background: `${recCor[r.rec]}18`, color: recCor[r.rec] }}>
                  {r.rec}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Explanation ─── */
function SimuladorExplanation() {
  return (
    <article className="space-y-10 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>

      <section>
        <SectionLabel>Fundamentos</SectionLabel>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>O que é simulação Monte Carlo em apostas esportivas?</h2>
        <p className="mb-4">
          A <strong style={{ color: 'var(--text-1)' }}>simulação Monte Carlo</strong> é um método matemático que usa aleatoriedade controlada para modelar sistemas complexos. O nome é uma homenagem ao famoso cassino de Monte Carlo, no Mônaco — e a referência não é acidental: o método foi desenvolvido nos anos 1940 por <strong style={{ color: 'var(--text-1)' }}>Stanisław Ulam</strong> e <strong style={{ color: 'var(--text-1)' }}>John von Neumann</strong> enquanto trabalhavam no Projeto Manhattan, justamente para modelar o comportamento probabilístico de reações nucleares.
        </p>
        <p className="mb-4">
          Aplicado a apostas esportivas, o método funciona assim: você define os parâmetros da sua estratégia — banca inicial, percentual de stake, odd média e win rate — e o simulador determina aleatoriamente, para cada aposta, se o resultado é ganho ou perda (com base na probabilidade configurada). Após centenas de iterações, o gráfico revela um possível caminho da sua banca ao longo do tempo.
        </p>
        <p>
          O insight mais importante que a simulação oferece é a <strong style={{ color: 'var(--text-1)' }}>distribuição de resultados possíveis</strong>, não apenas um número médio. Ao rodar a simulação múltiplas vezes com os mesmos parâmetros, você vê que a mesma estratégia pode gerar trajetórias completamente diferentes — e quantas delas terminam com lucro.
        </p>
      </section>

      <section>
        <SectionLabel>Expected Value</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>O que é EV e por que é a métrica mais importante</h2>
        <p className="mb-4">
          Antes de simular qualquer cenário, é preciso entender o <strong style={{ color: 'var(--text-1)' }}>Expected Value (EV)</strong> — o Valor Esperado de cada aposta. A fórmula é:
        </p>
        <div className="rounded-xl p-5 mb-5 font-mono text-xs" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.15)', color: 'var(--text-1)' }}>
          <p>EV% = (Win Rate × (Odd − 1) − (1 − Win Rate)) × 100</p>
          <p className="mt-2" style={{ color: 'var(--text-3)' }}>Exemplo: WR 55%, Odd 2.00 → (0.55 × 1.00 − 0.45 × 1.00) × 100 = +10%</p>
        </div>
        <p className="mb-5">
          O EV é o retorno médio que cada R$100 apostados gera no longo prazo. EV positivo é condição necessária para lucratividade sustentada — sem EV positivo, nenhuma gestão de banca, sistema de progressão ou estratégia de apostas pode transformar perdas em lucros no longo prazo. O simulador mostra o EV da sua configuração antes mesmo de executar a simulação.
        </p>
        <EVCombinationTable />
        <p className="mt-5">
          Note que win rate alto <em>não</em> garante EV positivo. Um apostador com 60% de acertos em odds de 1.40 tem EV negativo. A combinação entre os dois parâmetros é o que determina a lucratividade real.
        </p>
      </section>

      <section>
        <SectionLabel>Variância e volume</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>Como a variância diminui com o aumento do volume</h2>
        <p className="mb-4">
          O conceito matemático central para entender a simulação é a <strong style={{ color: 'var(--text-1)' }}>Lei dos Grandes Números</strong>: quanto maior a amostra, mais o resultado real converge para o EV esperado. Com poucas apostas, a sorte domina. Com muitas apostas, a habilidade (EV) prevalece.
        </p>
        <p className="mb-5">
          A tabela abaixo ilustra como a dispersão de resultados — o intervalo entre o cenário pessimista e o otimista — se estreita progressivamente com mais apostas:
        </p>
        <VarianceVolumeTable />
        <p className="mt-5 mb-4">
          Com 50 apostas, o resultado pode variar de −R$180 a +R$310 (spread de R$490) mesmo com EV positivo. Com 1.000 apostas, o intervalo se estreita drasticamente. Isso explica por que apostadores com edge real podem ter meses negativos sem que isso invalide a estratégia — e por que avaliar qualquer sistema com menos de 300 apostas é estatisticamente irrelevante.
        </p>
        <InfoCard tone="violet" title="Retorno aritmético vs. retorno geométrico">
          <p>
            O EV calculado pela fórmula é o retorno aritmético — a média simples. Mas quando você reinveste os lucros (stake como % da banca), o que importa é o retorno geométrico. A relação é: Retorno geométrico ≈ Retorno aritmético − (Variância / 2). Apostas em odds mais altas têm maior variância, reduzindo o retorno geométrico real. Por isso apostadores em odds altas precisam de EV muito maior para ter o mesmo crescimento de banca de um apostador em odds menores com EV menor — o "imposto da variância" consome parte do edge.
          </p>
        </InfoCard>
      </section>

      <section>
        <SectionLabel>Risco de ruína</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>Risco de ruína por stake e EV</h2>
        <p className="mb-4">
          A <strong style={{ color: 'var(--text-1)' }}>Teoria da Ruína do Apostador</strong> descreve matematicamente a probabilidade de uma banca chegar a zero em função do edge, do stake e do número de apostas. Com EV positivo e stake baixo, a ruína é improvável mesmo em grandes sequências. Com EV negativo, a ruína é matematicamente inevitável com apostas suficientes.
        </p>
        <p className="mb-5">
          A tabela abaixo cruza o stake percentual com três cenários de EV para mostrar o risco estimado de ruína em 500 apostas:
        </p>
        <RuinRiskTable />
        <p className="mt-5">
          A linha destacada (2% de stake) representa o equilíbrio ideal para a maioria dos apostadores: risco de ruína praticamente nulo com EV positivo, proteção razoável mesmo com EV neutro, e permite atravessar sequências longas de perdas sem comprometer a banca de forma irreversível.
        </p>
      </section>

      <section>
        <SectionLabel>Gestão de stake</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>Stake proporcional, flat betting e Critério de Kelly</h2>
        <p className="mb-4">
          Existem três abordagens principais para determinar o tamanho de cada aposta:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {[
            { t: 'Flat Betting', d: 'Valor fixo por aposta (ex: R$50 sempre). Simples, previsível, mas não cresce exponencialmente com a banca. Indicado para quem está validando uma estratégia.', cor: '#4ade80' },
            { t: 'Stake % Proporcional', d: 'Percentual fixo da banca atual. A banca cresce exponencialmente com EV positivo e nunca zera matematicamente. É o modelo desta simulação.', cor: '#22d3ee' },
            { t: 'Critério de Kelly', d: 'Stake = EV% / (Odd − 1). Maximiza o crescimento de longo prazo matematicamente, mas produz alta variância. Apostadores usam 1/4 ou 1/2 Kelly na prática.', cor: '#818cf8' },
          ].map((c, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${c.cor}22` }}>
              <p className="font-semibold text-sm mb-2" style={{ color: c.cor }}>{c.t}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>{c.d}</p>
            </div>
          ))}
        </div>
        <p className="mb-4">
          O simulador usa stake proporcional, que é o modelo mais realista para apostadores que reinvestem os lucros. Para entender como o Kelly puro se compara, use a <Link to="/calculadoras/gestao-banca" className="font-medium" style={{ color: '#22d3ee' }}>Calculadora de Gestão de Banca</Link>, que oferece cálculo detalhado de Kelly e suas frações.
        </p>
        <InfoCard tone="amber" title="Sequências de perdas esperadas">
          <p>
            Com win rate de 55%, a probabilidade de 10 perdas consecutivas é (0.45)^10 ≈ 0.034% — parece improvável. Mas em 500 apostas, você tem aproximadamente 490 oportunidades para que essa sequência comece. A probabilidade de ocorrer pelo menos uma vez sobe para cerca de 15%. Com stake de 10%, 10 derrotas consecutivas reduzem a banca em 65%. Com stake de 2%, a mesma sequência reduz a banca em apenas 18% — recuperável. Essa é a diferença crítica entre o stake agressivo e o conservador.
          </p>
        </InfoCard>
      </section>

      <section>
        <SectionLabel>Como usar o simulador</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>Guia de uso e interpretação dos resultados</h2>
        <ol className="space-y-3 list-none">
          {[
            { n: '1', t: 'Verifique o EV antes de simular', d: 'Configure banca, odd e win rate. Observe o EV calculado automaticamente. Se o EV for negativo, a simulação vai mostrar predominantemente prejuízos — ajuste os parâmetros para refletir sua estratégia real.' },
            { n: '2', t: 'Rode a simulação 5 a 10 vezes', d: 'Clique em "Simular" múltiplas vezes sem alterar os parâmetros. O histórico de simulações mostra a variação entre cenários. Se 7 de 10 simulações forem positivas, a estratégia é robusta.' },
            { n: '3', t: 'Aumente o número de apostas gradualmente', d: 'Comece com 100 apostas e aumente para 500 e 1.000. Observe como a variância diminui e os resultados convergem para o EV esperado. Isso ilustra visivelmente a Lei dos Grandes Números.' },
            { n: '4', t: 'Experimente diferentes stakes', d: 'Mantenha o win rate e odd fixos e varie o stake de 1% a 10%. Veja como o risco de ruína e a variância explodem com stakes maiores, mesmo com EV positivo.' },
            { n: '5', t: 'Use o mínimo e máximo da banca como indicadores', d: 'O valor mínimo mostra o pior drawdown do cenário. Se o mínimo frequentemente chega a menos de 50% da banca inicial, o stake está alto demais para a volatilidade da estratégia.' },
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
      </section>

      <section>
        <SectionLabel>Limitações da simulação</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>O que a simulação não captura</h2>
        <div className="space-y-3">
          <InfoCard tone="neutral" title="Win rate constante">
            <p>
              A simulação assume que o win rate é constante em todas as apostas. Na realidade, o win rate varia por mercado, liga e período. Se você tem win rate de 58% no Over/Under da Premier League e 42% no resultado final da Serie A, simular com 52% (média) esconde a diferença real entre os dois segmentos.
            </p>
          </InfoCard>
          <InfoCard tone="neutral" title="Odd constante">
            <p>
              A simulação usa uma odd média fixa. Na prática, apostas têm odds diferentes. Apostas em odds mais altas têm maior variância — a simulação com odd 2.00 é mais estável do que seria uma estratégia mista de odds 1.50 e 3.50, mesmo que a média seja 2.00.
            </p>
          </InfoCard>
          <InfoCard tone="neutral" title="Sem limites de casas ou fechamento de contas">
            <p>
              A simulação não modela limites de aposta impostos pelas casas (que afetam apostadores com edge positivo) nem o fechamento de contas. Na prática, apostadores com ROI muito positivo frequentemente precisam diversificar em múltiplas casas para manter o volume.
            </p>
          </InfoCard>
        </div>
      </section>

      <section>
        <SectionLabel>Ferramentas relacionadas</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>Calculadoras para aprofundar sua análise</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { to: '/calculadoras/roi',          label: 'Calculadora de ROI' },
            { to: '/calculadoras/gestao-banca', label: 'Gestão de Banca (Kelly)' },
            { to: '/calculadoras/martingale',   label: 'Martingale' },
            { to: '/calculadoras/conversor-odds',label: 'Conversor de Odds' },
            { to: '/calculadoras/hedge',        label: 'Calculadora de Hedge' },
            { to: '/calculadoras/aposta-simples',label: 'Aposta Simples' },
          ].map((l, i) => (
            <Link
              key={i}
              to={l.to}
              className="flex items-center gap-2 px-3 py-3 rounded-xl text-xs font-medium transition-all duration-150"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)'; e.currentTarget.style.color = '#22d3ee'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)'; }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionLabel>Jogo responsável</SectionLabel>
        <InfoCard tone="neutral">
          <p className="text-xs leading-relaxed mb-3">
            <strong style={{ color: 'var(--text-1)' }}>Jogo responsável:</strong> Simulações com EV positivo não garantem lucro em qualquer período específico. A variância pode produzir resultados muito negativos mesmo com estratégias sólidas. Nunca aposte valores que comprometam suas finanças pessoais ou causem estresse emocional. Defina limites de perda antes de cada sessão e mantenha-os.
          </p>
          <Link
            to="/jogo-responsavel"
            className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
            style={{ color: '#fbbf24' }}
          >
            Leia nosso guia de jogo responsável
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </InfoCard>
      </section>

    </article>
  );
}

/* ─── Main component ─── */
export default function SimuladorLucro() {
  const [banca, setBanca] = useState('');
  const [stakePerc, setStakePerc] = useState('2');
  const [odd, setOdd] = useState('2.00');
  const [winRate, setWinRate] = useState('55');
  const [apostas, setApostas] = useState('200');
  const [resultado, setResultado] = useState(null);
  const [historico, setHistorico] = useState([]);

  const b = parseFloat(banca);
  const sp = parseFloat(stakePerc) / 100;
  const o = parseFloat(odd);
  const wr = parseFloat(winRate) / 100;
  const n = Math.min(parseInt(apostas) || 1, 1000);
  const valid = b > 0 && sp > 0 && o > 1 && wr > 0 && wr < 1 && n >= 1;

  const ev = valid ? (wr * (o - 1) - (1 - wr)) * 100 : null;
  const evColor = ev === null ? 'var(--text-3)' : ev > 0 ? '#4ade80' : ev < 0 ? '#f87171' : '#fbbf24';

  const runSim = () => {
    if (!valid) return;
    let bancaAtual = b;
    const pontos = [{ aposta: 0, banca: bancaAtual }];
    const step = Math.max(1, Math.floor(n / 80));
    for (let i = 1; i <= n; i++) {
      const stake = bancaAtual * sp;
      const ganhou = Math.random() < wr;
      bancaAtual = Math.max(0, ganhou ? bancaAtual + stake * (o - 1) : bancaAtual - stake);
      if (i % step === 0 || i === n) pontos.push({ aposta: i, banca: bancaAtual });
      if (bancaAtual === 0) break;
    }
    return pontos;
  };

  const executar = () => {
    if (!valid) return;
    const pontos = runSim();
    setResultado(pontos);
    const bancaFinal = pontos[pontos.length - 1].banca;
    const roi = ((bancaFinal - b) / b) * 100;
    setHistorico(prev => [{ bancaFinal, roi, ruina: bancaFinal === 0 }, ...prev].slice(0, 5));
  };

  const bancaFinal = resultado?.[resultado.length - 1]?.banca ?? 0;
  const lucroTotal = bancaFinal - b;
  const maxBanca = resultado ? Math.max(...resultado.map(r => r.banca)) : 0;
  const minBanca = resultado ? Math.min(...resultado.map(r => r.banca)) : 0;
  const ruina = bancaFinal === 0;

  const presetsBanca = [500, 1000, 2000, 5000];

  return (
    <CalcLayout
      title="Simulador de Lucro em Apostas"
      description="Projete o crescimento da sua banca com simulação Monte Carlo. Configure win rate, odds médias e gestão de banca para ver cenários reais de lucro ou prejuízo."
      slug="simulador-lucro"
      faqs={faqs}
      schema={schema}
      explanation={<SimuladorExplanation />}
    >
      <div className="space-y-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="banca-input">Banca inicial (R$)</label>
            <input
              id="banca-input"
              type="number"
              className="input-field"
              placeholder="1.000"
              min="1"
              value={banca}
              onChange={e => setBanca(e.target.value)}
              aria-label="Banca inicial em reais"
            />
            <div className="flex gap-2 mt-2 flex-wrap" role="group" aria-label="Valores predefinidos de banca">
              {presetsBanca.map(v => (
                <button
                  key={v}
                  onClick={() => setBanca(String(v))}
                  aria-pressed={banca === String(v)}
                  className="text-xs px-2.5 py-1 rounded-lg transition-all"
                  style={{
                    background: banca === String(v) ? 'rgba(34,211,238,0.12)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${banca === String(v) ? 'rgba(34,211,238,0.3)' : 'var(--border)'}`,
                    color: banca === String(v) ? '#22d3ee' : 'var(--text-3)',
                  }}
                >
                  R${v.toLocaleString('pt-BR')}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label" htmlFor="odd-input">Odd média</label>
            <input
              id="odd-input"
              type="number"
              className="input-field"
              placeholder="2.00"
              step="0.01"
              min="1.01"
              value={odd}
              onChange={e => setOdd(e.target.value)}
              aria-label="Odd média por aposta"
            />
            <div className="flex gap-2 mt-2 flex-wrap" role="group" aria-label="Odds predefinidas">
              {['1.50', '1.80', '2.00', '3.00'].map(v => (
                <button
                  key={v}
                  onClick={() => setOdd(v)}
                  aria-pressed={odd === v}
                  className="text-xs px-2.5 py-1 rounded-lg transition-all"
                  style={{
                    background: odd === v ? 'rgba(34,211,238,0.12)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${odd === v ? 'rgba(34,211,238,0.3)' : 'var(--border)'}`,
                    color: odd === v ? '#22d3ee' : 'var(--text-3)',
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label" htmlFor="stake-range">Stake por aposta ({stakePerc}%)</label>
            <input
              id="stake-range"
              type="range"
              min="0.5"
              max="20"
              step="0.5"
              value={stakePerc}
              onChange={e => setStakePerc(e.target.value)}
              className="w-full accent-cyan-400 mt-1"
              aria-label={`Stake percentual: ${stakePerc}%`}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-3)' }}>
              <span>0.5%</span>
              <span style={{ color: parseFloat(stakePerc) > 5 ? '#fbbf24' : 'var(--text-3)' }}>{stakePerc}%</span>
              <span>20%</span>
            </div>
          </div>
          <div>
            <label className="label" htmlFor="winrate-range">Win rate ({winRate}%)</label>
            <input
              id="winrate-range"
              type="range"
              min="10"
              max="90"
              step="1"
              value={winRate}
              onChange={e => setWinRate(e.target.value)}
              className="w-full accent-cyan-400 mt-1"
              aria-label={`Win rate: ${winRate}%`}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-3)' }}>
              <span>10%</span><span>{winRate}%</span><span>90%</span>
            </div>
          </div>
          <div>
            <label className="label" htmlFor="apostas-range">N.º de apostas ({n})</label>
            <input
              id="apostas-range"
              type="range"
              min="10"
              max="1000"
              step="10"
              value={apostas}
              onChange={e => setApostas(e.target.value)}
              className="w-full accent-cyan-400 mt-1"
              aria-label={`Número de apostas: ${n}`}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-3)' }}>
              <span>10</span><span>{n}</span><span>1000</span>
            </div>
          </div>
        </div>

        {/* EV preview */}
        {valid && (
          <div
            className="flex flex-wrap items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
            aria-live="polite"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: 'var(--text-3)' }}>EV por aposta:</span>
              <span className="text-sm font-bold" style={{ color: evColor }}>
                {ev >= 0 ? '+' : ''}{ev?.toFixed(1)}%
              </span>
              <span
                className="text-xs px-1.5 py-0.5 rounded-md font-medium"
                style={{
                  background: ev > 0 ? 'rgba(74,222,128,0.1)' : ev < 0 ? 'rgba(248,113,113,0.1)' : 'rgba(251,191,36,0.1)',
                  color: ev > 0 ? '#4ade80' : ev < 0 ? '#f87171' : '#fbbf24',
                }}
              >
                {ev > 0 ? 'Positivo' : ev < 0 ? 'Negativo' : 'Neutro'}
              </span>
            </div>
            <div className="h-3 w-px" style={{ background: 'var(--border)' }} />
            {[
              { l: 'Stake inicial', v: `R$${b > 0 ? (b * sp).toFixed(2) : '—'}` },
              { l: 'Lucro se ganhar', v: b > 0 ? `R$${(b * sp * (o - 1)).toFixed(2)}` : '—' },
            ].map(p => (
              <span key={p.l} className="text-xs" style={{ color: 'var(--text-3)' }}>
                {p.l}: <strong style={{ color: 'var(--text-1)' }}>{p.v}</strong>
              </span>
            ))}
          </div>
        )}

        <button
          onClick={executar}
          disabled={!valid}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label={`Simular ${n} apostas`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Simular {n} apostas
        </button>

        {resultado && (
          <div className="space-y-4" aria-live="polite" aria-label="Resultados da simulação">

            {/* Ruin alert — sem emoji */}
            {ruina && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)' }} role="alert">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: 'rgba(248,113,113,0.2)', color: '#f87171' }}>!</div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#f87171' }}>Ruína — banca zerada</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>A banca chegou a R$0 antes de completar {n} apostas. Considere reduzir o stake %.</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3">
              <div className="result-box">
                <p className="result-value" style={{ color: ruina ? '#f87171' : 'var(--text-1)' }}>
                  R${bancaFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="result-label">Banca final</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: lucroTotal >= 0 ? '#4ade80' : '#f87171' }}>
                  {lucroTotal >= 0 ? '+' : ''}R${lucroTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="result-label">Lucro / Prejuízo</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: lucroTotal >= 0 ? '#818cf8' : '#f87171' }}>
                  {b > 0 ? ((lucroTotal / b) * 100).toFixed(1) : 0}%
                </p>
                <p className="result-label">ROI total</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="result-box">
                <p className="result-value text-base" style={{ color: '#4ade80' }}>
                  R${maxBanca.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
                <p className="result-label">Banca máxima atingida</p>
              </div>
              <div className="result-box">
                <p className="result-value text-base" style={{ color: '#f87171' }}>
                  R${minBanca.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
                <p className="result-label">Banca mínima atingida</p>
              </div>
            </div>

            {/* Gráfico de evolução */}
            <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)' }}>
              <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-2)' }}>Evolução da banca</p>
              <div className="flex items-end gap-px h-28" role="img" aria-label="Gráfico de barras mostrando evolução da banca ao longo das apostas">
                {resultado.map((p, i) => {
                  const range = (maxBanca - minBanca) || 1;
                  const pct = Math.max(2, ((p.banca - minBanca) / range) * 100);
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm transition-all"
                      style={{
                        height: `${pct}%`,
                        background: p.banca >= b ? 'rgba(74,222,128,0.5)' : 'rgba(248,113,113,0.5)',
                        minWidth: '2px',
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 text-xs" style={{ color: 'var(--text-3)' }}>
                <span>Início (R${b.toLocaleString('pt-BR')})</span>
                <span style={{ color: maxBanca > b ? '#4ade80' : '#f87171' }}>
                  Máx: R${maxBanca.toFixed(0)}
                </span>
                <span>Aposta {n}</span>
              </div>
            </div>

            {/* Histórico de simulações */}
            {historico.length > 1 && (
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <div className="px-4 py-2.5" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-3)' }}>Histórico das últimas simulações</p>
                </div>
                <div className="grid grid-cols-3 px-4 py-1.5" style={{ background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border)' }}>
                  {['Simulação', 'Banca final', 'ROI'].map(h => (
                    <p key={h} className="text-xs" style={{ color: 'var(--text-3)' }}>{h}</p>
                  ))}
                </div>
                {historico.map((h, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-3 px-4 py-2.5"
                    style={{
                      borderBottom: i < historico.length - 1 ? '1px solid var(--border)' : 'none',
                      background: i === 0 ? 'rgba(34,211,238,0.03)' : 'transparent',
                    }}
                  >
                    <p className="text-xs" style={{ color: i === 0 ? '#22d3ee' : 'var(--text-3)' }}>
                      {i === 0 ? '● Atual' : `#${historico.length - i}`}
                    </p>
                    <p className="text-xs font-medium tabular-nums" style={{ color: h.ruina ? '#f87171' : 'var(--text-1)' }}>
                      {h.ruina ? 'Ruína (R$0)' : `R$${h.bancaFinal.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
                    </p>
                    <p className="text-xs font-medium tabular-nums" style={{ color: h.roi >= 0 ? '#4ade80' : '#f87171' }}>
                      {h.roi >= 0 ? '+' : ''}{h.roi.toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
