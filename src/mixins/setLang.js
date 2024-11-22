import i18n, {loadLanguageAsync} from "../locales/i18n";

const setLang = {
    data() {
      return {
          selectedLanguage: localStorage.getItem('lang') || 'ua',
      }
    },
    methods: {
        async switchLanguage(lang) {
            if(lang) {
                this.selectedLanguage = lang;
                localStorage.setItem('lang', lang);
            }
            await loadLanguageAsync(this.selectedLanguage);
        },
    },
    async created() {
        await this.switchLanguage();
    },
};

export async function resetLang() {
    document.querySelector('html').setAttribute('lang', i18n.global.fallbackLocale);
}

export default setLang;