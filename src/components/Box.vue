<script setup lang="ts">
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import { BracketsContainIcon} from "vue-tabler-icons";
import IconSettings from "./IconSettings.vue";
import Schema from "../schema/Schema.vue";

const store = useMainStore();

const isDarkMode = computed(() => store.isDarkMode);
const translations = computed(() => store.translations);

type BoxProps = {
    /**
    * @description - FUKK
    */
    showEmits?: boolean
    showSlots?: boolean;
    showTooltip?: boolean;
    showUseCases?: boolean;
    showThemes?: boolean;
    showResponsive?: boolean;
    activeTab?: number;
    schema?: string;
    hideSchemaDisclaimer?: boolean;
}

const props = withDefaults(defineProps<BoxProps>(), {
    showEmits: false,
    showSlots: false,
    showtooltip: false,
    showUseCases: false,
    showThemes: false,
    showResponsive: false,
    activeTab: 0,
    schema: '',
    hideSchemaDisclaimer: false,
})

const activeTab = ref(props.activeTab);

const config = ref({
    open: false,
    maxHeight: 10000,
  head: {
    useArrowSlot: false,
    backgroundColor: "#5f8bee20",
    color: "#2D353C",
    iconColor: "#5f8bee",
    padding: "12px 6px"
  },
  body: {
    backgroundColor: "#5f8bee20",
    color: "#2D353C"
  }
})

const darkModeConfig = ref({
    open: false,
    maxHeight: 10000,
  head: {
    useArrowSlot: false,
    backgroundColor: "#5f8bee20",
    color: "#CCCCCC",
    iconColor: "#5f8bee",
    padding: "12px 6px"
  },
  body: {
    backgroundColor: "#5f8bee20",
    color: "#CCCCCC"
  }
})

</script>

<template>
    <div v-if="schema" class="border p-4 border-app-blue rounded-lg bg-[#5f8bee20] my-6 relative overflow-x-auto">
        <VueDataUi
            component="VueUiAccordion"
            :config="isDarkMode ? darkModeConfig : config"
        >
            <template #title="{ color }">
                <div :style="`color:${color}`">
                {{ translations.quickOverview[store.lang] }}</div>
            </template>
            <template #content>
                <Schema :component="schema" :showLink="false" :hideDisclaimer="hideSchemaDisclaimer"/>
            </template>
        </VueDataUi>
    </div>
    <div class="p-6 rounded-md border border-gray-700 my-6 relative overflow-x-auto">
    <div class="flex flex-row border w-full border-gray-700 mb-6 rounded overflow-auto">
        <div tabindex="0" :class="`w-fit select-none cursor-pointer text-black dark:text-app-green font-satoshi-bold p-3  ${activeTab === 0 ? 'bg-gray-200 dark:bg-black-100 border-b border-b-app-green' : 'border-b border-b-transparent'} hover:border-b hover:border-b-app-green`" @click="activeTab = 0" @keypress.enter="activeTab = 0">
            <div class="flex flex-row place-items-center gap-2 w-fit whitespace-nowrap">
                <VueUiIcon name="ratio" :size="18" :stroke="isDarkMode ? '#42d392' : '#1A1A1A'"/>
                Dataset
            </div>
        </div>
        <div tabindex="0" :class="`w-fit select-none cursor-pointer text-black dark:text-app-blue font-satoshi-bold p-3 border-b   ${activeTab === 1 ? 'bg-gray-200 dark:bg-black-100 border-b-app-blue' : 'border-b-transparent'} hover:border-b hover:border-b-app-blue`" @click="activeTab = 1" @keypress.enter="activeTab = 1">
            <div class="flex flex-row place-items-center gap-2 w-fit whitespace-nowrap">
                <IconSettings :stroke="isDarkMode ? '#5f8bee' : '#1A1A1A'" :size="26"/>
                Config
            </div>
        </div>
        <div tabindex="0" v-if="props.showEmits" :class="`w-fit select-none cursor-pointer text-black dark:text-gray-400  border-b   font-satoshi-bold p-3 ${activeTab === 2 ? 'bg-gray-200 dark:bg-black-100 border-b-gray-100' : 'border-b-transparent'} hover:border-b hover:border-b-gray-100`" @click="activeTab = 2" @keypress.enter="activeTab = 2">
            <div class="flex flex-row place-items-center gap-2 w-fit whitespace-nowrap">
                <VueUiIcon name="func" :size="18" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
                Emits
            </div>
        </div>
        <div tabindex="0" v-if="props.showSlots" :class="`w-fit select-none cursor-pointer text-black dark:text-app-orange border-b   font-satoshi-bold p-3  ${activeTab === 3 ? 'bg-gray-200 dark:bg-black-100 border-b-app-orange' : 'border-b-transparent'} hover:border-b hover:border-b-app-orange`" @click="activeTab = 3" @keypress.enter="activeTab = 3">
            <div class="flex flex-row place-items-center gap-2 w-fit whitespace-nowrap">
                <BracketsContainIcon size="18"/>
                Slots
            </div>
        </div>
        <div tabindex="0" v-if="props.showTooltip" :class="`w-fit select-none cursor-pointer text-black dark:text-gray-100 border-b   font-satoshi-bold p-3  ${activeTab === 4 ? 'bg-gray-200 dark:bg-black-100 border-b-gray-100' : 'border-b-transparent'} hover:border-b hover:border-b-gray-100`" @click="activeTab = 4" @keypress.enter="activeTab = 4">
            <div class="flex flex-row place-items-center gap-2 w-fit whitespace-nowrap">
                <VueUiIcon name="tooltip" :size="18" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
                Custom tooltip
            </div>
        </div>
        <div tabindex="0" v-if="props.showUseCases" :class="`w-fit select-none cursor-pointer text-black dark:text-app-gold border-b font-satoshi-bold p-3  ${activeTab === 5 ? 'bg-gray-200 dark:bg-black-100 border-b-app-gold' : 'border-b-transparent'} hover:border-b hover:border-b-app-gold`" @click="activeTab = 5" @keypress.enter="activeTab = 5">
            <div class="flex flex-row place-items-center gap-2 w-fit whitespace-nowrap">
                <VueUiIcon name="clipboardLine" :size="18" :stroke="isDarkMode ? '#fdd663' : '#1A1A1A'"/>
                Use cases
            </div>
        </div>
        <div tabindex="0" v-if="props.showThemes" :class="`w-fit select-none cursor-pointer text-black dark:text-[#ddaaFF] border-b font-satoshi-bold p-3  ${activeTab === 6 ? 'bg-gray-200 dark:bg-black-100 border-b-[#ddaaFF]' : 'border-b-transparent'} hover:border-b hover:border-b-[#ddaaFF]`" @click="activeTab = 6" @keypress.enter="activeTab = 6">
            <div class="flex flex-row place-items-center gap-2 w-fit whitespace-nowrap">
                <VueUiIcon name="clipboardBar" :size="18" :stroke="isDarkMode ? '#ddaaFF' : '#1A1A1A'"/>
                Themes
            </div>
        </div>
        <div tabindex="0" v-if="props.showResponsive" :class="`w-fit select-none cursor-pointer text-black dark:text-[#40b3c7] border-b font-satoshi-bold p-3  ${activeTab === 7 ? 'bg-gray-200 dark:bg-black-100 border-b-[#40b3c7]' : 'border-b-transparent'} hover:border-b hover:border-b-[#40b3c7]`" @click="activeTab = 7" @keypress.enter="activeTab = 7">
            <div class="flex flex-row place-items-center gap-2 w-fit whitespace-nowrap">
                <VueUiIcon name="window" :size="18" :stroke="isDarkMode ? '#40b3c7' : '#1A1A1A'"/>
                Responsive
            </div>
        </div>
    </div>

        <div class="text-satoshi-bold text-app-green text-2xl mb-3">
            <slot name="title"/>
        </div>

        <div class="text-app-orange text-lg my-3 gap-2 flex flex-row align-center">
            <slot name="warning"></slot>
        </div>

        <div v-show="activeTab === 0">
            <slot name="tab0"/>
        </div>
        <div v-show="activeTab === 1">
            <slot name="tab1"/>
        </div>
        <div v-show="activeTab === 2">
            <slot name="tab2"/>
        </div>
        <div v-show="activeTab === 3">
            <slot name="tab3"/>
        </div>
        <div v-show="activeTab === 4">
            <slot name="tab4"/>
        </div>
        <div v-show="activeTab === 5">
            <slot name="tab5"/>
        </div>
        <div v-show="activeTab === 6">
            <slot name="tab6"/>
        </div>
        <div v-show="activeTab === 7">
            <slot name="tab7"/>
        </div>
    </div>
</template>