import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly cartItems: Locator;
  private readonly itemNames: Locator;
  private readonly itemPrices: Locator;
  private readonly checkoutButton: Locator;
  private readonly pageHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.pageHeading = page.locator('[data-test="title"]');
  }

  /**
   * Get all cart item names
   */
  async getCartItemNames(): Promise<string[]> {
    return await this.itemNames.allTextContents();
  }

  /**
   * Get all item prices in cart
   */
  async getAllItemPrices(): Promise<number[]> {
    const priceTexts = await this.itemPrices.allTextContents();
    return priceTexts.map(text => parseFloat(text.replace('$', '') || '0'));
  }

  /**
   * Calculate subtotal of all items in cart
   */
  async calculateSubtotal(): Promise<number> {
    const prices = await this.getAllItemPrices();
    return prices.reduce((sum, price) => sum + price, 0);
  }

  /**
   * Click checkout button to proceed to checkout
   */
  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /**
   * Get page heading locator (for assertions in tests)
   */
  getPageHeadingLocator(): Locator {
    return this.pageHeading;
  }

  /**
   * Get cart items count
   */
  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }
}