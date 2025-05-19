<script setup>
import { computed, ref } from "vue"; 
import { useMainStore } from '../../../stores';
import CodeParser from "../../customization/CodeParser.vue";

const store = useMainStore();
const translations = computed(() => store.translations);


defineProps({
    height: {
        type: String,
        default: '400px'
    },
    width: {
        type: String,
        default: '100%'
    },
    minWidth: {
        type: String,
        default: '200px'
    },
    minHeight: {
        type: String,
        default: '400px'
    },
});

const codeContent = ref(`const config = ref({
    responsive: true,
    //...rest of your config
})`)

</script>

<template>
    <div class="w-full h-[2000px]">
        <div class="pb-8">
            {{ translations.responsiveUnitPresentation[store.lang] }} <code>reponsive: true</code>
        <CodeParser class="my-6" :content="codeContent" language="javascript" @copy="store.copy()"/>

        <div class="text-app-green">
            {{ translations.responsiveHandle[store.lang] }}
        </div>
        </div>
        <div class="responsive-unit border-2 border-dashed border-app-green" :style="`height:${height};width:${width};min-width:${minWidth};min-height:${minHeight}`">
            <slot name="chart"/>
        </div>
    </div>
</template>

<style scoped>
.responsive-unit {
    max-width: 100%;
    resize: both;
    overflow: auto;
    position: relative;
}
</style>