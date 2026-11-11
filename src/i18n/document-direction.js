export function applyDocumentLanguage(document, language) {
    const direction = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language === "zh" ? "zh-CN" : language;
    document.documentElement.dir = direction;
    document.getElementById("app")?.setAttribute("dir", direction);
}
