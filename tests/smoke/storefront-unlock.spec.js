const { test, expect } = require('@playwright/test');
const { gotoStorefront } = require('../support/storefront');

test('storefront becomes accessible after unlock when required', async ({ page }) => {
  await gotoStorefront(page, '/');

  await expect(page).not.toHaveURL(/\/password(?:[/?#]|$)/);
  await expect(page.locator('[data-testid="header-logo"], [data-testid="header-logo-inverse"]').first()).toBeVisible();
});
