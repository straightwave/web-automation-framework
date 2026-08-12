import { expect, Locator, Page } from "@playwright/test";

export class BasePage {

    constructor(protected page: Page) {}

    protected async click(locator: Locator) {
        await locator.click();
    }

    protected async fill(locator: Locator, text: string) {
        await locator.fill(text);
    }

    protected async type(locator: Locator, text: string) {
        await locator.pressSequentially(text);
    }

    protected async getText(locator: Locator): Promise<string> {
        return (await locator.textContent())?.trim() ?? "";
    }

    protected async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    protected async waitForVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    protected async waitForHidden(locator: Locator) {
        await expect(locator).toBeHidden();
    }

    protected async verifyUrlContains(url: string) {
        await expect(this.page).toHaveURL(new RegExp(url));
    }

    protected async verifyTitle(title: string) {
        await expect(this.page).toHaveTitle(title);
    }

}