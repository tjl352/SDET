import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  // Global element example (optional)
  getCartLink(): Locator {
    return this.page.getByTestId('shopping-cart-link');
  }

  async openCart() {
    await this.getCartLink().click();
  }
}
