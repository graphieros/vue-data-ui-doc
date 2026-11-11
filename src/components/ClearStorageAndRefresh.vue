<script setup>
import { computed, nextTick } from "vue";
import { RefreshDotIcon } from "vue-tabler-icons";
import { useMainStore } from "../stores";
import { useMakerStore } from "../stores/maker";
import { readStorage, removeStorage } from "../storage.js";

const props = defineProps({
    keyConfig: String,
    keyDataset: String,
});

const store = useMainStore();
const makerStore = useMakerStore();

const makerTranslations = computed(() => {
    return makerStore.translations;
});

const isStored = computed(() => {
    return !!readStorage(props.keyConfig) || !!readStorage(props.keyDataset);
});

function nuke() {
    if (readStorage(props.keyConfig)) {
        removeStorage(props.keyConfig);
    }
    if (readStorage(props.keyDataset)) {
        removeStorage(props.keyDataset);
        if (props.keyDataset === "radarDataset") {
            removeStorage("radarCategories");
        }
    }
    nextTick(() => location.reload());
}
</script>

<template>
    <button
        class="flex flex-row place-items-center gap-2 py-2 px-4 rounded-full mx-auto my-6 bg-gradient-to-br from-app-gold to-app-orange transition-all text-black opacity-80 hover:opacity-100 shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#CCCCCC,0_4px_6px_rgba(0,0,0,0.5)]"
        v-if="isStored"
        @click="nuke"
    >
        <RefreshDotIcon />
        <span>{{ makerTranslations.clearStorage[store.lang] }}</span>
    </button>
</template>
