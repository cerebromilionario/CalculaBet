import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DEFAULT_COOKIE_PREFERENCES,
  getStoredCookieConsent,
  saveCookieConsent,
} from '../../utils/cookieConsent';

const COOKIE_CATEGORIES = [
  {
    id: 'necessary',
    title: 'Necessários',
    description: 'Mantêm a plataforma segura, estável e com recursos essenciais funcionando corretamente.',
    required: true,
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Ajudam a entender tráfego, desempenho e uso das ferramentas para melhorar a experiência.',
    required: false,
  },
  {
    id: 'marketing',
    title: 'Marketing/Publicidade',
    description: 'Permitem anúncios, mensuração de campanhas, links afiliados e conteúdo mais relevante.',
    required: false,
  },
];

export default function CookieConsentBanner() {
  const [storedConsent] = useState(() => getStoredCookieConsent());
  const [isVisible, setIsVisible] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState(() => storedConsent?.preferences || DEFAULT_COOKIE_PREFERENCES);
  const modalTitleId = useId();
  const modalDescriptionId = useId();
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (storedConsent) return undefined;

    const timer = window.setTimeout(() => setIsVisible(true), 600);
    return () => window.clearTimeout(timer);
  }, [storedConsent]);

  useEffect(() => {
    if (!isPreferencesOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = event => {
      if (event.key === 'Escape') setIsPreferencesOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isPreferencesOpen]);

  const commitConsent = (status, nextPreferences) => {
    const consent = saveCookieConsent(status, nextPreferences);
    setPreferences(consent.preferences);
    setIsPreferencesOpen(false);
    setIsVisible(false);
  };

  const acceptAll = () => commitConsent('accepted', {
    necessary: true,
    analytics: true,
    marketing: true,
  });

  const rejectOptional = () => commitConsent('rejected', DEFAULT_COOKIE_PREFERENCES);

  const savePreferences = () => commitConsent('custom', preferences);

  const updatePreference = category => {
    setPreferences(current => ({
      ...current,
      [category]: !current[category],
      necessary: true,
    }));
  };

  if (!isVisible) return null;

  return (
    <>
      <section
        className="cookie-consent-shell"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
      >
        <div className="cookie-consent-card" role="region">
          <div className="cookie-consent-icon" aria-hidden="true">✓</div>

          <div className="cookie-consent-copy">
            <p className="cookie-consent-eyebrow">Privacidade e transparência</p>
            <h2 id="cookie-consent-title">Controle de cookies</h2>
            <p id="cookie-consent-description">
              Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência, analisar tráfego e oferecer conteúdo relevante. Ao continuar navegando, você pode gerenciar suas escolhas conforme nossa{' '}
              <Link to="/politica-de-privacidade">Política de Privacidade</Link>.
            </p>
          </div>

          <div className="cookie-consent-actions" aria-label="Ações de consentimento de cookies">
            <button type="button" className="cookie-btn cookie-btn-primary" onClick={acceptAll}>
              Aceitar
            </button>
            <button type="button" className="cookie-btn cookie-btn-secondary" onClick={rejectOptional}>
              Recusar
            </button>
            <button
              type="button"
              className="cookie-btn cookie-btn-ghost"
              onClick={() => setIsPreferencesOpen(true)}
              aria-haspopup="dialog"
            >
              Preferências
            </button>
          </div>
        </div>
      </section>

      {isPreferencesOpen && (
        <div className="cookie-modal-backdrop" role="presentation" onMouseDown={() => setIsPreferencesOpen(false)}>
          <section
            className="cookie-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            aria-describedby={modalDescriptionId}
            onMouseDown={event => event.stopPropagation()}
          >
            <div className="cookie-modal-header">
              <div>
                <p className="cookie-consent-eyebrow">Preferências</p>
                <h2 id={modalTitleId}>Gerencie seus cookies</h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="cookie-modal-close"
                onClick={() => setIsPreferencesOpen(false)}
                aria-label="Fechar preferências de cookies"
              >
                ×
              </button>
            </div>

            <p id={modalDescriptionId} className="cookie-modal-description">
              Você decide quais tecnologias opcionais podem ser usadas. Cookies necessários permanecem ativos para segurança, navegação e funcionamento básico da plataforma.
            </p>

            <div className="cookie-category-list">
              {COOKIE_CATEGORIES.map(category => (
                <div className="cookie-category" key={category.id}>
                  <div>
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                  </div>

                  <label className="cookie-switch">
                    <input
                      type="checkbox"
                      checked={preferences[category.id]}
                      disabled={category.required}
                      onChange={() => updatePreference(category.id)}
                      aria-label={`${category.title}: ${category.required ? 'sempre ativo' : 'alternar consentimento'}`}
                    />
                    <span aria-hidden="true" />
                    <strong>{category.required ? 'Sempre ativo' : preferences[category.id] ? 'Ativo' : 'Inativo'}</strong>
                  </label>
                </div>
              ))}
            </div>

            <div className="cookie-modal-actions">
              <button type="button" className="cookie-btn cookie-btn-ghost" onClick={rejectOptional}>
                Recusar opcionais
              </button>
              <button type="button" className="cookie-btn cookie-btn-secondary" onClick={savePreferences}>
                Salvar preferências
              </button>
              <button type="button" className="cookie-btn cookie-btn-primary" onClick={acceptAll}>
                Aceitar todos
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
