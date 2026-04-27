const { test, expect } = require('@playwright/test');
const { gotoStorefront, expectNoHorizontalOverflow } = require('../support/storefront');

test('homepage surfaces key sections across breakpoints', async ({ page }) => {
  await gotoStorefront(page, '/');
  const homeDecorationSection = page
    .getByTestId('product-list')
    .filter({ has: page.getByRole('heading', { name: 'Home Decoration' }) })
    .first();

  await expect(page.locator('[data-testid="header-logo"], [data-testid="header-logo-inverse"]').first()).toBeVisible();
  await expect(page.getByTestId('hero-media-wrapper').first()).toBeVisible();
  await expect(page.getByTestId('product-information').first()).toBeVisible();
  await expect(homeDecorationSection).toBeVisible();
  await expect(homeDecorationSection.locator('a[href*="/products/"]').first()).toBeVisible();

  await expectNoHorizontalOverflow(page);
});
