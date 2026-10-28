import { computed, onScopeDispose, ref, watch } from "vue";

/** Config graph groups are node depths; stable depth order reveals parents first. */
export function useConfigTreePlayback(dataset, interval = 250) {
    const orderedNodes = computed(() =>
        [...dataset.value.nodes].sort((a, b) => a.group - b.group),
    );
    const status = ref("idle");
    const visibleCount = ref(0);
    let timer;

    function clearTimer() {
        if (timer !== undefined) clearInterval(timer);
        timer = undefined;
    }

    function reset() {
        clearTimer();
        visibleCount.value = orderedNodes.value.length;
        status.value = "idle";
    }

    function play() {
        if (status.value === "playing" || !orderedNodes.value.length) return;
        if (
            status.value === "idle" ||
            visibleCount.value >= orderedNodes.value.length
        )
            visibleCount.value = 1;
        status.value = "playing";
        if (visibleCount.value >= orderedNodes.value.length) {
            status.value = "complete";
            return;
        }
        timer = setInterval(() => {
            const batchSize = 1 + Math.floor(Math.random() * 5);
            visibleCount.value = Math.min(
                visibleCount.value + batchSize,
                orderedNodes.value.length,
            );
            if (visibleCount.value >= orderedNodes.value.length) {
                clearTimer();
                status.value = "complete";
            }
        }, interval);
    }

    function pause() {
        if (status.value !== "playing") return;
        clearTimer();
        status.value = "paused";
    }

    function stop() {
        clearTimer();
        visibleCount.value = Math.min(1, orderedNodes.value.length);
        status.value = "stopped";
    }

    const visibleDataset = computed(() => {
        // Keep the original ordering when showing the complete graph.
        if (visibleCount.value >= orderedNodes.value.length)
            return dataset.value;
        const nodes = orderedNodes.value.slice(0, visibleCount.value);
        const ids = new Set(nodes.map((node) => node.id));
        return {
            nodes,
            links: dataset.value.links.filter(
                (link) => ids.has(link.source) && ids.has(link.target),
            ),
        };
    });

    watch(dataset, reset, { immediate: true, flush: "sync" });
    onScopeDispose(clearTimer);

    return { status, visibleCount, visibleDataset, play, pause, stop, reset };
}
