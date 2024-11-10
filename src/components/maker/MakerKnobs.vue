<script setup>
import { ref, computed } from "vue";
import BaseNumberInput from "../BaseNumberInput.vue";
import { useMainStore } from "../../stores";
import { useMakerStore } from "../../stores/maker";
import BaseColorInput from "../BaseColorInput.vue";

const props = defineProps({
    categories: {
        type: Array,
        default() {
            return []
        }
    },
    model: {
        type: Array,
        default() {
            return []
        }
    }
})

const store = useMainStore();
const makerStore = useMakerStore();

const makerTranslations = computed(() => {
    return makerStore.translations;
})

const emit = defineEmits(['change'])

function getLabel(label) {
    return Array.isArray(label) ? label.map(l => {
        if(! makerTranslations.value.labels[l]) return l
        return  makerTranslations.value.labels[l][store.lang]
    }).join(" ") :
    makerTranslations.value.labels[label] ?
    makerTranslations.value.labels[label][store.lang] : label
}
    
</script>

<template>
    <div class="flex flex-col gap-2 shadow dark:shadow-md bg-[#5f8bee30] p-3 rounded my-4" v-for="category in categories">
        <h4>{{ category.title }}</h4> 
        <div class="flex flex-row gap-4 place-items-center flex-wrap">
            <div v-for="knob in model.filter(k => k.category === category.key)" class="flex flex-col justify-start my-2">
                <label :class="`text-xs ${knob.type === 'color' ? 'pl-4' : ''}`" dir="auto">{{ getLabel(knob.label) }}</label>
                <div class="flex place-items-center justify-start h-[40px]">
                    <BaseNumberInput v-if="knob.type === 'number'" v-model:value="knob.def" :min="knob.min" :max="knob.max" :step="knob.step" @change="emit('change')"/>
                    <template v-if="knob.type === 'range'">
                        <div class="inline-flex place-items-center justify-center gap-2 relative h-[32px] bg-[#1A1A1A10] dark:bg-[#FFFFFF10] p-2 rounded-full shadow-md  dark:border-t dark:border-[#6A6A6A]">
                            <div class="text-xs z-0 pointer-events-none bg-[#4A4A4A] dark:bg-black px-2 rounded-lg min-w-[64px] text-center text-white tabular-nums">{{ knob.def }}</div>
                            <input type="range" v-model="knob.def" :min="knob.min" :max="knob.max" :step="knob.step" class="accent-app-blue z-10" @change="emit('change')">
                        </div>
                    </template>
                    <BaseColorInput v-else-if="knob.type === 'color'" :rgba="true" v-model:value="knob.def"/>
                    <input v-else-if="!['number', 'range', 'select'].includes(knob.type)" class="accent-app-blue" v-if="!['none', 'select'].includes(knob.type)" :type="knob.type" v-model="knob.def" @change="emit('change')">
                    <select v-else-if="knob.type === 'select'" v-model="knob.def" @change="emit('change')" class="h-[32px] px-2">
                        <option v-for="opt in knob.options">{{ opt }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>