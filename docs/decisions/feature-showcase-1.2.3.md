# Feature Showcase — 1.2.3 Decision

Date: 2026-06-08
Status: implemented; onsite QA pending
Milestone: V1 / 1.2.3

## Updated Decision — Panel-Only Block

The artifact-inspired expanding visual component keeps the user-facing name:

```text
SKVN Feature Showcase
```

Its block contract is now narrowed to a configurable feature panel group:

```text
skvn-marine/feature-showcase
```

It will not include the surrounding editorial intro/copy/meta text. That text
belongs to a Gutenberg pattern/composition that can wrap the panel block.

The saved block should own only:

- panel items
- panel image/title/copy
- layout direction
- mobile behavior
- default open panel

The surrounding B2B seafood typography treatment is preserved separately as a
pattern/style reference.

## Rationale

The reference artifact contains two different concerns:

- an editorial B2B text stack
- an expanding panel/card group

Only the panel/card group belongs in the plugin block. The text stack is better
as core Gutenberg content in a pattern because editors may need to replace,
remove, or reposition it without changing the panel interaction contract.

Keeping this separate also prevents the existing `SKVN Accordion` contract from
becoming visually overloaded.

The initial mobile rail state exposed the intended direction but not the final
mobile UX. Mobile should use progressive disclosure:

- compact horizontal card headers by default
- tap/focus reveals the selected card image/content
- no reliance on hover
- optional future behavior can hide panels or convert them into a slider

## Activation Decision

Initial source existed in `src/feature-showcase/` and was parked during V1 /
1.2.1. It was activated when V1 / 1.2.3 started.

For V1 / 1.2.3:

- the block is registered from `src/index.ts`
- it appears under the `SKVN Marine` Block Inserter category
- metadata is named `block.json`
- generated build metadata is emitted at `build/feature-showcase/block.json`

The V1 / 1.2.1 parking decision is archived in tension history.

## Implementation Rules

- Use plugin-owned TypeScript and CSS.
- Do not use Tailwind CDN.
- Do not save raw Tailwind classes as production content.
- Do not expose raw CSS or arbitrary class input to editors.
- Preserve `prefers-reduced-motion`.
- Support keyboard focus, not only hover.
- Keep existing Accordion behavior unchanged.
- Do not store the B2B intro/meta typography as required block attributes.
- Preserve the useful B2B seafood typography treatment from the first draft as a
  reusable visual note, not as required block structure:
  `docs/decisions/b2b-seafood-editorial-typography-1.2.3.md`.

## Pattern Relationship

The full visual composition is documented as a pattern artifact:

```text
docs/artifacts/page-blueprints/b2b-seafood-editorial-showcase-pattern.md
```

The pattern should compose:

```text
Core Group / Columns
├── Core text stack using the B2B seafood editorial typography treatment
└── SKVN Feature Showcase panel-only block
```

The pattern may be implemented later as a WordPress pattern. The block itself
must stay reusable without the text stack.

## Implementation Source

Planning source:

```text
.context/planning/016_VERSION_1_2_3_FEATURE_SHOWCASE_PLANNING.md
```

Onsite QA:

```text
docs/testing/onsite-feature-showcase-1.2.3.md
```
