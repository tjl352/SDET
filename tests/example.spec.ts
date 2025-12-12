// import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });


import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/?zx=1765560558323&no_sw_cr=1');
  await page.getByRole('img', { name: 'Seasonal Holidays' }).click();
  await expect(page.getByRole('combobox', { name: 'Search' })).toBeEmpty();
  await expect(page.getByRole('img', { name: 'Seasonal Holidays' })).toBeVisible();
});
