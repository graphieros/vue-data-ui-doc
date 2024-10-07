<script setup>
import { ref, computed } from "vue";
import BaseNumberInput from "../BaseNumberInput.vue";
import { useMainStore } from "../../stores";
import { useMakerStore } from "../../stores/maker";

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
            <div v-for="knob in model.filter(k => k.category === category.key)" class="flex flex-col justify-start">
                <label class="text-xs">{{ getLabel(knob.label) }}</label>
                <div class="flex place-items-center justify-start h-[40px]">
                    <BaseNumberInput v-if="knob.type === 'number'" v-model:value="knob.def" :min="knob.min" :max="knob.max" :step="knob.step" @change="emit('change')"/>
                    <input v-else class="accent-app-blue" v-if="!['none', 'select'].includes(knob.type)" :step="knob.step ?? 1" :type="knob.type" :min="knob.min ?? 0" :max="knob.max ?? 0" v-model="knob.def" @change="emit('change')">
                    <select v-if="knob.type === 'select'" v-model="knob.def" @change="emit('change')" class="h-[32px] px-2">
                        <option v-for="opt in knob.options">{{ opt }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>