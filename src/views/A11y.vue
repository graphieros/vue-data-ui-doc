<script setup>
import { ref, computed, shallowRef } from "vue";
import BaseCrumbs from "../components/BaseCrumbs.vue";
import { useMainStore } from "../stores";
import { useRouter } from "vue-router";
import useMobile from "../useMobile";
import BaseCard from "../components/BaseCard.vue";
import ConfirmCopy from "../components/ConfirmCopy.vue";
import CodeParser from "../components/customization/CodeParser.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);
const translations = computed(() => store.translations);


const docsCrumbs = ref([
    {
        description: translations.value.menu.docs[store.lang],
        link: '/docs'
    },
    {
        description: translations.value.menu.customization[store.lang],
        link: '/customization'
    },
    {
        description: 'a11y',
    },
]);

async function copyToClipboard(text) {
    if (!text && text !== 0) return false;

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(String(text));
            return true;
        }

        // Fallback for older browsers or non-secure contexts
        const textarea = document.createElement("textarea");
        textarea.value = String(text);
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";
        textarea.setAttribute("readonly", "");
        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);

        return successful;
    } catch (err) {
        console.error("Failed to copy:", err);
        return false;
    }
}

function replaceQueries(template, values) {
    if (typeof template !== 'string' || !values) return '';
    return template.replace(/{([^}]+)}/g, (_match, name) => values[name]);
}

const altCopyTranslations = {
    en: `This {chartType} chart shows a series named {seriesName}, starting from {startValue}, ending with {endValue}.`,
    fr: `Ce graphique de type {chartType} présente une série nommée {seriesName}, commençant à {startValue} et se terminant à {endValue}.`,
    pt: `Este gráfico do tipo {chartType} apresenta uma série chamada {seriesName}, começando em {startValue} e terminando em {endValue}.`,
    de: `Dieses Diagramm vom Typ {chartType} zeigt eine Serie namens {seriesName}, beginnend bei {startValue} und endend bei {endValue}.`,
    zh: `此{chartType}图表显示了一个名为{seriesName}的系列，从{startValue}开始，到{endValue}结束。`,
    ja: `この{chartType}チャートは、{seriesName}という名前の系列を示しており、{startValue}から始まり、{endValue}で終わります。`,
    es: `Este gráfico de tipo {chartType} muestra una serie llamada {seriesName}, que comienza en {startValue} y termina en {endValue}.`,
    ko: `이 {chartType} 차트는 {seriesName}라는 이름의 시리즈를 보여주며, {startValue}에서 시작하여 {endValue}에서 끝납니다.`,
    ar: `يعرض هذا المخطط من نوع {chartType} سلسلة باسم {seriesName}، تبدأ من {startValue} وتنتهي عند {endValue}.`,
}

function createAltTextAndCopy({ dataset: dst, config: cfg }) {
    const { type: chartType, name: seriesName, series } = dst.bars[0];
    const startValue = series[0];
    const endValue = series.at(-1);
    const alt = replaceQueries(altCopyTranslations[store.lang], { chartType, seriesName, startValue, endValue });
    copyToClipboard(alt);
    store.copy({ message: alt, type: 'success'});
}

const snippets = computed(() => ({
    replaceQueries: `// replaceQueries("Example of {name} chart with maximum value '{max}'", { name: "XY", max: "100" })
function replaceQueries(template, values) {
    if (typeof template !== 'string' || !values) return '';
    return template.replace(/{([^}]+)}/g, (_match, name) => values[name]);
}`,
    createAltTextAndCopy: `function createAltTextAndCopy({ dataset: dst, config: cfg }) {
    const { type: chartType, name: seriesName, series } = dst.bars[0];
    const startValue = series[0];
    const endValue = series.at(-1);
    const alt = replaceQueries(altCopyTranslations[store.lang], { 
        chartType, 
        seriesName, 
        startValue, 
        endValue 
    });
    copyToClipboard(alt);
    // ${translations.value.a11y.use_success_feedback[store.lang]}
}`,
    config: `const config = computed(() => ({
    chart: {
        userOptions: {
            buttons: {
                altCopy: true, // ${translations.value.a11y.enable_a11y_button[store.lang]}
            },
            callbacks: {
                altCopy: createAltTextAndCopy
            }
        }
    }
}))`,
    config_pointer: `const config = computed(() => ({
    useCursorPointer: true, // ${translations.value.a11y.cursor_pointer_updated_at[store.lang]}
}))`
}))

const dataset = shallowRef([{
    name: 'Fibonacci',
    type: 'bar',
    series: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
}]);

const config = computed(() => ({
    theme: isDarkMode.value ? 'dark' : '',
    chart: {
        backgroundColor: isDarkMode.value ? '#3A3A3A' : '#f9fafb',
        grid: {
            labels: {
                yAxis: {
                    useNiceScale: true
                }
            }
        },
        legend: {
            position: 'top'
        },
        tooltip: {
            showPercentage: false,
        },
        userOptions: {
            buttons: {
                altCopy: true, // enable the a11y copyAlt option

                // Disabling other buttons just to make this example simpler
                annotator: false,
                csv: false,
                fullscreen: false,
                labels: false,
                pdf: false,
                table: false,
                tooltip: false,
            },
            callbacks: {
                altCopy: createAltTextAndCopy
            }
        },
        zoom: {
            minimap: {
                show: true
            }
        }
    }
}))

</script>

<template>
    <BaseCrumbs :tree="docsCrumbs" noMargin/>

    <div class="my-12 w-full mx-auto text-center max-w-[1200px] px-4">
        <div class="w-full flex flex-row gap-4 place-items-center justify-center my-12">
            <VueUiIcon class="hidden md:block" name="accessibility" :size="80" :strokeWidth="0.8" :stroke="isDarkMode ? '#de8b37' : '#de8b37'"/>
            <h1 :class="`font-inter-bold text-[48px] sm:text-[72px] text-center ${isDarkMode ? 'bg-gradient-to-r from-app-green to-indigo-400 bg-clip-text text-transparent' : 'text-vue-blue'}`" style="letter-spacing: -1px;">
                a11y
            </h1>
        </div>

        <div class="flex flex-col gap-6">
            <!-- COPY ALT EXAMPLE -->
            <BaseCard>
                <article dir="auto">
                    <h2 class="text-left font-inter-medium text-xl flex gap-2">
                        <VueUiIcon name="accessibility" :stroke="isDarkMode ? '#6A6A6A' : '#CCCCCC'"/>
                        {{ translations.a11y.alt_menu[store.lang] }}
                    </h2>
                    <p class="text-left my-4 max-w-[80ch]">
                        {{ translations.a11y.copy_alt_text_description[store.lang] }}
                    </p>
                    <p class="text-left my-4 max-w-[80ch]">
                        {{ translations.a11y.copy_alt_text_instructions[store.lang] }}
                    </p>
                </article>
    
                <div class="flex flex-col gap-4">
                    <BaseCard class="max-w-[500px] mx-auto" type="light">
                        <VueUiXy :dataset :config></VueUiXy>
                    </BaseCard>
                    
                    <CodeParser language="javascript" :content="snippets.config" class="text-left" @copy="store.copy"/>
                    <CodeParser language="javascript" :content="snippets.createAltTextAndCopy" class="text-left" @copy="store.copy"/>
                    <CodeParser language="javascript" :content="snippets.replaceQueries" class="text-left" @copy="store.copy"/>
                </div>
            </BaseCard>
    
            <!-- CURSOR POINTER OR NOT EXAMPLE -->
            <BaseCard>
                <article dir="auto">
                    <h2 class="text-left font-inter-medium text-xl flex gap-2">
                        <VueUiIcon name="pointer" :stroke="isDarkMode ? '#6A6A6A' : '#CCCCCC'"/>
                        {{ translations.a11y.cursor_pointer[store.lang] }}
                    </h2>
                    <p class="text-left my-4 max-w-[80ch]">
                        {{ translations.a11y.cursor_pointer_presentation[store.lang] }}
                    </p>
                </article>
                <CodeParser language="javascript" :content="snippets.config_pointer" class="text-left" @copy="store.copy"/>
            </BaseCard>
        </div>

    </div>
    <ConfirmCopy />
</template>