import { CandidateData } from "../pages/Recruitment/candidate.data";

export class CandidateFactory {
    static create(): CandidateData {
        const timestamp = Date.now();
        const firstName = `Candidate${timestamp}`;
        const middleName = "QA";
        const lastName = "Automation";

        return {
            firstName,
            middleName,
            lastName,
            fullName: `${firstName} ${middleName} ${lastName}`,
            email: `candidate${timestamp}@test.com`,
            contactNumber: "03123456789",
            vacancy: "Senior QA Lead",
            keywords: "Playwright",
            notes: "Automation Test",
            resume: "src/test-data/resume.pdf"
        };
    }
}
