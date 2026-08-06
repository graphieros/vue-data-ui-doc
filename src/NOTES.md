Notes for 3.23.1

## `VueUiCirclePack`

- circle borders now do not scale when zooming, to preserve readability of very small circles when reaching high zoom values.
- tooltips now keep the same size when zooming

## New zoom range input auto fit config option

The zoom range input can now be made to fit the left and right positions of the chart.
By default, this option is turned off, therefore **this is not a breaking change**.

To opt-in, set the `zoom.autoFit` config to `true`.

Notes:

- `autoFit: true` takes precedence over `zoom.maxWidth`.
- with `autoFit: true`, you might consider adding some padding (right or left, depending on the position of the y-axis labels), using the `padding` object in your configuration. Without padding, range handles might overflow the sides of the chart.
- for the `VueUiQuickChart` component, the new attribute is `zoomXyAutoFit`

Components concerned with this change:

- VueUiXy
- VueUiXyCanvas
- VueUiQuickChart
- VueUiStackbar
- VueUiStackline
- VueUiDonutEvolution
- VueUiCandlestick
- VueUiRidgeline (embedded VueUiXy chart in the built-in dialog)
- VueUiTable (embedded VueUiXy chart in the built-in dialog)

Docs are up to date
