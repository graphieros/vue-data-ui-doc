<script setup>
import { computed } from "vue";
import { CopyIcon } from 'vue-tabler-icons';
import { useMakerStore } from '../../stores/maker';
import { useMainStore } from "../../stores";

const store = useMainStore();
const makerStore = useMakerStore();

const makerTranslations = computed(() => makerStore.translations)

const emit = defineEmits(['click'])

</script>

<template>
    <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all place-items-center text-sm mb-4" @click="emit('click')">
        <CopyIcon/>
        {{ makerTranslations.componentCode[store.lang] }}
    </button>
</template>