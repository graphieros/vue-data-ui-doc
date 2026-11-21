// Preserve vue-hi-code's token elements while making rendered lines clickable.
export function decorateSnippetRows(pre, rows) {
    if (!pre || pre.querySelector(".snippet-row")) return;
    const doc = pre.ownerDocument;
    const title = pre.querySelector(".code-title");
    const lines = [doc.createElement("span")];
    let firstText = true;
    function visit(node, parents = []) {
        if (node === title) return;
        if (node.nodeType === 3) {
            let text = node.textContent;
            if (firstText && title && text.startsWith("\n"))
                text = text.slice(1);
            firstText = false;
            text.split("\n").forEach((part, index) => {
                if (index) lines.push(doc.createElement("span"));
                if (!part) return;
                let container = lines.at(-1);
                for (const parent of parents) {
                    const clone = parent.cloneNode(false);
                    container.appendChild(clone);
                    container = clone;
                }
                container.appendChild(doc.createTextNode(part));
            });
        } else if (node.nodeType === 1) {
            for (const child of node.childNodes)
                visit(child, [...parents, node]);
        }
    }
    for (const node of pre.childNodes) visit(node);
    if (lines.length !== rows.length) return;
    const fragment = doc.createDocumentFragment();
    if (title) fragment.appendChild(title.cloneNode(true));
    lines.forEach((line, index) => {
        line.className = "snippet-row";
        line.dataset.rowIndex = String(index);
        line.setAttribute("role", "button");
        line.tabIndex = 0;
        fragment.appendChild(line);
    });
    pre.replaceChildren(fragment);
}
