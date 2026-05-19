import { Link } from 'react-router-dom';
import BlogCard from '../../../components/blog/BlogCard';
import BlogIcon from '../../../components/blog/BlogIcon';
import ArticleAffiliateBanner from '../../../components/ui/ArticleAffiliateBanner';
import FAQSection from '../../../components/ui/FAQSection';
import { getCategoryById } from '../../../data/blog/blogData';
import { EV_CALCULATION_FAQS } from '../../../data/blog/evCalculationFaqs';

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));
}

function ArticleSection({ id, title, children }) {
  return (
    <section id={id} className="mt-12 scroll-mt-28">
      <h2 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-1)' }}>{title}</h2>
      <div className="mt-5 space-y-5 text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>{children}</div>
    </section>
  );
}

function Callout({ tone = 'cyan', children }) {
  const styles = tone === 'amber'
    ? { background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.18)' }
    : tone === 'green'
    ? { background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)' }
    : { background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.18)' };
  return <div className="rounded-3xl p-5 my-7 leading-relaxed" style={styles}>{children}</div>;
}

function FormulaBox({ label, formula, children }) {
  return (
    <div className="rounded-3xl p-6 my-6" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(129,140,248,0.08))', border: '1px solid rgba(103,232,249,0.20)' }}>
      <p className="badge badge-cyan mb-4">{label}</p>
      <p className="text-xl sm:text-2xl font-bold leading-relaxed font-mono" style={{ color: 'var(--text-1)' }}>{formula}</p>
      {children && <div className="mt-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>{children}</div>}
    </div>
  );
}

function ExampleBox({ title, color = '#22d3ee', bg = 'rgba(34,211,238,0.06)', border = 'rgba(34,211,238,0.18)', children }) {
  return (
    <div className="rounded-3xl p-6 my-6" style={{ background: bg, border: `1px solid ${border}` }}>
      <p className="font-bold text-sm mb-4" style={{ color }}>{title}</p>
      <div className="space-y-2 text-sm sm:text-base leading-relaxed font-mono" style={{ color: 'var(--text-2)' }}>{children}</div>
    </div>
  );
}

function Row({ label, value, valueColor }) {
  return (
    <div className="flex justify-between items-center py-1 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <span style={{ color: 'var(--text-3)' }}>{label}</span>
      <span className="font-semibold" style={{ color: valueColor || 'var(--text-1)' }}>{value}</span>
    </div>
  );
}

const faqItems = EV_CALCULATION_FAQS.map(f => ({ q: f.question, a: f.answer }));

export default function EVCalculationArticle({ post, category, relatedPosts }) {
  return (
    <>
      <article className="rounded-[2rem] p-6 sm:p-8 lg:p-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.058), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.09)' }}>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="badge" style={{ color: category?.color || '#22d3ee', borderColor: `${category?.color || '#22d3ee'}35`, background: `${category?.color || '#22d3ee'}10` }}>{category?.name || 'Odds e Probabilidades'}</span>
          <span className="badge">{post.readingTime}</span>
          <span className="badge">Publicado em {formatDate(post.date)}</span>
          <span className="badge">Atualizado em {formatDate(post.updatedAt)}</span>
        </div>

        {/* Header */}
        <header className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 items-start">
          <div>
            <p className="badge badge-cyan mb-5">Guia de cálculo e fórmulas — educativo</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">
              Como Calcular EV em Apostas Esportivas: Fórmula, Exemplos e Calculadora
            </h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              EV significa valor esperado. O cálculo combina a probabilidade estimada de vitória, o lucro potencial e o risco de perda para estimar matematicamente o retorno médio de uma aposta. EV positivo indica expectativa favorável com base nos dados inseridos — não garante vitória e não prevê resultados esportivos.
            </p>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Este guia ensina a fórmula, o passo a passo e como interpretar o resultado. O CalculaBet não é uma casa de apostas — oferece ferramentas matemáticas e conteúdo educativo para apoio ao cálculo.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/calculadoras/value-bet" className="btn-primary">
                Usar calculadora de EV <BlogIcon name="arrow" className="w-4 h-4" />
              </Link>
              <Link to="/jogo-responsavel" className="btn-ghost">Jogo responsável</Link>
            </div>
          </div>

          <aside className="rounded-3xl p-6" style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.16)' }} aria-label="Resumo da fórmula de EV">
            <h2 className="text-2xl font-bold">Fórmula do EV</h2>
            <div className="mt-5 space-y-4">
              <div className="card-glass p-4">
                <h3 className="font-bold text-sm" style={{ color: '#22d3ee' }}>Valor esperado</h3>
                <p className="mt-2 text-sm font-mono" style={{ color: 'var(--text-1)' }}>EV = (P × Lucro) − ((1−P) × Stake)</p>
              </div>
              <div className="card-glass p-4">
                <h3 className="font-bold text-sm" style={{ color: '#818cf8' }}>Lucro potencial</h3>
                <p className="mt-2 text-sm font-mono" style={{ color: 'var(--text-1)' }}>Lucro = Stake × (Odd − 1)</p>
              </div>
              <div className="card-glass p-4">
                <h3 className="font-bold text-sm" style={{ color: '#4ade80' }}>EV percentual</h3>
                <p className="mt-2 text-sm font-mono" style={{ color: 'var(--text-1)' }}>EV% = (EV / Stake) × 100</p>
              </div>
              <div className="card-glass p-4">
                <h3 className="font-bold text-sm" style={{ color: '#fbbf24' }}>Edge</h3>
                <p className="mt-2 text-sm font-mono" style={{ color: 'var(--text-1)' }}>Edge = P.estimada − P.implícita</p>
              </div>
            </div>
          </aside>
        </header>

        <ArticleAffiliateBanner postSlug={post.slug} placement="mid-article" />

        <Callout tone="amber">
          <strong>Aviso responsável:</strong> conteúdo educativo e matemático, indicado para maiores de 18 anos. Apostas envolvem riscos financeiros reais. EV positivo não prevê resultados nem garante retorno. Não aposte dinheiro essencial. Leia nossa{' '}
          <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>página de jogo responsável</Link>.
        </Callout>

        {/* ─── Seção 1: O que é EV ─── */}
        <ArticleSection id="o-que-e-ev" title="O que é EV em apostas esportivas?">
          <p>
            EV vem de <em>Expected Value</em>, expressão inglesa para valor esperado. Em estatística e probabilidade, o valor esperado estima o resultado médio de um experimento aleatório repetido muitas vezes. Aplicado a apostas esportivas, o EV combina a probabilidade estimada de um evento com o retorno potencial e o risco de perda para calcular um valor médio de expectativa matemática.
          </p>
          <p>
            O resultado do EV pode ser:
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              ['EV positivo', 'A expectativa matemática indica ganho médio com essas premissas. Não garante resultado individual.', '#4ade80', 'rgba(34,197,94,0.06)', 'rgba(34,197,94,0.18)'],
              ['EV neutro (≈ 0)', 'A aposta está próxima do ponto de equilíbrio. Pequenas variações na odd ou na estimativa mudam o resultado.', '#fbbf24', 'rgba(251,191,36,0.06)', 'rgba(251,191,36,0.18)'],
              ['EV negativo', 'A expectativa matemática indica perda média com essas premissas. A odd não compensa a probabilidade estimada.', '#f87171', 'rgba(248,113,113,0.06)', 'rgba(248,113,113,0.18)'],
            ].map(([label, desc, color, bg, border]) => (
              <div key={label} className="rounded-2xl p-4" style={{ background: bg, border: `1px solid ${border}` }}>
                <p className="font-bold text-sm mb-2" style={{ color }}>{label}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{desc}</p>
              </div>
            ))}
          </div>
          <p>
            É importante entender que o EV é uma estimativa de longo prazo baseada em probabilidades. Uma aposta com EV positivo pode perder, e uma com EV negativo pode vencer. O cálculo estima tendência matemática, não resultado individual.
          </p>
          <Callout>
            <strong>Exemplo prático:</strong> imagine lançar uma moeda justa. O EV de apostar R$1 no cara é R$0 — metade das vezes você ganha R$1, metade perde R$1. Se você ganhar R$1,20 quando acertar e perder R$1 quando errar, o EV sobe para R$0,10. Não significa que o próximo lançamento vai cair em cara — significa que, repetindo muitas vezes, a expectativa matemática é de +R$0,10 por rodada.
          </Callout>
        </ArticleSection>

        {/* ─── Seção 2: Valor esperado positivo ─── */}
        <ArticleSection id="ev-positivo" title="O que é valor esperado positivo?">
          <p>
            Valor esperado positivo ocorre quando o ganho esperado ponderado pela probabilidade de vitória supera a perda esperada ponderada pela probabilidade de derrota. Em outras palavras: matematicamente, com essas premissas repetidas muitas vezes, a tendência seria de ganho médio.
          </p>
          <p>
            Para que o EV seja positivo, é necessário que a probabilidade estimada seja maior que a probabilidade implícita da odd. A probabilidade implícita é calculada como 1 ÷ odd × 100. Se a odd é 2.20, a probabilidade implícita é 45,45%. Se você estima que a chance real do evento é 50%, há 4,55 pontos percentuais de diferença — o que é chamado de edge.
          </p>
          <Callout tone="amber">
            <strong>Atenção:</strong> EV positivo não é lucro garantido. É apenas uma estimativa matemática baseada nos dados inseridos. Se a probabilidade estimada estiver incorreta, o EV calculado perde validade. A qualidade do cálculo depende da qualidade da estimativa.
          </Callout>
          <p>
            O EV positivo tem valor como ferramenta educativa e analítica. Ele ajuda a avaliar se uma odd aparenta compensar o risco segundo sua estimativa — não a prever o desfecho de um evento esportivo.
          </p>
        </ArticleSection>

        {/* ─── Seção 3: Fórmula ─── */}
        <ArticleSection id="formula-ev" title="Fórmula do EV em apostas">
          <p>
            A fórmula do valor esperado em apostas esportivas combina quatro variáveis: probabilidade estimada de vitória, lucro potencial, probabilidade estimada de perda e valor apostado.
          </p>

          <FormulaBox label="Fórmula principal — Valor esperado (EV)">
            EV = (P_vitória × Lucro potencial) − (P_derrota × Stake)
          </FormulaBox>

          <p>Cada variável da fórmula:</p>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <div className="grid px-5 py-3 text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)', color: 'var(--text-3)', gridTemplateColumns: '1fr 2fr' }}>
              <span>Variável</span>
              <span>Descrição</span>
            </div>
            {[
              ['P_vitória', 'Probabilidade estimada de vitória, em decimal. Exemplo: 50% = 0,50.'],
              ['Lucro potencial', 'Quanto você ganha além da stake em caso de vitória. Fórmula: Stake × (Odd − 1).'],
              ['P_derrota', 'Probabilidade estimada de perda. Sempre igual a 1 − P_vitória.'],
              ['Stake', 'Valor apostado. Também chamado de valor da aposta.'],
            ].map(([v, d]) => (
              <div key={v} className="grid px-5 py-3 text-sm" style={{ borderBottom: '1px solid var(--border)', gridTemplateColumns: '1fr 2fr' }}>
                <span className="font-mono font-semibold" style={{ color: '#22d3ee' }}>{v}</span>
                <span style={{ color: 'var(--text-2)' }}>{d}</span>
              </div>
            ))}
          </div>

          <FormulaBox label="Fórmulas auxiliares">
            {'Lucro potencial = Stake × (Odd − 1)\nRetorno potencial = Stake × Odd\nEV% = (EV / Stake) × 100'}
          </FormulaBox>

          <p>
            O retorno potencial é o valor total recebido em caso de vitória, incluindo a stake. O lucro potencial é apenas o ganho líquido. Para o cálculo do EV, usa-se o lucro potencial — não o retorno total.
          </p>
        </ArticleSection>

        {/* ─── Seção 4: Passo a passo ─── */}
        <ArticleSection id="passo-a-passo" title="Como calcular EV passo a passo">
          <p>
            O cálculo do EV pode ser feito manualmente ou com a{' '}
            <Link to="/calculadoras/value-bet" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de EV em apostas</Link>{' '}
            do CalculaBet. Veja o passo a passo completo:
          </p>
          <ol className="space-y-3 list-none">
            {[
              ['1', 'Defina o valor da aposta (stake).', '#22d3ee'],
              ['2', 'Identifique a odd decimal da seleção que deseja analisar.', '#22d3ee'],
              ['3', 'Calcule o lucro potencial: Stake × (Odd − 1).', '#818cf8'],
              ['4', 'Estime sua probabilidade de acerto com base em análise própria (não em palpite).', '#818cf8'],
              ['5', 'Calcule a probabilidade de perda: 1 − probabilidade estimada.', '#818cf8'],
              ['6', 'Aplique a fórmula: EV = (P_vitória × Lucro) − (P_derrota × Stake).', '#4ade80'],
              ['7', 'Calcule o EV%: (EV / Stake) × 100.', '#4ade80'],
              ['8', 'Interprete: EV positivo indica expectativa favorável com essas premissas. Avalie risco, banca e responsabilidade antes de qualquer decisão.', '#fbbf24'],
            ].map(([n, text, color]) => (
              <li key={n} className="flex gap-4">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: `${color}15`, color }}>
                  {n}
                </span>
                <p className="pt-0.5">{text}</p>
              </li>
            ))}
          </ol>
          <Callout>
            <strong>Use a calculadora:</strong> a{' '}
            <Link to="/calculadoras/value-bet" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Value Bet / EV do CalculaBet</Link>{' '}
            automatiza todos esses passos e mostra retorno, lucro, probabilidade implícita, edge, EV em R$ e EV% em segundos.
          </Callout>
        </ArticleSection>

        {/* ─── Seção 5: Exemplo EV positivo ─── */}
        <ArticleSection id="exemplo-positivo" title="Exemplo de EV positivo">
          <p>
            Veja um exemplo completo com EV positivo. Este é o exemplo padrão da{' '}
            <Link to="/calculadoras/value-bet" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de value bet</Link>{' '}
            do CalculaBet.
          </p>

          <ExampleBox title="Dados da aposta" color="#22d3ee" bg="rgba(34,211,238,0.05)" border="rgba(34,211,238,0.18)">
            <Row label="Valor apostado (Stake)" value="R$100,00" />
            <Row label="Odd decimal" value="2.20" />
            <Row label="Probabilidade estimada" value="50%" />
            <Row label="Probabilidade de perda" value="50%" />
          </ExampleBox>

          <ExampleBox title="Cálculos intermediários" color="#818cf8" bg="rgba(129,140,248,0.05)" border="rgba(129,140,248,0.18)">
            <Row label="Retorno potencial = 100 × 2.20" value="R$220,00" />
            <Row label="Lucro potencial = 100 × (2.20 − 1)" value="R$120,00" />
            <Row label="Prob. implícita = 1 ÷ 2.20 × 100" value="45,45%" />
            <Row label="Edge = 50% − 45,45%" value="+4,55 p.p." valueColor="#4ade80" />
          </ExampleBox>

          <ExampleBox title="Cálculo do EV" color="#4ade80" bg="rgba(34,197,94,0.05)" border="rgba(34,197,94,0.18)">
            <Row label="EV = (0,50 × 120) − (0,50 × 100)" value="" />
            <Row label="EV = 60 − 50" value="" />
            <Row label="EV" value="+R$10,00" valueColor="#4ade80" />
            <Row label="EV% = (10 ÷ 100) × 100" value="+10%" valueColor="#4ade80" />
          </ExampleBox>

          <p>
            <strong>Interpretação:</strong> com essas premissas, o EV é positivo em R$10 (10% da stake). Isso significa que, se a probabilidade estimada de 50% estiver correta e essa aposta fosse repetida muitas vezes, a tendência matemática seria de R$10 de ganho médio por R$100 apostados. O resultado de uma aposta individual continua incerto.
          </p>
          <Callout tone="green">
            <strong>Experimente:</strong> use a{' '}
            <Link to="/calculadoras/value-bet" className="font-semibold" style={{ color: '#4ade80' }}>calculadora de EV do CalculaBet</Link>{' '}
            com esses valores para ver o resultado completo — incluindo probabilidade implícita, edge e detalhamento do cálculo.
          </Callout>
        </ArticleSection>

        {/* ─── Seção 6: Exemplo EV negativo ─── */}
        <ArticleSection id="exemplo-negativo" title="Exemplo de EV negativo">
          <p>
            Agora veja um exemplo com EV negativo — situação em que a probabilidade estimada é menor que a probabilidade implícita da odd.
          </p>

          <ExampleBox title="Dados da aposta" color="#22d3ee" bg="rgba(34,211,238,0.05)" border="rgba(34,211,238,0.18)">
            <Row label="Valor apostado (Stake)" value="R$100,00" />
            <Row label="Odd decimal" value="2.00" />
            <Row label="Probabilidade estimada" value="45%" />
            <Row label="Probabilidade de perda" value="55%" />
          </ExampleBox>

          <ExampleBox title="Cálculos intermediários" color="#818cf8" bg="rgba(129,140,248,0.05)" border="rgba(129,140,248,0.18)">
            <Row label="Retorno potencial = 100 × 2.00" value="R$200,00" />
            <Row label="Lucro potencial = 100 × (2.00 − 1)" value="R$100,00" />
            <Row label="Prob. implícita = 1 ÷ 2.00 × 100" value="50,00%" />
            <Row label="Edge = 45% − 50%" value="−5,00 p.p." valueColor="#f87171" />
          </ExampleBox>

          <ExampleBox title="Cálculo do EV" color="#f87171" bg="rgba(248,113,113,0.05)" border="rgba(248,113,113,0.18)">
            <Row label="EV = (0,45 × 100) − (0,55 × 100)" value="" />
            <Row label="EV = 45 − 55" value="" />
            <Row label="EV" value="−R$10,00" valueColor="#f87171" />
            <Row label="EV% = (−10 ÷ 100) × 100" value="−10%" valueColor="#f87171" />
          </ExampleBox>

          <p>
            <strong>Interpretação:</strong> com essas premissas, o EV é negativo em R$10. Matematicamente, a aposta não teria valor esperado positivo: a probabilidade implícita da odd (50%) supera a estimativa do apostador (45%). A aposta ainda pode vencer — mas a expectativa matemática seria desfavorável com esses dados.
          </p>
          <Callout tone="amber">
            <strong>Importante:</strong> EV negativo não significa que a aposta vai perder. Significa que, com essa estimativa e essa odd, a matemática indica expectativa desfavorável. Uma aposta com EV negativo pode vencer por variância — e isso não valida a estimativa.
          </Callout>
        </ArticleSection>

        {/* ─── Seção 7: EV percentual ─── */}
        <ArticleSection id="ev-percentual" title="Como calcular EV percentual">
          <p>
            O EV percentual expressa o valor esperado como proporção da stake. É útil para comparar apostas de valores diferentes sem precisar padronizar o montante apostado.
          </p>

          <FormulaBox label="Fórmula — EV percentual">
            EV% = (EV / Stake) × 100
          </FormulaBox>

          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <div className="grid px-5 py-3 text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)', color: 'var(--text-3)', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
              <span>Stake</span>
              <span className="text-right">EV (R$)</span>
              <span className="text-right">EV%</span>
              <span className="text-right">Equivalência</span>
            </div>
            {[
              ['R$50', 'R$5', '10%', 'Mesma rentabilidade'],
              ['R$100', 'R$10', '10%', 'Mesma rentabilidade'],
              ['R$200', 'R$20', '10%', 'Mesma rentabilidade'],
              ['R$100', '-R$5', '-5%', 'EV negativo'],
            ].map(([stake, ev, evp, nota]) => (
              <div key={stake + ev} className="grid px-5 py-3 text-sm" style={{ borderBottom: '1px solid var(--border)', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
                <span style={{ color: 'var(--text-2)' }}>{stake}</span>
                <span className="text-right tabular-nums" style={{ color: ev.startsWith('-') ? '#f87171' : '#4ade80' }}>{ev}</span>
                <span className="text-right tabular-nums font-semibold" style={{ color: evp.startsWith('-') ? '#f87171' : '#4ade80' }}>{evp}</span>
                <span className="text-right text-xs" style={{ color: 'var(--text-3)' }}>{nota}</span>
              </div>
            ))}
          </div>

          <p>
            O EV% ajuda a entender a rentabilidade relativa da aposta. Um EV de R$5 em stake de R$50 e um EV de R$20 em stake de R$200 têm o mesmo EV% de 10% — a mesma expectativa matemática relativa ao valor arriscado.
          </p>
        </ArticleSection>

        {/* ─── Seção 8: Como usar a calculadora ─── */}
        <ArticleSection id="calculadora-ev" title="Como usar a Calculadora de Value Bet / EV do CalculaBet">
          <p>
            A{' '}
            <Link to="/calculadoras/value-bet" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Value Bet / EV do CalculaBet</Link>{' '}
            automatiza todos os cálculos desta página. Veja como usar:
          </p>
          <ol className="space-y-3 list-none">
            {[
              ['1', 'Acesse a Calculadora de Value Bet / EV.'],
              ['2', 'Informe o valor da aposta em reais (stake).'],
              ['3', 'Digite a odd decimal da seleção. Use ponto ou vírgula como separador.'],
              ['4', 'Informe sua probabilidade estimada em percentual (ex: 50).'],
              ['5', 'Opcionalmente, nomeie a seleção ou o evento para facilitar a leitura.'],
              ['6', 'Clique em "Calcular value bet".'],
              ['7', 'Analise retorno potencial, lucro, probabilidade implícita, edge, EV em R$ e EV%.'],
              ['8', 'Use o resultado como apoio matemático — não como garantia de lucro.'],
            ].map(([n, text]) => (
              <li key={n} className="flex gap-4">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(34,211,238,0.12)', color: '#22d3ee' }}>
                  {n}
                </span>
                <p className="pt-0.5">{text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 rounded-3xl p-6 text-center" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.18)' }}>
            <p className="text-lg font-semibold mb-4" style={{ color: 'var(--text-1)' }}>
              Calcule EV, edge e probabilidade implícita em segundos
            </p>
            <Link to="/calculadoras/value-bet" className="btn-primary inline-flex items-center gap-2">
              Usar calculadora de value bet <BlogIcon name="arrow" className="w-4 h-4" />
            </Link>
          </div>
        </ArticleSection>

        {/* ─── Seção 9: Probabilidade implícita ─── */}
        <ArticleSection id="probabilidade-implicita" title="O que é probabilidade implícita no cálculo de EV?">
          <p>
            A probabilidade implícita é o ponto de partida para calcular EV e identificar possível edge. Ela representa a probabilidade de vitória que a odd sugere matematicamente. Para calculá-la, divida 1 pela odd e multiplique por 100.
          </p>

          <FormulaBox label="Fórmula — Probabilidade implícita">
            Probabilidade implícita (%) = (1 ÷ Odd) × 100
          </FormulaBox>

          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <div className="grid px-5 py-3 text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)', color: 'var(--text-3)', gridTemplateColumns: '1fr 1fr' }}>
              <span>Odd decimal</span>
              <span className="text-right">Probabilidade implícita</span>
            </div>
            {[['1.50', '66,67%'], ['2.00', '50,00%'], ['2.20', '45,45%'], ['3.00', '33,33%'], ['5.00', '20,00%'], ['10.00', '10,00%']].map(([odd, prob]) => (
              <div key={odd} className="grid px-5 py-3 text-sm" style={{ borderBottom: '1px solid var(--border)', gridTemplateColumns: '1fr 1fr' }}>
                <span style={{ color: 'var(--text-2)' }}>{odd}</span>
                <span className="text-right tabular-nums font-semibold" style={{ color: '#22d3ee' }}>{prob}</span>
              </div>
            ))}
          </div>

          <p>
            A probabilidade implícita inclui a margem da casa, então está ligeiramente abaixo do valor teoricamente justo. Para que o EV seja positivo, sua estimativa precisa ser maior que essa probabilidade. Quanto maior a diferença (edge), maior o EV calculado — desde que a estimativa seja fundamentada.
          </p>
          <p>
            Leia também:{' '}
            <Link to="/blog/probabilidade-implicita-odds" className="font-semibold" style={{ color: '#67e8f9' }}>probabilidade implícita nas odds</Link>{' '}
            e use a{' '}
            <Link to="/calculadoras/odds" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de odds</Link>{' '}
            para calcular probabilidade implícita rapidamente.
          </p>
        </ArticleSection>

        {/* ─── Seção 10: Edge ─── */}
        <ArticleSection id="edge" title="O que é edge em apostas?">
          <p>
            Edge é a diferença em pontos percentuais entre a probabilidade estimada pelo apostador e a probabilidade implícita da odd. É uma das métricas centrais na análise de value bet.
          </p>

          <FormulaBox label="Fórmula — Edge">
            Edge = Probabilidade estimada (%) − Probabilidade implícita (%)
          </FormulaBox>

          <ExampleBox title="Exemplo de cálculo de edge" color="#4ade80" bg="rgba(34,197,94,0.05)" border="rgba(34,197,94,0.15)">
            <Row label="Odd" value="2.20" />
            <Row label="Probabilidade implícita = 1 ÷ 2.20 × 100" value="45,45%" />
            <Row label="Probabilidade estimada" value="50,00%" />
            <Row label="Edge = 50% − 45,45%" value="+4,55 p.p." valueColor="#4ade80" />
          </ExampleBox>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-2xl p-4" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.18)' }}>
              <p className="font-bold text-sm mb-2" style={{ color: '#4ade80' }}>Edge positivo</p>
              <p className="text-sm" style={{ color: 'var(--text-2)' }}>Sua estimativa supera a probabilidade implícita. Indica possível valor com essa premissa — não garante acerto.</p>
            </div>
            <div className="rounded-2xl p-4" style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.18)' }}>
              <p className="font-bold text-sm mb-2" style={{ color: '#f87171' }}>Edge negativo</p>
              <p className="text-sm" style={{ color: 'var(--text-2)' }}>A probabilidade implícita supera sua estimativa. Matematicamente, não há valor com essas premissas.</p>
            </div>
          </div>
          <Callout tone="amber">
            <strong>A qualidade da probabilidade estimada é a parte mais importante do cálculo.</strong> Um edge calculado com uma estimativa inventada não tem nenhum valor matemático real. Estimativas confiáveis precisam de base: estatísticas, histórico e análise do contexto do evento.
          </Callout>
        </ArticleSection>

        {/* ─── Seção 11: EV positivo = value bet? ─── */}
        <ArticleSection id="ev-value-bet" title="EV positivo é a mesma coisa que value bet?">
          <p>
            Na prática, sim — os conceitos estão diretamente ligados. Uma value bet é uma aposta que aparenta ter valor esperado positivo. O EV é o cálculo que quantifica esse valor. Identificar uma value bet é encontrar uma situação em que o EV calculado é positivo com base na sua estimativa de probabilidade.
          </p>
          <p>
            A diferença principal é conceitual:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="card-glass p-4">
              <p className="font-semibold text-sm mb-2" style={{ color: '#22d3ee' }}>Value bet</p>
              <p className="text-sm" style={{ color: 'var(--text-2)' }}>Conceito qualitativo: uma aposta que parece ter valor com base na análise da odd versus a probabilidade real estimada.</p>
            </div>
            <div className="card-glass p-4">
              <p className="font-semibold text-sm mb-2" style={{ color: '#818cf8' }}>EV positivo</p>
              <p className="text-sm" style={{ color: 'var(--text-2)' }}>Resultado quantitativo do cálculo de valor esperado. Confirma matematicamente que a aposta aparenta ter valor com esses dados.</p>
            </div>
          </div>
          <p>
            Tudo depende da qualidade da estimativa de probabilidade. Uma estimativa ruim pode criar uma falsa value bet — com EV positivo calculado, mas sem fundamento real. Leia mais:{' '}
            <Link to="/blog/value-bet-o-que-e" className="font-semibold" style={{ color: '#67e8f9' }}>o que é value bet</Link>.
          </p>
        </ArticleSection>

        {/* ─── Seção 12: Odd alta = EV positivo? ─── */}
        <ArticleSection id="odd-alta-ev" title="Odd alta significa EV positivo?">
          <p>
            Não. Esse é um dos equívocos mais comuns em apostas esportivas. A odd indica o retorno potencial e a probabilidade implícita — não o valor esperado. Uma odd alta significa probabilidade implícita baixa, o que requer que sua estimativa real seja ainda mais baixa do que essa para gerar EV negativo, ou mais alta para gerar EV positivo.
          </p>
          <Callout tone="amber">
            <strong>Odd alta não é sinônimo de aposta de valor.</strong> O que determina o EV é a relação entre a odd e a probabilidade estimada — não o tamanho absoluto da cotação.
          </Callout>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <div className="grid px-5 py-3 text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)', color: 'var(--text-3)', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
              <span>Odd</span>
              <span className="text-right">Prob. implícita</span>
              <span className="text-right">Estimativa</span>
              <span className="text-right">EV</span>
            </div>
            {[
              ['10.00', '10,00%', '8% (menor)', 'Negativo', '#f87171'],
              ['1.50', '66,67%', '72% (maior)', 'Positivo', '#4ade80'],
              ['2.00', '50,00%', '50% (igual)', 'Neutro', '#fbbf24'],
              ['3.50', '28,57%', '35% (maior)', 'Positivo', '#4ade80'],
            ].map(([odd, pi, est, ev, cor]) => (
              <div key={odd} className="grid px-5 py-3 text-sm" style={{ borderBottom: '1px solid var(--border)', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
                <span style={{ color: 'var(--text-2)' }}>{odd}</span>
                <span className="text-right tabular-nums" style={{ color: 'var(--text-2)' }}>{pi}</span>
                <span className="text-right" style={{ color: 'var(--text-2)' }}>{est}</span>
                <span className="text-right font-semibold" style={{ color: cor }}>{ev}</span>
              </div>
            ))}
          </div>
          <p>
            Como a tabela mostra, uma odd de 1.50 pode ter EV positivo se a probabilidade estimada for alta o suficiente. Uma odd de 10.00 pode ter EV negativo se a probabilidade real for menor que a implícita. O valor vem da relação — não da cotação isolada.
          </p>
        </ArticleSection>

        {/* ─── Seção 13: EV, ROI e gestão de banca ─── */}
        <ArticleSection id="ev-roi-gestao" title="EV, ROI e gestão de banca">
          <p>
            EV, ROI e gestão de banca são conceitos complementares que cobrem diferentes aspectos da análise em apostas esportivas:
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              ['EV', 'Análise antes da aposta. Estima expectativa matemática com base em probabilidade e odd. Depende da qualidade da estimativa.', '#22d3ee'],
              ['ROI', 'Análise depois das apostas. Mede o retorno real em relação ao volume apostado. Depende de volume e registro.', '#818cf8'],
              ['Gestão de banca', 'Controle da exposição. Define quanto apostar por evento para preservar a banca e reduzir risco.', '#4ade80'],
            ].map(([title, desc, color]) => (
              <div key={title} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${color}20` }}>
                <p className="font-bold text-sm mb-2" style={{ color }}>{title}</p>
                <p className="text-sm" style={{ color: 'var(--text-2)' }}>{desc}</p>
              </div>
            ))}
          </div>
          <p>
            Mesmo apostando consistentemente em situações com EV positivo calculado, uma sequência ruim pode prejudicar a banca. A gestão de banca controla essa exposição — define stake máxima por evento, evita apostar tudo em uma única oportunidade e preserva a banca para o longo prazo.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/calculadoras/roi" className="btn-ghost text-sm">Calculadora de ROI</Link>
            <Link to="/calculadoras/gestao-banca" className="btn-ghost text-sm">Gestão de banca</Link>
            <Link to="/blog/roi-apostas" className="btn-ghost text-sm">Artigo sobre ROI</Link>
          </div>
        </ArticleSection>

        {/* ─── Seção 14: EV e Kelly ─── */}
        <ArticleSection id="ev-kelly" title="EV e Critério de Kelly">
          <p>
            O Critério de Kelly é uma fórmula matemática que estima o tamanho ideal da stake em relação à banca com base na odd e na probabilidade estimada. Ele pressupõe que a aposta tem EV positivo para funcionar: aplicar Kelly em uma aposta com EV negativo geraria stake zero ou negativa, indicando que não há valor.
          </p>
          <p>
            Na prática, o fluxo de uso é:
          </p>
          <ol className="space-y-2 list-decimal list-inside text-base" style={{ color: 'var(--text-2)' }}>
            <li>Calcule o EV para verificar se a aposta aparenta ter valor.</li>
            <li>Se o EV for positivo, use o Kelly para estimar o tamanho da stake.</li>
            <li>Considere usar Meio Kelly para reduzir agressividade.</li>
            <li>Aplique gestão de banca e registro de resultados.</li>
          </ol>
          <p>
            Ambos dependem da qualidade da probabilidade estimada. Uma estimativa incorreta gera stake inadequada e EV calculado incorreto. Não existe atalho para a qualidade da análise.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/calculadoras/gestao-banca" className="btn-ghost text-sm">Calculadora Kelly</Link>
            <Link to="/blog/criterio-de-kelly-apostas" className="btn-ghost text-sm">Critério de Kelly</Link>
          </div>
        </ArticleSection>

        {/* ─── Seção 15: EV e overround ─── */}
        <ArticleSection id="ev-overround" title="EV e margem da casa / overround">
          <p>
            A margem da casa está embutida nas odds publicadas. Ela reduz ligeiramente a probabilidade implícita de cada resultado em relação ao valor justo. Para calcular EV, você compara sua probabilidade estimada com a probabilidade implícita da odd — que já inclui essa margem.
          </p>
          <p>
            O overround mede a margem total de um mercado. Um overround menor indica odds mais próximas do valor justo, o que pode facilitar encontrar situações com edge positivo — mas não garante que elas existam. Você ainda precisa de uma estimativa de probabilidade superior à implícita.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/calculadoras/overround" className="btn-ghost text-sm">Calculadora de margem da casa</Link>
            <Link to="/blog/overround-apostas" className="btn-ghost text-sm">O que é overround</Link>
          </div>
        </ArticleSection>

        {/* ─── Seção 16: Erros comuns ─── */}
        <ArticleSection id="erros-comuns" title="Erros comuns ao calcular EV">
          <p>
            Mesmo com a fórmula correta, alguns erros são frequentes ao calcular EV em apostas esportivas:
          </p>
          <div className="space-y-2.5">
            {[
              ['Usar probabilidade inventada', 'Uma estimativa sem base em análise real não tem valor matemático. O EV calculado perde qualquer significado.'],
              ['Confundir palpite com estimativa', 'Sentir que uma equipe vai vencer não é o mesmo que estimar probabilidade. Estimativa exige dados, histórico e método.'],
              ['Esquecer de calcular o lucro líquido', 'O EV usa lucro potencial (Stake × (Odd − 1)), não o retorno total (Stake × Odd). Usar retorno no lugar do lucro distorce o resultado.'],
              ['Confundir retorno com lucro', 'Retorno = Stake × Odd (inclui a stake devolvida). Lucro = Stake × (Odd − 1) (apenas o ganho líquido). São números diferentes.'],
              ['Ignorar a probabilidade implícita', 'Sem conhecer a probabilidade implícita da odd, não é possível calcular edge nem avaliar se há valor.'],
              ['Achar que EV positivo garante lucro', 'O EV se manifesta como tendência em grande volume. Uma aposta individual com EV positivo pode perder.'],
              ['Não considerar variância', 'Uma sequência de apostas com EV positivo pode gerar resultado negativo no curto prazo por variância. Gestão de banca é essencial.'],
              ['Analisar poucas apostas', 'O EV precisa de volume para se manifestar. Poucas apostas são dominadas pela variância.'],
              ['Não usar gestão de banca', 'EV positivo não protege a banca se o tamanho da stake for desproporcional.'],
              ['Copiar probabilidades sem entender o mercado', 'Usar probabilidades de outros sem analisar o contexto gera estimativas sem fundamento.'],
              ['Não registrar resultados', 'Sem registro, é impossível saber se suas estimativas são precisas no longo prazo.'],
              ['Apostar por emoção', 'Value bet e EV exigem disciplina e análise — não urgência emocional ou preferência por times.'],
            ].map(([titulo, desc]) => (
              <div key={titulo} className="flex gap-3 rounded-2xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                <span className="mt-0.5 flex-shrink-0" style={{ color: '#f87171' }}>✗</span>
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-1)' }}>{titulo}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </ArticleSection>

        {/* ─── Seção 17: EV positivo pode perder? ─── */}
        <ArticleSection id="ev-positivo-perde" title="EV positivo pode perder?">
          <p>
            Sim, definitivamente. Essa é uma das propriedades mais importantes do valor esperado que os apostadores precisam entender antes de usar a ferramenta.
          </p>
          <p>
            O EV estima a expectativa matemática de uma aposta em um cenário hipotético de infinitas repetições. Uma aposta individual é sempre um único evento com resultado incerto. Mesmo com EV de +20%, a aposta pode perder. E após a perda, o resultado não diz nada sobre a qualidade da estimativa — foi variância, não necessariamente erro.
          </p>
          <Callout tone="amber">
            <strong>Uma aposta com EV positivo ainda pode perder. O cálculo não elimina o risco financeiro.</strong> É por isso que gestão de banca e controle emocional são essenciais. Sem limite de stake, uma sequência ruim pode comprometer a banca mesmo apostando apenas em situações com EV positivo calculado.
          </Callout>
        </ArticleSection>

        {/* ─── Seção 18: Quando evitar usar EV isoladamente ─── */}
        <ArticleSection id="quando-evitar" title="Quando evitar usar EV de forma isolada">
          <p>
            O EV é uma ferramenta de análise — não uma decisão automática. Há situações em que usar apenas o EV calculado pode ser inadequado:
          </p>
          <ul className="space-y-2 list-none">
            {[
              'Quando não há estimativa confiável de probabilidade para a seleção.',
              'Quando a decisão está sendo tomada para recuperar perdas recentes.',
              'Quando a stake comprometeria a banca ou parte essencial das finanças pessoais.',
              'Quando o mercado ou o evento não é bem compreendido.',
              'Quando a decisão está sendo guiada por emoção, torcida ou pressão externa.',
              'Quando as regras de liquidação do mercado não são claras.',
              'Quando a odd mudou e o cálculo foi feito com dados desatualizados.',
            ].map(text => (
              <li key={text} className="flex gap-2.5 text-base" style={{ color: 'var(--text-2)' }}>
                <span style={{ color: '#f87171', flexShrink: 0 }}>→</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <p>
            Nesses casos, pausar, analisar e se consultar com mais dados é mais responsável do que agir apenas com base no EV calculado.{' '}
            <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>Leia mais sobre jogo responsável →</Link>
          </p>
        </ArticleSection>

        {/* ─── Seção 19: Conclusão ─── */}
        <ArticleSection id="conclusao" title="Conclusão">
          <p>
            O EV é uma das métricas mais úteis para analisar matematicamente uma aposta esportiva. A fórmula combina probabilidade estimada, lucro potencial e risco de perda para estimar a expectativa matemática de uma aposta. EV positivo indica que, com essas premissas, a tendência matemática é favorável.
          </p>
          <ul className="space-y-2 list-none">
            {[
              'EV = (Probabilidade estimada × Lucro) − (Probabilidade de perda × Stake).',
              'A probabilidade implícita da odd é o ponto de partida para calcular o edge.',
              'Edge = probabilidade estimada − probabilidade implícita.',
              'EV percentual = (EV / Stake) × 100.',
              'EV positivo não garante resultado em nenhuma aposta individual.',
              'A qualidade da estimativa de probabilidade é o fator mais crítico do cálculo.',
              'Gestão de banca e registro de resultados são essenciais para usar EV de forma responsável.',
            ].map(item => (
              <li key={item} className="flex gap-2.5 text-base" style={{ color: 'var(--text-2)' }}>
                <span style={{ color: '#4ade80', flexShrink: 0 }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-3xl p-6 text-center" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.18)' }}>
            <p className="text-lg font-semibold mb-4" style={{ color: 'var(--text-1)' }}>
              Use a Calculadora de Value Bet / EV do CalculaBet para calcular EV, edge, probabilidade implícita e retorno potencial antes de avaliar uma aposta.
            </p>
            <Link to="/calculadoras/value-bet" className="btn-primary inline-flex items-center gap-2">
              Calcular EV agora <BlogIcon name="arrow" className="w-4 h-4" />
            </Link>
          </div>
        </ArticleSection>

        {/* ─── Ferramentas e artigos relacionados ─── */}
        <ArticleSection id="ferramentas" title="Ferramentas e artigos relacionados">
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              ['/calculadoras/value-bet', 'Calculadora de Value Bet / EV', 'Calcule EV, edge, probabilidade implícita e retorno com sua odd e estimativa.'],
              ['/calculadoras/odds', 'Calculadora de Odds', 'Calcule retorno, lucro e probabilidade implícita de qualquer aposta.'],
              ['/calculadoras/roi', 'ROI em Apostas', 'Calcule o retorno sobre investimento acumulado.'],
              ['/calculadoras/gestao-banca', 'Gestão de Banca', 'Aplique Kelly e controle sua exposição por aposta.'],
              ['/calculadoras/overround', 'Margem da Casa', 'Calcule overround e odds justas de qualquer mercado.'],
              ['/calculadoras/multipla-parlay', 'Múltipla / Parlay', 'Calcule retorno combinado de múltiplas seleções.'],
            ].map(([to, title, body]) => (
              <Link key={to} to={to} className="rounded-2xl p-4 transition-all block" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.10)' }}>
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-1)' }}>{title} →</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>{body}</p>
              </Link>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            {[
              ['/blog/value-bet-o-que-e', 'O que é value bet'],
              ['/blog/probabilidade-implicita-odds', 'Probabilidade implícita nas odds'],
              ['/blog/overround-apostas', 'O que é overround'],
              ['/blog/roi-apostas', 'ROI em apostas'],
              ['/blog/criterio-de-kelly-apostas', 'Critério de Kelly'],
              ['/blog/apostas-esportivas-para-iniciantes', 'Apostas para iniciantes'],
            ].map(([to, title]) => (
              <Link key={to} to={to} className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm transition-all" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                <span style={{ color: '#818cf8' }}>→</span>
                {title}
              </Link>
            ))}
          </div>
        </ArticleSection>

        <ArticleAffiliateBanner postSlug={post.slug} placement="pre-faq" />

        {/* ─── FAQ ─── */}
        <section id="faq" className="mt-12 scroll-mt-28">
          <FAQSection
            items={faqItems}
            title="Perguntas frequentes sobre EV em apostas"
            eyebrow="FAQ"
          />
        </section>
      </article>

      {/* ─── Related posts ─── */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-1)' }}>Artigos relacionados</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {relatedPosts.map(item => (
              <BlogCard key={item.slug} post={item} category={getCategoryById(item.category)} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
