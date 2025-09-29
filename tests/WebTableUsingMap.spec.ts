import {test,expect,Page } from '@playwright/test';

test("dynamic Web table", async ({page}) =>
{

await page.goto("https://testautomationpractice.blogspot.com/");
// Find all rows that contain Mukesh 

 let  colValue = await getTableColumnValue ("CPU (%)","Chrome",page);
// Based on 
await page.pause();
})



async function getTableColumnValue(colName: string, rowIdentifier:string,page: Page) : Promise<string>
{
  
    let tableHeaderMap = new Map<string,number>();

 
    let loc_StaticTable = page.locator("table[id='taskTable']");

// First store a map of column headers with column name and index position 
let targetColIndex = -1;
let loc_TableHeaders = loc_StaticTable.locator ("th");
let locTableHeadersArray = await loc_TableHeaders.all();
let headerCounter = 0;
for (let headerTextElem of locTableHeadersArray)
{
    let headerText = await headerTextElem.innerText();
  tableHeaderMap.set(headerText , headerCounter);
  headerCounter++;
}

const colIndex = tableHeaderMap.get(colName);
if (colIndex === undefined) {
  throw new Error(`Column "${colName}" not found`);
}
targetColIndex = colIndex;



let retValue:string ='';
retValue =  await loc_StaticTable.locator(page.locator("tr",{hasText:rowIdentifier})).locator("td").nth(targetColIndex).innerText();
console.log(retValue);
return retValue;

}




test("Currency rates map challenge", async ({ page }) => {
  await page.goto("https://www.x-rates.com/table/?from=USD&amount=1");

  // Step 1: Create a Map for currency → rate
  const currencyMap: Map<string, number> = new Map();

  // Step 2: Locate the rows of the table
  const rows = await page.locator("table.tablesorter.ratesTable tbody tr").all();

  for (const row of rows) {
    // TODO: Extract currency name from first column
    const currencyName = await row.locator("td:nth-child(1)").innerText();

    // TODO: Extract rate from second column and convert to number
    const rateText = await row.locator("td:nth-child(2)").innerText();
    const rate = parseFloat(rateText);

    // TODO: Add to map
    currencyMap.set(currencyName, rate);
  }

  // Step 3: Verify Euro exists and rate > 0
  const euroRate = currencyMap.get("Euro");
  expect(euroRate).toBeDefined();
  expect(euroRate!).toBeGreaterThan(0);

  // Step 4: Print all
  for (const [currency, rate] of currencyMap) {
    console.log(`${currency}: ${rate}`);
  }
});
