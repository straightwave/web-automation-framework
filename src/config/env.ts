import dotenv from 'dotenv';


const testEnv = process.env.TEST_ENV || 'qa';

dotenv.config({
    path: `env/.env.${testEnv}`,
    override: true
});

const requiredVars = [
    'APPLICATION_NAME',
    'TEST_ENVIRONMENT',
    'BASE_URL',
    'BROWSER',
    'USERNAME',
    'PASSWORD',
    'AUTH_STATE_PATH',
    'TESTER'
];

requiredVars.forEach(variable => {
    if (!process.env[variable]) {
        throw new Error(`Missing required environment variable: ${variable}`);
    }
});

export const ENV = {
    application: process.env.APPLICATION_NAME!,
    environment: process.env.TEST_ENVIRONMENT!,
    browser: process.env.BROWSER!,
    baseUrl: process.env.BASE_URL!,
    username: process.env.USERNAME!,
    password: process.env.PASSWORD!,
    tester: process.env.TESTER!,
    authStatePath: process.env.AUTH_STATE_PATH!,
    workers: parseInt(process.env.WORKERS ?? "1", 10),
    retries: parseInt(process.env.RETRIES ?? "0", 10),
    headless: process.env.HEADLESS === "true",
    defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT ?? "120000", 10),
};