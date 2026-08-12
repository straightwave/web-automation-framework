# OrangeHRM Playwright Automation Framework

A concise UI and API automation framework for OrangeHRM built with Playwright and TypeScript.

## What it includes
- UI test automation for OrangeHRM flows
- API test automation for employee and leave endpoints
- Page Object Model structure
- Allure reporting
- Environment-based configuration

## Tech stack
- Playwright
- TypeScript
- Node.js
- Allure Report

## Setup
Install dependencies:

```bash
npm install
```

## Run tests
Run UI tests:

```bash
npm run ui
```

Run API tests:

```bash
npm run api
```

Run QA headed tests:

```bash
npm run qa:headed
```

## Generate reports
```bash
npm run allure:generate
npm run allure:open
```

## Notes
Configuration files are stored in the env folder and can be adjusted per environment.