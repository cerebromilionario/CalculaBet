import { AFFILIATE_DISCLOSURE_SHORT, AFFILIATE_REL, getPartnerById, getPreferredBanner } from '../../data/casas';

const PLACEMENT_PARTNER_IDS = {
  top: 'superbet',
  'mid-article': 'superbet',
  bottom: 'blaze',
  'pre-faq': 'blaze',
};

const PLACEMENT_BANNER_SIZES = {
  top: ['728x90'],
  'mid-article': ['728x90'],
  bottom: ['large'],
  'pre-faq': ['large'],
};

function getArticleBannerConfig(placement) {
  const partnerId = PLACEMENT_PARTNER_IDS[placement] || PLACEMENT_PARTNER_IDS['mid-article'];
  const preferredSizes = PLACEMENT_BANNER_SIZES[placement] || PLACEMENT_BANNER_SIZES['mid-article'];
  const partner = getPartnerById(partnerId);
  const banner = getPreferredBanner(partner, preferredSizes);

  return { partner, banner };
}

export default function ArticleAffiliateBanner({ placement = 'mid-article', className = '' }) {
  const { partner, banner } = getArticleBannerConfig(placement);
  const isBottomPlacement = placement === 'bottom' || placement === 'pre-faq';
  const imageClassName = isBottomPlacement
    ? 'mx-auto block h-auto w-full max-w-3xl rounded-xl object-contain'
    : 'mx-auto block h-auto max-h-[260px] w-auto max-w-full object-contain sm:max-h-[320px]';

  if (!partner || !banner) return null;

  return (
    <aside
      className={`my-8 sm:my-10 rounded-2xl overflow-hidden ${className}`.trim()}
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}
      aria-label={`Publicidade de parceiro: ${partner.name}`}
      data-affiliate-banner-placement={placement}
      data-affiliate-partner={partner.id}
      data-affiliate-size={banner.size}
    >
      <div className="px-3 sm:px-4 py-2 flex items-center justify-between gap-3" style={{ color: 'var(--text-3)' }}>
        <span className="text-[0.62rem] sm:text-xs font-semibold uppercase tracking-[0.16em]">{AFFILIATE_DISCLOSURE_SHORT}</span>
      </div>
      <a
        href={banner.href}
        target="_blank"
        rel={AFFILIATE_REL}
        className="block w-full max-w-full overflow-hidden focus-visible:ring-2 focus-visible:ring-cyan-400/60"
        aria-label={`Abrir oferta da ${partner.name} em nova aba (link de afiliado)`}
      >
        <img
          src={banner.img}
          alt={`Banner promocional ${partner.name}`}
          width={banner.width}
          height={banner.height}
          loading="lazy"
          className={imageClassName}
        />
      </a>
    </aside>
  );
}
