# Playwright UI Testing

Use this setup with a local Shopify preview opened by `shopify theme dev`.

## Environment variables

- `SHOP_URL`: required local Shopify preview URL
- `SHOP_PASSWORD`: optional storefront password if the preview redirects to `/password`. Defaults to `testing` in the Playwright helper.
- `PRODUCT_PATH`: optional product path such as `/products/your-product-handle`
- `COLLECTION_PATH`: optional collection path such as `/collections/all`

## Run tests

```powershell
$env:SHOP_URL="https://your-theme-preview-url"
$env:PRODUCT_PATH="/products/your-product-handle"
$env:COLLECTION_PATH="/collections/all"
npm run test:e2e
```

Run a single viewport project:

```powershell
npm run test:e2e:mobile
npm run test:e2e:tablet
npm run test:e2e:desktop
```

## OpenCode workflow

For every UI enhancement, this workflow is mandatory:

1. Start `shopify theme dev`.
2. Set `SHOP_URL` to the preview URL.
3. Use the OpenCode `playwright` MCP server to inspect the affected page or flow before editing.
4. Verify the enhancement at all required breakpoints:
   - mobile: `375x812`
   - tablet: `768x1024`
   - desktop: `1440x900`
5. Add or update a spec in `tests/`.
6. Run the relevant spec across all three projects:

```powershell
npm run test:e2e:mobile
npm run test:e2e:tablet
npm run test:e2e:desktop
```

Use Playwright MCP for inspection and selector discovery. Use the Playwright test suite as the regression gate for responsive UI behavior.

## Current specs

- `tests/smoke/storefront-smoke.spec.js`: homepage header, hero, and featured product section
- `tests/header/header-menu.spec.js`: header navigation behavior by breakpoint
- `tests/product/product-information.spec.js`: product information layout
- `tests/collection/product-grid.spec.js`: collection product grid visibility
