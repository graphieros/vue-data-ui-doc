<template>
    <component :is="tag" ref="hostEl">
        <slot v-if="isVisible" />
        <slot v-else name="placeholder" />
    </component>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch, computed } from "vue";

const props = defineProps({
    bounds: { type: String, default: '500px' },
    threshold: { type: [Number, Array], default() { return 0 } },
    once: { type: Boolean, default: false },
    root: { type: [String, HTMLElement], default: null },
    tag: { type: String, default: 'div' },
    enabled: { type: Boolean, default: true }
});

const emit = defineEmits(['enter', 'leave', 'load', 'change'])

const hostEl = ref(null);
const isVisible = ref(false);
let observer = null;
let hasLoadedOnce = false;

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
            const visible = entry.isIntersecting;

            if (visible) {
                if (!hasLoadedOnce) {
                    reveal();
                    emit("load");
                    hasLoadedOnce = true;
                }
                emit("enter");
                if (props.once) {
                    destroyObserver();
                }
            } else {
                emit("leave");
            }

            isVisible.value = visible;
            emit("change", visible);
        },
        {
            root: resolvedRoot.value,
            rootMargin: props.bounds,
            threshold: props.threshold,
        }
    );

    observer.observe(hostEl.value);
}

function destroyObserver() {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}

function reveal() {
    isVisible.value = true;
}

onMounted(() => {
    if (props.enabled) createObserver();
});

onBeforeUnmount(() => {
    destroyObserver();
});

watch(
    () => [props.bounds, props.threshold, props.root, props.enabled],
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
