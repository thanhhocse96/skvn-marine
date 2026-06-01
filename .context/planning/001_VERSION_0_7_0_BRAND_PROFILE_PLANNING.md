# Version 0.7.0 Planning — Brand Profile & Theme Tokens

> Planning reference for implementing a theme-owned brand profile after the current page-display and quote milestones.
> Load this file when working on brand tokens, theme.json palette/style settings, editor/frontend visual parity, or HTML-2-Gutenberg brand mapping.

---

## Status

Status: **FUTURE CANDIDATE**
Target: **V1 / 0.7.0**

This file does not change the current milestone. Current milestone remains managed by `.context/MILESTONES.md`.

---

## Problem

HTML/Tailwind artifacts can look visually strong but carry another brand's colors, spacing, radius, and emphasis. If HTML-2-Gutenberg translates the layout but keeps prototype colors, the output becomes structurally correct but visually wrong for SKVN Marine.

Brand values must not be scattered into Gutenberg content, inline CSS, or plugin logic.

---

## Goal

Create a theme-owned brand profile layer that gives HTML-2-Gutenberg and Gutenberg patterns a stable visual contract.

The brand profile should cover:

- Primary color.
- Accent color.
- Dark/navy color.
- Surface/background colors.
- Text colors.
- CTA style.
- Card radius.
- Card shadow.
- Section spacing.
- Editor/frontend parity expectations.

---

## Ownership

Theme `skvn-marine` owns:

- `theme.json` palette, typography, spacing, layout, and block style settings where WordPress supports them.
- `style.css` CSS variables and component/pattern CSS.
- Block style registrations and pattern CSS.
- Editor/frontend parity.

Plugin `skvn-marine-blocks` owns:

- HTML-2-Gutenberg tooling.
- Brand scan/report output.
- Validation that translated content does not rely on raw prototype colors.

Gutenberg content owns:

- Editable text.
- Editable links/buttons.
- Editable media.

Gutenberg content must not own:

- Raw `<style>`.
- Raw `<script>`.
- Prototype Tailwind color contracts.
- Brand system decisions.

---

## Short-Term Contract For HTML-2-Gutenberg

Before 0.7.0 implementation, translator output should already include:

```text
brand_source_scan
brand_mapping
brand_mismatch
token_changes_needed
```

Definitions:

- `brand_source_scan`: colors, fonts, radius, shadows, and spacing cues detected from the artifact.
- `brand_mapping`: artifact cues mapped to existing SKVN tokens/classes.
- `brand_mismatch`: artifact choices that conflict with current SKVN brand direction.
- `token_changes_needed`: token or class additions required for visual parity without raw CSS in content.

---

## Implementation Direction

Prefer WordPress-native mechanisms first:

- Use `theme.json` for palette, typography, spacing, layout settings, and supported style declarations.
- Use `style.css` CSS variables for component-level or pattern-level contracts that need normal CSS.
- Keep `theme.json` presets and `style.css` variables synchronized.
- Use block styles such as `is-style-skvn-*` for editor-visible style choices.
- Use Settings API or Customize API only if the Site Editor/theme.json path is insufficient for the required brand controls.

Candidate token names:

```css
--skvn-color-primary
--skvn-color-accent
--skvn-color-dark
--skvn-color-surface
--skvn-color-text
--skvn-color-muted
--skvn-color-border
--skvn-radius-card
--skvn-shadow-card
--skvn-section-spacing
```

---

## Acceptance

- [ ] Brand profile source of truth is documented before code.
- [ ] `theme.json` and `style.css` sync rule is documented.
- [ ] Editor and frontend use the same token contract.
- [ ] HTML-2-Gutenberg can report brand scan/mapping/mismatch/token needs.
- [ ] No translated Gutenberg markup requires raw prototype colors.
- [ ] No GeneratePress parent change.
- [ ] External references below were reviewed during implementation.

---

## External References

- WordPress Block Editor Handbook — Global Settings & Styles: `https://developer.wordpress.org/block-editor/how-to-guides/themes/global-settings-and-styles/`
- WordPress Block Editor Handbook — Styles in the Editor: `https://developer.wordpress.org/block-editor/explanations/architecture/styles/`
- WordPress Block Editor Handbook — Block Supports: `https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/`
- WordPress Theme Handbook — Styles: `https://developer.wordpress.org/themes/global-settings-and-styles/styles/`
- WordPress Block Editor Handbook — Block Styles: `https://developer.wordpress.org/block-editor/reference-guides/block-api/block-styles/`
- WordPress Settings API: `https://developer.wordpress.org/apis/settings/`
- WordPress Customize API: `https://developer.wordpress.org/themes/customize-api/`
- GeneratePress Documentation — Using a Child Theme: `https://docs.generatepress.com/article/using-child-theme/`
- Tailwind CSS — Customizing Colors: `https://tailwindcss.com/docs/customizing-colors/`
- Tailwind CSS — Theme Variables: `https://tailwindcss.com/docs/configuration`

