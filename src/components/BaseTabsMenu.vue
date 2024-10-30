<script setup>
import { ref, watch, onMounted, computed } from "vue";
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
</script>

<template>
    <BaseTabContainer>
        <template #content>
            <div
                v-for="(item, index) in items"
                :key="index"
                :style="{ color: item.color, background: activeTab === item.order ? `${item.color}20` : undefined, borderBottom: activeTab === item.order ? `2px solid ${item.color}` : '2px solid transparent' }"
                :class="`flex flex-col items-center text-center justify-center cursor-pointer p-2 min-w-[90px] flex-shrink-0 whitespace-nowrap rounded-tl-md rounded-tr-md gap-2 hover:bg-[#1A1A1A10] dark:hover:bg-[#FFFFFF05] transition-colors`"
                @click="selectTab(item)"
            >
                <IconSettings v-if="item.icon === 'settings'" :stroke="isDarkMode ? '#5F8BEE' : '#1A1A1A'" :size="26" />
                <VueUiIcon v-else :name="item.icon" :stroke="item.color" />
                <span class="text-sm" dir="auto">{{ item.name }}</span>
            </div>
        </template>
    </BaseTabContainer>
</template>