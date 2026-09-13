## `VueUiRidgeline` improvements

- New config attribute to show the last label when the chart is not hovered:

```ts
const config = computed<VueUiRidgelineConfig>(() => ({
    style: {
        chart: {
            yAxis: {
                labels: {
                    showLast: false, // new
                },
            },
        },
    },
}));
```

## `VueUiAgePyramid` improvements

- Optional display of bar data labels:

```ts
const config = computed<VueUiAgePyramidConfig>(() => ({
    style: {
        layout: {
            bars: {
                // new
                labels: {
                    show: true,
                    showOnHover: true, // set to false, always shows labels if labels.show is also true
                    fontSize: 12,
                    color: "#2D353C",
                    bold: false,
                    formatter: null,
                    offsetX: 0,
                },
            },
        },
    },
}));
```

## Other

- Reduce package size (-133 Ko)
