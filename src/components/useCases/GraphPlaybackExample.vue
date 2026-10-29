<script setup>
import { computed, onBeforeUnmount, ref } from "vue";
import { VueUiGraph } from "vue-data-ui/vue-ui-graph";
import "vue-data-ui/style.css";

const props = defineProps({ dark: Boolean });

const departments = {
    Engineering: ["Platform", "Web", "Mobile", "QA"],
    Product: ["Research", "Design", "Analytics", "Planning"],
    Operations: ["Finance", "People", "Legal", "IT"],
    Sales: ["Paris", "Lyon", "Marseille", "Partners"],
};

const branches = Object.entries(departments);

// Breadth-first order keeps every parent ahead of its children (21 nodes).
const nodes = [
    { id: "company", label: "Company", group: 0, value: 1 },
    ...branches.map(([label]) => ({ id: label, label, group: 1 })),
    ...branches.flatMap(([parent, teams]) =>
        teams.map((label) => ({ id: `${parent}/${label}`, label, group: 2 })),
    ),
];

const links = [
    ...branches.map(([target]) => ({ source: "company", target })),
    ...branches.flatMap(([source, teams]) =>
        teams.map((label) => ({ source, target: `${source}/${label}` })),
    ),
];

const count = ref(nodes.length);
const playing = ref(false);
let timer;

function pause() {
    clearInterval(timer);
    playing.value = false;
}

function play() {
    if (playing.value) return;
    if (count.value === nodes.length) count.value = 1;
    playing.value = true;
    timer = setInterval(() => {
        count.value = Math.min(
            nodes.length,
            count.value + 1 + Math.floor(Math.random() * 5),
        );
        if (count.value === nodes.length) pause();
    }, 500);
}

function stop() {
    pause();
    count.value = 1;
}

function reset() {
    pause();
    count.value = nodes.length;
}

onBeforeUnmount(pause);

const dataset = computed(() => {
    const visible = nodes.slice(0, count.value);
    const ids = new Set(visible.map((node) => node.id));
    return {
        nodes: visible,
        links: links.filter(
            (link) => ids.has(link.source) && ids.has(link.target),
        ),
    };
});

const config = computed(() => ({
    theme: props.dark ? "dark" : "",
    responsive: true,
    style: {
        chart: {
            nodes: {
                labels: { show: true, maxCount: nodes.length, minZoom: 0 },
            },
        },
    },
    userOptions: { show: false },
}));
</script>

<template>
    <div>
        <div
            style="
                display: flex;
                flex-wrap: wrap;
                gap: 12px;
                align-items: center;
                margin-bottom: 16px;
            "
        >
            <button type="button" :disabled="playing" @click="play">
                PLAY
            </button>
            <button type="button" :disabled="!playing" @click="pause">
                PAUSE
            </button>
            <button type="button" @click="stop">STOP</button>
            <button type="button" @click="reset">RESET</button>
            <span>{{ count }} / {{ nodes.length }}</span>
        </div>

        <div style="height: 500px; width: 100%">
            <VueUiGraph :dataset="dataset" :config="config" />
        </div>
    </div>
</template>

<style scoped>
button {
    padding: 8px 16px;
    border: 1px solid currentColor;
    border-radius: 6px;
    cursor: pointer;
}
button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}
</style>
