import fs from "fs";
import path from "path";
import { ensureAllureResultsFolder } from "./allureFoldersPresence";

export function createCategoriesFile() {

    const resultsDir = ensureAllureResultsFolder();

    const source = path.join(
        process.cwd(),
        "categories.json"
    );

    const destination = path.join(
        resultsDir,
        "categories.json"
    );

    fs.copyFileSync(source, destination);

    console.log("Categories file created.");
}