import { AFFILIATE_REL, parceiroDestaque } from '../../data/casas';

const PLACEMENT_LABELS = {
  sidebar: 'banner lateral do parceiro 1XBIT',
  home: 'banner do parceiro 1XBIT na página inicial',
  casas: 'banner do parceiro 1XBIT em casas de apostas',
};

export default function AffiliateBanner({ size = '300x250', placement = 'home', className = '' }) {
  const banner = parceiroDestaque.banners[size];

  if (!banner) return null;

  return (
    <div
      className={`affiliate-banner flex justify-center ${className}`.trim()}
      data-placement={placement}
      data-size={size}
    >
      <a
        href={banner.href}
        target="_blank"
        rel={AFFILIATE_REL}
        className="block max-w-full overflow-hidden rounded-xl transition-all duration-200 hover:opacity-95 focus-visible:ring-2 focus-visible:ring-cyan-400/50"
        style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
        aria-label={`Abrir conta na 1XBIT (${PLACEMENT_LABELS[placement] ?? 'link de afiliado'})`}
      >
        <img
          src={banner.img}
          alt="1XBIT"
          width={banner.width}
          height={banner.height}
          loading="lazy"
          className="block h-auto max-w-full"
        />
      </a>
    </div>
  );
}
