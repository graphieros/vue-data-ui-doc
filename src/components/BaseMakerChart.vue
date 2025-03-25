<script setup>
import { PinnedOffIcon, PinIcon, RefreshDotIcon } from "vue-tabler-icons";
import { useMainStore } from "../stores";
import { computed } from "vue";
import { useMakerStore } from "../stores/maker";
import BaseDragElement from "./BaseDragElement.vue";

defineProps({
    isFixed: {
        type: Boolean,
        default: false
    },
    fixedWidth: {
        type: String,
        default: 'w-[300px]'
    },
    expandedWidth: {
        type: String,
        default: 'max-w-[600px]'
    }
})

const emit = defineEmits(['fixChart', 'resetModel'])

const store = useMainStore()
const makerStore = useMakerStore()
const translations = computed(() => makerStore.translations);
    
</script>

<template>
    <transition name="fade">
        <BaseDragElement v-if="isFixed" snap-on-resize :startTop="130">
            <div :class="`${fixedWidth} overflow-hidden`">
                <div class="flex flex-row gap-2 mb-2 w-full bg-white dark:bg-[#2A2A2A] py-2 justify-center">
                    <button @click="emit('fixChart')" class="flex align-center justify-center bg-gradient-to-br from-app-blue-light to-app-blue  p-2 rounded-full opacity-80 hover:opacity-100 transition-all">
                        <PinnedOffIcon v-if="isFixed" class="text-black"/>
                        <PinIcon v-else class="text-black"/>
                    </button>

                    <button class="flex flex-row gap-2 place-items-center ml-4 py-1 px-4 rounded-full border bg-gradient-to-br from-app-gold to-app-orange transition-all text-black opacity-80 hover:opacity-100" @click="emit('resetModel')">
                        <RefreshDotIcon/>
                        <span>{{ translations.reset[store.lang] }}</span>
                    </button>

                </div>
                <slot/>
            </div>
        </BaseDragElement>                
        <div v-else :class="`${expandedWidth} transition-all shadow-xl rounded p-2 ${isFixed ? `fixed top-[88px] right-2 z-20 ${fixedWidth}` : `w-full mx-auto ${expandedWidth}`}`">
            <div class="flex flex-row gap-2 mb-2 w-full bg-white dark:bg-[#1A1A1A] py-2 justify-center">
                <button @click="emit('fixChart')" class="hidden sm:flex align-center justify-center bg-gradient-to-br from-app-blue-light to-app-blue  p-2 rounded-full opacity-80 hover:opacity-100 transition-all">
                    <PinnedOffIcon v-if="isFixed" class="text-black"/>
                    <PinIcon v-else class="text-black"/>
                </button>

                <button class="flex flex-row gap-2 place-items-center ml-4 py-1 px-4 rounded-full border bg-gradient-to-br from-app-gold to-app-orange transition-all text-black opacity-80 hover:opacity-100" @click="emit('resetModel')">
                    <RefreshDotIcon/>
                    <span>{{ translations.reset[store.lang] }}</span>
                </button>

            </div>
            <slot/>
        </div>
    </transition>
</template>