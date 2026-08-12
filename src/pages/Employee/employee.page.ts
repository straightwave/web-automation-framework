import { Page, expect } from '@playwright/test';
import { EmployeeLocators } from './employee.locators'
import { BasePage } from '../../utils/BasePage'
import { Sidebar } from '../../components/Sidebar';
import { EmployeeData } from './employee.data';


export class EmployeePage extends BasePage {

    private sidebar: Sidebar;

    constructor(page: Page) {
        super(page);
        this.sidebar = new Sidebar(page);
    }

   async navigateToAddEmployee() {

    await this.page.goto("/web/index.php/pim/viewEmployeeList");

    await this.sidebar.openPIM();

    await this.page.click(EmployeeLocators.addEmployeeMenu);

}

    async enterFirstName(firstName: string) {

        await this.page.fill(
            EmployeeLocators.firstName,
            firstName
        );

    }

    async enterMiddleName(middleName: string) {

        await this.page.fill(
            EmployeeLocators.middleName,
            middleName
        );

    }

    async enterLastName(lastName: string) {

        await this.page.fill(
            EmployeeLocators.lastName,
            lastName
        );

    }

    async clickSave() {

        await this.page.click(
            EmployeeLocators.saveButton
        );

    }

    async addEmployee(employee: EmployeeData) {

        await this.navigateToAddEmployee();

        await this.enterFirstName(employee.firstName);

        if (employee.middleName) {
            await this.enterMiddleName(employee.middleName);
        }

        await this.enterLastName(employee.lastName);

        await this.clickSave();

    }

//navigate
    async openEmployeeList() {

    await this.sidebar.openPIM();

    await this.page.click(
        EmployeeLocators.employeeListMenu
    );

}


//search
async searchEmployee(employeeName: string) {

    await this.page
        .locator(EmployeeLocators.employeeNameSearch).first()
        .fill(employeeName);

    await this.page
        .locator(EmployeeLocators.searchButton)
        .click();

}

async verifyEmployeeExists(employeeName: string) {

    await expect(
        this.page.locator(EmployeeLocators.employeeTable)
    ).toContainText(employeeName);

}
}