<script setup>
import { ref, computed, onMounted } from "vue";
import BasePopoverButton from "./BasePopoverButton.vue"
import { useMainStore } from "../stores";
import { UserIcon } from "vue-tabler-icons";

const props = defineProps({
    buttonClass: {
        type: String,
        default: ''
    },
    popoverClass: {
        type: String,
        default: ''
    },
    sparklineConfig: {
        type: Object,
        default() {
            return {}
        }
    },
    sparklineDataset: {
        type: Array,
        default() {
            return []
        }
    },
    title: {
        type: String,
        default: ''
    },
})

const emit = defineEmits(['open'])

const store = useMainStore();

const isDarkMode = computed(() => store.isDarkMode);
const selectedIndex = ref(props.sparklineDataset.length - 1);

function hoverIndex({ index }) {
    if (![null, undefined].includes(index)) {
        selectedIndex.value = index
    } else {
        selectedIndex.value = props.sparklineDataset.length - 1;
    }
}

const isOpen = ref(false);

function open(state) {
    isOpen.value = state;
    emit('open', state);
}

</script>

<template>
    <div class="flex flex-col">
        <BasePopoverButton
            :buttonClass="`${buttonClass} ${isOpen ? 'rounded-t-md' : 'rounded-md shadow-lg'}`"
            :popoverClass="popoverClass"
            @open="open"
        >
            <template #button-content>
                <div class="w-[200px] h-[40px] py-2 tabular-nums flex flex-row gap-2 justify-between px-3 place-items-center">
                    <label class="text-xs absolute top-0.5 left-3">{{ title }}</label>
                    <span class="text-sm mt-3">{{ sparklineDataset[selectedIndex].period }}:</span>
                    <div class="flex flex-row gap-0 place-items-center">
                        <span class="text-2xl">{{ sparklineDataset[selectedIndex].value }}</span>
                        <slot name="icon"/>
                    </div>
                </div>
            </template>
            <template #popover-content>
                <VueDataUi 
                    component="VueUiSparkline" 
                    :config="sparklineConfig" 
                    :dataset="sparklineDataset"
                    @hoverIndex="hoverIndex" 
                />
            </template>
        </BasePopoverButton>
    </div>
</template>
