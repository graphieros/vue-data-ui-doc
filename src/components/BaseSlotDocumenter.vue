<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import { CopyIcon } from "vue-tabler-icons";

const props = defineProps({
    types: {
        type: Array,
        default() {
            return []
        }
    },
    componentName: {
        type: String,
        default: '__NO_COMPONENT!__'
    }
});

const store = useMainStore();
const translations = computed(() => store.translations);

const items = computed(() => {
    return [
        { 
            names: ['svg'], 
            description: translations.value.slots.presentation[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #svg="{ svg }">
            <circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="red"/>
        </template>
    </${props.componentName}>
            `
        },
        { 
            names: ['legend'], 
            description: translations.value.slots.legendDetail[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <!-- ${translations.value.slots.hideLegend[store.lang]} -->
        <template #legend="{ legend }">
            <div v-for="item in legend">
                <div :style="{ background: item.color, height: '1rem', width: '1rem' }"/>
                {{ legend.name }}
            </div>
        </template>
    </${props.componentName}>
            `
        },
        { 
            names: ['dataLabel'], 
            description: translations.value.slots.donutDataLabels[store.lang], 
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #dataLabel="{ datapoint, isBlur, isVisible, isSafari, textAlign, percentage }">
            <div :style="{ background: datapoint.color }">
                {{ datapoint.name }}: {{ percentage }}
            </div>
        </template>
    </${props.componentName}>
            `
        },
        { 
            names: ['tooltip-before', 'tooltip-after'], 
            description: translations.value.slots.tooltip[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #tooltip-before={ datapoint, seriesIndex, series, config, bars, lines, plots }>
            {{ datapoint }}
        </template>
        <template #tooltip-after={ datapoint, seriesIndex, series, config, bars, lines, plots }>
            {{ datapoint }}
        </template>
    </${props.componentName}>
            `
        },
        { 
            names: ['reset-action'], 
            description: translations.value.slots.resetButton[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #reset-action="{ reset }">
            <button @click="reset">
                RESET ZOOM
            </button>
        </template>
    </${props.componentName}>
            `
        },
        { 
            names: ['time-label'], 
            description: translations.value.slots.timeLabel[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #time-label="{ x, y, fontSize, fill, transform, absoluteIndex, content, textAnchor }">
            <!-- SVG elements only -->
            <text
                :x="x"
                :y="y"
                :font-size="fontSize"
                :fill="fill"
                :text-anchor="textAnchor"
            >
                {{ content }}
            </text>
        </template>
    </${props.componentName}>
            `
        },
        { 
            names: ['watermark'], 
            description: translations.value.slots.watermark[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #watermark="{ isPrinting }">
            <div v-if="isPrinting">
                WATERMARK
            </div>
        </template>
    </${props.componentName}>
            `
        },
        { 
            names: ['source'], 
            description: translations.value.slots.source[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #source>
            <p>Source: <cite>My source</cite></p>
        </template>
    </${props.componentName}>
            `
        },
        { 
            names: ['plot-comment'],
            description: translations.value.slots.plotComment[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #plot-comment="{ plot }">
            <div :style="{ width: '100%', textAlign: 'center' }">
                {{ plot.comment }}
            </div>
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['before'],
            description: translations.value.slots.sparklineBefore[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #before="{ selected, latest, sum, average, median, trend }">
            <ul>
                <li>Latest: {{ latest }}</li>
                <li>Sum: {{ sum }}</li>
                <li>Average: {{ average }}</li>
                <li>Median: {{ median }}</li>
                <li>Trend: {{ trend }}</li>
                <li>Selected: {{ selected }}</li>
            </ul>
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['data-label'],
            description: translations.value.slots.dataLabel[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #data-label="{ bar }">
            <div :style="{ width: '100%' }">
                {{ bar.name }}: {{ bar.labelValue }} / {{ bar.labelTarget }}
            </div>
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['title'],
            description: translations.value.slots.title[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #title="{ title }">
            <div>
                {{ title.title }} - {{ title.subtitle }}
            </div>
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['title_'],
            description: translations.value.slots.title[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #title="{ comment }">
            <div>
                <span>This is the title, it contains the {{ comment }} which is the actual dataset</span>
            </div>
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['value'],
            description: '',
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #value="{ comment }">
            <div>
                <span>This is the value, it contains the {{ comment }} which is the actual dataset</span>
            </div>
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['comment-before'],
            description: '',
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #comment-before="{ comment }">
            <div>
                <span>This is the comment before the value, it contains the {{ comment }} which is the actual dataset</span>
            </div>
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['comment-after'],
            description: '',
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #comment-after="{ comment }">
            <div>
                <span>This is the comment after the value, it contains the {{ comment }} which is the actual dataset</span>
            </div>
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['cell'],
            description: translations.value.customization.otherSlots.waffle[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #cell="{ cell, isSelected }">
            <div v-if="cell.name === 'serie 1'">
                <!-- Use icons for example -->
            </div>
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['rect'],
            description: translations.value.slots.rect[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #rect="{ rect, shouldShow, fontSize, isZoom, textColor }">
            <div>
                {{ rect }}    
            </div>
        </template>
    </${props.componentName}>
            `
        },
    ]
})

function isVisible(tags) {
    let show = false;
    tags.forEach(t => {
        show = props.types.includes(t)
    })
    return show;
}

function copyToClipboard(conf) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = conf;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}

</script>

<template>
    <div class="w-full flex flex-col gap-2">
        <template v-for="item in items" >
            <div v-if="isVisible(item.names)" class="mb-4">
                <div class="flex flex-row gap-2 place-items-center flex-wrap mb-2">
                    <div v-for="tag in item.names" class="bg-app-green text-black rounded-full px-2 py-0.5">
                        #{{ tag.replaceAll('_', '') }}
                    </div>
                </div>
                <div class="pl-6 border-l border-gray-500 bg-[#FFFFFF10] rounded-tr py-3 pr-6">{{ item.description }}</div>
<div class="bg-[#2A2A2A] overflow-auto border-l border-gray-500 rounded-br rounded-bl relative">
        <button class="absolute top-1 right-1 flex place-items-center justify-center p-1 rounded-full hover:bg-[#42d39230] transition-colors" @click="() => copyToClipboard(item.snippet)">
            <CopyIcon class="text-app-green" />
        </button>
<pre v-if="item.snippet" class="text-xs text-gray-300">
<code>
{{ item.snippet }}
</code>
</pre>                
</div>                
            </div>
        </template>
    </div>
</template>