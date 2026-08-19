## `VueUiStripPlot` improvements #374

- New config attributes:

```ts
const config = computed<VueUiStripPlot>(() => ({
    style: {
        chart: {
            grid: {
                scaleMin: null, // Set a value to force the min value of the Y axis
                scaleMax: null, // Set a value to force the max value of the Y axis
            },
        },
    },
}));
```

## Built-in chart annotator

- The annotator menu is now draggable.
- Various fixes for bugs in Safari:
    - arrow heads color were not properly inherited
    - caret position in text mode was offset

To customize the style of the handle, target the following css class:

```css
.vue-ui-pen-and-paper-drag-handle {
}
```
