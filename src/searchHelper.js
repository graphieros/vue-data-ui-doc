import { useConfig } from "./assets/useConfig";

const config = useConfig()

export function searchInConfig(searchTerm) {
    const results = [];

    function searchObject(obj, objName = "", path = "") {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                const newPath = path ? `${path} ➜ ${key}` : key;
                const fullPath = objName ? `${formatString(objName)} : ${newPath}` : newPath;

                if (key.toUpperCase() === searchTerm.toUpperCase()) {
                    results.push({
                        path: fullPath,
                        value: obj[key],
                        type: typeof obj[key],
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
