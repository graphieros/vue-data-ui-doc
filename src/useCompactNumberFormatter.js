import { computed } from "vue";
import { useMainStore } from "./stores";

export function useCompactNumberFormatter({
    maximumFractionDigits = 1,
    minimumFractionDigits = 0
} = {}) {
    const store = useMainStore();

    // yolo, but the whole custom i18n thing is anyway
    const locale = computed(() => {
        return {
            en: 'en-US',
            fr: 'fr-FR',
            pt: 'pt-PT',
            de: 'de-DE',
            zh: 'zh-CN',
            ja: 'ja-JP',
            es: 'es-ES',
            ko: 'ko-KR',
            ar: 'ar-SA'

        }[store.lang]
    })

    const numberFormatter = computed(() => {
        return new Intl.NumberFormat(locale.value, {
            notation: "compact",
            compactDisplay: "short",
            maximumFractionDigits,
            minimumFractionDigits
        });
    });

    function formatCompactNumber(value) {
        if (value === null || value === undefined || isNaN(value)) {
            return "";
        }

        return numberFormatter.value.format(value);
    }

    return {
        formatCompactNumber
    };
}