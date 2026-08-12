import fs from "fs";
import path from "path";
import { ensureAllureResultsFolder } from "./allureFoldersPresence";

export function copyHistory() {

    const reportHistory = path.join(
        process.cwd(),
        "allure-report",
        "history"
    );

    const resultsDir = ensureAllureResultsFolder();

    const resultsHistory = path.join(
        resultsDir,
        "history"
    );

    if (!fs.existsSync(reportHistory)) {
        console.log("No previous Allure history found.");
        return;
    }

    fs.cpSync(reportHistory, resultsHistory, {
        recursive: true,
        force: true
    });

    console.log("Allure history copied.");
}