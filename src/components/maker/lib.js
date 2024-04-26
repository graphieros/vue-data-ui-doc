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

const lib = {
    adaptColorToBackground,
    copyComponent,
    copyText,
    createUid,
    getValueByPath,
    convertArrayToObject
}

export default lib

