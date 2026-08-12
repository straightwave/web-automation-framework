import { EmployeeData } from "../pages/Employee/employee.data";

export class EmployeeDataBuilder {

    static createEmployeeData(): EmployeeData {
const random = Date.now();

const firstName = `John${random}`;
const middleName = "QA";
const lastName = "Automation";

return {
    firstName,
    middleName,
    lastName,
    fullName: `${firstName} ${middleName} ${lastName}`
};
    }

}

