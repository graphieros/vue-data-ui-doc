## Fixes

### `VueUiHeatmap`:

- some config properties were not applied:
    - `yAxis.offsetX`
    - `xAxis.offsetY`

- expose cells data in the config `events.datapointEnter` event

- allow any type of color format passed to the `cells.color.hot` and `cells.color.cold` config properties
