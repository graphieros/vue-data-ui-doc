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
