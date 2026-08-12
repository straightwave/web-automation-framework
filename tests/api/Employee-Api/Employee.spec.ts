import { test, expect } from "../../src/fixtures/api.fixture";
import { AllureHelper } from "../../src/utils/allure/allureHelper";
import { Severity } from "allure-js-commons";

test("Get Employees", async ({ employeeApi }) => {

    await AllureHelper.addMetadata(

        "API",
        "Employee",
        "Retrieve Employees",
        Severity.CRITICAL,
        "QA Engineer",
        ["API", "Smoke"]

    );

    const employees = await employeeApi.getEmployees();

    expect(employees.meta.total).toBeGreaterThan(0);

    expect(employees.data.length).toBeGreaterThan(0);

    expect(employees.data[0].empNumber).toBeDefined();

    expect(employees.data[0].firstName).toBeTruthy();

});