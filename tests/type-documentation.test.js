import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { generateTypeDocumentation } from "../scripts/type-documentation.js";
import {
    parse,
    renderParts,
    formatDeclaration,
} from "../src/typeDocumentation.js";

test("installed public API includes root and subpath types, links and provenance deterministically", () => {
    const first = generateTypeDocumentation();
    assert.deepEqual(first, generateTypeDocumentation());
    assert.equal(fs.existsSync("src/vue-data-ui.d.ts"), false);
    const config = first.entries.find((e) => e.name === "VueUiXyConfig");
    assert.ok(config);
    assert.equal(config.fullName, '"vue-data-ui".VueUiXyConfig');
    assert.ok(
        config.entryPoints.some(
            (e) => e.entryPoint === "vue-data-ui/vue-ui-xy",
        ),
    );
    assert.ok(
        first.entries.some((e) =>
            e.entryPoints.some((p) => p.entryPoint === "vue-data-ui/utils"),
        ),
    );
    assert.ok(
        first.entries.some((e) =>
            e.entryPoints.some(
                (p) => p.entryPoint === "vue-data-ui/composables",
            ),
        ),
    );
    assert.ok(
        first.entries.some((e) =>
            e.entryPoints.some((p) => p.entryPoint === "vue-data-ui/ssr/*"),
        ),
    );
    assert.ok(
        first.entries.some(
            (e) => e.kind === "variable" && e.name === "VueUiXy",
        ),
    );
    assert.ok(first.entries.some((e) => e.parts.some((p) => p.targetId)));
    for (const entry of first.entries) {
        assert.equal(entry.parts.map((p) => p.text).join(""), entry.code);
        assert.ok(!("node" in entry));
        for (const part of entry.parts.filter((p) => p.targetId))
            assert.ok(first.entries.some((e) => e.id === part.targetId));
    }
});

test("parser preserves complex syntax, member comments and descriptions", () => {
    const source = `/** A generic configuration. */
export interface Config<T extends string = "a"> {
    /** A nested option. */
    readonly optional?: { tuple: [T, number]; values: Array<T | "b"> } & { fn: (x: T) => void };
    required: T[];
}
export type Choice<T> = Config<T & string> | null;`;
    const entries = parse(source, "fixture.d.ts");
    assert.equal(entries[0].description, "A generic configuration.");
    assert.ok(entries[0].code.includes("readonly optional?:"));
    assert.ok(entries[0].code.includes("/** A nested option. */"));
    for (const entry of entries)
        assert.equal(
            renderParts(entry, () => null)
                .map((p) => p.text)
                .join(""),
            entry.code,
        );
    assert.throws(() => parse("export type Broken = {", "broken.d.ts"), /./);
});

test("unresolvable packages fail with a public specifier diagnostic", () => {
    assert.throws(
        () =>
            generateTypeDocumentation(
                process.cwd(),
                "missing-type-docs-package",
            ),
        /cannot resolve public declarations/,
    );
});

test("multi-file aliases, shadowed generics, private helpers and package layout changes", () => {
    const cwd = fs.mkdtempSync("/tmp/type-docs-");
    const dir = `${cwd}/node_modules/fixture-types`;
    fs.mkdirSync(`${dir}/api`, { recursive: true });
    fs.writeFileSync(
        `${dir}/package.json`,
        JSON.stringify({
            name: "fixture-types",
            version: "1.0.0",
            type: "module",
            exports: { ".": { types: "./api/index.d.ts" } },
        }),
    );
    fs.writeFileSync(
        `${dir}/api/index.d.ts`,
        'export { Options as Renamed } from "./options.js"; export type T = string; export type Generic<T> = [T, import("./options.js").Options];',
    );
    fs.writeFileSync(
        `${dir}/api/options.d.ts`,
        "/** Public options. @deprecated Use something else. */\nexport interface Options { required: string; optional?: number }\ninterface Hidden { secret: true }",
    );
    try {
        const result = generateTypeDocumentation(cwd, "fixture-types");
        const options = result.entries.find((e) => e.name === "Options");
        assert.ok(options.entryPoints.some((e) => e.name === "Renamed"));
        assert.equal(options.description, "Public options.");
        assert.ok(options.jsDocTags.some((tag) => tag.includes("deprecated")));
        assert.ok(options.code.includes("@deprecated"));
        assert.equal(
            result.entries.some((e) => e.name === "Hidden"),
            false,
        );
        const generic = result.entries.find((e) => e.name === "Generic");
        assert.equal(
            generic.parts.filter((p) => p.targetName === "T").length,
            0,
        );
        assert.ok(generic.parts.some((p) => p.targetName === "Options"));
        fs.renameSync(`${dir}/api`, `${dir}/moved`);
        fs.writeFileSync(
            `${dir}/package.json`,
            JSON.stringify({
                name: "fixture-types",
                version: "1.0.1",
                type: "module",
                types: "./moved/index.d.ts",
            }),
        );
        assert.ok(
            generateTypeDocumentation(cwd, "fixture-types").entries.some(
                (e) => e.name === "Options",
            ),
        );
    } finally {
        fs.rmSync(cwd, { recursive: true, force: true });
    }
});

test("display formatting restores nested indentation and preserves reference tokens", () => {
    const source = `/** Options with a literal containing braces. */
export interface Options<T extends string> {
/** Nested options. */
chart?: {
label: "{literal}";
values: Array<T | Options<T>>;
callback: (value: T) => void;
};
}`;
    const entry = parse(source, "unindented.d.ts")[0];
    const originalParts = renderParts(entry, (name) =>
        name === "Options" ? { id: 7, fullName: "Options" } : null,
    );
    const formatted = formatDeclaration({ ...entry, parts: originalParts });
    assert.ok(formatted.code.includes("\n    chart?: {\n        label:"));
    assert.ok(
        formatted.code.includes("\n        values: Array<T | Options<T>>;"),
    );
    assert.ok(formatted.code.includes('"{literal}"'));
    assert.ok(formatted.code.includes("/** Nested options. */"));
    assert.deepEqual(
        formatted.parts
            .filter((part) => part.targetId)
            .map((part) => [part.text, part.targetId]),
        originalParts
            .filter((part) => part.targetId)
            .map((part) => [part.text, part.targetId]),
    );
    assert.equal(
        formatted.parts.map((part) => part.text).join(""),
        formatted.code,
    );
    assert.ok(
        formatted.parts.some(
            (part) => part.syntax === "key" && part.text === "chart",
        ),
    );
    assert.equal(formatDeclaration(formatted).code, formatted.code);
});
