# Core Control and Core Button Hover

Status: DECIDED, implementation not started  
Target: Future Candidate, milestone unassigned  
Date: 2026-06-12

## Decision

`SKVN Marine` will contain a submenu named `Core Control`.

This screen is the shared registry and settings surface for optional
enhancements to WordPress core blocks. The first enhancement is
`Core Button Hover Colors`.

The initial admin UI may be plain. Stable settings, compatibility, and an
extensible feature registry take priority over visual polish.

## Ownership and boundaries

- The current `skvn-marine-blocks` plugin owns the settings page, Gutenberg
  extension, saved compatibility data, and frontend behavior.
- Do not create or rename a plugin for this feature.
- Do not modify WordPress core or GeneratePress.
- Theme palettes may supply color choices, but the feature must remain portable
  plugin behavior.
- Implementation should be module-shaped, for example
  `modules/core-control/` with editor code under `src/core-controls/`.

## Settings contract

Use the option `skvn_core_controls` with this initial shape:

```php
[
    'button_hover_colors' => true,
]
```

Requirements:

- `button_hover_colors` defaults to `false`.
- Save through the WordPress Settings API.
- Require `manage_options` and normal nonce protection.
- Sanitize only known boolean feature keys.
- The registry must allow later core enhancements to reuse the same menu,
  option, sanitization, and save flow.

Each registered enhancement should define an ID, label, description, default
state, sanitization rule, editor entry point, and frontend asset.

## Toggle behavior

The toggle controls feature exposure, not data compatibility.

When disabled:

- Hide the hover controls in the block editor.
- Do not apply or enqueue the hover styling.
- Preserve previously configured hover values.
- Existing `core/button` blocks must remain valid and editable.

When enabled:

- Show the controls for every `core/button` block.
- Restore any previously configured values.
- Apply frontend and editor-preview hover styling.

Compatibility attributes or equivalent parsing support must remain registered
even while the feature is disabled. Disabling the feature must never discard
data or trigger Gutenberg block recovery.

## Editor UX

Add a separate, stable inspector panel named `Hover Colors`.

Do not inject a custom tab into Gutenberg's private native `Color` panel. That
UI is not a stable public extension boundary and would increase breakage risk
across WordPress releases.

The panel provides:

- Text color
- Background color
- Gutenberg palette-based color selection
- Clear/reset controls

Proposed namespaced attributes:

```text
skvnHoverTextColor
skvnHoverBackgroundColor
```

Names may change during a compatibility prototype, but they must remain
namespaced and must not alter the normal `core/button` markup structure.

## Frontend contract

Use a stable namespaced class and CSS custom properties, for example:

```text
has-skvn-button-hover
--skvn-button-hover-color
--skvn-button-hover-background
```

The plugin stylesheet applies these values to both `:hover` and
`:focus-visible`.

Additional rules:

- Existing buttons are unchanged until hover values are configured.
- Missing hover values fall back to the theme or WordPress default.
- Transition only `color`, `background-color`, and `border-color`.
- Use a duration in the 150-200ms range.
- Remove the transition for `prefers-reduced-motion: reduce`.
- Do not use `!important`.
- Do not require frontend JavaScript.

Frontend CSS should be tightly scoped. Load it only when the feature is enabled,
and conditionally for relevant content when that can be done reliably without
breaking nested blocks.

## Conflict policy

The feature is opt-in and defaults to disabled because other plugins may extend
`core/button` with similar behavior.

Automatic detection of every competing plugin is not a reliable contract.
`Core Control` should explain the possible overlap and let the administrator
enable or disable the enhancement manually.

All option keys, attributes, classes, CSS variables, PHP functions, and script
handles must use the SKVN namespace.

## Compatibility gate

Before full implementation, create a small prototype proving that:

1. A configured button remains valid after editor reload.
2. Turning the feature off hides controls and styling without deleting values.
3. Turning it back on restores the values.
4. Plugin deactivation and reactivation do not create an invalid block.
5. WordPress core/button serialization remains compatible.

Do not ship the editor extension until this gate passes.

## Acceptance criteria

- `Core Control` appears under the existing `SKVN Marine` admin menu.
- `Core Button Hover Colors` defaults to off.
- The toggle saves and sanitizes correctly.
- Disabled state exposes no editor controls and applies no hover CSS.
- Enabled state supports text and background hover colors on all core buttons.
- Hover and keyboard focus-visible states use the configured colors.
- Existing values survive disable/re-enable cycles.
- Existing buttons remain unchanged when no hover values are set.
- No Gutenberg invalid-block recovery is introduced.
- Editor preview and frontend behavior match.
- The implementation uses no `!important` and no frontend JavaScript.
- Another hover plugin can remain authoritative while this feature is disabled.

## Implementation notes

Likely implementation surfaces:

```text
modules/core-control/
src/core-controls/
```

Exact filenames and Gutenberg filters remain implementation details. The agent
implementing this decision must first assign the work to an approved milestone,
load the plugin module context, and follow the normal build and onsite testing
workflow.

If implementation adds or changes PHP runtime `require` or `include` paths, the
deploy artifact and plugin ZIP runtime-file audit are mandatory.

