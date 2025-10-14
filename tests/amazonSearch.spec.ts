import { test, expect } from '@playwright/test';

// Configure test to run in headed mode
test.use({ headless: false });


    test.only('Search for a product and verify results', async ({ page }) => {
        // Navigate to Amazon
        await page.goto('https://www.amazon.com');
        
        // Define the search term
        const searchTerm = 'iPhone 15 case';

        // Locate and click the search box
        await page.pause();
        const searchBox = page.getByPlaceholder('Search Amazon');
        await searchBox.click();
        
        // Type the search term
        await searchBox.fill(searchTerm);
        
        // Click search button or press Enter
        const searchButton = page.getByRole('button', { name: 'Search' });
        await searchButton.click();

        // Wait for search results to load and verify
        const searchResults = page.locator('#search');
        await expect(searchResults).toBeVisible({ timeout: 10000 });

        // Verify search results contain our search term
        // Using case-insensitive comparison for better reliability
        const resultsText = await searchResults.innerText();
        expect(resultsText.toLowerCase()).toContain('iphone');
        expect(resultsText.toLowerCase()).toContain('case');

        // Verify that at least one product card/result is visible
        const productResults = page.locator('[data-component-type="s-search-result"]');
        await expect(productResults.first()).toBeVisible();

        // Log the number of results found
        const resultCount = await productResults.count();
        console.log(`Found ${resultCount} product results`);

        // Optional: Take a screenshot of the search results
        await page.screenshot({ 
            path: 'amazon-search-results.png',
            fullPage: false 
        });

        // Verify the page title contains our search term
        await expect(page).toHaveTitle(new RegExp(searchTerm, 'i'));
    });
