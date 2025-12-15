import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {
  itemByName(name: string): Locator {
    return this.page.locator('.cart_item').filter({ hasText: name });
  }

  summaryInfo(): Locator {
    return this.page.locator('.summary_info');
  }

  finishBtn(): Locator {
    return this.page.locator('[data-test="finish"]');
  }

  async finish() {
    await this.finishBtn().click();
  }
}
