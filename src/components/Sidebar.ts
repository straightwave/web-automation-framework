import { Page } from "@playwright/test";

export class Sidebar {

    constructor(private page: Page) {}

    async openDashboard() {
        await this.page.getByRole("link", { name: "Dashboard" }).click();
    }

    async openPIM() {
        await this.page.getByRole("link", { name: "PIM" }).click();
    }

    async openLeave() {
        await this.page.getByRole("link", { name: "Leave" }).click();
    }

    async openAdmin() {
        await this.page.getByRole("link", { name: "Admin" }).click();
    }

    async openRecruitment() {
        await this.page.goto('/web/index.php/recruitment/viewCandidates', {
            waitUntil: 'domcontentloaded',
            timeout: 30000,
        });
    }

    async openBuzz() {
        await this.page.getByRole("link", { name: "Buzz" }).click();
    }
}