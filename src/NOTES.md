## `showOnlyAtModulo:true` with a defined `modulo` fix #378

This is an old bug. `showOnlyAtModulo: true` with a defined `modulo` value was previously interpreted as an approximate number of labels to display, instead of applying an actual modulo.

Now, using `showOnlyAtModulo: true`, with a `modulo: 2` will display one label every 2 ticks.

Components affected by this change:

- VueUiXy (as well as the SSR version)
- VueUiStackbar
- VueUiStackline
- VueUiCandlestick
- VueUiBump
- VueUiRidgeline

> [!WARNING]
> This is a breaking change as it reverses the logic of the `showOnlyAtModulo` property. The default value of `modulo` was changed from 12 to 2.

An additional `showFirstAndLast: true` config property is also added to force the display of the first and last labels, since the use of actual modulo can hide them, depending on the number of labels.
This property is added for the following components:

- VueUiXy (as well as the SSR version)
- VueUiStackbar
- VueUiStackline
- VueUiCandlestick

Forcing the display of the first and last labels can cause these to overlap with other labels in some cases. Text elements for labels now have an extra stroke coating with the same color as the chart background, to facilitate reading when overlapping occurs.
