export const EmployeeLocators = {

    addEmployeeMenu: 'a:has-text("Add Employee")',
    employeeListMenu: 'a:has-text("Employee List")',

    firstName: 'input[name="firstName"]',
    middleName: 'input[name="middleName"]',
    lastName: 'input[name="lastName"]',
    employeeId: '.oxd-input-group:has(label:text("Employee Id")) input',

    employeeNameSearch: 'input[placeholder="Type for hints..."]',

    saveButton: 'button[type="submit"]',
    searchButton: 'button[type="submit"]',

    employeeTable: '.oxd-table-body',
    employeeRow: '.oxd-table-row',

    successToast: '.oxd-toast',

    personalDetailsHeading: 'h6.oxd-text.oxd-text--h6.orangehrm-main-title',

    noRecordsFound: '.oxd-text--span'

};