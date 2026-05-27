# Version 1.1.0+ Planning — Visual Governance & Brand System Productization

> Planning reference for post-V1 visual governance and longer-term brand-system productization.
> Load this file when planning brand presets, editor governance, HTML-2-Gutenberg review reports, multi-brand support, or AI-assisted artifact intake.

---

## Status

Status: **FUTURE CANDIDATE**
Primary target: **V1 / 1.1.0**
Long-term target: **V2 / 2.0.0 or Future Candidate**

This file does not change the current milestone. Current milestone remains managed by `.context/MILESTONES.md`.

---

## Phase 1 — Visual Governance Layer

Target: **1.1.0**

Goal:

- Make brand-aware page building safer after V1 launch readiness.
- Give editors pattern/section choices without requiring raw class editing.
- Give HTML-2-Gutenberg a review report that explains what was accepted, mapped, rejected, or missing.

Scope:

- Brand preset/profile variants.
- Pattern variants for common marketing sections.
- Section style variants.
- Safer editor controls for repeated visual choices.
- HTML-2-Gutenberg review report.

Review report fields:

```text
artifact_palette
mapped_theme_tokens
rejected_prototype_colors
missing_tokens
pattern_variant_recommendations
editor_control_risks
```

Acceptance:

- [ ] Brand/profile variants are documented before implementation.
- [ ] Pattern variants avoid raw color/style input.
- [ ] HTML-2-Gutenberg report distinguishes artifact colors from SKVN theme tokens.
- [ ] Editor controls avoid raw class entry where practical.
- [ ] Theme remains the visual source of truth.
- [ ] Plugin remains the tooling/source intake owner.
- [ ] External references below were reviewed during implementation.

---

## Phase 2 — Brand System Productization

Target: **2.0.0 or Future Candidate**

Goal:

- Evaluate whether SKVN Marine needs productized multi-brand or client-specific brand packs.
- Add admin workflows only after the manual translator and visual governance layers are stable.

Potential scope:

- Multi-brand support.
- Client/site-specific brand packs.
- Admin UI for selecting or reviewing brand profiles.
- Import artifact -> review brand mapping -> approve -> publish page.
- Optional AI-assisted brand extraction or artifact review.

Hard gates before AI-assisted scope:

- Credential storage approved.
- Data handling and privacy rules approved.
- Cost/rate-limit policy approved.
- Timeout/retry behavior documented.
- Logging policy documented.
- Human review remains required before publishing.

Acceptance:

- [ ] Multi-brand need is validated by actual project requirements.
- [ ] Admin workflow capability model is documented.
- [ ] AI-assisted intake remains disabled until credential/privacy/cost/logging rules are approved.
- [ ] No raw generated CSS/JS is inserted into Gutenberg content.
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

