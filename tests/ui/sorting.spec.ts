import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Product Sorting Tests', () => {
  
  test('Validate sorting items by name Z-A', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    
    // Navigate to inventory page (already authenticated via fixture)
    await page.goto('/inventory.html');
    
    // Verify we're on inventory page
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(inventoryPage.getPageHeadingLocator()).toHaveText('Products');
    
    // Sort by name Z-A
    await inventoryPage.sortBy('za');
    
    // Get all product names after sorting
    const productNames = await inventoryPage.getAllProductNames();
    
    // Create a sorted copy to compare
    const expectedOrder = [...productNames].sort((a, b) => b.localeCompare(a));
    
    // Verify the order matches Z-A sorting
    expect(productNames).toEqual(expectedOrder);
  });
});