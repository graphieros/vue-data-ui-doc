<script setup>
import { ref, computed } from "vue";
import DeepSearch from "./DeepSearch.vue";
import BaseSignature from "./BaseSignature.vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const gizmoConfig = computed(() => {
    return {
        color: '#1f77b4',
        textColor: isDarkMode.value ? '#579ecf' : '#1A1A1A',
        gradientColor: isDarkMode.value ? '#1f77b4' : '#a5b9e8',
        stroke: isDarkMode.value ? '#5c7e96' : '#1d3e54',
        formatter: ({ value }) => {
            return value.toFixed(1) + '%'
        }
    }
})

const currentStars = computed(() => store.stars)

const target = computed(() => {
    const activeThreshold = store.thresholds.find(t => currentStars.value >= t.min && currentStars.value < t.max)
    return currentStars.value / activeThreshold.max * 100
});

const kpiLinks = ref({
    stargazers_count: 'stargazers',
    forks_count: 'forks',
    open_issues_count: 'issues',
    subscribers_count: 'watchers'
})

const KPIS = computed(() => {
    return Object.keys(store.pack).map(key => {
        if (typeof store.pack[key] === 'number' && ![
            'watchers_count',
            'forks',
            'watchers',
            'network_count',
            'size',
            'id',
            'open_issues',
        ].includes(key)) {
            return {
                key,
                name: key.replaceAll('_', ' '),
                value: store.pack[key],
                link: `https://github.com/graphieros/vue-data-ui/${kpiLinks.value[key]}`,
                icon: key === 'stargazers_count'
                    ? 'starFill'
                    : key === 'forks_count'
                        ? 'chartDag'
                        : key === 'open_issues_count'
                            ? 'binary'
                            : key === 'subscribers_count'
                                ? 'person'
                                : ''
                ,
                color: key === 'stargazers_count'
                    ? '#fdd663'
                    : key === 'forks_count'
                        ? isDarkMode.value ? '#579ecf' : '#1f77b4'
                        : key === 'open_issues_count'
                            ? '#ff6600'
                            : key === 'subscribers_count'
                                ? '#42d392'
                                : ''
            }
        }
    }).filter(el => el && el.name).map(el => ({
        ...el,
        displayName: {
            stargazers_count: 'Stars',
            open_issues_count: 'Issues / Pull requests',
            subscribers_count: 'Subscribers',
            forks_count: 'Forks'
        }[el.key]
    }))
})

</script>

<template>
    <footer
        class="w-full fixed bottom-0 left-0 h-[64px] font-inter bg-gray-300 dark:bg-black text-gray-800 dark:text-slate-300 border-t dark:border-[#2A2A2A] transition-all flex place-items-center  justify-between pl-6"
        style="z-index: 1000">
        <DeepSearch :fixed="false" />
        <!-- <div class="w-[64px]">
            <BaseSignature :color="isDarkMode ? '#3A3A3A' : '#CCCCCC'" :strokeWidth="7"/>
        </div> -->
        <div class="flex flex-col gap-2">
            <div class="pr-1 font-satoshi" style="align-self: flex-end">
                <VueDataUi v-if="currentStars" component="VueUiGizmo" :dataset="target" :config="gizmoConfig" />
            </div>
            <div class="flex flex-row gap-2 pr-3" style="align-self: flex-end">
                <a v-for="kpi in KPIS.filter(k => k.key === 'forks_count')" :href="kpi.link" target="_blank" class="flex flex-row gap-1 place-items-center">
                    <VueUiIcon :name="kpi.icon" :stroke="kpi.color" :size="16"/>
                    <div class="h-4">
                        <VueUiDigits
                            :dataset="kpi.value"
                            :config="{
                                backgroundColor: 'transparent',
                                digits: {
                                    color: isDarkMode ? kpi.color : '#1A1A1A',
                                    skeletonColor: isDarkMode ? '#3A3A3A' : '#E1E5E8',
                                    thickness: 1.5
                                }
                            }"
                        />
                    </div>
                </a>
            </div>
        </div>
    </footer>
</template>

<style>
.vue-ui-gizmo {
    overflow: visible;
}
</style>