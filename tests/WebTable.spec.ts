import {test,Page,expect} from '@playwright/test';


test("static Web table", async ({page}) =>
{
await page.goto("https://testautomationpractice.blogspot.com/");
// Find all rows that contain Mukesh 
let loc_StaticTable = page.locator("table[name='BookTable'] tbody");

let loc_Rows_For_Mukesh =  loc_StaticTable.locator("xpath=//tr [contains(normalize-space(),'Mukesh')]")
await expect( loc_Rows_For_Mukesh).toHaveCount(2);
console.log ("Number of Rows for Mukesh is " + await loc_Rows_For_Mukesh.count() );
let loc_Rows_Mukesh_Array = await loc_Rows_For_Mukesh.all();
for (let rowMukesh of loc_Rows_Mukesh_Array)
{
 console.log(await rowMukesh.locator("td:first-child").innerText());
 }

 // await page.pause();
}


)



test('Find all rows containing Mukesh', async ({ page }) => {
  // Navigate first
  await page.goto("https://testautomationpractice.blogspot.com/");

  // Table locator
  let loc_StaticTable = page.locator("table[name='BookTable'] tbody");

  // All rows containing Mukesh (scoped to the table)
  let loc_Rows_For_Mukesh = loc_StaticTable.locator("tr", {
    hasText: "Mukesh"
  });

  // Expect exactly 2 rows
  await expect(loc_Rows_For_Mukesh).toHaveCount(2);

  console.log("Number of Rows for Mukesh is " + await loc_Rows_For_Mukesh.count());

  // Convert to array of ElementHandles
  let loc_Rows_Mukesh_Array = await loc_Rows_For_Mukesh.all();

  // Iterate rows
  for (let rowMukesh of loc_Rows_Mukesh_Array) {
    console.log(await rowMukesh.locator("td:first-child").innerText());
  }

  await page.pause();
});

  type TableHeaders = {
    HeaderName : string,
    IndexValue : number
  }

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
   let tableHeaders : TableHeaders[] =  [];
 
    let loc_StaticTable = page.locator("table[id='taskTable']");

// First store a map of column headers with column name and index position 
let targetColIndex = -1;
let loc_TableHeaders = loc_StaticTable.locator ("th");
let locTableHeadersArray = await loc_TableHeaders.all();
let headerCounter = 0;
for (let headerTextElem of locTableHeadersArray)
{
  tableHeaders.push({HeaderName : await headerTextElem.innerText(),IndexValue: headerCounter});
  headerCounter++;
}

for (const obj of tableHeaders)
{
  if (obj.HeaderName === colName)
  {
    targetColIndex = obj.IndexValue;
    break;
  }

}

let retValue:string ='';
retValue =  await loc_StaticTable.locator(page.locator("tr",{hasText:rowIdentifier})).locator("td").nth(targetColIndex).innerText();
console.log(retValue);
return retValue;

}



