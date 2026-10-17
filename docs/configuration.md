# Configuration defaults in the documentation

The source of truth is the installed `vue-data-ui` package. The docs currently
install `3.27.1-beta.0` through `file:vdu2.tgz`; upgrading the local library
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

Each `useConfig()` call returns an enumerable collection with the same 69 keys.
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
2. Run `npm run test:config`. It checks every default and color option against
   the public API, stable reads, nested isolation, Vue edits/resets, and key coverage.
3. Review additions/removals in the public component key contract and update the
   inventory and corresponding documentation deliberately.
4. Run `npm run lint` and `npm run build`, then review representative editors in
   the browser. Library default changes now propagate directly to default displays,
   copy actions and search without editing any docs-side defaults.

Validation for this refactor: all five focused tests passed, and a temporary
pre-refactor baseline comparison confirmed equality for all 69 configurations.
Lint exited successfully with warnings in existing files; targeted lint was clean.
The production build passed with large-chunk warnings. There is no configured
project typecheck script or tsconfig, so no project typecheck was run. The existing
Cypress suite consists of scaffold examples; browser interaction was not tested.
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
