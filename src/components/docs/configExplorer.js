const levelColors = [
    "#4A90E2",
    "#9B7BE8",
    "#42B883",
    "#E6A23C",
    "#E879A8",
    "#4DB6AC",
    "#E6CF63",
];

export function configBreadcrumbs(id) {
    const segments = JSON.parse(id);
    return Array.from({ length: segments.length + 1 }, (_, depth) => ({
        id: JSON.stringify(segments.slice(0, depth)),
        label: depth ? String(segments[depth - 1]) : "config",
    }));
}

export function configBranch(dataset, selectedId) {
    const selected = JSON.parse(selectedId);
    const prefix = (first, second) =>
        first.every((part, index) => part === second[index]);
    const nodes = dataset.nodes.filter(({ id }) => {
        const path = JSON.parse(id);
        return prefix(selected, path) || prefix(path, selected);
    });
    const ids = new Set(nodes.map(({ id }) => id));
    return {
        nodes,
        links: dataset.links.filter(
            ({ source, target }) => ids.has(source) && ids.has(target),
        ),
    };
}

export function configValueType(value) {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    return typeof value;
}

export function configSnippet(value, json = true) {
    if (typeof value === "function") return String(value);
    const snippet = JSON.stringify(value, null, 2) ?? String(value);
    if (json || value === null || typeof value !== "object") return snippet;
    return snippet.replace(
        /^(\s*)"((?:\\.|[^"\\])*)":/gm,
        (match, indent, escapedKey) => {
            const key = JSON.parse(`"${escapedKey}"`);
            if (key === "__proto__") return `${indent}["__proto__"]:`;
            return /^[A-Za-z_$][\w$]*$/.test(key) ? `${indent}${key}:` : match;
        },
    );
}

// Keep a full graph ID on every displayed row, including container delimiters.
export function configSnippetRows(value, id = "[]", json = true) {
    const rows = [];
    const root = JSON.parse(id);
    function visit(value, segments, depth, prefix = "", suffix = "") {
        const nodeId = JSON.stringify(segments);
        const indent = "  ".repeat(depth);
        const entries =
            value !== null && typeof value === "object"
                ? Object.entries(value)
                : [];
        if (!entries.length) {
            rows.push({
                id: nodeId,
                content: indent + prefix + configSnippet(value, json) + suffix,
            });
            return;
        }
        const array = Array.isArray(value);
        rows.push({
            id: nodeId,
            content: indent + prefix + (array ? "[" : "{"),
        });
        entries.forEach(([key, child], index) => {
            let name = JSON.stringify(key);
            if (!json) {
                if (key === "__proto__") name = '["__proto__"]';
                else if (/^[A-Za-z_$][\w$]*$/.test(key)) name = key;
            }
            visit(
                child,
                [...segments, array ? Number(key) : key],
                depth + 1,
                array ? "" : `${name}: `,
                index < entries.length - 1 ? "," : "",
            );
        });
        rows.push({
            id: nodeId,
            content: indent + (array ? "]" : "}") + suffix,
        });
    }
    // Match JSON.stringify's omission of undefined object properties and its
    // normalization of array values, as used by the existing snippet formatter.
    const normalized =
        value !== null && typeof value === "object"
            ? JSON.parse(JSON.stringify(value))
            : value;
    visit(normalized, root, 0);
    return rows;
}

// IDs encode path segments so dotted property names cannot collide with nesting.
export function createConfigGraph(config) {
    const nodes = [];
    const links = [];
    const properties = new Map();
    function visit(value, segments, parent) {
        const id = JSON.stringify(segments);
        const type = configValueType(value);
        const path = segments.reduce(
            (path, segment) =>
                typeof segment === "number"
                    ? `${path}[${segment}]`
                    : /^[A-Za-z_$][\w$]*$/.test(segment)
                      ? `${path}.${segment}`
                      : `${path}[${JSON.stringify(segment)}]`,
            "config",
        );
        const property = { id, path, value, type };
        properties.set(id, property);
        nodes.push({
            id,
            label: segments.length ? String(segments.at(-1)) : "config",
            group: segments.length,
            color: levelColors[segments.length % levelColors.length],
            value: type === "object" || type === "array" ? 3 : 1,
            metadata: { path, type },
        });
        if (parent !== undefined) links.push({ source: parent, target: id });
        if (value !== null && typeof value === "object") {
            for (const [key, child] of Object.entries(value))
                visit(
                    child,
                    [...segments, Array.isArray(value) ? Number(key) : key],
                    id,
                );
        }
    }
    visit(config, []);
    return { dataset: { nodes, links }, properties };
}
