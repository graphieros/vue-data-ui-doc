<script setup lang="ts">
import { ref } from "vue";

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
    activeTab?: number;
}

const props = withDefaults(defineProps<BoxProps>(), {
    showEmits: false,
    showSlots: false,
    showtooltip: false,
    activeTab: 0
})

const activeTab = ref(props.activeTab);

</script>

<template>
    <div class="p-6 rounded-md border border-gray-700 my-6 relative overflow-x-auto">
    <div class="flex flex-row border w-fit border-gray-700 mb-6 rounded">
        <div tabindex="0" :class="`w-fit select-none cursor-pointer text-black dark:text-app-green font-satoshi-bold p-3  ${activeTab === 0 ? 'bg-gray-200 dark:bg-black-100 border-b border-b-app-green' : 'border-b border-b-transparent'} hover:border-b hover:border-b-app-green`" @click="activeTab = 0" @keypress.enter="activeTab = 0">
            dataset
        </div>
        <div tabindex="0" :class="`w-fit select-none cursor-pointer text-black dark:text-app-blue font-satoshi-bold p-3 border-b   ${activeTab === 1 ? 'bg-gray-200 dark:bg-black-100 border-b-app-blue' : 'border-b-transparent'} hover:border-b hover:border-b-app-blue`" @click="activeTab = 1" @keypress.enter="activeTab = 1">
            config
        </div>
        <div tabindex="0" v-if="props.showEmits" :class="`w-fit select-none cursor-pointer text-black dark:text-gray-400  border-b   font-satoshi-bold p-3 ${activeTab === 2 ? 'bg-gray-200 dark:bg-black-100 border-b-gray-100' : 'border-b-transparent'} hover:border-b hover:border-b-gray-100`" @click="activeTab = 2" @keypress.enter="activeTab = 2">
            emits
        </div>
        <div tabindex="0" v-if="props.showSlots" :class="`w-fit select-none cursor-pointer text-black dark:text-app-orange border-b   font-satoshi-bold p-3  ${activeTab === 3 ? 'bg-gray-200 dark:bg-black-100 border-b-app-orange' : 'border-b-transparent'} hover:border-b hover:border-b-app-orange`" @click="activeTab = 3" @keypress.enter="activeTab = 3">
            slots
        </div>
        <div tabindex="0" v-if="props.showTooltip" :class="`w-fit select-none cursor-pointer text-black dark:text-gray-100 border-b   font-satoshi-bold p-3  ${activeTab === 4 ? 'bg-gray-200 dark:bg-black-100 border-b-gray-100' : 'border-b-transparent'} hover:border-b hover:border-b-gray-100`" @click="activeTab = 4" @keypress.enter="activeTab = 4">
            custom tooltip
        </div>
    </div>

        <div class="text-satoshi-bold text-app-green text-2xl mb-3">
            <slot name="title"/>
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
    </div>
</template>