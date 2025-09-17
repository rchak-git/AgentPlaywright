import { test as setup, expect } from '@playwright/test';

setup('Create Admin Auth', async ({ page, context }) => {
    // Go to login page
    const email = 'admin@practicesoftwaretesting.com';
    const password = 'welcome01';
    const admin01File = '.auth/Admin01.json';

    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await page.locator('[data-test="email"]').fill('admin@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').fill('welcome01');
    await page.locator('[data-test="login-submit"]').click();

    // Save authentication state to .auth file
    await context.storageState({ path: admin01File });
});