import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  let login: LoginPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.open();
  });

  test('shows error on invalid login', async () => {
    await login.loginAs('standard_user', 'wrong_password');
    await expect(login.error()).toContainText('Username and password do not match');
  });

  // Note: Positive login flow is tested implicitly in other test files
  // (inventory, cart, checkout) which all use loginAsStandardUser().
  // This test was not added to keep the total test count at 5 or under.
});