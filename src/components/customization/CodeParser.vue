<script setup>
import { computed } from 'vue';
import { VueHiCode } from "vue-hi-code";
import "vue-hi-code/style.css"

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
    }
});

const emit = defineEmits(['copy']);

const config = computed(() => {
    return {
        withLineNumbers: false,
        fontSize: '0.8rem',
        title: props.title,
        withCopy: props.withCopy,
        borderRadius: props.borderRadius
    }
});
</script>

<template>
    <div class="relative" :style="{
        pointerEvents: noPointerEvents ? 'none' : 'all'
    }">
        <VueHiCode :content="content" :language="language" v-bind="config" @copy="emit('copy')"/>
    </div>
</template>