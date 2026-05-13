import { Link } from 'react-router-dom';
import BlogCard from '../../../components/blog/BlogCard';
import BlogIcon from '../../../components/blog/BlogIcon';
import { getCategoryById } from '../../../data/blog/blogData';
import { ODDS_FORMATS_FAQS } from '../../../data/blog/oddsFormatsFaqs';

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));
}

function ArticleSection({ id, title, children }) {
  return (
    <section id={id} className="mt-12 scroll-mt-28">
      <h2 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-1)' }}>{title}</h2>
      <div className="mt-5 space-y-4 leading-relaxed" style={{ color: 'var(--text-2)' }}>{children}</div>
    </section>
  );
}

function Callout({ tone = 'cyan', children }) {
  const styles = tone === 'amber'
    ? { background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.18)' }
    : { background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.16)' };
  return <div className="rounded-3xl p-5 my-7 font-medium leading-relaxed" style={styles}>{children}</div>;
}

function FormulaBlock({ children }) {
  return (
    <div className="rounded-3xl p-5 my-6 overflow-x-auto" style={{ background: 'rgba(15,23,42,0.72)', border: '1px solid rgba(103,232,249,0.16)' }}>
      <p className="badge badge-cyan mb-3">Fórmula</p>
      <code className="block whitespace-pre-wrap text-base sm:text-lg font-bold" style={{ color: '#67e8f9' }}>{children}</code>
    </div>
  );
}

function ResponsiveTable({ headers, rows }) {
  return (
    <div className="my-7 overflow-x-auto rounded-3xl" style={{ border: '1px solid rgba(255,255,255,0.10)' }}>
      <table className="min-w-full text-sm">
        <thead style={{ background: 'rgba(255,255,255,0.07)' }}>
          <tr>{headers.map(header => <th key={header} className="px-4 py-3 text-left font-semibold">{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.join('-')} style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {row.map(cell => <td key={cell} className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const formatCards = [
  { title: 'Odds decimais', example: '2.50', text: 'Formato mais comum no Brasil. O retorno total é valor apostado × odd decimal.' },
  { title: 'Odds americanas', example: '+150 / -200', text: 'Formato comum nos Estados Unidos. Usa sinais para indicar lucro ou stake necessária.' },
  { title: 'Odds fracionárias', example: '3/2', text: 'Formato tradicional no Reino Unido. Mostra lucro potencial em relação à stake.' },
];

const decimalRows = [
  ['1.50', 'R$10', 'R$15,00', 'R$5,00', '66,67%'],
  ['2.00', 'R$10', 'R$20,00', 'R$10,00', '50%'],
  ['2.50', 'R$10', 'R$25,00', 'R$15,00', '40%'],
  ['3.25', 'R$10', 'R$32,50', 'R$22,50', '30,77%'],
];

const comparisonRows = [
  ['1.50', '-200', '1/2', '66,67%'],
  ['2.00', '+100', '1/1', '50%'],
  ['2.50', '+150', '3/2', '40%'],
  ['3.00', '+200', '2/1', '33,33%'],
  ['5.00', '+400', '4/1', '20%'],
];

const fractionExamples = [
  { odd: '1/2', text: 'A cada R$2 apostados, o lucro potencial é R$1. Em stake de R$10, lucro de R$5 e retorno total de R$15.' },
  { odd: '2/1', text: 'A cada R$1 apostado, o lucro potencial é R$2. Em stake de R$10, lucro de R$20 e retorno total de R$30.' },
  { odd: '5/2', text: 'A cada R$2 apostados, o lucro potencial é R$5. Em stake de R$10, lucro de R$25 e retorno total de R$35.' },
];

const commonErrors = [
  'Confundir odd americana positiva com odd decimal.',
  'Achar que odd alta é sempre melhor, ignorando que a probabilidade implícita costuma ser menor.',
  'Não entender que odds negativas indicam quanto precisa ser apostado para buscar 100 unidades de lucro.',
  'Confundir lucro com retorno total da aposta.',
  'Ignorar probabilidade implícita odds e comparar apenas valores de payout.',
  'Não considerar que a margem da casa pode estar embutida nas cotações.',
  'Comparar odds em formatos diferentes sem converter todas para o mesmo padrão.',
  'Apostar sem entender o cálculo básico de retorno, lucro e exposição.',
  'Usar odds como garantia de resultado, quando elas são apenas cotações de mercado.',
];

export default function OddsFormatsArticle({ post, category, relatedPosts }) {
  return (
    <>
      <article className="rounded-[2rem] p-6 sm:p-8 lg:p-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.058), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.09)' }}>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="badge" style={{ color: category?.color || '#22d3ee', borderColor: `${category?.color || '#22d3ee'}35`, background: `${category?.color || '#22d3ee'}10` }}>{category?.name}</span>
          <span className="badge">{post.readingTime}</span>
          <span className="badge">Publicado em {formatDate(post.date)}</span>
          <span className="badge">Atualizado em {formatDate(post.updatedAt)}</span>
        </div>

        <header className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">O que são Odds Decimais, Americanas e Fracionárias? Guia Completo</h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Odds são a base para calcular retorno de aposta, lucro em apostas e probabilidade implícita. Diferentes países, conteúdos e casas podem exibir formatos diferentes: no Brasil, as odds decimais são mais comuns; em materiais internacionais, odds americanas aparecem com frequência; e odds fracionárias seguem tradicionais no Reino Unido. Entender cada formato evita confusão e o <Link to="/ferramentas/conversor" className="font-semibold" style={{ color: '#67e8f9' }}>Conversor de Odds do CalculaBet</Link> facilita transformar cotações em segundos.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/ferramentas/conversor" className="btn-primary">Usar Conversor de Odds <BlogIcon name="arrow" className="w-4 h-4" /></Link>
              <Link to="/ferramentas/odds" className="btn-secondary">Abrir calculadora de odds</Link>
            </div>
          </div>
          <div className="rounded-[2rem] p-6" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(52,211,153,0.08))', border: '1px solid rgba(103,232,249,0.18)' }}>
            <p className="badge badge-cyan mb-4">Guia educativo</p>
            <div className="space-y-4">
              {formatCards.map(card => (
                <div key={card.title} className="card-glass p-4">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="font-bold">{card.title}</h2>
                    <span className="font-bold" style={{ color: '#67e8f9' }}>{card.example}</span>
                  </div>
                  <p className="mt-2 text-sm" style={{ color: 'var(--text-2)' }}>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <Callout>Odds mostram retorno potencial e probabilidade implícita, mas não garantem resultado.</Callout>

        <ArticleSection id="o-que-sao-odds" title="O que são odds em apostas esportivas?">
          <p>Odds em apostas esportivas representam a cotação de uma seleção. Elas indicam quanto um resultado pode retornar se a aposta for vencedora e também permitem calcular a probabilidade implícita sugerida pelo mercado.</p>
          <p>É importante separar matemática de previsão. Uma odd não garante que um time, atleta ou mercado vai acontecer. Ela pode mudar conforme volume de apostas, notícias, risco percebido, margem da casa e ajustes de mercado. Por isso, use uma <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de odds</Link> e leia também o guia sobre <Link to="/blog/como-calcular-odds" className="font-semibold" style={{ color: '#67e8f9' }}>como calcular odds</Link> para entender os números antes de qualquer decisão.</p>
        </ArticleSection>

        <ArticleSection id="odds-decimais" title="O que são odds decimais?">
          <p>Se você pesquisou “odds decimais o que é”, a resposta simples é: odds decimais são cotações exibidas como 1.50, 2.00, 3.25 ou 5.00. Esse é o formato de odds mais comum no Brasil e em boa parte da Europa porque o cálculo de retorno é direto.</p>
          <FormulaBlock>{'Retorno = Valor apostado × Odd decimal'}</FormulaBlock>
          <p>Exemplo: em uma aposta de R$10 com odd 2.50, o retorno total potencial é R$25. Desse valor, R$10 correspondem à stake original e R$15 representam lucro potencial. A diferença entre retorno e lucro é essencial para evitar interpretações erradas.</p>
        </ArticleSection>

        <ArticleSection id="interpretar-decimais" title="Como interpretar odds decimais">
          <p>Odds menores normalmente indicam menor retorno potencial e maior probabilidade implícita. Odds maiores indicam maior retorno potencial e menor probabilidade implícita. Uma odd 2.00 representa retorno dobrado, mas não significa 100% de chance de acerto: ela sugere aproximadamente 50% de probabilidade implícita antes de considerar margens e contexto.</p>
          <ResponsiveTable headers={['Odd decimal', 'Aposta', 'Retorno', 'Lucro', 'Probabilidade implícita aproximada']} rows={decimalRows} />
        </ArticleSection>

        <ArticleSection id="odds-americanas" title="O que são odds americanas?">
          <p>Odds americanas são muito usadas nos Estados Unidos e aparecem com sinal positivo ou negativo, como +150 e -200. Ao perguntar “odds americanas como funciona”, pense em duas leituras: odds positivas mostram quanto se ganha de lucro a cada 100 unidades apostadas; odds negativas mostram quanto é preciso apostar para buscar 100 unidades de lucro.</p>
        </ArticleSection>

        <ArticleSection id="americanas-positivas" title="Como funcionam odds americanas positivas">
          <p>Em +150, uma aposta de R$100 pode gerar lucro potencial de R$150. O retorno total seria R$250: R$100 da stake mais R$150 de lucro. Quanto maior o número positivo, maior o retorno potencial e menor tende a ser a probabilidade implícita.</p>
        </ArticleSection>

        <ArticleSection id="americanas-negativas" title="Como funcionam odds americanas negativas">
          <p>Em -200, é preciso apostar R$200 para ter lucro potencial de R$100. O retorno total seria R$300 se a aposta fosse vencedora. Odds negativas geralmente aparecem em favoritos, mas isso não garante resultado. Favorito também perde, e a ferramenta apenas mostra o cálculo.</p>
        </ArticleSection>

        <ArticleSection id="odds-fracionarias" title="O que são odds fracionárias?">
          <p>Odds fracionárias são tradicionais no Reino Unido e aparecem como 1/2, 2/1 ou 5/2. Diferentemente das odds decimais, elas mostram o lucro em relação ao valor apostado. Odds 2/1 significam lucro potencial de 2 unidades para cada 1 unidade apostada.</p>
        </ArticleSection>

        <ArticleSection id="fracionarias-pratica" title="Como funcionam odds fracionárias na prática">
          <div className="grid md:grid-cols-3 gap-4">
            {fractionExamples.map(example => <div key={example.odd} className="card-glass p-5"><h3 className="text-2xl font-bold" style={{ color: '#67e8f9' }}>{example.odd}</h3><p className="mt-3 text-sm leading-relaxed">{example.text}</p></div>)}
          </div>
          <p>Para comparar odds fracionárias com odds decimais, lembre-se: a fração mostra lucro, enquanto a decimal mostra retorno total. Por isso, 2/1 equivale a 3.00 decimal, não a 2.00.</p>
        </ArticleSection>

        <ArticleSection id="converter-odds" title="Como converter odds entre formatos">
          <p>É possível converter odds manualmente, mas um erro de arredondamento ou interpretação pode confundir retorno, lucro e probabilidade. Antes de comparar odds em formatos diferentes, converta todas para o mesmo padrão.</p>
          <p>Para reduzir erro manual, use o <Link to="/ferramentas/conversor" className="font-semibold" style={{ color: '#67e8f9' }}>conversor de odds</Link>, a opção de <Link to="/ferramentas/conversor" className="font-semibold" style={{ color: '#67e8f9' }}>converter odds online</Link>, a <Link to="/ferramentas/conversor" className="font-semibold" style={{ color: '#67e8f9' }}>ferramenta de conversão de odds do CalculaBet</Link> ou o <Link to="/ferramentas/conversor" className="font-semibold" style={{ color: '#67e8f9' }}>conversor de odds decimais, americanas e fracionárias</Link>.</p>
        </ArticleSection>

        <ArticleSection id="formulas" title="Fórmulas de conversão de odds">
          <FormulaBlock>{'Probabilidade implícita = 1 / odd decimal × 100\n\nDecimal para americana:\nse decimal >= 2: Americana = (decimal - 1) × 100\nse decimal < 2: Americana = -100 / (decimal - 1)\n\nAmericana para decimal:\nse positiva: Decimal = (americana / 100) + 1\nse negativa: Decimal = (100 / |americana|) + 1\n\nFracionária para decimal:\nDecimal = (numerador / denominador) + 1\n\nDecimal para fracionária:\nFracionária = decimal - 1, convertido em fração'}</FormulaBlock>
          <p>Arredondamentos podem ocorrer, especialmente ao converter decimal para americana ou decimal para fracionária. Ao comparar mercados, use o mesmo critério de arredondamento e confira a probabilidade implícita.</p>
        </ArticleSection>

        <ArticleSection id="tabela-comparativa" title="Tabela comparativa de odds decimais, americanas e fracionárias">
          <ResponsiveTable headers={['Decimal', 'Americana', 'Fracionária', 'Probabilidade implícita aproximada']} rows={comparisonRows} />
        </ArticleSection>

        <ArticleSection id="melhor-formato" title="Qual formato de odds é melhor?">
          <p>Depende do costume do usuário. No Brasil, a odd decimal costuma ser mais simples porque informa o retorno total diretamente. A odd americana é comum em conteúdos dos EUA, enquanto a fracionária é comum no Reino Unido. O importante não é decorar um padrão, mas entender retorno, lucro, probabilidade e como converter odds sem confusão.</p>
        </ArticleSection>

        <ArticleSection id="probabilidade" title="Odds e probabilidade implícita">
          <p>Todo formato pode ser convertido em probabilidade implícita. Essa leitura ajuda a entender a chance sugerida pela cotação, mas não é previsão garantida. Além disso, a margem da casa pode estar embutida nas odds, fazendo com que a soma das probabilidades de um mercado supere 100%.</p>
          <p>Para aprofundar, veja o guia de <Link to="/blog/probabilidade-implicita-odds" className="font-semibold" style={{ color: '#67e8f9' }}>probabilidade implícita</Link> e use a <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de odds</Link> como apoio ao cálculo.</p>
        </ArticleSection>

        <ArticleSection id="como-usar-conversor" title="Como usar o Conversor de Odds do CalculaBet">
          <ol className="space-y-3 list-decimal pl-6">
            <li>Escolha o formato de entrada: decimal, americano ou fracionário.</li>
            <li>Insira a odd que deseja converter.</li>
            <li>Veja a conversão para decimal, americana e fracionária.</li>
            <li>Confira a probabilidade implícita calculada.</li>
            <li>Use o resultado para entender melhor o mercado, sem tratar a odd como promessa de resultado.</li>
          </ol>
          <div className="rounded-3xl p-6 mt-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.14), rgba(52,211,153,0.10))', border: '1px solid rgba(103,232,249,0.18)' }}>
            <h2 className="text-2xl font-bold">Converta odds em segundos</h2>
            <p className="mt-3" style={{ color: 'var(--text-2)' }}>Use o Conversor de Odds do CalculaBet para transformar odds decimais, americanas e fracionárias e conferir probabilidade implícita.</p>
            <Link to="/ferramentas/conversor" className="btn-primary mt-5">Abrir Conversor de Odds <BlogIcon name="arrow" className="w-4 h-4" /></Link>
          </div>
        </ArticleSection>

        <ArticleSection id="erros-comuns" title="Erros comuns ao interpretar formatos de odds">
          <ul className="space-y-3 list-disc pl-6">{commonErrors.map(error => <li key={error}>{error}</li>)}</ul>
        </ArticleSection>

        <ArticleSection id="quando-usar" title="Quando usar um conversor de odds?">
          <p>Use um conversor de odds ao comparar casas, ler conteúdos internacionais, encontrar odds americanas ou fracionárias, estudar mercados fora do Brasil ou conferir probabilidade implícita sem fazer tudo manualmente. Também é útil antes de usar ferramentas como <Link to="/ferramentas/multipla" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de múltiplas</Link>, <Link to="/ferramentas/roi" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de ROI</Link> e <Link to="/ferramentas/gestao-de-banca" className="font-semibold" style={{ color: '#67e8f9' }}>gestão de banca</Link>.</p>
        </ArticleSection>

        <ArticleSection id="responsabilidade" title="Aviso educativo e jogo responsável">
          <Callout tone="amber">Este conteúdo é apenas educativo. Apostas envolvem riscos financeiros, são destinadas somente a maiores de 18 anos, não há garantia de ganhos e odds não preveem resultados. Use ferramentas como apoio ao cálculo, não como promessa de resultado.</Callout>
          <p>O CalculaBet não é casa de apostas, não recebe apostas e não processa pagamentos. Consulte a página de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>jogo responsável</Link>, conheça nossas <Link to="/ferramentas" className="font-semibold" style={{ color: '#67e8f9' }}>ferramentas para apostas</Link>, visite o <Link to="/blog" className="font-semibold" style={{ color: '#67e8f9' }}>blog</Link> e leia a <Link to="/politica-de-afiliados" className="font-semibold" style={{ color: '#67e8f9' }}>política de afiliados</Link>.</p>
        </ArticleSection>

        <ArticleSection id="conclusao" title="Conclusão">
          <p>Odds decimais são as mais comuns no Brasil e facilitam o cálculo do retorno total. Odds americanas usam sinais positivo e negativo para mostrar lucro ou stake necessária. Odds fracionárias exibem o lucro em formato de fração. Todos os formatos podem ser convertidos, e o ponto central é entender retorno, lucro e probabilidade implícita.</p>
          <p><Link to="/ferramentas/conversor" className="font-semibold" style={{ color: '#67e8f9' }}>Use o Conversor de Odds do CalculaBet</Link> para transformar odds decimais, americanas e fracionárias em segundos.</p>
        </ArticleSection>

        <section className="mt-12" aria-labelledby="faq-odds-formatos">
          <h2 id="faq-odds-formatos" className="text-3xl font-bold tracking-tight">FAQ sobre odds decimais, americanas e fracionárias</h2>
          <div className="mt-6 space-y-3">
            {ODDS_FORMATS_FAQS.map(faq => (
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
          <div className="mt-6 grid md:grid-cols-3 gap-5">{relatedPosts.map(item => <BlogCard key={item.slug} post={item} category={getCategoryById(item.category)} />)}</div>
        </section>
      )}
    </>
  );
}
