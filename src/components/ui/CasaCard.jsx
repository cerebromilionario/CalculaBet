export default function CasaCard({ casa }) {
  return (
    <article
      className="card p-5 flex flex-col gap-4 transition-all duration-200"
      style={{ '--casa-cor': casa.cor }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${casa.cor}28`;
        e.currentTarget.style.boxShadow = `0 8px 32px ${casa.cor}0a`;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Header */}
      <header className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 select-none"
            style={{ background: `${casa.cor}18`, color: casa.cor, border: `1px solid ${casa.cor}28` }}
            aria-hidden="true"
          >
            {casa.nome.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>{casa.nome}</p>
            <div className="flex items-center gap-0.5 mt-0.5" aria-label={`Avaliação: ${casa.avaliacao} de 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-3 h-3" viewBox="0 0 24 24" aria-hidden="true"
                  fill={i < Math.floor(casa.avaliacao) ? '#fbbf24' : 'rgba(255,255,255,0.08)'}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="text-xs ml-1" style={{ color: 'var(--text-3)' }}>{casa.avaliacao}</span>
            </div>
          </div>
        </div>
        {casa.destaque && (
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: `${casa.cor}12`, color: casa.cor, border: `1px solid ${casa.cor}22` }}
          >
            {casa.destaque}
          </span>
        )}
      </header>

      {/* Bonus */}
      <div
        className="rounded-xl px-4 py-3"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
      >
        <p className="text-xs mb-0.5" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Bônus
        </p>
        <p className="text-sm font-semibold" style={{ color: '#4ade80' }}>{casa.bonus}</p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>
          Depósito mínimo: {casa.minDeposito}
        </p>
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {casa.pix && (
          <span className="badge-cyan badge text-xs">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4.5 12l4-4 4 4-4 4z" /><path d="M11.5 12l4-4 4 4-4 4z" />
            </svg>
            Pix
          </span>
        )}
        <span
          className="badge text-xs"
          style={{ color: 'var(--text-3)', fontSize: '0.625rem' }}
          title={casa.licencaInfo}
        >
          {casa.licencaInfo}
        </span>
      </div>

      {/* CTA */}
      <a
        href={casa.link}
        target="_blank"
        rel="noopener noreferrer nofollow sponsored"
        className="btn-green w-full mt-auto text-sm"
        aria-label={`Abrir conta na ${casa.nome} (link patrocinado)`}
      >
        Abrir conta
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>

      <p className="text-xs text-center" style={{ color: 'var(--text-3)', fontSize: '0.625rem' }}>
        +18 · Publicidade · Verifique termos e disponibilidade
      </p>
    </article>
  );
}
