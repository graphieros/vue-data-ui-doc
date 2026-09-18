## `VueUiHeatmap` improvements

- `scaleMax` and `scaleMin` optional config attributes are added, to control the strength of cell colors on a fixed bounds, instead of relying on the default max value of the dataset.

- The previous behavior is unchanged, since these new properties are set to `null` by default.

```ts
const config = computed<VueUiHeatmapConfig>(() => ({
    style: {
        layout: {
            cells: {
                scaleMax: null, // new
                scaleMin: null, // new
            },
        },
    },
}));
```
