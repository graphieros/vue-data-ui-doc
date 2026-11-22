## VueUiGalaxy

### Data labels on the spiral

Galaxy now shows slice callouts by default. Each callout shows the value and percentage above the series name. Callouts use the active theme’s label color unless you set `dataLabels.color`.

By default, slices at or below 3% of the visible total have no label. Slices above 3% through 8% use compact callouts. Hovering a slice or its label highlights that slice and dims the other callouts. Hiding or restoring series in the legend updates the labels while keeping the SVG dimensions steady.

This example shows percentages alone, changes the small-slice thresholds and adds the labels toggle to the chart menu.

```vue
<script setup>
import { VueUiGalaxy } from "vue-data-ui";

const dataset = [
    { name: "Direct", values: [78] },
    { name: "Search", values: [15] },
    { name: "Referral", values: [7] },
];

const config = {
    userOptions: {
        buttons: { labels: true },
    },
    style: {
        chart: {
            layout: {
                labels: {
                    dataLabels: {
                        show: true,
                        showName: true,
                        showValue: true,
                        showPercentage: true,
                        hideUnderValue: 3,
                        smallArcClusterThreshold: 8,
                        smallArcClusterFontSize: 8,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        fontSize: 10,
                        bold: true,
                        color: "#2D353C",
                        showValueFirst: true,
                        usePercentageParens: true,
                        useValueParens: false,
                        prefix: "",
                        suffix: "",
                        formatter: null,
                    },
                },
            },
        },
    },
};
</script>

<template>
    <VueUiGalaxy :dataset="dataset" :config="config" />
</template>
```

Set `style.chart.layout.labels.dataLabels.show` to `false` to start with callouts hidden. You can also call `toggleLabels()` on a chart component ref.

### Legend animation and slice outlines

When you a series through the legend, the remaining positive slices animate to their new lengths.
Animation is enabled by default. `animationSpeed` is a multiplier, so `1` takes 200 ms and `2` takes 100 ms. The animation respects the system’s reduced-motion preference. Set `useAnimation: false` for immediate updates.

Slice outlines now default to `4`. When a divider would cover a short slice, Galaxy reserves space for the dividers and allocates the remaining colored length in proportion to the data. If the dividers would take up the entire spiral, Galaxy narrows them.

Use this config for faster legend transitions and no slice outlines.

```js
const config = {
    animationSpeed: 2, // or 0.5 if you prefer slower
    style: {
        chart: {
            layout: {
                arcs: { borderWidth: 0 },
            },
        },
    },
};
```

### Tooltip, accessibility, table fixes

- The default tooltip treats series names as plain text. Re-enabling tooltips restores the tooltip for the selected slice.
- Loading placeholders no longer fire datapoint leave callbacks.
- The chart’s accessible name follows the current title and subtitle.
- The table shows a dash for the total percentage when the visible total is zero or the percentage is undefined.
