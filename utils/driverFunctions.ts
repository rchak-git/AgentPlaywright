import { Page } from '@playwright/test';
import { LoginPageLocators, UserCredentials } from '../types/types';

// Fill input field
export const fillInput = async (
  page: Page,
  selector: string,
  value: string
): Promise<void> => {
  await page.fill(selector, value);
};

// Click a button
export const clickButton = async (
  page: Page,
  selector: string
): Promise<void> => {
  await page.click(selector);
};

// Login function
export const loginUser = async (
  page: Page,
  locators: LoginPageLocators,
  user: UserCredentials
): Promise<void> => {
  await fillInput(page, locators.usernameInput, user.username);
  await fillInput(page, locators.passwordInput, user.password);
  await clickButton(page, locators.loginButton);
};


export const searchProduct= async(
    page: Page,
    searchInput: string,
    searchButton: string,
    productName: string): Promise<void>=>{
        await fillInput(page, searchInput, productName);
        await clickButton(page, searchButton);
    }
