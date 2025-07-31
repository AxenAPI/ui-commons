import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from 'virtual:i18next-loader';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    defaultNS: 'any',
    fallbackLng: 'ru',
    lng: 'ru',
    interpolation: { escapeValue: false },
    resources,
    supportedLngs: ['en', 'ru'],
  });

export default i18n;
