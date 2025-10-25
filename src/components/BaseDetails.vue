<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from "vue";
import { useMainStore } from "../stores";
import useAttrMapping from "../useAttrMapping";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const props = defineProps({
    attr: { type: String, default: "" },
    level: { type: [Number, String], default: "" },
    equal: { type: Boolean, default: false },
    title: { type: String, default: "" },
    indent: { type: Boolean, default: false },
    brackets: { type: Boolean, default: false },
});

const det = ref(null);
const panel = ref(null);
const inner = ref(null);
const isOpen = ref(false);
const isSelected = ref(false);

const translatedAttr = computed(() => useAttrMapping(props.attr));

let onToggle;

function setHeight(px) {
    const el = panel.value;
    if (!el) return;
    el.style.height = typeof px === "number" ? `${px}px` : px;
}

function measureContentHeight() {
    const content = inner.value;
    if (!content) return 0;
    return content.scrollHeight;
}

async function openWithAnimation() {
    await nextTick();
    const el = panel.value;
    if (!el) return;
    el.style.transition = "none";
    setHeight(0);
    el.offsetHeight;
    const end = measureContentHeight();
    el.style.transition = "height 240ms ease";
    setHeight(end);

    const onEnd = (e) => {
        if (e.propertyName !== "height") return;
        el.removeEventListener("transitionend", onEnd);
        el.style.transition = "none";
        setHeight("auto");
    };
    el.addEventListener("transitionend", onEnd);
}

function closeWithAnimation() {
    const el = panel.value;
    if (!el || !det.value) return;
    const current = el.style.height === "auto" || !el.style.height
        ? measureContentHeight()
        : el.offsetHeight;
    el.style.transition = "none";
    setHeight(current);
    el.offsetHeight;
    el.style.transition = "height 240ms ease";
    setHeight(0);

    const onEnd = (e) => {
        if (e.propertyName !== "height") return;
        el.removeEventListener("transitionend", onEnd);
        det.value.open = false;
        el.style.transition = "none";
        setHeight(0);
        isOpen.value = false;
    };
    el.addEventListener("transitionend", onEnd);
}

function onSummaryClick(e) {
    if (det.value?.open) {
        e.preventDefault();
        closeWithAnimation();
    }
}

onMounted(() => {
    if (!det.value || !panel.value) return;

    isOpen.value = !!det.value.open;
    panel.value.style.overflow = "hidden";
    panel.value.style.height = det.value.open ? "auto" : "0px";

    onToggle = async () => {
        isOpen.value = !!det.value.open;
        if (isOpen.value) {
            await openWithAnimation();
        }
    };

    det.value.addEventListener("toggle", onToggle);
});

onBeforeUnmount(() => {
    det.value?.removeEventListener("toggle", onToggle);
});
</script>

<template>
    <div :class="`relative mt-2 ${indent ? 'ml-6' : ''}`">
        <details ref="det" :style="level ? `margin-left:0px` : ''"
            :class="`border-l ${isSelected ? 'border-app-blue dark:border-app-green' : 'border-gray-500'} rounded-md pl-2 bg-[#1A1A1A05] dark:bg-[#FFFFFF05] mb-2 shadow`">
            <summary @click="onSummaryClick" @mouseenter="isSelected = true" @mouseout="isSelected = false"
                class="cursor-pointer -ml-2 pl-2 font-black hover:bg-[#5f8aee20] dark:hover:bg-[#42d39220] transition-colors">
                {{ attr }}
                <i class="text-gray-500" v-if="translatedAttr">({{ translatedAttr }})</i>
                {{ equal ? "=" : ":" }}
                {{ isOpen ? (brackets ? "[" : "{") : (brackets ? "[ ... ]" : "{ ... }") }}
            </summary>

            <div ref="panel" class="details-panel">
                <div ref="inner" class="details-inner">
                    <code class="pl-6 flex flex-col mt-1">
                        <slot />
                    </code>
                    <span v-if="isOpen">{{ brackets ? "]" : "}" }}</span>
                </div>
            </div>
        </details>

        <Transition name="fade">
            <div v-if="isSelected && title"
                class="text-black dark:text-gray-300 hidden sm:flex -top-12 left-0 place-items-center justify-center absolute z-10 bg-white shadow-xl dark:bg-black-100 text-xs text-left p-2 rounded border-2 border-black dark:border-app-green">
                {{ title }}
                <svg v-if="isOpen" class="absolute -left-4 top-1/2" viewBox="0 0 64 64" height="50" width="50" style="overflow:visible; pointer-events: none;">
                    <path v-if="isDarkMode" d="M 17,0 0,0 0,53.5 17,53.5" stroke="#42d392" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <path v-else d="M 17,0 0,0 0,53.5 17,53.5" stroke="#1A1A1A" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
                <svg v-else class="absolute -left-4 top-1/2" viewBox="0 0 64 64" height="50" width="50" style="overflow:visible; pointer-events: none;">
                    <g v-if="isDarkMode">
                        <path d="M 17,0 0,0 0,10" stroke="#42d392" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        <circle cx="0" cy="20" fill="#42d392" r="2"/>
                        <circle cx="0" cy="28" fill="#42d392" r="2"/>
                        <circle cx="0" cy="36" fill="#42d392" r="2"/>
                        <path d="M 0,45 0,53.5 17,53.5" stroke="#42d392" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </g>
                    <g v-else>
                        <path d="M 17,0 0,0 0,10" stroke="#1A1A1A" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        <circle cx="0" cy="20" fill="#1A1A1A" r="2"/>
                        <circle cx="0" cy="28" fill="#1A1A1A" r="2"/>
                        <circle cx="0" cy="36" fill="#1A1A1A" r="2"/>
                        <path d="M 0,45 0,53.5 17,53.5" stroke="#1A1A1A" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </g>
                </svg>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.details-panel {
    overflow: hidden;
    height: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
