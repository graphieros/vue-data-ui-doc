<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";
import BaseCard from "../BaseCard.vue";
import CodeParser from "../customization/CodeParser.vue";
import UseCaseTitle from "./UseCaseTitle.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const commonSegments = ref([
    {
        name: "Low",
        from: 0,
        to: 50,
    },
    {
        name: "Medium",
        from: 50,
        to: 70,
    },
    {
        name: "High",
        from: 70,
        to: 100,
    },
]);

const items = ref([
    {
        title: 'Series A',
        dataset: {
            value: 92,
            target: 95,
            segments: commonSegments.value
        }
    },
    {
        title: 'Series B',
        dataset: {
            value: 92,
            target: 90,
            segments: commonSegments.value
        }
    },
    {
        title: 'Series C',
        dataset: {
            value: 72,
            target: 85,
            segments: commonSegments.value
        }
    },
    {
        title: 'Series D',
        dataset: {
            value: 64,
            target: 80,
            segments: commonSegments.value
        }
    },
    {
        title: 'Series E',
        dataset: {
            value: 72,
            target: 75,
            segments: commonSegments.value
        }
    },
]);

const config = computed(() => {
    return (i) => {
        return {
            userOptions: { show: false },
            style: {
                chart: {
                    height: 76,
                    backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    legend: { 
                        show: i === 0,
                        position: 'top',
                        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
                    },
                    segments: {
                        dataLabels: {
                            color: isDarkMode.value ? '#8A8A8A' : '#1A1A1A'
                        }
                    },
                    valueBar: {
                        stroke: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                        label: {
                            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
                        }
                    }
                }
            }
        }
    }
})

const codeScript = ref(`const commonSegments = ref([
    {
        name: "Low",
        from: 0,
        to: 50,
    },
    {
        name: "Medium",
        from: 50,
        to: 70,
    },
    {
        name: "High",
        from: 70,
        to: 100,
    },
]);

const items = ref([
    {
        title: 'Series A',
        dataset: {
            value: 92,
            target: 95,
            segments: commonSegments.value
        }
    },
    {
        title: 'Series B',
        dataset: {
            value: 92,
            target: 90,
            segments: commonSegments.value
        }
    },
    {
        title: 'Series C',
        dataset: {
            value: 72,
            target: 85,
            segments: commonSegments.value
        }
    },
    {
        title: 'Series D',
        dataset: {
            value: 64,
            target: 80,
            segments: commonSegments.value
        }
    },
    {
        title: 'Series E',
        dataset: {
            value: 72,
            target: 75,
            segments: commonSegments.value
        }
    },
]);

const config = computed(() => {
    return (i) => {
        return {
            userOptions: { show: false },
            style: {
                chart: {
                    height: 76,
                    backgroundColor: '#FFFFFF',
                    color: '#1A1A1A',
                    legend: { 
                        show: i === 0,
                        position: 'top',
                        color: '#1A1A1A'
                    },
                    segments: {
                        dataLabels: {
                            color: '#1A1A1A'
                        }
                    },
                    valueBar: {
                        stroke: '#FFFFFF',
                        label: {
                            color: '#1A1A1A'
                        }
                    }
                }
            }
        }
    }
});`);

const codeTemplate = ref(`<div class="flex flex-col bg-white p-4 rounded-lg">
    <div v-for="(item, i) in items" class="flex flex-row gap-2 place-items-center">
        <div class="w-[100px] text-right text-black" :style="\`margin-bottom:\${i === 0 ? '-40px': '0'}\`">
            {{ item.title }}
        </div>
        <div class="w-full">
            <VueUiBullet :dataset="item.dataset" :config="config(i)"/>
        </div>
    </div>
</div>`
);

const description = ref({
    en: 'Multiple instances with shared config',
    fr: 'Instances multiples avec configuration partagée',
    pt: 'Múltiplas instâncias com configuração compartilhada',
    de: 'Mehrere Instanzen mit gemeinsamer Konfiguration',
    zh: '具有共享配置的多个实例',
    jp: '共有設定を持つ複数のインスタンス',
    es: 'Múltiples instancias con configuración compartida',
    ko: '공유 설정을 사용하는 여러 인스턴스',
    ar: 'مثيلات متعددة بنفس الإعدادات'
})
</script>

<template>
    <UseCaseTitle>
        <template #title>
            {{ description[store.lang] }}
        </template>
    </UseCaseTitle>

    <BaseCard>
        <div class="flex flex-col bg-white dark:bg-[#2A2A2A] p-4 rounded-lg">
            <div v-for="(item, i) in items" class="flex flex-row gap-2 place-items-center">
                <div class="w-[100px] text-right text-black dark:text-[#CCCCCC]" :style="`margin-bottom:${i === 0 ? '-40px': '0'}`">
                    {{ item.title }}
                </div>
                <div class="w-full">
                    <VueDataUi component="VueUiBullet" :dataset="item.dataset" :config="config(i)"/>
                </div>
            </div>
        </div>
    </BaseCard>
    <CodeParser
        class="my-4"
        language="javascript"
        :content="codeScript"
    />
    <CodeParser
        language="html"
        :content="codeTemplate"
    />
</template>