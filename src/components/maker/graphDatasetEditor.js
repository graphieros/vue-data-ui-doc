export function canAddGraphLink(
    dataset,
    source,
    target,
    directed = false,
    ignoredLink = null,
) {
    if (source === target) return false;
    const ids = new Set(dataset.nodes.map((node) => node.id));
    if (!ids.has(source) || !ids.has(target)) return false;
    return !dataset.links.some(
        (link) =>
            link !== ignoredLink &&
            ((link.source === source && link.target === target) ||
                ((!directed || !link.directed) &&
                    link.source === target &&
                    link.target === source)),
    );
}

export function addGraphNode(
    dataset,
    { label = "", group = "", nodeLabel = "Node" } = {},
) {
    let index = 1;
    while (dataset.nodes.some((node) => String(node.id) === `node-${index}`))
        index++;
    const node = {
        id: `node-${index}`,
        label: label.trim() || `${nodeLabel} ${index}`,
        value: 10,
    };
    if (String(group).trim()) node.group = group;
    dataset.nodes.push(node);
    return node;
}

export function removeGraphNode(dataset, id) {
    dataset.nodes = dataset.nodes.filter((node) => node.id !== id);
    dataset.links = dataset.links.filter(
        (link) => link.source !== id && link.target !== id,
    );
}

export function addGraphLink(dataset, source, target, directed = false) {
    if (!canAddGraphLink(dataset, source, target, directed)) return false;
    dataset.links.push({ source, target, value: 1, directed });
    return true;
}
