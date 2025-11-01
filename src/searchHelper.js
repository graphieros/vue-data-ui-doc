import { useConfig } from "./assets/useConfig";

const config = useConfig()

export function searchInConfig(searchTerm) {
    const results = [];

    function getType(value, key) {
        if (Array.isArray(value)) return "Array";
        if (typeof value === "function") return "Function";
        if (value === null) {
            if ([
                "endIndex",
                "startIndex",
            ].includes(key)) {
                return "null | number";
            }
            return "null | Function";
        }
        if (value instanceof Date) return "date";
        if (typeof value === "object") return "Object";
        return typeof value;
    }

    function searchObject(obj, objName = "", path = "") {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                const newPath = path ? `${path}.${key}` : key;
                const fullPath = objName ? `${formatString(objName)} : ${newPath}` : newPath;

                if (key.toUpperCase() === searchTerm.toUpperCase()) {
                    results.push({
                        path: fullPath,
                        shortPath: newPath,
                        value: obj[key] === null ? 'null' : obj[key],
                        type: getType(obj[key], key),
                        route: objName.replaceAll("_", "-"),
                        componentName: formatString(objName)
                    });
                }

                if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
                    searchObject(obj[key], objName || key, newPath);
                }
            }
        }
    }

    Object.keys(config).forEach((key) => {
        searchObject(config[key], key);
    });

    return results;
}

function formatString(str) {
    return str
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
}
