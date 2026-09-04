## `VueUiSparkbar`

- Add new `borderRadius` config attribute:

```ts
const config = computed<VueUiSparkbarConfig>(() => ({
    style: {
        bar: {
            borderRadius: null, // by default resolves to the same radius as before. Any number provided will be overriden with the svg height / 2 if it exceeds this value.
        },
    },
}));
```

## `VueUiSparkStackbar`

- Add new `borderRadius` config attribute:

```ts
const config = computed<VueUiSparStackbarConfig>(() => ({
    style: {
        bar: {
            borderRadius: null, // by default resolves to the same radius as before. Any number provided will be overriden with the svg height / 2 if it exceeds this value.
        },
    },
}));
```

- Apply the border radius to legend and tooltip markers
