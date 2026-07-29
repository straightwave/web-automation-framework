# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/ui/Employee/AddEmployee.spec.ts >> Employee Management >> Add a new employee
- Location: tests/ui/Employee/AddEmployee.spec.ts:10:7

# Error details

```
Error: Error reading storage state from /Users/devsorb/Documents/Automation Project/OrangeHRM-Framework-Playwright/ENV.authStatePath:
ENOENT: no such file or directory, open '/Users/devsorb/Documents/Automation Project/OrangeHRM-Framework-Playwright/ENV.authStatePath'
```

# Test source

```ts
  1  | import { test as base, expect, Page } from '@playwright/test';
  2  | import path from 'path';
  3  | 
  4  | export const test = base.extend<{
  5  |     authenticatedPage: Page;
  6  | }>({
  7  |     authenticatedPage: async ({ browser }, use) => {
  8  | 
> 9  |         const context = await browser.newContext({
     |                         ^ Error: Error reading storage state from /Users/devsorb/Documents/Automation Project/OrangeHRM-Framework-Playwright/ENV.authStatePath:
  10 |             storageState: path.resolve("ENV.authStatePath"),
  11 |         });
  12 | 
  13 | 
  14 |         const page = await context.newPage();
  15 | 
  16 |         await use(page);
  17 | 
  18 |         await context.close();
  19 |     },
  20 | });
  21 | 
  22 | export { expect };
```