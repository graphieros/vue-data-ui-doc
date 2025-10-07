<template>
    <component :is="tag" ref="hostEl">
        <slot v-if="isVisible" />
        <slot v-else name="placeholder" />
    </component>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch, computed } from "vue";

const props = defineProps({
    bounds: { type: String, default: "500px 0px" },
    threshold: { type: [Number, Array], default() { return 0 } },
    once: { type: Boolean, default: false },
    root: { type: [String, HTMLElement], default: null },
    tag: { type: String, default: "div" },
    enabled: { type: Boolean, default: true },
    visibleRatioEnter: { type: Number, default: 0.1 }, 
    visibleRatioExit: { type: Number, default: 0.0 },
    leaveDelay: { type: Number, default: 50 }
});

const emit = defineEmits(["enter", "leave", "load", "change"]);

const hostEl = ref(null);
const isVisible = ref(false);
let observer = null;
let hasLoadedOnce = false;
let leaveTimer = null;

const resolvedRoot = computed(() => {
    if (!props.root) return null;
    if (props.root instanceof HTMLElement) return props.root;
    try {
        const el = document.querySelector(props.root);
        return el instanceof HTMLElement ? el : null;
    } catch {
        return null;
    }
});

function clearLeaveTimer() {
    if (leaveTimer) {
        clearTimeout(leaveTimer);
        leaveTimer = null;
    }
}

function handleEnter() {
    clearLeaveTimer();
    const wasVisible = isVisible.value;
    if (!wasVisible) {
        isVisible.value = true;
        if (!hasLoadedOnce) {
            emit("load");
            hasLoadedOnce = true;
        }
        emit("enter");
        emit("change", true);
        if (props.once) destroyObserver();
    }
}

function handleLeave() {
    // Debounce to avoid flicker when right at the boundary
    clearLeaveTimer();
    leaveTimer = setTimeout(() => {
        leaveTimer = null;
        const wasVisible = isVisible.value;
        if (wasVisible) {
            isVisible.value = false;
            emit("leave");
            emit("change", false);
        }
    }, props.leaveDelay);
}

function createObserver() {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
        // SSR or unsupported: reveal immediately
        reveal();
        return;
    }
    if (!hostEl.value) return;

    destroyObserver();

    observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0];
            const ratio = entry.intersectionRatio ?? 0;
            if (ratio >= props.visibleRatioEnter) {
                handleEnter();
            } else if (ratio <= props.visibleRatioExit) {
                handleLeave();
            }
        },
        {
            root: resolvedRoot.value,
            rootMargin: props.bounds,
            threshold: Array.isArray(props.threshold)
                ? props.threshold
                :
                Array.from(
                    new Set(
                        [props.threshold, props.visibleRatioEnter, props.visibleRatioExit]
                            .flat()
                            .filter((v) => typeof v === "number")
                    )
                ).sort((a, b) => a - b)
        }
    );

    observer.observe(hostEl.value);
}

function destroyObserver() {
    clearLeaveTimer();
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}

function reveal() {
    clearLeaveTimer();
    isVisible.value = true;
}

onMounted(() => {
    if (props.enabled) createObserver();
});

onBeforeUnmount(() => {
    destroyObserver();
});

watch(
    () => [
        props.bounds,
        props.threshold,
        props.root,
        props.enabled,
        props.visibleRatioEnter,
        props.visibleRatioExit,
        props.leaveDelay
    ],
    ([, , , enabled]) => {
        if (!enabled) {
            destroyObserver();
            return;
        }
        createObserver();
    }
);

function refresh() {
    if (props.enabled) createObserver();
}

function revealNow() {
    destroyObserver();
    reveal();
}

defineExpose({ refresh, revealNow, isVisible });
</script>
