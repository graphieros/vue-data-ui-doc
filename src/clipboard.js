import { shallowReactive } from "vue";

export const copyFeedbacks = shallowReactive([]);
let lastTarget = null;
let nextId = 0;
let legacyHandled = false;
let legacyTimer;
const timers = new Map();

function handleLegacyNotification() {
    legacyHandled = true;
    clearTimeout(legacyTimer);
    legacyTimer = setTimeout(() => {
        legacyHandled = false;
    }, 0);
}
export function getCopyFeedbackTarget() {
    return lastTarget?.isConnected ? lastTarget : null;
}
export function installCopyFeedbackTracking(document) {
    function capture(event) {
        const element =
            event.target?.closest?.(
                "button, [role='button'], a, [data-copy-feedback-anchor]",
            ) || event.target;
        lastTarget = element?.getBoundingClientRect ? element : null;
    }
    document.addEventListener("click", capture, true);
    return () => {
        document.removeEventListener("click", capture, true);
        for (const timer of timers.values()) clearTimeout(timer);
        timers.clear();
        clearTimeout(legacyTimer);
        legacyHandled = false;
        lastTarget = null;
        copyFeedbacks.splice(0);
    };
}
function removeFeedback(id) {
    clearTimeout(timers.get(id));
    timers.delete(id);
    const index = copyFeedbacks.findIndex((entry) => entry.id === id);
    if (index >= 0) copyFeedbacks.splice(index, 1);
}
export function showCopyFeedback({
    target = getCopyFeedbackTarget(),
    error = false,
} = {}) {
    handleLegacyNotification();
    for (let index = copyFeedbacks.length - 1; index >= 0; index--) {
        if (copyFeedbacks[index].target === target)
            removeFeedback(copyFeedbacks[index].id);
    }
    const entry = { id: ++nextId, target, error };
    copyFeedbacks.push(entry);
    timers.set(
        entry.id,
        setTimeout(() => removeFeedback(entry.id), 2500),
    );
}
export function showLegacyCopyFeedback(target) {
    // Clipboard helpers report the actual result. Keep existing store.copy() callers
    // and code-renderer copy events, without displaying duplicate confirmations.
    if (!legacyHandled)
        showCopyFeedback({ target: target || getCopyFeedbackTarget() });
}
export async function writeClipboardText(
    text,
    target = getCopyFeedbackTarget(),
) {
    handleLegacyNotification();
    try {
        await navigator.clipboard.writeText(text);
        showCopyFeedback({ target });
    } catch (error) {
        showCopyFeedback({ target, error: true });
        throw error;
    }
}
export function copySelection(target = getCopyFeedbackTarget()) {
    handleLegacyNotification();
    try {
        const copied = document.execCommand("copy");
        showCopyFeedback({ target, error: !copied });
        return copied;
    } catch (error) {
        showCopyFeedback({ target, error: true });
        throw error;
    }
}
