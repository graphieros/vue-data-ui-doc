<script setup>
import { computed, ref} from "vue"
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
            padding: '6px 0'
        },
        body: {
            backgroundColor: isDarkMode.value ? '#1A1A1A' : '#d1d5db',
            color: "#2D353C"
        }
    }
});

const _isOpen = ref(props.open);

function M(_) {
    _isOpen.value = _;
}
</script>

<template>
    <div class="relative ra-special overflow-visible">
        <div class="peer">
            <VueDataUi component="VueUiAccordion" :config="{
                ...config,
                open
            }">
                <template #arrow>
                </template>
                <template #title="{ isOpen }">
                    <div :class="`
                        shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] 
                        dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)] 
                        relative w-full py-2.5 pl-2 -mr-1 
                        dark:hover:bg-[#2A2A2A] transition-colors 
                        ${isOpen ? 'rounded-t-[24px] rounded-b-[6px]' : 'rounded-[24px]'} 
                        ${isOpen ? 'bg-app-blue-light dark:bg-[#242424]' : 'bg-gray-200 dark:bg-[#242424]'}`
                    ">
                        <div class="flex flex-row place-items-center gap-2"
                    >
                            <VueUiIcon :class="`${isOpen ? 'rotate-90' : ''} transition-transform ml-2`" name="arrowRight" :size="12" :stroke="isDarkMode ? isOpen ? '#5f8aee' : '#3A3A3A' : '#3A3A3A'"/>
                            <div class="pl-2">{{ title }}</div>
                        </div>
                        <div :class="`shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)]
        dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)] absolute top-1/2 right-3 -translate-y-1/2 text-xs rounded-full bg-[#FFFFFF50] dark:bg-[#FFFFFF10] text-black dark:text-app-blue font-inter-medium w-[24px] h-[24px] flex place-items-center justify-center`">{{ items.length }}</div>
                    </div>
                </template>
                <template #content="{ isOpen }">
                    {{ M(isOpen) }}
                    <div class="py-2 pb-2 -mt-2 ()">
                        <BaseCard 
                            type="dark" 
                            rounding="rounded-t-[6px] rounded-b-2xl"
                            :borderRight="isOpen && isDarkMode ? 'border-r-2 border-app-blue' : ''"
                            padding="py-4 px-1"
                        >
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
        <div v-show="!_isOpen" class="absolute highlight pointer-events-none opacity-0 transition-opacity duration-200 peer-hover:opacity-100" />
        <div v-show="!_isOpen" class="absolute highlight-shade pointer-events-none opacity-0 transition-opacity duration-200 peer-hover:opacity-100" />
        <div v-show="!_isOpen" class="absolute highlight-spark1 pointer-events-none opacity-0 transition-opacity duration-200 peer-hover:opacity-100" />
    </div>
</template>

<style>
.ra-special .vue-ui-accordion-head {
    gap: 0px !important;
}

.mySummary {
    border-right: 2px solid transparent;
    transition: all 0.1s ease-in-out;
}
details[open] .mySummary {
    background: #5f8bee30 !important;
}

html.dark details .vue-ui-accordion-head .relative {
    border-right: 2px solid transparent;
}

html.dark details[open] .vue-ui-accordion-head .relative,
html.dark details:hover .vue-ui-accordion-head .relative {
    border-right: 2px solid #5f8aee;
}

.highlight {
    top: 8px;
    left: calc(100% + 22px);
    width: 2px;
    height: 40px;
    background: linear-gradient(to bottom, transparent, #FFFFFF, transparent);
}

.highlight-spark1 {
    top: 20px;
    left: calc(100% - 1.7px);
    width: 1px;
    height: 16px;
    border-radius: 1px;
}

.highlight-shade {
    top: -12px;
    left: calc(100%);
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: radial-gradient(#FFFFFF, transparent, transparent);
}

html.dark .highlight {
    background: linear-gradient(to bottom, transparent, #5f8aee, transparent);
}
html.dark .highlight-shade {
    background: radial-gradient(#5f8aee, transparent, transparent);
}
html.dark .highlight-spark1 {
    background: linear-gradient(to bottom, transparent, #FFFFFF, transparent);
}
html.dark .highlight {
    background: linear-gradient(to bottom, transparent, #5f8aee, transparent);
}


.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>