## VueUiWordCloud

### Word rotation and repeatable layouts

New options under `style.chart.words`:

| Option            | Default | Behavior                                                                                                                                                                               |
| ----------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `angles`          | `[0]`   | Allowed word rotations, in degrees. Words remain horizontal by default.                                                                                                                |
| `randomizeAngles` | `false` | When `false`, assigns angles by cycling through `angles` in dataset order. When `true`, selects angles using the seeded random generator.                                              |
| `randomness`      | `0.2`   | Controls the spread of starting positions: `0` starts all searches at the center; `1` allows starting positions throughout the chart. Final positions still depend on available space. |
| `seed`            | `42`    | Controls repeatable placement and randomized angle selection. The same dataset, configuration, dimensions, fonts, and seed produce the same layout.                                    |

```js
const config = {
    style: {
        chart: {
            words: {
                angles: [0, -90],
                randomizeAngles: true,
                randomness: 0.2,
                seed: 42,
            },
        },
    },
};
```

Example values for `angles`:

| Appearance              | Value              |
| ----------------------- | ------------------ |
| Horizontal              | `[0]`              |
| Horizontal and vertical | `[0, -90]`         |
| 45° steps               | `[-45, 0, 45, 90]` |
| Tilted                  | `[-20, 0, 20]`     |

### Layout sizing behavior

Words now retain their assigned font size and angle. The layout no longer shrinks individual words or enlarges the completed cloud. Words that cannot be placed at their assigned size and angle are omitted.

To make room for more words, increase the chart dimensions or reduce the font-size range:

```js
const config = {
    style: {
        chart: {
            width: 700,
            height: 450,
            words: {
                minFontSize: 12,
                maxFontSize: 48,
            },
        },
    },
};
```

### Deprecated option

`quality` is deprecated. Existing values (`'fast'`, `'balanced'`, and `'precise'`) remain accepted but have no effect. Remove this property from your configuration; no replacement is required.
