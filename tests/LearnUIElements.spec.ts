import {test,expect,TestInfo,Page,Locator } from '@playwright/test';
import  {SelfHealingLocator}  from '../utils/SelfHealingLocator';
import fs from 'fs';
import path from 'path';
import {loginTestData} from '../testData/loginTestData';
//import {allure} from 'allure-playwright';


test ("Example test for TextBox",async ({page}) =>
{
   await  page.goto("https://www.saucedemo.com/");

   let loc_UserName = page.getByRole('textbox',{name:'Username'});
   let loc_password = page.getByRole('textbox',{name:'Password'});
  // let loc_UserName = page.locator('#user-name');
 // let loc_UserName = page.locator("xpath = //input[@placeholder='Username']"); 
   await loc_UserName.fill('standard_user');
   await loc_password.type('secret_sauce',{delay:100});
 // Read value from TextBox :
   let inputText : string|null= await loc_UserName.inputValue();
   let flagEditable = await loc_UserName.isEditable();
   let flaDisplayed = await loc_UserName.isVisible({timeout:5000});
    console.log ("The Field UserName is visible :" + flaDisplayed );
   console.log ("The Field UserName is editable :" + flagEditable );
   console.log(`Input value is : ${inputText}`);
   let elem = await loc_UserName.elementHandle();
   elem?.fill("ABCD");
   const writingSuggestions = await loc_UserName.evaluate(
  (el) => (el as HTMLInputElement).writingSuggestions
);
console.log("writingSuggestions =", writingSuggestions);

  
   expect(inputText).toBe('standard_user');
   await page.pause();
})


test ("Example test for Radio buttons",async ({page}) =>
{
   await  page.goto("https://testautomationpractice.blogspot.com/");
 //  let loc_Radio_Mail = page.getByRole('radio',{name:'Male',exact:true});
   let loc_Radio_Mail = page.getByLabel('Male',{exact:true});
   let loc_Radio_Female = page.getByRole('radio',{name:'Female',exact:true});
     await loc_Radio_Mail.check();
      let flag_Male_Checked = await loc_Radio_Mail.isChecked();
     console.log("The Male radio button is checked :" , flag_Male_Checked);
      let flag_Female_Checked = await loc_Radio_Female.isChecked();
     console.log("The Female radio button is checked:" , flag_Female_Checked);
     await loc_Radio_Female.check();
  
      flag_Female_Checked = await loc_Radio_Female.isChecked();
     console.log("The Female radio button is checked:" , flag_Female_Checked);
     await page.pause();
})




test("Example Test for CheckBoxes Looping and Allure Reporting", 
  async ({ page }, testInfo: TestInfo) => {

  await page.goto("https://testautomationpractice.blogspot.com/");

  const loc_CheckBoxes = page.locator("xpath=//label[@for='days']//parent::*//input[@type='checkbox']");
  const checkboxCount = await loc_CheckBoxes.count();

  for (let i = 0; i < checkboxCount; i++) {
    await loc_CheckBoxes.nth(i).check();

    // Get the value attribute of the checkbox
    const dayName = (await loc_CheckBoxes.nth(i).getAttribute('value')) ?? 'Unknown';
    // Attach to Allure
    await testInfo.attach('Checkbox status', {
      body: `The day: ${dayName} has been checked`,
      contentType: 'text/plain',
    });

    await expect(loc_CheckBoxes.nth(i)).toBeChecked();
  }

  for (let i = 0; i < checkboxCount; i++) {
    await loc_CheckBoxes.nth(i).uncheck();
    await expect(loc_CheckBoxes.nth(i)).not.toBeChecked();
  }

});



test("Checkbox Group Screenshot with Allure", async ({ page }, testInfo: TestInfo) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  // Locate the parent container of all checkboxes
  let loc_CheckBoxGroup = page.locator("xpath=//label[@for='days']//parent::*");
   loc_CheckBoxGroup =loc_CheckBoxGroup.nth(0);
  const loc_CheckBoxes = loc_CheckBoxGroup.locator("input[type='checkbox']");
  const checkboxCount = await loc_CheckBoxes.count();

  // Check each checkbox
  for (let i = 0; i < checkboxCount; i++) {
    await loc_CheckBoxes.nth(i).check();
    const dayName = (await loc_CheckBoxes.nth(i).getAttribute('value')) ?? 'Unknown';
    
    // Optional: Attach text log for each checkbox
    await testInfo.attach('Checkbox status', {
      body: `The day: ${dayName} has been checked`,
      contentType: 'text/plain',
    });
  }

  // Take screenshot of the entire group after checking all
  const groupScreenshot = await loc_CheckBoxGroup.screenshot();
  await testInfo.attach('Checkbox Group Screenshot', {
    body: groupScreenshot,
    contentType: 'image/png',
  });

  // Uncheck all
  for (let i = 0; i < checkboxCount; i++) {
    await loc_CheckBoxes.nth(i).uncheck();
  }

  // Screenshot of the group after unchecking
  const groupScreenshotUncheck = await loc_CheckBoxGroup.screenshot();
  await testInfo.attach('Checkbox Group Screenshot (Unchecked)', {
    body: groupScreenshotUncheck,
    contentType: 'image/png',
  });
});



test("Select Dropdown ", async ({ page }) => {

  await page.goto("https://testautomationpractice.blogspot.com/");
  let loc_Country = page.getByLabel('Country');
  await loc_Country.selectOption('India');
  console.log ("Selected option is :" + await loc_Country.inputValue());

  await loc_Country.selectOption({label:'India'});
  console.log("selected option using text value is:" + await loc_Country.inputValue());

  await loc_Country.selectOption({index:9});
  console.log("selected option using index value :" + await loc_Country.inputValue());;


  expect (await loc_Country.inputValue()).toEqual('india');

  let selectedOption = await loc_Country.locator('option:checked').innerText();
  console.log("The selected option for the drop down is:" + selectedOption);

  let listOptions = loc_Country.locator("option");
  let listOptionsArray = await listOptions.all();
  for ( let option of listOptionsArray)
  {
    console.log(`The option value is :` +  await option.getAttribute('value'));
  }

  //await page.pause();
 
});



test('multi-select inside iframe (fixed)', async ({ page }) => {
  await page.goto('https://www.htmlelements.com/demos/dropdownlist/multiple-selection/');
  await page.waitForLoadState('networkidle');

  const iframeSelector = 'iframe.demo-frame';
  const dropdownSelector = "*[smart-id='content']";
  const itemsToSelect = ['Bicerin', 'Breve', 'Americano'];

  const selected = await selectMultiInIframe(page, iframeSelector, dropdownSelector, itemsToSelect);

  console.log('Selected items:', selected);
  expect(selected).toEqual(expect.arrayContaining(itemsToSelect));
});


async function selectMultiInIframe(
  page: Page,
  iframeSelector: string,
  dropdownSelector: string,
  selections: string[]
): Promise<string[]> {
  const frame = page.frameLocator(iframeSelector);

 // await page.pause();
  // ✅ anchor dropdown inside the frame
  let dropdown = frame.locator(dropdownSelector);
  try
  {

  await dropdown.waitFor({ state: 'visible', timeout: 8000 });
} catch (e)
{
 let   healer: SelfHealingLocator = new SelfHealingLocator(page);
  dropdown = await healer.find(dropdownSelector);
}
 await dropdown.click();
  for (const selection of selections) {
    console.log(`Selecting "${selection}" — opening dropdown...`);
   

    await page.waitForTimeout(200);

    let option = frame.locator('smart-list-item').filter({ hasText: selection })//.first();

    if ((await option.count()) === 0) {
      // sometimes options render at top-level, outside iframe
      option = page.locator('smart-list-item').filter({ hasText: selection })//.first();
    }

  //  await option.scrollIntoViewIfNeeded();
    await option.click({ timeout: 3000 });
  }

  return await frame.locator('smart-list-item[aria-selected="true"]').allInnerTexts();
}


test('Button - Learning click of buttons and handling events', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  await page.waitForLoadState('networkidle');

  const loc_Button = page.getByRole('button', { name: 'Simple Alert' });

  // ✅ register dialog handler before clicking

  page.once('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.accept();
  });
  
  

  await loc_Button.click();
 // await page.pause();

  const loc_DblClickButton = page.getByRole('button', { name: 'Copy Text' });
  const loc_Field2 = page.locator('#field2');

  await loc_DblClickButton.dblclick();

  // ✅ auto-wait for text to appear
  await expect(loc_Field2).toHaveValue("Hello World!");

  console.log("Field2 value after dblclick:", await loc_Field2.inputValue());

  let loc_Prompt = page.getByRole('button',{name: "Prompt Alert"});
  page.once('dialog',async (log) => 
  {
   await  log.accept("I am Rajib");
  })

 await loc_Prompt.click();

//  await page.pause();
});



test('Playwright Event Model Demo', async ({ page }) => {
  // Go to a test page
  await page.goto('https://testautomationpractice.blogspot.com/');
  await page.waitForLoadState('networkidle');

  // --- 1️⃣ Console Event ---
  page.on('console', msg => {
    console.log(`[Console] ${msg.text()}`);
  });

  // Trigger a console message in the browser
  await page.evaluate(() => console.log("Hello from the browser console!"));

  // --- 2️⃣ Network Request & Response Events ---
  page.on('request', request => {
    console.log(`[Request] ${request.method()} ${request.url()}`);
  });

  page.on('response', response => {
    console.log(`[Response] ${response.status()} ${response.url()}`);
  });

  // --- 3️⃣ Dialog Handling ---

  // Handle first alert (Simple Alert) using page.once
  page.once('dialog', async dialog => {
    console.log(`[Dialog] Simple Alert: ${dialog.message()}`);
    await dialog.accept(); // no text needed
  });

  // Click Simple Alert button
  const simpleAlertBtn = page.getByRole('button', { name: 'Simple Alert' });
  await simpleAlertBtn.click();

  // Handle Prompt Alert
  page.once('dialog', async dialog => {
    console.log(`[Dialog] Prompt Alert: ${dialog.message()}`);
    await dialog.accept("I am Rajib"); // pass text
  });

  const promptAlertBtn = page.getByRole('button', { name: 'Prompt Alert' });
  await promptAlertBtn.click();

  // Handle Confirm Alert
  page.once('dialog', async dialog => {
    console.log(`[Dialog] Confirm Alert: ${dialog.message()}`);
    await dialog.dismiss(); // choose Cancel
  });

  

  // --- 4️⃣ Double Click Example ---
  const dblClickBtn = page.getByRole('button', { name: 'Copy Text' });
  const field2 = page.locator('#field2');

  await dblClickBtn.dblclick();
  await expect(field2).toHaveValue("Hello World!");
  console.log("Field2 value after dblclick:", await field2.inputValue());

});

//https://practice.expandtesting.com/tooltips

test('Tooltip Handling', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/tooltips');
  //await page.waitForLoadState('networkidle');

  
  let tooltipTrigger = page.getByRole('button', { name: 'Tooltip on top' });
  await tooltipTrigger.waitFor({ state: 'visible', timeout: 10000 });
  await tooltipTrigger.hover();

 
  let tooltip = page.locator("//div[normalize-space()='Tooltip on top' and contains(@id,'tooltip')]");

  await tooltip.waitFor({ state: 'visible', timeout: 5000 });
  await expect(tooltip).toBeVisible();
  console.log("Tooltip text:", await tooltip.textContent());
  // Move mouse away to hide tooltip
  await page.mouse.move(0, 0);
  await tooltip.waitFor({ state: 'hidden', timeout: 5000 });
 
  await expect(tooltip).toBeHidden(); 
 
   tooltipTrigger = page.getByRole('button', { name: 'Tooltip on top' });
  await tooltipTrigger.hover();
  tooltip = page.locator("div.tooltip-inner");
  await tooltip.waitFor({ state: 'visible', timeout: 5000 });
  await expect(tooltip).toBeVisible();
  console.log("Tooltip text for another tooltip:", await tooltip.textContent());
  // await page.pause();
  
});

test('Tooltip Handling - refined', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/tooltips');

  // Native tooltip (title attribute)
  const nativeBtn = page.getByRole('button', { name: 'Tooltip on top' });
  const nativeTooltipText = await nativeBtn.getAttribute('title');
  console.log("Native tooltip text:", nativeTooltipText);

  // Hover to trigger custom tooltip
  await nativeBtn.hover();
  const tooltip = page.locator("div.tooltip-inner:has-text('Tooltip on top')");
  await expect(tooltip).toBeVisible();
  console.log("Custom tooltip text:", await tooltip.textContent());

  // Move mouse away to hide tooltip
  await page.mouse.move(0, 0);
  await expect(tooltip).toBeHidden();
});



test('Frames - how to work inside frames -Not working', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/iframe');
  let frameObj = await page.$("iframe[title='Rich Text Area']");
  let frameContent = await frameObj?.contentFrame();
 await page.pause();
 // await frameContent?.locator("#tinymce").waitFor({state:"visible",timeout:10000});
  await frameContent?.locator("#tinymce").fill("This is example Text",{timeout:10000});
  console.log( await frameContent?.locator("html").innerText());

  
});





test('TinyMCE - type in iframe', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/iframe');

  const frameObj = await page.$("iframe[title='Rich Text Area']");
  const frame = await frameObj?.contentFrame();

  const editorBody = frame?.locator('body#tinymce');
  await editorBody?.waitFor({ state: 'visible', timeout: 5000 });

  // Focus the editor
  await editorBody?.click();

  // Type text (like a real user)
  await editorBody?.type("This is example Text", { delay: 50 });

  console.log(await editorBody?.innerText());
});


test('File upload', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/upload');
  let loc_FileUpload = page.locator('#file-upload');
  loc_FileUpload.waitFor({state:"visible",timeout:5000});
  await loc_FileUpload.setInputFiles("C:/Users/rchak/OneDrive/Documents/RajibWork/TempText.txt");
  let loc_Submit = page.getByRole('button', { name: 'Upload' });
  await loc_Submit.click();
  let loc_PageUpload = page.locator('#uploaded-files');
  await loc_PageUpload.waitFor({state:'visible'});
 await  expect( loc_PageUpload).toHaveText('TempText.txt');


 // await page.pause();
});

test('Download using page.on (flaky)', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/download');

  // Register download listener
  page.on('download', async (download) => {
    await download.saveAs('C:/Users/rchak/Downloads/file-on.txt');
    console.log('Download saved via page.on');
  });

  // Click the file to download
  await page.locator('a', { hasText: 'some-file.txt' }).click();

  // Immediately log (may run before file is saved!)
  console.log('Clicked download link');
});


test('Download using waitForEvent (reliable)', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/download');

  // Wait for download while clicking the link
  /*
  const [download] = await Promise.all([
    page.waitForEvent('download'), // wait for the next download
    page.locator('a', { hasText: 'some-file.txt' }).click()
  ]);
  */
   const download = await page.waitForEvent("download")

  // Save file after download captured
  await download.saveAs('C:/Users/rchak/Downloads/file-await.txt');
  console.log('Download saved via waitForEvent');
});



test('Download with predicate and timeout', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/download');

  // Wait for a download where the filename contains "some-file"
  const [download] = await Promise.all([
    page.waitForEvent('download', {
      predicate: d => d.suggestedFilename().includes('some-file'),
      timeout: 10000, // wait max 10 seconds
    }),
    // Trigger the download
    page.locator('a', { hasText: 'some-file.txt' }).click(),
  ]);

  // Save the downloaded file
  const downloadPath = path.join(__dirname, download.suggestedFilename());
  await download.saveAs(downloadPath);

  console.log('Downloaded file:', download.suggestedFilename());

  // Assert filename contains 'some-file'
  expect(download.suggestedFilename()).toContain('some-file');
  
});



test.describe("Test the Login functionality", () => {
  let page:Page;
test.beforeAll(async ({browser}) => {
    let context = await browser.newContext();
     page = await context.newPage();
    console.log('Setup before all tests');
    
  });

  test.beforeEach(async ()=>
  {
   await page.goto("https://the-internet.herokuapp.com/login");

  })

  test.afterEach(async () =>
  { await page.close();});

test("test Group with valid Login data", async ({  }) => {
    const loginData = loginTestData["Login_01"]; // <-- Use your test data key


    // Fill username
    const loc_UserName = page.getByRole("textbox", { name: "Username" });
    await loc_UserName.click();
    console.log("Value entered for userName :" + loginData.username);
    await loc_UserName.fill(loginData.username);

    // Fill password
    const loc_Password = page.getByRole("textbox", { name: "Password" });
    await loc_Password.fill(loginData.password);

    // Click login button
    await page.getByRole("button", { name: "Login" }).click();

    });

    test("test Group with invalid Login data", async ({  }) => {
    const loginData = loginTestData["Login_02"]; // <-3

    // Fill username
    const loc_UserName = page.getByRole("textbox", { name: "Username" });
    await loc_UserName.click();
    console.log("Value entered for userName :" + loginData.username);
    await loc_UserName.fill(loginData.username);

    // Fill password
    const loc_Password = page.getByRole("textbox", { name: "Password" });
    await loc_Password.fill(loginData.password);

    // Click login button
    await page.getByRole("button", { name: "Login" }).click();

    });

});