import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '@i18n/language/en.json';
import ko from '@i18n/language/ko.json';

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'en';

  const langs =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language];

  const primary = (langs[0] || '').toLowerCase();

  if (primary.startsWith('ko')) {
    return 'ko';
  }

  return 'en';
};

i18n
  // 1) Use browser language detector plugin
  .use(LanguageDetector)
  // 2) React binding
  .use(initReactI18next)
  // 3) Initial configuration
  .init({
    lng: getInitialLanguage(),
    // Supported languages
    supportedLngs: ['en', 'ko'],

    fallbackLng: 'en',

    // Translation resources
    resources: {
      en: {
        translation: en,
      },
      ko: {
        translation: ko,
      },
    },
    // Language detection options (where to read the language from)
    detection: {
      // Detection order: browser settings -> html lang -> localStorage -> cookie, etc.
      order: [
        'navigator',
        'htmlTag',
        'localStorage',
        'cookie',
        'path',
        'subdomain',
      ],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
