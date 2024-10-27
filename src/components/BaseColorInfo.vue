<script setup>
import { useMainStore } from '../stores';
import FlexibleTooltip from './FlexibleTooltip.vue';
import { CopyIcon } from 'vue-tabler-icons';

const props = defineProps({
    color: {
        type: String,
        default: '#FFFFFF'
    }
})

const store = useMainStore();
    
function copyColor() {
    navigator.clipboard.writeText(JSON.stringify(props.color)).then(() => {
        store.copy();
    }).catch(_err => {
        console.warn(`${props.color} could not be copied to the clipboard`)
    })
    store.copy()
}

</script>

<template>
    <span class="relative" @click="copyColor">
        <FlexibleTooltip position="top" :content="color" width="w-fit min-w-[80px]" delay="delay-150" >
            <template #before>
                <CopyIcon/>
            </template>
            <span class="h-[24px] w-[24px] inline-block border border-white rounded" :style="`background:${color}`"/>
        </FlexibleTooltip>
    </span>
</template>