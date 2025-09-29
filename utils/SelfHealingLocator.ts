// utils/SelfHealingLocator.ts
import { Page, Locator } from "@playwright/test";
//import fetch from "node-fetch";

export class SelfHealingLocator {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Try to find element with healing if original locator fails
   */
  async find(selector: string): Promise<Locator> {
    try {
      const element = this.page.locator(selector);
      await element.first().waitFor({ timeout: 2000 });
      console.log(`✅ Found element with selector: ${selector}`);
      return element;
    } catch (err) {
      console.warn(`❌ Selector failed: ${selector}`);
      return await this.healSelector(selector);
    }
  }

  /**
   * Ask MCP+Claude to suggest a new locator based on DOM snapshot
   */
  // utils/SelfHealingLocator.ts
private async healSelector(failedSelector: string): Promise<Locator> {
  const dom = await this.page.content();

  const response = await fetch("http://localhost:4000/mcp/heal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ selector: failedSelector, dom }),
  });

  const data = await response.json();
  const healedSelector = data.suggestedSelector;

  console.log(`🤖 Healing applied: "${failedSelector}" → "${healedSelector}"`);

  // Check if selector is inside an iframe
  const frame = this.page.frameLocator("iframe"); // Adjust with proper iframe selector
  const healedElement = frame.locator(healedSelector);

  await healedElement.first().waitFor({ timeout: 5000 });
  return healedElement;
}

}
