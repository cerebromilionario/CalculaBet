export const COOKIE_CONSENT_STORAGE_KEY = 'calculabet_cookie_consent_v1';
export const COOKIE_CONSENT_EVENT = 'calculabet:cookie-consent-change';

export const DEFAULT_COOKIE_PREFERENCES = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function normalizeCookieConsent(value) {
  if (!value || typeof value !== 'object') return null;

  const preferences = {
    ...DEFAULT_COOKIE_PREFERENCES,
    ...(value.preferences || {}),
    necessary: true,
  };

  return {
    status: value.status === 'accepted' || value.status === 'rejected' || value.status === 'custom'
      ? value.status
      : 'custom',
    preferences,
    updatedAt: value.updatedAt || new Date().toISOString(),
    version: 1,
  };
}

export function getStoredCookieConsent() {
  if (typeof window === 'undefined') return null;

  const rawConsent = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  if (!rawConsent) return null;

  try {
    return normalizeCookieConsent(JSON.parse(rawConsent));
  } catch {
    window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
    return null;
  }
}

export function saveCookieConsent(status, preferences = DEFAULT_COOKIE_PREFERENCES) {
  if (typeof window === 'undefined') return null;

  const consent = normalizeCookieConsent({
    status,
    preferences,
    updatedAt: new Date().toISOString(),
  });

  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: consent }));

  return consent;
}

export function hasCookieConsent(category) {
  const consent = getStoredCookieConsent();
  return Boolean(consent?.preferences?.[category]);
}

export function onCookieConsentChange(callback) {
  if (typeof window === 'undefined') return () => {};

  const handler = event => callback(event.detail || getStoredCookieConsent());
  window.addEventListener(COOKIE_CONSENT_EVENT, handler);
  return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handler);
}
