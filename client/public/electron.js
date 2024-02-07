import { app, BrowserWindow } from 'electron';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import isDev from 'electron-is-dev';
import { PythonShell } from 'python-shell'

let mainWindow = null

/*
Another way of executing python script from javascript: 
    (Python scripts is executed as object pyShell is created using PythonShell constructor)
    const pyShell = new PythonShell('./../server/server.py', null);
    (Remember to add code to terminate the script somewhere at the end)
    pyShell.kill('SIGTERM');
*/

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 1024,
        title: 'Data Processing App',
    });

    if (isDev) { // Load URL if in development mode
        mainWindow.loadURL('http://localhost:3000');
        console.log("DEVELOPMENT MODE");
    } else { // Load index.html file if in offline mode
        const __dirname = dirname(fileURLToPath(import.meta.url));
        console.log('__dirname: ', __dirname);
        mainWindow.loadURL(`file://${path.join(__dirname, './../build/index.html')}`);
        console.log('Final file path: ', `file://${path.join(__dirname, './../build/index.html')}`);
        console.log("OFFLINE MODE");
    }

    console.log('Server Loading...');
    PythonShell.run('./../server/server.py', null).then(message => {
        console.log('Finished');
    })
    console.log('Server Established...');

    mainWindow.on('closed', () => {
        mainWindow = null;
    })
    mainWindow.on('page-title-updated', (e) => {
        e.preventDefault();
    })
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
    console.log("Finished");
});
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

