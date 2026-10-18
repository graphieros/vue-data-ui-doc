import test from "node:test";
import assert from "node:assert/strict";
import { computed, ref, effectScope, nextTick } from "vue";
import { useDocConfigState } from "../src/useDocConfigState.js";
import { useDocConfigBindings } from "../src/useDocConfigBindings.js";

function fixture() {
    const isDarkMode = ref(false);
    const type = ref("line");
    const callback = () => "callback";
    const state = useDocConfigState(isDarkMode);
    const config = computed({
        get: () =>
            state.get({
                type: type.value,
                chart: {
                    color: isDarkMode.value ? "black" : "white",
                    height: 300,
                },
                values: [1, 2],
                callback,
            }),
        set: state.set,
    });
    return { config, state, isDarkMode, type, callback };
}

test("one computed config preserves nested edits separately across theme changes", () => {
    const { config, isDarkMode } = fixture();
    config.value.chart.height = 400;
    config.value.chart.color = "custom light";
    config.value.values.push(3);
    isDarkMode.value = true;
    assert.equal(config.value.chart.color, "black");
    assert.equal(config.value.chart.height, 300);
    config.value.chart.height = 500;
    isDarkMode.value = false;
    assert.equal(config.value.chart.color, "custom light");
    assert.equal(config.value.chart.height, 400);
    assert.deepEqual(config.value.values, [1, 2, 3]);
    isDarkMode.value = true;
    assert.equal(config.value.chart.height, 500);
});

test("computed setters work before reading and root replacement remains editable", () => {
    const { config, isDarkMode } = fixture();
    config.value = { chart: { height: 900 }, values: [] };
    assert.equal(config.value.chart.height, 900);
    config.value.chart.height = 950;
    assert.equal(config.value.chart.height, 950);
    isDarkMode.value = true;
    config.value = { chart: { color: "replacement" } };
    assert.equal(config.value.chart.color, "replacement");
});

test("reactive preset changes update defaults while preserving edits and callbacks", () => {
    const { config, type, callback } = fixture();
    config.value.chart.height = 500;
    type.value = "bar";
    assert.equal(config.value.type, "bar");
    assert.equal(config.value.chart.height, 500);
    assert.equal(config.value.callback, callback);
    assert.equal(config.value.callback(), "callback");
});

test("full reset restores both themes from the current computed preset", () => {
    const { config, state, isDarkMode, type } = fixture();
    config.value.chart.height = 800;
    isDarkMode.value = true;
    config.value.chart.height = 900;
    type.value = "plot";
    state.reset();
    assert.equal(config.value.chart.height, 300);
    assert.equal(config.value.type, "plot");
    assert.equal(config.value.chart.color, "black");
    isDarkMode.value = false;
    assert.equal(config.value.chart.height, 300);
    assert.equal(config.value.type, "plot");
    assert.equal(config.value.chart.color, "white");
});

test("object bindings remain live across themes, dependency changes, setters and reset", async () => {
    const scope = effectScope();
    const { config, state, isDarkMode, type } = fixture();
    try {
        const bindings = scope.run(() =>
            useDocConfigBindings(
                config,
                ["chart.height", "chart.color", "type"],
                { defaults: {} },
            ),
        );
        bindings["chart.height"].value = 600;
        isDarkMode.value = true;
        await nextTick();
        assert.equal(bindings["chart.color"].value, "black");
        type.value = "bar";
        await nextTick();
        assert.equal(bindings.type.value, "bar");
        assert.equal(bindings["chart.height"].value, 300);
        config.value = {
            chart: { height: 700, color: "replacement" },
            type: "plot",
        };
        await nextTick();
        assert.equal(bindings["chart.height"].value, 700);
        state.reset();
        await nextTick();
        assert.equal(bindings["chart.height"].value, 300);
        isDarkMode.value = false;
        await nextTick();
        assert.equal(bindings["chart.height"].value, 300);
    } finally {
        scope.stop();
    }
});

test("component docs expose one writable computed config without legacy aliases", async () => {
    const fs = await import("node:fs");
    const ts = (await import("typescript")).default;
    const folder = new URL("../src/components/docs/", import.meta.url);
    let count = 0;
    for (const file of fs
        .readdirSync(folder)
        .filter((file) => /^(?:Doc|Docs)VueUi.*\.vue$/.test(file))) {
        const source = fs.readFileSync(new URL(file, folder), "utf8");
        const script = source.slice(
            source.indexOf("<script setup") +
                source.slice(source.indexOf("<script setup")).indexOf(">") +
                1,
            source.indexOf("</script>"),
        );
        const ast = ts.createSourceFile(
            file,
            script,
            ts.ScriptTarget.Latest,
            true,
        );
        const variables = ast.statements
            .filter(ts.isVariableStatement)
            .flatMap((statement) => [
                ...statement.declarationList.declarations,
            ]);
        const config = variables.find(
            (variable) => variable.name.getText(ast) === "config",
        );
        if (!config) continue;
        count++;
        assert.ok(
            !variables.some((variable) =>
                [
                    "darkModeConfig",
                    "mutableConfig",
                    "mutableConfigDarkMode",
                ].includes(variable.name.getText(ast)),
            ),
            file,
        );
        assert.equal(
            config.initializer.expression.getText(ast),
            "computed",
            file,
        );
        const options = config.initializer.arguments[0];
        assert.ok(ts.isObjectLiteralExpression(options), file);
        assert.deepEqual(
            options.properties.map((property) => property.name.getText(ast)),
            ["get", "set"],
            file,
        );
    }
    assert.equal(count, 68);
});

test("Skeleton follows its selected type in either theme", async () => {
    const fs = await import("node:fs");
    const { evaluatePage } = await import("./helpers/doc-page-fixture.js");
    const source = fs.readFileSync(
        new URL("../src/components/docs/DocVueUiSkeleton.vue", import.meta.url),
        "utf8",
    );
    for (const dark of [false, true]) {
        const fixture = evaluatePage(source, dark);
        const config = fixture.get("config");
        const type = fixture.get("type");
        assert.equal(config.value.type, type.value);
        type.value = "bar";
        assert.equal(config.value.type, "bar");
        config.value.style.animated = false;
        type.value = "line";
        assert.equal(config.value.type, "line");
        assert.equal(config.value.style.animated, false);
    }
});
