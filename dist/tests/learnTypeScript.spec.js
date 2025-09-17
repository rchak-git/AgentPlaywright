"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const TestClass_1 = require("./pages/TestClass");
const LinkList_1 = require("../utils/LinkList");
(0, test_1.test)('Working with Arrays and Assertions', async ({ page }) => {
    let browsers = ['Chrome', 'Firefox', 'Edge', 'WebKit'];
    await page.goto("https://playwright.dev/");
    await page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();
    for (const browser of browsers) {
        // Fill search input
        const searchBox = page.getByRole('searchbox', { name: 'Search' });
        await searchBox.fill(browser);
        // Assert searchBox has the correct value
        await (0, test_1.expect)(searchBox).toHaveValue(browser);
        // Assert results are visible
        const results = page.locator('.DocSearch-Hit');
        await (0, test_1.expect)(results.first()).toBeVisible();
        console.log(`✅ Verified search results for: ${browser}`);
        await page.waitForTimeout(500);
        await page.getByRole('button', { name: 'Clear the query' }).click;
    }
    console.log(`Total searches done: ${browsers.length}`);
});
(0, test_1.test)('Working with Arrays', async ({ page }) => {
    let products = ['Test Runner', 'API Testing', 'Playwright Inspector'];
    await page.goto("https://playwright.dev/");
    products.push('Codegen');
    console.log(products);
    let newProducts = products.slice(0, 3);
    console.log(newProducts);
    for (const product of products) {
        await page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();
        // Fill search input    
        const searchBox = page.getByRole('searchbox', { name: 'Search' });
        await searchBox.click();
        await searchBox.fill(product);
        // Assert searchBox has the correct value
        await (0, test_1.expect)(searchBox).toHaveValue(product);
        // await page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();
        await page.waitForLoadState('networkidle');
        const locator = page.locator(`//a[contains(normalize-space(.), "${product}")]`).first();
        await (0, test_1.expect)(locator).toBeVisible();
        await page.keyboard.press('Escape');
    }
});
(0, test_1.test)('Learning Typescript basics', async ({ page }) => {
    let name = "Max";
    let hobbies;
    hobbies = ["hello", "Bye"];
    console.log(`name is ${name}`);
    console.log(hobbies);
});
(0, test_1.test)('Array as Generic type', async ({ page }) => {
    let hobbies;
    hobbies = ["hello", "Bye"];
    hobbies = [...hobbies, "New String"];
    console.log(hobbies);
});
(0, test_1.test)('Array as Tuple type', async ({ page }) => {
    let hobbies;
    hobbies = [1, "Hello"];
    console.log(hobbies);
});
(0, test_1.test)('Working with Record type', async ({ page }) => {
    // let browsers: string[] = ['Chrome', 'Firefox', 'Edge', 'WebKit'];
    let browsers;
    browsers = {
        chrome: "chrome",
        Firefox: "Firefox",
        Edge: "Edge",
        WebKit: "WebKit"
    };
    await page.goto("https://playwright.dev/");
    await page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();
    for (const [name, expValue] of Object.entries(browsers)) {
        // Fill search input
        const searchBox = page.getByRole('searchbox', { name: 'Search' });
        await searchBox.fill(name);
        // Assert searchBox has the correct value
        await (0, test_1.expect)(searchBox).toHaveValue(expValue);
        // Assert results are visible
        const results = page.locator('.DocSearch-Hit');
        await (0, test_1.expect)(results.first()).toBeVisible();
        console.log(`✅ Verified search results for: ${name}`);
        await page.waitForTimeout(500);
        await page.getByRole('button', { name: 'Clear the query' }).click();
    }
    console.log(`Total searches done: ${browsers.length}`);
});
(0, test_1.test)('use of enum type', async ({ page }) => {
    /*let userAdmin: UserRole;
    userAdmin = UserRole.Admin;
   
    console.log (`The logged in user has role ${userAdmin}`);
    */
});
(0, test_1.test)('use of custom or Aliase type', async ({ page }) => {
    let userAdmin;
    userAdmin = {
        name: "Rajib",
        age: 50,
        userRole: "Admin"
    };
    console.log(`The logged in user has role ${userAdmin.userRole}`);
});
(0, test_1.test)('Basic Function Type', async ({ page }) => {
    /*
     type getStringLength = (inputString: string) => number ;
   
     let getLengthOfString : getStringLength = (str) =>
     {
       return str.length;
     }
   
     let stringLength = getLengthOfString("Hello");
     console.log(`The length of the String is ${stringLength} `);
     */
    let mathAddition = (a, b) => a + b;
    let mathSubtraction = (a, b) => a - b;
    let mathMultiplication = (a, b) => a * b;
    console.log(mathAddition(3, 4));
    console.log(mathSubtraction(3, 4));
    console.log(mathMultiplication(3, 4));
});
(0, test_1.test)('Function with optional parameter and default value', async ({ page }) => {
    let loggerInfo = (msg) => console.log("Info Message " + msg);
    let logError = (msg, level = "ERROR") => console.log(level + ":" + msg);
    loggerInfo("Playwright test started");
    logError("Element not found");
    logError("Unauthorized access", "CRITICAL");
});
async function retryAction(retry) {
    let maxRetries = 3;
    for (let i = 1; i <= maxRetries; i++) {
        let x;
        console.log(`Retry worked after attempt count ${i}`);
        try {
            if (i === 1)
                throw new Error("Simulated Error");
            await retry();
            return;
        }
        catch (Error) {
        }
    }
}
(0, test_1.test)('Callback Function example :Retry Mechanism', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');
    await retryAction(async () => await page.getByTestId('nav-home').click());
});
(0, test_1.test)('Callback Function example', async ({ page }) => {
    let a = () => console.log("Hello from Action");
    let repeatedAction = (n, a) => {
        for (let i = 1; i <= n; i++) {
            a();
        }
    };
    repeatedAction(10, a);
});
(0, test_1.test)('Undefined values example', async ({ page }) => {
    let a;
    a = null;
    console.log(a); // undefined (variable declared but not assigned)
    function greet(name) {
        console.log(name);
    }
    greet(); // undefined (no value passed)
    const obj = {};
    // undefined (property does not exist)
});
(0, test_1.test)('learn Classes', async ({ page }) => {
    let objClass = new TestClass_1.TestClass('Rajib');
    console.log(objClass.getName());
});
(0, test_1.test)("Learning Type gaurds", async () => {
    const fileSource = {
        path: "Hello from File source"
    };
    const dbSource = {
        connectURL: "Hello from DBSource"
    };
    function loadData(source) {
        if ('path' in source) {
            console.log(source.path);
        }
    }
    loadData(fileSource);
});
(0, test_1.test)("Learning Discriminated Union Type gaurds", async () => {
    const fileSource = {
        type: 'file',
        path: "Hello from File source"
    };
    const dbSource = {
        type: 'db',
        connectURL: "Hello from DBSource"
    };
    function loadData(source) {
        if (source.type === 'db') {
            console.log(source.connectURL);
        }
    }
    loadData(dbSource);
});
(0, test_1.test)("Learning instanceof for Classes", async () => {
    class ClassA {
        printClassA() {
            console.log("Hello from class A");
        }
    }
    class ClassB {
        printClassB() {
            console.log("Hello from class B");
        }
    }
    let classA = new ClassA();
    let classB = new ClassB();
    function callClass(source) {
        if (source instanceof ClassA) {
            source.printClassA();
            return;
        }
        source.printClassB();
    }
    callClass(classB);
});
function checkIsFile(source) {
    if (source.type === 'db')
        return "DBSource";
    else
        return "FileSource";
}
(0, test_1.test)("Outsource Type Guard Functionality to Reusable functions", async () => {
    const fileSource = {
        type: 'file',
        path: "Hello from File source"
    };
    const dbSource = {
        type: 'db',
        connectURL: "Hello from DBSource"
    };
    function loadData(src) {
        if (checkIsFile(src) === "DBSource") {
            console.log(dbSource.connectURL);
            return;
        }
        else
            console.log(fileSource.path);
    }
    loadData(fileSource);
});
(0, test_1.test)("Index type for object type declaration", async ({ page }) => {
    const loginLocators = {
        usernameInput: "#username",
        passwordInput: "#password",
        loginButton: "#signin"
    };
    for (const key in loginLocators) {
        console.log(`The selector values for key: ${key} is ${loginLocators[key]}`);
    }
});
(0, test_1.test)("as const type for object and array type declaration", async ({ page }) => {
    const pageLocators = {
        searchButton: "xpath=//button[@aria-label='Search (Ctrl+K)']",
        searchInput: "#docsearch-input",
    };
    await page.goto("https://playwright.dev/");
    pageLocators.searchButton = "xpath";
    await page.locator(pageLocators.searchButton).click();
    await page.locator(pageLocators.searchInput).fill("Test API");
    await page.locator(pageLocators.searchInput).clear();
});
(0, test_1.test)('Learning Record Type', async ({ page }) => {
    let pageLocators = {
        searchInput: "#docsearch-input",
        searchButton: "xpath=//button[@aria-label='Search (Ctrl+K)']",
        clearButton: "button[title='Clear the query']"
    };
    await page.goto("https://playwright.dev/");
    await page.locator(pageLocators.searchButton).click();
    await page.locator(pageLocators.searchInput).fill("Test API");
    await page.locator(pageLocators.searchInput).clear();
});
function mergeObject(a, b) {
    {
        if (Object.keys(b).length === 0)
            return a;
    }
    return { ...a, ...b };
}
(0, test_1.test)('Merge Objects', async ({}) => {
    let a = {
        name: "Rajib",
        age: 30
    };
    let b = {};
    let mergedObject = mergeObject(a, b);
    console.log(mergedObject);
});
(0, test_1.test)('Learn Linklist using Generics', async () => {
    let linkList = new LinkList_1.LinkList();
    linkList.addNode("Hello");
    linkList.addNode("Bye");
    linkList.addNode("Syanora");
    linkList.printNodes();
});
async function loadTestData(objValue) {
    return objValue;
}
(0, test_1.test)('Generic get Typesafe TestData', async () => {
    let loginData = {
        username: "Rajib",
        password: "test"
    };
    let resolvedLoginData = loadTestData(loginData);
    console.log((await resolvedLoginData).username);
});
async function identity(value) {
    return value;
}
(0, test_1.test)('Practice: Generic get Typesafe TestData', async () => {
    let result1 = await identity("Hello"); // TypeScript knows result1 is string
    let result2 = await identity(42); // TypeScript knows result2 is number
    let result3 = await identity({ name: "Rajib" }); // TypeScript knows result3 has type {name:string}
    console.log(result1);
    console.log(result2);
    console.log(result3.name);
});
async function enterField(page, locator, value) {
    try {
        if (typeof value === "string") {
            await page.locator(locator).fill(value);
        }
        else {
            await page.locator(locator).fill(value.toString());
        }
        return true;
    }
    catch (Error) {
        return false;
    }
}
(0, test_1.test)('Generic Constraints: Generic get Typesafe TestData', async ({ page }) => {
    let passFlag = await enterField(page, "#username", "Rajib");
    passFlag = await enterField(page, "#password", 1234);
});
(0, test_1.test)('Type Literal Type', async ({ page }) => {
    The;
    key;
    is;
    $;
    {
        key;
    }
    and;
    the;
    value;
    is;
    $;
    {
        optionalLocator[key];
    }
    `);
  }


});



    ;
});
