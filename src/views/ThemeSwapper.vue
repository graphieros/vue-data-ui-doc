<script setup>
import { ref, computed, onMounted, watch } from "vue";
import BackgroundPattern from "../components/BackgroundPattern.vue";
import BaseMenuPattern from "../components/BaseMenuPattern.vue";
import BaseCrumbs from "../components/BaseCrumbs.vue";
import useMobile from "../useMobile";
import { useMainStore } from "../stores";
import BaseCard from "../components/BaseCard.vue";
import CodeParser from "../components/customization/CodeParser.vue";
import { useRoute, useRouter } from "vue-router";

const store = useMainStore();
const translations = computed(() => store.translations);
const lang = computed(() => store.lang);
const isDarkMode = computed(() => store.isDarkMode);
const { isMobile } = useMobile();
const router = useRouter();
const route = useRoute();

const themes = [
    'default',
    'dark',
    'minimal',
    'minimalDark',
    'celebration',
    'celebrationNight',
    'zen',
    'concrete',
    'hack'
];

const background = {
    default: 'bg-[#FFFFFF]',
    dark: 'bg-[#1A1A1A]',
    minimal: 'bg-[#FFFFFF]',
    minimalDark: 'bg-[#1A1A1A]',
    celebration: 'bg-[#FFF8E1]',
    celebrationNight: 'bg-[#1E1E1E]',
    zen: 'bg-[#fbfafa]',
    concrete: 'bg-[#f6f6fb]',
    hack: 'bg-[#1A1A1A]'
}

onMounted(() => {
    window.scrollTo(0,0)
});

const crumbs = ref([
    {
        description: translations.value.menu.docs[store.lang],
        link: '/docs'
    },
    {
        description: translations.value.menu.examples[store.lang],
        link: '/examples'
    },
    {
        description: 'Themes'
    }
]);

const currentTheme = ref('default');

watch(() => router.currentRoute.value, (r) => {
    const hash = router.currentRoute.value.hash;
    if (!hash) {
        currentTheme.value = isDarkMode.value ? 'dark' : 'default'
    } else {
        currentTheme.value = hash.replaceAll('#', '');
    }
}, { immediate: true })


const step = ref(0);

const code = computed(() => {
    return `const config = ref({
    theme: '${currentTheme.value === 'default' ? '' : currentTheme.value}',
})`
})

function selectTheme(theme) {
    currentTheme.value = theme;
    step.value += 1;
    router.push({
        path: route.path,
        query: route.query,
        hash: `#${theme}`
    })
}

const DATASET_XY = ref([
    {
        name: 'Series A',
        series: [0, 0.5, 0.5, 1, 1.5, 2.5, 4, 6.5, 10.5],
        type: 'bar'
    },
    {
        name: 'Series B',
        series: [0, 1, 1, 2, 3, 5, 8, 13, 21],
        type: 'bar'
    },
    {
        name: 'Series C',
        series: [0, 3, 3, 5, 6, 8, 11, 16, 24],
        type: 'line',
        smooth: true
    },
]);

const CONFIG_XY = computed(() => {
    return {
        theme: currentTheme.value,
        chart: {
            title: {
                text: 'Title',
                textAlign: 'left',
                paddingLeft: 12,
                subtitle: {
                    text: 'Subtitle'
                }
            },
            zoom: {
                minimap: {
                    show: true
                }
            }
        }
    }
});

const DATASET_DONUT = ref([
    {
        name: 'Series A',
        values: [3]
    },
    {
        name: 'Series B',
        values: [2]
    },
    {
        name: 'Series C',
        values: [1]
    }
]);

const CONFIG_DONUT = computed(() => {
    return {
        theme: currentTheme.value,
        style: {
            chart: {
                title: {
                    text: 'Title',
                    textAlign: 'left',
                    paddingLeft: 12,
                    subtitle: {
                        text: 'Subtitle'
                    }
                }
            }
        }
    }
});

const DATASET_STACKLINE = ref([
    {
        name: "Serie A",
        series: [19, 20.07, 30, 40, 50, 60, 25, 29, 32],
        shape: 'square',
    },
    {
        name: "Serie B",
        series: [13, 8, 9, 13, 25, 27, 16, 18, 19],
        shape: 'hexagon'
    },
    {
        name: "Serie C",
        series: [13, 10, 9, 13, 25, 19, 12, 13, 21],
        shape: 'triangle'
    },
    {
        name: "Serie D",
        series: [25, 23, 9, 13, 25, 31, 16, 19, 18],
        shape: 'star'
    },
]);

const CONFIG_STACKLINE = computed(() => {
    return {
        theme: currentTheme.value,
        style: {
            chart: {
                title: {
                    text: 'Title',
                    textAlign: 'left',
                    paddingLeft: 12,
                    subtitle: {
                        text: 'Subtitle'
                    }
                },
                zoom: {
                    minimap: {
                        show: true
                    }
                }
            }
        }
    }
});

const DATASET_BUMP = ref([
        {
        name: "JavaScript",
        values: [1.2, 1.35, 1.55, 1.75, 2.1, 2.45, 2.75, 3.05, 3.3, 3.5],
    },
    {
        name: "Python",
        values: [0.65, 0.74, 0.86, 1.02, 1.25, 1.5, 1.75, 2.05, 2.35, 2.6],
    },
    {
        name: "Java",
        values: [0.9, 0.92, 0.94, 0.96, 0.98, 1.0, 1.02, 1.04, 1.06, 1.08],
    },
    {
        name: "TypeScript",
        values: [0.06, 0.09, 0.14, 0.23, 0.38, 0.56, 0.76, 0.98, 1.2, 1.45],
    },
    {
        name: "C#",
        values: [0.52, 0.545, 0.57, 0.6, 0.64, 0.69, 0.74, 0.8, 0.86, 0.92],
    },
    {
        name: "C++",
        values: [0.48, 0.49, 0.5, 0.51, 0.525, 0.54, 0.56, 0.585, 0.61, 0.635],
    },
    {
        name: "Go",
        values: [0.045, 0.07, 0.11, 0.17, 0.26, 0.36, 0.47, 0.59, 0.72, 0.86],
    },
    {
        name: "Rust",
        values: [0.005, 0.009, 0.018, 0.035, 0.07, 0.12, 0.19, 0.28, 0.38, 0.5],
    },
    {
        name: "PHP",
        values: [0.7, 0.69, 0.68, 0.67, 0.66, 0.65, 0.64, 0.63, 0.62, 0.61],
    },
    {
        name: "Ruby",
        values: [0.23, 0.225, 0.22, 0.215, 0.21, 0.205, 0.2, 0.195, 0.19, 0.185],
    },
]);

const CONFIG_BUMP = computed(() => {
    return {
        theme: currentTheme.value,
        style: {
            chart: {
                height: 900,
                title: {
                    text: 'Title',
                    textAlign: 'left',
                    paddingLeft: 12,
                    subtitle: {
                        text: 'Subtitle'
                    }
                }
            }
        }
    }
});

const DATASET_WORD_CLOUD = ref([
    {
        "name": "lorem",
        "value": 1
    },
    {
        "name": "ipsum",
        "value": 12
    },
    {
        "name": "dolor",
        "value": 4
    },
    {
        "name": "sit",
        "value": 11
    },
    {
        "name": "amet",
        "value": 11
    },
    {
        "name": "consectetur",
        "value": 3
    },
    {
        "name": "adipiscing",
        "value": 1
    },
    {
        "name": "elit",
        "value": 8
    },
    {
        "name": "vivamus",
        "value": 3
    },
    {
        "name": "pretium",
        "value": 7
    },
    {
        "name": "venenatis",
        "value": 4
    }
]);

const CONFIG_WORD_CLOUD = computed(() => {
    return {
        theme: currentTheme.value,
        style: {
            chart: {
                title: {
                    text: 'Title',
                    textAlign: 'left',
                    paddingLeft: 12,
                    subtitle: {
                        text: 'Subtitle'
                    }
                }
            }
        }
    }
})

function makeSparklineDs(n) {
    const arr = [];
    for (let i = 0; i < n; i += 1) {
        arr.push({
            period: `Period ${i}`,
            value: Math.random() * 10
        })
    }
    return arr;
} 

const DATASET_SPARKLINE = ref(makeSparklineDs(24));

const CONFIG_SPARKLINE = computed(() => {
    return {
        theme: currentTheme.value,
        style: {
            chartWidth: 400,
            title: {
                text: 'Title',
                fontSize: 20
            },
            dataLabel: {
                fontSize: 48
            },
            line: {
                smooth: true
            },
            tooltip: {
                show: true
            }
        }
    }
});

const CONFIG_SPARKLINE_BAR = computed(() => {
    return {
        theme: currentTheme.value,
        type: 'bar',
        style: {
            chartWidth: 400,
            title: {
                text: 'Title',
                fontSize: 20
            },
            dataLabel: {
                fontSize: 48
            },
            tooltip: {
                show: true
            }
        }
    }
})

const DATASET_SPARKLINE_BAR = ref(makeSparklineDs(12));

const DATASET_SPARKSTACKBAR = ref([
    {
        name: 'A',
        value: 128
    },
    {
        name: 'B',
        value: 36
    },
    {
        name: 'C',
        value: 16
    }
]);

const CONFIG_SPARKSTACKBAR = computed(() => {
    return {
        theme: currentTheme.value,
        style: {
            animation: {
                show: false,
            },
            title: {
                text: 'Title'
            }
        }
    }
});
</script>

<template>
    <BackgroundPattern v-if="isDarkMode">
        <template #defs>
            <BaseMenuPattern
                menu="examples"
                id="pat"
                stroke="#de6937"
                patternTransform="scale(0.15) rotate(0)"
                strokeWidth="2"
            />
        </template>
    </BackgroundPattern>
    <BaseCrumbs :tree="crumbs" noMargin showMobile/>

    <div class="max-w-[1280px] px-12 2xl:px-4 mx-auto relative my-12">
        <div class="w-full flex flex-row gap-4 place-items-center justify-center my-12">
            <VueUiIcon name="palette" :size="80" :strokeWidth="0.8" class="hidden md:block" :stroke="isDarkMode ? '#de6937' : '#de6937'"/>
            <h1 class="font-inter-bold text-[48px] sm:text-[72px] text-center" style="letter-spacing: -1px;">{{ translations.builtInThemes[lang] }}</h1>
        </div>

        <div class="w-full sticky top-[100px] z-10">
            <BaseCard class="w-fit mx-auto">
                <div class="mx-auto flex flex-row flex-wrap gap-2">
                    <button 
                        v-for="theme in themes" 
                        @click="selectTheme(theme)"
                        :class="{
                            'shadow': true,
                            'bg-white px-4 py-1 rounded-full hover:bg-[#1A1A1A] hover:text-[#CCCCCC]': true,
                            'dark:bg-[#3A3A3A] dark:hover:bg-[#4A4A4A]': true,
                            '!bg-[#1A1A1A] !text-[#CCCCCC] dark:!bg-[#a24923]': currentTheme === theme
                        }"
                    >
                        {{ theme }}
                    </button>
                </div>
            </BaseCard>
        </div>

        <div class="max-w-[300px] mx-auto mt-6">
            <CodeParser language="javascript" :content="code"/>
        </div>

        <BaseCard class="mt-6">
            <div class="grid grid-cols-2 gap-4">
                <div class="col-span-2 grid grid-cols-3 gap-4">
                    <BaseCard class="w-full" :backgroundColor="background[currentTheme]">
                        <div style="display:flex; align-items:center; height: 100%; width:100%">
                            <VueUiSparkline :dataset="DATASET_SPARKLINE" :config="CONFIG_SPARKLINE" />
                        </div>
                    </BaseCard>
                    <BaseCard class="w-full" :backgroundColor="background[currentTheme]">
                        <div style="display:flex; align-items:center; height: 100%; width: 100%;">
                            <VueUiSparkStackbar :dataset="DATASET_SPARKSTACKBAR" :config="CONFIG_SPARKSTACKBAR" />
                        </div>
                    </BaseCard>
                    <BaseCard class="w-full flex flex-row !align-center" :backgroundColor="background[currentTheme]">
                        <div style="display:flex; align-items:center; height: 100%; width: 100%;">
                            <VueUiSparkline :dataset="DATASET_SPARKLINE_BAR" :config="CONFIG_SPARKLINE_BAR"/>
                        </div>
                    </BaseCard>
                </div>

                <BaseCard class="w-full" :backgroundColor="background[currentTheme]">
                    <VueUiXy :dataset="DATASET_XY" :config="CONFIG_XY" :key="`donut_${step}`"/>
                </BaseCard>
                <BaseCard class="w-full" :backgroundColor="background[currentTheme]">
                    <VueUiDonut :dataset="DATASET_DONUT" :config="CONFIG_DONUT" :key="`xy_${step}`"/>
                </BaseCard>
                <BaseCard class="w-full" :backgroundColor="background[currentTheme]">
                    <VueUiStackline :dataset="DATASET_STACKLINE" :config="CONFIG_STACKLINE" :key="`stackline_${step}`"/>
                </BaseCard>
                <BaseCard class="w-full" :backgroundColor="background[currentTheme]">
                    <VueUiStackbar :dataset="DATASET_STACKLINE" :config="CONFIG_STACKLINE" :key="`stackbar_${step}`"/>
                </BaseCard>
                <BaseCard class="w-full" :backgroundColor="background[currentTheme]">
                    <VueUiBump :dataset="DATASET_BUMP" :config="CONFIG_BUMP" :key="`bump_${step}`"/>
                </BaseCard>
                <BaseCard class="w-full" :backgroundColor="background[currentTheme]">
                    <VueUiWordCloud :dataset="DATASET_WORD_CLOUD" :config="CONFIG_WORD_CLOUD" :key="`wordcloud_${step}`"/>
                </BaseCard>
            </div>
        </BaseCard>

    </div>
</template>