## New features

### Drag to zoom

- The zoom configuration adds an optional drag-to-zoom feature for the following components:
    - `VueUiXy`
    - `VueUiXyCanvas`
    - `VueUiStackbar`
    - `VueUiStackline`
    - `VueUiDonutEvolution`
    - `VueUiCandlestick`
    - `VueUiQuickChart`

This new feature is disabled by default to avoid any breaking change in your setups:

```ts
zoom: {
    // New
    dragToZoom: {
        show: false,
        selection: {
            fill: "#1f77b4",
            stroke: "#A1A1A1",
            fillOpacity: 0.2,
            strokeOpacity: 0.5,
            strokeWidth: 1,
            strokeDasharray: 0,
        }
    }
}
```

- When in zoom state, hitting <kbd>Esc</kbd> or double-clicking on the chart will reset the zoom state.

- Drag-to-zoom is also added to the `VueUiSparkline` component, also disabled by default:

```ts
const config = computed<VueUiSparklineConfig>(() => ({
    // New
    zoom: {
        show: false,
        selection: {
            fill: "#2D353C",
            stroke: "transparent",
            fillOpacity: 0.1,
            strokeOpacity: 0.5,
            strokeWidth: 1,
            strokeDasharray: 0,
        },
        // A tiny reset button appears on the top right of the chart when the zoom is active
        resetButton: {
            show: true,
            title: "Reset zoom · double-click chart or press Esc",
            ariaLabel: "Reset zoom",
            color: "#2D353C",
        },
    },
}));
```

### Zoom sync between component instances

- It is now possible to sync zoom states between components (that have the zoom feature). It is preferable for these instances' datasets to have the same range of data points.
- It is possible to sync zoom states between components that have this feature.

```ts
// Declare this ref in the component where chart instances are placed
const zoomState = ref<VueUiZoomState>(null);
```

```html
<template>
    <!-- Just use the model on all instances to sync their zoom state -->
    <VueUiXy
        v-model:zoom-state="zoomState"
        :dataset="datasetXy"
        :config="configXy"
    />
    <VueUiStackbar
        v-model:zoom-state="zoomState"
        :dataset="datasetBars"
        :config="configBars"
    />
</template>
```

## Fixes

### `VueUiSparkline`

- fix bars overflow in bar mode, especially visible when only a few data points are provided

## Other

### `VueUiSparkline`

- disable animation by default

### `VueUiXyCanvas`

- add events in config:

```ts
const config = computed<VueUiXyCanvasConfig>(() => ({
    // Default:
    events: {
        datapointEnter: null,
        datapointLeave: null,
        datapointClick: null,
    },
    /**
     * For example:
     *
     * datapointEnter: ({ seriesIndex }) => {
     *  selectedIndex.value = seriesIndex;
     * },
     * datapointLeave: () => {
     *  selectedIndex.value = null;
     * }
     */
}));
```
