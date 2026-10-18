import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
import { parse } from "@vue/compiler-sfc";
import { effectScope, unref, nextTick, ref } from "vue";
import { getVueDataUiConfig } from "vue-data-ui/utils";
import { evaluatePage } from "./helpers/doc-page-fixture.js";
import { useDocConfigBindings } from "../src/useDocConfigBindings.js";
import { completeDocConfig } from "../src/completeDocConfig.js";
import {
    getEditableConfigPaths,
    getConfigInitialValues,
} from "../src/components/docs/configuration/configFields.js";

const docs = new URL("../src/components/docs/", import.meta.url);
const configurations = new URL("configuration/", docs);
function find(node, predicate) {
    if (predicate(node)) return node;
    for (const child of node.children || []) {
        const result = find(child, predicate);
        if (result) return result;
    }
}
function scriptAst(source) {
    return ts.createSourceFile("doc.js", source, ts.ScriptTarget.Latest, true);
}
const pages = fs
    .readdirSync(docs)
    .filter((name) => name.endsWith(".vue"))
    .map((file) => ({
        file,
        source: fs.readFileSync(new URL(file, docs), "utf8"),
    }))
    .filter((page) => page.source.includes('ref="configCode"'));

test("every configuration editor delegates its fields to a component", () => {
    assert.equal(pages.length, 66);
    for (const { file, source } of pages) {
        const { descriptor, errors } = parse(source);
        assert.deepEqual(errors, [], file);
        const editor = find(
            descriptor.template.ast,
            (n) =>
                n.type === 1 &&
                n.props.some(
                    (p) =>
                        p.name === "ref" && p.value?.content === "configCode",
                ),
        );
        assert.ok(
            find(editor, (n) => n.type === 1 && n.tag.endsWith("ConfigFields")),
            file,
        );
        assert.equal(
            find(editor, (n) => n.type === 1 && n.tag === "BaseAttr"),
            undefined,
            file,
        );
    }
});

for (const { file, source } of pages.filter(
    (page) => page.file !== "DocVueUiXy.vue",
)) {
    test(`${file}: all bindings work in light/dark presets and after reset`, async () => {
        const { descriptor } = parse(source);
        const wrapperNode = find(
            descriptor.template.ast,
            (n) => n.type === 1 && n.tag.endsWith("ConfigFields"),
        );
        const readProp = (name) =>
            wrapperNode.props.find(
                (p) => p.type === 7 && p.arg?.content === name,
            ).exp.content;
        const wrapper = fs.readFileSync(
            new URL(wrapperNode.tag + ".vue", configurations),
            "utf8",
        );
        const { descriptor: wrapperDescriptor, errors } = parse(wrapper);
        assert.deepEqual(errors, []);
        const wrapperAst = scriptAst(wrapperDescriptor.scriptSetup.content);
        const importNode = wrapperAst.statements.find(
            (s) =>
                ts.isImportDeclaration(s) &&
                s.moduleSpecifier.text.endsWith("-config.js"),
        );
        let schema;
        function visit(n) {
            if (
                ts.isCallExpression(n) &&
                n.expression.getText(wrapperAst) === "getVueDataUiConfig"
            )
                schema = n.arguments[0].text;
            ts.forEachChild(n, visit);
        }
        visit(wrapperAst);
        const metadataUrl = new URL(
            importNode.moduleSpecifier.text,
            configurations,
        );
        const metadataSource = fs.readFileSync(metadataUrl, "utf8");
        const ast = scriptAst(metadataSource);
        const factory = ast.statements.find(ts.isFunctionDeclaration);
        const dependencies = ts.isObjectBindingPattern(
            factory.parameters[0].name,
        )
            ? factory.parameters[0].name.elements.map(
                  (element) => element.name.text,
              )
            : [];
        const module = await import(metadataUrl.href);
        for (const darkMode of [false, true]) {
            const fixture = evaluatePage(source, darkMode);
            const context = Object.fromEntries(
                dependencies.map((name) => [name, unref(fixture.get(name))]),
            );
            const fields = module[factory.name.text](context);
            const paths = getEditableConfigPaths(fields);
            assert.ok(
                paths.every((path) => typeof path === "string" && path.length),
                file,
            );
            const defaults = getVueDataUiConfig(schema);
            const defaultsBefore = JSON.stringify(defaults);
            const active = fixture.get(readProp("config"));
            const snapshot = JSON.stringify(unref(active));
            const options = {
                skipArrays: false,
                defaults,
                initialValues: getConfigInitialValues(fields),
            };
            const scope = effectScope();
            try {
                const bindings = scope.run(() =>
                    useDocConfigBindings(active, paths, options),
                );
                for (const path of paths) {
                    assert.ok(Object.hasOwn(bindings, path), path);
                    // Reading must never trigger the library's missing-path fallback.
                    void bindings[path].value;
                }
                const editable = paths.find(
                    (path) => typeof bindings[path].value === "boolean",
                );
                if (editable) {
                    const initial = bindings[editable].value;
                    bindings[editable].value = !initial;
                    assert.equal(bindings[editable].value, !initial);
                    active.value = JSON.parse(snapshot);
                    await nextTick();
                    assert.equal(bindings[editable].value, initial);
                }
                assert.equal(
                    JSON.stringify(defaults),
                    defaultsBefore,
                    "Library defaults must remain isolated",
                );
            } finally {
                scope.stop();
            }
        }
    });
}

test("default completion preserves overrides and rejects unknown paths before mutation", () => {
    const config = { chart: { color: "demo", callbacks: null } };
    const defaults = { chart: { color: "library", labels: { show: true } } };
    assert.throws(
        () =>
            completeDocConfig(config, ["chart.labels.show", "typo"], defaults),
        /no editable binding/,
    );
    assert.deepEqual(config, { chart: { color: "demo", callbacks: null } });
    completeDocConfig(config, ["chart.color", "chart.labels.show"], defaults);
    assert.equal(config.chart.color, "demo");
    assert.equal(config.chart.callbacks, null);
    assert.equal(config.chart.labels.show, true);
    assert.equal(defaults.chart.labels.show, true);
});

test("indexed array bindings preserve the array and survive replacements", async () => {
    const config = ref({ colors: ["#111111", "#222222"] });
    const scope = effectScope();
    try {
        const bindings = scope.run(() =>
            useDocConfigBindings(config, ["colors.1"], { skipArrays: false }),
        );
        bindings["colors.1"].value = "#333333";
        assert.deepEqual(config.value.colors, ["#111111", "#333333"]);
        config.value = { colors: ["#444444", "#555555"] };
        await nextTick();
        assert.equal(bindings["colors.1"].value, "#555555");
        assert.ok(Array.isArray(config.value.colors));
    } finally {
        scope.stop();
    }
});
