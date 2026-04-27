const { test, expect } = require('@playwright/test');
const { gotoStorefront, expectNoHorizontalOverflow, collectionPath } = require('../support/storefront');

test.describe('collection page responsive checks', () => {
  test.skip(!collectionPath(), 'Set COLLECTION_PATH to a stable storefront collection path to run product grid tests.');

  test('product grid stays visible across breakpoints', async ({ page }) => {
    await gotoStorefront(page, collectionPath());

    const productList = page.getByTestId('product-list');
    const resourceListGrid = page.getByTestId('resource-list-grid');
    const firstProductCard = page.locator('product-card').first();
    const firstProductCardContent = firstProductCard.locator('.product-card__content');
    const firstProductCardGallery = firstProductCard.locator('.card-gallery');

    await expect(productList).toBeVisible();
    await expect(resourceListGrid).toBeVisible();
    await expect(resourceListGrid.locator('.resource-list__item').first()).toBeVisible();
    await expect(firstProductCard).toBeVisible();
    await expect(firstProductCardContent).toBeVisible();
    await expect(firstProductCardGallery).toHaveAttribute('data-image-ratio', 'portrait');

    const cardStyles = await firstProductCardContent.evaluate((element) => {
      const styles = getComputedStyle(element);

      return {
        borderRadius: Number.parseFloat(styles.borderTopLeftRadius),
        boxShadow: styles.boxShadow,
      };
    });

    expect(cardStyles.borderRadius).toBeGreaterThan(0);
    expect(cardStyles.boxShadow).not.toBe('none');

    await expectNoHorizontalOverflow(page);
  });
});
