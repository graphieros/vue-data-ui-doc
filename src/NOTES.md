## `VueUiLabel` new component

Use draggable labels in your chart components #svg slot, or inside any svg.

- Attach a label to target coordinates

```ts
type VueUiLabelDataset = {
    [key: string]: any;
    id?: number | string;
    x: number; // x coordinate for the target
    y: number; // y coordinate for the target
    position?: {
        // optional specific coordinates for the label's box
        x: number | null;
        y: number | null;
    };
};
```

Example usage:

````html
<VueUiDonut :dataset="datasetDonut" :config="configDonut">
    <template #svg="{ svg }">
        <VueUiLabel
            :dataset="{
                x: svg.drawingArea.width / 2,
                y: svg.drawingArea.height / 2,
            }"
            :config="{
                title: {
                    text: 'LABEL'
                },
                content: {
                    text: 'Lorem ispsum dolor sit amet...'
                }
            }"
        />
    </template>
</VueUiDonut>
```
````
