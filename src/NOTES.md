## `VueUiRadar` improvements

- New config attributes:

```ts
const config = computed<VueUiRadarConfig>(() => ({
    style: {
        chart: {
            layout: {
                grid: {
                    rotation: 0, // New: rotate the radar by n degrees
                },
                labels: {
                    dataLabels: {
                        offset: 0, // New: offset labels from their related apex
                    },
                },
            },
        },
    },
}));
```

- Trigger the tooltip when hovering the radar plots
