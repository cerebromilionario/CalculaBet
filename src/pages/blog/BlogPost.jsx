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
      ...(post.slug === 'o-que-e-surebet' ? [{
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: SUREBET_FAQS.map(faq => ({
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

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const category = getCategoryById(post.category);
  const relatedPosts = getRelatedPosts(post);
  const faqItems = BLOG_FAQS.slice(0, 3);

  return (
    <>
      <SEOHead title={post.title} description={post.excerpt} canonical={`/blog/${post.slug}`} schema={buildArticleSchema(post, category)} ogType="article" appendSiteName={post.slug !== 'o-que-e-surebet'} />

      <main className="relative overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full blur-3xl opacity-20" style={{ background: `radial-gradient(circle, ${category?.color || '#22d3ee'}66, transparent 64%)` }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />

          {post.slug === 'o-que-e-surebet' ? (
            <SurebetArticle post={post} category={category} relatedPosts={relatedPosts} />
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
