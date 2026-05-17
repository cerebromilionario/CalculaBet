import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

// ─── FAQ ────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'O que é margem da casa em apostas?',
    a: 'A margem da casa é a vantagem matemática embutida diretamente nas odds publicadas pelas plataformas de apostas. Ela não aparece como uma taxa separada: está incorporada nas cotações de todos os resultados do mercado. Quando você soma as probabilidades implícitas de cada odd, o total ultrapassa 100%. Essa diferença acima de 100% é a margem. Por exemplo, odds simétricas de 1.90 para dois resultados geram 52,63% + 52,63% = 105,26%. A margem é 5,26%.',
  },
  {
    q: 'O que é overround?',
    a: 'Overround é a soma total das probabilidades implícitas de todos os resultados de um mercado. Em um mercado matematicamente justo, essa soma seria exatamente 100%. Quando ultrapassa 100%, o excedente representa a margem embutida pela plataforma. O overround e a margem da casa são termos relacionados: se o overround é 105,26%, a margem é 5,26%.',
  },
  {
    q: 'Como calcular overround?',
    a: 'Para calcular o overround, converta cada odd em probabilidade implícita dividindo 1 pela odd e multiplique por 100 para obter o percentual. Depois some todas as probabilidades implícitas dos resultados do mercado. O resultado é o overround. Por exemplo: odds 2.10, 3.40 e 3.60 geram 47,62% + 29,41% + 27,78% = 104,81%. O overround é 104,81%, e a margem é 4,81%.',
  },
  {
    q: 'Como calcular a margem da casa pelas odds?',
    a: 'Divida 1 por cada odd para obter a probabilidade implícita de cada resultado. Some todos os valores. Subtraia 100% do total. O resultado é a margem aproximada da casa. Exemplo com odds 1.90 e 1.90: (1 ÷ 1.90) × 100 = 52,63%; soma = 105,26%; margem = 105,26% − 100% = 5,26%.',
  },
  {
    q: 'O que é payout teórico?',
    a: 'Payout teórico é a estimativa da proporção do dinheiro apostado que seria devolvida ao conjunto de apostadores com base nas odds publicadas. Calcula-se como 1 dividido pela soma das probabilidades implícitas (em decimal). Se o overround for 105,26% (ou 1,0526), o payout teórico é 1 ÷ 1,0526 ≈ 94,99%. Isso significa que, teoricamente, a plataforma reteria cerca de 5,01% do volume total apostado naquele mercado.',
  },
  {
    q: 'O que são odds justas?',
    a: 'Odds justas são as cotações aproximadas sem a margem da casa embutida. Para calculá-las, normaliza-se a probabilidade implícita de cada resultado dividindo-a pela soma total das probabilidades. Em seguida, inverte-se o valor para obter a odd equivalente. Por exemplo, em um mercado de dois resultados com odds 1.90/1.90, a odd justa seria próxima de 2.00 para cada lado, indicando que a margem reduziu a cotação de 2.00 para 1.90.',
  },
  {
    q: 'Margem menor significa aposta melhor?',
    a: 'Não necessariamente. Margem menor indica que o mercado está precificado de forma mais competitiva e que as odds estão mais próximas do valor justo. Mas isso não garante que uma aposta específica tenha valor positivo esperado. Para avaliar valor em uma aposta, é preciso comparar a probabilidade implícita da odd com a probabilidade real estimada do evento — análise que vai além da margem do mercado.',
  },
  {
    q: 'A calculadora de margem da casa garante lucro?',
    a: 'Não. A calculadora apresenta informações matemáticas baseadas nas odds inseridas. Ela não prevê resultados, não recomenda apostas e não garante qualquer retorno financeiro. O objetivo é educativo: entender como as odds são precificadas, comparar mercados matematicamente e aprender a identificar a margem embutida nas cotações.',
  },
  {
    q: 'Como calcular margem em mercado de 2 resultados?',
    a: 'Some as probabilidades implícitas dos dois resultados. Exemplo com odds 1.85 e 2.05: (1 ÷ 1.85) × 100 = 54,05%; (1 ÷ 2.05) × 100 = 48,78%; soma = 102,83%; margem = 2,83%. Para encontrar o payout: 1 ÷ 1,0283 ≈ 97,25%. Esse é um exemplo de mercado de 2 resultados típico de tênis, over/under ou ambas marcam.',
  },
  {
    q: 'Como calcular margem em futebol 1X2?',
    a: 'Em futebol 1X2 há três resultados: vitória do mandante (Casa), empate (X) e vitória do visitante (Fora). Some as probabilidades implícitas dos três. Exemplo com odds 2.20, 3.30 e 3.20: (1÷2.20) = 45,45%; (1÷3.30) = 30,30%; (1÷3.20) = 31,25%; soma = 107,00%; margem = 7,00%. É essencial incluir o empate para o cálculo ser completo.',
  },
  {
    q: 'Qual a relação entre overround e probabilidade implícita?',
    a: 'A probabilidade implícita de cada odd é o inverso da cotação expressa em percentual (1 ÷ odd × 100). O overround é simplesmente a soma de todas as probabilidades implícitas do mercado. Em um mercado sem margem, essa soma seria 100%. Qualquer valor acima indica margem embutida. A probabilidade implícita individual já inclui a parcela da margem atribuída àquele resultado.',
  },
  {
    q: 'Overround é a mesma coisa que taxa da casa?',
    a: 'São conceitos próximos, mas não idênticos. O overround é a soma das probabilidades implícitas expressas em percentual, calculada diretamente pelas odds publicadas — é uma estimativa teórica baseada nas cotações. A margem efetiva da casa pode variar conforme o volume de apostas em cada resultado e outros fatores operacionais. O overround é uma proxy útil para comparação entre mercados.',
  },
  {
    q: 'Posso usar essa calculadora para qualquer esporte?',
    a: 'Sim. A calculadora funciona com qualquer mercado que utilize odds decimais, independentemente do esporte ou tipo de evento. Basta inserir todas as odds dos resultados possíveis do mercado analisado. Funciona para futebol, tênis, basquete, vôlei, e-sports, corridas, MMA e qualquer outro mercado desde que você insira todos os resultados cobertos pelas odds.',
  },
  {
    q: 'Como comparar a margem entre casas de apostas?',
    a: 'Use a calculadora para o mesmo mercado em diferentes plataformas. Insira as odds de cada casa separadamente e compare o overround resultante. Uma casa com overround menor para o mesmo evento está oferecendo, matematicamente, odds mais próximas do valor justo naquele mercado específico. Mas lembre-se: compare sempre o mesmo mercado, com as mesmas regras e no mesmo momento, pois odds mudam constantemente.',
  },
  {
    q: 'Qual a diferença entre margem da casa e value bet?',
    a: 'São conceitos complementares, mas distintos. A margem da casa é uma característica do mercado como um todo — mede quanto as odds foram ajustadas abaixo do valor justo. Value bet é uma característica de uma aposta individual: ocorre quando a probabilidade real de um resultado específico é maior do que a probabilidade implícita da odd oferecida. Um mercado com margem baixa aumenta a probabilidade de encontrar value bets, mas não garante que elas existam.',
  },
  {
    q: 'Odds justas indicam aposta de valor?',
    a: 'Não diretamente. As odds justas mostram como seria a cotação sem a margem da casa — são uma referência teórica. Para identificar valor em uma aposta, é preciso ter uma estimativa própria da probabilidade real do evento e compará-la com a probabilidade implícita da odd. Se sua estimativa for superior à probabilidade implícita, a aposta pode ter valor esperado positivo. Odds justas auxiliam nessa análise, mas não a substituem.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function ContentCard({ children }) {
  return (
    <section
      className="rounded-2xl p-5 md:p-6"
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}
    >
      {children}
    </section>
  );
}

function InfoNote({ children, tone = 'cyan' }) {
  const tones = {
    cyan:  { bg: 'rgba(34,211,238,0.07)',  border: 'rgba(34,211,238,0.18)',  color: '#22d3ee', icon: 'ℹ️' },
    amber: { bg: 'rgba(251,191,36,0.07)',  border: 'rgba(251,191,36,0.2)',   color: '#fbbf24', icon: '⚠️' },
    green: { bg: 'rgba(34,197,94,0.07)',   border: 'rgba(34,197,94,0.18)',   color: '#4ade80', icon: '✓'  },
  };
  const s = tones[tone];
  return (
    <div className="flex gap-3 rounded-2xl p-4" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
      <span className="mt-0.5 text-sm flex-shrink-0" aria-hidden="true" style={{ color: s.color }}>{s.icon}</span>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{children}</p>
    </div>
  );
}

function CodeBlock({ children, label }) {
  return (
    <div className="rounded-2xl p-5 overflow-x-auto" style={{ background: '#070711', border: '1px solid var(--border-md)' }}>
      {label && <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-3)' }}>{label}</p>}
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function Formula({ children, color = '#22d3ee' }) {
  return <code className="text-sm block" style={{ color }}>{children}</code>;
}

// ─── SEO Explanation ─────────────────────────────────────────────────────────

function Explanation() {
  const t = { color: 'var(--text-2)' };
  const h = { color: 'var(--text-1)' };
  const muted = { color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' };

  return (
    <article className="space-y-8">

      {/* ── Header ── */}
      <header className="space-y-4">
        <span className="badge badge-cyan">Guia educativo completo</span>
        <h2 className="section-title">Margem da casa e overround: como as odds são precificadas</h2>
        <p className="text-base leading-relaxed" style={t}>
          A calculadora de margem da casa do CalculaBet foi criada para quem deseja entender como as odds são construídas, como identificar a margem embutida nas cotações e como comparar mercados de forma objetiva e matemática. O conteúdo abaixo explica cada conceito com exemplos práticos e fórmulas detalhadas. Esta é uma ferramenta exclusivamente educativa — não prevê resultados nem recomenda apostas.
        </p>
      </header>

      {/* ── Cards resumo ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          ['Para que serve', 'Calcular e comparar a margem embutida nas odds de um mercado de apostas esportivas.'],
          ['O que entrega', 'Overround, payout teórico, probabilidades implícitas e odds justas por cada resultado.'],
          ['Para quem', 'Iniciantes que querem aprender probabilidade implícita e apostadores que desejam comparar precificações.'],
        ].map(([title, body]) => (
          <div key={title} className="rounded-2xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <p className="text-xs font-semibold mb-2" style={muted}>{title}</p>
            <p className="text-sm leading-relaxed" style={t}>{body}</p>
          </div>
        ))}
      </div>

      {/* ── O que é margem da casa ── */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>O que é margem da casa em apostas?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            A margem da casa é a vantagem matemática embutida diretamente nas odds publicadas por uma plataforma de apostas. Ao contrário de taxas de serviço ou comissões visíveis, ela não aparece de forma explícita: está incorporada na estrutura das cotações de todos os resultados do mercado.
          </p>
          <p>
            Em teoria, se um mercado fosse completamente justo — sem nenhuma vantagem para a casa — a soma das probabilidades implícitas de todos os resultados possíveis seria exatamente 100%. Na prática, as plataformas ajustam as odds para baixo de modo que essa soma ultrapasse 100%. O excedente é a margem.
          </p>
          <p>
            Entender a margem da casa é fundamental para interpretar odds de forma objetiva. Ela não determina sozinha se uma aposta tem valor, mas oferece um ponto de partida importante para analisar a estrutura de precificação de qualquer mercado.
          </p>

          <CodeBlock label="Exemplo simples — mercado com odds simétricas de 1.90">
            <Formula color="#22d3ee">Odd A: 1.90  →  1 ÷ 1.90 = 52,63%</Formula>
            <Formula color="#22d3ee">Odd B: 1.90  →  1 ÷ 1.90 = 52,63%</Formula>
            <Formula color="#f0f2f7">Soma das probabilidades: 105,26%</Formula>
            <Formula color="#fbbf24">Margem da casa: 105,26% − 100% = 5,26%</Formula>
          </CodeBlock>

          <p>
            Nesse exemplo, se o mercado fosse justo, cada resultado teria odd 2.00 (50% de probabilidade). A plataforma reduz de 2.00 para 1.90, embutindo 5,26% de margem no mercado. Essa diferença não é visível para o apostador sem o cálculo.
          </p>
          <InfoNote>
            Margem não é taxa visível. Ela está incorporada nas cotações e só pode ser identificada ao calcular a probabilidade implícita de cada resultado e somar os valores.
          </InfoNote>
        </div>
      </ContentCard>

      {/* ── O que é overround ── */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>O que é overround?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Overround é o nome técnico para a soma das probabilidades implícitas de todos os resultados de um mercado de apostas. O termo é amplamente usado por analistas, traders e apostadores profissionais para avaliar a estrutura de precificação de mercados.
          </p>
          <p>
            Em um mercado matematicamente justo, sem nenhuma vantagem embutida, a soma das probabilidades implícitas seria exatamente 100% (ou 1,0 em decimal). Quando esse valor ultrapassa 100%, o excedente é o overround — sinônimo prático de margem da casa.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl p-4" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: '#22d3ee' }}>Mercado justo (hipotético)</p>
              <p className="text-xs" style={t}>Soma das probabilidades implícitas = 100%</p>
              <p className="text-xs mt-1" style={t}>Overround = 0%  |  Margem = 0%</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.12)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: '#fbbf24' }}>Mercado real (com margem)</p>
              <p className="text-xs" style={t}>Soma das probabilidades implícitas {'>'} 100%</p>
              <p className="text-xs mt-1" style={t}>Overround {'>'} 100%  |  Margem = Overround − 100%</p>
            </div>
          </div>

          <CodeBlock label="Fórmulas principais">
            <Formula color="#22d3ee">Overround = (1 ÷ odd₁) + (1 ÷ odd₂) + ... + (1 ÷ oddₙ)  [em decimal]</Formula>
            <Formula color="#818cf8">Margem da casa = (Overround − 1) × 100%</Formula>
            <Formula color="#4ade80">Payout teórico = 1 ÷ Overround × 100%</Formula>
          </CodeBlock>
        </div>
      </ContentCard>

      {/* ── Como calcular passo a passo ── */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Como calcular a margem da casa pelas odds</h2>
        <div className="space-y-5 text-sm leading-relaxed" style={t}>
          <p>
            O cálculo da margem da casa pode ser feito manualmente em qualquer mercado. O processo é sempre o mesmo, independentemente do número de resultados ou do esporte.
          </p>

          <ol className="space-y-3 list-none">
            {[
              ['1', 'Reúna todas as odds decimais do mercado que deseja analisar.'],
              ['2', 'Para cada odd, calcule a probabilidade implícita: divida 1 pela odd e multiplique por 100.'],
              ['3', 'Some todas as probabilidades implícitas. O resultado é o overround.'],
              ['4', 'Subtraia 100% do overround. O resultado é a margem da casa.'],
              ['5', 'Para calcular o payout, divida 1 pelo overround expresso em decimal (ex.: 1,0526).'],
            ].map(([n, text]) => (
              <li key={n} className="flex gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(34,211,238,0.12)', color: '#22d3ee' }}>{n}</span>
                <p>{text}</p>
              </li>
            ))}
          </ol>

          <CodeBlock label="Exemplo resolvido — Futebol 1X2 (3 resultados)">
            <Formula color="#22d3ee">Casa  2.10  →  1 ÷ 2.10 = 47,62%</Formula>
            <Formula color="#22d3ee">Empate 3.40  →  1 ÷ 3.40 = 29,41%</Formula>
            <Formula color="#22d3ee">Fora  3.60  →  1 ÷ 3.60 = 27,78%</Formula>
            <Formula color="#f0f2f7">Soma (overround): 47,62% + 29,41% + 27,78% = 104,81%</Formula>
            <Formula color="#fbbf24">Margem da casa: 104,81% − 100% = 4,81%</Formula>
            <Formula color="#4ade80">Payout teórico: 1 ÷ 1,0481 ≈ 95,41%</Formula>
          </CodeBlock>

          <p>
            A calculadora acima automatiza todos esses passos. Basta inserir as odds e clicar em calcular.
          </p>
        </div>
      </ContentCard>

      {/* ── Payout teórico ── */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>O que é payout teórico?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            O payout teórico é uma estimativa da proporção do volume total apostado que seria devolvida ao conjunto de apostadores com base exclusivamente nas odds publicadas. Ele representa o complemento da margem da casa: se a margem é 5%, o payout teórico é 95%.
          </p>
          <p>
            A fórmula é simples: divida 1 pelo overround expresso em decimal. Quanto maior o overround, menor o payout teórico.
          </p>

          <CodeBlock label="Fórmula do payout teórico">
            <Formula color="#4ade80">Payout (%) = (1 ÷ Overround decimal) × 100</Formula>
          </CodeBlock>

          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <div className="px-4 py-2.5 text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)', color: 'var(--text-3)' }}>
              Exemplos de overround × payout
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {[
                ['100,00%', '0,00%', '100,00%', 'Mercado justo (hipotético)'],
                ['102,00%', '2,00%', '98,04%', 'Margem muito baixa'],
                ['105,26%', '5,26%', '94,99%', 'Odds 1.90/1.90'],
                ['108,00%', '8,00%', '92,59%', 'Margem elevada'],
                ['115,00%', '15,00%', '86,96%', 'Margem alta'],
              ].map(([over, marg, pay, nota]) => (
                <div key={over} className="grid px-4 py-2.5 text-xs items-center" style={{ gridTemplateColumns: '1fr 1fr 1fr 2fr', gap: '8px' }}>
                  <span style={{ color: 'var(--text-2)' }}>{over}</span>
                  <span style={{ color: '#fbbf24' }}>{marg}</span>
                  <span style={{ color: '#4ade80' }}>{pay}</span>
                  <span style={{ color: 'var(--text-3)' }}>{nota}</span>
                </div>
              ))}
            </div>
          </div>

          <InfoNote tone="amber">
            O payout é teórico e baseado nas odds publicadas. Na prática, o retorno real aos apostadores depende do volume apostado em cada resultado, das regras de liquidação do mercado e de outros fatores operacionais da plataforma.
          </InfoNote>
        </div>
      </ContentCard>

      {/* ── Odds justas ── */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>O que são odds justas?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Odds justas são as cotações aproximadas que existiriam se o mercado não tivesse margem embutida. Elas são calculadas normalizando as probabilidades implícitas de cada resultado em relação à soma total das probabilidades do mercado.
          </p>

          <CodeBlock label="Cálculo das odds justas para cada resultado">
            <Formula color="#818cf8">Probabilidade normalizada = Prob. implícita ÷ Overround decimal</Formula>
            <Formula color="#818cf8">Odd justa = 1 ÷ Probabilidade normalizada</Formula>
          </CodeBlock>

          <p>
            As odds justas são uma referência para entender o preço teórico do mercado sem a vantagem da casa. Elas não indicam que uma aposta tem valor — para isso, seria necessário ter uma estimativa própria da probabilidade real do evento.
          </p>

          <CodeBlock label="Exemplo — Odds 1.90/1.90 (overround 105,26%)">
            <Formula color="#22d3ee">Prob. implícita A: 52,63%  →  Normalizada: 52,63 ÷ 1,0526 = 50,00%</Formula>
            <Formula color="#22d3ee">Prob. implícita B: 52,63%  →  Normalizada: 52,63 ÷ 1,0526 = 50,00%</Formula>
            <Formula color="#818cf8">Odd justa A: 1 ÷ 0,50 = 2.00</Formula>
            <Formula color="#818cf8">Odd justa B: 1 ÷ 0,50 = 2.00</Formula>
          </CodeBlock>

          <p>
            Nesse caso, as odds publicadas (1.90) estão 0.10 abaixo das odds justas (2.00), diferença que representa a margem de 5,26% distribuída entre os dois resultados.
          </p>
          <InfoNote tone="green">
            Odds justas ajudam a visualizar o impacto da margem em cada cotação, mas não substituem uma análise de probabilidade real para identificar value bets.{' '}
            <Link to="/blog/value-bet-o-que-e" style={{ color: '#4ade80' }}>Entenda o que é value bet →</Link>
          </InfoNote>
        </div>
      </ContentCard>

      {/* ── Como usar a calculadora ── */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Como usar a Calculadora de Margem da Casa do CalculaBet</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <ol className="space-y-3 list-none">
            {[
              ['1', 'Insira o nome de cada resultado — opcional, mas útil para leitura (ex.: Casa, Empate, Fora).'],
              ['2', 'Digite a odd decimal de cada resultado. Use ponto ou vírgula como separador decimal.'],
              ['3', 'Adicione ou remova resultados conforme o mercado: 2 para tênis ou over/under, 3 para futebol 1X2, mais para mercados com múltiplos resultados.'],
              ['4', 'Clique em "Calcular margem".'],
              ['5', 'Veja a probabilidade implícita de cada odd, o overround total, a margem da casa e o payout teórico.'],
              ['6', 'Analise as odds justas aproximadas para cada resultado na tabela.'],
              ['7', 'Compare os resultados com outros mercados usando os exemplos rápidos disponíveis na calculadora.'],
            ].map(([n, text]) => (
              <li key={n} className="flex gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(34,197,94,0.12)', color: '#4ade80' }}>{n}</span>
                <p>{text}</p>
              </li>
            ))}
          </ol>

          <p>A calculadora pode ser usada em qualquer mercado com odds decimais:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {['Tênis (2 resultados)', 'Futebol 1X2', 'Over/Under', 'Ambas marcam', 'Handicap asiático', 'Vencedor de torneio'].map(item => (
              <div key={item} className="rounded-xl px-3 py-2 text-xs text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </ContentCard>

      {/* ── Faixas de margem ── */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Como interpretar uma margem baixa ou alta</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Embora as faixas variem conforme o tipo de mercado, esporte e plataforma, é possível usar referências orientativas para interpretar o overround calculado. As categorias abaixo são educativas e não representam regras absolutas.
          </p>

          <div className="space-y-2">
            {[
              { faixa: 'Até 2%', label: 'Muito baixa', cor: '#22d3ee', corBg: 'rgba(34,211,238,0.06)', desc: 'Mercados altamente líquidos ou com promoção de odds. Pouco comum em mercados padrão.' },
              { faixa: '2% a 5%', label: 'Baixa', cor: '#4ade80', corBg: 'rgba(34,197,94,0.06)', desc: 'Margem competitiva, comum em mercados principais de grandes eventos.' },
              { faixa: '5% a 8%', label: 'Moderada', cor: '#fbbf24', corBg: 'rgba(251,191,36,0.06)', desc: 'Intervalo mais frequente em mercados de apostas esportivas convencionais.' },
              { faixa: 'Acima de 8%', label: 'Alta', cor: '#f87171', corBg: 'rgba(248,113,113,0.06)', desc: 'Mais comum em mercados secundários, mercados de nicho ou plataformas menos competitivas.' },
            ].map(({ faixa, label, cor, corBg, desc }) => (
              <div key={faixa} className="flex gap-3 rounded-xl px-4 py-3" style={{ background: corBg, border: `1px solid ${cor}25` }}>
                <div style={{ width: '80px', flexShrink: 0 }}>
                  <p className="text-xs font-bold" style={{ color: cor }}>{label}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{faixa}</p>
                </div>
                <p className="text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
            <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--text-1)' }}>Importante lembrar</p>
            <p className="text-xs leading-relaxed" style={t}>
              Uma margem menor pode indicar odds mais competitivas, mas não garante que uma aposta tenha valor positivo esperado. Para identificar valor, é necessário comparar a probabilidade implícita com uma estimativa própria da probabilidade real do evento.
            </p>
          </div>
        </div>
      </ContentCard>

      {/* ── Mercados de 2 resultados ── */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Margem da casa em mercados de 2 resultados</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Mercados com apenas dois resultados possíveis são os mais simples de analisar. O cálculo envolve apenas duas probabilidades implícitas. São exemplos comuns de mercados de 2 resultados:
          </p>
          <ul className="space-y-1 list-none">
            {['Tênis (vencedor da partida)', 'Over/Under (mais ou menos gols/pontos)', 'Ambas marcam (sim ou não)', 'Handicap asiático (sem empate)', 'Basquete (vencedor da partida)'].map(item => (
              <li key={item} className="flex gap-2.5 text-xs">
                <span style={{ color: '#22d3ee', flexShrink: 0 }}>→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <CodeBlock label="Exemplo — Mercado de 2 resultados (odds 1.85 e 2.05)">
            <Formula color="#22d3ee">Resultado A: 1.85  →  1 ÷ 1.85 = 54,05%</Formula>
            <Formula color="#22d3ee">Resultado B: 2.05  →  1 ÷ 2.05 = 48,78%</Formula>
            <Formula color="#f0f2f7">Soma (overround): 102,83%</Formula>
            <Formula color="#fbbf24">Margem da casa: 2,83%</Formula>
            <Formula color="#4ade80">Payout teórico: 1 ÷ 1,0283 ≈ 97,25%</Formula>
            <Formula color="#818cf8">Odd justa A: 1 ÷ (54,05 ÷ 1,0283 ÷ 100) ≈ 1.90</Formula>
            <Formula color="#818cf8">Odd justa B: 1 ÷ (48,78 ÷ 1,0283 ÷ 100) ≈ 2.11</Formula>
          </CodeBlock>

          <p>
            Nesse exemplo, a margem de 2,83% é distribuída de forma assimétrica: o Resultado A tem odd publicada de 1.85, mas a odd justa seria aproximadamente 1.90. O Resultado B tem odd 2.05, com odd justa próxima de 2.11.
          </p>
          <InfoNote>
            Em mercados de 2 resultados, é mais fácil identificar onde a margem foi distribuída entre as cotações. Em mercados com muitos resultados, a análise fica mais complexa.
          </InfoNote>
        </div>
      </ContentCard>

      {/* ── Futebol 1X2 ── */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Margem da casa em futebol 1X2</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            O mercado de futebol 1X2 é o mais popular nas apostas esportivas. Ele tem três resultados possíveis: vitória do mandante (1), empate (X) e vitória do visitante (2). Para calcular a margem corretamente, é essencial incluir os três resultados — especialmente o empate, que é frequentemente esquecido.
          </p>

          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <div
              className="grid px-4 py-2.5 text-xs font-semibold"
              style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)', color: 'var(--text-3)', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}
            >
              <span>Resultado</span>
              <span className="text-right">Odd</span>
              <span className="text-right">Prob. implícita</span>
              <span className="text-right">Odd justa</span>
            </div>
            {[
              ['Casa (1)', '2.20', (1/2.20*100).toFixed(2), (1/(1/2.20/(1/2.20+1/3.30+1/3.20))).toFixed(2)],
              ['Empate (X)', '3.30', (1/3.30*100).toFixed(2), (1/(1/3.30/(1/2.20+1/3.30+1/3.20))).toFixed(2)],
              ['Fora (2)', '3.20', (1/3.20*100).toFixed(2), (1/(1/3.20/(1/2.20+1/3.30+1/3.20))).toFixed(2)],
            ].map(([nome, odd, prob, justa]) => (
              <div
                key={nome}
                className="grid px-4 py-3 text-xs"
                style={{ borderBottom: '1px solid var(--border)', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}
              >
                <span style={{ color: 'var(--text-1)' }}>{nome}</span>
                <span className="text-right tabular-nums" style={{ color: 'var(--text-2)' }}>{odd}</span>
                <span className="text-right tabular-nums font-medium" style={{ color: 'var(--text-1)' }}>{prob}%</span>
                <span className="text-right tabular-nums" style={{ color: '#818cf8' }}>{justa}</span>
              </div>
            ))}
            <div className="grid px-4 py-3 text-xs font-semibold" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}>
              <span style={{ color: 'var(--text-3)' }}>Total</span>
              <span />
              <span className="text-right tabular-nums" style={{ color: '#fbbf24' }}>
                {((1/2.20+1/3.30+1/3.20)*100).toFixed(2)}%
              </span>
              <span className="text-right text-xs" style={{ color: 'var(--text-3)' }}>
                Margem: {(((1/2.20+1/3.30+1/3.20)-1)*100).toFixed(2)}%
              </span>
            </div>
          </div>

          <p>
            No exemplo acima, a soma das probabilidades implícitas é de aproximadamente 107,00%, gerando uma margem de 7,00% e payout teórico de cerca de 93,46%. As odds justas mostram as cotações aproximadas sem essa margem embutida.
          </p>
          <InfoNote tone="amber">
            Nunca calcule a margem de um mercado 1X2 usando apenas 2 resultados. Esquecer o empate resulta em um cálculo incorreto e subestima a margem real do mercado.
          </InfoNote>
        </div>
      </ContentCard>

      {/* ── Overround, prob implícita e value bet ── */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Overround, probabilidade implícita e value bet</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            A margem da casa, o overround e a probabilidade implícita são conceitos interligados que formam a base da análise matemática de apostas. Entendê-los em conjunto é o primeiro passo para avaliar odds de forma mais objetiva.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              ['Probabilidade implícita', 'É a probabilidade embutida em uma odd (1 ÷ odd × 100). Inclui a margem da casa. Exemplo: odd 2.00 → probabilidade implícita de 50%.', '#22d3ee'],
              ['Overround', 'Soma de todas as probabilidades implícitas do mercado. Acima de 100% indica margem presente.', '#818cf8'],
              ['Odds justas', 'Cotações estimadas sem margem, calculadas ao normalizar as probabilidades implícitas. Referência teórica — não indicam valor diretamente.', '#4ade80'],
              ['Value bet', 'Ocorre quando a probabilidade real estimada de um resultado é maior que a probabilidade implícita da odd. Requer análise própria além do cálculo de margem.', '#fbbf24'],
            ].map(([title, body, cor]) => (
              <div key={title} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${cor}20` }}>
                <p className="font-semibold text-xs mb-1.5" style={{ color: cor }}>{title}</p>
                <p className="text-xs leading-relaxed" style={t}>{body}</p>
              </div>
            ))}
          </div>

          <p>
            Use a calculadora de margem da casa em conjunto com outras ferramentas e fontes de análise. O overround é um ponto de partida, não uma conclusão.
          </p>

          <div className="flex flex-wrap gap-2">
            <Link to="/blog/probabilidade-implicita-odds" className="text-xs px-3 py-1.5 rounded-lg transition-colors" style={{ color: '#22d3ee', background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.15)' }}>
              Probabilidade implícita →
            </Link>
            <Link to="/blog/value-bet-o-que-e" className="text-xs px-3 py-1.5 rounded-lg transition-colors" style={{ color: '#4ade80', background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.15)' }}>
              O que é value bet →
            </Link>
            <Link to="/blog/como-calcular-odds" className="text-xs px-3 py-1.5 rounded-lg transition-colors" style={{ color: '#818cf8', background: 'rgba(129,140,248,0.07)', border: '1px solid rgba(129,140,248,0.15)' }}>
              Como calcular odds →
            </Link>
          </div>
        </div>
      </ContentCard>

      {/* ── Comparação entre plataformas ── */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Margem da casa e comparação entre plataformas</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Plataformas diferentes podem oferecer odds distintas para o mesmo evento e mercado. Isso gera margens diferentes. Usar a calculadora para comparar o overround do mesmo mercado em plataformas diferentes pode revelar qual delas está precificando mais próximo do valor justo naquele contexto específico.
          </p>
          <p>
            Para fazer uma comparação válida, é essencial garantir que:
          </p>
          <ul className="space-y-1.5 list-none">
            {[
              'As odds são do exatamente mesmo mercado (mesmo evento, mesmo tipo de resultado).',
              'As regras de liquidação são equivalentes (ex.: tempo regular vs. incluindo prorrogação).',
              'As odds foram capturadas no mesmo momento — elas mudam constantemente.',
              'Você considera todos os resultados do mercado, não apenas um isolado.',
            ].map(text => (
              <li key={text} className="flex gap-2.5 text-xs">
                <span className="mt-0.5 flex-shrink-0" style={{ color: '#22d3ee' }}>✓</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <p>
            Pequenas diferenças de margem podem ter impacto relevante no retorno esperado ao longo de muitas apostas. Compare odds, entenda a estrutura de cada mercado e use a calculadora como apoio.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Link to="/casas-apostas" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: '#22d3ee', background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.15)' }}>
              Comparar casas de apostas →
            </Link>
            <Link to="/calculadoras/conversor-odds" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: '#818cf8', background: 'rgba(129,140,248,0.07)', border: '1px solid rgba(129,140,248,0.15)' }}>
              Conversor de odds →
            </Link>
          </div>
        </div>
      </ContentCard>

      {/* ── Erros comuns ── */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Erros comuns ao analisar overround</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Mesmo com a calculadora disponível, alguns erros são comuns ao interpretar o overround. Conheça os principais para evitá-los:
          </p>

          <div className="space-y-2.5">
            {[
              ['Calcular com resultados faltando', 'Incluir apenas parte dos resultados de um mercado leva a um overround incorreto e subestimado.'],
              ['Esquecer o empate no futebol', 'Em mercados 1X2, o empate é obrigatório. Calcular sem ele gera uma margem erroneamente baixa.'],
              ['Misturar odds de mercados diferentes', 'Misturar odds de "Resultado final" com odds de "1º tempo" ou de casas com regras diferentes invalida o cálculo.'],
              ['Usar odds desatualizadas', 'Odds mudam constantemente antes e durante eventos. O cálculo reflete o momento em que as odds foram coletadas.'],
              ['Confundir payout com lucro garantido', 'O payout teórico é uma média do mercado como um todo — não representa o retorno de uma aposta individual.'],
              ['Achar que margem menor garante valor', 'Margem menor indica precificação mais competitiva, mas não indica que qualquer aposta naquele mercado tem valor esperado positivo.'],
              ['Ignorar regras da casa', 'Cancelamentos, void, mudança de resultado por regras específicas e limites de aposta afetam o resultado real.'],
              ['Não considerar gestão de banca', 'Análise de overround não substitui planejamento de gestão de banca. Apostas envolvem risco financeiro independente da margem.'],
            ].map(([titulo, desc]) => (
              <div key={titulo} className="flex gap-3 rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                <span className="mt-0.5 flex-shrink-0" style={{ color: '#f87171' }}>✗</span>
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-1)' }}>{titulo}</p>
                  <p className="text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-4" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
            <p className="text-xs font-semibold mb-2" style={{ color: '#22d3ee' }}>Checklist antes de interpretar a margem</p>
            <ul className="space-y-1">
              {[
                'Todas as odds do mercado foram inseridas?',
                'O mercado inclui empate (em futebol 1X2)?',
                'As odds estão atualizadas?',
                'Você está comparando o mesmo mercado?',
                'Entende a diferença entre odd, probabilidade implícita e margem?',
              ].map(item => (
                <li key={item} className="flex gap-2 text-xs" style={{ color: 'var(--text-2)' }}>
                  <span style={{ color: '#22d3ee', flexShrink: 0 }}>□</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ContentCard>

      {/* ── Jogo responsável ── */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Margem da casa e jogo responsável</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Entender a margem da casa é uma forma de analisar apostas com mais clareza matemática. Saber que as odds são ajustadas abaixo do valor justo ajuda a contextualizar o risco de qualquer aposta. No entanto, esse conhecimento não elimina a incerteza inerente às apostas esportivas.
          </p>
          <p>
            Independentemente da margem calculada, apostas envolvem risco financeiro real. Resultados são incertos. Ferramentas de cálculo ajudam a entender a estrutura do mercado — não a prever eventos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ['A calculadora não prevê resultados', 'O overround mede a estrutura de precificação do mercado. Não há relação entre margem calculada e probabilidade real do evento.'],
              ['Margem não define resultado', 'Um mercado com margem baixa não é mais previsível. A incerteza do resultado permanece independente da margem.'],
              ['Define seus limites', 'Estabeleça um orçamento de entretenimento e não aposte dinheiro destinado a despesas essenciais ou dívidas.'],
              ['Busque apoio se necessário', 'Se apostas estão afetando sua vida financeira ou emocional, procure ajuda. Plataformas regulamentadas oferecem ferramentas de autoexclusão.'],
            ].map(([titulo, desc]) => (
              <div key={titulo} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--text-1)' }}>{titulo}</p>
                <p className="text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <InfoNote tone="amber">
            Conteúdo para maiores de 18 anos. Apostas envolvem risco financeiro real. O CalculaBet é uma plataforma educacional — não é uma casa de apostas e não realiza apostas em nome de ninguém.{' '}
            <Link to="/jogo-responsavel" style={{ color: '#fbbf24' }}>Saiba mais sobre jogo responsável →</Link>
          </InfoNote>
        </div>
      </ContentCard>

      {/* ── Conclusão ── */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Conclusão: calculadora de margem da casa como ferramenta educativa</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            A calculadora de margem da casa do CalculaBet resume em segundos o que exigiria cálculos manuais demorados. Com ela, você pode:
          </p>
          <ul className="space-y-2 list-none">
            {[
              'Identificar a margem embutida nas odds de qualquer mercado.',
              'Comparar o overround de mercados ou plataformas diferentes.',
              'Entender como a margem se distribui entre as cotações.',
              'Calcular o payout teórico e as odds justas aproximadas.',
              'Aprender a estrutura matemática de precificação de apostas.',
            ].map(item => (
              <li key={item} className="flex gap-2.5 text-sm">
                <span style={{ color: '#4ade80', flexShrink: 0 }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            Use essa ferramenta como ponto de partida para analisar odds com mais clareza matemática. Combine com outras calculadoras e conteúdos educativos para aprofundar sua compreensão sobre probabilidades, retorno e gestão de banca.
          </p>
          <div className="rounded-2xl p-4 text-center" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.15)' }}>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
              Use a Calculadora de Margem da Casa do CalculaBet para comparar odds, entender overround e analisar mercados com mais clareza.
            </p>
          </div>
        </div>
      </ContentCard>

      {/* ── Ferramentas relacionadas ── */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Ferramentas e artigos relacionados</h2>
        <p className="text-sm leading-relaxed mb-5" style={t}>
          A análise de margem fica mais completa quando combinada com outras ferramentas e conteúdos educativos do CalculaBet.
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold mb-2" style={muted}>Calculadoras</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                ['/calculadoras/conversor-odds', 'Conversor de Odds', 'Converta odds decimais, americanas e fracionárias e veja a probabilidade implícita de cada formato.'],
                ['/calculadoras/odds', 'Calculadora de Odds', 'Calcule retorno, lucro e ROI de uma aposta individual com base na odd e no valor apostado.'],
                ['/calculadoras/arbitragem', 'Calculadora de Arbitragem', 'Veja se um conjunto de odds cobre todos os resultados com margem matemática positiva.'],
                ['/calculadoras/gestao-banca', 'Gestão de Banca', 'Aplique Kelly Criterion, flat betting ou percentual fixo para crescer sua banca.'],
                ['/calculadoras/roi', 'ROI em Apostas', 'Calcule o retorno sobre investimento e analise sua performance acumulada.'],
                ['/calculadoras/multipla-parlay', 'Múltipla / Parlay', 'Combine odds de múltiplas seleções e calcule retorno e risco da aposta.'],
              ].map(([to, title, body]) => (
                <Link key={to} to={to} className="rounded-xl p-3.5 transition-all" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.10)' }}>
                  <p className="text-xs font-semibold mb-0.5" style={h}>{title} →</p>
                  <p className="text-xs leading-relaxed" style={t}>{body}</p>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold mb-2" style={muted}>Artigos educativos</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                ['/blog/probabilidade-implicita-odds', 'Probabilidade implícita nas odds'],
                ['/blog/value-bet-o-que-e', 'O que é value bet'],
                ['/blog/como-calcular-odds', 'Como calcular odds'],
                ['/blog/odds-decimais-americanas-fracionarias', 'Formatos de odds'],
                ['/blog/como-calcular-retorno-de-aposta', 'Como calcular retorno de aposta'],
                ['/blog/apostas-esportivas-para-iniciantes', 'Apostas para iniciantes'],
              ].map(([to, title]) => (
                <Link key={to} to={to} className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs transition-all" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                  <span style={{ color: '#818cf8' }}>→</span>
                  {title}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <Link to="/blog" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
              Ver todos os artigos
            </Link>
            <Link to="/casas-apostas" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
              Comparar casas de apostas
            </Link>
            <Link to="/jogo-responsavel" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
              Jogo responsável
            </Link>
          </div>
        </div>
      </ContentCard>
    </article>
  );
}

// ─── Examples ────────────────────────────────────────────────────────────────

const EXEMPLOS = {
  dois: [
    { nome: 'Resultado A', odd: '1.90' },
    { nome: 'Resultado B', odd: '1.90' },
  ],
  tres: [
    { nome: 'Casa', odd: '2.10' },
    { nome: 'Empate', odd: '3.40' },
    { nome: 'Fora', odd: '3.60' },
  ],
  multi: [
    { nome: 'Time A', odd: '2.50' },
    { nome: 'Time B', odd: '3.00' },
    { nome: 'Time C', odd: '3.20' },
    { nome: 'Time D', odd: '4.50' },
    { nome: 'Time E', odd: '8.00' },
  ],
};

// ─── Main Calculator ──────────────────────────────────────────────────────────

function parseOdd(v) {
  if (typeof v === 'string') v = v.replace(',', '.');
  return parseFloat(v);
}

function interpretarMargem(margem) {
  if (margem <= 0) {
    return {
      cor: '#22d3ee',
      texto: 'Este mercado não apresenta margem positiva aparente com as odds informadas. Verifique se as odds estão corretas, pois isso pode indicar erro ou situação incomum.',
    };
  }
  if (margem <= 3) {
    return {
      cor: '#4ade80',
      texto: 'Margem baixa. Em geral, mercados com margem menor tendem a ser mais competitivos, mas isso não garante valor em nenhuma aposta específica.',
    };
  }
  if (margem <= 8) {
    return {
      cor: '#fbbf24',
      texto: 'Margem moderada. Esse intervalo é comum em muitos mercados de apostas esportivas.',
    };
  }
  return {
    cor: '#f87171',
    texto: 'Margem alta. Quanto maior a margem, menor tende a ser o payout teórico para o apostador.',
  };
}

export default function Overround() {
  const [resultados, setResultados] = useState([
    { nome: '', odd: '' },
    { nome: '', odd: '' },
  ]);
  const [calculado, setCalculado] = useState(false);
  const [erro, setErro] = useState('');

  const atualizar = (i, campo, valor) => {
    const nova = [...resultados];
    nova[i] = { ...nova[i], [campo]: valor };
    setResultados(nova);
    setCalculado(false);
    setErro('');
  };

  const adicionar = () => {
    setResultados([...resultados, { nome: '', odd: '' }]);
    setCalculado(false);
  };

  const remover = (i) => {
    if (resultados.length <= 2) return;
    setResultados(resultados.filter((_, idx) => idx !== i));
    setCalculado(false);
  };

  const carregarExemplo = (tipo) => {
    setResultados(EXEMPLOS[tipo].map(r => ({ ...r })));
    setCalculado(false);
    setErro('');
  };

  const limpar = () => {
    setResultados([{ nome: '', odd: '' }, { nome: '', odd: '' }]);
    setCalculado(false);
    setErro('');
  };

  const calcular = () => {
    for (let i = 0; i < resultados.length; i++) {
      const v = parseOdd(resultados[i].odd);
      if (!resultados[i].odd || isNaN(v) || v <= 1) {
        setErro(`Resultado ${i + 1}: insira uma odd decimal válida maior que 1.00.`);
        setCalculado(false);
        return;
      }
    }
    setErro('');
    setCalculado(true);
  };

  // Calcular resultados
  const oddsN = resultados.map(r => parseOdd(r.odd));
  const allValid = oddsN.every(o => !isNaN(o) && o > 1);

  let soma = 0, overroundPct = 0, payout = 0, payoutPct = 0;
  let linhas = [];

  if (calculado && allValid) {
    soma = oddsN.reduce((acc, o) => acc + 1 / o, 0);
    overroundPct = (soma - 1) * 100;
    payout = 1 / soma;
    payoutPct = payout * 100;

    linhas = resultados.map((r, i) => {
      const odd = oddsN[i];
      const probImpl = (1 / odd) * 100;
      const probNorm = probImpl / (soma * 100) * 100;
      const oddJusta = 1 / (probNorm / 100);
      return {
        nome: r.nome || `Resultado ${i + 1}`,
        odd,
        probImpl,
        probNorm,
        oddJusta,
      };
    });
  }

  const interpretacao = calculado && allValid ? interpretarMargem(overroundPct) : null;

  return (
    <CalcLayout
      title="Calculadora de Margem da Casa: Calcule Overround e Odds Justas"
      description="Calcule a margem da casa, overround, payout teórico, probabilidades implícitas e odds justas de qualquer mercado de apostas. Ferramenta educativa gratuita."
      slug="overround"
      faqs={faqs}
      schema={faqSchema}
      explanation={<Explanation />}
    >
      <div className="space-y-6">

        {/* Instrução */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.14)' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-1)' }}>Como preencher</p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Insira as odds decimais de todos os resultados do mercado. Para futebol 1X2, use 3 resultados (incluindo empate). Para tênis ou over/under, use 2. Você pode adicionar quantos resultados precisar.
          </p>
        </div>

        {/* Exemplos rápidos */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs self-center" style={{ color: 'var(--text-3)' }}>Carregar exemplo:</span>
          <button type="button" onClick={() => carregarExemplo('dois')} className="btn-ghost text-xs px-3 py-1.5">
            2 resultados (tênis)
          </button>
          <button type="button" onClick={() => carregarExemplo('tres')} className="btn-ghost text-xs px-3 py-1.5">
            3 resultados (1X2)
          </button>
          <button type="button" onClick={() => carregarExemplo('multi')} className="btn-ghost text-xs px-3 py-1.5">
            Múltiplos resultados
          </button>
        </div>

        {/* Linhas de resultados */}
        <div className="space-y-3">
          {resultados.map((r, i) => (
            <div key={i} className="flex items-end gap-2 sm:gap-3">
              {/* Nome */}
              <div className="flex-1 min-w-0">
                <label className="label" htmlFor={`nome-${i}`}>
                  {i === 0 ? 'Nome do resultado (opcional)' : `Resultado ${i + 1}`}
                </label>
                <input
                  id={`nome-${i}`}
                  type="text"
                  className="input-field"
                  placeholder={['Casa', 'Empate', 'Fora', 'Sim', 'Não', 'Over', 'Under'][i] ?? `Resultado ${i + 1}`}
                  value={r.nome}
                  onChange={e => atualizar(i, 'nome', e.target.value)}
                />
              </div>
              {/* Odd */}
              <div style={{ width: '120px', flexShrink: 0 }}>
                <label className="label" htmlFor={`odd-${i}`}>Odd decimal</label>
                <input
                  id={`odd-${i}`}
                  type="text"
                  inputMode="decimal"
                  className="input-field"
                  placeholder="ex: 1.90"
                  value={r.odd}
                  onChange={e => atualizar(i, 'odd', e.target.value)}
                />
              </div>
              {/* Remover */}
              {resultados.length > 2 && (
                <button
                  type="button"
                  aria-label={`Remover resultado ${i + 1}`}
                  onClick={() => remover(i)}
                  className="mb-px p-2.5 rounded-xl transition-colors flex-shrink-0"
                  style={{ color: 'var(--red)', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Adicionar resultado */}
        <button
          type="button"
          onClick={adicionar}
          className="text-xs font-medium flex items-center gap-1.5 transition-colors"
          style={{ color: 'var(--cyan)' }}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Adicionar resultado
        </button>

        {/* Erro */}
        {erro && (
          <p className="text-sm rounded-xl px-4 py-3" style={{ color: '#f87171', background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.18)' }}>
            {erro}
          </p>
        )}

        {/* Botões de ação */}
        <div className="flex gap-3 flex-wrap">
          <button type="button" onClick={calcular} className="btn-primary flex-1 sm:flex-none">
            Calcular margem
          </button>
          <button type="button" onClick={limpar} className="btn-ghost text-xs px-4 py-2">
            Limpar
          </button>
        </div>

        {/* Resultados */}
        {calculado && allValid && (
          <div className="space-y-4" aria-live="polite">

            {/* Resumo do mercado */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="result-box col-span-1">
                <p className="result-value" style={{ color: interpretacao.cor }}>
                  {overroundPct.toFixed(2)}%
                </p>
                <p className="result-label">Margem da casa</p>
              </div>
              <div className="result-box col-span-1">
                <p className="result-value">{(soma * 100).toFixed(2)}%</p>
                <p className="result-label">Soma probabilidades</p>
              </div>
              <div className="result-box col-span-1">
                <p className="result-value" style={{ color: '#4ade80' }}>{payoutPct.toFixed(2)}%</p>
                <p className="result-label">Payout teórico</p>
              </div>
              <div className="result-box col-span-1">
                <p className="result-value" style={{ color: '#818cf8' }}>{resultados.length}</p>
                <p className="result-label">Resultados</p>
              </div>
            </div>

            {/* Interpretação */}
            <div className="rounded-xl px-4 py-3.5 flex gap-3" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${interpretacao.cor}30` }}>
              <span className="mt-0.5 flex-shrink-0" style={{ color: interpretacao.cor }}>●</span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{interpretacao.texto}</p>
            </div>

            {/* Tabela por resultado */}
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              {/* Cabeçalho desktop */}
              <div
                className="hidden sm:grid text-xs font-semibold px-4 py-2.5"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--text-3)',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                  gap: '8px',
                }}
              >
                <span>Resultado</span>
                <span className="text-right">Odd</span>
                <span className="text-right">Prob. implícita</span>
                <span className="text-right">Prob. sem margem</span>
                <span className="text-right">Odd justa</span>
              </div>

              <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                {linhas.map((l, i) => (
                  <div key={i}>
                    {/* Desktop row */}
                    <div
                      className="hidden sm:grid items-center px-4 py-3 text-sm"
                      style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '8px' }}
                    >
                      <span className="font-medium truncate" style={{ color: 'var(--text-1)' }}>{l.nome}</span>
                      <span className="text-right tabular-nums" style={{ color: 'var(--text-2)' }}>{l.odd.toFixed(2)}</span>
                      <span className="text-right tabular-nums font-medium" style={{ color: 'var(--text-1)' }}>{l.probImpl.toFixed(2)}%</span>
                      <span className="text-right tabular-nums" style={{ color: '#22d3ee' }}>{l.probNorm.toFixed(2)}%</span>
                      <span className="text-right tabular-nums" style={{ color: '#818cf8' }}>{l.oddJusta.toFixed(2)}</span>
                    </div>
                    {/* Mobile card */}
                    <div className="sm:hidden px-4 py-3 space-y-2">
                      <p className="font-semibold text-sm" style={{ color: 'var(--text-1)' }}>{l.nome}</p>
                      <div className="grid grid-cols-2 gap-y-1 text-xs">
                        <span style={{ color: 'var(--text-3)' }}>Odd informada</span>
                        <span className="text-right tabular-nums" style={{ color: 'var(--text-2)' }}>{l.odd.toFixed(2)}</span>
                        <span style={{ color: 'var(--text-3)' }}>Prob. implícita</span>
                        <span className="text-right tabular-nums font-medium" style={{ color: 'var(--text-1)' }}>{l.probImpl.toFixed(2)}%</span>
                        <span style={{ color: 'var(--text-3)' }}>Prob. sem margem</span>
                        <span className="text-right tabular-nums" style={{ color: '#22d3ee' }}>{l.probNorm.toFixed(2)}%</span>
                        <span style={{ color: 'var(--text-3)' }}>Odd justa</span>
                        <span className="text-right tabular-nums" style={{ color: '#818cf8' }}>{l.oddJusta.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Callout educativo */}
            <div className="rounded-xl px-4 py-3.5" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)' }}>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
                <span style={{ color: '#fbbf24' }}>⚠ </span>
                O cálculo mostra a margem embutida nas odds informadas. Ele não prevê resultados, não garanta vantagem e não é uma recomendação de aposta. Apostas envolvem risco financeiro. +18.
              </p>
            </div>
          </div>
        )}

        {/* Links relacionados */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          <Link to="/calculadoras/conversor-odds" className="btn-ghost text-xs px-3 py-2">Converter odds</Link>
          <Link to="/calculadoras/arbitragem" className="btn-ghost text-xs px-3 py-2">Calculadora de arbitragem</Link>
          <Link to="/calculadoras/gestao-banca" className="btn-ghost text-xs px-3 py-2">Gestão de banca</Link>
        </div>
      </div>
    </CalcLayout>
  );
}
