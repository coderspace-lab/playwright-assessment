import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  // Locators
  private readonly inventoryItems: Locator;
  private readonly itemNames: Locator;
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;
  private readonly pageHeading: Locator;
  private readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.pageHeading = page.locator('[data-test="title"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  /**
   * Add product to cart by product name
   */
  async addProductToCart(productName: string): Promise<void> {
    const product = this.inventoryItems.filter({ hasText: productName });
    await product.locator('button').first().click();
  }

  /**
   * Click shopping cart to navigate to cart page
   */
  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  /**
   * Sort products by option
   */
  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  /**
   * Get all product names in current order
   */
  async getAllProductNames(): Promise<string[]> {
    return await this.itemNames.allTextContents();
  }

  /**
   * Get page heading locator (for assertions in tests)
   */
  getPageHeadingLocator(): Locator {
    return this.pageHeading;
  }

  /**
   * Get cart badge locator (for assertions in tests)
   */
  getCartBadgeLocator(): Locator {
    return this.cartBadge;
  }
}