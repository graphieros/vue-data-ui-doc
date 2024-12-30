import { useConfig } from "./assets/useConfig";

const config = useConfig();

export function searchInConfig(searchTerm) {
    const results = [];

    // Helper function to determine the type of a value
    function getType(value) {
        if (Array.isArray(value)) return "Array";
        if (typeof value === "function") return "Function";
        if (value === null) return "null | Function";
        if (value instanceof Date) return "date";
        if (typeof value === "object") return "Object";
        return typeof value; // number, string, boolean, etc.
    }

    function searchObject(obj, objName = "", path = "") {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                const newPath = path ? `${path} ➜ ${key}` : key;
                const fullPath = objName ? `${formatString(objName)} : ${newPath}` : newPath;

                if (key.toUpperCase() === searchTerm.toUpperCase()) {
                    results.push({
                        path: fullPath,
                        value: obj[key] === null ? 'null' : obj[key],
                        type: getType(obj[key]), // Use the helper function to determine the type
                        route: objName.replaceAll("_", "-"),
                        componentName: formatString(objName)
                    });
                }

                if (getType(obj[key]) === "object") {
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
