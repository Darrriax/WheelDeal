const setTheme = {
    data() {
        return {
            documentRoot: document.documentElement,
            selectedTheme: localStorage.getItem('theme') !== 'dark',
        }
    },
    methods: {
        setTheme(theme) {
            localStorage.setItem('theme', theme);
            theme !== 'dark' ? this.selectedTheme = true : this.selectedTheme = false;
            this.documentRoot.className = theme;
        },
    },
    watch: {
        selectedTheme(theme) {
            (theme) ? this.setTheme('light') : this.setTheme('dark');
        }
    },
    created() {
        if (!localStorage.getItem('theme') || localStorage.getItem('theme') === 'light') {
            this.selectedTheme = true;
            this.documentRoot.classList.remove('dark');
            this.documentRoot.classList.add('light');
        } else {
            this.documentRoot.classList.remove('light');
            this.documentRoot.classList.add('dark');
        }
    }
};

export async function resetTheme() {
    document.documentElement.removeAttribute("class");
}

export default setTheme;