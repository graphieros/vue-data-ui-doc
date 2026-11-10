/** Only editable leaves need bindings; explanatory rows never access the proxy. */
export function getEditableConfigPaths(fields) {
    return fields.flatMap((field) =>
        field.children
            ? getEditableConfigPaths(field.children)
            : field.inactive || field.component || Object.hasOwn(field, "text")
              ? []
              : [field.attr],
    );
}

export function getConfigControlProps(field) {
    const {
        children: _children,
        component: _component,
        text: _text,
        refreshChart: _refreshChart,
        onChange: _onChange,
        initialValue: _initialValue,
        unsupported: _unsupported,
        ...props
    } = field;
    return props;
}

export function getConfigInitialValues(fields) {
    return Object.assign(
        {},
        ...fields.map((field) => ({
            ...(Object.hasOwn(field, "initialValue")
                ? { [field.attr]: field.initialValue }
                : {}),
            ...getConfigInitialValues(field.children || []),
        })),
    );
}

/** Read displayed defaults from the same public config used by the charts. */
export function withConfigDefaults(fields, defaults, parentPath = "") {
    return fields.map((field) => {
        const path = field.attr?.startsWith("const ")
            ? ""
            : field.title ||
              (field.attr?.includes(".")
                  ? field.attr
                  : [parentPath, field.attr || field.name]
                        .filter(Boolean)
                        .join("."));
        const result = { ...field };
        if (field.children) {
            result.children = withConfigDefaults(
                field.children,
                defaults,
                path,
            );
        } else if (Object.hasOwn(field, "defaultVal") && !field.unsupported) {
            const value = path
                .split(".")
                .reduce((value, key) => value?.[key], defaults);
            if (value !== undefined) {
                result.defaultVal =
                    typeof value === "string"
                        ? value || "''"
                        : typeof value === "function"
                          ? String(value)
                          : JSON.stringify(value);
            }
        }
        return result;
    });
}
