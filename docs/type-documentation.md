# Package-driven type documentation

## Investigation (before refactoring)

`src/vue-data-ui.d.ts` is a manually maintained ambient declaration module.
`src/views/TypeDirectory.vue` imports it using Vite's `?raw` loader and passes
its text to `src/components/docs/BaseTypeDirectory.vue` at `/types`.
The directory parses it in the browser using the TypeScript parser, keeps AST
nodes in shallow refs, and uses the TypeScript scanner for syntax highlighting.
It renders complete declaration source rather than flattening properties: nested
objects, optional markers, generics and constraints, unions, intersections,
literals, arrays, tuples and signatures are therefore retained. Links are AST
based, but resolved by namespace/name heuristics rather than compiler symbols.
There is no multi-file resolution or export/re-export traversal. All encountered
declarations are listed, including potentially private declarations. JSDoc prose
is extracted, but declaration-level comments/tags are omitted from copied code
by `getText`; member comments remain in source.

`extract-types.cjs` is a separate, unused script, absent from package scripts.
It hardcodes `node_modules/vue-data-ui/dist/types/vue-data-ui.d.ts`, recursively
expands checker types into `types.json`, drops source syntax and documentation,
and uses one global seen set that can mislabel repeated types as circular.
`TypeDef.vue` is an unused recursive renderer for this old JSON shape.
`AboutComponentTypes.vue` categorizes chart components; it is unrelated to TS API
documentation. `src/stores/typeDir.js` supplies translations. The router exposes
`/types`; the side menu links there. No component documentation page currently
instantiates BaseTypeDirectory or supplies a component type lookup. Component
pages have separately authored TypeScript examples.

The installed package is `3.27.1-beta.0`, installed from `file:vdu2.tgz` in both
package.json and package-lock.json. Its root `types` field and conditional
`exports["."].types` point to the ambient root declaration. There is no `typings`
field. Additional public exports include `./utils`, `./composables`, `./ssr/*`,
and `./*` component entry points; CSS is a non-type export. Declarations span
multiple files. Component declarations such as `vue-ui-xy` re-export named types
and default/named components from the root. Utilities/composables contain their
own declarations and references back to the root; SSR declarations contain
additional public types. A root-file-only replacement would miss these APIs.

A compiler export audit found 1,045 root exports. All 891 named interface/type/
class/enum/function declarations in the copied file still exist by name among
these exports. Name availability does not imply identical signatures. The copy
and installed package differ (for example, their Vue imports differ). Public
exports named `Base` must not be hidden merely because their names look internal.

## Design

Resolve package specifiers with TypeScript's NodeNext module resolver, honoring
conditional exports, rather than reading a fixed declaration path. Discover
literal export keys and wildcard candidates from the installed package manifest,
then resolve each candidate through the same public resolver. Walk compiler
module exports and aliased symbols, supporting both ambient root modules and
ordinary external modules. Only exported declarations enter the public directory;
retain entry-point provenance and symbol relationships across files. Do not
recursively document dependency implementations.

Generate a serializable model in a Vite virtual module during development and
production. Preserve declaration text and JSDoc instead of expanding/simplifying
types. Precompute highlighting and compiler-resolved links on the server. The
browser consumes the model without loading TypeScript; the optional local file
import loads the parser on demand. Keep `/types`, existing root-qualified names,
query state, navigation and visual presentation. Watch resolved declaration files
and the package manifest so reinstalling/updating declarations regenerates data.
Fail clearly on unresolved public declarations or syntactic errors; never silently
fall back to the old copy. Generated data is ephemeral, not a second maintained
set of declarations. No library changes or extra dependencies are required.

## Implemented behavior and maintenance

The Vite plugin in `scripts/type-documentation.js` resolves public entry points,
collects compiler exports (including aliases and namespaces), and associates
parsed declarations with their compiler symbols. `src/typeDocumentation.js`
contains the shared AST parser/scanner, used on the server and loaded lazily for
local-file imports. The virtual module stores compact token spans; the view
reconstructs display tokens without TypeScript. Public entry-point names are
included in search, enabling component-specific lookup such as
`vue-data-ui/vue-ui-xy`. No existing component-page integration was removed.

The installed package currently produces 1,088 entries from 77 declaration files
plus its manifest, with 6,268 linked references. Declaration-level JSDoc and tags
are now retained in the source preview and serialized metadata. Private helper
declarations are excluded as standalone entries. References to private or external
types remain plain source text; dependency internals are not expanded. Public
exports remain public even if their names contain `Base`.

The copied declaration, obsolete `extract-types.cjs`, and unused `TypeDef.vue`
were deleted. No installed library file was changed. The compatibility audit
compared named declaration availability, not every old property/signature; the
installed package's complete source syntax is now authoritative. Historical
root-qualified query names, `/types`, query filters, history controls, copy,
local-file import, and visual structure remain supported. The copy's module
container is retained for existing root URLs.

Run `pnpm test:types` for focused regressions. `pnpm dev` and `pnpm build`
automatically generate documentation; no generated declaration/JSON artifact
needs updating or committing. Existing resolved declarations and the package
manifest are polled in development, including under Vite's normally ignored
`node_modules`; changes invalidate the virtual module and reload the page.
Restart development after adding entirely new wildcard files without changing
any watched declaration or manifest. Production always rediscovers all entries.

Adding/changing/removing a public type updates the next generated model. Removed
root types stop appearing; stale selection URLs fall back to the initial entry.
Internal layout changes are handled by module resolution and export-target
discovery. Upgrading the installed package and restarting development or running
a production build is sufficient. New export conventions unsupported by the
resolver fail visibly rather than falling back to stale copied declarations.

Validation completed: five Node regression tests; targeted oxlint; production
build; a localhost development request returning the generated virtual module.
Tests cover installed APIs, determinism, syntax preservation, JSDoc, aliases,
import-type references, generic shadowing, private helpers, malformed syntax,
missing packages, and a changed declaration layout with a `types` fallback.
No browser interaction/visual regression suite or exhaustive historical property
comparison was performed. Production retains existing large-chunk warnings.
Compact spans reduced the generated route chunk from roughly 5.58 MB to 2.84 MB
(268 KB gzip); the separate 3.46 MB TypeScript parser chunk is fetched only when
a user imports a local declaration file. These are measurements of the new
implementation before/after compact spans, not a historical bundle benchmark.

Declaration previews restore four-space indentation using TypeScript's language
service formatter. Formatting happens after reference resolution and carries
highlighting and link metadata through the whitespace edits. Copying a declaration
uses the formatted text. This also applies to local-file imports; package files
and their original source line metadata remain unchanged.
