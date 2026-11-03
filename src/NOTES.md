## VueUiXy: dataset analysis

- Opt in with `chart.userOptions.buttons.analyze: true` (default: `false`) to open Analyze from the user-options menu.
- Choose visible series, analysis types and annotation appearance, then preview, apply or cancel.
- Supports minimum, maximum, average, median, linear trend, largest increase/decrease, first-to-last change, outlier candidates, gaps between comparable series and threshold crossings. It is possible to only show some of these options for a more minimal UI.
- Appearance controls preview color, font size and stroke width. Reopening Analyze immediately previews the remembered selections and appearance.
- Configure available options, thresholds, annotation limits, labels and locale under the root-level `analysis` config. Options are available by default; dialog checkboxes initially remain unchecked.
- Analysis follows the visible zoom range and excludes hidden series. Data, visibility or zoom-range changes clear generated annotations.
- `chart.userOptions.callbacks.analyze(result)` runs on Apply instead of inserting annotations. Use the selected options, series, appearance, range, metrics and summary text for custom reports, statistics tables or saved results.
- Customize the menu icon through `#optionAnalyze` and the analysis dialog’s color-picker icon through `#analysis-action-color="{ color }"`.

## Built-in annotator improvements

- Annotations follow zoom and pan by default on supported charts, retaining their displayed size. Set `followZoom: false` to opt out. `VueUiXyCanvas` is excluded.
- Select multiple annotations, group them to preserve their relative spacing, or ungroup them for individual editing. Group controls work independently of zoom following; hide them with `showGroupActions: false`.
- Manual and analysis annotations now support configurable outlines for readability.

Default annotator settings:

```js
userOptions: {
    annotator: {
        followZoom: true,
        showGroupActions: true,
        useOutline: true,
        outlineThickness: 1,
        outlineColor: null, // Uses the chart background by default
    },
}
```

For VueUiXy, use `chart.userOptions.annotator`; for VueUiQuickChart, use `userOptionsAnnotator`.

New toolbar slots: `annotator-action-select-multiple` (`isSelecting`), `annotator-action-group` and `annotator-action-ungroup` (`disabled`).

New icons: `analyze`, `group`, `ungroup`, `selectMultiple` and `selectMultipleActive`.
