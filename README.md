# skvn-marine

SKVN Marine is a WordPress source repo for a B2B seafood/export website.

It contains the custom GeneratePress child theme and custom Gutenberg block plugin used to build and test the site:

```text
wp-content/themes/skvn-marine/
wp-content/plugins/skvn-marine-blocks/
```

This repo is not a full WordPress runtime. External plugins, uploads, WordPress core, and local credentials belong in the target/test WordPress site, not here.

## Agent Context

Before making changes, read:

```text
AGENTS.md
.context/GLOBAL.md
.context/MILESTONES.md
.context/TENSIONS_OPEN.md
.context/TENSIONS_ACTIVE.md
.context/modules/<module>.md
```

`AGENTS.md` is the startup protocol and source of truth for load order.

The `.context/` folder is AI working memory and context mapping. It tracks current milestone scope, module rules, active decisions, open tensions, and project invariants.

Human-facing docs live under:

```text
docs/
```
