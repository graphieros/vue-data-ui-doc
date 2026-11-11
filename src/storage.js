// Storage can be disabled, full, or contain values from an older application version.
export function readStorage(key, fallback = null, kind = "localStorage") {
    try {
        return globalThis[kind].getItem(key) ?? fallback;
    } catch {
        return fallback;
    }
}

export function writeStorage(key, value, kind = "localStorage") {
    try {
        globalThis[kind].setItem(key, value);
        return true;
    } catch {
        return false;
    }
}

export function readStoredJson(key, fallback = null) {
    try {
        const value = JSON.parse(readStorage(key));
        return value ?? fallback;
    } catch {
        return fallback;
    }
}

export function removeStorage(key) {
    try {
        globalThis.localStorage.removeItem(key);
        return true;
    } catch {
        return false;
    }
}
