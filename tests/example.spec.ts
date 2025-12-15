import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('logs in with standard_user', async ({ page }) => {
  const login = new LoginPage(page);

  await login.open();
  await login.loginAs('standard_user', 'secret_sauce');

  await expect(login.inventoryList()).toBeVisible();
});
