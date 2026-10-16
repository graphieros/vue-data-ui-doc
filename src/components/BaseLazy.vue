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
    threshold: {
        type: [Number, Array],
        default() {
            return 0;
        },
    },
    once: { type: Boolean, default: false },
    root: { type: [String, Object], default: null },
    tag: { type: String, default: "div" },
    enabled: { type: Boolean, default: true },
    visibleRatioEnter: { type: Number, default: 0 },
    visibleRatioExit: { type: Number, default: 0.0 },
    leaveDelay: { type: Number, default: 50 },
});

const emit = defineEmits(["enter", "leave", "load", "change"]);

const hostEl = ref(null);
const isVisible = ref(false);
let observer = null;
let hasLoadedOnce = false;
let leaveTimer = null;

const resolvedRoot = computed(() => {
    if (typeof document === "undefined" || !props.root) return null;
    if (typeof props.root !== "string") {
        return props.root instanceof Element ? props.root : null;
    }
    try {
        const el = document.querySelector(props.root);
        return el instanceof Element ? el : null;
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
    if (props.once && hasLoadedOnce) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
        reveal();
        return;
    }
    if (!hostEl.value) return;

    destroyObserver();

    const thresholds = [
        0,
        ...(Array.isArray(props.threshold)
            ? props.threshold
            : [props.threshold]),
        props.visibleRatioEnter,
        props.visibleRatioExit,
    ].filter((value) => Number.isFinite(value) && value >= 0 && value <= 1);

    observer = new IntersectionObserver(
        ([entry]) => {
            if (!entry) return;
            const ratio = entry.intersectionRatio;

            if (entry.isIntersecting) clearLeaveTimer();

            if (entry.isIntersecting && ratio >= props.visibleRatioEnter) {
                handleEnter();
            } else if (
                !entry.isIntersecting ||
                ratio <= props.visibleRatioExit
            ) {
                handleLeave();
            }
        },
        {
            root: resolvedRoot.value,
            rootMargin: props.bounds,
            threshold: [...new Set(thresholds)].sort((a, b) => a - b),
        },
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
        props.leaveDelay,
    ],
    ([, , , enabled]) => {
        if (!enabled) {
            destroyObserver();
            return;
        }
        createObserver();
    },
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
