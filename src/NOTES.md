## VueUiStackbar: 3D bars (cavalier perspective)

Enable `style.chart.bars.perspective.show` to give bars a 3D projection.

Perspective is off by default. When enabled, it projects to the right by 12 SVG units. Set `direction` to `'left'` or `'right'` and use `depth` to control the offset. The effective depth is limited to half the smaller plot dimension so there is room for the bar fronts.

The floor is shown by default when perspective is enabled. It sits at zero and tints the portions of below-zero faces it crosses. Use `floor.show`, `floor.color`, `floor.opacity` to customize it.

Perspective works on vertical and horizontal layouts, as well as for the classic or weterfall variants.

```ts
const config = computed<VueUiStackbarConfig>(() => ({
    style: {
        chart: {
            bars: {
                perspective: {
                    show: true,
                    direction: "right",
                    depth: 16,
                    floor: {
                        show: true,
                        color: "#64748B",
                        opacity: 0.2,
                    },
                },
            },
        },
    },
}));
```

Docs are up to date
