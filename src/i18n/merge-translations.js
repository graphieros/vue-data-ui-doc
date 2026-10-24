// Preserve dictionary/leaf identities captured by menus and documentation schemas.
export function applyMainTranslations(target, source) {
    for (const [key, value] of Object.entries(source)) {
        if (
            value &&
            typeof value === "object" &&
            !Array.isArray(value) &&
            target[key] &&
            typeof target[key] === "object"
        ) {
            applyMainTranslations(target[key], value);
        } else {
            target[key] = value;
        }
    }
}
// Locale files contain plain strings; adapt them to the existing component API.
export function createMainTranslations(source, language) {
    return Object.fromEntries(
        Object.entries(source).map(([key, value]) => [
            key,
            typeof value === "string"
                ? { [language]: value }
                : createMainTranslations(value, language),
        ]),
    );
}

