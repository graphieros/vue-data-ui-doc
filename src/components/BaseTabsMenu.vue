<script setup>
import { computed } from "vue";
import IconSettings from "./IconSettings.vue";
import { useMainStore } from "../stores";
import BaseTabContainer from "./BaseTabContainer.vue";

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
    activeTab: {
        type: Number,
        default: 0
    }
});

const store = useMainStore()
const isDarkMode = computed(() => store.isDarkMode)

const emit = defineEmits(['tabSelected']);

const selectTab = (item) => {
    emit('tabSelected', item);
};

const selectedIndexOnLoad = computed(() => {
    const idx = props.items.findIndex(i => i.order === props.activeTab);
    return idx >= 0 ? idx : null;
});
</script>

<template>
    <BaseTabContainer
        :selectedIndexOnLoad="selectedIndexOnLoad"
        containerClass="py-6"
    >
        <template #content>
            <div
                v-for="(item, index) in items"
                :key="index"
                :style="{ color: isDarkMode ? item.color : '#2A2A2A', background: activeTab === item.order ? isDarkMode ? `${item.color}20` : `radial-gradient(at top, #ccdbff, #abc2f6)` : undefined, borderBottom: activeTab === item.order && isDarkMode ? `2px solid ${item.color}` : 'none' }"
                :class="`flex flex-col items-center text-center justify-center cursor-pointer p-2 min-w-[90px] flex-shrink-0 whitespace-nowrap rounded-xl gap-2 bg-gray-100 dark:bg-[#3A3A3A] hover:bg-[#FFFFFF] dark:hover:bg-[#4A4A4A] transition-colors shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)]
        dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]`"
                @click="selectTab(item)"
            >
                <IconSettings v-if="item.icon === 'settings'" :stroke="isDarkMode ? '#5F8BEE' : '#1A1A1A'" :size="26" />
                <VueUiIcon v-else :name="item.icon" :stroke="isDarkMode ? item.color : '#2A2A2A'" />
                <span class="text-sm" dir="auto">{{ item.name }}</span>
            </div>
        </template>
    </BaseTabContainer>
</template>
