<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";
import BaseCard from "../BaseCard.vue";
import { RadioactiveFilledIcon } from "vue-tabler-icons";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const timelineContainer = ref(null);

const timeline = ref([
    {
        time: "April 25, 1986 - 01:00",
        reactor_power_percent: 100,
        thermal_power_MW: 3200,
        control_rods_inserted_count: 170,
        coolant_flow_percent: 100,
        reactivity_margin_rods: 30,
        pressure_MPa: 7.0,
        core_temp_C: 280,
        notes: "Reactor at full power; preparations begin for safety test.",
        confidence: "documented",
    },
    {
        time: "April 25, 1986 - 13:05",
        reactor_power_percent: 50,
        thermal_power_MW: 1600,
        control_rods_inserted_count: 180,
        coolant_flow_percent: 80,
        reactivity_margin_rods: 25,
        pressure_MPa: 7.0,
        core_temp_C: 260,
        notes: "Reactor power reduced for test, turbine rundown test scheduled.",
        confidence: "documented",
    },
    {
        time: "April 25, 1986 - 14:00",
        reactor_power_percent: 50,
        thermal_power_MW: 1600,
        control_rods_inserted_count: 180,
        coolant_flow_percent: 80,
        reactivity_margin_rods: 25,
        pressure_MPa: 7.0,
        core_temp_C: 260,
        notes: "Grid controller orders delay; reactor held at half power.",
        confidence: "documented",
    },
    {
        time: "April 25, 1986 - 23:10",
        reactor_power_percent: 25,
        thermal_power_MW: 800,
        control_rods_inserted_count: 190,
        coolant_flow_percent: 90,
        reactivity_margin_rods: 20,
        pressure_MPa: 6.9,
        core_temp_C: 240,
        notes: "Power reduction resumed after 11-hour hold.",
        confidence: "documented",
    },
    {
        time: "April 26, 1986 - 00:28",
        reactor_power_percent: 6,
        thermal_power_MW: 200,
        control_rods_inserted_count: 6,
        coolant_flow_percent: 90,
        reactivity_margin_rods: 6,
        pressure_MPa: 6.8,
        core_temp_C: 230,
        notes: "Power dropped due to xenon poisoning; operators pulled rods to restore.",
        confidence: "documented",
    },
    {
        time: "April 26, 1986 - 00:43",
        reactor_power_percent: 7,
        thermal_power_MW: 210,
        control_rods_inserted_count: 8,
        coolant_flow_percent: 90,
        reactivity_margin_rods: 7,
        pressure_MPa: 6.8,
        core_temp_C: 235,
        notes: "Reactor stabilized at ~200 MW(th), but unsafe configuration.",
        confidence: "documented",
    },
    {
        time: "April 26, 1986 - 01:03",
        reactor_power_percent: 7,
        thermal_power_MW: 210,
        control_rods_inserted_count: 8,
        coolant_flow_percent: 110,
        reactivity_margin_rods: 6,
        pressure_MPa: 6.7,
        core_temp_C: 240,
        notes: "Turbogenerator test preparations; coolant flow rises, reactivity margin shrinks.",
        confidence: "estimated",
    },
    {
        time: "April 26, 1986 - 01:19",
        reactor_power_percent: 7,
        thermal_power_MW: 210,
        control_rods_inserted_count: 8,
        coolant_flow_percent: 120,
        reactivity_margin_rods: 6,
        pressure_MPa: 6.6,
        core_temp_C: 245,
        notes: "Emergency Core Cooling System disabled for test.",
        confidence: "estimated",
    },
    {
        time: "April 26, 1986 - 01:23:04",
        reactor_power_percent: 7,
        thermal_power_MW: 210,
        control_rods_inserted_count: 8,
        coolant_flow_percent: 120,
        reactivity_margin_rods: 6,
        pressure_MPa: 6.6,
        core_temp_C: 250,
        notes: "Test begins: turbine valves closed → steam flow reduction.",
        confidence: "documented",
    },
    {
        time: "April 26, 1986 - 01:23:40",
        reactor_power_percent: 200,
        thermal_power_MW: 6400,
        control_rods_inserted_count: 8,
        coolant_flow_percent: 70,
        reactivity_margin_rods: 0,
        pressure_MPa: 7.5,
        core_temp_C: 1500,
        notes: "Positive void coefficient triggers runaway power increase. SCRAM initiated.",
        confidence: "estimated",
    },
    {
        time: "April 26, 1986 - 01:23:44",
        reactor_power_percent: 10000,
        thermal_power_MW: 30000,
        control_rods_inserted_count: 0, // jammed
        coolant_flow_percent: 0,
        reactivity_margin_rods: 0,
        pressure_MPa: "uncontrollable",
        core_temp_C: null,
        notes: "First explosion: fuel disintegration, core destroyed.",
        confidence: "speculative",
    },
    {
        time: "April 26, 1986 - 01:23:45",
        reactor_power_percent: 0,
        thermal_power_MW: 0,
        control_rods_inserted_count: 0, // destroyed
        coolant_flow_percent: 0,
        reactivity_margin_rods: 0,
        pressure_MPa: 0,
        core_temp_C: null,
        notes: "Second explosion, reactor vessel breached, graphite fire starts.",
        confidence: "documented",
    },
]);

function getKnobs() {
    return Object.keys(timeline.value[0]).map(k => {
        return {
            name: k.replaceAll('_', ' '),
            attr: k,
            active: k === 'reactor_power_percent'
        }
    }).filter(k => {
        return ![
            'time',
            'coolant_flow_percent',
            'reactivity_margin_rods',
            'pressure_MPa',
            'notes',
            'confidence'
        ].includes(k.attr)
    })
}

const knobs = ref(getKnobs());

const baseDataset = computed(() => {
    return [
        {
            name: 'Reactor power percent',
            series: timeline.value.map(t => t.reactor_power_percent),
            type: 'line',
            smooth: true,
            visible: knobs.value.find(k => k.attr === 'reactor_power_percent').active,
            color: '#1f77b4',
            dataLabels: true
        },
        {
            name: 'Thermal power',
            series: timeline.value.map(t => t.thermal_power_MW),
            type: 'line',
            smooth: true,
            visible: knobs.value.find(k => k.attr === 'thermal_power_MW').active,
            color: '#ff7f0e'
        },
        {
            name: 'Control rods inserted count',
            series: timeline.value.map(t => t.control_rods_inserted_count),
            type: 'bar',
            visible: knobs.value.find(k => k.attr === 'control_rods_inserted_count').active,
            color: isDarkMode.value ? '#5A5A5A' : '#BBBBBB',
        },
        {
            name: 'Core temperature °C',
            series: timeline.value.map(t => t.core_temp_C),
            type: 'line',
            smooth: true,
            visible: knobs.value.find(k => k.attr === 'core_temp_C').active,
            color: '#d62728'
        },
    ]
});

const dataset = computed(() => {
    return baseDataset.value.filter(el => el.visible)
})

function setSelectedX(i) {
    X.value = i;
}

const config = computed(() => ({
    events: {
        datapointEnter: ({ seriesIndex }) => {
            setSelectedX(seriesIndex);
            view(seriesIndex);
        },
        datapointLeave: () => {
        }
    },
    chart: {
        backgroundColor: isDarkMode.value ? '#2A2A2A' : '#f3f4f6',
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        grid: {
            labels: {
                yAxis: {
                    useIndividualScale: true
                }
            }
        },
        highlighter: {
            useLine: true,
            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            lineDasharray: 6
        },
        legend: { show: false },
        tooltip: { show: false },
        userOptions: { show: false },
        zoom: { show: false }
    },
    line: {
        radius: 4,
        useGradient: false,
        dot: {
            useSerieColor: false,
            fill: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            strokeWidth: 2
        }
    },
}))

const X = ref(undefined);

function view(i) {
    const parent = timelineContainer.value;
    if (!parent) return;

    const el = parent.querySelector(`#tl-${i}`);
    if (!el) return;

    const parentRect = parent.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const offsetInParent = elRect.top - parentRect.top;

    const above = offsetInParent < 0;
    const below = offsetInParent + elRect.height > parent.clientHeight;

    if (above || below) {
        const targetTop = parent.scrollTop + offsetInParent - (parent.clientHeight - elRect.height) / 2;
        parent.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
}

</script>

<template>
    <div class="flex flex-col gap-6">
        <div class="flex flex-col sm:flex-row gap-6">
            <div class="w-full sm:w-3/5">
                <BaseCard>
                    <div class="flex flex-col gap-6">
                        <div class="flex flex-col gap-2">
                            <label 
                                v-for="(knob, i) in knobs"
                                class="flex flex-row gap-2 place-items-center"
                            >
                                <input type="checkbox" v-model="knob.active" class="!hidden"/>
                                <div class="flex flex-row place-items-center gap-2 cursor-pointer select-none" :style="{
                                    opacity: knob.active ? 1 : 0.5
                                }">
                                    <div class="h-4 w-4 rounded-full" :style="{ background: baseDataset[i]?.color}"/>
                                    <span :class="`${knob.active ? '' : 'line-through'}`">
                                        {{ knob.name }}
                                    </span>
                                </div>
                            </label>
                        </div>
                        <VueUiXy
                            :dataset="dataset"
                            :config="config"
                            :selectedXIndex="X"
                        />
                    </div>
                </BaseCard>
            </div>
            <BaseCard class="w-full sm:w-2/5">
                <div class="flex flex-col gap-6 max-h-[500px] overflow-auto px-2 pr-3 py-2" ref="timelineContainer">
                    <BaseCard v-for="(t, i) in timeline" :type="X === i ? 'light' : 'medium'" class="relative">
                        <div
                            class="timeline-item"
                            :id="`tl-${i}`"
                            @mouseenter="() => setSelectedX(i)"
                        >
                            <p class="text-center font-inter-medium pb-2 mb-2">
                                {{ t.time }}
                            </p>

                            <p class="mb-2">
                                <i>{{ t.notes }}</i>
                            </p>

                            <ul v-if="i < timeline.length -1">
                                <li class="flex flex-row gap-2 place-items-center">
                                    <div class="h-4 w-4 rounded-full" :style="{ background: baseDataset[0]?.color}"/>
                                    <span class="text-gray-600 dark:text-[#9A9A9A]">Reactor power: </span>
                                    <span class="font-inter-medium">{{ t.reactor_power_percent }} %</span>
                                </li>
                                <li class="flex flex-row gap-2 place-items-center">
                                    <div class="h-4 w-4 rounded-full" :style="{ background: baseDataset[1]?.color}"/>
                                    <span class="text-gray-600 dark:text-[#9A9A9A]">Thermal power MW: </span>
                                    <span class="font-inter-medium">{{ t.thermal_power_MW }} MW</span>
                                </li>
                                <template v-if="i < timeline.length - 2">
                                    <li class="flex flex-row gap-2 place-items-center">
                                        <div class="h-4 w-4 rounded-full" :style="{ background: baseDataset[2]?.color}"/>
                                        <span class="text-gray-600 dark:text-[#9A9A9A]">Control rods inserted: </span>
                                        <span class="font-inter-medium">{{ t.control_rods_inserted_count }}</span>
                                    </li>
                                    <li class="flex flex-row gap-2 place-items-center">
                                        <div class="h-4 w-4 rounded-full" :style="{ background: baseDataset[3]?.color}"/>
                                        <span class="text-gray-600 dark:text-[#9A9A9A]">Core temperature: </span>
                                        <span class="font-inter-medium">{{ t.core_temp_C }} °C</span>
                                    </li>
                                    <!-- <li>
                                        <span class="text-gray-600 dark:text-[#9A9A9A]">Coolant flow: </span>
                                        <span class="font-inter-medium">{{ t.coolant_flow_percent }} %</span>
                                    </li> -->
                                </template>
                            </ul>

                            <div class="flex place-items-center justify-center" v-else>
                                <RadioactiveFilledIcon :size="64"/>
                            </div>
                        </div>
                    </BaseCard>
                </div>
            </BaseCard>
        </div>
    </div>
</template>
