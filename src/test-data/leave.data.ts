import { LeaveRequest } from "../pages/Leave/leave.data";

export class LeaveDataBuilder {

    static createLeaveRequest(): LeaveRequest {

        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const yyyy = now.getFullYear();

        // OrangeHRM uses a yyyy-dd-mm placeholder in the Apply/Assign forms — format accordingly
        const fromDate = `${yyyy}-${dd}-${mm}`;
        const toDate = `${yyyy}-${dd}-${mm}`;

        return {
            employeeName: 'Odis Adalwin',
            leaveType: 'Vacation',
            fromDate: fromDate,
            toDate: toDate,
            comment: 'Auto generated leave request for tests'
        };
    }

}
