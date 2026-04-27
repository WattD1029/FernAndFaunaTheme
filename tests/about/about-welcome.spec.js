const { test, expect } = require('@playwright/test');
const { aboutPath, expectNoHorizontalOverflow, gotoStorefront } = require('../support/storefront');

function expectedColumns(projectName) {
  if (projectName === 'desktop') return 2;
  return 1;
}

function expectedFeatureColumns(projectName) {
  if (projectName === 'mobile') return 1;
  return 2;
}

async function countColumns(locator, selector) {
  return locator.evaluate((element, childSelector) => {
    const children = Array.from(element.querySelectorAll(childSelector));
    const topPositions = children.map((child) => Math.round(child.getBoundingClientRect().top));

    return new Set(topPositions).size === 1 ? children.length : 1;
  }, selector);
}

test('about welcome section keeps the editorial split layout', async ({ page }, testInfo) => {
  test.skip(!process.env.SHOP_URL, 'Set SHOP_URL to run About Us page coverage.');

  await gotoStorefront(page, aboutPath() || '/pages/about-us');

  const section = page.getByTestId('about-welcome');
  await expect(section).toBeVisible();

  await expect(section.getByRole('heading', { level: 2 })).toContainText('Where Nature Meets Intention');

  const intro = section.getByTestId('about-welcome-intro');
  const body = section.getByTestId('about-welcome-body');
  await expect(intro).toBeVisible();
  await expect(body).toBeVisible();

  const columns = await countColumns(section.locator('.about-welcome__panel'), '.about-welcome__panel > *');

  expect(columns).toBe(expectedColumns(testInfo.project.name));

  const button = section.getByRole('link', { name: 'Shop all bouquets' });
  await expect(button).toBeVisible();
  await expect(button).toHaveAttribute('href', /\/collections\/all/);

  const storySection = page.locator('.about-story-layout').first();
  await expect(storySection).toBeVisible();
  await expect(storySection.getByRole('heading', { name: 'Our Story' })).toBeVisible();
  await expect(storySection.locator('.text-block').nth(1)).toBeVisible();

  const featureGrid = page.locator('.about-feature-grid').first();
  await expect(featureGrid).toBeVisible();
  await expect(featureGrid.getByRole('heading', { name: 'What We Offer' })).toBeVisible();
  await expect(featureGrid.getByRole('heading', { name: 'Our Promises' })).toBeVisible();

  const featureColumns = await countColumns(featureGrid.locator('[data-testid="section-content"]'), '.group-block');
  expect(featureColumns).toBe(expectedFeatureColumns(testInfo.project.name));

  await expectNoHorizontalOverflow(page);
});
