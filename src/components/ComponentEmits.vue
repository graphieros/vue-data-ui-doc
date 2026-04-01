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
    selectDatapoint: {
        name: "selectDatapoint",
        description: translations.value.docs.emits.selectDatapoint[store.lang],
    },
    selectLegend: {
        name: "selectLegend",
        description: translations.value.docs.emits.xy.selectLegend[store.lang],
    },
    selectTimeLabel: {
        name: "selectTimeLabel",
        description:
            translations.value.docs.emits.xy.selectTimeLabel[store.lang],
    },
    selectX: {
        name: "selectX",
        description: translations.value.docs.emits.xy.selectX[store.lang],
    },
    zoomStart: {
        name: "zoomStart",
        description: translations.value.docs.emits.xy.zoomStart[store.lang],
    },
    zoomEnd: {
        name: "zoomEnd",
        description: translations.value.docs.emits.xy.zoomEnd[store.lang],
    },
    zoomReset: {
        name: "zoomReset",
        description: translations.value.docs.emits.xy.zoomReset[store.lang],
    },
    copyAlt: {
        name: "copyAlt",
        description: translations.value.docs.emits.xy.copyAlt[store.lang],
    },
    hoverIndex: {
        name: "hoverIndex",
        description: translations.value.docs.emits.hoverIndex[store.lang],
    },

    // VueUiTimer specials
    start: {
        name: "start",
        description: translations.value.docs.emitted.start[store.lang],
    },
    pause: {
        name: "pause",
        description: translations.value.docs.emitted.pause[store.lang],
    },
    reset: {
        name: "reset",
        description: translations.value.docs.emitted.reset[store.lang],
    },
    restart: {
        name: "restart",
        description: translations.value.docs.emitted.restart[store.lang],
    },
    lap: {
        name: "lap",
        description: translations.value.docs.emitted.lap[store.lang],
    },

    // VueUiChord specials
    selectGroup: {
        name: "selectGroup",
        description: translations.value.docs.emits.selectGroup[store.lang],
    },
    selectRibbon: {
        name: "selectRibbon",
        description: translations.value.docs.emits.selectRibbon[store.lang],
    },

    // VueUiDag specials
    onNodeClick: {
        name: "onNodeClick",
        description: translations.value.docs.emits.onNodeClick[store.lang],
    },
    onMidpointEnter: {
        name: "onMidpointEnter",
        description: translations.value.docs.emits.onMidpointEnter[store.lang],
    },
    onMidpointLeave: {
        name: "onMidpointLeave",
        description: translations.value.docs.emits.onMidpointLeave[store.lang],
    },
    rotate: {
        name: "rotate",
        description: translations.value.docs.emits.rotate[store.lang],
    },

    // VueUiMolecule specials
    selectNode: {
        name: "selectNode",
        description: translations.value.docs.emits.selectDatapoint[store.lang],
    },

    // VueUiQuadrant specials
    selectPlot: {
        name: "selectPlot",
        description: translations.value.docs.emits.selectDatapoint[store.lang],
    },
    selectSide: {
        name: "selectSide",
        description: translations.value.docs.emits.selectSide[store.lang],
    },

    // VueUiChestnut specials
    selectRoot: {
        name: "selectRoot",
        description:
            translations.value.docs.emits.chestnut.selectRoot[store.lang],
    },
    selectBranch: {
        name: "selectBranch",
        description:
            translations.value.docs.emits.chestnut.selectBranch[store.lang],
    },
    selectNut: {
        name: "selectNut",
        description:
            translations.value.docs.emits.chestnut.selectNut[store.lang],
    },
}));
</script>

<template>
    <BaseComponentEmit
        v-for="name in names"
        :component
        :name
        :description="emitMap[name].description"
    />
</template>
