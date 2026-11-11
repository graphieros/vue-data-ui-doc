import { readStorage, writeStorage } from "../storage.js";

const key = "vdu:chunk-recovery";
const retryWindow = 60_000;

export function isChunkLoadError(error) {
    return /Loading chunk \d+ failed|ChunkLoadError|Failed to fetch dynamically imported module|Failed to load module script|Importing a module script failed|Unable to preload CSS/i.test(
        error?.message || "",
    );
}

export function createChunkRecovery({ reload, failed, now = Date.now }) {
    let attempted = false;
    return (error, target) => {
        if (!isChunkLoadError(error)) return;
        const previous = Number(readStorage(key, "0", "sessionStorage"));
        const time = now();
        // Without persistent storage a reload cannot be bounded across page loads.
        if (
            attempted ||
            (previous > 0 && time - previous < retryWindow) ||
            !writeStorage(key, String(time), "sessionStorage")
        ) {
            failed(error, target);
            return;
        }
        attempted = true;
        reload(target);
    };
}
