import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { parse, compileScript, compileTemplate } from "@vue/compiler-sfc";
import {
    createMainTranslations,
    applyMainTranslations,
} from "../src/i18n/merge-translations.js";
import { modelFromConfig } from "../src/components/builder2/config.js";

const directory = new URL("../src/i18n/main/", import.meta.url);
const english = JSON.parse(
    readFileSync(new URL("en.json", directory)),
).builder2;

test("builder translations cover every language and preserve interpolation parameters", () => {
    for (const filename of readdirSync(directory).filter((name) =>
        name.endsWith(".json"),
    )) {
        const locale = JSON.parse(
            readFileSync(new URL(filename, directory)),
        ).builder2;
        assert.deepEqual(
            Object.keys(locale).sort(),
            Object.keys(english).sort(),
            filename,
        );
        for (const [key, text] of Object.entries(locale)) {
            assert.ok(
                typeof text === "string" && text.trim(),
                `${filename}: ${key}`,
            );
            assert.deepEqual(
                text.match(/\{\w+\}/g)?.sort() ?? [],
                english[key].match(/\{\w+\}/g)?.sort() ?? [],
                `${filename}: ${key}`,
            );
        }
    }
});

test("builder templates compile and contain no untranslated prose or missing translation keys", () => {
    const files = [
        "src/views/Maker2.vue",
        "src/components/BaseColorInput.vue",
        ...readdirSync("src/components/builder2")
            .filter((name) => name.endsWith(".vue"))
            .map((name) => `src/components/builder2/${name}`),
    ];
    for (const filename of files) {
        const source = readFileSync(filename, "utf8");
        for (const [, key] of source.matchAll(/\bt\(['"](\w+)['"]/g))
            assert.ok(key in english, `${filename}: ${key}`);
        const { descriptor, errors } = parse(source);
        assert.deepEqual(errors, []);
        compileScript(descriptor, { id: filename });
        const compiled = compileTemplate({
            source: descriptor.template.content,
            filename,
            id: filename,
        });
        assert.deepEqual(compiled.errors, []);
        if (filename.includes("BaseColorInput")) continue;
        function visit(node) {
            if (node.type === 2)
                assert.ok(
                    !/[a-zA-Z]/.test(node.content),
                    `${filename}: ${node.content}`,
                );
            for (const child of node.children ?? []) visit(child);
        }
        visit(compiled.ast);
    }
});

test("builder feedback dictionaries retain both languages after a locale switch", () => {
    const target = createMainTranslations({ builder2: english }, "en");
    const french = JSON.parse(
        readFileSync(new URL("fr.json", directory)),
    ).builder2;
    const saved = target.builder2.saved;
    applyMainTranslations(
        target,
        createMainTranslations({ builder2: french }, "fr"),
    );
    assert.equal(saved, target.builder2.saved);
    assert.equal(saved.en, english.saved);
    assert.equal(saved.fr, french.saved);
});

test("configuration validation provides translation keys and parameters", () => {
    assert.throws(
        () => modelFromConfig([], []),
        (error) => error.translationKey === "configObject",
    );
    assert.throws(
        () => modelFromConfig({ count: "bad" }, [{ key: "count", def: 1 }]),
        (error) =>
            error.translationKey === "configType" &&
            error.translationParams.path === "count",
    );
    assert.throws(
        () => modelFromConfig({ "bad.key": true }, []),
        (error) =>
            error.translationKey === "unsupportedKey" &&
            error.translationParams.key === "bad.key",
    );
});
