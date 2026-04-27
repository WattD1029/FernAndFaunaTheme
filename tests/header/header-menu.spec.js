const { test, expect } = require('@playwright/test');
const { gotoStorefront, expectNoHorizontalOverflow } = require('../support/storefront');

test('header navigation remains usable across breakpoints', async ({ page }) => {
  await gotoStorefront(page, '/');

  await expect(page.locator('[data-testid="header-logo"], [data-testid="header-logo-inverse"]').first()).toBeVisible();

  const viewport = page.viewportSize();
  if (viewport && viewport.width < 750) {
    const menuButton = page.getByLabel(/menu/i).first();
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await expect(page.locator('.menu-drawer__navigation').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /close/i }).first()).toBeVisible();
  } else {
    const headerMenu = page.locator('header-menu').first();
    await expect(headerMenu).toBeVisible();

    const firstMenuItem = headerMenu.locator('[ref="menuitem"]').first();
    await expect(firstMenuItem).toBeVisible();

    const expandableMenuItem = headerMenu.locator('[ref="menuitem"][aria-controls^="submenu-"]').first();
    if (await expandableMenuItem.count()) {
      const submenuId = await expandableMenuItem.getAttribute('aria-controls');
      await expandableMenuItem.hover();

      if (submenuId) {
        await expect(page.locator(`#${submenuId}`)).toBeVisible();
      }
    }
  }

  await expectNoHorizontalOverflow(page);
});
