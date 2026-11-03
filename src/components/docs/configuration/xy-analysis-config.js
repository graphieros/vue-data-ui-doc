import { getVueDataUiConfig } from "vue-data-ui/utils";
import {
    xyAnalysisOptionOrder,
    xyAnalysisOptionDescriptions,
} from "../../../translations/xyAnalysisOptions.js";

export function createXyAnalysisConfigFields(locales = [], lang = "en") {
    function fields(object, path, level) {
        const entries = ["analysis.options", "analysis.optionLabels"].includes(
            path,
        )
            ? xyAnalysisOptionOrder
                  .filter((key) => Object.hasOwn(object, key))
                  .map((key) => [key, object[key]])
            : Object.entries(object);
        return entries.map(([name, value]) => {
            const attr = `${path}.${name}`;
            if (value && typeof value === "object" && !Array.isArray(value))
                return {
                    attr: name,
                    title: attr,
                    level,
                    children: fields(value, attr, level + 1),
                };
            if (Array.isArray(value))
                return {
                    name,
                    attr,
                    inactive: true,
                    defaultVal: JSON.stringify(value),
                    comment:
                        "number[] - Levels to detect crossings, e.g. [100, 200]. With Threshold crossings selected in Analyze, consecutive visible values crossing a level upward or downward produce an annotation on the first point reaching or passing it (e.g. 90 → 110 crosses 100). Uses raw series values, not percentages; skips gaps and marks up to 3 crossings per series. An empty array disables threshold detection.",
                };
            return {
                name,
                attr,
                type:
                    typeof value === "boolean"
                        ? "checkbox"
                        : typeof value === "number"
                          ? "number"
                          : "text",
                defaultVal:
                    typeof value === "string" ? value : JSON.stringify(value),
                ...(path === "analysis.options"
                    ? {
                          tooltip: (xyAnalysisOptionDescriptions[lang] ||
                              xyAnalysisOptionDescriptions.en)[name],
                      }
                    : {}),
                ...(name === "locale"
                    ? { type: "select", options: locales }
                    : {}),
                ...(name === "maxAnnotations"
                    ? { min: 0, max: 100, step: 1 }
                    : {}),
            };
        });
    }
    return {
        attr: "analysis",
        level: 1,
        children: fields(
            getVueDataUiConfig("vue_ui_xy").analysis,
            "analysis",
            2,
        ),
    };
}
