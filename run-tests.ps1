# Step 1: Clean old reports
Write-Host "Cleaning old Playwright and Allure results..."
if (Test-Path "allure-results") {
    Remove-Item -Recurse -Force "allure-results\*"
}
if (Test-Path "playwright-report") {
    Remove-Item -Recurse -Force "playwright-report\*"
}

# Step 2: Run Playwright tests
Write-Host "Running Playwright tests..."
npx playwright test --headed

# Step 3: Serve Allure report
Write-Host "Serving fresh Allure report..."
npx allure serve allure-results
