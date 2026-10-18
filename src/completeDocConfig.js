/** Fill only documented missing values; preserve every existing demo override. */
export function completeDocConfig(config, paths, defaults, initialValues = {}) {
    const read = (object, path) =>
        path.split(".").reduce((value, key) => value?.[key], object);
    const pending = [];
    for (const path of paths) {
        if (read(config, path) !== undefined) continue;
        const value = read(defaults, path);
        if (value === undefined && !Object.hasOwn(initialValues, path)) {
            throw new Error(
                `Documentation control has no editable binding: ${path}`,
            );
        }
        pending.push([path, value === undefined ? initialValues[path] : value]);
    }
    for (const [path, value] of pending) {
        const parts = path.split(".");
        let target = config;
        for (const key of parts.slice(0, -1)) {
            if (target[key] == null) target[key] = {};
            target = target[key];
        }
        target[parts.at(-1)] = clone(value);
    }
    return config;
}

function clone(value) {
    if (Array.isArray(value)) return value.map(clone);
    if (value && typeof value === "object")
        return Object.fromEntries(
            Object.entries(value).map(([key, item]) => [key, clone(item)]),
        );
    return value;
}
