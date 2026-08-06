import { test as base, expect, Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { ENV } from '../config/env';
import { AuthService } from '../setup/auth.service';

export const test = base.extend<{
    authenticatedPage: Page;
}>({
    authenticatedPage: async ({ browser }, use) => {
        const authPath = path.resolve(ENV.authStatePath);
        const hasStoredState = fs.existsSync(authPath);

        const context = await browser.newContext({
            storageState: hasStoredState ? authPath : undefined,
        });

        const page = await context.newPage();

        try {
            await page.goto(`${ENV.baseUrl}/web/index.php/dashboard/index`, {
                waitUntil: 'domcontentloaded',
                timeout: 60000,
            });

            const isLoggedIn = page.url().includes('/dashboard') && !page.url().includes('/auth/login');

            if (!isLoggedIn) {
                await page.goto(ENV.baseUrl, {
                    waitUntil: 'domcontentloaded',
                    timeout: 60000,
                });
                await new AuthService(page).login(ENV.username, ENV.password);
                await context.storageState({ path: authPath });
            }
        } catch {
            await page.goto(ENV.baseUrl, {
                waitUntil: 'domcontentloaded',
                timeout: 60000,
            });
            await new AuthService(page).login(ENV.username, ENV.password);
            await context.storageState({ path: authPath });
        }

        await use(page);

        await context.close();
    },
});

export { expect };