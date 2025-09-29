import {test,Expect,Page,Locator} from '@playwright/test';


test("dynamic Web table using Record Type", async ({page}) =>
{

await page.goto("https://testautomationpractice.blogspot.com/");
// Find all rows that contain Mukesh 
let  colValue = await getTableColumnValue ("CPU (%)","Chrome",page);
// Based on 
await page.pause();

})



async function getTableColumnValue(colName: string, rowIdentifier:string,page: Page) : Promise<string>
{
   let tableHeaders : Record<'HeaderName'|'IndexValue',string|number>[] = [];
 
    let loc_StaticTable = page.locator("table[id='taskTable']");

// First store a map of column headers with column name and index position 
let targetColIndex = -1;
let loc_TableHeaders = loc_StaticTable.locator ("th");
let locTableHeadersArray = await loc_TableHeaders.all();
let headerCounter = 0;
for (let headerTextElem of locTableHeadersArray)
{
  tableHeaders.push( {HeaderName :await headerTextElem.innerText(),IndexValue:headerCounter});
  headerCounter++;
}

for (const obj of tableHeaders)
{
  if (obj.HeaderName === colName)
  {
    targetColIndex = obj.IndexValue as number;
    break;
  }

}

let retValue:string ='';
retValue =  await loc_StaticTable.locator(page.locator("tr",{hasText:rowIdentifier})).locator("td").nth(targetColIndex).innerText();
console.log(retValue);
await page.pause();
return retValue;

}
