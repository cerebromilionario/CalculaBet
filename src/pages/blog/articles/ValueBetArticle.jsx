import { Link } from 'react-router-dom';
import BlogCard from '../../../components/blog/BlogCard';
import BlogIcon from '../../../components/blog/BlogIcon';
import ArticleAffiliateBanner from '../../../components/ui/ArticleAffiliateBanner';
import { getCategoryById } from '../../../data/blog/blogData';
import { VALUE_BET_FAQS } from '../../../data/blog/valueBetFaqs';

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
    : { background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.18)' };
  return <div className="rounded-3xl p-5 my-7 leading-relaxed" style={styles}>{children}</div>;
}

function FormulaBox({ label, formula, children }) {
  return (
    <div className="rounded-3xl p-6 my-6" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(129,140,248,0.08))', border: '1px solid rgba(103,232,249,0.20)' }}>
      <p className="badge badge-cyan mb-4">{label}</p>
      <p className="text-xl sm:text-2xl font-bold leading-relaxed" style={{ color: 'var(--text-1)' }}>{formula}</p>
      {children && <div className="mt-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>{children}</div>}
    </div>
  );
}

const oddComparison = [
  ['Odd alta', 'Indica retorno potencial maior e probabilidade implícita menor.', 'Pode não ter valor se a chance real também for muito baixa.'],
  ['Odd com valor', 'Indica possível preço acima do justo para a probabilidade estimada.', 'Depende da comparação entre probabilidade implícita e estimativa própria.'],
  ['Odd baixa com valor', 'Pode parecer pouco atraente pelo retorno menor.', 'Pode ter EV positivo se a chance real for maior que a indicada pela odd.'],
];

const steps = [
  'Identifique a odd decimal oferecida para o mercado analisado.',
  'Calcule a probabilidade implícita usando 1 / odd × 100.',
  'Estime sua probabilidade real com método, dados e contexto, não apenas intuição.',
  'Compare as duas probabilidades: a estimada precisa superar a implícita para haver possível valor.',
  'Calcule o EV considerando lucro potencial, stake, probabilidade de vitória e probabilidade de perda.',
  'Avalie risco, banca, variância, limite de exposição e qualidade da sua estimativa.',
  'Decida com responsabilidade e registre o raciocínio, inclusive quando decidir não apostar.',
];

const commonErrors = [
  'Achar que odd alta sempre tem valor.',
  'Usar probabilidade sem método claro.',
  'Ignorar margem da casa e overround.',
  'Confundir palpite com estimativa probabilística.',
  'Não calcular probabilidade implícita.',
  'Não registrar odds, stakes, resultados e justificativas.',
  'Ignorar ROI, amostra e variância.',
  'Apostar mais por confiança excessiva.',
  'Não fazer gestão de banca.',
  'Achar que EV positivo garante vitória imediata.',
  'Não considerar sequências negativas.',
  'Seguir tips sem entender o cálculo por trás.',
];

export default function ValueBetArticle({ post, category, relatedPosts }) {
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
            <p className="badge badge-cyan mb-5">Guia premium de EV apostas</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">O que é Value Bet? Como Identificar Apostas com Valor Esperado Positivo</h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Muitos iniciantes confundem odd alta com boa aposta. O problema é que value bet não nasce do tamanho da odd, mas da comparação entre a probabilidade que você estima e a probabilidade implícita na cotação. Este guia explica value bet o que é, como calcular valor esperado apostas, como interpretar edge apostas e por que EV positivo não garante lucro imediato.
            </p>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              O conteúdo é educativo, matemático e responsável. O CalculaBet não é uma casa de apostas: oferece ferramentas, calculadoras e artigos para apoiar cálculos, sem recomendar entradas e sem prometer resultados.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/ferramentas/odds" className="btn-primary">Usar calculadora de odds <BlogIcon name="arrow" className="w-4 h-4" /></Link>
              <Link to="/jogo-responsavel" className="btn-ghost">Ler jogo responsável</Link>
            </div>
          </div>
          <aside className="rounded-3xl p-6" style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.16)' }} aria-label="Resumo do conceito de value bet">
            <h2 className="text-2xl font-bold">Resumo rápido</h2>
            <div className="mt-5 space-y-4">
              <div className="card-glass p-4"><h3 className="font-bold">Value bet</h3><p className="mt-2 text-sm" style={{ color: 'var(--text-2)' }}>Possível aposta de valor quando sua probabilidade estimada supera a probabilidade implícita da odd.</p></div>
              <div className="card-glass p-4"><h3 className="font-bold">EV positivo</h3><p className="mt-2 text-sm" style={{ color: 'var(--text-2)' }}>Expectativa matemática positiva se as premissas forem realistas.</p></div>
              <div className="card-glass p-4"><h3 className="font-bold">Risco</h3><p className="mt-2 text-sm" style={{ color: 'var(--text-2)' }}>Mesmo uma análise bem feita pode perder por variância, erro de estimativa ou eventos imprevisíveis.</p></div>
            </div>
          </aside>
        </header>

        <ArticleAffiliateBanner postSlug={post.slug} placement="mid-article" />

        <Callout tone="amber"><strong>Aviso responsável:</strong> conteúdo apenas educativo, indicado para maiores de 18 anos. Apostas envolvem riscos financeiros, não há garantia de ganhos, value bet não garante vitória e EV positivo não elimina perdas. Não aposte dinheiro essencial e use ferramentas como apoio ao cálculo, não como promessa de resultado. Leia também nossa página de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>jogo responsável</Link>.</Callout>

        <ArticleSection id="o-que-e-value-bet" title="O que é Value Bet?">
          <p>Value bet significa “aposta de valor”. Em termos simples, ocorre quando a odd oferecida parece maior do que deveria, considerando a probabilidade real que você estimou para aquele evento. A leitura central é: se a sua probabilidade estimada é maior que a probabilidade implícita da odd, pode existir uma aposta com valor.</p>
          <p>Exemplo conceitual: uma odd sugere que um resultado tem 40% de chance, mas sua análise, baseada em dados e contexto, estima 45%. Essa diferença pode indicar EV positivo apostas, desde que a estimativa seja de boa qualidade. A palavra “pode” é essencial, porque nenhum cálculo transforma um evento esportivo incerto em certeza.</p>
          <p>Portanto, value bet não é aposta garantida. É apenas uma forma de avaliar se a relação entre odd, probabilidade e risco parece matematicamente favorável. Se a probabilidade estimada estiver errada, a sensação de valor vira apenas uma falsa vantagem matemática apostas.</p>
        </ArticleSection>

        <ArticleSection id="odd-alta" title="Value Bet é a mesma coisa que odd alta?">
          <p>Não. Odd alta geralmente indica menor probabilidade implícita e retorno potencial maior. Isso pode parecer atraente, mas uma odd alta não tem valor se a chance real do evento for ainda menor do que a cotação sugere. Por outro lado, uma odd baixa pode ter valor se a probabilidade real estimada for superior à probabilidade implícita.</p>
          <p>O ponto central é que odds com valor dependem da relação entre preço e probabilidade. Uma cotação 5.00 pode ser ruim se o evento tiver apenas 10% de chance real estimada, enquanto uma odd 1.70 pode ser interessante se você estima chance real acima de 65%.</p>
          <Callout><strong>Uma odd alta não é necessariamente uma boa aposta. O que importa é comparar odd, probabilidade e risco.</strong></Callout>
          <div className="overflow-x-auto rounded-3xl border border-white/10">
            <table className="w-full text-left text-sm sm:text-base"><thead style={{ background: 'rgba(255,255,255,0.04)' }}><tr><th className="p-4">Conceito</th><th className="p-4">O que indica</th><th className="p-4">Cuidado principal</th></tr></thead><tbody>{oddComparison.map(row => <tr key={row[0]} className="border-t border-white/10" style={{ color: 'var(--text-2)' }}><td className="p-4 font-semibold" style={{ color: 'var(--text-1)' }}>{row[0]}</td><td className="p-4">{row[1]}</td><td className="p-4">{row[2]}</td></tr>)}</tbody></table>
          </div>
        </ArticleSection>

        <ArticleSection id="valor-esperado" title="O que é valor esperado em apostas?">
          <p>Valor esperado, ou EV, é uma estimativa matemática do resultado médio esperado ao longo do tempo. Em apostas, ele compara possível ganho, possível perda e probabilidade estimada. O EV pode ser positivo, negativo ou próximo de neutro.</p>
          <p>Quando o EV é positivo, a conta sugere que aquela decisão teria expectativa favorável em uma repetição hipotética de muitos cenários semelhantes. Isso não quer dizer que a próxima aposta será vencedora. Uma única partida, luta ou corrida continua sujeita a variância, lesões, cartões, clima, decisões táticas e muitos fatores imprevisíveis.</p>
          <Callout tone="amber"><strong>EV positivo não garante lucro imediato. O resultado de uma aposta individual continua incerto.</strong></Callout>
        </ArticleSection>

        <ArticleSection id="formula-ev" title="Fórmula do Valor Esperado (EV)">
          <FormulaBox label="Fórmula EV" formula="EV = (Probabilidade de vitória × Lucro potencial) - (Probabilidade de perda × Valor apostado)">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Probabilidade de vitória:</strong> chance estimada do evento acontecer.</li>
              <li><strong>Lucro potencial:</strong> valor ganho acima da stake.</li>
              <li><strong>Probabilidade de perda:</strong> 1 - probabilidade de vitória.</li>
              <li><strong>Valor apostado:</strong> stake usada na simulação.</li>
            </ul>
          </FormulaBox>
          <p>Para calcular corretamente, use probabilidades em decimal. Assim, 50% vira 0,50; 45% vira 0,45; e 55% vira 0,55. Essa organização reduz erros quando você quer saber como calcular value bet ou como calcular valor esperado apostas.</p>
        </ArticleSection>

        <ArticleSection id="exemplo-positivo" title="Exemplo simples de Value Bet">
          <p>Imagine uma análise com valor apostado de R$100, odd 2.20, lucro potencial de R$120, probabilidade estimada de 50% e probabilidade de perda de 50%.</p>
          <FormulaBox label="Exemplo de EV positivo" formula="EV = (0,50 × 120) - (0,50 × 100) = 60 - 50 = R$10" />
          <p>O EV positivo de R$10 significa que, considerando essa estimativa, a aposta teria valor esperado positivo. Não significa que a aposta será vencedora. Se a probabilidade real for menor que 50%, a conclusão muda. Por isso, a qualidade da estimativa é tão importante quanto a fórmula.</p>
        </ArticleSection>

        <ArticleSection id="exemplo-negativo" title="Exemplo de aposta sem valor">
          <p>Agora considere valor apostado de R$100, odd 2.00, lucro potencial de R$100, probabilidade estimada de 45% e probabilidade de perda de 55%.</p>
          <FormulaBox label="Exemplo de EV negativo" formula="EV = (0,45 × 100) - (0,55 × 100) = 45 - 55 = -R$10" />
          <p>EV negativo indica que, com essas premissas, a aposta não teria valor esperado positivo. Ela ainda pode vencer em uma ocorrência específica, mas isso não significa que era uma boa decisão matemática. Resultado isolado e qualidade da decisão são coisas diferentes.</p>
        </ArticleSection>

        <ArticleSection id="probabilidade-implicita" title="Como a probabilidade implícita ajuda a encontrar value bet?">
          <p>A <Link to="/blog/probabilidade-implicita-odds" className="font-semibold" style={{ color: '#67e8f9' }}>probabilidade implícita</Link> mostra a chance sugerida pela odd. Em odds decimais, a fórmula é: 1 / odd × 100. Uma odd 2.00 implica 50%; uma odd 2.50 implica 40%; uma odd 1.80 implica aproximadamente 55,56%.</p>
          <p>Para existir value bet, a sua probabilidade estimada precisa ser maior que a probabilidade implícita. Se uma odd 2.00 implica 50% e você estima 55%, pode existir valor. Se você estima 45%, a mesma odd não parece ter valor esperado positivo.</p>
          <p>Você pode usar a <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de odds</Link> para calcular odds e probabilidade, retorno e lucro, e também revisar o guia sobre <Link to="/blog/como-calcular-odds" className="font-semibold" style={{ color: '#67e8f9' }}>como calcular odds</Link> quando quiser reforçar a base.</p>
        </ArticleSection>

        <ArticleSection id="calculadora-odds" title="Como usar a Calculadora de Odds do CalculaBet para analisar value bet">
          <p>A <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>ferramenta de odds do CalculaBet</Link> ajuda a converter odd em probabilidade implícita, calcular retorno, calcular lucro, comparar cenários e entender se a cotação parece coerente com sua probabilidade estimada.</p>
          <p>O fluxo educativo é simples: informe stake e odd na calculadora de odds, observe retorno e lucro, converta a odd em probabilidade implícita e compare com sua estimativa própria. A ferramenta não diz se você deve apostar; ela reduz erro manual para que a análise fique mais clara.</p>
          <div className="rounded-3xl p-6 mt-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.16), rgba(52,211,153,0.10))', border: '1px solid rgba(103,232,249,0.22)' }}>
            <h2 className="text-2xl font-bold">Calcule probabilidade implícita antes de avaliar valor</h2>
            <p className="mt-3" style={{ color: 'var(--text-2)' }}>Use a Calculadora de Odds do CalculaBet para converter odds, estimar retorno e comparar cenários com mais organização.</p>
            <Link to="/ferramentas/odds" className="btn-primary mt-5">Abrir calculadora de odds <BlogIcon name="arrow" className="w-4 h-4" /></Link>
          </div>
        </ArticleSection>

        <ArticleSection id="edge" title="O que é edge em apostas esportivas?">
          <p>Edge é uma possível vantagem matemática percebida. Ela ocorre quando a probabilidade estimada é maior que a probabilidade implícita. Se uma odd indica 40% e você estima 45%, a diferença de 5 pontos percentuais pode ser chamada de edge.</p>
          <p>Em edge apostas, o risco está na palavra “estimada”. Se a sua leitura de 45% não tiver método, dados ou revisão, o edge pode ser apenas confiança excessiva. A vantagem matemática apostas só faz sentido quando a estimativa é realista e repetível.</p>
        </ArticleSection>

        <ArticleSection id="formula-edge" title="Fórmula simples para entender edge">
          <FormulaBox label="Fórmula edge" formula="Edge = Probabilidade estimada - Probabilidade implícita" />
          <p>Exemplo: odd 2.50 tem probabilidade implícita de 40%. Se você estima 45%, o edge estimado é de 5 pontos percentuais. Mas esse número depende totalmente da qualidade da estimativa. Uma estimativa ruim cria falsa sensação de valor.</p>
          <Callout><strong>A qualidade da estimativa de probabilidade é a parte mais importante do cálculo.</strong></Callout>
        </ArticleSection>

        <ArticleSection id="passo-a-passo" title="Como calcular value bet passo a passo">
          <ol className="space-y-3 list-decimal pl-5">{steps.map(step => <li key={step}>{step}</li>)}</ol>
          <p>Também é útil usar ferramentas relacionadas: o <Link to="/ferramentas/conversor" className="font-semibold" style={{ color: '#67e8f9' }}>conversor de odds</Link> quando a cotação não estiver em formato decimal, a página de <Link to="/ferramentas" className="font-semibold" style={{ color: '#67e8f9' }}>ferramentas</Link> para explorar calculadoras e o <Link to="/blog" className="font-semibold" style={{ color: '#67e8f9' }}>blog</Link> para revisar conceitos complementares.</p>
        </ArticleSection>

        <ArticleSection id="kelly" title="Value Bet e Critério de Kelly">
          <p>O <Link to="/blog/criterio-de-kelly-apostas" className="font-semibold" style={{ color: '#67e8f9' }}>Critério de Kelly</Link> usa odd e probabilidade estimada para calcular uma stake teórica. Value bet ajuda a identificar se existe possível vantagem; Kelly ajuda a dimensionar a stake quando essa vantagem é estimada.</p>
          <p>Os dois conceitos dependem de estimativas realistas. Kelly não deve ser usado com probabilidades inventadas, arredondadas por otimismo ou copiadas sem método. Para estudar exposição, combine o artigo de Kelly com a ferramenta de <Link to="/ferramentas/gestao-de-banca" className="font-semibold" style={{ color: '#67e8f9' }}>gestão de banca</Link>.</p>
        </ArticleSection>

        <ArticleSection id="roi" title="Value Bet e ROI">
          <p>Value bet é análise antes da aposta. <Link to="/blog/roi-apostas" className="font-semibold" style={{ color: '#67e8f9' }}>ROI em apostas</Link> mede desempenho depois das apostas, comparando lucro líquido e total apostado. Um ROI positivo pode indicar bom histórico, mas não garante futuro.</p>
          <p>Da mesma forma, EV positivo pode não aparecer no curto prazo por causa da variância. Por isso, registrar apostas e usar a <Link to="/ferramentas/roi" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de ROI</Link> ajuda a separar sensação de resultado, sempre com amostra suficiente e leitura responsável.</p>
        </ArticleSection>

        <ArticleSection id="gestao-de-banca" title="Value Bet e gestão de banca">
          <p>Mesmo uma aposta com valor esperado positivo pode perder. Gestão de banca controla exposição: a stake deve respeitar banca, risco e limites pessoais. Evite colocar grande parte da banca em uma única aposta, mesmo quando o cálculo parecer favorável.</p>
          <p>Longo prazo não elimina risco de curto prazo. Sequências negativas existem e podem afetar emocionalmente qualquer pessoa. Revise o guia de <Link to="/blog/o-que-e-gestao-de-banca" className="font-semibold" style={{ color: '#67e8f9' }}>gestão de banca</Link>, simule percentuais na <Link to="/ferramentas/gestao-de-banca" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de gestão de banca</Link> e mantenha limites alinhados com <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#67e8f9' }}>apostas responsáveis</Link>.</p>
        </ArticleSection>

        <ArticleSection id="multiplas" title="Value Bet em apostas múltiplas">
          <p>Em <Link to="/blog/o-que-e-aposta-multipla" className="font-semibold" style={{ color: '#67e8f9' }}>apostas múltiplas</Link>, odds e probabilidades são combinadas. O retorno alto pode parecer atraente, mas é mais difícil estimar corretamente todas as probabilidades e a correlação entre seleções.</p>
          <p>Uma múltipla pode ter EV negativo mesmo parecendo “quase lá” pelo valor de retorno. Se as seleções não tiverem valor individual ou conjunto, o bilhete apenas amplia variância. Iniciantes devem ter cuidado, simular cenários na <Link to="/ferramentas/multipla" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de aposta múltipla</Link> e evitar stakes desproporcionais.</p>
        </ArticleSection>

        <ArticleSection id="erros-comuns" title="Erros comuns ao procurar Value Bet">
          <div className="grid sm:grid-cols-2 gap-4">{commonErrors.map(error => <div key={error} className="card-glass p-5"><p>{error}</p></div>)}</div>
          <p>Outro erro importante é ignorar a <Link to="/politica-de-afiliados" className="font-semibold" style={{ color: '#67e8f9' }}>política editorial e de afiliados</Link> de sites que publicam conteúdo sobre apostas. Entender incentivos, limites e transparência ajuda a consumir informação de forma crítica.</p>
        </ArticleSection>

        <ArticleSection id="garante-lucro" title="Value Bet garante lucro?">
          <p>Não. Value bet não garante que uma aposta específica será vencedora. Mesmo com EV positivo, perdas podem acontecer por variância, erro de análise, mudança de contexto ou simples incerteza do esporte.</p>
          <p>O conceito só faz sentido com estimativas realistas e amostra suficiente. Apostas envolvem risco financeiro; portanto, não trate value bet como renda, investimento seguro ou caminho para recuperar perdas.</p>
          <Callout tone="amber"><strong>EV positivo não é garantia de lucro imediato. É uma estimativa matemática baseada em probabilidades.</strong></Callout>
        </ArticleSection>

        <ArticleSection id="responsabilidade" title="Como estudar Value Bet com responsabilidade">
          <p>Estude odds, aprenda a calcular probabilidade implícita, registre apostas, acompanhe ROI apostas, use stakes controladas, evite decisões por emoção, revise estimativas e faça pausas quando necessário. O objetivo não é apostar mais, e sim entender melhor quando uma cotação parece ou não fazer sentido.</p>
          <p>Se houver ansiedade, tentativa de recuperar prejuízo, uso de dinheiro essencial ou dificuldade de parar, interrompa a atividade e consulte a página de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#67e8f9' }}>jogo responsável</Link>. Ferramentas são apoio ao cálculo; elas não preveem resultados.</p>
        </ArticleSection>

        <ArticleSection id="conclusao" title="Conclusão">
          <p>Value bet é uma aposta que pode ter valor esperado positivo quando a probabilidade estimada supera a probabilidade implícita da odd. O EV ajuda a medir a expectativa matemática, e o edge mostra a diferença entre sua estimativa e o preço oferecido.</p>
          <p>Mas edge não garante acerto, EV positivo não elimina perdas e gestão de banca continua essencial. Use as ferramentas do CalculaBet para calcular, comparar e aprender, nunca como promessa de lucro.</p>
          <div className="rounded-3xl p-6 mt-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.14), rgba(52,211,153,0.10))', border: '1px solid rgba(103,232,249,0.18)' }}>
            <h2 className="text-2xl font-bold">Avalie odds com mais clareza</h2>
            <p className="mt-3" style={{ color: 'var(--text-2)' }}>Use a Calculadora de Odds do CalculaBet para calcular probabilidade implícita, retorno e lucro antes de avaliar se uma odd pode ter valor.</p>
            <div className="mt-5 flex flex-col sm:flex-row justify-center gap-3"><Link to="/ferramentas/odds" className="btn-primary">Calculadora de Odds <BlogIcon name="arrow" className="w-4 h-4" /></Link><Link to="/ferramentas/roi" className="btn-ghost">Calculadora de ROI</Link><Link to="/ferramentas/gestao-de-banca" className="btn-ghost">Gestão de banca</Link></div>
          </div>
        </ArticleSection>

        <ArticleAffiliateBanner postSlug={post.slug} placement="pre-faq" />

        <section className="mt-14" aria-labelledby="faq-value-bet">
          <p className="badge badge-cyan mb-4">FAQ SEO</p>
          <h2 id="faq-value-bet" className="text-3xl font-bold">Perguntas frequentes sobre value bet e EV apostas</h2>
          <div className="mt-6 space-y-3">{VALUE_BET_FAQS.map(faq => <details key={faq.question} className="card-glass p-5"><summary className="cursor-pointer font-semibold" style={{ color: 'var(--text-1)' }}>{faq.question}</summary><p className="mt-3 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>{faq.answer}</p></details>)}</div>
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
