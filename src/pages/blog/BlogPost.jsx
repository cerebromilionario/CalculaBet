import { Link, Navigate, useParams } from 'react-router-dom';
import SEOHead, { BASE_URL } from '../../components/ui/SEOHead';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import BlogCard from '../../components/blog/BlogCard';
import BlogIcon from '../../components/blog/BlogIcon';
import { BLOG_FAQS, getCategoryById, getPostBySlug, getRelatedPosts } from '../../data/blog/blogData';

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));
}

function buildArticleSchema(post, category) {
  const url = `${BASE_URL}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.excerpt,
        url,
        datePublished: post.date,
        dateModified: post.updatedAt,
        author: { '@type': 'Organization', name: post.author, url: BASE_URL },
        publisher: { '@type': 'Organization', name: 'CalculaBet', url: BASE_URL },
        articleSection: category?.name,
        keywords: post.tags.join(', '),
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${url}#webpage` },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: post.title,
        description: post.excerpt,
        isPartOf: { '@type': 'WebSite', name: 'CalculaBet', url: BASE_URL },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
      ...(getFaqsForPost(post.slug).length ? [{
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: getFaqsForPost(post.slug).map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }] : []),
    ],
  };
}

const SUREBET_FAQS = [
  {
    question: 'O que é surebet?',
    answer: 'Surebet é uma situação de arbitragem esportiva em que odds diferentes, normalmente em casas diferentes, permitem distribuir stakes entre todos os resultados de um mercado com margem matemática positiva. Essa margem é teórica e pode ser afetada por erros, mudanças de odds, limites e regras.',
  },
  {
    question: 'Como funciona a arbitragem em apostas esportivas?',
    answer: 'A arbitragem em apostas esportivas compara odds para resultados opostos ou complementares, calcula a probabilidade implícita de cada odd e divide a stake para que o retorno bruto fique parecido em qualquer desfecho. O cálculo não elimina riscos operacionais.',
  },
  {
    question: 'Como saber se uma aposta é surebet?',
    answer: 'Em um mercado de dois resultados, some 1 dividido pela odd A com 1 dividido pela odd B. Se o total for menor que 1, existe margem teórica. Em mercados com três ou mais resultados, some o inverso de todas as odds disponíveis.',
  },
  {
    question: 'Qual é a fórmula da surebet?',
    answer: 'Para dois resultados, a fórmula básica é 1 / odd A + 1 / odd B < 1. Para três resultados, use 1 / odd 1 + 1 / odd 2 + 1 / odd 3 < 1. Quanto menor o total, maior a margem teórica antes de custos, limites e erros.',
  },
  {
    question: 'Surebet dá lucro garantido?',
    answer: 'Não é correto tratar surebet como lucro garantido em apostas. A conta pode indicar margem positiva, mas odds podem mudar, uma aposta pode ser recusada ou anulada, regras podem diferir entre casas e erros humanos podem gerar perda.',
  },
  {
    question: 'Quais são os riscos da surebet?',
    answer: 'Os principais riscos são mudança rápida de odds, erro de digitação, limite de stake, anulação de aposta, diferença de regras entre casas, atraso para fechar todas as posições, restrições de conta e falta de controle emocional.',
  },
  {
    question: 'Preciso usar uma calculadora surebet?',
    answer: 'Você não é obrigado, mas uma calculadora surebet reduz erro manual, calcula stakes proporcionais, mostra se existe margem teórica e permite simular cenários antes de tomar qualquer decisão.',
  },
  {
    question: 'Qual a diferença entre surebet e dutching?',
    answer: 'Surebet procura uma margem entre odds diferentes, geralmente em casas diferentes. Dutching é a distribuição de uma stake entre múltiplos resultados para equilibrar retornos dentro de uma estratégia específica, sem necessariamente haver arbitragem.',
  },
  {
    question: 'Surebet é indicada para iniciantes?',
    answer: 'Iniciantes devem estudar primeiro, simular exemplos e entender odds, stake, retorno, regras e riscos. Não é recomendável agir por impulso nem usar dinheiro que faça falta.',
  },
  {
    question: 'Como calcular a stake em uma surebet?',
    answer: 'Uma forma comum é definir o retorno bruto desejado e dividir esse retorno por cada odd. Com banca total fixa, a stake de cada resultado pode ser calculada pela proporção entre a probabilidade implícita daquele resultado e a soma das probabilidades implícitas.',
  },
];


const ODDS_FAQS = [
  {
    question: 'Como calcular odds em apostas esportivas?',
    answer: 'Em odds decimais, multiplique o valor apostado pela odd para encontrar o retorno total. Para saber o lucro, multiplique o valor apostado por odd menos 1. Para interpretar a probabilidade implícita, use 1 dividido pela odd vezes 100.',
  },
  {
    question: 'Qual é a fórmula para calcular o retorno de uma aposta?',
    answer: 'A fórmula é: Retorno = Valor apostado × Odd. Em uma aposta de R$10 na odd 2.00, o retorno total potencial é R$20, já incluindo os R$10 apostados.',
  },
  {
    question: 'Qual é a diferença entre lucro e retorno?',
    answer: 'Retorno é o valor total recebido em caso de acerto e inclui a stake original. Lucro é apenas o ganho líquido, calculado como valor apostado × (odd - 1).',
  },
  {
    question: 'Quanto ganha uma aposta de R$10 na odd 2.00?',
    answer: 'Uma aposta de R$10 na odd 2.00 tem retorno total potencial de R$20 e lucro potencial de R$10. O retorno inclui o valor apostado.',
  },
  {
    question: 'O que é probabilidade implícita nas odds?',
    answer: 'Probabilidade implícita é a probabilidade sugerida pela cotação. Ela ajuda a traduzir odds em percentual, mas não representa garantia de resultado nem probabilidade real exata.',
  },
  {
    question: 'Como calcular probabilidade implícita?',
    answer: 'Em odds decimais, use: Probabilidade implícita = 1 / Odd × 100. Odd 2.00 equivale a 50%, odd 1.50 equivale a 66,67% e odd 3.00 equivale a 33,33%.',
  },
  {
    question: 'O que são odds decimais?',
    answer: 'Odds decimais são o formato mais comum no Brasil. Elas mostram diretamente quanto retorna para cada R$1 apostado. Uma odd 2.50 indica retorno total potencial de R$2,50 para cada R$1.',
  },
  {
    question: 'Como converter odds americanas para decimais?',
    answer: 'Para odds americanas positivas, divida por 100 e some 1. Exemplo: +150 vira 2.50. Para odds negativas, divida 100 pelo valor absoluto e some 1. Exemplo: -200 vira 1.50.',
  },
  {
    question: 'Como calcular odds de uma aposta múltipla?',
    answer: 'Em apostas múltiplas com odds decimais, multiplique as odds de todas as seleções. Exemplo: 1.50 × 2.00 × 1.80 = odd combinada 5.40.',
  },
  {
    question: 'Odd alta significa aposta melhor?',
    answer: 'Não necessariamente. Odd alta indica retorno potencial maior, mas também costuma sugerir menor probabilidade implícita. Uma aposta só deve ser avaliada junto com risco, probabilidade estimada, mercado e gestão de banca.',
  },
  {
    question: 'Como usar uma calculadora de odds?',
    answer: 'Informe o valor apostado e a odd para simular retorno, lucro e probabilidade implícita. A calculadora ajuda a reduzir erro manual e a entender cenários antes de qualquer decisão.',
  },
  {
    question: 'A calculadora de odds garante lucro?',
    answer: 'Não. A calculadora de odds apenas faz contas e mostra cenários matemáticos. Ela não prevê resultados, não elimina risco financeiro e não deve ser usada como promessa de ganhos.',
  },
];


const BANKROLL_FAQS = [
  {
    question: 'O que é gestão de banca?',
    answer: 'Gestão de banca é o conjunto de regras usado para separar uma banca, definir limites e controlar o tamanho de cada stake. Ela organiza a exposição ao risco, mas não garante lucro nem elimina perdas.',
  },
  {
    question: 'O que é banca em apostas esportivas?',
    answer: 'Banca é o valor separado exclusivamente para apostas esportivas. Não deve ser salário, dinheiro de contas pessoais, aluguel, alimentação, dívidas ou qualquer valor essencial para a vida financeira.',
  },
  {
    question: 'Como fazer gestão de banca em apostas?',
    answer: 'Comece definindo uma banca que possa perder sem comprometer despesas, escolha um percentual de stake antes de apostar, registre resultados e evite aumentar valores por emoção ou tentativa de recuperar prejuízo.',
  },
  {
    question: 'Quanto devo apostar em cada jogo?',
    answer: 'Não existe percentual universal. Muitos iniciantes simulam stakes entre 1% e 2% da banca para reduzir exposição, enquanto valores mais altos aumentam bastante o impacto de sequências negativas.',
  },
  {
    question: 'O que é stake?',
    answer: 'Stake é o valor colocado em uma aposta específica. Em uma banca de R$100, uma stake de 1% equivale a R$1, 2% equivale a R$2 e 5% equivale a R$5.',
  },
  {
    question: 'Gestão de banca garante lucro?',
    answer: 'Não. Gestão de banca não transforma apostas em renda segura, não substitui análise e não elimina risco financeiro. Ela apenas ajuda a organizar valores e limites.',
  },
  {
    question: 'Como fazer gestão de banca com R$100?',
    answer: 'Com R$100, uma abordagem conservadora pode simular stakes pequenas, como R$1 por aposta. O objetivo inicial deve ser aprender odds, risco, registro e disciplina, não buscar recuperar perdas rapidamente.',
  },
  {
    question: 'Qual percentual da banca usar por aposta?',
    answer: 'Percentuais baixos, como 1% ou 2%, reduzem a exposição por evento. Percentuais como 5% ou mais aumentam o risco e podem afetar a banca rapidamente em uma sequência negativa.',
  },
  {
    question: 'O que é Critério de Kelly?',
    answer: 'Critério de Kelly é uma fórmula que estima o tamanho da stake com base na odd e na probabilidade estimada pelo usuário. Ele exige estimativas realistas e pode sugerir valores agressivos.',
  },
  {
    question: 'O que é Meio Kelly?',
    answer: 'Meio Kelly usa metade da stake sugerida pelo Critério de Kelly. É uma adaptação mais conservadora, comum quando o usuário reconhece incerteza na própria estimativa de probabilidade.',
  },
  {
    question: 'Gestão de banca funciona para apostas múltiplas?',
    answer: 'Sim, mas múltiplas exigem ainda mais cautela. Odds combinadas aumentam retorno potencial, porém reduzem a chance de acerto, então a stake precisa ser limitada com cuidado.',
  },
  {
    question: 'Qual o maior erro na gestão de banca?',
    answer: 'Um dos maiores erros é aumentar a stake depois de perder para tentar recuperar rapidamente. Essa reação amplia exposição emocional e pode comprometer a banca.',
  },
  {
    question: 'Como controlar perdas nas apostas?',
    answer: 'Defina limite de banca, limite por aposta, limite de tempo, registre resultados e faça pausas. Se houver sensação de perda de controle, procure orientação e consulte a página de jogo responsável.',
  },
  {
    question: 'Por que não devo tentar recuperar prejuízo?',
    answer: 'Tentar recuperar prejuízo costuma levar a decisões impulsivas, stakes maiores e exposição desproporcional. Perdas fazem parte do risco e não devem ser tratadas com pressa ou emoção.',
  },
];


const MULTIPLE_FAQS = [
  {
    question: 'O que é aposta múltipla?',
    answer: 'Aposta múltipla é um bilhete que combina duas ou mais seleções. Ela também pode ser chamada de aposta combinada ou parlay. Em geral, todas as seleções precisam ser vencedoras para a múltipla retornar.',
  },
  {
    question: 'Como funciona uma aposta múltipla?',
    answer: 'Você escolhe vários eventos ou mercados no mesmo bilhete, as odds decimais são multiplicadas e o retorno potencial passa a depender da odd combinada. O risco aumenta porque o resultado depende de todos os palpites escolhidos.',
  },
  {
    question: 'Aposta múltipla tem que acertar tudo?',
    answer: 'Sim, na regra geral a aposta múltipla tem que acertar tudo. Se uma seleção perder, normalmente todo o bilhete perde. Seleções anuladas podem ser removidas do cálculo, dependendo das regras da plataforma.',
  },
  {
    question: 'Como calcular odds combinadas?',
    answer: 'Em odds decimais, multiplique as odds de todas as seleções: Odd combinada = Odd 1 × Odd 2 × Odd 3. Exemplo: 1.50 × 2.00 × 1.80 = 5.40.',
  },
  {
    question: 'Como calcular retorno de aposta múltipla?',
    answer: 'Multiplique o valor apostado pela odd combinada. Se a aposta for R$10 e a odd combinada for 5.40, o retorno total potencial será R$54. O lucro potencial será R$44, pois o retorno inclui a stake original.',
  },
  {
    question: 'Qual a diferença entre aposta simples e aposta múltipla?',
    answer: 'Aposta simples depende de uma única seleção. Aposta múltipla depende de duas ou mais seleções no mesmo bilhete. A múltipla pode gerar retorno potencial maior, mas tem maior chance de perder porque exige mais acertos.',
  },
  {
    question: 'O que acontece se uma seleção da múltipla for anulada?',
    answer: 'Em muitos casos, a seleção anulada recebe odd 1.00 e sai do cálculo, mas isso depende das regras da casa, do mercado, do adiamento e do motivo da anulação. Sempre verifique o regulamento antes de apostar.',
  },
  {
    question: 'Aposta múltipla vale a pena?',
    answer: 'Depende do objetivo, do risco aceito e da compreensão das probabilidades. Ela não deve ser tratada como forma fácil de ganhar dinheiro. Para fins educativos, simular cenários ajuda a entender o impacto de cada seleção.',
  },
  {
    question: 'Aposta múltipla é indicada para iniciantes?',
    answer: 'Iniciantes podem estudar o conceito, mas devem reconhecer que o risco é maior do que em uma aposta simples. O ideal é simular, usar poucas seleções para aprender e nunca apostar valores essenciais.',
  },
  {
    question: 'Como calcular uma múltipla com 3 jogos?',
    answer: 'Multiplique as três odds. Se os jogos tiverem odds 1.70, 1.90 e 2.00, a odd combinada será 6.46. Com R$10, o retorno potencial será R$64,60 e o lucro potencial será R$54,60.',
  },
  {
    question: 'O que é parlay?',
    answer: 'Parlay é o termo em inglês usado para aposta múltipla ou aposta combinada. O conceito é o mesmo: juntar seleções em um único bilhete e depender do acerto de todas elas.',
  },
  {
    question: 'Como usar uma calculadora de aposta múltipla?',
    answer: 'Informe as odds de cada seleção e o valor apostado. A calculadora multiplica as odds, calcula o retorno total e mostra o lucro potencial, ajudando a evitar erro manual.',
  },
  {
    question: 'Odd alta em múltipla é melhor?',
    answer: 'Não necessariamente. Odd alta aumenta o retorno potencial, mas também indica menor probabilidade implícita. Múltiplas com muitas seleções costumam ser mais difíceis de acertar.',
  },
  {
    question: 'Como fazer gestão de banca em múltiplas?',
    answer: 'Defina uma banca separada, limite o tamanho da stake, evite tentar recuperar perdas e use valores menores em múltiplas por causa da maior variância. Gestão de banca não garante lucro, apenas organiza o risco.',
  },
];

function getFaqsForPost(slug) {
  return {
    'como-calcular-odds': ODDS_FAQS,
    'o-que-e-surebet': SUREBET_FAQS,
    'o-que-e-gestao-de-banca': BANKROLL_FAQS,
    'o-que-e-aposta-multipla': MULTIPLE_FAQS,
  }[slug] || [];
}

const bankrollHighlights = [
  { title: 'Banca separada', text: 'Use apenas um valor destinado a aprendizado e simulação, sem comprometer despesas pessoais.' },
  { title: 'Stake proporcional', text: 'Defina quanto apostar em cada jogo antes da emoção do evento, preferencialmente como percentual da banca.' },
  { title: 'Risco continua existindo', text: 'Gestão de banca reduz decisões impulsivas, mas não prevê resultados nem garante ganhos.' },
];

const stakeProfileRows = [
  ['Conservador', '1%', 'R$ 1,00', 'Menor exposição por aposta; costuma ser mais adequado para aprendizado e controle.'],
  ['Moderado', '2%', 'R$ 2,00', 'Exposição maior, ainda proporcional, mas a sequência negativa pesa mais.'],
  ['Agressivo', '5%', 'R$ 5,00', 'Risco alto para iniciantes; poucas perdas seguidas já reduzem a banca de forma relevante.'],
];

const bankrollMethods = [
  { title: 'Stake fixa', text: 'Você escolhe um valor constante, como R$2 por aposta. É simples, facilita o registro e reduz variações emocionais, mas precisa ser revisado se a banca mudar muito.' },
  { title: 'Percentual da banca', text: 'A stake acompanha o tamanho da banca, como 1% ou 2%. Ajuda a manter proporção, porém exige recalcular valores e disciplina para não inflar percentuais.' },
  { title: 'Critério de Kelly', text: 'Usa odd e probabilidade estimada para sugerir stake. É matemático, mas depende de uma estimativa realista e pode sugerir exposição agressiva.' },
  { title: 'Meio Kelly', text: 'Aplica metade da sugestão de Kelly. É mais conservador e reconhece que a probabilidade estimada pelo usuário pode estar errada.' },
  { title: 'Stake conservadora', text: 'Prioriza percentuais baixos e limites rígidos. Pode reduzir a velocidade de perdas, mas também limita retornos potenciais e não elimina riscos.' },
];

const bankrollErrors = [
  'Apostar mais depois de perder, como se a próxima aposta tivesse obrigação de compensar a anterior.',
  'Tentar recuperar prejuízo rapidamente, ignorando limite, variância e estado emocional.',
  'Aumentar stake sem critério claro, apenas porque uma seleção parece “muito provável”.',
  'Não registrar apostas, odds, resultados e motivo da entrada.',
  'Misturar banca com dinheiro pessoal, salário, contas, aluguel, alimentação ou dívidas.',
  'Apostar por emoção, tédio, pressão de grupo ou confiança excessiva em palpites.',
  'Ignorar limites de tempo e dinheiro definidos antes de apostar.',
  'Usar Martingale sem entender que sequências negativas exigem valores cada vez maiores.',
  'Achar que gestão de banca garante lucro ou transforma aposta em investimento seguro.',
  'Seguir palpites sem cálculo, sem analisar odds, probabilidade e exposição da banca.',
];

const beginnerPractices = [
  'Separe uma banca pequena e compatível com sua realidade financeira.',
  'Defina limite antes de apostar e respeite esse limite mesmo após perdas.',
  'Use stakes baixas enquanto aprende odds, risco, ROI e variância.',
  'Evite recuperar perdas; aceite que uma sequência negativa pode acontecer.',
  'Entenda odds antes de apostar e simule retorno na calculadora de odds.',
  'Use calculadoras como apoio ao cálculo, não como promessa de resultado.',
  'Registre resultados para avaliar decisões com dados, não com memória seletiva.',
  'Faça pausas quando perceber ansiedade, irritação ou pressa.',
  'Aposte apenas se for maior de 18 anos.',
  'Nunca aposte dinheiro essencial para contas, alimentação, moradia ou compromissos financeiros.',
];

const surebetHighlights = [
  { title: 'Margem teórica', text: 'A oportunidade aparece quando a soma das probabilidades implícitas fica abaixo de 100%.' },
  { title: 'Execução importa', text: 'Fechar apenas um lado da aposta arbitragem pode transformar uma conta positiva em exposição real.' },
  { title: 'Ferramenta é apoio', text: 'Calculadoras ajudam no cálculo, mas não verificam regras, limites ou alterações do mercado.' },
];

function SurebetCallout({ tone = 'cyan', children }) {
  const styles = tone === 'amber'
    ? { background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.18)' }
    : { background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.16)' };
  return <div className="rounded-3xl p-5 my-7 leading-relaxed" style={styles}>{children}</div>;
}

function ArticleSection({ id, title, children }) {
  return (
    <section id={id} className="mt-12 scroll-mt-28">
      <h2 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-1)' }}>{title}</h2>
      <div className="mt-5 space-y-5 text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>{children}</div>
    </section>
  );
}

function SurebetArticle({ post, category, relatedPosts }) {
  const comparisonRows = [
    ['Surebet', 'Busca margem entre odds diferentes para todos os resultados de um mercado.', 'Antes da entrada, comparando cotações entre casas.'],
    ['Dutching', 'Distribui stake entre múltiplos resultados para equilibrar retornos.', 'Quando a pessoa quer cobrir seleções específicas com uma banca definida.'],
    ['Hedge', 'Ajusta uma posição já aberta para reduzir exposição ou travar parte do retorno.', 'Depois que uma aposta inicial mudou de valor ou de risco percebido.'],
  ];

  return (
    <>
      <article className="rounded-[2rem] p-6 sm:p-8 lg:p-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.058), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.09)' }}>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="badge" style={{ color: category?.color || '#34d399', borderColor: `${category?.color || '#34d399'}35`, background: `${category?.color || '#34d399'}10` }}>Arbitragem</span>
          <span className="badge">{post.readingTime}</span>
          <span className="badge">Publicado em {formatDate(post.date)}</span>
          <span className="badge">Atualizado em {formatDate(post.updatedAt)}</span>
        </div>

        <header className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">O que é Surebet? Guia Completo de Arbitragem Esportiva</h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Neste guia você vai entender o que é surebet, como a arbitragem esportiva funciona, quais fórmulas usar, como interpretar odds diferentes e por que a gestão de risco é indispensável. O conteúdo é educativo: o CalculaBet não é casa de apostas, não recebe apostas e não promete lucro.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/ferramentas/arbitragem" className="btn-primary">Abrir calculadora surebet <BlogIcon name="arrow" className="w-4 h-4" /></Link>
              <Link to="/jogo-responsavel" className="btn-ghost">Ler sobre jogo responsável</Link>
            </div>
          </div>
          <aside className="rounded-3xl p-6" style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.16)' }} aria-label="Resumo educativo do artigo">
            <p className="badge badge-green mb-4">Guia premium</p>
            <h2 className="text-2xl font-bold">O essencial antes de começar</h2>
            <div className="mt-5 space-y-4">
              {surebetHighlights.map(item => (
                <div key={item.title} className="card-glass p-4">
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{item.text}</p>
                </div>
              ))}
            </div>
          </aside>
        </header>

        <SurebetCallout tone="amber">
          <strong>Importante:</strong> este artigo é conteúdo educativo para maiores de 18 anos. Apostas envolvem riscos financeiros, não há garantia de ganhos e ferramentas devem ser usadas como apoio ao cálculo, nunca como promessa de resultado. Consulte nossas orientações de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>jogo responsável</Link>.
        </SurebetCallout>

        <ArticleSection id="o-que-e-surebet" title="O que é surebet?">
          <p>Surebet é o nome popular de uma oportunidade de <strong>arbitragem em apostas</strong>. Ela ocorre quando odds diferentes para todos os resultados possíveis de um mesmo mercado permitem distribuir valores de forma que o retorno bruto teórico seja maior do que o total apostado. Em vez de depender apenas de prever quem vence, a lógica procura uma divergência matemática entre cotações.</p>
          <p>Na prática, uma surebet costuma aparecer quando duas ou mais casas precificam o mesmo evento de maneira diferente. Uma casa pode oferecer odd mais alta para o resultado 1, enquanto outra oferece odd melhor para o resultado 2. Se essas odds diferentes forem suficientemente altas quando combinadas, a soma das probabilidades implícitas fica abaixo de 100% e surge uma margem teórica.</p>
          <p>Isso acontece por vários motivos: atualização de mercado em velocidades diferentes, modelos internos distintos, ajustes de exposição, promoções específicas, baixa liquidez em mercados menores ou simples diferença de opinião entre precificadores. Mesmo assim, identificar uma conta favorável não significa que o resultado operacional esteja protegido. A execução, as regras e os limites importam tanto quanto a fórmula.</p>
        </ArticleSection>

        <ArticleSection id="como-funciona" title="Como funciona a arbitragem em apostas esportivas?">
          <p>A arbitragem apostas esportivas parte de uma ideia simples: cobrir resultados diferentes do mesmo mercado usando as melhores odds disponíveis. Em um jogo com dois resultados possíveis, por exemplo, a pessoa colocaria uma stake no resultado A em uma casa e outra stake no resultado B em outra casa. O objetivo matemático é que qualquer resultado gere retorno bruto semelhante.</p>
          <p>Para isso, os valores não são divididos meio a meio. Eles são distribuídos de acordo com as odds. A seleção com odd menor normalmente exige stake maior para produzir o mesmo retorno bruto; a seleção com odd maior exige stake menor. É exatamente por isso que uma <Link to="/ferramentas/arbitragem" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de arbitragem</Link> ajuda: ela evita que a pessoa estime de cabeça uma divisão que deveria ser proporcional.</p>
          <p>O resultado esperado é matemático, não preditivo. A conta mostra que, se as duas apostas forem aceitas nas odds informadas, se nenhuma regra divergente interferir e se não houver anulação, a estrutura teria margem positiva. As limitações práticas incluem mudança rápida de cotação, atraso na confirmação, restrição de stake e diferença nas regras do mercado.</p>
        </ArticleSection>

        <ArticleSection id="exemplo" title="Exemplo simples de surebet">
          <p>Imagine um evento de tênis com apenas dois resultados possíveis: Jogadora A vence ou Jogadora B vence. A Casa A oferece odd 2.10 para a Jogadora A. A Casa B oferece odd 2.05 para a Jogadora B. Com uma banca de simulação de R$ 1.000, a soma das probabilidades implícitas seria 1 / 2.10 + 1 / 2.05 = 0,9639, ou 96,39%. A margem teórica antes de riscos operacionais seria próxima de 3,61%.</p>
          <div className="overflow-x-auto rounded-3xl my-6" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
            <table className="w-full text-left text-sm">
              <thead style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-1)' }}><tr><th className="p-4">Resultado</th><th className="p-4">Casa</th><th className="p-4">Odd</th><th className="p-4">Stake aproximada</th><th className="p-4">Retorno bruto</th></tr></thead>
              <tbody style={{ color: 'var(--text-2)' }}>
                <tr className="border-t border-white/10"><td className="p-4">Jogadora A</td><td className="p-4">Casa A</td><td className="p-4">2.10</td><td className="p-4">R$ 493,83</td><td className="p-4">R$ 1.037,04</td></tr>
                <tr className="border-t border-white/10"><td className="p-4">Jogadora B</td><td className="p-4">Casa B</td><td className="p-4">2.05</td><td className="p-4">R$ 506,17</td><td className="p-4">R$ 1.037,65</td></tr>
              </tbody>
            </table>
          </div>
          <p>O exemplo mostra uma margem pequena: retorno bruto aproximado de R$ 1.037 para R$ 1.000 simulados. Mas pequenas mudanças de odds alteram tudo. Se a odd 2.05 cair para 1.95 antes de a segunda aposta ser confirmada, a soma vira 1 / 2.10 + 1 / 1.95 = 98,89%, reduzindo bastante a folga. Se cair mais, a oportunidade pode desaparecer ou virar prejuízo.</p>
          <SurebetCallout><strong>Importante:</strong> uma oportunidade matemática não elimina riscos operacionais. O exemplo é didático e não deve ser interpretado como recomendação de aposta.</SurebetCallout>
        </ArticleSection>

        <ArticleSection id="formula" title="Fórmula básica da surebet">
          <p>Para um mercado com dois resultados, a fórmula básica é:</p>
          <div className="rounded-3xl p-6 text-center text-2xl font-bold" style={{ background: 'rgba(15,23,42,0.72)', border: '1px solid rgba(103,232,249,0.18)', color: '#67e8f9' }}>1 / odd A + 1 / odd B &lt; 1</div>
          <p>Odd A e odd B são as melhores cotações disponíveis para resultados opostos do mesmo mercado. Quando a soma é menor que 1, a conta indica que existe margem teórica. Para três resultados, como mandante, empate e visitante, a lógica é:</p>
          <div className="rounded-3xl p-6 text-center text-2xl font-bold" style={{ background: 'rgba(15,23,42,0.72)', border: '1px solid rgba(103,232,249,0.18)', color: '#67e8f9' }}>1 / odd 1 + 1 / odd 2 + 1 / odd 3 &lt; 1</div>
          <p>O número 1 representa 100%. Se a soma dos inversos das odds for 0,97, por exemplo, o mercado mostra 97% de probabilidade implícita combinada, deixando 3% de margem teórica. A conta é simples, mas calcular stakes proporcionais, retorno e lucro líquido em múltiplos cenários pode ficar confuso. Por isso, usar uma calculadora surebet reduz erro manual.</p>
        </ArticleSection>

        <ArticleSection id="calculadora" title="Por que usar uma calculadora surebet?">
          <p>Uma <Link to="/ferramentas/arbitragem" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora surebet</Link> ajuda a transformar odds em uma divisão de stakes coerente. Em vez de apenas dizer que existe arbitragem, a <Link to="/ferramentas/arbitragem" className="font-semibold" style={{ color: '#67e8f9' }}>ferramenta de arbitragem do CalculaBet</Link> permite simular quanto colocar em cada resultado, qual retorno bruto estimado pode ocorrer e qual margem aparece no cenário informado.</p>
          <p>Esse apoio é especialmente útil para verificar se existe arbitragem, estimar retorno, reduzir erro manual e comparar cenários. Você também pode combinar a análise com o <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>conversor de odds</Link> quando estiver comparando formatos diferentes e com ferramentas de <Link to="/ferramentas/gestao-de-banca" className="font-semibold" style={{ color: '#67e8f9' }}>gestão de banca</Link> para entender exposição.</p>
          <p>A calculadora de arbitragem não verifica termos de uso, não garante aceitação de apostas e não substitui conferência manual. Ela é uma ferramenta educativa para cálculo e simulação.</p>
          <Link to="/ferramentas/arbitragem" className="btn-primary mt-2">Usar calculadora de arbitragem <BlogIcon name="arrow" className="w-4 h-4" /></Link>
        </ArticleSection>

        <ArticleSection id="lucro-garantido" title="Surebet é lucro garantido?">
          <p>É comum ver a expressão “lucro garantido apostas” associada a surebet, mas ela precisa ser tratada com muito cuidado. Teoricamente, uma arbitragem pode mostrar margem positiva quando todas as condições da fórmula são respeitadas. Na prática, apostas esportivas envolvem execução em plataformas diferentes, regras próprias e mudanças de mercado.</p>
          <p>Odds podem mudar rapidamente, uma casa pode limitar o valor aceito, uma aposta pode ficar pendente, mercados podem ter regras diferentes para prorrogação ou abandono, e uma seleção pode ser anulada. Também existem taxas, atrasos, limites de saque, erros humanos e restrições de conta que afetam a operação. Por isso, não é responsável vender surebet como renda, investimento seguro ou lucro sem risco.</p>
        </ArticleSection>

        <ArticleSection id="riscos" title="Principais riscos da surebet">
          <div className="grid sm:grid-cols-2 gap-4">
            {['Mudança rápida de odds antes de fechar todos os lados.', 'Erro de digitação ao inserir odd, stake ou mercado.', 'Limite de stake menor do que o valor necessário.', 'Cancelamento ou anulação de uma das apostas.', 'Diferença de regras entre casas para o mesmo evento.', 'Atraso no fechamento das apostas e exposição parcial.', 'Restrições de conta, mercados ou métodos de pagamento.', 'Falta de controle emocional ao tentar recuperar erro.'].map(item => <div key={item} className="card-glass p-5">{item}</div>)}
          </div>
          <SurebetCallout tone="amber"><strong>Antes de apostar,</strong> confira odds, regras, limites e possíveis mudanças no mercado. Se qualquer etapa parecer confusa, pare e simule novamente sem dinheiro real.</SurebetCallout>
        </ArticleSection>

        <ArticleSection id="comparacao" title="Diferença entre surebet, dutching e hedge">
          <p>Surebet, dutching e hedge usam matemática de stake, mas não são a mesma coisa. A surebet busca margem entre odds diferentes, geralmente em apostas em casas diferentes. O <Link to="/ferramentas/dutching" className="font-semibold" style={{ color: '#67e8f9' }}>dutching</Link> distribui stake entre múltiplos resultados escolhidos. O <Link to="/ferramentas/hedge" className="font-semibold" style={{ color: '#67e8f9' }}>hedge</Link> protege ou ajusta uma posição já aberta.</p>
          <div className="overflow-x-auto rounded-3xl" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
            <table className="w-full text-left text-sm"><thead style={{ background: 'rgba(255,255,255,0.06)' }}><tr><th className="p-4">Conceito</th><th className="p-4">Objetivo</th><th className="p-4">Quando aparece</th></tr></thead><tbody>{comparisonRows.map(row => <tr key={row[0]} className="border-t border-white/10" style={{ color: 'var(--text-2)' }}><td className="p-4 font-semibold" style={{ color: 'var(--text-1)' }}>{row[0]}</td><td className="p-4">{row[1]}</td><td className="p-4">{row[2]}</td></tr>)}</tbody></table>
          </div>
        </ArticleSection>

        <ArticleSection id="iniciantes" title="Surebet é indicada para iniciantes?">
          <p>Para iniciantes, o melhor caminho é estudar antes de agir. A matemática precisa ser entendida: odds, probabilidade implícita, stake, retorno bruto, lucro líquido e margem. Também é importante perceber que uma aposta arbitragem exige atenção simultânea a mais de uma cotação e, muitas vezes, a mais de uma plataforma.</p>
          <p>Comece simulando cenários, use ferramentas antes de apostar dinheiro real e defina limites claros. A página de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#67e8f9' }}>jogo responsável</Link> explica cuidados essenciais, enquanto a ferramenta de <Link to="/ferramentas/gestao-de-banca" className="font-semibold" style={{ color: '#67e8f9' }}>gestão de banca</Link> ajuda a visualizar exposição. Se houver pressa, ansiedade ou tentativa de recuperar perdas, a decisão deve ser interrompida.</p>
        </ArticleSection>

        <ArticleSection id="encontrar" title="Como encontrar oportunidades de arbitragem?">
          <p>Encontrar uma possível arbitragem apostas exige comparar odds de forma organizada, acompanhar mercados, verificar se as regras são equivalentes e calcular a margem antes de qualquer ação. A comparação deve ser feita no mesmo mercado: não adianta misturar “resultado final no tempo regulamentar” com “classificação” ou mercados que tratam prorrogação de formas distintas.</p>
          <p>O processo educativo envolve observar odds diferentes, calcular a soma dos inversos, avaliar se a margem compensa riscos operacionais e usar uma calculadora para simular stakes. Não dependa de achismo e não adote automações agressivas, scraping ou práticas contra os termos de uso das casas. O foco do CalculaBet é ensinar cálculo e responsabilidade, não contornar regras de plataformas.</p>
        </ArticleSection>

        <ArticleSection id="boas-praticas" title="Boas práticas antes de tentar surebet">
          <ul className="grid sm:grid-cols-2 gap-4">
            {['Verifique as regras de cada casa e do mercado específico.', 'Confira as odds imediatamente antes de confirmar qualquer aposta.', 'Calcule stakes corretamente e evite arredondamentos grandes.', 'Use banca controlada e dinheiro que não comprometa despesas.', 'Evite pressa; oportunidade pequena não justifica decisão impulsiva.', 'Registre odds, horário, stake, retorno e observações.', 'Considere limites de stake, saque e confirmação de aposta.', 'Respeite jogo responsável e pare diante de perda de controle.'].map(item => <li key={item} className="card-glass p-5">{item}</li>)}
          </ul>
          <p>Também vale revisar a <Link to="/politica-de-afiliados" className="font-semibold" style={{ color: '#67e8f9' }}>política de afiliados</Link> do CalculaBet para entender nossa postura editorial e explorar outras <Link to="/ferramentas" className="font-semibold" style={{ color: '#67e8f9' }}>ferramentas para apostas</Link> com foco educativo.</p>
        </ArticleSection>

        <ArticleSection id="conclusao" title="Conclusão">
          <p>Surebet é uma forma de arbitragem esportiva baseada em odds e cálculos corretos. Quando odds diferentes criam soma de probabilidades implícitas abaixo de 100%, pode existir margem teórica. Porém, a calculadora ajuda apenas a enxergar o cenário matemático; ela não elimina mudança de odds, limites, anulações, erros humanos ou diferenças de regras.</p>
          <p>Use esse conhecimento de forma consciente, técnica e responsável. Antes de tomar qualquer decisão, simule, confira dados e reconheça que apostas envolvem risco financeiro.</p>
          <div className="rounded-3xl p-6 mt-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.14), rgba(52,211,153,0.10))', border: '1px solid rgba(103,232,249,0.18)' }}>
            <h2 className="text-2xl font-bold">Simule antes de decidir</h2>
            <p className="mt-3" style={{ color: 'var(--text-2)' }}>Use a Calculadora de Arbitragem do CalculaBet para simular cenários de surebet antes de tomar qualquer decisão.</p>
            <Link to="/ferramentas/arbitragem" className="btn-primary mt-5">Abrir Calculadora de Arbitragem <BlogIcon name="arrow" className="w-4 h-4" /></Link>
          </div>
        </ArticleSection>

        <section className="mt-14" aria-labelledby="faq-surebet">
          <h2 id="faq-surebet" className="text-3xl font-bold">FAQ sobre surebet e arbitragem esportiva</h2>
          <div className="mt-6 space-y-3">
            {SUREBET_FAQS.map(faq => (
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

function FormulaBox({ label, formula, example }) {
  return (
    <div className="rounded-3xl p-5 my-6" style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.16)' }}>
      <p className="badge badge-cyan mb-3">Fórmula</p>
      <h3 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>{label}</h3>
      <code className="block mt-4 text-lg sm:text-xl font-bold" style={{ color: '#67e8f9' }}>{formula}</code>
      {example && <p className="mt-3 text-sm sm:text-base" style={{ color: 'var(--text-2)' }}>{example}</p>}
    </div>
  );
}

function OddsCallout({ tone = 'cyan', children }) {
  const styles = tone === 'amber'
    ? { background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.18)' }
    : { background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.16)' };
  return <div className="rounded-3xl p-5 my-7 leading-relaxed" style={styles}>{children}</div>;
}

function OddsArticle({ post, category, relatedPosts }) {
  const examples = [
    ['R$10', '1.50', 'R$15,00', 'R$5,00'],
    ['R$10', '2.00', 'R$20,00', 'R$10,00'],
    ['R$10', '3.00', 'R$30,00', 'R$20,00'],
    ['R$10', '5.00', 'R$50,00', 'R$40,00'],
  ];
  const probabilityExamples = [['1.50', '66,67%'], ['2.00', '50%'], ['3.00', '33,33%']];
  const commonErrors = [
    'Confundir retorno com lucro e acreditar que todo valor recebido é ganho líquido.',
    'Achar que odd alta significa aposta melhor sem comparar probabilidade e risco.',
    'Ignorar a probabilidade implícita odds e olhar apenas para o possível pagamento.',
    'Não considerar que a margem da casa pode estar embutida nas cotações.',
    'Apostar sem gestão de banca, limites de stake e orçamento definido.',
    'Usar uma calculadora errada ou digitar valores de stake e odd incorretos.',
    'Comparar odds sem entender se o mercado, regra e período do evento são equivalentes.',
  ];

  return (
    <>
      <article className="rounded-[2rem] p-6 sm:p-8 lg:p-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.058), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.09)' }}>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="badge" style={{ color: category?.color || '#22d3ee', borderColor: `${category?.color || '#22d3ee'}35`, background: `${category?.color || '#22d3ee'}10` }}>Odds e Probabilidades</span>
          <span className="badge">{post.readingTime}</span>
          <span className="badge">Publicado em {formatDate(post.date)}</span>
          <span className="badge">Atualizado em {formatDate(post.updatedAt)}</span>
        </div>

        <header className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">Como Calcular Odds em Apostas Esportivas: Retorno, Lucro e Probabilidade</h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Entender <strong>como calcular odds</strong> é uma das bases para interpretar apostas esportivas com mais clareza. A odd mostra o retorno potencial de uma aposta e também permite estimar a probabilidade implícita daquele preço. Muitos iniciantes confundem retorno com lucro, não percebem que o valor apostado está incluído no retorno e acabam avaliando uma cotação de forma incompleta.
            </p>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Este guia explica as fórmulas essenciais para calcular odds, retorno de aposta, lucro em apostas esportivas e probabilidade implícita, sempre com exemplos simples. Você também verá quando usar uma <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de odds</Link> para simular cenários e evitar erro manual.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/ferramentas/odds" className="btn-primary">Usar calculadora de odds <BlogIcon name="arrow" className="w-4 h-4" /></Link>
              <Link to="/jogo-responsavel" className="btn-ghost">Jogo responsável</Link>
            </div>
          </div>
          <aside className="rounded-3xl p-6" style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.16)' }} aria-label="Resumo do artigo sobre odds">
            <p className="badge badge-cyan mb-4">Guia educativo</p>
            <h2 className="text-2xl font-bold">O que você vai aprender</h2>
            <div className="mt-5 grid gap-4">
              {[
                ['Retorno', 'Valor apostado × odd. Inclui a stake original.'],
                ['Lucro', 'Valor apostado × (odd - 1). Mostra o ganho líquido potencial.'],
                ['Probabilidade', '1 / odd × 100. Traduz a cotação em percentual implícito.'],
              ].map(item => <div key={item[0]} className="card-glass p-4"><h3 className="font-bold">{item[0]}</h3><p className="mt-2 text-sm" style={{ color: 'var(--text-2)' }}>{item[1]}</p></div>)}
            </div>
          </aside>
        </header>

        <OddsCallout tone="amber"><strong>Importante:</strong> conteúdo apenas educativo, indicado para maiores de 18 anos. Apostas envolvem riscos financeiros, não há garantia de ganhos e ferramentas devem ser usadas como apoio ao cálculo, não como promessa de resultado. Leia também nossas orientações de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>jogo responsável</Link>.</OddsCallout>

        <ArticleSection id="o-que-sao-odds" title="O que são odds em apostas esportivas?">
          <p>Odds são cotações que indicam quanto uma aposta pode retornar caso o palpite esteja correto. Em formato decimal, comum no Brasil, uma odd 2.00 significa que cada R$1 apostado pode retornar R$2 no total. Esse total inclui a stake original; por isso, o lucro líquido é menor que o retorno.</p>
          <p>As casas de apostas usam odds para precificar mercados, equilibrar exposição e incorporar suas margens. A odd também se relaciona com probabilidade: quanto menor a odd, maior a probabilidade implícita sugerida; quanto maior a odd, menor a probabilidade implícita. Isso não significa probabilidade real garantida. É apenas uma leitura matemática da cotação disponível.</p>
          <p>Odds mudam ao longo do tempo porque novas informações, volume de apostas, escalações, lesões, clima, movimentação de mercado e ajustes internos podem alterar o preço. Por isso, entender o valor da odd ajuda a comparar cenários, mas não transforma uma aposta em resultado previsível.</p>
        </ArticleSection>

        <ArticleSection id="calcular-retorno" title="Como calcular o retorno de uma aposta">
          <p>Para saber <strong>como calcular retorno de aposta</strong> em odds decimais, multiplique o valor apostado pela odd. Essa é a conta mais direta para responder quanto volta para a conta se o palpite for vencedor.</p>
          <FormulaBox label="Retorno total" formula="Retorno = Valor apostado × Odd" example="Exemplo: R$10 × 2.00 = R$20 de retorno total potencial." />
          <p>O ponto mais importante é que o retorno total inclui o valor apostado. Se você aposta R$10 e recebe R$20 de retorno, não significa que lucrou R$20. Significa que recebeu R$10 de volta mais R$10 de lucro potencial.</p>
        </ArticleSection>

        <ArticleSection id="calcular-lucro" title="Como calcular o lucro de uma aposta">
          <p>Para calcular o lucro em apostas esportivas, subtraia a stake do retorno ou use diretamente a fórmula abaixo. Essa diferença é essencial para quem quer entender o resultado líquido de uma aposta.</p>
          <FormulaBox label="Lucro líquido potencial" formula="Lucro = Valor apostado × (Odd - 1)" example="Exemplo: R$10 × (2.00 - 1) = R$10 de lucro potencial e R$20 de retorno total." />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card-glass p-5"><h3 className="font-bold">Retorno</h3><p className="mt-2 text-sm" style={{ color: 'var(--text-2)' }}>É tudo que volta em caso de acerto: stake + lucro.</p></div>
            <div className="card-glass p-5"><h3 className="font-bold">Lucro</h3><p className="mt-2 text-sm" style={{ color: 'var(--text-2)' }}>É apenas o ganho líquido acima do valor apostado.</p></div>
          </div>
          <OddsCallout><strong>Importante: retorno não é a mesma coisa que lucro. O retorno inclui o valor apostado.</strong></OddsCallout>
        </ArticleSection>

        <ArticleSection id="aposta-de-10" title="Como calcular quanto ganha uma aposta de R$10">
          <p>Uma busca comum de iniciantes é: <strong>quanto ganha uma aposta de R$10</strong>? A resposta depende da odd. A tabela mostra exemplos rápidos de como calcular aposta usando retorno e lucro.</p>
          <div className="overflow-x-auto rounded-3xl" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
            <table className="w-full text-left text-sm"><thead style={{ background: 'rgba(255,255,255,0.06)' }}><tr><th className="p-4">Valor apostado</th><th className="p-4">Odd</th><th className="p-4">Retorno</th><th className="p-4">Lucro</th></tr></thead><tbody>{examples.map(row => <tr key={row[1]} className="border-t border-white/10" style={{ color: 'var(--text-2)' }}>{row.map((cell, index) => <td key={`${cell}-${index}`} className={`p-4 ${index === 1 ? 'font-bold' : ''}`} style={index === 1 ? { color: 'var(--text-1)' } : undefined}>{cell}</td>)}</tr>)}</tbody></table>
          </div>
          <p>Perceba que odd 5.00 gera retorno maior que odd 1.50, mas isso não torna a aposta automaticamente melhor. Ela apenas oferece pagamento potencial maior para uma ocorrência que, em geral, é precificada como menos provável.</p>
        </ArticleSection>

        <ArticleSection id="probabilidade-implicita" title="Como calcular probabilidade implícita nas odds">
          <p>A probabilidade implícita odds é uma forma de transformar cotação decimal em percentual. Ela mostra qual probabilidade está embutida matematicamente no preço, antes de qualquer análise própria sobre o evento.</p>
          <FormulaBox label="Probabilidade implícita" formula="Probabilidade implícita = 1 / Odd × 100" example="Odd 2.00 = 1 / 2.00 × 100 = 50%." />
          <div className="grid sm:grid-cols-3 gap-4">{probabilityExamples.map(item => <div key={item[0]} className="card-glass p-5 text-center"><p className="text-2xl font-bold" style={{ color: '#67e8f9' }}>{item[0]}</p><p className="mt-2" style={{ color: 'var(--text-2)' }}>{item[1]} implícitos</p></div>)}</div>
          <OddsCallout><strong>Odds indicam uma probabilidade implícita, mas não garantem o resultado de um evento.</strong> A margem da casa pode estar embutida, e a probabilidade real depende de fatores que a cotação sozinha não explica.</OddsCallout>
        </ArticleSection>

        <ArticleSection id="calculadora-odds" title="Como usar a Calculadora de Odds do CalculaBet">
          <p>A <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de odds</Link> do CalculaBet ajuda a <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>calcular odds online</Link> de forma rápida. Você informa o valor apostado e a odd para visualizar retorno, lucro e probabilidade implícita sem fazer contas manualmente.</p>
          <p>Essa <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>ferramenta de odds do CalculaBet</Link> é útil para simular valores de aposta, comparar cenários e <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>calcular retorno de aposta</Link> com menos risco de erro de digitação. Ela não prevê resultados nem recomenda entradas; apenas torna o cálculo transparente.</p>
          <div className="rounded-3xl p-6 mt-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.16), rgba(52,211,153,0.10))', border: '1px solid rgba(103,232,249,0.20)' }}><h2 className="text-2xl font-bold">Simule retorno, lucro e probabilidade</h2><p className="mt-3" style={{ color: 'var(--text-2)' }}>Use a calculadora de apostas como apoio educativo antes de tomar qualquer decisão.</p><Link to="/ferramentas/odds" className="btn-primary mt-5">Abrir Calculadora de Odds <BlogIcon name="arrow" className="w-4 h-4" /></Link></div>
        </ArticleSection>

        <ArticleSection id="tipos-de-odds" title="Tipos de odds: decimal, americana e fracionária">
          <p>Existem diferentes formatos para representar o mesmo preço. As <strong>odds decimais</strong> são mais comuns no Brasil: exemplo 2.50, em que cada R$1 retorna R$2,50 no total. As <strong>odds americanas</strong> são comuns em mercados dos EUA, como +150 ou -200. As <strong>odds fracionárias</strong> são tradicionais no Reino Unido, como 3/2.</p>
          <p>Se você encontrar outro formato, use o <Link to="/ferramentas/conversor" className="font-semibold" style={{ color: '#67e8f9' }}>conversor de odds</Link> do CalculaBet para comparar cotações em uma linguagem mais familiar.</p>
        </ArticleSection>

        <ArticleSection id="converter-odds" title="Como converter odds">
          <p>A conversão pode ser feita manualmente, mas uma ferramenta reduz erros. Em linhas gerais, o <Link to="/ferramentas/conversor" className="font-semibold" style={{ color: '#67e8f9' }}>conversor de odds</Link> permite transformar decimal para americana, decimal para fracionária, odds para probabilidade e probabilidade para odds.</p>
          <p>Por exemplo, odd decimal 2.50 equivale a americana +150 e fracionária 3/2. Já uma odd americana -200 equivale a decimal 1.50. Ao estudar mercados internacionais, converter odds ajuda a comparar o valor da odd sem confundir formato com preço real.</p>
        </ArticleSection>

        <ArticleSection id="valor-esperado" title="O que é valor esperado nas odds?">
          <p>Valor esperado, ou EV, é a ideia de comparar sua probabilidade estimada com a probabilidade implícita da odd. Uma odd pode parecer alta, mas isso não significa que seja uma boa aposta. Se a chance real estimada for menor do que a chance necessária para justificar aquela odd, o risco pode não compensar.</p>
          <p>De forma simples: primeiro use a <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de odds</Link> para entender a probabilidade implícita. Depois compare com uma estimativa própria, sempre reconhecendo incerteza, margem de erro e variância. Um futuro guia sobre value bet poderá aprofundar esse tema, mas a base começa por saber calcular odds corretamente.</p>
        </ArticleSection>

        <ArticleSection id="erros-comuns" title="Erros comuns ao calcular odds">
          <ul className="grid sm:grid-cols-2 gap-4">{commonErrors.map(item => <li key={item} className="card-glass p-5">{item}</li>)}</ul>
        </ArticleSection>

        <ArticleSection id="apostas-multiplas" title="Como calcular odds em apostas múltiplas">
          <p>Em apostas múltiplas, as odds decimais são multiplicadas. Se três seleções têm odds 1.50, 2.00 e 1.80, a odd combinada é 1.50 × 2.00 × 1.80 = 5.40. Uma stake de R$10 teria retorno total potencial de R$54 e lucro potencial de R$44.</p>
          <p>O ponto crítico é o risco: a múltipla só retorna se todas as seleções forem vencedoras. O retorno pode crescer, mas a chance de acerto diminui conforme mais eventos entram no bilhete. Para simular esse tipo de cenário, use a <Link to="/ferramentas/multipla" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de aposta múltipla</Link>.</p>
        </ArticleSection>

        <ArticleSection id="gestao-de-banca" title="Odds e gestão de banca">
          <p>Calcular odds não é suficiente. Também é necessário controlar quanto apostar, qual percentual da banca está exposto e qual perda máxima é aceitável. Stake deve considerar risco, banca disponível e perfil do usuário — nunca pressão emocional ou tentativa de recuperar perdas.</p>
          <p>A ferramenta de <Link to="/ferramentas/gestao-de-banca" className="font-semibold" style={{ color: '#67e8f9' }}>gestão de banca</Link> ajuda a organizar limites, enquanto a calculadora de <Link to="/ferramentas/roi" className="font-semibold" style={{ color: '#67e8f9' }}>ROI</Link> pode apoiar análises de histórico. Ainda assim, apostar mais do que pode perder é perigoso. Consulte a página de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#67e8f9' }}>jogo responsável</Link> e lembre-se de que o CalculaBet oferece <Link to="/ferramentas" className="font-semibold" style={{ color: '#67e8f9' }}>ferramentas para apostas</Link> com foco educativo, não serviços de aposta. Nossa <Link to="/politica-de-afiliados" className="font-semibold" style={{ color: '#67e8f9' }}>política de afiliados</Link> explica a postura editorial do projeto.</p>
        </ArticleSection>

        <ArticleSection id="conclusao" title="Conclusão">
          <p>Odds indicam retorno potencial, mas precisam ser interpretadas com cuidado. Retorno e lucro são conceitos diferentes: o retorno inclui o valor apostado, enquanto o lucro mostra apenas o ganho líquido. A probabilidade implícita ajuda a traduzir a odd em percentual, mas não garante nenhum resultado.</p>
          <p>Calculadoras reduzem erro manual e facilitam simulações, porém apostas envolvem risco financeiro e exigem responsabilidade. Use ferramentas como apoio ao cálculo, nunca como promessa de lucro.</p>
          <div className="rounded-3xl p-6 mt-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.14), rgba(52,211,153,0.10))', border: '1px solid rgba(103,232,249,0.18)' }}><h2 className="text-2xl font-bold">Use a Calculadora de Odds do CalculaBet</h2><p className="mt-3" style={{ color: 'var(--text-2)' }}>Use a Calculadora de Odds do CalculaBet para simular retorno, lucro e probabilidade implícita antes de tomar qualquer decisão.</p><Link to="/ferramentas/odds" className="btn-primary mt-5">Abrir Calculadora de Odds <BlogIcon name="arrow" className="w-4 h-4" /></Link></div>
        </ArticleSection>

        <section className="mt-14" aria-labelledby="faq-odds">
          <p className="badge badge-cyan mb-4">FAQ SEO</p>
          <h2 id="faq-odds" className="text-3xl font-bold">Perguntas frequentes sobre como calcular odds</h2>
          <div className="mt-6 space-y-3">{ODDS_FAQS.map(faq => <details key={faq.question} className="card-glass p-5"><summary className="cursor-pointer font-semibold" style={{ color: 'var(--text-1)' }}>{faq.question}</summary><p className="mt-3 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>{faq.answer}</p></details>)}</div>
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


function BankrollCallout({ tone = 'cyan', children }) {
  const styles = tone === 'amber'
    ? { background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.18)' }
    : tone === 'green'
      ? { background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.18)' }
      : { background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.16)' };
  return <div className="rounded-3xl p-5 my-7 leading-relaxed" style={styles}>{children}</div>;
}

function BankrollArticle({ post, category, relatedPosts }) {
  return (
    <>
      <article className="rounded-[2rem] p-6 sm:p-8 lg:p-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.058), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.09)' }}>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="badge" style={{ color: category?.color || '#fbbf24', borderColor: `${category?.color || '#fbbf24'}35`, background: `${category?.color || '#fbbf24'}10` }}>Gestão de Banca</span>
          <span className="badge">{post.readingTime}</span>
          <span className="badge">Publicado em {formatDate(post.date)}</span>
          <span className="badge">Atualizado em {formatDate(post.updatedAt)}</span>
        </div>

        <header className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">O que é Gestão de Banca em Apostas Esportivas? Guia Completo para Iniciantes</h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Gestão de banca é um dos conceitos mais importantes para quem estuda apostas esportivas com responsabilidade. Muitos iniciantes focam apenas em palpites e odds, mas deixam de controlar o valor apostado, a frequência das entradas e o impacto de uma sequência negativa. Este guia explica como fazer gestão de banca, definir stake apostas, acompanhar resultados e usar a ferramenta de banca do CalculaBet como apoio educativo.
            </p>
            <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-2)' }}>
              O objetivo não é prometer lucro. Apostas envolvem risco financeiro, gestão de banca não garante ganhos e o CalculaBet não é uma casa de apostas. A proposta é ajudar você a entender controle de banca, calcular stake e tomar decisões menos impulsivas, sempre com limites claros e foco em <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>apostas responsáveis</Link>.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/ferramentas/gestao-de-banca" className="btn-primary">Abrir calculadora de gestão de banca <BlogIcon name="arrow" className="w-4 h-4" /></Link>
              <Link to="/jogo-responsavel" className="btn-ghost">Jogo responsável</Link>
            </div>
          </div>
          <aside className="rounded-3xl p-6" style={{ background: 'rgba(251,191,36,0.075)', border: '1px solid rgba(251,191,36,0.17)' }} aria-label="Resumo do guia de gestão de banca">
            <p className="badge mb-4" style={{ color: '#fbbf24', borderColor: 'rgba(251,191,36,0.28)', background: 'rgba(251,191,36,0.10)' }}>Guia para iniciantes</p>
            <h2 className="text-2xl font-bold">Três ideias para guardar</h2>
            <div className="mt-5 space-y-4">
              {bankrollHighlights.map(item => (
                <div key={item.title} className="card-glass p-4">
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{item.text}</p>
                </div>
              ))}
            </div>
          </aside>
        </header>

        <BankrollCallout tone="amber">
          <strong>Gestão de banca não garante lucro.</strong> Ela ajuda a controlar o tamanho das apostas e reduzir decisões impulsivas. Este conteúdo é apenas educativo, voltado a maiores de 18 anos, e as ferramentas do CalculaBet devem ser usadas como apoio ao cálculo, não como promessa de resultado.
        </BankrollCallout>

        <ArticleSection id="o-que-e-gestao-de-banca" title="O que é gestão de banca?">
          <p>Gestão de banca é o conjunto de regras que define quanto dinheiro será separado para apostas e qual valor poderá ser usado em cada evento. Em termos simples, a banca apostas é o orçamento reservado exclusivamente para esse tipo de atividade, enquanto a gestão é o método usado para controlar a stake, limitar exposição e registrar decisões.</p>
          <p>A diferença entre apostar por impulso e seguir uma regra de stake é enorme. No impulso, o valor costuma mudar conforme emoção, confiança no palpite, influência de terceiros ou vontade de recuperar perdas. Com uma regra, o apostador define antes quanto apostar em cada jogo, por exemplo 1% ou 2% da banca, e usa esse limite mesmo quando a sequência recente parece boa ou ruim.</p>
          <p>Para iniciantes, gestão de banca para iniciantes é menos sobre buscar fórmulas complexas e mais sobre criar disciplina. Ela ajuda a entender que odds, probabilidades, retorno potencial e risco financeiro caminham juntos. Também torna mais fácil comparar cenários com outras ferramentas, como a <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de odds</Link>, antes de qualquer decisão.</p>
        </ArticleSection>

        <ArticleSection id="banca-apostas-esportivas" title="O que é banca em apostas esportivas?">
          <p>Banca em apostas esportivas é o dinheiro separado exclusivamente para apostar. Ela não deve ser confundida com salário, reserva de emergência, limite do cartão, dinheiro de contas pessoais ou valores destinados a compromissos familiares. Se perder esse valor comprometer aluguel, alimentação, transporte, saúde, dívidas ou qualquer despesa essencial, ele não deve fazer parte da banca.</p>
          <p>Separar banca de despesas essenciais é uma regra de proteção. Essa separação cria uma barreira entre entretenimento de risco e vida financeira. Mesmo uma pessoa que estuda odds, acompanha mercados e usa calculadoras continua exposta a variância, erro de análise, eventos imprevisíveis e perdas.</p>
          <BankrollCallout tone="amber"><strong>Importante:</strong> nunca use dinheiro de aluguel, alimentação, contas ou dívidas para apostar. Nunca aposte valores que comprometam contas, alimentação, moradia ou compromissos financeiros.</BankrollCallout>
        </ArticleSection>

        <ArticleSection id="por-que-e-importante" title="Por que a gestão de banca é importante?">
          <p>A gestão de banca é importante porque ajuda a controlar exposição ao risco. Sem limite, uma única aposta pode representar uma parte grande demais do orçamento. Com limite, cada decisão fica proporcional à banca e menos dependente do humor do dia.</p>
          <p>Outro ponto é evitar apostar valores altos após perdas. Sequências negativas fazem parte da variância em apostas esportivas, inclusive quando a análise parecia coerente. Quando não existe controle de banca, a tentativa de recuperar rapidamente pode levar a stakes maiores, apostas em mercados mal compreendidos e perda de disciplina.</p>
          <p>Também há benefícios de acompanhamento. Registrar banca, stake, odd, resultado e motivo da entrada facilita entender desempenho, ROI em apostas e padrões de comportamento. Com dados, você consegue avaliar se uma estratégia faz sentido; sem dados, a memória tende a destacar acertos e minimizar erros.</p>
        </ArticleSection>

        <ArticleSection id="garante-lucro" title="Gestão de banca garante lucro?">
          <p>Não. Gestão de banca não garante lucro, não transforma apostas em renda segura, não substitui análise e não elimina risco financeiro. Uma pessoa pode usar stake baixa, planilha, calculadora gestão de banca e ainda assim ter prejuízo, porque resultados esportivos são incertos.</p>
          <p>O papel da gestão de banca é organizar a exposição: quanto da banca está em risco, qual limite será respeitado, que tipo de aposta será evitado e quando fazer pausa. Ela é uma camada de controle, não uma promessa de retorno. Se você busca orientações sobre limites, sinais de alerta e comportamento seguro, leia a página de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#67e8f9' }}>jogo responsável</Link>.</p>
        </ArticleSection>

        <ArticleSection id="stake-apostas" title="O que é stake em apostas?">
          <p>Stake é o valor apostado em uma seleção. Se você coloca R$10 em uma odd 2.00, a stake é R$10. Quando falamos em calculadora de stake, estamos tentando transformar uma regra de banca em um valor prático para uma aposta específica.</p>
          <p>Existem stakes fixas e variáveis. Na stake fixa, você aposta o mesmo valor por entrada, como R$2. Na stake variável, o valor muda de acordo com percentual da banca, confiança na análise, Critério de Kelly ou outro método. O ponto central é que a stake deve se relacionar com a banca, não com vontade de recuperar perdas.</p>
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            {[['1%', 'R$ 1,00'], ['2%', 'R$ 2,00'], ['5%', 'R$ 5,00']].map(([percent, value]) => (
              <div key={percent} className="card-glass p-5 text-center">
                <p className="text-3xl font-bold" style={{ color: '#fbbf24' }}>{percent}</p>
                <p className="mt-2" style={{ color: 'var(--text-2)' }}>de uma banca de R$100 = <strong style={{ color: 'var(--text-1)' }}>{value}</strong></p>
              </div>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection id="quanto-apostar" title="Como definir quanto apostar em cada jogo?">
          <p>Não existe resposta única para quanto apostar em cada jogo. O valor depende da banca, do perfil de risco, da experiência, do tipo de mercado e da capacidade de lidar com perdas. Ainda assim, alguns métodos são usados como referência para organizar decisões.</p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {bankrollMethods.map(method => <div key={method.title} className="card-glass p-5"><h3 className="text-xl font-bold">{method.title}</h3><p className="mt-3 text-sm sm:text-base" style={{ color: 'var(--text-2)' }}>{method.text}</p></div>)}
          </div>
          <p>Antes de escolher um método, simule cenários na <Link to="/ferramentas/gestao-de-banca" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de gestão de banca</Link>. A ferramenta de gestão de banca do CalculaBet ajuda a <Link to="/ferramentas/gestao-de-banca" className="font-semibold" style={{ color: '#67e8f9' }}>calcular stake</Link> por perfil e entender como a exposição muda conforme odd, banca e probabilidade estimada.</p>
        </ArticleSection>

        <ArticleSection id="exemplo-100" title="Exemplo prático de gestão de banca com R$100">
          <p>Imagine uma banca inicial de R$100. Uma pessoa conservadora pode usar 1% por aposta, ou R$1. Uma pessoa moderada pode simular 2%, ou R$2. Uma pessoa agressiva poderia usar 5%, ou R$5, mas esse nível de exposição costuma ser pesado para iniciantes.</p>
          <div className="overflow-x-auto rounded-3xl mt-6" style={{ border: '1px solid rgba(255,255,255,0.10)' }}>
            <table className="w-full text-left min-w-[680px]">
              <thead style={{ background: 'rgba(255,255,255,0.06)' }}><tr><th className="p-4">Perfil</th><th className="p-4">Percentual da banca</th><th className="p-4">Valor por aposta</th><th className="p-4">Observação</th></tr></thead>
              <tbody>{stakeProfileRows.map(row => <tr key={row[0]} className="border-t border-white/10"><td className="p-4 font-semibold">{row[0]}</td><td className="p-4">{row[1]}</td><td className="p-4">{row[2]}</td><td className="p-4" style={{ color: 'var(--text-2)' }}>{row[3]}</td></tr>)}</tbody>
            </table>
          </div>
          <p>Quanto maior a stake, maior a exposição. Cinco perdas seguidas usando 1% consomem aproximadamente R$5 da banca inicial; cinco perdas usando 5% consomem R$25 se o valor for fixo. Por isso, uma sequência negativa afeta muito mais quem usa stakes altas. Para iniciantes, o foco normalmente deve ser controle, aprendizado e registro.</p>
        </ArticleSection>

        <ArticleSection id="gestao-100-como-comecar" title="Gestão de banca com R$100: como começar">
          <p>A busca por gestão de banca 100 reais é comum porque começar pequeno pode ser útil para aprender. Com uma banca reduzida, o objetivo inicial não deve ser transformar apostas em renda, e sim entender odds, risco, disciplina e comportamento emocional. Uma banca de R$100 não torna a aposta segura; ela apenas limita o tamanho absoluto da exposição se for respeitada.</p>
          <p>Um plano simples seria: definir stake baixa, registrar todas as entradas, limitar frequência, evitar mercados desconhecidos, revisar resultados semanalmente e usar ferramentas antes de apostar. Se a banca acabar, o correto é pausar e reavaliar, não usar dinheiro essencial nem tentar recuperar perdas com novos depósitos impulsivos.</p>
        </ArticleSection>

        <ArticleSection id="criterio-de-kelly" title="O que é o Critério de Kelly?">
          <p>O Critério de Kelly é um método matemático para estimar stake com base em duas informações: a odd oferecida e a probabilidade que você estima para o evento. De forma introdutória, a lógica compara sua probabilidade estimada com a probabilidade implícita da odd para sugerir uma fração da banca.</p>
          <p>O problema é que Kelly depende de estimativa realista. Se a probabilidade inserida estiver otimista demais, a fórmula pode sugerir stake agressiva e aumentar bastante o risco. Por isso, muitos usuários preferem Meio Kelly, que usa metade da sugestão, ou um limite máximo adicional por aposta. Você pode simular Kelly e Meio Kelly na <Link to="/ferramentas/gestao-de-banca" className="font-semibold" style={{ color: '#67e8f9' }}>ferramenta de gestão de banca do CalculaBet</Link>.</p>
        </ArticleSection>

        <ArticleSection id="como-usar-calculadora" title="Como usar a Calculadora de Gestão de Banca do CalculaBet">
          <p>A <Link to="/ferramentas/gestao-de-banca" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de gestão de banca</Link> foi criada para apoiar simulações educativas. Ela não recomenda apostas, não prevê resultados e não promete lucro. A utilidade está em visualizar quanto uma stake representa da banca e comparar perfis antes de tomar qualquer decisão.</p>
          <ol className="grid gap-3 list-decimal list-inside mt-6">
            <li className="card-glass p-4">Informe sua banca atual, usando apenas dinheiro separado para apostas.</li>
            <li className="card-glass p-4">Informe a odd do mercado que deseja estudar.</li>
            <li className="card-glass p-4">Informe uma probabilidade estimada, se for usar Kelly ou Meio Kelly.</li>
            <li className="card-glass p-4">Escolha método ou perfil de risco.</li>
            <li className="card-glass p-4">Veja a stake sugerida e quanto ela representa da banca.</li>
            <li className="card-glass p-4">Avalie se o valor faz sentido para seu próprio limite de risco.</li>
          </ol>
          <div className="rounded-3xl p-6 mt-7 text-center" style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.16), rgba(34,211,238,0.10))', border: '1px solid rgba(251,191,36,0.22)' }}>
            <h2 className="text-2xl font-bold">Calcule sua stake com responsabilidade</h2>
            <p className="mt-3" style={{ color: 'var(--text-2)' }}>Use a ferramenta de banca do CalculaBet para calcular quanto apostar, calcular stake ideal em cenários simulados e entender riscos antes de agir.</p>
            <Link to="/ferramentas/gestao-de-banca" className="btn-primary mt-5">Usar calculadora de gestão de banca <BlogIcon name="arrow" className="w-4 h-4" /></Link>
          </div>
        </ArticleSection>

        <ArticleSection id="erros-comuns" title="Erros comuns na gestão de banca">
          <p>Os erros abaixo são frequentes entre iniciantes e podem comprometer a banca rapidamente. Eles não estão ligados apenas à matemática, mas também a emoção, pressa e falta de registro.</p>
          <ul className="grid md:grid-cols-2 gap-4 mt-6">{bankrollErrors.map(item => <li key={item} className="card-glass p-5">{item}</li>)}</ul>
          <p>Estratégias como <Link to="/ferramentas/martingale" className="font-semibold" style={{ color: '#67e8f9' }}>Martingale</Link> merecem cuidado especial porque aumentam stakes após perdas e podem exigir valores altos em sequências negativas. Se você percebe dificuldade de parar, acesse a página de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#67e8f9' }}>jogo responsável</Link>.</p>
        </ArticleSection>

        <ArticleSection id="multiplas" title="Gestão de banca e apostas múltiplas">
          <p>Apostas múltiplas combinam seleções e multiplicam odds. Isso aumenta o retorno potencial, mas reduz a chance de acerto, porque todas as seleções precisam ser vencedoras para o bilhete retornar. Por isso, múltiplas têm risco maior e exigem stake cuidadosamente limitada.</p>
          <p>Evite colocar grande parte da banca em múltiplas, especialmente quando a odd combinada ficou alta apenas pela soma de muitos eventos. Para entender retorno e risco de odds combinadas, use a <Link to="/ferramentas/multipla" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de aposta múltipla</Link> e compare com sua regra de stake.</p>
        </ArticleSection>

        <ArticleSection id="controle-emocional" title="Gestão de banca e controle emocional">
          <p>Controle emocional é parte da gestão de banca. Perdas fazem parte da variância e uma sequência negativa pode acontecer mesmo quando você se preparou. O risco aumenta quando a pessoa muda a estratégia por impulso, dobra stake, busca mercados desconhecidos ou aposta apenas para aliviar frustração.</p>
          <p>Pausas são importantes. Se você sente perda de controle, ansiedade intensa, necessidade de esconder apostas ou vontade de usar dinheiro essencial, interrompa a atividade e procure ajuda. A página de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#67e8f9' }}>jogo responsável</Link> reúne orientações e reforça que responsabilidade vem antes de qualquer estratégia.</p>
        </ArticleSection>

        <ArticleSection id="acompanhar-banca" title="Como acompanhar sua banca">
          <p>Acompanhar banca significa registrar valor apostado, odd, mercado, resultado, lucro ou prejuízo e motivo da decisão. Esse histórico permite calcular ROI, yield, taxa de acerto e variação da banca ao longo do tempo. Sem registro, fica difícil saber se a estratégia tem coerência ou se a percepção está sendo distorcida por poucos resultados recentes.</p>
          <p>A <Link to="/ferramentas/roi" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de ROI em apostas</Link> ajuda a avaliar retorno percentual sobre valores apostados. Combine esse acompanhamento com a <Link to="/ferramentas/gestao-de-banca" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de stake</Link> para entender exposição antes e depois das entradas.</p>
        </ArticleSection>

        <ArticleSection id="boas-praticas" title="Gestão de banca para iniciantes: boas práticas">
          <ul className="grid md:grid-cols-2 gap-4">{beginnerPractices.map(item => <li key={item} className="card-glass p-5">{item}</li>)}</ul>
          <p>O CalculaBet oferece <Link to="/ferramentas" className="font-semibold" style={{ color: '#67e8f9' }}>ferramentas para apostas</Link> e conteúdo educativo, mas não aceita apostas, não processa pagamentos e não garante resultados. Conheça também a página <Link to="/sobre" className="font-semibold" style={{ color: '#67e8f9' }}>sobre o CalculaBet</Link> e nossa <Link to="/politica-de-afiliados" className="font-semibold" style={{ color: '#67e8f9' }}>política de afiliados</Link>.</p>
        </ArticleSection>

        <ArticleSection id="conclusao" title="Conclusão">
          <p>Gestão de banca é controle de risco. Ela organiza a banca, limita o tamanho das stakes, reduz decisões impulsivas e ajuda a acompanhar desempenho com mais clareza. Mesmo assim, não garante lucro, não elimina perdas e não transforma apostas esportivas em investimento seguro.</p>
          <p>Stakes devem ser proporcionais à banca, compatíveis com seu limite pessoal e definidas antes da emoção do evento. Ferramentas podem ajudar nos cálculos, mas responsabilidade vem antes de qualquer estratégia.</p>
          <div className="rounded-3xl p-6 mt-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.14), rgba(251,191,36,0.12))', border: '1px solid rgba(103,232,249,0.18)' }}>
            <h2 className="text-2xl font-bold">Use a Calculadora de Gestão de Banca do CalculaBet</h2>
            <p className="mt-3" style={{ color: 'var(--text-2)' }}>Use a Calculadora de Gestão de Banca do CalculaBet para simular stakes, entender riscos e tomar decisões mais conscientes.</p>
            <Link to="/ferramentas/gestao-de-banca" className="btn-primary mt-5">Abrir ferramenta de gestão de banca <BlogIcon name="arrow" className="w-4 h-4" /></Link>
          </div>
        </ArticleSection>

        <section className="mt-14" aria-labelledby="faq-gestao-banca">
          <p className="badge mb-4" style={{ color: '#fbbf24', borderColor: 'rgba(251,191,36,0.28)', background: 'rgba(251,191,36,0.10)' }}>FAQ SEO</p>
          <h2 id="faq-gestao-banca" className="text-3xl font-bold">Perguntas frequentes sobre gestão de banca</h2>
          <div className="mt-6 space-y-3">{BANKROLL_FAQS.map(faq => <details key={faq.question} className="card-glass p-5"><summary className="cursor-pointer font-semibold" style={{ color: 'var(--text-1)' }}>{faq.question}</summary><p className="mt-3 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>{faq.answer}</p></details>)}</div>
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


function MultipleBetArticle({ post, category, relatedPosts }) {
  const exampleRows = [
    ['Seleção 1', '1.60', 'Pendente', '1.60'],
    ['Seleção 2', '1.75', 'Pendente', '1.60 × 1.75 = 2.80'],
    ['Seleção 3', '2.10', 'Pendente', '2.80 × 2.10 = 5.88'],
  ];
  const comparisonRows = [
    ['Evento necessário', 'Depende de uma seleção.', 'Depende de duas ou mais seleções.'],
    ['Retorno potencial', 'Calculado por uma odd individual.', 'Calculado por odds combinadas, multiplicando cada odd.'],
    ['Risco', 'Concentrado em um resultado.', 'Maior variância, pois uma seleção perdida costuma derrubar o bilhete.'],
    ['Facilidade de cálculo', 'Mais simples: stake × odd.', 'Exige multiplicar odds e conferir retorno e lucro.'],
    ['Perfil indicado', 'Mais fácil para apostas esportivas para iniciantes.', 'Deve ser estudada com cautela, preferencialmente com poucas seleções e simulação.'],
  ];
  const errors = [
    'Colocar seleções demais no bilhete e ignorar que cada nova seleção reduz a probabilidade conjunta de acerto.',
    'Escolher odds altas sem análise, olhando apenas para o retorno aposta múltipla mostrado no cupom.',
    'Apostar valor alto em múltiplas, mesmo sabendo que a variância é maior.',
    'Tentar recuperar perdas com uma múltipla, aumentando risco justamente em um momento emocional.',
    'Não calcular a odd combinada corretamente ou esquecer que odds decimais devem ser multiplicadas.',
    'Confundir retorno com lucro aposta múltipla: retorno inclui a stake original; lucro é retorno menos stake.',
    'Ignorar probabilidade implícita e tratar uma odd final alta como se fosse uma oportunidade segura.',
    'Não fazer gestão de banca, não definir limite de stake e não registrar decisões.',
    'Apostar por emoção, pressa, torcida ou sensação de que “uma seleção só não vai atrapalhar”.',
  ];

  return (
    <>
      <article className="rounded-[2rem] p-6 sm:p-8 lg:p-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.058), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.09)' }}>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="badge" style={{ color: category?.color || '#a78bfa', borderColor: `${category?.color || '#a78bfa'}35`, background: `${category?.color || '#a78bfa'}10` }}>Apostas Múltiplas</span>
          <span className="badge">{post.readingTime}</span>
          <span className="badge">Publicado em {formatDate(post.date)}</span>
          <span className="badge">Atualizado em {formatDate(post.updatedAt)}</span>
        </div>

        <header className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">O que é Aposta Múltipla? Como Funciona e Como Calcular</h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              A <strong>aposta múltipla</strong> é muito popular entre iniciantes porque combina várias seleções em um único bilhete e pode mostrar um retorno potencial maior do que uma aposta simples. Esse potencial, porém, vem acompanhado de um ponto essencial: quanto mais seleções entram no bilhete, mais resultados precisam acontecer ao mesmo tempo.
            </p>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Neste guia educativo você vai entender <strong>o que é aposta múltipla</strong>, <strong>aposta múltipla como funciona</strong>, como calcular odds combinadas, retorno, lucro potencial e riscos. O objetivo é explicar a matemática com exemplos claros e mostrar como usar a <Link to="/ferramentas/multipla" className="font-semibold" style={{ color: '#c4b5fd' }}>calculadora de aposta múltipla</Link> do CalculaBet como apoio ao cálculo — nunca como promessa de resultado.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/ferramentas/multipla" className="btn-primary">Usar calculadora de aposta múltipla <BlogIcon name="arrow" className="w-4 h-4" /></Link>
              <Link to="/jogo-responsavel" className="btn-ghost">Jogo responsável</Link>
            </div>
          </div>
          <aside className="rounded-3xl p-6" style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.18)' }} aria-label="Resumo do artigo sobre aposta múltipla">
            <p className="badge mb-4" style={{ color: '#c4b5fd', borderColor: 'rgba(196,181,253,0.28)', background: 'rgba(167,139,250,0.12)' }}>Guia para iniciantes</p>
            <h2 className="text-2xl font-bold">Pontos essenciais</h2>
            <div className="mt-5 grid gap-4">
              {[
                ['Combinação', 'Une duas ou mais seleções no mesmo bilhete.'],
                ['Odd final', 'Odds decimais são multiplicadas para formar a odd combinada.'],
                ['Risco', 'Em geral, todas as seleções precisam vencer para haver retorno.'],
              ].map(item => <div key={item[0]} className="card-glass p-4"><h3 className="font-bold">{item[0]}</h3><p className="mt-2 text-sm" style={{ color: 'var(--text-2)' }}>{item[1]}</p></div>)}
            </div>
          </aside>
        </header>

        <OddsCallout tone="amber"><strong>Conteúdo educativo:</strong> o CalculaBet não é casa de apostas, não aceita apostas e não processa pagamentos. Apostas envolvem riscos financeiros, são permitidas apenas para maiores de 18 anos e não há garantia de ganhos. Use ferramentas como apoio ao cálculo, não como promessa de resultado. Consulte também a página de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>jogo responsável</Link>.</OddsCallout>

        <ArticleSection id="o-que-e-aposta-multipla" title="O que é aposta múltipla?">
          <p>Aposta múltipla é um tipo de bilhete que reúne duas ou mais seleções. Ela também é chamada de <strong>aposta combinada</strong> ou <strong>parlay</strong>. Em vez de apostar em apenas um evento, a pessoa combina mercados diferentes em uma só aposta.</p>
          <p>A regra central é simples: para a múltipla ser vencedora, todas as seleções precisam ser vencedoras. Se uma seleção perder, normalmente a múltipla inteira perde. Por isso, embora a odd final possa parecer atraente, o risco também cresce.</p>
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            {[
              ['2+ seleções', 'Uma múltipla começa com duas escolhas no mesmo bilhete.'],
              ['Odds combinadas', 'A cotação final surge da multiplicação das odds decimais.'],
              ['Tudo precisa bater', 'Uma seleção perdida costuma encerrar o retorno do cupom.'],
            ].map(card => <div key={card[0]} className="card-glass p-5"><h3 className="font-bold">{card[0]}</h3><p className="mt-2 text-sm" style={{ color: 'var(--text-2)' }}>{card[1]}</p></div>)}
          </div>
        </ArticleSection>

        <ArticleSection id="como-funciona" title="Como funciona uma aposta múltipla?">
          <p>Para montar uma múltipla, o usuário escolhe vários eventos ou mercados. Pode ser uma combinação de resultados de jogos, mercados de gols, handicaps ou outras seleções disponíveis. Depois disso, as odds são combinadas em uma odd final.</p>
          <p>O retorno potencial aumenta porque a odd final é maior do que cada odd isolada. Mas a chance de acerto diminui porque o bilhete depende de vários resultados. Um jogo que parecia simples pode anular todo o cálculo se o mercado escolhido não for vencedor.</p>
          <p>Empates, adiamentos, cancelamentos e anulações podem ter regras diferentes dependendo da casa e do mercado. Em muitos casos, uma seleção anulada é tratada como odd 1.00 e removida do cálculo, mas isso não é universal.</p>
        </ArticleSection>

        <ArticleSection id="tem-que-acertar-tudo" title="Aposta múltipla tem que acertar tudo?">
          <p>Sim. Na regra geral, <strong>aposta múltipla tem que acertar tudo</strong>. Se uma seleção perder, a aposta perde. Esse é o principal motivo para iniciantes tratarem múltiplas com cautela.</p>
          <p>Se uma seleção for anulada, a odd pode ser removida do cálculo ou substituída por 1.00, dependendo das regras da plataforma. Eventos adiados, mercados cancelados e erros de mercado também podem ter tratamento próprio.</p>
          <OddsCallout tone="amber"><strong>Antes de apostar, confira as regras da plataforma para seleções anuladas, adiadas ou mercados cancelados.</strong></OddsCallout>
          <OddsCallout tone="amber"><strong>Quanto mais seleções uma múltipla tiver, menor tende a ser a probabilidade de acerto.</strong></OddsCallout>
        </ArticleSection>

        <ArticleSection id="como-calcular-odds-combinadas" title="Como calcular odds combinadas">
          <p>Para aprender <strong>como calcular aposta múltipla</strong>, comece pela odd final. Em odds decimais, a fórmula é multiplicar todas as odds do bilhete.</p>
          <FormulaBox label="Odd combinada" formula="Odd combinada = Odd 1 × Odd 2 × Odd 3..." example="Exemplo: 1.50 × 2.00 × 1.80 = 5.40" />
          <p>Se a seleção 1 tem odd 1.50, a seleção 2 tem odd 2.00 e a seleção 3 tem odd 1.80, a odd combinada será 5.40. Essa é a cotação usada para calcular o retorno potencial do bilhete.</p>
          <p>Uma <Link to="/ferramentas/multipla" className="font-semibold" style={{ color: '#c4b5fd' }}>calculadora de odds combinadas</Link> faz essa multiplicação automaticamente e reduz o risco de erro manual, principalmente quando há várias seleções.</p>
        </ArticleSection>

        <ArticleSection id="calcular-retorno" title="Como calcular o retorno de uma aposta múltipla">
          <p>Depois de encontrar a odd combinada, o retorno é calculado multiplicando o valor apostado pela odd final.</p>
          <FormulaBox label="Retorno da múltipla" formula="Retorno = Valor apostado × Odd combinada" example="Com R$10 e odd combinada 5.40: retorno total = R$54,00; lucro potencial = R$44,00." />
          <p>O retorno inclui o valor apostado. Por isso, lucro não é a mesma coisa que retorno. O <strong>lucro aposta múltipla</strong> é o retorno total menos o valor apostado.</p>
          <OddsCallout tone="amber"><strong>Retorno potencial não é lucro garantido. Apostas envolvem risco financeiro.</strong></OddsCallout>
        </ArticleSection>

        <ArticleSection id="exemplo-pratico" title="Exemplo prático de aposta múltipla">
          <p>Imagine uma aposta combinada com três seleções: odd 1.60, odd 1.75 e odd 2.10. O valor apostado é R$20. A odd combinada será 1.60 × 1.75 × 2.10 = 5.88. O retorno total potencial será R$20 × 5.88 = R$117,60. O lucro potencial será R$117,60 − R$20 = R$97,60.</p>
          <div className="overflow-x-auto rounded-3xl mt-6" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
            <table className="w-full text-left text-sm sm:text-base">
              <thead style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-1)' }}><tr><th className="p-4">Seleção</th><th className="p-4">Odd</th><th className="p-4">Status</th><th className="p-4">Cálculo acumulado</th></tr></thead>
              <tbody>{exampleRows.map(row => <tr key={row[0]} style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>{row.map(cell => <td key={cell} className="p-4" style={{ color: 'var(--text-2)' }}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <p>Mesmo com odds que parecem moderadas isoladamente, a combinação chega a 5.88. Isso mostra por que múltiplas parecem atraentes e por que o risco precisa ser analisado: três resultados precisam acontecer, não apenas um.</p>
        </ArticleSection>

        <ArticleSection id="calculadora" title="Como usar a Calculadora de Aposta Múltipla do CalculaBet">
          <p>A <Link to="/ferramentas/multipla" className="font-semibold" style={{ color: '#c4b5fd' }}>calculadora de aposta múltipla</Link> do CalculaBet ajuda a multiplicar odds automaticamente, calcular retorno, calcular lucro potencial e simular diferentes valores de stake.</p>
          <p>Para usar a <Link to="/ferramentas/multipla" className="font-semibold" style={{ color: '#c4b5fd' }}>ferramenta de múltiplas do CalculaBet</Link>, informe as odds de cada seleção e o valor apostado. A ferramenta mostra a odd combinada, o retorno estimado e o lucro potencial. Isso ajuda a <Link to="/ferramentas/multipla" className="font-semibold" style={{ color: '#c4b5fd' }}>calcular aposta combinada</Link> com menos erro manual.</p>
          <div className="rounded-3xl p-6 mt-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.18), rgba(34,211,238,0.10))', border: '1px solid rgba(196,181,253,0.22)' }}>
            <h2 className="text-2xl font-bold">Simule odds combinadas antes de decidir</h2>
            <p className="mt-3" style={{ color: 'var(--text-2)' }}>Use a calculadora apostas combinadas para visualizar retorno e lucro potencial com clareza.</p>
            <Link to="/ferramentas/multipla" className="btn-primary mt-5">Abrir calculadora de odds combinadas <BlogIcon name="arrow" className="w-4 h-4" /></Link>
          </div>
        </ArticleSection>

        <ArticleSection id="simples-vs-multipla" title="Qual a diferença entre aposta simples e aposta múltipla?">
          <p>A aposta simples depende de um único evento. Já a aposta múltipla depende de vários eventos ou mercados no mesmo bilhete. Para entender melhor odds individuais, veja também a <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de odds</Link>.</p>
          <div className="overflow-x-auto rounded-3xl mt-6" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
            <table className="w-full text-left text-sm sm:text-base"><thead style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-1)' }}><tr><th className="p-4">Critério</th><th className="p-4">Aposta simples</th><th className="p-4">Aposta múltipla</th></tr></thead><tbody>{comparisonRows.map(row => <tr key={row[0]} style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>{row.map(cell => <td key={cell} className="p-4" style={{ color: 'var(--text-2)' }}>{cell}</td>)}</tr>)}</tbody></table>
          </div>
        </ArticleSection>

        <ArticleSection id="por-que-atraentes" title="Por que apostas múltiplas parecem tão atraentes?">
          <p>Apostas múltiplas parecem atraentes porque odds combinadas podem gerar números altos. Um valor pequeno pode mostrar um retorno potencial grande na tela, o que leva muitos iniciantes a focarem no prêmio e não na probabilidade.</p>
          <p>O problema é que cada seleção adicionada cria uma nova condição para o bilhete vencer. Quanto mais seleções, menor tende a ser a probabilidade conjunta de acerto. Por isso, múltiplas devem ser entendidas como apostas de maior variância, não como estratégia segura.</p>
        </ArticleSection>

        <ArticleSection id="odd-alta" title="Quanto maior a odd combinada, melhor?">
          <p>Não necessariamente. Odd alta significa retorno potencial maior, mas também menor probabilidade implícita. Uma múltipla com odd final muito alta pode ser matematicamente difícil de acertar, especialmente quando reúne muitos eventos independentes.</p>
          <p>Para estudar esse ponto, vale usar a <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>ferramenta para calcular odds</Link>, o <Link to="/ferramentas/conversor" className="font-semibold" style={{ color: '#67e8f9' }}>conversor de odds</Link> e o guia <Link to="/blog/como-calcular-odds" className="font-semibold" style={{ color: '#67e8f9' }}>como calcular odds</Link>.</p>
        </ArticleSection>

        <ArticleSection id="erros-comuns" title="Erros comuns em apostas múltiplas">
          <ul className="grid gap-3">{errors.map(error => <li key={error} className="card-glass p-4">{error}</li>)}</ul>
          <p>Esses erros ficam mais perigosos quando não há <Link to="/ferramentas/gestao-de-banca" className="font-semibold" style={{ color: '#fbbf24' }}>gestão de banca</Link> ou quando a pessoa ignora orientações de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>jogo responsável</Link>.</p>
        </ArticleSection>

        <ArticleSection id="gestao-de-banca" title="Aposta múltipla e gestão de banca">
          <p>Múltiplas podem aumentar a variância. Por isso, stakes devem ser menores, controladas e compatíveis com uma banca previamente definida. Não é recomendado comprometer grande parte da banca em uma única múltipla, pois uma seleção perdida pode encerrar todo o retorno.</p>
          <p>Definir limite antes de apostar é essencial. A <Link to="/ferramentas/gestao-de-banca" className="font-semibold" style={{ color: '#fbbf24' }}>calculadora de gestão de banca</Link> ajuda a simular stakes proporcionais, enquanto a <Link to="/ferramentas/roi" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de ROI</Link> ajuda a entender resultado líquido em registros de longo prazo.</p>
        </ArticleSection>

        <ArticleSection id="iniciantes" title="Aposta múltipla é indicada para iniciantes?">
          <p>Iniciantes podem estudar o conceito, mas precisam entender que o risco é maior. Para aprender, é mais simples simular antes de apostar, começar com poucas seleções e comparar o resultado com uma aposta simples.</p>
          <p>O uso deve ser responsável: apenas maiores de 18 anos, sem dinheiro essencial, sem promessa de lucro e sem tentativa de recuperar perdas. O CalculaBet oferece <Link to="/ferramentas" className="font-semibold" style={{ color: '#67e8f9' }}>ferramentas para apostas</Link> com foco educativo e mantém uma <Link to="/politica-de-afiliados" className="font-semibold" style={{ color: '#67e8f9' }}>política de afiliados</Link> transparente.</p>
        </ArticleSection>

        <ArticleSection id="multipla-3-jogos" title="Como calcular uma aposta múltipla com 3 jogos">
          <p>Exemplo de long tail: Jogo 1 com odd 1.70, Jogo 2 com odd 1.90 e Jogo 3 com odd 2.00. Primeiro, multiplique as odds: 1.70 × 1.90 × 2.00 = 6.46.</p>
          <p>Depois, multiplique pela stake. Com aposta de R$10, o retorno total potencial é R$10 × 6.46 = R$64,60. O lucro potencial é R$64,60 − R$10 = R$54,60.</p>
          <FormulaBox label="Múltipla com 3 jogos" formula="1.70 × 1.90 × 2.00 = 6.46" example="Stake R$10 → retorno R$64,60; lucro potencial R$54,60." />
        </ArticleSection>

        <ArticleSection id="conclusao" title="Conclusão">
          <p>Aposta múltipla combina várias seleções em um único bilhete. Em geral, todas precisam acertar. As odds são multiplicadas para formar a odd combinada, e o retorno é calculado multiplicando a stake por essa odd final.</p>
          <p>O retorno pode crescer, mas o risco também cresce. Por isso, a calculadora ajuda a evitar erro manual, mas não elimina variância, não prevê resultados e não garante lucro. Responsabilidade é essencial.</p>
          <div className="rounded-3xl p-6 mt-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.18), rgba(251,191,36,0.10))', border: '1px solid rgba(196,181,253,0.22)' }}>
            <h2 className="text-2xl font-bold">Use a Calculadora de Aposta Múltipla do CalculaBet</h2>
            <p className="mt-3" style={{ color: 'var(--text-2)' }}>Use a Calculadora de Aposta Múltipla do CalculaBet para simular odds combinadas, retorno e lucro antes de tomar qualquer decisão.</p>
            <Link to="/ferramentas/multipla" className="btn-primary mt-5">Simular aposta múltipla <BlogIcon name="arrow" className="w-4 h-4" /></Link>
          </div>
        </ArticleSection>

        <section className="mt-14" aria-labelledby="faq-aposta-multipla">
          <p className="badge mb-4" style={{ color: '#c4b5fd', borderColor: 'rgba(196,181,253,0.28)', background: 'rgba(167,139,250,0.12)' }}>FAQ SEO</p>
          <h2 id="faq-aposta-multipla" className="text-3xl font-bold">Perguntas frequentes sobre aposta múltipla</h2>
          <div className="mt-6 space-y-3">{MULTIPLE_FAQS.map(faq => <details key={faq.question} className="card-glass p-5"><summary className="cursor-pointer font-semibold" style={{ color: 'var(--text-1)' }}>{faq.question}</summary><p className="mt-3 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>{faq.answer}</p></details>)}</div>
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


export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const category = getCategoryById(post.category);
  const relatedPosts = getRelatedPosts(post);
  const faqItems = BLOG_FAQS.slice(0, 3);

  return (
    <>
      <SEOHead title={post.seoTitle || post.title} description={post.excerpt} canonical={`/blog/${post.slug}`} schema={buildArticleSchema(post, category)} ogType="article" appendSiteName={!['o-que-e-surebet', 'como-calcular-odds', 'o-que-e-gestao-de-banca', 'o-que-e-aposta-multipla'].includes(post.slug)} ogTitle={post.ogTitle} ogDescription={post.ogDescription} />

      <main className="relative overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full blur-3xl opacity-20" style={{ background: `radial-gradient(circle, ${category?.color || '#22d3ee'}66, transparent 64%)` }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />

          {post.slug === 'o-que-e-surebet' ? (
            <SurebetArticle post={post} category={category} relatedPosts={relatedPosts} />
          ) : post.slug === 'como-calcular-odds' ? (
            <OddsArticle post={post} category={category} relatedPosts={relatedPosts} />
          ) : post.slug === 'o-que-e-gestao-de-banca' ? (
            <BankrollArticle post={post} category={category} relatedPosts={relatedPosts} />
          ) : post.slug === 'o-que-e-aposta-multipla' ? (
            <MultipleBetArticle post={post} category={category} relatedPosts={relatedPosts} />
          ) : (
          <>
          <article className="rounded-[2rem] p-6 sm:p-8 lg:p-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.09)' }}>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="badge" style={{ color: category?.color || '#22d3ee', borderColor: `${category?.color || '#22d3ee'}35`, background: `${category?.color || '#22d3ee'}10` }}>{category?.name}</span>
              <span className="badge">{post.readingTime}</span>
              <span className="badge">Atualizado em {formatDate(post.updatedAt)}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">{post.title}</h1>
            <p className="mt-5 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>{post.excerpt}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map(tag => <span key={tag} className="badge">#{tag}</span>)}
            </div>

            <div className="mt-10 rounded-3xl p-6" style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.14)' }}>
              <p className="badge badge-cyan mb-3">Base preparada para artigo completo</p>
              <h2 className="text-2xl font-bold">Conteúdo em produção editorial</h2>
              <p className="mt-3 leading-relaxed" style={{ color: 'var(--text-2)' }}>
                Esta URL já está estruturada para receber o artigo completo com conteúdo original, FAQ próprio, ferramentas relacionadas e marcação Article/BlogPosting. Por enquanto, mantemos apenas resumo, metadados e links úteis para evitar publicar conteúdo raso ou inventado.
              </p>
              {post.relatedTool && (
                <Link to={post.relatedTool.href} className="btn-primary mt-6">
                  Abrir {post.relatedTool.label} <BlogIcon name="arrow" className="w-4 h-4" />
                </Link>
              )}
            </div>

            <section className="mt-10 grid sm:grid-cols-2 gap-4" aria-label="Links úteis relacionados">
              <Link to="/ferramentas" className="card-glass p-5 hover:border-cyan-400/30">
                <h3 className="font-bold">Explorar ferramentas</h3>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-2)' }}>Acesse calculadoras para odds, ROI, cashout, dutching, arbitragem e gestão de banca.</p>
              </Link>
              <Link to="/jogo-responsavel" className="card-glass p-5 hover:border-amber-400/30">
                <h3 className="font-bold">Jogo responsável</h3>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-2)' }}>Revise limites, riscos financeiros e sinais de alerta antes de qualquer decisão.</p>
              </Link>
            </section>

            <section className="mt-10" aria-labelledby="post-faq">
              <h2 id="post-faq" className="text-2xl font-bold">Perguntas relacionadas</h2>
              <div className="mt-4 space-y-3">
                {faqItems.map(faq => (
                  <details key={faq.question} className="card-glass p-5">
                    <summary className="cursor-pointer font-semibold" style={{ color: 'var(--text-1)' }}>{faq.question}</summary>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{faq.answer}</p>
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
          )}
        </div>
      </main>
    </>
  );
}
