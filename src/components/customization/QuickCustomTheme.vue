<script setup>
import { ref, computed } from "vue";
import BaseCard from "../BaseCard.vue";
import { getVueDataUiConfig, mergeConfigs } from "vue-data-ui";
import CodeParser from "./CodeParser.vue";
import { useMainStore } from "../../stores";
import BaseColorInput from "../BaseColorInput.vue";
import BaseButton from "../Base/BaseButton.vue";

const store = useMainStore();

const dataset = ref([
    {
        name: 'Series A',
        series: [0, 1, 1, 2, 3, 5],
        type: 'line',
        useArea: true,
        smooth: true
    }
])

const knobs = ref({
    colorBackground: '#1A1A1A',
    colorTextPrimary: '#CD9077',
    colorTextSecondary: '#825848',
    colorGrid: '#CD9077',
    colorBorder: '#CD9077'
});

function reset() {
    knobs.value.colorBackground = '#1A1A1A';
    knobs.value.colorTextPrimary = '#CD9077';
    knobs.value.colorTextSecondary = '#825848';
    knobs.value.colorGrid = '#CD9077';
    knobs.value.colorBorder = '#CD9077';
}

const custom = computed(() => {
    return getVueDataUiConfig('vue_ui_xy', {
        colorBackground: knobs.value.colorBackground,
        colorTextPrimary: knobs.value.colorTextPrimary,
        colorTextSecondary: knobs.value.colorTextSecondary,
        colorGrid: knobs.value.colorGrid,
        colorBorder: knobs.value.colorBorder
    });
});

const config = computed(() => {
    return mergeConfigs({
        defaultConfig: custom.value,
        userConfig: {
            chart: {
                title: {
                    text: 'Title',
                    subtitle: {
                        text: 'Subtitle'
                    }
                }
            }
        }
    })
});

const code = computed(() => {
    return `<script setup>
import { computed, ref } from "vue";
import { getVueDataUiConfig, mergeConfigs } from "vue-data-ui";
import { VueUiXy } from "vue-data-ui/vue-ui-xy"; // Treeshaken component import

// Get the default config and set color options
const custom = computed(() => {
    return getVueDataUiConfig('vue_ui_xy', {
        colorBackground: "${knobs.value.colorBackground}",
        colorTextPrimary: "${knobs.value.colorTextPrimary}",
        colorTextSecondary: "${knobs.value.colorTextSecondary}",
        colorGrid: "${knobs.value.colorGrid}",
        colorBorder: "${knobs.value.colorBorder}"
    });
});

const config = computed(() => {
  // Use the \`mergeConfigs\` utility to set additional configurations while preserving your theme
    return mergeConfigs({
        defaultConfig: custom.value,
        userConfig: {
            chart: {
                title: {
                    text: "Title",
                    subtitle: {
                        text: "Subtitle"
                    }
                }
            }
        }
    });
});

const dataset = ref([
    {
        name: "Series A",
        series: [0, 1, 1, 2, 3, 5],
        type: "line",
        useArea: true,
        smooth: true
    }
]);
\</script\>

\<template>
    \<VueUiXy :dataset="dataset" :config="config" />
\</template>
`
});

const presentation = ref({
    en: 'Quickly setup a custom theme by providing general colors used on backgrounds, labels and grids.',
    fr: 'Configurez rapidement un thème personnalisé en définissant des couleurs générales utilisées pour les arrière-plans, les libellés et les grilles.',
    pt: 'Configure rapidamente um tema personalizado fornecendo cores gerais usadas em fundos, rótulos e grades.',
    de: 'Richten Sie schnell ein benutzerdefiniertes Design ein, indem Sie allgemeine Farben für Hintergründe, Beschriftungen und Raster festlegen.',
    zh: '通过提供用于背景、标签和网格的通用颜色，快速设置自定义主题。',
    ja: '背景、ラベル、グリッドに使用される一般的な色を指定して、カスタムテーマを素早く設定できます。',
    es: 'Configura rápidamente un tema personalizado proporcionando colores generales utilizados en fondos, etiquetas y cuadrículas.',
    ko: '배경, 레이블 및 그리드에 사용되는 일반 색상을 제공하여 사용자 정의 테마를 빠르게 설정할 수 있습니다.',
    ar: 'قم بإعداد سمة مخصصة بسرعة من خلال تحديد الألوان العامة المستخدمة في الخلفيات والتسميات والشبكات.'
});

</script>

<template>
    <div class="mx-auto max-w-[1250px] px-6 mt-6">
        <h2 class="text-center mx-auto max-w-[60ch] mb-6">{{ presentation[store.lang] }}</h2>
        <BaseCard class="sm:flex sm:flex-col gap-4">
            <div class="sm:flex sm:flex-row gap-4 place-content-center place-items-center justify-center mb-4 sm:mb-2">
                <div class="w-full sm:w-1/2 flex flex-col gap-4 place-items-center justify-center mb-4 sm:mb-0">
                    <BaseColorInput labelAsCode v-model:value="knobs.colorBackground" label="colorBackground" labelId="colorBackground"/>
                    <BaseColorInput labelAsCode v-model:value="knobs.colorTextPrimary" label="colorTextPrimary" labelId="colorTextPrimary"/>
                    <BaseColorInput labelAsCode v-model:value="knobs.colorTextSecondary" label="colorTextSecondary" labelId="colorTextSecondary"/>
                    <BaseColorInput labelAsCode v-model:value="knobs.colorGrid" label="colorGrid" labelId="colorGrid"/>
                    <BaseColorInput labelAsCode v-model:value="knobs.colorBorder" label="colorBorder" labelId="colorBorder"/>

                    <BaseButton @click="reset" fab tw="p-0.5" tooltip="reset" tooltip-position="right">
                        <VueUiIcon name="refresh" stroke="#1A1A1A"/>
                    </BaseButton>
                </div>
                <BaseCard class="w-full h-fit sm:w-1/2 flex flex-row place-items-center justify-center" :style="`backgroundColor: ${knobs.colorBackground} !important;`">
                    <VueUiXy :dataset="dataset" :config="config"/>
                </BaseCard>
            </div>
            <CodeParser language="javascript" :content="code" @copy="store.copy()"/>
        </BaseCard>
    </div>
</template>
