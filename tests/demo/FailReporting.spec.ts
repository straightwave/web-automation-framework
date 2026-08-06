import { test, expect } from '../../src/fixtures/auth.fixture';
import { AllureHelper } from '../../src/utils/allure/allureHelper';
import { Severity } from "allure-js-commons";

test('Dashboard - Verify logged in state', async ({ authenticatedPage: page }) => {

    await AllureHelper.addMetadata(
        "Dashboard",
        "Dashboard Verification",
        "Verify authenticated user can access dashboard",
        Severity.CRITICAL,
        "Automation Tester",
        ["Smoke", "Regression", "Priority = High"]
    );

    await page.goto('/web/index.php/dashboard/index');

    await expect(page).toHaveURL(/dashboard/);

    // delibaretly failed the testts
    await expect(page).toHaveTitle(/Google/);

});