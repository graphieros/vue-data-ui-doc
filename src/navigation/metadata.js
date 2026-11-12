import { getDocHeaderName } from "../performance/docHeader.js";

const descriptions = {
    Home: "Interactive Vue 3 charts, documentation, examples, and a chart builder for Vue Data UI.",
    Docs: "Explore Vue Data UI components, datasets, configuration options, and interactive chart examples.",
    Installation:
        "Install Vue Data UI and create your first Vue 3 chart with component imports and configuration examples.",
    Maker: "Build a Vue Data UI chart, edit its data and settings, and export a ready-to-use Vue component.",
    Search: "Find Vue Data UI configuration properties and filter results by component.",
    "Type Directory":
        "Browse Vue Data UI TypeScript types and component interfaces.",
};
const labels = {
    Docs: "Documentation",
    Maker: "Chart builder",
    a11y: "Accessibility",
};

export function routeMetadata(route) {
    const component =
        route.path === "/docs" ? getDocHeaderName(route.hash || "") : null;
    const label =
        component || labels[route.name] || route.name || "Page not found";
    return {
        title: route.name === "Home" ? "Vue Data UI" : `${label} | Vue Data UI`,
        description: component
            ? `${component} documentation: datasets, configuration options, and interactive examples for Vue Data UI.`
            : descriptions[route.name] ||
              `Explore ${label.toLowerCase()} for Vue Data UI, a Vue 3 data visualization library.`,
        // Search queries and shared playground data do not create canonical pages.
        url: `https://vue-data-ui.graphieros.com${route.path}`,
    };
}

export function updateMetadata(route, document) {
    // The initial router location has no matched records while navigation resolves.
    if (!route.matched.length) return;
    const metadata = routeMetadata(route);
    document.title = metadata.title;
    for (const [attribute, name, content] of [
        ["name", "description", metadata.description],
        ["property", "og:title", metadata.title],
        ["property", "og:description", metadata.description],
        ["property", "og:url", metadata.url],
    ]) {
        let element = document.head.querySelector(
            `meta[${attribute}="${name}"]`,
        );
        if (!element) {
            element = document.createElement("meta");
            element.setAttribute(attribute, name);
            document.head.append(element);
        }
        element.setAttribute("content", content);
    }
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.append(canonical);
    }
    canonical.href = metadata.url;
}
