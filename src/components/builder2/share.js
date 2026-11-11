import { catalog } from "./catalog.js";

const limit = 128_000;
const forbidden = new Set(["__proto__", "prototype", "constructor"]);
function validate(value, depth = 0) {
    if (depth > 60) throw new Error("Shared chart is too deeply nested");
    if (!value || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) {
        if (forbidden.has(key)) throw new Error("Unsupported shared chart key");
        validate(child, depth + 1);
    }
}
function check(chart) {
    if (
        !chart ||
        chart.version !== 1 ||
        !catalog.some((c) => c.name === chart.component) ||
        !Object.hasOwn(chart, "dataset") ||
        chart.dataset === null ||
        !chart.config ||
        typeof chart.config !== "object" ||
        Array.isArray(chart.config)
    ) {
        throw new Error("Unsupported shared chart");
    }
    validate(chart);
    return chart;
}

export function encodeSharedChart({ component, dataset, config }) {
    const chart = check({ version: 1, component, dataset, config });
    const bytes = new TextEncoder().encode(JSON.stringify(chart));
    if (bytes.length > limit / 2) throw new Error("Shared chart is too large");
    return btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(""))
        .replaceAll("+", "-")
        .replaceAll("/", "_")
        .replace(/=+$/, "");
}

export function decodeSharedChart(hash) {
    if (!hash.startsWith("#chart=")) return null;
    const encoded = hash.slice(7);
    if (!encoded || encoded.length > limit || !/^[\w-]+$/.test(encoded))
        throw new Error("Invalid chart link");
    const bytes = Uint8Array.from(
        atob(encoded.replaceAll("-", "+").replaceAll("_", "/")),
        (c) => c.charCodeAt(0),
    );
    return check(
        JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)),
    );
}

export function sharedChartUrl(base, chart) {
    const url = new URL("/chart-builder", base);
    url.searchParams.set("component", chart.component);
    url.hash = `chart=${encodeSharedChart(chart)}`;
    return url.href;
}
