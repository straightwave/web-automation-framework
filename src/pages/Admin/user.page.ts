import { Page } from "@playwright/test";
import { Sidebar } from "../../components/Sidebar";
import { BasePage } from "../../utils/BasePage";
import { UserData } from "./user.data";
import { UserLocators } from "./user.locators";

export class UserPage extends BasePage {

    private sidebar: Sidebar;

    constructor(page: Page) {

        super(page);

        this.sidebar = new Sidebar(page);

    }

    async navigateToUserManagement() {

        await this.sidebar.openAdmin();

        await this.page.goto(
            '/web/index.php/admin/viewSystemUsers',
            {
                waitUntil: 'domcontentloaded',
                timeout: 30000,
            }
        );

    }

    async clickAddUser() {

        await this.page
            .getByRole("button", { name: "Add" })
            .click({ timeout: 15000 });

    }

    async getExistingEmployeeName(returnToUrl: string): Promise<string> {
        await this.page.goto('/web/index.php/pim/viewEmployeeList', {
            waitUntil: 'domcontentloaded',
            timeout: 30000,
        });

        const tableRows = this.page.locator('.oxd-table-row');
        await tableRows.first().waitFor({ state: 'visible', timeout: 20000 });

        const rowCount = await tableRows.count();

        if (rowCount === 0) {
            throw new Error('No employee rows found in employee list table');
        }

        const rowTexts = await Promise.all(
            Array.from({ length: Math.min(8, rowCount) }, (_, index) => tableRows.nth(index + 1).textContent())
        );

        const nameMatches = rowTexts.flatMap((text) => {
            const matches = text?.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/g) ?? [];
            return matches.filter((match) => !/^[A-Z0-9]+$/.test(match));
        });

        if (nameMatches.length === 0) {
            throw new Error('Could not extract an employee name from the employee list table');
        }

        await this.page.goto(returnToUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 30000,
        });

        return nameMatches[0].trim();
    }

    async fillUserForm(userData: UserData) {

        const returnToUrl = this.page.url();
        const employeeName = await this.getExistingEmployeeName(returnToUrl);

        await this.page
            .locator(UserLocators.userRoleDropdown)
            .click();

        await this.page
            .locator(UserLocators.userRoleOptions)
            .filter({ hasText: userData.UserRole })
            .first()
            .click();

        const employeeNameInput = this.page.locator(UserLocators.employeeNameInput);
        await employeeNameInput.fill('');
        await employeeNameInput.pressSequentially(employeeName, { delay: 150 });

        const suggestion = this.page.locator(UserLocators.employeeSuggestion).filter({ hasText: employeeName }).first();
        await suggestion.waitFor({ state: 'visible', timeout: 10000 });
        await suggestion.click();

        await this.page
            .locator(UserLocators.statusDropdown)
            .click();

        await this.page
            .locator(UserLocators.statusOptions)
            .filter({ hasText: userData.Status })
            .first()
            .click();

        await this.page
            .locator(UserLocators.usernameInput)
            .fill(userData.UserName);

        await this.page
            .locator(UserLocators.passwordInput)
            .first()
            .fill(userData.Password);

        await this.page
            .locator(UserLocators.confirmPasswordInput)
            .first()
            .fill(userData.ConfirmPassword);

    }

    async clickSave() {

        await this.page
            .getByRole("button", { name: "Save" })
            .click({ timeout: 15000 });

    }

    async addUser(userData: UserData) {

        await this.navigateToUserManagement();

        await this.clickAddUser();

        await this.fillUserForm(userData);

        await this.clickSave();

    }

}