<script setup lang="ts">
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import { BracketsContainIcon} from "vue-tabler-icons";

const store = useMainStore();

const isDarkMode = computed(() => store.isDarkMode);

type BoxProps = {
    /**
    * @description - FUKK
    */
    showEmits?: boolean
    /**
     * 
     */
    showSlots?: boolean;
    showTooltip?: boolean;
    showUseCases?: boolean;
    showThemes?: boolean;
    activeTab?: number;
}

const props = withDefaults(defineProps<BoxProps>(), {
    showEmits: false,
    showSlots: false,
    showtooltip: false,
    showUseCases: false,
    showThemes: false,
    activeTab: 0
})

const activeTab = ref(props.activeTab);

</script>

<template>
    <div class="p-6 rounded-md border border-gray-700 my-6 relative overflow-x-auto">
    <div class="flex flex-row border w-fit border-gray-700 mb-6 rounded">
        <div tabindex="0" :class="`w-fit select-none cursor-pointer text-black dark:text-app-green font-satoshi-bold p-3  ${activeTab === 0 ? 'bg-gray-200 dark:bg-black-100 border-b border-b-app-green' : 'border-b border-b-transparent'} hover:border-b hover:border-b-app-green`" @click="activeTab = 0" @keypress.enter="activeTab = 0">
            <div class="flex flex-row place-items-center gap-2">
                <VueUiIcon name="ratio" :size="18" :stroke="isDarkMode ? '#42d392' : '#1A1A1A'"/>
                dataset
            </div>
        </div>
        <div tabindex="0" :class="`w-fit select-none cursor-pointer text-black dark:text-app-blue font-satoshi-bold p-3 border-b   ${activeTab === 1 ? 'bg-gray-200 dark:bg-black-100 border-b-app-blue' : 'border-b-transparent'} hover:border-b hover:border-b-app-blue`" @click="activeTab = 1" @keypress.enter="activeTab = 1">
            <div class="flex flex-row place-items-center gap-2">
                <VueUiIcon name="settings" :size="18" :stroke="isDarkMode ? '#5f8bee' : '#1A1A1A'"/>
                Config
            </div>
        </div>
        <div tabindex="0" v-if="props.showEmits" :class="`w-fit select-none cursor-pointer text-black dark:text-gray-400  border-b   font-satoshi-bold p-3 ${activeTab === 2 ? 'bg-gray-200 dark:bg-black-100 border-b-gray-100' : 'border-b-transparent'} hover:border-b hover:border-b-gray-100`" @click="activeTab = 2" @keypress.enter="activeTab = 2">
            <div class="flex flex-row place-items-center gap-2">
                <VueUiIcon name="func" :size="18" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
                Emits
            </div>
        </div>
        <div tabindex="0" v-if="props.showSlots" :class="`w-fit select-none cursor-pointer text-black dark:text-app-orange border-b   font-satoshi-bold p-3  ${activeTab === 3 ? 'bg-gray-200 dark:bg-black-100 border-b-app-orange' : 'border-b-transparent'} hover:border-b hover:border-b-app-orange`" @click="activeTab = 3" @keypress.enter="activeTab = 3">
            <div class="flex flex-row place-items-center gap-2">
                <BracketsContainIcon size="18"/>
                Slots
            </div>
        </div>
        <div tabindex="0" v-if="props.showTooltip" :class="`w-fit select-none cursor-pointer text-black dark:text-gray-100 border-b   font-satoshi-bold p-3  ${activeTab === 4 ? 'bg-gray-200 dark:bg-black-100 border-b-gray-100' : 'border-b-transparent'} hover:border-b hover:border-b-gray-100`" @click="activeTab = 4" @keypress.enter="activeTab = 4">
            <div class="flex flex-row place-items-center gap-2">
                <VueUiIcon name="tooltip" :size="18" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
                Custom tooltip
            </div>
        </div>
        <div tabindex="0" v-if="props.showUseCases" :class="`w-fit select-none cursor-pointer text-black dark:text-app-gold border-b font-satoshi-bold p-3  ${activeTab === 5 ? 'bg-gray-200 dark:bg-black-100 border-b-app-gold' : 'border-b-transparent'} hover:border-b hover:border-b-app-gold`" @click="activeTab = 5" @keypress.enter="activeTab = 5">
            <div class="flex flex-row place-items-center gap-2">
                <VueUiIcon name="clipboardLine" :size="18" :stroke="isDarkMode ? '#fdd663' : '#1A1A1A'"/>
                Use cases
            </div>
        </div>
        <div tabindex="0" v-if="props.showUseCases" :class="`w-fit select-none cursor-pointer text-black dark:text-[#ddaaFF] border-b font-satoshi-bold p-3  ${activeTab === 6 ? 'bg-gray-200 dark:bg-black-100 border-b-[#ddaaFF]' : 'border-b-transparent'} hover:border-b hover:border-b-[#ddaaFF]`" @click="activeTab = 6" @keypress.enter="activeTab = 6">
            <div class="flex flex-row place-items-center gap-2">
                <VueUiIcon name="clipboardBar" :size="18" :stroke="isDarkMode ? '#ddaaFF' : '#1A1A1A'"/>
                Themes
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
    </div>
</template>