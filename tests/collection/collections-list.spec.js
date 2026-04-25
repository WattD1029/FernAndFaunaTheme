const { test, expect } = require('@playwright/test');
const { gotoStorefront, expectNoHorizontalOverflow } = require('../support/storefront');

test.describe('all collections page responsive checks', () => {
  test.skip(!process.env.SHOP_URL, 'Set SHOP_URL to your Shopify local preview URL before running collections list tests.');

  test('collection cards show the collection name on the image bottom across breakpoints', async ({ page }) => {
    await gotoStorefront(page, '/collections/all');

    const collectionList = page.getByTestId('collections-list-grid');
    const firstCollectionCard = collectionList.locator('.collection-card').first();
    const firstCollectionCardLink = firstCollectionCard.locator('.collection-card__link');
    const firstCollectionCardInner = firstCollectionCard.locator('.collection-card__inner');
    const firstCollectionCardContent = firstCollectionCard.locator('.collection-card__content');

    await expect(collectionList).toBeVisible();
    await expect(collectionList.locator('.resource-list__item').first()).toBeVisible();
    await expect(firstCollectionCard).toBeVisible();
    await expect(firstCollectionCardLink).toBeVisible();
    await expect(firstCollectionCardInner).toBeVisible();
    await expect(firstCollectionCardContent).toBeVisible();

    const cardStyles = await firstCollectionCard.evaluate((element) => {
      const innerStyles = getComputedStyle(element.querySelector('.collection-card__inner'));
      const contentStyles = getComputedStyle(element.querySelector('.collection-card__content'));
      const contentAfterStyles = getComputedStyle(element.querySelector('.collection-card__content'), '::after');

      return {
        borderRadius: Number.parseFloat(innerStyles.borderTopLeftRadius),
        borderTopWidth: Number.parseFloat(innerStyles.borderTopWidth),
        borderTopStyle: innerStyles.borderTopStyle,
        boxShadow: innerStyles.boxShadow,
        contentPosition: contentStyles.position,
        contentDisplay: contentStyles.display,
        contentJustifyContent: contentStyles.justifyContent,
        contentPointerEvents: contentStyles.pointerEvents,
        contentMinHeight: Number.parseFloat(contentStyles.minHeight),
        contentLeft: contentStyles.left,
        contentRight: contentStyles.right,
        contentBottom: contentStyles.bottom,
        afterContent: contentAfterStyles.content,
        textColor: contentStyles.color,
      };
    });

    expect(cardStyles.borderRadius).toBeGreaterThan(0);
    expect(cardStyles.borderTopWidth).toBeGreaterThan(0);
    expect(cardStyles.borderTopStyle).toBe('solid');
    expect(cardStyles.boxShadow).not.toBe('none');
    expect(cardStyles.contentPosition).toBe('absolute');
    expect(cardStyles.contentDisplay).toBe('flex');
    expect(cardStyles.contentJustifyContent).toBe('flex-end');
    expect(cardStyles.contentPointerEvents).toBe('none');
    expect(cardStyles.contentMinHeight).toBeGreaterThanOrEqual(44);
    expect(cardStyles.contentLeft).toBe('0px');
    expect(cardStyles.contentRight).toBe('0px');
    expect(cardStyles.contentBottom).toBe('0px');
    expect(cardStyles.afterContent).toBe('none');
    expect(cardStyles.textColor).not.toBe('rgba(0, 0, 0, 0)');

    await expectNoHorizontalOverflow(page);

    const labelBounds = await firstCollectionCardContent.boundingBox();
    expect(labelBounds).not.toBeNull();

    await page.mouse.click(labelBounds.x + 20, labelBounds.y + 20);
    await expect(page).toHaveURL(/\/collections\/all-bouquets/);
  });
});
