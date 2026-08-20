## `VueUiXy`

@selectX`emit &`config.event.datapointClick` event:

- expose the full content of the visible dataset
- update related TS types:

### config.event.datapointXxx

```ts
type VueUiXyEvent =
    | (({
          datapoint,
          seriesIndex,
      }: {
          datapoint: VueUiXyDatasetItem[];
          seriesIndex: number;
      }) => void)
    | null;
```

### @selectX emit

```ts
type VueUiXyEmitSelectX = {
    datapoint: VueUiXyDatasetItem[];
    index: number;
    indexLabel: string;
};
```
