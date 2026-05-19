import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

// ─── FAQ ────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'O que é value bet?',
    a: 'Value bet, ou aposta de valor, ocorre quando a probabilidade estimada pelo apostador para um resultado é maior do que a probabilidade implícita da odd oferecida. Em outras palavras: a odd está acima do que seria "justo" segundo sua estimativa. Isso não garante vitória — indica apenas que, matematicamente, a aposta teria valor esperado positivo se a estimativa estiver correta.',
  },
  {
    q: 'O que é EV em apostas?',
    a: 'EV significa Expected Value, ou valor esperado em português. É uma medida matemática que estima o resultado médio de uma aposta repetida infinitas vezes com as mesmas condições. EV positivo indica que, em média, a aposta teria retorno positivo — mas isso não garante lucro em uma aposta individual.',
  },
  {
    q: 'Como calcular valor esperado em apostas?',
    a: 'A fórmula é: EV = (Probabilidade de vitória × Lucro potencial) − (Probabilidade de perda × Valor apostado). Você precisa da odd decimal, do valor apostado e da sua estimativa de probabilidade de vitória para o cálculo. A calculadora acima automatiza todos os passos.',
  },
  {
    q: 'Qual é a fórmula do EV?',
    a: 'EV = (P × Lucro) − ((1 − P) × Stake). Onde P é a probabilidade estimada de vitória (em decimal), Lucro é o lucro potencial caso a aposta vença (Stake × (Odd − 1)) e Stake é o valor apostado. O resultado positivo indica EV positivo; negativo indica EV negativo.',
  },
  {
    q: 'O que é EV positivo?',
    a: 'EV positivo significa que o valor esperado matemático da aposta é favorável ao apostador com base nas probabilidades inseridas. Ocorre quando a probabilidade estimada é maior que a probabilidade implícita da odd. Não garante lucro imediato — apenas indica que a aposta parece ter valor matemático se a estimativa for correta.',
  },
  {
    q: 'EV positivo garante lucro?',
    a: 'Não. EV positivo é uma estimativa matemática baseada em probabilidades. Uma aposta com EV positivo pode perder, assim como uma aposta com EV negativo pode vencer. O resultado individual é sempre incerto. O EV se manifesta como tendência em um grande volume de apostas, e apenas se a estimativa de probabilidade for precisa.',
  },
  {
    q: 'O que é edge em apostas?',
    a: 'Edge é a diferença entre a probabilidade estimada pelo apostador e a probabilidade implícita da odd. Exemplo: se a odd implica 45% e você estima 50%, o edge é de 5 pontos percentuais. Edge positivo indica que sua estimativa está acima da probabilidade implícita. Edge não garante acerto — depende da qualidade da estimativa.',
  },
  {
    q: 'Como calcular edge?',
    a: 'Edge = Probabilidade estimada (%) − Probabilidade implícita (%). A probabilidade implícita é calculada como (1 ÷ odd) × 100. Se sua probabilidade estimada for 52% e a probabilidade implícita for 45,45% (odd 2.20), o edge é de 6,55 pontos percentuais.',
  },
  {
    q: 'Qual a diferença entre odd alta e value bet?',
    a: 'Odd alta não significa automaticamente boa aposta ou value bet. Uma odd de 10.00 pode ter EV negativo se a probabilidade real for menor que 10%. O valor de uma aposta depende da relação entre a odd e a probabilidade real estimada do evento — não apenas da cotação absoluta. Uma odd baixa também pode ter valor se a probabilidade real for maior que a implícita.',
  },
  {
    q: 'Como usar uma calculadora de value bet?',
    a: 'Insira o valor da aposta, a odd decimal e sua probabilidade estimada para o resultado. A calculadora calcula automaticamente a probabilidade implícita, o edge, o EV em reais e o EV percentual. Use o resultado como apoio matemático para avaliar a aposta — não como garantia de lucro.',
  },
  {
    q: 'O que é probabilidade implícita?',
    a: 'Probabilidade implícita é a probabilidade de vitória que a odd representa matematicamente. Calcula-se como (1 ÷ odd) × 100. Exemplo: odd 2.20 → probabilidade implícita de 45,45%. Essa probabilidade inclui a margem da casa, ou seja, está ligeiramente abaixo do valor justo. Se sua estimativa real for maior que essa, pode haver edge.',
  },
  {
    q: 'Value bet funciona em apostas múltiplas?',
    a: 'Tecnicamente, em apostas múltiplas o EV de cada seleção se multiplica. Se todas as seleções tiverem EV positivo individualmente, a múltipla pode ter EV positivo — mas a variância aumenta significativamente. Esta calculadora analisa apostas simples. Para múltiplas, o risco e a complexidade são maiores.',
  },
  {
    q: 'Qual a relação entre value bet e ROI?',
    a: 'Value bet é a análise antes da aposta (estimativa de valor com base em EV e edge). ROI é a medição de desempenho depois das apostas (retorno sobre investimento real). Apostar consistentemente com EV positivo é uma das estratégias que busca melhorar o ROI no longo prazo — mas o ROI real depende do volume de apostas, da precisão das estimativas e da variância.',
  },
  {
    q: 'Qual a relação entre value bet e Critério de Kelly?',
    a: 'O Critério de Kelly usa a probabilidade estimada e a odd para calcular o tamanho ideal da stake em relação à banca. Ele pressupõe que a aposta tem EV positivo para funcionar. Em outras palavras, identificar um value bet (EV positivo) é o primeiro passo; o Kelly determina quanto apostar. Use a calculadora de gestão de banca para o cálculo de Kelly.',
  },
  {
    q: 'A calculadora de value bet prevê resultados?',
    a: 'Não. A calculadora aplica fórmulas matemáticas com base nos dados inseridos. Ela não prevê resultados esportivos, não acessa dados de eventos em tempo real e não garante qualquer retorno. O resultado depende totalmente da qualidade da probabilidade estimada pelo usuário. Apostas envolvem risco e incerteza inerentes.',
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
    red:   { bg: 'rgba(248,113,113,0.07)', border: 'rgba(248,113,113,0.18)', color: '#f87171', icon: '✗'  },
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

      <header className="space-y-4">
        <span className="badge badge-cyan">Guia educativo completo</span>
        <h2 className="section-title">Value bet e valor esperado: conceitos matemáticos para apostas esportivas</h2>
        <p className="text-base leading-relaxed" style={t}>
          A calculadora de value bet do CalculaBet foi criada para quem deseja entender como calcular o valor esperado de uma aposta, identificar o edge e analisar a probabilidade implícita de uma odd. O conteúdo abaixo explica cada conceito com fórmulas e exemplos práticos. Esta ferramenta é exclusivamente educativa e matemática — não prevê resultados nem recomenda apostas.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          ['Para que serve', 'Calcular EV, edge e probabilidade implícita com base na odd e na sua estimativa de probabilidade.'],
          ['O que entrega', 'Retorno potencial, lucro, probabilidade implícita, edge, EV em reais e EV percentual.'],
          ['Para quem', 'Apostadores que querem analisar matematicamente uma odd antes de decidir apostar.'],
        ].map(([title, body]) => (
          <div key={title} className="rounded-2xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <p className="text-xs font-semibold mb-2" style={muted}>{title}</p>
            <p className="text-sm leading-relaxed" style={t}>{body}</p>
          </div>
        ))}
      </div>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>O que é value bet?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Value bet significa "aposta de valor" em inglês. O conceito descreve uma situação em que a probabilidade estimada pelo apostador para um determinado resultado é maior do que a probabilidade implícita da odd oferecida pela plataforma de apostas.
          </p>
          <p>
            Em outras palavras: a odd está acima do que deveria ser, segundo sua análise. Isso não significa que a aposta vai vencer — significa que, se a estimativa de probabilidade estiver correta, o valor esperado matemático é positivo.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl p-4" style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.12)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: '#4ade80' }}>Value bet (possível edge)</p>
              <p className="text-xs" style={t}>Probabilidade estimada {'>'} probabilidade implícita</p>
              <p className="text-xs mt-1" style={t}>Exemplo: estima 55%, odd implica 45%</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: 'rgba(248,113,113,0.04)', border: '1px solid rgba(248,113,113,0.12)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: '#f87171' }}>Sem value (EV negativo)</p>
              <p className="text-xs" style={t}>Probabilidade estimada {'<'} probabilidade implícita</p>
              <p className="text-xs mt-1" style={t}>Exemplo: estima 40%, odd implica 50%</p>
            </div>
          </div>

          <InfoNote>
            Value bet depende totalmente da qualidade da probabilidade estimada. Uma estimativa imprecisa pode levar a um EV calculado incorretamente. A calculadora aplica fórmulas — o julgamento e a análise são responsabilidade do usuário.
          </InfoNote>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>O que é valor esperado em apostas?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Valor esperado, ou Expected Value (EV), é uma medida estatística que estima o resultado médio de uma aposta se ela fosse repetida infinitas vezes nas mesmas condições. É um dos conceitos mais importantes da teoria das probabilidades aplicada a apostas.
          </p>
          <p>
            O EV pode ser positivo, neutro ou negativo:
          </p>
          <div className="space-y-2">
            {[
              { label: 'EV positivo', cor: '#4ade80', desc: 'Em média, a aposta geraria retorno positivo com essas probabilidades. Não garante resultado individual.' },
              { label: 'EV neutro (≈ 0)', cor: '#fbbf24', desc: 'A aposta está próxima do ponto de equilíbrio matemático. Pequenas variações mudam o resultado.' },
              { label: 'EV negativo', cor: '#f87171', desc: 'Em média, a aposta geraria retorno negativo. A odd não compensa a probabilidade estimada.' },
            ].map(({ label, cor, desc }) => (
              <div key={label} className="flex gap-3 rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${cor}25` }}>
                <span className="font-semibold text-xs mt-0.5 flex-shrink-0" style={{ color: cor }}>{label}</span>
                <p className="text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <InfoNote tone="amber">
            EV positivo não garante lucro em uma aposta individual. Resultados individuais são sempre incertos. O EV é uma tendência estatística, não uma previsão.
          </InfoNote>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Como calcular value bet — passo a passo</h2>
        <div className="space-y-5 text-sm leading-relaxed" style={t}>
          <ol className="space-y-3 list-none">
            {[
              ['1', 'Identifique a odd decimal da seleção que deseja analisar.'],
              ['2', 'Calcule a probabilidade implícita: divida 1 pela odd e multiplique por 100.'],
              ['3', 'Estime sua probabilidade real para o resultado com base em análise própria.'],
              ['4', 'Compare: se sua estimativa for maior que a probabilidade implícita, pode haver edge positivo.'],
              ['5', 'Calcule o EV com a fórmula abaixo.'],
              ['6', 'Avalie o risco, a banca disponível e decida com responsabilidade.'],
            ].map(([n, text]) => (
              <li key={n} className="flex gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(34,211,238,0.12)', color: '#22d3ee' }}>{n}</span>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Fórmula do valor esperado</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            A fórmula do EV em apostas esportivas combina as probabilidades de vitória e derrota com os valores financeiros associados a cada cenário:
          </p>

          <CodeBlock label="Fórmula principal do EV">
            <Formula color="#22d3ee">EV = (P_vitória × Lucro potencial) − (P_derrota × Stake)</Formula>
            <Formula color="#f0f2f7"> </Formula>
            <Formula color="#818cf8">Onde:</Formula>
            <Formula color="#818cf8">P_vitória = probabilidade estimada (decimal, ex: 0,50 para 50%)</Formula>
            <Formula color="#818cf8">Lucro potencial = Stake × (Odd − 1)</Formula>
            <Formula color="#818cf8">P_derrota = 1 − P_vitória</Formula>
            <Formula color="#818cf8">Stake = valor apostado</Formula>
          </CodeBlock>

          <CodeBlock label="Exemplo resolvido — Stake R$100 | Odd 2.20 | Prob. estimada 50%">
            <Formula color="#22d3ee">Lucro potencial = 100 × (2.20 − 1) = R$120</Formula>
            <Formula color="#22d3ee">P_vitória = 0,50 | P_derrota = 0,50</Formula>
            <Formula color="#4ade80">EV = (0,50 × 120) − (0,50 × 100)</Formula>
            <Formula color="#4ade80">EV = 60 − 50 = R$10</Formula>
            <Formula color="#fbbf24">EV% = (10 ÷ 100) × 100 = 10%</Formula>
          </CodeBlock>

          <p>
            Nesse exemplo, o EV positivo de R$10 significa que, em média e se a probabilidade estimada de 50% estiver correta, a aposta geraria R$10 de retorno esperado por R$100 apostados. O resultado individual de cada aposta é sempre incerto.
          </p>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>O que é edge em apostas?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Edge é a diferença em pontos percentuais entre a probabilidade estimada pelo apostador e a probabilidade implícita da odd. Representa a vantagem teórica que a aposta oferece, segundo a estimativa.
          </p>

          <CodeBlock label="Fórmula do edge">
            <Formula color="#22d3ee">Probabilidade implícita = (1 ÷ Odd) × 100</Formula>
            <Formula color="#4ade80">Edge = Probabilidade estimada (%) − Probabilidade implícita (%)</Formula>
          </CodeBlock>

          <CodeBlock label="Exemplo — Odd 2.20 | Probabilidade estimada: 50%">
            <Formula color="#22d3ee">Prob. implícita = (1 ÷ 2.20) × 100 = 45,45%</Formula>
            <Formula color="#4ade80">Edge = 50% − 45,45% = +4,55 p.p.</Formula>
          </CodeBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl p-4" style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.12)' }}>
              <p className="text-xs font-semibold mb-1.5" style={{ color: '#4ade80' }}>Edge positivo</p>
              <p className="text-xs" style={t}>Sua estimativa é maior que a probabilidade implícita. Indica possível valor na aposta segundo sua análise.</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: 'rgba(248,113,113,0.04)', border: '1px solid rgba(248,113,113,0.12)' }}>
              <p className="text-xs font-semibold mb-1.5" style={{ color: '#f87171' }}>Edge negativo</p>
              <p className="text-xs" style={t}>A probabilidade implícita é maior que sua estimativa. Matematicamente, não há valor com essas premissas.</p>
            </div>
          </div>

          <InfoNote>
            Edge é calculado a partir de uma estimativa. Quanto mais precisa e fundamentada for a estimativa, mais relevante será o edge calculado. Edge sem base de análise não tem significado matemático confiável.
          </InfoNote>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Qual a diferença entre odd alta e value bet?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Esse é um dos erros mais comuns: confundir uma odd alta com uma boa aposta ou com um value bet. O valor de uma aposta não depende do tamanho absoluto da odd — depende da relação entre a odd e a probabilidade real estimada.
          </p>

          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <div className="grid px-4 py-2.5 text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)', color: 'var(--text-3)', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}>
              <span>Cenário</span>
              <span className="text-right">Odd</span>
              <span className="text-right">Prob. implícita</span>
              <span className="text-right">Estimativa</span>
            </div>
            {[
              ['Odd alta, sem valor', '10.00', '10,00%', '8% → EV negativo', '#f87171'],
              ['Odd baixa, com valor', '1.50', '66,67%', '72% → EV positivo', '#4ade80'],
              ['Odd média, neutro', '2.00', '50,00%', '50% → EV neutro', '#fbbf24'],
              ['Odd média, com valor', '2.20', '45,45%', '55% → EV positivo', '#4ade80'],
            ].map(([c, o, pi, est, cor]) => (
              <div key={c} className="grid px-4 py-3 text-xs" style={{ borderBottom: '1px solid var(--border)', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}>
                <span style={{ color: 'var(--text-2)' }}>{c}</span>
                <span className="text-right tabular-nums" style={{ color: 'var(--text-2)' }}>{o}</span>
                <span className="text-right tabular-nums" style={{ color: 'var(--text-2)' }}>{pi}</span>
                <span className="text-right" style={{ color: cor }}>{est}</span>
              </div>
            ))}
          </div>

          <p>
            Como mostrado acima, uma odd de 1.50 pode ter EV positivo se a probabilidade real for alta o suficiente. Uma odd de 10.00 pode ter EV negativo se a probabilidade real for menor que 10%.
          </p>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Como usar a Calculadora de Value Bet do CalculaBet</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <ol className="space-y-3 list-none">
            {[
              ['1', 'Informe o valor da aposta em reais que você pretende analisar.'],
              ['2', 'Digite a odd decimal da seleção. Use ponto ou vírgula como separador decimal.'],
              ['3', 'Informe sua probabilidade estimada para o resultado em percentual.'],
              ['4', 'Opcionalmente, nomeie o evento ou a seleção para facilitar a leitura.'],
              ['5', 'Clique em "Calcular value bet".'],
              ['6', 'Analise a probabilidade implícita, o edge, o EV em reais e o EV percentual.'],
              ['7', 'Use o resultado apenas como apoio matemático — a decisão final é sempre sua.'],
            ].map(([n, text]) => (
              <li key={n} className="flex gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(34,197,94,0.12)', color: '#4ade80' }}>{n}</span>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Value bet, ROI e gestão de banca</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Value bet, ROI e gestão de banca são conceitos distintos mas complementares na análise de apostas esportivas:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              ['Value bet', 'Análise feita antes da aposta. Avalia se uma odd tem valor esperado positivo com base na estimativa de probabilidade.', '#22d3ee'],
              ['ROI', 'Medição feita depois das apostas. Mede o retorno real obtido em relação ao total apostado em um período.', '#818cf8'],
              ['Gestão de banca', 'Define quanto apostar em cada oportunidade para controlar o risco e a exposição financeira da banca.', '#4ade80'],
            ].map(([title, body, cor]) => (
              <div key={title} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${cor}20` }}>
                <p className="font-semibold text-xs mb-1.5" style={{ color: cor }}>{title}</p>
                <p className="text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <p>
            Mesmo com EV positivo calculado, uma aposta pode perder. E perder várias seguidas pode prejudicar a banca. Por isso, é essencial combinar a análise de value bet com uma gestão de banca adequada e um registro rigoroso de resultados.
          </p>

          <div className="flex flex-wrap gap-2">
            <Link to="/calculadoras/roi" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: '#818cf8', background: 'rgba(129,140,248,0.07)', border: '1px solid rgba(129,140,248,0.15)' }}>
              Calculadora de ROI →
            </Link>
            <Link to="/calculadoras/gestao-banca" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: '#4ade80', background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.15)' }}>
              Gestão de Banca →
            </Link>
            <Link to="/blog/roi-apostas" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
              Artigo: ROI em apostas →
            </Link>
          </div>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Value bet e probabilidade implícita</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            A probabilidade implícita é o ponto de partida para identificar um possível value bet. Ela representa a probabilidade embutida na odd pela plataforma de apostas — que inclui a margem da casa.
          </p>

          <CodeBlock label="Fórmula da probabilidade implícita">
            <Formula color="#22d3ee">Probabilidade implícita (%) = (1 ÷ Odd) × 100</Formula>
          </CodeBlock>

          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <div className="grid px-4 py-2.5 text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)', color: 'var(--text-3)', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <span>Odd decimal</span>
              <span className="text-right">Probabilidade implícita</span>
            </div>
            {[['1.50', '66,67%'], ['2.00', '50,00%'], ['2.20', '45,45%'], ['3.00', '33,33%'], ['5.00', '20,00%'], ['10.00', '10,00%']].map(([odd, prob]) => (
              <div key={odd} className="grid px-4 py-2.5 text-xs" style={{ borderBottom: '1px solid var(--border)', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <span style={{ color: 'var(--text-2)' }}>{odd}</span>
                <span className="text-right tabular-nums font-medium" style={{ color: '#22d3ee' }}>{prob}</span>
              </div>
            ))}
          </div>

          <p>
            Para haver possível edge, sua estimativa de probabilidade precisa ser maior que a probabilidade implícita da odd. Quanto maior a diferença, maior o edge — e maior o EV positivo calculado.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to="/calculadoras/odds" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: '#22d3ee', background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.15)' }}>
              Calculadora de Odds →
            </Link>
            <Link to="/blog/probabilidade-implicita-odds" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
              Probabilidade implícita →
            </Link>
          </div>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Value bet e overround</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            O overround é a soma das probabilidades implícitas de todos os resultados de um mercado. Ele representa a margem embutida pela plataforma de apostas. Um overround menor indica que as odds estão mais próximas do valor justo — o que pode facilitar encontrar value bets, mas não garante que eles existam.
          </p>
          <p>
            Para identificar um value bet, o que importa é a relação entre a odd de um resultado específico e sua estimativa de probabilidade real — não o overround do mercado como um todo. Um mercado com margem baixa pode não ter nenhum value bet se a precificação for eficiente.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to="/calculadoras/overround" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: '#818cf8', background: 'rgba(129,140,248,0.07)', border: '1px solid rgba(129,140,248,0.15)' }}>
              Calculadora de Margem da Casa →
            </Link>
            <Link to="/blog/overround-apostas" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
              Artigo: overround em apostas →
            </Link>
          </div>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Erros comuns ao procurar value bet</h2>
        <div className="space-y-3 text-sm leading-relaxed" style={t}>
          {[
            ['Achar que odd alta é sempre boa', 'O valor depende da relação com a probabilidade real — não do tamanho da cotação.'],
            ['Inventar probabilidade sem método', 'Uma estimativa sem base de análise não tem valor matemático. O EV calculado perde sentido.'],
            ['Ignorar a margem da casa', 'A probabilidade implícita já inclui a margem. Comparar sem considerar isso pode distorcer a análise.'],
            ['Não calcular a probabilidade implícita', 'Sem conhecer a probabilidade implícita, é impossível saber se há edge real na aposta.'],
            ['Confundir palpite com estimativa', 'Uma estimativa deve ter base: estatísticas, histórico, contexto do evento — não intuição isolada.'],
            ['Não registrar resultados', 'Sem registro, é impossível saber se suas estimativas são precisas no longo prazo.'],
            ['Não usar gestão de banca', 'EV positivo não protege a banca se a exposição por aposta for descontrolada.'],
            ['Achar que EV positivo garante lucro', 'O EV é uma tendência estatística. Cada aposta individual tem resultado incerto.'],
            ['Apostar por emoção', 'Value bet exige disciplina e análise — não urgência emocional ou preferência por times.'],
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
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>A calculadora de value bet garante lucro?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Não. A calculadora aplica fórmulas matemáticas com base nos dados inseridos pelo usuário. O resultado depende totalmente da qualidade da probabilidade estimada. Se a estimativa estiver incorreta, o EV calculado não reflete a realidade do evento.
          </p>
          <p>
            Apostas esportivas envolvem incerteza inerente. Resultados são imprevisíveis. Uma aposta com EV positivo calculado pode perder, e uma com EV negativo pode vencer. O CalculaBet é uma plataforma educativa — não é uma casa de apostas e não realiza apostas em nome de ninguém.
          </p>
          <InfoNote tone="amber">
            A ferramenta ajuda no cálculo matemático. A responsabilidade pela análise, pela decisão de apostar e pelo controle financeiro é sempre do usuário.
          </InfoNote>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Conclusão</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Value bet é um conceito matemático que compara a probabilidade estimada com a probabilidade implícita da odd. EV mede o valor esperado da aposta. Edge mostra a diferença entre as probabilidades em pontos percentuais. Nenhum desses conceitos garante resultado — todos dependem da precisão da estimativa e da disciplina do apostador.
          </p>
          <ul className="space-y-2 list-none">
            {[
              'A probabilidade implícita vem da odd e inclui a margem da casa.',
              'Edge positivo indica possível valor segundo sua estimativa.',
              'EV positivo não garante resultado em nenhuma aposta individual.',
              'A qualidade da estimativa determina a utilidade do cálculo.',
              'Gestão de banca e registro de resultados são essenciais.',
            ].map(item => (
              <li key={item} className="flex gap-2.5 text-sm">
                <span style={{ color: '#4ade80', flexShrink: 0 }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl p-4 text-center" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.15)' }}>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
              Use a Calculadora de Value Bet do CalculaBet para calcular EV, edge e probabilidade implícita antes de avaliar uma odd.
            </p>
          </div>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Ferramentas e artigos relacionados</h2>
        <p className="text-sm leading-relaxed mb-5" style={t}>
          Combine a análise de value bet com outras ferramentas e conteúdos educativos do CalculaBet.
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold mb-2" style={muted}>Calculadoras</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                ['/calculadoras/odds', 'Calculadora de Odds', 'Calcule retorno, lucro e probabilidade implícita de qualquer aposta.'],
                ['/calculadoras/roi', 'ROI em Apostas', 'Calcule o retorno sobre investimento e analise sua performance.'],
                ['/calculadoras/gestao-banca', 'Gestão de Banca', 'Aplique Kelly Criterion e outros métodos para controlar sua banca.'],
                ['/calculadoras/overround', 'Margem da Casa', 'Calcule o overround e as odds justas de qualquer mercado.'],
                ['/calculadoras/conversor-odds', 'Conversor de Odds', 'Converta odds decimais, americanas e fracionárias.'],
                ['/calculadoras/multipla-parlay', 'Múltipla / Parlay', 'Calcule o retorno combinado de múltiplas seleções.'],
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
                ['/blog/value-bet-o-que-e', 'O que é value bet'],
                ['/blog/probabilidade-implicita-odds', 'Probabilidade implícita nas odds'],
                ['/blog/overround-apostas', 'Overround em apostas'],
                ['/blog/roi-apostas', 'ROI em apostas'],
                ['/blog/criterio-de-kelly-apostas', 'Critério de Kelly'],
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
            <Link to="/ferramentas" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
              Todas as calculadoras
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

// ─── Calculator logic ─────────────────────────────────────────────────────────

function parseNum(v) {
  if (typeof v === 'string') v = v.replace(',', '.');
  return parseFloat(v);
}

const EXEMPLO = {
  stake: '100',
  odd: '2.20',
  prob: '50',
  nome: 'Time A vence',
};

function interpretarEV(ev) {
  if (ev > 0.5) {
    return {
      status: 'EV positivo',
      cor: '#4ade80',
      corBg: 'rgba(34,197,94,0.06)',
      corBorder: 'rgba(34,197,94,0.20)',
      texto: 'Com os dados inseridos, o cálculo indica valor esperado positivo. Isso não garante lucro em uma aposta individual e depende totalmente da qualidade da probabilidade estimada.',
    };
  }
  if (ev >= -0.5) {
    return {
      status: 'EV neutro',
      cor: '#fbbf24',
      corBg: 'rgba(251,191,36,0.06)',
      corBorder: 'rgba(251,191,36,0.20)',
      texto: 'Com os dados inseridos, o cálculo indica valor esperado próximo de neutro. Pequenas mudanças na odd ou na probabilidade estimada podem alterar o resultado.',
    };
  }
  return {
    status: 'EV negativo',
    cor: '#f87171',
    corBg: 'rgba(248,113,113,0.06)',
    corBorder: 'rgba(248,113,113,0.20)',
    texto: 'Com os dados inseridos, o cálculo indica valor esperado negativo. Isso significa que, matematicamente, a aposta não parece ter valor com essas premissas.',
  };
}

// ─── Main Calculator ──────────────────────────────────────────────────────────

export default function ValueBet() {
  const [stake, setStake] = useState('');
  const [odd, setOdd] = useState('');
  const [prob, setProb] = useState('');
  const [nome, setNome] = useState('');
  const [calculado, setCalculado] = useState(false);
  const [erros, setErros] = useState({});

  const limpar = () => {
    setStake('');
    setOdd('');
    setProb('');
    setNome('');
    setCalculado(false);
    setErros({});
  };

  const carregarExemplo = () => {
    setStake(EXEMPLO.stake);
    setOdd(EXEMPLO.odd);
    setProb(EXEMPLO.prob);
    setNome(EXEMPLO.nome);
    setCalculado(false);
    setErros({});
  };

  const calcular = () => {
    const novosErros = {};
    const stakeN = parseNum(stake);
    const oddN = parseNum(odd);
    const probN = parseNum(prob);

    if (!stake || isNaN(stakeN) || stakeN <= 0) {
      novosErros.stake = 'Insira um valor de aposta válido.';
    }
    if (!odd || isNaN(oddN) || oddN <= 1) {
      novosErros.odd = 'Insira uma odd decimal válida maior que 1.00.';
    }
    if (!prob || isNaN(probN) || probN <= 0 || probN >= 100) {
      novosErros.prob = 'Insira uma probabilidade entre 0% e 100%.';
    }

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      setCalculado(false);
      return;
    }

    setErros({});
    setCalculado(true);
  };

  // Resultados
  const stakeN = parseNum(stake);
  const oddN = parseNum(odd);
  const probN = parseNum(prob);
  const allValid = !isNaN(stakeN) && stakeN > 0 && !isNaN(oddN) && oddN > 1 && !isNaN(probN) && probN > 0 && probN < 100;

  let resultado = null;
  if (calculado && allValid) {
    const retorno = stakeN * oddN;
    const lucro = stakeN * (oddN - 1);
    const probImplicita = (1 / oddN) * 100;
    const pVit = probN / 100;
    const pPerd = 1 - pVit;
    const ev = pVit * lucro - pPerd * stakeN;
    const evPct = (ev / stakeN) * 100;
    const edge = probN - probImplicita;
    const interp = interpretarEV(ev);
    resultado = { retorno, lucro, probImplicita, pVit, pPerd, ev, evPct, edge, interp };
  }

  const inputBase = {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    color: 'var(--text-1)',
  };

  return (
    <CalcLayout
      title="Calculadora de Value Bet: Calcule EV Positivo em Apostas"
      description="Use a calculadora de value bet para calcular valor esperado, EV positivo, probabilidade implícita, edge e retorno potencial de uma aposta."
      slug="value-bet"
      faqs={faqs}
      schema={faqSchema}
      explanation={<Explanation />}
    >
      <div className="space-y-6">

        {/* Instrução */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.14)' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-1)' }}>Como usar</p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Insira o valor da aposta, a odd decimal e sua estimativa de probabilidade para o resultado. A calculadora mostra o EV, edge, probabilidade implícita e interpretação educativa.
          </p>
        </div>

        {/* Botão de exemplo */}
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs self-center" style={{ color: 'var(--text-3)' }}>Atalho:</span>
          <button type="button" onClick={carregarExemplo} className="btn-ghost text-xs px-3 py-1.5">
            Carregar exemplo (R$100 | odd 2.20 | 50%)
          </button>
        </div>

        {/* Campos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Valor da aposta */}
          <div>
            <label className="label" htmlFor="vb-stake">Valor da aposta (R$)</label>
            <input
              id="vb-stake"
              type="text"
              inputMode="decimal"
              className="input-field"
              placeholder="Ex: 100"
              value={stake}
              onChange={e => { setStake(e.target.value); setCalculado(false); setErros(prev => ({ ...prev, stake: undefined })); }}
              style={erros.stake ? { ...inputBase, borderColor: 'rgba(248,113,113,0.5)' } : {}}
            />
            {erros.stake && (
              <p className="text-xs mt-1" style={{ color: '#f87171' }}>{erros.stake}</p>
            )}
          </div>

          {/* Odd decimal */}
          <div>
            <label className="label" htmlFor="vb-odd">Odd decimal</label>
            <input
              id="vb-odd"
              type="text"
              inputMode="decimal"
              className="input-field"
              placeholder="Ex: 2.20"
              value={odd}
              onChange={e => { setOdd(e.target.value); setCalculado(false); setErros(prev => ({ ...prev, odd: undefined })); }}
              style={erros.odd ? { ...inputBase, borderColor: 'rgba(248,113,113,0.5)' } : {}}
            />
            {erros.odd && (
              <p className="text-xs mt-1" style={{ color: '#f87171' }}>{erros.odd}</p>
            )}
          </div>

          {/* Probabilidade estimada */}
          <div>
            <label className="label" htmlFor="vb-prob">Sua probabilidade estimada (%)</label>
            <input
              id="vb-prob"
              type="text"
              inputMode="decimal"
              className="input-field"
              placeholder="Ex: 50"
              value={prob}
              onChange={e => { setProb(e.target.value); setCalculado(false); setErros(prev => ({ ...prev, prob: undefined })); }}
              style={erros.prob ? { ...inputBase, borderColor: 'rgba(248,113,113,0.5)' } : {}}
            />
            {erros.prob && (
              <p className="text-xs mt-1" style={{ color: '#f87171' }}>{erros.prob}</p>
            )}
          </div>

          {/* Nome da seleção */}
          <div>
            <label className="label" htmlFor="vb-nome">Nome da seleção (opcional)</label>
            <input
              id="vb-nome"
              type="text"
              className="input-field"
              placeholder="Ex: Time A vence"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex gap-3 flex-wrap">
          <button type="button" onClick={calcular} className="btn-primary flex-1 sm:flex-none">
            Calcular value bet
          </button>
          <button type="button" onClick={limpar} className="btn-ghost text-xs px-4 py-2">
            Limpar
          </button>
        </div>

        {/* Resultados */}
        {calculado && resultado && (
          <div className="space-y-4" aria-live="polite">

            {/* Nome da seleção */}
            {nome && (
              <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>
                Análise: <span style={{ color: 'var(--text-1)' }}>{nome}</span>
              </p>
            )}

            {/* A) Resumo */}
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Resumo</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="result-box">
                  <p className="result-value">R${stakeN.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <p className="result-label">Valor apostado</p>
                </div>
                <div className="result-box">
                  <p className="result-value">{oddN.toFixed(2)}</p>
                  <p className="result-label">Odd</p>
                </div>
                <div className="result-box">
                  <p className="result-value" style={{ color: '#22d3ee' }}>R${resultado.retorno.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <p className="result-label">Retorno potencial</p>
                </div>
                <div className="result-box">
                  <p className="result-value" style={{ color: '#4ade80' }}>R${resultado.lucro.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <p className="result-label">Lucro potencial</p>
                </div>
              </div>
            </div>

            {/* B) Probabilidades */}
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Probabilidades</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="result-box">
                  <p className="result-value" style={{ color: '#818cf8' }}>{resultado.probImplicita.toFixed(2)}%</p>
                  <p className="result-label">Probabilidade implícita</p>
                </div>
                <div className="result-box">
                  <p className="result-value" style={{ color: '#22d3ee' }}>{probN.toFixed(2)}%</p>
                  <p className="result-label">Probabilidade estimada</p>
                </div>
                <div className="result-box">
                  <p className="result-value" style={{ color: resultado.edge > 0 ? '#4ade80' : resultado.edge < 0 ? '#f87171' : '#fbbf24' }}>
                    {resultado.edge > 0 ? '+' : ''}{resultado.edge.toFixed(2)} p.p.
                  </p>
                  <p className="result-label">Edge</p>
                </div>
              </div>
            </div>

            {/* C) Valor esperado */}
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Valor esperado (EV)</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="result-box col-span-1">
                  <p className="result-value" style={{ color: resultado.interp.cor }}>
                    {resultado.ev >= 0 ? '+' : ''}R${resultado.ev.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="result-label">EV em R$</p>
                </div>
                <div className="result-box col-span-1">
                  <p className="result-value" style={{ color: resultado.interp.cor }}>
                    {resultado.evPct >= 0 ? '+' : ''}{resultado.evPct.toFixed(2)}%
                  </p>
                  <p className="result-label">EV percentual</p>
                </div>
                <div className="result-box col-span-1" style={{ background: resultado.interp.corBg, borderColor: resultado.interp.corBorder }}>
                  <p className="result-value" style={{ color: resultado.interp.cor }}>{resultado.interp.status}</p>
                  <p className="result-label">Status</p>
                </div>
              </div>
            </div>

            {/* D) Interpretação */}
            <div className="rounded-xl px-4 py-3.5 flex gap-3" style={{ background: resultado.interp.corBg, border: `1px solid ${resultado.interp.corBorder}` }}>
              <span className="mt-0.5 flex-shrink-0" style={{ color: resultado.interp.cor }}>●</span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{resultado.interp.texto}</p>
            </div>

            {/* E) Callout obrigatório */}
            <div className="rounded-xl px-4 py-3.5" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)' }}>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
                <span style={{ color: '#fbbf24' }}>⚠ </span>
                EV positivo não garante lucro imediato. Apostas continuam envolvendo risco financeiro. O resultado depende da precisão da probabilidade estimada. +18. O CalculaBet não é uma casa de apostas.
              </p>
            </div>

            {/* Detalhamento do cálculo */}
            <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
              <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Detalhamento do cálculo</p>
              <div className="space-y-1.5 text-xs font-mono" style={{ color: 'var(--text-2)' }}>
                <p>Retorno potencial = {stakeN.toFixed(2)} × {oddN.toFixed(2)} = R${resultado.retorno.toFixed(2)}</p>
                <p>Lucro potencial = {stakeN.toFixed(2)} × ({oddN.toFixed(2)} − 1) = R${resultado.lucro.toFixed(2)}</p>
                <p>Prob. implícita = 1 ÷ {oddN.toFixed(2)} = {resultado.probImplicita.toFixed(4)} → {resultado.probImplicita.toFixed(2)}%</p>
                <p>Edge = {probN.toFixed(2)}% − {resultado.probImplicita.toFixed(2)}% = {resultado.edge >= 0 ? '+' : ''}{resultado.edge.toFixed(2)} p.p.</p>
                <p>EV = ({resultado.pVit.toFixed(4)} × {resultado.lucro.toFixed(2)}) − ({resultado.pPerd.toFixed(4)} × {stakeN.toFixed(2)})</p>
                <p style={{ color: resultado.interp.cor }}>EV = {(resultado.pVit * resultado.lucro).toFixed(2)} − {(resultado.pPerd * stakeN).toFixed(2)} = {resultado.ev >= 0 ? '+' : ''}R${resultado.ev.toFixed(2)}</p>
                <p style={{ color: resultado.interp.cor }}>EV% = ({resultado.ev.toFixed(2)} ÷ {stakeN.toFixed(2)}) × 100 = {resultado.evPct >= 0 ? '+' : ''}{resultado.evPct.toFixed(2)}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Links relacionados */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          <Link to="/calculadoras/odds" className="btn-ghost text-xs px-3 py-2">Calculadora de odds</Link>
          <Link to="/calculadoras/gestao-banca" className="btn-ghost text-xs px-3 py-2">Gestão de banca</Link>
          <Link to="/calculadoras/overround" className="btn-ghost text-xs px-3 py-2">Margem da casa</Link>
        </div>
      </div>
    </CalcLayout>
  );
}
