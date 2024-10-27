<script setup lang="ts">
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import { BracketsContainIcon } from "vue-tabler-icons";
import IconSettings from "./IconSettings.vue";
import Schema from "../schema/Schema.vue";
import BaseTabsMenu from "./BaseTabsMenu.vue";

const store = useMainStore();

const isDarkMode = computed(() => store.isDarkMode);
const translations = computed(() => store.translations);

const emit = defineEmits(["onResponsiveTab", "onNonResponsiveTab"]);

type BoxProps = {
    /**
     * @description - FUKK
     */
    showEmits?: boolean;
    showSlots?: boolean;
    showTooltip?: boolean;
    showUseCases?: boolean;
    showThemes?: boolean;
    showResponsive?: boolean;
    activeTab?: number;
    schema?: string;
    hideSchemaDisclaimer?: boolean;
};

const props = withDefaults(defineProps<BoxProps>(), {
    showEmits: false,
    showSlots: false,
    showtooltip: false,
    showUseCases: false,
    showThemes: false,
    showResponsive: false,
    activeTab: 0,
    schema: "",
    hideSchemaDisclaimer: false,
});

const activeTab = ref(props.activeTab);

const config = ref({
    open: false,
    maxHeight: 10000,
    head: {
        useArrowSlot: false,
        backgroundColor: "#5f8bee20",
        color: "#2D353C",
        iconColor: "#5f8bee",
        padding: "12px 6px",
    },
    body: {
        backgroundColor: "#5f8bee20",
        color: "#2D353C",
    },
});

const darkModeConfig = ref({
    open: false,
    maxHeight: 10000,
    head: {
        useArrowSlot: false,
        backgroundColor: "#5f8bee20",
        color: "#CCCCCC",
        iconColor: "#5f8bee",
        padding: "12px 6px",
    },
    body: {
        backgroundColor: "#5f8bee20",
        color: "#CCCCCC",
    },
});

function setResponsiveTab() {
    activeTab.value = 7;
    emit("onResponsiveTab");
}

function closeResponsiveTab() {
    emit("onNonResponsiveTab");
}

const menuItems = computed(() => {
    return [
        {
            name: 'Dataset',
            icon: 'ratio',
            color: isDarkMode.value ? '#42d392' : '#1A1A1A',
            active: true,
            order: 0
        },
        {
            name: 'Config',
            icon: 'settings',
            color: isDarkMode.value ? '#5F8BEE' : '#1A1A1A',
            active: true,
            order: 1
        },
        {
            name: 'Emits',
            icon: 'func',
            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            active: props.showEmits,
            order: 2
        },
        {
            name: 'Slots',
            icon: 'skeleton',
            color: isDarkMode.value ? '#ff6600' : '#1A1A1A',
            active: props.showSlots,
            order: 3
        },
        {
            name: 'Custom tooltip',
            icon: 'tooltip',
            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            active: props.showTooltip,
            order: 4
        },
        {
            name: 'Use cases',
            icon: 'clipboardLine',
            color: isDarkMode.value ? '#fdd663' : '#1A1A1A',
            active: props.showUseCases,
            order: 5
        },
        {
            name: 'Themes',
            icon: 'clipboardBar',
            color: isDarkMode.value ? '#ddaaFF' : '#1A1A1A',
            active: props.showThemes,
            order: 6
        },
        {
            name: 'Responsive',
            icon: 'fullscreen',
            color: isDarkMode.value ? '#40b3c7' : '#1A1A1A',
            active: props.showResponsive,
            order: 7
        }
    ].filter(menu => menu.active)
})

</script>

<template>
    <div v-if="schema"
        class="border px-4 border-gray-700 rounded-md my-6 relative overflow-x-auto bg-gray-200 dark:bg-[#FFFFFF05]">
        <VueDataUi component="VueUiAccordion" :config="isDarkMode ? darkModeConfig : config">
            <template #title="{ color }">
                <div :style="`color:${color}`">
                    {{ translations.quickOverview[store.lang] }}
                </div>
            </template>
            <template #content>
                <Schema :component="schema" :showLink="false" :hideDisclaimer="hideSchemaDisclaimer" />
            </template>
        </VueDataUi>
    </div>
    <div class="p-6 rounded-md border border-gray-700 my-6 relative overflow-x-auto">

        <h2 class="mb-6 flex flex-row place-items-center gap-3" dir="auto">
            <VueUiIcon name="clipBoard" :size="24" stroke="#5F8BEE" />

            {{ translations.detailedDocumentation[store.lang] }}
        </h2>

        <BaseTabsMenu :items="menuItems" @tabSelected="({order}) => activeTab = order" :activeTab="activeTab"/>

        <div class="text-satoshi-bold text-app-green text-2xl mb-3">
            <slot name="title" />
        </div>

        <div class="text-app-orange text-lg my-3 gap-2 flex flex-row align-center">
            <slot name="warning"></slot>
        </div>

        <div v-show="activeTab === 0">
            <slot name="tab0" />
        </div>
        <div v-show="activeTab === 1">
            <slot name="tab1" />
        </div>
        <div v-show="activeTab === 2">
            <slot name="tab2" />
        </div>
        <div v-show="activeTab === 3">
            <slot name="tab3" />
        </div>
        <div v-show="activeTab === 4">
            <slot name="tab4" />
        </div>
        <div v-show="activeTab === 5">
            <slot name="tab5" />
        </div>
        <div v-show="activeTab === 6">
            <slot name="tab6" />
        </div>
        <div v-if="activeTab === 7">
            <slot name="tab7" />
        </div>
    </div>
</template>
