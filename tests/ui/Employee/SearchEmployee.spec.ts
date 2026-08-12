import { test } from "../../../src/fixtures/auth.fixture";
import { EmployeeDataBuilder } from "../../../src/test-data/employee.data";
import { EmployeePage } from "../../../src/pages/Employee/employee.page";

test.describe("Employee Search", () => {

    test("Search existing employee", async ({ authenticatedPage }) => {

        const employeePage = new EmployeePage(authenticatedPage);

        const employee = EmployeeDataBuilder.createEmployeeData();

        await employeePage.addEmployee(employee);

        await employeePage.openEmployeeList();

        await employeePage.searchEmployee(employee.firstName);

        await employeePage.verifyEmployeeExists(employee.firstName);

    });

});