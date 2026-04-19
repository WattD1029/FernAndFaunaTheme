const { test, expect } = require('@playwright/test');
const { gotoStorefront, expectNoHorizontalOverflow, productPath } = require('../support/storefront');

test.describe('product page responsive checks', () => {
  test.skip(!productPath(), 'Set PRODUCT_PATH to a stable storefront product path to run product tests.');

  test('product information remains visible across breakpoints', async ({ page }) => {
    await gotoStorefront(page, productPath());

    await expect(page.getByTestId('product-information')).toBeVisible();
    await expect(page.getByTestId('product-information-media')).toBeVisible();
    await expect(page.getByTestId('product-information-details')).toBeVisible();
    await expect(page.getByTestId('standalone-add-to-cart')).toBeVisible();
    await expect(page.locator('h1').first()).toBeVisible();

    await expectNoHorizontalOverflow(page);
  });
});
