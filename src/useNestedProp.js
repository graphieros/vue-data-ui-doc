export function isValidUserValue(val) {
    return ![null, undefined, NaN, Infinity, -Infinity].includes(val);
}

export function checkArray({ userConfig, key }) {
    return Object.hasOwn(userConfig, key) && Array.isArray(userConfig[key]) && userConfig[key].length >= 0;
}

export function checkObj({ userConfig, key }) {
    return Object.hasOwn(userConfig, key) && !Array.isArray(userConfig[key]) && typeof userConfig[key] === "object";
}

export function decimalToHex(decimal) {
    const hex = Number(decimal).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

export function convertNameColorToHex(colorName) {
    const colorMap = {
        ALICEBLUE: "#F0F8FF",
        ANTIQUEWHITE: "#FAEBD7",
        AQUA: "#00FFFF",
        AQUAMARINE: "#7FFFD4",
        AZURE: "#F0FFFF",
        BEIGE: "#F5F5DC",
        BISQUE: "#FFE4C4",
        BLACK: "#000000",
        BLANCHEDALMOND: "#FFEBCD",
        BLUE: "#0000FF",
        BLUEVIOLET: "#8A2BE2",
        BROWN: "#A52A2A",
        BURLYWOOD: "#DEB887",
        CADETBLUE: "#5F9EA0",
        CHARTREUSE: "#7FFF00",
        CHOCOLATE: "#D2691E",
        CORAL: "#FF7F50",
        CORNFLOWERBLUE: "#6495ED",
        CORNSILK: "#FFF8DC",
        CRIMSON: "#DC143C",
        CYAN: "#00FFFF",
        DARKBLUE: "#00008B",
        DARKCYAN: "#008B8B",
        DARKGOLDENROD: "#B8860B",
        DARKGREY: "#A9A9A9",
        DARKGREEN: "#006400",
        DARKKHAKI: "#BDB76B",
        DARKMAGENTA: "#8B008B",
        DARKOLIVEGREEN: "#556B2F",
        DARKORANGE: "#FF8C00",
        DARKORCHID: "#9932CC",
        DARKRED: "#8B0000",
        DARKSALMON: "#E9967A",
        DARKSEAGREEN: "#8FBC8F",
        DARKSLATEBLUE: "#483D8B",
        DARKSLATEGREY: "#2F4F4F",
        DARKTURQUOISE: "#00CED1",
        DARKVIOLET: "#9400D3",
        DEEPPINK: "#FF1493",
        DEEPSKYBLUE: "#00BFFF",
        DIMGRAY: "#696969",
        DODGERBLUE: "#1E90FF",
        FIREBRICK: "#B22222",
        FLORALWHITE: "#FFFAF0",
        FORESTGREEN: "#228B22",
        FUCHSIA: "#FF00FF",
        GAINSBORO: "#DCDCDC",
        GHOSTWHITE: "#F8F8FF",
        GOLD: "#FFD700",
        GOLDENROD: "#DAA520",
        GREY: "#808080",
        GREEN: "#008000",
        GREENYELLOW: "#ADFF2F",
        HONEYDEW: "#F0FFF0",
        HOTPINK: "#FF69B4",
        INDIANRED: "#CD5C5C",
        INDIGO: "#4B0082",
        IVORY: "#FFFFF0",
        KHAKI: "#F0E68C",
        LAVENDER: "#E6E6FA",
        LAVENDERBLUSH: "#FFF0F5",
        LAWNGREEN: "#7CFC00",
        LEMONCHIFFON: "#FFFACD",
        LIGHTBLUE: "#ADD8E6",
        LIGHTCORAL: "#F08080",
        LIGHTCYAN: "#E0FFFF",
        LIGHTGOLDENRODYELLOW: "#FAFAD2",
        LIGHTGREY: "#D3D3D3",
        LIGHTGREEN: "#90EE90",
        LIGHTPINK: "#FFB6C1",
        LIGHTSALMON: "#FFA07A",
        LIGHTSEAGREEN: "#20B2AA",
        LIGHTSKYBLUE: "#87CEFA",
        LIGHTSLATEGREY: "#778899",
        LIGHTSTEELBLUE: "#B0C4DE",
        LIGHTYELLOW: "#FFFFE0",
        LIME: "#00FF00",
        LIMEGREEN: "#32CD32",
        LINEN: "#FAF0E6",
        MAGENTA: "#FF00FF",
        MAROON: "#800000",
        MEDIUMAQUAMARINE: "#66CDAA",
        MEDIUMBLUE: "#0000CD",
        MEDIUMORCHID: "#BA55D3",
        MEDIUMPURPLE: "#9370D8",
        MEDIUMSEAGREEN: "#3CB371",
        MEDIUMSLATEBLUE: "#7B68EE",
        MEDIUMSPRINGGREEN: "#00FA9A",
        MEDIUMTURQUOISE: "#48D1CC",
        MEDIUMVIOLETRED: "#C71585",
        MIDNIGHTBLUE: "#191970",
        MINTCREAM: "#F5FFFA",
        MISTYROSE: "#FFE4E1",
        MOCCASIN: "#FFE4B5",
        NAVAJOWHITE: "#FFDEAD",
        NAVY: "#000080",
        OLDLACE: "#FDF5E6",
        OLIVE: "#808000",
        OLIVEDRAB: "#6B8E23",
        ORANGE: "#FFA500",
        ORANGERED: "#FF4500",
        ORCHID: "#DA70D6",
        PALEGOLDENROD: "#EEE8AA",
        PALEGREEN: "#98FB98",
        PALETURQUOISE: "#AFEEEE",
        PALEVIOLETRED: "#D87093",
        PAPAYAWHIP: "#FFEFD5",
        PEACHPUFF: "#FFDAB9",
        PERU: "#CD853F",
        PINK: "#FFC0CB",
        PLUM: "#DDA0DD",
        POWDERBLUE: "#B0E0E6",
        PURPLE: "#800080",
        RED: "#FF0000",
        ROSYBROWN: "#BC8F8F",
        ROYALBLUE: "#4169E1",
        SADDLEBROWN: "#8B4513",
        SALMON: "#FA8072",
        SANDYBROWN: "#F4A460",
        SEAGREEN: "#2E8B57",
        SEASHELL: "#FFF5EE",
        SIENNA: "#A0522D",
        SILVER: "#C0C0C0",
        SKYBLUE: "#87CEEB",
        SLATEBLUE: "#6A5ACD",
        SLATEGREY: "#708090",
        SNOW: "#FFFAFA",
        SPRINGGREEN: "#00FF7F",
        STEELBLUE: "#4682B4",
        TAN: "#D2B48C",
        TEAL: "#008080",
        THISTLE: "#D8BFD8",
        TOMATO: "#FF6347",
        TURQUOISE: "#40E0D0",
        VIOLET: "#EE82EE",
        WHEAT: "#F5DEB3",
        WHITE: "#FFFFFF",
        WHITESMOKE: "#F5F5F5",
        YELLOW: "#FFFF00",
        YELLOWGREEN: "#9ACD32",
    };
    return colorMap[colorName.toUpperCase()] || colorName;
}

export function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hueToRgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hueToRgb(p, q, h + 1 / 3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1 / 3);
    }

    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255),
    ];
}

export function convertColorToHex(color) {
    const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    const rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/i;
    const hslRegex = /^hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*[\d.]+)?\)$/i;

    if ([undefined, null, NaN].includes(color)) {
        return null;
    }
    color = convertNameColorToHex(color)

    if (color === 'transparent') {
        return "#FFFFFF00";
    }

    let match;

    if ((match = color.match(hexRegex))) {
        const [, r, g, b] = match;
        return `#${r}${g}${b}`;
    } else if ((match = color.match(rgbRegex))) {
        const [, r, g, b] = match;
        return `#${decimalToHex(r)}${decimalToHex(g)}${decimalToHex(b)}`;
    } else if ((match = color.match(hslRegex))) {
        const [, h, s, l] = match;
        const rgb = hslToRgb(Number(h), Number(s), Number(l));
        return `#${decimalToHex(rgb[0])}${decimalToHex(rgb[1])}${decimalToHex(rgb[2])}`;
    }

    return null;
}

export function convertConfigColors(config) {
    for (const key in config) {
        if (typeof config[key] === 'object' && !Array.isArray(config[key]) && config[key] !== null) {
            convertConfigColors(config[key]);
        } else if (key === 'color' || key === 'backgroundColor' || key === 'stroke') {
            if (config[key] === '') {
                config[key] = '#000000';
            } else if (config[key] === 'transparent') {
                config[key] = '#FFFFFF00'
            } else {
                config[key] = convertColorToHex(config[key]);
            }
        }
    }
    return config;
}

export function treeShake({ defaultConfig, userConfig }) {
    const finalConfig = { ...defaultConfig };

    Object.keys(finalConfig).forEach(key => {
        if (Object.hasOwn(userConfig, key)) {
            const currentVal = userConfig[key]
            if (['boolean', 'function'].includes(typeof currentVal)) {
                finalConfig[key] = currentVal;
            } else if (["string", "number"].includes(typeof currentVal)) {
                if (isValidUserValue(currentVal)) {
                    finalConfig[key] = currentVal;
                }
            } else if (Array.isArray(finalConfig[key])) {
                if (checkArray({ userConfig, key })) {
                    finalConfig[key] = currentVal;
                }
            } else if (checkObj({ userConfig, key })) {
                finalConfig[key] = treeShake({
                    defaultConfig: finalConfig[key],
                    userConfig: currentVal
                });
            }
        }
    });
    return finalConfig;
}

export function useNestedProp({ defaultConfig, userConfig }) {
    if(!Object.keys(userConfig || {}).length) {
        return defaultConfig;
    }
    const reconciled = treeShake({
        defaultConfig: defaultConfig,
        userConfig
    });
    return convertConfigColors(reconciled)
}