import { ref } from "vue";
import { createChunkRecovery, isChunkLoadError } from "./chunkRecovery.js";
export const updateAvailable = ref(false);
export const chunkFailure = ref(null);
const buildId =
    typeof __BUILD_ID__ === "undefined" ? "development" : __BUILD_ID__;
function builderOpen() {
    return /^\/chart-builder(?:2)?\/?$/.test(window.location.pathname);
}
export function reloadPage(target = window.location.href) {
    if (
        builderOpen() &&
        !window.confirm(
            "Reload the chart builder? Export any work you need first. Unsaved edits and shared drafts may be lost.",
        )
    )
        return;
    const url = new URL(target, window.location.href);
    url.searchParams.set("_vdu_update", String(Date.now()));
    window.location.assign(url.href);
}
const recover = createChunkRecovery({
    reload: (target) => {
        if (builderOpen()) chunkFailure.value = target;
        else window.location.assign(target);
    },
    failed: (_error, target) => {
        chunkFailure.value = target;
    },
});
export function recoverChunk(error, target = window.location.href) {
    recover(error, target);
}
export function installUpdateChecks({
    window: win = window,
    document: doc = document,
    fetch: request = fetch,
    now = Date.now,
    currentBuild = buildId,
} = {}) {
    let lastCheck = -Infinity,
        pending = false,
        disposed = false;
    async function check() {
        if (
            doc.visibilityState === "hidden" ||
            win.navigator.onLine === false ||
            pending ||
            now() - lastCheck < 60_000 ||
            currentBuild === "development"
        )
            return;
        lastCheck = now();
        pending = true;
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 10_000);
        try {
            const response = await request("/version.json", {
                cache: "no-store",
                signal: controller.signal,
            });
            if (!response.ok) return;
            const version = await response.json();
            if (
                !disposed &&
                typeof version?.id === "string" &&
                version.id !== currentBuild
            )
                updateAvailable.value = true;
        } catch {
            /* Keep the current page usable offline. */
        } finally {
            clearTimeout(timer);
            pending = false;
        }
    }
    function preloadError(event) {
        if (!isChunkLoadError(event.payload)) return;
        event.preventDefault();
        recoverChunk(event.payload);
    }
    doc.addEventListener("visibilitychange", check);
    for (const name of ["pageshow", "online"])
        win.addEventListener(name, check);
    win.addEventListener("vite:preloadError", preloadError);
    void check();
    return () => {
        disposed = true;
        doc.removeEventListener("visibilitychange", check);
        for (const name of ["pageshow", "online"])
            win.removeEventListener(name, check);
        win.removeEventListener("vite:preloadError", preloadError);
    };
}
