import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    private readonly dashboardHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        // Initialize locators using Playwright's built-in locator functions
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('.oxd-alert-content-text');
        this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
    }

    // Methods
    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async getErrorMessage() {
        await this.errorMessage.waitFor();
        return await this.errorMessage.textContent();
    }

    async getDashboardTitle() {
        await this.dashboardHeader.waitFor();
        return await this.dashboardHeader.textContent();
    }

    async isErrorMessageDisplayed() {
        return await this.errorMessage.isVisible();
    }
}