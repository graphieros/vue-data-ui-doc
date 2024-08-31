<script setup>
import { computed} from "vue"
import SideMenuItem from './SideMenuItem.vue';
import { useMainStore } from '../stores';

defineProps({
    items: {
        type: Array,
        default(){
            return []
        }
    },
    title: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['close'])
const store = useMainStore();

function scrollToTop() {
    window.scrollTo({ top: 0});
}

function close(){
    emit('close')
}

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const config = computed(() => {
    return {
        head: {
            useArrowSlot: true,
            backgroundColor: isDarkMode.value ? '#1A1A1A' : 'rgb(229 231 235)',
            color: "#2D353C",
            iconColor: "#5f8bee",
            padding: "12px 6px"
        },
        body: {
            backgroundColor: isDarkMode.value ? '#1A1A1A' : 'rgb(229 231 235)',
            color: "#2D353C"
        }
    }
})

</script>

<template>
    <div>
        <VueDataUi component="VueUiAccordion" :config="config">
            <template #arrow>
                <VueUiIcon name="arrowRight" :size="12" stroke="#5f8bee"/>
            </template>
            <template #title="{ isOpen }">
                <div class="relative w-full py-2 pl-2 rounded hover:bg-[#1A1A1A10] dark:hover:bg-[#FFFFFF10] transition-colors" :style="`background: ${isOpen ? '#5f8aee30' : ''}`">
                    {{ title }}
                    <div class="shadow absolute top-1/2 right-2 -translate-y-1/2 text-xs rounded-full bg-gradient-to-b from-[#8eabed] to-[#5f8aee] text-black w-[24px] h-[24px] flex place-items-center justify-center">{{ items.length }}</div>
                </div>
            </template>
            <template #content>
                <div class="dark:bg-[#1F1F1F] bg-[#EEEEEE] py-2 rounded-b-md shadow">
                <SideMenuItem 
                    v-for="item in items"
                    :itsRoute="item.route"
                    :componentName="item.componentName"
                    :icon="item.icon"
                    @close="close"
                    @scrollToTop="scrollToTop"
                />
            </div>
            </template>
        </VueDataUi>
    </div>
</template>

<style scoped>
summary::marker {
    color: #5f8bee !important;
    font-size: 1.2em;
}
</style>

<style>
.mySummary {
    border-right: 2px solid transparent;
    transition: all 0.1s ease-in-out;
}
details[open] .mySummary {
    background: #5f8bee30 !important;
}

.summary-marker {
    position: absolute;
    top: 2px;
    right: 0px;
    height: calc(100% - 4px);
    width: 4px;
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

details[open] .summary-marker {
    opacity: 1;
}

</style>