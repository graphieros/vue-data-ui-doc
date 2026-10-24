import { onScopeDispose } from "vue";

// One timer per live example, disposed with its category and paused in hidden tabs.
export function useExampleTicker(interval = 250) {
    let callback;
    let timer;
    let disposed = false;
    function stop() {
        clearTimeout(timer);
        timer = undefined;
    }
    function tick() {
        stop();
        if (
            disposed ||
            !callback ||
            (typeof document !== "undefined" && document.hidden)
        )
            return;
        callback();
        timer = setTimeout(tick, interval);
    }
    function visibilityChanged() {
        if (document.hidden) stop();
        else if (callback && timer === undefined) tick();
    }
    if (typeof document !== "undefined")
        document.addEventListener("visibilitychange", visibilityChanged);
    onScopeDispose(() => {
        disposed = true;
        stop();
        if (typeof document !== "undefined")
            document.removeEventListener("visibilitychange", visibilityChanged);
    });
    return {
        start(update) {
            const first = !callback;
            callback = update;
            if (first) tick();
        },
    };
}
