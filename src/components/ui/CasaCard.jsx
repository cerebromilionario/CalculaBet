import AffiliateBanner from './AffiliateBanner';
import { AFFILIATE_REL, isAffiliateEnabled } from '../../data/casas';

const disabledButtonStyle = {
  background: 'linear-gradient(135deg, rgba(148,163,184,0.16), rgba(71,85,105,0.16))',
  color: 'rgba(226,232,240,0.72)',
  border: '1px solid rgba(148,163,184,0.22)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
  cursor: 'not-allowed',
};

export default function CasaCard({ casa, variant = 'default' }) {
  const isFeatured = variant === 'featured';
  const canOpenAccount = isAffiliateEnabled(casa);

  return (
    <article
      className={`card relative overflow-hidden p-5 md:p-6 flex flex-col gap-5 transition-all duration-200 ${isFeatured ? 'md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-8' : ''}`.trim()}
      style={{ '--casa-cor': casa.cor }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${casa.cor}28`;
        e.currentTarget.style.boxShadow = `0 14px 46px ${casa.cor}0d`;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${casa.cor}12, transparent 36%)` }}
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-5">
        <header className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold flex-shrink-0 select-none"
              style={{ background: `${casa.cor}18`, color: casa.cor, border: `1px solid ${casa.cor}28` }}
              aria-hidden="true"
            >
              {casa.initials || casa.nome.slice(0, 2)}
            </div>
            <div>
              <p className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>{casa.nome}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>{casa.category}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>Publicidade • Link de afiliado • +18</p>
            </div>
          </div>
          {casa.destaque && (
            <span
              className="text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0"
              style={{ background: `${casa.cor}12`, color: casa.cor, border: `1px solid ${casa.cor}22` }}
            >
              {casa.destaque}
            </span>
          )}
        </header>

        <div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{casa.description}</p>
          <p className="text-xs mt-3 leading-relaxed" style={{ color: 'var(--text-3)' }}>
            {casa.licencaInfo}
          </p>
        </div>

        <div
          className="rounded-xl px-4 py-3"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}
        >
          <p className="text-xs mb-1" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Oferta do parceiro
          </p>
          <p className="text-sm font-semibold" style={{ color: '#4ade80' }}>{casa.bonus}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>Leia os termos antes de se cadastrar.</p>
        </div>

        {canOpenAccount ? (
          <a
            href={casa.affiliateUrl}
            target="_blank"
            rel={AFFILIATE_REL}
            className="btn-green w-full md:w-fit text-sm"
            aria-label={`Abrir conta na ${casa.nome} (link patrocinado)`}
          >
            {casa.cta}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex w-full md:w-fit items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-none"
            style={disabledButtonStyle}
          >
            Link em atualização
          </button>
        )}

        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)', fontSize: '0.7rem' }}>
          {casa.transparency}
        </p>
      </div>

      {isFeatured && (
        <div className="relative flex justify-center md:justify-end">
          <AffiliateBanner partner={casa} placement="home" preferredSizes={['large', '300x250', '728x90', '668x130', '770x436', '800x360', '500x500', '320x50']} />
        </div>
      )}
    </article>
  );
}
