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
  1  | import { test as authTest, expect } from "./auth.fixture";
  2  | import { EmployeeApi } from "../api/services/employee.api";
  3  | import { LeaveApi } from "../api/services/leave.api";
  4  | import { APIRequestContext } from "@playwright/test";
  5  | import path from "path";
  6  | import { ENV } from "../config/env";
  7  | 
  8  | export const test = authTest.extend<{
  9  | 
  10 |     apiRequest: APIRequestContext;
  11 |     employeeApi: EmployeeApi;
  12 |     leaveApi: LeaveApi;
  13 | 
  14 | }>({
  15 | 
  16 |     apiRequest: async ({ browser }, use) => {
  17 | 
> 18 |         const context = await browser.newContext({
     |                         ^ Error: browser.newContext: "deviceScaleFactor" option is not supported with null "viewport"
  19 |             storageState: path.resolve(ENV.authStatePath),
  20 |         });
  21 | 
  22 |         await use(context.request);
  23 | 
  24 |         await context.close();
  25 | 
  26 |     },
  27 | 
  28 |     employeeApi: async ({ apiRequest }, use) => {
  29 | 
  30 |         await use(new EmployeeApi(apiRequest));
  31 | 
  32 |     },
  33 | 
  34 |     leaveApi: async ({ apiRequest }, use) => {
  35 | 
  36 |         await use(new LeaveApi(apiRequest));
  37 | 
  38 |     }
  39 | 
  40 | });
  41 | 
  42 | export { expect };
```