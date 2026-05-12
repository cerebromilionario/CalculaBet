import { useEffect, useRef } from 'react';
import useCookieConsent from '../../hooks/useCookieConsent';

const SCRIPT_SRC = 'https://pl29422242.profitablecpmratenetwork.com/711e9213a5dc9ee119f4cf4adf1727de/invoke.js';
const CONTAINER_ID = 'container-711e9213a5dc9ee119f4cf4adf1727de';

export default function AdNativeBanner() {
  const { preferences } = useCookieConsent();
  const mounted = useRef(false);

  useEffect(() => {
    if (!preferences.marketing) return undefined;
    if (mounted.current) return undefined;
    mounted.current = true;

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = SCRIPT_SRC;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
      mounted.current = false;
    };
  }, [preferences.marketing]);

  if (!preferences.marketing) return null;

  return (
    <div
      id={CONTAINER_ID}
      aria-label="Publicidade"
      style={{ minHeight: 1 }}
    />
  );
}
