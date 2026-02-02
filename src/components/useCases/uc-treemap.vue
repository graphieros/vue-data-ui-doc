<script setup>
import { ref, computed } from "vue";
import SUMMER1 from "../../assets/treemap/summer1.png"
import SUMMER2 from "../../assets/treemap/summer2.png"
import SUMMER3 from "../../assets/treemap/summer3.png"
import SUMMER4 from "../../assets/treemap/summer4.png"

import SPRING1 from "../../assets/treemap/spring1.png"
import SPRING2 from "../../assets/treemap/spring2.png"
import SPRING3 from "../../assets/treemap/spring3.png"

import FALL1 from "../../assets/treemap/fall1.png"
import FALL2 from "../../assets/treemap/fall2.png"
import FALL3 from "../../assets/treemap/fall3.png"

import WINTER1 from "../../assets/treemap/winter1.png"
import WINTER2 from "../../assets/treemap/winter2.png"
import WINTER3 from "../../assets/treemap/winter3.png"
import { useMainStore } from "../../stores";
import UseCaseTitle from "./UseCaseTitle.vue";
import CodeParser from "../customization/CodeParser.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

function makeRandVal() {
    return Math.max(20, Math.random() * 100)
}

const dataset = computed(() => ([
    {
        name: 'SUMMER',
        color: '#FFD54F',
        children: [
            {
                name: 'Summer 1',
                value: makeRandVal(),
                color: '#FFD54F',
                url: SUMMER1,
            },
            {
                name: 'Summer 2',
                value: makeRandVal(),
                color: '#FFD54F',
                url: SUMMER2,
            },
            {
                name: 'Summer 3',
                value: makeRandVal(),
                color: '#FFD54F',
                url: SUMMER3,
            },
            {
                name: 'Summer 4',
                value: makeRandVal(),
                color: '#FFD54F',
                url: SUMMER4,
            }
        ]
    },
    {
        name: 'SPRING',
        color: '#98df8a',
        children: [
            {
                name: 'Spring 1',
                value: makeRandVal(),
                color: '#98df8a',
                url: SPRING1,
            },
            {
                name: 'Spring 2',
                value: makeRandVal(),
                color: '#98df8a',
                url: SPRING2,
            },
            {
                name: 'Spring 3',
                value: makeRandVal(),
                color: '#98df8a',
                url: SPRING3,
            }
        ]
    },
    {
        name: 'FALL',
        color: '#ff7f0e',
        children: [
            {
                name: 'Fall 1',
                value: makeRandVal(),
                color: '#ff7f0e',
                url: FALL1,
            },
            {
                name: 'Fall 2',
                value: makeRandVal(),
                color: '#ff7f0e',
                url: FALL2,
            },
            {
                name: 'Fall 3',
                value: makeRandVal(),
                color: '#ff7f0e',
                url: FALL3,
            }
        ]
    },
    {
        name: 'WiNTER',
        color: '#E1E5E8',
        children: [
            {
                name: 'Winter 1',
                value: makeRandVal(),
                color: '#E1E5E8',
                url: WINTER1,
            },
            {
                name: 'Winter 2',
                value: makeRandVal(),
                color: '#E1E5E8',
                url: WINTER2,
            },
            {
                name: 'Winter 3',
                value: makeRandVal(),
                color: '#E1E5E8',
                url: WINTER3,
            },
        ]
    }
].map(el => ({
    ...el,
    value: el.children.map(c => c.value).reduce((a, b) => a + b, 0)
}))))

const config = computed(() => ({
    theme: isDarkMode.value ? 'dark' : '',
    userOptions: { show: false },
    style: {
        chart: {
            backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            legend: {
                backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            },
            layout: {
                rects: {
                    group: {
                        stroke: isDarkMode.value ? '#4A4A4A' : '#E1E5E8'
                    }
                }
            }
        }
    }
}));

const title = ref({
    en: 'Just images',
    fr: 'Uniquement des images',
    pt: 'Apenas imagens',
    de: 'Nur Bilder',
    zh: '仅图片',
    ja: '画像のみ',
    es: 'Solo imágenes',
    ko: '이미지만',
    ar: 'صور فقط'
});

const code = ref(`&lt;script setup&gt;
    import { ref, computed } from "vue";
    import SUMMER1 from "../../assets/treemap/summer1.png"
    import SUMMER2 from "../../assets/treemap/summer2.png"
    import SUMMER3 from "../../assets/treemap/summer3.png"
    import SUMMER4 from "../../assets/treemap/summer4.png"

    import SPRING1 from "../../assets/treemap/spring1.png"
    import SPRING2 from "../../assets/treemap/spring2.png"
    import SPRING3 from "../../assets/treemap/spring3.png"

    import FALL1 from "../../assets/treemap/fall1.png"
    import FALL2 from "../../assets/treemap/fall2.png"
    import FALL3 from "../../assets/treemap/fall3.png"

    import WINTER1 from "../../assets/treemap/winter1.png"
    import WINTER2 from "../../assets/treemap/winter2.png"
    import WINTER3 from "../../assets/treemap/winter3.png"
    import { useMainStore } from "../../stores";
    import UseCaseTitle from "./UseCaseTitle.vue";
    import CodeParser from "../customization/CodeParser.vue";

    const store = useMainStore();
    const isDarkMode = computed(() => store.isDarkMode);

    function makeRandVal() {
        return Math.max(20, Math.random() * 100)
    }

    const dataset = computed(() => ([
        {
            name: 'SUMMER',
            color: '#FFD54F',
            children: [
                {
                    name: 'Summer 1',
                    value: makeRandVal(),
                    color: '#FFD54F',
                    url: SUMMER1,
                },
                {
                    name: 'Summer 2',
                    value: makeRandVal(),
                    color: '#FFD54F',
                    url: SUMMER2,
                },
                {
                    name: 'Summer 3',
                    value: makeRandVal(),
                    color: '#FFD54F',
                    url: SUMMER3,
                },
                {
                    name: 'Summer 4',
                    value: makeRandVal(),
                    color: '#FFD54F',
                    url: SUMMER4,
                }
            ]
        },
        {
            name: 'SPRING',
            color: '#98df8a',
            children: [
                {
                    name: 'Spring 1',
                    value: makeRandVal(),
                    color: '#98df8a',
                    url: SPRING1,
                },
                {
                    name: 'Spring 2',
                    value: makeRandVal(),
                    color: '#98df8a',
                    url: SPRING2,
                },
                {
                    name: 'Spring 3',
                    value: makeRandVal(),
                    color: '#98df8a',
                    url: SPRING3,
                }
            ]
        },
        {
            name: 'FALL',
            color: '#ff7f0e',
            children: [
                {
                    name: 'Fall 1',
                    value: makeRandVal(),
                    color: '#ff7f0e',
                    url: FALL1,
                },
                {
                    name: 'Fall 2',
                    value: makeRandVal(),
                    color: '#ff7f0e',
                    url: FALL2,
                },
                {
                    name: 'Fall 3',
                    value: makeRandVal(),
                    color: '#ff7f0e',
                    url: FALL3,
                }
            ]
        },
        {
            name: 'WiNTER',
            color: '#E1E5E8',
            children: [
                {
                    name: 'Winter 1',
                    value: makeRandVal(),
                    color: '#E1E5E8',
                    url: WINTER1,
                },
                {
                    name: 'Winter 2',
                    value: makeRandVal(),
                    color: '#E1E5E8',
                    url: WINTER2,
                },
                {
                    name: 'Winter 3',
                    value: makeRandVal(),
                    color: '#E1E5E8',
                    url: WINTER3,
                },
            ]
        }
    ].map(el => ({
        ...el,
        value: el.children.map(c => c.value).reduce((a, b) => a + b, 0)
    }))))

    const config = computed(() => ({
        theme: isDarkMode.value ? 'dark' : '',
        userOptions: { show: false },
        style: {
            chart: {
                backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                legend: {
                    backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                },
                layout: {
                    rects: {
                        group: {
                            stroke: isDarkMode.value ? '#4A4A4A' : '#E1E5E8'
                        }
                    }
                }
            }
        }
    }));
&lt;script&gt;

&lt;template&gt;
    <div class="treemap-pics">
        <VueUiTreemap :dataset="dataset" :config="config">
            <template #rect="{ rect }">
                <div style="height:100%; width: 100%">
                    <img
                        :src="rect.url"
                        :style="{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'opacity 0.3s',
                            opacity: rect.isSelected ? 1 : 0.6
                        }"
                    />
                </div>
            </template>
        </VueUiTreemap>
    </div>
&lt;/template&gt;

&lt;style&gt;
    .treemap-pics .vue-ui-treemap-cell,
    .treemap-pics .vue-ui-treemap-cell-foreignObject {
        padding: 0;
    }
&lt;/style&gt;
`)

</script>

<template>
    <UseCaseTitle>
        <template #title>
            <div>
                <div class="w-full mb-2">
                    {{ title[store.lang] }}
                </div>
            </div>
        </template>
    </UseCaseTitle>
    <div class="treemap-pics">
        <VueUiTreemap :dataset="dataset" :config="config">
            <template #rect="{ rect }">
                <div style="height:100%; width: 100%">
                    <img
                        :src="rect.url"
                        :style="{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'opacity 0.3s',
                            opacity: rect.isSelected ? 1 : 0.6
                        }"
                    />
                </div>
            </template>
        </VueUiTreemap>

        <CodeParser
            language="html"
            :content="code"
            @copy="store.copy"
        />
    </div>
</template>

<style>
    .treemap-pics .vue-ui-treemap-cell,
    .treemap-pics .vue-ui-treemap-cell-foreignObject {
        padding: 0;
    }
</style>
