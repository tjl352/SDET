import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  // Top-right cart badge ("1", "2", etc.)
  cartBadge(): Locator {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  // A single product card filtered by product name
  itemCard(name: string): Locator {
    return this.page.locator('.inventory_item').filter({ hasText: name });
  }

  // The "Add to cart" button inside a specific product card
  addToCartButton(name: string): Locator {
    return this.itemCard(name).getByRole('button', { name: 'Add to cart' });
  }

  // The "Remove" button after adding
  removeButton(name: string): Locator {
    return this.itemCard(name).getByRole('button', { name: 'Remove' });
  }

  // Action: add a specific product to the cart by its display name
  async addToCart(name: string) {
    await this.addToCartButton(name).click();
  }
}
