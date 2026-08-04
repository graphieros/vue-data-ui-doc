## `VueUiHill` new component ! #369

Visualize how multiple tasks progress from “to do” to “done” while emphasizing the effort or difficulty around the midpoint. Use it for project tracking, workflow reviews, prioritization, or collaborative planning when users need to compare statuses and interactively reposition items.

screenshot

docs + maker

## Transitons standardization

CSS transitons are now standardized, with a few changes:

- To avoid any impression of CLS on load, css transitions are applied after a short customisable delay
- Transitions are forcefully disabled when prefers-reduced-motion is enabled
- Additional configuration options are addeed to some charts:

```ts
const config = {
  transitions: {
    enable: boolean // default: true, forcefully disabled when `prefers-reduced-motion: reduce`
    pauseOnLoad: boolean // default: true
    pauseOnDatasetChange: boolean // default: false
    activationDelayMs: number // default: 300
  }
}
```

Components where this additional configuration is available:

- VueUiHill
- VueUiStackline
- VueUiStackbar
- VueUiXy
- VueUiTreemap
- VueUiOnion
- VueUiHorizontalBar
- VueUiScatter
- VueUiCandlestick
- VueUiQuickChart
- VueUiRings
- VueUiDonutEvolution
- VueUiGalaxy
- VueUiStripPlot
- VueUiParallelCoordinatePlot
- VueUiHistoryPlot
- VueUiCirclePack

## Dev hints

You can opt-in to have hints on the quality of your dataset, and to know if it is not adapted to the chart you are using.
This is a new config attribute present on all components of the library.

```ts
const config = {
    devHints: boolean, // default: false
};
```

donut example
