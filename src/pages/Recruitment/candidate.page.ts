import { Page, expect } from "@playwright/test";
import { BasePage } from "../../utils/BasePage";
import { Sidebar } from "../../components/Sidebar";
import { CandidateLocators } from "./candidate.locators";
import { CandidateData } from "./candidate.data";

export class CandidatePage extends BasePage {

    private sidebar: Sidebar;

    constructor(page: Page) {
        super(page);
        this.sidebar = new Sidebar(page);
    }

    async navigateToAddCandidate() {
        await this.sidebar.openRecruitment();
        await this.page.goto('/web/index.php/recruitment/viewCandidates', {
            waitUntil: 'domcontentloaded',
            timeout: 30000,
        });
        await this.page.getByRole("button", { name: "Add" }).click({ timeout: 15000 });
    }

    async enterFirstName(firstName: string) {
        await this.page.locator(CandidateLocators.firstName).fill(firstName);
    }

    async enterMiddleName(middleName: string) {
        await this.page.locator(CandidateLocators.middleName).fill(middleName);
    }

    async enterLastName(lastName: string) {
        await this.page.locator(CandidateLocators.lastName).fill(lastName);
    }

    async selectVacancy(vacancy: string) {
        await this.page.locator(CandidateLocators.vacancyDropdown).click();
        await this.page.locator(CandidateLocators.vacancyOptions).filter({ hasText: vacancy }).first().click();
    }

    async enterEmail(email: string) {
        await this.page.locator(CandidateLocators.email).nth(0).fill(email);
    }

    async enterContactNumber(contactNumber: string) {
        await this.page.locator(CandidateLocators.contactNumber).nth(1).fill(contactNumber);
    }

    async uploadResume(filePath: string) {
        await this.page.locator(CandidateLocators.resumeUpload).setInputFiles(filePath);
    }

    async enterKeywords(keywords: string) {
        await this.page.locator(CandidateLocators.keywords).fill(keywords);
    }

    async enterNotes(notes: string) {
        await this.page.locator(CandidateLocators.notes).fill(notes);
    }

    async clickSave() {
        await this.page.locator(CandidateLocators.saveButton).click({ timeout: 15000 });
    }

    async verifyCandidateSaved(candidate: CandidateData) {
        await this.page.locator('.oxd-toast').first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => undefined);
        await expect(this.page.locator('.oxd-toast').first()).toContainText('Successfully Saved');
    }

    async addCandidate(candidate: CandidateData) {
        await this.navigateToAddCandidate();
        await this.enterFirstName(candidate.firstName);

        if (candidate.middleName) {
            await this.enterMiddleName(candidate.middleName);
        }

        await this.enterLastName(candidate.lastName);
        await this.selectVacancy(candidate.vacancy);
        await this.enterEmail(candidate.email);
        await this.enterContactNumber(candidate.contactNumber);
        await this.uploadResume(candidate.resume);
        await this.enterKeywords(candidate.keywords);
        await this.enterNotes(candidate.notes);
        await this.clickSave();
    }
}
