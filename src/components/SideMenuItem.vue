<script setup>
import { computed, ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "../stores";

defineProps({
    itsRoute: {
        type: String,
        default: "404",
    },
    componentName: {
        type: String,
        default: "",
    },
    icon: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["close", "scrollToTop"]);

const router = useRouter();
const store = useMainStore();

const isDarkMode = computed(() => store.isDarkMode);

const currentRoute = computed(() => {
    return router.currentRoute.value.fullPath;
});

function isSelected(route) {
    return currentRoute.value === route;
}

function getIconColor(route) {
    if (isSelected(route)) {
        return isDarkMode.value ? "#83a4f2" : "#5f8aee";
    }
    return isDarkMode.value ? "rgb(156, 163, 175)" : "rgb(31, 41, 55)";
}

// Tooltip
const buttonRef = ref(null);
const isTooltipVisible = ref(false);
const tooltipPosition = ref({
    top: "0px",
    left: "0px",
});

function updateTooltipPosition() {
    if (!buttonRef.value) return;

    const rect = buttonRef.value.getBoundingClientRect();

    tooltipPosition.value = {
        top: `${rect.top + rect.height / 2}px`,
        left: `${rect.right + 12}px`,
    };
}

function showTooltip() {
    updateTooltipPosition();
    isTooltipVisible.value = true;

    // Capture scroll events from the sidebar as well.
    window.addEventListener("scroll", updateTooltipPosition, true);
    window.addEventListener("resize", updateTooltipPosition);
}

function hideTooltip() {
    isTooltipVisible.value = false;

    window.removeEventListener("scroll", updateTooltipPosition, true);
    window.removeEventListener("resize", updateTooltipPosition);
}

onBeforeUnmount(hideTooltip);
</script>

<template>
    <router-link
        :to="itsRoute"
        @click="
            emit('scrollToTop');
            hideTooltip();
        "
    >
        <button
            ref="buttonRef"
            :class="`
                w-full
                my-1 text-sm relative
                rounded-[12px]
                py-2
                ${
                    isSelected(itsRoute)
                        ? `shadow-[inset_0_1px_1px_#FFFFFF,0_2px_3px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1px_1px_#4A4A4A,0_2px_3px_rgba(0,0,0,0.5)] ${isDarkMode ? 'border-r-2 border-app-blue' : ''}`
                        : ''
                }
                ${
                    isSelected(itsRoute)
                        ? isDarkMode
                            ? 'bg-gradient-to-r from-[#5f8aee50] to-[#5f8aee20] shadow'
                            : 'bg-gray-100 shadow'
                        : ''
                }
                flex place-items-center transition-all
                ${isDarkMode ? 'hover:bg-[#3A3A3A]' : 'hover:bg-gray-100'}
                py-1 gap-1 pl-4
                ${
                    isSelected(itsRoute)
                        ? 'text-app-blue dark:text-app-green hover:cursor-default font-bold'
                        : ''
                }`"
            @click="emit('close')"
            @mouseenter="showTooltip"
            @mouseleave="hideTooltip"
            @focus="showTooltip"
            @blur="hideTooltip"
            @keydown.esc="hideTooltip"
        >
            <VueUiIcon
                :size="18"
                :name="icon"
                :stroke="getIconColor(itsRoute)"
            />

            <span
                v-if="
                    !['/docs#utility-functions', '/docs#composables'].includes(
                        itsRoute,
                    )
                "
                :class="`
                    text-gray-500
                    ${isDarkMode && isSelected(itsRoute) ? 'dark:text-app-blue-mid' : ''}
                `"
            >
                VueUi
            </span>

            <span
                :class="`
                    text-gray-800
                    dark:text-gray-300
                    ${isSelected(itsRoute) ? 'font-inter-medium' : ''}
                `"
            >
                {{ componentName }}
            </span>
        </button>
    </router-link>

    <Teleport
        to="body"
        v-if="isTooltipVisible && description && !isSelected(itsRoute)"
    >
        <div
            role="tooltip"
            :style="tooltipPosition"
            class="fixed z-[9999] -translate-y-1/2 pointer-events-none rounded-lg bg-gray-100 dark:bg-[#3A3A3A] text-gray-800 dark:text-gray-300 text-xs px-3 py-2 shadow-lg flex items-center gap-1 min-w-[120px] max-w-[250px]"
        >
            <span>{{ description }}</span>

            <span
                aria-hidden="true"
                class="absolute top-1/2 right-full -translate-y-1/2 border-[6px] border-transparent border-r-gray-100 dark:border-r-[#3A3A3A]"
            ></span>
        </div>
    </Teleport>
</template>

<style>
.is-item-selected {
    position: absolute;
    right: 2px;
    top: 0;
    height: 100%;
    width: 4px;
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.is-active {
    opacity: 1;
}
</style>
