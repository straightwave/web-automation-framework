import { test, expect } from "../../../src/fixtures/app.fixture";
import { UserPage } from "../../../src/pages/Admin/user.page";
import { UserDataBuilder } from "../../../src/test-data/user.data";
import { UserLocators } from "../../../src/pages/Admin/user.locators";
import { AllureHelper } from "../../../src/utils/allure/allureHelper";
import { Severity } from "allure-js-commons";

test.describe("User Management", () => {

    test("Add a new system user", async ({ authenticatedPage }) => {

        await AllureHelper.addMetadata(
            "Admin",
            "User Management",
            "Verify add user",
            Severity.CRITICAL,
            "QA Engineer",
            ["Smoke", "Regression"]
        );

        const userPage = new UserPage(authenticatedPage);

        const user = UserDataBuilder.createUserData();

        await userPage.addUser(user);

        await expect(
            authenticatedPage.locator(UserLocators.successToast)
        ).toContainText("Successfully Saved", { timeout: 15000 });

    });

});