import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
  completeHeader(): Locator {
    return this.page.locator('[data-test="complete-header"]');
  }

  completeText(): Locator {
    return this.page.locator('.complete-text');
  }

  backHomeBtn(): Locator {
    return this.page.locator('[data-test="back-to-products"]');
  }
}
