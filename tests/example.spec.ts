import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test('fails login with wrong password', async ({ page }) => {
  const login = new LoginPage(page);
  await login.open();
  await login.loginAs('standard_user', 'wrong_password');

  // Expect: user stays on login page
  await expect(page).toHaveURL(/saucedemo\.com/);
  await expect(login.error()).toContainText(
    'Username and password do not match'
  );
});

test('inventory filters by name Z to A', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.loginAsStandardUser();
  const originalNames = await inventory.productNames();
  await inventory.sortBy('za');
  const sortedNames = await inventory.productNames();
  const expectedNames = [...originalNames].sort().reverse();
  
  await expect(sortedNames).toEqual(expectedNames);
});

test('add a product to cart and verify in cart', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const product = 'Sauce Labs Backpack';

  await login.loginAsStandardUser();
  const cart = await inventory.addProductToCartAndOpenCart(product);

  await expect(inventory.cartBadge()).toHaveText('1');
  await expect(cart.itemByName(product)).toBeVisible();
});

test('checkout information submits and proceeds to overview', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const product = 'Sauce Labs Backpack';

  await login.loginAsStandardUser();
  await inventory.addProductToCartAndOpenCart(product);
  const info = await new CartPage(page).proceedToCheckout();
  await info.fillAndContinue('Jane', 'Doe', '12345');

  // On the overview step, the item should be present and the Finish button should be visible
  const overviewItem = page.locator('.cart_item').filter({ hasText: product });
  const finishBtn = page.locator('[data-test="finish"]');

  await expect(page).toHaveURL(/checkout-step-two\.html$/);
  await expect(overviewItem).toBeVisible();
  await expect(finishBtn).toBeVisible();
});

test('checkout overview and complete', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const product = 'Sauce Labs Backpack';

  await login.loginAsStandardUser();
  await inventory.addProductToCartAndOpenCart(product);
  const info = await new CartPage(page).proceedToCheckout();
  const overview = await info.fillAndContinue('Jane', 'Doe', '12345');
  await overview.finish();

  // Validates the end of the checkout flow: overview shows the item, finish completes the order.
  const complete = new CheckoutCompletePage(page);
  await expect(page).toHaveURL(/checkout-complete\.html$/);
  await expect(complete.completeHeader()).toHaveText('Thank you for your order!');
  await expect(complete.completeText()).toBeVisible(); // confirmation body text
  await expect(complete.backHomeBtn()).toBeVisible();  // back button present
});
