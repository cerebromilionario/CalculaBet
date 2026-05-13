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
    ],
  };
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
      <SEOHead title={post.title} description={post.excerpt} canonical={`/blog/${post.slug}`} schema={buildArticleSchema(post, category)} />

      <main className="relative overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full blur-3xl opacity-20" style={{ background: `radial-gradient(circle, ${category?.color || '#22d3ee'}66, transparent 64%)` }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />

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
        </div>
      </main>
    </>
  );
}
