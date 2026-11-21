export function explorerQuery(query, state) {
    const next = { ...query, component: state.component };
    if (state.path !== "config") next.property = state.path;
    else delete next.property;
    if (state.json) next.json = "1";
    else delete next.json;
    if (!state.branch) next.branch = "0";
    else delete next.branch;
    return next;
}

export function sameExplorerQuery(first, second) {
    const normalized = (query) =>
        JSON.stringify(
            Object.keys(query)
                .sort()
                .map((key) => [key, query[key]]),
        );
    return normalized(first) === normalized(second);
}
