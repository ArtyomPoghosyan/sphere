import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en.json';
import translationRU from './locales/ru.json';

const resources = {
    'ru': {
        translation: translationRU,
    },
    'en': {
        translation: translationEN
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        compatibilityJSON: 'v3',
        lng: 'en',
        fallbackLng: 'en',
    });
export default i18n;