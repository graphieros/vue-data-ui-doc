// Rectangles keep tab navigation independent of RTL scrollLeft implementations.
export function tabScrollAvailability(viewport, children, rtl) {
    const left = children.some((rect) => rect.left < viewport.left - 1);
    const right = children.some((rect) => rect.right > viewport.right + 1);
    return { start: rtl ? right : left, end: rtl ? left : right };
}
export function nearestTabScrollDelta(viewport, children, direction, rtl) {
    const left = (direction === "start") !== rtl;
    const hidden = children.filter((rect) =>
        left ? rect.left < viewport.left - 1 : rect.right > viewport.right + 1,
    );
    hidden.sort((a, b) => (left ? b.left - a.left : a.right - b.right));
    const next = hidden[0];
    return next
        ? left
            ? next.left - viewport.left - 24
            : next.right - viewport.right + 24
        : 0;
}
export function selectedTabScrollDelta(viewport, selected, rtl) {
    return rtl
        ? selected.right - viewport.right + 24
        : selected.left - viewport.left - 24;
}
