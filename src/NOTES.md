## VueUiXy

### Edge case fixes for line types

- `useArea` now always cuts around null values, even when `line.cutNullValues: false`, while the line still connects non null edges. Interline areas follow the same rule.

- fix areas offset when zooming on datasets with interlines, resulting in diagonal cuts

- fix dashIndices getting offset when using the zoom

- fix line series with `useStepper:true` rendering issue with null values associated with `config.line.cutNullValues:false`

### Improvements

- For line types: add option to show null values as dashed segments

```ts
const config = computed<VueUiXyConfig>(() => ({
    line: {
        nullDashes: {
            show: false, // default
        },
    },
}));
```

To show null values as dashed segments:

```ts
const config = computed<VueUiXyConfig>(() => ({
    line: {
        cutNullValues: false,
        nullDashes: {
            show: true,
        },
    },
}));
```
