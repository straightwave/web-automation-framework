import { test } from "../../../src/fixtures/auth.fixture";
import { CandidatePage } from "../../../src/pages/Recruitment/candidate.page";
import { CandidateFactory } from "../../../src/test-data/candidate.factory";

test.describe("Recruitment - Add Candidate", () => {

    test("Verify user can add a new candidate", async ({ authenticatedPage }) => {

        const candidatePage = new CandidatePage(authenticatedPage);
        const candidate = CandidateFactory.create();

        await candidatePage.addCandidate(candidate);
        await candidatePage.verifyCandidateSaved(candidate);

    });

});