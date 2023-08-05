<script setup>
import { ref, computed, onMounted } from "vue";
import SideMenu from '../components/SideMenu.vue';

const isOpen = ref(window.innerWidth > 768);

function toggleMenu(state) {
    isOpen.value = state;
}

const start = ref("2023-07-25");
const lastDate = ref(new Date(Date.now()));

const end = computed(() => {
    const day = lastDate.value.getDate();
    const month = lastDate.value.getMonth()+1;
    const year = lastDate.value.getFullYear();
    return `${year}-${String(month).length === 1 ? `0${month}` : month}-${String(day).length === 1 ? `0${day}` : day}`;
});

const data = ref(null);
const response = ref(null);
const isError = ref(false);
const dates = ref([])

const url = computed(() => {
    return `https://api.npmjs.org/downloads/range/${start.value}:${end.value}/vue-data-ui`;
});

onMounted(() => {
    fetch(url.value, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }).then((response) => {
        isError.value = false;
        return response.json();
    }).then(json => {
        data.value = json;
        dates.value = json.downloads.map(d => d.day)
    })
    .catch(err => {
        isError.value = true;
    })
});

const dataset = computed(() => {
    return [
        {
            name: "vue-data-ui",
            series: data.value.downloads.map(d => d.downloads).slice(0,-1),
            type: "line",
            color: "#42d392"
        }
    ]
});

const config = computed(() => {
    return {
        chart: {
        backgroundColor: "#1A1A1A",
        color: "#c8c8c8",
        height: 300,
        width: 500,
        highlighter: {
            color: "#FAFAFA"
        },
        padding: {
            top:  36,
            right: 12,
            bottom: 36,
            left: 48
        },
        grid: {
            stroke: "#e1e5e8",
            showVerticalLines: false,
            labels: {
                show: true,
                color: "#c8c8c8",
                fontSize: 12,
                axis: {
                    yLabel: "donwloads",
                    xLabel: "days",
                    fontSize: 8
                },
                xAxisLabels: {
                    showOnlyFirstAndLast: true,
                    color: "#c8c8c8",
                    show: true,
                    values:  [...dates.value],
                    fontSize: 6,
                }
            }
        },
        legend: {
            show: true,
            color: "#c8c8c8",
            useDiv: true,
            fontSize: 16
        },
        title: {
           show:true,
           text: "vue-data-ui npm downloads",
           color: "#FAFAFA",
           fontSize: 20,
           bold: true,
           subtitle: {
            fontSize: 16,
            color: "#c8c8c8",
            text: `from ${start.value} to ${end.value}`
           }
        },
        tooltip: {
            color: "#FFFFFF",
            backgroundColor: "#1A1A1A",
            show: true,
            showValue: true,
            showPercentage: false,
            roundingValue: 0,
            roundingPercentage: 0,
        },
        userOptions: {
            show: true,
            title:"options",
            labels: {
                dataLabels: "Show datalabels",
                titleInside: "Title inside",
                legendInside: "Legend inside",
                showTable: "Show table"
            }
        },
    },
    bar: {
        useGradient: true,
        labels: {
            show: true,
            offsetY: -6,
            rounding: 0,
            color: "#c8c8c8",
        }
    },
    line: {
        radius: 3,
        useGradient: true,
        strokeWidth: 2,
        labels: {
            show: false,
            offsetY: -6,
            rounding: 0,
            color: "#c8c8c8",
        }

    },
    plot: {
        radius: 3,
        useGradient: true,
        labels: {
            show: false,
            offsetY: -6,
            rounding: 0,
            color: "#c8c8c8",
        }
    },
    table: {
        rounding: 0,
        th: {
            backgroundColor: "#1A1A1A",
            color: "#c8c8c8",
            outline: "1px solid #e1e5e8"
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#c8c8c8",
            outline: "1px solid #e1e5e8",
        }
    }
    }
});

</script>

<template>
    <SideMenu @toggle="toggleMenu"/>
    <div :class="`${isOpen ? 'pl-[348px] pr-[48px]' : 'pl-[59px] sm:pl-[109px] sm:pr-[59px]'} pt-9 overflow-x-hidden`">
        <div :class="`${isOpen ? 'xl:w-5/6' : ''}`">
            <div class="mx-auto">
            <h1 class="text-center text-xl text-app-green">Versions</h1>
        </div>
            <div class="max-w-[800px] mx-auto">
                <VueUiXy v-if="data" :dataset="dataset" :config="config"/>
                <ul>
                    <li class="mb-3">
                        2023-08-05 | <span class="text-app-green">v 0.3.1</span><br>
                        <div class="pl-6">
                            <span class="text-gray-500"><span class="text-app-blue">VueUiXy</span> add zoom functionality</span><br>
                            <span class="text-gray-500"><span class="text-app-blue">VueUiRadar</span> fix non closing polygon in Firefox</span>
                        </div>
                    </li>
                    <li class="mb-3">
                        2023-08-05 | <span class="text-app-green">v 0.2.9</span><br>
                        <div class="pl-6">
                            <span class="text-gray-500">Allow RGB, HSL color formats in config & datasets</span>
                        </div>
                    </li>
                    <li class="mb-3">
                        2023-08-05 | <span class="text-app-green">v 0.2.8</span><br>
                        <div class="pl-6">
                            <span class="text-gray-500"><span class="text-app-blue">VueUiXy</span> add "highlighter" color and opacity options</span><br>
                            <span class="text-gray-500"><span class="text-app-blue">VueUiChestnut</span> add emits and getData method</span>
                        </div>
                    </li>
                    <li>
                        2023-08-05 | <span class="text-app-green">v 0.2.7</span><br>
                        <div class="pl-6">
                            <span class="text-gray-500"><span class="text-app-blue">VueUiXy</span> fix dataLabels on y axis not showing if min value > 0</span><br>
                            <span class="text-gray-500"><span class="text-app-blue">VueUiXy</span> add "showOnlyFirstAndLast" config option to show only first and last time labels on x axis. vue-data-ui is opinionated and chooses not to provide rotating x labels, as it is bad dataviz practice.</span><br>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>