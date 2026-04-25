# Problem: Overlay CTA styling can break shared card links

## Summary

When a Shopify card uses a full-surface absolute link, adding a new visual CTA layer above it can make the most obvious click target stop navigating.

This came up on the collection-card pattern used by the `collection-list` section:

- the shared link is rendered as `.collection-card__link`
- the visible content area is `.collection-card__content`
- the base theme positions the link as an absolute full-card overlay
- a later UI change raised the content layer above the link with `z-index`

The result is a silent behavior mismatch: the card still looks clickable, but clicks on the visible CTA/pill area may hit a non-interactive element instead of the link underneath.

## Why this happens

The shared pattern depends on layering:

- `.collection-card__link` spans the full card
- content is normally decorative or sits in a safe layer
- if content is moved above the link, pointer events can be intercepted

This is especially easy to miss during styling-only work because the layout still looks correct.

## Scope risk

A second issue is scoping page-specific changes too broadly.

If a change is added directly to a reusable section such as `sections/collection-list.liquid`, it affects every template instance that uses that section, not just one storefront route like `/collections/all`.

For page-specific work, section-level styling is only safe when the section instance is unique to that page or when the template/handle is checked explicitly.

## Safe implementation rules

1. If a card uses an absolute full-surface link, verify which layer is on top before shipping.
2. If decorative or label content sits above the link, set `pointer-events: none` unless that layer truly needs its own interaction.
3. If the visible CTA area should be clickable, add an interaction test that clicks that exact visible area.
4. For route-specific Shopify changes, scope by template, handle, or unique section instance, not only by reusable section type.

## What to test

For card-as-button UI updates, do not stop at computed-style assertions.

Add checks for:

- clicking the visible CTA surface navigates correctly
- clicking the actual visible changed region, not just any point inside a larger overlay container
- keyboard focus still lands on the real interactive element
- long labels remain readable at tablet and mobile widths
- no horizontal overflow is introduced
- the styling is only active on the intended page/template

If the visible label is only one part of a full-card overlay, make the interaction test target the rendered label area or a point inside the visible label region. Avoid using a generic bounding box for the whole overlay container, because that can pass while missing a broken interaction on the user-facing label itself.

## Review checklist

- Is the visible CTA layer intercepting clicks?
- Is the real interactive element still the topmost click target?
- Does the interaction test click the visible changed area rather than a generic overlay wrapper?
- Is the change scoped only to the requested page?
- Are long labels still readable in constrained widths?
- Is there at least one interaction test, not just style checks?

## Reusable takeaway

For shared Shopify card components, layering and scope are the two failure points to check first:

- layering can silently break navigation
- broad section edits can silently restyle unintended pages

Check both before treating a UI-only card change as safe.
