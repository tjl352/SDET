import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test.describe('Store', () => {
  let login: LoginPage;
  let inventory: InventoryPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    inventory = new InventoryPage(page);
    await login.loginAsStandardUser();
  });

  test('sorts inventory by name Z → A', async () => {
    const originalNames = await inventory.productNames();
    await inventory.sortBy('za');
    const sortedNames = await inventory.productNames();
    const expectedNames = [...originalNames].sort().reverse();
    
    await expect(sortedNames).toEqual(expectedNames);
  });

  test('adds a product and shows it in cart', async () => {
    const product = 'Sauce Labs Backpack';
    const cart = await inventory.addProductToCartAndOpenCart(product);

    await expect(inventory.cartBadge()).toHaveText('1');
    await expect(cart.itemByName(product)).toBeVisible();
  });

  test('checkout information submits and proceeds to overview', async ({ page }) => {
    const product = 'Sauce Labs Backpack';
    await inventory.addProductToCartAndOpenCart(product);
    const info = await new CartPage(page).proceedToCheckout();
    const overview = await info.fillAndContinue('Jane', 'Doe', '12345');

    await expect(page).toHaveURL(/checkout-step-two\.html$/);
    await expect(overview.itemByName(product)).toBeVisible();
    await expect(overview.finishBtn()).toBeVisible();
  });

  test('completes checkout flow', async ({ page }) => {
    const product = 'Sauce Labs Backpack';
    await inventory.addProductToCartAndOpenCart(product);
    const info = await new CartPage(page).proceedToCheckout();
    const overview = await info.fillAndContinue('Jane', 'Doe', '12345');
    await overview.finish();

    const complete = new CheckoutCompletePage(page);
    await expect(page).toHaveURL(/checkout-complete\.html$/);
    await expect(complete.completeHeader()).toHaveText('Thank you for your order!');
    await expect(complete.completeText()).toBeVisible();
    await expect(complete.backHomeBtn()).toBeVisible();
  });
});