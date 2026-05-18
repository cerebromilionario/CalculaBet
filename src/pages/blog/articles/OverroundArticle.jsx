import { Link } from 'react-router-dom';
import BlogCard from '../../../components/blog/BlogCard';
import BlogIcon from '../../../components/blog/BlogIcon';
import ArticleAffiliateBanner from '../../../components/ui/ArticleAffiliateBanner';
import { getCategoryById } from '../../../data/blog/blogData';
import { OVERROUND_FAQS } from '../../../data/blog/overroundFaqs';

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

const marginRanges = [
  ['< 3%', 'Muito baixa', 'Comum em exchanges ou mercados altamente competitivos.'],
  ['3% – 5%', 'Baixa', 'Plataformas mais competitivas em mercados principais.'],
  ['5% – 8%', 'Moderada', 'Faixa comum em casas tradicionais para grandes jogos.'],
  ['8% – 12%', 'Alta', 'Mercados de nicho ou ligas menos populares.'],
  ['> 12%', 'Muito alta', 'Mercados exóticos, especiais ou com baixa liquidez.'],
];

const twoResultExample = [
  ['Resultado A', '1.85', '54,05%'],
  ['Resultado B', '2.05', '48,78%'],
  ['Total', '—', '102,83%'],
];

const oneX2Example = [
  ['Vitória mandante', '2.20', '45,45%'],
  ['Empate', '3.30', '30,30%'],
  ['Vitória visitante', '3.20', '31,25%'],
  ['Total', '—', '107,00%'],
];

const commonErrors = [
  'Esquecer o empate no mercado 1X2 — invalida o cálculo.',
  'Misturar odds de plataformas diferentes no mesmo cálculo.',
  'Usar odds desatualizadas — cotações mudam constantemente.',
  'Confundir overround com payout — são cálculos inversos.',
  'Achar que margem baixa garante que a odd tem valor para aquela aposta.',
  'Aplicar o cálculo em mercados com regras diferentes (ex: empate anulado).',
  'Inserir odds fracionárias ou americanas sem converter para decimal.',
];

export default function OverroundArticle({ post, category, relatedPosts }) {
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
            <p className="badge badge-cyan mb-5">Guia educativo de odds e margem</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">Overround nas Apostas: Como Calcular a Margem da Casa pelas Odds</h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Toda odd publicada carrega uma margem embutida, chamada de overround ou margem da casa. Ela não aparece como taxa separada — está diluída nas cotações de todos os resultados. Entender o que é overround, como calcular e o que ele revela sobre o preço das odds é uma leitura matemática fundamental para qualquer apostador que quer tomar decisões mais informadas.
            </p>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Este guia é educativo e matemático. O CalculaBet não é uma casa de apostas: oferece ferramentas, calculadoras e artigos para apoiar cálculos, sem recomendar entradas e sem prometer resultados financeiros.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/calculadoras/overround" className="btn-primary">Usar calculadora de overround <BlogIcon name="arrow" className="w-4 h-4" /></Link>
              <Link to="/jogo-responsavel" className="btn-ghost">Ler jogo responsável</Link>
            </div>
          </div>
          <aside className="rounded-3xl p-6" style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.16)' }} aria-label="Resumo do conceito de overround">
            <h2 className="text-2xl font-bold">Resumo rápido</h2>
            <div className="mt-5 space-y-4">
              <div className="card-glass p-4"><h3 className="font-bold">Overround</h3><p className="mt-2 text-sm" style={{ color: 'var(--text-2)' }}>Soma das probabilidades implícitas de todos os resultados do mercado. Mercado justo = 100%. Acima de 100% = margem embutida.</p></div>
              <div className="card-glass p-4"><h3 className="font-bold">Margem da casa</h3><p className="mt-2 text-sm" style={{ color: 'var(--text-2)' }}>Overround menos 100%. Percentual que indica quanto as odds foram ajustadas abaixo do valor justo.</p></div>
              <div className="card-glass p-4"><h3 className="font-bold">Payout teórico</h3><p className="mt-2 text-sm" style={{ color: 'var(--text-2)' }}>Proporção do volume apostado devolvida matematicamente. Calculado como 1 ÷ overround decimal.</p></div>
            </div>
          </aside>
        </header>

        <ArticleAffiliateBanner postSlug={post.slug} placement="mid-article" />

        <Callout tone="amber"><strong>Aviso responsável:</strong> conteúdo apenas educativo, indicado para maiores de 18 anos. Apostas envolvem riscos financeiros. Overround não prevê resultados e margem baixa não garante retorno positivo. Não aposte dinheiro essencial. Leia nossa página de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>jogo responsável</Link>.</Callout>

        <ArticleSection id="o-que-e-overround" title="O que é Overround nas Apostas?">
          <p>Overround é um conceito da matemática das apostas que descreve a soma das probabilidades implícitas de todos os resultados possíveis de um mercado. Em um mundo sem margens, se você somar as chances de todos os resultados de um evento, chegaria exatamente a 100%. Mas na prática, essa soma é sempre maior — e o excedente é o overround.</p>
          <p>Imagine um mercado simples com dois resultados, como "sim" e "não". Se as odds fossem perfeitamente justas, a soma das probabilidades implícitas seria exatamente 100%. Mas se a plataforma publicar odds ajustadas para incluir margem, essa soma chegará a, por exemplo, 104%. O overround é 104% e a margem embutida é 4%.</p>
          <p>Na prática, o overround é a expressão matemática da vantagem estrutural de uma casa de apostas sobre o mercado. Ele não é cobrado como taxa separada — está incorporado diretamente nas cotações publicadas, tornando as odds ligeiramente menores do que seriam em um mercado justo.</p>
          <Callout><strong>Overround = soma das probabilidades implícitas de todos os resultados. Quanto maior, maior a margem embutida nas odds.</strong></Callout>
          <p>É importante entender que o overround é uma característica do mercado como um todo, não de uma aposta individual. Um mercado com overround de 108% não significa que cada odd individual está 8% abaixo do justo — a margem pode ser distribuída de forma desigual entre os resultados.</p>
        </ArticleSection>

        <ArticleSection id="margem-da-casa" title="O que é Margem da Casa?">
          <p>Margem da casa é o nome comercial para o excedente do overround acima de 100%. Se o overround de um mercado é 106,5%, a margem da casa é 6,5%. Esse número representa, em termos teóricos, quanto as odds foram comprimidas em relação ao valor justo do mercado.</p>
          <p>A margem não é cobrada como uma taxa visível ao apostador. Ela está embutida nas cotações: em vez de publicar a odd 2.00 para um resultado com 50% de probabilidade, a casa pode publicar 1.91, gerando probabilidade implícita de 52,36% para aquele resultado. O excedente percentual, somado nos dois resultados, compõe a margem.</p>
          <p>A relação entre overround e margem é direta:</p>
          <FormulaBox label="Margem da casa" formula="Margem (%) = Overround (%) − 100%">
            Exemplo: overround de 105,26% → margem = 5,26%.
          </FormulaBox>
          <p>Uma margem menor, em termos gerais, indica odds mais próximas do valor justo para aquele mercado específico. Mas vale lembrar que a margem é uma métrica de mercado, não uma previsão de resultado. Uma odd pode estar num mercado de baixa margem e ainda assim não ter valor para uma aposta específica.</p>
        </ArticleSection>

        <ArticleSection id="como-calcular-overround" title="Como Calcular Overround: Fórmula Passo a Passo">
          <p>O cálculo do overround é simples e pode ser feito com qualquer calculadora. O processo consiste em converter cada odd em probabilidade implícita e somar todos os valores. Veja a fórmula:</p>
          <FormulaBox label="Fórmula do overround" formula="Overround (%) = [(1 ÷ odd₁) + (1 ÷ odd₂) + ... + (1 ÷ oddₙ)] × 100">
            Onde cada parcela representa a probabilidade implícita de um resultado. A soma total, multiplicada por 100, é o overround percentual.
          </FormulaBox>
          <p>O cálculo passo a passo funciona assim:</p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>Colete todas as odds do mercado (todos os resultados possíveis).</li>
            <li>Para cada odd, divida 1 pela odd: probabilidade implícita = 1 ÷ odd.</li>
            <li>Some todas as probabilidades implícitas.</li>
            <li>Multiplique por 100 para expressar em percentual.</li>
            <li>Subtraia 100 para obter a margem da casa.</li>
          </ol>
          <p>Para calcular rapidamente, use a <Link to="/calculadoras/overround" className="font-semibold" style={{ color: '#22d3ee' }}>Calculadora de Overround</Link>, que aceita qualquer número de resultados e exibe automaticamente overround, margem e payout.</p>
        </ArticleSection>

        <ArticleSection id="exemplo-dois-resultados" title="Exemplo Prático: Mercado de 2 Resultados">
          <p>Mercados de dois resultados são os mais simples de calcular: cara ou coroa, over/under, handicap asiático. Veja um exemplo com odds 1.85 e 2.05:</p>
          <div className="overflow-x-auto rounded-3xl border border-white/10">
            <table className="w-full text-left text-sm sm:text-base">
              <thead style={{ background: 'rgba(255,255,255,0.04)' }}>
                <tr><th className="p-4">Resultado</th><th className="p-4">Odd</th><th className="p-4">Prob. implícita</th></tr>
              </thead>
              <tbody>
                {twoResultExample.map((row, i) => (
                  <tr key={i} className="border-t border-white/10" style={{ color: 'var(--text-2)' }}>
                    <td className="p-4 font-semibold" style={{ color: 'var(--text-1)' }}>{row[0]}</td>
                    <td className="p-4">{row[1]}</td>
                    <td className="p-4" style={{ color: i === 2 ? '#22d3ee' : undefined }}>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>Overround = 102,83%. Margem = 2,83%. Payout teórico = 1 ÷ 1,0283 ≈ 97,25%.</p>
          <p>Isso significa que, matematicamente, para cada R$ 100 apostados nesse mercado, a expectativa de retorno ao conjunto de apostadores é de R$ 97,25 — considerando odds fixas e distribuição uniforme das apostas, o que raramente ocorre na prática real.</p>
          <Callout><strong>Payout teórico é uma estimativa matemática baseada nas odds, não uma promessa de retorno real para apostas individuais.</strong></Callout>
        </ArticleSection>

        <ArticleSection id="exemplo-1x2-futebol" title="Exemplo Prático: Mercado 1X2 no Futebol">
          <p>O mercado 1X2 (vitória mandante, empate, vitória visitante) é o mais comum no futebol. É fundamental incluir os três resultados no cálculo — omitir o empate invalida o overround e subestima a margem real.</p>
          <div className="overflow-x-auto rounded-3xl border border-white/10">
            <table className="w-full text-left text-sm sm:text-base">
              <thead style={{ background: 'rgba(255,255,255,0.04)' }}>
                <tr><th className="p-4">Resultado</th><th className="p-4">Odd</th><th className="p-4">Prob. implícita</th></tr>
              </thead>
              <tbody>
                {oneX2Example.map((row, i) => (
                  <tr key={i} className="border-t border-white/10" style={{ color: 'var(--text-2)' }}>
                    <td className="p-4 font-semibold" style={{ color: 'var(--text-1)' }}>{row[0]}</td>
                    <td className="p-4">{row[1]}</td>
                    <td className="p-4" style={{ color: i === 3 ? '#22d3ee' : undefined }}>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>Overround = 107,00%. Margem = 7,00%. O payout teórico seria 1 ÷ 1,07 ≈ 93,46%.</p>
          <p>Mercados 1X2 geralmente apresentam margem maior do que mercados de dois resultados, pois envolvem mais variáveis e, em ligas menos populares, as cotações tendem a ser menos competitivas. Para verificar rapidamente, insira as três odds na <Link to="/calculadoras/overround" className="font-semibold" style={{ color: '#22d3ee' }}>calculadora de overround</Link>.</p>
        </ArticleSection>

        <ArticleSection id="faixas-de-margem" title="Faixas de Margem: Como Interpretar o Resultado">
          <p>O número isolado do overround tem pouco significado sem contexto. O que importa é saber se a margem encontrada é alta ou baixa para aquele tipo de mercado. Veja referências gerais:</p>
          <div className="overflow-x-auto rounded-3xl border border-white/10">
            <table className="w-full text-left text-sm sm:text-base">
              <thead style={{ background: 'rgba(255,255,255,0.04)' }}>
                <tr><th className="p-4">Margem</th><th className="p-4">Classificação</th><th className="p-4">Contexto típico</th></tr>
              </thead>
              <tbody>
                {marginRanges.map((row, i) => (
                  <tr key={i} className="border-t border-white/10" style={{ color: 'var(--text-2)' }}>
                    <td className="p-4 font-semibold" style={{ color: 'var(--text-1)' }}>{row[0]}</td>
                    <td className="p-4">{row[1]}</td>
                    <td className="p-4">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>Estas são referências educativas gerais. A margem real aceitável varia muito por tipo de mercado, plataforma e momento de coleta das odds. Comparar a margem do mesmo mercado em plataformas distintas é mais informativo do que usar faixas absolutas.</p>
        </ArticleSection>

        <ArticleSection id="payout-teorico" title="Payout Teórico: O que É e Como Interpretar">
          <p>Payout teórico é a proporção estimada do volume apostado que seria devolvida ao conjunto de apostadores, com base nas odds publicadas. A fórmula é simples:</p>
          <FormulaBox label="Fórmula do payout teórico" formula="Payout (%) = (1 ÷ overround decimal) × 100">
            Exemplo: overround = 105,26% → overround decimal = 1,0526 → payout = 1 ÷ 1,0526 ≈ 94,99%.
          </FormulaBox>
          <p>Se o overround é 105,26%, o payout teórico é aproximadamente 95%. Isso significa que, em teoria, para cada R$ 100 apostados no mercado, o volume de retorno ao conjunto de apostadores seria de R$ 95. A diferença de R$ 5 representa a margem embutida.</p>
          <p>Porém, algumas ressalvas importantes: o payout teórico é uma estimativa matemática de mercado, não uma previsão de ganho individual. Na prática, ele assume que o volume de apostas está uniformemente distribuído entre os resultados, o que raramente acontece. Apostas individuais podem ganhar ou perder independentemente do payout teórico.</p>
          <Callout tone="amber"><strong>Payout alto não garante que você vai ganhar. É uma métrica de referência para o mercado como um todo, não para apostas individuais.</strong></Callout>
        </ArticleSection>

        <ArticleSection id="odds-justas" title="Odds Justas: O que São e Como Calcular">
          <p>Odds justas são cotações teóricas sem a margem da casa embutida. Elas representam o que as odds "deveriam ser" se a plataforma não incluísse sua vantagem matemática. O cálculo parte da normalização das probabilidades implícitas:</p>
          <FormulaBox label="Cálculo de odds justa" formula="Odd justa = 1 ÷ (probabilidade implícita normalizada)">
            Onde: prob. normalizada = prob. implícita do resultado ÷ overround total (em decimal).
          </FormulaBox>
          <p>Exemplo com mercado 1X2 (overround 107%): a probabilidade implícita do mandante é 45,45%. Dividindo por 1,07 (overround decimal) = 42,48%. A odd justa seria 1 ÷ 0,4248 ≈ 2,35 (versus a odd publicada de 2,20).</p>
          <p>Odds justas são referências analíticas úteis para entender o "preço real" que o mercado atribui a um resultado antes da margem. A <Link to="/calculadoras/overround" className="font-semibold" style={{ color: '#22d3ee' }}>Calculadora de Overround</Link> calcula automaticamente as odds justas para cada resultado inserido.</p>
          <Callout><strong>Odds justa não indica automaticamente que uma aposta tem valor. É uma referência matemática, não uma recomendação de entrada.</strong></Callout>
        </ArticleSection>

        <ArticleSection id="probabilidade-implicita" title="Probabilidade Implícita e sua Relação com o Overround">
          <p>Probabilidade implícita é o percentual de chance que uma odd atribui matematicamente a um resultado. O cálculo é direto:</p>
          <FormulaBox label="Probabilidade implícita" formula="Prob. implícita (%) = (1 ÷ odd) × 100">
            Exemplos: odd 2.00 → 50%; odd 1.50 → 66,67%; odd 3.00 → 33,33%.
          </FormulaBox>
          <p>A relação com o overround é estrutural: o overround é exatamente a soma de todas as probabilidades implícitas do mercado. Em um mercado sem margem, essa soma seria 100%. Cada ponto percentual acima representa margem embutida.</p>
          <p>Para um estudo mais aprofundado sobre probabilidade implícita, como calcular e interpretar, leia nosso guia <Link to="/blog/probabilidade-implicita-odds" className="font-semibold" style={{ color: '#22d3ee' }}>O que é Probabilidade Implícita nas Odds</Link>. Você também pode usar a <Link to="/calculadoras/odds" className="font-semibold" style={{ color: '#22d3ee' }}>Calculadora de Odds</Link> para converter odds em probabilidade rapidamente.</p>
        </ArticleSection>

        <ArticleSection id="overround-e-value-bet" title="Overround, Value Bet e Valor Esperado">
          <p>Overround e value bet são conceitos relacionados, mas distintos. O overround mede a margem de um mercado como um todo. Value bet é uma avaliação individual: ocorre quando a probabilidade real estimada para um resultado específico supera a probabilidade implícita da odd.</p>
          <p>A relação entre os dois: em mercados com overround menor, as probabilidades implícitas são mais próximas do valor justo, o que pode facilitar a identificação de eventuais discrepâncias. Mas um mercado de baixo overround não garante que existam value bets — apenas que as odds estão menos "descontadas" de forma geral.</p>
          <p>Para aprofundar o conceito de valor esperado e como identificá-lo, leia nosso guia completo sobre <Link to="/blog/value-bet-o-que-e" className="font-semibold" style={{ color: '#22d3ee' }}>O que é Value Bet</Link>. O conceito de <Link to="/blog/probabilidade-implicita-odds" className="font-semibold" style={{ color: '#22d3ee' }}>probabilidade implícita</Link> também é fundamental para essa análise.</p>
          <Callout><strong>Overround baixo não cria value bets. Ele apenas indica que as odds foram menos ajustadas para incluir margem naquele mercado específico.</strong></Callout>
        </ArticleSection>

        <ArticleSection id="comparar-plataformas" title="Como Usar o Overround para Comparar Plataformas">
          <p>Uma das aplicações mais práticas do cálculo de overround é a comparação de odds entre plataformas para o mesmo mercado. Calculando o overround de cada uma, você obtém uma medida objetiva de qual está oferecendo odds menos ajustadas para aquele evento específico.</p>
          <p>Para a comparação ser válida, é necessário respeitar três condições:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Mesmo mercado:</strong> comparar exatamente o mesmo jogo, mesmo torneio e mesmas opções de resultado.</li>
            <li><strong>Mesmas regras:</strong> algumas plataformas aplicam regras diferentes para empate, reembolso ou resolução de mercado.</li>
            <li><strong>Mesmo momento:</strong> odds mudam constantemente — coletas em horários diferentes não produzem comparações válidas.</li>
          </ul>
          <p>Quando essas condições são atendidas, a plataforma com menor overround oferece, matematicamente, odds mais próximas do valor justo para aquele mercado específico. Isso não significa que a plataforma com odds mais altas vai sempre oferecer mais valor — variações individuais de cotação por resultado podem inverter a relação em casos específicos.</p>
        </ArticleSection>

        <ArticleSection id="overround-e-surebet" title="Overround Negativo e Arbitragem (Surebet)">
          <p>Uma situação especial acontece quando o overround cai abaixo de 100%. Isso ocorre raramente, mas pode acontecer quando se combinam odds de plataformas diferentes para o mesmo evento. Quando a soma das probabilidades implícitas é menor que 100%, existe uma oportunidade teórica de cobrir todos os resultados com lucro garantido — o que se chama de <Link to="/blog/o-que-e-surebet" className="font-semibold" style={{ color: '#22d3ee' }}>surebet ou arbitragem esportiva</Link>.</p>
          <p>Porém, surebets reais envolvem riscos operacionais significativos: as odds mudam rapidamente, plataformas podem limitar ou cancelar apostas identificadas como arbitragem, e a janela de tempo para executar as apostas nos dois lados é muito curta.</p>
          <p>Para calcular a distribuição de stakes em uma situação de arbitragem, use nossa <Link to="/calculadoras/arbitragem" className="font-semibold" style={{ color: '#22d3ee' }}>Calculadora de Arbitragem</Link>. Para entender como distribuir valores em múltiplos resultados, veja também a <Link to="/calculadoras/dutching" className="font-semibold" style={{ color: '#22d3ee' }}>Calculadora de Dutching</Link>.</p>
        </ArticleSection>

        <ArticleSection id="erros-comuns" title="Erros Comuns ao Calcular Overround">
          <p>O cálculo em si é simples, mas alguns erros recorrentes comprometem o resultado. Veja os mais frequentes:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            {commonErrors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
          <p>Para evitar esses erros, use a <Link to="/calculadoras/overround" className="font-semibold" style={{ color: '#22d3ee' }}>Calculadora de Overround</Link>, que aceita qualquer número de resultados, valida os campos automaticamente e exibe todos os valores calculados de forma estruturada.</p>
        </ArticleSection>

        <ArticleSection id="usar-calculadora" title="Como Usar a Calculadora de Overround do CalculaBet">
          <p>A <Link to="/calculadoras/overround" className="font-semibold" style={{ color: '#22d3ee' }}>Calculadora de Margem da Casa</Link> do CalculaBet foi desenvolvida para calcular overround, margem, payout teórico, probabilidades implícitas e odds justas para qualquer mercado, com qualquer número de resultados.</p>
          <p>O uso é direto:</p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>Acesse a calculadora em <Link to="/calculadoras/overround" className="font-semibold" style={{ color: '#22d3ee' }}>/calculadoras/overround</Link>.</li>
            <li>Insira as odds de todos os resultados do mercado. Use ponto ou vírgula — a calculadora aceita ambos.</li>
            <li>Adicione ou remova linhas conforme o número de resultados (mínimo 2).</li>
            <li>O cálculo é feito em tempo real: overround, margem, payout e odds justas aparecem automaticamente.</li>
            <li>Use os exemplos pré-carregados (2 resultados, 1X2 futebol, 3 resultados) para ver como funciona antes de inserir seus dados.</li>
          </ol>
          <div className="mt-6">
            <Link to="/calculadoras/overround" className="btn-primary inline-flex items-center gap-2">Calcular overround agora <BlogIcon name="arrow" className="w-4 h-4" /></Link>
          </div>
        </ArticleSection>

        <ArticleSection id="gestao-de-banca" title="Overround, Risco e Gestão de Banca">
          <p>Entender overround é uma parte da leitura matemática de apostas, mas não substitui as práticas fundamentais de gestão de risco. O overround informa sobre o preço do mercado — não sobre o resultado do evento.</p>
          <p>Independentemente do overround ou da margem calculada, é essencial: definir um orçamento exclusivo para apostas, determinar o tamanho do stake antes de cada entrada, registrar todas as apostas para acompanhar desempenho real, e nunca apostar valores essenciais para despesas pessoais.</p>
          <p>Para aprender a estruturar um controle de banca adequado, leia nosso guia <Link to="/blog/o-que-e-gestao-de-banca" className="font-semibold" style={{ color: '#22d3ee' }}>O que é Gestão de Banca em Apostas Esportivas</Link>. Para calcular stakes proporcionais, use a <Link to="/calculadoras/gestao-banca" className="font-semibold" style={{ color: '#22d3ee' }}>Calculadora de Gestão de Banca</Link>.</p>
          <Callout tone="amber"><strong>Nenhuma métrica de mercado, incluindo overround, prevê resultados. Apostas envolvem risco real de perda financeira.</strong></Callout>
        </ArticleSection>

        <ArticleSection id="jogo-responsavel" title="Jogo Responsável e Limites">
          <p>Ferramentas matemáticas como a calculadora de overround são recursos educativos — não estratégias de lucro. A decisão de apostar envolve variáveis que vão muito além de qualquer cálculo: qualidade da análise, variância, disciplina, limites financeiros e saúde mental.</p>
          <p>Se apostar está deixando de ser lazer e passando a ser fonte de ansiedade, conflito financeiro ou compulsão, procure ajuda. O CalculaBet disponibiliza informações e recursos na página de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#22d3ee' }}>jogo responsável</Link>.</p>
          <p>O conteúdo deste guia é destinado exclusivamente a maiores de 18 anos e tem propósito educativo sobre conceitos matemáticos. Não representa incentivo, recomendação ou promessa de resultado financeiro.</p>
        </ArticleSection>

        <ArticleSection id="conclusao" title="Conclusão: Overround como Ferramenta de Leitura">
          <p>Overround é uma das métricas matemáticas mais úteis para entender como as odds são precificadas. Calculá-lo é simples — basta somar as probabilidades implícitas de todos os resultados. O excedente acima de 100% é a margem embutida que toda plataforma de apostas incorpora nas cotações.</p>
          <p>Saber interpretar o overround ajuda a comparar mercados e plataformas, entender payout teórico, calcular odds justas e identificar contextos onde as cotações estão mais ou menos próximas do valor justo. Mas nenhum desses cálculos prevê resultados, elimina o risco ou garante retorno.</p>
          <p>Use a <Link to="/calculadoras/overround" className="font-semibold" style={{ color: '#22d3ee' }}>Calculadora de Overround</Link> para aplicar esses conceitos em qualquer mercado. Explore também outras ferramentas do CalculaBet: <Link to="/calculadoras/odds" className="font-semibold" style={{ color: '#22d3ee' }}>Calculadora de Odds</Link>, <Link to="/calculadoras/arbitragem" className="font-semibold" style={{ color: '#22d3ee' }}>Calculadora de Arbitragem</Link> e <Link to="/calculadoras/roi" className="font-semibold" style={{ color: '#22d3ee' }}>Calculadora de ROI</Link>. Leia também os guias do blog sobre <Link to="/blog/value-bet-o-que-e" className="font-semibold" style={{ color: '#22d3ee' }}>value bet</Link> e <Link to="/blog/probabilidade-implicita-odds" className="font-semibold" style={{ color: '#22d3ee' }}>probabilidade implícita</Link>.</p>
        </ArticleSection>

        <ArticleAffiliateBanner postSlug={post.slug} placement="pre-faq" />

        <section id="faq" className="mt-14 scroll-mt-28">
          <h2 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-1)' }}>Perguntas Frequentes sobre Overround</h2>
          <div className="mt-6 space-y-4">
            {OVERROUND_FAQS.map((faq, i) => (
              <details key={i} className="rounded-3xl p-5" style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <summary className="font-semibold cursor-pointer" style={{ color: 'var(--text-1)' }}>{faq.question}</summary>
                <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <nav className="mt-10 pt-8 border-t border-white/10" aria-label="Tags do artigo">
          <div className="flex flex-wrap gap-2">
            {post.tags?.map(tag => <span key={tag} className="badge">#{tag}</span>)}
          </div>
        </nav>
      </article>

      {relatedPosts?.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-1)' }}>Artigos Relacionados</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedPosts.map(rp => {
              const cat = getCategoryById(rp.category);
              return <BlogCard key={rp.slug} post={rp} category={cat} />;
            })}
          </div>
        </section>
      )}
    </>
  );
}
