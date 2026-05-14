import { AFFILIATE_REL, getPreferredBanner, parceiroDestaque } from '../../data/casas';

const PLACEMENT_LABELS = {
  sidebar: 'banner lateral de parceiro',
  home: 'banner de parceiro na página inicial',
  casas: 'banner de parceiro em casas de apostas',
  content: 'banner contextual de parceiro',
};

const SIZE_PREFERENCES = {
  sidebar: ['300x600', '160x600', '300x250', '500x500'],
  home: ['728x90', '668x130', '800x360', '770x436', '300x250'],
  casas: ['770x436', '800x360', '728x90', '300x250', '500x500'],
  content: ['728x90', '668x130', '800x360', '770x436', '320x50', '300x250'],
  mobile: ['320x50', '728x90', '668x130'],
};

export default function AffiliateBanner({
  partner = parceiroDestaque,
  size,
  placement = 'home',
  className = '',
  preferredSizes,
}) {
  const banner = getPreferredBanner(
    partner,
    size ? [size] : preferredSizes || SIZE_PREFERENCES[placement] || SIZE_PREFERENCES.content,
  );

  if (!banner) return null;

  return (
    <div
      className={`affiliate-banner flex justify-center ${className}`.trim()}
      data-placement={placement}
      data-size={banner.size}
      data-partner={partner.id}
    >
      <a
        href={banner.href}
        target="_blank"
        rel={AFFILIATE_REL}
        className="block max-w-full overflow-hidden rounded-xl transition-all duration-200 hover:opacity-95 focus-visible:ring-2 focus-visible:ring-cyan-400/50"
        style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
        aria-label={`Abrir conta na ${partner.name} (${PLACEMENT_LABELS[placement] ?? 'link de afiliado'})`}
      >
        <img
          src={banner.img}
          alt={`${partner.name} — ${partner.category}`}
          width={banner.width}
          height={banner.height}
          loading="lazy"
          className="block h-auto max-w-full object-contain"
        />
      </a>
    </div>
  );
}
