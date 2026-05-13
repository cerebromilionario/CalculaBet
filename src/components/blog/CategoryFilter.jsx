import BlogIcon from './BlogIcon';

export default function CategoryFilter({ categories, selectedCategory, onSelect, articleCounts }) {
  return (
    <section className="mt-12" aria-labelledby="blog-categorias">
      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
          <p className="badge badge-cyan mb-3">Trilhas editoriais</p>
          <h2 id="blog-categorias" className="section-title">Categorias do Blog</h2>
        </div>
        <button
          type="button"
          onClick={() => onSelect('all')}
          className="hidden sm:inline-flex text-sm font-semibold transition-colors"
          style={{ color: selectedCategory === 'all' ? '#22d3ee' : 'var(--text-2)' }}
        >
          Ver todos
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map(category => {
          const active = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              className="group text-left rounded-2xl p-5 transition-all duration-200"
              style={{
                background: active
                  ? `linear-gradient(145deg, ${category.color}18, rgba(255,255,255,0.035))`
                  : 'rgba(255,255,255,0.025)',
                border: `1px solid ${active ? `${category.color}55` : 'rgba(255,255,255,0.07)'}`,
                boxShadow: active ? `0 18px 50px ${category.color}14` : 'none',
              }}
              aria-pressed={active}
            >
              <span className="flex items-start justify-between gap-4">
                <span className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform group-hover:-translate-y-0.5" style={{ background: `${category.color}16`, color: category.color }}>
                  <BlogIcon name={category.icon} />
                </span>
                <span className="badge" style={{ borderColor: `${category.color}30`, color: category.color }}>
                  {articleCounts[category.id] || 0} artigos
                </span>
              </span>
              <span className="block mt-4 font-semibold" style={{ color: 'var(--text-1)' }}>{category.name}</span>
              <span className="block mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{category.description}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
