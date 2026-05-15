import { AFFILIATE_REL } from '../../data/casas';

const SUPERBET_BANNER = {
  href: 'https://track.afiliapub.com/click?o=11&a=550220524&creative_id=246',
  img: 'https://track.afiliapub.com/impression?creative_id=246&affiliate_id=550220524',
  alt: 'Superbet BR Banner',
  width: 160,
  height: 600,
};

export default function SuperbetVerticalBanner({ className = '' }) {
  return (
    <aside
      className={`hidden lg:flex justify-center ${className}`.trim()}
      aria-label="Publicidade Superbet"
    >
      <div
        className="rounded-2xl p-3"
        style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}
      >
        <p className="sr-only">Publicidade • Link de afiliado • +18</p>
        <a
          href={SUPERBET_BANNER.href}
          target="_blank"
          rel={AFFILIATE_REL}
          aria-label="Abrir oferta Superbet"
          className="block overflow-hidden rounded-xl transition-all duration-200 hover:opacity-95 focus-visible:ring-2 focus-visible:ring-cyan-400/50"
          style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
        >
          <img
            src={SUPERBET_BANNER.img}
            alt={SUPERBET_BANNER.alt}
            width={SUPERBET_BANNER.width}
            height={SUPERBET_BANNER.height}
            loading="lazy"
            className="block h-auto max-w-full object-contain"
          />
        </a>
      </div>
    </aside>
  );
}
