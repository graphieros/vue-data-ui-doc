<script setup>
import { ref, computed } from "vue";
import BaseNumberInput from "../BaseNumberInput.vue";
import { useMainStore } from "../../stores";
import { useMakerStore } from "../../stores/maker";
import BaseColorInput from "../BaseColorInput.vue";
import { createUid } from "./lib";

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

const uid = createUid();

const emit = defineEmits(['change'])

function getLabel(label) {
    return Array.isArray(label) ? label.map(l => {
        if(! makerTranslations.value.labels[l]) return l
        return  makerTranslations.value.labels[l][store.lang]
    }).join(" ") :
    makerTranslations.value.labels[label] ?
    makerTranslations.value.labels[label][store.lang] : label
}

const warningColorAlpha = ref({
    en: "Transparent colors are usable since v2.3.77",
    fr: "Les couleurs transparentes sont utilisables depuis la version v2.3.77",
    pt: "Cores transparentes são utilizáveis desde a v2.3.77",
    de: "Transparente Farben sind seit Version v2.3.77 verwendbar",
    zh: "自 v2.3.77 起可使用透明颜色",
    jp: "v2.3.77から透明な色が使用可能です",
    es: "Los colores transparentes son utilizables desde la v2.3.77",
    ko: "투명 색상은 v2.3.77부터 사용할 수 있습니다",
    ar: "الألوان الشفافة قابلة للاستخدام منذ الإصدار v2.3.77"
})

const useOldColorPickers = ref(false);

const useTransparencyLabel = ref({
    en: "Use old color pickers (before v2.3.77)",
    fr: "Utilisez les anciens sélecteurs de couleurs (avant la v2.3.77)",
    pt: "Use os antigos seletores de cores (antes da v2.3.77)",
    de: "Verwenden Sie die alten Farbwähler (vor v2.3.77)",
    zh: "使用旧版颜色选择器（v2.3.77之前）",
    jp: "古いカラーピッカーを使用する（v2.3.77以前）",
    es: "Usa los antiguos selectores de colores (antes de la v2.3.77)",
    ko: "구버전 색상 선택기 사용 (v2.3.77 이전)",
    ar: "استخدم أدوات اختيار الألوان القديمة (قبل الإصدار v2.3.77)"
})
    
</script>

<template>
    <div class="z-0 w-full border border-app-orange p-4 rounded mt-6 bg-[#ff660020] text-black dark:text-white" dir="auto">
        <div class="flex flex-col gap-2">
            <div class="flex flex-row gap-2 text-app-orange">
                <VueUiIcon name="circleExclamation" stroke="#ff6600"/>
                {{ warningColorAlpha[store.lang] }}
            </div>
            <div class="flex-row" dir="auto">
                <label for="useTrans" class="px-8">{{ useTransparencyLabel[store.lang] }}</label>
                <input id="useTrans" type="checkbox" v-model="useOldColorPickers">
            </div>
        </div>
    </div>
    <div class="flex flex-col gap-2 shadow dark:shadow-md bg-[#5f8bee30] p-3 rounded my-4" v-for="(category, c) in categories">
        <div class="w-full bg-gradient-to-r from-app-blue-light dark:from-app-blue-dark to-transparent pl-3 py-2 rounded text-black dark:text-white">
            <h4>{{ category.title }}</h4> 
        </div>
        <div class="flex flex-row gap-4 place-items-center flex-wrap">
            <div v-for="(knob, i) in model.filter(k => k.category === category.key)" class="flex flex-col justify-start my-2">

                <label :for="`k_${i}_${uid}_${c}`" :id="`l_${i}_${uid}_${c}`" v-if="knob.type !== 'color'" class="text-xs text-black dark:text-white" dir="auto">{{ getLabel(knob.label) }}</label>
                <label :for="`k_${i}_${uid}_${c}`" :id="`l_${i}_${uid}_${c}`" v-if="knob.type === 'color' && (useOldColorPickers || knob.old)" class="text-xs text-black dark:text-white" dir="auto">{{ getLabel(knob.label) }}</label>

                <div class="flex place-items-center justify-start h-[40px]">
                    <BaseNumberInput v-if="knob.type === 'number'" v-model:value="knob.def" :min="knob.min" :max="knob.max" :step="knob.step" @change="emit('change')" :labelId="`l_${i}_${uid}_${c}`" :id="`k_${i}_${uid}_${c}`"/>
                    <template v-if="knob.type === 'range'">
                        <div class="inline-flex place-items-center justify-center gap-2 relative h-[32px] bg-[#1A1A1A10] dark:bg-[#FFFFFF10] p-2 rounded-full shadow-md  dark:border-t dark:border-[#6A6A6A]">
                            <div class="text-xs z-0 pointer-events-none bg-[#4A4A4A] dark:bg-black px-2 rounded-lg min-w-[64px] text-center text-white tabular-nums">{{ knob.def }}</div>
                            <input :id="`k_${i}_${uid}_${c}`" type="range" v-model="knob.def" :min="knob.min" :max="knob.max" :step="knob.step" class="accent-app-blue z-0" @change="emit('change')">
                        </div>
                    </template>
                    <BaseColorInput v-else-if="knob.type === 'color' && (!useOldColorPickers && !knob.old)" :label="getLabel(knob.label)" :rgba="true" v-model:value="knob.def" :labelId="`l_${i}_${uid}_${c}`" :id="`k_${i}_${uid}_${c}`"/>
                    <input :labelId="`l_${i}_${uid}_${c}`" :id="`k_${i}_${uid}_${c}`" v-else-if="!['number', 'range', 'select'].includes(knob.type)" class="accent-app-blue" v-if="!['none', 'select'].includes(knob.type)" :type="knob.type" v-model="knob.def" @change="emit('change')">
                    <select v-else-if="knob.type === 'select'" v-model="knob.def" @change="emit('change')" class="h-[32px] px-2" :id="`k_${i}_${uid}_${c}`">
                        <option v-for="opt in knob.options">{{ opt }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>