<script setup>
import { computed } from "vue";
import { useMainStore } from "../stores";

const props = defineProps({
    visible: { type: Boolean, default: true },
    duration: { type: Number, default: 250 },
    easing: { type: String, default: "ease" },
});

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const fadeStyle = computed(() => ({
    "--fade-duration": `${props.duration}ms`,
    "--fade-easing": props.easing,
    "z-index": "2147483640"
}));
</script>

<template>
    <Transition name="fade" appear>
        <div v-if="props.visible" class="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" :style="fadeStyle">
            <img class="loader-logo fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" alt="Vue Data UI logo"
                src="../assets/logo.png" width="80" height="80" />
            <span :class="{
                loader: true,
                'loader-dark': isDarkMode,
                'loader-light': !isDarkMode,
            }"></span>
        </div>
    </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity var(--fade-duration) var(--fade-easing);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.loader-dark,
.loader-light {
    border-top: 4px solid #5f8aee;
}

.loader {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: inline-block;
    border-right: 4px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

.loader::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border-bottom: 4px solid #42d392;
    border-left: 4px solid transparent;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.loader-logo {
    animation: loader-logo 1s infinite alternate-reverse;
}

@keyframes loader-logo {
    from {
        transform: translateX(-50%) translateY(-50%) scale(0.5);
    }

    to {
        transform: translateX(-50%) translateY(-50%) scale(1);
    }
}

@media (prefers-reduced-motion: reduce) {

    .loader,
    .loader-logo {
        animation: none;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: none;
    }
}
</style>
