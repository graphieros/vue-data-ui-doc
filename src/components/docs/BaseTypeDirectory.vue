<script setup>
import { computed, ref, shallowRef, watch, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as ts from "typescript";
import { useMainStore } from "../../stores/index";
import { useTypeDirStore } from "../../stores/typeDir";
import BaseCard from "../BaseCard.vue";

const props = defineProps({
    source: { type: String, default: "", required: true },
    filename: { type: String, default: "types.d.ts" },
    showGlobalLink: { type: Boolean, default: true },
    outSearch: { type: String, default: "" },
});

const route = useRoute();
const router = useRouter();
const store = useMainStore();
const typeDir = useTypeDirStore();
const lang = computed(() => store.lang);
const isDarkMode = computed(() => store.isDarkMode);
const t = (key) => typeDir[key]?.[lang.value] || typeDir[key]?.en || key;

// Only shorten the displayed names; retain full names for type resolution.
const displayName = (name) =>
    (name ?? "").replace(/^(?:["']vue-data-ui["']|vue-data-ui)\s*\.\s*/, "");

const GROUPS = [
    { kind: "interface", key: "interfaces" },
    { kind: "type", key: "typeAliases" },
    { kind: "class", key: "classes" },
    { kind: "enum", key: "enums" },
    { kind: "function", key: "functions" },
    { kind: "namespace", key: "namespaces" },
    { kind: "variable", key: "variables" },
];
const kindKeys = Object.fromEntries(GROUPS.map((g) => [g.kind, g.key]));
const filters = computed(() => [
    { value: "all", label: t("all") },
    ...GROUPS.map((g) => ({ value: g.kind, label: t(g.key) })),
]);
// Keep TypeScript AST nodes out of Vue deep reactivity.
const entries = shallowRef([]);
const activeFilename = ref(props.filename);
const parseError = ref("");
const queryValue = (value) => (typeof value === "string" ? value : "");
const search = ref(queryValue(route.query.typeSearch) || props.outSearch);
const activeFilter = ref(
    GROUPS.some((g) => g.kind === route.query.typeFilter)
        ? route.query.typeFilter
        : "all",
);
const collapsed = ref(new Set());
const selectedId = ref(null);
const history = ref([]);
const historyIndex = ref(-1);
const copied = ref(false);

const byId = computed(() => new Map(entries.value.map((e) => [e.id, e])));
const byFullName = computed(() => {
    const map = new Map();
    for (const entry of entries.value) {
        const matches = map.get(entry.fullName) || [];
        matches.push(entry);
        map.set(entry.fullName, matches);
    }
    return map;
});
const byShortName = computed(() => {
    const map = new Map();
    for (const entry of entries.value) {
        const matches = map.get(entry.name) || [];
        matches.push(entry);
        map.set(entry.name, matches);
    }
    return map;
});
const selected = computed(() => byId.value.get(selectedId.value) || null);
const visibleGroups = computed(() => {
    const term = search.value.trim().toLowerCase();
    const groups = new Map(GROUPS.map((g) => [g.kind, []]));
    for (const item of entries.value) {
        if (activeFilter.value !== "all" && activeFilter.value !== item.kind)
            continue;
        if (
            term &&
            !`${item.fullName} ${item.description}`.toLowerCase().includes(term)
        )
            continue;
        groups.get(item.kind)?.push(item);
    }
    return GROUPS.filter(
        (g) => activeFilter.value === "all" || activeFilter.value === g.kind,
    )
        .map((group) => ({
            ...group,
            label: t(group.key),
            items: groups.get(group.kind) || [],
        }))
        .filter((g) => g.items.length);
});

function kindOf(node) {
    if (ts.isInterfaceDeclaration(node)) return "interface";
    if (ts.isTypeAliasDeclaration(node)) return "type";
    if (ts.isClassDeclaration(node)) return "class";
    if (ts.isEnumDeclaration(node)) return "enum";
    if (ts.isFunctionDeclaration(node)) return "function";
    if (ts.isModuleDeclaration(node)) return "namespace";
    if (ts.isVariableStatement(node)) return "variable";
    return null;
}

function docText(node) {
    return (node.jsDoc || [])
        .map((doc) => {
            if (typeof doc.comment === "string") return doc.comment;
            if (Array.isArray(doc.comment))
                return doc.comment.map((part) => part.text || "").join("");
            return "";
        })
        .filter(Boolean)
        .join("\n\n");
}
function hasExport(node) {
    return !!node.modifiers?.some(
        (mod) =>
            mod.kind === ts.SyntaxKind.ExportKeyword ||
            mod.kind === ts.SyntaxKind.DefaultKeyword,
    );
}

function parse(content, filename) {
    const sf = ts.createSourceFile(
        filename,
        content,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS,
    );
    const out = [];
    function add(
        node,
        declarationNode,
        kind,
        name,
        path,
        exported,
        extra = {},
    ) {
        const position = sf.getLineAndCharacterOfPosition(
            declarationNode.getStart(sf),
        );
        out.push({
            id: out.length + 1,
            kind,
            name,
            fullName: [...path, name].filter(Boolean).join("."),
            depth: path.length,
            exported,
            description: docText(node),
            fileName: filename,
            line: position.line + 1,
            code: declarationNode.getText(sf),
            node: declarationNode,
            sourceFile: sf,
            path: [...path],
            ...extra,
        });
    }
    function visit(node, path = [], inheritedExport = false) {
        const kind = kindOf(node);
        if (kind === "variable") {
            node.declarationList.declarations.forEach((decl) => {
                add(
                    node,
                    decl,
                    kind,
                    decl.name.getText(sf),
                    path,
                    inheritedExport || hasExport(node),
                );
            });
            return;
        }
        if (kind) {
            const name = node.name?.getText(sf) || "default";
            const exported = inheritedExport || hasExport(node);
            add(node, node, kind, name, path, exported);
            if (kind === "namespace" && node.body)
                visit(node.body, [...path, name], exported);
            return;
        }
        ts.forEachChild(node, (child) => visit(child, path, inheritedExport));
    }
    visit(sf);
    return out;
}

function load(content, filename) {
    try {
        entries.value = parse(content, filename);
        activeFilename.value = filename;
        parseError.value = "";
        const requestedType = queryValue(route.query.type);
        const initial = byFullName.value.get(requestedType)?.[0];
        const first = initial?.id ?? entries.value[0]?.id ?? null;
        selectedId.value = first;
        history.value = first === null ? [] : [first];
        historyIndex.value = first === null ? -1 : 0;
        // Preserve search and filters when a file loads or a URL is opened.
        search.value = queryValue(route.query.typeSearch) || props.outSearch;
        activeFilter.value = GROUPS.some(
            (g) => g.kind === route.query.typeFilter,
        )
            ? route.query.typeFilter
            : "all";
        collapsed.value = new Set();
    } catch (error) {
        parseError.value = error?.message || t("parseError");
        entries.value = [];
        selectedId.value = null;
        history.value = [];
        historyIndex.value = -1;
    }
}
watch(
    () => [props.source, props.filename],
    ([source, filename]) => load(source, filename),
    { immediate: true },
);

// Keep the directory shareable without overwriting unrelated query parameters.
// Replace (rather than push) on every change to avoid one history entry per keystroke.
let urlSyncTimer;
let applyingRoute = false;
let resettingDirectory = false;

watch(
    () => [route.query.typeSearch, route.query.typeFilter, route.query.type],
    ([urlSearch, urlFilter, urlType]) => {
        applyingRoute = true;
        clearTimeout(urlSyncTimer);
        search.value = queryValue(urlSearch);
        activeFilter.value = GROUPS.some((g) => g.kind === urlFilter)
            ? urlFilter
            : "all";
        const match = byFullName.value.get(urlType)?.[0];
        // A bare /types route must restore the initial root declaration.
        const targetId =
            match?.id ??
            (!urlSearch && !urlFilter && !urlType
                ? (entries.value[0]?.id ?? null)
                : selectedId.value);
        if (targetId !== selectedId.value) {
            selectedId.value = targetId;
            history.value = targetId === null ? [] : [targetId];
            historyIndex.value = targetId === null ? -1 : 0;
            copied.value = false;
        }
        // A synchronous watcher runs after this callback, once the updates settle.
        applyingRoute = false;
    },
);

watch(
    search,
    (value, previous) => {
        if (applyingRoute) return;
        if (!value.trim() && previous.trim()) resetDirectory();
    },
    { flush: "sync" },
);

watch(
    [search, activeFilter, selectedId],
    () => {
        if (applyingRoute || resettingDirectory) return;
        clearTimeout(urlSyncTimer);
        urlSyncTimer = setTimeout(() => {
            const query = { ...route.query };
            if (search.value.trim()) query.typeSearch = search.value;
            else delete query.typeSearch;
            if (activeFilter.value !== "all")
                query.typeFilter = activeFilter.value;
            else delete query.typeFilter;
            if (
                selected.value &&
                (selectedId.value !== entries.value[0]?.id ||
                    search.value.trim() ||
                    activeFilter.value !== "all")
            )
                query.type = selected.value.fullName;
            else delete query.type;

            if (
                query.typeSearch === route.query.typeSearch &&
                query.typeFilter === route.query.typeFilter &&
                query.type === route.query.type
            )
                return;
            router.replace({ query }).catch(() => {});
        }, 200);
    },
    { flush: "sync" },
);

async function resetDirectory() {
    // A queued URL update from a previous selection must never undo Reset.
    clearTimeout(urlSyncTimer);
    resettingDirectory = true;
    applyingRoute = true;
    search.value = "";
    activeFilter.value = "all";
    collapsed.value = new Set();
    const rootId = entries.value[0]?.id ?? null;
    selectedId.value = rootId;
    history.value = rootId === null ? [] : [rootId];
    historyIndex.value = rootId === null ? -1 : 0;
    copied.value = false;
    applyingRoute = false;

    try {
        await router.replace({ path: "/types", query: {}, hash: "" });
    } finally {
        // Release after the router has committed the reset navigation.
        resettingDirectory = false;
    }
}

onBeforeUnmount(() => clearTimeout(urlSyncTimer));

async function onFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
        load(await file.text(), file.name);
    } catch (error) {
        parseError.value = error?.message || t("readError");
    }
    event.target.value = "";
}
function toggleGroup(kind) {
    const next = new Set(collapsed.value);
    if (next.has(kind)) next.delete(kind);
    else next.add(kind);
    collapsed.value = next;
}
function navigate(id) {
    if (!byId.value.has(id) || selectedId.value === id) return;
    clearTimeout(urlSyncTimer);
    selectedId.value = id;
    history.value = [...history.value.slice(0, historyIndex.value + 1), id];
    historyIndex.value = history.value.length - 1;
    copied.value = false;
}
function goBack() {
    if (historyIndex.value > 0)
        selectedId.value = history.value[--historyIndex.value];
}
function goForward() {
    if (historyIndex.value < history.value.length - 1)
        selectedId.value = history.value[++historyIndex.value];
}

// Resolve an identifier against the nearest enclosing namespace, then globally.
// Ambiguous unqualified names are intentionally left unlinked.
function resolveReference(text, entry) {
    const clean = text.replace(/\s/g, "");
    for (let i = entry.path.length; i >= 0; i--) {
        const name = [...entry.path.slice(0, i), clean].join(".");
        const matches = byFullName.value.get(name) || [];
        if (matches.length === 1) return matches[0];
    }
    const matches = byShortName.value.get(clean) || [];
    return matches.length === 1 ? matches[0] : null;
}

// Collect AST token positions, not regex matches, to avoid false links in comments/string literals.
function referenceSpans(entry) {
    if (!entry) return [];
    const spans = [];
    const base = entry.node.getStart(entry.sourceFile);
    function register(typeName) {
        const target = resolveReference(
            typeName.getText(entry.sourceFile),
            entry,
        );
        if (!target) return;
        const start = typeName.getStart(entry.sourceFile) - base;
        const end = typeName.getEnd() - base;
        spans.push({
            start,
            end,
            targetId: target.id,
            targetName: target.fullName,
        });
    }
    function visit(node) {
        if (ts.isTypeReferenceNode(node)) {
            register(node.typeName);
        } else if (ts.isExpressionWithTypeArguments(node)) {
            register(node.expression);
        } else if (ts.isTypeQueryNode(node)) {
            register(node.exprName);
        }
        ts.forEachChild(node, visit);
    }
    visit(entry.node);
    return spans
        .sort((a, b) => a.start - b.start || b.end - a.end)
        .filter(
            (span, index, all) =>
                !all.slice(0, index).some((other) => span.start < other.end),
        );
}
// Collect property names from the AST so keys are distinct from their value types.
function propertySpans(entry) {
    const spans = [];
    const base = entry.node.getStart(entry.sourceFile);
    function visit(node) {
        if (
            (ts.isPropertySignature(node) ||
                ts.isPropertyDeclaration(node) ||
                ts.isPropertyAssignment(node) ||
                ts.isMethodSignature(node) ||
                ts.isMethodDeclaration(node) ||
                ts.isEnumMember(node)) &&
            node.name
        ) {
            spans.push({
                start: node.name.getStart(entry.sourceFile) - base,
                end: node.name.getEnd() - base,
            });
        }
        ts.forEachChild(node, visit);
    }
    visit(entry.node);
    return spans;
}

const VALUE_KEYWORDS = new Set([
    ts.SyntaxKind.StringKeyword,
    ts.SyntaxKind.NumberKeyword,
    ts.SyntaxKind.BooleanKeyword,
    ts.SyntaxKind.AnyKeyword,
    ts.SyntaxKind.UnknownKeyword,
    ts.SyntaxKind.NeverKeyword,
    ts.SyntaxKind.VoidKeyword,
    ts.SyntaxKind.UndefinedKeyword,
    ts.SyntaxKind.NullKeyword,
    ts.SyntaxKind.ObjectKeyword,
]);

function syntaxClass(kind, isProperty) {
    if (isProperty) return "key";
    if (
        kind === ts.SyntaxKind.StringLiteral ||
        kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral ||
        kind === ts.SyntaxKind.TemplateHead ||
        kind === ts.SyntaxKind.TemplateMiddle ||
        kind === ts.SyntaxKind.TemplateTail
    )
        return "string";
    if (
        kind === ts.SyntaxKind.NumericLiteral ||
        kind === ts.SyntaxKind.BigIntLiteral ||
        kind === ts.SyntaxKind.TrueKeyword ||
        kind === ts.SyntaxKind.FalseKeyword
    )
        return "literal";
    if (
        kind === ts.SyntaxKind.SingleLineCommentTrivia ||
        kind === ts.SyntaxKind.MultiLineCommentTrivia
    )
        return "comment";
    if (VALUE_KEYWORDS.has(kind)) return "type";
    if (kind >= ts.SyntaxKind.FirstKeyword && kind <= ts.SyntaxKind.LastKeyword)
        return "keyword";
    return "plain";
}

const codeParts = computed(() => {
    if (!selected.value) return [];
    const entry = selected.value;
    const code = entry.code;
    const links = referenceSpans(entry);
    const properties = propertySpans(entry);
    const parts = [];

    // Scan the complete source, so comments, strings and token offsets remain accurate.
    const scanner = ts.createScanner(
        ts.ScriptTarget.Latest,
        false,
        ts.LanguageVariant.Standard,
        code,
    );
    const tokens = [];
    let kind;
    while ((kind = scanner.scan()) !== ts.SyntaxKind.EndOfFileToken) {
        const start = scanner.getTokenPos();
        const end = scanner.getTextPos();
        tokens.push({
            start,
            end,
            kind: syntaxClass(
                kind,
                properties.some(
                    (span) => start >= span.start && end <= span.end,
                ),
            ),
        });
    }

    // Preserve one clickable element per reference, even for qualified names.
    let cursor = 0;
    function addTokens(start, end) {
        for (const token of tokens) {
            if (token.end <= start || token.start >= end) continue;
            const from = Math.max(start, token.start);
            const to = Math.min(end, token.end);
            if (to > from)
                parts.push({
                    text: code.slice(from, to),
                    syntax: token.kind,
                });
        }
    }
    for (const link of links) {
        if (link.start < cursor || link.end > code.length) continue;
        addTokens(cursor, link.start);
        parts.push({
            text: code.slice(link.start, link.end),
            targetId: link.targetId,
            targetName: link.targetName,
        });
        cursor = link.end;
    }
    addTokens(cursor, code.length);
    return parts;
});
const references = computed(() => {
    const ids = new Set(
        codeParts.value
            .filter((part) => part.targetId)
            .map((part) => part.targetId),
    );
    return [...ids].map((id) => byId.value.get(id)).filter(Boolean);
});
async function copyDeclaration() {
    if (!selected.value) return;
    try {
        await navigator.clipboard.writeText(selected.value.code);
        copied.value = true;
        store.copy();
    } catch {
        copied.value = false;
    }
}
</script>

<template>
    <section
        class="type-directory"
        :class="{ 'td-dark': isDarkMode }"
        :aria-label="t('typeDirectory')"
    >
        <header class="td-toolbar">
            <div class="td-heading">
                <div class="flex flex-row items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="26px"
                        height="26px"
                        viewBox="0 0 512 512"
                    >
                        <title>Typescript Logo</title>
                        <rect fill="#3178c6" height="512" rx="50" width="512" />
                        <rect fill="#3178c6" height="512" rx="50" width="512" />
                        <path
                            clip-rule="evenodd"
                            d="m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z"
                            fill="#fff"
                            fill-rule="evenodd"
                        />
                    </svg>
                    <h2>
                        {{ t("typeDirectory") }}
                        <span class="td-count"
                            >( {{ entries.length }} {{ t("entries") }} )</span
                        >
                    </h2>
                </div>
                <p>{{ activeFilename }}</p>

                <div
                    class="flex flex-row gap-2 items-center mt-2 text-app-blue-dark-mid dark:text-app-blue hover:underline"
                    v-if="showGlobalLink"
                >
                    <VueUiIcon
                        name="externalLink"
                        :stroke="isDarkMode ? '#5f8aee' : '#3456a3'"
                        :size="16"
                    />
                    <RouterLink to="/types">{{
                        t("fullTypesDirectory")
                    }}</RouterLink>
                </div>
            </div>
            <div class="td-actions">
                <button
                    type="button"
                    class="td-button"
                    @click="goBack"
                    :disabled="historyIndex <= 0"
                    :title="t('goBack')"
                >
                    ←
                </button>
                <button
                    type="button"
                    class="td-button"
                    @click="goForward"
                    :disabled="historyIndex >= history.length - 1"
                    :title="t('goForward')"
                >
                    →
                </button>
                <label class="td-button td-upload">
                    <div class="flex flex-row gap-2 items-center">
                        <VueUiIcon
                            name="upload"
                            :stroke="isDarkMode ? '#42d392' : '#3456a3'"
                            :size="16"
                        />
                        {{ t("openFile") }}
                    </div>
                    <input
                        type="file"
                        accept=".ts,.d.ts"
                        hidden
                        @change="onFileChange"
                    />
                </label>
            </div>
        </header>

        <p v-if="parseError" class="td-error" role="alert">{{ parseError }}</p>

        <div class="td-layout">
            <aside class="td-sidebar" :aria-label="t('declarations')">
                <button
                    type="button"
                    class="td-reset-button"
                    @click="resetDirectory"
                >
                    {{ t("resetDirectory") }}
                </button>
                <label class="td-search-label" for="td-search">{{
                    t("searchDeclarations")
                }}</label>
                <input
                    id="td-search"
                    v-model="search"
                    class="td-search"
                    type="search"
                    :placeholder="t('searchPlaceholder')"
                />
                <div class="td-filters" :aria-label="t('declarationTypes')">
                    <button
                        v-for="filter in filters"
                        :key="filter.value"
                        class="td-filter"
                        type="button"
                        :class="{
                            'td-filter-active': activeFilter === filter.value,
                        }"
                        @click="activeFilter = filter.value"
                    >
                        {{ filter.label }}
                    </button>
                </div>
                <div v-if="!visibleGroups.length" class="td-empty">
                    {{ t("noMatchingDeclarations") }}
                </div>
                <section
                    v-for="group in visibleGroups"
                    :key="group.kind"
                    class="td-group"
                >
                    <button
                        class="td-group-title"
                        type="button"
                        :aria-expanded="
                            !collapsed.has(group.kind) || Boolean(search)
                        "
                        @click="toggleGroup(group.kind)"
                    >
                        <span>{{ group.label }}</span
                        ><span class="td-group-count"
                            >{{ group.items.length }}
                            {{
                                collapsed.has(group.kind) && !search ? "+" : "−"
                            }}</span
                        >
                    </button>
                    <div v-if="!collapsed.has(group.kind) || search">
                        <button
                            v-for="entry in group.items"
                            :key="entry.id"
                            type="button"
                            class="td-entry"
                            :class="{
                                'td-selected': selected?.id === entry.id,
                            }"
                            :style="{
                                paddingLeft: `${14 + Math.min(entry.depth, 5) * 12}px`,
                            }"
                            :title="displayName(entry.name)"
                            @click="navigate(entry.id)"
                        >
                            <span class="td-entry-name">{{
                                displayName(entry.name)
                            }}</span>
                            <span v-if="entry.exported" class="td-export"
                                >↗</span
                            >
                        </button>
                    </div>
                </section>
            </aside>

            <main class="td-detail">
                <template v-if="selected">
                    <div class="td-breadcrumb">
                        <span>{{ t("types") }}</span
                        ><span class="td-separator">/</span
                        ><span>{{ displayName(selected.fullName) }}</span>
                    </div>
                    <div class="td-pills">
                        <span class="td-pill">{{
                            t(kindKeys[selected.kind])
                        }}</span
                        ><span
                            v-if="selected.exported"
                            class="td-pill td-pill-export"
                            >{{ t("exported") }}</span
                        >
                    </div>
                    <h3
                        class="td-name font-mono text-app-blue-dark-mid dark:text-app-green"
                    >
                        {{ displayName(selected.fullName) }}
                    </h3>
                    <p v-if="selected.description" class="td-description">
                        {{ selected.description }}
                    </p>
                    <div class="td-section-heading">
                        <h4>{{ t("declaration") }}</h4>
                        <button
                            class="td-copy"
                            type="button"
                            @click="copyDeclaration"
                        >
                            <div class="flex flex-row items-center gap-1">
                                <VueUiIcon
                                    :name="copied ? 'check' : 'copy'"
                                    :stroke="isDarkMode ? '#42d392' : '#3456a3'"
                                    :size="14"
                                />
                                {{ copied ? t("copied") : t("copyCode") }}
                            </div>
                        </button>
                    </div>
                    <pre
                        class="td-code"
                    ><code><template v-for="(part, index) in codeParts" :key="index"><button v-if="part.targetId" type="button" class="td-reference" :title="`${t('openReference')} ${displayName(part.targetName)}`" @click="navigate(part.targetId)">{{ part.text }}</button><span v-else :class="`td-syntax-${part.syntax}`">{{ part.text }}</span></template></code></pre>
                    <p class="td-tip">
                        {{ t("navigationTip") }}
                    </p>
                    <div v-if="references.length" class="td-related">
                        <h4>{{ t("referencedDeclarations") }}</h4>
                        <div class="td-related-items">
                            <button
                                v-for="refEntry in references"
                                :key="refEntry.id"
                                class="td-related-link"
                                type="button"
                                @click="navigate(refEntry.id)"
                            >
                                {{ displayName(refEntry.fullName) }} ↗
                            </button>
                        </div>
                    </div>
                    <footer class="td-meta">
                        <span>{{ selected.fileName }}</span
                        ><span>{{ t("line") }} {{ selected.line }}</span>
                    </footer>
                </template>
                <div v-else class="td-placeholder">
                    {{ t("emptyPrompt") }}
                </div>
            </main>
        </div>
    </section>
</template>

<style scoped>
.type-directory {
    --td-bg: #ffffff;
    --td-panel: #f8fafc;
    --td-code: #f1f5f9;
    --td-text: #1a1a1a;
    --td-muted: #64748b;
    --td-border: #e2e8f0;
    --td-accent: #1d915d;
    --td-blue: #3456a3;
    --td-highlight: #d5eee3;
    --td-syntax-key: #936119;
    --td-syntax-string: #12754d;
    --td-syntax-literal: #9a4a91;
    --td-syntax-keyword: #9a4374;
    --td-syntax-type: #265ca8;
    --td-syntax-comment: #728092;
    font-family: Inter, Satoshi, system-ui, sans-serif;
    color: var(--td-text);
    background: var(--td-bg);
    overflow: hidden;
    min-height: 440px;
}

.type-directory.td-dark {
    --td-bg: #1a1a1a;
    --td-panel: #242424;
    --td-code: #5f8aee10;
    --td-text: #f2f4f7;
    --td-muted: #a5afbf;
    --td-border: #ffffff10;
    --td-accent: #42d392;
    --td-blue: #83a4f2;
    --td-highlight: #0b4d2f;
    --td-syntax-key: #e8bf7d;
    --td-syntax-string: #83cfa4;
    --td-syntax-literal: #dab0ee;
    --td-syntax-keyword: #e3a2ca;
    --td-syntax-type: #8eb6f8;
    --td-syntax-comment: #8b99a9;
}
.td-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 14px;
    padding: 18px 74px 18px 22px;
    border-bottom: 1px solid var(--td-border);
}
.td-kicker {
    letter-spacing: 0.11em;
    font-size: 10px;
    font-weight: 800;
    color: var(--td-accent);
}
.td-heading h2 {
    font-size: 20px;
    margin: 3px 0 4px;
    font-weight: 750;
}
.td-heading p {
    margin: 0;
    font-size: 12px;
    color: var(--td-muted);
}
.td-count {
    font-size: 12px;
    margin-left: 5px;
    color: var(--td-muted);
    font-weight: 500;
}
.td-actions {
    display: flex;
    gap: 6px;
    align-items: center;
    flex-wrap: wrap;
}
.td-button {
    font: inherit;
    font-size: 12px;
    font-weight: 650;
    color: var(--td-text);
    border: 1px solid var(--td-border);
    background: var(--td-panel);
    border-radius: 6px;
    padding: 8px 11px;
    cursor: pointer;
}
.td-button:hover:not(:disabled) {
    border-color: var(--td-accent);
}
.td-button:disabled {
    opacity: 0.35;
    cursor: not-allowed;
}
.td-upload {
    cursor: pointer;
    white-space: nowrap;
}
.td-error {
    background: #fff2ed;
    color: #a32300;
    margin: 0;
    padding: 10px 20px;
    font-size: 12px;
}
.td-layout {
    display: grid;
    grid-template-columns: 290px minmax(0, 1fr);
    min-height: 500px;
}
.td-sidebar {
    background: var(--td-panel);
    border-right: 1px solid var(--td-border);
    padding: 16px 0;
    max-height: 700px;
    overflow-y: auto;
}
.td-reset-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: calc(100% - 28px);
    margin: 0 14px 18px;
    padding: 9px 12px;
    border: 1px solid var(--td-border);
    border-radius: 6px;
    background: var(--td-bg);
    color: var(--td-text);
    font: inherit;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
}
.td-reset-button:hover {
    border-color: var(--td-accent);
}
.td-reset-button:focus-visible {
    outline: 2px solid var(--td-accent);
    outline-offset: 2px;
}
.td-search-label {
    font-size: 10px;
    letter-spacing: 0.09em;
    font-weight: 800;
    margin: 0 14px 6px;
    display: block;
    color: var(--td-muted);
}
.td-search {
    display: block;
    width: calc(100% - 28px);
    background: var(--td-bg);
    border: 1px solid var(--td-border);
    color: var(--td-text);
    font: inherit;
    font-size: 12px;
    border-radius: 6px;
    padding: 10px;
    margin: 0 14px 12px;
    outline-offset: 2px;
}
.td-search:focus {
    outline: 2px solid var(--td-accent);
}
.td-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin: 0 14px 18px;
}
.td-filter {
    border: 1px solid var(--td-border);
    border-radius: 5px;
    font-size: 10px;
    cursor: pointer;
    padding: 5px 7px;
    background: var(--td-bg);
    color: var(--td-muted);
}
.td-filter-active {
    background: var(--td-highlight);
    border-color: var(--td-accent);
    color: var(--td-accent);
    font-weight: 700;
}
.td-group {
    margin-bottom: 8px;
}
.td-group-title {
    width: 100%;
    background: transparent;
    border: 0;
    cursor: pointer;
    color: var(--td-muted);
    display: flex;
    justify-content: space-between;
    padding: 9px 15px;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}
.td-group-count {
    font-weight: 500;
}
.td-entry {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 8px;
    color: var(--td-text);
    border: 0;
    background: transparent;
    padding: 9px 14px;
    text-align: left;
    cursor: pointer;
}
.td-entry:hover {
    background: var(--td-highlight);
}
.td-selected {
    background: var(--td-highlight);
    color: var(--td-accent);
    border-left: 3px solid var(--td-accent);
}
.td-entry-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 11px;
    font-family: JetBrainsMono, ui-monospace, monospace;
}
.td-export {
    color: var(--td-muted);
}
.td-empty {
    color: var(--td-muted);
    padding: 20px;
    font-size: 12px;
}
.td-detail {
    min-width: 0;
    padding: 26px 64px 26px 26px;
    max-height: 700px;
    overflow-y: auto;
}
.td-breadcrumb {
    color: var(--td-muted);
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    font-size: 11px;
    margin-bottom: 22px;
}
.td-separator {
    color: var(--td-accent);
}
.td-pills {
    display: flex;
    gap: 7px;
    margin-bottom: 12px;
}
.td-pill {
    display: inline-block;
    font-size: 11px;
    font-weight: 750;
    border-radius: 4px;
    background: var(--td-highlight);
    color: var(--td-accent);
    padding: 4px 8px;
}
.td-pill-export {
    background: var(--td-panel);
    color: var(--td-muted);
    border: 1px solid var(--td-border);
}
.td-name {
    margin: 0 0 14px;
    font-size: clamp(18px, 2.2vw, 26px);
    line-height: 1.3;
    overflow-wrap: anywhere;
}
.td-description {
    color: var(--td-muted);
    white-space: pre-wrap;
    line-height: 1.7;
    font-size: 13px;
}
.td-section-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin-top: 26px;
}
.td-section-heading h4,
.td-related h4 {
    font-size: 12px;
    font-weight: 800;
    margin: 0 0 10px;
}
.td-copy {
    border: none;
    background: transparent;
    color: var(--td-blue);
    cursor: pointer;
    font-size: 12px;
    font-weight: 650;
}
.td-code {
    margin: 0;
    padding: 20px;
    background: var(--td-code);
    border: 1px solid var(--td-border);
    border-radius: 8px;
    overflow-x: auto;
    font-size: 12px;
    line-height: 1.85;
    tab-size: 2;
}
.td-code code {
    font-family: JetBrainsMono, ui-monospace, monospace;
    color: var(--td-text);
    white-space: pre;
}
/* Token colors are scoped to the declaration preview and follow Pinia dark mode. */
.td-syntax-key {
    color: var(--td-syntax-key);
}
.td-syntax-string {
    color: var(--td-syntax-string);
}
.td-syntax-literal {
    color: var(--td-syntax-literal);
}
.td-syntax-keyword {
    color: var(--td-syntax-keyword);
}
.td-syntax-type {
    color: var(--td-syntax-type);
}
.td-syntax-comment {
    color: var(--td-syntax-comment);
}
.td-reference {
    display: inline;
    padding: 0;
    font: inherit;
    line-height: inherit;
    border: 0;
    border-bottom: 1px dashed currentColor;
    color: var(--td-blue);
    background: transparent;
    cursor: pointer;
}
.td-reference:hover,
.td-reference:focus-visible {
    color: var(--td-accent);
    background: var(--td-highlight);
}
.td-tip {
    color: var(--td-muted);
    font-size: 11px;
    margin: 10px 0 0;
}
.td-related {
    margin-top: 30px;
}
.td-related-items {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
}
.td-related-link {
    background: var(--td-panel);
    border: 1px solid var(--td-border);
    border-radius: 5px;
    padding: 7px 9px;
    color: var(--td-blue);
    font-size: 11px;
    font-family: JetBrainsMono, ui-monospace, monospace;
    cursor: pointer;
}
.td-related-link:hover {
    border-color: var(--td-accent);
}
.td-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    color: var(--td-muted);
    border-top: 1px solid var(--td-border);
    margin-top: 32px;
    padding-top: 13px;
    font-size: 11px;
}
.td-placeholder {
    padding: 30px;
    color: var(--td-muted);
    font-size: 13px;
}
@media (max-width: 680px) {
    .td-toolbar {
        align-items: flex-start;
        flex-direction: column;
    }
    .td-layout {
        grid-template-columns: 1fr;
    }
    .td-sidebar {
        border-right: 0;
        border-bottom: 1px solid var(--td-border);
        max-height: 290px;
    }
    .td-detail {
        padding: 18px;
        max-height: none;
    }
}
</style>
