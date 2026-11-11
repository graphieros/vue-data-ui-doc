/** Match the chart's configured viewport, including its BaseCard padding. */
export function docPreviewStyle(config = {}, defaults = {}) {
    const viewport = (value) =>
        value.chart ||
        value.style?.chart ||
        value.style?.layout ||
        value.style ||
        value;
    const current = viewport(config);
    const fallback = viewport(defaults);
    const width = Number(current.width ?? fallback.width);
    const height = Number(current.height ?? fallback.height);
    if (
        !Number.isFinite(width) ||
        width <= 0 ||
        !Number.isFinite(height) ||
        height <= 0
    )
        return {};
    return {
        minHeight: `calc(max(0px, 100cqw - 2rem) * ${height / width} + 2rem)`,
    };
}
