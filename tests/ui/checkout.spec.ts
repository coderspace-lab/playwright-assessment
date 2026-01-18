import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout Flow Tests', () => {
  
  test('Validate full checkout with two items and final price', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    // Navigate to inventory page (already authenticated via fixture)
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(inventoryPage.getPageHeadingLocator()).toHaveText('Products');
    
    // Add two items to cart
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    
    // Verify cart badge shows 2 items
    await expect(inventoryPage.getCartBadgeLocator()).toHaveText('2');
    
    // Go to cart
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart.html/);
    await expect(cartPage.getPageHeadingLocator()).toHaveText('Your Cart');
    
    // Verify both items are in cart
    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames).toContain('Sauce Labs Backpack');
    expect(itemNames).toContain('Sauce Labs Bike Light');
    
    // Get cart subtotal for validation
    const cartSubtotal = await cartPage.calculateSubtotal();
    expect(cartSubtotal).toBeGreaterThan(0);
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    await expect(checkoutPage.getPageHeadingLocator()).toHaveText('Checkout: Your Information');
    
    // Fill customer info
    await checkoutPage.fillCustomerInfo('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    
    // Verify on overview page
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await expect(checkoutPage.getPageHeadingLocator()).toHaveText('Checkout: Overview');
    
    // Validate prices
    const checkoutSubtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();
    
    // Verify subtotal matches cart
    expect(checkoutSubtotal).toBe(cartSubtotal);
    
    // Verify total = subtotal + tax
    expect(total).toBeCloseTo(checkoutSubtotal + tax, 2);
    
    // Complete checkout
    await checkoutPage.clickFinish();
    
    // Verify checkout complete
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    await expect(checkoutPage.getPageHeadingLocator()).toHaveText('Checkout: Complete!');
    await expect(checkoutPage.getCompleteHeaderLocator()).toHaveText('Thank you for your order!');
  });
});