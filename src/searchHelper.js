import config from "./assets/default_configs.json";

export function searchInConfig(searchTerm) {
    const results = [];

    function searchObject(obj, objName = "", path = "") {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                const newPath = path ? `${path} ➜ ${key}` : key;
                const fullPath = objName ? `${formatString(objName)} : ${newPath}` : newPath;

                if (key === searchTerm) {
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
