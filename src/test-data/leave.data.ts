import { LeaveRequest } from "../pages/Leave/leave.data";

export class LeaveDataBuilder {

    static createLeaveRequest(): LeaveRequest {

        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const yyyy = now.getFullYear();

        const fromDate = `${yyyy}-${dd}-${mm}`;
        const toDate = `${yyyy}-${dd}-${mm}`;

        return {
            employeeName: 'Test Employee',
            leaveType: 'Vacation',
            fromDate: fromDate,
            toDate: toDate,
            comment: 'Auto generated leave request for tests'
        };
    }

}
