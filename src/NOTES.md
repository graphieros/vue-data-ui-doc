## Improvements & new features

### `VueUiStackbar`:

- apply `bars.borderRadius` only to external segments
- apply `bars.borderRadius` to the bars in the minimap
- new waterfall variant

(example & links)

## Fixes

- Prevent crashes when `null` is provided instead of an expected string in all components that use the `createTSpans`, `createTSpansFromLineBreaksOnX` and `createTSpansFromLineBreaksOnY` internal utilities.

For example, the following dataset provided to VueUiHorizontalBar will not crash the component anymore:

```ts
const dataset = computed<VueUiHorizontalBarDatasetItem[]>(() => {
    return [
        {
            name: null, // will show a TS error, but your backend might not care
            value: 100,
        },
        {
            name: "Series B",
            value: 200,
        },
    ];
});
```
