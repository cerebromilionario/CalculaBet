import { useEffect, useRef } from 'react';
import useCookieConsent from '../../hooks/useCookieConsent';

const SCRIPT_SRC = 'https://www.highperformanceformat.com/2825284ea7854623f672fb60ed3bf4d9/invoke.js';

export default function AdBanner300x250() {
  const { preferences } = useCookieConsent();
  const containerRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    if (!preferences.marketing) return undefined;

    // Set global options before loading the invoke script
    window.atOptions = {
      key: '2825284ea7854623f672fb60ed3bf4d9',
      format: 'iframe',
      height: 250,
      width: 300,
      params: {},
    };

    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    scriptRef.current = script;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
      delete window.atOptions;
    };
  }, [preferences.marketing]);

  if (!preferences.marketing) {
    return (
      <div className="ad-placeholder h-56 w-[300px]" role="complementary" aria-label="Espaço publicitário aguardando consentimento">
        <div className="text-center space-y-1 px-4">
          <p style={{ color: 'var(--text-3)', fontSize: '0.6875rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Publicidade
          </p>
          <p style={{ color: 'rgba(255,255,255,0.16)', fontSize: '0.75rem' }}>
            Ative cookies de marketing para anúncios personalizados.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-label="Publicidade"
      style={{ width: 300, height: 250 }}
    />
  );
}
