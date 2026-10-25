import { useMainStore } from "../../stores";

export function useBuilderTranslations() {
    const store = useMainStore();
    return (key, params = {}) => {
        const entry = store.translations.builder2[key];
        const text = entry?.[store.lang] ?? entry?.en ?? key;
        return text.replace(/\{(\w+)\}/g, (match, name) =>
            Object.hasOwn(params, name) ? String(params[name]) : match,
        );
    };
}
