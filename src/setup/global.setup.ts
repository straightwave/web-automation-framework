import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { ENV } from '../config/env';
import { AuthService } from './auth.service';
import { createEnvironmentFile } from "../utils/allure/allureEnvironment";
import { createExecutorFile } from '../utils/allure/allureExecuter';
import { createCategoriesFile } from "../utils/allure/allureCategories";

async function globalSetup() {
    console.log('Starting authentication setup...');
    console.log('Base URL:', ENV.baseUrl);

    const authPath = path.resolve(ENV.authStatePath);

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(ENV.baseUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
    });
    console.log('Initial page URL:', page.url());
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 }).catch(() => null);

    const authService = new AuthService(page);
    await authService.login(ENV.username, ENV.password);

    await page.context().storageState({
        path: authPath,
    });

    console.log('Auth state saved to:', authPath);


    createEnvironmentFile();
    createExecutorFile();
    createCategoriesFile();

    await browser.close();

    console.log('Setup complete - auth state ready for tests');
}

export default globalSetup;