import { UserData } from "../pages/Admin/user.data";

export class UserDataBuilder {

    static createUserData(): UserData {

        const random = Date.now();

        const username = `automation${random}`;

        return {

            UserRole: "ESS",

            EmployeeName: "Aditya RajSingh",

            UserName: username,

            Status: "Enabled",

            Password: "Test@12345",

            ConfirmPassword: "Test@12345"

        };

    }

}