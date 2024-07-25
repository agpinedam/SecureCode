import * as fs from 'fs';
import * as path from 'path';

const CONFIG_FILE = path.join(__dirname, '../config/port.txt');

export function getPort(): number {
    try {
        const port = fs.readFileSync(CONFIG_FILE, 'utf8').trim();
        return parseInt(port, 10);
    } catch (e) {
        console.error(`Error reading port configuration: ${e}`);
        return 9999; // Default port
    }
}

export function savePort(port: number): void {
    try {
        fs.writeFileSync(CONFIG_FILE, port.toString());
    } catch (e) {
        console.error(`Error saving port configuration: ${e}`);
    }
}
