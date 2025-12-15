import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  items(): Locator {
    return this.page.locator('.cart_item');
  }

  itemByName(name: string): Locator {
    return this.items().filter({ hasText: name });
  }

  checkoutButton(): Locator {
    return this.page.locator('[data-test="checkout"]');
  }
}
