<script setup>
import SideMenuItem from './SideMenuItem.vue';

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

function scrollToTop() {
    window.scrollTo({ top: 0});
}

function close(){
    emit('close')
}

</script>

<template>
    <details class="my-2 my-dropdown peer mb-4">
        <summary class="cursor-pointer px-2 py-2 hover:bg-[#5f8bee30] rounded-t-md mySummary relative select-none">
            <span class="font-satoshi-bold text-black dark:text-gray-300">
                {{ title }}
            </span>
            <div class="absolute top-1/2 right-4 -translate-y-1/2 text-xs rounded-full bg-[#5f8bee80] w-[24px] h-[24px] flex place-items-center justify-center">{{ items.length }}</div>
            <div class="summary-marker bg-app-blue"></div>
        </summary>
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
    </details>
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