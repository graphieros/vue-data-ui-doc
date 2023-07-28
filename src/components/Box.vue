<script setup>
import { ref } from "vue";
const props = defineProps({
    showExample: {
        type: Boolean,
        default: false,
    }
})

const activeTab = ref(0);

</script>

<template>
    <div class="p-6 pt-20 rounded-md border border-gray-700 my-6 relative overflow-x-auto">
    <div tabindex="0" :class="`select-none cursor-pointer absolute top-0 left-0 text-app-green font-satoshi-bold p-3 border-b border-gray-700 rounded-tl-lg ${activeTab === 0 ? 'bg-black-100' : ''}`" @click="activeTab = 0" @keypress.enter="activeTab = 0">
        dataset
    </div>
    <div tabindex="0" :class="`select-none cursor-pointer absolute top-0 left-[78px] text-app-blue font-satoshi-bold p-3 border-b border-l border-gray-700 ${activeTab === 1 ? 'bg-black-100' : ''} ${!props.showExample ? 'border-r rounded-br-lg' : ''}`" @click="activeTab = 1" @keypress.enter="activeTab = 1">
        config
    </div>
    <div tabindex="0" v-if="props.showExample" :class="`select-none cursor-pointer absolute top-0 left-[150px] text-gray-400 font-satoshi-bold p-3 border-b border-l border-r border-gray-700 rounded-br-lg ${activeTab === 2 ? 'bg-black-100' : ''}`" @click="activeTab = 2" @keypress.enter="activeTab = 2">
        example
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
    </div>
</template>