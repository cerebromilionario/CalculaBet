/**
 * AdBanner — suporta placeholder visual e slots para redes reais.
 *
 * Uso com rede real (ex: Google AdSense):
 *   <AdBanner size="leaderboard" adSlot="1234567890" adClient="ca-pub-XXXXXXXX" />
 *
 * Uso com placeholder (desenvolvimento):
 *   <AdBanner size="leaderboard" />
 */
import { useEffect, useRef } from 'react';

const SIZES = {
  leaderboard: { cls: 'h-20 w-full', label: '728×90' },
  rectangle:   { cls: 'h-56 w-full', label: '300×250' },
  skyscraper:  { cls: 'h-80 w-full', label: '160×600' },
};

export default function AdBanner({ size = 'leaderboard', adSlot, adClient, className = '' }) {
  const ref = useRef(null);
  const cfg = SIZES[size] || SIZES.leaderboard;

  useEffect(() => {
    if (adSlot && adClient && ref.current && typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // Ignore invalid ad/odds runtime values and keep the UI responsive.
      }
    }
  }, [adSlot, adClient]);

  if (adSlot && adClient) {
    return (
      <div className={`overflow-hidden ${cfg.cls} ${className}`} aria-label="Publicidade">
        <ins
          ref={ref}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div
      className={`ad-placeholder ${cfg.cls} ${className}`}
      role="complementary"
      aria-label="Espaço publicitário"
    >
      <div className="text-center space-y-1">
        <p style={{ color: 'var(--text-3)', fontSize: '0.6875rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Publicidade
        </p>
        <p style={{ color: 'rgba(255,255,255,0.08)', fontSize: '0.6875rem' }}>
          {cfg.label}
        </p>
      </div>
    </div>
  );
}
