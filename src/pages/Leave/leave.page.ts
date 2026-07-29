import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { LeaveLocators } from './leave.locators';
import { LeaveRequest } from './leave.data';

export class LeavePage extends BasePage {

    async openApplyLeave() {

        try {
            await expect(this.page.locator(LeaveLocators.leaveMenu)).toBeVisible({ timeout: 10000 });
            await this.page.click(LeaveLocators.leaveMenu);

            await expect(this.page.locator(LeaveLocators.applyTab)).toBeVisible({ timeout: 10000 });
            await this.page.click(LeaveLocators.applyTab);

        } catch (err) {
            await this.page.goto('/web/index.php/leave/applyLeave');
        }

        await expect(this.page.locator(LeaveLocators.applyButton)).toBeVisible({ timeout: 10000 });

    }

    async ensureFormReady() {

        const empInput = this.page.locator(LeaveLocators.employeeNameInput);
        const isVisible = await empInput.isVisible().catch(() => false);

        if (!isVisible) {
            await this.page.click(LeaveLocators.assignLeaveTab);
            await expect(empInput).toBeVisible({ timeout: 10000 });
        }

    }

    async selectEmployee(employeeName: string) {

        const empInput = this.page.locator(LeaveLocators.employeeNameInput);

        await expect(empInput).toBeVisible({ timeout: 10000 });
        await empInput.fill(employeeName);
        await empInput.focus();
        await this.page.waitForTimeout(500);

        try {
            await this.page.keyboard.press('ArrowDown');
            await this.page.keyboard.press('Enter');
        } catch (e) {
            await empInput.press('Enter');
        }

    }

    async selectLeaveType() {

        const dropdown = this.page.locator(LeaveLocators.leaveTypeDropdown).first();

        await expect(dropdown).toBeVisible({ timeout: 10000 });
        await dropdown.click();
        await this.page.waitForTimeout(300);

        try {
            await this.page.keyboard.press('ArrowDown');
            await this.page.keyboard.press('Enter');
        } catch (e) {
            // continue
        }

    }

    async fillFromDate(fromDate: string) {

        const input = this.page.locator(LeaveLocators.fromDateInput).first();

        await expect(input).toBeVisible({ timeout: 10000 });
        await input.click();
        await input.fill(fromDate);

    }

    async fillToDate(toDate: string) {

        const input = this.page.locator(LeaveLocators.fromDateInput).nth(1);

        await expect(input).toBeVisible({ timeout: 10000 });
        await input.click();
        await input.fill(toDate);

    }

    async fillComment(comment: string) {

        await expect(this.page.locator(LeaveLocators.commentsInput)).toBeVisible({ timeout: 5000 });
        await this.page.fill(LeaveLocators.commentsInput, comment);

    }

    async submitLeave() {

        const submitButton = this.page.getByRole('button', { name: /Apply|Assign/i });

        await expect(submitButton).toBeVisible({ timeout: 5000 });
        await submitButton.click();

    }

    async verifyLeaveOutcome() {

        const success = await this.page.locator(LeaveLocators.successToast)
            .waitFor({ timeout: 5000 })
            .then(() => true)
            .catch(() => false);

        if (!success) {
            const validation = this.page.getByText(/Invalid|Balance not sufficient|Required|Insufficient/);
            await expect(validation.first()).toBeVisible({ timeout: 5000 });
        }

    }

    async applyLeave(leave: LeaveRequest) {

        await this.ensureFormReady();
        await this.selectEmployee(leave.employeeName);
        await this.selectLeaveType();
        await this.fillFromDate(leave.fromDate);
        await this.fillToDate(leave.toDate);

        if (leave.comment) {
            await this.fillComment(leave.comment);
        }

        await this.submitLeave();

    }

}
