import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

export function splitExampleSource(
    source,
    filename = path.resolve("src/useExamples.js"),
) {
    const file = ts.createSourceFile(
        filename,
        source,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.JS,
    );
    const factory = file.statements.find(ts.isFunctionDeclaration);
    const statements = factory.body.statements;
    for (const statement of statements) {
        if (
            !ts.isVariableStatement(statement) &&
            !ts.isFunctionDeclaration(statement) &&
            !ts.isReturnStatement(statement)
        ) {
            throw new Error(
                "Example factories must declare their work inside scoped declarations; unsupported side effect: " +
                    statement.getText(file).slice(0, 80),
            );
        }
    }
    const declarations = new Map();
    for (const statement of statements) {
        if (ts.isVariableStatement(statement)) {
            for (const declaration of statement.declarationList.declarations) {
                if (ts.isIdentifier(declaration.name))
                    declarations.set(declaration.name.text, statement);
            }
        } else if (ts.isFunctionDeclaration(statement))
            declarations.set(statement.name.text, statement);
    }
    const examples = declarations.get("examples");
    const groups = new Map();
    function findArray(node) {
        if (
            ts.isReturnStatement(node) &&
            node.expression &&
            ts.isArrayLiteralExpression(node.expression)
        ) {
            for (const item of node.expression.elements) {
                const link = item.properties?.find(
                    (p) => p.name?.getText(file) === "link",
                );
                if (!link || !ts.isStringLiteral(link.initializer))
                    throw new Error(
                        "Example category must have a literal link",
                    );
                const category = link.initializer.text;
                if (!groups.has(category)) groups.set(category, []);
                groups.get(category).push(item);
            }
            return;
        }
        ts.forEachChild(node, findArray);
    }
    findArray(examples);
    function identifiers(node) {
        const names = new Set();
        function visit(n) {
            if (ts.isIdentifier(n)) names.add(n.text);
            ts.forEachChild(n, visit);
        }
        visit(node);
        return names;
    }
    return Object.fromEntries(
        [...groups].map(([category, items]) => {
            const needed = new Set(["computed"]);
            const included = new Set();
            function include(name) {
                needed.add(name);
                if (name === "curvedMarkers" || name === "examples") return;
                const statement = declarations.get(name);
                if (!statement || included.has(statement)) return;
                included.add(statement);
                for (const dependency of identifiers(statement))
                    include(dependency);
            }
            for (const item of items)
                for (const name of identifiers(item)) include(name);
            const imports = [];
            for (const statement of file.statements.filter(
                ts.isImportDeclaration,
            )) {
                const clause = statement.importClause;
                const defaultName = clause?.name?.text;
                const named =
                    clause?.namedBindings?.elements?.filter((e) =>
                        needed.has(e.name.text),
                    ) ?? [];
                const parts = [];
                if (defaultName && needed.has(defaultName))
                    parts.push(defaultName);
                if (named.length)
                    parts.push(
                        "{ " +
                            named.map((e) => e.getText(file)).join(", ") +
                            " }",
                    );
                if (!parts.length) continue;
                const specifier = statement.moduleSpecifier.text;
                const resolved = specifier.startsWith(".")
                    ? path.resolve(path.dirname(filename), specifier)
                    : specifier;
                imports.push(
                    `import ${parts.join(", ")} from ${JSON.stringify(resolved)};`,
                );
            }
            const body = statements
                .filter((s) => included.has(s))
                .map((s) => s.getText(file))
                .join("\n");
            return [
                category,
                imports.join("\n") +
                    `\nexport default function useCategory(curvedMarkers) {\n${body}\nreturn computed(() => [${items.map((i) => i.getText(file)).join(",\n")}]);\n}`,
            ];
        }),
    );
}

export function exampleModulesPlugin() {
    const prefix = "virtual:examples/";
    const filename = path.resolve("src/useExamples.js");
    let cachedSource;
    let modules;
    return {
        name: "example-category-modules",
        resolveId(id) {
            if (id.startsWith(prefix)) return "\0" + id;
        },
        load(id) {
            if (!id.startsWith("\0" + prefix)) return;
            this.addWatchFile(filename);
            const source = fs.readFileSync(filename, "utf8");
            if (source !== cachedSource) {
                modules = splitExampleSource(source, filename);
                cachedSource = source;
            }
            const category = id.slice(("\0" + prefix).length);
            if (category === "index") {
                return `export default {${Object.keys(modules)
                    .map(
                        (key) =>
                            `${JSON.stringify(key)}: () => import(${JSON.stringify(prefix + key)})`,
                    )
                    .join(",")}}`;
            }
            if (!modules[category])
                throw new Error(`Unknown example category: ${category}`);
            return modules[category];
        },
    };
}
