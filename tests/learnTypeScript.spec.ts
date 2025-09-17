import { test, Page, expect,Locator } from '@playwright/test';
import { user, role } from '../types/types';
import {TestClass} from './pages/TestClass';
import {LinkList} from '../utils/LinkList';


test('Working with Arrays and Assertions', async ({ page }) => {
  let browsers: string[] = ['Chrome', 'Firefox', 'Edge', 'WebKit'];

  await page.goto("https://playwright.dev/");
   await page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();

  for (const browser of browsers) {
    
   

    // Fill search input
    const searchBox = page.getByRole('searchbox', { name: 'Search' });
    await searchBox.fill(browser);

    // Assert searchBox has the correct value
    await expect(searchBox).toHaveValue(browser);

    // Assert results are visible
    const results = page.locator('.DocSearch-Hit');
    await expect(results.first()).toBeVisible();

    console.log(`✅ Verified search results for: ${browser}`);

    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Clear the query' }).click
  }

  console.log(`Total searches done: ${browsers.length}`);
});

test('Working with Arrays', async ({ page }) => {


  let products: string[] = ['Test Runner', 'API Testing', 'Playwright Inspector'];
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
    await expect(searchBox).toHaveValue(product);

    // await page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();
    await page.waitForLoadState('networkidle');
    const locator = page.locator(`//a[contains(normalize-space(.), "${product}")]`).first();
    await expect(locator).toBeVisible();
    await page.keyboard.press('Escape');
  }


});


test('Learning Typescript basics', async ({ page }) => {
  let name = "Max";

  let hobbies: string[];
  hobbies = ["hello", "Bye"];
  console.log(`name is ${name}`);
  console.log(hobbies);

});

test('Array as Generic type', async ({ page }) => {
  let hobbies: Array<string>;
  hobbies = ["hello", "Bye"];
  hobbies = [...hobbies, "New String"];
  console.log(hobbies);

});

test('Array as Tuple type', async ({ page }) => {
  let hobbies: [number, string]
  hobbies = [1, "Hello"];

  console.log(hobbies);

});

test('Working with Record type', async ({ page }) => {
  // let browsers: string[] = ['Chrome', 'Firefox', 'Edge', 'WebKit'];

  let browsers: Record<string, string>;
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
    await expect(searchBox).toHaveValue(expValue);

    // Assert results are visible
    const results = page.locator('.DocSearch-Hit');
    await expect(results.first()).toBeVisible();

    console.log(`✅ Verified search results for: ${name}`);

    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Clear the query' }).click();
  }

  console.log(`Total searches done: ${browsers.length}`);
});


test('use of enum type', async ({ page }) => {
  /*let userAdmin: UserRole;
  userAdmin = UserRole.Admin;
 
  console.log (`The logged in user has role ${userAdmin}`);
  */
});

test('use of custom or Aliase type', async ({ page }) => {
  let userAdmin: user;
  userAdmin = {
    name: "Rajib",
    age: 50,
    userRole: "Admin"
  }

  console.log(`The logged in user has role ${userAdmin.userRole}`);
});

test('Basic Function Type', async ({ page }) => {
  /*
   type getStringLength = (inputString: string) => number ;
 
   let getLengthOfString : getStringLength = (str) =>
   {
     return str.length;
   }
 
   let stringLength = getLengthOfString("Hello");
   console.log(`The length of the String is ${stringLength} `);
   */

  type MathOperation = (a: number, b: number) => number;

  let mathAddition: MathOperation = (a, b) => a + b;
  let mathSubtraction: MathOperation = (a, b) => a - b;
  let mathMultiplication: MathOperation = (a, b) => a * b;

  console.log(mathAddition(3, 4));
  console.log(mathSubtraction(3, 4));
  console.log(mathMultiplication(3, 4));


});


test('Function with optional parameter and default value', async ({ page }) => {

  type Logger = (msg: string, level?: string) => void;

  let loggerInfo: Logger = (msg) => console.log("Info Message " + msg);
  let logError: Logger = (msg, level = "ERROR") => console.log(level + ":" + msg);
  loggerInfo("Playwright test started");
  logError("Element not found");
  logError("Unauthorized access", "CRITICAL");

}
);



type RetryAction = () => Promise<void>;

async function retryAction(retry: RetryAction) {
  let maxRetries: number = 3;


  for (let i = 1; i <= maxRetries; i++) {
    let x: number;
    console.log(`Retry worked after attempt count ${i}`)
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



test('Callback Function example :Retry Mechanism', async ({ page }) => {


  await page.goto('https://practicesoftwaretesting.com');

  await retryAction(async () =>
    await page.getByTestId('nav-home').click());
});



test('Callback Function example', async ({ page }) => {

  type Action = () => void;
  let a: Action = () => console.log("Hello from Action");

  let repeatedAction = (n: number, a: Action) => {
    for (let i = 1; i <= n; i++) {
      a();
    }

  }

  repeatedAction(10, a);
});

test('Undefined values example', async ({ page }) => {

  let a :string | null;
  a= null;
  console.log(a); // undefined (variable declared but not assigned)

  function greet(name?: string) {
    console.log(name);
  }
  greet(); // undefined (no value passed)

  const obj = {};
  // undefined (property does not exist)


});

test('learn Classes', async ({ page }) => {

  let objClass:TestClass = new TestClass('Rajib');
  console.log(objClass.getName());

});


test("Learning Type gaurds" , async() =>
{
  type FileSource = {
    path: string;
  }

 const fileSource : FileSource = {
  path : "Hello from File source"
 }

 type DBSource = {
  connectURL : string;
 }

 const dbSource: DBSource = {
  connectURL: "Hello from DBSource"
 }

 type Source = FileSource | DBSource;

  function loadData(source: Source)
{
   if ('path' in source)
   {
    console.log (source.path)
   }

}

loadData (fileSource);

})

test("Learning Discriminated Union Type gaurds" , async() =>
{
  type FileSource = {
    type: 'file',
    path: string;
  }

 const fileSource : FileSource = {
  type: 'file',
  path : "Hello from File source"
 }

 type DBSource = {
  type: 'db',
  connectURL : string;
 }

 const dbSource: DBSource = {
  type: 'db',
  connectURL: "Hello from DBSource"
 }

 type Source = FileSource | DBSource;

  function loadData(source: Source)
{
   if (source.type ==='db')
      {
    console.log (source.connectURL)
     }
}

loadData (dbSource);

})


test("Learning instanceof for Classes" , async() =>
{
  class ClassA 
  {

    printClassA()
    {
      console.log ("Hello from class A");
    }
  }

 class ClassB 
  {

    printClassB()
    {
      console.log ("Hello from class B");
    }
  }
   
  type ClassSource = ClassA|ClassB;

  let classA = new ClassA();
  let classB = new ClassB();

  function callClass(source: ClassSource)
  {
    if (source instanceof ClassA)
    {
      source.printClassA();
      return;
      }
      source.printClassB();
  }
   callClass(classB);
})

type FileSource = {
    type: 'file',
    path: string;
  }

  type DBSource = {
  type: 'db',
  connectURL : string;
 }

 type Source = FileSource | DBSource;
function checkIsFile(source: Source)
{

    if  (source.type ==='db')
       return "DBSource";
      else
        return "FileSource";

}

test("Outsource Type Guard Functionality to Reusable functions" , async() =>
{
   const fileSource : FileSource = {
  type: 'file',
  path : "Hello from File source"
 }

 
 const dbSource: DBSource = {
  type: 'db',
  connectURL: "Hello from DBSource"
 }

 
 function loadData (src: Source)
 {
  if (checkIsFile(src) ==="DBSource")
  {
         console.log(dbSource.connectURL);
         return;
  }
  else
   console.log(fileSource.path);
}
  loadData(fileSource);
})



test("Index type for object type declaration" , async({page}) =>
{
  type LocatorStore = {
    usernameInput : string
    [key:string] : string
  }

 const loginLocators: LocatorStore = {
  usernameInput : "#username",
  passwordInput: "#password",
  loginButton: "#signin"

 }

  for ( const key in loginLocators)
  {
    console.log(`The selector values for key: ${key} is ${loginLocators[key]}` );
  }

})


test("as const type for object and array type declaration" , async({page}) =>
{
  type LocatorStore = {
     [key:string] : string
  }

 const pageLocators: LocatorStore = {
  searchButton : "xpath=//button[@aria-label='Search (Ctrl+K)']",
  searchInput: "#docsearch-input",

 } as const;

  await page.goto("https://playwright.dev/");
  pageLocators.searchButton ="xpath";
  await page.locator(pageLocators.searchButton).click();
  await page.locator(pageLocators.searchInput).fill("Test API");
  await page.locator(pageLocators.searchInput).clear();
  

})

test('Learning Record Type', async ({ page }) => {
 type LocatorList = "searchInput" |"searchButton" | "clearButton"

  let pageLocators : Record <LocatorList,string> =
  {
    searchInput: "#docsearch-input",
    searchButton: "xpath=//button[@aria-label='Search (Ctrl+K)']",
    clearButton: "button[title='Clear the query']"
  }
  await page.goto("https://playwright.dev/");
  
  await page.locator(pageLocators.searchButton).click();
  await page.locator(pageLocators.searchInput).fill("Test API");
  await page.locator(pageLocators.searchInput).clear();
  
});


function mergeObject(a: any,b: any)
{
{
  if (Object.keys(b).length === 0)
    return a;
}
 return {...a,...b};
}

test('Merge Objects', async ({  }) => {
 let a = {
  name: "Rajib",
  age : 30

 }

 let b = {
 
 }
 let mergedObject = mergeObject(a,b);
 console.log (mergedObject);
});


test('Learn Linklist using Generics', async () => {
 let linkList:LinkList<string> = new LinkList();

 linkList.addNode("Hello");
 linkList.addNode("Bye");
 linkList.addNode("Syanora");

 linkList.printNodes();
});

 

async function loadTestData <Tdata extends Object> (objValue: Tdata) : Promise <Tdata>
{

  return objValue;

}

test('Generic get Typesafe TestData', async () => {
type LoginData = {
   username: string;
  password: string;
 }

 type UserData = {
  name: string,
  age:number
 }


 let loginData = {
  username: "Rajib",
  password: "test"
 }
  let resolvedLoginData = loadTestData<LoginData>(loginData);
  console.log((await resolvedLoginData).username);
});

async function  identity <T extends Object> (value : T) : Promise <T>
{

  return value;

}

test('Practice: Generic get Typesafe TestData', async () => {
  let result1 = await identity("Hello");   // TypeScript knows result1 is string
let result2 = await identity(42);        // TypeScript knows result2 is number
let result3 = await identity({ name: "Rajib" }); // TypeScript knows result3 has type {name:string}

console.log(result1);
console.log(result2);
console.log(result3.name);

});



async function enterField <T extends string|number> (page: Page,locator : string , value : T) : Promise <boolean>
{
   try
   {
      if (typeof value ==="string")
      {
        await page.locator(locator).fill(value);
      }
      else 
      {
        await page.locator(locator).fill(value.toString());
      }
      return true;
   }
   catch(Error)
   {
    return false;
   }

}

test('Generic Constraints: Generic get Typesafe TestData', async ({page}) => { 
 let passFlag =  await enterField<string>(page,"#username","Rajib");
 passFlag = await enterField<number> (page,"#password",1234); 
});

 
test('keyof operator: How to use keyof operator', async ({page}) => { 

  let formLocators = {
    firstName: '#firstName',
    lastName : '#lastName',
    email : '#email',
    submitBtn: '#submitBtn'
  }

   type FormKeys = keyof typeof formLocators;

   type InputValue = typeof formLocators[FormKeys]

  async function fillField(page:Page, key:FormKeys,value:InputValue)
   {
      await page.locator(formLocators[key]).fill(value.toString());
   }
    await fillField(page,"email","ABCD");
   // await fillField(page,"ASDER","ABCD"); This line gives compile error as expected.
});



test('Mapped Object Type: ', async ({page}) => { 

  type FormLocators = {
  username: string;
  password: string;
  loginBtn: string;
};
   
  type OptionalFormLocator <T> = 
  {
     [k in keyof T] ?: T[k]

  };

  let optionalLocator : OptionalFormLocator<FormLocators> = 
  {
    username: "#username",
    password: "#password"
  }

  for (const key of Object.keys(optionalLocator) as (keyof typeof optionalLocator)[])
  {

    console.log(`The key is ${key} and the value is ${optionalLocator[key]}`);
  }


});

test.only('Type Literal Type', async ({page}) => 
{
 type cart ="apple"|"banana"|"orange";
 type actions = "add"|"remove";

 type CartActions = `${cart}-${actions}`;

 let requiredAction: CartActions = "apple-add";

 async function performCartAction(action: CartActions)
 {
    let action_locator : Locator|null = null ;
     switch (action)
     {
       case "apple-add":
       action_locator =page.locator("#apple-add");
       break;

       case "orange-remove":
        action_locator = page.locator("orange-remove");

     }

     console.log("Performing action on " + action_locator)

 }

      performCartAction(requiredAction)

});

