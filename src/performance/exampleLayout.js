/** Reserve the same chart area before and after an async example resolves. */
export function chartFrameStyle(example) {
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
