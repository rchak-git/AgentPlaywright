import { test, expect } from '@playwright/test';
import { searchProduct } from '../utils/driverFunctions';

test('Search for a product on Spree Commerce', async ({ page }) => {
  // Navigate to the Spree Commerce demo site
  await page.goto('https://demo.spreecommerce.org/');
  
  // Wait for the page to load completely
  await page.waitForLoadState('networkidle');

  // Click the search icon/button with caption "SEARCH"
  await page.getByRole('button', { name: 'SEARCH' }).click();

  // Wait for and fill the search input
  const searchInput = page.getByPlaceholder('Search');
  await searchInput.waitFor({ state: 'visible' });
  await searchInput.fill('shirt');
  await searchInput.press('Enter');

  // Wait for search results to load
  await page.waitForLoadState('networkidle');

  // Verify that we're on the search results page
  await expect(page).toHaveURL(/.*\/search.*/);
  await page.keyboard.press("Escape");
  console.log("Syanora");
});





