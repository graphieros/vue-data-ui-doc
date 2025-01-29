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
    }
});

const emit = defineEmits(['copy']);

const config = computed(() => {
    return {
        withLineNumbers: false,
        fontSize: '0.8rem',
        title: props.title
    }
});
</script>

<template>
    <div class="relative">
        <VueHiCode :content="content" :language="language" v-bind="config" @copy="emit('copy')"/>
    </div>
</template>