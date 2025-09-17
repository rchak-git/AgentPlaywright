"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProduct = exports.loginUser = exports.clickButton = exports.fillInput = void 0;
// Fill input field
const fillInput = async (page, selector, value) => {
    await page.fill(selector, value);
};
exports.fillInput = fillInput;
// Click a button
const clickButton = async (page, selector) => {
    await page.click(selector);
};
exports.clickButton = clickButton;
// Login function
const loginUser = async (page, locators, user) => {
    await (0, exports.fillInput)(page, locators.usernameInput, user.username);
    await (0, exports.fillInput)(page, locators.passwordInput, user.password);
    await (0, exports.clickButton)(page, locators.loginButton);
};
exports.loginUser = loginUser;
const searchProduct = async (page, searchInput, searchButton, productName) => {
    await (0, exports.fillInput)(page, searchInput, productName);
    await (0, exports.clickButton)(page, searchButton);
};
exports.searchProduct = searchProduct;
