<script setup>
import { computed} from "vue"
import SideMenuItem from './SideMenuItem.vue';
import { useMainStore } from '../stores';

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
                    <VueUiIcon name="arrowRight" :size="12" :stroke="isDarkMode ? '#abc2f6' : '#5f8aee'"/>
                </template>
                <template #title="{ isOpen }">
                    <div :class="`relative w-full py-2 pl-2 rounded-[24px] hover:bg-[#abc2f630] dark:hover:bg-[#abc2f610] transition-colors ${open && isOpen ? 'shadow-md' : ''}`" :style="`background: ${open && isOpen ? isDarkMode ? '#abc2f630' : '#abc2f650' : ''}`">
                        <div>{{ title }}</div>
                        <div class="shadow absolute top-1/2 right-2 -translate-y-1/2 text-xs rounded-full bg-gradient-to-b from-[#abc2f6] to-[#5f8aee] text-black w-[24px] h-[24px] flex place-items-center justify-center">{{ items.length }}</div>
                    </div>
                </template>
                <template #content>
                    <div class="py-2 pb-2 -mt-2">
                        <div class="bg-gradient-to-br dark:from-transparent dark:to-[#5f8aee20] from-[#FFFFFF] to-[#EFEFEF] shadow-md py-1 rounded-md">
                            <SideMenuItem 
                                v-for="item in items"
                                :itsRoute="item.route"
                                :componentName="item.componentName"
                                :icon="item.icon"
                                @close="close"
                                @scrollToTop="scrollToTop"
                            />
                        </div>
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