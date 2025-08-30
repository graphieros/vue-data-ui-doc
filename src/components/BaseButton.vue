<script setup>
import { ref } from "vue";
const props = defineProps({
    callback: Function,
    text: String,
    colorClasses: {
        type: String,
        default: "bg-gradient-to-br from-app-green to-app-blue text-white dark:text-black hover:from-app-blue hover:to-app-green"
    }
})

const btn = ref(null)

const isClicked = ref(false);

function btnClick(e) {
    isClicked.value = true;
    props.callback();
    setTimeout(() => {
        isClicked.value = false;
    }, 200)
}

</script>

<template>
    <button ref="btn" @click="btnClick" :class="`${isClicked ? 'clicked' : ''} overflow-hidden relative flex gap-1  py-3 px-5 rounded-md  font-inter-medium hover:shadow-xl transition-all ${colorClasses}`">
        <slot name="icon"/>
        {{ text }}
    </button>
</template>

<style scoped>
.clicked {
    animation: clicked 200ms ease-in-out;
}
@keyframes clicked {
    0% {
        transform: scale(0.95,0.95);
    }
    70% {
        transform: scale(1.03, 1.03);
    }
    80% {
        transform: scale(0.97, 0.97);
    }
    90% {
        transform: scale(1.01, 1.01);
    }
    100% {
        transform:  scale(1,1)
    }
}
</style>