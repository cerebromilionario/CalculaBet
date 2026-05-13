import BlogIcon from './BlogIcon';

export default function BlogSearch({ searchTerm, onSearchChange, sortBy, onSortChange, selectedCategory, selectedCategoryName }) {
  return (
    <section className="mt-10 rounded-3xl p-4 sm:p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }} aria-label="Busca e filtros do blog">
      <div className="grid lg:grid-cols-[1fr_auto] gap-4 items-center">
        <label className="relative block">
          <span className="sr-only">Buscar artigos</span>
          <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }}>
            <BlogIcon name="search" className="w-5 h-5" />
          </span>
          <input
            type="search"
            value={searchTerm}
            onChange={event => onSearchChange(event.target.value)}
            className="input-field pl-12"
            placeholder="Buscar por título, resumo, categoria ou tag..."
            aria-label="Buscar artigos do blog"
          />
        </label>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <span className="text-xs font-medium" style={{ color: 'var(--text-3)' }}>
            {selectedCategory === 'all' ? 'Todas as categorias' : selectedCategoryName}
          </span>
          <label className="sr-only" htmlFor="blog-sort">Ordenar artigos</label>
          <select id="blog-sort" className="input-field min-w-[210px]" value={sortBy} onChange={event => onSortChange(event.target.value)}>
            <option value="recent">Mais recentes</option>
            <option value="popular">Mais populares</option>
            <option value="readingTime">Leitura rápida</option>
          </select>
        </div>
      </div>
    </section>
  );
}
