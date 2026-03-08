<script setup>
import { ref, computed } from "vue";
import BaseComponentEmit from "./BaseComponentEmit.vue";
import { useMainStore } from "../stores";

const props = defineProps({
    component: { type: String },
    names: { type: Array, default: () => [] },
});

const store = useMainStore();
const translations = computed(() => store.translations);

const emitMap = computed(() => ({
    selectDatapoint: { name: 'selectDatapoint', description: translations.value.docs.emits.selectDatapoint[store.lang] },
    selectLegend: { name: 'selectLegend', description: translations.value.docs.emits.xy.selectLegend[store.lang] },
    selectTimeLabel: { name: 'selectTimeLabel', description: translations.value.docs.emits.xy.selectTimeLabel[store.lang] },
    selectX: { name: 'selectX', description: translations.value.docs.emits.xy.selectX[store.lang] },
    zoomStart: { name: 'zoomStart', description: translations.value.docs.emits.xy.zoomStart[store.lang] },
    zoomEnd: { name: 'zoomEnd', description: translations.value.docs.emits.xy.zoomEnd[store.lang] },
    zoomReset: { name: 'zoomReset', description: translations.value.docs.emits.xy.zoomReset[store.lang] },
    copyAlt: { name: 'copyAlt', description: translations.value.docs.emits.xy.copyAlt[store.lang] }
}))

</script>

<template>
    <BaseComponentEmit
        v-for="name in names"
        :component
        :name
        :description="emitMap[name].description"
    />
</template>