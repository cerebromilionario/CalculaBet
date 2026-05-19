import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

// ─── FAQ ────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'O que são odds justas?',
    a: 'Odds justas são as cotações estimadas que existiriam se um mercado de apostas não tivesse margem da casa embutida. Elas são calculadas normalizando as probabilidades implícitas de cada resultado em relação à soma total das probabilidades do mercado. São uma referência matemática — não representam garantia de valor, lucro ou previsão de resultado.',
  },
  {
    q: 'Como calcular odds justas?',
    a: 'O processo tem quatro etapas: (1) converta cada odd em probabilidade implícita dividindo 1 pela odd; (2) some todas as probabilidades implícitas para obter o overround; (3) normalize cada probabilidade dividindo-a pela soma total; (4) inverta a probabilidade normalizada para obter a odd justa. A calculadora acima automatiza todos esses passos.',
  },
  {
    q: 'Qual é a fórmula das odds justas?',
    a: 'Probabilidade implícita = 1 ÷ Odd. Soma = soma de todas as probabilidades implícitas. Probabilidade justa = Probabilidade implícita ÷ Soma. Odd justa = 1 ÷ Probabilidade justa. A odd justa é sempre maior ou igual à odd oferecida — a diferença representa a margem da casa distribuída naquele resultado.',
  },
  {
    q: 'Qual a diferença entre odd oferecida e odd justa?',
    a: 'A odd oferecida é a cotação publicada pela plataforma de apostas, que inclui a margem da casa. A odd justa é a estimativa sem essa margem. A diferença entre elas representa a parcela da margem embutida naquela cotação específica. Odds justas são sempre maiores ou iguais às odds oferecidas.',
  },
  {
    q: 'Odds justas removem a margem da casa?',
    a: 'Sim, matematicamente. As odds justas são calculadas normalizando as probabilidades implícitas para que somem exatamente 100%, removendo o excedente (overround). O resultado é uma estimativa de como seriam as odds em um mercado sem margem. É um exercício matemático — na prática, mercados sem margem são raros.',
  },
  {
    q: 'Odds justas garantem lucro?',
    a: 'Não. Odds justas são estimativas matemáticas que removem a margem da casa de forma aproximada. Elas não preveem resultados esportivos, não indicam qual aposta vai vencer e não garantem retorno financeiro. Apostas envolvem risco e incerteza inerentes, independentemente das odds justas calculadas.',
  },
  {
    q: 'Qual a relação entre odds justas e overround?',
    a: 'O overround é a soma das probabilidades implícitas de todos os resultados do mercado. Quanto maior o overround acima de 100%, maior a margem embutida e maior a diferença entre odds oferecidas e odds justas. Para calcular odds justas, o overround é o divisor utilizado na normalização das probabilidades.',
  },
  {
    q: 'Qual a relação entre odds justas e value bet?',
    a: 'Odds justas ajudam a entender a precificação do mercado sem margem. Value bet ocorre quando sua estimativa de probabilidade real para um resultado é maior que a probabilidade implícita da odd oferecida. Uma odd oferecida abaixo da odd justa não significa automaticamente value bet — para isso, é necessário comparar com a probabilidade real estimada pelo apostador.',
  },
  {
    q: 'Posso usar odds justas em futebol 1X2?',
    a: 'Sim. Para calcular odds justas em futebol 1X2, insira as odds dos três resultados: vitória do mandante, empate e vitória do visitante. É essencial incluir o empate — sem ele, o cálculo fica incorreto e subestima a margem real do mercado.',
  },
  {
    q: 'Como calcular odds justas em mercado de 2 resultados?',
    a: 'Insira as odds dos dois resultados. Calcule a probabilidade implícita de cada uma. Some as duas. Normalize dividindo cada probabilidade pela soma. Inverta para obter as odds justas. Exemplo: odds 1.90 e 1.90 geram soma 105,26%. Probabilidade justa de cada uma é 52,63 ÷ 1,0526 = 50%. Odd justa: 1 ÷ 0,50 = 2.00.',
  },
  {
    q: 'Preciso inserir todos os resultados do mercado?',
    a: 'Sim. Para calcular odds justas corretamente, é necessário inserir todos os resultados possíveis do mercado analisado. Inserir apenas parte dos resultados gera um overround incorreto e odds justas distorcidas. Em futebol 1X2, são três resultados. Em over/under ou tênis, são dois.',
  },
  {
    q: 'Odds justas são iguais a odds reais?',
    a: 'Não necessariamente. Odds justas são uma estimativa matemática baseada na normalização das probabilidades implícitas das odds oferecidas. Elas representam o preço teórico sem margem — não a probabilidade real do evento. A probabilidade real de um evento depende de análise específica do contexto, histórico e outros fatores.',
  },
  {
    q: 'Como comparar odds justas entre casas?',
    a: 'Calcule as odds justas para o mesmo mercado em plataformas diferentes inserindo as odds de cada casa separadamente. Compare os overrounds resultantes. Uma casa com menor overround para o mesmo mercado terá odds justas mais próximas das odds oferecidas — indicando precificação mais competitiva naquele contexto específico.',
  },
  {
    q: 'A calculadora de odds justas prevê resultados?',
    a: 'Não. A calculadora aplica fórmulas matemáticas com base nas odds inseridas. Ela não prevê resultados esportivos, não acessa dados em tempo real e não garante qualquer retorno financeiro. O objetivo é educativo: entender a estrutura de precificação e a margem embutida em um mercado de apostas.',
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

      <header className="space-y-4">
        <span className="badge badge-cyan">Guia educativo completo</span>
        <h2 className="section-title">Odds justas: como estimar odds sem margem da casa</h2>
        <p className="text-base leading-relaxed" style={t}>
          A calculadora de odds justas do CalculaBet foi criada para quem deseja entender como seriam as cotações de um mercado sem a margem da casa embutida. O conteúdo abaixo explica cada conceito, fórmula e passo a passo com exemplos práticos. Esta ferramenta é exclusivamente educativa — não prevê resultados nem recomenda apostas.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          ['Para que serve', 'Estimar odds aproximadas sem margem da casa e comparar com as cotações oferecidas.'],
          ['O que entrega', 'Probabilidade implícita, overround, probabilidade normalizada e odd justa por resultado.'],
          ['Diferença da calculadora de overround', 'O foco aqui é nas odds justas por resultado — não apenas no overround do mercado como um todo.'],
        ].map(([title, body]) => (
          <div key={title} className="rounded-2xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <p className="text-xs font-semibold mb-2" style={muted}>{title}</p>
            <p className="text-sm leading-relaxed" style={t}>{body}</p>
          </div>
        ))}
      </div>

      {/* O que são odds justas */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>O que são odds justas?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Odds justas são as cotações estimadas que existiriam em um mercado de apostas se não houvesse margem da casa embutida. Toda odd publicada por uma plataforma de apostas inclui uma margem — embutida diretamente nas cotações, não cobrada como taxa visível. Quando essa margem é removida matematicamente, as cotações resultantes são chamadas de odds justas ou odds sem margem.
          </p>
          <p>
            São uma referência de análise, não uma previsão. Saber qual é a odd justa de um resultado ajuda a entender o quanto a odd oferecida foi comprimida pela margem da casa — mas não indica qual aposta tem valor, nem qual resultado vai ocorrer.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl p-4" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: '#22d3ee' }}>Odd oferecida</p>
              <p className="text-xs" style={t}>Cotação publicada pela plataforma. Inclui a margem da casa. Sempre menor ou igual à odd justa.</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: 'rgba(129,140,248,0.04)', border: '1px solid rgba(129,140,248,0.12)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: '#818cf8' }}>Odd justa</p>
              <p className="text-xs" style={t}>Estimativa sem margem. Calculada normalizando as probabilidades implícitas. Sempre maior ou igual à odd oferecida.</p>
            </div>
          </div>
          <InfoNote>
            Odds justas são estimativas matemáticas, não previsões. Elas dependem de todas as odds do mercado sendo inseridas corretamente.
          </InfoNote>
        </div>
      </ContentCard>

      {/* Como calcular odds justas */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Como calcular odds justas?</h2>
        <div className="space-y-5 text-sm leading-relaxed" style={t}>
          <p>
            O cálculo de odds justas segue quatro etapas simples. O processo é sempre o mesmo, independentemente do número de resultados ou do tipo de mercado.
          </p>
          <ol className="space-y-3 list-none">
            {[
              ['1', 'Reúna todas as odds decimais do mercado.'],
              ['2', 'Calcule a probabilidade implícita de cada odd: divida 1 pela odd.'],
              ['3', 'Some todas as probabilidades implícitas. O resultado é o overround.'],
              ['4', 'Normalize cada probabilidade: divida pela soma total.'],
              ['5', 'Transforme a probabilidade normalizada em odd justa: inverta o valor.'],
            ].map(([n, text]) => (
              <li key={n} className="flex gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(34,211,238,0.12)', color: '#22d3ee' }}>{n}</span>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <CodeBlock label="Fórmulas principais">
            <Formula color="#22d3ee">Probabilidade implícita = 1 ÷ Odd</Formula>
            <Formula color="#f0f2f7">Soma (overround) = soma de todas as probabilidades implícitas</Formula>
            <Formula color="#818cf8">Probabilidade justa = Probabilidade implícita ÷ Soma</Formula>
            <Formula color="#4ade80">Odd justa = 1 ÷ Probabilidade justa</Formula>
          </CodeBlock>
        </div>
      </ContentCard>

      {/* Exemplo 1X2 */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Exemplo de odds justas em futebol 1X2</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            O mercado de futebol 1X2 tem três resultados: vitória do mandante, empate e vitória do visitante. Para calcular odds justas, é obrigatório incluir os três — especialmente o empate.
          </p>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <div className="grid px-4 py-2.5 text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)', color: 'var(--text-3)', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '8px' }}>
              <span>Resultado</span>
              <span className="text-right">Odd oferecida</span>
              <span className="text-right">Prob. implícita</span>
              <span className="text-right">Prob. justa</span>
              <span className="text-right">Odd justa</span>
            </div>
            {[
              ['Casa', '2.10', '47,62%', '45,43%', '2.20'],
              ['Empate', '3.40', '29,41%', '28,06%', '3.56'],
              ['Fora', '3.60', '27,78%', '26,50%', '3.77'],
            ].map(([r, o, pi, pj, oj]) => (
              <div key={r} className="grid px-4 py-3 text-xs" style={{ borderBottom: '1px solid var(--border)', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '8px' }}>
                <span style={{ color: 'var(--text-1)' }}>{r}</span>
                <span className="text-right tabular-nums" style={{ color: 'var(--text-2)' }}>{o}</span>
                <span className="text-right tabular-nums" style={{ color: 'var(--text-2)' }}>{pi}</span>
                <span className="text-right tabular-nums" style={{ color: '#22d3ee' }}>{pj}</span>
                <span className="text-right tabular-nums font-semibold" style={{ color: '#818cf8' }}>{oj}</span>
              </div>
            ))}
            <div className="grid px-4 py-3 text-xs font-semibold" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '8px' }}>
              <span style={{ color: 'var(--text-3)' }}>Total</span>
              <span />
              <span className="text-right tabular-nums" style={{ color: '#fbbf24' }}>104,81%</span>
              <span className="text-right tabular-nums" style={{ color: '#4ade80' }}>100,00%</span>
              <span />
            </div>
          </div>
          <CodeBlock label="Cálculo completo">
            <Formula color="#22d3ee">Soma: 47,62% + 29,41% + 27,78% = 104,81%</Formula>
            <Formula color="#fbbf24">Margem: 104,81% − 100% = 4,81%</Formula>
            <Formula color="#818cf8">Odd justa Casa: 1 ÷ (47,62 ÷ 104,81 ÷ 100) = 2.20</Formula>
            <Formula color="#818cf8">Odd justa Empate: 1 ÷ (29,41 ÷ 104,81 ÷ 100) = 3.56</Formula>
            <Formula color="#818cf8">Odd justa Fora: 1 ÷ (27,78 ÷ 104,81 ÷ 100) = 3.77</Formula>
          </CodeBlock>
          <InfoNote tone="amber">
            Nunca calcule odds justas de um mercado 1X2 sem o empate. Omitir o terceiro resultado distorce o overround e gera odds justas incorretas.
          </InfoNote>
        </div>
      </ContentCard>

      {/* Exemplo 2 resultados */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Exemplo de odds justas em mercado de 2 resultados</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Mercados com apenas dois resultados — como tênis, over/under ou ambas marcam — são os mais simples para calcular odds justas. O exemplo abaixo usa o mercado clássico com odds simétricas de 1.90.
          </p>
          <CodeBlock label="Odds 1.90 e 1.90 — mercado de 2 resultados">
            <Formula color="#22d3ee">Prob. implícita A: 1 ÷ 1.90 = 52,63%</Formula>
            <Formula color="#22d3ee">Prob. implícita B: 1 ÷ 1.90 = 52,63%</Formula>
            <Formula color="#f0f2f7">Soma (overround): 105,26%</Formula>
            <Formula color="#fbbf24">Margem: 5,26%</Formula>
            <Formula color="#818cf8">Prob. justa A: 52,63 ÷ 105,26 = 50,00%</Formula>
            <Formula color="#818cf8">Odd justa A: 1 ÷ 0,50 = 2.00</Formula>
            <Formula color="#818cf8">Odd justa B: 1 ÷ 0,50 = 2.00</Formula>
          </CodeBlock>
          <p>
            A margem de 5,26% reduziu ambas as odds de 2.00 (valor justo) para 1.90. Quando a margem é removida pela normalização, as odds justas voltam para 2.00 — o que confirma que, nesse mercado simétrico, o preço justo seria 2.00 para cada resultado.
          </p>
        </div>
      </ContentCard>

      {/* Diferença entre oferecida e justa */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Qual a diferença entre odd oferecida e odd justa?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            A diferença entre a odd oferecida e a odd justa representa, para aquele resultado específico, a parcela da margem da casa embutida na cotação. Quanto maior o overround do mercado, maior tende a ser essa diferença.
          </p>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <div className="grid px-4 py-2.5 text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)', color: 'var(--text-3)', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}>
              <span>Resultado</span>
              <span className="text-right">Odd oferecida</span>
              <span className="text-right">Odd justa</span>
              <span className="text-right">Diferença</span>
            </div>
            {[
              ['Casa', '2.10', '2.20', '+0.10'],
              ['Empate', '3.40', '3.56', '+0.16'],
              ['Fora', '3.60', '3.77', '+0.17'],
            ].map(([r, o, oj, d]) => (
              <div key={r} className="grid px-4 py-3 text-xs" style={{ borderBottom: '1px solid var(--border)', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}>
                <span style={{ color: 'var(--text-1)' }}>{r}</span>
                <span className="text-right tabular-nums" style={{ color: 'var(--text-2)' }}>{o}</span>
                <span className="text-right tabular-nums" style={{ color: '#818cf8' }}>{oj}</span>
                <span className="text-right tabular-nums font-semibold" style={{ color: '#fbbf24' }}>{d}</span>
              </div>
            ))}
          </div>
          <p>
            Nesse exemplo, a odd oferecida para o empate (3.40) está 0.16 abaixo da odd justa (3.56). Para a fora, a diferença é 0.17. Essas diferenças não indicam que as apostas têm valor — apenas mostram quanto cada cotação foi comprimida pela margem do mercado.
          </p>
        </div>
      </ContentCard>

      {/* Odds justas e margem */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Odds justas e margem da casa</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Para calcular odds justas, o primeiro passo é calcular a margem da casa — representada pelo overround. A margem está embutida nas odds oferecidas e só pode ser identificada ao somar as probabilidades implícitas de todos os resultados do mercado.
          </p>
          <div className="space-y-2">
            {[
              { faixa: 'Até 3%', label: 'Muito baixa', cor: '#22d3ee', corBg: 'rgba(34,211,238,0.05)', desc: 'Mercados altamente competitivos. A diferença entre odd oferecida e odd justa é pequena.' },
              { faixa: '3% a 5%', label: 'Baixa', cor: '#4ade80', corBg: 'rgba(34,197,94,0.05)', desc: 'Mercados competitivos em grandes eventos. Diferença moderada entre oferecida e justa.' },
              { faixa: '5% a 8%', label: 'Moderada', cor: '#fbbf24', corBg: 'rgba(251,191,36,0.05)', desc: 'Faixa comum em apostas esportivas convencionais.' },
              { faixa: 'Acima de 8%', label: 'Alta', cor: '#f87171', corBg: 'rgba(248,113,113,0.05)', desc: 'Mercados secundários ou de nicho. Diferença maior entre odd oferecida e odd justa.' },
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
          <p>
            Quanto maior a margem, maior tende a ser a diferença entre as odds oferecidas e as odds justas calculadas. Use a{' '}
            <Link to="/calculadoras/overround" style={{ color: '#22d3ee' }}>Calculadora de Margem da Casa</Link>{' '}
            para analisar o overround de qualquer mercado.
          </p>
        </div>
      </ContentCard>

      {/* Odds justas e probabilidade implícita */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Odds justas e probabilidade implícita</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            A probabilidade implícita é a base do cálculo de odds justas. Ela transforma uma odd em percentual de probabilidade — mas ainda inclui a margem da casa. A normalização remove essa margem, gerando a probabilidade justa.
          </p>
          <CodeBlock label="Comparação: probabilidade implícita vs. probabilidade justa">
            <Formula color="#f0f2f7">Odd 2.10 (Casa):</Formula>
            <Formula color="#22d3ee">  Probabilidade implícita = 1 ÷ 2.10 × 100 = 47,62%  (inclui margem)</Formula>
            <Formula color="#818cf8">  Probabilidade justa     = 47,62 ÷ 104,81 × 100 = 45,43%  (sem margem)</Formula>
          </CodeBlock>
          <p>
            A probabilidade implícita (47,62%) inclui a margem. A probabilidade justa (45,43%) é a estimativa sem ela. A diferença de 2,19 pontos percentuais representa a parcela da margem atribuída a esse resultado específico.
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

      {/* Odds justas e value bet */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Odds justas e value bet</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Odds justas ajudam a entender a precificação do mercado. Mas elas não substituem a análise de value bet. Value bet ocorre quando a probabilidade real estimada para um resultado é maior que a probabilidade implícita da odd oferecida — não quando a odd justa é maior que a odd oferecida.
          </p>
          <p>
            Uma odd justa maior que a odd oferecida apenas confirma que há margem embutida — o que é sempre verdade em qualquer mercado com overround acima de 100%. Para identificar value bet, é necessário ter uma estimativa própria da probabilidade real do evento.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl p-4" style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.12)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: '#4ade80' }}>Odd justa {'>'} Odd oferecida</p>
              <p className="text-xs" style={t}>Sempre verdade quando há margem. Não significa automaticamente value bet.</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: '#22d3ee' }}>Value bet real</p>
              <p className="text-xs" style={t}>Ocorre quando sua probabilidade estimada {'>'} probabilidade implícita da odd. Exige análise própria.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/calculadoras/value-bet" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: '#4ade80', background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.15)' }}>
              Calculadora de Value Bet →
            </Link>
            <Link to="/blog/value-bet-o-que-e" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
              O que é value bet →
            </Link>
            <Link to="/blog/como-calcular-ev-apostas" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
              Como calcular EV →
            </Link>
          </div>
        </div>
      </ContentCard>

      {/* Odds justas garantem lucro */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Odds justas garantem lucro?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Não. Odds justas são estimativas matemáticas baseadas na normalização das probabilidades implícitas das odds oferecidas. Elas removem a margem matematicamente, mas não:
          </p>
          <ul className="space-y-1.5 list-none">
            {[
              'Preveem o resultado do evento.',
              'Indicam qual aposta tem valor esperado positivo.',
              'Substituem a estimativa de probabilidade real do apostador.',
              'Eliminam o risco financeiro de uma aposta.',
              'Garantem retorno em nenhuma aposta individual.',
            ].map(text => (
              <li key={text} className="flex gap-2.5 text-xs">
                <span style={{ color: '#f87171', flexShrink: 0 }}>✗</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <InfoNote tone="amber">
            Odds justas são uma ferramenta de análise para entender a precificação de um mercado. Apostas envolvem risco financeiro real, independentemente das odds justas calculadas. +18. O CalculaBet não é uma casa de apostas.
          </InfoNote>
        </div>
      </ContentCard>

      {/* Quando usar */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Quando usar uma calculadora de odds justas?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            A calculadora de odds justas é mais útil nas seguintes situações:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Ao comparar mercados para entender qual tem margem menor.',
              'Ao analisar a diferença entre odds oferecidas e preço sem margem.',
              'Ao estudar a estrutura de precificação de um mercado específico.',
              'Ao comparar a mesma corrida ou evento em diferentes plataformas.',
              'Ao aprender probabilidade implícita e overround de forma prática.',
              'Ao usar em conjunto com análise de value bet.',
            ].map(text => (
              <div key={text} className="flex gap-2.5 rounded-xl px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                <span style={{ color: '#22d3ee', flexShrink: 0 }}>→</span>
                <p className="text-xs leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <Link to="/casas-apostas" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: '#22d3ee', background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.15)' }}>
              Comparar casas de apostas →
            </Link>
            <Link to="/calculadoras/conversor-odds" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
              Conversor de odds →
            </Link>
          </div>
        </div>
      </ContentCard>

      {/* Erros comuns */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Erros comuns ao calcular odds justas</h2>
        <div className="space-y-2.5 text-sm leading-relaxed" style={t}>
          {[
            ['Usar odds de mercados diferentes', 'Misturar odds de mercados distintos gera cálculo sem sentido — o overround precisa ser do mesmo evento e tipo de aposta.'],
            ['Esquecer um resultado possível', 'Omitir qualquer resultado distorce o overround e gera odds justas incorretas para todos os outros.'],
            ['Ignorar o empate em futebol', 'Em 1X2, o empate é obrigatório. Calcular apenas Casa e Fora subestima a margem e invalida o resultado.'],
            ['Usar odds desatualizadas', 'Odds mudam antes e durante eventos. O cálculo reflete apenas o momento da captura das odds.'],
            ['Achar que odd justa é previsão', 'Odds justas mostram precificação sem margem — não a probabilidade real do evento.'],
            ['Confundir odd justa com value bet', 'Odd justa não indica value bet. Para isso, é necessário comparar com a probabilidade real estimada.'],
            ['Não considerar todas as casas', 'Para comparar precificações, use o mesmo mercado na mesma hora. Odds de casas diferentes são válidas apenas para comparação de margem, não para calcular odds justas do mesmo mercado.'],
            ['Não usar gestão de banca', 'Análise de odds justas não substitui controle de exposição financeira.'],
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

      {/* Conclusão */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Conclusão</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Odds justas são estimativas das cotações que existiriam em um mercado sem margem da casa. O cálculo usa normalização das probabilidades implícitas e é aplicável a qualquer tipo de mercado com odds decimais.
          </p>
          <ul className="space-y-2 list-none">
            {[
              'Odds justas dependem de todas as odds do mercado serem inseridas corretamente.',
              'A diferença entre odd oferecida e justa reflete a parcela de margem naquele resultado.',
              'Odds justas não indicam automaticamente value bet.',
              'Odds justas não preveem resultados nem garantem lucro.',
              'Use em conjunto com overround, value bet e gestão de banca.',
            ].map(item => (
              <li key={item} className="flex gap-2.5 text-sm">
                <span style={{ color: '#4ade80', flexShrink: 0 }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl p-4 text-center" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.15)' }}>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
              Use a Calculadora de Odds Justas do CalculaBet para comparar odds oferecidas, remover a margem da casa e entender melhor a precificação de um mercado.
            </p>
          </div>
        </div>
      </ContentCard>

      {/* Ferramentas relacionadas */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Ferramentas e artigos relacionados</h2>
        <p className="text-sm leading-relaxed mb-5" style={t}>
          Combine a análise de odds justas com outras ferramentas e conteúdos educativos do CalculaBet.
        </p>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold mb-2" style={muted}>Calculadoras</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                ['/calculadoras/overround', 'Margem da Casa', 'Calcule o overround e o payout teórico de qualquer mercado de apostas.'],
                ['/calculadoras/value-bet', 'Value Bet / EV', 'Calcule EV positivo, edge e probabilidade implícita com base na odd e estimativa.'],
                ['/calculadoras/odds', 'Calculadora de Odds', 'Calcule retorno, lucro e probabilidade implícita de qualquer aposta.'],
                ['/calculadoras/conversor-odds', 'Conversor de Odds', 'Converta odds decimais, americanas e fracionárias.'],
                ['/calculadoras/gestao-banca', 'Gestão de Banca', 'Aplique Kelly Criterion e controle sua exposição por aposta.'],
                ['/calculadoras/roi', 'ROI em Apostas', 'Calcule o retorno sobre investimento acumulado.'],
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
                ['/blog/overround-apostas', 'Overround nas apostas'],
                ['/blog/probabilidade-implicita-odds', 'Probabilidade implícita nas odds'],
                ['/blog/value-bet-o-que-e', 'O que é value bet'],
                ['/blog/como-calcular-ev-apostas', 'Como calcular EV em apostas'],
                ['/blog/como-calcular-odds', 'Como calcular odds'],
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

// ─── Examples ─────────────────────────────────────────────────────────────────

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
  justo: [
    { nome: 'Resultado A', odd: '2.00' },
    { nome: 'Resultado B', odd: '2.00' },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseOdd(v) {
  if (typeof v === 'string') v = v.replace(',', '.');
  return parseFloat(v);
}

function interpretarMargem(margemPct) {
  if (margemPct <= 0) {
    return { cor: '#22d3ee', texto: 'As odds inseridas não indicam margem positiva. Verifique se todos os resultados do mercado foram incluídos corretamente.' };
  }
  if (margemPct <= 3) {
    return { cor: '#4ade80', texto: 'Margem baixa. A diferença entre odds oferecidas e odds justas é pequena. Isso pode indicar mercado competitivo, mas não garante value bet.' };
  }
  if (margemPct <= 8) {
    return { cor: '#fbbf24', texto: 'Margem moderada. Faixa comum em muitos mercados de apostas esportivas.' };
  }
  return { cor: '#f87171', texto: 'Margem alta. Quanto maior a margem, maior a diferença entre as odds oferecidas e as odds justas estimadas.' };
}

// ─── Main Calculator ──────────────────────────────────────────────────────────

export default function OddsJustas() {
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

  // Compute results
  const oddsN = resultados.map(r => parseOdd(r.odd));
  const allValid = oddsN.every(o => !isNaN(o) && o > 1);

  let soma = 0, margemPct = 0, payoutPct = 0, linhas = [], interpretacao = null;

  if (calculado && allValid) {
    soma = oddsN.reduce((acc, o) => acc + 1 / o, 0);
    margemPct = (soma - 1) * 100;
    payoutPct = (1 / soma) * 100;

    linhas = resultados.map((r, i) => {
      const odd = oddsN[i];
      const probImpl = (1 / odd) * 100;
      const probJusta = probImpl / (soma * 100) * 100;
      const oddJusta = 1 / (probJusta / 100);
      const diferenca = oddJusta - odd;
      const diferencaPct = ((oddJusta - odd) / odd) * 100;
      return {
        nome: r.nome || `Resultado ${i + 1}`,
        odd,
        probImpl,
        probJusta,
        oddJusta,
        diferenca,
        diferencaPct,
      };
    });

    interpretacao = interpretarMargem(margemPct);
  }

  return (
    <CalcLayout
      title="Calculadora de Odds Justas: Remova a Margem da Casa"
      description="Use a calculadora de odds justas para remover a margem da casa, calcular probabilidades sem overround e comparar odds oferecidas com odds justas."
      slug="odds-justas"
      faqs={faqs}
      schema={faqSchema}
      explanation={<Explanation />}
    >
      <div className="space-y-6">

        {/* Instrução */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.14)' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-1)' }}>Como preencher</p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Insira as odds decimais de todos os resultados do mesmo mercado. Para futebol 1X2, use 3 resultados (incluindo empate). Para tênis ou over/under, use 2. A calculadora estima as odds sem a margem da casa.
          </p>
        </div>

        {/* Exemplos rápidos */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs self-center" style={{ color: 'var(--text-3)' }}>Carregar exemplo:</span>
          <button type="button" onClick={() => carregarExemplo('dois')} className="btn-ghost text-xs px-3 py-1.5">
            2 resultados (1.90 / 1.90)
          </button>
          <button type="button" onClick={() => carregarExemplo('tres')} className="btn-ghost text-xs px-3 py-1.5">
            Futebol 1X2 (2.10 / 3.40 / 3.60)
          </button>
          <button type="button" onClick={() => carregarExemplo('justo')} className="btn-ghost text-xs px-3 py-1.5">
            Mercado justo (2.00 / 2.00)
          </button>
        </div>

        {/* Linhas de resultados */}
        <div className="space-y-3">
          {resultados.map((r, i) => (
            <div key={i} className="flex items-end gap-2 sm:gap-3">
              <div className="flex-1 min-w-0">
                <label className="label" htmlFor={`oj-nome-${i}`}>
                  {i === 0 ? 'Nome do resultado (opcional)' : `Resultado ${i + 1}`}
                </label>
                <input
                  id={`oj-nome-${i}`}
                  type="text"
                  className="input-field"
                  placeholder={(['Casa', 'Empate', 'Fora', 'Sim', 'Não', 'Over', 'Under'][i]) ?? `Resultado ${i + 1}`}
                  value={r.nome}
                  onChange={e => atualizar(i, 'nome', e.target.value)}
                />
              </div>
              <div style={{ width: '130px', flexShrink: 0 }}>
                <label className="label" htmlFor={`oj-odd-${i}`}>Odd oferecida</label>
                <input
                  id={`oj-odd-${i}`}
                  type="text"
                  inputMode="decimal"
                  className="input-field"
                  placeholder="ex: 2.10"
                  value={r.odd}
                  onChange={e => atualizar(i, 'odd', e.target.value)}
                />
              </div>
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
            Calcular odds justas
          </button>
          <button type="button" onClick={limpar} className="btn-ghost text-xs px-4 py-2">
            Limpar
          </button>
        </div>

        {/* Resultados */}
        {calculado && allValid && linhas.length > 0 && (
          <div className="space-y-4" aria-live="polite">

            {/* Resumo do mercado */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="result-box">
                <p className="result-value" style={{ color: interpretacao.cor }}>{margemPct.toFixed(2)}%</p>
                <p className="result-label">Margem da casa</p>
              </div>
              <div className="result-box">
                <p className="result-value">{(soma * 100).toFixed(2)}%</p>
                <p className="result-label">Soma prob. implícitas</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: '#4ade80' }}>{payoutPct.toFixed(2)}%</p>
                <p className="result-label">Payout teórico</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: '#818cf8' }}>{resultados.length}</p>
                <p className="result-label">Resultados</p>
              </div>
            </div>

            {/* Interpretação do mercado */}
            <div className="rounded-xl px-4 py-3.5 flex gap-3" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${interpretacao.cor}30` }}>
              <span className="mt-0.5 flex-shrink-0" style={{ color: interpretacao.cor }}>●</span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{interpretacao.texto}</p>
            </div>

            {/* Tabela principal */}
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              {/* Cabeçalho desktop */}
              <div
                className="hidden sm:grid text-xs font-semibold px-4 py-2.5"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--text-3)',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
                  gap: '8px',
                }}
              >
                <span>Resultado</span>
                <span className="text-right">Odd oferecida</span>
                <span className="text-right">Prob. implícita</span>
                <span className="text-right">Prob. justa</span>
                <span className="text-right">Odd justa</span>
                <span className="text-right">Diferença</span>
              </div>

              <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                {linhas.map((l, i) => (
                  <div key={i}>
                    {/* Desktop row */}
                    <div
                      className="hidden sm:grid items-center px-4 py-3 text-sm"
                      style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', gap: '8px' }}
                    >
                      <span className="font-medium truncate" style={{ color: 'var(--text-1)' }}>{l.nome}</span>
                      <span className="text-right tabular-nums" style={{ color: 'var(--text-2)' }}>{l.odd.toFixed(2)}</span>
                      <span className="text-right tabular-nums" style={{ color: 'var(--text-2)' }}>{l.probImpl.toFixed(2)}%</span>
                      <span className="text-right tabular-nums" style={{ color: '#22d3ee' }}>{l.probJusta.toFixed(2)}%</span>
                      <span className="text-right tabular-nums font-semibold" style={{ color: '#818cf8' }}>{l.oddJusta.toFixed(2)}</span>
                      <span className="text-right tabular-nums" style={{ color: l.diferenca > 0.005 ? '#fbbf24' : 'var(--text-3)' }}>
                        {l.diferenca >= 0 ? '+' : ''}{l.diferenca.toFixed(2)}
                      </span>
                    </div>
                    {/* Mobile card */}
                    <div className="sm:hidden px-4 py-3 space-y-2">
                      <p className="font-semibold text-sm" style={{ color: 'var(--text-1)' }}>{l.nome}</p>
                      <div className="grid grid-cols-2 gap-y-1 text-xs">
                        <span style={{ color: 'var(--text-3)' }}>Odd oferecida</span>
                        <span className="text-right tabular-nums" style={{ color: 'var(--text-2)' }}>{l.odd.toFixed(2)}</span>
                        <span style={{ color: 'var(--text-3)' }}>Prob. implícita</span>
                        <span className="text-right tabular-nums" style={{ color: 'var(--text-2)' }}>{l.probImpl.toFixed(2)}%</span>
                        <span style={{ color: 'var(--text-3)' }}>Prob. justa</span>
                        <span className="text-right tabular-nums" style={{ color: '#22d3ee' }}>{l.probJusta.toFixed(2)}%</span>
                        <span style={{ color: 'var(--text-3)' }}>Odd justa</span>
                        <span className="text-right tabular-nums font-semibold" style={{ color: '#818cf8' }}>{l.oddJusta.toFixed(2)}</span>
                        <span style={{ color: 'var(--text-3)' }}>Diferença</span>
                        <span className="text-right tabular-nums" style={{ color: l.diferenca > 0.005 ? '#fbbf24' : 'var(--text-3)' }}>
                          {l.diferenca >= 0 ? '+' : ''}{l.diferenca.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totais */}
              <div className="hidden sm:grid px-4 py-3 text-xs font-semibold" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', gap: '8px', borderTop: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
                <span style={{ color: 'var(--text-3)' }}>Total</span>
                <span />
                <span className="text-right tabular-nums" style={{ color: '#fbbf24' }}>{(soma * 100).toFixed(2)}%</span>
                <span className="text-right tabular-nums" style={{ color: '#4ade80' }}>100,00%</span>
                <span />
                <span />
              </div>
            </div>

            {/* Callout educativo */}
            <div className="rounded-xl px-4 py-3.5" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)' }}>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
                <span style={{ color: '#fbbf24' }}>⚠ </span>
                Odds justas são estimativas matemáticas sem margem da casa. Elas não preveem resultados e não garantem lucro. Apostas envolvem risco financeiro. +18.
              </p>
            </div>
          </div>
        )}

        {/* Links relacionados */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          <Link to="/calculadoras/overround" className="btn-ghost text-xs px-3 py-2">Calculadora de overround</Link>
          <Link to="/calculadoras/value-bet" className="btn-ghost text-xs px-3 py-2">Calculadora de EV / value bet</Link>
          <Link to="/calculadoras/odds" className="btn-ghost text-xs px-3 py-2">Calculadora de odds</Link>
        </div>
      </div>
    </CalcLayout>
  );
}
