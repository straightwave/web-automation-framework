import { test } from "../../../src/fixtures/app.fixture";
import { LeavePage } from "../../../src/pages/Leave/leave.page";
import { LeaveFactory } from "../../../src/test-data/leave.factory";

test.describe("Leave Management", () => {

    test("Navigate to Apply Leave page and apply for leave", async ({ authenticatedPage, employeeApi }) => {

        const leavePage = new LeavePage(authenticatedPage);
        const data = LeaveFactory.create();

        const employees = await employeeApi.getEmployees();
        const emp = employees.data && employees.data.length > 0 ? employees.data[0] : undefined;
        const employeeName = emp
            ? `${emp.firstName}${emp.middleName ? ' ' + emp.middleName : ''} ${emp.lastName}`.replace(/\s+/g, ' ').trim()
            : data.employeeName;

        await leavePage.openApplyLeave();
        await leavePage.applyLeave({ ...data, employeeName });
        await leavePage.verifyLeaveOutcome();

    });

});
