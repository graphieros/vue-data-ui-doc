<script setup>
import {
    ref,
    onMounted,
    onBeforeUnmount,
    nextTick,
    useAttrs,
    computed,
} from "vue";

defineProps({
    fadeColor: {
        type: String,
        default: "#ffffff",
    },
});

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();

const scrollingContainerElement = ref(null);
const showTopFade = ref(false);
const showBottomFade = ref(false);

const userClasses = computed(() => attrs.class || "");

function updateFadeVisibility() {
    const element = scrollingContainerElement.value;
    if (!element) return;

    const scrollPosition = element.scrollTop;
    const visibleHeight = element.clientHeight;
    const fullHeight = element.scrollHeight;

    showTopFade.value = scrollPosition > 0;
    showBottomFade.value = scrollPosition + visibleHeight < fullHeight - 1;
}

function handleScroll() {
    updateFadeVisibility();
}

function handleResize() {
    updateFadeVisibility();
}

onMounted(async () => {
    await nextTick();
    updateFadeVisibility();
    window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
});
</script>

<template>
    <div class="scrollable-fade-wrapper" :style="{ '--scrollable-fade-background-color': fadeColor }">
        <div ref="scrollingContainerElement" class="scrollable-fade-wrapper__content" :class="userClasses"
            @scroll="handleScroll">
            <slot />
        </div>
        <Transition name="fade">
            <div v-if="showTopFade" class="scrollable-fade-wrapper__fade scrollable-fade-wrapper__fade--top"></div>
        </Transition>
        <Transition name="fade">
            <div v-if="showBottomFade" class="scrollable-fade-wrapper__fade scrollable-fade-wrapper__fade--bottom"></div>
        </Transition>
    </div>
</template>

<style scoped>
.scrollable-fade-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.scrollable-fade-wrapper__content {
    width: 100%;
    height: 100%;
}

.scrollable-fade-wrapper__fade {
    position: absolute;
    left: 0;
    right: 0;
    pointer-events: none;
    --fade-background-color: var(--scrollable-fade-background-color);
}

.scrollable-fade-wrapper__fade--top {
    top: 0;
    height: 2.5rem;
    background: linear-gradient(to bottom, var(--fade-background-color) 0%, transparent 100%);
}

.scrollable-fade-wrapper__fade--bottom {
    bottom: 0;
    height: 2.5rem;
    background: linear-gradient(to top, var(--fade-background-color) 0%, transparent 100%);
}
</style>
