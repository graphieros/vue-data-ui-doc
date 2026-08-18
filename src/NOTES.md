## `VueUiWaffle` improvements

- New config attributes:

```ts
const config = computed<VueUiWaffleConfig>(() => ({
    style: {
        chart: {
            layout: {
                rect: {
                    merged: false, // New: merge all series squares into unique polygons

                    // New: alternatives to signal series highlight when useBlurOnHover is set to `false`
                    selection: {
                        unselectedOpacity: 0.6,

                        // New: signal highlight by gift-wraping all squares of highlighted series with a polygon
                        wrap: {
                            show: true,
                            stroke: "#2D353C",
                            strokeWidth: 3,
                            strokeLinejoin: "round",
                        },
                    },
                },
            },
        },
    },
}));
```
