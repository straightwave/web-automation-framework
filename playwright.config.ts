import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { ENV } from './src/config/env';

const authStatePath = path.resolve(process.cwd(), ENV.authStatePath);

export default defineConfig({
  testDir: './',

  globalSetup: require.resolve('./src/setup/global.setup.ts'),

  forbidOnly: !!process.env.CI,
  retries: ENV.retries,
  workers: ENV.workers,

  timeout: ENV.defaultTimeout,

  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],

  use: {
    baseURL: ENV.baseUrl,

    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    actionTimeout: ENV.defaultTimeout,
  },

  projects: [
    
    {
      name: "login",

      testMatch: /tests\/auth\/.*\.spec\.ts/,

      use: {
        browserName: "chromium",

        viewport: { width: 1280, height: 720 },

        launchOptions: {
         headless: process.env.HEADLESS === "true",
          slowMo: 500,
          args: ["--start-maximized"],
        },

        storageState: undefined,
      },
    },

    {
      name: 'chromium',

      testIgnore: /tests\/auth\/.*\.spec\.ts/,

      use: {
        ...devices['Desktop Chrome'],

        viewport: devices['Desktop Chrome'].viewport,

        launchOptions: {
          headless: process.env.HEADLESS === 'true',
          slowMo: 500,
          args: ['--start-maximized'],
        },

        storageState: fs.existsSync(authStatePath)
          ? authStatePath
          : undefined,
      },
    },
  ],
});