import { createWordCloudDatasetFromPlainText } from "vue-data-ui/utils";

// Older builder drafts store Gauge ranges without the enclosing chart dataset.
export function editorDataset(key, dataset) {
    if (key === "vue_ui_gauge" && Array.isArray(dataset)) {
        return { series: dataset, value: 6 };
    }
    return dataset;
}

// The original makers adapt their editor data to each chart's public API.
export function chartDataset(key, dataset) {
    if (key === "vue_ui_gauge") return editorDataset(key, dataset);
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
