import fs from 'fs';
import path from 'path';

export function ensureAllureResultsFolder() {
    const dir = path.join(process.cwd(), "allure-results");

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    return dir;
}