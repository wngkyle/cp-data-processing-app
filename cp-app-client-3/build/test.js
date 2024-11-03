import { execFile } from 'child_process';

let scriptPath = '/Users/wng/Desktop/cp-data-processing-app/client/server-dist/server';
execFile(scriptPath, { windowsHide: true }, (err, stdout, stderr) => {
    if (err) {
        console.error(`Failed to start Flask server: ${err}`);
        return;
    }
    console.log(`Flask stdout: ${stdout}`);
    console.error(`Flask stderr: ${stderr}`);
});