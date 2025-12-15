import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

// This test intentionally covers the negative login path. 
// The positive login flow is already exercised implicitly by other tests 
// that require a successful login to proceed.
test('fails login with wrong password', async ({ page }) => {
  const login = new LoginPage(page);

  await login.open();
  await login.loginAs('standard_user', 'wrong_password');

  // Expect: user stays on login page
  await expect(page).toHaveURL(/saucedemo\.com/);

  // Expect: error message appears
  await expect(login.error()).toContainText(
    'Username and password do not match'
  );
});

test('add a product to cart and verify in cart', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);

  // Login
  await login.open();
  await login.loginAs('standard_user', 'secret_sauce');

  // Assert we landed on inventory (kept minimal; still in spec)
  await expect(inventory.itemCard('Sauce Labs Backpack')).toBeVisible();

  // Add to cart
  await inventory.addToCart('Sauce Labs Backpack');

  // Badge shows 1
  await expect(inventory.cartBadge()).toHaveText('1');

  // Open the cart via BasePage helper
  await inventory.openCart();

  // Verify the item is present in the cart
  await expect(cart.itemByName('Sauce Labs Backpack')).toBeVisible();
});
