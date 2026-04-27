const { test, expect } = require('@playwright/test');
const { gotoStorefront } = require('../support/storefront');

function expectedFirstRow(projectName) {
  if (projectName === 'mobile') return [1];
  if (projectName === 'tablet') return [2];
  return [3, 4];
}

test('feature flowers section is responsive when mounted', async ({ page }, testInfo) => {
  await gotoStorefront(page, '/');

  const section = page.getByTestId('feature-flowers').first();
  if ((await section.count()) === 0) {
    test.skip(true, 'Reusable feature flowers section is not mounted in the current storefront preview.');
  }

  await expect(section).toBeVisible();

  const cards = page.getByTestId('feature-flowers-card');
  await expect(cards.first()).toBeVisible();

  const cardCount = await cards.count();
  expect(cardCount).toBeGreaterThan(0);

  const columnsInFirstRow = await cards.evaluateAll((elements) => {
    const rects = elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
      };
    });

    if (!rects.length) return 0;

    return rects.filter((rect) => rect.y === rects[0].y).length;
  });

  expect(expectedFirstRow(testInfo.project.name)).toContain(columnsInFirstRow);

  const buttons = page.getByTestId('feature-flowers-button');
  if ((await buttons.count()) > 0) {
    await expect(buttons.first()).toBeVisible();
  }
});
