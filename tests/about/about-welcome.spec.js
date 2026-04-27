const { test, expect } = require('@playwright/test');
const { aboutPath, expectNoHorizontalOverflow, gotoStorefront } = require('../support/storefront');

function expectedColumns(projectName) {
  if (projectName === 'desktop') return 2;
  return 1;
}

test('about welcome section keeps the editorial split layout', async ({ page }, testInfo) => {
  test.skip(!process.env.SHOP_URL || !aboutPath(), 'Set SHOP_URL and ABOUT_PATH to run About Us page coverage.');

  await gotoStorefront(page, aboutPath());

  const section = page.locator('.about-welcome-layout').first();
  await expect(section).toBeVisible();

  await expect(section.getByRole('heading', { level: 2 })).toContainText('Where Nature Meets Intention');

  const intro = section.locator('.block').nth(0);
  const body = section.locator('.block').nth(1);
  await expect(intro).toBeVisible();
  await expect(body).toBeVisible();

  const columns = await section.evaluate((element) => {
    const children = Array.from(element.querySelectorAll('.block'));
    const topPositions = children.map((child) => Math.round(child.getBoundingClientRect().top));

    return new Set(topPositions).size === 1 ? children.length : 1;
  });

  expect(columns).toBe(expectedColumns(testInfo.project.name));

  const button = section.getByRole('link', { name: 'Shop all bouquets' });
  await expect(button).toBeVisible();
  await expect(button).toHaveAttribute('href', /\/collections\/all/);

  await expectNoHorizontalOverflow(page);
});
