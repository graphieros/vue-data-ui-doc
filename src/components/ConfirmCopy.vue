<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useMainStore } from "../stores";
import { copyFeedbacks } from "../clipboard.js";
import { navigationMessage } from "../navigation/messages.js";
import CopyFeedbackMessage from "./CopyFeedbackMessage.vue";

const store = useMainStore();
const viewport = ref({
    width: document.documentElement.clientWidth,
    height: window.innerHeight,
});
const positions = computed(() => {
    return copyFeedbacks.map((entry) => {
        const rect = entry.target?.isConnected
            ? entry.target.getBoundingClientRect()
            : null;
        const { width, height } = viewport.value;
        const half = Math.min(180, width - 16) / 2;
        return {
            ...entry,
            x: Math.max(
                half + 8,
                Math.min(
                    width - half - 8,
                    rect ? rect.left + rect.width / 2 : width / 2,
                ),
            ),
            y: Math.min(height - 8, Math.max(72, rect ? rect.top - 4 : 88)),
        };
    });
});
function refreshPosition() {
    viewport.value = {
        width: document.documentElement.clientWidth,
        height: window.innerHeight,
    };
}
function openPopover(element) {
    if (!element) return;
    // Native popovers stay above modal dialogs without moving focus or adding layout wrappers.
    try {
        element.showPopover?.();
    } catch {
        element.removeAttribute("popover");
    }
}
onMounted(() => {
    window.addEventListener("scroll", refreshPosition, {
        capture: true,
        passive: true,
    });
    window.addEventListener("resize", refreshPosition);
});
onBeforeUnmount(() => {
    window.removeEventListener("scroll", refreshPosition, true);
    window.removeEventListener("resize", refreshPosition);
});
</script>
<template>
    <Teleport to="body">
        <div
            v-for="entry in positions"
            :key="entry.id"
            :ref="openPopover"
            popover="manual"
            role="status"
            aria-atomic="true"
            class="copy-feedback-anchor"
            data-testid="copy-feedback"
            :style="{ left: `${entry.x}px`, top: `${entry.y}px` }"
        >
            <CopyFeedbackMessage
                :message="
                    entry.error
                        ? navigationMessage('copyFailed', store.lang)
                        : store.translations.clipboard[store.lang]
                "
                :error="entry.error"
                :dark="store.isDarkMode"
            />
        </div>
    </Teleport>
</template>
<style scoped>
.copy-feedback-anchor {
    position: fixed;
    inset: auto;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    overflow: visible;
    width: max-content;
    max-width: min(180px, calc(100vw - 16px));
    transform: translate(-50%, -100%);
    z-index: 10000000;
    pointer-events: none;
}
</style>
