---
name: html-2-gutenberg
description: Translate HTML/CSS artifacts, AI layout mockups, or screenshots into SKVN Marine-safe Gutenberg block markup and implementation contracts. Use when Codex must convert external HTML/CSS into paste-ready WordPress block comment syntax, identify skvn-* theme classes, separate editable content from theme-controlled decoration/motion, validate markup safety, or plan future HTML-2-Gutenberg tooling in skvn-marine-blocks.
---

# HTML-2-Gutenberg

## Core Rule

Convert artifacts into WordPress-native Gutenberg output. Do not paste raw `<style>`, `<script>`, canvas content, SVG decoration, dynamic Tailwind-only class contracts, or base64/data URI images into page content.

For SKVN Marine:

- Plugin `skvn-marine-blocks` owns HTML-2-Gutenberg tooling: artifact intake, translation workflow, validation, future admin publisher/create-page flow.
- Theme `skvn-marine` owns visual output contract: `skvn-*` classes, CSS, tokens, block styles, patterns, editor/frontend parity, decorative/background animation, and shared animation runtime.
- Core blocks own editable content: groups, columns, headings, paragraphs, buttons, images, lists.
- Custom blocks are last resort: only if core blocks plus theme patterns are insufficient.

## Required Project Context

When working inside `D:\Github\skvn-marine`, load these before acting:

1. `AGENTS.md`
2. `.context/GLOBAL.md`
3. `.context/MILESTONES.md`
4. `.context/TENSIONS_OPEN.md`
5. `.context/TENSIONS_ACTIVE.md`
6. `.context/modules/THEME_SKVN_MARINE.md`
7. `.context/modules/PLUGIN_SKVN_MARINE_BLOCKS.md`
8. `docs/standards/site-branding-guideline.md`

If the workflow doc exists, read `docs/workflows/html-2-gutenberg-workflow.md`; otherwise read `docs/workflows/layout-translator-workflow.md` and treat it as the legacy name.

For another WordPress project, first discover the project contract instead of assuming SKVN paths or classes. Find the local agent/project instructions, theme root, custom plugin root, CSS prefix, theme CSS files, `theme.json`, block style registrations, and pattern files before translating.

## Translation Workflow

1. Inspect the artifact.
2. Build a project contract inventory before choosing classes.
3. Build a theme CSS inventory before choosing layout-critical classes.
4. Extract semantic content: heading, paragraph, CTA, image, list, card, product/category text.
5. Classify presentation-only parts: wrappers, grids, spacing, colors, decorative SVG/waves/particles, background motion.
6. Emit Gutenberg block markup using core blocks and existing stable project classes.
7. Emit implementation contracts, not inline CSS/JS.
8. Validate paste-safety before returning output.

## Project Contract Intake

The translator is theme-contract-aware. It must discover and reuse the target project's existing visual contract before inventing a new one.

For any project, determine:

```text
project_contract
theme_root
plugin_root
css_prefix
implemented_class_families
existing_patterns
registered_block_styles
theme_tokens
allowed_blocks
```

Use fast local search:

```powershell
rg -n "register_block_style|registerBlockType|theme.json|--[a-z0-9-]+-|wp:" .
rg -n "\.[a-z0-9-]+-" path/to/theme
rg --files path/to/theme | rg "style\.css|theme\.json|patterns|block-styles|assets/.+\.(css|js)$"
```

Decision rules:

- Reuse an existing class family before creating a new one.
- If a pattern already implements a similar section, mirror its class family and structure.
- If the project has a translated-pattern family, prefer that family for translated artifacts.
- In SKVN Marine, prefer existing implemented families such as `skvn-translated-*`, `skvn-kpi-strip*`, `skvn-section__*`, `skvn-placeholder-media`, `skvn-card`, and registered `is-style-skvn-*` styles before inventing `skvn-hero__*`, `skvn-logo-card__*`, or other new families.
- Never create a new layout-critical class family unless the task also asks to implement theme CSS or the class is explicitly listed as missing.
- Keep project-specific rules in the output contract so another project can swap in its own prefix and implemented classes.

## Reuse Existing Pattern Contract

Before translating a section, search for a similar existing pattern or CSS family:

```powershell
rg -n "hero|kpi|split|card|grid|testimonial|logo|cta|translated" wp-content\themes\skvn-marine\style.css wp-content\themes\skvn-marine\patterns
```

If a match exists:

- Reuse the same block shape where possible.
- Reuse the same `className` family.
- Reuse registered block styles such as `is-style-skvn-primary`.
- Only change editable content, links, images, and counts.
- Do not rename working classes for aesthetics.

Example SKVN rule:

```text
Use `skvn-translated-hero__grid` for translated hero grids because theme CSS already defines its desktop/mobile grid.
Do not replace it with `skvn-hero__columns` unless theme CSS for `skvn-hero__columns` exists or is being added.
```

## Theme CSS Intake

Before translating inside `D:\Github\skvn-marine`, inspect the theme sources that actually ship CSS:

```powershell
Select-String -Path wp-content\themes\skvn-marine\style.css -Pattern "\.skvn-|--skvn-|wp-block-" -Encoding UTF8
Select-String -Path wp-content\themes\skvn-marine\theme.json -Pattern "skvn|layout|palette|spacing" -Encoding UTF8
Select-String -Path wp-content\themes\skvn-marine\inc\block-styles.php -Pattern "register_block_style|skvn|core/" -Encoding UTF8
Get-ChildItem wp-content\themes\skvn-marine\patterns -Filter *.php | Select-String -Pattern "skvn-|wp:" -Encoding UTF8
```

Summarize the scan in the result:

```text
project_contract
css_source_scan
implemented_classes
missing_theme_classes
native_block_fallbacks_used
```

Decision rules:

- Use an existing `skvn-*` class when it is implemented in theme CSS or registered block styles.
- If a desired `skvn-*` class is not implemented, list it under `missing_theme_classes`.
- Do not rely on a missing class for layout-critical behavior such as grid, columns, width, spacing, or sticky/fixed positioning.
- If theme CSS for a custom grid class is missing, use native `core/columns` for the paste-ready markup and put the desired class in the CSS contract.
- If the user explicitly asks to implement theme CSS, write the CSS in the theme layer, not in Gutenberg content.
- If the user only asks for paste-ready markup, prefer native Gutenberg structure over custom classes that require new CSS.
- For SKVN Marine, if `skvn-translated-*` can represent the section, use it before creating new `skvn-*` section families.

## Mapping Rules

| Artifact | Gutenberg target |
|---|---|
| `section`, wrapper `div` | `core/group` |
| Grid / 2 columns | `core/columns` |
| `h1`-`h6` | `core/heading` |
| `p` | `core/paragraph` |
| CTA link/button | `core/buttons` + `core/button` |
| Content image | `core/image` |
| Repeated cards | `core/group`/`core/columns` card pattern |
| Feature/stat list | `core/list` or repeated groups |
| Decorative SVG/waves/particles | `not_translated` + theme CSS contract |
| Motion/hover/loop/parallax | `animation_contract` + shared runtime |
| Complex state/control | plugin block candidate later |

## Output Shape

For formal translation tasks, return:

```text
project_contract
css_source_scan
gutenberg_markup
required_classes
missing_theme_classes
theme_css_contract
animation_contract
assets_needed
not_translated
risks
```

For user requests asking only for paste-ready markup, lead with the `gutenberg_markup` and keep contracts short.

## Paste-Safe Markup Rules

- Use full WordPress block comment syntax.
- Never emit empty/self-closing image blocks such as `<!-- wp:image ... /-->`.
- Image blocks must include opening comment, `<figure>`, `<img src="..." alt="..."/>`, and closing comment.
- Replace missing, `data:` URI, or oversized image sources with a placeholder URL.
- Do not include raw `<style>`, `<script>`, or inline event handlers.
- Escape visible text for HTML when needed.
- Keep primary text and CTA editable.
- Use `skvn-*` classes only for project contracts.

Safe image pattern:

```html
<!-- wp:image {"sizeSlug":"large","className":"skvn-hero__image"} -->
<figure class="wp-block-image size-large skvn-hero__image"><img src="https://placehold.co/900x650/eef6ff/0a2a4a?text=Replace+Image" alt="Replace with project image"/></figure>
<!-- /wp:image -->
```

## Motion Contract Rules

All motion must be contract-only unless implementing theme runtime:

- Trigger: load, scroll, hover, loop.
- Initial state: visible in editor; no hidden editing content.
- Final state: visible/static fallback.
- Duration/easing/stagger.
- Reduced-motion fallback.
- Editor behavior: static or simplified.

Implementation must use the shared theme runtime and respect `prefers-reduced-motion`.

## Validation Checklist

Before final answer or file output:

```text
[ ] Project contract was discovered.
[ ] Theme CSS inventory was checked before choosing layout-critical classes.
[ ] Existing pattern/class families were reused before inventing new ones.
[ ] Missing skvn-* classes are listed, not silently relied on.
[ ] Custom grid classes are only layout-critical when theme CSS exists.
[ ] No raw <style> in Gutenberg markup.
[ ] No raw <script> in Gutenberg markup.
[ ] No self-closing image blocks.
[ ] No src="data: images.
[ ] Text/CTA remains editable.
[ ] Uses core blocks first.
[ ] Uses skvn-* classes.
[ ] Decorative/motion items are in contracts, not content.
[ ] Theme/plugin ownership boundary is respected.
[ ] No GeneratePress parent change.
```

## Useful Commands

Existing repo CLI may be available:

```bash
node tools/layout-translator/translate-layout.mjs --input path/to/artifact.html
node tools/layout-translator/translate-layout.mjs --input path/to/artifact.html --output translated.md
```

On this machine, use WSL Node if Windows `node.exe` is blocked:

```bash
wsl -d Debian -- bash -lc "source /home/shinkuro/.nvm/nvm.sh && nvm use 20 && cd /mnt/d/Github/skvn-marine && node tools/layout-translator/translate-layout.mjs --input path/to/artifact.html"
```
