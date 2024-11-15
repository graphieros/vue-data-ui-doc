<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useMainStore } from "../stores";
import BaseNumberInput from "./BaseNumberInput.vue";
import { RefreshDotIcon } from "vue-tabler-icons";
import BaseComment from "./BaseComment.vue";
import BaseColorInfo from "./BaseColorInfo.vue";
import BaseColorInput from "./BaseColorInput.vue";
import FlexibleTooltip from "./FlexibleTooltip.vue";

const props = defineProps({
    light: {
        type: Object,
        default() {
            return {}
        }
    },
    dark: {
        type: Object,
        default() {
            return {}
        }
    },
    name: {
        type: String,
        default: '',
    },
    attr: {
        type: String,
        default: ''
    }, 
    defaultVal: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: Number.MAX_SAFE_INTEGER
    },
    step: {
        type: Number,
        default: 1,
    },
    options: {
        type: Array,
        default() {
            return []
        }
    },
    comment: {
        type: String,
        default: ''
    },
    rgba: {
        type: Boolean,
        default: false
    },
    tooltip: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['change'])

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

let initialValue = ref('');

function getNestedAttribute(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function setNestedAttribute(obj, path, value) {
    console.log(obj, path, value)
    const parts = path.split('.');
    let current = obj;

    parts.forEach((part, index) => {
        if (index === parts.length - 1) {
            current[part] = value;
        } else {
            current = current[part];
        }
    });
}

const targetObject = computed(() => (isDarkMode.value ? props.dark : props.light));

function updateSelectValue(event) {
    const value = event.target.value;
    setNestedAttribute(targetObject.value, props.attr, value);
    nestedAttribute.value = value;
    emit('change')
}

const nestedAttribute = computed({
    get() {
        return getNestedAttribute(isDarkMode.value ? props.dark : props.light, props.attr);
    },
    set(value) {
        const targetObject = isDarkMode.value ? props.dark : props.light;
        setNestedAttribute(targetObject, props.attr, value);
    }
});

onMounted(() => {
    initialValue.value = nestedAttribute.value;
});

function resetValue() {
    nestedAttribute.value = initialValue.value;
    emit('change')
}

watch(() => store.isDarkMode, (_val) => {
    nestedAttribute.value = getNestedAttribute(isDarkMode.value ? props.dark : props.light, props.attr);
    initialValue.value = nestedAttribute.value;
});

const showResetButton = computed(() => initialValue.value !== nestedAttribute.value)

const defaultValueTranslation = ref({
    en: 'Default value:',
    fr: 'Valeur par défaut:',
    pt: 'Valor padrão:',
    de: 'Standardwert:',
    zh: '默认值：',
    jp: 'デフォルト値:',
    es: 'Valor predeterminado:',
    ar: 'القيمة الافتراضية:'
})

const isSelected = ref(false);

</script>

<template>
    <div class="relative min-h-[32px] py-1" @mouseenter="isSelected=true" @mouseout="isSelected=false">
        <FlexibleTooltip position="bottom" :mute="!tooltip" :content="tooltip" width="min-w-[100px] max-w-[300px]">
            {{ name }}:
            <template v-if="type === 'number'">
                <BaseNumberInput v-model:value="nestedAttribute" :min="min" :max="max" :step="step" @change="emit('change')"/>
            </template>
            <template v-if="type === 'text'">
                <input type="text" v-model="nestedAttribute" @change="emit('change')">
            </template>
            <template v-if="type === 'color'">
                <BaseColorInput v-if="rgba" v-model:value="nestedAttribute" @change="emit('change')"/>
                <input v-else type="color" v-model="nestedAttribute" @change="emit('change')">
            </template>
            <template v-if="type === 'range'">
                <div class="inline-flex place-items-center justify-center gap-2 relative h-[32px] bg-[#1A1A1A10] dark:bg-[#FFFFFF10] p-2 rounded-full shadow-md  dark:border-t dark:border-[#6A6A6A]">
                    <div class="text-xs z-0 pointer-events-none bg-[#4A4A4A] dark:bg-black px-2 rounded-lg min-w-[64px] text-center text-white tabular-nums">{{ nestedAttribute }}</div>
                    <input :title="nestedAttribute" type="range" v-model="nestedAttribute" :min="min" :max="max" :step="step" class="accent-app-blue z-10" @change="emit('change')">
                </div>
            </template>
            <template v-if="type === 'checkbox'">
                <input 
                    type="checkbox" 
                    :checked="nestedAttribute === true" 
                    @change="nestedAttribute = $event.target.checked; emit('change')"
                    class="accent-app-blue"
                />
            </template>
            <template v-if="type === 'select'">
                <select :value="nestedAttribute" @change="updateSelectValue" class="h-[28px]">
                    <option v-for="o in options" :key="o" :value="o">{{ o }}</option>
                </select>
            </template>
            <span dir="auto" class="pl-2 text-gray-600 dark:text-gray-400"> 
                <span class="text-xs">{{ defaultValueTranslation[store.lang] }}</span> 
                <span dir="ltr" class="text-black dark:text-white pl-1">{{ defaultVal }}</span>
                <span class="ml-4">
                    <BaseColorInfo v-if="type === 'color'" :color="defaultVal"/>
                </span>
            </span>
            <BaseComment v-if="comment">{{ comment }}</BaseComment>
            <Transition name="fade">
                <button
                    class="h-[24px] w-[24px] absolute flex -left-[26px] top-1/2 -translate-y-1/2 place-items-center justify-center p-0.5 rounded-full bg-gradient-to-b from-app-gold to-app-orange text-black hover:-rotate-90 shadow-md transition-all border border-white"
                    v-if="showResetButton && type !== 'checkbox'" 
                    @click="resetValue"
                >
                    <RefreshDotIcon/>
                </button>
            </Transition>
        </FlexibleTooltip>
</div>
</template>
