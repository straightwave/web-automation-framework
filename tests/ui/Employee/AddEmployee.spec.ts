import { test } from "../../../src/fixtures/app.fixture";
import { EmployeePage } from "../../../src/pages/Employee/employee.page";
import { EmployeeDataBuilder } from "../../../src/test-data/employee.data";
import { AllureHelper } from "../../../src/utils/allure/allureHelper";
import { Severity } from "allure-js-commons";

test.describe("Employee Management", () => {

  test("Add a new employee", async ({
    authenticatedPage,
    employeeApi
  }) => {

    await AllureHelper.addMetadata(
            "Dashboard",
            "Dashboard Verification",
            "Verify add Employee",
            Severity.CRITICAL,
      "QA Engineer",
            ["Smoke", "Regression"]
    );

        const employeePage = new EmployeePage(authenticatedPage);

    const employee = EmployeeDataBuilder.createEmployeeData();

    let createdEmployee;

    try {

        await employeePage.addEmployee(employee);

      createdEmployee = await employeeApi.findEmployeeByName(
        employee.firstName,
        employee.middleName,
        employee.lastName
      );

    } finally {

      if (createdEmployee) {
        await employeeApi.deleteEmployee(createdEmployee.empNumber);
      }

    }

    });

});