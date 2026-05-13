import { Link } from 'react-router-dom';
import BlogIcon from './BlogIcon';

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));
}

export default function BlogCard({ post, category }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.045), rgba(255,255,255,0.018))', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${category?.color || '#22d3ee'}, transparent)` }} aria-hidden="true" />
      <div className="flex items-center justify-between gap-3 mb-5">
        <span className="badge" style={{ color: category?.color || '#22d3ee', borderColor: `${category?.color || '#22d3ee'}35`, background: `${category?.color || '#22d3ee'}10` }}>
          {category?.name || post.category}
        </span>
        <span className="text-xs" style={{ color: 'var(--text-3)' }}>{post.readingTime}</span>
      </div>

      <h3 className="text-xl font-bold leading-tight tracking-tight" style={{ color: 'var(--text-1)' }}>
        <Link to={`/blog/${post.slug}`} className="focus-visible:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{post.excerpt}</p>

      <div className="flex flex-wrap gap-2 mt-5" aria-label="Tags do artigo">
        {post.tags.slice(0, 3).map(tag => <span key={tag} className="badge">#{tag}</span>)}
      </div>

      <div className="mt-6 pt-5 flex items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="text-xs" style={{ color: 'var(--text-3)' }}>{formatDate(post.date)}</span>
        <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: '#22d3ee' }}>
          Ler artigo <BlogIcon name="arrow" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
