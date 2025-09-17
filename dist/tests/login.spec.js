"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('Login Tests with no auth', () => {
    test_1.test.beforeEach(async ({ page }) => {
        // Navigate to the login page before each test
        await page.goto('https://practicesoftwaretesting.com/auth/login');
        await page.locator('[data-test="email"]').fill('admin@practicesoftwaretesting.com');
        await page.locator('[data-test="password"]').fill('welcome01');
        await page.locator('[data-test="login-submit"]').click();
    });
    (0, test_1.test)('test User lands on MainHomePage', async ({ page }) => {
        await (0, test_1.expect)(page.getByRole('link', { name: 'Practice Software Testing -' })).toBeVisible();
    });
    (0, test_1.test)('User can search for Thor Hammer', async ({ page }) => {
        await page.getByTestId('nav-home').click();
        await page.getByTestId('search-query').fill('Thor Hammer');
        await page.getByTestId('search-submit').click();
        await page.waitForSelector("xpath=//h5[contains(text(),'Thor Hammer')]", { state: 'visible', timeout: 5000 });
        await (0, test_1.expect)(page.locator("xpath=//h5[contains(text(),'Thor Hammer')]")).toBeVisible();
    });
});
test_1.test.describe('Login Tests with Admin auth', () => {
    test_1.test.use({ storageState: '.auth/Admin01.json' });
    test_1.test.beforeEach(async ({ page }) => {
        await page.goto('https://practicesoftwaretesting.com');
    });
    (0, test_1.test)('Admin user lands on main page', async ({ page }) => {
        await (0, test_1.expect)(page.getByRole('link', { name: 'Practice Software Testing -' })).toBeVisible();
    });
    (0, test_1.test)('Admin can search for Thor Hammer', async ({ page }) => {
        await page.getByTestId('nav-home').click();
        const elemSearchQuery = page.getByTestId('search-query');
        await elemSearchQuery.fill('Thor Hammer', { timeout: 10000 });
        await page.getByTestId('search-submit').click();
        await page.waitForSelector("xpath=//h5[contains(text(),'Thor Hammer')]", { state: 'visible', timeout: 5000 });
        await (0, test_1.expect)(page.locator("xpath=(//*[contains(text(),'Thor Hammer')])[1]")).toBeVisible({ timeout: 5000 });
        await (0, test_1.expect)(page).toHaveScreenshot("searchHammer.png");
    });
});
