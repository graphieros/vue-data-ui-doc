import { graphTranslations } from "../translations/graph.js";
// VueUiGraph scopes differ from the common chart slots with the same names.
const wrap = (content) => `<VueUiGraph :dataset="dataset" :config="config">
${content}
</VueUiGraph>`;

export function createGraphSlotSnippets(text = graphTranslations.en) {
    return {
        node: wrap(`    <template #node="{ node, radius, color, selected, hovered }">
        <!-- Render SVG content inside the node's translated group. -->
        <circle :r="radius" :fill="color"
            :stroke="selected || hovered ? '#FFB74D' : '#FFFFFF'"
            :stroke-width="selected || hovered ? 3 : 1" />
        <title>{{ node.label || node.id }}</title>
    </template>`),
        "svg-underlayer":
            wrap(`    <template #svg-underlayer="{ nodes, links, config, viewport }">
        <!-- ${text.underlayerComment} -->
        <circle v-for="node in nodes" :key="node.id"
            :cx="node.x" :cy="node.y" :r="(node.radius || 7) + 8"
            :fill="config.style.chart.color" opacity="0.08" />
    </template>`),
        svg: wrap(`    <template #svg="{ nodes, links, config, viewport }">
        <!-- ${text.overlayComment} -->
        <text x="12" y="24" :fill="config.style.chart.color">
            {{ nodes.length }} ${text.nodes} / {{ links.length }} ${text.links}
        </text>
    </template>`),
        "chart-background":
            wrap(`    <template #chart-background="{ width, height, config }">
        <!-- ${text.backgroundComment} -->
        <rect :width="width" :height="height"
            fill="none" :stroke="config.style.chart.color" stroke-dasharray="4 4" />
    </template>`),
        "tooltip-before": wrap(`    <!-- ${text.tooltipComment} -->
    <template #tooltip-before="{ datapoint, node, connections, config }">
        <strong>{{ datapoint.label || datapoint.id }}</strong>
    </template>
    <template #tooltip="{ datapoint, node, connections, config }">
        <div>{{ connections }} ${text.connections}</div>
    </template>
    <template #tooltip-after="{ datapoint, node, connections, config }">
        <small>{{ datapoint.group }}</small>
    </template>`),
        source: wrap(`    <template #source>
        <p>${text.dataSource}: <cite>${text.mySource}</cite></p>
    </template>`),
        watermark: wrap(`    <template #watermark="{ width, height }">
        <text :x="width / 2" :y="height - 16" text-anchor="middle"
            fill="#888888" opacity="0.5">${text.myGraph}</text>
    </template>`),
        "user-menu": wrap(`    <template #menuIcon="{ isOpen, color }">
        <span :style="{ color }">{{ isOpen ? '−' : '+' }}</span>
    </template>
    <template #custom-menu-before><span>${text.graphActions}</span></template>
    <template #optionTooltip><MyTooltipIcon /></template>
    <template #optionPdf><MyPdfIcon /></template>
    <template #optionCsv><MyCsvIcon /></template>
    <template #optionImg><MyImageIcon /></template>
    <template #optionSvg><MySvgIcon /></template>
    <template #optionTable><MyTableIcon /></template>
    <template #optionAltCopy><MyCopyIcon /></template>
    <template #optionFullscreen="{ isFullscreen }">
        <MyFullscreenIcon :active="isFullscreen" />
    </template>
    <template #optionAnnotator="{ isAnnotator }">
        <MyPenIcon :active="isAnnotator" />
    </template>
    <template #optionZoom="{ toggleZoom, isZoomLocked }">
        <MyZoomIcon :locked="isZoomLocked" />
    </template>
    <template #custom-menu-after><span>${text.customContent}</span></template>`),
        skeleton: wrap(`    <!-- ${text.loadingComment} -->
    <template #skeleton>
        <div v-if="config.loading" role="status">${text.loadingGraph}</div>
    </template>`),
    };
}

export const graphSlotSnippets = createGraphSlotSnippets();
