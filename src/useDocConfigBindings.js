import { computed, watch } from "vue";
import { useObjectBindings } from "vue-data-ui/utils";

import { completeDocConfig } from "./completeDocConfig.js";

/** Bind explicitly documented leaf paths without invoking missing-path fallbacks. */
export function useDocConfigBindings(config, paths, options) {
    const { defaults, initialValues, ...bindingOptions } = options || {};
    if (defaults)
        watch(
            config,
            (value) => completeDocConfig(value, paths, defaults, initialValues),
            { immediate: true, flush: "sync" },
        );
    const bindings = useObjectBindings(config, bindingOptions);
    function requireBinding(path) {
        if (!Object.hasOwn(bindings, path)) {
            throw new Error(
                `Documentation control has no editable binding: ${path}`,
            );
        }
        return bindings[path];
    }
    return Object.fromEntries(
        paths.map((path) => {
            requireBinding(path);
            return [
                path,
                computed({
                    get: () => requireBinding(path).value,
                    set: (value) => {
                        requireBinding(path).value = value;
                    },
                }),
            ];
        }),
    );
}
