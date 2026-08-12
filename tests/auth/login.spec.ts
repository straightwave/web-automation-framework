import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/Login/login.page";
import { ENV } from "../../src/config/env";
import { AllureHelper } from "../../src/utils/allure/allureHelper";
import { Severity } from "allure-js-commons";

test.describe("Authentication", () => {

    test("Verify user can login successfully", async ({ page }) => {

        await AllureHelper.addMetadata(
            "Authentication",
            "Login",
            "Verify Successful Login",
            Severity.CRITICAL,
            "QA Engineer",
            ["Smoke", "Regression"]
        );

        const loginPage = new LoginPage(page);

        await loginPage.navigate();

        await loginPage.login(ENV.username, ENV.password);
        await loginPage.verifySuccessfulLogin();
    });

});