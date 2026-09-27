import { computed } from "vue";
import { useMainStore } from "./src/stores";

export function useNumberFormatter(options = {}) {
    const store = useMainStore();
    const locale = computed(() => store.lang);
    return computed(() => new Intl.NumberFormat(locale.value, options));
}

export const useCompactNumberFormatter = () =>
    useNumberFormatter({
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
    });

export const useBytesFormatter = () => {
    const decimalNumberFormatter = useNumberFormatter({
        maximumFractionDigits: 1,
    });

    const KB = 1000;
    const MB = 1000 * 1000;

    return {
        format: (bytes) => {
            if (bytes < KB) {
                return `${decimalNumberFormatter.value.format(bytes)} B`;
            }

            if (bytes < MB) {
                return `${decimalNumberFormatter.value.format(bytes / KB)} kB`;
            }

            return `${decimalNumberFormatter.value.format(bytes / MB)} MB`;
        },
    };
};
