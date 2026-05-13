import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead, { BASE_URL } from '../../components/ui/SEOHead';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import BlogCard from '../../components/blog/BlogCard';
import BlogSearch from '../../components/blog/BlogSearch';
import CategoryFilter from '../../components/blog/CategoryFilter';
import BlogIcon from '../../components/blog/BlogIcon';
import { BLOG_CATEGORIES, BLOG_FAQS, BLOG_POSTS, getCategoryById } from '../../data/blog/blogData';

const title = 'Blog CalculaBet | Guias sobre Odds, Apostas, Probabilidade e Gestão de Banca';
const description = 'Leia guias educativos sobre odds, apostas esportivas, probabilidades, gestão de banca, arbitragem, cashout e uso responsável de ferramentas para apostadores.';

const internalLinks = [
  { label: 'Ferramentas', href: '/ferramentas' },
  { label: 'Calculadora de Odds', href: '/calculadoras/odds' },
  { label: 'Arbitragem', href: '/calculadoras/arbitragem' },
  { label: 'Dutching', href: '/calculadoras/dutching' },
  { label: 'Cashout', href: '/calculadoras/cashout' },
  { label: 'Gestão de Banca', href: '/calculadoras/gestao-banca' },
  { label: 'ROI', href: '/calculadoras/roi' },
  { label: 'Conversor de Odds', href: '/calculadoras/conversor-odds' },
  { label: 'Jogo Responsável', href: '/jogo-responsavel' },
  { label: 'Política de Afiliados', href: '/politica-de-afiliados' },
  { label: 'Sobre', href: '/sobre' },
];

function normalize(value) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function buildSchema() {
  const blogUrl = `${BASE_URL}/blog`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${blogUrl}#webpage`,
        url: blogUrl,
        name: title,
        description,
        isPartOf: { '@type': 'WebSite', name: 'CalculaBet', url: BASE_URL },
        breadcrumb: { '@id': `${blogUrl}#breadcrumb` },
      },
      {
        '@type': 'Blog',
        '@id': `${blogUrl}#blog`,
        url: blogUrl,
        name: 'Blog CalculaBet',
        description,
        publisher: { '@type': 'Organization', name: 'CalculaBet', url: BASE_URL },
        blogPost: BLOG_POSTS.map(post => ({
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          url: `${blogUrl}/${post.slug}`,
          datePublished: post.date,
          dateModified: post.updatedAt,
          author: { '@type': 'Organization', name: post.author },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${blogUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: blogUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${blogUrl}#faq`,
        mainEntity: BLOG_FAQS.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };
}

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const articleCounts = useMemo(() => BLOG_POSTS.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {}), []);

  const selectedCategoryName = selectedCategory === 'all' ? 'Todas as categorias' : getCategoryById(selectedCategory)?.name;

  const filteredPosts = useMemo(() => {
    const query = normalize(searchTerm.trim());
    const result = BLOG_POSTS.filter(post => {
      const category = getCategoryById(post.category);
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const searchable = normalize([post.title, post.excerpt, category?.name, ...post.tags].join(' '));
      return matchesCategory && (!query || searchable.includes(query));
    });

    return result.sort((a, b) => {
      if (sortBy === 'popular') return b.popularity - a.popularity;
      if (sortBy === 'readingTime') return parseInt(a.readingTime, 10) - parseInt(b.readingTime, 10);
      return new Date(b.date) - new Date(a.date);
    });
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <>
      <SEOHead title={title} description={description} canonical="/blog" schema={buildSchema()} />

      <main className="relative overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[520px] rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.30), transparent 65%)' }} />
          <div className="absolute top-56 right-[-160px] w-[520px] h-[520px] rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.38), transparent 62%)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Blog' }]} />

          <section className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
            <div>
              <p className="badge badge-cyan mb-5">Educação, cálculo e responsabilidade</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02] text-gradient">
                Blog sobre Odds, Apostas Esportivas e Gestão de Banca
              </h1>
              <p className="mt-6 text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--text-2)' }}>
                Conteúdos educativos para entender melhor probabilidades, cálculos, odds, ferramentas e boas práticas de apostas responsáveis.
              </p>
              <p className="mt-5 text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
                O Blog CalculaBet reúne guias para iniciantes e materiais práticos sobre leitura de odds, probabilidade implícita, controle de banca, múltiplas, arbitragem, cashout e uso consciente de calculadoras. A proposta é ajudar você a compreender cenários antes de tomar decisões, sempre lembrando que apostas envolvem risco financeiro e não têm resultado garantido.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/ferramentas" className="btn-primary">Ver ferramentas <BlogIcon name="arrow" className="w-4 h-4" /></Link>
                <button type="button" onClick={() => setSelectedCategory('guias-iniciantes')} className="btn-ghost">Ler guias para iniciantes</button>
              </div>
            </div>

            <aside className="rounded-[2rem] p-5 sm:p-6" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.10)' }} aria-label="Aviso institucional">
              <div className="grid grid-cols-2 gap-3 mb-5">
                {['+20 pautas', '100% educativo', 'Sem cadastro', '+18'].map(item => (
                  <div key={item} className="rounded-2xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className="font-bold" style={{ color: 'var(--text-1)' }}>{item}</p>
                  </div>
                ))}
              </div>
              <h2 className="text-xl font-bold">Ferramentas ajudam a calcular, não a prever.</h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                O CalculaBet não é casa de apostas, não aceita apostas e não processa pagamentos. Use os conteúdos e calculadoras para aprender conceitos, comparar cenários e reconhecer riscos — nunca como promessa de lucro.
              </p>
              <Link to="/jogo-responsavel" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: '#67e8f9' }}>
                Ver orientações de jogo responsável <BlogIcon name="arrow" className="w-4 h-4" />
              </Link>
            </aside>
          </section>

          <CategoryFilter categories={BLOG_CATEGORIES} selectedCategory={selectedCategory} onSelect={setSelectedCategory} articleCounts={articleCounts} />

          <BlogSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
            selectedCategory={selectedCategory}
            selectedCategoryName={selectedCategoryName}
          />

          <section id="artigos" className="mt-10" aria-labelledby="blog-artigos">
            <div className="flex items-end justify-between gap-4 mb-5">
              <div>
                <p className="text-sm" style={{ color: 'var(--text-3)' }}>{filteredPosts.length} artigo(s) encontrados</p>
                <h2 id="blog-artigos" className="section-title mt-1">Guias e artigos educativos</h2>
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPosts.map(post => <BlogCard key={post.slug} post={post} category={getCategoryById(post.category)} />)}
              </div>
            ) : (
              <div className="rounded-3xl p-10 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-4xl mb-3" aria-hidden="true">🔎</p>
                <h3 className="text-xl font-bold">Nenhum artigo encontrado</h3>
                <p className="mt-2" style={{ color: 'var(--text-2)' }}>Tente outra palavra-chave ou limpe os filtros para ver todos os guias.</p>
                <button type="button" className="btn-ghost mt-5" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>Limpar filtros</button>
              </div>
            )}
          </section>

          <section className="mt-20 grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-12" aria-labelledby="conteudo-educativo">
            <div>
              <p className="badge badge-green mb-4">Guia editorial</p>
              <h2 id="conteudo-educativo" className="section-title">Aprenda antes de apostar: números, riscos e limites</h2>
              <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-2)' }}>
                Esta seção resume a filosofia do Blog CalculaBet: educação primeiro, cálculo transparente e responsabilidade em todas as etapas.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {internalLinks.map(link => <Link key={link.href} to={link.href} className="badge hover:border-cyan-400/40">{link.label}</Link>)}
              </div>
            </div>

            <div className="space-y-6 text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
              <article className="card-glass p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Por que aprender sobre odds antes de apostar</h3>
                <p>Odds não são apenas números em uma tela. Elas indicam retorno potencial, refletem uma estimativa de probabilidade e incluem margens que podem variar entre mercados. Antes de apostar, entender a relação entre cotação e probabilidade implícita ajuda a evitar interpretações simplistas, como achar que uma odd alta é automaticamente uma boa oportunidade.</p>
              </article>
              <article className="card-glass p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Como calculadoras ajudam a entender cenários</h3>
                <p>Calculadoras de odds, ROI, arbitragem, dutching, cashout e gestão de banca tornam os cálculos visíveis. Elas permitem simular retorno, lucro líquido, exposição e tamanho de stake, mas não substituem análise, disciplina nem limites pessoais. A função da ferramenta é explicar o cenário matemático, não recomendar apostas.</p>
              </article>
              <article className="card-glass p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Por que gestão de banca é essencial</h3>
                <p>Sem gestão de banca, uma sequência ruim pode comprometer rapidamente o orçamento. Definir valor máximo, percentual por aposta e critérios de parada reduz decisões por impulso. Mesmo assim, gestão de banca não elimina o risco: ela apenas organiza a exposição e ajuda a manter uma relação mais consciente com o dinheiro.</p>
              </article>
              <article className="card-glass p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Conteúdo educativo não é promessa de lucro</h3>
                <p>O Blog CalculaBet não trata apostas como renda garantida, investimento seguro ou método de enriquecimento. Conteúdo educativo serve para explicar conceitos, alertar sobre riscos e melhorar a leitura de números. Resultados esportivos continuam incertos, e qualquer aposta pode gerar perda financeira.</p>
              </article>
              <article className="card-glass p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Como usar o blog junto com as ferramentas</h3>
                <p>Uma boa rotina é ler o conceito, abrir a ferramenta correspondente e testar valores hipotéticos antes de considerar dinheiro real. Por exemplo: leia sobre probabilidade implícita e teste o Conversor de Odds; estude cashout e compare com a Calculadora de Cashout; revise limites pessoais antes de usar a Calculadora de Gestão de Banca.</p>
              </article>
              <article className="card-glass p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>A importância do jogo responsável</h3>
                <p>Apostas são uma atividade de risco e devem ser restritas a maiores de 18 anos. Se apostar deixar de ser entretenimento, se houver tentativa de recuperar perdas ou se limites forem ignorados, é hora de parar e buscar apoio. A página de Jogo Responsável reúne orientações para reconhecer sinais de alerta e usar ferramentas com mais cautela.</p>
              </article>
            </div>
          </section>

          <section className="mt-20 rounded-[2rem] p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.10), rgba(34,211,238,0.04))', border: '1px solid rgba(251,191,36,0.18)' }} aria-labelledby="aviso-responsabilidade">
            <h2 id="aviso-responsabilidade" className="text-2xl font-bold">Aviso de responsabilidade</h2>
            <p className="mt-3 leading-relaxed" style={{ color: 'var(--text-2)' }}>
              O conteúdo do Blog CalculaBet é apenas educativo. Apostas envolvem riscos financeiros, são destinadas somente a maiores de 18 anos e não oferecem garantia de ganhos. Use as ferramentas para entender cálculos e cenários, não como promessa de resultado. Se precisar, consulte nossas orientações em <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>Jogo Responsável</Link>.
            </p>
          </section>

          <section className="mt-20" aria-labelledby="blog-faq">
            <p className="badge badge-cyan mb-4">FAQ</p>
            <h2 id="blog-faq" className="section-title">Perguntas frequentes sobre o Blog CalculaBet</h2>
            <div className="mt-6 grid lg:grid-cols-2 gap-4">
              {BLOG_FAQS.map(faq => (
                <details key={faq.question} className="group rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <summary className="cursor-pointer list-none font-semibold flex items-start justify-between gap-4" style={{ color: 'var(--text-1)' }}>
                    {faq.question}
                    <span className="text-cyan-300 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
