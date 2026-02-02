<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const model = defineModel();

const isDarkMode = computed(() => store.isDarkMode);

const translations = ref({
    label: {
        en: 'Loading state',
        fr: 'État de chargement',
        pt: 'Estado de carregamento',
        de: 'Ladezustand',
        zh: '加载状态',
        ja: '読み込み状態',
        es: 'Estado de carga',
        ar: 'حالة التحميل'
    },
    description: {
        en: 'The loading state will be visible if props.datset is undefined, or if you set config.loading to true.',
        fr: 'L’état de chargement sera visible si props.datset est indéfini, ou si vous définissez config.loading sur true.',
        pt: 'O estado de carregamento será visível se props.datset estiver indefinido ou se você definir config.loading como true.',
        de: 'Der Ladezustand wird sichtbar, wenn props.datset nicht definiert ist oder wenn Sie config.loading auf true setzen.',
        zh: '如果 props.datset 未定义，或者将 config.loading 设置为 true，则会显示加载状态。',
        ja: 'props.datset が未定義の場合、または config.loading を true に設定した場合、読み込み状態が表示されます。',
        es: 'El estado de carga será visible si props.datset no está definido o si config.loading se establece en true.',
        ko: 'props.datset이 정의되지 않았거나 config.loading을 true로 설정하면 로딩 상태가 표시됩니다.',
        ar: 'ستكون حالة التحميل مرئية إذا كان props.datset غير معرّف، أو إذا قمت بتعيين config.loading إلى true.'
    }
});

</script>

<template>
    <div class="w-full max-w-[500px] flex flex-col gap-2 place-items-center justify-center my-4 p-4 bg-[#1A1A1A10] dark:bg-[#FFFFFF10] rounded">
        <div class="text-xs flex flex-row gap-2 align-center justify-center">
            <div class="w-[40px] h-[40px]">
                <VueUiIcon :class="{ 'animate-spin' : model }" name="hourglass" :stroke="isDarkMode ? model ? '#83a4f2' : '#CCCCCC' : model ? '#5f8aee' : '#1A1A1A'"/>
            </div>
            {{ translations.description[store.lang] }}
        </div>
        <label>
            {{ translations.label[store.lang] }}
            <input type="checkbox" v-model="model">
        </label>
    </div>
</template>
