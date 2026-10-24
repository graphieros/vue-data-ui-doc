import { markRaw } from "vue";
import { loadAttributeTranslations } from "../i18n/attribute-translations.js";
import {
    loadMainTranslations,
    defaultTranslations,
    applyMainTranslations,
} from "../i18n/main-translations.js";
import { defineStore } from "pinia";
import { createUid } from "../components/maker/lib";

export const useMainStore = defineStore("main", {
    state: () => {
        return {
            locales: [
                "ar",
                "be-cyrl",
                "be-latn",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "es",
                "et",
                "fa",
                "fi",
                "fr",
                "he",
                "hi",
                "hr",
                "hu",
                "hy",
                "id",
                "it",
                "ja",
                "ka",
                "ko",
                "lt",
                "lv",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt-br",
                "pt",
                "rs",
                "ru",
                "se",
                "sk",
                "sl",
                "sq",
                "th",
                "tr",
                "ua",
                "vi",
                "zh-cn",
                "zh-tw",
            ],
            isSafari: false,
            docSnap: false,
            pack: {},
            stars: 0,
            stars_cli: 0,
            stars_nuxt: 0,
            stars_docs: 0,
            issues: 0,
            isMenuOpen: false,
            isDarkMode: true,
            isCopy: false,
            isMessage: false,
            messages: [],
            isFetching: false,
            customColors: [],
            npmDownloads: [],
            npmDownloadsHome: [],
            contributors: [],
            starHistory: [],
            downloads: {
                lib: [],
                cli: [],
                color_bridge: [],
            },
            repos: {
                docs: {},
                library: {},
                cli: {},
                hiCode: {},
            },
            ratings: {
                show: true, // switch on | off all raters
                average: 0,
                breakdown: [],
            },
            thresholds: [
                { min: 1000, max: 1100 },
                { min: 1100, max: 1200 },
                { min: 1200, max: 1300 },
                { min: 1300, max: 1400 },
                { min: 1400, max: 1500 },
                { min: 1500, max: 1600 },
                { min: 1600, max: 1700 },
                { min: 1700, max: 1800 },
                { min: 1800, max: 1900 },
                { min: 1900, max: 2000 },
                { min: 2000, max: 2500 },
                { min: 2500, max: 3000 },
                { min: 3000, max: 4000 },
                { min: 4000, max: 5000 },
                { min: 5000, max: 7500 },
                { min: 7500, max: 10000 },
            ],
            hints: {
                pin: {
                    en: "Pin the chart so you can visualize configuration changes when you scroll.",
                    fr: "Épinglez le graphique pour visualiser les modifications de configuration lors du défilement.",
                    pt: "Fixe o gráfico para visualizar as alterações de configuração ao rolar.",
                    de: "Fixieren Sie das Diagramm, um Konfigurationsänderungen beim Scrollen zu sehen.",
                    zh: "固定图表，以便在滚动时查看配置更改。",
                    ja: "グラフを固定して、スクロール時に設定変更を視覚化できます。",
                    es: "Fija el gráfico para visualizar los cambios de configuración al desplazarte.",
                    ko: "스크롤 시 구성 변경 사항을 시각화할 수 있도록 차트를 고정하세요.",
                    ar: "ثبّت المخطط لتتمكن من تصور تغييرات التكوين عند التمرير.",
                },
            },
            lang: "en",
            languageRequest: 0,
            translations: markRaw(structuredClone(defaultTranslations)),
        };
    },
    actions: {
        async setLanguage(language) {
            if (
                ![
                    "en",
                    "fr",
                    "pt",
                    "de",
                    "zh",
                    "ja",
                    "es",
                    "ko",
                    "ar",
                ].includes(language)
            )
                language = "en";
            const request = (this.languageRequest ?? 0) + 1;
            this.languageRequest = request;
            const [translations] = await Promise.all([
                loadMainTranslations(language),
                loadAttributeTranslations(language),
            ]);
            if (this.languageRequest !== request) return;
            applyMainTranslations(this.translations, translations);
            this.lang = language;
        },
        copy({ message, type } = { message: "", type: "success" }) {
            if (message) {
                this.isMessage = true;
                this.messages.push({
                    id: createUid(),
                    content: message,
                    visible: true,
                    type,
                });
            } else {
                this.isCopy = true;
                setTimeout(() => {
                    this.isCopy = false;
                }, 1000);
            }
        },
        deleteMessage(id) {
            this.messages = this.messages.filter((m) => m.id !== id);
        },
    },
});
