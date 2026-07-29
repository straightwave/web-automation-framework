# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/ui/Employee/AddEmployee.spec.ts >> Employee Management >> Add a new employee
- Location: tests/ui/Employee/AddEmployee.spec.ts:9:7

# Error details

```
Error: browser.newContext: "deviceScaleFactor" option is not supported with null "viewport"
```

# Test source

```ts
  1  | import { test as base, expect, Page } from '@playwright/test';
  2  | import path from 'path';
  3  | import { ENV } from '../config/env';
  4  | 
  5  | export const test = base.extend<{
  6  |     authenticatedPage: Page;
  7  | }>({
  8  |     authenticatedPage: async ({ browser }, use) => {
  9  | 
> 10 |         const context = await browser.newContext({
     |                         ^ Error: browser.newContext: "deviceScaleFactor" option is not supported with null "viewport"
  11 |             storageState: path.resolve(ENV.authStatePath),
  12 |         });
  13 | 
  14 | 
  15 |         const page = await context.newPage();
  16 | 
  17 |         await use(page);
  18 | 
  19 |         await context.close();
  20 |     },
  21 | });
  22 | 
  23 | export { expect };
```