import { AFFILIATE_DISCLOSURE_SHORT, AFFILIATE_REL, activePartners } from '../../data/casas';

const ARTICLE_PARTNER_IDS = new Set(['1xbit', 'blaze', 'superbet', 'melbet', 'stake', 'betobet']);

const PLACEMENT_OFFSETS = {
  'mid-article': 0,
  'pre-faq': 1,
};

const ARTICLE_BANNER_SIZES = [
  '1400x400',
  '728x90',
  '668x130',
  '800x360',
  '770x436',
  '1200x628',
  '320x50',
  '300x250',
  '500x500',
  '1920x1080',
];

function hashSeed(seed = '') {
  return String(seed).split('').reduce((acc, char) => ((acc * 31) + char.charCodeAt(0)) >>> 0, 7);
}

function getArticleBanner(partner) {
  if (!partner?.banners) return null;

  const size = ARTICLE_BANNER_SIZES.find(candidate => partner.banners[candidate]);
  return size ? { ...partner.banners[size], size } : null;
}

function getBannerPartner(postSlug, placement) {
  const partners = activePartners.filter(partner => ARTICLE_PARTNER_IDS.has(partner.id) && getArticleBanner(partner));
  if (!partners.length) return null;

  const start = hashSeed(`blog-banner-${postSlug}`) % partners.length;
  const offset = PLACEMENT_OFFSETS[placement] ?? 0;

  return partners[(start + offset) % partners.length];
}

export default function ArticleAffiliateBanner({ postSlug, placement = 'mid-article', className = '' }) {
  const partner = getBannerPartner(postSlug, placement);
  const banner = getArticleBanner(partner);

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
          className="mx-auto block h-auto max-h-[260px] w-auto max-w-full object-contain sm:max-h-[320px]"
        />
      </a>
    </aside>
  );
}
