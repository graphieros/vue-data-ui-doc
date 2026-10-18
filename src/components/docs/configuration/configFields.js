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
