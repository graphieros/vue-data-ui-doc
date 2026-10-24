import { parse, renderParts, formatDeclaration } from "./typeDocumentation.js";

// Shared by the upload worker and the fallback for environments without workers.
export function prepareTypeDocumentation(content, filename) {
    const parsed = parse(content, filename);
    const byFullName = new Map();
    const byShortName = new Map();
    for (const entry of parsed) {
        for (const [map, key] of [
            [byFullName, entry.fullName],
            [byShortName, entry.name],
        ]) {
            if (!map.has(key)) map.set(key, []);
            map.get(key).push(entry);
        }
    }
    function resolveReference(text, entry) {
        const clean = text.replace(/\s/g, "");
        for (let i = entry.path.length; i >= 0; i--) {
            const matches =
                byFullName.get([...entry.path.slice(0, i), clean].join(".")) ??
                [];
            if (matches.length === 1) return matches[0];
        }
        const matches = byShortName.get(clean) ?? [];
        return matches.length === 1 ? matches[0] : null;
    }
    return parsed.map((entry) => {
        const { node: _node, sourceFile: _sourceFile, ...data } = entry;
        return formatDeclaration({
            ...data,
            parts: renderParts(entry, resolveReference),
        });
    });
}
