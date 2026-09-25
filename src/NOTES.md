## VueUiSparkline

### Improvements

- For line type: add option to show null values as dashed segments

```ts
const config = computed<VueUiSparklineConfig>(() => ({
    style: {
        line: {
            nullDashes: {
                show: false, // default
            },
        },
    },
}));
```

To show null values as dashed segments:

```ts
const config = computed<VueUiSparklineConfig>(() => ({
    style: {
        line: {
            cutNullValues: false,
            nullDashes: {
                show: true,
            },
        },
    },
}));
```
