import {createI18n} from "vue-i18n/dist/vue-i18n.esm-bundler";
import ua from './ua/ua.json';

const i18n = createI18n({
    locale: 'ua',
    fallbackLocale: 'ua',
    messages: {
        ua,
    }
});
const loadedLanguages = ['ua'];

document.querySelector('html').setAttribute('lang', i18n.global.locale);

function setI18nLanguage(lang) {
    i18n.global.locale = lang;
    document.querySelector('html').setAttribute('lang', lang);
    return lang;
}

export async function loadLanguageAsync(lang) {
    if (i18n.global.locale !== lang) {
        if (!loadedLanguages.includes(lang)) {
            const messages = await import(`./${lang}/${lang}.json`);
            i18n.global.setLocaleMessage(lang, messages);
            loadedLanguages.push(lang);
            return setI18nLanguage(lang);
        }
        return Promise.resolve(setI18nLanguage(lang));
    }
    return Promise.resolve(lang);
}

export default i18n;