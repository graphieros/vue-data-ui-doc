import { createWordCloudDatasetFromPlainText } from "vue-data-ui/utils";

export function updateTreemapNode(node, key, value) {
    const next = { ...node, [key]: value };
    if (key === "children" && Array.isArray(value)) {
        next.value = value.reduce(
            (total, child) =>
                total + (Number.isFinite(child.value) ? child.value : 0),
            0,
        );
    }
    return next;
}

export function addTreemapChild(node, parentColor) {
    const child = {
        name: "Child name",
        value:
            Array.isArray(node.children) && node.children.length
                ? 0
                : node.value,
        color: parentColor || node.color || "#1f77b4",
        __inheritColor: true,
    };
    return updateTreemapNode(node, "children", [
        ...(node.children || []),
        child,
    ]);
}

// Older builder drafts store Gauge ranges without the enclosing chart dataset.
export function editorDataset(key, dataset) {
    if (key === "vue_ui_gauge" && Array.isArray(dataset)) {
        return { series: dataset, value: 6 };
    }
    if (key === "vue_ui_treemap" && Array.isArray(dataset)) {
        const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];
        const withColors = (items, inheritedColor) =>
            items.map((item, index) => {
                const color =
                    item.color ||
                    inheritedColor ||
                    colors[index % colors.length];
                return {
                    ...item,
                    color,
                    ...(inheritedColor
                        ? {
                              __inheritColor:
                                  item.__inheritColor ??
                                  (!item.color ||
                                      item.color === inheritedColor),
                          }
                        : {}),
                    ...(Array.isArray(item.children)
                        ? { children: withColors(item.children, color) }
                        : {}),
                };
            });
        return withColors(dataset);
    }
    return dataset;
}

// The original makers adapt their editor data to each chart's public API.
export function chartDataset(key, dataset) {
    if (key === "vue_ui_gauge") return editorDataset(key, dataset);
    if (key === "vue_ui_treemap" && Array.isArray(dataset)) {
        const resolve = (items, parentColor) =>
            items.map(({ __inheritColor, children, ...item }) => {
                const color =
                    parentColor && __inheritColor ? parentColor : item.color;
                return {
                    ...item,
                    color,
                    ...(Array.isArray(children)
                        ? { children: resolve(children, color) }
                        : {}),
                };
            });
        return resolve(dataset);
    }
    if (key === "vue_ui_hill") {
        return dataset.map((item) => ({
            ...item,
            values: Array.isArray(item.values) ? [...item.values] : [],
        }));
    }
    if (key === "vue_ui_word_cloud" && typeof dataset === "string") {
        return createWordCloudDatasetFromPlainText(dataset, (word) =>
            word.toLowerCase(),
        );
    }
    if (key === "vue_ui_3d_bar") {
        return Array.isArray(dataset.series)
            ? { series: dataset.series }
            : { percentage: dataset.percentage };
    }
    return dataset;
}
