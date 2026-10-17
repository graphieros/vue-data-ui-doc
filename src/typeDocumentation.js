import * as ts from "typescript";

function kindOf(node) {
    if (ts.isInterfaceDeclaration(node)) return "interface";
    if (ts.isTypeAliasDeclaration(node)) return "type";
    if (ts.isClassDeclaration(node)) return "class";
    if (ts.isEnumDeclaration(node)) return "enum";
    if (ts.isFunctionDeclaration(node)) return "function";
    if (ts.isModuleDeclaration(node)) return "namespace";
    if (ts.isVariableStatement(node)) return "variable";
    return null;
}

function docText(node) {
    return (node.jsDoc || [])
        .map((doc) => {
            if (typeof doc.comment === "string") return doc.comment;
            if (Array.isArray(doc.comment))
                return doc.comment.map((part) => part.text || "").join("");
            return "";
        })
        .filter(Boolean)
        .join("\n\n");
}
function hasExport(node) {
    return !!node.modifiers?.some(
        (mod) =>
            mod.kind === ts.SyntaxKind.ExportKeyword ||
            mod.kind === ts.SyntaxKind.DefaultKeyword,
    );
}

export function parse(content, filename) {
    const sf = ts.createSourceFile(
        filename,
        content,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS,
    );
    if (sf.parseDiagnostics.length)
        throw new Error(
            ts.flattenDiagnosticMessageText(
                sf.parseDiagnostics[0].messageText,
                "\n",
            ),
        );
    const out = [];
    function add(
        node,
        declarationNode,
        kind,
        name,
        path,
        exported,
        extra = {},
    ) {
        const position = sf.getLineAndCharacterOfPosition(
            declarationNode.getStart(sf),
        );
        out.push({
            id: out.length + 1,
            kind,
            name,
            fullName: [...path, name].filter(Boolean).join("."),
            depth: path.length,
            exported,
            description: docText(node),
            jsDocTags: (node.jsDoc || []).flatMap((doc) =>
                (doc.tags || []).map((tag) => tag.getText(sf)),
            ),
            fileName: filename,
            line: position.line + 1,
            code: sf.text.slice(
                declarationNode.getStart(sf, true),
                declarationNode.getEnd(),
            ),
            node: declarationNode,
            sourceFile: sf,
            path: [...path],
            ...extra,
        });
    }
    function visit(node, path = [], inheritedExport = false) {
        const kind = kindOf(node);
        if (kind === "variable") {
            node.declarationList.declarations.forEach((decl) => {
                add(
                    node,
                    decl,
                    kind,
                    decl.name.getText(sf),
                    path,
                    inheritedExport || hasExport(node),
                );
            });
            return;
        }
        if (kind) {
            const name = node.name?.getText(sf) || "default";
            const exported = inheritedExport || hasExport(node);
            add(node, node, kind, name, path, exported);
            if (kind === "namespace" && node.body)
                visit(node.body, [...path, name], exported);
            return;
        }
        ts.forEachChild(node, (child) => visit(child, path, inheritedExport));
    }
    visit(sf);
    return out;
}

function referenceSpans(entry, resolveReference) {
    if (!entry) return [];
    const spans = [];
    const base = entry.node.getStart(entry.sourceFile, true);
    function register(typeName) {
        const target = resolveReference(
            typeName.getText(entry.sourceFile),
            entry,
            typeName,
        );
        if (!target) return;
        const start = typeName.getStart(entry.sourceFile) - base;
        const end = typeName.getEnd() - base;
        spans.push({
            start,
            end,
            targetId: target.id,
            targetName: target.fullName,
        });
    }
    function visit(node) {
        if (ts.isTypeReferenceNode(node)) {
            register(node.typeName);
        } else if (ts.isExpressionWithTypeArguments(node)) {
            register(node.expression);
        } else if (ts.isImportTypeNode(node) && node.qualifier) {
            register(node.qualifier);
        } else if (ts.isTypeQueryNode(node)) {
            register(node.exprName);
        }
        ts.forEachChild(node, visit);
    }
    visit(entry.node);
    return spans
        .sort((a, b) => a.start - b.start || b.end - a.end)
        .filter(
            (span, index, all) =>
                !all.slice(0, index).some((other) => span.start < other.end),
        );
}
// Collect property names from the AST so keys are distinct from their value types.
function propertySpans(entry) {
    const spans = [];
    const base = entry.node.getStart(entry.sourceFile, true);
    function visit(node) {
        if (
            (ts.isPropertySignature(node) ||
                ts.isPropertyDeclaration(node) ||
                ts.isPropertyAssignment(node) ||
                ts.isMethodSignature(node) ||
                ts.isMethodDeclaration(node) ||
                ts.isEnumMember(node)) &&
            node.name
        ) {
            spans.push({
                start: node.name.getStart(entry.sourceFile) - base,
                end: node.name.getEnd() - base,
            });
        }
        ts.forEachChild(node, visit);
    }
    visit(entry.node);
    return spans;
}

const VALUE_KEYWORDS = new Set([
    ts.SyntaxKind.StringKeyword,
    ts.SyntaxKind.NumberKeyword,
    ts.SyntaxKind.BooleanKeyword,
    ts.SyntaxKind.AnyKeyword,
    ts.SyntaxKind.UnknownKeyword,
    ts.SyntaxKind.NeverKeyword,
    ts.SyntaxKind.VoidKeyword,
    ts.SyntaxKind.UndefinedKeyword,
    ts.SyntaxKind.NullKeyword,
    ts.SyntaxKind.ObjectKeyword,
]);

function syntaxClass(kind, isProperty) {
    if (isProperty) return "key";
    if (
        kind === ts.SyntaxKind.StringLiteral ||
        kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral ||
        kind === ts.SyntaxKind.TemplateHead ||
        kind === ts.SyntaxKind.TemplateMiddle ||
        kind === ts.SyntaxKind.TemplateTail
    )
        return "string";
    if (
        kind === ts.SyntaxKind.NumericLiteral ||
        kind === ts.SyntaxKind.BigIntLiteral ||
        kind === ts.SyntaxKind.TrueKeyword ||
        kind === ts.SyntaxKind.FalseKeyword
    )
        return "literal";
    if (
        kind === ts.SyntaxKind.SingleLineCommentTrivia ||
        kind === ts.SyntaxKind.MultiLineCommentTrivia
    )
        return "comment";
    if (VALUE_KEYWORDS.has(kind)) return "type";
    if (kind >= ts.SyntaxKind.FirstKeyword && kind <= ts.SyntaxKind.LastKeyword)
        return "keyword";
    return "plain";
}

export function renderParts(entry, resolveReference) {
    const code = entry.code;
    const links = referenceSpans(entry, resolveReference);
    const properties = propertySpans(entry);
    const parts = [];

    // Scan the complete source, so comments, strings and token offsets remain accurate.
    const scanner = ts.createScanner(
        ts.ScriptTarget.Latest,
        false,
        ts.LanguageVariant.Standard,
        code,
    );
    const tokens = [];
    let kind;
    while ((kind = scanner.scan()) !== ts.SyntaxKind.EndOfFileToken) {
        const start = scanner.getTokenPos();
        const end = scanner.getTextPos();
        tokens.push({
            start,
            end,
            kind: syntaxClass(
                kind,
                properties.some(
                    (span) => start >= span.start && end <= span.end,
                ),
            ),
        });
    }

    // Preserve one clickable element per reference, even for qualified names.
    let cursor = 0;
    function addTokens(start, end) {
        for (const token of tokens) {
            if (token.end <= start || token.start >= end) continue;
            const from = Math.max(start, token.start);
            const to = Math.min(end, token.end);
            if (to > from)
                parts.push({
                    text: code.slice(from, to),
                    syntax: token.kind,
                });
        }
    }
    for (const link of links) {
        if (link.start < cursor || link.end > code.length) continue;
        addTokens(cursor, link.start);
        parts.push({
            text: code.slice(link.start, link.end),
            targetId: link.targetId,
            targetName: link.targetName,
        });
        cursor = link.end;
    }
    addTokens(cursor, code.length);
    return parts;
}

// Format only the display text, after resolving references at package offsets.
// Carry token metadata through whitespace edits so links and colors stay aligned.
export function formatDeclaration(entry) {
    const filename = "declaration.ts";
    const service = ts.createLanguageService({
        getCompilationSettings: () => ({}),
        getScriptFileNames: () => [filename],
        getScriptVersion: () => "0",
        getScriptSnapshot: (name) =>
            name === filename
                ? ts.ScriptSnapshot.fromString(entry.code)
                : undefined,
        getCurrentDirectory: () => "",
        getDefaultLibFileName: () => "lib.d.ts",
        fileExists: (name) => name === filename,
        readFile: (name) => (name === filename ? entry.code : undefined),
    });
    let edits;
    try {
        edits = service.getFormattingEditsForDocument(filename, {
            indentSize: 4,
            tabSize: 4,
            convertTabsToSpaces: true,
            newLineCharacter: "\n",
            insertSpaceAfterCommaDelimiter: true,
            insertSpaceBeforeAndAfterBinaryOperators: true,
            insertSpaceAfterKeywordsInControlFlowStatements: true,
            insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
        });
    } finally {
        service.dispose();
    }
    let offset = 0;
    const source = entry.parts.map((part) => {
        const start = offset;
        offset += part.text.length;
        return { part, start, end: offset };
    });
    const parts = [];
    let index = 0;
    function append(text, metadata) {
        if (!text) return;
        const previous = parts.at(-1);
        if (
            previous &&
            previous.syntax === metadata.syntax &&
            previous.targetId === metadata.targetId &&
            previous.targetName === metadata.targetName
        ) {
            previous.text += text;
        } else {
            parts.push({ ...metadata, text });
        }
    }
    function appendRange(start, end) {
        while (index < source.length && source[index].end <= start) index++;
        for (let i = index; i < source.length && source[i].start < end; i++) {
            const item = source[i];
            append(
                entry.code.slice(
                    Math.max(start, item.start),
                    Math.min(end, item.end),
                ),
                item.part,
            );
        }
    }
    let cursor = 0;
    for (const edit of edits.sort((a, b) => a.span.start - b.span.start)) {
        const start = edit.span.start;
        const end = start + edit.span.length;
        appendRange(cursor, start);
        while (index < source.length && source[index].end <= start) index++;
        const item = source[index];
        const metadata =
            item && start > item.start && end <= item.end
                ? item.part
                : { syntax: "plain" };
        append(edit.newText, metadata);
        cursor = end;
    }
    appendRange(cursor, entry.code.length);
    return { ...entry, code: parts.map((part) => part.text).join(""), parts };
}
