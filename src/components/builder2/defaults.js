import { editorDataset } from "./dataset.js";
import {
    graphDataset,
    createGraphConfig,
    graphConfigLeaves,
} from "../docs/graph";
import {
    getGraphMakerControlType,
    getGraphMakerPresentation,
} from "../maker/graphMaker";

export function builderDefaults(defaults, dark, lang) {
    return {
        ...defaults,
        vue_ui_gauge: {
            ...defaults.vue_ui_gauge,
            dataset: editorDataset(
                "vue_ui_gauge",
                defaults.vue_ui_gauge.dataset,
            ),
        },
        vue_ui_radar: {
            ...defaults.vue_ui_radar,
            dataset: {
                categories: defaults.vue_ui_radar.categories,
                series: defaults.vue_ui_radar.dataset,
            },
        },
        vue_ui_graph: {
            dataset: graphDataset,
            model: graphConfigLeaves(createGraphConfig(dark, lang)).map(
                ({ path, value, type }) => ({
                    key: path,
                    ...(path === "userOptions.annotator.outlineColor"
                        ? { nullable: true }
                        : {}),
                    ...(path === "userOptions.annotator.outlineThickness"
                        ? { min: 0, max: 10, step: 0.5 }
                        : {}),
                    def: value,
                    type: getGraphMakerControlType(path, type),
                    ...getGraphMakerPresentation(path),
                }),
            ),
        },
    };
}
