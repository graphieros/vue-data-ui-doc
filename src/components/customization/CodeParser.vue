<script setup>
import { computed, watch, ref } from 'vue';
import { VueHiCode } from "vue-hi-code";
import "vue-hi-code/style.css"
import { useMainStore } from '../../stores';

const props = defineProps({
    content: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: ''
    },
    withCopy: {
        type: Boolean,
        default: true
    },
    noPointerEvents: {
        type: Boolean,
        default: false
    },
    borderRadius: {
        type: String,
        default: '0.3rem'
    },
    fontSize: {
        type: String,
        default: '0.8rem'
    },
    lineHeight: {
        type: String,
        default: '1.4rem'
    }
});

const emit = defineEmits(['copy']);

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);
const step = ref(0);

const config = computed(() => {
    return {
        withLineNumbers: false,
        fontSize: props.fontSize,
        lineHeight: props.lineHeight,
        title: props.title,
        withCopy: props.withCopy,
        borderRadius: props.borderRadius,
        backgroundColor: isDarkMode.value ? '#FFFFFF10' : '#2A2A2A'
    }
});

watch(() => isDarkMode.value, () => {
    step.value += 1
})
</script>

<template>
    <div class="relative flex flex-row w-full place-items-center" :style="{
        pointerEvents: noPointerEvents ? 'none' : 'all'
    }">
        <slot name="color"/>
        <VueHiCode
            :key="step"
            class="w-full"
            :content="content" 
            :language="language" 
            v-bind="config" 
            @copy="emit('copy')"
        />
    </div>
</template>