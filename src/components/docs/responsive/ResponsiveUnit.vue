<script setup>
import { computed } from "vue"; 
import { useMainStore } from '../../../stores';

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

</script>

<template>
    <div class="w-full h-[2000px]">
        <div class="pb-8">
            {{ translations.responsiveUnitPresentation[store.lang] }} <code>reponsive: true</code>
<pre>
    <code>
        const config = ref({
            responsive: true,
            ... // rest of your config
        })
    </code>
</pre>  
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
    padding: 24px;
    position: relative;
}
</style>