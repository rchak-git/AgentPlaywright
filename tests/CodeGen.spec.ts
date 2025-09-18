import { test, expect } from '@playwright/test';

test.only('test', async ({ page }) => {
    
  await page.goto('https://playwright.dev/');
  await page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('API Testing');
  await page.getByRole('link', { name: 'API testing', exact: true }).click();
  await expect(page.locator('h1')).toContainText('API testing');
  await page.pause();

  await expect(page
    .getByRole('listitem'))
    .toHaveText(['apple', 'banana', 'orange']);
});