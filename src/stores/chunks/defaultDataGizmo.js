// A fresh value for each Pinia store instance, matching the original state factory.
export function createVueUiGizmoDefaults() {
    return {
        dataset: 66.5,
        model: [
            {
                key: "debug",
                def: false,
                type: "checkbox",
                label: "debug",
                category: "general",
            },
            {
                key: "loading",
                def: false,
                type: "checkbox",
                label: "loading",
                category: "general",
            },
            {
                key: "type",
                def: "battery",
                type: "select",
                options: ["battery", "gauge"],
                label: "type",
                category: "general",
            },
            {
                key: "size",
                def: 128,
                type: "number",
                min: 12,
                max: 400,
                label: "size",
                category: "general",
            },
            {
                key: "stroke",
                def: "#8A8A8A",
                type: "color",
                label: ["border", "is", "color"],
                category: "general",
            },
            {
                key: "color",
                def: "#5f8aee",
                type: "color",
                label: ["fill", "is", "color"],
                category: "general",
            },
            {
                key: "useGradient",
                def: true,
                type: "checkbox",
                label: ["useGradient"],
                category: "general",
            },
            {
                key: "gradientColor",
                def: "#9db5ed",
                type: "color",
                label: ["gradient", "is", "color"],
                category: "general",
            },
            {
                key: "showPercentage",
                def: true,
                type: "checkbox",
                label: ["percentage", "is", "show"],
                category: "general",
            },
            {
                key: "textColor",
                def: "#1A1A1A",
                type: "color",
                label: "textColor",
                category: "general",
            },
        ],
    };
}
