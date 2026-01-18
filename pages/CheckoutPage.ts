import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  // Step 1: Customer Information
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  
  // Step 2: Order Overview
  private readonly subtotalLabel: Locator;
  private readonly taxLabel: Locator;
  private readonly totalLabel: Locator;
  private readonly finishButton: Locator;
  
  // Step 3: Complete
  private readonly completeHeader: Locator;
  private readonly completeText: Locator;
  
  // Common
  private readonly pageHeading: Locator;

  constructor(page: Page) {
    super(page);
    // Step 1 locators
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    
    // Step 2 locators
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    
    // Step 3 locators
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    
    // Common
    this.pageHeading = page.locator('[data-test="title"]');
  }

  /**
   * Fill in customer information (Step 1)
   */
  async fillCustomerInfo(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Click continue to proceed to overview (Step 1 → Step 2)
   */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Get subtotal amount (Step 2)
   */
  async getSubtotal(): Promise<number> {
    const text = await this.subtotalLabel.textContent();
    // Format: "Item total: $39.98"
    const match = text?.match(/\$(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Get tax amount (Step 2)
   */
  async getTax(): Promise<number> {
    const text = await this.taxLabel.textContent();
    // Format: "Tax: $3.20"
    const match = text?.match(/\$(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Get total amount (Step 2)
   */
  async getTotal(): Promise<number> {
    const text = await this.totalLabel.textContent();
    // Format: "Total: $43.18"
    const match = text?.match(/\$(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Click finish to complete order (Step 2 → Step 3)
   */
  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  /**
   * Get page heading locator (for assertions)
   */
  getPageHeadingLocator(): Locator {
    return this.pageHeading;
  }

  /**
   * Get complete header locator (for assertions)
   */
  getCompleteHeaderLocator(): Locator {
    return this.completeHeader;
  }

  /**
   * Get complete text locator (for assertions)
   */
  getCompleteTextLocator(): Locator {
    return this.completeText;
  }
}