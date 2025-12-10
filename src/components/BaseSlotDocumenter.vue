<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import { CopyIcon } from "vue-tabler-icons";
import FlexibleTooltip from "./FlexibleTooltip.vue";
import { VueHiCode } from "vue-hi-code";
import CodeParser from "./customization/CodeParser.vue";

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
            freestyle: translations.value.slots.freestyle[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #svg="{ svg }">
            <circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="red"/>
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['chart-background'],
            description: translations.value.slots.chartBackground[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #chart-background>
            <div :style="{ width: '100%', height: '100%', background: 'radial-gradient(at top left, red, white)'}"/>
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
        <template #tooltip-before={ datapoint, seriesIndex, series, config }>
            {{ datapoint }}
        </template>
        <template #tooltip-after={ datapoint, seriesIndex, series, config }>
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
        {
            names: ['group-label'],
            description: translations.value.slots.groupLabel[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #group-label="{ group }">
            <div>
                {{ group.name }}: {{ group.value }}    
            </div>
        </template>
    </${props.componentName}>
            `
        },
        { 
            names: ['pattern'], 
            description: translations.value.slots.pattern[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #pattern="{ seriesIndex, patternId }">
            <!-- In this example, the pattern is applied on the first datapoint only -->
            <pattern :id="patternId" width="70" height="8" patternTransform="scale(2)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b31"/><path fill="none" stroke="#ecc94b" d="M-.02 22c8.373 0 11.938-4.695 16.32-9.662C20.785 7.258 25.728 2 35 2s14.215 5.258 18.7 10.338C58.082 17.305 61.647 22 70.02 22M-.02 14.002C8.353 14 11.918 9.306 16.3 4.339 20.785-.742 25.728-6 35-6S49.215-.742 53.7 4.339c4.382 4.967 7.947 9.661 16.32 9.664M70 6.004c-8.373-.001-11.918-4.698-16.3-9.665C49.215-8.742 44.272-14 35-14S20.785-8.742 16.3-3.661C11.918 1.306 8.353 6-.02 6.002"/>
            </pattern>
        </template>
    </${props.componentName}>
            `
        },
        { 
            names: ['zoom-label'], 
            description: translations.value.slots.zoomLabel[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #zoom-label="{ x, y, color, name, value, zoomOpacity, currentRadius, fontSize  }">
            <desc>The slot is placed inside the svg, so its content must be comprised of svg elements</desc>
            <text :x="x" :y="y" text-anchor="middle" fill="black" font-size="14">
                {{ name }}: {{ value }}
            </text>
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['data-label-circlePack'],
            description: translations.value.slots.dataLabel[store.lang],
            snippet: `
        <${props.componentName} :dataset="dataset" :config="config">
            <template #data-label="{ x, y, name, value, color, fontSize, createTSpans }">
                <text
                    :x="x"
                    :y="y"
                    :font-size="fontSize.name"
                    :fill="color"
                    text-anchor="middle"
                    v-html="creteTSpans({
                        content: \`\${name} with a value of \${value}\`,
                        x,
                        y,
                        fill: color,
                        fontSize: fontSize.name,
                        maxWords: 3
                    })"
                />
            </template>
        </${props.componentName}>
            `
        },
        {
            names: ['layer-under'],
            description: translations.value.slots.layerUnder[store.lang],
            snippet:`
        <${props.componentName} :dataset="dataset" :config="config">
            <template #layer-under="{ value, size, focusedValue }">
                <svg viewBox="0 0 10 10" :style="{ overflow: 'visible' }">
                    <path v-if="value === 1" :stroke="focusedValue === value ? '#6A6A6A' : '#CCCCCC'" stroke-linecap="round" d="M 0 5 L 10 4 L 10 6 L 0 5 Z" fill="#CCCCCC"/>
                    <path v-if="value === 2" :stroke="focusedValue === value ? '#6A6A6A' : '#CCCCCC'" stroke-linecap="round" d="M 0 4 L 10 3 L 10 7 L 0 6 Z" fill="#CCCCCC"/>
                    <path v-if="value === 3" :stroke="focusedValue === value ? '#6A6A6A' : '#CCCCCC'" stroke-linecap="round" d="M 0 3 L 10 2 L 10 8 L 0 7 Z" fill="#CCCCCC"/>
                    <path v-if="value === 4" :stroke="focusedValue === value ? '#6A6A6A' : '#CCCCCC'" stroke-linecap="round" d="M 0 2 L 10 1 L 10 9 L 0 8 Z" fill="#CCCCCC"/>
                    <path v-if="value === 5" :stroke="focusedValue === value ? '#6A6A6A' : '#CCCCCC'" stroke-linecap="round" d="M 0 1 L 10 0 L 10 10 L 0 9 Z" fill="#CCCCCC"/>
                </svg>
            </template>
        </${props.componentName}>
            `
        },
        {
            names: ['layer-above'],
            description: translations.value.slots.layerAbove[store.lang],
            snippet:`
        <${props.componentName} :dataset="dataset" :config="config">
            <template #layer-above="{ value, size, hoveredValue, focusedValue }">
                <svg viewBox="0 0 10 10" :style="{ overflow: 'visible' }">
                    <path v-if="value === 1" fill="#5A5A5A" stroke="#5A5A5A" stroke-linecap="round" d="M 0 5 L 10 4 L 10 6 L 0 5 Z" :style="{ opacity: (value ≤ r || value ≤ hoveredValue) ? 1 : 0}"/>
                    <path v-if="value === 2" fill="#4A4A4A" stroke="#4A4A4A" stroke-linecap="round" d="M 0 4 L 10 3 L 10 7 L 0 6 Z" :style="{ opacity: (value ≤ r || value ≤ hoveredValue) ? 1 : 0}"/>
                    <path v-if="value === 3" fill="#3A3A3A" stroke="#3A3A3A" stroke-linecap="round" d="M 0 3 L 10 2 L 10 8 L 0 7 Z" :style="{ opacity: (value ≤ r || value ≤ hoveredValue) ? 1 : 0}"/>
                    <path v-if="value === 4" fill="#2A2A2A" stroke="#2A2A2A" stroke-linecap="round" d="M 0 2 L 10 1 L 10 9 L 0 8 Z" :style="{ opacity: (value ≤ r || value ≤ hoveredValue) ? 1 : 0}"/>
                    <path v-if="value === 5" fill="#1A1A1A" stroke="#1A1A1A" stroke-linecap="round" d="M 0 1 L 10 0 L 10 10 L 0 9 Z" :style="{ opacity: (value ≤ r || value ≤ hoveredValue) ? 1 : 0}"/>
                </svg>
            </template>
        </${props.componentName}>
            `
        },
        {
            names: ['breadcrumb-label'],
            description: translations.value.slots.breadcrumbLabel[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #breadcrumb-label="{ crumb, isRoot }">
            <span v-if="isRoot">
                <VueUiIcon name="home"/>
            </span>
            <span v-else>
                {{ crumb.label }}
            </span>
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['breadcrumb-arrow'],
            description: translations.value.slots.breadcrumbArrow[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #breadcrumb-arrow>
            <VueUiIcon name="arrowRight"/>
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['area-gradient'],
            description: translations.value.slots.areaGradient[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #area-gradient="{ series, id }">
            <linearGradient :id="id" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" :stop-color="series.color"/>
                <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
            </linearGradient>
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['bar-gradient'],
            description: translations.value.slots.areaGradient[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #bar-gradient="{ series, positiveId, negativeId }">
            <linearGradient :id="positiveId" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" :stop-color="series.color"/>
                <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
            </linearGradient>
            <linearGradient :id="negativeId" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0"/>
                <stop offset="100%" :stop-color="series.color"/>
            </linearGradient>
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['user-menu'],
            description: translations.value.slots.userMenu[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #menuIcon="{ isOpen, color }">
            <MyCloseIcon v-if="isOpen"/>
            <MyOpenIcon v-else/>
        </template>
        <template #optionTooltip>
            <MyTooltipIcon/>
        </template>
        <template #optionPdf>
            <MyPdfIcon/>
        </template>
        <template #optionCsv>
            <MyCsvIcon/>
        </template>
        <template #optionImg>
            <MyImageIcon/>
        </template>
        <template #optionSvg>
            <MySvgIcon/>
        </template>
        <template #optionTable>
            <MyTableIcon/>
        </template>
        <template #optionLabels>
            <MyLabelsIcon/>
        </template>
        <template #optionSort>
            <MySortIcon/>
        </template>
        <template #optionStack="{ isStack }">
            <MyStackIcon/>
        </template>
        <template #optionFullscreen="{ isFullscreen }">
            <MyFullscreenIcon/>
        </template>
        <template #optionAnnotator="{ isAnnotator }">
            <MyPenIcon/>
        </template>
        <template #optionZoom="{ isZoomLocked }">
            <MyZoomIcon />
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['annotator-actions'],
            description: translations.value.slots.annotatorActions[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #annotator-action-close>
            <MyCloseIcon/>
        </template>
        <template #annotator-action-color="{ color }">
            <MyColorIcon :color="color"/>
        </template>
        <template #annotator-action-draw="{ mode }">
            <MyDrawIcon v-if="mode === 'draw'"/>
            <MyTextIcon v-else/>
        </template>
        <template #annotator-action-undo="{ disabled }">
            <MyUndoIcon/>
        </template>
        <template #annotator-action-redo="{ disabled }">
            <MyRedoIcon/>
        </template>
        <template #annotator-action-delete="{ disabled }">
            <MyDeleteIcon/>
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['node'],
            description: translations.value.slots.node[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #node="{ node, orientation }">
            <!-- Content will be injected inside a foreignObject -->
            <div style="width: 100%; height: 100%">
                {{ node }}
            </div>
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['free-node-label'],
            description: translations.value.slots.freeNodeLabel[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #free-node-label="{ node, orientation }">
            <!-- Content will be injected inside a svg G element -->
            <!-- Use this to place the label below the node, for example -->
            <text :x="node.x" :y="node.y + node.height" fill="black">
                {{ node.label }}
            </text>
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['node-label'],
            description: translations.value.slots.nodeLabel[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #node-label="{ node }">
            <!-- Content will be injected inside a svg text element -->
                ID: {{ node.id }}
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['tooltip-node'],
            description: translations.value.slots.tooltipNode[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #tooltip-node="{ node, layoutData }">
                <div style="border: 1px solid red">
                    {{ node }}
                </div>
        </template>
    </${props.componentName}>
            `
        },
        {
            names: ['tooltip-midpoint'],
            description: translations.value.slots.tooltipMidpoint[store.lang],
            snippet: `
    <${props.componentName} :dataset="dataset" :config="config">
        <template #tooltip-node="{ edge, layoutData }">
                <div style="border: 1px solid red">
                    {{ edge }}
                </div>
        </template>
    </${props.componentName}>
            `
        }
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
                    <div v-for="tag in item.names" class="font-inter-medium bg-gradient-to-br from-app-green-light to-app-green text-black rounded-full px-2 py-0.5 shadow">
                        #{{ tag === 'annotator-actions' ? 'annotator-action-xxx' : tag === 'user-menu' ? 'menuIcon, #optionXxx'  : tag.replaceAll('_', '').replaceAll('-circlePack', '') }}
                    </div>
                </div>
                <div class="pl-6 bg-[#FFFFFF10] text-black dark:text-gray-400 rounded-t-2xl py-3 pr-6">{{ item.description }}</div>
<div class="bg-gray-200 dark:bg-[#1A1A1A] overflow-auto rounded-b-2xl relative shadow">
    <div class="absolute top-1 right-1">
        <FlexibleTooltip position="left" :content="translations.clickToCopy[store.lang]">
            <button class="flex place-items-center justify-center p-1 rounded-full hover:bg-[#42d39230] transition-colors" @click="() => copyToClipboard(item.snippet)">
                <CopyIcon class="text-[#3A3A3A] dark:text-app-green" />
            </button>
        </FlexibleTooltip>
    </div>
    <CodeParser
        v-if="item.snippet"
        language="html"
        :content="item.snippet"
        @copy="store.copy()"
    />
    <slot name="after" v-bind="item"/>
</div>                
            </div>
        </template>
    </div>
</template>