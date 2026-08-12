import { test } from "../../../src/fixtures/auth.fixture";
import { CandidatePage } from "../../../src/pages/Recruitment/candidate.page";
import { CandidateDataBuilder } from "../../../src/test-data/candidate.data";

test.describe("Recruitment - Add Candidate", () => {

    test("Verify user can add a new candidate", async ({ authenticatedPage }) => {

        const candidatePage = new CandidatePage(authenticatedPage);
        const candidate = CandidateDataBuilder.createCandidateData();

        await candidatePage.addCandidate(candidate);
        await candidatePage.verifyCandidateSaved(candidate);

    });

});