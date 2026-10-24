const loaders = import.meta.glob("./attributes/*.json", { import: "default" });
const pending = new Map();
const loaded = new Map();
export function loadAttributeTranslations(language) {
    const loader = loaders[`./attributes/${language}.json`];
    if (!loader) return Promise.resolve();
    if (!pending.has(language)) {
        pending.set(
            language,
            loader()
                .then((data) => loaded.set(language, data))
                .catch((error) => {
                    pending.delete(language);
                    throw error;
                }),
        );
    }
    return pending.get(language);
}
export function getAttributeTranslation(attribute, language) {
    return loaded.get(language)?.[attribute] || "";
}
