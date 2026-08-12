import { test, expect } from "../../../src/fixtures/api.fixture";
import { AllureHelper } from "../../../src/utils/allure/allureHelper";
import { Severity } from "allure-js-commons";

test("Get Leave Requests", async ({ leaveApi }) => {

    await AllureHelper.addMetadata(

        "API",
        "Leave",
        "Retrieve Leave Requests",
        Severity.CRITICAL,
        "Automation Tester",
        ["API", "Smoke"]

    );

    const response = await leaveApi.getLeaveRequests();

    expect(response).toBeDefined();


    expect(Array.isArray(response.data)).toBeTruthy();

});