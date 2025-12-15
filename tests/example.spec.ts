import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
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

test('add a product to cart and verify in cart', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);

  const product = 'Sauce Labs Backpack';

  await login.open();
  await login.loginAs('standard_user', 'secret_sauce');
  await inventory.addToCart(product);
  await inventory.openCart();

  await expect(inventory.cartBadge()).toHaveText('1');
  await expect(cart.itemByName(product)).toBeVisible();
});

test('checkout information submits and proceeds to overview', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const info = new CheckoutInformationPage(page);

  const product = 'Sauce Labs Backpack';

  await login.open();
  await login.loginAs('standard_user', 'secret_sauce');
  await inventory.addToCart(product);
  await inventory.openCart();
  await cart.checkoutButton().click();

  await info.fill('Jane', 'Doe', '12345');
  await info.continue();

  // On the overview step, the item should be present and the Finish button should be visible
  const overviewItem = page.locator('.cart_item').filter({ hasText: product });
  const finishBtn = page.locator('[data-test="finish"]');

  await expect(page).toHaveURL(/checkout-step-two\.html$/);
  await expect(overviewItem).toBeVisible();
  await expect(finishBtn).toBeVisible();
});

// Validates the end of the checkout flow: overview shows the item, finish completes the order.
test('checkout overview and complete', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const info = new CheckoutInformationPage(page);
  const overview = new CheckoutOverviewPage(page);
  const complete = new CheckoutCompletePage(page);

  const product = 'Sauce Labs Backpack';

  await login.open();
  await login.loginAs('standard_user', 'secret_sauce');
  await inventory.addToCart(product);
  await inventory.openCart();
  await cart.checkoutButton().click();
  await info.fill('Jane', 'Doe', '12345');
  await info.continue();
  await overview.finish();

  await expect(page).toHaveURL(/checkout-complete\.html$/);
  await expect(complete.completeHeader()).toHaveText('Thank you for your order!');
  await expect(complete.completeText()).toBeVisible(); // confirmation body text
  await expect(complete.backHomeBtn()).toBeVisible();  // back button present
});
