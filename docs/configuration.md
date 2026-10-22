# Configuration defaults in the documentation

The source of truth is the installed `vue-data-ui` package. The docs currently
install `3.27.1` through `file:vdu.tgz`; upgrading the local library
repository alone does not update the docs dependency.

## Integration

Previously, `src/assets/useConfig.js` copied the library's full default catalog,
color constants, shared fragments and color-option logic. That copy could drift
independently from both chart behavior and the public default-config utility.

The file now adapts `getVueDataUiConfig` from the public `vue-data-ui/utils`
entry point. The installed exports map and declarations support this entry.
The accessible library source confirms that `src/getVueDataUiConfig.js` delegates
to `src/useConfig.js`, which is also used by chart implementations. No library
changes or internal runtime imports are needed.

Each `useConfig()` call returns an enumerable collection with the documented component keys.
A key's first read calls the public factory and replaces its accessor with a
normal writable property. Subsequent reads retain object identity. Options are
captured when the collection is created. No defaults are cached across consumers
or component keys; the library factory currently returns fresh nested objects
and arrays. Tests guard this requirement during upgrades.

Existing imports intentionally remain valid. Search and navigation enumerate
this collection; About counts its keys; default-config copy actions read its
values. Editors keep their existing Vue refs, explicit demo configurations,
light/dark overrides, callbacks and JSON-cloned reset snapshots. The adapter
supplies raw defaults and does not merge configs or change reactive state.
In particular, resets restore the demo's original configuration, which may
intentionally differ from the library's defaults.

## Scope and tradeoffs

`CONFIG_COMPONENTS` is docs inventory metadata, not duplicated configuration.
There is no public runtime key enumerator, so the explicit inventory is retained;
a test compares it with the installed public `VueDataUiConfigKey` type union.
New components require a deliberate inventory and documentation update.
Existing demo presets, theme choices and editor presentation remain docs-owned;
this change does not attempt to derive authored examples from default values.

The public factory currently contains the entire defaults catalog and constructs
it on each factory call. Lazy resolution avoids calls for unused keys, but a
whole-catalog search still makes one call per component. Per-component defaults
cannot be independently tree-shaken with this API. The docs no longer ship their
own second implementation, and the utility import does not pull in component
implementations. A focused production bundle inspection contained three modules,
zero `dist/components` modules, and approximately 145 kB of uncompressed code
(including library defaults). This is not a before/after site-size measurement.
A future public per-component factory could improve allocation and splitting;
it is not required for this refactor.

## Upgrade and validation

1. Replace/install the library tarball using the project's normal dependency workflow.
2. Run `pnpm test:doc-bindings`. It checks every default and color option against
   the public API, stable reads, nested isolation, Vue edits/resets, and key coverage.
3. Review additions/removals in the public component key contract and update the
   inventory and corresponding documentation deliberately.
4. Run `pnpm lint` and `pnpm build`, then review representative editors in
   the browser. Library default changes now propagate directly to default displays,
   copy actions and search without editing any docs-side defaults.

Validation for this refactor: all five focused tests passed, and a temporary
pre-refactor baseline comparison confirmed equality for all 69 configurations.
Lint exited successfully with warnings in existing files; targeted lint was clean.
The production build passed with large-chunk warnings. There is no configured
project typecheck script or tsconfig, so no project typecheck was run.
Browser interaction was not tested.
Build output was regenerated in `dist` by the normal build script.

## Existing consumers

All consumers below retain their existing imports and now use the adapter:

- `src/components/BaseDocWrapper.vue`
- `src/components/DeepSearch.vue`
- `src/components/docs/DocVueUi3dBar.vue`
- `src/components/docs/DocVueUiAccordion.vue`
- `src/components/docs/DocVueUiAgePyramid.vue`
- `src/components/docs/DocVueUiAnnotator.vue`
- `src/components/docs/DocVueUiBullet.vue`
- `src/components/docs/DocVueUiBump.vue`
- `src/components/docs/DocVueUiCandlestick.vue`
- `src/components/docs/DocVueUiCarouselTable.vue`
- `src/components/docs/DocVueUiChestnut.vue`
- `src/components/docs/DocVueUiChord.vue`
- `src/components/docs/DocVueUiCirclePack.vue`
- `src/components/docs/DocVueUiCursor.vue`
- `src/components/docs/DocVueUiDag.vue`
- `src/components/docs/DocVueUiDashboard.vue`
- `src/components/docs/DocVueUiDigits.vue`
- `src/components/docs/DocVueUiDonut.vue`
- `src/components/docs/DocVueUiDonutEvolution.vue`
- `src/components/docs/DocVueUiDumbbell.vue`
- `src/components/docs/DocVueUiFlow.vue`
- `src/components/docs/DocVueUiFunnel.vue`
- `src/components/docs/DocVueUiGalaxy.vue`
- `src/components/docs/DocVueUiGauge.vue`
- `src/components/docs/DocVueUiGeo.vue`
- `src/components/docs/DocVueUiGizmo.vue`
- `src/components/docs/DocVueUiHeatmap.vue`
- `src/components/docs/DocVueUiHill.vue`
- `src/components/docs/DocVueUiHistoryPlot.vue`
- `src/components/docs/DocVueUiHorizontalBar.vue`
- `src/components/docs/DocVueUiKpi.vue`
- `src/components/docs/DocVueUiLabel.vue`
- `src/components/docs/DocVueUiMiniLoader.vue`
- `src/components/docs/DocVueUiMolecule.vue`
- `src/components/docs/DocVueUiMoodRadar.vue`
- `src/components/docs/DocVueUiNestedDonuts.vue`
- `src/components/docs/DocVueUiOnion.vue`
- `src/components/docs/DocVueUiParallelCoordinatePlot.vue`
- `src/components/docs/DocVueUiQuadrant.vue`
- `src/components/docs/DocVueUiQuickChart.vue`
- `src/components/docs/DocVueUiRadar.vue`
- `src/components/docs/DocVueUiRating.vue`
- `src/components/docs/DocVueUiRelationCircle.vue`
- `src/components/docs/DocVueUiRidgeline.vue`
- `src/components/docs/DocVueUiRings.vue`
- `src/components/docs/DocVueUiScatter.vue`
- `src/components/docs/DocVueUiSkeleton.vue`
- `src/components/docs/DocVueUiSmiley.vue`
- `src/components/docs/DocVueUiSparkHistogram.vue`
- `src/components/docs/DocVueUiSparkStackbar.vue`
- `src/components/docs/DocVueUiSparkTrend.vue`
- `src/components/docs/DocVueUiSparkbar.vue`
- `src/components/docs/DocVueUiSparkgauge.vue`
- `src/components/docs/DocVueUiSparkline.vue`
- `src/components/docs/DocVueUiStackbar.vue`
- `src/components/docs/DocVueUiStackline.vue`
- `src/components/docs/DocVueUiStripPlot.vue`
- `src/components/docs/DocVueUiTable.vue`
- `src/components/docs/DocVueUiTableHeatmap.vue`
- `src/components/docs/DocVueUiTableSparkline.vue`
- `src/components/docs/DocVueUiThermometer.vue`
- `src/components/docs/DocVueUiTimer.vue`
- `src/components/docs/DocVueUiTiremarks.vue`
- `src/components/docs/DocVueUiTreemap.vue`
- `src/components/docs/DocVueUiWaffle.vue`
- `src/components/docs/DocVueUiWheel.vue`
- `src/components/docs/DocVueUiWorld.vue`
- `src/components/docs/DocVueUiXy.vue`
- `src/components/docs/DocVueUiXyCanvas.vue`
- `src/components/docs/DocsVueUiWordCloud.vue`
- `src/components/examples/components/ExampleTreemap.vue`
- `src/searchHelper.js`
- `src/useAttrMapping.js`
- `src/views/About.vue`
- `src/views/Docs.vue`
- `src/views/Home.vue`
- `src/views/Versions.vue`

## Object-binding configuration editors

All 66 existing primary documentation configuration editors use a pair of files
under `src/components/docs/configuration/`: a `vue-ui-…-config.js` metadata factory
and a `VueUi…ConfigFields.vue` component. The pages keep their demo state, chart callbacks, and navigation. Each page
authors one writable computed `config`, with theme differences expressed inline
as `isDarkMode.value ? darkValue : lightValue`. Their
`configCode` containers remain in place for the existing tree toggle.

`DocConfigFields.vue` recursively renders the metadata with `BaseDetails` and
`BaseAttr`. Rich content preserves comments, text, containers, formatter/tab
links, icon/color previews, and annotator palettes. Molecule's native color
inputs and QuickChart's conditional palette previews retain their handlers and
conditional rendering. Factories receive the page context explicitly; no page
state is moved into a global registry.

`useDocConfigBindings` delegates to the public `useObjectBindings` composable.
Each access verifies that a binding exists before reading the library proxy, so
unknown paths cannot invoke its state-mutating fallback. The migrated editors
explicitly allow indexed arrays, including MoodRadar's smiley colors. The
existing XY binding context remains compatible with its original options.

Some legacy demo presets omit fields that their controls document. The new
editors complete only missing documented leaf values from fresh public
`getVueDataUiConfig` defaults. `completeDocConfig` validates the entire pending
set before changing anything, clones inserted values, preserves existing demo
values, and runs again on preset replacement. Optional public properties with no
runtime default can declare `initialValue` in their metadata. Library defaults
are never modified. Unknown paths still fail with a diagnostic.

The rollout corrected stale paths where a supported destination was clear,
including misspellings, misplaced axis-label fields, Flow node labels, Chord
markers, Scatter selector controls, and minimap height paths. The unknown
`BaeAttr` tag in Scatter was corrected to a real field. Existing rows for absent
library options remain visible as inactive reference rows rather than creating
unsupported config properties. These rows are marked `unsupported` in metadata:

| Component                 | Inactive reference row                            |
| ------------------------- | ------------------------------------------------- |
| Bump, Stackbar, Stackline | `style.chart.title.show`                          |
| Chord                     | `table.td.roundingValue`                          |
| Donut                     | A formatter description with no editable path     |
| HistoryPlot               | `style.chart.tooltip.showValue`, `showPercentage` |
| Scatter                   | `table.td.roundingPercentage`                     |
| Waffle                    | `style.chart.layout.labels.dataLabels.oneLine`    |

`BaseAttr` accepts a binding ref or a single active `config` object. Older
`light`/`dark`/`attr` consumers remain supported for separate examples. Field
components now take one `config` prop instead of separate light/dark props. Defaults shown in the documentation remain presentation
metadata and can differ from the demo's current values.

Run `pnpm test:doc-bindings` for both the focused binding regressions and the
full rollout checks. The 83 tests cover editor coverage, actual light/dark demo
presets, resets, missing-path protection, library-default isolation, indexed
arrays, navigation metadata, and language changes. The fixture helper evaluates
only trusted local preset initializers; it does not mount the application, run
lifecycle hooks, or fetch remote data.

The production build passed. New metadata, renderer, helper, and test lint checks
are clean; the docs-wide lint check reports two existing escaping warnings in
Stackbar/Stackline example strings. Browser interaction and visual regression
checks were not performed. Installed package files were not changed.

## Writable computed demo configuration

All 68 chart docs with a main configuration, plus the JSON accordion helper,
now author one computed `config` with `get` and `set`. The getter passes the
single preset object to `useDocConfigState`; only differing light/dark values
use theme ternaries. The old `darkModeConfig`, `mutableConfig`, and
`mutableConfigDarkMode` declarations and consumers have been removed. Icon docs
already use individual props and need no configuration object.

`useDocConfigState` stores editable state separately from the authored preset,
retains edits per theme, and supports whole-object replacement through the
computed setter, including before its first read. When reactive preset inputs
such as Skeleton's type change, unchanged defaults follow the new preset while
edited values remain. Callback functions are preserved during cloning. Full
reset discards edits for both themes and uses the current reactive preset.

Reset handlers now call `configState.reset()`. The chart, copy actions, metadata
context, and controls share the same active computed config. Identical native
input pairs that only differed by their old light/dark target were consolidated.
Unused Donut auxiliary preset pairs were removed. The JSON accordion helper now
obtains the theme from the main store, and Skeleton's type uses the selected
string directly in either theme.

A temporary comparison checked all 138 pre/post-refactor theme presets across
69 components; values match, with the intentional Skeleton type correction.
Seven state regressions cover nested edits, root assignment, dependency changes,
callbacks, resets, binding compatibility, component coverage, and Skeleton type
changes, alongside the existing 76 editor/binding regressions.

## VueUiGraph

`DocVueUiGraph.vue` uses the shared config state and binding components. Its
editable scalar fields are derived from the public graph defaults in
`components/docs/graph.js`. Arrays, callbacks and skeleton objects can be supplied
in application code. The same defaults populate `MakerGraph.vue`, whose graph
dataset and configuration are saved independently under `graphDataset` and
`graphConfig`. Node removal also removes its incident links.
