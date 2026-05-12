import { useEffect, useState } from 'react';
import {
  DEFAULT_COOKIE_PREFERENCES,
  getStoredCookieConsent,
  onCookieConsentChange,
} from '../utils/cookieConsent';

export default function useCookieConsent() {
  const [consent, setConsent] = useState(() => getStoredCookieConsent());

  useEffect(() => onCookieConsentChange(setConsent), []);

  return {
    consent,
    preferences: consent?.preferences || DEFAULT_COOKIE_PREFERENCES,
    hasChoice: Boolean(consent),
  };
}
