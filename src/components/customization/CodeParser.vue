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
    },
    tw: {
        type: String,
        default: ''
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
        backgroundColor: isDarkMode.value ? 'rgb(32, 32, 32)' : '#FAF9F9',
        baseTextColor: isDarkMode.value ? '#CCCCCC' : '#2A2A2A',
        copyIconColor: isDarkMode.value ? '#CCCCCC' : '#3A3A3A',
        colorFunction: isDarkMode.value ? '#DCDCAA' : '#559AD3',
        colorVariableKeyword: isDarkMode.value ? '#559AD3' : 'rgb(161, 82, 152)',
        colorKeywords: props.language === 'typescript' ? '#559AD3' : isDarkMode.value ? '#B37BAE' : 'rgb(161, 82, 152)',
        colorString: isDarkMode.value ? '#CD9077' : 'rgb(112, 168, 118)',
        colorNumber: isDarkMode.value ? '#AEC6A1' : 'rgb(149, 116, 42)',
        colorBrackets: isDarkMode.value ? '#CCCCCC' : '#2A2A2A',
        colorPunctuation: isDarkMode.value ? '#E1E5E8' : '#3A3A3A',
        colorParenthesis: isDarkMode.value ? '#8A8A8A' : '#3A3A3A',
        colorTitle: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
    }
});

watch(() => isDarkMode.value, () => {
    step.value += 1
})
</script>

<template>
    <div :class="`relative flex flex-row w-full place-items-center ${tw}`" :style="{
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