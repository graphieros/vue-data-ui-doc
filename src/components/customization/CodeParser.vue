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
});


const config = computed(() => {
    return {
        withLineNumbers: false,
        fontSize: '0.8rem'
    }
})


</script>

<template>
    <div class="relative">
        <VueHiCode :content="content" :language="language" v-bind="config"/>
    </div>
</template>
