import { useEffect, useRef } from 'react';

const SCRIPT_SRC = 'https://www.highperformanceformat.com/2825284ea7854623f672fb60ed3bf4d9/invoke.js';

export default function AdBanner300x250() {
  const containerRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <div
      ref={containerRef}
      aria-label="Publicidade"
      style={{ width: 300, height: 250 }}
    />
  );
}
