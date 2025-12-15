import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  // All cart line items
  items(): Locator {
    return this.page.locator('.cart_item');
  }

  // A single cart line item filtered by product name
  itemByName(name: string): Locator {
    return this.items().filter({ hasText: name });
  }

  // Proceed to checkout
  checkoutButton(): Locator {
    return this.page.locator('[data-test="checkout"]');
  }
}
