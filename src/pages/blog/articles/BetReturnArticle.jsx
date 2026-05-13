import { Link } from 'react-router-dom';
import BlogCard from '../../../components/blog/BlogCard';
import BlogIcon from '../../../components/blog/BlogIcon';
import { getCategoryById } from '../../../data/blog/blogData';
import { BET_RETURN_FAQS } from '../../../data/blog/betReturnFaqs';

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
  const isAmber = tone === 'amber';
  return (
    <div
      className="rounded-3xl p-5 my-7 leading-relaxed"
      style={{
        background: isAmber ? 'rgba(251,191,36,0.08)' : 'rgba(34,211,238,0.07)',
        border: isAmber ? '1px solid rgba(251,191,36,0.18)' : '1px solid rgba(34,211,238,0.16)',
      }}
    >
      {children}
    </div>
  );
}

function FormulaBlock({ title, formula, note }) {
  return (
    <div className="rounded-3xl p-6 text-center" style={{ background: 'rgba(15,23,42,0.72)', border: '1px solid rgba(103,232,249,0.18)' }}>
      <p className="badge badge-cyan mb-4">{title}</p>
      <div className="text-2xl sm:text-3xl font-bold" style={{ color: '#67e8f9' }}>{formula}</div>
      {note && <p className="mt-3 text-sm" style={{ color: 'var(--text-2)' }}>{note}</p>}
    </div>
  );
}

function DataTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto rounded-3xl" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
      <table className="w-full text-left text-sm sm:text-base">
        <thead style={{ background: 'rgba(255,255,255,0.06)' }}>
          <tr>{columns.map(column => <th key={column} className="p-4">{column}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.join('-')} className="border-t border-white/10" style={{ color: 'var(--text-2)' }}>
              {row.map((cell, index) => (
                <td key={`${cell}-${index}`} className="p-4 font-medium" style={index === 0 ? { color: 'var(--text-1)' } : undefined}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tenRealRows = [
  ['1.50', 'R$15', 'R$5'],
  ['2.00', 'R$20', 'R$10'],
  ['2.50', 'R$25', 'R$15'],
  ['3.00', 'R$30', 'R$20'],
  ['5.00', 'R$50', 'R$40'],
  ['10.00', 'R$100', 'R$90'],
];

const comparisonRows = [
  ['R$10', '2.00', 'R$20', 'R$10'],
  ['R$50', '1.80', 'R$90', 'R$40'],
  ['R$100', '2.20', 'R$220', 'R$120'],
];

const practicalExamples = [
  { title: 'Exemplo 1', stake: 'R$25', odd: '1.60', retorno: 'R$40', lucro: 'R$15' },
  { title: 'Exemplo 2', stake: 'R$100', odd: '2.20', retorno: 'R$220', lucro: 'R$120' },
  { title: 'Exemplo 3', stake: 'R$15', odd: '4.00', retorno: 'R$60', lucro: 'R$45' },
];

const commonErrors = [
  'Confundir retorno com lucro.',
  'Esquecer que o valor apostado está incluído no retorno.',
  'Achar que odd alta é sempre melhor.',
  'Ignorar a probabilidade implícita da odd.',
  'Calcular apostas múltiplas somando odds em vez de multiplicar.',
  'Não considerar regras de aposta anulada ou mercados com regras específicas.',
  'Apostar valor maior do que deveria para o próprio orçamento.',
  'Tentar recuperar perdas aumentando a stake por impulso.',
  'Usar cálculo correto, mas sem gestão de banca e sem limites definidos.',
];

export default function BetReturnArticle({ post, category, relatedPosts }) {
  return (
    <>
      <article className="rounded-[2rem] p-6 sm:p-8 lg:p-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.058), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.09)' }}>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="badge" style={{ color: category?.color || '#22d3ee', borderColor: `${category?.color || '#22d3ee'}35`, background: `${category?.color || '#22d3ee'}10` }}>{category?.name || 'Odds e Probabilidades'}</span>
          <span className="badge">{post.readingTime}</span>
          <span className="badge">Publicado em {formatDate(post.date)}</span>
          <span className="badge">Atualizado em {formatDate(post.updatedAt)}</span>
        </div>

        <header className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">Como Calcular o Retorno de uma Aposta? Fórmula e Calculadora Gratuita</h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Muitos iniciantes em apostas esportivas têm a mesma dúvida: “se minha aposta vencer, quanto vou receber?”. A resposta depende de dois dados simples: o valor apostado e a odd. Mas existe um ponto essencial: retorno e lucro não são a mesma coisa. Neste guia, você vai aprender como calcular retorno de aposta, como calcular lucro de aposta, como interpretar odds e como usar a <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de odds</Link> do CalculaBet para simular cenários sem erro manual.
            </p>
            <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
              O conteúdo é educativo, voltado para apostas esportivas para iniciantes, e não garante resultado. O CalculaBet não é uma casa de apostas: oferecemos ferramentas, calculadoras e conteúdo para ajudar você a entender a matemática com responsabilidade.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/ferramentas/odds" className="btn-primary">Usar calculadora de odds <BlogIcon name="arrow" className="w-4 h-4" /></Link>
              <Link to="/jogo-responsavel" className="btn-ghost">Jogo responsável</Link>
            </div>
          </div>

          <aside className="rounded-3xl p-6" style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.16)' }} aria-label="Resumo rápido do cálculo de retorno">
            <p className="badge badge-cyan mb-4">Resumo rápido</p>
            <h2 className="text-2xl font-bold">A conta principal</h2>
            <div className="mt-5 space-y-4">
              <div className="card-glass p-4"><strong>Retorno:</strong><p className="mt-2 text-sm" style={{ color: 'var(--text-2)' }}>valor apostado vezes odd.</p></div>
              <div className="card-glass p-4"><strong>Lucro:</strong><p className="mt-2 text-sm" style={{ color: 'var(--text-2)' }}>valor apostado vezes odd menos 1.</p></div>
              <div className="card-glass p-4"><strong>Exemplo:</strong><p className="mt-2 text-sm" style={{ color: 'var(--text-2)' }}>R$10 na odd 2.00 retorna R$20 e tem lucro potencial de R$10.</p></div>
            </div>
          </aside>
        </header>

        <Callout tone="amber">
          <strong>Importante:</strong> este artigo é apenas educativo, para maiores de 18 anos. Apostas envolvem riscos financeiros, odds não preveem resultados, retorno potencial não é lucro garantido e não há garantia de ganhos. Use ferramentas como apoio ao cálculo, não como promessa de resultado. Leia também nossa página de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>jogo responsável</Link>.
        </Callout>

        <ArticleSection id="o-que-e-retorno" title="O que é o retorno de uma aposta?">
          <p>Retorno de aposta é o valor total recebido em caso de acerto. Esse valor inclui a quantia que você apostou inicialmente, também chamada de stake. Por isso, retorno não é o mesmo que lucro.</p>
          <p>A odd funciona como o multiplicador do valor apostado. Se você faz uma aposta de R$10 na odd 2.00 e ela vence, o retorno total é R$20. Dentro desses R$20, R$10 são a devolução do valor apostado e R$10 são o lucro potencial.</p>
          <Callout>Retorno não é lucro. O retorno inclui o valor apostado inicialmente.</Callout>
        </ArticleSection>

        <ArticleSection id="formula-retorno" title="Qual é a fórmula para calcular o retorno de uma aposta?">
          <FormulaBlock title="Fórmula retorno aposta" formula="Retorno = Valor apostado × Odd" note="Em odds decimais, basta multiplicar a stake pela cotação." />
          <p>Exemplo: valor apostado de R$50 na odd 1.80. A conta é 50 × 1.80 = R$90. Esse é o retorno total se a aposta for vencedora.</p>
          <p>Perceba que os R$90 não são lucro líquido. O valor apostado está incluído no retorno. Para saber quanto você ganha acima do valor inicial, é preciso calcular o lucro.</p>
        </ArticleSection>

        <ArticleSection id="retorno-lucro" title="Qual é a diferença entre retorno e lucro?">
          <p><strong>Retorno</strong> é o valor total recebido se a aposta vencer. <strong>Lucro</strong> é apenas o valor ganho acima do que foi apostado.</p>
          <FormulaBlock title="Fórmula do lucro de aposta" formula="Lucro = Valor apostado × (Odd - 1)" note="Também funciona como: lucro = retorno total - valor apostado." />
          <p>No exemplo de R$50 na odd 1.80, o retorno é R$90 e o lucro é R$40. A diferença de R$50 corresponde ao valor apostado inicialmente.</p>
          <DataTable columns={['Valor apostado', 'Odd', 'Retorno', 'Lucro']} rows={comparisonRows} />
          <Callout tone="amber">Retorno não é a mesma coisa que lucro. O retorno inclui o valor apostado.</Callout>
        </ArticleSection>

        <ArticleSection id="aposta-10-reais" title="Como calcular quanto ganha uma aposta de R$10">
          <p>Para saber quanto ganha uma aposta de R$10, multiplique R$10 pela odd. Essa é uma das buscas mais comuns de iniciantes, porque deixa claro o que significa valor apostado vezes odd.</p>
          <DataTable columns={['Odd', 'Retorno total', 'Lucro']} rows={tenRealRows} />
          <p>Quanto maior a odd, maior o retorno potencial. Porém, odds maiores geralmente indicam menor probabilidade implícita. Retorno alto não significa aposta melhor, nem garante que a aposta será vencedora.</p>
        </ArticleSection>

        <ArticleSection id="odd-2" title="Odd 2.00 quanto ganha?">
          <p>Uma odd 2.00 dobra o retorno total. Uma aposta de R$10 retorna R$20 e tem lucro potencial de R$10. Uma aposta de R$50 retorna R$100 e tem lucro potencial de R$50.</p>
          <p>Em termos de probabilidade implícita, a odd 2.00 representa 50%, pois 1 / 2.00 × 100 = 50%.</p>
        </ArticleSection>

        <ArticleSection id="odd-150" title="Odd 1.50 quanto ganha?">
          <p>Uma aposta de R$10 na odd 1.50 retorna R$15 se vencer. O lucro potencial é de R$5. Uma odd menor normalmente representa menor retorno potencial, embora também costume sugerir uma probabilidade implícita maior.</p>
        </ArticleSection>

        <ArticleSection id="odd-3" title="Odd 3.00 quanto ganha?">
          <p>Uma aposta de R$10 na odd 3.00 retorna R$30 se vencer. O lucro potencial é de R$20. A odd maior representa retorno potencial maior, mas geralmente indica menor probabilidade implícita.</p>
          <Callout>Odds mostram retorno potencial, mas não garantem que uma aposta será vencedora.</Callout>
        </ArticleSection>

        <ArticleSection id="calculadora-odds" title="Como usar a Calculadora de Odds do CalculaBet">
          <p>A <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de odds</Link> do CalculaBet ajuda a calcular retorno de aposta, calcular lucro de aposta e entender probabilidade implícita de forma rápida. Basta inserir o valor apostado e a odd para visualizar os resultados.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Inserir valor apostado', 'Inserir a odd decimal', 'Calcular retorno total', 'Calcular lucro potencial', 'Ver probabilidade implícita', 'Simular cenários rapidamente'].map(item => <div key={item} className="card-glass p-4">{item}</div>)}
          </div>
          <p>Usar a <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>ferramenta de odds do CalculaBet</Link> evita erro manual e deixa claro que os números são simulações matemáticas, não promessa de resultado.</p>
          <Link to="/ferramentas/odds" className="btn-primary mt-2">Calcular retorno e lucro agora <BlogIcon name="arrow" className="w-4 h-4" /></Link>
        </ArticleSection>

        <ArticleSection id="aposta-simples" title="Como usar a Calculadora de Aposta Simples">
          <p>Uma aposta simples usa uma única odd. O cálculo é direto: valor apostado × odd para retorno e valor apostado × (odd - 1) para lucro. No projeto, existe a rota de <Link to="/calculadoras/aposta-simples" className="font-semibold" style={{ color: '#67e8f9' }}>aposta simples</Link>, e a <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Odds</Link> também cobre esse tipo de simulação.</p>
          <p>Para iniciantes, começar por aposta simples ajuda a entender retorno, lucro, stake e probabilidade implícita antes de analisar apostas múltiplas ou estratégias mais complexas.</p>
        </ArticleSection>

        <ArticleSection id="como-calcular-odds" title="Como calcular odds na prática">
          <p>Para calcular odds na prática em formato decimal, use três leituras: retorno = valor apostado × odd; lucro = valor apostado × (odd - 1); probabilidade implícita = 1 / odd × 100.</p>
          <p>Exemplo completo: uma aposta de R$20 na odd 2.50 tem retorno de R$50, lucro de R$30 e probabilidade implícita de 40%. A conta da probabilidade é 1 / 2.50 × 100 = 40%.</p>
          <p>Se quiser aprofundar, leia também o guia <Link to="/blog/como-calcular-odds" className="font-semibold" style={{ color: '#67e8f9' }}>como calcular odds</Link> e o artigo sobre <Link to="/blog/probabilidade-implicita-odds" className="font-semibold" style={{ color: '#67e8f9' }}>probabilidade implícita nas odds</Link>.</p>
        </ArticleSection>

        <ArticleSection id="probabilidade-implicita" title="O que é probabilidade implícita da odd?">
          <p>Probabilidade implícita é a chance sugerida pela odd após uma conversão matemática. A fórmula é 1 / odd × 100. Por exemplo, odd 2.00 equivale a 50% de probabilidade implícita.</p>
          <p>Essa probabilidade não é garantia de resultado. Ela ajuda a entender a relação entre risco e retorno potencial, mas eventos esportivos continuam incertos. Você pode simular esse cálculo na <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de odds</Link>.</p>
        </ArticleSection>

        <ArticleSection id="aposta-multipla" title="Como calcular retorno em aposta múltipla">
          <p>Em apostas múltiplas, as odds são multiplicadas. A odd combinada é odd 1 × odd 2 × odd 3, e o retorno é valor apostado × odd combinada.</p>
          <p>Exemplo: odd 1.50 × odd 2.00 × odd 1.80 = odd combinada 5.40. Uma stake de R$10 teria retorno potencial de R$54. O risco é maior porque normalmente é preciso acertar todas as seleções do bilhete.</p>
          <p>Para esse tipo de conta, use a <Link to="/ferramentas/multipla" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de aposta múltipla</Link> e leia o guia <Link to="/blog/o-que-e-aposta-multipla" className="font-semibold" style={{ color: '#67e8f9' }}>o que é aposta múltipla</Link>.</p>
        </ArticleSection>

        <ArticleSection id="exemplos" title="Exemplos práticos de cálculo de retorno">
          <div className="grid md:grid-cols-3 gap-4">
            {practicalExamples.map(example => (
              <div key={example.title} className="card-glass p-5">
                <p className="badge badge-cyan mb-3">{example.title}</p>
                <h3 className="text-xl font-bold">{example.stake} na odd {example.odd}</h3>
                <p className="mt-3 text-sm" style={{ color: 'var(--text-2)' }}>Retorno: <strong style={{ color: 'var(--text-1)' }}>{example.retorno}</strong></p>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-2)' }}>Lucro: <strong style={{ color: 'var(--text-1)' }}>{example.lucro}</strong></p>
              </div>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection id="erros" title="Erros comuns ao calcular retorno de aposta">
          <div className="grid sm:grid-cols-2 gap-4">
            {commonErrors.map(error => <div key={error} className="card-glass p-4">{error}</div>)}
          </div>
          <p>Além da matemática, é importante usar <Link to="/ferramentas/gestao-de-banca" className="font-semibold" style={{ color: '#67e8f9' }}>gestão de banca</Link>, respeitar limites e revisar nossas orientações de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#67e8f9' }}>jogo responsável</Link>.</p>
        </ArticleSection>

        <ArticleSection id="retorno-alto" title="Retorno alto significa aposta melhor?">
          <p>Não necessariamente. Retorno alto normalmente vem com odd alta, e odd alta geralmente indica menor probabilidade implícita. Uma aposta deve ser analisada pelo risco, contexto, banca disponível e regras do mercado.</p>
          <p>Retorno potencial não é garantia de resultado. Também não transforma apostas em investimento seguro ou renda previsível.</p>
        </ArticleSection>

        <ArticleSection id="responsabilidade" title="Como calcular retorno com responsabilidade">
          <p>Use uma calculadora antes de apostar, defina limite de stake, não use dinheiro essencial e entenda que apostas envolvem risco financeiro. O cálculo ajuda a entender cenários, mas não decide por você.</p>
          <p>Para organizar limites, combine a <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de odds</Link> com ferramentas de <Link to="/ferramentas/gestao-de-banca" className="font-semibold" style={{ color: '#67e8f9' }}>gestão de banca</Link>, <Link to="/ferramentas/roi" className="font-semibold" style={{ color: '#67e8f9' }}>ROI</Link> e <Link to="/ferramentas/conversor" className="font-semibold" style={{ color: '#67e8f9' }}>conversor de odds</Link>. Leia também a <Link to="/politica-de-afiliados" className="font-semibold" style={{ color: '#67e8f9' }}>política de afiliados</Link> para entender nosso posicionamento editorial.</p>
        </ArticleSection>

        <ArticleSection id="conclusao" title="Conclusão">
          <p>Agora você sabe como calcular retorno de aposta: retorno = valor apostado × odd. Também viu que lucro = valor apostado × (odd - 1), que o retorno inclui a stake inicial e que odds maiores não garantem melhores apostas.</p>
          <p>Calculadoras ajudam a evitar erro manual, especialmente para iniciantes. Use a <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Odds do CalculaBet</Link> para calcular retorno, lucro e probabilidade implícita de forma rápida e gratuita. Para ver outras ferramentas educativas, acesse a página de <Link to="/ferramentas" className="font-semibold" style={{ color: '#67e8f9' }}>ferramentas do CalculaBet</Link> ou continue estudando no <Link to="/blog" className="font-semibold" style={{ color: '#67e8f9' }}>blog</Link>.</p>
          <div className="rounded-3xl p-6 mt-6" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.16), rgba(52,211,153,0.10))', border: '1px solid rgba(103,232,249,0.22)' }}>
            <h3 className="text-2xl font-bold">Use a Calculadora de Odds do CalculaBet</h3>
            <p className="mt-3" style={{ color: 'var(--text-2)' }}>Calcule retorno, lucro e probabilidade implícita de forma rápida e gratuita.</p>
            <Link to="/ferramentas/odds" className="btn-primary mt-5">Abrir calculadora gratuita <BlogIcon name="arrow" className="w-4 h-4" /></Link>
          </div>
        </ArticleSection>

        <section className="mt-12" aria-labelledby="faq-retorno-aposta">
          <h2 id="faq-retorno-aposta" className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-1)' }}>Perguntas frequentes sobre retorno de aposta</h2>
          <div className="mt-6 space-y-3">
            {BET_RETURN_FAQS.map(faq => (
              <details key={faq.question} className="card-glass p-5">
                <summary className="cursor-pointer font-semibold" style={{ color: 'var(--text-1)' }}>{faq.question}</summary>
                <p className="mt-3 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </article>

      {relatedPosts.length > 0 && (
        <section className="mt-12" aria-labelledby="posts-relacionados">
          <h2 id="posts-relacionados" className="section-title">Artigos relacionados</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-5">
            {relatedPosts.map(item => <BlogCard key={item.slug} post={item} category={getCategoryById(item.category)} />)}
          </div>
        </section>
      )}
    </>
  );
}
