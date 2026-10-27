## Built-in annotator improvements

### Annotations follow zoom and pan

On supported charts, annotations now follow the chart’s coordinates when zooming or panning, while retaining their displayed size. This feature is enabled by default. Set `followZoom: false` to opt out.
`VueUiXyCanvas` is excluded.

### Grouping and ungrouping annotations

You can now **group annotation** elements so they move together.
For example, separate text and arrow annotations have independent anchors. When zooming, their spacing can change. Grouping them gives them a shared anchor and preserves their relative spacing.

Grouping is available in every built-in annotator, independently of `followZoom`. It adds three buttons:

1. **Select multiple**: enabled when at least two annotations exist; toggles multi-selection mode.
2. **Group**: enabled when at least two annotations are selected.
3. **Ungroup**: enabled when an annotation group is selected.
   Set showGroupActions to false to hide these controls and disable multi-selection.

Both options default to true:

```js
// Most charts
userOptions: {
    annotator: {
        followZoom: true,
        showGroupActions: true,
    },
}
```

For `VueUiQuickChart`, use:

```js
userOptionsAnnotator: {
    followZoom: true,
    showGroupActions: true,
}
```
