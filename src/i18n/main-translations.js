import english from "./main/en.json";
import { createMainTranslations } from "./merge-translations.js";

export const defaultTranslations = createMainTranslations(english, "en");

const loaders = import.meta.glob("./main/*.json", { import: "default" });
const cache = new Map([["en", Promise.resolve(defaultTranslations)]]);

function withEnglishFallback(base, translated) {
    if (!base || typeof base !== "object" || Array.isArray(base))
        return translated ?? base;
    const result = { ...base };
    for (const [key, value] of Object.entries(translated ?? {})) {
        result[key] =
            key in base ? withEnglishFallback(base[key], value) : value;
    }
    return result;
}

export function loadMainTranslations(language) {
    const loader = loaders[`./main/${language}.json`];
    if (!loader) return Promise.resolve(defaultTranslations);
    if (!cache.has(language)) {
        cache.set(
            language,
            loader()
                .then((data) =>
                    createMainTranslations(
                        withEnglishFallback(english, data),
                        language,
                    ),
                )
                .catch((error) => {
                    cache.delete(language);
                    throw error;
                }),
        );
    }
    return cache.get(language);
}

export { applyMainTranslations } from "./merge-translations.js";
