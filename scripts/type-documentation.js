import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
import {
    parse,
    renderParts,
    formatDeclaration,
} from "../src/typeDocumentation.js";

export function generateTypeDocumentation(
    cwd = process.cwd(),
    packageName = "vue-data-ui",
) {
    const options = {
        module: ts.ModuleKind.NodeNext,
        moduleResolution: ts.ModuleResolutionKind.NodeNext,
        skipLibCheck: true,
    };
    const resolve = (name) => {
        const result = ts.resolveModuleName(
            name,
            path.join(cwd, "__type_docs__.mts"),
            options,
            ts.sys,
        ).resolvedModule;
        if (!result || !/[.]d[.](?:ts|mts|cts)$/.test(result.resolvedFileName))
            throw new Error(
                `Type documentation: cannot resolve public declarations for ${name}`,
            );
        return result.resolvedFileName;
    };
    const root = resolve(packageName);
    let dir = path.dirname(root);
    while (!fs.existsSync(path.join(dir, "package.json"))) {
        const parent = path.dirname(dir);
        if (parent === dir)
            throw new Error(
                `Type documentation: package manifest missing for ${packageName}`,
            );
        dir = parent;
    }
    const manifestPath = path.join(dir, "package.json");
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    const specifiers = new Set([packageName]);
    function typeTargets(value) {
        if (!value || typeof value !== "object") return [];
        return Object.entries(value).flatMap(([key, child]) =>
            key === "types" && typeof child === "string"
                ? [child]
                : typeTargets(child),
        );
    }
    for (const [key, value] of Object.entries(manifest.exports || {})) {
        if (!key.startsWith("./")) continue;
        if (!key.includes("*")) {
            if (typeTargets(value).length)
                specifiers.add(packageName + key.slice(1));
            continue;
        }
        for (const target of typeTargets(value)) {
            if (!target.includes("*")) {
                // All matching subpaths share this declaration module.
                specifiers.add(
                    packageName + key.slice(1).replace("*", "__type_docs__"),
                );
                continue;
            }
            const [prefix, suffix] = target.split("*");
            for (const file of ts.sys.readDirectory(
                dir,
                [".ts", ".mts", ".cts"],
                undefined,
                ["**/*.d.ts", "**/*.d.mts", "**/*.d.cts"],
            )) {
                const relative =
                    "./" + path.relative(dir, file).split(path.sep).join("/");
                if (!relative.startsWith(prefix) || !relative.endsWith(suffix))
                    continue;
                const wildcard = relative.slice(
                    prefix.length,
                    relative.length - suffix.length,
                );
                specifiers.add(
                    packageName + key.slice(1).replace("*", wildcard),
                );
            }
        }
    }
    const modules = [...specifiers]
        .sort()
        .map((specifier) => ({ specifier, file: resolve(specifier) }));
    const program = ts.createProgram(
        [...new Set(modules.map((m) => m.file))],
        options,
    );
    const checker = program.getTypeChecker();
    const diagnostics = program.getSyntacticDiagnostics();
    if (diagnostics.length)
        throw new Error(
            "Type documentation: " +
                ts.formatDiagnosticsWithColorAndContext(diagnostics, {
                    getCanonicalFileName: (f) => f,
                    getCurrentDirectory: () => cwd,
                    getNewLine: () => "\n",
                }),
        );
    const canonical = (symbol) =>
        symbol &&
        (symbol.flags & ts.SymbolFlags.Alias
            ? checker.getAliasedSymbol(symbol)
            : symbol);
    const symbols = new Map();
    const publicDeclarations = new Map();
    for (const { specifier, file } of modules) {
        const sf = program.getSourceFile(file);
        const module =
            checker.getSymbolAtLocation(sf) ||
            checker
                .getAmbientModules()
                .find(
                    (s) =>
                        s.name === JSON.stringify(specifier) ||
                        (file === root &&
                            s.name === JSON.stringify(packageName)),
                );
        if (!module)
            throw new Error(
                `Type documentation: no public module found for ${specifier}`,
            );
        const exportedSymbols = [];
        const seen = new Set();
        function collect(moduleSymbol) {
            if (seen.has(moduleSymbol)) return;
            seen.add(moduleSymbol);
            for (const exported of checker.getExportsOfModule(moduleSymbol)) {
                exportedSymbols.push(exported);
                const target = canonical(exported);
                if (target.flags & ts.SymbolFlags.Module) collect(target);
            }
        }
        collect(module);
        for (const exported of exportedSymbols) {
            const symbol = canonical(exported);
            const provenance = symbols.get(symbol) || [];
            provenance.push({
                entryPoint: specifier.includes("__type_docs__")
                    ? specifier.replace("__type_docs__", "*")
                    : specifier,
                name: exported.name,
            });
            symbols.set(symbol, provenance);
            for (const declaration of symbol.declarations || []) {
                if (
                    !declaration
                        .getSourceFile()
                        .fileName.startsWith(dir + path.sep)
                )
                    continue;
                const statement = declaration;
                publicDeclarations.set(
                    `${statement.getSourceFile().fileName}:${statement.getStart()}`,
                    symbol,
                );
            }
        }
    }
    const entries = [];
    const symbolEntries = new Map();
    for (const sf of program.getSourceFiles()) {
        if (!sf.fileName.startsWith(dir + path.sep)) continue;
        for (const entry of parse(
            sf.text,
            path.relative(dir, sf.fileName).split(path.sep).join("/"),
        )) {
            const symbol = publicDeclarations.get(
                `${sf.fileName}:${entry.node.getStart()}`,
            );
            const rootNamespace =
                entry.kind === "namespace" &&
                [JSON.stringify(packageName), "'" + packageName + "'"].includes(
                    entry.name,
                );
            if (!symbol && !rootNamespace) continue;
            entry.id = entries.length + 1;
            entry.exported = !!symbol;
            entry.entryPoints = symbols.get(symbol) || [];
            // Keep the historical root-qualified URLs independently of quote style.
            entry.fullName = entry.fullName.replace(
                /^['"]vue-data-ui['"]/,
                '"vue-data-ui"',
            );
            entry.path = entry.path.map((p) =>
                p === "'vue-data-ui'" ? '"vue-data-ui"' : p,
            );
            entry.compilerSource = sf;
            entries.push(entry);
            if (symbol && !symbolEntries.has(symbol))
                symbolEntries.set(symbol, entry);
        }
    }
    // Parser nodes and compiler nodes have identical source offsets. Resolve by
    // compiler nodes to retain import aliases and avoid shadowed generic names.
    const positionsByFile = new Map();
    for (const entry of entries) {
        const positions =
            positionsByFile.get(entry.compilerSource) || new Map();
        function visit(node) {
            const symbol = canonical(checker.getSymbolAtLocation(node));
            if (symbol)
                positions.set(node.getStart(), symbolEntries.get(symbol));
            ts.forEachChild(node, visit);
        }
        if (!positionsByFile.has(entry.compilerSource)) {
            visit(entry.compilerSource);
            positionsByFile.set(entry.compilerSource, positions);
        }
        entry.parts = renderParts(entry, (_name, _entry, node) =>
            positions.get(node.getStart()),
        );
    }
    const serializable = entries.map(
        ({
            node: _node,
            sourceFile: _sourceFile,
            compilerSource: _compilerSource,
            ...entry
        }) => formatDeclaration(entry),
    );
    if (!serializable.length)
        throw new Error("Type documentation: no public declarations extracted");
    return {
        version: manifest.version,
        entries: serializable,
        files: [
            manifestPath,
            ...program
                .getSourceFiles()
                .filter((sf) => sf.fileName.startsWith(dir + path.sep))
                .map((sf) => sf.fileName),
        ],
    };
}

export function typeDocumentationPlugin() {
    const id = "virtual:vue-data-ui-types";
    const resolvedId = "\0" + id;
    const watched = new Set();
    let refresh;
    return {
        name: "vue-data-ui-type-documentation",
        resolveId(source) {
            if (source === id) return resolvedId;
        },
        load(source) {
            if (source !== resolvedId) return;
            const { files, ...documentation } = generateTypeDocumentation();
            for (const file of files) {
                this.addWatchFile(file);
                if (refresh && !watched.has(file)) {
                    fs.watchFile(file, { interval: 1000 }, refresh);
                    watched.add(file);
                }
            }
            const compact = {
                ...documentation,
                entries: documentation.entries.map((entry) => ({
                    ...entry,
                    parts: entry.parts.map((part) => [
                        part.text.length,
                        part.targetId || part.syntax,
                    ]),
                })),
            };
            return `export default ${JSON.stringify(compact)}`;
        },
        configureServer(server) {
            // Vite normally excludes node_modules from its watcher.
            refresh = () => {
                const module = server.moduleGraph.getModuleById(resolvedId);
                if (module) server.moduleGraph.invalidateModule(module);
                server.ws.send({ type: "full-reload" });
            };
            server.httpServer?.once("close", () => {
                for (const file of watched) fs.unwatchFile(file, refresh);
            });
        },
    };
}
