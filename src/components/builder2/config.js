function configError(message, translationKey, translationParams = {}) {
    return Object.assign(new Error(message), {
        translationKey,
        translationParams,
    });
}

export function modelFromConfig(config, reference) {
    if (
        config === null ||
        Array.isArray(config) ||
        typeof config !== "object"
    ) {
        throw configError(
            "Configuration must be a JSON object.",
            "configObject",
        );
    }
    const known = new Map(reference.map((knob) => [knob.key, knob]));
    const model = [];
    function visit(value, path) {
        const knob = known.get(path);
        if (
            knob ||
            value === null ||
            typeof value !== "object" ||
            Array.isArray(value) ||
            !Object.keys(value).length
        ) {
            if (
                knob &&
                knob.def !== null &&
                value !== null &&
                (typeof value !== typeof knob.def ||
                    Array.isArray(value) !== Array.isArray(knob.def))
            ) {
                throw configError(
                    `The value for ${path} must match its original type.`,
                    "configType",
                    { path },
                );
            }
            model.push(
                knob
                    ? { ...knob, def: value }
                    : {
                          key: path,
                          def: value,
                          type:
                              typeof value === "boolean"
                                  ? "checkbox"
                                  : typeof value === "number"
                                    ? "number"
                                    : typeof value === "string"
                                      ? "text"
                                      : "none",
                          label: path.split(".").at(-1),
                          category: path.split(".")[0],
                      },
            );
            return;
        }
        for (const [key, child] of Object.entries(value)) {
            if (
                ["__proto__", "prototype", "constructor"].includes(key) ||
                key.includes(".")
            ) {
                throw configError(
                    `Unsupported configuration key: ${key}`,
                    "unsupportedKey",
                    { key },
                );
            }
            visit(child, path ? `${path}.${key}` : key);
        }
    }
    for (const [key, value] of Object.entries(config)) {
        if (
            ["__proto__", "prototype", "constructor"].includes(key) ||
            key.includes(".")
        )
            throw configError(
                `Unsupported configuration key: ${key}`,
                "unsupportedKey",
                { key },
            );
        visit(value, key);
    }
    return model;
}

export function restoreConfigModel(base, saved) {
    const keys = new Set(base.map((knob) => knob.key));
    // Older zoom models stored the dash-pattern input under the width key.
    const restored = saved.map((knob) => {
        if (
            knob.type === "text" &&
            knob.key.endsWith(".selection.strokeWidth")
        ) {
            const dashKey = knob.key.replace(/strokeWidth$/, "strokeDasharray");
            if (keys.has(dashKey)) return { ...knob, key: dashKey };
        }
        return knob;
    });
    const byKey = new Map(restored.map((knob) => [knob.key, knob]));
    return [
        ...base.map((knob) =>
            byKey.has(knob.key)
                ? { ...knob, def: byKey.get(knob.key).def }
                : knob,
        ),
        ...restored.filter((knob) => !keys.has(knob.key)),
    ];
}
