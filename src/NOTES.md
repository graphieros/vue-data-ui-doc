## `VueUiRidgeline` improvements

- New config attributes for y-axis labels positioning:

```ts
const config = computed<VueUiRidgelineConfig>(() => ({
    style: {
        chart: {
            yAxis: {
                labels: {
                    offsetY: 0, // new
                    centered: false, // new, centers vertically on the label's row height
                },
            },
        },
    },
}));
```

- data labels, visible when hovering the chart, now have a stroke coating using the same color as the chart background, to make them more readable.

- expose the formatted dataset in the #svg slot, which makes it possible to inject additional svg elements at specific coordinates:

```html
<VueUiRidgeline :dataset :config>
    <template #svg="{ svg }">
        <!-- svg.data contains all the information about the series coordinates -->
    </template>
</VueUiRidgeline>
```

## `VueUiAnnotator` improvements

- Improved shape editing: shapes, lines, etc are more easy to edit
- Grouping of groups, or individual shapes with existing groups is now possible
- Slots are added to make it possible to customize the annotation menu icons, as well as the trigger that toggles the menu. Here are the slots in question:

| slot name                | exposed data                            | description                                                        |
| ------------------------ | --------------------------------------- | ------------------------------------------------------------------ |
| #toggle                  | toggle: () => void; isOpen: boolean;    | replace the built-in accordion menu with your own toggle mechanism |
| #icon-move               | active: boolean;                        | use your own icon for the move action button                       |
| #icon-resize             | active: boolean;                        | use your own icon for the resize/edit action button                |
| #icon-delete             | active: boolean;                        | use your own icon for the delete action button                     |
| #icon-select-group       | active: boolean;                        | use your own icon for the select & group action button             |
| #icon-bring-to-front     | -                                       | use your own icon for the bring to front action button             |
| #icon-bring-to-back      | -                                       | use your own icon for the bring to back action button              |
| #icon-copy               | -                                       | use your own icon for the copy action button                       |
| #icon-undo               | -                                       | use your own icon for the undo action button                       |
| #icon-redo               | -                                       | use your own icon for the redo action button                       |
| #icon-print              | -                                       | use your own icon for the print action button                      |
| #icon-export-image       | -                                       | use your own icon for the export-image action button               |
| #icon-save               | -                                       | use your own icon for the save action button                       |
| #icon-circle             | filled: boolean;                        | use your own icon for the circle shape action                      |
| #icon-rect               | filled: boolean;                        | use your own icon for the rect shape action                        |
| #icon-arrow              | -                                       | use your own icon for the arrow shape action                       |
| #icon-freehand           | -                                       | use your own icon for the freehand action                          |
| #icon-text               | active: boolean;                        | use your own icon for the text action                              |
| #icon-text-align-left    | -                                       | use your own icon for the text align left action                   |
| #icon-text-align-center  | -                                       | use your own icon for the text align center action                 |
| #icon-text-align-right   | -                                       | use your own icon for the text align right action                  |
| #icon-text-bullet-points | -                                       | use your own icon for the text bullet points action                |
| #icon-text-bold          | -                                       | use your own icon for the text bold action                         |
| #icon-text-italic        | -                                       | use your own icon for the text italic action                       |
| #icon-text-underline     | -                                       | use your own icon for the text underline action                    |
| #icon-color              | color: string; backgroundColor: string; | use your own icon for the color action                             |

## Built-in chart annotator

- It is now possible to define a custom palette for the colors of the annotator's color picker. In all `userOptions` properties of the chart configurations:

```js
const config = {
    userOptions: {
        annotatorPalette: [
            "#000000",
            "#FFFFFF",
            "#FF5733",
            "#33FF57",
            "#3357FF",
            "#FFC300",
            "#800080",
            "#FF1493",
            "#00CED1",
        ],
    },
};
```
