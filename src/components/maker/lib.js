export function createUid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
            });
}

export function getValueByPath(referenceObject, path) {
    const pathArray = path.split('.');
    let currentObject = referenceObject;
    for (const attr of pathArray) {
        if (currentObject.hasOwnProperty(attr)) {
        currentObject = currentObject[attr];
        } else {
        return undefined;
        }
    }
    return currentObject;
}

export function convertArrayToObject(configArray) {
    const resultObject = {};

    configArray.forEach(({ key, def }) => {
        const keys = key.split('.');
        let currentObject = resultObject;

        keys.forEach((nestedKey, index) => {
            if (!currentObject.hasOwnProperty(nestedKey)) {
                if (index === keys.length - 1) {
                    currentObject[nestedKey] = def;
                } else {
                    currentObject[nestedKey] = {};
                }
            }
            currentObject = currentObject[nestedKey];
        });
    });

    return resultObject;
}

export function copyComponent(id, store) {
    const content = document.getElementById(id).innerHTML
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = content.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}

export function copyText(text, parent) {
    const content = text
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = content.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('___', '#');
    parent.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    parent.removeChild(selBox);
}

export async function copyCode(str) {
    try {
        await navigator.clipboard.writeText(str);
        console.log('Content copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}

export function adaptColorToBackground(bgColor) {
    if (bgColor) {
        let color = bgColor;
        color = color.substring(1, 7);
        let r = parseInt(color.substring(0, 2), 16);
        let g = parseInt(color.substring(2, 4), 16);
        let b = parseInt(color.substring(4, 6), 16);
        let uiColors = [r / 255, g / 255, b / 255];
        let c = uiColors.map((col) => {
            if (col <= 0.03928) {
                return col / 12.92;
            }
            return Math.pow((col + 0.055) / 1.055, 2.4);
        });
        let L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
        return L > 0.3 ? "#000000" : "#FFFFFF";
    }
    return "#000000";
}

export function shiftHue(hexColor, shiftAmount) {

    const nakedHex = hexColor.length === 9 ? hexColor.substring(0, 7) : hexColor;
    const alphaChannel = hexColor.length === 9 ? hexColor.substring(7, 9) : null;

    const hexToRgb = (hex) => ({
        r: parseInt(hex.substring(1, 3), 16),
        g: parseInt(hex.substring(3, 5), 16),
        b: parseInt(hex.substring(5, 7), 16),
    });

    const rgbToHsl = ({ r, g, b }) => {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h, s, l };
    };

    const hslToRgb = ({ h, s, l }) => {
        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255),
        };
    };

    const rgbColor = hexToRgb(nakedHex || "#000000");
    const hslColor = rgbToHsl(rgbColor);
    hslColor.h += shiftAmount;
    hslColor.h = (hslColor.h + 1) % 1;

    const shiftedRgbColor = hslToRgb(hslColor);
    const shiftedHexColor = `#${(shiftedRgbColor.r << 16 | shiftedRgbColor.g << 8 | shiftedRgbColor.b).toString(16).padStart(6, '0')}`;


    return shiftedHexColor + (alphaChannel || '');
}

export function convertColorToHex(color) {
    const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
    const rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i;
    const hslRegex = /^hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*([\d.]+))?\)$/i;

    if ([undefined, null, NaN].includes(color)) {
        return null;
    }

    color = convertNameColorToHex(color);

    if (color === 'transparent') {
        return "#FFFFFF00";
    }

    let match;
    let alpha = 1;

    if ((match = color.match(hexRegex))) {
        const [, r, g, b, a] = match;
        alpha = a ? parseInt(a, 16) / 255 : 1;
        return `#${r}${g}${b}${decimalToHex(Math.round(alpha * 255))}`;
    } else if ((match = color.match(rgbRegex))) {
        const [, r, g, b, a] = match;
        alpha = a ? parseFloat(a) : 1;
        return `#${decimalToHex(r)}${decimalToHex(g)}${decimalToHex(b)}${decimalToHex(Math.round(alpha * 255))}`;
    } else if ((match = color.match(hslRegex))) {
        const [, h, s, l, a] = match;
        alpha = a ? parseFloat(a) : 1;
        const rgb = hslToRgba(Number(h), Number(s), Number(l));
        return `#${decimalToHex(rgb[0])}${decimalToHex(rgb[1])}${decimalToHex(rgb[2])}${decimalToHex(Math.round(alpha * 255))}`;
    }

    return null;
}

export function jsonToJsObject(json, indent = 0, colorAuto=false) {
    function formatValue(value, currentIndent) {
        const nextIndent = currentIndent + 4;
        const indentSpace = ' '.repeat(currentIndent);
        const nextIndentSpace = ' '.repeat(nextIndent);

        if (typeof value === 'string') {
            return `'${value.replace(/'/g, "\\'")}'`;
        } else if (Array.isArray(value)) {
            return value.length === 0 ? '[]' : `[
${nextIndentSpace}${value.map(v => formatValue(v, nextIndent)).join(`,
${nextIndentSpace}`)}
${indentSpace}]`;
        } else if (typeof value === 'object' && value !== null) {
            return `{
${nextIndentSpace}${Object.entries(value)
                    .map(([key, val]) => `${typeof Number(key) === 'number' && !isNaN(Number(key)) ? `'${key}'` : key}: ${colorAuto && key === 'color' && !val ? `'auto'`: formatValue(val, nextIndent)}`)
                    .join(`,
${nextIndentSpace}`)}
${indentSpace}}`;
        }
        return value;
    }

    return formatValue(json, indent);
}

const lib = {
    adaptColorToBackground,
    copyComponent,
    copyText,
    createUid,
    getValueByPath,
    convertArrayToObject,
    shiftHue,
    convertColorToHex,
    jsonToJsObject
}

export default lib

