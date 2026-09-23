## VueUiHeatmap improvement

- Expose the cells data in the #svg slot:

```ts
// #svg slot contents:

{
    drawingArea: {
        bottom: number;
        cellSize: { height: number; width: number };
        height: number;
        left: number;
        right: number;
        sumCellXHeight: number;
        top: number;
        topLabelsHeight: number;
        width: number;
    };
    height: number;
    isPrintingImg: boolean;
    isPrintingSvg: boolean;
    width: number;
    cells: VueUiHeatmapCell[];
};

```

```ts
type VueUiHeatmapCell = {
    datapoint: VueUiHeatmapDatapoint;
    rowIndex: number;
    columnIndex: number;
    x: number;
    y: number;
    width: number;
    height: number;
    labelX: number;
    labelY: number;
    selectionX: number;
    selectionY: number;
};

type VueUiHeatmapDatapoint = {
    color: string;
    id: string;
    ratio: number;
    side: "up" | "down";
    value: number | null;
    xAxisName: string | undefined;
    yAxisName: string | undefined;
};
```
