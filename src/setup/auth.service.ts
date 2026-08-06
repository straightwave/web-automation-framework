import { Page } from '@playwright/test';

export class AuthService {
    constructor(private page: Page) { }

    async login(username: string, password: string) {
        try {
            console.log('Current URL:', this.page.url());

            console.log('Waiting for login form to render');
            await this.page.waitForSelector('input[type="password"]', { timeout: 60000 });
            console.log('Login form detected');

            const allInputs = this.page.locator('input');
            const inputCount = await allInputs.count();
            console.log('Found', inputCount, 'input fields');


            const usernameField = allInputs.nth(1);
            const passwordField = allInputs.nth(2);

            await usernameField.waitFor({ state: 'visible', timeout: 60000 });
            await usernameField.fill(username);
            console.log('Username entered:', username);

            await passwordField.waitFor({ state: 'visible', timeout: 60000 });
            await passwordField.fill(password);
            console.log('Password entered');

            let loginButton = this.page.locator('button[type="submit"]');
            let buttonText = await loginButton.textContent();
            console.log('Found submit button:', buttonText);

            console.log('URL before button click:', this.page.url());
            await loginButton.click();
            await this.page.waitForTimeout(5000);

            console.log('Waiting for navigation...');
            await this.page.waitForURL(
                '**/dashboard/**',
                { timeout: 60000 }
            );

            const currentUrl = this.page.url();

            if (!currentUrl.includes('/dashboard')) {
                throw new Error(
                    `Login failed. Current URL: ${currentUrl}`
                );
            }

            console.log('Login successful - URL:', currentUrl);
            console.log('URL after navigation:', this.page.url());

        } catch (error) {
            console.error('Login failed:', error);
            console.error('Final URL:', this.page.url());
            throw error;
        }
    }
}