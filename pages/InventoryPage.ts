import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartPage } from './CartPage';

export class InventoryPage extends BasePage {
  cartBadge(): Locator {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  itemCard(name: string): Locator {
    return this.page.locator('.inventory_item').filter({ hasText: name });
  }

  addToCartButton(name: string): Locator {
    return this.itemCard(name).getByRole('button', { name: 'Add to cart' });
  }

  removeButton(name: string): Locator {
    return this.itemCard(name).getByRole('button', { name: 'Remove' });
  }

  async addToCart(name: string) {
    await this.addToCartButton(name).click();
  }

  sortSelect(): Locator {
    return this.page.locator('[data-test="product-sort-container"]');
  }
  
  async sortBy(value: string) {
    await this.sortSelect().selectOption(value);
  }
  
  productNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allInnerTexts();
  }

  // Helper: add product and navigate to cart
  async addProductToCartAndOpenCart(productName: string) {
    await this.addToCart(productName);
    await this.openCart();
    return new CartPage(this.page);
  }
}
