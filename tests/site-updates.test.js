import { test } from "node:test";
import assert from "node:assert/strict";
import {
    installUpdateChecks,
    updateAvailable,
    recoverChunk,
    chunkFailure,
    reloadPage,
} from "../src/navigation/siteUpdates.js";
import { createChunkRecovery } from "../src/navigation/chunkRecovery.js";
const tick = () => new Promise((resolve) => setImmediate(resolve));
test("resume checks are throttled, tolerate offline errors and remove listeners", async () => {
    const win = new EventTarget();
    win.navigator = { onLine: true };
    const doc = new EventTarget();
    doc.visibilityState = "visible";
    let time = 0,
        requests = 0;
    const stop = installUpdateChecks({
        window: win,
        document: doc,
        now: () => time,
        currentBuild: "a",
        fetch: async () => {
            requests++;
            if (requests === 1) throw Error("offline");
            return { ok: true, json: async () => ({ id: "b" }) };
        },
    });
    await tick();
    assert.equal(updateAvailable.value, false);
    doc.dispatchEvent(new Event("visibilitychange"));
    assert.equal(requests, 1);
    time = 60_001;
    doc.dispatchEvent(new Event("visibilitychange"));
    await tick();
    assert.equal(updateAvailable.value, true);
    stop();
    time *= 2;
    win.dispatchEvent(new Event("pageshow"));
    assert.equal(requests, 2);
});
test("automatic recovery is limited across page loads and unavailable storage", () => {
    const original = globalThis.sessionStorage;
    let saved = null,
        reloads = 0,
        failures = 0;
    globalThis.sessionStorage = {
        getItem: () => saved,
        setItem: (_key, value) => {
            saved = value;
        },
    };
    const options = {
        now: () => 1000,
        reload: () => reloads++,
        failed: () => failures++,
    };
    const error = new Error("Failed to fetch dynamically imported module");
    try {
        createChunkRecovery(options)(error, "/docs");
        createChunkRecovery(options)(error, "/docs");
        assert.equal(reloads, 1);
        assert.equal(failures, 1);
        globalThis.sessionStorage = {
            getItem() {
                throw Error();
            },
            setItem() {
                throw Error();
            },
        };
        createChunkRecovery(options)(error, "/docs");
        assert.equal(reloads, 1);
        assert.equal(failures, 2);
    } finally {
        globalThis.sessionStorage = original;
    }
});
test("builder recovery keeps editor mounted and requires confirmation before reloading", () => {
    const oldWindow = globalThis.window,
        oldStorage = globalThis.sessionStorage;
    let navigations = 0;
    globalThis.window = {
        location: {
            pathname: "/chart-builder",
            href: "/chart-builder",
            assign: () => navigations++,
        },
        confirm: () => false,
    };
    globalThis.sessionStorage = { getItem: () => null, setItem() {} };
    try {
        recoverChunk(
            new Error("Failed to fetch dynamically imported module"),
            "/docs",
        );
        assert.equal(chunkFailure.value, "/docs");
        assert.equal(navigations, 0);
        reloadPage("/docs");
        assert.equal(navigations, 0);
    } finally {
        globalThis.window = oldWindow;
        globalThis.sessionStorage = oldStorage;
    }
});
test("manual reload bypasses cached HTML and preserves the route, query and anchor", () => {
    const original = globalThis.window;
    const navigations = [];
    globalThis.window = {
        location: {
            pathname: "/docs",
            href: "https://example.com/docs?lang=fr&_vdu_update=old#config",
            assign: (target) => navigations.push(target),
        },
    };
    try {
        reloadPage();
        const url = new URL(navigations[0]);
        assert.equal(url.pathname, "/docs");
        assert.equal(url.searchParams.get("lang"), "fr");
        assert.equal(url.hash, "#config");
        assert.match(url.searchParams.get("_vdu_update"), /^\d+$/);
        assert.equal(url.searchParams.getAll("_vdu_update").length, 1);

        reloadPage("/other?lang=en#example");
        const target = new URL(navigations[1]);
        assert.equal(target.pathname, "/other");
        assert.equal(target.searchParams.get("lang"), "en");
        assert.equal(target.hash, "#example");
        assert.ok(target.searchParams.has("_vdu_update"));
    } finally {
        globalThis.window = original;
    }
});

test("docs select the same content after an update reload adds a query", async () => {
    const { readFile } = await import("node:fs/promises");
    const { createRouter, createMemoryHistory } = await import("vue-router");
    const { parse } = await import("@vue/compiler-dom");
    const source = await readFile(
        new URL("../src/views/Docs.vue", import.meta.url),
        "utf8",
    );
    assert.match(
        source,
        /const docPath = computed\(\s*\(\) => router\.currentRoute\.value\.path \+ router\.currentRoute\.value\.hash,?\s*\)/,
    );
    const template = source.match(/<template>([\s\S]*)<\/template>/)[1];
    const ast = parse(template);
    const nodes = [];
    function visit(node) {
        if (node.type === 1) nodes.push(node);
        for (const child of node.children || []) visit(child);
    }
    visit(ast);
    const treemap = nodes.find((node) => node.tag === "DocVueUiTreemap");
    const condition = treemap.props.find((prop) => prop.name === "if").exp
        .content;
    const matches = new Function("docPath", `return (${condition})`);
    const router = createRouter({
        history: createMemoryHistory(),
        routes: [{ path: "/docs", component: {} }],
    });
    for (const url of [
        "/docs#vue-ui-treemap",
        "/docs?_vdu_update=1795324974883#vue-ui-treemap",
        "/docs?lang=fr#vue-ui-treemap",
    ]) {
        const route = router.resolve(url);
        assert.equal(matches(route.path + route.hash), true, url);
    }
    const other = router.resolve("/docs?_vdu_update=1#vue-ui-donut");
    assert.equal(matches(other.path + other.hash), false);
});

test("update query does not hide customization sections or change route highlighting", async () => {
    const { readFile } = await import("node:fs/promises");
    const { createRouter, createMemoryHistory } = await import("vue-router");
    const { parse } = await import("@vue/compiler-dom");
    const read = (file) =>
        readFile(new URL(`../${file}`, import.meta.url), "utf8");
    const customization = await read("src/views/Customization.vue");
    const pathAndHash =
        /return router\.currentRoute\.value\.path \+ router\.currentRoute\.value\.hash/;
    assert.match(customization, pathAndHash);
    const ast = parse(
        customization.match(/<template>([\s\S]*)<\/template>/)[1],
    );
    const nodes = [];
    function visit(node) {
        if (node.type === 1) nodes.push(node);
        for (const child of node.children || []) visit(child);
    }
    visit(ast);
    const router = createRouter({
        history: createMemoryHistory(),
        routes: [{ path: "/customization", component: {} }],
    });
    for (const [tag, hash] of [
        ["QuickCustomTheme", ""],
        ["SvgSlot", "#svg-slot"],
        ["ColorPalette", "#palette"],
        ["Patterns", "#patterns"],
    ]) {
        const node = nodes.find((item) => item.tag === tag);
        const condition = node.props.find((prop) => prop.name === "if").exp
            .content;
        const matches = new Function("currentRoute", `return (${condition})`);
        for (const query of ["", "?_vdu_update=123"]) {
            const route = router.resolve(`/customization${query}${hash}`);
            assert.equal(
                matches(route.path + route.hash),
                true,
                `${tag} ${query}`,
            );
        }
    }
    for (const file of [
        "src/components/SideMenu.vue",
        "src/components/SideMenuItem.vue",
    ]) {
        const source = await read(file);
        assert.match(source, pathAndHash, file);
        assert.doesNotMatch(source, /currentRoute\.value\.fullPath/, file);
    }
    const header = await read("src/components/Header.vue");
    assert.doesNotMatch(header, /currentRoute\.value\.fullPath/);
    const app = await read("src/App.vue");
    assert.match(app, /return router\.currentRoute\.value\.path;/);
});
