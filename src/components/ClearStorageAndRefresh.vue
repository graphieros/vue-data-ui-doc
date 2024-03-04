<script setup>
import { computed, nextTick } from "vue"
import { TrashIcon } from "vue-tabler-icons"
import { useMainStore } from "../stores";
import { useMakerStore } from "../stores/maker"

const props = defineProps({
    keyConfig: String,
    keyDataset: String
})

const store = useMainStore();
const makerStore = useMakerStore();

const makerTranslations = computed(() => {
    return makerStore.translations;
})

const isStored = computed(() => {
    return !!localStorage[props.keyConfig] || !!localStorage[props.keyDataset]
})

function nuke() {
    if(!!localStorage[props.keyConfig]) {
        localStorage.removeItem(props.keyConfig)
    }
    if(!!localStorage[props.keyDataset]) {
        localStorage.removeItem(props.keyDataset)
    }
    nextTick(() => location.reload())
}

</script>

<template>
    <button class="flex flex-row place-items-center gap-2 text-app-orange border border-app-orange py-2 px-4 rounded-full mx-auto my-6 hover:bg-app-orange hover:text-black" v-if="isStored" @click="nuke">
        <TrashIcon/>
        <span>{{ makerTranslations.clearStorage[store.lang] }}</span>
    </button>
</template>