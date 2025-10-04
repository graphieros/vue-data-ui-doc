<script setup>
import { computed} from "vue"
import SideMenuItem from './SideMenuItem.vue';
import { useMainStore } from '../stores';
import BaseCard from "./BaseCard.vue";

const props = defineProps({
    items: {
        type: Array,
        default(){
            return []
        }
    },
    title: {
        type: String,
        default: ''
    },
    open: {
        type: Boolean,
        default: false,
    },
    icon: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['close']);
const store = useMainStore();

function scrollToTop() {
    window.scrollTo({ top: 0 });
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
            backgroundColor: isDarkMode.value ? '#1A1A1A' : '#d1d5db',
            color: "#2D353C",
            iconColor: "#5f8bee",
            padding: "12px 6px"
        },
        body: {
            backgroundColor: isDarkMode.value ? '#1A1A1A' : '#d1d5db',
            color: "#2D353C"
        }
    }
});

</script>

<template>
    <div class="relative">
        <div class="peer">
            <VueDataUi component="VueUiAccordion" :config="{
                ...config,
                open
            }">
                <template #arrow>
                    <VueUiIcon name="arrowRight" :size="12" :stroke="isDarkMode ? '#4A4A4A' : '#3A3A3A'"/>
                </template>
                <template #title="{ isOpen }">
                    <div :class="`
                        shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] 
                        dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)] 
                        relative w-full py-2 pl-2 -mr-1 rounded-[24px] hover:bg-gray-100 dark:hover:bg-[#2A2A2A] transition-colors ${isOpen ? 'bg-gray-200 dark:bg-[#242424]' : 'bg-gray-200 dark:bg-[#242424]'}`">
                        <div class="pl-2">{{ title }}</div>
                        <div class="shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)]
        dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)] absolute top-1/2 right-2 -translate-y-1/2 text-xs rounded-full bg-[#FFFFFF50] dark:bg-[#FFFFFF10] text-black dark:text-app-blue font-inter-medium w-[24px] h-[24px] flex place-items-center justify-center">{{ items.length }}</div>
                    </div>
                </template>
                <template #content>
                    <div class="py-2 pb-2 -mt-2">
                        <BaseCard type="dark">
                            <SideMenuItem 
                                v-for="item in items"
                                :itsRoute="item.route"
                                :componentName="item.componentName"
                                :icon="item.icon"
                                @close="close"
                                @scrollToTop="scrollToTop"
                            />
                        </BaseCard>
                    </div>
                </template>
            </VueDataUi>
        </div>
        <div class="absolute -left-4 top-[32px] -translate-y-1/2 invisible peer-hover:visible">
            <VueUiIcon :name="icon" :stroke="isDarkMode ? '#5f8aee' : '#1A1A1A'" :size="16"/>
        </div>
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

html.dark details .vue-ui-accordion-head .relative {
    border-right: 2px solid transparent;
}

html.dark details[open] .vue-ui-accordion-head .relative,
html.dark details:hover .vue-ui-accordion-head .relative {
    border-right: 2px solid #5f8aee;
}

</style>