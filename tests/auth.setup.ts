import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const authFile = '.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  await loginPage.login(
    process.env.STANDARD_USER || 'standard_user',
    process.env.PASSWORD || 'secret_sauce'
  );
  
  // Wait for successful login
  await page.waitForURL(/.*inventory.html/);
  
  // Save authenticated state
  await page.context().storageState({ path: authFile });
});