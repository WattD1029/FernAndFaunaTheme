const { expect } = require('@playwright/test');

const DEFAULT_STOREFRONT_PASSWORD = 'testing';

const PASSWORD_INPUT_SELECTORS = [
  'input[type="password"]',
  'input[name="password"]',
  '#Password',
  '[data-testid="storefront-password"]',
];

const SUBMIT_CONTROL_SELECTORS = [
  'button[type="submit"]',
  'input[type="submit"]',
  '[data-testid="storefront-password-submit"]',
];

const SUBMIT_CONTROL_NAMES = [/enter/i, /view store/i, /login/i, /log in/i, /submit/i];

function getStoreUrl() {
  const url = process.env.SHOP_URL;
  if (!url) {
    throw new Error('Set SHOP_URL to your Shopify local preview URL before running Playwright tests.');
  }

  return url;
}

function buildStoreUrl(pathname = '/') {
  if (/^https?:\/\//.test(pathname)) {
    return pathname;
  }

  return new URL(pathname, getStoreUrl()).toString();
}

async function firstVisibleLocator(locators) {
  for (const locator of locators) {
    if (await locator.isVisible().catch(() => false)) {
      return locator;
    }
  }

  return null;
}

async function findPasswordInput(page) {
  return firstVisibleLocator(PASSWORD_INPUT_SELECTORS.map((selector) => page.locator(selector).first()));
}

async function findSubmitControl(page) {
  const selectorLocators = SUBMIT_CONTROL_SELECTORS.map((selector) => page.locator(selector).first());
  const roleLocators = SUBMIT_CONTROL_NAMES.map((name) => page.getByRole('button', { name }).first());

  return firstVisibleLocator([...selectorLocators, ...roleLocators]);
}

async function hasPasswordGate(page) {
  return page.url().includes('/password') || Boolean(await findPasswordInput(page));
}

async function unlockStorefront(page) {
  const passwordInput = await findPasswordInput(page);
  const passwordPageVisible = page.url().includes('/password');
  if (!passwordPageVisible && !passwordInput) {
    return;
  }

  const password = process.env.SHOP_PASSWORD || DEFAULT_STOREFRONT_PASSWORD;

  if (!passwordInput) {
    throw new Error('Storefront appears password protected, but no password input was found. Add a stable selector for the storefront password field.');
  }

  await expect(passwordInput, 'Expected a storefront password input before unlocking the preview.').toBeVisible();
  await passwordInput.fill(password);

  const submitButton = await findSubmitControl(page);
  if (!submitButton) {
    throw new Error('Found a storefront password form, but could not find a submit control. Add a stable selector for the password submit button.');
  }

  await Promise.all([
    page.waitForURL((url) => !url.pathname.includes('/password'), { timeout: 30000 }).catch(() => {}),
    submitButton.click(),
  ]);

  await page.waitForLoadState('domcontentloaded');

  if (await hasPasswordGate(page)) {
    throw new Error('Storefront password unlock did not complete after submitting SHOP_PASSWORD. Check SHOP_PASSWORD and the preview password form selectors.');
  }
}

async function gotoStorefront(page, pathname = '/') {
  await page.goto(buildStoreUrl(pathname), { waitUntil: 'domcontentloaded' });
  await unlockStorefront(page);
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
}

async function expectNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => {
    const documentWidth = document.documentElement.scrollWidth;
    const viewportWidth = window.innerWidth;

    return {
      documentWidth,
      viewportWidth,
      hasOverflow: documentWidth > viewportWidth + 1,
    };
  });

  expect(
    overflow.hasOverflow,
    `Expected no horizontal overflow, but document width ${overflow.documentWidth} exceeded viewport width ${overflow.viewportWidth}.`
  ).toBe(false);
}

function productPath() {
  return process.env.PRODUCT_PATH;
}

function collectionPath() {
  return process.env.COLLECTION_PATH;
}

module.exports = {
  gotoStorefront,
  expectNoHorizontalOverflow,
  productPath,
  collectionPath,
};
