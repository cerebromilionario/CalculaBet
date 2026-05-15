import { Link } from 'react-router-dom';
import AffiliateBanner from './AffiliateBanner';
import CasaCard from './CasaCard';
import { AFFILIATE_DISCLOSURE_FULL, AFFILIATE_DISCLOSURE_SHORT, AFFILIATE_REL, getPartnersForPlacement, isAffiliateEnabled } from '../../data/casas';

export default function PartnerRotation({ seed, title = 'Parceiros selecionados', context = 'content', compact = false }) {
  const partners = getPartnersForPlacement(seed, 2);

  if (!partners.length) return null;

  if (compact) {
    return (
      <section
        className="rounded-2xl p-4 overflow-hidden"
        style={{ background: 'rgba(34,211,238,0.035)', border: '1px solid rgba(34,211,238,0.12)' }}
        aria-label={title}
      >
        <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          {title}
        </p>
        <p className="text-xs mb-3" style={{ color: 'var(--text-3)', fontSize: '0.6rem' }}>{AFFILIATE_DISCLOSURE_SHORT}</p>

        <div className="space-y-3">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className="rounded-xl p-3"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}
            >
              {index === 0 && (
                <div className="hidden lg:block mb-3">
                  <AffiliateBanner partner={partner} placement="sidebar" />
                </div>
              )}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: `${partner.cor}18`, color: partner.cor, border: `1px solid ${partner.cor}28` }}
                  aria-hidden="true"
                >
                  {partner.initials || partner.nome.slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-1)' }}>{partner.nome}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-3)' }}>{partner.category}</p>
                </div>
              </div>
              {isAffiliateEnabled(partner) ? (
                <a
                  href={partner.affiliateUrl}
                  target="_blank"
                  rel={AFFILIATE_REL}
                  className="btn-green w-full text-xs py-2"
                  aria-label={`Abrir conta na ${partner.nome} (link patrocinado)`}
                >
                  Abrir conta →
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="inline-flex w-full items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, rgba(148,163,184,0.16), rgba(71,85,105,0.16))',
                    color: 'rgba(226,232,240,0.72)',
                    border: '1px solid rgba(148,163,184,0.22)',
                    cursor: 'not-allowed',
                  }}
                >
                  Link em atualização
                </button>
              )}
            </div>
          ))}
        </div>
        <p className="text-center mt-3 leading-relaxed" style={{ color: 'var(--text-3)', fontSize: '0.6rem' }}>
          Verifique termos, bônus, regras e disponibilidade. Aposte com responsabilidade.
        </p>
      </section>
    );
  }

  return (
    <section
      className="rounded-2xl p-5 md:p-6"
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}
      aria-label={title}
      data-partner-context={context}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
        <div>
          <p className="text-xs font-semibold mb-2" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {AFFILIATE_DISCLOSURE_SHORT}
          </p>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>{title}</h2>
        </div>
        <Link to="/casas-apostas" className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>
          Ver transparência →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {partners.map(partner => (
          <CasaCard key={partner.id} casa={partner} />
        ))}
      </div>

      <p className="text-xs leading-relaxed mt-5" style={{ color: 'var(--text-3)' }}>
        {AFFILIATE_DISCLOSURE_FULL}
      </p>
    </section>
  );
}
