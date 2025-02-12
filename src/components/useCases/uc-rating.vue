<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";

const store = useMainStore();

const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);

const dataset = ref({ rating: 1 });

const r = ref(dataset.value.rating);
function setRating(rat) {
    r.value = rat;
}

const config = computed(() => {
    return {
    type: "star",
    readonly: false,
    from: 1,
    to: 5,
    style: {
        fontFamily: "inherit",
        animated: true,
        itemSize: 32,
        backgroundColor: "transparent",
        star: {
            activeColor: "#FFD055",
            borderColor: "#FFD055",
            borderWidth: 3,
            apexes: 5,
            inactiveColor: "#e1e5e8",
            useGradient: true,
        },
        image: { src: "", inactiveOpacity: 0.3, alt: "rating image" },
        title: {
            textAlign: "center",
            fontSize: 20,
            color: "#2D353C",
            bold: true,
            text: "",
            offsetY: 6,
            subtitle: {
                fontSize: 14,
                color: "#CCCCCC",
                bold: false,
                text: "",
                offsetY: 12,
            },
        },
        rating: {
            show: true,
            fontSize: 24,
            bold: true,
            roundingValue: 1,
            position: "bottom",
            offsetY: 0,
            offsetX: 0,
            formatter: null,
        },
        tooltip: {
            show: true,
            fontSize: 14,
            offsetY: 0,
            color: "#2D353C",
            bold: true,
            backgroundColor: "#FFFFFF",
            borderColor: "#e1e5e8",
            borderRadius: 4,
            boxShadow: "0 6px 12px -6px rgba(0,0,0,0.2)",
            roundingValue: 0,
            formatter: null,
        },
    },
}
});

const colorsAbove = computed(() => {
    return {
        '1': isDarkMode.value ? '#997d33' : '#5A5A5A',
        '2': isDarkMode.value ? '#b3923c' : '#4A4A4A',
        '3': isDarkMode.value ? '#cca644' : '#3A3A3A',
        '4': isDarkMode.value ? '#e6bb4d' : '#2A2A2A',
        '5': isDarkMode.value ? '#FFD055' : '#1A1A1A',
    }
})

const colorUnder = computed(() => isDarkMode.value ? '#2A2A2A' : '#6A6A6A')
const colorFocus = computed(() => isDarkMode.value ? '#3A3A3A' : '#CCCCCC')

const description = ref({
    en: "Customization of rating units with #layer-under and #layer-above slots.",
    fr: "Personnalisation des unités de notation avec les slots #layer-under et #layer-above.",
    pt: "Personalização das unidades de avaliação com os slots #layer-under e #layer-above.",
    de: "Anpassung von Bewertungseinheiten mit den Slots #layer-under und #layer-above.",
    zh: "使用 #layer-under 和 #layer-above 插槽自定义评分单元。",
    jp: "#layer-under と #layer-above スロットで評価単位をカスタマイズします。",
    es: "Personalización de las unidades de calificación con los slots #layer-under y #layer-above.",
    ko: "#layer-under 및 #layer-above 슬롯으로 평가 단위를 사용자 지정합니다.",
    ar: "تخصيص وحدات التقييم باستخدام فتحات #layer-under و #layer-above."
})

</script>

<template>
    <div>
        {{ description[store.lang] }}
        <div class="p-4 pt-12">
            <VueUiRating :dataset="dataset" :config="config" ref="build" @rate="setRating">
                <template #layer-under="{ value, size, focusedValue }">
                    <svg viewBox="0 0 10 10" :style="{ overflow: 'visible' }">
                        <path v-if="value === 1" :stroke="focusedValue === value ? colorUnder : colorFocus"
                            stroke-linecap="round" d="M 0 5 L 10 4 L 10 6 L 0 5 Z" :fill="colorFocus" />
                        <path v-if="value === 2" :stroke="focusedValue === value ? colorUnder : colorFocus"
                            stroke-linecap="round" d="M 0 4 L 10 3 L 10 7 L 0 6 Z" :fill="colorFocus" />
                        <path v-if="value === 3" :stroke="focusedValue === value ? colorUnder : colorFocus"
                            stroke-linecap="round" d="M 0 3 L 10 2 L 10 8 L 0 7 Z" :fill="colorFocus" />
                        <path v-if="value === 4" :stroke="focusedValue === value ? colorUnder : colorFocus"
                            stroke-linecap="round" d="M 0 2 L 10 1 L 10 9 L 0 8 Z" :fill="colorFocus" />
                        <path v-if="value === 5" :stroke="focusedValue === value ? colorUnder : colorFocus"
                            stroke-linecap="round" d="M 0 1 L 10 0 L 10 10 L 0 9 Z" :fill="colorFocus" />
                    </svg>
                </template>
                <template #layer-above="{ value, size, hoveredValue, focusedValue }">
                    <svg viewBox="0 0 10 10" :style="{ overflow: 'visible' }">
                        <path v-if="value === 1" :fill="colorsAbove[value]" :stroke="colorsAbove[value]" stroke-linecap="round"
                            d="M 0 5 L 10 4 L 10 6 L 0 5 Z"
                            :style="{ opacity: value <= r || value < hoveredValue ? 1 : 0 }" />
                        <path v-if="value === 2" :fill="colorsAbove[value]" :stroke="colorsAbove[value]" stroke-linecap="round"
                            d="M 0 4 L 10 3 L 10 7 L 0 6 Z"
                            :style="{ opacity: value <= r || value <= hoveredValue ? 1 : 0 }" />
                        <path v-if="value === 3" :fill="colorsAbove[value]" :stroke="colorsAbove[value]" stroke-linecap="round"
                            d="M 0 3 L 10 2 L 10 8 L 0 7 Z"
                            :style="{ opacity: value <= r || value <= hoveredValue ? 1 : 0 }" />
                        <path v-if="value === 4" :fill="colorsAbove[value]" :stroke="colorsAbove[value]" stroke-linecap="round"
                            d="M 0 2 L 10 1 L 10 9 L 0 8 Z"
                            :style="{ opacity: value <= r || value <= hoveredValue ? 1 : 0 }" />
                        <path v-if="value === 5" :fill="colorsAbove[value]" :stroke="colorsAbove[value]" stroke-linecap="round"
                            d="M 0 1 L 10 0 L 10 10 L 0 9 Z"
                            :style="{ opacity: value <= r || value <= hoveredValue ? 1 : 0 }" />
                    </svg>
                </template>
            </VueUiRating>
        </div>
    </div>
</template>
