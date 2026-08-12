import fs from "fs";
import path from "path";
import os from "os";
import { ENV } from "../../config/env";
import { ensureAllureResultsFolder } from "./allureFoldersPresence";

export function createEnvironmentFile() {

    const resultsDir = ensureAllureResultsFolder();

    const content = `
Application=${ENV.application}
Environment=${ENV.environment}
Browser=${ENV.browser}
Base URL=${ENV.baseUrl}
Operating System=${os.type()} ${os.release()}
Node Version=${process.version}
Tester=${ENV.tester}
`;

    fs.writeFileSync(
        path.join(resultsDir, "environment.properties"),
        content.trim()
    );
}