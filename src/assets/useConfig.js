import { getVueDataUiConfig } from "vue-data-ui/utils";

// Docs component inventory, not configuration defaults. Keep this in sync with
// the documented components when upgrading vue-data-ui (see docs/configuration.md).
export const CONFIG_COMPONENTS = Object.freeze([
    "vue_ui_xy",
    "vue_ui_donut",
    "vue_ui_treemap",
    "vue_ui_waffle",
    "vue_ui_radar",
    "vue_ui_quadrant",
    "vue_ui_gauge",
    "vue_ui_wheel",
    "vue_ui_tiremarks",
    "vue_ui_chestnut",
    "vue_ui_onion",
    "vue_ui_vertical_bar",
    "vue_ui_horizontal_bar",
    "vue_ui_heatmap",
    "vue_ui_scatter",
    "vue_ui_candlestick",
    "vue_ui_sparkline",
    "vue_ui_sparkbar",
    "vue_ui_sparkstackbar",
    "vue_ui_sparkhistogram",
    "vue_ui_sparkgauge",
    "vue_ui_spark_trend",
    "vue_ui_quick_chart",
    "vue_ui_age_pyramid",
    "vue_ui_relation_circle",
    "vue_ui_thermometer",
    "vue_ui_rings",
    "vue_ui_donut_evolution",
    "vue_ui_mood_radar",
    "vue_ui_molecule",
    "vue_ui_nested_donuts",
    "vue_ui_galaxy",
    "vue_ui_strip_plot",
    "vue_ui_dumbbell",
    "vue_ui_3d_bar",
    "vue_ui_table_sparkline",
    "vue_ui_table_heatmap",
    "vue_ui_word_cloud",
    "vue_ui_xy_canvas",
    "vue_ui_flow",
    "vue_ui_parallel_coordinate_plot",
    "vue_ui_timer",
    "vue_ui_carousel_table",
    "vue_ui_gizmo",
    "vue_ui_stackbar",
    "vue_ui_bullet",
    "vue_ui_funnel",
    "vue_ui_history_plot",
    "vue_ui_world",
    "vue_ui_ridgeline",
    "vue_ui_chord",
    "vue_ui_stackline",
    "vue_ui_dag",
    "vue_ui_geo",
    "vue_ui_bump",
    "vue_ui_circle_pack",
    "vue_ui_cursor",
    "vue_ui_accordion",
    "vue_ui_kpi",
    "vue_ui_mini_loader",
    "vue_ui_smiley",
    "vue_ui_rating",
    "vue_ui_annotator",
    "vue_ui_dashboard",
    "vue_ui_skeleton",
    "vue_ui_table",
    "vue_ui_digits",
    "vue_ui_hill",
    "vue_ui_label",
]);

/**
 * A fresh, lazy collection of library defaults for one docs consumer.
 * Each key is resolved once per collection, retaining normal mutable-object
 * behavior while avoiding construction of configs that a page never reads.
 * The public library factory owns defaults and color-option handling.
 */
export function useConfig(options = {}) {
    // Capture scalar color options now, matching the previous eager API.
    const configOptions = { ...options };
    const configs = {};

    for (const component of CONFIG_COMPONENTS) {
        Object.defineProperty(configs, component, {
            enumerable: true,
            configurable: true,
            get() {
                // The public factory returns fresh nested objects on each call.
                // Never cache across consumers or component keys.
                const value = getVueDataUiConfig(component, configOptions);
                Object.defineProperty(configs, component, {
                    value,
                    writable: true,
                    enumerable: true,
                    configurable: true,
                });
                return value;
            },
            set(value) {
                Object.defineProperty(configs, component, {
                    value,
                    writable: true,
                    enumerable: true,
                    configurable: true,
                });
            },
        });
    }

    return configs;
}
