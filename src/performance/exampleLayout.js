const compactCharts = new Set([
    "VueUiSparkline",
    "VueUiSparkHistogram",
    "VueUiBullet",
    "VueUiHeatmap",
]);

/** Reserve the same chart area before and after an async example resolves. */
export function exampleCardStyle(component) {
    return { minHeight: compactCharts.has(component) ? "320px" : "700px" };
}

export function chartFrameStyle(example) {
    if (compactCharts.has(example.component)) return { minHeight: "160px" };
    const config = example.config || {};
    const chart =
        config.chart ||
        config.style?.chart ||
        config.style?.layout ||
        config.style ||
        {};
    const width = Number(chart.width);
    const height = Number(chart.height);
    const ratio =
        Number.isFinite(width) &&
        width > 0 &&
        Number.isFinite(height) &&
        height > 0
            ? width / height
            : 512 / 360;
    return { aspectRatio: String(ratio) };
}
