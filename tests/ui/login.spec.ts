import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';


// Override to NOT use authenticated state - start fresh
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Tests', () => {
  
  test('Validate failed login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    await loginPage.login('invalid_user', 'wrong_password');
    
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Epic sadface: Username and password do not match');
  });
});