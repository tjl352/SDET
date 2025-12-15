import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutInformationPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueBtn: Locator;
  readonly cancelBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    this.cancelBtn = page.locator('[data-test="cancel"]');
  }

  async fill(first: string, last: string, zip: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
  }

  async continue() {
    await this.continueBtn.click();
  }
}
