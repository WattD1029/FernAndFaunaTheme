---
title: Shopify preview deep links in Playwright can silently load the wrong theme
category: workflow-issues
date: 2026-04-27
type: knowledge
tags:
  - shopify
  - playwright
  - preview-theme
  - testing
  - storefront
---

# Shopify preview deep links in Playwright can silently load the wrong theme

## Problem

Playwright storefront tests were pointed at a Shopify preview URL using `SHOP_URL`, but relative navigation like `'/pages/about-us'` silently dropped the preview context and loaded the wrong storefront theme.

## Symptoms

- The browser-based manual inspection showed the new About page layout correctly.
- The automated About spec could not find new selectors such as `data-testid="about-welcome"`.
- Failing test snapshots showed the published storefront instead of the active preview theme.
- The failure looked like a selector or rendering bug even though the implementation was present in the preview.

## What Didn’t Work

- Using `new URL(pathname, getStoreUrl())` by itself.
- Passing a shared preview URL in `SHOP_URL` and assuming deep links would keep the same preview theme.
- Debugging the failure only at the selector level.

## Solution

Update the shared storefront test helper so preview context survives relative navigation:

1. Preserve query parameters from `SHOP_URL` when building a relative storefront URL.
2. If `SHOP_URL` includes preview query params and the test is navigating to a different relative path, visit the preview root first.
3. Let Shopify establish the preview cookie before navigating to the target path.

Relevant implementation area:

- `tests/support/storefront.js`

## Why This Works

Shared Shopify preview links are not only URL-based. In practice, deep links may depend on preview state established from the preview root. Preserving preview query params avoids losing explicit preview identifiers, and priming the preview root lets Shopify set the cookie or session state needed for later route navigation to stay on the active theme.

## Prevention

- Treat `SHOP_URL` with search params as stateful, not just a plain base URL.
- When Playwright helpers accept relative storefront paths, preserve preview query params by default.
- For preview-theme tests, verify at least one known preview-only selector before assuming a selector regression.
- If a test failure suggests a missing element after a theme change, check whether the test loaded the intended preview theme before changing selectors.

## Related Docs

- `docs/solutions/collection-card-overlay-click-target-and-scope.md`
  This is low-overlap but shares the same general lesson: UI test failures can come from environment or scope assumptions, not only component bugs.

## Reusable Insight

For Shopify Playwright coverage, deep-link navigation is part of the system under test. If the preview theme is identified by query params or cookies, shared navigation helpers must preserve both or tests can silently validate the wrong storefront.

## Compound Summary

The About page implementation was correct, but automated verification initially failed because preview-theme state was lost during relative navigation. The durable fix was to move preview awareness into the shared Playwright storefront helper rather than patching individual specs.
